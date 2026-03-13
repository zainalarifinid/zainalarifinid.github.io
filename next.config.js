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
  // Compression
  compress: true,
  // Turbopack config (Next.js 16 default)
  turbopack: {},
  // Webpack optimizations (used during production build)
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Minify and optimize bundle
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 1,
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig
