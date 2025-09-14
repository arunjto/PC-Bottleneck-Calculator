/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pcbuildcheck.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // block API routes
          '/_next/',      // block Next.js build files
          '/404',         // block error page
          '/500',         // block server error page
        ],
      },
    ],
  },
};

