import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXNOW_CONFIG } from '../indexnow.config.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const keyPattern = /^[A-Za-z0-9-]{8,128}$/;

if (!keyPattern.test(INDEXNOW_CONFIG.key)) {
  throw new Error('IndexNow key must contain 8-128 letters, numbers, or dashes.');
}

const site = new URL(INDEXNOW_CONFIG.siteUrl);
const keyLocation = new URL(INDEXNOW_CONFIG.keyLocation);
if (site.protocol !== 'https:' || site.hostname !== INDEXNOW_CONFIG.host) {
  throw new Error('IndexNow siteUrl and host must use the canonical HTTPS host.');
}
if (keyLocation.origin !== site.origin || keyLocation.pathname !== `/${INDEXNOW_CONFIG.key}.txt`) {
  throw new Error('IndexNow keyLocation must be the root key file on the canonical host.');
}

const keyFile = path.join(projectRoot, 'public', `${INDEXNOW_CONFIG.key}.txt`);
if (!fs.existsSync(keyFile)) {
  throw new Error(`IndexNow key file is missing: ${keyFile}`);
}
if (fs.readFileSync(keyFile, 'utf8').trim() !== INDEXNOW_CONFIG.key) {
  throw new Error('IndexNow key file contents do not match the configured key.');
}

console.log(`IndexNow checks passed: ${INDEXNOW_CONFIG.keyLocation}`);
