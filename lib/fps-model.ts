import type { CPU, GPU, Game } from '@/lib/hardware-database';

export const FPS_MODEL_VERSION = '2026.07';

export type FPSQuality = 'low' | 'medium' | 'high' | 'ultra' | 'ray-tracing' | 'rt-ultra' | 'rt-extreme';
export type FPSUpscaling = 'off' | 'nvidia-dlss' | 'amd-fsr' | 'intel-xess' | 'dlss-quality' | 'dlss-balanced' | 'dlss-performance' | 'fsr2' | 'fsr-quality' | 'xe-ss' | 'xess-quality';
export type FPSAntiAliasing = 'off' | 'fxaa' | 'smaa' | 'taa' | 'msaa-2x' | 'msaa-4x' | 'msaa-8x' | 'dlss-aa';

export interface FPSModelOptions {
  resolution?: string;
  quality?: FPSQuality;
  upscaling?: FPSUpscaling;
  antiAliasing?: FPSAntiAliasing;
  ramGB?: number;
  ramSpeedMT?: number;
  storage?: 'hdd' | 'sata-ssd' | 'nvme-ssd';
}

export interface FPSEstimate {
  average: number;
  low: number;
  high: number;
  onePercentLow: number;
  limitingComponent: 'CPU' | 'GPU' | 'Mixed';
  confidence: 'planning' | 'speculative';
  referenceFps: number;
  requiredVramGB: number;
  warnings: string[];
}

export type FPSBreakdownStageKey =
  | 'reference'
  | 'cpu'
  | 'gpu'
  | 'resolution'
  | 'quality'
  | 'upscaling'
  | 'antiAliasing'
  | 'vram'
  | 'ram'
  | 'memorySpeed'
  | 'storage'
  | 'fpsCap';

export interface FPSBreakdownStage {
  key: FPSBreakdownStageKey;
  factor: number | null;
  fpsAfter: number;
}

export interface FPSCalculationBreakdown {
  profileSource: 'game-profile' | 'demand-fallback';
  stages: FPSBreakdownStage[];
  cpuScore: number;
  gpuScore: number;
  cpuScale: number;
  gpuScale: number;
  cpuWeight: number;
  gpuWeight: number;
  requiredVramGB: number;
  availableVramGB: number;
  requiredRamGB: number;
  selectedRamGB: number;
  upscalingSupported: boolean;
  fpsCap: number | null;
  uncappedAverage: number;
}

export interface FPSCalculationResult {
  estimate: FPSEstimate;
  breakdown: FPSCalculationBreakdown;
}

type GameProfile = {
  referenceFps: number;
  cpuWeight: number;
  gpuWeight: number;
  fpsCap?: number;
  speculative?: boolean;
};

