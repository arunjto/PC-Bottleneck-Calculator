const {
  buildLocalizedRedirects,
  buildLocalizedRewrites,
  buildStaticHeaders,
} = require('./lib/routing-rules.cjs');

const isDevelopment = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every route is generated at build time and deployed as a static asset.
  output: 'export',
  // Keep SEO metadata in the document head for raw-HTML crawlers and audit tools.
  htmlLimitedBots: /.*/,
  images: {
    // The Vercel Image Optimization function is unavailable (and unnecessary)
    // for a complete static export. Existing dimensions and lazy loading remain
    // handled by next/image in the browser.
    unoptimized: true,
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
  // public URL variant can be consolidated with an explicit deployment 301.
  skipTrailingSlashRedirect: true,
  // next dev still mirrors production routing. Production uses vercel.json,
  // because Next static export does not support framework redirects/rewrites.
  ...(isDevelopment
    ? {
        async headers() {
          return buildStaticHeaders();
        },
        async redirects() {
          return buildLocalizedRedirects();
        },
        async rewrites() {
          return { beforeFiles: buildLocalizedRewrites() };
        },
      }
    : {}),
};

module.exports = nextConfig;
