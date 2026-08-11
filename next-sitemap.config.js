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
  additionalPaths: async (config) => {
    const entries = [];
    for (const [locale, translations] of Object.entries(publicPaths)) {
      for (const canonicalPath of Object.keys(translations)) {
        const shouldAddExplicitly =
          canonicalPath === 'psu-calculator' || canonicalPath.startsWith('tools/');
        if (!shouldAddExplicitly) continue;
        const entry = await config.transform(config, `/${locale}/${canonicalPath}`);
        if (entry) entries.push(entry);
      }
    }
    return entries;
  },
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
