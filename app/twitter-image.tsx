import { ImageResponse } from 'next/og'
import fs from 'node:fs'
import path from 'node:path'

export const alt = 'Zainal Arifin - Engineering Manager & Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Image() {
  const photo = fs.readFileSync(path.join(process.cwd(), 'public/main/profile.jpeg'))
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#000000',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 8,
            background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 64px',
            width: 760,
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                background: '#3b82f6',
                color: 'white',
                fontSize: 16,
                fontWeight: 700,
                marginRight: 12,
              }}
            >
              ZA
            </div>
            <div style={{ display: 'flex', color: '#9ca3af', fontSize: 18 }}>zainalarifin.id</div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              padding: '6px 16px',
              borderRadius: 999,
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: '#34d399',
                marginRight: 8,
                display: 'flex',
              }}
            />
            10+ years experience
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 52,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Zainal Arifin - Engineering Manager &amp; Developer
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#9ca3af',
              lineHeight: 1.4,
              marginBottom: 36,
              maxWidth: 620,
            }}
          >
            Engineering Manager &amp; Senior Full-Stack Developer crafting scalable web and mobile applications from Bandung, Indonesia.
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              padding: '14px 28px',
              borderRadius: 10,
              background: '#3b82f6',
              color: 'white',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            View Portfolio
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 440,
            height: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 340,
              height: 340,
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.18)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.18)',
              top: 100,
              left: 60,
              display: 'flex',
            }}
          />
          <img
            src={photoSrc}
            width={300}
            height={300}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid rgba(255,255,255,0.08)',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
