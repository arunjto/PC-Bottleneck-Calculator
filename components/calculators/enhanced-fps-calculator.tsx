"use client";
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { allCPUs, allGPUs, allGames, getCPUById, getGPUById, getGameById } from '@/lib/hardware-database';
import { estimateFPSRange, estimateFPSWithBreakdown, FPS_MODEL_VERSION } from '@/lib/fps-model';
import type { FPSEstimate, FPSModelOptions } from '@/lib/fps-model';
import { serializeFPSShareConfig } from '@/lib/fps-share';
import type { FPSCalculatorBuild, FPSCalculatorConfig } from '@/lib/fps-share';
import {
  generateFPSResultImage,
  getFPSResultImageFileName,
  type FPSResultImageData,
  type FPSResultImageLayout,
  type FPSResultImageTheme,
} from '@/lib/fps-result-image';
import {
  optimizeForTargetFPS,
  TARGET_FPS_OPTIONS,
  type TargetFPS,
  type TargetFPSScenario,
} from '@/lib/fps-target-optimizer';
import { analyzeFPSSmoothness } from '@/lib/fps-smoothness';
import { getLocalizedPath } from '@/lib/path-translations';
import type { Locale } from '@/i18n-config';
import { Gamepad2, Monitor, BarChart3, TrendingUp, Cpu, Zap, HardDrive, Sparkles, Gauge, AlertTriangle, Check, Link2, Printer, Calculator, ImageDown, ClipboardCopy, Target, Activity, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type HardwareBrandLogoProps = {
  brand: 'Intel' | 'AMD' | 'NVIDIA';
  component: 'cpu' | 'gpu';
};

const brandLogoPaths = {
  Intel: 'M20.42 7.345v9.18h1.651v-9.18zM0 7.475v1.737h1.737V7.474zm9.78.352v6.053c0 .513.044.945.13 1.292.087.34.235.618.44.828.203.21.475.359.803.451.334.093.754.136 1.255.136h.216v-1.533c-.24 0-.445-.012-.593-.037a.672.672 0 0 1-.39-.173.693.693 0 0 1-.173-.377 4.002 4.002 0 0 1-.037-.606v-2.182h1.193v-1.416h-1.193V7.827zm-3.505 2.312c-.396 0-.76.08-1.082.241-.327.161-.6.384-.822.668l-.087.117v-.902H2.658v6.256h1.639v-3.214c.018-.588.16-1.02.433-1.299.29-.297.642-.445 1.044-.445.476 0 .841.149 1.082.433.235.284.359.686.359 1.2v3.324h1.663V12.97c.006-.89-.229-1.595-.686-2.09-.458-.495-1.1-.742-1.917-.742zm10.065.006a3.252 3.252 0 0 0-2.306.946c-.29.29-.525.637-.692 1.033a3.145 3.145 0 0 0-.254 1.273c0 .452.08.878.241 1.274.161.395.39.742.674 1.032.284.29.637.526 1.045.693.408.173.86.26 1.342.26 1.397 0 2.262-.637 2.782-1.23l-1.187-.904c-.248.297-.841.699-1.583.699-.464 0-.847-.105-1.138-.321a1.588 1.588 0 0 1-.593-.872l-.019-.056h4.915v-.587c0-.451-.08-.872-.235-1.267a3.393 3.393 0 0 0-.661-1.033 3.013 3.013 0 0 0-1.02-.692 3.345 3.345 0 0 0-1.311-.248zm-16.297.118v6.256h1.651v-6.256zm16.278 1.286c1.132 0 1.664.797 1.664 1.255l-3.32.006c0-.458.525-1.255 1.656-1.261z',
  AMD: 'M18.324 9.137l1.559 1.56h2.556v2.557L24 14.814V9.137zM2 9.52l-2 4.96h1.309l.37-.982H3.9l.408.982h1.338L3.432 9.52zm4.209 0v4.955h1.238v-3.092l1.338 1.562h.188l1.338-1.556v3.091h1.238V9.52H10.47l-1.592 1.845L7.287 9.52zm6.283 0v4.96h2.057c1.979 0 2.88-1.046 2.88-2.472 0-1.36-.937-2.488-2.747-2.488zm1.237.91h.792c1.17 0 1.63.711 1.63 1.57 0 .728-.372 1.572-1.616 1.572h-.806zm-10.985.273l.791 1.932H2.008zm17.137.307l-1.604 1.603v2.25h2.246l1.604-1.607h-2.246z',
  NVIDIA: 'M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z',
} as const;

const brandLogoStyles = {
  Intel: 'text-[#0068b5]',
  AMD: 'text-[#ed1c24]',
  NVIDIA: 'text-[#76b900]',
} as const;

function HardwareBrandLogo({ brand, component }: HardwareBrandLogoProps) {
  const productFamily = brand === 'AMD'
    ? (component === 'cpu' ? 'RYZEN' : 'RADEON')
    : brand === 'NVIDIA'
      ? 'GEFORCE'
      : (component === 'cpu' ? 'CORE' : 'ARC');
  const accessibleLabel = `${brand} ${productFamily} logo`;

  return (
    <div
      role="img"
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className={`flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 shadow-sm ${brandLogoStyles[brand]}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-9 fill-current">
        <path d={brandLogoPaths[brand]} />
      </svg>
      <span aria-hidden="true" className="mt-0.5 text-[7px] font-bold leading-none tracking-[0.12em]">
        {productFamily}
      </span>
    </div>
  );
}

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

type FPSOptimizationComparison = {
  original: FPSCalculatorBuild;
  optimized: FPSCalculatorBuild;
  originalEstimate: FPSEstimate;
  optimizedEstimate: FPSEstimate;
};

const FPS_RESULT_SECTION_IDS = [
  'overview',
  'smoothness',
  'optimizer',
  'upgrade-impact',
  'presets',
  'calculation-breakdown',
  'system',
] as const;

type FPSResultSectionId = (typeof FPS_RESULT_SECTION_IDS)[number];

const defaultExpandedResultSections: Record<FPSResultSectionId, boolean> = {
  overview: true,
  smoothness: true,
  optimizer: false,
  'upgrade-impact': false,
  presets: false,
  'calculation-breakdown': true,
  system: false,
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

export function EnhancedFPSCalculator({
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
  const results = dict?.results || {};

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
  const [linkCopied, setLinkCopied] = useState(false);
  const [imageTheme, setImageTheme] = useState<FPSResultImageTheme>('dark');
  const [imageLayout, setImageLayout] = useState<FPSResultImageLayout>('square');
  const [imageFeedback, setImageFeedback] = useState('');
  const [imageBusy, setImageBusy] = useState(false);
  const [targetFps, setTargetFps] = useState<TargetFPS>(60);
  const [optimizationComparison, setOptimizationComparison] = useState<FPSOptimizationComparison | null>(null);
  const [comparisonCopied, setComparisonCopied] = useState<'original' | 'optimized' | null>(null);
  const [shareToolsExpanded, setShareToolsExpanded] = useState(false);
  const [expandedResultSections, setExpandedResultSections] = useState(defaultExpandedResultSections);
  const [activeResultSection, setActiveResultSection] = useState<FPSResultSectionId>('overview');
  const resultsRegionRef = useRef<HTMLDivElement>(null);
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
    setOptimizationComparison(null);
    setComparisonCopied(null);
  };

  const navigateToResultSection = (sectionId: FPSResultSectionId) => {
    setActiveResultSection(sectionId);
    setExpandedResultSections((sections) => ({ ...sections, [sectionId]: true }));
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const toggleResultSection = (sectionId: FPSResultSectionId) => {
    setExpandedResultSections((sections) => ({
      ...sections,
      [sectionId]: !sections[sectionId],
    }));
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

  const getCurrentShareConfig = (): FPSCalculatorConfig => ({
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
  });

  const getRestorableShareUrl = (config: FPSCalculatorConfig) => {
    const url = new URL(window.location.pathname, window.location.origin);
    url.search = serializeFPSShareConfig(config).toString();
    return url.toString();
  };

  const copyResultLink = async () => {
    const shareUrl = getRestorableShareUrl(getCurrentShareConfig());

    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2500);
  };

  const returnToCalculator = () => {
    setShowResults(false);
    notifyBuildReset();
  };

  const applyGraphicsPreset = (quality: NonNullable<FPSModelOptions['quality']>) => {
    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const game = getGameById(selectedGame);
    if (!cpu || !gpu || !game || !selectedResolution) return;

    const estimate = estimateFPSRange(cpu, gpu, game, {
      ...buildModelOptions(selectedResolution),
      quality,
    });

    setSelectedGraphicsQuality(quality);
    setOptimizationComparison(null);
    setComparisonCopied(null);
    onBuildChange?.({
      cpu: cpu.id,
      gpu: gpu.id,
      game: game.id,
      resolution: selectedResolution,
      ramSize: selectedRamSize,
      ramSpeed: selectedRamSpeed,
      storage: selectedStorageType,
      quality,
      upscaling: selectedUpscaling,
      refreshRate: selectedRefreshRate,
      antiAliasing: selectedAntiAliasing,
      fps: estimate.average,
    });
  };

  const applyTargetScenario = (scenario: TargetFPSScenario) => {
    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const game = getGameById(selectedGame);
    if (!cpu || !gpu || !game) return;

    const originalEstimate = estimateFPSRange(
      cpu,
      gpu,
      game,
      buildModelOptions(selectedResolution)
    );
    const originalBuild: FPSCalculatorBuild = {
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
      fps: originalEstimate.average,
    };
    const optimizedBuild: FPSCalculatorBuild = {
      ...originalBuild,
      resolution: scenario.resolution,
      quality: scenario.quality,
      upscaling: scenario.upscaling,
      fps: scenario.estimate.average,
    };

    setOptimizationComparison((previous) => ({
      original: previous?.original ?? originalBuild,
      optimized: optimizedBuild,
      originalEstimate: previous?.originalEstimate ?? originalEstimate,
      optimizedEstimate: scenario.estimate,
    }));
    setComparisonCopied(null);
    setSelectedResolution(scenario.resolution);
    setSelectedGraphicsQuality(scenario.quality);
    setSelectedUpscaling(scenario.upscaling);
    onBuildChange?.(optimizedBuild);
  };

  const undoTargetOptimization = () => {
    if (!optimizationComparison) return;
    const { original } = optimizationComparison;
    setSelectedResolution(original.resolution);
    setSelectedGraphicsQuality(original.quality);
    setSelectedUpscaling(original.upscaling);
    setOptimizationComparison(null);
    setComparisonCopied(null);
    onBuildChange?.(original);
  };

  const copyOptimizationLink = async (
    version: 'original' | 'optimized',
    build: FPSCalculatorBuild
  ) => {
    const shareUrl = getRestorableShareUrl(build);

    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    setComparisonCopied(version);
    window.setTimeout(() => setComparisonCopied(null), 2500);
  };

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
    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const game = getGameById(selectedGame);

    if (cpu && gpu && game) {
      const baselineEstimate = estimateFPSRange(cpu, gpu, game, { resolution: selectedResolution });
      const { estimate: fpsEstimate, breakdown: calculationBreakdown } = estimateFPSWithBreakdown(
        cpu,
        gpu,
        game,
        buildModelOptions(selectedResolution)
      );
      const baselineFps = baselineEstimate.average;
      const adjustedFps = fpsEstimate.average;

      // Calculate FPS for all resolutions -- using LOCALIZED logic for names
      const allResolutionFPS = locResolutionOptions.map((res) => {
        const resolutionEstimate = estimateFPSRange(cpu, gpu, game, buildModelOptions(res.id));
        return {
          resolution: res.name,
          fps: resolutionEstimate.average,
          low: resolutionEstimate.low,
          high: resolutionEstimate.high,
        };
      });

      const getPerformanceRating = (fps: number) => {
        if (fps >= 120) return { rating: t.results.ratings.excellent.label, color: 'text-green-600', description: t.results.ratings.excellent.desc };
        if (fps >= 90) return { rating: t.results.ratings.very_good.label, color: 'text-blue-600', description: t.results.ratings.very_good.desc };
        if (fps >= 60) return { rating: t.results.ratings.good.label, color: 'text-yellow-600', description: t.results.ratings.good.desc };
        if (fps >= 30) return { rating: t.results.ratings.fair.label, color: 'text-orange-600', description: t.results.ratings.fair.desc };
        return { rating: t.results.ratings.poor.label, color: 'text-red-600', description: t.results.ratings.poor.desc };
      };

      const performanceRating = getPerformanceRating(adjustedFps);
      // Use LOCALIZED options for summary
      const ramSizeOption = getModifierOption(locRamSizeOptions, selectedRamSize);
      const ramSpeedOption = getModifierOption(locRamSpeedOptions, selectedRamSpeed);
      const storageOption = getModifierOption(locStorageOptions, selectedStorageType);
      const graphicsOption = getModifierOption(locGraphicsOptions, selectedGraphicsQuality);
      const upscalingOption = getModifierOption(locUpscalingOptions, selectedUpscaling);
      const aaOption = getModifierOption(locAaOptions, selectedAntiAliasing);
      const refreshRateOption = getBasicOption(locRefreshOptions, selectedRefreshRate);

      const advancedSummary = [
        { label: t.memory.ram_size_label, value: ramSizeOption.label, helper: ramSizeOption.description },
        { label: t.memory.ram_speed_label, value: ramSpeedOption.label, helper: ramSpeedOption.description },
        { label: t.memory.storage_label, value: storageOption.label, helper: storageOption.description },
        { label: t.quality.graphics_label, value: graphicsOption.label, helper: graphicsOption.description },
        { label: t.quality.upscaling_label, value: upscalingOption.label, helper: upscalingOption.description },
        { label: t.display.aa_label, value: aaOption.label, helper: aaOption.description },
        { label: t.display.refresh_label, value: refreshRateOption.label, helper: refreshRateOption.description },
      ];

      const fpsDelta = adjustedFps - baselineFps;
      const fpsDeltaRounded = Math.round(fpsDelta);
      const fpsPercentDelta = baselineFps > 0 ? (fpsDelta / baselineFps) * 100 : 0;
      const baselineRounded = Math.max(0, Math.round(baselineFps));
      const refreshTargetValue = parseInt(selectedRefreshRate.replace(/\D/g, ''), 10) || 0;
      const resultNavigationCopy = t.results_navigation;
      const resultNavigationItems: Array<{
        id: FPSResultSectionId;
        label: string;
        isNew?: boolean;
      }> = [
        { id: 'overview', label: resultNavigationCopy.sections.overview },
        { id: 'smoothness', label: resultNavigationCopy.sections.smoothness, isNew: true },
        { id: 'optimizer', label: resultNavigationCopy.sections.optimizer, isNew: true },
        { id: 'upgrade-impact', label: resultNavigationCopy.sections.upgrade, isNew: true },
        { id: 'presets', label: resultNavigationCopy.sections.presets },
        { id: 'calculation-breakdown', label: resultNavigationCopy.sections.breakdown },
        { id: 'system', label: resultNavigationCopy.sections.system },
      ];
      const smoothnessCopy = t.smoothness_analysis;
      const smoothnessAnalysis = analyzeFPSSmoothness(
        fpsEstimate,
        refreshTargetValue || 60
      );
      const fpsPercentDeltaDisplay = Number.isFinite(fpsPercentDelta) ? fpsPercentDelta.toFixed(1) : '0.0';
      const fpsDeltaPrefix = fpsDeltaRounded >= 0 ? '+' : '';
      const fpsPercentDeltaPrefix = fpsPercentDelta >= 0 ? '+' : '';

      const refreshFailText = t.results.advanced_impact.refresh_fail
        .replace('{diff}', Math.max(0, refreshTargetValue - adjustedFps))
        .replace('{target}', refreshRateOption.label);
      const refreshPassText = t.results.advanced_impact.refresh_pass
        .replace('{target}', refreshRateOption.label);

      const refreshComparison =
        refreshTargetValue > 0
          ? adjustedFps >= refreshTargetValue
            ? refreshPassText
            : refreshFailText
          : '';

      const rayTracingSupportListed = game.optimizations.some((optimization) =>
        /ray[ -]?tracing|path[ -]?tracing|\brtx\b/i.test(optimization)
      );
      const presetComparisons = locGraphicsOptions.map((option) => {
        const quality = option.id as NonNullable<FPSModelOptions['quality']>;
        const estimate = estimateFPSRange(cpu, gpu, game, {
          ...buildModelOptions(selectedResolution),
          quality,
        });
        const isRayTracingPreset = quality === 'ray-tracing' || quality.startsWith('rt-');

        return {
          id: quality,
          label: option.label,
          estimate,
          difference: estimate.average - adjustedFps,
          meetsRefreshTarget: refreshTargetValue > 0 && estimate.average >= refreshTargetValue,
          refreshShortfall: Math.max(0, refreshTargetValue - estimate.average),
          supportUncertain: isRayTracingPreset && !rayTracingSupportListed,
          isSelected: quality === selectedGraphicsQuality,
        };
      });

      const targetCopy = t.target_optimizer;
      const targetOptimization = optimizeForTargetFPS(
        cpu,
        gpu,
        game,
        buildModelOptions(selectedResolution),
        targetFps
      );
      const currentMeetsTarget = fpsEstimate.average >= targetFps;
      const bestSettingsShortfall = Math.max(
        0,
        targetFps - targetOptimization.bestPossibleEstimate.average
      );
      const limitingComponentLabel = targetOptimization.bestPossibleEstimate.limitingComponent === 'Mixed'
        ? targetCopy.components.mixed
        : targetCopy.components[targetOptimization.bestPossibleEstimate.limitingComponent.toLowerCase()];
      const getTargetResolutionLabel = (resolution: string) =>
        locResolutionOptions.find((option) => option.id === resolution)?.name ?? resolution;
      const getTargetScenarioChanges = (scenario: TargetFPSScenario) => scenario.changes.map((change) => {
        if (change === 'upscaling') {
          return `${targetCopy.change_labels.upscaling}: ${getModifierOption(locUpscalingOptions, scenario.upscaling).label}`;
        }
        if (change === 'quality') {
          return `${targetCopy.change_labels.quality}: ${getModifierOption(locGraphicsOptions, scenario.quality).label}`;
        }
        return `${targetCopy.change_labels.resolution}: ${getTargetResolutionLabel(scenario.resolution)}`;
      });
      const comparisonCopy = targetCopy.comparison;
      const comparisonGain = optimizationComparison
        ? optimizationComparison.optimizedEstimate.average - optimizationComparison.originalEstimate.average
        : 0;
      const comparisonGainPercent = optimizationComparison && optimizationComparison.originalEstimate.average > 0
        ? (comparisonGain / optimizationComparison.originalEstimate.average) * 100
        : 0;
      const getComparisonSettings = (build: FPSCalculatorBuild) => [
        `${targetCopy.change_labels.resolution}: ${getTargetResolutionLabel(build.resolution)}`,
        `${targetCopy.change_labels.quality}: ${getModifierOption(locGraphicsOptions, build.quality).label}`,
        `${targetCopy.change_labels.upscaling}: ${getModifierOption(locUpscalingOptions, build.upscaling).label}`,
      ];
      const comparisonTradeoffs = optimizationComparison
        ? [
            optimizationComparison.original.upscaling !== optimizationComparison.optimized.upscaling
              ? comparisonCopy.tradeoffs.upscaling
              : null,
            optimizationComparison.original.quality !== optimizationComparison.optimized.quality
              ? comparisonCopy.tradeoffs.quality
              : null,
            optimizationComparison.original.resolution !== optimizationComparison.optimized.resolution
              ? comparisonCopy.tradeoffs.resolution
              : null,
          ].filter((tradeoff): tradeoff is string => Boolean(tradeoff))
        : [];

      const upgradeSummaryCopy = t.upgrade_impact.summary;
      const priorityResolution = selectedResolution === '4K'
        ? '3840x2160'
        : selectedResolution === '1440p'
          ? '2560x1440'
          : '1920x1080';
      const getUpgradeToolUrl = (slug: string, params: Record<string, string>) =>
        `${getLocalizedPath(lang as Locale, `tools/${slug}`)}?${new URLSearchParams(params).toString()}`;
      const cpuUpgradeToolUrl = getUpgradeToolUrl('cpu-upgrade-calculator', {
        currentCpu: cpu.id,
        gpu: gpu.id,
        currentFps: String(fpsEstimate.average),
        useCase: 'gaming',
      });
      const gpuUpgradeToolUrl = getUpgradeToolUrl('gpu-upgrade-calculator', {
        currentGpu: gpu.id,
        cpu: cpu.id,
        currentFps: String(fpsEstimate.average),
      });
      const priorityToolUrl = getUpgradeToolUrl('pc-upgrade-priority-calculator', {
        cpu: cpu.id,
        gpu: gpu.id,
        ramCapacity: String(parseInt(selectedRamSize, 10) || 16),
        resolution: priorityResolution,
        useCase: 'gaming',
      });
      const upgradeLimitKey = fpsEstimate.limitingComponent.toLowerCase() as 'cpu' | 'gpu' | 'mixed';
      const upgradeSummaryMessage = upgradeSummaryCopy.limit[upgradeLimitKey]
        .replace('{component}', fpsEstimate.limitingComponent === 'Mixed'
          ? upgradeSummaryCopy.components.mixed
          : upgradeSummaryCopy.components[upgradeLimitKey]);

      const breakdownCopy = t.calculation_breakdown;
      const numberFormatter = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 });
      const signedNumberFormatter = new Intl.NumberFormat(lang, {
        maximumFractionDigits: 1,
        signDisplay: 'always',
      });
      const fillTemplate = (template: string, values: Record<string, string | number>) =>
        Object.entries(values).reduce(
          (text, [key, value]) => text.replace(`{${key}}`, String(value)),
          template
        );
      const selectedResolutionName = locResolutionOptions.find(
        (option) => option.id === selectedResolution
      )?.name ?? selectedResolution;

      const getBreakdownInput = (stageKey: string) => {
        switch (stageKey) {
          case 'reference':
            return calculationBreakdown.profileSource === 'game-profile'
              ? breakdownCopy.profile_known
              : breakdownCopy.profile_fallback;
          case 'cpu':
            return fillTemplate(breakdownCopy.details.cpu, {
              score: calculationBreakdown.cpuScore,
              scale: calculationBreakdown.cpuScale.toFixed(3),
              weight: numberFormatter.format(calculationBreakdown.cpuWeight * 100),
            });
          case 'gpu':
            return fillTemplate(breakdownCopy.details.gpu, {
              score: calculationBreakdown.gpuScore,
              scale: calculationBreakdown.gpuScale.toFixed(3),
              weight: numberFormatter.format(calculationBreakdown.gpuWeight * 100),
            });
          case 'resolution':
            return fillTemplate(breakdownCopy.details.selected, { value: selectedResolutionName });
          case 'quality':
            return fillTemplate(breakdownCopy.details.selected, { value: graphicsOption.label });
          case 'upscaling':
            return calculationBreakdown.upscalingSupported
              ? fillTemplate(breakdownCopy.details.selected, { value: upscalingOption.label })
              : `${upscalingOption.label} — ${breakdownCopy.unsupported}`;
          case 'antiAliasing':
            return fillTemplate(breakdownCopy.details.selected, { value: aaOption.label });
          case 'vram':
            return fillTemplate(breakdownCopy.details.vram, {
              available: calculationBreakdown.availableVramGB,
              required: calculationBreakdown.requiredVramGB,
            });
          case 'ram':
            return fillTemplate(breakdownCopy.details.ram, {
              available: calculationBreakdown.selectedRamGB,
              required: calculationBreakdown.requiredRamGB,
            });
          case 'memorySpeed':
            return fillTemplate(breakdownCopy.details.selected, { value: ramSpeedOption.label });
          case 'storage':
            return fillTemplate(breakdownCopy.details.selected, { value: storageOption.label });
          case 'fpsCap':
            return fillTemplate(breakdownCopy.details.cap, {
              value: calculationBreakdown.fpsCap ?? '',
            });
          default:
            return '';
        }
      };

      const formatBreakdownFactor = (factor: number | null) => {
        if (factor === null) return breakdownCopy.starting_point;
        const percentageChange = (factor - 1) * 100;
        return `×${factor.toFixed(3)} (${signedNumberFormatter.format(percentageChange)}%)`;
      };

      const resultImageCopy = t.result_image;
      const getResultImageData = (): FPSResultImageData => ({
        brand: 'PC Build Check',
        title: resultImageCopy.card_title,
        game: game.name,
        cpu: cpu.name,
        gpu: gpu.name,
        resolution: selectedResolutionName,
        quality: graphicsOption.label,
        upscaling: upscalingOption.label,
        fpsRange: `${fpsEstimate.low}–${fpsEstimate.high} FPS`,
        onePercentLow: `${fpsEstimate.onePercentLow} FPS`,
        limitingComponent: fpsEstimate.limitingComponent === 'Mixed'
          ? 'CPU + GPU'
          : fpsEstimate.limitingComponent,
        modelVersion: FPS_MODEL_VERSION,
        shareUrl: getRestorableShareUrl(getCurrentShareConfig()),
        disclaimer: resultImageCopy.disclaimer,
        labels: {
          cpu: resultImageCopy.labels.cpu,
          gpu: resultImageCopy.labels.gpu,
          settings: resultImageCopy.labels.settings,
          fpsRange: resultImageCopy.labels.fps_range,
          onePercentLow: resultImageCopy.labels.one_percent_low,
          limitingComponent: resultImageCopy.labels.limiting_component,
          modelVersion: resultImageCopy.labels.model_version,
          shareUrl: resultImageCopy.labels.share_url,
        },
      });

      const showImageMessage = (message: string) => {
        setImageFeedback(message);
        window.setTimeout(() => setImageFeedback(''), 3500);
      };

      const downloadResultImage = async () => {
        setImageBusy(true);
        try {
          const blob = await generateFPSResultImage(getResultImageData(), imageTheme, imageLayout);
          const objectUrl = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = objectUrl;
          anchor.download = getFPSResultImageFileName(game.name, imageLayout);
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
          showImageMessage(resultImageCopy.downloaded);
        } catch {
          showImageMessage(resultImageCopy.failed);
        } finally {
          setImageBusy(false);
        }
      };

      const copyResultImage = async () => {
        if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
          showImageMessage(resultImageCopy.copy_unsupported);
          return;
        }

        setImageBusy(true);
        try {
          const blob = await generateFPSResultImage(getResultImageData(), imageTheme, imageLayout);
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          showImageMessage(resultImageCopy.copied);
        } catch {
          showImageMessage(resultImageCopy.failed);
        } finally {
          setImageBusy(false);
        }
      };

      return (
        <div
          ref={resultsRegionRef}
          role="region"
          aria-live="polite"
          aria-label={t.results.title}
          tabIndex={-1}
          className="fps-print-report scroll-mt-16 w-full max-w-4xl mx-auto space-y-6 focus:outline-none [overflow-anchor:none]"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <Button
                  variant="outline"
                  onClick={returnToCalculator}
                  className="fps-print-hide flex items-center space-x-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{t.actions.back}</span>
                </Button>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{t.results.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{game.name} {t.results.subtitle}</p>
                </div>
                <div className="hidden w-32 sm:block" aria-hidden="true" />
              </div>
            </CardHeader>
          </Card>

          <nav
            aria-label={resultNavigationCopy.aria_label}
            className="fps-print-hide sticky top-[52px] z-30 -mx-1 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-950/95"
          >
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {resultNavigationItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={activeResultSection === item.id}
                  onClick={() => navigateToResultSection(item.id)}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeResultSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                  {item.isNew && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      activeResultSection === item.id
                        ? 'bg-white/20 text-white'
                        : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200'
                    }`}>
                      {resultNavigationCopy.new_badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          <section id="overview" className="scroll-mt-28 space-y-6" aria-label={resultNavigationCopy.sections.overview}>
          {/* Main FPS Result */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <span>{t.results.performance_title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-lg border border-amber-300/70 bg-amber-50 p-4 text-left dark:bg-amber-950/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-amber-950 dark:text-amber-100">
                      {t.results.estimate_notice_title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-amber-900/90 dark:text-amber-100/80">
                      {t.results.estimate_notice}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">{fpsEstimate.low}–{fpsEstimate.high}</div>
                <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  {t.results.fps_range || 'Estimated average FPS range'} · {selectedResolution}
                </div>
                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">{t.results.midpoint || 'Planning midpoint'}</div>
                    <div className="text-xl font-semibold">{fpsEstimate.average} FPS</div>
                  </div>
                  <div className="rounded-lg border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">{t.results.one_percent_low || 'Estimated 1% low'}</div>
                    <div className="text-xl font-semibold">{fpsEstimate.onePercentLow} FPS</div>
                  </div>
                  <div className="rounded-lg border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">{t.results.likely_limit || 'Likely limiting factor'}</div>
                    <div className="text-xl font-semibold">{fpsEstimate.limitingComponent === 'Mixed' ? 'CPU + GPU' : fpsEstimate.limitingComponent}</div>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${performanceRating.color} mb-2`}>
                  {performanceRating.rating}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {performanceRating.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allResolutionFPS.map((result, index) => (
                  <div
                    key={result.resolution}
                    className={`p-4 rounded-lg border-2 ${result.resolution.includes(selectedResolution)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                      }`}
                  >
                    <div className="text-center">
                      <h3 className="font-semibold">{result.resolution}</h3>
                      <div className="text-2xl font-bold text-blue-600 my-2">{result.low}–{result.high} FPS</div>
                      <Progress value={Math.min(100, (result.fps / 144) * 100)} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="fps-print-hide border-blue-200 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/20">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    {t.share_result.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.share_result.description}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="fps-collapse-toggle shrink-0"
                  aria-expanded={shareToolsExpanded}
                  aria-controls="fps-share-tools-content"
                  onClick={() => setShareToolsExpanded((expanded) => !expanded)}
                >
                  <ChevronDown
                    className={`mr-1.5 h-4 w-4 transition-transform ${shareToolsExpanded ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  {shareToolsExpanded ? resultNavigationCopy.collapse : resultNavigationCopy.expand}
                </Button>
              </div>
            </CardHeader>
            <div
              id="fps-share-tools-content"
              className={`fps-collapsible-content ${shareToolsExpanded ? 'block' : 'hidden'}`}
            >
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="button" onClick={copyResultLink} className="sm:min-w-52">
                    {linkCopied ? (
                      <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Link2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    )}
                    {linkCopied ? t.share_result.copied : t.share_result.copy}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => window.print()} className="sm:min-w-44">
                    <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t.share_result.print}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{t.share_result.privacy}</p>

                <div className="space-y-4 border-t border-blue-200 pt-4 dark:border-blue-900">
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold">
                      <ImageDown className="h-5 w-5 text-cyan-600" aria-hidden="true" />
                      {resultImageCopy.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{resultImageCopy.description}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="result-image-theme" className="text-sm font-medium">
                        {resultImageCopy.theme}
                      </label>
                      <select
                        id="result-image-theme"
                        value={imageTheme}
                        onChange={(event) => setImageTheme(event.target.value as FPSResultImageTheme)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="dark">{resultImageCopy.theme_dark}</option>
                        <option value="light">{resultImageCopy.theme_light}</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="result-image-layout" className="text-sm font-medium">
                        {resultImageCopy.layout}
                      </label>
                      <select
                        id="result-image-layout"
                        value={imageLayout}
                        onChange={(event) => setImageLayout(event.target.value as FPSResultImageLayout)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="square">{resultImageCopy.layout_square}</option>
                        <option value="wide">{resultImageCopy.layout_wide}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button type="button" onClick={downloadResultImage} disabled={imageBusy}>
                      <ImageDown className="mr-2 h-4 w-4" aria-hidden="true" />
                      {imageBusy ? resultImageCopy.generating : resultImageCopy.download_png}
                    </Button>
                    <Button type="button" variant="outline" onClick={copyResultImage} disabled={imageBusy}>
                      <ClipboardCopy className="mr-2 h-4 w-4" aria-hidden="true" />
                      {resultImageCopy.copy_image}
                    </Button>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">{resultImageCopy.privacy}</p>
                  <p aria-live="polite" className="min-h-5 text-sm font-medium text-cyan-800 dark:text-cyan-200">
                    {imageFeedback}
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>

          </section>

          <section id="smoothness" className="scroll-mt-28" aria-label={resultNavigationCopy.sections.smoothness}>
          <Card className="border-teal-200 dark:border-teal-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" aria-hidden="true" />
                {smoothnessCopy.title}
              </CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">{smoothnessCopy.description}</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="text-xs font-medium text-muted-foreground">{smoothnessCopy.average_frame_time}</div>
                  <div className="mt-1 text-2xl font-bold">{smoothnessAnalysis.averageFrameTimeMs} ms</div>
                  <p className="mt-1 text-xs text-muted-foreground">{fpsEstimate.average} FPS</p>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="text-xs font-medium text-muted-foreground">{smoothnessCopy.one_percent_frame_time}</div>
                  <div className="mt-1 text-2xl font-bold">{smoothnessAnalysis.onePercentLowFrameTimeMs} ms</div>
                  <p className="mt-1 text-xs text-muted-foreground">{fpsEstimate.onePercentLow} FPS</p>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="text-xs font-medium text-muted-foreground">{smoothnessCopy.low_gap}</div>
                  <div className="mt-1 text-2xl font-bold">{smoothnessAnalysis.onePercentLowGapPercent}%</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    +{smoothnessAnalysis.frameTimeGapMs} ms
                  </p>
                </div>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="text-xs font-medium text-muted-foreground">{smoothnessCopy.refresh_utilization}</div>
                  <div className="mt-1 text-2xl font-bold">{smoothnessAnalysis.refreshUtilizationPercent}%</div>
                  <p className="mt-1 text-xs text-muted-foreground">{refreshRateOption.label}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{smoothnessCopy.monitor_match}</span>
                  <span>{fpsEstimate.average} / {refreshTargetValue || 60} FPS</span>
                </div>
                <Progress
                  value={Math.min(100, smoothnessAnalysis.refreshUtilizationPercent)}
                  className="h-2.5"
                />
                <p className="text-sm leading-6 text-muted-foreground">
                  {smoothnessCopy.refresh_status[smoothnessAnalysis.refreshStatus]
                    .replace('{refresh}', String(refreshTargetValue || 60))
                    .replace('{fps}', String(fpsEstimate.average))}
                </p>
              </div>

              <div className={`rounded-lg border p-4 ${
                smoothnessAnalysis.consistency === 'narrow'
                  ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/25'
                  : smoothnessAnalysis.consistency === 'moderate'
                    ? 'border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/25'
                    : 'border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/25'
              }`}>
                <h3 className="font-semibold">{smoothnessCopy.consistency_title}</h3>
                <p className="mt-1 text-sm leading-6">
                  {smoothnessCopy.consistency[smoothnessAnalysis.consistency]
                    .replace('{gap}', String(smoothnessAnalysis.onePercentLowGapPercent))
                    .replace('{ms}', String(smoothnessAnalysis.frameTimeGapMs))}
                </p>
              </div>

              <div className="rounded-lg border border-teal-300 bg-teal-50 p-4 dark:border-teal-900 dark:bg-teal-950/25">
                <h3 className="font-semibold text-teal-950 dark:text-teal-100">{smoothnessCopy.vrr_title}</h3>
                <p className="mt-1 text-sm leading-6 text-teal-900 dark:text-teal-100/85">
                  {smoothnessCopy.vrr_advice
                    .replace('{cap}', String(smoothnessAnalysis.suggestedVrrCeiling))
                    .replace('{refresh}', String(refreshTargetValue || 60))}
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-900/60">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 dark:text-slate-300" aria-hidden="true" />
                <p className="leading-6 text-slate-700 dark:text-slate-200">{smoothnessCopy.limitation}</p>
              </div>
            </CardContent>
          </Card>
          </section>

          <section id="optimizer" className="scroll-mt-28" aria-label={resultNavigationCopy.sections.optimizer}>
          <Card className="border-cyan-200 dark:border-cyan-900">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-cyan-600" aria-hidden="true" />
                    {targetCopy.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{targetCopy.description}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="fps-collapse-toggle fps-print-hide shrink-0"
                  aria-expanded={expandedResultSections.optimizer}
                  aria-controls="optimizer-content"
                  onClick={() => toggleResultSection('optimizer')}
                >
                  <ChevronDown
                    className={`mr-1.5 h-4 w-4 transition-transform ${expandedResultSections.optimizer ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  {expandedResultSections.optimizer ? resultNavigationCopy.collapse : resultNavigationCopy.expand}
                </Button>
              </div>
            </CardHeader>
            <div
              id="optimizer-content"
              className={`fps-collapsible-content ${expandedResultSections.optimizer ? 'block' : 'hidden'}`}
            >
            <CardContent className="space-y-5">
              <fieldset>
                <legend className="mb-2 text-sm font-semibold">{targetCopy.select_target}</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {TARGET_FPS_OPTIONS.map((target) => (
                    <Button
                      key={target}
                      type="button"
                      variant={targetFps === target ? 'default' : 'outline'}
                      aria-pressed={targetFps === target}
                      onClick={() => setTargetFps(target)}
                    >
                      {target} FPS
                    </Button>
                  ))}
                </div>
              </fieldset>

              <div className={`rounded-lg border p-4 ${
                currentMeetsTarget
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/25 dark:text-emerald-100'
                  : 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/25 dark:text-amber-100'
              }`}>
                <div className="flex items-start gap-3">
                  {currentMeetsTarget ? (
                    <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  )}
                  <div className="space-y-1">
                    <h3 className="font-semibold">
                      {currentMeetsTarget
                        ? targetCopy.current_meets.replace('{target}', String(targetFps))
                        : targetOptimization.bestPossibleEstimate.average >= targetFps
                          ? targetCopy.settings_can_reach.replace('{target}', String(targetFps))
                          : targetCopy.settings_cannot_reach
                              .replace('{target}', String(targetFps))
                              .replace('{best}', String(targetOptimization.bestPossibleEstimate.average))
                              .replace('{shortfall}', String(bestSettingsShortfall))}
                    </h3>
                    {!currentMeetsTarget && targetOptimization.fpsCap && targetFps > targetOptimization.fpsCap && (
                      <p className="text-sm leading-6">
                        {targetCopy.fps_cap
                          .replace('{target}', String(targetFps))
                          .replace('{cap}', String(targetOptimization.fpsCap))}
                      </p>
                    )}
                    {!currentMeetsTarget
                      && targetOptimization.bestPossibleEstimate.average < targetFps
                      && !(targetOptimization.fpsCap && targetFps > targetOptimization.fpsCap)
                      && (
                      <p className="text-sm leading-6">
                        {targetCopy.hardware_advice.replace('{component}', limitingComponentLabel)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {!optimizationComparison && (
                <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/40 p-4 dark:border-indigo-500 dark:bg-indigo-950/70">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-300" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-indigo-950 dark:text-indigo-100">
                        {comparisonCopy.placeholder_title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-indigo-900/80 dark:text-indigo-100">
                        {currentMeetsTarget
                          ? comparisonCopy.placeholder_target_met
                          : comparisonCopy.placeholder}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {optimizationComparison && (
                <section className="space-y-4 rounded-xl border-2 border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-500 dark:bg-slate-950">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">{comparisonCopy.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">{comparisonCopy.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                      +{comparisonGain} FPS ({comparisonGainPercent.toFixed(1)}%)
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {([
                      {
                        key: 'original' as const,
                        title: comparisonCopy.original,
                        build: optimizationComparison.original,
                        estimate: optimizationComparison.originalEstimate,
                        style: 'border-slate-300 bg-white/80 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100',
                      },
                      {
                        key: 'optimized' as const,
                        title: comparisonCopy.optimized,
                        build: optimizationComparison.optimized,
                        estimate: optimizationComparison.optimizedEstimate,
                        style: 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-500 dark:bg-emerald-950/70 dark:text-emerald-50',
                      },
                    ]).map((version) => (
                      <div key={version.key} className={`rounded-lg border p-4 ${version.style}`}>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-semibold">{version.title}</h4>
                          {version.key === 'optimized' && (
                            <Check className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                          )}
                        </div>
                        <div className="mt-3 text-2xl font-bold">
                          {version.estimate.low}–{version.estimate.high} FPS
                        </div>
                        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <dt className="text-slate-600 dark:text-slate-300">{comparisonCopy.midpoint}</dt>
                            <dd className="font-semibold">{version.estimate.average} FPS</dd>
                          </div>
                          <div>
                            <dt className="text-slate-600 dark:text-slate-300">{comparisonCopy.one_percent_low}</dt>
                            <dd className="font-semibold">{version.estimate.onePercentLow} FPS</dd>
                          </div>
                        </dl>
                        <ul className="mt-4 space-y-1 text-sm text-slate-600 dark:text-slate-200">
                          {getComparisonSettings(version.build).map((setting) => (
                            <li key={setting}>{setting}</li>
                          ))}
                        </ul>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="mt-4 w-full"
                          onClick={() => copyOptimizationLink(version.key, version.build)}
                        >
                          {comparisonCopied === version.key ? (
                            <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Link2 className="mr-2 h-4 w-4" aria-hidden="true" />
                          )}
                          {comparisonCopied === version.key
                            ? comparisonCopy.link_copied
                            : version.key === 'original'
                              ? comparisonCopy.copy_original
                              : comparisonCopy.copy_optimized}
                        </Button>
                      </div>
                    ))}
                  </div>

                  {comparisonTradeoffs.length > 0 && (
                    <div className="rounded-lg border border-amber-300/70 bg-amber-50 p-4 dark:border-amber-500 dark:bg-amber-950/70">
                      <h4 className="font-semibold text-amber-950 dark:text-amber-100">
                        {comparisonCopy.tradeoff_title}
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-amber-900 dark:text-amber-100">
                        {comparisonTradeoffs.map((tradeoff) => (
                          <li key={tradeoff}>{tradeoff}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">{comparisonCopy.share_note}</p>
                    <Button type="button" variant="outline" onClick={undoTargetOptimization} className="shrink-0">
                      {comparisonCopy.undo}
                    </Button>
                  </div>
                </section>
              )}

              {!currentMeetsTarget && targetOptimization.recommendations.length > 0 && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold">{targetCopy.recommendations}</h3>
                    <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-900 dark:bg-cyan-950 dark:text-cyan-100">
                      {targetCopy.free_changes}
                    </span>
                  </div>
                  {targetOptimization.recommendations.map((scenario, index) => (
                    <div
                      key={`${scenario.resolution}-${scenario.quality}-${scenario.upscaling}`}
                      className="rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-900/50"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold">
                              {targetCopy.option.replace('{number}', String(index + 1))}
                            </h4>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              scenario.meetsTarget
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                            }`}>
                              {scenario.meetsTarget ? targetCopy.meets_target : targetCopy.gets_closer}
                            </span>
                          </div>
                          <div>
                            <span className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                              {scenario.estimate.low}–{scenario.estimate.high} FPS
                            </span>
                            <span className="ml-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                              +{scenario.improvement} FPS
                            </span>
                          </div>
                          <Progress
                            value={Math.min(100, (scenario.estimate.average / targetFps) * 100)}
                            className="h-2"
                          />
                          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                            {getTargetScenarioChanges(scenario).map((change) => (
                              <li key={change}>{change}</li>
                            ))}
                          </ul>
                        </div>
                        <Button
                          type="button"
                          variant={index === 0 ? 'default' : 'outline'}
                          className="shrink-0"
                          onClick={() => applyTargetScenario(scenario)}
                        >
                          {targetCopy.apply_settings}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs leading-5 text-muted-foreground">{targetCopy.model_note}</p>
            </CardContent>
            </div>
          </Card>
          </section>

          <section id="upgrade-impact" className="scroll-mt-28" aria-label={resultNavigationCopy.sections.upgrade}>
          <Card className="border-violet-200 dark:border-violet-900">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-violet-600" aria-hidden="true" />
                    {upgradeSummaryCopy.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{upgradeSummaryCopy.description}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="fps-collapse-toggle fps-print-hide shrink-0"
                  aria-expanded={expandedResultSections['upgrade-impact']}
                  aria-controls="upgrade-impact-content"
                  onClick={() => toggleResultSection('upgrade-impact')}
                >
                  <ChevronDown
                    className={`mr-1.5 h-4 w-4 transition-transform ${expandedResultSections['upgrade-impact'] ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  {expandedResultSections['upgrade-impact'] ? resultNavigationCopy.collapse : resultNavigationCopy.expand}
                </Button>
              </div>
            </CardHeader>
            <div
              id="upgrade-impact-content"
              className={`fps-collapsible-content ${expandedResultSections['upgrade-impact'] ? 'block' : 'hidden'}`}
            >
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-violet-300 bg-violet-50 p-4 dark:border-violet-700 dark:bg-violet-950/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-violet-950 dark:text-violet-100">
                    {upgradeSummaryCopy.current_signal}
                  </h3>
                  <span className="rounded-full bg-violet-200 px-3 py-1 text-sm font-bold text-violet-950 dark:bg-violet-900 dark:text-violet-100">
                    {fpsEstimate.limitingComponent === 'Mixed'
                      ? upgradeSummaryCopy.components.mixed
                      : upgradeSummaryCopy.components[upgradeLimitKey]}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-violet-900 dark:text-violet-100/90">
                  {upgradeSummaryMessage}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <Link
                  href={cpuUpgradeToolUrl}
                  className="group rounded-xl border border-blue-200 bg-blue-50/70 p-4 transition hover:border-blue-500 hover:shadow-sm dark:border-blue-900 dark:bg-blue-950/25"
                >
                  <Cpu className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  <h3 className="mt-3 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    {upgradeSummaryCopy.cpu_tool}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{upgradeSummaryCopy.cpu_tool_desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {upgradeSummaryCopy.open_tool}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>

                <Link
                  href={gpuUpgradeToolUrl}
                  className="group rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 transition hover:border-emerald-500 hover:shadow-sm dark:border-emerald-900 dark:bg-emerald-950/25"
                >
                  <Monitor className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  <h3 className="mt-3 font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                    {upgradeSummaryCopy.gpu_tool}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{upgradeSummaryCopy.gpu_tool_desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    {upgradeSummaryCopy.open_tool}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>

                <Link
                  href={priorityToolUrl}
                  className="group rounded-xl border border-amber-200 bg-amber-50/70 p-4 transition hover:border-amber-500 hover:shadow-sm dark:border-amber-900 dark:bg-amber-950/25"
                >
                  <Gauge className="h-5 w-5 text-amber-600" aria-hidden="true" />
                  <h3 className="mt-3 font-semibold group-hover:text-amber-700 dark:group-hover:text-amber-300">
                    {upgradeSummaryCopy.priority_tool}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{upgradeSummaryCopy.priority_tool_desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 dark:text-amber-300">
                    {upgradeSummaryCopy.open_tool}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>

              <p className="text-xs leading-5 text-muted-foreground">{upgradeSummaryCopy.note}</p>
            </CardContent>
            </div>
          </Card>
          </section>
          <section id="presets" className="scroll-mt-28" aria-label={resultNavigationCopy.sections.presets}>
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" aria-hidden="true" />
                    {t.preset_comparison.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.preset_comparison.description}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="fps-collapse-toggle fps-print-hide shrink-0"
                  aria-expanded={expandedResultSections.presets}
                  aria-controls="presets-content"
                  onClick={() => toggleResultSection('presets')}
                >
                  <ChevronDown
                    className={`mr-1.5 h-4 w-4 transition-transform ${expandedResultSections.presets ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  {expandedResultSections.presets ? resultNavigationCopy.collapse : resultNavigationCopy.expand}
                </Button>
              </div>
            </CardHeader>
            <div
              id="presets-content"
              className={`fps-collapsible-content ${expandedResultSections.presets ? 'block' : 'hidden'}`}
            >
            <CardContent className="space-y-4">
              {!calculationBreakdown.upscalingSupported && selectedUpscaling !== 'off' && (
                <div className="flex items-start gap-3 rounded-lg border border-amber-300/70 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <p>{t.preset_comparison.upscaling_uncertain}</p>
                </div>
              )}
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">{t.preset_comparison.preset}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">{t.preset_comparison.estimate}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">{t.preset_comparison.one_percent_low}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">{t.preset_comparison.difference}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">{t.preset_comparison.vram}</th>
                      <th scope="col" className="px-4 py-3 font-semibold">{t.preset_comparison.refresh}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">{t.preset_comparison.action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {presetComparisons.map((preset) => {
                      const differencePrefix = preset.difference > 0 ? '+' : '';
                      return (
                        <tr
                          key={preset.id}
                          className={preset.isSelected
                            ? 'bg-purple-50/80 dark:bg-purple-950/25'
                            : 'bg-white/60 dark:bg-slate-900/30'}
                        >
                          <th scope="row" className="px-4 py-3 font-medium text-foreground">
                            <div className="flex items-center gap-2">
                              <span>{preset.label}</span>
                              {preset.isSelected && (
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                                  {t.preset_comparison.current}
                                </span>
                              )}
                            </div>
                            {preset.supportUncertain && (
                              <span className="mt-1 flex items-center gap-1 text-xs font-normal text-amber-700 dark:text-amber-300">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                {t.preset_comparison.rt_uncertain}
                              </span>
                            )}
                          </th>
                          <td className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                            {preset.estimate.low}–{preset.estimate.high} FPS
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-right">
                            {preset.estimate.onePercentLow} FPS
                          </td>
                          <td className={`whitespace-nowrap px-4 py-3 text-right font-medium ${
                            preset.difference > 0
                              ? 'text-emerald-700 dark:text-emerald-300'
                              : preset.difference < 0
                                ? 'text-rose-700 dark:text-rose-300'
                                : 'text-muted-foreground'
                          }`}>
                            {preset.difference === 0
                              ? t.preset_comparison.same
                              : `${differencePrefix}${preset.difference} FPS`}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-right">
                            {preset.estimate.requiredVramGB} GB
                          </td>
                          <td className="px-4 py-3">
                            {preset.meetsRefreshTarget
                              ? t.preset_comparison.meets_target.replace('{target}', refreshRateOption.label)
                              : t.preset_comparison.below_target
                                  .replace('{diff}', String(preset.refreshShortfall))
                                  .replace('{target}', refreshRateOption.label)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              type="button"
                              size="sm"
                              variant={preset.isSelected ? 'secondary' : 'outline'}
                              disabled={preset.isSelected}
                              onClick={() => applyGraphicsPreset(preset.id)}
                            >
                              {preset.isSelected ? t.preset_comparison.selected : t.preset_comparison.use_preset}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">{t.preset_comparison.model_note}</p>
            </CardContent>
            </div>
          </Card>
          </section>

          <section id="calculation-breakdown" className="scroll-mt-28" aria-label={resultNavigationCopy.sections.breakdown}>
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                    {breakdownCopy.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{breakdownCopy.description}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="fps-collapse-toggle fps-print-hide shrink-0"
                  aria-expanded={expandedResultSections['calculation-breakdown']}
                  aria-controls="calculation-breakdown-content"
                  onClick={() => toggleResultSection('calculation-breakdown')}
                >
                  <ChevronDown
                    className={`mr-1.5 h-4 w-4 transition-transform ${expandedResultSections['calculation-breakdown'] ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  {expandedResultSections['calculation-breakdown'] ? resultNavigationCopy.collapse : resultNavigationCopy.expand}
                </Button>
              </div>
            </CardHeader>
            <div
              id="calculation-breakdown-content"
              className={`fps-collapsible-content ${expandedResultSections['calculation-breakdown'] ? 'block' : 'hidden'}`}
            >
            <CardContent className="space-y-4">
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">{breakdownCopy.step}</th>
                      <th scope="col" className="px-4 py-3 font-semibold">{breakdownCopy.input}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">{breakdownCopy.multiplier}</th>
                      <th scope="col" className="px-4 py-3 text-right font-semibold">{breakdownCopy.running_fps}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {calculationBreakdown.stages.map((stage) => (
                      <tr key={stage.key} className="bg-white/60 dark:bg-slate-900/30">
                        <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-foreground">
                          {breakdownCopy.stages[stage.key]}
                        </th>
                        <td className="px-4 py-3 text-muted-foreground">{getBreakdownInput(stage.key)}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs">
                          {formatBreakdownFactor(stage.factor)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                          {numberFormatter.format(stage.fpsAfter)} FPS
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="rounded-lg border border-dashed border-indigo-300 bg-indigo-50/60 p-4 text-sm leading-6 text-indigo-950 dark:border-indigo-900 dark:bg-indigo-950/20 dark:text-indigo-100">
                {breakdownCopy.final_note.replace('{fps}', String(fpsEstimate.average))}
              </p>
            </CardContent>
            </div>
          </Card>
          </section>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                {t.share_result.formula_title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6">
              <p className="rounded-md border bg-muted/40 p-3 font-medium">{t.share_result.formula}</p>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>{t.share_result.model.replace('{version}', FPS_MODEL_VERSION)}</li>
                <li>{t.share_result.current_model_note}</li>
              </ul>
              {fpsEstimate.warnings.length > 0 && (
                <div className="rounded-lg border border-amber-300/70 bg-amber-50 p-4 dark:bg-amber-950/20">
                  <h3 className="font-semibold text-amber-950 dark:text-amber-100">
                    {t.share_result.warnings}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900/90 dark:text-amber-100/80">
                    {fpsEstimate.warnings.map((warning) => (
                      <li key={warning}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href={getLocalizedPath(lang as Locale, 'methodology')}
                className="fps-print-hide inline-flex font-medium text-blue-700 underline-offset-4 hover:underline dark:text-blue-300"
              >
                {t.share_result.methodology}
              </Link>
            </CardContent>
          </Card>

          <section id="system" className="scroll-mt-28 space-y-4" aria-label={resultNavigationCopy.sections.system}>
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{resultNavigationCopy.system_title}</CardTitle>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{resultNavigationCopy.system_description}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="fps-collapse-toggle fps-print-hide shrink-0"
                  aria-expanded={expandedResultSections.system}
                  aria-controls="system-content"
                  onClick={() => toggleResultSection('system')}
                >
                  <ChevronDown
                    className={`mr-1.5 h-4 w-4 transition-transform ${expandedResultSections.system ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  {expandedResultSections.system ? resultNavigationCopy.collapse : resultNavigationCopy.expand}
                </Button>
              </div>
            </CardHeader>
          </Card>
          <div
            id="system-content"
            className={`fps-collapsible-content space-y-6 ${expandedResultSections.system ? 'block' : 'hidden'}`}
          >
          {/* Advanced Settings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>{t.results.advanced_impact.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {advancedSummary.map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 min-h-[128px] flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        {item.label}
                      </h3>
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                        {item.value}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 leading-snug">{item.helper}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 p-4 space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t.results.advanced_impact.baseline}{' '}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {baselineRounded} FPS
                  </span>
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t.results.advanced_impact.impact}{' '}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {fpsDeltaPrefix}
                    {fpsDeltaRounded} FPS ({fpsPercentDeltaPrefix}
                    {fpsPercentDeltaDisplay}%)
                  </span>
                </p>
                {refreshComparison && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">{refreshComparison}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* System Components */}
          <Card>
            <CardHeader>
              <CardTitle>{results.system_config.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <HardwareBrandLogo brand={cpu.brand} component="cpu" />
                    <div>
                      <h3 className="font-semibold">{cpu.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cpu.cores}C/{cpu.threads}T, {cpu.boostClock}GHz
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <HardwareBrandLogo brand={gpu.brand} component="gpu" />
                    <div>
                      <h3 className="font-semibold">{gpu.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {gpu.vram}GB VRAM, {gpu.boostClock}MHz
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="font-semibold mb-2">{results.system_config.game_reqs}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>{results.system_config.cpu_demand}</span>
                        <span className="font-medium">{game.cpuDemand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{results.system_config.gpu_demand}</span>
                        <span className="font-medium">{game.gpuDemand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{results.system_config.ram_req}</span>
                        <span className="font-medium">{game.ramRequirement}GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{results.system_config.storage}</span>
                        <span className="font-medium">{game.storageRequirement}GB</span>
                      </div>
                    </div>
                  </div>

                  {game.optimizations.length > 0 && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-semibold mb-2 text-green-900 dark:text-green-100">
                        {results.system_config.optimizations}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {game.optimizations.map((opt, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-xs font-medium"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
          </section>
        </div>
      );
    }
  }

  const cpuName = selectedCPU ? getCPUById(selectedCPU)?.name ?? '' : '';
  const gpuName = selectedGPU ? getGPUById(selectedGPU)?.name ?? '' : '';
  const gameName = selectedGame ? getGameById(selectedGame)?.name ?? '' : '';
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
              {selectedGame && (
                <div className="flex items-center justify-between text-xs text-muted-foreground bg-slate-100/80 dark:bg-slate-800/60 px-3 py-2 rounded-md">
                  <span className="truncate">
                    {t.game.selected}{' '}
                    <span className="font-medium text-foreground">{gameName}</span>
                  </span>
                  <button
                    type="button"
                    className="text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
                    onClick={() => handleClearSelection('game')}
                  >
                    {t.game.clear}
                  </button>
                </div>
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
}
