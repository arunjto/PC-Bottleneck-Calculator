# Homepage performance investigation — 7 November 2026

Baseline: `20b652e` (static production main). Input: supplied Lighthouse 13.5 JSON reports, both for `https://www.pcbuildcheck.com/en`.

| Metric | Desktop | Mobile |
| --- | --- | --- |
| Performance | 71 | 68 |
| FCP | 0.3s | 1.2s |
| LCP | 0.7s | 1.9s |
| TBT | 810ms | 5,250ms |
| CLS | 0 | 0 |

## Evidence

The problem is CPU work, not primarily slow HTML delivery or layout instability.
Mobile bootup-time entries include Journey CMP (1,654ms total CPU), consentmanager custom data (938ms), Journey wrapper (554ms), another Journey tag (533ms), and scriptwrapper (277ms). These are CPU attribution values, **not additive TBT measurements**. First-party chunk 1255 accounts for 1,480ms and chunk 2391 for 611ms. Runtime chunk names alone do not establish which application component caused a long task.

The homepage update banner unnecessarily imports Framer Motion and starts invisible until animation. Closed searchable dropdowns filter options and subscribe to document mouse events during hydration. The navbar fetches a 1,024px logo for a 28px box (Lighthouse estimates 26KiB waste).

## Changes

- Render UpdateBanner as ordinary build-time HTML, keeping text, styling and link; remove the decorative entrance animation and client animation dependency on this path.
- Filter searchable options only while open, use the original options for empty search, and attach outside-click handling only while open. Keep keyboard behavior, result limits, labels and selection callbacks.
- Generate a 108px static logo for navbar/footer, covering 3x density at the largest 36px display size. Preserve the original logo and its public URL. Regenerate with `node scripts/generate-chrome-logo.mjs` when the source logo changes.

Mediavine loader placement, ads.txt redirect, CMP, analytics consent and calculators' calculation logic remain unchanged. No user-agent/Lighthouse detection, ad suppression, artificial ad delays, server functions or ISR are introduced.

## Acceptance and remaining work

Completed validation:
- Production build passed; 363 exported HTML files, six locales, 591 redirects, 153 rewrites, 13 header rules.
- Six-locale homepage comparison against the prior Mediavine export: initial script tags 15 → 14; raw JS 804,611 → 681,078 bytes; independently gzipped JS total 244,348 → 204,327 bytes (about 16.4% less). These are local gzip estimates, not network/Brotli or measured execution times. Baseline is the earlier local Mediavine build, not a second rebuild of main.
- Canonical, hreflang, description/robots/title tags and JSON-LD equal to that baseline; visible CPU form and a single Mediavine loader preserved.
- Static runtime checks passed: 258 sitemap URLs, 42 assets, nine redirects, RSS and shared calculator query URL.
- Logo 27,106 → 1,464 bytes (94.6% reduction).
- No new Lighthouse run or interactive browser smoke test has been performed; 90+ remains unverified.

Run production build, static routing/export validation, internal-link checks and static runtime checks. Compare initial homepage scripts against the prior exported baseline as a bundle check, not a claim of measured CPU savings.

After a reviewed preview deployment, run three clean mobile and desktop Lighthouse tests with ads enabled and compare medians. Test keyboard dropdown search, CPU/GPU/RAM/resolution selection, Analyze, Back, shared presets, language/theme controls and consent preferences. These interactions need browser validation; a build alone does not establish they all work.

90+ is not guaranteed by this patch. Journey/CMP overhead remains a substantial source of CPU work. If TBT remains high, send Journey support these report attributions and request supported performance/ad-density/video settings. Do not remove or delay required consent or monetization scripts merely to improve lab scores. Lighthouse scores and real-user Core Web Vitals are different measurements.
