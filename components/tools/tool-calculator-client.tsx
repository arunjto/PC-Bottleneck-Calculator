'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n-config';
import type { ToolSlug } from '@/lib/pc-tools';
import { ComponentComparison } from '@/components/calculators/component-comparison';
import { ToolCalculator, type ToolDatasets } from '@/components/tools/tool-calculator';
import { WhatGamesCanMyPCRun } from '@/components/tools/what-games-can-my-pc-run';
import {
  allCPUs,
  allGPUs,
  allGames,
  HARDWARE_DATABASE_UPDATED,
  HARDWARE_SCORE_METHODOLOGY_VERSION,
} from '@/lib/hardware-client-data';

type Props = {
  slug: ToolSlug;
  lang: Locale;
};

const data: ToolDatasets = {
  cpus: allCPUs.map((cpu) => ({
    id: cpu.id,
    name: cpu.name,
    score: cpu.benchmarkScore,
    tdp: cpu.tdp,
    cores: cpu.cores,
    socket: cpu.socket,
    brand: cpu.brand,
    series: cpu.series,
    tier: cpu.tier,
    category: cpu.category,
    baseClock: cpu.baseClock,
    boostClock: cpu.boostClock,
    threads: cpu.threads,
    architecture: cpu.architecture,
    releaseYear: cpu.releaseYear,
    officialUrl: cpu.officialUrl,
  })),
  gpus: allGPUs.map((gpu) => ({
    id: gpu.id,
    name: gpu.name,
    score: gpu.benchmarkScore,
    tdp: gpu.tdp,
    vram: gpu.vram,
    brand: gpu.brand,
    series: gpu.series,
    tier: gpu.tier,
    category: gpu.category,
    baseClock: gpu.baseClock,
    boostClock: gpu.boostClock,
    architecture: gpu.architecture,
    releaseYear: gpu.releaseYear,
    officialUrl: gpu.officialUrl,
  })),
  games: allGames.map((game) => ({
    id: game.id,
    name: game.name,
    cpuDemand: game.cpuDemand,
    gpuDemand: game.gpuDemand,
    ramRequirement: game.ramRequirement,
    category: game.category,
    storageRequirement: game.storageRequirement,
    releaseYear: game.releaseYear,
    optimizations: game.optimizations,
  })),
  databaseUpdated: HARDWARE_DATABASE_UPDATED,
  scoreMethodologyVersion: HARDWARE_SCORE_METHODOLOGY_VERSION,
};

function readClientSelection() {
  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;
  const hashParams = new URLSearchParams(hash);
  const queryParams = new URLSearchParams(window.location.search);
  const source = hashParams.size > 0 ? hashParams : queryParams;
  return Object.fromEntries(source.entries());
}

export function ToolCalculatorClient({ slug, lang }: Props) {
  const [initialSelection, setInitialSelection] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const selection = readClientSelection();
    setInitialSelection(selection);

    if (window.location.search && !window.location.hash) {
      const query = window.location.search.slice(1);
      window.history.replaceState(null, '', `${window.location.pathname}#${query}`);
    }
  }, []);

  if (initialSelection === null) {
    return (
      <div
        aria-hidden="true"
        className="h-96 animate-pulse rounded-2xl border bg-muted/40"
      />
    );
  }

  if (slug === 'component-comparison') {
    return (
      <ComponentComparison
        lang={lang}
        cpus={data.cpus}
        gpus={data.gpus}
        initialSelection={initialSelection}
        databaseUpdated={data.databaseUpdated}
        scoreMethodologyVersion={data.scoreMethodologyVersion}
      />
    );
  }

  if (slug === 'what-games-can-my-pc-run') {
    return <WhatGamesCanMyPCRun lang={lang} data={data} initialSelection={initialSelection} />;
  }

  return (
    <ToolCalculator
      slug={slug}
      lang={lang}
      data={data}
      initialSelection={initialSelection}
    />
  );
}
