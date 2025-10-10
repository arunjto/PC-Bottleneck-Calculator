"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedSearchableSelect } from "@/components/ui/enhanced-searchable-select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { Share2, Facebook, Twitter, Instagram, Copy, ArrowLeftRight } from "lucide-react";
import {
  allCPUs,
  allGPUs,
  allGames,
  getCPUById,
  getGPUById,
  getGameById,
  estimateFPS,
} from "@/lib/hardware-database";

interface CompareProps {
  currentCPU: string;
  currentGPU: string;
  currentGame: string;
  currentResolution: string;
}

export default function FPSCompareAndShare({
  currentCPU,
  currentGPU,
  currentGame,
  currentResolution,
}: CompareProps) {
  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [tips, setTips] = useState<string[]>([]);

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

  const handleCompare = () => {
    if (!selectedCPU || !selectedGPU) {
      toast.error("Please select CPU and GPU for comparison.");
      return;
    }

    const cpuA = getCPUById(currentCPU);
    const gpuA = getGPUById(currentGPU);
    const cpuB = getCPUById(selectedCPU);
    const gpuB = getGPUById(selectedGPU);
    const game = getGameById(currentGame);

    if (!cpuA || !gpuA || !cpuB || !gpuB || !game) {
      toast.error("Incomplete data for comparison.");
      return;
    }

    const fpsA = estimateFPS(cpuA, gpuA, game, currentResolution);
    const fpsB = estimateFPS(cpuB, gpuB, game, currentResolution);

    const costA = (cpuA.currentPrice || 1) + (gpuA.currentPrice || 1);
    const costB = (cpuB.currentPrice || 1) + (gpuB.currentPrice || 1);

    const fpsDiff = ((fpsA - fpsB) / fpsB) * 100;
    const verdict =
      fpsDiff > 0
        ? `Your current build is ${fpsDiff.toFixed(1)}% faster than the comparison build.`
        : fpsDiff < 0
        ? `The comparison build is ${Math.abs(fpsDiff).toFixed(1)}% faster than your build.`
        : "Both builds perform about the same.";

    setComparisonResult(verdict);

    setChartData([
      {
        name: "Your Build",
        fps: fpsA,
        cost: costA,
        fpsPerDollar: (fpsA / costA).toFixed(3),
      },
      {
        name: "Comparison Build",
        fps: fpsB,
        cost: costB,
        fpsPerDollar: (fpsB / costB).toFixed(3),
      },
    ]);

    generateTips(selectedGPU, currentResolution);
  };

  const generateTips = (gpu: string, resolution: string) => {
    const t: string[] = [];
    if (/4090|5090/i.test(gpu)) {
      t.push("Enable DLSS 3 or Frame Generation for smoother 4K gameplay.");
      t.push("Consider higher resolutions to reduce CPU bottleneck.");
    } else if (/4080|4070/i.test(gpu)) {
      t.push("Use DLSS Quality mode for best balance of visuals and performance.");
      t.push("Lock FPS to your monitor refresh rate for stable experience.");
    } else if (/3060|3070/i.test(gpu)) {
      t.push("Turn off ray tracing at 4K for better performance.");
      t.push("Use FSR 2.0 to boost FPS without major visual loss.");
    } else {
      t.push("Lower shadow and texture quality for +10–15% FPS boost.");
      t.push("Ensure your GPU drivers are updated.");
    }

    if (resolution === "4K")
      t.push("DLSS or FSR recommended for smooth 4K gameplay.");
    if (resolution === "1080p")
      t.push("Likely CPU-bound — try higher resolution for balanced load.");
    if (resolution === "1440p")
      t.push("Great sweet spot for performance and visuals.");

    setTips(t);
  };

  const share = (platform: string) => {
    const url = encodeURIComponent("https://www.pcbuildcheck.com/fps-calculator");
    const text = encodeURIComponent(
      "I compared my gaming PC builds with the FPS Estimator — check your FPS now!"
    );

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
        break;
      case "instagram":
        toast.info("Instagram doesn’t support link shares — copy the link instead!");
        break;
      case "copy":
        navigator.clipboard.writeText("https://www.pcbuildcheck.com/fps-calculator");
        toast.success("Link copied to clipboard!");
        break;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto mt-8">
      {/* Compare Builds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
            Compare Two Builds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Your Current Build</h3>
              <p className="text-sm text-gray-600">
                CPU: {getCPUById(currentCPU)?.name || "N/A"}
                <br />
                GPU: {getGPUById(currentGPU)?.name || "N/A"}
                <br />
                Resolution: {currentResolution}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Compare With</h3>
              <EnhancedSearchableSelect
                options={cpuOptions}
                value={selectedCPU}
                onValueChange={setSelectedCPU}
                placeholder="Select CPU..."
                type="cpu"
              />
              <EnhancedSearchableSelect
                options={gpuOptions}
                value={selectedGPU}
                onValueChange={setSelectedGPU}
                placeholder="Select GPU..."
                type="gpu"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleCompare}>Compare Builds</Button>
          </div>

          {comparisonResult && (
            <p className="text-center text-blue-700 font-medium mt-2">
              {comparisonResult}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Performance vs Cost */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              💰 Performance vs Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fpsPerDollar" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Optimization Tips */}
      {tips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              🎮 Game Optimization Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              {tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Share */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Share2 className="w-5 h-5" /> Share Your Results
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" onClick={() => share("facebook")}>
            <Facebook className="w-4 h-4 mr-1" /> Facebook
          </Button>
          <Button variant="outline" onClick={() => share("twitter")}>
            <Twitter className="w-4 h-4 mr-1" /> Twitter
          </Button>
          <Button variant="outline" onClick={() => share("instagram")}>
            <Instagram className="w-4 h-4 mr-1" /> Instagram
          </Button>
          <Button variant="outline" onClick={() => share("copy")}>
            <Copy className="w-4 h-4 mr-1" /> Copy Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
