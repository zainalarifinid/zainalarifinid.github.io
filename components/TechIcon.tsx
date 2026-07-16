import {
  SiNextdotjs,
  SiFirebase,
  SiWordpress,
  SiPhp,
  SiJquery,
  SiJavascript,
  SiMysql,
  SiVuedotjs,
  SiExpress,
  SiNodedotjs,
  SiDotnet,
  SiLinux,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiGithub,
  SiGooglecloud,
  SiElevenlabs,
  SiClaude,
} from 'react-icons/si'
import { Database, Webhook, Radio, Hash, Video, Code2, LucideIcon } from 'lucide-react'
import { IconType } from 'react-icons'

interface TechIconEntry {
  icon: IconType | LucideIcon
  color: string
}

// Tag name (lowercased) -> brand icon + brand color. Anything not listed here
// falls back to a generic code icon so new tags never break rendering.
const TECH_ICON_MAP: Record<string, TechIconEntry> = {
  'next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  firebase: { icon: SiFirebase, color: '#FFCA28' },
  firestore: { icon: SiFirebase, color: '#FFCA28' },
  'cloud functions': { icon: SiGooglecloud, color: '#4285F4' },
  elevenlabs: { icon: SiElevenlabs, color: '#FFFFFF' },
  rrweb: { icon: Video, color: '#F97316' },
  'claude api': { icon: SiClaude, color: '#D97757' },
  wordpress: { icon: SiWordpress, color: '#21759B' },
  php: { icon: SiPhp, color: '#777BB4' },
  jquery: { icon: SiJquery, color: '#0769AD' },
  javascript: { icon: SiJavascript, color: '#F7DF1E' },
  mysql: { icon: SiMysql, color: '#4479A1' },
  'vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'express.js': { icon: SiExpress, color: '#FFFFFF' },
  'node.js': { icon: SiNodedotjs, color: '#339933' },
  sql: { icon: Database, color: '#38BDF8' },
  'rest api': { icon: Webhook, color: '#38BDF8' },
  'c#': { icon: Hash, color: '#9B4F96' },
  '.net': { icon: SiDotnet, color: '#512BD4' },
  websocket: { icon: Radio, color: '#38BDF8' },
  linux: { icon: SiLinux, color: '#FCC624' },
  typescript: { icon: SiTypescript, color: '#3178C6' },
  'tailwind css': { icon: SiTailwindcss, color: '#38BDF8' },
  postgresql: { icon: SiPostgresql, color: '#4169E1' },
  github: { icon: SiGithub, color: '#FFFFFF' },
}

const FALLBACK: TechIconEntry = { icon: Code2, color: '#9CA3AF' }

export function getTechIcon(tag: string): TechIconEntry {
  return TECH_ICON_MAP[tag.toLowerCase()] ?? FALLBACK
}

interface TechIconProps {
  tag: string
  size?: number
  className?: string
}

export default function TechIcon({ tag, size = 16, className = '' }: TechIconProps) {
  const { icon: Icon, color } = getTechIcon(tag)
  return <Icon size={size} className={className} style={{ color }} />
}
