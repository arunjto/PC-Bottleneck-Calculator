import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const {
  buildLocalizedRedirects,
  buildLocalizedRewrites,
  buildStaticHeaders,
} = require(path.join(projectRoot, 'lib', 'routing-rules.cjs'));

const hostRedirects = [
  {
    source: '/:path*',
    has: [
      {
        type: 'host',
        value: 'pc-bottleneck-calculator-fawn.vercel.app',
      },
    ],
    destination: 'https://www.pcbuildcheck.com/:path*',
    statusCode: 301,
  },
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'pcbuildcheck.com' }],
    destination: 'https://www.pcbuildcheck.com/:path*',
    statusCode: 301,
  },
];

const legacyHtmlRedirect = {
  source: '/:slug.html',
  destination: '/:slug',
  statusCode: 301,
};

function dedupeRedirects(redirects) {
  const seen = new Set();
  return redirects.filter((redirect) => {
    const key = JSON.stringify({
      source: redirect.source,
      destination: redirect.destination,
      has: redirect.has ?? [],
    });
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const expectedConfig = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  framework: null,
  buildCommand: 'npm run build',
  outputDirectory: 'out',
  cleanUrls: true,
  trailingSlash: false,
  redirects: dedupeRedirects([
    ...hostRedirects,
    ...buildLocalizedRedirects(),
    legacyHtmlRedirect,
  ]),
  rewrites: buildLocalizedRewrites(),
  headers: buildStaticHeaders(),
};

const vercelConfigPath = path.join(projectRoot, 'vercel.json');
const expectedJson = `${JSON.stringify(expectedConfig, null, 2)}\n`;

if (process.argv.includes('--check')) {
  let actualConfig;
  try {
    actualConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  } catch (error) {
    console.error('vercel.json cannot be parsed:', error.message);
    process.exit(1);
  }

  // Match the configuration's actual meaning, not key order or whitespace.
  // Preserve strict failure for real redirect, rewrite, or header changes.
  if (!isDeepStrictEqual(actualConfig, expectedConfig)) {
    console.error('vercel.json differs semantically from lib/routing-rules.cjs.');
    const keys = new Set([...Object.keys(expectedConfig), ...Object.keys(actualConfig)]);
    for (const key of keys) {
      const expected = expectedConfig[key];
      const actual = actualConfig[key];
      if (isDeepStrictEqual(actual, expected)) continue;
      if (Array.isArray(expected)) {
        const differenceAt = expected.findIndex(
          (value, index) => !isDeepStrictEqual(value, actual?.[index]),
        );
        console.error(
          `${key}: expected ${expected.length}, found ${Array.isArray(actual) ? actual.length : 'non-array'}, first differing index: ${differenceAt >= 0 ? differenceAt : 'after expected entries'}`,
        );
        if (differenceAt >= 0) {
          console.error('Expected:', JSON.stringify(expected[differenceAt]));
          console.error('Actual:  ', JSON.stringify(actual?.[differenceAt]));
        }
      } else {
        console.error(`${key}: expected ${JSON.stringify(expected)}, found ${JSON.stringify(actual)}`);
      }
    }
    console.error('Run: npm run sync:vercel-routing, review the diff, and commit vercel.json.');
    process.exit(1);
  }
  console.log(
    `Vercel routing checks passed: ${expectedConfig.redirects.length} redirects, ${expectedConfig.rewrites.length} rewrites, ${expectedConfig.headers.length} header rules.`,
  );
} else {
  fs.writeFileSync(vercelConfigPath, expectedJson);
  console.log(`Updated ${path.relative(projectRoot, vercelConfigPath)}.`);
}
