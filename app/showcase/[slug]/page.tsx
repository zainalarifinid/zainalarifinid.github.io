import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github, Tag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectBySlug, getAllProjectSlugs } from '../../../utils/content'
import MarkdownContent from '../../../components/MarkdownContent'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for each project
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.frontMatter.title} | Zainal Arifin`,
    description: project.frontMatter.description,
    keywords: project.frontMatter.tags?.join(', '),
    authors: [{ name: 'Zainal Arifin' }],
    openGraph: {
      title: project.frontMatter.title,
      description: project.frontMatter.description,
      type: 'website',
      images: [project.frontMatter.imageUrl],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Showcase
          </Link>
        </div>

        {/* Project Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {project.frontMatter.title}
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {project.frontMatter.description}
          </p>

          {/* Tags */}
          {project.frontMatter.tags && project.frontMatter.tags.length > 0 && (
            <div className="flex items-center gap-3 mb-8">
              <Tag size={16} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {project.frontMatter.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-medium border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {project.frontMatter.liveUrl && (
              <a
                href={project.frontMatter.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
            {project.frontMatter.sourceUrl && (
              <a
                href={project.frontMatter.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-600 hover:border-gray-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-900"
              >
                <Github size={18} />
                Source Code
              </a>
            )}
          </div>

          {/* Hero Image */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-800">
            <Image
              src={project.frontMatter.imageUrl}
              alt={project.frontMatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Project Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <MarkdownContent content={project.content} />
        </article>

        {/* Project Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="text-gray-400">
              <p>Built by <span className="text-white font-medium">Zainal Arifin</span></p>
              <p className="text-sm">Software Developer based in Bandung, Indonesia</p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/showcase"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                More Projects
              </Link>
              <Link
                href="/contact"
                className="border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-900"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
