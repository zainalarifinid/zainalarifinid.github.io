'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import TechIcon from '../TechIcon'

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  imageUrl: string
  tags: string[]
  liveUrl: string
  sourceUrl: string
  featured?: boolean
}

export default function ProjectCard({
  slug,
  title,
  description,
  imageUrl,
  tags,
  liveUrl,
  sourceUrl,
  featured,
}: ProjectCardProps) {
  return (
    <LazyMotion features={domAnimation} strict>
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {featured && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <Link href={`/showcase/${slug}`}>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
            {title}
          </h3>
        </Link>

        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          {description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
            >
              <TechIcon tag={tag} size={13} />
              {tag}
            </span>
          ))}
        </div>

        {/* Always-visible CTAs (no hover dependency, so they work on touch devices) */}
        {(liveUrl || sourceUrl) && (
          <div className="flex gap-2">
            {liveUrl && (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200"
              >
                <ExternalLink size={14} />
                Live Demo
              </Link>
            )}
            {sourceUrl && (
              <Link
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200"
              >
                <Github size={14} />
                Source Code
              </Link>
            )}
          </div>
        )}
      </div>
    </m.div>
    </LazyMotion>
  )
}
