import { ImageResponse } from 'next/og'
import { ogImageJsx } from '../../lib/og-image'

export const alt = 'Articles & Insights by Zainal Arifin'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    ogImageJsx({
      badge: 'Articles & insights',
      title: 'Articles & Insights by Zainal Arifin',
      description:
        'Thoughts on software development, technology trends, and lessons learned from building web and mobile applications.',
      cta: 'Read Articles',
    }),
    { ...size }
  )
}
