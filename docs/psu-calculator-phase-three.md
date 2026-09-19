# PSU calculator Phase III

Implemented on 17 September 2026.

## Delivered

- Added reliable result sharing with a versioned URL that restores CPU, GPU, second GPU, peripheral counts, cooling, optional loads, overclocking, manual allowance, and efficiency selection.
- Added copy-to-clipboard fallback behavior and native device sharing when supported.
- Added a transient-risk signal based on combined GPU power, a second GPU, and PCIe add-in cards.
- Added ATX 3.0/3.1 and native high-current connector verification guidance for elevated and high-risk configurations.
- Added direct links to the selected GPU records' maintained official specification URLs when available.
- Added source-backed reference links for Intel ATX excursion guidance and the PCI-SIG 12V-2x6 connector update.

## Transient guidance model

The calculator does not pretend that TDP identifies a connector or that a generic wattage multiplier can certify a PSU. It uses a conservative editorial signal:

- Lower risk: combined GPU power up to 225 W, with vendor verification still required.
- Elevated risk: combined GPU power above 225 W, or a PCIe add-in card.
- High risk: combined GPU power above 350 W, or a second GPU.

The result keeps the numeric planning estimate transparent and adds the transient/connector verification layer separately. This prevents an invented “transient wattage” from being presented as an official requirement.

Intel’s ATX 3.0 design guide lists PSU excursion test points of 200%, 180%, 160%, and 120% for 100 µs, 1 ms, 10 ms, and 100 ms respectively when the high-current connector condition applies; the corresponding reference values without that connector are 150%, 145%, 135%, and 110%. These are PSU design-test references, not a model-specific GPU recommendation. The UI links to the source and explicitly directs the user to the exact GPU and PSU documentation.

## Sharing and indexing

Shared URLs use `psu=1` and a version marker. They preserve the clean localized calculator URL as the canonical page and remain parameter URLs outside the sitemap with `noindex,follow` metadata. The clean localized pages remain the only indexable landing pages.

## Sources

- Intel, [PSU Power Excursion](https://edc.intel.com/content/www/us/en/design/ipla/software-development-platforms/client/platforms/alder-lake-desktop/atx-version-3-0-multi-rail-desktop-platform-power-supply-design-guide/2.0/2.01/psu-power-excursion/)
- PCI-SIG, [12V-2x6 Connector Updates to PCIe Base 6.0](https://pcisig.com/PCI%20Express/ECN/Base/12V-2x6ConnectorUpdatestoPCIeBase_6.0)
