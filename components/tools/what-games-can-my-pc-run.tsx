'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Gamepad2, Gauge, Search, Settings2 } from 'lucide-react';
import { EnhancedSearchableSelect, type Option } from '@/components/ui/enhanced-searchable-select';
import type { Locale } from '@/i18n-config';
import {
  estimateFPSWithBreakdown,
  getFPSGameProfileMetadata,
  type FPSModelGame,
  type FPSQuality,
} from '@/lib/fps-model';
import { serializeFPSShareConfig } from '@/lib/fps-share';
import { getLocalizedPath } from '@/lib/path-translations';
import type { ToolDatasets, ToolGameOption, ToolHardwareOption } from '@/components/tools/tool-calculator';

type FitStatus = 'strong' | 'target' | 'tune' | 'below';
type ResultFilter = 'all' | FitStatus;

type Copy = {
  cpu: string;
  gpu: string;
  ram: string;
  resolution: string;
  quality: string;
  target: string;
  chooseCpu: string;
  chooseGpu: string;
  searchCpu: string;
  searchGpu: string;
  calculate: string;
  assumptions: string;
  resultsTitle: string;
  resultsIntro: string;
  searchGames: string;
  allGames: string;
  noMatches: string;
  fpsRange: string;
  onePercentLow: string;
  likelyLimit: string;
  suggestedPreset: string;
  currentPresetWorks: string;
  detailedEstimate: string;
  ramWarning: string;
  vramWarning: string;
  speculative: string;
  nativeNote: string;
  statuses: Record<FitStatus, { label: string; description: string }>;
  tendencies: Record<'cpu-heavy' | 'gpu-heavy' | 'balanced', string>;
  qualityLabels: Record<'low' | 'medium' | 'high' | 'ultra', string>;
};

