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
}

export interface Project {
  slug: string
  frontMatter: ProjectFrontMatter
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

// Get featured projects (first 3)
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects()
  return allProjects.slice(0, 3)
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
