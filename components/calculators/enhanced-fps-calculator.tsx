"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { allCPUs, allGPUs, allGames, getCPUById, getGPUById, getGameById } from '@/lib/hardware-database';
import { estimateFPSRange } from '@/lib/fps-model';
import type { FPSModelOptions } from '@/lib/fps-model';
import { Gamepad2, Monitor, BarChart3, TrendingUp, Cpu, Zap, HardDrive, Sparkles, Gauge, AlertTriangle } from 'lucide-react';
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

export function EnhancedFPSCalculator({
  onBuildChange,
  dict
}: {
  onBuildChange?: (build: {
    cpu: string;
    gpu: string;
    game: string;
    resolution: string;
    fps: number;
  } | null) => void;
  dict: any;
}) {
  const t = dict?.fps_calculator;
  const results = dict?.results || {};

  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedResolution, setSelectedResolution] = useState("");
  const [selectedRamSize, setSelectedRamSize] = useState<string>(ramSizeOptions[1]?.id ?? "16gb");
  const [selectedRamSpeed, setSelectedRamSpeed] = useState<string>(ramSpeedOptions[1]?.id ?? "3200");
  const [selectedStorageType, setSelectedStorageType] = useState<string>(storageTypeOptions[2]?.id ?? "nvme-ssd");
  const [selectedGraphicsQuality, setSelectedGraphicsQuality] = useState<string>(graphicsQualityOptions[2]?.id ?? "high");
  const [selectedUpscaling, setSelectedUpscaling] = useState<string>(upscalingOptions[0]?.id ?? "off");
  const [selectedRefreshRate, setSelectedRefreshRate] = useState<string>(refreshRateOptions[2]?.id ?? "144hz");
  const [selectedAntiAliasing, setSelectedAntiAliasing] = useState<string>(antiAliasingOptions[1]?.id ?? "fxaa");
  const [showResults, setShowResults] = useState(false);
  const resultsRegionRef = useRef<HTMLDivElement>(null);

  if (!t) return null;

  // Localization Helpers
  const getLocOption = (options: ModifierOption[], category: any, key: string) => {
    return options.map(opt => ({
      ...opt,
      label: category?.[key]?.[opt.id]?.label ?? opt.label,
      description: category?.[key]?.[opt.id]?.desc ?? opt.description
    }));
  };

  const getLocBasicOption = (options: BasicOption[], category: any, key: string) => {
    return options.map(opt => ({
      ...opt,
      label: category?.[key]?.[opt.id]?.label ?? opt.label,
      description: category?.[key]?.[opt.id]?.desc ?? opt.description
    }));
  };

  const locRamSizeOptions = getLocOption(ramSizeOptions, t.memory, 'ram_size_options');
  const locRamSpeedOptions = getLocOption(ramSpeedOptions, t.memory, 'ram_speed_options');
  const locStorageOptions = getLocOption(storageTypeOptions, t.memory, 'storage_options');
  const locGraphicsOptions = getLocOption(graphicsQualityOptions, t.quality, 'graphics_options');
  const locUpscalingOptions = getLocOption(upscalingOptions, t.quality, 'upscaling_options');
  const locAaOptions = getLocOption(antiAliasingOptions, t.display, 'aa_options');
  const locRefreshOptions = getLocBasicOption(refreshRateOptions, t.display, 'refresh_options');
  const locResolutionOptions = resolutionOptions.map(opt => ({
    ...opt,
    name: t.game.resolution_options[opt.id]?.name ?? opt.name,
    specs: t.game.resolution_options[opt.id]?.specs ?? opt.specs
  }));

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
      const fpsEstimate = estimateFPSRange(cpu, gpu, game, buildModelOptions(selectedResolution));
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

      return (
        <div
          ref={resultsRegionRef}
          role="region"
          aria-live="polite"
          aria-label={t.results.title}
          tabIndex={-1}
          className="scroll-mt-16 w-full max-w-4xl mx-auto space-y-6 focus:outline-none [overflow-anchor:none]"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowResults(false)}
                  className="flex items-center space-x-2"
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
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-semibold">
            <Gamepad2 className="w-8 h-8 text-green-600" />
            <span>{t.title}</span>
          </CardTitle>
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
