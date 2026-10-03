import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXNOW_CONFIG } from '../indexnow.config.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const submitAll = args.includes('--all');
const dryRun = args.includes('--dry-run');
const positional = args.filter((arg) => !arg.startsWith('--'));

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function readSitemapUrls() {
  const sitemapPath = path.join(projectRoot, 'public', 'sitemap-0.xml');
  if (!fs.existsSync(sitemapPath)) {
    throw new Error('public/sitemap-0.xml is missing. Run npm run build first.');
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1].trim()));
}

function normalizeUrl(value) {
  const url = value.startsWith('/') ? new URL(value, INDEXNOW_CONFIG.siteUrl) : new URL(value);
  if (url.protocol !== 'https:' || url.hostname !== INDEXNOW_CONFIG.host) {
    throw new Error(`Refusing non-canonical URL: ${value}`);
  }
  if (url.search || url.hash) {
    throw new Error(`Refusing parameterized or fragment URL: ${value}`);
  }
  return url.href.replace(/\/$/, url.pathname === '/' ? '/' : '');
}

const requestedUrls = submitAll ? readSitemapUrls() : positional;
if (requestedUrls.length === 0) {
  throw new Error(
    'Provide changed URL paths, or use --all once for initial onboarding. Example: npm run indexnow:submit -- /en/blog/new-post',
  );
}

const urlList = [...new Set(requestedUrls.map(normalizeUrl))];
if (urlList.length > 10_000) {
  throw new Error(`IndexNow accepts at most 10,000 URLs per request; received ${urlList.length}.`);
}

if (dryRun) {
  console.log(`IndexNow dry run passed: ${urlList.length} canonical URL(s) ready.`);
  process.exit(0);
}

const keyResponse = await fetch(INDEXNOW_CONFIG.keyLocation, {
  headers: { 'User-Agent': 'PCBuildCheck-IndexNow/1.0' },
});
const liveKey = keyResponse.ok ? (await keyResponse.text()).trim() : '';
if (liveKey !== INDEXNOW_CONFIG.key) {
  throw new Error(
    `IndexNow key is not live at ${INDEXNOW_CONFIG.keyLocation}. Deploy this change before submitting URLs.`,
  );
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'User-Agent': 'PCBuildCheck-IndexNow/1.0',
  },
  body: JSON.stringify({
    host: INDEXNOW_CONFIG.host,
    key: INDEXNOW_CONFIG.key,
    keyLocation: INDEXNOW_CONFIG.keyLocation,
    urlList,
  }),
});

if (![200, 202].includes(response.status)) {
  const detail = (await response.text()).trim();
  throw new Error(`IndexNow rejected the submission (${response.status})${detail ? `: ${detail}` : '.'}`);
}

console.log(
  `IndexNow accepted ${urlList.length} URL(s) with HTTP ${response.status}${response.status === 202 ? ' (key validation pending)' : ''}.`,
);
