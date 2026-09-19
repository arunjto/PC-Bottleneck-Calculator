import type { CPU, GPU } from '@/lib/hardware-database';

export const COMMON_PSU_WATTAGES = [450, 500, 550, 600, 650, 700, 750, 800, 850, 1000, 1200, 1500] as const;

export const PSU_COMPONENT_ASSUMPTIONS = {
  platform: 60,
  ramStick: 5,
  nvme: 8,
  sataSsd: 4,
  hdd: 10,
  caseFan: 3,
  rgbController: 10,
  addInCard: 25,
  usbDevice: 5,
  overclockingRate: 0.15,
  cooling: {
    air: 5,
    aio: 15,
    customLoop: 30,
  },
} as const;

/**
 * Intel's ATX 3.0 design guide describes PSU excursion test points for
 * supplies with a 12VHPWR connector. These are reference requirements for
 * PSU design testing, not a promise that a particular GPU needs these exact
 * values or that TDP alone can determine a connector.
 */
export const PSU_TRANSIENT_REFERENCE = [
  { duration: '100 µs', withHighCurrentConnector: 200, withoutHighCurrentConnector: 150 },
  { duration: '1 ms', withHighCurrentConnector: 180, withoutHighCurrentConnector: 145 },
  { duration: '10 ms', withHighCurrentConnector: 160, withoutHighCurrentConnector: 135 },
  { duration: '100 ms', withHighCurrentConnector: 120, withoutHighCurrentConnector: 110 },
] as const;

export type PsuTransientRisk = 'low' | 'elevated' | 'high';

export type PsuTransientAssessment = {
  combinedGpuPower: number;
  risk: PsuTransientRisk;
  atxRecommendation: 'standard' | 'atx-3-preferred' | 'atx-3-required-to-verify';
  connectorRecommendation: 'vendor-specified' | 'native-high-current-preferred' | 'native-high-current-required-to-verify';
  requiresDedicatedGpuCables: boolean;
};

export function assessPsuTransientRisk(
  gpuPower: number,
  secondGpuPower = 0,
  addInCards = 0,
): PsuTransientAssessment {
  const combinedGpuPower = Math.max(0, gpuPower) + Math.max(0, secondGpuPower);
  const risk: PsuTransientRisk = combinedGpuPower > 350 || secondGpuPower > 0
    ? 'high'
    : combinedGpuPower > 225 || addInCards > 0
      ? 'elevated'
      : 'low';

  return {
    combinedGpuPower,
    risk,
    atxRecommendation: risk === 'high'
      ? 'atx-3-required-to-verify'
      : risk === 'elevated'
        ? 'atx-3-preferred'
        : 'standard',
    connectorRecommendation: risk === 'high'
      ? 'native-high-current-required-to-verify'
      : risk === 'elevated'
        ? 'native-high-current-preferred'
        : 'vendor-specified',
    requiresDedicatedGpuCables: combinedGpuPower > 225 || secondGpuPower > 0,
  };
}

export type PsuCoolingType = keyof typeof PSU_COMPONENT_ASSUMPTIONS.cooling;

export type PsuPeripheralSelection = {
  ramSticks: number;
  nvmeDrives: number;
  sataSsds: number;
  hardDrives: number;
  caseFans: number;
  cooling: PsuCoolingType;
  rgbControllers: number;
  addInCards: number;
  usbDevices: number;
  overclocking: boolean;
  manualExtraWatts: number;
};

export const DEFAULT_PSU_PERIPHERALS: PsuPeripheralSelection = {
  ramSticks: 2,
  nvmeDrives: 1,
  sataSsds: 0,
  hardDrives: 0,
  caseFans: 3,
  cooling: 'air',
  rgbControllers: 0,
  addInCards: 0,
  usbDevices: 0,
  overclocking: false,
  manualExtraWatts: 0,
};

