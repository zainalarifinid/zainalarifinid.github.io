import type { Metadata } from 'next'
import ProjectCard from '../../components/ui/ProjectCard'
import { getAllProjects } from '../../utils/content'

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'A collection of projects and case studies — from micro-frontend architectures and real-time systems to mobile apps and enterprise solutions.',
  alternates: { canonical: '/showcase' },
  openGraph: {
    title: 'Projects & Case Studies by Zainal Arifin',
    description: 'A collection of projects and case studies — from micro-frontend architectures and real-time systems to mobile apps and enterprise solutions.',
    url: '/showcase',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Projects & Case Studies by Zainal Arifin',
    description: 'From micro-frontend architectures and real-time systems to mobile apps and enterprise solutions.',
  },
}

export default async function ShowcasePage() {
  // Fetch all projects on the server side
  const projects = await getAllProjects()

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Projects & Case Studies
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive collection of my work, from personal projects to professional case studies.
            Each project represents a journey of problem-solving, learning, and crafting solutions
            that make a difference.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
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
          <div className="text-center py-20">
            <div className="bg-gray-900 rounded-xl p-12 border border-gray-800">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Projects Coming Soon
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                I&apos;m currently working on some exciting projects. Check back soon to see
                what I&apos;ve been building!
              </p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {projects.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {projects.length}
                </div>
                <div className="text-gray-400">
                  {projects.length === 1 ? 'Project' : 'Projects'} Completed
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {new Set(projects.flatMap(p => p.frontMatter.tags)).size}
                </div>
                <div className="text-gray-400">
                  Technologies Used
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {new Date().getFullYear() - 2020}+
                </div>
                <div className="text-gray-400">
                  Years of Experience
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
