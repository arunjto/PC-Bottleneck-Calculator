import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  Monitor,
  Gamepad2,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Zap,
  HardDrive,
  Cpu,
  BarChart3,
  Settings,
  Star,
  TrendingUp
} from 'lucide-react';
import { CPU, GPU, calculateBottleneckPercentage, getBottleneckType, estimateFPS, calculatePSURequirement, allGames } from '@/lib/hardware-database';

interface ComprehensiveBottleneckResultsProps {
  cpu: CPU & { officialUrl?: string };
  gpu: GPU & { officialUrl?: string };
  ram: { id: string; name: string; tier: string; specs: string; price: number };
  resolution: string;
  onBack: () => void;
  dict: any;
}

function ComponentLink({
  href,
  children,
  className = "hover:underline text-blue-600"
}: {
  href?: string | null;
  children: React.ReactNode;
  className?: string;
}) {
  if (!href) return <>{children}</>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function ComprehensiveBottleneckResults({
  cpu,
  gpu,
  ram,
  resolution,
  onBack,
  dict
}: ComprehensiveBottleneckResultsProps) {
  // Defensive Dictionary Destructuring
  const results = dict?.results || {};
  const sections = results.sections || {};
  const labels = results.labels || {};
  const ratings = results.ratings || {};
  const sysConfig = results.system_config || { overall_desc: {} };
  const overallDesc = sysConfig.overall_desc || {};
  const recs = results.recommendations || {};
  const upg = recs.upgrade_priority || {
    cpu_title: '', cpu_desc: '', gpu_title: '', gpu_desc: '',
    balanced_title: '', balanced_desc: '', ram_title: '', ram_desc: ''
  };
  const bot = results.bottleneck_analysis || {
    balanced_title: '', bottleneck_title: '', balanced_desc: '',
    bottleneck_desc: '', cpu_scenario: '', gpu_scenario: ''
  };
  const mkt = results.market || {
    current_price: '', view_specs: '', official_page: '', launch_price: '',
    cpu_price: '', gpu_price: '', combined: '', view_specs_fallback: 'View Specs'
  };


  const bottleneckPercentage = calculateBottleneckPercentage(cpu, gpu);
  const bottleneckType = getBottleneckType(cpu, gpu);
  const psuRequirement = calculatePSURequirement(cpu, gpu);

  // Resolution impact calculations
  const resolutions = ['1080p', '1440p', '4K'];
  const resolutionImpact = resolutions.map(res => {
    const multiplier = { '1080p': 1.0, '1440p': 0.7, '4K': 0.4 }[res] || 1.0;
    const cpuScore = cpu.benchmarkScore * (res === '1080p' ? 0.9 : 1.0); // CPU matters less at higher res
    const gpuScore = gpu.benchmarkScore * multiplier;
    const limitingFactor = cpuScore < gpuScore ? 'CPU' : 'GPU';

    return {
      resolution: res,
      cpuScore: Math.round(cpuScore),
      gpuScore: Math.round(gpuScore),
      limitingFactor,
      estimatedFPS: Math.round(Math.min(cpuScore, gpuScore) * 1.2)
    };
  });

  // Gaming performance assessment
  const cpuGamingScore = Math.min(100, cpu.benchmarkScore + (cpu.cores >= 8 ? 5 : 0) + (cpu.boostClock >= 4.5 ? 5 : 0));
  const gpuGamingScore = gpu.benchmarkScore;

  const getCPUGamingRating = (score: number) => {
    if (score >= 90) return { rating: ratings.excellent, color: 'text-green-600', description: ratings.excellent };
    if (score >= 75) return { rating: ratings.very_good, color: 'text-blue-600', description: ratings.very_good };
    if (score >= 60) return { rating: ratings.good, color: 'text-yellow-600', description: ratings.good };
    if (score >= 45) return { rating: ratings.fair, color: 'text-orange-600', description: ratings.fair };
    return { rating: ratings.poor, color: 'text-red-600', description: ratings.poor };
  };

  const getGPUGamingRating = (score: number) => {
    if (score >= 90) return { rating: ratings.excellent, color: 'text-green-600', description: ratings.excellent };
    if (score >= 75) return { rating: ratings.very_good, color: 'text-blue-600', description: ratings.very_good };
    if (score >= 60) return { rating: ratings.good, color: 'text-yellow-600', description: ratings.good };
    if (score >= 45) return { rating: ratings.fair, color: 'text-orange-600', description: ratings.fair };
    return { rating: ratings.poor, color: 'text-red-600', description: ratings.poor };
  };

  const cpuRating = getCPUGamingRating(cpuGamingScore);
  const gpuRating = getGPUGamingRating(gpuGamingScore);

  // Configuration scoring
  const getRamScore = (ramId: string) => {
    const ramDesc = sysConfig.ram_desc || {};

    const fallbackDesc = "Compatible with modern systems";

    if (ramId.includes('64gb')) return { score: ratings.excellent, color: 'text-green-600', description: ramDesc.excellent || fallbackDesc };
    if (ramId.includes('32gb')) return { score: ratings.excellent, color: 'text-green-600', description: ramDesc.excellent || fallbackDesc };
    if (ramId.includes('16gb') && ramId.includes('ddr5')) return { score: ratings.very_good, color: 'text-blue-600', description: ramDesc.very_good || fallbackDesc };
    if (ramId.includes('16gb')) return { score: ratings.good, color: 'text-yellow-600', description: ramDesc.good || fallbackDesc };
    if (ramId.includes('8gb')) return { score: ratings.fair, color: 'text-orange-600', description: ramDesc.fair || fallbackDesc };
    return { score: ratings.poor, color: 'text-red-600', description: ramDesc.fair || fallbackDesc };
  };

  const ramScore = getRamScore(ram.id);

  // Gaming recommendations
  const getGameTypeRecommendations = () => {
    const avgScore = (cpu.benchmarkScore + gpu.benchmarkScore) / 2;
    // Defensive access done above in 'recs'
    const allGames = recs.all_games || { label: 'All Games', desc: '', list: [] };
    const aaaEsports = recs.aaa_esports || { label: 'AAA & Esports', desc: '', list: [] };
    const esportsCasual = recs.esports_casual || { label: 'Esports & Casual', desc: '', list: [] };
    const casual = recs.casual || { label: 'Casual', desc: '', list: [] };

    if (avgScore >= 85) {
      return {
        primary: allGames.label,
        description: allGames.desc,
        games: allGames.list
      };
    } else if (avgScore >= 70) {
      return {
        primary: aaaEsports.label,
        description: aaaEsports.desc,
        games: aaaEsports.list
      };
    } else if (avgScore >= 55) {
      return {
        primary: esportsCasual.label,
        description: esportsCasual.desc,
        games: esportsCasual.list
      };
    } else {
      return {
        primary: casual.label,
        description: casual.desc,
        games: casual.list
      };
    }
  };

  const gameRecommendations = getGameTypeRecommendations();

  // Expected gaming experience
  const esportsGames = allGames.filter(game => game.category === 'Esports').slice(0, 4);
  const aaaGames = allGames.filter(game => game.category === 'AAA').slice(0, 4);

  const getSettingsRecommendation = (fps: number) => {
    if (fps >= 120) return { settings: 'Ultra', color: 'text-green-600' };
    if (fps >= 90) return { settings: 'High', color: 'text-blue-600' };
    if (fps >= 60) return { settings: 'Medium', color: 'text-yellow-600' };
    if (fps >= 30) return { settings: 'Low', color: 'text-orange-600' };
    return { settings: 'Very Low', color: 'text-red-600' };
  };

  // Calculate total system price
  const totalSystemPrice = cpu.currentPrice + gpu.currentPrice + ram.price;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{results.back_button}</span>
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{results.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{results.subtitle}</p>
            </div>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </CardHeader>
      </Card>

      {/* 🔹 1. Resolution Impact & Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-6 h-6 text-blue-600" />
            <span>🔹 {sections.resolution_impact}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resolutionImpact.map((impact) => (
              <div
                key={impact.resolution}
                className={`p-4 rounded-lg border-2 ${impact.resolution === resolution
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
                  }`}
              >
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-lg">{impact.resolution}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {labels.estimated_total}: {impact.estimatedFPS} FPS
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{labels.cpu_perf}</span>
                    <span className="font-medium">{impact.cpuScore}%</span>
                  </div>
                  <Progress value={impact.cpuScore} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">{labels.gpu_perf}</span>
                    <span className="font-medium">{impact.gpuScore}%</span>
                  </div>
                  <Progress value={impact.gpuScore} className="h-2" />

                  <div className="flex items-center justify-center mt-3">
                    <Badge variant={impact.limitingFactor === 'CPU' ? 'destructive' : 'secondary'}>
                      {impact.limitingFactor} Limited
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 🔹 2. Gaming Performance Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-green-600" />
            <span>🔹 {sections.gaming_perf}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <Cpu className="w-5 h-5" />
                <span>{labels.cpu_gaming}</span>
              </h3>
              <div className="flex items-center justify-between">
                <span>{labels.gaming_score}</span>
                <span className="font-bold text-lg">{cpuGamingScore}/100</span>
              </div>
              <Progress value={cpuGamingScore} className="h-3" />
              <div className={`font-semibold ${cpuRating.color}`}>
                {cpuRating.rating}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {cpuRating.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>{labels.gpu_gaming}</span>
              </h3>
              <div className="flex items-center justify-between">
                <span>{labels.gaming_score}</span>
                <span className="font-bold text-lg">{gpuGamingScore}/100</span>
              </div>
              <Progress value={gpuGamingScore} className="h-3" />
              <div className={`font-semibold ${gpuRating.color}`}>
                {gpuRating.rating}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {gpuRating.description}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">{labels.system_balance}</h4>
            <div className="flex items-center space-x-2">
              {bottleneckType === 'Balanced' ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">{ratings.well_balanced}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-600 font-medium">
                    {bottleneckPercentage}% {bottleneckType} {ratings.bottleneck_warning}
                  </span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 3. Gaming Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-purple-600" />
            <span>🔹 {sections.recommendations}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">{labels.rec_game_types}</h3>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  {gameRecommendations.primary}
                </div>
                <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                  {gameRecommendations.description}
                </p>
                <ul className="space-y-1">
                  {gameRecommendations.games.map((game: string, index: number) => (
                    <li key={index} className="text-sm flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-purple-600" />
                      <span>{game}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">{labels.upgrade_priority}</h3>
              <div className="space-y-3">
                {bottleneckType === 'CPU' && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-900 dark:text-red-100">{upg.cpu_title}</span>
                    </div>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {upg.cpu_desc?.replace('{val}', bottleneckPercentage.toString())}
                    </p>
                  </div>
                )}

                {bottleneckType === 'GPU' && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-900 dark:text-red-100">{upg.gpu_title}</span>
                    </div>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {upg.gpu_desc?.replace('{val}', bottleneckPercentage.toString())}
                    </p>
                  </div>
                )}

                {bottleneckType === 'Balanced' && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900 dark:text-green-100">{upg.balanced_title}</span>
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {upg.balanced_desc}
                    </p>
                  </div>
                )}

                {ram.id.includes('8gb') && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <HardDrive className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900 dark:text-yellow-100">{upg.ram_title}</span>
                    </div>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      {upg.ram_desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 4. Configuration Scoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-yellow-600" />
            <span>🔹 {sections.config_score}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <HardDrive className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold mb-1">{labels.ram_score}</h3>
              <div className={`text-lg font-bold ${ramScore.color} mb-2`}>
                {ramScore.score}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {ramScore.description}
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <HardDrive className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold mb-1">{labels.storage_score}</h3>
              <div className="text-lg font-bold text-green-600 mb-2">
                {ratings.good}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {sysConfig.storage_desc}
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Star className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold mb-1">{labels.overall_rating}</h3>
              <div className="text-lg font-bold text-purple-600 mb-2">
                {bottleneckType === 'Balanced' ? ratings.excellent : ratings.good}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bottleneckType === 'Balanced'
                  ? overallDesc.balanced
                  : overallDesc.imbalance
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 5. Bottleneck Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-red-600" />
            <span>🔹 {sections.bottleneck}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {bottleneckPercentage}% {bottleneckType} {ratings.bottleneck_warning}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {bottleneckType === 'Balanced'
                  ? bot.balanced_title
                  : bot.bottleneck_title?.replace('{type}', bottleneckType)
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">CPU Utilization</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {bottleneckType === 'CPU' ? ratings.maxed_out : ratings.optimal}
                  </span>
                </div>
                <Progress
                  value={bottleneckType === 'CPU' ? 95 : 75}
                  className="h-3"
                />
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">GPU Utilization</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {bottleneckType === 'GPU' ? ratings.maxed_out : ratings.optimal}
                  </span>
                </div>
                <Progress
                  value={bottleneckType === 'GPU' ? 95 : 85}
                  className="h-3"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">{labels.perf_impact}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bottleneckType === 'Balanced'
                  ? bot.balanced_desc
                  : bot.bottleneck_desc
                    ?.replace('{type}', bottleneckType)
                    .replace('{val}', bottleneckPercentage.toString())
                    .replace('{scenario}', bottleneckType === 'CPU' ? bot.cpu_scenario : bot.gpu_scenario)
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 6. Expected Gaming Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-indigo-600" />
            <span>🔹 {sections.expected_experience} ({resolution})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>{labels.esports}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {esportsGames.map((game) => {
                  const fps = estimateFPS(cpu, gpu, game, resolution);
                  const settings = getSettingsRecommendation(fps);
                  return (
                    <div key={game.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{game.name}</span>
                        <span className="font-bold text-blue-600">{fps} FPS</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Recommended</span>
                        <span className={`font-medium ${settings.color}`}>{settings.settings}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span>{labels.aaa}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aaaGames.map((game) => {
                  const fps = estimateFPS(cpu, gpu, game, resolution);
                  const settings = getSettingsRecommendation(fps);
                  return (
                    <div key={game.id} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{game.name}</span>
                        <span className="font-bold text-purple-600">{fps} FPS</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Recommended</span>
                        <span className={`font-medium ${settings.color}`}>{settings.settings}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                <span>{labels.optimization_tips}</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">{labels.graphics_settings}</h5>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Enable DLSS/FSR for better performance</li>
                    <li>• Reduce shadow quality for FPS boost</li>
                    <li>• Use medium textures if VRAM limited</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">{labels.system_opt}</h5>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Close background applications</li>
                    <li>• Enable Game Mode in Windows</li>
                    <li>• Consider overclocking if cooling allows</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 💰 Current Market Prices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-amber-600" />
            <span>💰 {sections.market_prices}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">{mkt.cpu_price}</h3>
                  <div className="space-y-2">
                    <ComponentLink href={cpu.officialUrl}>
                      <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">{cpu.name}</p>
                    </ComponentLink>
                    {cpu.officialUrl && (
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className={`group transition-colors ${cpu.brand === 'Intel'
                                  ? 'hover:bg-blue-600 hover:text-white'
                                  : 'hover:bg-red-600 hover:text-white'
                                  }`}
                                asChild
                              >
                                <a
                                  href={cpu.officialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2"
                                >
                                  {cpu.brand === 'Intel' ? (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                      <path
                                        fill="currentColor"
                                        d="M24,11.36h-3.24v1.5h3.24V11.36z M19.67,11.36h-3.24v1.5h3.24V11.36z M15.33,11.36h-3.24v1.5h3.24V11.36z M11,11.36H7.76v1.5H11 V11.36z M6.67,11.36H3.43v1.5h3.24V11.36z M2.33,11.36H0v1.5h2.33V11.36z"
                                      />
                                    </svg>
                                  ) : (
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                      <path
                                        fill="currentColor"
                                        d="M18.324 9.137l1.559-1.559v7.117l-1.559-1.559v-3.999zm-3.092 3.092l1.559-1.559v3.999l-1.559-1.559v-.882zm-3.091 3.091l1.559-1.559v1.559h-1.559zm-3.092-3.091l1.559-1.559v3.999l-1.559-1.559v-.882zm-3.091-3.092l1.559-1.559v7.117l-1.559-1.559v-3.999z"
                                      />
                                    </svg>
                                  )}
                                  <span className="text-xs">{mkt.view_specs || mkt.view_specs_fallback}</span>
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{mkt.official_page?.replace('{brand}', cpu.brand)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${cpu.currentPrice}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{mkt.current_price}</div>
                </div>
              </div>
              {cpu.launchPrice !== cpu.currentPrice && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {mkt.launch_price?.replace('{val}', cpu.launchPrice.toString())}
                  <span className={cpu.currentPrice < cpu.launchPrice ? 'text-green-600' : 'text-red-600'}>
                    ({cpu.currentPrice < cpu.launchPrice ? '-' : '+'}${Math.abs(cpu.launchPrice - cpu.currentPrice)})
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100">{mkt.gpu_price}</h3>
                  <div className="space-y-2">
                    <ComponentLink href={gpu.officialUrl}>
                      <p className="text-sm text-green-700 dark:text-green-300 font-medium">{gpu.name}</p>
                    </ComponentLink>
                    {gpu.officialUrl && (
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`group transition-colors ${gpu.brand === 'NVIDIA'
                            ? 'hover:bg-green-600 hover:text-white'
                            : 'hover:bg-red-600 hover:text-white'
                            }`}
                          asChild
                        >
                          <a
                            href={gpu.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2"
                          >
                            {gpu.brand === 'NVIDIA' ? (
                              <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M12.03,11.16h-1.39v1.56h1.39c0.55,0,0.89-0.31,0.89-0.78C12.92,11.47,12.58,11.16,12.03,11.16z M14.89,13.43 c0-0.48-0.35-0.79-0.91-0.79h-1.41v1.57h1.41C14.54,14.21,14.89,13.91,14.89,13.43z M14.45,9.75h-1.36v1.41h1.36 c0.54,0,0.88-0.29,0.88-0.7C15.33,10.05,14.99,9.75,14.45,9.75z"
                                />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M18.324 9.137l1.559-1.559v7.117l-1.559-1.559v-3.999zm-3.092 3.092l1.559-1.559v3.999l-1.559-1.559v-.882zm-3.091 3.091l1.559-1.559v1.559h-1.559zm-3.092-3.091l1.559-1.559v3.999l-1.559-1.559v-.882zm-3.091-3.092l1.559-1.559v7.117l-1.559-1.559v-3.999z"
                                />
                              </svg>
                            )}
                            <span className="text-xs">{mkt.view_specs || mkt.view_specs_fallback}</span>
                          </a>
                        </Button>
                        <span className="text-xs text-gray-500">{mkt.official_page?.replace('{brand}', gpu.brand)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${gpu.currentPrice}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{mkt.current_price}</div>
                </div>
              </div>
              {gpu.launchPrice !== gpu.currentPrice && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {mkt.launch_price?.replace('{val}', gpu.launchPrice.toString())}
                  <span className={gpu.currentPrice < gpu.launchPrice ? 'text-green-600' : 'text-red-600'}>
                    ({gpu.currentPrice < gpu.launchPrice ? '-' : '+'}${Math.abs(gpu.launchPrice - gpu.currentPrice)})
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">{labels.total_system_value}</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">{mkt.combined}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-600">${totalSystemPrice}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{labels.estimated_total}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-gray-900 dark:text-gray-100">${cpu.currentPrice}</div>
                <div className="text-gray-600 dark:text-gray-400">CPU</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900 dark:text-gray-100">${gpu.currentPrice}</div>
                <div className="text-gray-600 dark:text-gray-400">GPU</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900 dark:text-gray-100">${ram.price}</div>
                <div className="text-gray-600 dark:text-gray-400">RAM</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span>{labels.power_reqs}</span>
            </h4>
            <div className="flex items-center justify-between">
              <span>{labels.rec_psu}</span>
              <span className="font-bold">{psuRequirement}W</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Includes 20% safety margin for stable operation
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Final Recommendation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>🎯 {labels.final_rec}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-lg mb-2 text-green-900 dark:text-green-100">
              System Verdict: {bottleneckType === 'Balanced' ? 'Excellent Build' : 'Upgrade Recommended'}
            </h3>
            <p className="text-green-800 dark:text-green-200 mb-4">
              {bottleneckType === 'Balanced'
                ? 'Your system is well balanced and ready for modern gaming. You can expect smooth performance in most games with high settings.'
                : `Your system has a significant ${bottleneckType} bottleneck that is holding back performance. Consider upgrading your ${bottleneckType} to unlock the full potential of your build.`
              }
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-white dark:bg-green-900/40 rounded shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">Gaming</div>
                <div className="font-bold text-green-900 dark:text-green-100">{gameRecommendations.primary}</div>
              </div>
              <div className="p-2 bg-white dark:bg-green-900/40 rounded shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">Resolution</div>
                <div className="font-bold text-green-900 dark:text-green-100">{resolution} Ready</div>
              </div>
              <div className="p-2 bg-white dark:bg-green-900/40 rounded shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">Value</div>
                <div className="font-bold text-green-900 dark:text-green-100">${totalSystemPrice} Total</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}