export type PsuPeripheralBreakdown = {
  platform: number;
  memory: number;
  nvme: number;
  sataSsds: number;
  hardDrives: number;
  caseFans: number;
  cooling: number;
  rgbControllers: number;
  addInCards: number;
  usbDevices: number;
  secondGpu: number;
  overclocking: number;
  manualExtra: number;
};

export interface PSUPlanningEstimate {
  estimatedLoad: number;
  lowerHeadroomEstimate: number;
  planningEstimate: number;
  planningWattage: number;
  upgradeHeadroomEstimate: number;
  upgradePlanningWattage: number;
  systemOverhead: number;
}

export interface DetailedPSUPlanningEstimate extends PSUPlanningEstimate {
  peripheralBreakdown: PsuPeripheralBreakdown;
}

export function roundUpToCommonPSUWattage(requiredWattage: number): number {
  return COMMON_PSU_WATTAGES.find(
    (wattage) => wattage >= requiredWattage
  ) ?? Math.ceil(requiredWattage / 50) * 50;
}

export function estimatePSUPlanning(
  cpu: CPU,
  gpu: GPU,
  systemOverhead = 150
): PSUPlanningEstimate {
  return estimatePSUPlanningFromPower(cpu.tdp, gpu.tdp, systemOverhead);
}

export function estimatePSUPlanningFromPower(
  cpuPower: number,
  gpuPower: number,
  systemOverhead = 150
): PSUPlanningEstimate {
  const estimatedLoad = cpuPower + gpuPower + systemOverhead;
  const lowerHeadroomEstimate = Math.round(estimatedLoad * 1.15);
  const planningEstimate = Math.round(estimatedLoad * 1.3);
  const upgradeHeadroomEstimate = Math.round(estimatedLoad * 1.5);
  const planningWattage = roundUpToCommonPSUWattage(planningEstimate);
  const upgradePlanningWattage = roundUpToCommonPSUWattage(upgradeHeadroomEstimate);

  return {
    estimatedLoad,
    lowerHeadroomEstimate,
    planningEstimate,
    planningWattage,
    upgradeHeadroomEstimate,
    upgradePlanningWattage,
    systemOverhead,
  };
}

export function estimateDetailedPSUPlanning(
  cpu: CPU,
  gpu: GPU,
  peripherals: PsuPeripheralSelection,
  secondGpuPower = 0,
): DetailedPSUPlanningEstimate {
  const assumptions = PSU_COMPONENT_ASSUMPTIONS;
  const overclockingBase = cpu.tdp + gpu.tdp + secondGpuPower;
  const peripheralBreakdown: PsuPeripheralBreakdown = {
    platform: assumptions.platform,
    memory: Math.max(0, peripherals.ramSticks) * assumptions.ramStick,
    nvme: Math.max(0, peripherals.nvmeDrives) * assumptions.nvme,
    sataSsds: Math.max(0, peripherals.sataSsds) * assumptions.sataSsd,
    hardDrives: Math.max(0, peripherals.hardDrives) * assumptions.hdd,
    caseFans: Math.max(0, peripherals.caseFans) * assumptions.caseFan,
    cooling: assumptions.cooling[peripherals.cooling],
    rgbControllers: Math.max(0, peripherals.rgbControllers) * assumptions.rgbController,
    addInCards: Math.max(0, peripherals.addInCards) * assumptions.addInCard,
    usbDevices: Math.max(0, peripherals.usbDevices) * assumptions.usbDevice,
    secondGpu: Math.max(0, secondGpuPower),
    overclocking: peripherals.overclocking
      ? Math.round(overclockingBase * assumptions.overclockingRate)
      : 0,
    manualExtra: Math.max(0, Math.round(peripherals.manualExtraWatts)),
  };
  const systemOverhead = Object.values(peripheralBreakdown).reduce((sum, watts) => sum + watts, 0);

  return {
    ...estimatePSUPlanningFromPower(cpu.tdp, gpu.tdp, systemOverhead),
    peripheralBreakdown,
  };
}
