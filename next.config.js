/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep production tracing inside this app when a parent folder also has a lockfile.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp'], // Serve modern image formats on mobile
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
    minimumCacheTTL: 86400, // Cache optimized images for 24 hours
  },
  experimental: {
    optimizeCss: true, // Inline critical CSS → eliminates render-blocking stylesheet
  },
  // Ensure CSS is properly handled
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      {
        source: '/apple-touch-icon-precomposed.png',
        destination: '/apple-touch-icon.png',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
