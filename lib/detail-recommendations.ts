import type { GameGuideSlug } from '@/lib/can-i-run';
import { POPULAR_BUILDS, getPopularBuildAnalysis, type PopularBuild } from '@/lib/popular-builds';

export const GAME_SIBLINGS: Record<GameGuideSlug, readonly GameGuideSlug[]> = {
  'cyberpunk-2077': ['fortnite', 'elden-ring'],
  'forza-horizon-5': ['cyberpunk-2077', 'fortnite'],
  'apex-legends': ['counter-strike-2', 'fortnite'],
  'counter-strike-2': ['apex-legends', 'fortnite'],
  fortnite: ['apex-legends', 'counter-strike-2'],
  'elden-ring': ['cyberpunk-2077', 'forza-horizon-5'],
};

export const GAME_ARTICLES: Record<GameGuideSlug, readonly string[]> = {
  'cyberpunk-2077': ['how-to-estimate-gaming-fps', 'best-gpu-for-gaming-2026'],
  'forza-horizon-5': ['how-to-check-fps-on-pc', 'how-to-estimate-gaming-fps'],
  'apex-legends': ['how-to-check-fps-on-pc', 'cpu-vs-gpu-bottleneck-explained'],
  'counter-strike-2': ['how-to-check-fps-on-pc', 'how-to-check-pc-bottleneck'],
  fortnite: ['how-to-estimate-gaming-fps', 'how-much-vram-do-you-need-for-gaming'],
  'elden-ring': ['how-to-check-fps-on-pc', 'how-to-estimate-gaming-fps'],
};

export const BUILD_GAMES: Record<string, readonly GameGuideSlug[]> = {
  'ryzen-5-5600x-rtx-4060': ['apex-legends', 'counter-strike-2'],
  'core-i5-12600k-rtx-4060': ['counter-strike-2', 'fortnite'],
  'ryzen-5-7600x-rx-7800-xt': ['forza-horizon-5', 'cyberpunk-2077'],
  'core-i5-14600k-rtx-4070-super': ['fortnite', 'cyberpunk-2077'],
  'ryzen-7-7800x3d-rtx-5070': ['counter-strike-2', 'fortnite'],
  'ryzen-7-9800x3d-rtx-5080': ['cyberpunk-2077', 'elden-ring'],
};

export const BUILD_ARTICLES: Record<string, readonly string[]> = {
  'ryzen-5-5600x-rtx-4060': ['how-to-check-pc-bottleneck', 'cpu-vs-gpu-bottleneck-explained'],
  'core-i5-12600k-rtx-4060': ['how-to-check-pc-bottleneck', 'how-to-check-fps-on-pc'],
  'ryzen-5-7600x-rx-7800-xt': ['best-gpu-for-gaming-2026', 'how-much-vram-do-you-need-for-gaming'],
  'core-i5-14600k-rtx-4070-super': ['how-to-estimate-gaming-fps', 'how-much-psu-wattage-do-i-need'],
  'ryzen-7-7800x3d-rtx-5070': ['how-to-estimate-gaming-fps', 'best-gpu-for-gaming-2026'],
  'ryzen-7-9800x3d-rtx-5080': ['how-much-vram-do-you-need-for-gaming', 'how-much-psu-wattage-do-i-need'],
};

export function getRelatedPopularBuilds(build: PopularBuild, limit = 3) {
  const current = getPopularBuildAnalysis(build);
  return POPULAR_BUILDS
    .filter((candidate) => candidate.slug !== build.slug)
    .map((candidate) => {
      const analysis = getPopularBuildAnalysis(candidate);
      const score =
        (candidate.resolution === build.resolution ? 8 : 0) +
        (analysis.cpu.socket === current.cpu.socket ? 4 : 0) +
        (analysis.gpu.brand === current.gpu.brand ? 2 : 0) -
        Math.abs(analysis.commonPsu - current.commonPsu) / 200;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.slug.localeCompare(b.candidate.slug))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