const COPY: Record<Locale, Copy> = {
  en: {
    cpu: 'Processor (CPU)', gpu: 'Graphics card (GPU)', ram: 'Installed RAM', resolution: 'Resolution', quality: 'Graphics quality', target: 'Target frame rate',
    chooseCpu: 'Choose your CPU', chooseGpu: 'Choose your GPU', searchCpu: 'Search processors', searchGpu: 'Search graphics cards', calculate: 'Check games for this PC',
    assumptions: 'Planning assumptions: native rendering, FXAA, 3200 MT/s memory and NVMe SSD. Open a game in the detailed calculator to change these inputs.',
    resultsTitle: 'Games this PC can run', resultsIntro: 'These are modelled planning ranges, not measured benchmarks. Use the groups to shortlist games and settings worth testing.',
    searchGames: 'Search the results by game name', allGames: 'All games', noMatches: 'No games match this filter.', fpsRange: 'Estimated range', onePercentLow: 'Estimated 1% low', likelyLimit: 'Likely limit',
    suggestedPreset: 'Suggested preset', currentPresetWorks: 'Selected preset', detailedEstimate: 'Open detailed FPS estimate', ramWarning: 'RAM below the game profile', vramWarning: 'Estimated VRAM pressure',
    speculative: 'Pre-release/speculative profile', nativeNote: 'Native resolution estimate',
    statuses: {
      strong: { label: 'Strong fit', description: 'The lower end of the planning range meets your target.' },
      target: { label: 'Meets target', description: 'The midpoint meets your target, but heavier scenes may dip below it.' },
      tune: { label: 'Settings adjustment', description: 'A lower preset may be needed to reach your target.' },
      below: { label: 'Below target', description: 'Even the upper estimate is below your selected target.' },
    },
    tendencies: { 'cpu-heavy': 'CPU-heavy', 'gpu-heavy': 'GPU-heavy', balanced: 'Balanced' },
    qualityLabels: { low: 'Low', medium: 'Medium', high: 'High', ultra: 'Ultra' },
  },
  it: {
    cpu: 'Processore (CPU)', gpu: 'Scheda video (GPU)', ram: 'RAM installata', resolution: 'Risoluzione', quality: 'Qualità grafica', target: 'Frame rate obiettivo',
    chooseCpu: 'Scegli la CPU', chooseGpu: 'Scegli la GPU', searchCpu: 'Cerca processori', searchGpu: 'Cerca schede video', calculate: 'Controlla i giochi per questo PC',
    assumptions: 'Ipotesi: rendering nativo, FXAA, memoria a 3200 MT/s e SSD NVMe. Apri il calcolatore dettagliato per modificare questi dati.',
    resultsTitle: 'Giochi che questo PC può eseguire', resultsIntro: 'Sono intervalli di pianificazione modellati, non benchmark misurati. Usa i gruppi per scegliere giochi e impostazioni da provare.',
    searchGames: 'Cerca un gioco nei risultati', allGames: 'Tutti i giochi', noMatches: 'Nessun gioco corrisponde al filtro.', fpsRange: 'Intervallo stimato', onePercentLow: '1% low stimato', likelyLimit: 'Limite probabile',
    suggestedPreset: 'Preset suggerito', currentPresetWorks: 'Preset selezionato', detailedEstimate: 'Apri la stima FPS dettagliata', ramWarning: 'RAM sotto il profilo del gioco', vramWarning: 'Possibile pressione VRAM',
    speculative: 'Profilo pre-release/speculativo', nativeNote: 'Stima a risoluzione nativa',
    statuses: {
      strong: { label: 'Ottimo abbinamento', description: 'Il limite inferiore dell’intervallo raggiunge l’obiettivo.' },
      target: { label: 'Raggiunge l’obiettivo', description: 'Il valore medio raggiunge l’obiettivo, ma le scene pesanti possono scendere.' },
      tune: { label: 'Regolare le impostazioni', description: 'Potrebbe servire un preset inferiore per raggiungere l’obiettivo.' },
      below: { label: 'Sotto l’obiettivo', description: 'Anche il limite superiore è sotto l’obiettivo selezionato.' },
    },
    tendencies: { 'cpu-heavy': 'Dipende dalla CPU', 'gpu-heavy': 'Dipende dalla GPU', balanced: 'Bilanciato' },
    qualityLabels: { low: 'Basso', medium: 'Medio', high: 'Alto', ultra: 'Ultra' },
  },
  fr: {
    cpu: 'Processeur (CPU)', gpu: 'Carte graphique (GPU)', ram: 'RAM installée', resolution: 'Résolution', quality: 'Qualité graphique', target: 'Fréquence d’images cible',
    chooseCpu: 'Choisir le CPU', chooseGpu: 'Choisir le GPU', searchCpu: 'Rechercher un processeur', searchGpu: 'Rechercher une carte graphique', calculate: 'Vérifier les jeux pour ce PC',
    assumptions: 'Hypothèses : rendu natif, FXAA, mémoire à 3200 MT/s et SSD NVMe. Ouvrez le calculateur détaillé pour les modifier.',
    resultsTitle: 'Jeux que ce PC peut faire tourner', resultsIntro: 'Ce sont des plages de planification modélisées, pas des benchmarks mesurés. Utilisez les groupes pour choisir les tests utiles.',
    searchGames: 'Rechercher un jeu dans les résultats', allGames: 'Tous les jeux', noMatches: 'Aucun jeu ne correspond à ce filtre.', fpsRange: 'Plage estimée', onePercentLow: '1% low estimé', likelyLimit: 'Limite probable',
    suggestedPreset: 'Préréglage conseillé', currentPresetWorks: 'Préréglage choisi', detailedEstimate: 'Ouvrir l’estimation FPS détaillée', ramWarning: 'RAM sous le profil du jeu', vramWarning: 'Pression VRAM estimée',
    speculative: 'Profil pré-sortie/spéculatif', nativeNote: 'Estimation en résolution native',
    statuses: {
      strong: { label: 'Très bon résultat', description: 'Le bas de la plage estimée atteint votre cible.' },
      target: { label: 'Cible atteinte', description: 'La moyenne atteint la cible, mais les scènes lourdes peuvent descendre.' },
      tune: { label: 'Réglages à ajuster', description: 'Un préréglage inférieur peut être nécessaire.' },
      below: { label: 'Sous la cible', description: 'Même l’estimation haute reste sous la cible choisie.' },
    },
    tendencies: { 'cpu-heavy': 'Dépend du CPU', 'gpu-heavy': 'Dépend du GPU', balanced: 'Équilibré' },
    qualityLabels: { low: 'Faible', medium: 'Moyen', high: 'Élevé', ultra: 'Ultra' },
  },
  de: {
    cpu: 'Prozessor (CPU)', gpu: 'Grafikkarte (GPU)', ram: 'Installierter RAM', resolution: 'Auflösung', quality: 'Grafikqualität', target: 'Ziel-Bildrate',
    chooseCpu: 'CPU auswählen', chooseGpu: 'GPU auswählen', searchCpu: 'Prozessoren suchen', searchGpu: 'Grafikkarten suchen', calculate: 'Spiele für diesen PC prüfen',
    assumptions: 'Annahmen: natives Rendering, FXAA, 3200 MT/s Arbeitsspeicher und NVMe-SSD. Im detaillierten Rechner lassen sich diese Werte ändern.',
    resultsTitle: 'Spiele, die dieser PC ausführen kann', resultsIntro: 'Dies sind modellierte Planungsbereiche, keine gemessenen Benchmarks. Nutze die Gruppen, um Spiele und Einstellungen für Tests auszuwählen.',
    searchGames: 'Ergebnisse nach Spiel durchsuchen', allGames: 'Alle Spiele', noMatches: 'Keine Spiele entsprechen diesem Filter.', fpsRange: 'Geschätzter Bereich', onePercentLow: 'Geschätztes 1% Low', likelyLimit: 'Wahrscheinliches Limit',
    suggestedPreset: 'Empfohlenes Preset', currentPresetWorks: 'Gewähltes Preset', detailedEstimate: 'Detaillierte FPS-Schätzung öffnen', ramWarning: 'RAM unter dem Spielprofil', vramWarning: 'Geschätzter VRAM-Druck',
    speculative: 'Vorab-/spekulatives Profil', nativeNote: 'Schätzung in nativer Auflösung',
    statuses: {
      strong: { label: 'Sehr gut geeignet', description: 'Das untere Ende des Bereichs erreicht dein Ziel.' },
      target: { label: 'Ziel erreicht', description: 'Der Mittelwert erreicht das Ziel; anspruchsvolle Szenen können darunter liegen.' },
      tune: { label: 'Einstellungen anpassen', description: 'Ein niedrigeres Preset kann für das Ziel nötig sein.' },
      below: { label: 'Unter dem Ziel', description: 'Auch die obere Schätzung liegt unter dem gewählten Ziel.' },
    },
    tendencies: { 'cpu-heavy': 'CPU-lastig', 'gpu-heavy': 'GPU-lastig', balanced: 'Ausgeglichen' },
    qualityLabels: { low: 'Niedrig', medium: 'Mittel', high: 'Hoch', ultra: 'Ultra' },
  },
  es: {
    cpu: 'Procesador (CPU)', gpu: 'Tarjeta gráfica (GPU)', ram: 'RAM instalada', resolution: 'Resolución', quality: 'Calidad gráfica', target: 'Tasa de fotogramas objetivo',
    chooseCpu: 'Elige la CPU', chooseGpu: 'Elige la GPU', searchCpu: 'Buscar procesadores', searchGpu: 'Buscar tarjetas gráficas', calculate: 'Comprobar juegos para este PC',
    assumptions: 'Supuestos: renderizado nativo, FXAA, memoria a 3200 MT/s y SSD NVMe. Abre la calculadora detallada para cambiarlos.',
    resultsTitle: 'Juegos que puede ejecutar este PC', resultsIntro: 'Son rangos de planificación modelados, no benchmarks medidos. Usa los grupos para elegir juegos y ajustes que merece la pena probar.',
    searchGames: 'Buscar un juego en los resultados', allGames: 'Todos los juegos', noMatches: 'Ningún juego coincide con este filtro.', fpsRange: 'Rango estimado', onePercentLow: '1% low estimado', likelyLimit: 'Límite probable',
    suggestedPreset: 'Preajuste sugerido', currentPresetWorks: 'Preajuste elegido', detailedEstimate: 'Abrir estimación FPS detallada', ramWarning: 'RAM por debajo del perfil del juego', vramWarning: 'Presión de VRAM estimada',
    speculative: 'Perfil previo al lanzamiento/especulativo', nativeNote: 'Estimación con resolución nativa',
    statuses: {
      strong: { label: 'Muy buen resultado', description: 'El extremo inferior del rango alcanza tu objetivo.' },
      target: { label: 'Alcanza el objetivo', description: 'El promedio alcanza el objetivo, pero las escenas exigentes pueden bajar.' },
      tune: { label: 'Ajustar configuración', description: 'Puede ser necesario un preajuste inferior.' },
      below: { label: 'Por debajo del objetivo', description: 'Incluso la estimación superior queda por debajo del objetivo.' },
    },
    tendencies: { 'cpu-heavy': 'Depende de la CPU', 'gpu-heavy': 'Depende de la GPU', balanced: 'Equilibrado' },
    qualityLabels: { low: 'Bajo', medium: 'Medio', high: 'Alto', ultra: 'Ultra' },
  },

  ru: {
    cpu: "Процессор (CPU)", gpu: "Видеокарта (GPU)", ram: "Установленная RAM", resolution: 'Разрешение', quality: "Качество графики", target: "Целевая частота кадров",
    chooseCpu: "Выберите процессор", chooseGpu: "Выберите видеокарту", searchCpu: "Поиск процессоров", searchGpu: "Поиск видеокарт", calculate: "Проверить игры для этого ПК",
    assumptions: "Предположения при планировании: встроенный рендеринг, FXAA, память 3200 МТ/с и NVMe SSD. Откройте игру в подробном калькуляторе, чтобы изменить эти входные данные.",
    resultsTitle: "Игры, которые может запускать этот компьютер", resultsIntro: "Это смоделированные диапазоны планирования, а не измеренные ориентиры. Используйте группы, чтобы составить список игр и настроек, которые стоит протестировать.",
    searchGames: "Поиск результатов по названию игры", allGames: "Все игры", noMatches: "Ни одна игра не соответствует этому фильтру.", fpsRange: "Предполагаемый диапазон", onePercentLow: "Предполагаемый минимум на 1%", likelyLimit: "Вероятный предел",
    suggestedPreset: "Предлагаемая предустановка", currentPresetWorks: "Выбранный пресет", detailedEstimate: "Открыть подробную смету FPS", ramWarning: "RAM под профилем игры", vramWarning: "Расчетное давление VRAM",
    speculative: "Предварительный релиз/спекулятивный профиль", nativeNote: "Оценка собственного разрешения",
    statuses: {
      strong: { label: "Сильная посадка", description: "Нижний предел диапазона планирования соответствует вашей цели." },
      target: { label: "Достигает цели", description: "Средняя точка соответствует вашей цели, но более тяжелые сцены могут оказаться ниже нее." },
      tune: { label: "Настройка настроек", description: "Для достижения цели может потребоваться более низкая предустановка." },
      below: { label: "Ниже цели", description: "Даже верхняя оценка ниже выбранной вами цели." },
    },
    tendencies: { 'cpu-heavy': 'Зависит от CPU', 'gpu-heavy': 'Зависит от GPU', balanced: 'Сбалансированная' },
    qualityLabels: { low: 'Низкое', medium: 'Среднее', high: 'Высокое', ultra: 'Ультра' },
  },
};

