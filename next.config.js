/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep production tracing inside this app when a parent folder also has a lockfile.
  outputFileTracingRoot: __dirname,
  // Keep SEO metadata in the document head for raw-HTML crawlers and audit tools.
  htmlLimitedBots: /.*/,
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
  // Disable Next.js' built-in 308 trailing-slash normalization so every
  // public URL variant can be consolidated with an explicit 301 in middleware.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/fps-calculator',
        destination: '/en/fps-calculator',
        statusCode: 301,
      },
      {
        source: '/index',
        destination: '/en',
        statusCode: 301,
      },
      {
        source: '/index.html',
        destination: '/en',
        statusCode: 301,
      },
      {
        source: '/apple-touch-icon-precomposed.png',
        destination: '/apple-touch-icon.png',
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
