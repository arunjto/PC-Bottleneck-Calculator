const publicPaths = require('./lib/path-translations.json');

const popularBuildSlugs = [
  'core-i5-12600k-rtx-4060',
  'core-i5-14600k-rtx-4070-super',
  'ryzen-5-5600x-rtx-4060',
  'ryzen-5-7600x-rx-7800-xt',
  'ryzen-7-7800x3d-rtx-5070',
  'ryzen-7-9800x3d-rtx-5080',
];

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
          canonicalPath === 'fps-calculator' ||
          canonicalPath === 'psu-calculator' ||
          canonicalPath.startsWith('tools/');
        if (!shouldAddExplicitly) continue;
        const entry = await config.transform(config, `/${locale}/${canonicalPath}`);
        if (entry) entries.push(entry);
      }

      for (const slug of popularBuildSlugs) {
        const entry = await config.transform(config, `/${locale}/builds/${slug}`);
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
