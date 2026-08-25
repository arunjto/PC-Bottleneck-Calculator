import type { CPU, GPU } from '@/lib/hardware-database';

export type GamingResolution = '1080p' | '1440p' | '4K';
export type PlanningConstraint = 'CPU' | 'GPU' | 'Balanced';

type ResolutionProfile = {
  cpuFactor: number;
  gpuFactor: number;
};

/**
 * A deliberately moderate gaming-workload tilt applied to the site's
 * normalized component scores. Higher resolutions usually shift more of the
 * frame workload toward the GPU, but these factors are not pixel-scaling
 * ratios, utilization predictions or measured benchmark results.
 */
export const GAMING_RESOLUTION_PROFILES: Record<GamingResolution, ResolutionProfile> = {
  '1080p': { cpuFactor: 0.94, gpuFactor: 1 },
  '1440p': { cpuFactor: 0.98, gpuFactor: 0.94 },
  '4K': { cpuFactor: 1, gpuFactor: 0.82 },
};

export type ResolutionAdjustedBalance = {
  resolution: GamingResolution;
  cpuIndex: number;
  gpuIndex: number;
  gapPercentage: number;
  constraint: PlanningConstraint;
  cpuFactor: number;
  gpuFactor: number;
};

const BALANCED_GAP_THRESHOLD = 8;

function normalizeGamingResolution(resolution: string): GamingResolution {
  if (resolution.toLowerCase() === '4k') return '4K';
  if (resolution === '1440p') return '1440p';
  return '1080p';
}

export function calculateResolutionAdjustedBalance(
  cpu: CPU,
  gpu: GPU,
  resolution: string,
): ResolutionAdjustedBalance {
  const normalizedResolution = normalizeGamingResolution(resolution);
  const profile = GAMING_RESOLUTION_PROFILES[normalizedResolution];
  const cpuIndex = Math.min(100, Math.max(0, Math.round(cpu.benchmarkScore * profile.cpuFactor)));
  const gpuIndex = Math.min(100, Math.max(0, Math.round(gpu.benchmarkScore * profile.gpuFactor)));
  const higherIndex = Math.max(cpuIndex, gpuIndex);
  const gapPercentage = higherIndex === 0
    ? 0
    : Math.round((Math.abs(cpuIndex - gpuIndex) / higherIndex) * 100);
  const constraint: PlanningConstraint = gapPercentage <= BALANCED_GAP_THRESHOLD
    ? 'Balanced'
    : cpuIndex < gpuIndex
      ? 'CPU'
      : 'GPU';

  return {
    resolution: normalizedResolution,
    cpuIndex,
    gpuIndex,
    gapPercentage,
    constraint,
    ...profile,
  };
}
