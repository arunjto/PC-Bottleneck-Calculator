const pathTranslations = require('./path-translations.json');

const DEFAULT_LOCALE = 'en';
const LOCALES = Object.keys(pathTranslations);

const permanentRedirect = (source, destination) => ({
  source,
  destination,
  statusCode: 301,
});

function dedupeRules(rules) {
  const seen = new Set();
  return rules.filter((rule) => {
    const key = `${rule.source}:${rule.destination}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildLocalizedRedirects() {
  const rules = [
    permanentRedirect('/', `/${DEFAULT_LOCALE}`),
    permanentRedirect('/index', `/${DEFAULT_LOCALE}`),
    permanentRedirect('/index.html', `/${DEFAULT_LOCALE}`),
    permanentRedirect(
      '/ru/blog/best-gpu-for-gaming-2026',
      '/ru/blog/luchshie-videokarty-dlya-igr-2026'
    ),
    permanentRedirect(
      '/apple-touch-icon-precomposed.png',
      '/apple-touch-icon.png'
    ),
  ];

  for (const locale of LOCALES) {
    rules.push(permanentRedirect(`/${locale}/`, `/${locale}`));

    for (const [canonicalPath, localizedPath] of Object.entries(
      pathTranslations[locale]
    )) {
      const internalUrl = `/${locale}/${canonicalPath}`;
      const publicUrl = `/${locale}/${localizedPath}`;

      if (internalUrl !== publicUrl) {
        rules.push(permanentRedirect(internalUrl, publicUrl));
        rules.push(permanentRedirect(`${internalUrl}/`, publicUrl));
      }

      rules.push(permanentRedirect(`${publicUrl}/`, publicUrl));
    }

    rules.push(
      permanentRedirect(`/${locale}/blog/`, `/${locale}/blog`),
      permanentRedirect(
        `/${locale}/blog/:path*/`,
        `/${locale}/blog/:path*`
      ),
      permanentRedirect(
        `/${locale}/builds/:path*/`,
        `/${locale}/builds/:path*`
      )
    );
  }

  for (const [canonicalPath, localizedPath] of Object.entries(
    pathTranslations[DEFAULT_LOCALE]
  )) {
    const destination = `/${DEFAULT_LOCALE}/${localizedPath}`;
    rules.push(permanentRedirect(`/${canonicalPath}`, destination));
    rules.push(permanentRedirect(`/${canonicalPath}/`, destination));
  }

  rules.push(
    permanentRedirect('/blog', `/${DEFAULT_LOCALE}/blog`),
    permanentRedirect('/blog/', `/${DEFAULT_LOCALE}/blog`),
    permanentRedirect('/blog/:path*', `/${DEFAULT_LOCALE}/blog/:path*`),
    permanentRedirect('/builds/:path*', `/${DEFAULT_LOCALE}/builds/:path*`)
  );

  return dedupeRules(rules);
}

function buildLocalizedRewrites() {
  const rules = [];

  for (const locale of LOCALES) {
    for (const [canonicalPath, localizedPath] of Object.entries(
      pathTranslations[locale]
    )) {
      if (canonicalPath === localizedPath) continue;
      rules.push({
        source: `/${locale}/${localizedPath}`,
        destination: `/${locale}/${canonicalPath}`,
      });
    }
  }

  return rules;
}

function buildStaticHeaders() {
  const durableAssetCache = {
    key: 'Cache-Control',
    value:
      'public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400',
  };

  return [
    { source: '/images/:path*', headers: [durableAssetCache] },
    { source: '/flags/:path*', headers: [durableAssetCache] },
    { source: '/logo.webp', headers: [durableAssetCache] },
    { source: '/og-image.png', headers: [durableAssetCache] },
    { source: '/og-image-fps.png', headers: [durableAssetCache] },
    { source: '/author-arun-kumar-yadav.jpg', headers: [durableAssetCache] },
    { source: '/favicon.ico', headers: [durableAssetCache] },
    { source: '/favicon-96x96.png', headers: [durableAssetCache] },
    { source: '/apple-touch-icon.png', headers: [durableAssetCache] },
    { source: '/icon-192.png', headers: [durableAssetCache] },
    { source: '/icon-512.png', headers: [durableAssetCache] },
    {
      // This legacy asset contains JPEG bytes despite its historical .png URL.
      // Preserve the indexed URL while serving the correct static MIME type.
      source: '/blog/what-is-pc-bottleneck.png',
      headers: [
        durableAssetCache,
        { key: 'Content-Type', value: 'image/jpeg' },
      ],
    },
    {
      source: '/api/rss',
      headers: [
        { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, stale-while-revalidate=600',
        },
      ],
    },
  ];
}

module.exports = {
  buildLocalizedRedirects,
  buildLocalizedRewrites,
  buildStaticHeaders,
};
