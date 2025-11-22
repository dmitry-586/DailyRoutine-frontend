import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['t.me', 'telegram.org'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
