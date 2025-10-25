'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getCPUById,
  getGPUById,
  getGameById,
  estimateFPS,
  allGames,
} from '@/lib/hardware-database';
import { MonitorPlay } from 'lucide-react';
import type { Game } from '@/lib/hardware-database';

interface OtherGamesPerformanceProps {
  cpuId: string;
  gpuId: string;
  resolution: string;
  excludedGameId?: string;
}

const FEATURED_GAME_IDS = [
  'call-of-duty-warzone',
  'fortnite',
  'apex-legends',
  'valorant',
  'overwatch-2',
  'counter-strike-2',
  'elden-ring',
];

const RESOLUTION_DETAILS: Record<
  string,
  {
    label: string;
    presetHint: string;
  }
> = {
  '1080p': {
    label: '1920×1080 (1080p)',
    presetHint: 'High Settings',
  },
  '1440p': {
    label: '2560×1440 (1440p)',
    presetHint: 'Ultra Settings',
  },
  '4K': {
    label: '3840×2160 (4K)',
    presetHint: 'High Settings',
  },
};

const GAME_SPECIFIC_SETTINGS: Record<string, string> = {
  'fortnite': 'Epic Settings',
  'apex-legends': 'High Settings',
  'valorant': 'High Settings',
  'call-of-duty-warzone': 'Ultra Settings',
  'overwatch-2': 'High Settings',
  'counter-strike-2': 'Competitive Settings',
};

const DEMAND_SETTINGS: Record<Game['gpuDemand'], string> = {
  Low: 'High Settings',
  Medium: 'High Settings',
  High: 'High Settings',
  Extreme: 'Ultra Settings',
};

const PERFORMANCE_THRESHOLDS: Record<
  string,
  { excellent: number; great: number; good: number; playable: number }
> = {
  '1080p': {
    excellent: 200,
    great: 150,
    good: 110,
    playable: 70,
  },
  '1440p': {
    excellent: 160,
    great: 120,
    good: 90,
    playable: 55,
  },
  '4K': {
    excellent: 120,
    great: 90,
    good: 70,
    playable: 45,
  },
  default: {
    excellent: 150,
    great: 110,
    good: 80,
    playable: 50,
  },
};

function getBadgeInitials(name: string) {
  const words = name.split(' ').filter(Boolean);
  if (words.length === 1) {
    return words[0]!.slice(0, 2).toUpperCase();
  }
  return `${words[0]![0] ?? ''}${words[1]![0] ?? ''}`.toUpperCase();
}

function resolveSettingsLabel(game: Game, resolutionPresetHint: string) {
  const demandFallback = DEMAND_SETTINGS[game.gpuDemand] ?? 'High Settings';
  return GAME_SPECIFIC_SETTINGS[game.id] ?? resolutionPresetHint ?? demandFallback;
}

function getPerformanceBadge(fps: number, resolutionKey: string) {
  const thresholds = PERFORMANCE_THRESHOLDS[resolutionKey] ?? PERFORMANCE_THRESHOLDS.default;

  if (fps >= thresholds.excellent) {
    return { label: 'EXCELLENT', className: 'bg-green-100 text-green-700 border border-green-200' };
  }
  if (fps >= thresholds.great) {
    return { label: 'GREAT', className: 'bg-blue-100 text-blue-700 border border-blue-200' };
  }
  if (fps >= thresholds.good) {
    return { label: 'GOOD', className: 'bg-amber-100 text-amber-700 border border-amber-200' };
  }
  if (fps >= thresholds.playable) {
    return { label: 'PLAYABLE', className: 'bg-yellow-100 text-yellow-800 border border-yellow-200' };
  }
  return { label: 'UPGRADE ADVISED', className: 'bg-red-100 text-red-700 border border-red-200' };
}

function buildGameList(excludedGameId?: string) {
  const selections: Game[] = [];

  for (const id of FEATURED_GAME_IDS) {
    if (id === excludedGameId) continue;
    const game = getGameById(id);
    if (game) {
      selections.push(game);
    }
    if (selections.length === 4) return selections;
  }

  for (const game of allGames) {
    if (game.id === excludedGameId) continue;
    if (selections.some((existing) => existing.id === game.id)) continue;
    selections.push(game);
    if (selections.length === 4) break;
  }

  return selections;
}

export function OtherGamesPerformance({
  cpuId,
  gpuId,
  resolution,
  excludedGameId,
}: OtherGamesPerformanceProps) {
  const cpu = getCPUById(cpuId);
  const gpu = getGPUById(gpuId);

  if (!cpu || !gpu) return null;

  const comparisonGames = buildGameList(excludedGameId);
  if (!comparisonGames.length) return null;

  const resolutionDetails = RESOLUTION_DETAILS[resolution] ?? {
    label: resolution,
    presetHint: DEMAND_SETTINGS['Medium'],
  };
  const thresholds = PERFORMANCE_THRESHOLDS[resolution] ?? PERFORMANCE_THRESHOLDS.default;

  const projections = comparisonGames
    .map((game) => {
      const fps = estimateFPS(cpu, gpu, game, resolution) ?? 0;
      return {
        game,
        fps,
        preset: resolveSettingsLabel(game, resolutionDetails.presetHint),
        badge: getPerformanceBadge(fps, resolution),
      };
    })
    .sort((a, b) => b.fps - a.fps);

  return (
    <Card className="border-blue-100 shadow-md bg-slate-50/70 dark:bg-slate-900/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-800 dark:text-slate-100">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-200">
            <MonitorPlay className="h-5 w-5" />
          </span>
      Performance in Other Games
    </CardTitle>
    <p className="text-sm text-slate-600 dark:text-slate-300">
      Based on your current build ({cpu.name} + {gpu.name}), here is the expected performance in
      other popular titles at {resolutionDetails.label}.
    </p>
    <p className="text-xs text-slate-500 dark:text-slate-400">
      Badge scale for {resolutionDetails.label}: Excellent ≥ {thresholds.excellent} FPS · Great ≥ {thresholds.great} FPS · Good ≥ {thresholds.good} FPS · Playable ≥ {thresholds.playable} FPS.
    </p>
  </CardHeader>
  <CardContent>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projections.map(({ game, fps, preset, badge }) => (
            <article
              key={game.id}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80"
            >
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-400 dark:from-blue-600 dark:via-sky-500 dark:to-indigo-500" />
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600 dark:bg-blue-800/40 dark:text-blue-100">
                    {getBadgeInitials(game.name)}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      {game.category}
                    </p>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {game.name}
                    </h3>
                  </div>
                </div>

                <div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                    {Math.max(fps, 0)}
                    <span className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                      FPS (avg)
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {resolutionDetails.label} {preset}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