// Reference FPS represents a 90-score CPU + 90-score GPU at 1080p High, native rendering.
// Values are editorial calibration anchors, not measurements for a particular retail system.
const GAME_PROFILES: Record<string, GameProfile> = {
  'gta-vi': { referenceFps: 75, cpuWeight: 0.55, gpuWeight: 0.45, speculative: true },
  'black-myth-wukong': { referenceFps: 85, cpuWeight: 0.35, gpuWeight: 0.65 },
  'dragons-dogma-2': { referenceFps: 80, cpuWeight: 0.65, gpuWeight: 0.35 },
  'helldivers-2': { referenceFps: 120, cpuWeight: 0.55, gpuWeight: 0.45 },
  starfield: { referenceFps: 85, cpuWeight: 0.55, gpuWeight: 0.45 },
  'baldurs-gate-3': { referenceFps: 130, cpuWeight: 0.6, gpuWeight: 0.4 },
  'cyberpunk-2077': { referenceFps: 105, cpuWeight: 0.35, gpuWeight: 0.65 },
  'elden-ring': { referenceFps: 100, cpuWeight: 0.45, gpuWeight: 0.55, fpsCap: 60 },
  'counter-strike-2': { referenceFps: 330, cpuWeight: 0.72, gpuWeight: 0.28 },
  valorant: { referenceFps: 420, cpuWeight: 0.78, gpuWeight: 0.22 },
  'overwatch-2': { referenceFps: 250, cpuWeight: 0.62, gpuWeight: 0.38 },
  fortnite: { referenceFps: 200, cpuWeight: 0.58, gpuWeight: 0.42 },
  'apex-legends': { referenceFps: 200, cpuWeight: 0.52, gpuWeight: 0.48 },
  'call-of-duty-warzone': { referenceFps: 150, cpuWeight: 0.55, gpuWeight: 0.45 },
  'assassins-creed-mirage': { referenceFps: 140, cpuWeight: 0.45, gpuWeight: 0.55 },
  'hogwarts-legacy': { referenceFps: 110, cpuWeight: 0.45, gpuWeight: 0.55 },
  'the-witcher-3-nextgen': { referenceFps: 140, cpuWeight: 0.4, gpuWeight: 0.6 },
  'red-dead-redemption-2': { referenceFps: 120, cpuWeight: 0.4, gpuWeight: 0.6 },
  'resident-evil-4-remake': { referenceFps: 160, cpuWeight: 0.4, gpuWeight: 0.6 },
  'spider-man-2': { referenceFps: 110, cpuWeight: 0.42, gpuWeight: 0.58 },
  'the-last-of-us-part-i': { referenceFps: 100, cpuWeight: 0.45, gpuWeight: 0.55 },
  'alan-wake-2': { referenceFps: 75, cpuWeight: 0.3, gpuWeight: 0.7 },
  'forza-horizon-5': { referenceFps: 150, cpuWeight: 0.42, gpuWeight: 0.58 },
  'microsoft-flight-simulator': { referenceFps: 90, cpuWeight: 0.7, gpuWeight: 0.3 },
  'rainbow-six-siege': { referenceFps: 320, cpuWeight: 0.62, gpuWeight: 0.38 },
  'pubg-battlegrounds': { referenceFps: 180, cpuWeight: 0.6, gpuWeight: 0.4 },
  'league-of-legends': { referenceFps: 420, cpuWeight: 0.8, gpuWeight: 0.2 },
  'dota-2': { referenceFps: 260, cpuWeight: 0.72, gpuWeight: 0.28 },
  'minecraft-rtx': { referenceFps: 90, cpuWeight: 0.35, gpuWeight: 0.65 },
  'genshin-impact': { referenceFps: 120, cpuWeight: 0.45, gpuWeight: 0.55, fpsCap: 60 },
  palworld: { referenceFps: 120, cpuWeight: 0.58, gpuWeight: 0.42 },
  'senua-saga-hellblade-ii': { referenceFps: 75, cpuWeight: 0.3, gpuWeight: 0.7 },
  'fortnite-ue5-creative': { referenceFps: 130, cpuWeight: 0.45, gpuWeight: 0.55 },
  'battlefield-2042': { referenceFps: 150, cpuWeight: 0.62, gpuWeight: 0.38 },
};

export function hasFPSGameProfile(gameId: string): boolean {
  return Object.prototype.hasOwnProperty.call(GAME_PROFILES, gameId);
}

const RESOLUTION_FACTORS: Record<string, number> = { '1080p': 1, '1440p': 0.76, '4K': 0.44 };
const QUALITY_FACTORS: Record<FPSQuality, number> = { low: 1.34, medium: 1.16, high: 1, ultra: 0.88, 'ray-tracing': 0.68, 'rt-ultra': 0.56, 'rt-extreme': 0.46 };
const UPSCALING_FACTORS: Record<FPSUpscaling, number> = { off: 1, 'nvidia-dlss': 1.22, 'amd-fsr': 1.16, 'intel-xess': 1.14, 'dlss-quality': 1.18, 'dlss-balanced': 1.28, 'dlss-performance': 1.42, fsr2: 1.18, 'fsr-quality': 1.15, 'xe-ss': 1.16, 'xess-quality': 1.13 };
const AA_FACTORS: Record<FPSAntiAliasing, number> = { off: 1.03, fxaa: 1, smaa: 0.98, taa: 0.96, 'msaa-2x': 0.94, 'msaa-4x': 0.88, 'msaa-8x': 0.78, 'dlss-aa': 0.96 };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function defaultProfile(game: Game): GameProfile {
  const demandBase = { Low: 220, Medium: 150, High: 105, Extreme: 75 }[game.gpuDemand];
  const cpuWeight = game.category === 'Esports' ? 0.65 : game.cpuDemand === 'Extreme' ? 0.62 : game.cpuDemand === 'High' ? 0.52 : 0.42;
  return { referenceFps: demandBase, cpuWeight, gpuWeight: 1 - cpuWeight };
}

