"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { allCPUs, allGPUs, allGames, getCPUById, getGPUById, getGameById } from '@/lib/hardware-client-data';
import { estimateFPSRange, getFPSGameProfileMetadata } from '@/lib/fps-model';
import type { FPSModelOptions } from '@/lib/fps-model';
import type { FPSCalculatorBuild, FPSCalculatorConfig } from '@/lib/fps-share';
import type { Locale } from '@/i18n-config';
import { Gamepad2, BarChart3, Cpu, Zap, HardDrive, Sparkles, Gauge, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FPSCalculatorResults = dynamic(
  () => import('./fps-calculator-results').then((module) => module.FPSCalculatorResults),
  {
    loading: () => (
      <div
        aria-hidden="true"
        className="mx-auto h-96 w-full max-w-4xl animate-pulse rounded-xl border border-slate-200/70 bg-slate-100/60 dark:border-slate-800/60 dark:bg-slate-900/40"
      />
    ),
  }
);

type GameInsightCopy = {
  title: string;
  profile: string;
  detailedProfile: string;
  fallbackProfile: string;
  workload: string;
  cpuHeavy: string;
  gpuHeavy: string;
  balanced: string;
  ram: string;
  technologies: string;
  noTechnologies: string;
  why: string;
  detailedNote: string;
  fallbackNote: string;
  speculativeWarning: string;
  cpuAdvice: string;
  gpuAdvice: string;
  balancedAdvice: string;
};

const GAME_INSIGHT_COPY: Record<Locale, GameInsightCopy> = {
  en: {
    title: 'How this game is modeled', profile: 'Profile', detailedProfile: 'Detailed editorial profile', fallbackProfile: 'General demand-based estimate',
    workload: 'Workload tendency', cpuHeavy: 'CPU-heavy', gpuHeavy: 'GPU-heavy', balanced: 'Balanced', ram: 'RAM baseline',
    technologies: 'Listed technologies', noTechnologies: 'None listed', why: 'Why this matters',
    detailedNote: 'Uses a game-specific calibration anchor, then adjusts for your hardware and settings. It is still a planning estimate, not a measured benchmark of your PC.',
    fallbackNote: 'Uses the game’s CPU and GPU demand classes because no game-specific calibration anchor is available.',
    speculativeWarning: 'Pre-release planning profile—verified PC benchmark data is not available. Treat the result as speculative.',
    cpuAdvice: 'CPU choice and CPU-heavy settings such as simulation, crowds or view distance may have greater influence, especially at high FPS targets.',
    gpuAdvice: 'GPU performance, resolution, ray tracing and graphics quality are likely to have greater influence. Upscaling can help when the game and GPU support it.',
    balancedAdvice: 'Both CPU and GPU can materially influence the result, so compare the limiting-component and frame-time sections after calculating.',
  },
  it: {
    title: 'Come viene modellato questo gioco', profile: 'Profilo', detailedProfile: 'Profilo editoriale dettagliato', fallbackProfile: 'Stima generale basata sulla domanda',
    workload: 'Tendenza del carico', cpuHeavy: 'Prevalenza CPU', gpuHeavy: 'Prevalenza GPU', balanced: 'Bilanciato', ram: 'RAM di base',
    technologies: 'Tecnologie indicate', noTechnologies: 'Nessuna indicata', why: 'Perché è importante',
    detailedNote: 'Usa un riferimento calibrato per il gioco e lo adatta a hardware e impostazioni. Resta una stima, non un benchmark misurato sul tuo PC.',
    fallbackNote: 'Usa le classi di domanda CPU e GPU perché non è disponibile un riferimento calibrato specifico.',
    speculativeWarning: 'Profilo pre-release: non sono disponibili benchmark PC verificati. Considera il risultato speculativo.',
    cpuAdvice: 'CPU e impostazioni come simulazione, folla o distanza visiva possono incidere di più, soprattutto con obiettivi FPS elevati.',
    gpuAdvice: 'GPU, risoluzione, ray tracing e qualità grafica incidono probabilmente di più. L’upscaling può aiutare se supportato.',
    balancedAdvice: 'CPU e GPU possono influire entrambe: dopo il calcolo confronta componente limitante e frame time.',
  },
  fr: {
    title: 'Comment ce jeu est modélisé', profile: 'Profil', detailedProfile: 'Profil éditorial détaillé', fallbackProfile: 'Estimation générale par demande',
    workload: 'Tendance de charge', cpuHeavy: 'Plutôt CPU', gpuHeavy: 'Plutôt GPU', balanced: 'Équilibrée', ram: 'RAM de base',
    technologies: 'Technologies indiquées', noTechnologies: 'Aucune indiquée', why: 'Pourquoi c’est utile',
    detailedNote: 'Utilise un point de calibration propre au jeu, puis l’adapte au matériel et aux réglages. Cela reste une estimation, pas un benchmark mesuré de votre PC.',
    fallbackNote: 'Utilise les classes de demande CPU et GPU faute de point de calibration propre au jeu.',
    speculativeWarning: 'Profil avant sortie : aucun benchmark PC vérifié n’est disponible. Le résultat reste spéculatif.',
    cpuAdvice: 'Le CPU et les réglages de simulation, foule ou distance de vue peuvent compter davantage, surtout à haut objectif FPS.',
    gpuAdvice: 'GPU, résolution, ray tracing et qualité graphique devraient compter davantage. La mise à l’échelle peut aider si elle est prise en charge.',
    balancedAdvice: 'CPU et GPU peuvent tous deux compter : consultez le composant limitant et les frame times après calcul.',
  },
  de: {
    title: 'So wird dieses Spiel modelliert', profile: 'Profil', detailedProfile: 'Detailliertes redaktionelles Profil', fallbackProfile: 'Allgemeine bedarfsbasierte Schätzung',
    workload: 'Lasttendenz', cpuHeavy: 'CPU-lastig', gpuHeavy: 'GPU-lastig', balanced: 'Ausgewogen', ram: 'RAM-Basis',
    technologies: 'Gelistete Technologien', noTechnologies: 'Keine gelistet', why: 'Warum das wichtig ist',
    detailedNote: 'Nutzt einen spielspezifischen Kalibrierungswert und passt ihn an Hardware und Einstellungen an. Es bleibt eine Planungsschätzung, kein gemessener Benchmark deines PCs.',
    fallbackNote: 'Nutzt CPU- und GPU-Bedarfsklassen, weil kein spielspezifischer Kalibrierungswert verfügbar ist.',
    speculativeWarning: 'Pre-Release-Profil: Verifizierte PC-Benchmarks sind nicht verfügbar. Das Ergebnis ist spekulativ.',
    cpuAdvice: 'CPU und Einstellungen wie Simulation, Menschenmengen oder Sichtweite können stärker wirken, besonders bei hohen FPS-Zielen.',
    gpuAdvice: 'GPU, Auflösung, Raytracing und Grafikqualität wirken wahrscheinlich stärker. Upscaling kann bei Unterstützung helfen.',
    balancedAdvice: 'CPU und GPU können beide relevant sein. Prüfe nach der Berechnung limitierende Komponente und Frame Times.',
  },
  es: {
    title: 'Cómo se modela este juego', profile: 'Perfil', detailedProfile: 'Perfil editorial detallado', fallbackProfile: 'Estimación general por demanda',
    workload: 'Tendencia de carga', cpuHeavy: 'Depende más de CPU', gpuHeavy: 'Depende más de GPU', balanced: 'Equilibrada', ram: 'RAM base',
    technologies: 'Tecnologías indicadas', noTechnologies: 'Ninguna indicada', why: 'Por qué importa',
    detailedNote: 'Usa una referencia calibrada para el juego y la ajusta al hardware y configuración. Sigue siendo una estimación, no un benchmark medido de tu PC.',
    fallbackNote: 'Usa las clases de demanda de CPU y GPU porque no hay una referencia calibrada específica.',
    speculativeWarning: 'Perfil previo al lanzamiento: no hay benchmarks de PC verificados. Trata el resultado como especulativo.',
    cpuAdvice: 'La CPU y ajustes como simulación, multitudes o distancia de visión pueden influir más, especialmente con objetivos FPS altos.',
    gpuAdvice: 'GPU, resolución, ray tracing y calidad gráfica probablemente influyan más. El reescalado puede ayudar si es compatible.',
    balancedAdvice: 'CPU y GPU pueden influir: después de calcular revisa el componente limitante y los frame times.',
  },

  ru: {
    title: "Как моделируется эта игра", profile: 'Профиль', detailedProfile: "Подробный редакционный профиль", fallbackProfile: "Общая оценка по уровню требований",
    workload: "Характер нагрузки", cpuHeavy: 'Высокая нагрузка на CPU', gpuHeavy: 'Высокая нагрузка на GPU', balanced: 'Сбалансированная', ram: "Базовый объём RAM",
    technologies: "Перечисленные технологии", noTechnologies: "Нет в списке", why: "Почему это важно",
    detailedNote: "Использует привязку калибровки для конкретной игры, а затем адаптируется к вашему оборудованию и настройкам. Это по-прежнему плановая оценка, а не измеренный тест вашего ПК.",
    fallbackNote: "Использует игровые классы требований CPU и GPU, поскольку привязка калибровки для конкретной игры недоступна.",
    speculativeWarning: "Профиль планирования предварительной версии — проверенные данные тестирования ПК недоступны. Считайте результат умозрительным.",
    cpuAdvice: "Выбор CPU и тяжелые настройки CPU, такие как симуляция, скопление людей или расстояние просмотра, могут иметь большее влияние, особенно при высоких целях FPS.",
    gpuAdvice: "GPU производительность, разрешение, трассировка лучей и качество графики, вероятно, будут иметь большее влияние. Масштабирование может помочь, если игра и GPU поддерживают его.",
    balancedAdvice: "И CPU, и GPU могут существенно повлиять на результат, поэтому после расчета сравните разделы ограничивающего компонента и времени кадра.",
  },
};

const resolutionOptions = [
  { id: "1080p", name: "1920x1080 (1080p)", tier: "Standard", specs: "Full HD", price: 0 },
  { id: "1440p", name: "2560x1440 (1440p)", tier: "High-End", specs: "Quad HD", price: 0 },
  { id: "4K", name: "3840x2160 (4K)", tier: "Premium", specs: "Ultra HD", price: 0 },
];

type ModifierOption = {
  id: string;
  label: string;
  description: string;
  multiplier: number;
};

type BasicOption = {
  id: string;
  label: string;
  description: string;
};

const ramSizeOptions: ModifierOption[] = [
  { id: "8gb", label: "8 GB", description: "Entry-level gaming and esports.", multiplier: 0.92 },
  { id: "16gb", label: "16 GB", description: "Recommended for modern AAA titles.", multiplier: 1 },
  { id: "32gb", label: "32 GB", description: "Great for streaming and content creation.", multiplier: 1.04 },
  { id: "64gb", label: "64 GB+", description: "Enthusiast multitasking and workstation loads.", multiplier: 1.06 },
  { id: "128gb", label: "128 GB", description: "Workstation-grade memory footprint for heavy creators.", multiplier: 1.08 },
];

const ramSpeedOptions: ModifierOption[] = [
  { id: "2666", label: "2666 MHz", description: "Older DDR4 kits.", multiplier: 0.94 },
  { id: "3200", label: "3200 MHz", description: "Balanced DDR4 performance.", multiplier: 1 },
  { id: "3600", label: "3600 MHz", description: "Optimized DDR4 sweet spot.", multiplier: 1.03 },
  { id: "4000", label: "4000 MHz", description: "High-frequency DDR4 tuning.", multiplier: 1.05 },
  { id: "4400", label: "4400 MHz", description: "Premium DDR4/DDR5 kits for enthusiasts.", multiplier: 1.06 },
  { id: "4800", label: "4800 MHz", description: "Entry DDR5 performance uplift.", multiplier: 1.07 },
  { id: "5200", label: "5200 MHz", description: "High-speed DDR5 memory.", multiplier: 1.08 },
  { id: "6000", label: "6000 MHz", description: "Top-tier DDR5 kits tuned for gaming.", multiplier: 1.1 },
];

const storageTypeOptions: ModifierOption[] = [
  { id: "hdd", label: "HDD", description: "Standard hard drive loading.", multiplier: 0.96 },
  { id: "sata-ssd", label: "SATA SSD", description: "Faster loads, consistent performance.", multiplier: 0.99 },
  { id: "nvme-ssd", label: "NVMe SSD", description: "Peak loading and streaming speeds.", multiplier: 1 },
];

const graphicsQualityOptions: ModifierOption[] = [
  { id: "low", label: "Low", description: "Max FPS, minimum visuals.", multiplier: 1.18 },
  { id: "medium", label: "Medium", description: "Balanced fidelity and speed.", multiplier: 1.06 },
  { id: "high", label: "High", description: "Default visual target.", multiplier: 1 },
  { id: "ultra", label: "Ultra", description: "Cinematic visuals with cost.", multiplier: 0.88 },
  { id: "ray-tracing", label: "Ray Tracing", description: "Next-gen lighting effects.", multiplier: 0.75 },
  { id: "rt-ultra", label: "RT Ultra", description: "Ray-traced lighting plus high-fidelity settings.", multiplier: 0.68 },
  { id: "rt-extreme", label: "RT Extreme", description: "Maxed ray tracing for showcase visuals.", multiplier: 0.6 },
];

const upscalingOptions: ModifierOption[] = [
  { id: "off", label: "None", description: "Native resolution rendering.", multiplier: 1 },
  { id: "nvidia-dlss", label: "NVIDIA DLSS", description: "Auto DLSS mode for supported games.", multiplier: 1.14 },
  { id: "amd-fsr", label: "AMD FSR", description: "Vendor-agnostic spatial upscaler baseline.", multiplier: 1.08 },
  { id: "intel-xess", label: "Intel XeSS", description: "Intel's AI upscaler default profile.", multiplier: 1.09 },
  { id: "dlss-quality", label: "DLSS Quality", description: "Sharper visuals with AI boost.", multiplier: 1.12 },
  { id: "dlss-balanced", label: "DLSS Balanced", description: "Balanced DLSS mode for clarity and speed.", multiplier: 1.15 },
  { id: "dlss-performance", label: "DLSS Performance", description: "Biggest uplift for 4K and VR headsets.", multiplier: 1.18 },
  { id: "fsr2", label: "FSR 2.0", description: "Temporal upscaling across GPUs.", multiplier: 1.1 },
  { id: "fsr-quality", label: "FSR 2.0 Quality", description: "Quality-first preset for AMD FSR 2.0.", multiplier: 1.12 },
  { id: "xe-ss", label: "XeSS Balanced", description: "Balanced Intel XeSS preset.", multiplier: 1.08 },
  { id: "xess-quality", label: "XeSS Quality", description: "Quality preset for Intel XeSS.", multiplier: 1.1 },
];

const refreshRateOptions: BasicOption[] = [
  { id: "60hz", label: "60Hz", description: "Standard displays and TVs." },
  { id: "120hz", label: "120Hz", description: "Smooth high refresh experience." },
  { id: "144hz", label: "144Hz", description: "Competitive gaming staple." },
  { id: "240hz", label: "240Hz", description: "Pro-level fast action play." },
  { id: "360hz", label: "360Hz", description: "Cutting edge esports panels." },
];

const antiAliasingOptions: ModifierOption[] = [
  { id: "off", label: "Off", description: "Sharper image with jaggies.", multiplier: 1.04 },
  { id: "fxaa", label: "FXAA", description: "Lightweight smoothing filter.", multiplier: 0.98 },
  { id: "smaa", label: "SMAA", description: "Balanced clarity and cost.", multiplier: 0.96 },
  { id: "taa", label: "TAA", description: "Best smoothness, heavier hit.", multiplier: 0.9 },
  { id: "msaa-2x", label: "MSAA 2x", description: "Entry multisampling for cleaner edges.", multiplier: 0.94 },
  { id: "msaa-4x", label: "MSAA 4x", description: "Sharper edges with noticeable performance cost.", multiplier: 0.88 },
  { id: "msaa-8x", label: "MSAA 8x", description: "Premium multisampling for pristine lines.", multiplier: 0.82 },
  { id: "dlss-aa", label: "DLSS Anti-Aliasing", description: "DLSS anti-aliasing pass for NVIDIA RTX cards.", multiplier: 1.06 },
];

const cpuOptions = allCPUs.map((cpu) => ({
  id: cpu.id,
  name: cpu.name,
  tier: cpu.tier,
  specs: `${cpu.cores}C/${cpu.threads}T, ${cpu.boostClock}GHz`,
  price: cpu.currentPrice,
}));

const gpuOptions = allGPUs.map((gpu) => ({
  id: gpu.id,
  name: gpu.name,
  tier: gpu.tier,
  specs: `${gpu.vram}GB VRAM, ${gpu.boostClock}MHz`,
  price: gpu.currentPrice,
}));

const gameOptions = allGames.map((game) => ({
  id: game.id,
  name: game.name,
  tier: game.category,
  specs: `${game.releaseYear}, ${game.cpuDemand} CPU / ${game.gpuDemand} GPU demand`,
  price: 0,
}));

function localizeModifierOptions(
  options: ModifierOption[],
  category: any,
  key: string
) {
  return options.map((option) => ({
    ...option,
    label: category?.[key]?.[option.id]?.label ?? option.label,
    description: category?.[key]?.[option.id]?.desc ?? option.description,
  }));
}

function localizeBasicOptions(
  options: BasicOption[],
  category: any,
  key: string
) {
  return options.map((option) => ({
    ...option,
    label: category?.[key]?.[option.id]?.label ?? option.label,
    description: category?.[key]?.[option.id]?.desc ?? option.description,
  }));
}

export const EnhancedFPSCalculator = React.memo(function EnhancedFPSCalculator({
  onBuildChange,
  initialConfig,
  dict,
  lang,
}: {
  onBuildChange?: (build: FPSCalculatorBuild | null) => void;
  initialConfig?: FPSCalculatorConfig | null;
  dict: any;
  lang: string;
}) {
  const t = dict?.fps_calculator;

  const [selectedCPU, setSelectedCPU] = useState(initialConfig?.cpu ?? "");
  const [selectedGPU, setSelectedGPU] = useState(initialConfig?.gpu ?? "");
  const [selectedGame, setSelectedGame] = useState(initialConfig?.game ?? "");
  const [selectedResolution, setSelectedResolution] = useState(initialConfig?.resolution ?? "");
  const [selectedRamSize, setSelectedRamSize] = useState<string>(initialConfig?.ramSize ?? ramSizeOptions[1]?.id ?? "16gb");
  const [selectedRamSpeed, setSelectedRamSpeed] = useState<string>(initialConfig?.ramSpeed ?? ramSpeedOptions[1]?.id ?? "3200");
  const [selectedStorageType, setSelectedStorageType] = useState<string>(initialConfig?.storage ?? storageTypeOptions[2]?.id ?? "nvme-ssd");
  const [selectedGraphicsQuality, setSelectedGraphicsQuality] = useState<string>(initialConfig?.quality ?? graphicsQualityOptions[2]?.id ?? "high");
  const [selectedUpscaling, setSelectedUpscaling] = useState<string>(initialConfig?.upscaling ?? upscalingOptions[0]?.id ?? "off");
  const [selectedRefreshRate, setSelectedRefreshRate] = useState<string>(initialConfig?.refreshRate ?? refreshRateOptions[2]?.id ?? "144hz");
  const [selectedAntiAliasing, setSelectedAntiAliasing] = useState<string>(initialConfig?.antiAliasing ?? antiAliasingOptions[1]?.id ?? "fxaa");
  const [showResults, setShowResults] = useState(Boolean(initialConfig));
  const restoredConfigNotified = useRef(false);

  const localizedOptions = useMemo(
    () => ({
      ramSizes: localizeModifierOptions(ramSizeOptions, t?.memory, 'ram_size_options'),
      ramSpeeds: localizeModifierOptions(ramSpeedOptions, t?.memory, 'ram_speed_options'),
      storageTypes: localizeModifierOptions(storageTypeOptions, t?.memory, 'storage_options'),
      graphicsQualities: localizeModifierOptions(graphicsQualityOptions, t?.quality, 'graphics_options'),
      upscalingModes: localizeModifierOptions(upscalingOptions, t?.quality, 'upscaling_options'),
      antiAliasingModes: localizeModifierOptions(antiAliasingOptions, t?.display, 'aa_options'),
      refreshRates: localizeBasicOptions(refreshRateOptions, t?.display, 'refresh_options'),
      resolutions: resolutionOptions.map((option) => ({
        ...option,
        name: t?.game?.resolution_options?.[option.id]?.name ?? option.name,
        specs: t?.game?.resolution_options?.[option.id]?.specs ?? option.specs,
      })),
    }),
    [t]
  );
  const locale = (lang in GAME_INSIGHT_COPY ? lang : 'en') as Locale;
  const gameInsightCopy = GAME_INSIGHT_COPY[locale];

  useEffect(() => {
    if (!initialConfig || restoredConfigNotified.current) return;

    const cpu = getCPUById(initialConfig.cpu);
    const gpu = getGPUById(initialConfig.gpu);
    const game = getGameById(initialConfig.game);
    if (!cpu || !gpu || !game) return;

    restoredConfigNotified.current = true;
    const estimate = estimateFPSRange(cpu, gpu, game, {
      resolution: initialConfig.resolution,
      quality: initialConfig.quality as FPSModelOptions['quality'],
      upscaling: initialConfig.upscaling as FPSModelOptions['upscaling'],
      antiAliasing: initialConfig.antiAliasing as FPSModelOptions['antiAliasing'],
      ramGB: parseInt(initialConfig.ramSize, 10) || 16,
      ramSpeedMT: parseInt(initialConfig.ramSpeed, 10) || 3200,
      storage: initialConfig.storage as FPSModelOptions['storage'],
    });

    onBuildChange?.({ ...initialConfig, fps: estimate.average });
  }, [initialConfig, onBuildChange]);

  if (!t) return null;

  const {
    ramSizes: locRamSizeOptions,
    ramSpeeds: locRamSpeedOptions,
    storageTypes: locStorageOptions,
    graphicsQualities: locGraphicsOptions,
    upscalingModes: locUpscalingOptions,
    antiAliasingModes: locAaOptions,
    refreshRates: locRefreshOptions,
    resolutions: locResolutionOptions,
  } = localizedOptions;

  const resetDisplayedResults = () => {
    setShowResults(false);
  };

  const notifyBuildReset = () => {
    if (onBuildChange) {
      onBuildChange(null);
    }
  };

  const handleClearSelection = (type: 'cpu' | 'gpu' | 'game') => {
    switch (type) {
      case 'cpu':
        setSelectedCPU('');
        break;
      case 'gpu':
        setSelectedGPU('');
        break;
      case 'game':
        setSelectedGame('');
        break;
    }
    resetDisplayedResults();
    notifyBuildReset();
  };

  const handleCpuChange = (value: string) => {
    setSelectedCPU(value);
    resetDisplayedResults();
    notifyBuildReset();
  };

  const handleGpuChange = (value: string) => {
    setSelectedGPU(value);
    resetDisplayedResults();
    notifyBuildReset();
  };

  const handleGameChange = (value: string) => {
    setSelectedGame(value);
    resetDisplayedResults();
    notifyBuildReset();
  };

  const handleResolutionChange = (value: string) => {
    setSelectedResolution(value);
    resetDisplayedResults();
    notifyBuildReset();
  };

  const handleAdvancedSelectionChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
      setter(value);
      resetDisplayedResults();
      notifyBuildReset();
    };

  const buildModelOptions = (resolution: string): FPSModelOptions => ({
    resolution,
    quality: selectedGraphicsQuality as FPSModelOptions['quality'],
    upscaling: selectedUpscaling as FPSModelOptions['upscaling'],
    antiAliasing: selectedAntiAliasing as FPSModelOptions['antiAliasing'],
    ramGB: parseInt(selectedRamSize, 10) || 16,
    ramSpeedMT: parseInt(selectedRamSpeed, 10) || 3200,
    storage: selectedStorageType as FPSModelOptions['storage'],
  });

  const getModifierOption = (options: ModifierOption[], id: string) =>
    options.find((option) => option.id === id) ?? options[0];

  const getBasicOption = (options: BasicOption[], id: string) =>
    options.find((option) => option.id === id) ?? options[0];

  const handleCalculate = () => {
    if (!selectedCPU || !selectedGPU || !selectedGame || !selectedResolution) {
      return;
    }

    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const game = getGameById(selectedGame);

    if (!cpu || !gpu || !game) {
      return;
    }

    const estimate = estimateFPSRange(cpu, gpu, game, buildModelOptions(selectedResolution));
    const adjustedFps = estimate.average;

    if (onBuildChange) {
      onBuildChange({
        cpu: cpu.id,
        gpu: gpu.id,
        game: game.id,
        resolution: selectedResolution,
        ramSize: selectedRamSize,
        ramSpeed: selectedRamSpeed,
        storage: selectedStorageType,
        quality: selectedGraphicsQuality,
        upscaling: selectedUpscaling,
        refreshRate: selectedRefreshRate,
        antiAliasing: selectedAntiAliasing,
        fps: adjustedFps,
      });
    }

    setShowResults(true);
  };

  const isFormComplete = selectedCPU && selectedGPU && selectedGame && selectedResolution;

  if (showResults) {
    const resultConfig: FPSCalculatorConfig = {
      cpu: selectedCPU,
      gpu: selectedGPU,
      game: selectedGame,
      resolution: selectedResolution,
      ramSize: selectedRamSize,
      ramSpeed: selectedRamSpeed,
      storage: selectedStorageType,
      quality: selectedGraphicsQuality,
      upscaling: selectedUpscaling,
      refreshRate: selectedRefreshRate,
      antiAliasing: selectedAntiAliasing,
    };

    return (
      <FPSCalculatorResults
        initialConfig={resultConfig}
        skipInitialBuildNotification
        onBuildChange={onBuildChange}
        dict={dict}
        lang={lang}
      />
    );
  }
  const cpuName = selectedCPU ? getCPUById(selectedCPU)?.name ?? '' : '';
  const gpuName = selectedGPU ? getGPUById(selectedGPU)?.name ?? '' : '';
  const selectedGameData = selectedGame ? getGameById(selectedGame) : undefined;
  const gameName = selectedGameData?.name ?? '';
  const gameProfileMetadata = selectedGameData ? getFPSGameProfileMetadata(selectedGameData) : undefined;
  const workloadLabel = gameProfileMetadata?.tendency === 'cpu-heavy'
    ? gameInsightCopy.cpuHeavy
    : gameProfileMetadata?.tendency === 'gpu-heavy'
      ? gameInsightCopy.gpuHeavy
      : gameInsightCopy.balanced;
  const workloadAdvice = gameProfileMetadata?.tendency === 'cpu-heavy'
    ? gameInsightCopy.cpuAdvice
    : gameProfileMetadata?.tendency === 'gpu-heavy'
      ? gameInsightCopy.gpuAdvice
      : gameInsightCopy.balancedAdvice;
  const resolutionOption = locResolutionOptions.find((option) => option.id === selectedResolution);
  const ramSizeOptionForm = getModifierOption(locRamSizeOptions, selectedRamSize);
  const ramSpeedOptionForm = getModifierOption(locRamSpeedOptions, selectedRamSpeed);
  const storageOptionForm = getModifierOption(locStorageOptions, selectedStorageType);
  const graphicsOptionForm = getModifierOption(locGraphicsOptions, selectedGraphicsQuality);
  const upscalingOptionForm = getModifierOption(locUpscalingOptions, selectedUpscaling);
  const aaOptionForm = getModifierOption(locAaOptions, selectedAntiAliasing);
  const refreshRateOptionForm = getBasicOption(locRefreshOptions, selectedRefreshRate);
  const calculateHelpId = 'calculate-help';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Card className="border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40">
        <CardHeader className="text-center space-y-3">
          <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold leading-none tracking-tight">
            <Gamepad2 className="w-8 h-8 text-green-600" />
            <span>{t.title}</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.description}
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base font-semibold">
              <span className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                {t.cpu.title}
              </span>
              <span className="text-xs font-medium text-slate-500">{allCPUs.length} models</span>
            </CardTitle>
            <p className="text-xs text-muted-foreground">{t.cpu.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col">
            <div className="space-y-1">
              <label
                id="cpu-select-label"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {t.cpu.label}
              </label>
              <EnhancedSearchableSelect
                id="fps-cpu-select"
                options={cpuOptions}
                value={selectedCPU}
                onValueChange={handleCpuChange}
                placeholder={t.cpu.placeholder}
                type="cpu"
                labelId="cpu-select-label"
                descriptionId="cpu-select-help"
              />
              <p id="cpu-select-help" className="text-xs text-muted-foreground">
                {t.cpu.help}
              </p>
            </div>
            <div className="min-h-[44px]">
              {selectedCPU && (
                <div className="flex items-center justify-between text-xs text-muted-foreground bg-slate-100/80 dark:bg-slate-800/60 px-3 py-2 rounded-md">
                  <span className="truncate">
                    {t.cpu.selected}{' '}
                    <span className="font-medium text-foreground">{cpuName}</span>
                  </span>
                  <button
                    type="button"
                    className="text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                    onClick={() => handleClearSelection('cpu')}
                  >
                    {t.cpu.clear}
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base font-semibold">
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                {t.gpu.title}
              </span>
              <span className="text-xs font-medium text-slate-500">{allGPUs.length} models</span>
            </CardTitle>
            <p className="text-xs text-muted-foreground">{t.gpu.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col">
            <div className="space-y-1">
              <label
                id="gpu-select-label"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {t.gpu.label}
              </label>
              <EnhancedSearchableSelect
                id="fps-gpu-select"
                options={gpuOptions}
                value={selectedGPU}
                onValueChange={handleGpuChange}
                placeholder={t.gpu.placeholder}
                type="gpu"
                labelId="gpu-select-label"
                descriptionId="gpu-select-help"
              />
              <p id="gpu-select-help" className="text-xs text-muted-foreground">
                {t.gpu.help}
              </p>
            </div>
            <div className="min-h-[44px]">
              {selectedGPU && (
                <div className="flex items-center justify-between text-xs text-muted-foreground bg-slate-100/80 dark:bg-slate-800/60 px-3 py-2 rounded-md">
                  <span className="truncate">
                    {t.gpu.selected}{' '}
                    <span className="font-medium text-foreground">{gpuName}</span>
                  </span>
                  <button
                    type="button"
                    className="text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                    onClick={() => handleClearSelection('gpu')}
                  >
                    {t.gpu.clear}
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-8">
        <Card className="min-h-[400px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <HardDrive className="w-5 h-5 text-amber-600" />
              {t.memory.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{t.memory.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col">
            <div className="space-y-1">
              <label htmlFor="ram-size" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.memory.ram_size_label}
              </label>
              <select
                id="ram-size"
                value={selectedRamSize}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedRamSize)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="ram-size-help"
              >
                {locRamSizeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="ram-size-help" className="text-xs text-muted-foreground">
                {ramSizeOptionForm.description}
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="ram-speed" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.memory.ram_speed_label}
              </label>
              <select
                id="ram-speed"
                value={selectedRamSpeed}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedRamSpeed)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="ram-speed-help"
              >
                {locRamSpeedOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="ram-speed-help" className="text-xs text-muted-foreground">
                {ramSpeedOptionForm.description}
              </p>
            </div>

            <div className="space-y-1 mt-auto">
              <label htmlFor="storage-type" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.memory.storage_label}
              </label>
              <select
                id="storage-type"
                value={selectedStorageType}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedStorageType)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="storage-type-help"
              >
                {locStorageOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="storage-type-help" className="text-xs text-muted-foreground">
                {storageOptionForm.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <Card className="min-h-[400px] flex flex-col xl:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Gamepad2 className="w-5 h-5 text-emerald-600" />
              {t.game.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{t.game.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col">
            <div className="space-y-1">
              <label
                id="game-select-label"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {t.game.label}
              </label>
              <EnhancedSearchableSelect
                id="fps-game-select"
                options={gameOptions}
                value={selectedGame}
                onValueChange={handleGameChange}
                placeholder={t.game.placeholder}
                type="game"
                labelId="game-select-label"
                descriptionId="game-select-help"
              />
              <p id="game-select-help" className="text-xs text-muted-foreground">
                {t.game.help}
              </p>
            </div>
            <div className="min-h-[44px]">
              {selectedGameData && gameProfileMetadata && (
                <section
                  aria-labelledby="selected-game-model-title"
                  className={`rounded-lg border p-3 text-xs ${gameProfileMetadata.speculative
                    ? 'border-amber-300 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-950/30'
                    : 'border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/60'}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 id="selected-game-model-title" className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Info className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      {gameInsightCopy.title}
                    </h4>
                    <button
                      type="button"
                      className="rounded font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      onClick={() => handleClearSelection('game')}
                    >
                      {t.game.clear}
                    </button>
                  </div>

                  {gameProfileMetadata.speculative && (
                    <p className="mt-2 flex items-start gap-1.5 rounded-md border border-amber-300 bg-amber-100/80 px-2.5 py-2 font-medium leading-5 text-amber-950 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-100">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{gameInsightCopy.speculativeWarning}</span>
                    </p>
                  )}

                  <dl className="mt-3 grid gap-x-4 gap-y-2 text-muted-foreground sm:grid-cols-2">
                    <div>
                      <dt className="inline font-medium text-foreground">{gameInsightCopy.profile}: </dt>
                      <dd className="inline">{gameProfileMetadata.source === 'game-profile' ? gameInsightCopy.detailedProfile : gameInsightCopy.fallbackProfile}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-foreground">{gameInsightCopy.workload}: </dt>
                      <dd className="inline"><Badge variant="outline" className="ml-1 align-middle">{workloadLabel}</Badge></dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-foreground">{gameInsightCopy.ram}: </dt>
                      <dd className="inline">{selectedGameData.ramRequirement} GB</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-foreground">{gameInsightCopy.technologies}: </dt>
                      <dd className="inline">{selectedGameData.optimizations.length ? selectedGameData.optimizations.join(', ') : gameInsightCopy.noTechnologies}</dd>
                    </div>
                  </dl>

                  <details className="mt-3 rounded-md border border-dashed border-slate-300 bg-background/70 px-3 py-2 dark:border-slate-700">
                    <summary className="cursor-pointer font-semibold text-primary">{gameInsightCopy.why}</summary>
                    <div className="mt-2 space-y-2 leading-5 text-muted-foreground">
                      <p>{gameProfileMetadata.source === 'game-profile' ? gameInsightCopy.detailedNote : gameInsightCopy.fallbackNote}</p>
                      <p className="font-medium text-foreground">{workloadAdvice}</p>
                    </div>
                  </details>
                </section>
              )}
            </div>
            <div className="space-y-1 mt-auto">
              <label
                id="resolution-select-label"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {t.game.resolution_label}
              </label>
              <EnhancedSearchableSelect
                id="fps-resolution-select"
                options={locResolutionOptions}
                value={selectedResolution}
                onValueChange={handleResolutionChange}
                placeholder={t.game.resolution_placeholder}
                type="resolution"
                labelId="resolution-select-label"
                descriptionId="resolution-select-help"
              />
              <p id="resolution-select-help" className="text-xs text-muted-foreground">
                {resolutionOption ? resolutionOption.specs : t.game.resolution_help_default}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[400px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Sparkles className="w-5 h-5 text-purple-600" />
              {t.quality.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{t.quality.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col">
            <div className="space-y-1">
              <label htmlFor="graphics-quality" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.quality.graphics_label}
              </label>
              <select
                id="graphics-quality"
                value={selectedGraphicsQuality}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedGraphicsQuality)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="graphics-quality-help"
              >
                {locGraphicsOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="graphics-quality-help" className="text-xs text-muted-foreground">
                {graphicsOptionForm.description}
              </p>
            </div>

            <div className="space-y-1 mt-auto">
              <label htmlFor="upscaling-tech" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.quality.upscaling_label}
              </label>
              <select
                id="upscaling-tech"
                value={selectedUpscaling}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedUpscaling)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="upscaling-tech-help"
              >
                {locUpscalingOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="upscaling-tech-help" className="text-xs text-muted-foreground">
                {upscalingOptionForm.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[400px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Gauge className="w-5 h-5 text-sky-600" />
              {t.display.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{t.display.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col">
            <div className="space-y-1">
              <label htmlFor="refresh-rate" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.display.refresh_label}
              </label>
              <select
                id="refresh-rate"
                value={selectedRefreshRate}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedRefreshRate)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="refresh-rate-help"
              >
                {locRefreshOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="refresh-rate-help" className="text-xs text-muted-foreground">
                {refreshRateOptionForm.description}
              </p>
            </div>

            <div className="space-y-1 mt-auto">
              <label htmlFor="anti-aliasing" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.display.aa_label}
              </label>
              <select
                id="anti-aliasing"
                value={selectedAntiAliasing}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedAntiAliasing)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="anti-aliasing-help"
              >
                {locAaOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="anti-aliasing-help" className="text-xs text-muted-foreground">
                {aaOptionForm.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40">
        <CardContent className="flex flex-col items-center gap-3 py-6">
          <Button
            onClick={handleCalculate}
            disabled={!isFormComplete}
            className="w-full md:w-2/3 py-3 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50"
            aria-describedby={calculateHelpId}
          >
            {isFormComplete ? (
              <>
                <BarChart3 className="w-5 h-5 mr-2" />
                {t.actions.calculate}
              </>
            ) : (
              t.actions.incomplete
            )}
          </Button>
          <p id={calculateHelpId} className="text-xs text-muted-foreground text-center">
            {t.actions.help}
          </p>
        </CardContent>
      </Card>
    </div>
  );
});