const QUALITY_ORDER: Array<'ultra' | 'high' | 'medium' | 'low'> = ['ultra', 'high', 'medium', 'low'];
const STATUS_ORDER: FitStatus[] = ['strong', 'target', 'tune', 'below'];

function validInitial(value: string | undefined, options: Array<{ id: string }>, fallback: string) {
  return value && options.some((option) => option.id === value) ? value : fallback;
}

function toSelectOptions(items: ToolHardwareOption[], kind: 'cpu' | 'gpu'): Option[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    tier: item.tier ?? 'Desktop',
    benchmarkScore: item.score,
    specs: kind === 'gpu'
      ? `${item.vram ?? 0}GB VRAM · ${item.tdp}W`
      : `${item.cores ?? 0} cores · ${item.tdp}W`,
  }));
}

function normalizeGame(game: ToolGameOption): FPSModelGame {
  return {
    id: game.id,
    category: game.category ?? 'AAA',
    cpuDemand: game.cpuDemand,
    gpuDemand: game.gpuDemand,
    ramRequirement: game.ramRequirement,
    optimizations: game.optimizations ?? [],
  };
}

function statusFor(low: number, average: number, high: number, target: number, hasMemoryWarning: boolean): FitStatus {
  if (!hasMemoryWarning && low >= target) return 'strong';
  if (!hasMemoryWarning && average >= target) return 'target';
  if (high >= target) return 'tune';
  return 'below';
}

