import { ImageResponse } from 'next/og'
import { ogImageJsx } from '../../lib/og-image'

export const alt = 'Contact Zainal Arifin'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    ogImageJsx({
      badge: "Let's connect",
      title: 'Contact Zainal Arifin',
      description:
        'Get in touch — open to collaboration, freelance projects, and engineering management opportunities.',
      cta: 'Get in Touch',
    }),
    { ...size }
  )
}
