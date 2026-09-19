import type { GPU } from '@/lib/hardware-database';

export type PsuGpuPowerTier = 'up-to-75' | '76-to-150' | '151-to-225' | '226-to-350' | 'over-350';

export type PsuGpuGuidance = {
  powerTier: PsuGpuPowerTier;
  planningClassWattage: number;
  highCurrentConnectorReview: boolean;
  officialUrl?: string;
};

/**
 * Editorial system-class bands help users shortlist a PSU before checking the
 * exact board-partner requirement. They are not official GPU minimums.
 */
export function getPsuGpuGuidance(gpu: GPU): PsuGpuGuidance {
  if (gpu.tdp <= 75) {
    return { powerTier: 'up-to-75', planningClassWattage: 450, highCurrentConnectorReview: false, officialUrl: gpu.officialUrl };
  }
  if (gpu.tdp <= 150) {
    return { powerTier: '76-to-150', planningClassWattage: 550, highCurrentConnectorReview: false, officialUrl: gpu.officialUrl };
  }
  if (gpu.tdp <= 225) {
    return { powerTier: '151-to-225', planningClassWattage: 650, highCurrentConnectorReview: false, officialUrl: gpu.officialUrl };
  }
  if (gpu.tdp <= 350) {
    return { powerTier: '226-to-350', planningClassWattage: 850, highCurrentConnectorReview: true, officialUrl: gpu.officialUrl };
  }
  return { powerTier: 'over-350', planningClassWattage: 1000, highCurrentConnectorReview: true, officialUrl: gpu.officialUrl };
}
