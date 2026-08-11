"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { allCPUs, allGPUs, getCPUById, getGPUById } from '@/lib/hardware-database';
import {
  AlertTriangle,
  BarChart3,
  Battery,
  Cable,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  Gauge,
  Shield,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { estimatePSUPlanning } from '@/lib/psu-model';

export function EnhancedPSUCalculator({
  dict,
  initialSelection,
}: {
  dict: any;
  initialSelection?: { cpu?: string; gpu?: string };
}) {
  const initialCPU = initialSelection?.cpu && getCPUById(initialSelection.cpu)
    ? initialSelection.cpu
    : '';
  const initialGPU = initialSelection?.gpu && getGPUById(initialSelection.gpu)
    ? initialSelection.gpu
    : '';
  const [selectedCPU, setSelectedCPU] = useState(initialCPU);
  const [selectedGPU, setSelectedGPU] = useState(initialGPU);
  const [selectedComponents, setSelectedComponents] = useState(initialCPU && initialGPU ? 'gaming' : '');
  const [selectedEfficiency, setSelectedEfficiency] = useState('');
  const [showResults, setShowResults] = useState(false);
  const resultsRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showResults) return;

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const resultsRegion = resultsRegionRef.current;
        if (!resultsRegion) return;

        const top = resultsRegion.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        });
        resultsRegion.focus({ preventScroll: true });
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [showResults]);

  const t = dict?.psu_calculator;
  if (!t) return null;


  const additionalComponents = [
    { id: 'basic', name: t.component_options.basic.name, power: 100, description: t.component_options.basic.desc },
    { id: 'gaming', name: t.component_options.gaming.name, power: 150, description: t.component_options.gaming.desc },
    { id: 'enthusiast', name: t.component_options.enthusiast.name, power: 200, description: t.component_options.enthusiast.desc },
    { id: 'workstation', name: t.component_options.workstation.name, power: 250, description: t.component_options.workstation.desc }
  ];

  const psuEfficiencyRatings = [
    { id: '80plus', name: '80 PLUS', description: t.efficiency_options['80plus'].desc },
    { id: '80plus-bronze', name: '80 PLUS Bronze', description: t.efficiency_options['80plus-bronze'].desc },
    { id: '80plus-silver', name: '80 PLUS Silver', description: t.efficiency_options['80plus-silver'].desc },
    { id: '80plus-gold', name: '80 PLUS Gold', description: t.efficiency_options['80plus-gold'].desc },
    { id: '80plus-platinum', name: '80 PLUS Platinum', description: t.efficiency_options['80plus-platinum'].desc },
    { id: '80plus-titanium', name: '80 PLUS Titanium', description: t.efficiency_options['80plus-titanium'].desc }
  ];

  // Transform data for select components
  const cpuOptions = allCPUs.map(cpu => ({
    id: cpu.id,
    name: cpu.name,
    tier: cpu.tier,
    benchmarkScore: cpu.benchmarkScore,
    specs: `${cpu.cores}C/${cpu.threads}T, ${cpu.tdp}W TDP`,
    price: cpu.currentPrice
  }));

  const gpuOptions = allGPUs.map(gpu => ({
    id: gpu.id,
    name: gpu.name,
    tier: gpu.tier,
    benchmarkScore: gpu.benchmarkScore,
    specs: `${gpu.vram}GB VRAM, ${gpu.tdp}W TDP`,
    price: gpu.currentPrice
  }));

  const componentOptions = additionalComponents.map(comp => ({
    id: comp.id,
    name: comp.name,
    tier: '',
    specs: `~${comp.power}W, ${comp.description}`,
    price: 0
  }));

  const efficiencyOptions = psuEfficiencyRatings.map(eff => ({
    id: eff.id,
    name: eff.name,
    tier: '',
    specs: eff.description,
    price: 0
  }));

  const handleCalculate = () => {
    if (selectedCPU && selectedGPU && selectedComponents) {
      setShowResults(true);
    }
  };

  const isFormComplete = Boolean(selectedCPU && selectedGPU && selectedComponents);

  if (showResults) {
    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const components = additionalComponents.find(c => c.id === selectedComponents);
    const efficiency = psuEfficiencyRatings.find(e => e.id === selectedEfficiency);

    if (cpu && gpu && components) {
      const {
        estimatedLoad,
        lowerHeadroomEstimate,
        planningEstimate,
        planningWattage,
        upgradeHeadroomEstimate,
        upgradePlanningWattage,
      } = estimatePSUPlanning(cpu, gpu, components.power);
      const availableHeadroom = planningWattage - estimatedLoad;

      const getPSURecommendations = () => {
        return [
          {
            kind: 'minimum',
            category: t.categories.min,
            wattage: lowerHeadroomEstimate,
            description: t.categories.min_desc,
            color: 'text-red-600',
            icon: AlertTriangle
          },
          {
            kind: 'recommended',
            category: t.categories.rec,
            wattage: planningWattage,
            description: t.categories.rec_desc,
            threshold: planningEstimate,
            color: 'text-green-600',
            icon: CheckCircle
          },
          {
            kind: 'upgrade',
            category: t.categories.future,
            wattage: upgradePlanningWattage,
            description: t.categories.future_desc,
            threshold: upgradeHeadroomEstimate,
            color: 'text-blue-600',
            icon: TrendingUp
          }
        ];
      };

      const psuRecommendations = getPSURecommendations();

      return (
        <div
          ref={resultsRegionRef}
          role="region"
          aria-live="polite"
          aria-label={t.results_title}
          tabIndex={-1}
          className="scroll-mt-16 w-full max-w-4xl mx-auto space-y-6 focus:outline-none"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowResults(false)}
                  className="flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>{t.back}</span>
                </Button>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{t.results_title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{t.results_subtitle}</p>
                </div>
                <div className="hidden w-32 sm:block" aria-hidden="true" />
              </div>
            </CardHeader>
          </Card>

          {/* Main PSU Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Battery className="w-6 h-6 text-yellow-600" />
                <span>{t.power_req_title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-yellow-600 mb-2">{planningWattage}W</div>
                <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  {t.rec_wattage_label}
                </div>
                {efficiency && (
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    {t.selected_efficiency}: {efficiency.name}
                  </Badge>
                )}
              </div>

              <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
                <p className="font-semibold">{t.estimate_notice_title}</p>
                <p className="mt-1">{t.estimate_notice}</p>
                <p className="mt-2 font-medium">{t.vendor_check}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {psuRecommendations.map((rec) => {
                  const Icon = rec.icon;
                  return (
                    <div
                      key={rec.category}
                      className={`p-4 rounded-lg border-2 ${rec.category === t.categories.rec
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      <div className="text-center">
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${rec.color}`} />
                        <h3 className="font-semibold">{rec.category}</h3>
                        <div className={`text-2xl font-bold ${rec.color} my-2`}>{rec.wattage}W</div>
                        {rec.threshold && (
                          <p className="mb-1 text-xs font-medium text-muted-foreground">
                            {t.categories.calculated_threshold}: {rec.threshold}W
                          </p>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actionable but deliberately non-certified compatibility guidance. */}
          <Card className="border-emerald-200 dark:border-emerald-900">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
                <span>{t.readiness.title}</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{t.readiness.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">{t.readiness.capacity}</p>
                  <p className="mt-1 text-2xl font-bold">{planningWattage}W</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">{t.readiness.load}</p>
                  <p className="mt-1 text-2xl font-bold">{estimatedLoad}W</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">{t.readiness.headroom}</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-600">{availableHeadroom}W</p>
                </div>
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                  <p className="text-sm text-amber-800 dark:text-amber-200">{t.readiness.status_label}</p>
                  <p className="mt-1 font-semibold text-amber-950 dark:text-amber-100">{t.readiness.status}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex gap-3">
                    <Gauge className="mt-0.5 h-5 w-5 flex-none text-blue-600" />
                    <div>
                      <h3 className="font-semibold">{t.readiness.standard_title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t.readiness.standard_desc}</p>
                      <a
                        href="https://edc.intel.com/content/www/de/de/design/ipla/software-development-platforms/client/platforms/alder-lake-desktop/atx-version-3-0-multi-rail-desktop-platform-power-supply-design-guide/2.1a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        {t.readiness.standard_source}<ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex gap-3">
                    <Cable className="mt-0.5 h-5 w-5 flex-none text-violet-600" />
                    <div>
                      <h3 className="font-semibold">{t.readiness.connector_title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t.readiness.connector_desc}</p>
                      <a
                        href="https://pcisig.com/PCI%20Express/ECN/Base/12V-2x6ConnectorUpdatestoPCIeBase_6.0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        {t.readiness.connector_source}<ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Power Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <span>{t.breakdown.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t.breakdown.cpu}</span>
                      <span className="font-bold">{cpu.tdp}W</span>
                    </div>
                    <Progress value={(cpu.tdp / estimatedLoad) * 100} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{cpu.name}</p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t.breakdown.gpu}</span>
                      <span className="font-bold">{gpu.tdp}W</span>
                    </div>
                    <Progress value={(gpu.tdp / estimatedLoad) * 100} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{gpu.name}</p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t.breakdown.other}</span>
                      <span className="font-bold">{components.power}W</span>
                    </div>
                    <Progress value={(components.power / estimatedLoad) * 100} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{components.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{t.breakdown.total}</span>
                    <span className="font-bold text-lg">{estimatedLoad}W</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t.breakdown.total_desc}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-6 w-6 flex-none text-green-600" />
                  <div>
                    <h2 className="text-xl font-semibold">{t.technical.result_title}</h2>
                    <p className="mt-1 text-sm font-normal text-muted-foreground">{t.technical.result_subtitle}</p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 flex-none text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <CardContent className="border-t pt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold">{t.efficiency.power_eff}</h3>
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                      {efficiency ? (
                        <>
                          <p className="font-semibold text-green-800 dark:text-green-200">{efficiency.name}</p>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{efficiency.description}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-700 dark:text-gray-300">{t.efficiency.not_selected}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">{t.efficiency.cost_title}</h3>
                    <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{t.efficiency.cost_desc}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <h3 className="font-semibold text-blue-950 dark:text-blue-100">{t.tips.title}</h3>
                  <p className="mt-1 text-sm text-blue-900/80 dark:text-blue-100/80">{t.tips.intro}</p>
                  <ul className="mt-3 grid gap-2 text-sm text-blue-900 dark:text-blue-100 md:grid-cols-2">
                    {t.tips.features_list.map((tip: string) => (
                      <li key={tip} className="flex gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-none" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </details>
          </Card>
        </div>
      );
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <h2 className="flex items-center justify-center space-x-2 text-2xl font-semibold leading-none tracking-tight">
          <Zap className="w-8 h-8 text-yellow-600" />
          <span>{t.title}</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="psu-cpu-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.labels.cpu}
            </label>
            <EnhancedSearchableSelect
              id="psu-cpu-select"
              options={cpuOptions}
              value={selectedCPU}
              onValueChange={setSelectedCPU}
              placeholder={t.placeholders.cpu}
              type="cpu"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="psu-gpu-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.labels.gpu}
            </label>
            <EnhancedSearchableSelect
              id="psu-gpu-select"
              options={gpuOptions}
              value={selectedGPU}
              onValueChange={setSelectedGPU}
              placeholder={t.placeholders.gpu}
              type="gpu"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="psu-components-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.labels.components}
            </label>
            <EnhancedSearchableSelect
              id="psu-components-select"
              options={componentOptions}
              value={selectedComponents}
              onValueChange={setSelectedComponents}
              placeholder={t.placeholders.components}
              type="components"
              showTier={false}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="psu-efficiency-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.labels.efficiency}
            </label>
            <EnhancedSearchableSelect
              id="psu-efficiency-select"
              options={efficiencyOptions}
              value={selectedEfficiency}
              onValueChange={setSelectedEfficiency}
              placeholder={t.placeholders.efficiency}
              type="efficiency"
              showTier={false}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleCalculate}
            disabled={!isFormComplete}
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isFormComplete ? (
              <>
                <Battery className="w-5 h-5 mr-2" />
                {t.button}
              </>
            ) : (
              t.incomplete
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EnhancedPSUCalculator;
