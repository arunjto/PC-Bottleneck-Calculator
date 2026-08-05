import type { CPU, GPU, Game } from '@/lib/hardware-database';
import {
  estimateFPSWithBreakdown,
  type FPSEstimate,
  type FPSModelOptions,
  type FPSQuality,
  type FPSUpscaling,
} from '@/lib/fps-model';

export const TARGET_FPS_OPTIONS = [60, 90, 120, 144] as const;

export type TargetFPS = (typeof TARGET_FPS_OPTIONS)[number];

export type TargetFPSScenario = {
  resolution: string;
  quality: FPSQuality;
  upscaling: FPSUpscaling;
  estimate: FPSEstimate;
  changes: Array<'upscaling' | 'quality' | 'resolution'>;
  meetsTarget: boolean;
  improvement: number;
};

export type TargetFPSOptimization = {
  currentEstimate: FPSEstimate;
  recommendations: TargetFPSScenario[];
  bestPossibleEstimate: FPSEstimate;
  fpsCap: number | null;
};

const QUALITY_ORDER: FPSQuality[] = [
  'low',
  'medium',
  'high',
  'ultra',
  'ray-tracing',
  'rt-ultra',
  'rt-extreme',
];

const RESOLUTION_ORDER = ['1080p', '1440p', '4K'];

const UPSCALING_OPTIONS: FPSUpscaling[] = [
  'off',
  'dlss-quality',
  'fsr-quality',
  'xess-quality',
  'nvidia-dlss',
  'amd-fsr',
  'intel-xess',
  'fsr2',
  'xe-ss',
  'dlss-balanced',
  'dlss-performance',
];

const UPSCALING_VISUAL_COST: Record<FPSUpscaling, number> = {
  off: 0,
  'dlss-quality': 1,
  'fsr-quality': 1,
  'xess-quality': 1,
  'nvidia-dlss': 2,
  'amd-fsr': 2,
  'intel-xess': 2,
  fsr2: 2,
  'xe-ss': 3,
  'dlss-balanced': 3,
  'dlss-performance': 5,
};

type ScoredScenario = TargetFPSScenario & {
  visualCost: number;
};

function scenarioChangeKey(changes: TargetFPSScenario['changes']) {
  return changes.join('+');
}

export function optimizeForTargetFPS(
  cpu: CPU,
  gpu: GPU,
  game: Game,
  currentOptions: FPSModelOptions,
  target: TargetFPS,
  recommendationLimit = 3
): TargetFPSOptimization {
  const resolution = currentOptions.resolution ?? '1080p';
  const quality = currentOptions.quality ?? 'high';
  const upscaling = currentOptions.upscaling ?? 'off';
  const currentResult = estimateFPSWithBreakdown(cpu, gpu, game, currentOptions);
  const currentQualityIndex = Math.max(0, QUALITY_ORDER.indexOf(quality));
  const currentResolutionIndex = Math.max(0, RESOLUTION_ORDER.indexOf(resolution));
  const candidateQualities = QUALITY_ORDER.slice(0, currentQualityIndex + 1);
  const candidateResolutions = RESOLUTION_ORDER.slice(0, currentResolutionIndex + 1);
  const candidateUpscaling = Array.from(new Set([upscaling, ...UPSCALING_OPTIONS]));
  const scenarios: ScoredScenario[] = [];

  for (const candidateResolution of candidateResolutions) {
    for (const candidateQuality of candidateQualities) {
      for (const candidateUpscaler of candidateUpscaling) {
        if (
          candidateResolution === resolution
          && candidateQuality === quality
          && candidateUpscaler === upscaling
        ) {
          continue;
        }

        const candidateOptions: FPSModelOptions = {
          ...currentOptions,
          resolution: candidateResolution,
          quality: candidateQuality,
          upscaling: candidateUpscaler,
        };
        const candidateResult = estimateFPSWithBreakdown(cpu, gpu, game, candidateOptions);
        if (candidateUpscaler !== 'off' && !candidateResult.breakdown.upscalingSupported) continue;
        if (candidateResult.estimate.average <= currentResult.estimate.average) continue;

        const changes: TargetFPSScenario['changes'] = [];
        if (candidateUpscaler !== upscaling) changes.push('upscaling');
        if (candidateQuality !== quality) changes.push('quality');
        if (candidateResolution !== resolution) changes.push('resolution');

        const qualityReduction = currentQualityIndex - QUALITY_ORDER.indexOf(candidateQuality);
        const resolutionReduction = currentResolutionIndex - RESOLUTION_ORDER.indexOf(candidateResolution);
        const upscalingCost = candidateUpscaler === upscaling
          ? 0
          : UPSCALING_VISUAL_COST[candidateUpscaler];

        scenarios.push({
          resolution: candidateResolution,
          quality: candidateQuality,
          upscaling: candidateUpscaler,
          estimate: candidateResult.estimate,
          changes,
          meetsTarget: candidateResult.estimate.average >= target,
          improvement: candidateResult.estimate.average - currentResult.estimate.average,
          visualCost: (qualityReduction * 4) + (resolutionReduction * 8) + upscalingCost,
        });
      }
    }
  }

  scenarios.sort((left, right) => {
    if (left.meetsTarget !== right.meetsTarget) return left.meetsTarget ? -1 : 1;
    if (left.meetsTarget && right.meetsTarget) {
      return left.visualCost - right.visualCost
        || left.changes.length - right.changes.length
        || left.estimate.average - right.estimate.average;
    }
    return right.estimate.average - left.estimate.average
      || left.visualCost - right.visualCost
      || left.changes.length - right.changes.length;
  });

  const seenChangeKinds = new Set<string>();
  const recommendations: TargetFPSScenario[] = [];
  for (const scenario of scenarios) {
    const changeKey = scenarioChangeKey(scenario.changes);
    if (seenChangeKinds.has(changeKey)) continue;
    seenChangeKinds.add(changeKey);
    recommendations.push(scenario);
    if (recommendations.length >= recommendationLimit) break;
  }

  const bestPossibleEstimate = scenarios.reduce(
    (best, scenario) => scenario.estimate.average > best.average ? scenario.estimate : best,
    currentResult.estimate
  );

  return {
    currentEstimate: currentResult.estimate,
    recommendations,
    bestPossibleEstimate,
    fpsCap: currentResult.breakdown.fpsCap,
  };
}
