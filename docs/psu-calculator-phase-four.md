# PSU calculator Phase IV

Implemented on 17 September 2026.

## Delivered

- Added a GPU model guidance layer for every selected GPU using its published power tier.
- Added an editorial system-class starting point of 450 W, 550 W, 650 W, 850 W, or 1000 W depending on the GPU power band.
- Added an explicit “verify exact GPU model” status and linked the selected GPU's maintained official specification URL.
- Kept the guidance separate from the calculator's numeric build estimate so an editorial starting point cannot be mistaken for an official vendor minimum.
- Preserved the Phase III transient, connector, sharing, canonical, and noindex behavior.

## Why the guidance is intentionally labeled editorial

The exact board-partner minimum PSU, connector type, number of cables, and native-cable requirement can differ between cards using the same GPU. The database stores the GPU's published power figure and official specification URL, but it does not invent a vendor minimum where the exact board model is not identified.

Users should treat the system-class value as a shortlist aid and then confirm the exact GPU manufacturer's and board partner's documentation, connector fit, PSU protections, and independent tests.
