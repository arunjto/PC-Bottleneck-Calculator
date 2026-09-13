import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const quotedValues = (source) => [...source.matchAll(/'([^']+)'/g)].map((match) => match[1]);
const failures = [];

const toolsSource = read('lib/pc-tools.ts');
const toolListBlock = toolsSource.match(/export const TOOL_SLUGS = \[([\s\S]*?)\] as const/);
if (!toolListBlock) {
  failures.push('Could not read TOOL_SLUGS from lib/pc-tools.ts.');
}
const toolSlugs = new Set(toolListBlock ? quotedValues(toolListBlock[1]) : []);

const buildsSource = read('lib/popular-builds.ts');
const buildSlugs = new Set(
  [...buildsSource.matchAll(/^\s{4}slug: '([^']+)',/gm)].map((match) => match[1]),
);

const resourcesSource = read('lib/blog-resource-links.ts');
const resourceMapBlock = resourcesSource.match(
  /export const BLOG_RESOURCE_LINKS:[\s\S]*?= \{([\s\S]*?)^\};/m,
);
if (!resourceMapBlock) {
  failures.push('Could not read BLOG_RESOURCE_LINKS from lib/blog-resource-links.ts.');
}

const resourceMapSource = resourceMapBlock?.[1] ?? '';
const mappedPostSlugs = new Set(
  [...resourceMapSource.matchAll(/^\s{2}'([^']+)':/gm)].map((match) => match[1]),
);
const mappedToolSlugs = [...resourcesSource.matchAll(/tools: \[([^\]]*)\]/g)].flatMap(
  (match) => quotedValues(match[1]),
);
const mappedBuildSlugs = [...resourcesSource.matchAll(/builds: \[([^\]]*)\]/g)].flatMap(
  (match) => quotedValues(match[1]),
);

for (const slug of mappedToolSlugs) {
  if (!toolSlugs.has(slug)) failures.push(`Unknown tool in blog resource map: ${slug}`);
}
for (const slug of mappedBuildSlugs) {
  if (!buildSlugs.has(slug)) failures.push(`Unknown build in blog resource map: ${slug}`);
}

const blogRoot = path.join(root, 'content', 'blog');
const englishPostSlugs = fs
  .readdirSync(blogRoot, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
  .map((entry) => entry.name.replace(/\.mdx$/, ''));

for (const slug of englishPostSlugs) {
  if (!mappedPostSlugs.has(slug)) failures.push(`Blog post has no resource map entry: ${slug}`);
}

const pathTranslations = JSON.parse(read('lib/path-translations.json'));
const locales = Object.keys(pathTranslations);
for (const locale of locales) {
  const localizedToolPaths = new Set();
  for (const slug of toolSlugs) {
    const canonicalPath = `tools/${slug}`;
    const translatedPath = pathTranslations[locale]?.[canonicalPath];
    if (!translatedPath) {
      failures.push(`Missing ${locale} path translation for ${canonicalPath}`);
      continue;
    }
    if (localizedToolPaths.has(translatedPath)) {
      failures.push(`Duplicate ${locale} tool path translation: ${translatedPath}`);
    }
    localizedToolPaths.add(translatedPath);
  }
}

const mdxFiles = [];
for (const entry of fs.readdirSync(blogRoot, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.mdx')) {
    mdxFiles.push({ locale: 'en', filePath: path.join(blogRoot, entry.name) });
  } else if (entry.isDirectory() && locales.includes(entry.name)) {
    const localeDir = path.join(blogRoot, entry.name);
    for (const localizedEntry of fs.readdirSync(localeDir, { withFileTypes: true })) {
      if (localizedEntry.isFile() && localizedEntry.name.endsWith('.mdx')) {
        mdxFiles.push({ locale: entry.name, filePath: path.join(localeDir, localizedEntry.name) });
      }
    }
  }
}

for (const { locale, filePath } of mdxFiles) {
  const source = fs.readFileSync(filePath, 'utf8');
  const validLocalizedToolPaths = [...toolSlugs].map(
    (slug) => `/${locale}/${pathTranslations[locale][`tools/${slug}`]}`,
  );
  if (!validLocalizedToolPaths.some((toolPath) => source.includes(toolPath))) {
    failures.push(
      `Blog post needs a locale-matched contextual tool link: ${path.relative(root, filePath)}`,
    );
  }
}

if (failures.length > 0) {
  console.error('Internal-link checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Internal-link checks passed: ${mdxFiles.length} posts, ${toolSlugs.size} tools, ${buildSlugs.size} builds, ${locales.length} locales.`,
);
