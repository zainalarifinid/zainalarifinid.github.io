import { ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'
import ProjectCard from '../components/ui/ProjectCard'
import { getFeaturedProjects, getLatestArticles } from '../utils/content'

export default async function HomePage() {
  // Fetch data on the server side
  const [featuredProjects, latestArticles] = await Promise.all([
    getFeaturedProjects(),
    getLatestArticles()
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Zainal Arifin
            </h1>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl text-blue-400 font-medium mb-8">
              Software Developer
            </h2>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Crafting robust back-ends and intuitive front-ends from Bandung, Indonesia.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/showcase"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-lg"
              >
                View My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/articles"
                className="group border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-lg hover:bg-gray-900"
              >
                <FileText size={20} />
                Read My Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Showcase
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A selection of my most recent and impactful projects
            </p>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.frontMatter.title}
                  description={project.frontMatter.description}
                  imageUrl={project.frontMatter.imageUrl}
                  tags={project.frontMatter.tags}
                  liveUrl={project.frontMatter.liveUrl}
                  sourceUrl={project.frontMatter.sourceUrl}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>No featured projects available. Check back soon!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              View All Projects
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest from the Blog
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights from my development journey
            </p>
          </div>

          {latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FileText size={16} />
                      <time dateTime={article.frontMatter.date}>
                        {new Date(article.frontMatter.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 hover:text-blue-400 transition-colors duration-200">
                    <Link href={`/articles/${article.slug}`}>
                      {article.frontMatter.title}
                    </Link>
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {article.frontMatter.description}
                  </p>

                  {article.frontMatter.tags && (
                    <div className="flex flex-wrap gap-2">
                      {article.frontMatter.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>No articles available. Check back soon for exciting content!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Read All Articles
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
