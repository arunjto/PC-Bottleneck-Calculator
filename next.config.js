const pathTranslations = require('./lib/path-translations.json');

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

/**
 * Build CDN-level redirect rules for every known public route variant.
 * Explicit statusCode values keep the site's established 301 behaviour;
 * `permanent: true` is intentionally avoided because Next.js maps it to 308.
 */
function buildLocalizedRedirects() {
  const rules = [
    permanentRedirect('/', `/${DEFAULT_LOCALE}`),
    permanentRedirect('/index', `/${DEFAULT_LOCALE}`),
    permanentRedirect('/index.html', `/${DEFAULT_LOCALE}`),
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

    // Blog and build slugs are already public paths, so only normalize their
    // optional trailing slash at the CDN routing layer.
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

  // Supported locale-less routes retain their previous single-hop migration
  // to English. Unknown paths now return a direct 404 instead of redirecting
  // to a localized 404 page.
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
    permanentRedirect(
      '/blog/:path*',
      `/${DEFAULT_LOCALE}/blog/:path*`
    ),
    permanentRedirect(
      '/builds/:path*',
      `/${DEFAULT_LOCALE}/builds/:path*`
    )
  );

  return dedupeRules(rules);
}

/**
 * Resolve localized public paths to the existing App Router filesystem paths
 * without a request-wide Routing Middleware invocation.
 */
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
    return buildLocalizedRedirects();
  },
  async rewrites() {
    return {
      beforeFiles: buildLocalizedRewrites(),
    };
  },
};

module.exports = nextConfig;
