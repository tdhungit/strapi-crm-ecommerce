import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { serverMinification: false },
  reactComponentAnnotation: {
    enabled: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
