'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { calculatorData, gamesData, resolutionMultipliers } from '@/lib/calculator-data';

// Define a type for game names based on the keys of gamesData
type Game = keyof typeof gamesData | '';

export function FpsCalculator() {
  const [selectedCpu, setSelectedCpu] = useState('');
  const [selectedGpu, setSelectedGpu] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedResolution, setSelectedResolution] = useState('1440p');
  const [results, setResults] = useState<{ fps: number; game: string; resolution: string } | null>(null);

  const getPerformanceScore = (componentScore: number) => {
    return Math.pow(componentScore / 100, 0.7);
  };

  const calculateFps = () => {
    if (!selectedCpu || !selectedGpu || !selectedGame) {
      alert('Please select a CPU, GPU, and a game.');
      return;
    }

    const cpuData = calculatorData.cpus[selectedCpu as keyof typeof calculatorData.cpus];
    const gpuData = calculatorData.gpus[selectedGpu as keyof typeof calculatorData.gpus];

    if (!cpuData || !gpuData) {
      alert('Invalid component selection.');
      return;
    }

    const cpuScore = getPerformanceScore(cpuData.score);
    const gpuScore = getPerformanceScore(gpuData.score);
    const game = gamesData[selectedGame as keyof typeof gamesData];
    const resMultiplier = resolutionMultipliers[selectedResolution as keyof typeof resolutionMultipliers];

    const weightedHardwareScore = (cpuScore * game.cpuWeight) + (gpuScore * game.gpuWeight);
    const estimatedFps = game.baseFps * weightedHardwareScore * resMultiplier;

    setResults({
      fps: Math.round(estimatedFps),
      game: selectedGame,
      resolution: selectedResolution
    });
  };

  const getPerformanceTier = (fps: number) => {
    if (fps < 30) return { tier: 'struggle', color: 'text-destructive' };
    if (fps < 60) return { tier: 'playable', color: 'text-amber-600' };
    if (fps > 120) return { tier: 'excellent', color: 'text-green-600' };
    return { tier: 'smooth', color: 'text-primary' };
  };

  const getPerformanceMessage = (fps: number) => {
    const messages = {
      struggle: 'The game will likely struggle to run at playable framerates. Expect significant performance issues.',
      playable: 'You should get a playable experience, though you may need to lower some settings for consistent performance.',
      smooth: 'You can expect a smooth gaming experience at these settings.',
      excellent: 'Your system should provide an excellent, high-framerate experience in this title.'
    };

    const tier = getPerformanceTier(fps).tier as keyof typeof messages;
    return messages[tier];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Gaming Performance Estimator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* CPU Selection */}
          <div className="space-y-2">
            <Label htmlFor="cpu-select">Processor (CPU)</Label>
            <SearchableSelect
              value={selectedCpu}
              onValueChange={setSelectedCpu}
              options={Object.keys(calculatorData.cpus)}
              placeholder="-- Select CPU --"
              emptyPlaceholder="No CPUs found."
              type="cpu"
              id="cpu-select"
            />
          </div>

          {/* GPU Selection */}
          <div className="space-y-2">
            <Label htmlFor="gpu-select">Graphics Card (GPU)</Label>
            <SearchableSelect
              value={selectedGpu}
              onValueChange={setSelectedGpu}
              options={Object.keys(calculatorData.gpus)}
              placeholder="-- Select GPU --"
              emptyPlaceholder="No GPUs found."
              type="gpu"
              id="gpu-select"
            />
          </div>

          {/* Game Selection */}
          <div className="space-y-2">
            <Label htmlFor="game-select">Select a Game</Label>
            <Select value={selectedGame} onValueChange={(value) => setSelectedGame(value as Game)}>
              <SelectTrigger>
                <SelectValue placeholder="-- Select a Game --" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(gamesData)
                  .sort(([, a], [, b]) => b.releaseYear - a.releaseYear)
                  .map(([game, data]) => (
                    <SelectItem key={game} value={game}>
                      <div className="flex items-center justify-between w-full">
                        <span>{game}</span>
                        <div className="flex gap-2 ml-2">
                          <Badge variant="secondary">{data.category}</Badge>
                          <Badge variant="outline">{data.releaseYear}</Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Resolution Selection */}
          <div className="space-y-2">
            <Label htmlFor="resolution-select">Target Resolution</Label>
            <Select value={selectedResolution} onValueChange={setSelectedResolution}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1080p">1080p (FHD)</SelectItem>
                <SelectItem value="1440p">1440p (QHD)</SelectItem>
                <SelectItem value="4K">4K (UHD)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Calculate Button */}
          <Button
            onClick={calculateFps}
            className="w-full"
            size="lg"
          >
            Estimate My FPS
          </Button>

          {/* Results */}
          {results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <p className="text-lg">
                      Estimated average performance for <strong>{results.game}</strong> at <strong>{results.resolution}</strong>:
                    </p>
                    <div className="text-6xl font-bold">
                      <span className={getPerformanceTier(results.fps).color}>
                        {results.fps}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      Average FPS
                    </Badge>
                    <p className="text-muted-foreground mt-4">
                      {getPerformanceMessage(results.fps)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
