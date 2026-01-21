"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { allCPUs, allGPUs, allGames, getCPUById, getGPUById, getGameById, estimateFPS } from '@/lib/hardware-database';
import { Gamepad2, Monitor, BarChart3, TrendingUp, Cpu, Zap, HardDrive, Sparkles, Gauge } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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

const cpuOverclockOptions: ModifierOption[] = [
  { id: "stock", label: "Stock Clocks", description: "Manufacturer default boost.", multiplier: 1 },
  { id: "mild", label: "Mild (+5%)", description: "Safe voltage bump for extra frames.", multiplier: 1.05 },
  { id: "moderate", label: "Moderate (+8%)", description: "Dialed-in tuning with adequate cooling.", multiplier: 1.08 },
  { id: "aggressive", label: "Aggressive (+12%)", description: "Heavy overclocking with premium cooling.", multiplier: 1.12 },
  { id: "extreme", label: "Extreme (+15%)", description: "Benchmark-level tuning, stability varies.", multiplier: 1.15 },
];

const gpuOverclockOptions: ModifierOption[] = [
  { id: "stock", label: "Stock Clocks", description: "Reference performance.", multiplier: 1 },
  { id: "mild", label: "Mild (+5%)", description: "Auto OC or gentle curve tuning.", multiplier: 1.05 },
  { id: "moderate", label: "Moderate (+8%)", description: "Manual tuning with temperature headroom.", multiplier: 1.08 },
  { id: "aggressive", label: "Aggressive (+12%)", description: "Significant voltage and fan curve tweaks.", multiplier: 1.12 },
  { id: "extreme", label: "Extreme (+15%)", description: "Maxed-out OC for benchmarking sessions.", multiplier: 1.15 },
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
  const [selectedCpuOverclock, setSelectedCpuOverclock] = useState<string>(cpuOverclockOptions[0]?.id ?? "stock");
  const [selectedGpuOverclock, setSelectedGpuOverclock] = useState<string>(gpuOverclockOptions[0]?.id ?? "stock");
  const [selectedGraphicsQuality, setSelectedGraphicsQuality] = useState<string>(graphicsQualityOptions[2]?.id ?? "high");
  const [selectedUpscaling, setSelectedUpscaling] = useState<string>(upscalingOptions[0]?.id ?? "off");
  const [selectedRefreshRate, setSelectedRefreshRate] = useState<string>(refreshRateOptions[2]?.id ?? "144hz");
  const [selectedAntiAliasing, setSelectedAntiAliasing] = useState<string>(antiAliasingOptions[1]?.id ?? "fxaa");
  const [showResults, setShowResults] = useState(false);
  const [estimatedFPS, setEstimatedFPS] = useState<number | null>(null);
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
  const locCpuOcOptions = getLocOption(cpuOverclockOptions, t.cpu, 'overclock_options');
  const locGpuOcOptions = getLocOption(gpuOverclockOptions, t.gpu, 'overclock_options');
  const locGraphicsOptions = getLocOption(graphicsQualityOptions, t.quality, 'graphics_options');
  const locUpscalingOptions = getLocOption(upscalingOptions, t.quality, 'upscaling_options');
  const locAaOptions = getLocOption(antiAliasingOptions, t.display, 'aa_options');
  const locRefreshOptions = getLocBasicOption(refreshRateOptions, t.display, 'refresh_options');
  const locResolutionOptions = resolutionOptions.map(opt => ({
    ...opt,
    name: t.game.resolution_options[opt.id]?.name ?? opt.name,
    specs: t.game.resolution_options[opt.id]?.specs ?? opt.specs
  }));


  useEffect(() => {
    if (showResults) {
      requestAnimationFrame(() => {
        resultsRegionRef.current?.focus();
      });
    }
  }, [showResults]);

  const resetDisplayedResults = () => {
    setShowResults(false);
    setEstimatedFPS(null);
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

  const getModifierMultiplier = (options: ModifierOption[], id: string) =>
    options.find((option) => option.id === id)?.multiplier ?? 1;

  const applyAdvancedModifiers = (baseFps: number) => {
    if (!Number.isFinite(baseFps) || baseFps <= 0) {
      return 0;
    }

    const multipliers = [
      getModifierMultiplier(ramSizeOptions, selectedRamSize),
      getModifierMultiplier(ramSpeedOptions, selectedRamSpeed),
      getModifierMultiplier(storageTypeOptions, selectedStorageType),
      getModifierMultiplier(cpuOverclockOptions, selectedCpuOverclock),
      getModifierMultiplier(gpuOverclockOptions, selectedGpuOverclock),
      getModifierMultiplier(graphicsQualityOptions, selectedGraphicsQuality),
      getModifierMultiplier(upscalingOptions, selectedUpscaling),
      getModifierMultiplier(antiAliasingOptions, selectedAntiAliasing),
    ];

    const modified = multipliers.reduce((accumulator, multiplier) => accumulator * multiplier, baseFps);
    return Math.max(1, Math.round(modified));
  };

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

    const baseFps = estimateFPS(cpu, gpu, game, selectedResolution) ?? 0;
    const adjustedFps = applyAdvancedModifiers(baseFps);

    if (onBuildChange) {
      onBuildChange({
        cpu: cpu.id,
        gpu: gpu.id,
        game: game.id,
        resolution: selectedResolution,
        fps: adjustedFps,
      });
    }

    setEstimatedFPS(adjustedFps);
    setShowResults(true);
  };

  const isFormComplete = selectedCPU && selectedGPU && selectedGame && selectedResolution;

  if (showResults) {
    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const game = getGameById(selectedGame);

    if (cpu && gpu && game) {
      const baselineFps = estimateFPS(cpu, gpu, game, selectedResolution) ?? 0;
      const adjustedFps = applyAdvancedModifiers(baselineFps);

      // Calculate FPS for all resolutions -- using LOCALIZED logic for names
      const allResolutionFPS = locResolutionOptions.map((res) => {
        const resolutionBaseline = estimateFPS(cpu, gpu, game, res.id) ?? 0;
        return {
          resolution: res.name,
          fps: applyAdvancedModifiers(resolutionBaseline),
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
      const cpuOcOption = getModifierOption(locCpuOcOptions, selectedCpuOverclock);
      const gpuOcOption = getModifierOption(locGpuOcOptions, selectedGpuOverclock);
      const graphicsOption = getModifierOption(locGraphicsOptions, selectedGraphicsQuality);
      const upscalingOption = getModifierOption(locUpscalingOptions, selectedUpscaling);
      const aaOption = getModifierOption(locAaOptions, selectedAntiAliasing);
      const refreshRateOption = getBasicOption(locRefreshOptions, selectedRefreshRate);

      const advancedSummary = [
        { label: t.memory.ram_size_label, value: ramSizeOption.label, helper: ramSizeOption.description },
        { label: t.memory.ram_speed_label, value: ramSpeedOption.label, helper: ramSpeedOption.description },
        { label: t.memory.storage_label, value: storageOption.label, helper: storageOption.description },
        { label: t.cpu.overclock_label, value: cpuOcOption.label, helper: cpuOcOption.description },
        { label: t.gpu.overclock_label, value: gpuOcOption.label, helper: gpuOcOption.description },
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
          className="w-full max-w-4xl mx-auto space-y-6 focus:outline-none"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowResults(false)}
                  className="flex items-center space-x-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{t.actions.back}</span>
                </Button>
                <div className="text-center">
                  <h1 className="text-2xl font-bold">{t.results.title}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{game.name} {t.results.subtitle}</p>
                </div>
                <div className="w-32" />
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
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-blue-600 mb-2">{adjustedFps}</div>
                <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  {t.results.average_fps} {selectedResolution}
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
                      <div className="text-2xl font-bold text-blue-600 my-2">{result.fps} FPS</div>
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
                    <img src={cpu.imageUrl} alt={cpu.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <h3 className="font-semibold">{cpu.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cpu.cores}C/{cpu.threads}T, {cpu.boostClock}GHz
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <img src={gpu.imageUrl} alt={gpu.name} className="w-12 h-12 rounded object-cover" />
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
  const cpuOcOptionForm = getModifierOption(locCpuOcOptions, selectedCpuOverclock);
  const gpuOcOptionForm = getModifierOption(locGpuOcOptions, selectedGpuOverclock);
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
        <Card className="min-h-[400px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base font-semibold">
              <span className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                {t.cpu.title}
              </span>
              <span className="text-xs font-medium text-slate-500">2000+</span>
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
            <div className="space-y-1 mt-auto">
              <label htmlFor="cpu-overclock" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.cpu.overclock_label}
              </label>
              <select
                id="cpu-overclock"
                value={selectedCpuOverclock}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedCpuOverclock)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="cpu-overclock-help"
              >
                {locCpuOcOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="cpu-overclock-help" className="text-xs text-muted-foreground">
                {cpuOcOptionForm.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[400px] flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base font-semibold">
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                {t.gpu.title}
              </span>
              <span className="text-xs font-medium text-slate-500">2000+</span>
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
            <div className="space-y-1 mt-auto">
              <label htmlFor="gpu-overclock" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t.gpu.overclock_label}
              </label>
              <select
                id="gpu-overclock"
                value={selectedGpuOverclock}
                onChange={(event) => handleAdvancedSelectionChange(setSelectedGpuOverclock)(event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-describedby="gpu-overclock-help"
              >
                {locGpuOcOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p id="gpu-overclock-help" className="text-xs text-muted-foreground">
                {gpuOcOptionForm.description}
              </p>
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
