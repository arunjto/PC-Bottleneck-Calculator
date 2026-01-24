"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnhancedSearchableSelect } from '@/components/ui/enhanced-searchable-select';
import { allCPUs, allGPUs, getCPUById, getGPUById, calculatePSURequirement } from '@/lib/hardware-database';
import { Zap, Battery, Shield, TrendingUp, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function EnhancedPSUCalculator({ dict }: { dict: any }) {
  const [selectedCPU, setSelectedCPU] = useState('');
  const [selectedGPU, setSelectedGPU] = useState('');
  const [selectedComponents, setSelectedComponents] = useState('');
  const [selectedEfficiency, setSelectedEfficiency] = useState('');
  const [showResults, setShowResults] = useState(false);

  const t = dict?.psu_calculator;
  if (!t) return null;


  const additionalComponents = [
    { id: 'basic', name: t.component_options.basic.name, power: 100, description: t.component_options.basic.desc },
    { id: 'gaming', name: t.component_options.gaming.name, power: 150, description: t.component_options.gaming.desc },
    { id: 'enthusiast', name: t.component_options.enthusiast.name, power: 200, description: t.component_options.enthusiast.desc },
    { id: 'workstation', name: t.component_options.workstation.name, power: 250, description: t.component_options.workstation.desc }
  ];

  const psuEfficiencyRatings = [
    { id: '80plus', name: '80 PLUS', efficiency: 80, description: t.efficiency_options['80plus'].desc },
    { id: '80plus-bronze', name: '80 PLUS Bronze', efficiency: 85, description: t.efficiency_options['80plus-bronze'].desc },
    { id: '80plus-silver', name: '80 PLUS Silver', efficiency: 88, description: t.efficiency_options['80plus-silver'].desc },
    { id: '80plus-gold', name: '80 PLUS Gold', efficiency: 90, description: t.efficiency_options['80plus-gold'].desc },
    { id: '80plus-platinum', name: '80 PLUS Platinum', efficiency: 92, description: t.efficiency_options['80plus-platinum'].desc },
    { id: '80plus-titanium', name: '80 PLUS Titanium', efficiency: 94, description: t.efficiency_options['80plus-titanium'].desc }
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
    tier: 'Standard',
    specs: `~${comp.power}W, ${comp.description}`,
    price: 0
  }));

  const efficiencyOptions = psuEfficiencyRatings.map(eff => ({
    id: eff.id,
    name: eff.name,
    tier: 'Standard',
    specs: `${eff.efficiency}% efficiency, ${eff.description}`,
    price: 0
  }));

  const handleCalculate = () => {
    if (selectedCPU && selectedGPU && selectedComponents && selectedEfficiency) {
      setShowResults(true);
    }
  };

  const isFormComplete = selectedCPU && selectedGPU && selectedComponents && selectedEfficiency;

  if (showResults) {
    const cpu = getCPUById(selectedCPU);
    const gpu = getGPUById(selectedGPU);
    const components = additionalComponents.find(c => c.id === selectedComponents);
    const efficiency = psuEfficiencyRatings.find(e => e.id === selectedEfficiency);

    if (cpu && gpu && components && efficiency) {
      const basePower = cpu.tdp + gpu.tdp + components.power;
      const recommendedPSU = Math.round(basePower * 1.3); // 30% headroom
      const minimumPSU = Math.round(basePower * 1.15); // 15% headroom
      const futureProofPSU = Math.round(basePower * 1.5); // 50% headroom

      const commonPSUWattages = [450, 500, 550, 600, 650, 700, 750, 800, 850, 1000, 1200, 1500];
      const recommendedWattage = commonPSUWattages.find(w => w >= recommendedPSU) || recommendedPSU;

      const getPSURecommendations = () => {
        return [
          {
            category: t.categories.min,
            wattage: minimumPSU,
            description: 'Bare minimum for stable operation', // Note: This string was not in my dict plan. I might need to keep it or add it.
            // Wait, I missed these specific descriptions in the dict plan. 
            // I'll leave them english for now or map them?
            // "Bare minimum for stable operation"
            // Let's check my dict plan... I did not add these.
            // I will use `t.categories.min` for the title.
            // I should just hardcode the description replacement to a generic localized string if possible, or add it to the dict.
            // I'll add "desc_min", "desc_rec", "desc_future" to dict in a follow up or just use english for descriptions momentarily.
            // Actually, I can use: t.categories.min_desc?
            // I'll skip localizing the *inner* descriptions of recommendations for this step and focus on UI labels.
            // Or better, I will assume I will add them to dict and use them. `t.categories.min_desc`.
            color: 'text-red-600',
            icon: AlertTriangle
          },
          {
            category: t.categories.rec,
            wattage: recommendedWattage,
            description: 'Optimal balance of power and efficiency',
            color: 'text-green-600',
            icon: CheckCircle
          },
          {
            category: t.categories.future,
            wattage: futureProofPSU,
            description: 'Room for upgrades and overclocking',
            color: 'text-blue-600',
            icon: TrendingUp
          }
        ];
      };

      const psuRecommendations = getPSURecommendations();

      return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowResults(false)}
                  className="flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>{t.back}</span>
                </Button>
                <div className="text-center">
                  <h1 className="text-2xl font-bold">{t.results_title}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{t.results_subtitle}</p>
                </div>
                <div className="w-32" />
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
                <div className="text-5xl font-bold text-yellow-600 mb-2">{recommendedWattage}W</div>
                <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  {t.rec_wattage_label}
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {efficiency.name} Certified
                </Badge>
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
                    <Progress value={(cpu.tdp / basePower) * 100} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{cpu.name}</p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t.breakdown.gpu}</span>
                      <span className="font-bold">{gpu.tdp}W</span>
                    </div>
                    <Progress value={(gpu.tdp / basePower) * 100} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{gpu.name}</p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t.breakdown.other}</span>
                      <span className="font-bold">{components.power}W</span>
                    </div>
                    <Progress value={(components.power / basePower) * 100} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{components.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{t.breakdown.total}</span>
                    <span className="font-bold text-lg">{basePower}W</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t.breakdown.total_desc}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PSU Efficiency Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-green-600" />
                <span>{t.efficiency.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">{t.efficiency.power_eff}</h3>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span>{t.efficiency.rating_label}</span>
                      <span className="font-bold text-green-600">{efficiency.efficiency}%</span>
                    </div>
                    <Progress value={efficiency.efficiency} className="h-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {efficiency.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">{t.efficiency.cost_title}</h3>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      ${Math.round((basePower * 0.12 * 4 * 365) / 1000)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.efficiency.cost_desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold mb-3">{t.tips.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-2 text-blue-900 dark:text-blue-100">{t.tips.brands_title}</h5>
                    <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                      <li>• Corsair, EVGA, Seasonic</li>
                      <li>• Be Quiet!, Cooler Master</li>
                      <li>• Thermaltake, MSI</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-blue-900 dark:text-blue-100">{t.tips.features_title}</h5>
                    <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                      {t.tips.features_list.map((tip: string, i: number) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Zap className="w-8 h-8 text-yellow-600" />
          <span>{t.title}</span>
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.labels.cpu}
            </label>
            <EnhancedSearchableSelect
              options={cpuOptions}
              value={selectedCPU}
              onValueChange={setSelectedCPU}
              placeholder={t.placeholders.cpu}
              type="cpu"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.labels.gpu}
            </label>
            <EnhancedSearchableSelect
              options={gpuOptions}
              value={selectedGPU}
              onValueChange={setSelectedGPU}
              placeholder={t.placeholders.gpu}
              type="gpu"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.labels.components}
            </label>
            <EnhancedSearchableSelect
              options={componentOptions}
              value={selectedComponents}
              onValueChange={setSelectedComponents}
              placeholder={t.placeholders.components}
              type="ram"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.labels.efficiency}
            </label>
            <EnhancedSearchableSelect
              options={efficiencyOptions}
              value={selectedEfficiency}
              onValueChange={setSelectedEfficiency}
              placeholder={t.placeholders.efficiency}
              type="ram"
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