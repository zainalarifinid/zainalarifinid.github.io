import { ImageResponse } from 'next/og'
import { ogImageJsx } from '../../lib/og-image'

export const alt = 'About Zainal Arifin'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    ogImageJsx({
      badge: '10+ years experience',
      title: 'About Zainal Arifin',
      description:
        'Engineering Manager & Senior Full-Stack Developer with 10+ years of experience building web and mobile applications.',
      cta: 'Read More',
    }),
    { ...size }
  )
}
