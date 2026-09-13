import type { ToolSlug } from '@/lib/pc-tools';

export type BlogResourceLinks = {
  tools: readonly ToolSlug[];
  builds: readonly string[];
};

const gpuGuideResources = {
  tools: ['gpu-upgrade-calculator', 'vram-calculator', 'component-comparison'],
  builds: ['ryzen-5-7600x-rx-7800-xt', 'ryzen-7-9800x3d-rtx-5080'],
} satisfies BlogResourceLinks;

export const BLOG_RESOURCE_LINKS: Record<string, BlogResourceLinks> = {
  'best-gpu-for-gaming-2026': gpuGuideResources,
  // The Russian GPU guide predates the shared canonical-slug mapping.
  'luchshie-videokarty-dlya-igr-2026': gpuGuideResources,
  'cpu-vs-gpu-bottleneck-explained': {
    tools: ['component-comparison', 'cpu-upgrade-calculator', 'gpu-upgrade-calculator'],
    builds: ['ryzen-5-5600x-rtx-4060', 'core-i5-14600k-rtx-4070-super'],
  },
  'how-to-check-pc-bottleneck': {
    tools: ['component-comparison', 'pc-upgrade-priority-calculator', 'gaming-ram-calculator'],
    builds: ['core-i5-12600k-rtx-4060', 'ryzen-5-7600x-rx-7800-xt'],
  },
  'how-to-estimate-gaming-fps': {
    tools: ['resolution-scaling-calculator', 'game-settings-optimizer', 'what-games-can-my-pc-run'],
    builds: ['ryzen-7-7800x3d-rtx-5070', 'ryzen-7-9800x3d-rtx-5080'],
  },
  'how-to-check-fps-on-pc': {
    tools: ['frame-time-calculator', 'fps-refresh-rate-calculator', 'ssd-upgrade-calculator'],
    builds: ['core-i5-12600k-rtx-4060'],
  },
  'how-much-vram-do-you-need-for-gaming': {
    tools: ['vram-calculator', 'gpu-upgrade-calculator', 'game-settings-optimizer'],
    builds: ['ryzen-5-7600x-rx-7800-xt', 'ryzen-7-9800x3d-rtx-5080'],
  },
  'how-much-psu-wattage-do-i-need': {
    tools: ['pc-upgrade-priority-calculator', 'component-comparison'],
    builds: ['core-i5-14600k-rtx-4070-super', 'ryzen-7-9800x3d-rtx-5080'],
  },
};

export function getBlogResourceLinks(canonicalSlug: string) {
  return BLOG_RESOURCE_LINKS[canonicalSlug] ?? null;
}
