import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap-0.xml');
const translations = JSON.parse(fs.readFileSync(path.join(projectRoot, 'lib', 'path-translations.json'), 'utf8'));
const policy = JSON.parse(fs.readFileSync(path.join(projectRoot, 'lib', 'indexing-policy.json'), 'utf8'));
const xml = fs.readFileSync(sitemapPath, 'utf8');
const siteUrl = 'https://www.pcbuildcheck.com';

const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
  const block = match[1];
  return {
    loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  };
});
const locations = entries.map((entry) => entry.loc).filter(Boolean);
const uniqueLocations = new Set(locations);

if (locations.length !== uniqueLocations.size) {
  throw new Error(`Sitemap contains ${locations.length - uniqueLocations.size} duplicate URL(s).`);
}

const requiredIndexableUrls = [];
const expectedDatedUrls = new Map();
for (const [locale, localePaths] of Object.entries(translations)) {
  for (const canonicalPath of policy.requiredIndexablePaths) {
    requiredIndexableUrls.push(`${siteUrl}/${locale}/${localePaths[canonicalPath]}`);
  }
  for (const [canonicalPath, updateDate] of Object.entries(policy.corePageUpdates)) {
    expectedDatedUrls.set(`${siteUrl}/${locale}/${localePaths[canonicalPath]}`, updateDate);
  }
  for (const slug of policy.priorityToolSlugs) {
    expectedDatedUrls.set(
      `${siteUrl}/${locale}/${localePaths[`tools/${slug}`]}`,
      policy.priorityToolsUpdated,
    );
  }
  for (const slug of policy.popularBuildSlugs) {
    expectedDatedUrls.set(`${siteUrl}/${locale}/builds/${slug}`, policy.popularBuildsUpdated);
  }
}

const missingIndexableUrls = requiredIndexableUrls.filter((url) => !uniqueLocations.has(url));
if (missingIndexableUrls.length > 0) {
  throw new Error(`Required indexable URL(s) missing from sitemap:\n${missingIndexableUrls.join('\n')}`);
}

const entryByLocation = new Map(entries.map((entry) => [entry.loc, entry]));
const missingDates = [...expectedDatedUrls].filter(
  ([url, expectedDate]) => entryByLocation.get(url)?.lastmod !== expectedDate,
);
if (missingDates.length > 0) {
  throw new Error(
    `Priority URL(s) missing truthful lastmod:\n${missingDates
      .map(([url, expectedDate]) => `${url} (expected ${expectedDate})`)
      .join('\n')}`,
  );
}

const unexpectedDates = entries.filter((entry) => entry.lastmod && !expectedDatedUrls.has(entry.loc));
if (unexpectedDates.length > 0) {
  throw new Error(`Unexpected lastmod URL(s):\n${unexpectedDates.map((entry) => entry.loc).join('\n')}`);
}

console.log(`Sitemap checks passed: ${locations.length} unique URLs, ${expectedDatedUrls.size} dated priority URLs, ${requiredIndexableUrls.length} required indexable URLs present.`);
