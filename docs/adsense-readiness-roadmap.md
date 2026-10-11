# AdSense low-value-content remediation roadmap

This roadmap improves the site's publisher value without relying on word count, fabricated testing claims, or removing the localized legal pages that the site owner wants indexed. AdSense approval is a Google decision; completing these phases improves readiness but cannot guarantee approval.

## Baseline

- AdSense status: rejected for **Low value content**; ownership is verified.
- Production sitemap: 257 canonical URLs across six locales.
- Strongest assets: the three core calculators, methodology, selected build analyses, reviewed game guides, and editorial articles.
- Largest repeatable gap found in the code audit: only 4 of 12 secondary tool families had a worked example, FAQ block, and curated editorial links. That left 8 tool families × 6 locales (48 indexable pages) with a thinner shared template.
- Legal, contact, privacy, cookie, terms, and disclaimer pages remain indexable by owner choice. They are support pages, not evidence of the site's primary editorial value.

## Phase 1 — Close the secondary-tool value gap

Status: implemented in the working tree.

- Give every tool a reproducible, formula-consistent worked example.
- Explain the decision supported by the output rather than presenting a score alone.
- Add a tool-specific FAQ block using that tool's actual method and limitations.
- Add curated links to the closest testing and buying guides in the same locale.
- Keep claims explicit: modelled planning output is not a measured benchmark.

Exit criteria:

- All 12 tool families render the value blocks in all 6 locales.
- No unknown or cross-locale guide links.
- Type checking, linting, internal-link validation, and representative rendered-page smoke tests pass.

## Phase 2 — Differentiate every game guide (implemented in working tree)

- Audit all six `can-i-run` games across all locales.
- Add per-game settings that materially change CPU, GPU, VRAM, RAM, or storage demand.
- Add a game-specific decision table: minimum launch check, recommended tier, modelled FPS check, and on-device verification.
- Add one troubleshooting path and one upgrade decision unique to each game.
- Preserve official requirement sources and reviewed dates; do not imply first-hand testing where none occurred.

Exit criteria:

- Each game page teaches at least one fact or decision not supplied by the shared template.
- Shared passages do not dominate the main content.
- Every page links naturally to the relevant calculator, sibling game, and editorial guide.

## Phase 3 — Strengthen build analyses as buyer decisions (implemented in working tree)

- Audit the six build families after the Phase 3C decision checkpoints.
- Add platform-cost consequences, compatibility gates, cooling/case checks, and an explicit cheaper alternative where useful.
- Connect each build to two representative workloads and explain when a different CPU/GPU allocation is better value.
- Verify localized summaries for natural language and remove untranslated fragments.

Exit criteria:

- Every build has a unique buy/skip/upgrade decision, not only different component names.
- Each recommendation states the assumptions and the evidence a buyer should verify.

## Phase 4 — Increase original editorial evidence (implemented in working tree)

- Publish a small number of evidence-led guides rather than large batches of keyword pages.
- Prioritize repeatable FPS testing, frame-time interpretation, platform upgrade cost, and calculator-model validation.
- Use original screenshots, calculation walk-throughs, update logs, and cited manufacturer requirements where available.
- Add visible reviewed dates and author responsibility to new or materially revised guides.

Exit criteria:

- New content demonstrates a process, dataset, or decision framework unavailable from a generic summary.
- Editorial pages form natural topic clusters with tools, games, and builds.

## Phase 5 — User experience and monetization boundary

- Diagnose the mobile FPS-calculator INP group (currently reported at 256 ms) and target a lab margin below 170 ms.
- Keep Auto ads disabled during remediation; use manual placements only after approval.
- Monetize substantial calculators, tool pages, game/build analyses, and editorial articles—not legal, contact, thank-you, tag, or category pages.
- Check navigation, broken links, mobile overflow, consent behavior, ad density, and crawler access.
- Review Search Console indexing and traffic by page family before requesting another AdSense review.

Exit criteria:

- No empty ad placeholders or ads on support pages.
- Core interactions are responsive on a representative mid-tier mobile profile.
- Important revised pages have been crawled, and the site has no unresolved policy or coverage errors.

## Re-review gate

Do not request review simply because code was deployed. Request it only after all five phases are complete, production smoke tests pass, and Google has had an opportunity to crawl the materially revised pages. Do not delete and re-add the site in AdSense.
