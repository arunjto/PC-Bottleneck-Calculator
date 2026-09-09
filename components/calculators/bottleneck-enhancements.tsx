'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Database,
  Download,
  ExternalLink,
  Gamepad2,
  GitCompareArrows,
  MemoryStick,
  Share2,
} from 'lucide-react';
import type { Locale } from '@/i18n-config';
import {
  allCPUs,
  allGPUs,
  allGames,
  HARDWARE_DATABASE_UPDATED,
  HARDWARE_SCORE_METHODOLOGY_VERSION,
  type CPU,
  type GPU,
} from '@/lib/hardware-database';
import { calculateResolutionAdjustedBalance } from '@/lib/bottleneck-model';
import { estimateFPSWithBreakdown, type FPSQuality } from '@/lib/fps-model';
import { serializeFPSShareConfig } from '@/lib/fps-share';
import { estimatePSUPlanning } from '@/lib/psu-model';
import { getLocalizedPath } from '@/lib/path-translations';
import { BOTTLENECK_ENHANCEMENT_COPY } from '@/lib/bottleneck-enhancements-i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type BottleneckRamProfile = {
  id: string;
  name: string;
  tier: string;
  specs: string;
  price: number;
};

type Props = {
  cpu: CPU;
  gpu: GPU;
  ram: BottleneckRamProfile;
  resolution: string;
  lang: Locale;
};

const comparisonRamOptions = [
  { id: '8gb-ddr4-3200', name: '8GB DDR4-3200' },
  { id: '16gb-ddr4-3200', name: '16GB DDR4-3200' },
  { id: '16gb-ddr5-5600', name: '16GB DDR5-5600' },
  { id: '32gb-ddr4-3600', name: '32GB DDR4-3600' },
  { id: '32gb-ddr5-6000', name: '32GB DDR5-6000' },
  { id: '64gb-ddr5-6000', name: '64GB DDR5-6000' },
] as const;

const qualityOptions: FPSQuality[] = ['low', 'medium', 'high', 'ultra', 'ray-tracing'];
const psuOptions = [450, 500, 550, 600, 650, 700, 750, 850, 1000, 1200];
const localizedTerms: Record<Locale, {
  qualities: Record<FPSQuality, string>;
  balanced: string;
  mixed: string;
  copyFailed: string;
  cardTitle: string;
  cardNotice: string;
}> = {
  en: { qualities: { low: 'Low', medium: 'Medium', high: 'High', ultra: 'Ultra', 'ray-tracing': 'Ray tracing', 'rt-ultra': 'RT Ultra', 'rt-extreme': 'RT Extreme' }, balanced: 'Balanced', mixed: 'Mixed', copyFailed: 'Copy failed. Reopen the shared result and copy the browser address.', cardTitle: 'CPU–GPU planning result', cardNotice: 'Planning comparison—not measured FPS loss or a laboratory benchmark.' },
  it: { qualities: { low: 'Bassa', medium: 'Media', high: 'Alta', ultra: 'Ultra', 'ray-tracing': 'Ray tracing', 'rt-ultra': 'RT Ultra', 'rt-extreme': 'RT Extreme' }, balanced: 'Bilanciato', mixed: 'Misto', copyFailed: 'Copia non riuscita. Riapri il risultato e copia l’indirizzo del browser.', cardTitle: 'Risultato di pianificazione CPU–GPU', cardNotice: 'Confronto di pianificazione, non perdita FPS misurata né benchmark di laboratorio.' },
  fr: { qualities: { low: 'Faible', medium: 'Moyenne', high: 'Élevée', ultra: 'Ultra', 'ray-tracing': 'Ray tracing', 'rt-ultra': 'RT Ultra', 'rt-extreme': 'RT Extreme' }, balanced: 'Équilibré', mixed: 'Mixte', copyFailed: 'Échec de la copie. Rouvrez le résultat et copiez l’adresse du navigateur.', cardTitle: 'Résultat de planification CPU–GPU', cardNotice: 'Comparaison de planification, pas une perte de FPS mesurée ni un benchmark de laboratoire.' },
  de: { qualities: { low: 'Niedrig', medium: 'Mittel', high: 'Hoch', ultra: 'Ultra', 'ray-tracing': 'Raytracing', 'rt-ultra': 'RT Ultra', 'rt-extreme': 'RT Extreme' }, balanced: 'Ausgeglichen', mixed: 'Gemischt', copyFailed: 'Kopieren fehlgeschlagen. Ergebnis erneut öffnen und Browseradresse kopieren.', cardTitle: 'CPU–GPU-Planungsergebnis', cardNotice: 'Planungsvergleich, kein gemessener FPS-Verlust oder Labor-Benchmark.' },
  es: { qualities: { low: 'Baja', medium: 'Media', high: 'Alta', ultra: 'Ultra', 'ray-tracing': 'Trazado de rayos', 'rt-ultra': 'RT Ultra', 'rt-extreme': 'RT Extreme' }, balanced: 'Equilibrado', mixed: 'Mixto', copyFailed: 'No se pudo copiar. Vuelve a abrir el resultado y copia la dirección del navegador.', cardTitle: 'Resultado de planificación CPU–GPU', cardNotice: 'Comparación de planificación, no pérdida de FPS medida ni benchmark de laboratorio.' },
  ru: { qualities: { low: 'Низкое', medium: 'Среднее', high: 'Высокое', ultra: 'Ультра', 'ray-tracing': 'Трассировка лучей', 'rt-ultra': 'RT Ультра', 'rt-extreme': 'RT Экстремальное' }, balanced: 'Сбалансировано', mixed: 'Смешанное', copyFailed: 'Не удалось скопировать. Снова откройте результат и скопируйте адрес браузера.', cardTitle: 'Результат планирования CPU–GPU', cardNotice: 'Плановое сравнение, а не измеренная потеря FPS или лабораторный бенчмарк.' },
};

