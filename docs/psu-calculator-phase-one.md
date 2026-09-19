# PSU calculator Phase I

Implemented on 17 September 2026 after comparing the PCBuildCheck PSU calculator with the current BottleneckPC PSU calculator.

## Delivered

- Replace the generic hero promise with a concrete description of load, capacity, upgrade-headroom, and connector checks.
- Add five server-rendered build examples calculated by the production PSU model, with links that prefill the calculator.
- Add visible minimum-versus-recommended buying guidance and a model-level verification checklist.
- Make the existing calculator methodology and PSU selection guide visible without requiring users to open collapsed panels.
- Expand each locale from four to eight visible FAQs and keep the JSON-LD synchronized with the rendered answers.
- Add contextual links to the full PSU guide or localized methodology, upgrade-priority tool, component comparison, and two relevant build analyses.
- Apply the changes in English, Italian, French, German, Spanish, and Russian.
- Add a truthful `2026-09-17` sitemap `lastmod` to the six localized PSU calculator URLs.

## Guardrails retained

- Clean calculator URLs remain indexable and self-canonical.
- Prefilled `?cpu=...&gpu=...` URLs remain `noindex,follow` and canonicalize to the clean localized calculator URL.
- Examples are capacity-planning estimates, not wall-power measurements or safety certifications.
- GPU-vendor and board-partner wattage and connector guidance remains the final model-specific check.

## Deferred to later phases

- Exact per-board-partner official PSU recommendations and connector metadata remain model-specific and must be verified from the linked vendor documentation.
- Source-backed transient guidance and reliable result sharing were delivered in Phase III; editorial GPU power-tier guidance was delivered in Phase IV.

Granular RAM, storage, fan, cooling, add-in card, USB, second-GPU, overclocking, and manual-load inputs were delivered in Phase II.
