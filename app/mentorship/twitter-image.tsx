import { ImageResponse } from 'next/og'
import { ogImageJsx } from '../../lib/og-image'

export const alt = 'Mentorship with Zainal Arifin'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    ogImageJsx({
      badge: '1-on-1 mentoring',
      title: 'Mentorship with Zainal Arifin',
      description:
        '1-on-1 mentoring programs from an Engineering Manager with 10+ years of hiring and mentoring experience.',
      cta: 'Book a Session',
    }),
    { ...size }
  )
}
