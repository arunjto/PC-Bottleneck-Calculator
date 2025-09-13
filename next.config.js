/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['framer-motion'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['i.imgur.com', 'images.pexels.com'],
  },
  experimental: {
    optimizeCss: true,
  },

  // 🚀 Add this section for the .html to non-.html redirect
  async redirects() {
    return [
      {
        source: '/:path*.html',  // Match ANY URL ending with .html
        destination: '/:path*',  // Redirect to same URL without .html
        permanent: true,         // 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;