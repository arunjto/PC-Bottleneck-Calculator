import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrlArgument = process.argv.find((argument) => argument.startsWith('--base-url='));
const baseUrl = (baseUrlArgument?.slice('--base-url='.length) ?? 'http://127.0.0.1:3102').replace(/\/$/, '');
const sitemap = fs.readFileSync(path.join(projectRoot, 'public', 'sitemap-0.xml'), 'utf8');
const publicUrls = [...sitemap.matchAll(/<loc>https:\/\/www\.pcbuildcheck\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1]);
const failures = [];
const assetPaths = new Set();

function canonical(html) {
  return html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]
    ?? '';
}

for (const pathname of publicUrls) {
  const response = await fetch(`${baseUrl}${pathname}`, { redirect: 'manual' });
  if (response.status !== 200) {
    failures.push(`${pathname} returned ${response.status}`);
    continue;
  }
  if (pathname === '/api/rss') continue;
  const html = await response.text();
  for (const match of html.matchAll(/(?:src|href)=["'](\/_next\/static\/[^"']+)["']/g)) {
    assetPaths.add(match[1]);
  }
  const expectedCanonical = `https://www.pcbuildcheck.com${pathname}`;
  if (canonical(html) !== expectedCanonical) {
    failures.push(`${pathname} canonical mismatch: ${canonical(html) || '(missing)'}`);
  }
}

for (const assetPath of assetPaths) {
  const response = await fetch(`${baseUrl}${assetPath}`);
  if (response.status !== 200) failures.push(`Static asset ${assetPath} returned ${response.status}.`);
}

const redirects = [
  ['/', 301, '/en'],
  ['/it/fps-calculator', 301, '/it/calcolatore-fps'],
  ['/fr/psu-calculator', 301, '/fr/calculateur-alimentation'],
  ['/ru/blog/best-gpu-for-gaming-2026', 301, '/ru/blog/luchshie-videokarty-dlya-igr-2026'],
  ['/blog/how-to-check-pc-bottleneck', 301, '/en/blog/how-to-check-pc-bottleneck'],
  ['/index.html', 301, '/en'],
  ['/it/calcolatore-fps/', 301, '/it/calcolatore-fps'],
  ['/en/blog/how-to-check-pc-bottleneck/', 301, '/en/blog/how-to-check-pc-bottleneck'],
  ['/en/builds/ryzen-5-5600x-rtx-4060/', 301, '/en/builds/ryzen-5-5600x-rtx-4060'],
];
for (const [pathname, expectedStatus, expectedLocation] of redirects) {
  const response = await fetch(`${baseUrl}${pathname}`, { redirect: 'manual' });
  if (response.status !== expectedStatus || response.headers.get('location') !== expectedLocation) {
    failures.push(
      `${pathname} returned ${response.status} -> ${response.headers.get('location')}; expected ${expectedStatus} -> ${expectedLocation}`,
    );
  }
}

const rssResponse = await fetch(`${baseUrl}/api/rss`);
const rss = await rssResponse.text();
if (rssResponse.status !== 200 || !rssResponse.headers.get('content-type')?.includes('application/xml')) {
  failures.push(`/api/rss returned ${rssResponse.status} with ${rssResponse.headers.get('content-type')}`);
}
if (!rss.includes('<rss') || !rss.includes('<channel>')) failures.push('/api/rss did not return an RSS document.');

const queryResponse = await fetch(`${baseUrl}/en/fps-calculator?cpu=example&gpu=example`);
if (queryResponse.status !== 200) failures.push(`Shared calculator URL returned ${queryResponse.status}.`);

if (failures.length > 0) {
  console.error('Static runtime checks failed:');
  failures.slice(0, 50).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 50) console.error(`- ...and ${failures.length - 50} more`);
  process.exit(1);
}

console.log(
  `Static runtime checks passed: ${publicUrls.length} sitemap URLs, ${assetPaths.size} static assets, ${redirects.length} redirects, RSS and shared calculator query URL verified.`,
);

