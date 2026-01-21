/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pcbuildcheck.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['*/thank-you'],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // block API routes
          '/404',         // block error page
          '/500',         // block server error page
        ],
      },
    ],
  },
};

