#!/usr/bin/env node

'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

// Load .env.local manually (avoid bringing in dotenv just for one var)
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const WP_URL = (process.env.WP_URL || 'http://localhost/wordpress').replace(/\/$/, '');
const PROJECT_ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(PROJECT_ROOT, 'content', 'articles');
const STATE_FILE = path.join(PROJECT_ROOT, '.wp-sync-state.json');
const LOGS_DIR = path.join(PROJECT_ROOT, 'logs');

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------

if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });

function log(msg) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}`;
  console.log(line);
}

// ---------------------------------------------------------------------------
// State management
// ---------------------------------------------------------------------------

function readState() {
  if (!fs.existsSync(STATE_FILE)) return { lastSync: new Date(0).toISOString() };
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { lastSync: new Date(0).toISOString() };
  }
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

// ---------------------------------------------------------------------------
// HTTP helper (supports both http and https)
// ---------------------------------------------------------------------------

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'wp-sync/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// WordPress REST API
// ---------------------------------------------------------------------------

async function fetchPosts(modifiedAfter) {
  const after = encodeURIComponent(modifiedAfter);
  const url = `${WP_URL}/wp-json/wp/v2/posts?status=publish&modified_after=${after}&per_page=100&_embed=1&orderby=modified&order=asc`;
  log(`Fetching posts modified after ${modifiedAfter}`);
  return fetch(url);
}

// ---------------------------------------------------------------------------
// HTML → Markdown via turndown
// ---------------------------------------------------------------------------

let TurndownService;
try {
  TurndownService = require('turndown');
} catch {
  console.error('ERROR: turndown is not installed. Run: npm install');
  process.exit(1);
}

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Preserve fenced code blocks from WordPress syntax highlighter plugins
td.addRule('pre', {
  filter: 'pre',
  replacement: (content, node) => {
    const lang = node.getAttribute ? (node.getAttribute('data-lang') || '') : '';
    return `\n\`\`\`${lang}\n${node.textContent || content}\n\`\`\`\n`;
  },
});

function htmlToMarkdown(html) {
  if (!html) return '';
  return td.turndown(html).trim();
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// Build frontmatter + markdown file
// ---------------------------------------------------------------------------

function resolveTagNames(post) {
  const tags = [];
  // _embed includes wp:term array: [[categories...], [tags...]]
  const embedded = post._embedded && post._embedded['wp:term'];
  if (Array.isArray(embedded)) {
    for (const termGroup of embedded) {
      for (const term of termGroup) {
        if (term.taxonomy === 'post_tag' || term.taxonomy === 'category') {
          tags.push(term.name);
        }
      }
    }
  }
  return [...new Set(tags)]; // deduplicate
}

function buildMarkdownFile(post) {
  const title = stripHtml(post.title.rendered);
  const date = post.date_gmt
    ? post.date_gmt.slice(0, 10)
    : new Date(post.date).toISOString().slice(0, 10);
  const description = stripHtml(post.excerpt.rendered);
  const tags = resolveTagNames(post);
  const body = htmlToMarkdown(post.content.rendered);

  const tagsYaml = tags.length
    ? `tags:\n${tags.map((t) => `  - ${t}`).join('\n')}`
    : 'tags: []';

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    tagsYaml,
    'published: true',
    '---',
  ].join('\n');

  return `${frontmatter}\n\n${body}\n`;
}

// ---------------------------------------------------------------------------
// File system
// ---------------------------------------------------------------------------

function ensureArticlesDir() {
  if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

function writeArticle(slug, content) {
  ensureArticlesDir();
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

// ---------------------------------------------------------------------------
// Git helpers
// ---------------------------------------------------------------------------

function gitCommitAndPush(count) {
  try {
    execSync('git add content/articles/', { cwd: PROJECT_ROOT, stdio: 'pipe' });
    const msg = `sync: ${count} post${count !== 1 ? 's' : ''} from WordPress`;
    execSync(`git commit -m "${msg}"`, { cwd: PROJECT_ROOT, stdio: 'pipe' });
    log(`Git committed: "${msg}"`);
    execSync('git push', { cwd: PROJECT_ROOT, stdio: 'pipe' });
    log('Git pushed successfully');
  } catch (err) {
    // "nothing to commit" is fine — git exits non-zero in that case
    const output = err.stdout ? err.stdout.toString() : err.message;
    if (output.includes('nothing to commit')) {
      log('Nothing new to commit (files unchanged)');
    } else {
      log(`Git error: ${output || err.message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log('=== WordPress Sync Started ===');

  const state = readState();
  log(`Last sync: ${state.lastSync}`);

  let posts;
  try {
    posts = await fetchPosts(state.lastSync);
  } catch (err) {
    log(`ERROR fetching posts: ${err.message}`);
    log('Is your local WordPress server running?');
    process.exit(1);
  }

  if (!posts.length) {
    log('No new or updated posts found. Nothing to do.');
    writeState({ lastSync: new Date().toISOString() });
    log('=== WordPress Sync Done ===');
    return;
  }

  log(`Found ${posts.length} post(s) to sync`);

  let written = 0;
  for (const post of posts) {
    try {
      const content = buildMarkdownFile(post);
      const filePath = writeArticle(post.slug, content);
      log(`Written: ${path.relative(PROJECT_ROOT, filePath)}`);
      written++;
    } catch (err) {
      log(`ERROR processing post "${post.slug}": ${err.message}`);
    }
  }

  writeState({ lastSync: new Date().toISOString() });
  log(`State updated. ${written} file(s) written.`);

  if (written > 0) {
    gitCommitAndPush(written);
  }

  log('=== WordPress Sync Done ===');
}

main().catch((err) => {
  log(`FATAL: ${err.message}`);
  process.exit(1);
});
