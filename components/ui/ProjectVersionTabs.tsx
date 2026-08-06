'use client'

import { useState, ReactNode } from 'react'

interface VersionTab {
  label: string
  date?: string
  node: ReactNode
}

interface ProjectVersionTabsProps {
  tabs: VersionTab[]
}

export default function ProjectVersionTabs({ tabs }: ProjectVersionTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = tabs[activeIndex]

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
              index === activeIndex
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active.date && (
        <p className="text-sm text-gray-500 mb-6">As of {active.date}</p>
      )}

      <article className="prose prose-invert prose-lg max-w-none">
        {active.node}
      </article>
    </div>
  )
}
