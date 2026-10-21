# FPS mobile performance investigation

Branch: `codex/live-mobile-performance`. Preserve the existing uncommitted FPS fixes. Do not merge or publish during measurement.

## Acceptance criteria

- Aim for a median Lighthouse mobile Performance score of at least 90 across three sequential cold runs. Report a miss explicitly.
- Use the same production build, Chrome, Lighthouse version, viewport and default mobile throttling before and after; retain individual measurements and CPU benchmark warnings.
- Do not hide crawlable content, postpone the visible calculator, weaken consent, or change calculations to improve a score.
- Verify calculations, valid/invalid shared URLs, history, returning to the form, consent rejection/preferences, and all six localized public URLs.

## Sequence

1. Measure the current production build three times sequentially. No concurrent browser tests or builds. Record score, TBT, LCP, CLS, and hardware benchmark index.
2. Attribute long tasks using Chrome traces and CPU profiles. Framework chunk attribution alone does not identify an application bug.
3. Test one candidate at a time. First candidate: conditionally load the closed consent preferences editor, including Radix Dialog and Switch. Keep the consent banner and analytics decisions immediate.
4. Rebuild, repeat three audits, and compare medians and requested chunks. Keep changes with demonstrated savings and no functional regressions; distinguish bundle savings from TBT improvements.
5. Check remaining layout work with controlled measurements. Do not retain inconclusive experiments or claim 90 until measured.
6. Run functional and SEO regression checks and report the remaining bottleneck if the target is unmet.

## Starting evidence

Previous local runs varied between 70 and 72 and reported CPU calibration warnings. The current FPS First Load JS is 150 kB. A profile identified shared Next.js initialization and a full-document layout; FPS estimation functions did not execute during a normal empty-form visit. Previous offscreen-card containment results were inconclusive and that experiment was not retained.

## Measurements and outcome

Baseline on 2026-10-21, Lighthouse 13.5.0, default mobile simulation, localhost:3100:

| Run | Performance | TBT (ms) | LCP (ms) | CPU benchmark |
| --- | ---: | ---: | ---: | ---: |
| 1 | 67 | 2,272 | 2,237 | 1,321 |
| 2 | 80 | 435 | 3,437 | 1,004 |
| 3 | 82 | 375 | 3,396 | 1,186.5 |
| Median | 80 | 435 | 3,396 | |

The first cold-process run is an outlier for TBT; do not compare a single later run against it. No CPU warnings were emitted in these three audits. Raw reports are in the system temporary directory as `fps-baseline-oct21-1.json` through `fps-baseline-oct21-3.json`.

Candidate: closed consent editor is conditionally imported. The banner, stored preferences, analytics gating and footer event API remain in the eagerly loaded controller.

| Candidate run | Performance | TBT (ms) | LCP (ms) | CPU benchmark |
| --- | ---: | ---: | ---: | ---: |
| 1 | 84 | 243 | 3,311 | 1,134.5 |
| 2 | 83 | 401 | 3,230 | 1,062.5 |
| 3 | 89 | 435 | 1,869 | 1,559 |
| Median | 84 | 401 | 3,230 | |

All candidate runs had CLS 0 and no CPU calibration warnings. The fastest CPU benchmark coincided with the best score, so the score change should not be treated as a precise causal estimate.

Initial script transfer consistently decreased from 189,648 to 175,700 bytes (13,948 bytes / 13.6 KiB); script requests decreased from 15 to 14. The Next route table still reports 150 kB First Load JS: use actual network requests to assess the deferred layout dependency. The preferences editor's three dynamic chunks are absent until opening the dialog.

Production build, internal-link and sitemap checks passed. Browser checks passed for on-demand loading, analytics absent before consent, enabling analytics, revoking consent and reloading, Escape, reopening through the public manager API, FPS calculation, history, shared-URL restoration, and returning to the form. Analytics requests were stubbed during interaction tests. No runtime errors occurred.

Mobile blur experiment: three alternating pairs at 4x CPU slowdown showed no consistent benefit. Median TaskDuration was 1.760 s with current styling and 1.777 s without blur; median LayoutDuration was 0.784 s and 0.789 s respectively. No blur/style source changes were retained.

Native advanced-card containment confirmation: only the three native-setting cards were targeted; CPU/GPU/Game controls and the page shell were excluded. Three alternating pairs showed median LayoutDuration 0.744 s versus 0.705 s, but median TaskDuration 1.730 s versus 1.776 s. No containment source changes were retained because overall CPU time did not improve.

With JavaScript disabled, all six public localized FPS URLs returned 200, displayed the CPU form, exposed the FAQ answers in HTML (seven in the western locales, eight in Russian), and retained the expected localized canonical and seven hreflang alternates including x-default.

The 90+ median target is not yet met. Raw candidate audits are in the system temporary directory as `fps-consent-oct21-1.json` through `fps-consent-oct21-3.json`.

## Next decision

Keep the verified conditional preferences-editor loading and the previous four edits for review. No deployment or branch publication is part of this measurement pass. The next performance change needs a profile attributing a remaining long task to a specific application boundary; the shared scheduler chunk and generic document-layout attribution do not justify removing framework functionality, delaying the calculator, or changing the public UI. In particular, do not lower Lighthouse throttling or select the best individual run to claim the target.
