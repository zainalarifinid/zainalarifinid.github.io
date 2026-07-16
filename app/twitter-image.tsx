import { ImageResponse } from 'next/og'
import { ogImageJsx } from '../lib/og-image'

export const alt = 'Zainal Arifin - Engineering Manager & Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    ogImageJsx({
      badge: '10+ years experience',
      title: 'Zainal Arifin - Engineering Manager & Developer',
      description:
        'Engineering Manager & Senior Full-Stack Developer crafting scalable web and mobile applications from Bandung, Indonesia.',
      cta: 'View Portfolio',
    }),
    { ...size }
  )
}