export function WhatGamesCanMyPCRun({
  lang,
  data,
  initialSelection,
}: {
  lang: Locale;
  data: ToolDatasets;
  initialSelection?: Record<string, string>;
}) {
  const copy = COPY[lang] ?? COPY.en;
  const defaultCpu = data.cpus.find((cpu) => cpu.id === 'ryzen-5-5600X')?.id ?? data.cpus[0]?.id ?? '';
  const defaultGpu = data.gpus.find((gpu) => gpu.id === 'rtx-3060')?.id ?? data.gpus[0]?.id ?? '';
  const [cpuId, setCpuId] = useState(() => validInitial(initialSelection?.cpu, data.cpus, defaultCpu));
  const [gpuId, setGpuId] = useState(() => validInitial(initialSelection?.gpu, data.gpus, defaultGpu));
  const [ram, setRam] = useState(() => ['8', '16', '32', '64'].includes(initialSelection?.ramCapacity ?? '') ? initialSelection!.ramCapacity : '16');
  const [resolution, setResolution] = useState(() => ['1080p', '1440p', '4K'].includes(initialSelection?.resolution ?? '') ? initialSelection!.resolution : '1080p');
  const [quality, setQuality] = useState<'low' | 'medium' | 'high' | 'ultra'>(() => ['low', 'medium', 'high', 'ultra'].includes(initialSelection?.quality ?? '') ? initialSelection!.quality as 'low' | 'medium' | 'high' | 'ultra' : 'high');
  const [targetFps, setTargetFps] = useState(() => ['30', '60', '120', '144', '240', '360'].includes(initialSelection?.targetFps ?? '') ? initialSelection!.targetFps : '60');
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState<ResultFilter>('all');
  const [search, setSearch] = useState('');

  const cpuOptions = useMemo(() => toSelectOptions(data.cpus, 'cpu'), [data.cpus]);
  const gpuOptions = useMemo(() => toSelectOptions(data.gpus, 'gpu'), [data.gpus]);

  const results = useMemo(() => {
    if (!submitted) return [];
    const cpu = data.cpus.find((item) => item.id === cpuId);
    const gpu = data.gpus.find((item) => item.id === gpuId);
    if (!cpu || !gpu) return [];
    const gpuBrand: 'NVIDIA' | 'AMD' | 'Intel' = gpu.brand === 'AMD' || gpu.brand === 'Intel' ? gpu.brand : 'NVIDIA';
    const target = Number(targetFps);
    const selectedQualityIndex = QUALITY_ORDER.indexOf(quality);
    const qualitiesToTry = QUALITY_ORDER.slice(selectedQualityIndex);

    return data.games.map((game) => {
      const modelGame = normalizeGame(game);
      const modelGpu = { benchmarkScore: gpu.score, vram: gpu.vram ?? 0, brand: gpuBrand };
      const modelCpu = { benchmarkScore: cpu.score };
      const options = { resolution, quality: quality as FPSQuality, upscaling: 'off' as const, antiAliasing: 'fxaa' as const, ramGB: Number(ram), ramSpeedMT: 3200, storage: 'nvme-ssd' as const };
      const calculation = estimateFPSWithBreakdown(modelCpu, modelGpu, modelGame, options);
      const hasRamWarning = Number(ram) < game.ramRequirement;
      const hasVramWarning = (gpu.vram ?? 0) < calculation.breakdown.requiredVramGB;
      const status = statusFor(calculation.estimate.low, calculation.estimate.average, calculation.estimate.high, target, hasRamWarning || hasVramWarning);
      const suggestedQuality = qualitiesToTry.find((candidate) =>
        estimateFPSWithBreakdown(modelCpu, modelGpu, modelGame, { ...options, quality: candidate }).estimate.average >= target
      ) ?? 'low';
      const metadata = getFPSGameProfileMetadata(modelGame);
      const detailParams = serializeFPSShareConfig({
        cpu: cpu.id,
        gpu: gpu.id,
        game: game.id,
        resolution,
        ramSize: `${ram}gb`,
        ramSpeed: '3200',
        storage: 'nvme-ssd',
        quality,
        upscaling: 'off',
        refreshRate: target === 30 ? '60hz' : `${target}hz`,
        antiAliasing: 'fxaa',
      });
      return {
        game,
        calculation,
        status,
        metadata,
        hasRamWarning,
        hasVramWarning,
        suggestedQuality,
        detailHref: `${getLocalizedPath(lang, 'fps-calculator')}?${detailParams.toString()}`,
      };
    }).sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) || b.calculation.estimate.average - a.calculation.estimate.average);
  }, [cpuId, data.cpus, data.games, data.gpus, gpuId, lang, quality, ram, resolution, submitted, targetFps]);

  const counts = useMemo(() => Object.fromEntries(STATUS_ORDER.map((status) => [status, results.filter((result) => result.status === status).length])) as Record<FitStatus, number>, [results]);
  const visibleResults = useMemo(() => {
    const term = search.trim().toLowerCase();
    return results.filter((result) => (filter === 'all' || result.status === filter) && (!term || result.game.name.toLowerCase().includes(term)));
  }, [filter, results, search]);

  const statusStyles: Record<FitStatus, string> = {
    strong: 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200',
    target: 'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200',
    tune: 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200',
    below: 'border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200',
  };

  return (
    <div className="space-y-8">
      <form
        className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
        onSubmit={(event) => { event.preventDefault(); setSubmitted(true); setFilter('all'); setSearch(''); }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label id="game-finder-cpu-label" htmlFor="game-finder-cpu" className="text-sm font-semibold">{copy.cpu}</label>
            <EnhancedSearchableSelect id="game-finder-cpu" labelId="game-finder-cpu-label" options={cpuOptions} value={cpuId} onValueChange={setCpuId} placeholder={copy.chooseCpu} searchPlaceholder={copy.searchCpu} type="cpu" />
          </div>
          <div className="space-y-2">
            <label id="game-finder-gpu-label" htmlFor="game-finder-gpu" className="text-sm font-semibold">{copy.gpu}</label>
            <EnhancedSearchableSelect id="game-finder-gpu" labelId="game-finder-gpu-label" options={gpuOptions} value={gpuId} onValueChange={setGpuId} placeholder={copy.chooseGpu} searchPlaceholder={copy.searchGpu} type="gpu" />
          </div>
          {[
            { label: copy.ram, value: ram, setter: setRam, options: [['8', '8 GB'], ['16', '16 GB'], ['32', '32 GB'], ['64', '64 GB']] },
            { label: copy.resolution, value: resolution, setter: setResolution, options: [['1080p', '1920×1080 (1080p)'], ['1440p', '2560×1440 (1440p)'], ['4K', '3840×2160 (4K)']] },
            { label: copy.quality, value: quality, setter: (value: string) => setQuality(value as typeof quality), options: Object.entries(copy.qualityLabels) },
            { label: copy.target, value: targetFps, setter: setTargetFps, options: [['30', '30 FPS'], ['60', '60 FPS'], ['120', '120 FPS'], ['144', '144 FPS'], ['240', '240 FPS'], ['360', '360 FPS']] },
          ].map((field) => (
            <label key={field.label} className="space-y-2 text-sm font-semibold">
              <span>{field.label}</span>
              <select value={field.value} onChange={(event) => field.setter(event.target.value)} className="min-h-11 w-full rounded-lg border border-input bg-background px-3 font-normal text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {field.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
          ))}
        </div>
        <button type="submit" disabled={!cpuId || !gpuId} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-5 font-semibold text-white shadow-sm transition hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
          <Gamepad2 className="h-5 w-5" aria-hidden="true" />{copy.calculate}
        </button>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">{copy.assumptions}</p>
      </form>

      {submitted && (
        <section aria-labelledby="game-finder-results" className="space-y-6">
          <header className="space-y-2">
            <h2 id="game-finder-results" className="text-3xl font-semibold">{copy.resultsTitle}</h2>
            <p className="max-w-4xl leading-7 text-muted-foreground">{copy.resultsIntro}</p>
          </header>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Result summary">
            {STATUS_ORDER.map((status) => (
              <button key={status} type="button" onClick={() => setFilter(filter === status ? 'all' : status)} aria-pressed={filter === status} className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${statusStyles[status]} ${filter === status ? 'ring-2 ring-current ring-offset-2 ring-offset-background' : ''}`}>
                <span className="block text-2xl font-bold">{counts[status]}</span>
                <span className="mt-1 block font-semibold">{copy.statuses[status].label}</span>
                <span className="mt-1 block text-xs leading-5 opacity-80">{copy.statuses[status].description}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => setFilter('all')} aria-pressed={filter === 'all'} className={`min-h-10 rounded-lg border px-4 text-sm font-semibold ${filter === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'bg-background hover:bg-accent'}`}>
              {copy.allGames} ({results.length})
            </button>
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">{copy.searchGames}</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchGames} className="min-h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </label>
          </div>

          <p className="sr-only" aria-live="polite">{visibleResults.length} {copy.allGames.toLowerCase()}</p>
          {visibleResults.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">{copy.noMatches}</div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {visibleResults.map(({ game, calculation, status, metadata, hasRamWarning, hasVramWarning, suggestedQuality, detailHref }) => (
                <article key={game.id} className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{game.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{game.category ?? 'AAA'} · {copy.tendencies[metadata.tendency]} · {copy.nativeNote}</p>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>{copy.statuses[status].label}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/60 p-3">
                      <span className="text-xs text-muted-foreground">{copy.fpsRange}</span>
                      <strong className="mt-1 block text-xl">{calculation.estimate.low}–{calculation.estimate.high} FPS</strong>
                      <span className="text-xs text-muted-foreground">~{calculation.estimate.average} FPS midpoint</span>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-3">
                      <span className="text-xs text-muted-foreground">{copy.onePercentLow}</span>
                      <strong className="mt-1 block text-xl">{calculation.estimate.onePercentLow} FPS</strong>
                      <span className="text-xs text-muted-foreground">{copy.likelyLimit}: {calculation.estimate.limitingComponent}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 font-medium"><Settings2 className="h-3.5 w-3.5" aria-hidden="true" />{suggestedQuality === quality ? copy.currentPresetWorks : copy.suggestedPreset}: {copy.qualityLabels[suggestedQuality]}</span>
                    {!hasRamWarning && !hasVramWarning && <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />RAM/VRAM check passed</span>}
                    {hasRamWarning && <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />{copy.ramWarning}: {game.ramRequirement} GB</span>}
                    {hasVramWarning && <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />{copy.vramWarning}: {calculation.breakdown.requiredVramGB} GB</span>}
                    {metadata.speculative && <span className="inline-flex items-center gap-1 rounded-full border border-violet-300 bg-violet-50 px-2.5 py-1 text-violet-900 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-200"><Gauge className="h-3.5 w-3.5" aria-hidden="true" />{copy.speculative}</span>}
                  </div>

                  <Link href={detailHref} className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-4 text-sm font-semibold text-primary transition hover:bg-primary/10">
                    {copy.detailedEstimate}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
