import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { getAllArticles } from '../../utils/content'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Thoughts on software development, technology trends, and lessons learned from building web and mobile applications.',
  alternates: { canonical: '/articles' },
  openGraph: {
    title: 'Articles & Insights by Zainal Arifin',
    description: 'Thoughts on software development, technology trends, and lessons learned from building applications.',
    url: '/articles',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Articles & Insights by Zainal Arifin',
    description: 'Thoughts on software development, technology trends, and lessons learned from building applications.',
  },
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Articles & Insights
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            My thoughts on software development, technology trends, and lessons learned
            from building applications.
          </p>
        </div>

        {/* Articles List */}
        {articles.length > 0 ? (
          <div className="space-y-8">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <FileText size={18} />
                    <time dateTime={article.frontMatter.date} className="text-sm">
                      {new Date(article.frontMatter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4 hover:text-blue-400 transition-colors duration-200">
                  <Link href={`/articles/${article.slug}`}>
                    {article.frontMatter.title}
                  </Link>
                </h2>

                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  {article.frontMatter.description}
                </p>

                {article.frontMatter.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.frontMatter.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-medium border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Read full article →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-900 rounded-xl p-12 border border-gray-800">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Articles Coming Soon
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                I&apos;m working on some interesting articles about software development.
                Check back soon for new content!
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        {articles.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {articles.length}
                </div>
                <div className="text-gray-400">
                  {articles.length === 1 ? 'Article' : 'Articles'} Published
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {new Set(articles.flatMap(a => a.frontMatter.tags || [])).size}
                </div>
                <div className="text-gray-400">
                  Topics Covered
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
