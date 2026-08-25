import {
  calculatePSURequirement,
  getCPUById,
  getGPUById,
  type CPU,
  type GPU,
} from '@/lib/hardware-database';
import { calculateResolutionAdjustedBalance } from '@/lib/bottleneck-model';

export type PopularBuild = {
  slug: string;
  cpuId: string;
  gpuId: string;
  ramId: string;
  ramLabel: string;
  resolution: '1080p' | '1440p' | '4K';
  category: string;
  overview: string;
  bestFor: readonly string[];
  watchFor: readonly string[];
};

export const POPULAR_BUILDS: readonly PopularBuild[] = [
  {
    slug: 'ryzen-5-5600x-rtx-4060',
    cpuId: 'ryzen-5-5600X',
    gpuId: 'rtx-4060',
    ramId: '16gb-ddr4-3600',
    ramLabel: '16GB DDR4-3600',
    resolution: '1080p',
    category: 'Value 1080p build',
    overview: 'A practical AM4 pairing for mainstream 1080p gaming. The configuration is most useful for buyers upgrading an existing DDR4 system rather than starting a premium new platform.',
    bestFor: ['Mainstream 1080p gaming', 'Existing AM4 system upgrades', 'Moderate power and cooling requirements'],
    watchFor: ['Check motherboard BIOS support before a CPU swap', '16GB is usable, but 32GB can help multitasking and newer games', 'Verify the exact graphics-card power connector'],
  },
  {
    slug: 'core-i5-12600k-rtx-4060',
    cpuId: 'i5-12600K',
    gpuId: 'rtx-4060',
    ramId: '16gb-ddr4-3600',
    ramLabel: '16GB DDR4-3600',
    resolution: '1080p',
    category: 'Balanced Intel 1080p build',
    overview: 'A capable 1080p combination with CPU headroom for high-refresh play and everyday productivity. It makes the most sense when the motherboard, memory and cooler are already compatible.',
    bestFor: ['High-refresh 1080p gaming', 'Gaming with background applications', 'Mixed gaming and productivity use'],
    watchFor: ['The K-series CPU benefits from appropriate cooling', 'Confirm DDR4 or DDR5 motherboard memory support', 'A stronger GPU may be more useful than a CPU change at higher resolutions'],
  },
  {
    slug: 'ryzen-5-7600x-rx-7800-xt',
    cpuId: 'ryzen-5-7600X',
    gpuId: 'rx-7800-XT',
    ramId: '32gb-ddr5-6000',
    ramLabel: '32GB DDR5-6000',
    resolution: '1440p',
    category: 'Balanced AMD 1440p build',
    overview: 'A modern AM5 configuration aimed at 1440p gaming. Its 16GB graphics memory and 32GB system memory provide useful capacity headroom without requiring a flagship processor.',
    bestFor: ['High-quality 1440p gaming', 'Texture-heavy games', 'A new AM5 build with future CPU options'],
    watchFor: ['Use an adequate AM5 cooler and current motherboard firmware', 'Check case clearance for the selected board-partner GPU', 'Ray-tracing performance varies substantially by game'],
  },
  {
    slug: 'core-i5-14600k-rtx-4070-super',
    cpuId: 'i5-14600K',
    gpuId: 'rtx-4070-super',
    ramId: '32gb-ddr5-6000',
    ramLabel: '32GB DDR5-6000',
    resolution: '1440p',
    category: 'High-refresh 1440p build',
    overview: 'A strong 1440p pairing for users who also value multi-core performance. The CPU and GPU both require sensible cooling and power planning, so platform cost matters as much as the headline components.',
    bestFor: ['High-refresh 1440p gaming', 'Gaming and content-creation workloads', 'Users who value NVIDIA upscaling and frame-generation support'],
    watchFor: ['Use a cooler suited to sustained CPU power', 'Confirm motherboard BIOS support for the processor', 'Prefer a native compatible GPU power cable where available'],
  },
  {
    slug: 'ryzen-7-7800x3d-rtx-5070',
    cpuId: 'ryzen-7-7800x3d',
    gpuId: 'rtx-5070',
    ramId: '32gb-ddr5-6000',
    ramLabel: '32GB DDR5-6000',
    resolution: '1440p',
    category: 'Premium gaming build',
    overview: 'A gaming-focused AM5 pairing with substantial CPU headroom at 1440p. It is best judged by the specific games and refresh-rate target because competitive and graphics-heavy workloads stress different components.',
    bestFor: ['High-refresh competitive gaming', 'Premium 1440p settings', 'CPU-sensitive simulation and strategy games'],
    watchFor: ['Do not infer a fixed FPS uplift from the score gap', 'Verify GPU dimensions and power connector requirements', 'A less expensive CPU may deliver similar results in GPU-heavy games'],
  },
  {
    slug: 'ryzen-7-9800x3d-rtx-5080',
    cpuId: 'ryzen-7-9800x3d',
    gpuId: 'rtx-5080',
    ramId: '32gb-ddr5-6000',
    ramLabel: '32GB DDR5-6000',
    resolution: '4K',
    category: 'Enthusiast 4K build',
    overview: 'An enthusiast configuration designed around high-resolution gaming. At 4K, graphics workload, VRAM use, cooling, case airflow and PSU quality usually matter more than a small difference in normalized CPU score.',
    bestFor: ['High-quality 4K gaming', 'High-refresh premium displays', 'Users planning to keep the platform for several GPU generations'],
    watchFor: ['Confirm case clearance and airflow before purchasing', 'Use a high-quality PSU with the required native connector', 'Game engine, ray tracing and upscaling choices can change real performance'],
  },
] as const;

