import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

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
  const actualJson = fs.readFileSync(vercelConfigPath, 'utf8').replace(/\r\n/g, '\n');
  if (actualJson !== expectedJson) {
    console.error('vercel.json is out of sync with lib/routing-rules.cjs.');
    console.error('Run: npm run sync:vercel-routing');
    process.exit(1);
  }
  console.log(
    `Vercel routing checks passed: ${expectedConfig.redirects.length} redirects, ${expectedConfig.rewrites.length} rewrites, ${expectedConfig.headers.length} header rules.`,
  );
} else {
  fs.writeFileSync(vercelConfigPath, expectedJson);
  console.log(`Updated ${path.relative(projectRoot, vercelConfigPath)}.`);
}

