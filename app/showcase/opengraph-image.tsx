import { ImageResponse } from 'next/og'
import { ogImageJsx } from '../../lib/og-image'

export const alt = 'Projects & Case Studies by Zainal Arifin'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    ogImageJsx({
      badge: 'Featured work',
      title: 'Projects & Case Studies by Zainal Arifin',
      description:
        'A collection of projects and case studies — from micro-frontend architectures and real-time systems to mobile apps and enterprise solutions.',
      cta: 'View Portfolio',
    }),
    { ...size }
  )
}