function requiredVram(game: Game, resolution: string, quality: FPSQuality): number {
  const base = { Low: 4, Medium: 6, High: 8, Extreme: 10 }[game.gpuDemand];
  const resolutionExtra = resolution === '4K' ? 4 : resolution === '1440p' ? 2 : 0;
  const qualityExtra = quality === 'ultra' ? 2 : quality.startsWith('rt-') || quality === 'ray-tracing' ? 3 : quality === 'low' ? -2 : 0;
  return clamp(base + resolutionExtra + qualityExtra, 4, 16);
}

function supportsUpscaling(gpu: GPU, game: Game, upscaling: FPSUpscaling): boolean {
  if (upscaling === 'off') return true;
  if (upscaling.startsWith('dlss') || upscaling === 'nvidia-dlss') return gpu.brand === 'NVIDIA' && game.optimizations.some((item) => item.includes('DLSS'));
  if (upscaling.includes('fsr') || upscaling === 'amd-fsr') return game.optimizations.some((item) => item.includes('FSR'));
  return gpu.brand === 'Intel' || game.optimizations.some((item) => item.includes('XeSS'));
}

export function estimateFPSWithBreakdown(cpu: CPU, gpu: GPU, game: Game, options: FPSModelOptions = {}): FPSCalculationResult {
  const resolution = options.resolution ?? '1080p';
  const quality = options.quality ?? 'high';
  const upscaling = options.upscaling ?? 'off';
  const antiAliasing = options.antiAliasing ?? 'fxaa';
  const ramGB = options.ramGB ?? 16;
  const ramSpeedMT = options.ramSpeedMT ?? 3200;
  const storage = options.storage ?? 'nvme-ssd';
  const knownProfile = GAME_PROFILES[game.id];
  const profile = knownProfile ?? defaultProfile(game);
  const warnings: string[] = [];

  const resolutionFactor = RESOLUTION_FACTORS[resolution] ?? 1;
  const cpuResolutionWeight = resolution === '4K' ? 0.55 : resolution === '1440p' ? 0.78 : 1;
  const cpuWeight = profile.cpuWeight * cpuResolutionWeight;
  const gpuWeight = 1 - cpuWeight;
  const cpuScale = clamp(cpu.benchmarkScore / 90, 0.3, 1.15);
  const gpuScale = clamp(gpu.benchmarkScore / 90, 0.25, 1.12);
  const cpuFactor = Math.pow(cpuScale, cpuWeight);
  const gpuFactor = Math.pow(gpuScale, gpuWeight);

  const vramRequired = requiredVram(game, resolution, quality);
  const vramShortfall = Math.max(0, vramRequired - gpu.vram);
  const vramFactor = vramShortfall > 0 ? clamp(1 - vramShortfall * 0.055, 0.68, 1) : 1;
  if (vramShortfall > 0) warnings.push(`Estimated VRAM need is about ${vramRequired} GB; the selected GPU has ${gpu.vram} GB.`);

  const ramShortfall = Math.max(0, game.ramRequirement - ramGB);
  const ramFactor = ramShortfall > 0 ? clamp(1 - ramShortfall * 0.025, 0.72, 1) : 1;
  if (ramShortfall > 0) warnings.push(`The selected ${ramGB} GB RAM is below the game's ${game.ramRequirement} GB planning requirement.`);

  const memorySpeedFactor = clamp(0.97 + ((ramSpeedMT - 2666) / (6000 - 2666)) * 0.06, 0.97, 1.03);
  const storageFactor = storage === 'hdd' ? 0.98 : storage === 'sata-ssd' ? 0.995 : 1;
  const supportedUpscaling = supportsUpscaling(gpu, game, upscaling);
  const upscalingFactor = supportedUpscaling ? UPSCALING_FACTORS[upscaling] : 1;
  if (!supportedUpscaling) warnings.push('The selected upscaling option is not listed as supported for this GPU and game, so no uplift was applied.');

  const stages: FPSBreakdownStage[] = [
    { key: 'reference', factor: null, fpsAfter: profile.referenceFps },
  ];
  let average = profile.referenceFps;
  const applyFactor = (key: FPSBreakdownStageKey, factor: number) => {
    average *= factor;
    stages.push({ key, factor, fpsAfter: average });
  };

  applyFactor('cpu', cpuFactor);
  applyFactor('gpu', gpuFactor);
  applyFactor('resolution', resolutionFactor);
  applyFactor('quality', QUALITY_FACTORS[quality]);
  applyFactor('upscaling', upscalingFactor);
  applyFactor('antiAliasing', AA_FACTORS[antiAliasing]);
  applyFactor('vram', vramFactor);
  applyFactor('ram', ramFactor);
  applyFactor('memorySpeed', memorySpeedFactor);
  applyFactor('storage', storageFactor);

  const uncappedAverage = average;
  if (profile.fpsCap) {
    const cappedAverage = Math.min(average, profile.fpsCap);
    stages.push({
      key: 'fpsCap',
      factor: average > 0 ? cappedAverage / average : 1,
      fpsAfter: cappedAverage,
    });
    average = cappedAverage;
  }
  average = Math.max(1, Math.round(average));

  const cpuCapacity = cpuScale / (profile.cpuWeight + 0.25);
  const gpuCapacity = (gpuScale * resolutionFactor * QUALITY_FACTORS[quality] * vramFactor) / (profile.gpuWeight + 0.25);
  const capacityGap = Math.abs(cpuCapacity - gpuCapacity) / Math.max(cpuCapacity, gpuCapacity);
  const limitingComponent: FPSEstimate['limitingComponent'] = capacityGap < 0.12 ? 'Mixed' : cpuCapacity < gpuCapacity ? 'CPU' : 'GPU';

  const uncertainty = profile.speculative ? 0.2 : 0.13;
  const low = Math.max(1, Math.round(average * (1 - uncertainty)));
  const high = profile.fpsCap ? Math.min(profile.fpsCap, Math.round(average * (1 + uncertainty))) : Math.round(average * (1 + uncertainty));
  const lowStability = clamp(0.78 + (cpuScale - 1) * 0.1 - ramShortfall * 0.012 - vramShortfall * 0.018 - (storage === 'hdd' ? 0.04 : 0), 0.58, 0.86);
  const onePercentLow = Math.max(1, Math.min(average, Math.round(average * lowStability)));

  if (profile.speculative) warnings.push('This game profile is speculative because final PC performance data is not established.');

  return {
    estimate: {
      average,
      low,
      high,
      onePercentLow,
      limitingComponent,
      confidence: profile.speculative ? 'speculative' : 'planning',
      referenceFps: profile.referenceFps,
      requiredVramGB: vramRequired,
      warnings,
    },
    breakdown: {
      profileSource: knownProfile ? 'game-profile' : 'demand-fallback',
      stages,
      cpuScore: cpu.benchmarkScore,
      gpuScore: gpu.benchmarkScore,
      cpuScale,
      gpuScale,
      cpuWeight,
      gpuWeight,
      requiredVramGB: vramRequired,
      availableVramGB: gpu.vram,
      requiredRamGB: game.ramRequirement,
      selectedRamGB: ramGB,
      upscalingSupported: supportedUpscaling,
      fpsCap: profile.fpsCap ?? null,
      uncappedAverage,
    },
  };
}

export function estimateFPSRange(cpu: CPU, gpu: GPU, game: Game, options: FPSModelOptions = {}): FPSEstimate {
  return estimateFPSWithBreakdown(cpu, gpu, game, options).estimate;
}

/** Backward-compatible midpoint used by comparison cards and secondary projections. */
export function estimateFPS(cpu: CPU, gpu: GPU, game: Game, resolution: string): number {
  return estimateFPSRange(cpu, gpu, game, { resolution }).average;
}
