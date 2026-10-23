# Static export optimization audit

## Outcome

Complete static export is feasible for PCBuildCheck. The production build now emits the site into `out/` and requires no Next.js server, ISR cache, image-optimization function, or application route function.

The application flow is now:

`CDN redirect/rewrite -> static HTML/JS/assets -> browser calculator/localStorage/share logic`

The contact form continues to submit directly from the browser to Formspree. Google Analytics, consent handling, and AdSense remain browser-side integrations.

## Rendering and runtime audit

- Server-rendered per request: none.
- ISR/revalidation: none after export.
- Dynamic rendering APIs (`cookies`, `headers`, draft mode, `noStore`): none.
- Server Actions: none.
- Routing Middleware: none.
- API routes: one, `/api/rss`; it is generated as a 5,918-byte static XML file.
- Dynamic route coverage: every locale, blog slug, tag, category, build, game guide, and tool slug is supplied through `generateStaticParams`.
- Images: `next/image` remains in components for sizing/lazy loading, but uses static unoptimized delivery so no Vercel Image Optimization function is required.

## Export inventory

- Next build pages generated: 366 / 366.
- Exported HTML files: 363.
- Total exported files: 820.
- Export directory size: 75.37 MB.
- Locales: English, Italian, French, German, Spanish, and Russian.
- Sitemap URLs: 258.
- Explicit deployment redirects: 590, all retaining HTTP 301 behavior.
- Localized rewrites: 153.
- Header rules: 13.
- Total configured deployment routes: 756, below Vercel's 2,048 route limit.

## URL and SEO parity

- All 363 baseline HTML outputs are present in the export (362 content pages plus the 404 document).
- Titles, descriptions, robots directives, canonicals, and hreflang sets match the `origin/main` baseline on all 362 content pages.
- All 258 sitemap URLs return HTTP 200 through the deployment-routing emulator.
- All six `/builds` listing pages are explicitly required by sitemap tests.
- `/api/rss` remains in the sitemap and is explicitly allowed in `robots.txt`, while the remaining `/api/` namespace stays disallowed.
- Root, locale-less, translated-path, trailing-slash, legacy Russian blog, host, and `.html` redirects remain represented in deployment configuration.
- Unknown paths continue to return the exported 404 page.

## Functional preservation

- Bottleneck, FPS, PSU, and tool calculators remain hydrated client components.
- Query/hash share URLs, clipboard/native-share fallbacks, localStorage histories, recently viewed games, and consent persistence remain browser-side.
- Contact remains a client-side Formspree POST and localized thank-you navigation remains exported.
- AdSense and Google Analytics scripts and consent defaults remain in the static HTML/client bundles.
- RSS remains generated from repository content at build time.

## Verification evidence

- `npm run build`: passed; 366 / 366 pages generated and static export completed.
- `npm run check:internal-links`: passed for 23 posts, 12 tools, 6 builds, and 6 locales.
- `npm run check:static-routing`: passed for 590 redirects, 153 rewrites, and 13 header rules.
- `npm run check:sitemap`: passed for 258 unique URLs, 66 dated URLs, 24 required indexable URLs, and 6 build listings.
- `npm run check:static-export`: passed for 363 HTML files, six locales, RSS, and deployment routing.
- `npm run check:static-runtime`: passed for 258 sitemap URLs, 42 referenced static assets, nine representative redirects, RSS, and a shared calculator query URL.
- `node scripts/compare-export-seo.mjs --baseline=<origin-main-build>`: passed for all 362 content pages.
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed with zero warnings.

## Expected Vercel resource impact

- ISR Reads: expected to fall to zero for application pages because there is no ISR output.
- ISR Writes: expected to remain zero.
- Function Invocations: expected to fall to zero for application routes; RSS is a static file and contact bypasses Vercel Functions.
- Fluid Active CPU: expected to fall to zero for page/API rendering.
- Image Optimization transformations: expected to fall to zero because images are delivered as static originals.
- Fast Origin Transfer: expected to fall sharply; static files are CDN-cacheable, although cold-cache fills and asset transfer can still register usage.
- CDN Requests: will not fall to zero. Every real user, crawler, HTML request, JS chunk, CSS file, and image still creates CDN traffic. Eliminating those requests would mean eliminating site traffic or functionality.

These are architectural expectations. Actual post-deployment usage should be checked after Vercel's usage window has accumulated enough production traffic.

## Remaining deployment check

The branch is intentionally not deployed. Review the Vercel preview build output before merge and confirm it reports only static assets and zero Functions. After approval and production deployment, compare Vercel usage for at least 24-72 hours against the preceding traffic-adjusted period.

