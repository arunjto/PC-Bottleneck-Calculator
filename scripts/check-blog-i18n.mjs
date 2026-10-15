import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const nextConfig = require(path.join(projectRoot, 'next.config.js'));

const canonicalSlug = 'best-gpu-for-gaming-2026';
const expectedSlugs = {
  en: canonicalSlug,
  it: 'migliori-gpu-per-gaming-2026',
  fr: 'meilleures-gpu-pour-gaming-2026',
  de: 'beste-gpu-fuer-gaming-2026',
  es: 'mejores-gpu-para-gaming-2026',
  ru: 'luchshie-videokarty-dlya-igr-2026',
};
const expectedLocales = Object.keys(expectedSlugs);
const failures = [];
const baseUrlArg = process.argv.find((argument) => argument.startsWith('--base-url='));
const baseUrl = baseUrlArg?.slice('--base-url='.length).replace(/\/$/, '');
const siteUrl = 'https://www.pcbuildcheck.com';

function parseMdx(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: '', content: source };
  return { frontmatter: match[1], content: match[2] };
}

const englishPath = path.join(projectRoot, 'content', 'blog', `${canonicalSlug}.mdx`);
const englishPost = parseMdx(fs.readFileSync(englishPath, 'utf8'));
const localesLine = `locales: [${expectedLocales.map((locale) => `"${locale}"`).join(', ')}]`;
if (!englishPost.frontmatter.split(/\r?\n/).includes(localesLine)) {
  failures.push(
    `English frontmatter locales must be ${JSON.stringify(expectedLocales)}.`,
  );
}

const translationsSource = fs.readFileSync(
  path.join(projectRoot, 'lib', 'blog-slug-translations.ts'),
  'utf8',
);
for (const [locale, slug] of Object.entries(expectedSlugs)) {
  const mapping = `'${canonicalSlug}': '${slug}'`;
  const localeBlock = translationsSource.match(
    new RegExp(`\\b${locale}: \\{([\\s\\S]*?)\\n  \\}`),
  )?.[1];
  if (!localeBlock?.includes(mapping)) {
    failures.push(`Missing ${locale} slug mapping: ${mapping}`);
  }

  const postPath = locale === 'en'
    ? englishPath
    : path.join(projectRoot, 'content', 'blog', locale, `${slug}.mdx`);
  if (!fs.existsSync(postPath)) {
    failures.push(`Missing localized article: ${path.relative(projectRoot, postPath)}`);
  }
}

const russianPath = path.join(
  projectRoot,
  'content',
  'blog',
  'ru',
  `${expectedSlugs.ru}.mdx`,
);
if (fs.existsSync(russianPath)) {
  const russianPost = parseMdx(fs.readFileSync(russianPath, 'utf8'));
  if (!/[А-Яа-яЁё]/.test(`${russianPost.frontmatter}\n${russianPost.content}`)) {
    failures.push('Russian article does not contain Russian-language content.');
  }
  if (russianPost.content === englishPost.content) {
    failures.push('Russian article must not reuse the English fallback content.');
  }
}

const redirects = await nextConfig.redirects();
const russianRedirect = redirects.filter(
  (rule) => rule.source === '/ru/blog/best-gpu-for-gaming-2026',
);
if (
  russianRedirect.length !== 1 ||
  russianRedirect[0].destination !== '/ru/blog/luchshie-videokarty-dlya-igr-2026' ||
  russianRedirect[0].statusCode !== 301
) {
  failures.push('Missing exact permanent 301 redirect for the legacy Russian blog URL.');
}

function readLinkMetadata(html) {
  const metadata = { canonical: '', languages: new Map() };
  for (const link of html.match(/<link\b[^>]*>/gi) ?? []) {
    const attributes = new Map(
      [...link.matchAll(/([:\w-]+)="([^"]*)"/g)].map((match) => [
        match[1].toLowerCase(),
        match[2],
      ]),
    );
    if (attributes.get('rel') === 'canonical') {
      metadata.canonical = attributes.get('href') ?? '';
    }
    if (attributes.get('rel') === 'alternate' && attributes.has('hreflang')) {
      metadata.languages.set(attributes.get('hreflang'), attributes.get('href'));
    }
  }
  return metadata;
}

if (baseUrl) {
  const expectedUrls = Object.fromEntries(
    Object.entries(expectedSlugs).map(([locale, slug]) => [
      locale,
      `${siteUrl}/${locale}/blog/${slug}`,
    ]),
  );

  for (const [locale, slug] of Object.entries(expectedSlugs)) {
    const response = await fetch(`${baseUrl}/${locale}/blog/${slug}`);
    if (response.status !== 200) {
      failures.push(`${locale} article returned HTTP ${response.status}.`);
      continue;
    }
    const html = await response.text();
    const metadata = readLinkMetadata(html);
    if (metadata.canonical !== expectedUrls[locale]) {
      failures.push(
        `${locale} canonical was ${metadata.canonical || '(missing)'}; expected ${expectedUrls[locale]}.`,
      );
    }
    for (const [alternateLocale, alternateUrl] of Object.entries(expectedUrls)) {
      if (metadata.languages.get(alternateLocale) !== alternateUrl) {
        failures.push(
          `${locale} page is missing reciprocal ${alternateLocale} hreflang ${alternateUrl}.`,
        );
      }
    }
    if (metadata.languages.get('x-default') !== expectedUrls.en) {
      failures.push(`${locale} page has a missing or incorrect x-default hreflang.`);
    }
    if (
      locale === 'ru' &&
      (!html.includes('Как выбрать видеокарту для игр в 2026 году') ||
        html.includes('Gaming GPU Buying Guide 2026'))
    ) {
      failures.push('Russian route rendered missing or English fallback article content.');
    }
  }

  const redirectResponse = await fetch(
    `${baseUrl}/ru/blog/${canonicalSlug}`,
    { redirect: 'manual' },
  );
  if (
    redirectResponse.status !== 301 ||
    redirectResponse.headers.get('location') !==
      '/ru/blog/luchshie-videokarty-dlya-igr-2026'
  ) {
    failures.push(
      `Legacy Russian URL returned ${redirectResponse.status} to ${redirectResponse.headers.get('location')}; expected a 301 to the localized slug.`,
    );
  }

  const sitemapResponse = await fetch(`${baseUrl}/sitemap-0.xml`);
  const sitemap = await sitemapResponse.text();
  for (const [locale, expectedUrl] of Object.entries(expectedUrls)) {
    if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) {
      failures.push(`Sitemap is missing the ${locale} article URL ${expectedUrl}.`);
    }
  }
}

if (failures.length > 0) {
  console.error('Blog localization checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Blog localization checks passed: ${expectedLocales.length} reciprocal locale files and Russian 301 redirect verified${baseUrl ? ' end to end' : ''}.`,
);
