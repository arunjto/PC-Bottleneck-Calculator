'use client';

import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Minus,
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
  Star
} from 'lucide-react';
import { 
  CPU, 
  GPU, 
  calculateBottleneckPercentage, 
  getBottleneckType, 
  estimateFPS, 
  calculatePSURequirement, 
  allGames 
} from '@/lib/hardware-database';

interface ComprehensiveBottleneckResultsProps {
  cpu: CPU & { officialUrl?: string };
  gpu: GPU & { officialUrl?: string };
  ram: { id: string; name: string; tier: string; specs: string; price: number };
  resolution: string;
  onBack: () => void;
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
  onBack 
}: ComprehensiveBottleneckResultsProps) {
  const bottleneckPercentage = calculateBottleneckPercentage(cpu, gpu);
  const bottleneckType = getBottleneckType(cpu, gpu);
  const psuRequirement = calculatePSURequirement(cpu, gpu);

  // Resolution impact calculations
  const resolutions = ['1080p', '1440p', '4K'];
  const resolutionImpact = resolutions.map(res => {
    const multiplier = { '1080p': 1.0, '1440p': 0.7, '4K': 0.4 }[res] || 1.0;
    const cpuScore = cpu.benchmarkScore * (res === '1080p' ? 0.9 : 1.0);
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
              <span>Back to Calculator</span>
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">System Analysis Results</h1>
              <p className="text-gray-600 dark:text-gray-400">Comprehensive performance breakdown</p>
            </div>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </CardHeader>
      </Card>

      {/* Components Overview with Official Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HardDrive className="w-6 h-6 text-blue-600" />
            <span>Selected Components</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CPU Information */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    <ComponentLink href={cpu.officialUrl}>
                      {cpu.name}
                    </ComponentLink>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cpu.architecture} • {cpu.cores} Cores / {cpu.threads} Threads
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${cpu.currentPrice}</div>
                  <div className="text-sm text-gray-600">Market Price</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Clock</span>
                  <span className="font-medium">{cpu.baseClock} GHz</span>
                </div>
                <div className="flex justify-between">
                  <span>Boost Clock</span>
                  <span className="font-medium">{cpu.boostClock} GHz</span>
                </div>
                <div className="flex justify-between">
                  <span>TDP</span>
                  <span className="font-medium">{cpu.tdp}W</span>
                </div>
                {cpu.officialUrl && (
                  <div className="mt-4">
                    <ComponentLink href={cpu.officialUrl} className="text-sm text-blue-600 hover:underline flex items-center">
                      <span>View Official Specs</span>
                      <ArrowLeft className="w-4 h-4 ml-1 transform rotate-180" />
                    </ComponentLink>
                  </div>
                )}
              </div>
            </div>

            {/* GPU Information */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    <ComponentLink href={gpu.officialUrl}>
                      {gpu.name}
                    </ComponentLink>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {gpu.architecture} • {gpu.vram}GB VRAM
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${gpu.currentPrice}</div>
                  <div className="text-sm text-gray-600">Market Price</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Clock</span>
                  <span className="font-medium">{gpu.baseClock} MHz</span>
                </div>
                <div className="flex justify-between">
                  <span>Boost Clock</span>
                  <span className="font-medium">{gpu.boostClock} MHz</span>
                </div>
                <div className="flex justify-between">
                  <span>TDP</span>
                  <span className="font-medium">{gpu.tdp}W</span>
                </div>
                {gpu.officialUrl && (
                  <div className="mt-4">
                    <ComponentLink href={gpu.officialUrl} className="text-sm text-blue-600 hover:underline flex items-center">
                      <span>View Official Specs</span>
                      <ArrowLeft className="w-4 h-4 ml-1 transform rotate-180" />
                    </ComponentLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resolution Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-6 h-6 text-blue-600" />
            <span>Resolution Impact Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resolutionImpact.map((impact) => (
              <div 
                key={impact.resolution}
                className={`p-4 rounded-lg border-2 ${
                  impact.resolution === resolution 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-lg">{impact.resolution}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Est. {impact.estimatedFPS} FPS
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPU Performance</span>
                      <span className="font-medium">{impact.cpuScore}%</span>
                    </div>
                    <Progress value={impact.cpuScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">GPU Performance</span>
                      <span className="font-medium">{impact.gpuScore}%</span>
                    </div>
                    <Progress value={impact.gpuScore} className="h-2" />
                  </div>
                  
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
    </div>
  );
}