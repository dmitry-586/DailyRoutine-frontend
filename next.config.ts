import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't.me',
      },
      {
        protocol: 'https',
        hostname: 'telegram.org',
      },
      {
        protocol: 'https',
        hostname: 'api.telegram.org',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
