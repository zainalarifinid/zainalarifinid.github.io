/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  images: {
    unoptimized: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  allowedDevOrigins: ['zainal-thinkpad'],
  // Compression
  compress: true,
  // Turbopack config (Next.js 16 default)
  turbopack: {},
}

module.exports = nextConfig
