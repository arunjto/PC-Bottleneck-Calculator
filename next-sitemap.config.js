const publicPaths = require('./lib/path-translations.json');

function toPublicPath(route) {
  const match = route.match(/^\/([a-z]{2})(?:\/(.+))?$/);
  if (!match) return route;
  const [, locale, canonicalPath] = match;
  if (!canonicalPath) return route;
  const localized = publicPaths[locale]?.[canonicalPath];
  return localized ? `/${locale}/${localized}` : route;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pcbuildcheck.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  autoLastmod: false,
  exclude: [
    '*/thank-you',
    '*/blog/category/*',
    '*/blog/tag/*',
  ],
  transform: async (config, route) => ({
    loc: toPublicPath(route),
    changefreq: config.changefreq,
    priority: config.priority,
  }),
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/404', '/500'],
      },
    ],
  },
};
