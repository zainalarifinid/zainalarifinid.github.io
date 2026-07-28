import { ImageResponse } from 'next/og'
import { ogImageJsx } from '../../lib/og-image'

export const alt = 'Work With Me — Zainal Arifin'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  return new ImageResponse(
    ogImageJsx({
      badge: 'Freelance, consulting & mentorship',
      title: 'Let’s Build, Scale, and Solve Together',
      description:
        'Practical solutions and guidance from an Engineering Manager with 10+ years building, scaling, and shipping software with high-performing teams.',
      cta: "Let's Talk",
    }),
    { ...size }
  )
}
