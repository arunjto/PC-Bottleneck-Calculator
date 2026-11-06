import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';

const baseline = process.argv[2];
assert.ok(baseline, 'Pass the baseline out directory as the first argument');
const current = path.resolve('out');
const scripts = (html) => [...new Set([...html.matchAll(/<script\b[^>]*src="([^"?]+)[^"]*"/g)]
  .map((match) => match[1]).filter((src) => src.startsWith('/_next/')))];
const seo = (html) => (html.match(/<title\b[^>]*>[^<]*<\/title>|<(?:meta|link)\b[^>]*>/g) ?? [])
  .filter((tag) => /canonical|hrefLang|hreflang|name="(?:description|robots)"|<title/.test(tag)).sort();
const size = (root, html) => scripts(html).reduce((sum, src) => {
  const data = fs.readFileSync(path.join(root, decodeURIComponent(src)));
  return { raw: sum.raw + data.length, gzip: sum.gzip + gzipSync(data).length, count: sum.count + 1 };
}, { raw: 0, gzip: 0, count: 0 });

for (const locale of ['en', 'it', 'fr', 'de', 'es', 'ru']) {
  const before = fs.readFileSync(path.join(baseline, `${locale}.html`), 'utf8');
  const after = fs.readFileSync(path.join(current, `${locale}.html`), 'utf8');
  assert.deepEqual(seo(after), seo(before), `${locale}: SEO metadata changed`);
  assert.ok(after.includes('id="calc-cpu-select"'), `${locale}: visible form missing`);
  assert.equal((after.match(/<script\b[^>]*src="https:\/\/scripts\.scriptwrapper\.com\/tags\/e1ac38cd[^>]*>/g) ?? []).length, 1);
  const jsonLd = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert.deepEqual(jsonLd(after), jsonLd(before), `${locale}: structured data changed`);
  console.log(locale, JSON.stringify({ before: size(baseline, before), after: size(current, after) }));
}
console.log('Six-locale homepage form, SEO, structured data and Mediavine checks passed.');
