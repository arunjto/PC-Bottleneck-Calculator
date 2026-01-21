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
  dict: any;
}

export default function FPSCompareAndShare({
  currentCPU,
  currentGPU,
  currentGame,
  currentResolution,
  dict
}: CompareProps) {
  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [tips, setTips] = useState<string[]>([]);

  const t = dict?.fps_compare;

  if (!t) return null;

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
      toast.error(t.share.toast_select);
      return;
    }

    const cpuA = getCPUById(currentCPU);
    const gpuA = getGPUById(currentGPU);
    const cpuB = getCPUById(selectedCPU);
    const gpuB = getGPUById(selectedGPU);
    const game = getGameById(currentGame);

    if (!cpuA || !gpuA || !cpuB || !gpuB || !game) {
      toast.error(t.share.toast_incomplete);
      return;
    }

    const fpsA = estimateFPS(cpuA, gpuA, game, currentResolution);
    const fpsB = estimateFPS(cpuB, gpuB, game, currentResolution);

    const costA = (cpuA.currentPrice || 1) + (gpuA.currentPrice || 1);
    const costB = (cpuB.currentPrice || 1) + (gpuB.currentPrice || 1);

    const fpsDiff = ((fpsA - fpsB) / fpsB) * 100;
    const absDiff = Math.abs(fpsDiff).toFixed(1);

    let verdict = "";
    if (fpsDiff > 0) {
      verdict = t.verdict.faster.replace("{diff}", fpsDiff.toFixed(1));
    } else if (fpsDiff < 0) {
      verdict = t.verdict.slower.replace("{diff}", absDiff);
    } else {
      verdict = t.verdict.equal;
    }

    setComparisonResult(verdict);

    setChartData([
      {
        name: t.chart.your_build,
        fps: fpsA,
        cost: costA,
        fpsPerDollar: (fpsA / costA).toFixed(3),
      },
      {
        name: t.chart.comp_build,
        fps: fpsB,
        cost: costB,
        fpsPerDollar: (fpsB / costB).toFixed(3),
      },
    ]);

    generateTips(selectedGPU, currentResolution);
  };

  const generateTips = (gpu: string, resolution: string) => {
    const tipsList: string[] = [];
    if (/4090|5090/i.test(gpu)) {
      tipsList.push(t.tips.dlss3);
      tipsList.push(t.tips.higher_res);
    } else if (/4080|4070/i.test(gpu)) {
      tipsList.push(t.tips.dlss_qual);
      tipsList.push(t.tips.lock_fps);
    } else if (/3060|3070/i.test(gpu)) {
      tipsList.push(t.tips.no_rt);
      tipsList.push(t.tips.fsr);
    } else {
      tipsList.push(t.tips.lower_settings);
      tipsList.push(t.tips.update_drivers);
    }

    if (resolution === "4K")
      tipsList.push(t.tips.tips_4k);
    if (resolution === "1080p")
      tipsList.push(t.tips.tips_1080p);
    if (resolution === "1440p")
      tipsList.push(t.tips.tips_1440p);

    setTips(tipsList);
  };

  const share = (platform: string) => {
    const url = encodeURIComponent("https://www.pcbuildcheck.com/fps-calculator");
    const text = encodeURIComponent(t.share.text);

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
        break;
      case "instagram":
        toast.info(t.share.toast_insta);
        break;
      case "copy":
        navigator.clipboard.writeText("https://www.pcbuildcheck.com/fps-calculator");
        toast.success(t.share.toast_copy);
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
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">{t.current_build}</h3>
              <p className="text-sm text-gray-600">
                CPU: {getCPUById(currentCPU)?.name || "N/A"}
                <br />
                GPU: {getGPUById(currentGPU)?.name || "N/A"}
                <br />
                Resolution: {currentResolution}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t.compare_with}</h3>
              <EnhancedSearchableSelect
                options={cpuOptions}
                value={selectedCPU}
                onValueChange={setSelectedCPU}
                placeholder={dict.fps_calculator.cpu.placeholder}
                type="cpu"
              />
              <EnhancedSearchableSelect
                options={gpuOptions}
                value={selectedGPU}
                onValueChange={setSelectedGPU}
                placeholder={dict.fps_calculator.gpu.placeholder}
                type="gpu"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleCompare}>{t.button}</Button>
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
              💰 {t.chart.title}
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
              🎮 {t.tips.title}
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
            <Share2 className="w-5 h-5" /> {t.share.title}
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
            <Copy className="w-4 h-4 mr-1" /> {t.share.toast_copy.replace('!', '')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
