import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@medicare/ui', '@medicare/types'],
}

export default nextConfig
