# PSU calculator Phase II

Implemented on 17 September 2026.

## Delivered

- Replaced the four opaque component profiles with individual controls for RAM sticks, NVMe drives, SATA SSDs, hard drives, case fans, and CPU cooling.
- Added an advanced section for RGB or fan controllers, PCIe add-in cards, higher-power USB devices, a second GPU, overclocking, and a manual extra allowance.
- Added a visible result breakdown so every non-CPU/GPU watt in the estimate can be traced to a selected input.
- Updated the worked examples to use the calculator's new default component selection.
- Updated calculator methodology and result copy in English, Italian, French, German, Spanish, and Russian.

## Planning assumptions

| Component | Allowance |
| --- | ---: |
| Motherboard and platform baseline | 60 W |
| RAM stick | 5 W |
| NVMe SSD | 8 W |
| SATA SSD | 4 W |
| Hard drive | 10 W |
| Case fan | 3 W |
| Air cooler | 5 W |
| AIO liquid cooler | 15 W |
| Custom water loop | 30 W |
| RGB or fan controller | 10 W |
| PCIe add-in card | 25 W |
| Higher-power USB device | 5 W |
| Overclocking or raised power limits | 15% of selected CPU and GPU power |

The second GPU uses its published power figure. A manual allowance can cover pumps or unusual devices that the predefined inputs do not represent.

## Calculation

1. Add published CPU and GPU power figures.
2. Add the selected component allowances, second GPU, overclocking allowance, and manual allowance.
3. Calculate 15%, 30%, and 50% headroom scenarios.
4. Round the 30% and 50% planning scenarios up to a common PSU capacity where possible.

These are transparent planning allowances, not measurements of a specific part, wall-power readings, or safety certification. Exact GPU and PSU manufacturer requirements still take priority.
