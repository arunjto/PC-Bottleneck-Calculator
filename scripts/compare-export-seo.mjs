import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baselineArg = process.argv.find((argument) => argument.startsWith('--baseline='));
if (!baselineArg) {
  console.error('Usage: node scripts/compare-export-seo.mjs --baseline=<baseline-app-directory>');
  process.exit(1);
}

const baselineRoot = path.resolve(baselineArg.slice('--baseline='.length));
const outputRoot = path.join(projectRoot, 'out');
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
  });
}

function attribute(tag, name) {
  return tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'))?.[1] ?? '';
}

function seoSnapshot(html) {
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const languages = links
    .filter((tag) => attribute(tag, 'rel') === 'alternate' && attribute(tag, 'hreflang'))
    .map((tag) => `${attribute(tag, 'hreflang')}=${attribute(tag, 'href')}`)
    .sort();

  return {
    title: html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '',
    description: attribute(
      metas.find((tag) => attribute(tag, 'name').toLowerCase() === 'description') ?? '',
      'content',
    ),
    robots: attribute(
      metas.find((tag) => attribute(tag, 'name').toLowerCase() === 'robots') ?? '',
      'content',
    ),
    canonical: attribute(
      links.find((tag) => attribute(tag, 'rel') === 'canonical') ?? '',
      'href',
    ),
    languages,
  };
}

const baselineFiles = walk(baselineRoot).filter(
  (file) => file.endsWith('.html') && path.basename(file) !== '_not-found.html',
);

for (const baselineFile of baselineFiles) {
  const relativePath = path.relative(baselineRoot, baselineFile);
  const exportedFile = path.join(outputRoot, relativePath);
  if (!fs.existsSync(exportedFile)) {
    failures.push(`Missing exported HTML: ${relativePath}`);
    continue;
  }

  const baselineSeo = seoSnapshot(fs.readFileSync(baselineFile, 'utf8'));
  const exportedSeo = seoSnapshot(fs.readFileSync(exportedFile, 'utf8'));
  if (JSON.stringify(baselineSeo) !== JSON.stringify(exportedSeo)) {
    failures.push(`SEO metadata changed: ${relativePath}`);
  }
}

if (failures.length > 0) {
  console.error('Static export SEO parity failed:');
  failures.slice(0, 50).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 50) console.error(`- ...and ${failures.length - 50} more`);
  process.exit(1);
}

console.log(
  `Static export SEO parity passed for ${baselineFiles.length} baseline pages (title, description, robots, canonical and hreflang).`,
);

