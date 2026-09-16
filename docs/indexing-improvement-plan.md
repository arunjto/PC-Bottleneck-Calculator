# Indexing improvement plan

Baseline: the 15 September 2026 Search Console export contains 77 crawled-but-not-indexed URLs. Most are localized tool and curated build pages; all sampled URLs were technically indexable before this change.

## Phase 1 — shipped in this branch

- Keep calculator, tool, build, blog, author, and about pages indexable.
- Keep contact, privacy, cookie-policy, and disclaimer routes indexable and included in the XML sitemap in every locale.
- Add `x-default` to localized hreflang clusters with English as the fallback.
- Add server-rendered worked examples to component comparison, PC upgrade priority, resolution scaling, and SSD upgrade tools.
- Add three visible, tool-specific FAQs with `FAQPage` structured data to each priority tool in all six locales.
- Add two or three contextual links from each priority tool to closely related editorial guides.
- Add an explicit alternative-build comparison to all six curated build pages in all locales.
- Add accurate sitemap `lastmod` values only to the 60 URLs whose primary content changed: `2026-09-16` for 24 priority tool variants and `2026-09-15` for 36 build variants.
- Fail the production build if sitemap duplicates, excluded URLs, or required update dates regress.

## Phase 2 — after deployment

1. Confirm the production deployment is healthy and open `/sitemap.xml` once.
2. Submit the sitemap once in Search Console; do not repeatedly resubmit unchanged URLs.
3. Run URL Inspection on this cross-locale sample:
   - `/de/werkzeuge/komponentenvergleich`
   - `/it/strumenti/confronto-componenti`
   - `/es/herramientas/calculadora-prioridad-actualizacion-pc`
   - `/fr/outils/calculateur-priorite-mise-a-niveau-pc`
   - `/de/werkzeuge/aufloesungsskalierung-rechner`
   - `/en/tools/ssd-upgrade-calculator`
   - `/en/builds/ryzen-5-7600x-rx-7800-xt`
   - `/de/builds/ryzen-5-7600x-rx-7800-xt`
   - `/it/builds/ryzen-7-9800x3d-rtx-5080`
   - `/fr/builds/ryzen-7-9800x3d-rtx-5080`
4. For each sample, record crawl allowed, indexing allowed, last crawl, user-declared canonical, Google-selected canonical, and rendered-page status.
5. Request indexing only after the live test confirms the newly deployed content.

## Phase 3 — measurement

- Re-export the Crawled — currently not indexed report after 14 and 28 days.
- Compare total affected URLs and the tool/build group counts against the 77-URL baseline.
- Track legal/contact routes separately from priority tools and builds; their indexing status is not part of the priority-content success metric.
- Compare impressions and clicks for the priority tool/build URLs over equivalent 28-day periods.
- If a priority URL remains excluded after a fresh crawl, use its Google-selected canonical and rendered HTML from URL Inspection to decide whether it needs more original content or consolidation.

Success means priority tools/builds gain indexed coverage and impressions while legal/contact URLs remain accessible, indexable, and present in the sitemap.
