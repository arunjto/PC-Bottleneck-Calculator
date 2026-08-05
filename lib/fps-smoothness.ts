import type { FPSEstimate } from '@/lib/fps-model';

export type FPSSmoothnessAnalysis = {
  averageFrameTimeMs: number;
  onePercentLowFrameTimeMs: number;
  frameTimeGapMs: number;
  onePercentLowGapPercent: number;
  refreshUtilizationPercent: number;
  refreshStatus: 'meets' | 'close' | 'below';
  consistency: 'narrow' | 'moderate' | 'wide';
  suggestedVrrCeiling: number;
};

const roundOneDecimal = (value: number) => Math.round(value * 10) / 10;

export function analyzeFPSSmoothness(
  estimate: Pick<FPSEstimate, 'average' | 'onePercentLow'>,
  refreshRateHz: number
): FPSSmoothnessAnalysis {
  const safeAverage = Math.max(1, estimate.average);
  const safeOnePercentLow = Math.max(1, Math.min(safeAverage, estimate.onePercentLow));
  const safeRefreshRate = Math.max(1, refreshRateHz);
  const averageFrameTimeMs = 1000 / safeAverage;
  const onePercentLowFrameTimeMs = 1000 / safeOnePercentLow;
  const onePercentLowRatio = safeOnePercentLow / safeAverage;
  const refreshUtilizationPercent = (safeAverage / safeRefreshRate) * 100;

  return {
    averageFrameTimeMs: roundOneDecimal(averageFrameTimeMs),
    onePercentLowFrameTimeMs: roundOneDecimal(onePercentLowFrameTimeMs),
    frameTimeGapMs: roundOneDecimal(onePercentLowFrameTimeMs - averageFrameTimeMs),
    onePercentLowGapPercent: Math.round((1 - onePercentLowRatio) * 100),
    refreshUtilizationPercent: Math.round(refreshUtilizationPercent),
    refreshStatus: refreshUtilizationPercent >= 100
      ? 'meets'
      : refreshUtilizationPercent >= 80
        ? 'close'
        : 'below',
    consistency: onePercentLowRatio >= 0.8
      ? 'narrow'
      : onePercentLowRatio >= 0.65
        ? 'moderate'
        : 'wide',
    suggestedVrrCeiling: Math.max(1, safeRefreshRate - 3),
  };
}
