/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['framer-motion'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['i.imgur.com', 'images.pexels.com']
  },
  experimental: {
    optimizeCss: true,
    cssChunking: 'strict',
    inlineCss: true, // Critical for static exports
  },
  // Ensure CSS is properly handled
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