function parseRam(ramId: string) {
  return {
    size: Number(ramId.match(/^(\d+)gb/)?.[1] ?? 16),
    speed: Number(ramId.match(/-(\d+)$/)?.[1] ?? 3200),
  };
}

function getRank(score: number, scores: number[]) {
  return 1 + scores.filter((candidate) => candidate > score).length;
}

function Status({ ready, readyLabel, reviewLabel }: { ready: boolean; readyLabel: string; reviewLabel: string }) {
  return ready ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />{readyLabel}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-950 dark:text-amber-200">
      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />{reviewLabel}
    </span>
  );
}

export function BottleneckEnhancements({ cpu, gpu, ram, resolution, lang }: Props) {
  const copy = BOTTLENECK_ENHANCEMENT_COPY[lang] ?? BOTTLENECK_ENHANCEMENT_COPY.en;
  const terms = localizedTerms[lang] ?? localizedTerms.en;
  const selectedBalance = calculateResolutionAdjustedBalance(cpu, gpu, resolution);
  const parsedRam = parseRam(ram.id);
  const defaultGame = allGames.find((game) => game.id === 'cyberpunk-2077') ?? allGames[0];
  const [gameId, setGameId] = useState(defaultGame?.id ?? '');
  const [quality, setQuality] = useState<FPSQuality>('high');
  const [storage, setStorage] = useState<'hdd' | 'sata-ssd' | 'nvme-ssd'>('nvme-ssd');
  const [memoryChannels, setMemoryChannels] = useState<'single' | 'dual'>('dual');
  const [motherboardSocket, setMotherboardSocket] = useState('unknown');
  const [psuCapacity, setPsuCapacity] = useState(650);
  const [coolerClass, setCoolerClass] = useState<'stock' | 'tower' | 'large'>('tower');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [compareCpuId, setCompareCpuId] = useState(allCPUs.find((item) => item.id !== cpu.id)?.id ?? cpu.id);
  const [compareGpuId, setCompareGpuId] = useState(allGPUs.find((item) => item.id !== gpu.id)?.id ?? gpu.id);
  const [compareRamId, setCompareRamId] = useState<string>(
    comparisonRamOptions.find((item) => item.id === ram.id)?.id
      ?? comparisonRamOptions.find((item) => parseRam(item.id).size === parsedRam.size)?.id
      ?? '16gb-ddr4-3200'
  );

  const selectedGame = allGames.find((game) => game.id === gameId) ?? defaultGame;
  const gameResult = useMemo(() => selectedGame
    ? estimateFPSWithBreakdown(cpu, gpu, selectedGame, {
        resolution,
        quality,
        ramGB: parsedRam.size,
        ramSpeedMT: parsedRam.speed,
        storage,
        upscaling: 'off',
        antiAliasing: 'fxaa',
      })
    : null,
  [cpu, gpu, parsedRam.size, parsedRam.speed, quality, resolution, selectedGame, storage]);

  const compareCpu = allCPUs.find((item) => item.id === compareCpuId) ?? cpu;
  const compareGpu = allGPUs.find((item) => item.id === compareGpuId) ?? gpu;
  const compareRam = parseRam(compareRamId);
  const compareBalance = calculateResolutionAdjustedBalance(compareCpu, compareGpu, resolution);
  const compareGameResult = selectedGame
    ? estimateFPSWithBreakdown(compareCpu, compareGpu, selectedGame, {
        resolution,
        quality,
        ramGB: compareRam.size,
        ramSpeedMT: compareRam.speed,
        storage,
        upscaling: 'off',
        antiAliasing: 'fxaa',
      })
    : null;

  const cpuRank = getRank(cpu.benchmarkScore, allCPUs.map((item) => item.benchmarkScore));
  const gpuRank = getRank(gpu.benchmarkScore, allGPUs.map((item) => item.benchmarkScore));
  const suggestedPsu = estimatePSUPlanning(cpu, gpu).planningWattage;
  const compareSuggestedPsu = estimatePSUPlanning(compareCpu, compareGpu).planningWattage;
  const uniqueSockets = Array.from(new Set(allCPUs.map((item) => item.socket).filter(Boolean) as string[])).sort();

  const resultQuery = new URLSearchParams({
    cpu: cpu.id,
    gpu: gpu.id,
    ram: ram.id,
    resolution,
  });

  const getShareUrl = () => `${window.location.origin}${getLocalizedPath(lang, '')}?${resultQuery.toString()}`;

  const copyResultLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };

  const shareResult = async () => {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: `${cpu.name} + ${gpu.name}`, text: `${relativeLabel()}: ${selectedBalance.gapPercentage}%`, url });
        return;
      } catch {
        return;
      }
    }
    await copyResultLink();
  };

  const relativeLabel = () => copy.balanceGap;

  const downloadResultCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const context = canvas.getContext('2d');
    if (!context) return;
    const gradient = context.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#081426');
    gradient.addColorStop(1, '#172554');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1200, 630);
    context.fillStyle = '#60a5fa';
    context.font = '700 30px Arial';
    context.fillText(`PCBuildCheck · ${terms.cardTitle}`, 64, 74);
    context.fillStyle = '#ffffff';
    context.font = '700 42px Arial';
    context.fillText(cpu.name, 64, 155);
    context.fillText(`+ ${gpu.name}`, 64, 215);
    context.fillStyle = '#cbd5e1';
    context.font = '26px Arial';
    context.fillText(`${ram.name} · ${resolution}`, 64, 272);
    context.fillStyle = '#34d399';
    context.font = '700 58px Arial';
    context.fillText(`${selectedBalance.gapPercentage}% planning gap`, 64, 370);
    context.fillStyle = '#ffffff';
    context.font = '700 27px Arial';
    context.fillText(`CPU ${selectedBalance.cpuIndex}/100 · GPU ${selectedBalance.gpuIndex}/100 · ${selectedBalance.constraint === 'Balanced' ? terms.balanced : selectedBalance.constraint}`, 64, 425);
    context.fillStyle = '#94a3b8';
    context.font = '21px Arial';
    context.fillText(terms.cardNotice, 64, 502);
    context.fillText(`Model ${HARDWARE_SCORE_METHODOLOGY_VERSION} · Data reviewed ${HARDWARE_DATABASE_UPDATED}`, 64, 545);
    context.fillText('pcbuildcheck.com', 64, 588);
    const anchor = document.createElement('a');
    anchor.download = `${cpu.id}-${gpu.id}-${resolution}-pcbuildcheck.png`;
    anchor.href = canvas.toDataURL('image/png');
    anchor.click();
  };

  const fpsHref = selectedGame
    ? `${getLocalizedPath(lang, 'fps-calculator')}?${serializeFPSShareConfig({
        cpu: cpu.id,
        gpu: gpu.id,
        game: selectedGame.id,
        resolution,
        ramSize: `${parsedRam.size}gb`,
        ramSpeed: String(parsedRam.speed),
        storage,
        quality,
        upscaling: 'off',
        refreshRate: '144hz',
        antiAliasing: 'fxaa',
      }).toString()}`
    : getLocalizedPath(lang, 'fps-calculator');

  const coolerNeed = cpu.tdp > 125 ? 3 : cpu.tdp > 65 ? 2 : 1;
  const coolerSelected = coolerClass === 'large' ? 3 : coolerClass === 'tower' ? 2 : 1;
  const readinessRows = [
    { label: copy.ramCapacity, ready: parsedRam.size >= 16, value: ram.name },
    { label: copy.memoryChannels, ready: memoryChannels === 'dual', value: memoryChannels === 'dual' ? copy.dualChannel : copy.singleChannel },
    { label: copy.storage, ready: storage !== 'hdd', value: storage === 'nvme-ssd' ? 'NVMe SSD' : storage === 'sata-ssd' ? 'SATA SSD' : 'HDD' },
    { label: copy.platform, ready: motherboardSocket !== 'unknown' && motherboardSocket === cpu.socket, value: motherboardSocket === 'unknown' ? copy.notSure : `${motherboardSocket} / ${cpu.socket ?? '—'}` },
    { label: copy.power, ready: psuCapacity >= suggestedPsu, value: `${psuCapacity} W / ≥ ${suggestedPsu} W` },
    { label: copy.cooling, ready: coolerSelected >= coolerNeed, value: `${cpu.tdp} W CPU TDP` },
  ];

  const comparisonRows = [
    [copy.balanceGap, `${selectedBalance.gapPercentage}% · ${selectedBalance.constraint === 'Balanced' ? terms.balanced : selectedBalance.constraint}`, `${compareBalance.gapPercentage}% · ${compareBalance.constraint === 'Balanced' ? terms.balanced : compareBalance.constraint}`],
    [copy.cpuIndex, `${selectedBalance.cpuIndex}/100`, `${compareBalance.cpuIndex}/100`],
    [copy.gpuIndex, `${selectedBalance.gpuIndex}/100`, `${compareBalance.gpuIndex}/100`],
    [copy.ram, ram.name, comparisonRamOptions.find((item) => item.id === compareRamId)?.name ?? compareRamId],
    [copy.suggestedPsu, `${suggestedPsu} W`, `${compareSuggestedPsu} W`],
    ...(gameResult && compareGameResult
      ? [[copy.selectedGameFps, `${gameResult.estimate.low}–${gameResult.estimate.high} FPS`, `${compareGameResult.estimate.low}–${compareGameResult.estimate.high} FPS`]]
      : []),
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-blue-600" aria-hidden="true" />{copy.whyTitle}</CardTitle>
          <p className="text-sm text-muted-foreground">{copy.whyIntro}</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-muted/60 text-left"><tr><th className="px-4 py-3">{copy.metric}</th><th className="px-4 py-3">CPU</th><th className="px-4 py-3">GPU</th></tr></thead>
              <tbody className="divide-y">
                <tr><th className="px-4 py-3 text-left font-medium">{copy.baseScore}</th><td className="px-4 py-3">{cpu.benchmarkScore}/100</td><td className="px-4 py-3">{gpu.benchmarkScore}/100</td></tr>
                <tr><th className="px-4 py-3 text-left font-medium">{copy.resolutionFactor}</th><td className="px-4 py-3">× {selectedBalance.cpuFactor.toFixed(2)}</td><td className="px-4 py-3">× {selectedBalance.gpuFactor.toFixed(2)}</td></tr>
                <tr><th className="px-4 py-3 text-left font-medium">{copy.adjustedIndex}</th><td className="px-4 py-3 font-bold">{selectedBalance.cpuIndex}/100</td><td className="px-4 py-3 font-bold">{selectedBalance.gpuIndex}/100</td></tr>
                <tr><th className="px-4 py-3 text-left font-medium">{copy.databaseRank}</th><td className="px-4 py-3">#{cpuRank} / {allCPUs.length}</td><td className="px-4 py-3">#{gpuRank} / {allGPUs.length}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="rounded-lg bg-blue-50 p-3 font-mono text-xs leading-5 text-blue-950 dark:bg-blue-950/40 dark:text-blue-100">{copy.formula}</p>
          <p className="text-xs leading-5 text-muted-foreground">{copy.editorialNotice}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-medium">{copy.dataVersion}: {HARDWARE_DATABASE_UPDATED} · {HARDWARE_SCORE_METHODOLOGY_VERSION}</span>
            {cpu.officialUrl && <Link className="inline-flex items-center gap-1 text-blue-600 hover:underline" href={cpu.officialUrl} target="_blank" rel="noreferrer">CPU {copy.officialSpecs}<ExternalLink className="h-3.5 w-3.5" /></Link>}
            {gpu.officialUrl && <Link className="inline-flex items-center gap-1 text-blue-600 hover:underline" href={gpu.officialUrl} target="_blank" rel="noreferrer">GPU {copy.officialSpecs}<ExternalLink className="h-3.5 w-3.5" /></Link>}
            <Link className="text-blue-600 hover:underline" href={getLocalizedPath(lang, 'methodology')}>{copy.methodology}</Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Share2 className="h-5 w-5 text-violet-600" />{copy.shareTitle}</CardTitle><p className="text-sm text-muted-foreground">{copy.shareIntro}</p></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button type="button" onClick={copyResultLink} variant="outline"><Copy className="mr-2 h-4 w-4" />{copyState === 'copied' ? copy.copied : copy.copyLink}</Button>
          <Button type="button" onClick={shareResult} variant="outline"><Share2 className="mr-2 h-4 w-4" />{copy.share}</Button>
          <Button type="button" onClick={downloadResultCard}><Download className="mr-2 h-4 w-4" />{copy.download}</Button>
          {copyState === 'error' && <p className="w-full text-xs text-red-600">{terms.copyFailed}</p>}
        </CardContent>
      </Card>

      <Card className="border-emerald-200 dark:border-emerald-900">
        <CardHeader><CardTitle className="flex items-center gap-2"><Gamepad2 className="h-5 w-5 text-emerald-600" />{copy.gameTitle}</CardTitle><p className="text-sm text-muted-foreground">{copy.gameIntro}</p></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">{copy.chooseGame}<select className="w-full rounded-md border bg-background px-3 py-2" value={gameId} onChange={(event) => setGameId(event.target.value)}>{allGames.map((game) => <option key={game.id} value={game.id}>{game.name}</option>)}</select></label>
            <label className="space-y-2 text-sm font-medium">{copy.quality}<select className="w-full rounded-md border bg-background px-3 py-2" value={quality} onChange={(event) => setQuality(event.target.value as FPSQuality)}>{qualityOptions.map((item) => <option key={item} value={item}>{terms.qualities[item]}</option>)}</select></label>
          </div>
          {gameResult && selectedGame && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                [copy.range, `${gameResult.estimate.low}–${gameResult.estimate.high} FPS`],
                [copy.planningMidpoint, `${gameResult.estimate.average} FPS`],
                [copy.onePercentLow, `${gameResult.estimate.onePercentLow} FPS`],
                [copy.likelyLimit, gameResult.estimate.limitingComponent === 'Mixed' ? terms.mixed : gameResult.estimate.limitingComponent],
                [copy.memoryCheck, gameResult.estimate.warnings.length ? `${gameResult.estimate.warnings.length} ${copy.statusReview}` : copy.statusReady],
              ].map(([label, value]) => <div key={label} className="rounded-lg border bg-muted/30 p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-bold">{value}</p></div>)}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3"><p className="max-w-2xl text-xs leading-5 text-muted-foreground">{copy.modelNotice}</p><Button asChild><Link href={fpsHref}>{copy.openFps}<ExternalLink className="ml-2 h-4 w-4" /></Link></Button></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><MemoryStick className="h-5 w-5 text-amber-600" />{copy.readinessTitle}</CardTitle><p className="text-sm text-muted-foreground">{copy.readinessIntro}</p></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <label className="text-xs font-semibold">{copy.memoryChannels}<select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={memoryChannels} onChange={(event) => setMemoryChannels(event.target.value as 'single' | 'dual')}><option value="dual">{copy.dualChannel}</option><option value="single">{copy.singleChannel}</option></select></label>
            <label className="text-xs font-semibold">{copy.storage}<select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={storage} onChange={(event) => setStorage(event.target.value as typeof storage)}><option value="nvme-ssd">NVMe SSD</option><option value="sata-ssd">SATA SSD</option><option value="hdd">HDD</option></select></label>
            <label className="text-xs font-semibold">{copy.motherboardSocket}<select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={motherboardSocket} onChange={(event) => setMotherboardSocket(event.target.value)}><option value="unknown">{copy.notSure}</option>{uniqueSockets.map((socket) => <option key={socket} value={socket}>{socket}</option>)}</select></label>
            <label className="text-xs font-semibold">{copy.psuCapacity}<select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={psuCapacity} onChange={(event) => setPsuCapacity(Number(event.target.value))}>{psuOptions.map((watts) => <option key={watts} value={watts}>{watts} W</option>)}</select></label>
            <label className="text-xs font-semibold">{copy.cooler}<select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={coolerClass} onChange={(event) => setCoolerClass(event.target.value as typeof coolerClass)}><option value="stock">{copy.stockCooler}</option><option value="tower">{copy.towerCooler}</option><option value="large">{copy.liquidCooler}</option></select></label>
          </div>
          <div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[620px] text-sm"><thead className="bg-muted/60 text-left"><tr><th className="px-4 py-3">{copy.check}</th><th className="px-4 py-3">{copy.statusReady}</th><th className="px-4 py-3">{copy.metric}</th></tr></thead><tbody className="divide-y">{readinessRows.map((row) => <tr key={row.label}><th className="px-4 py-3 text-left font-medium">{row.label}</th><td className="px-4 py-3"><Status ready={row.ready} readyLabel={copy.statusReady} reviewLabel={copy.statusReview} /></td><td className="px-4 py-3 text-muted-foreground">{row.value}</td></tr>)}</tbody></table></div>
        </CardContent>
      </Card>

      <Card className="border-violet-200 dark:border-violet-900">
        <CardHeader><CardTitle className="flex items-center gap-2"><GitCompareArrows className="h-5 w-5 text-violet-600" />{copy.compareTitle}</CardTitle><p className="text-sm text-muted-foreground">{copy.compareIntro}</p></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border bg-blue-50/50 p-4 dark:bg-blue-950/20"><p className="font-bold">{copy.buildA}</p><p className="mt-2 text-sm">{cpu.name}</p><p className="text-sm">{gpu.name}</p><p className="text-sm">{ram.name}</p></div>
            <div className="space-y-3 rounded-lg border bg-violet-50/50 p-4 dark:bg-violet-950/20"><p className="font-bold">{copy.buildB}</p>
              <label className="block text-xs font-semibold">{copy.cpu}<select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={compareCpuId} onChange={(event) => setCompareCpuId(event.target.value)}>{allCPUs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
              <label className="block text-xs font-semibold">{copy.gpu}<select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={compareGpuId} onChange={(event) => setCompareGpuId(event.target.value)}>{allGPUs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
              <label className="block text-xs font-semibold">{copy.ram}<select className="mt-1 w-full rounded-md border bg-background p-2 text-sm" value={compareRamId} onChange={(event) => setCompareRamId(event.target.value)}>{comparisonRamOptions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border"><table className="w-full min-w-[680px] text-sm"><thead className="bg-muted/60 text-left"><tr><th className="px-4 py-3">{copy.metric}</th><th className="px-4 py-3">{copy.buildA}</th><th className="px-4 py-3">{copy.buildB}</th></tr></thead><tbody className="divide-y">{comparisonRows.map(([label, first, second]) => <tr key={label}><th className="px-4 py-3 text-left font-medium">{label}</th><td className="px-4 py-3">{first}</td><td className="px-4 py-3">{second}</td></tr>)}</tbody></table></div>
          <p className="text-xs leading-5 text-muted-foreground">{copy.comparisonNotice}</p>
        </CardContent>
      </Card>
    </div>
  );
}
