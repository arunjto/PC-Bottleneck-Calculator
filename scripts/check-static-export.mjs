import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'out');
const require = createRequire(import.meta.url);
const translations = require(path.join(projectRoot, 'lib', 'path-translations.json'));
const { buildLocalizedRewrites } = require(
  path.join(projectRoot, 'lib', 'routing-rules.cjs'),
);
const failures = [];

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
  });
}

function htmlPath(route) {
  const cleanRoute = route.replace(/^\//, '');
  return path.join(outputRoot, `${cleanRoute}.html`);
}

if (!fs.existsSync(outputRoot)) failures.push('Missing static export directory: out/.');

const htmlFiles = walk(outputRoot).filter((file) => file.endsWith('.html'));
if (htmlFiles.length < 363) {
  failures.push(`Expected at least 363 exported HTML files; found ${htmlFiles.length}.`);
}

const requiredCanonicalPaths = [
  '',
  'about',
  'author',
  'blog',
  'builds',
  'can-i-run',
  'contact',
  'cookie-policy',
  'disclaimer',
  'fps-calculator',
  'methodology',
  'privacy',
  'psu-calculator',
  'terms',
  'thank-you',
  'tools',
];

for (const [locale, localeTranslations] of Object.entries(translations)) {
  for (const canonicalPath of requiredCanonicalPaths) {
    const route = `/${locale}${canonicalPath ? `/${canonicalPath}` : ''}`;
    if (!fs.existsSync(htmlPath(route))) failures.push(`Missing exported route: ${route}`);
  }

  for (const canonicalPath of Object.keys(localeTranslations)) {
    const route = `/${locale}/${canonicalPath}`;
    if (!fs.existsSync(htmlPath(route))) failures.push(`Missing exported route: ${route}`);
  }
}

const rewriteKeys = new Set(
  buildLocalizedRewrites().map((rewrite) => `${rewrite.source}:${rewrite.destination}`),
);
for (const [locale, localeTranslations] of Object.entries(translations)) {
  for (const [canonicalPath, localizedPath] of Object.entries(localeTranslations)) {
    if (canonicalPath === localizedPath) continue;
    const expected = `/${locale}/${localizedPath}:/${locale}/${canonicalPath}`;
    if (!rewriteKeys.has(expected)) failures.push(`Missing localized rewrite: ${expected}`);
  }
}

const rssCandidates = [path.join(outputRoot, 'api', 'rss'), path.join(outputRoot, 'api', 'rss.txt')];
if (!rssCandidates.some((file) => fs.existsSync(file))) {
  failures.push('Missing statically exported RSS route at /api/rss.');
}

if (!fs.existsSync(path.join(outputRoot, '404.html'))) {
  failures.push('Missing exported 404 page.');
}

const sitemap = fs.readFileSync(path.join(projectRoot, 'public', 'sitemap-0.xml'), 'utf8');
for (const locale of Object.keys(translations)) {
  const buildsUrl = `https://www.pcbuildcheck.com/${locale}/builds`;
  if (!sitemap.includes(`<loc>${buildsUrl}</loc>`)) {
    failures.push(`Sitemap missing builds listing: ${buildsUrl}`);
  }
}

const robots = fs.readFileSync(path.join(projectRoot, 'public', 'robots.txt'), 'utf8');
if (!/^Allow: \/api\/rss$/m.test(robots)) failures.push('robots.txt must explicitly allow /api/rss.');
if (!/^Disallow: \/api\/$/m.test(robots)) failures.push('robots.txt must retain the /api/ disallow.');

if (failures.length > 0) {
  console.error('Static export checks failed:');
  failures.slice(0, 50).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 50) console.error(`- ...and ${failures.length - 50} more`);
  process.exit(1);
}

console.log(
  `Static export checks passed: ${htmlFiles.length} HTML files, ${Object.keys(translations).length} locales, RSS and deployment routing verified.`,
);