export const POPULAR_BUILDS_REVIEWED = 'August 22, 2026';

export function getPopularBuild(slug: string) {
  return POPULAR_BUILDS.find((build) => build.slug === slug);
}

export function nextCommonPsuSize(watts: number) {
  const commonSizes = [450, 550, 650, 750, 850, 1000, 1200, 1300, 1500, 1600];
  return commonSizes.find((size) => size >= watts) ?? Math.ceil(watts / 100) * 100;
}

export function getPopularBuildAnalysis(build: PopularBuild): {
  cpu: CPU;
  gpu: GPU;
  scoreGap: number;
  constraint: 'CPU' | 'GPU' | 'Balanced';
  calculatedPsu: number;
  commonPsu: number;
} {
  const cpu = getCPUById(build.cpuId);
  const gpu = getGPUById(build.gpuId);

  if (!cpu || !gpu) {
    throw new Error(`Popular build ${build.slug} references unsupported hardware.`);
  }

  const calculatedPsu = calculatePSURequirement(cpu, gpu);
  const selectedBalance = calculateResolutionAdjustedBalance(cpu, gpu, build.resolution);
  return {
    cpu,
    gpu,
    scoreGap: selectedBalance.gapPercentage,
    constraint: selectedBalance.constraint,
    calculatedPsu,
    commonPsu: nextCommonPsuSize(calculatedPsu),
  };
}

export function getResolutionPlanningRows(cpu: CPU, gpu: GPU) {
  return [
    { resolution: '1080p' as const, cpuPressure: 'High', gpuPressure: 'Moderate' },
    { resolution: '1440p' as const, cpuPressure: 'Moderate', gpuPressure: 'High' },
    { resolution: '4K' as const, cpuPressure: 'Lower', gpuPressure: 'Very high' },
  ].map((row) => {
    const balance = calculateResolutionAdjustedBalance(cpu, gpu, row.resolution);
    const likelyConstraint = balance.constraint === 'Balanced' ? 'Close match' : `${balance.constraint}-side`;
    return {
      ...row,
      cpuScale: balance.cpuFactor,
      gpuScale: balance.gpuFactor,
      cpuIndex: balance.cpuIndex,
      gpuIndex: balance.gpuIndex,
      likelyConstraint,
    };
  });
}
