import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Define interfaces for our content
export interface ProjectFrontMatter {
  title: string
  date: string
  description: string
  imageUrl: string
  tags: string[]
  liveUrl: string
  sourceUrl: string
  featured?: boolean
}

export interface Project {
  slug: string
  frontMatter: ProjectFrontMatter
  content: string
}

export interface ProjectVersion {
  label: string
  date?: string
  content: string
}

export interface ArticleFrontMatter {
  title: string
  date: string
  description: string
  tags: string[]
  published: boolean
}

export interface Article {
  slug: string
  frontMatter: ArticleFrontMatter
  content: string
}

// Get all projects from the content/projects directory (Server-side only)
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects')

    // Check if directory exists
    if (!fs.existsSync(projectsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    const projects = fileNames
      .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
      .map((name) => {
        const slug = name.replace(/\.mdx?$/, '')
        const fullPath = path.join(projectsDirectory, name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          frontMatter: data as ProjectFrontMatter,
          content,
        }
      })
      .sort((a, b) => {
        // Sort by date in descending order (newest first)
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
      })

    return projects
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

// Get featured projects (flagged via frontMatter.featured, falling back to newest 3)
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects()
  const flagged = allProjects.filter((project) => project.frontMatter.featured)
  return flagged.length > 0 ? flagged : allProjects.slice(0, 3)
}

// Find the showcase project whose tags overlap most with the given tags
// (e.g. an article's tags), so article readers can jump to a project that
// demonstrates the same tech in practice. Returns null if nothing overlaps.
export async function getRelatedProject(tags: string[] = []): Promise<Project | null> {
  if (tags.length === 0) {
    return null
  }

  const allProjects = await getAllProjects()
  const normalizedTags = new Set(tags.map((tag) => tag.toLowerCase()))

  let bestMatch: Project | null = null
  let bestScore = 0

  for (const project of allProjects) {
    const score = project.frontMatter.tags.filter((tag) =>
      normalizedTags.has(tag.toLowerCase())
    ).length

    if (score > bestScore) {
      bestScore = score
      bestMatch = project
    }
  }

  return bestMatch
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects')
    const fullPath = path.join(projectsDirectory, `${slug}.md`)

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      // Try with .mdx extension
      const mdxPath = path.join(projectsDirectory, `${slug}.mdx`)
      if (!fs.existsSync(mdxPath)) {
        return null
      }
      const fileContents = fs.readFileSync(mdxPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        frontMatter: data as ProjectFrontMatter,
        content,
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontMatter: data as ProjectFrontMatter,
      content,
    }
  } catch (error) {
    console.error('Error reading project:', error)
    return null
  }
}

// Get all project slugs for static generation
export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects')

    if (!fs.existsSync(projectsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    return fileNames
      .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx?$/, ''))
  } catch (error) {
    console.error('Error reading project slugs:', error)
    return []
  }
}

// Get archived write-up snapshots for a project, e.g. content/projects/<slug>/versions/v1.md,
// v2.md. Returns [] if the project has no versions folder. Sorted newest-snapshot-first.
export async function getProjectVersions(slug: string): Promise<ProjectVersion[]> {
  try {
    const versionsDirectory = path.join(process.cwd(), 'content/projects', slug, 'versions')

    if (!fs.existsSync(versionsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(versionsDirectory)
    return fileNames
      .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
      .map((name) => {
        const match = name.match(/^v(\d+)\.mdx?$/i)
        const versionNumber = match ? parseInt(match[1], 10) : 0
        const fullPath = path.join(versionsDirectory, name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          versionNumber,
          label: (data.label as string | undefined) ?? `V${versionNumber}`,
          date: data.date as string | undefined,
          content,
        }
      })
      .sort((a, b) => b.versionNumber - a.versionNumber)
      .map(({ label, date, content }) => ({ label, date, content }))
  } catch (error) {
    console.error('Error reading project versions:', error)
    return []
  }
}

// Get all articles from the content/articles directory (Server-side only)
export async function getAllArticles(): Promise<Article[]> {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles')

    // Check if directory exists
    if (!fs.existsSync(articlesDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(articlesDirectory)
    const articles = fileNames
      .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
      .map((name) => {
        const slug = name.replace(/\.mdx?$/, '')
        const fullPath = path.join(articlesDirectory, name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          frontMatter: data as ArticleFrontMatter,
          content,
        }
      })
      .filter((article) => article.frontMatter.published !== false)
      .sort((a, b) => {
        // Sort by date in descending order (newest first)
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
      })

    return articles
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
}

// Get latest articles (first 3)
export async function getLatestArticles(): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.slice(0, 3)
}

// Get a single article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles')
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      // Try with .mdx extension
      const mdxPath = path.join(articlesDirectory, `${slug}.mdx`)
      if (!fs.existsSync(mdxPath)) {
        return null
      }
      const fileContents = fs.readFileSync(mdxPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        frontMatter: data as ArticleFrontMatter,
        content,
      }
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      frontMatter: data as ArticleFrontMatter,
      content,
    }
  } catch (error) {
    console.error('Error reading article:', error)
    return null
  }
}

// Get all article slugs for static generation
export async function getAllArticleSlugs(): Promise<string[]> {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles')
    
    if (!fs.existsSync(articlesDirectory)) {
      return []
    }
    
    const fileNames = fs.readdirSync(articlesDirectory)
    return fileNames
      .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx?$/, ''))
  } catch (error) {
    console.error('Error reading article slugs:', error)
    return []
  }
}
