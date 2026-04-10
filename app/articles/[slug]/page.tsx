import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug, getAllArticleSlugs } from '../../../utils/content'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for each article
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.frontMatter.title} | Zainal Arifin`,
    description: article.frontMatter.description,
    keywords: article.frontMatter.tags?.join(', '),
    authors: [{ name: 'Zainal Arifin' }],
    openGraph: {
      title: article.frontMatter.title,
      description: article.frontMatter.description,
      type: 'article',
      publishedTime: article.frontMatter.date,
      tags: article.frontMatter.tags,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = article.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.frontMatter.title}
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {article.frontMatter.description}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={article.frontMatter.date}>
                {new Date(article.frontMatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {article.frontMatter.tags && article.frontMatter.tags.length > 0 && (
            <div className="flex items-center gap-3 mb-8">
              <Tag size={16} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {article.frontMatter.tags.map((tag, index) => (
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
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mt-12 mb-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-12 mb-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-white mt-8 mb-4">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-medium text-white mt-6 mb-3">{children}</h4>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 space-y-2 text-gray-300 list-disc list-inside">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 space-y-2 text-gray-300 list-decimal list-inside">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300">{children}</li>
              ),
              code: ({ children, className, ...props }: any) => {
                const isInline = !className?.includes('language-')
                return isInline ? (
                  <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="text-green-400 text-sm" {...props}>
                    {children}
                  </code>
                )
              },
              pre: ({ children }) => (
                <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-700 my-6">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-6">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-gray-200 italic">{children}</em>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="text-gray-400">
              <p>Written by <span className="text-white font-medium">Zainal Arifin</span></p>
              <p className="text-sm">Software Developer based in Bandung, Indonesia</p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/articles"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                More Articles
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
