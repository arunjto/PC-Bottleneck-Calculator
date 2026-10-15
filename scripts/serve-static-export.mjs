import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'out');
const config = JSON.parse(fs.readFileSync(path.join(projectRoot, 'vercel.json'), 'utf8'));
const portArgument = process.argv.find((argument) => argument.startsWith('--port='));
const port = Number(portArgument?.slice('--port='.length) || process.env.PORT || 3000);

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function compilePattern(source) {
  const names = [];
  let expression = '';
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character !== ':') {
      expression += character.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      continue;
    }

    const match = source.slice(index + 1).match(/^(\w+)(\*)?/);
    if (!match) {
      expression += ':';
      continue;
    }
    names.push(match[1]);
    expression += match[2] ? '(.*)' : '([^/]+)';
    index += match[0].length;
  }
  return { regex: new RegExp(`^${expression}$`), names };
}

function matchRule(rule, pathname, host) {
  const hostConditions = rule.has?.filter((condition) => condition.type === 'host') ?? [];
  if (hostConditions.some((condition) => condition.value !== host)) return null;
  const compiled = compilePattern(rule.source);
  const match = pathname.match(compiled.regex);
  if (!match) return null;
  return Object.fromEntries(compiled.names.map((name, index) => [name, match[index + 1]]));
}

function interpolate(destination, params) {
  return Object.entries(params).reduce(
    (value, [name, replacement]) => value
      .replaceAll(`:${name}*`, replacement)
      .replaceAll(`:${name}`, replacement),
    destination,
  );
}

function resolveOutputFile(pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidates = [
    path.join(outputRoot, relative),
    path.join(outputRoot, `${relative}.html`),
    path.join(outputRoot, relative, 'index.html'),
  ];
  return candidates.find((candidate) => {
    const resolved = path.resolve(candidate);
    return resolved.startsWith(`${outputRoot}${path.sep}`)
      && fs.existsSync(resolved)
      && fs.statSync(resolved).isFile();
  });
}

function applyConfiguredHeaders(pathname, response) {
  for (const rule of config.headers ?? []) {
    if (!matchRule(rule, pathname, 'localhost')) continue;
    for (const header of rule.headers) response.setHeader(header.key, header.value);
  }
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
  const host = url.hostname;

  for (const redirect of config.redirects ?? []) {
    const params = matchRule(redirect, url.pathname, host);
    if (!params) continue;
    response.statusCode = redirect.statusCode;
    response.setHeader('Location', `${interpolate(redirect.destination, params)}${url.search}`);
    response.end();
    return;
  }

  let routedPath = url.pathname;
  for (const rewrite of config.rewrites ?? []) {
    const params = matchRule(rewrite, routedPath, host);
    if (!params) continue;
    routedPath = interpolate(rewrite.destination, params);
    break;
  }

  const filePath = resolveOutputFile(routedPath);
  if (!filePath) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(fs.readFileSync(path.join(outputRoot, '404.html')));
    return;
  }

  response.statusCode = 200;
  const extension = path.extname(filePath);
  response.setHeader(
    'Content-Type',
    routedPath === '/api/rss'
      ? 'application/xml; charset=utf-8'
      : mimeTypes.get(extension) ?? 'application/octet-stream',
  );
  applyConfiguredHeaders(url.pathname, response);
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  fs.createReadStream(filePath).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static export server listening on http://127.0.0.1:${port}`);
});

