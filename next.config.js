/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // unoptimized: true, // Enabled image optimization
    domains: ['i.imgur.com', 'images.pexels.com']
  },
  experimental: {
    // optimizeCss: true, // Disabled to fix missing styles
  },
  // Ensure CSS is properly handled
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
