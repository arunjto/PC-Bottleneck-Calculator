const publicPaths = require('./lib/path-translations.json');
const indexingPolicy = require('./lib/indexing-policy.json');

const priorityToolSlugs = new Set(indexingPolicy.priorityToolSlugs);

function toPublicPath(route) {
  const match = route.match(/^\/([a-z]{2})(?:\/(.+))?$/);
  if (!match) return route;
  const [, locale, canonicalPath] = match;
  if (!canonicalPath) return route;
  const localized = publicPaths[locale]?.[canonicalPath];
  return localized ? `/${locale}/${localized}` : route;
}

function getSignificantLastmod(route) {
  const match = route.match(/^\/[a-z]{2}\/(.+)$/);
  const canonicalPath = match?.[1];
  if (!canonicalPath) return undefined;

  if (indexingPolicy.corePageUpdates[canonicalPath]) {
    return indexingPolicy.corePageUpdates[canonicalPath];
  }
  if (canonicalPath.startsWith('builds/')) return indexingPolicy.popularBuildsUpdated;
  if (canonicalPath.startsWith('tools/')) {
    const slug = canonicalPath.slice('tools/'.length);
    if (priorityToolSlugs.has(slug)) return indexingPolicy.priorityToolsUpdated;
  }

  return undefined;
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
  transform: async (_config, route) => {
    const lastmod = getSignificantLastmod(route);
    return {
      loc: toPublicPath(route),
      ...(lastmod ? { lastmod } : {}),
    };
  },
  additionalPaths: async (config) => {
    const entries = [];
    for (const [locale, translations] of Object.entries(publicPaths)) {
      for (const canonicalPath of Object.keys(translations)) {
        const shouldAddExplicitly =
          canonicalPath === 'fps-calculator' ||
          canonicalPath === 'psu-calculator' ||
          canonicalPath === 'can-i-run' ||
          canonicalPath.startsWith('can-i-run/') ||
          canonicalPath.startsWith('tools/');
        if (!shouldAddExplicitly) continue;
        const entry = await config.transform(config, `/${locale}/${canonicalPath}`);
        if (entry) entries.push(entry);
      }

      for (const slug of indexingPolicy.popularBuildSlugs) {
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
