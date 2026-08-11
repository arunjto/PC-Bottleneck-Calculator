import type { CPU, GPU } from '@/lib/hardware-database';

export const COMMON_PSU_WATTAGES = [450, 500, 550, 600, 650, 700, 750, 800, 850, 1000, 1200, 1500] as const;

export interface PSUPlanningEstimate {
  estimatedLoad: number;
  lowerHeadroomEstimate: number;
  planningEstimate: number;
  planningWattage: number;
  upgradeHeadroomEstimate: number;
  upgradePlanningWattage: number;
  systemOverhead: number;
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
