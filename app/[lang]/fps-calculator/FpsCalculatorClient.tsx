"use client";

import { useState } from "react";
import { EnhancedFPSCalculator } from "@/components/calculators/enhanced-fps-calculator";
import FPSCompareAndShare from "@/components/calculators/FPS-Compare-And-Share";
import { OtherGamesPerformance } from "@/components/calculators/other-games-performance";

export default function FpsCalculatorClient({ dict, lang }: { dict: any; lang: string }) {
  const [currentBuild, setCurrentBuild] = useState<{
    cpu: string;
    gpu: string;
    game: string;
    resolution: string;
    fps: number;
  } | null>(null);

  return (
    <>
      {/* 🧮 Step 1: Main Calculator */}
      <EnhancedFPSCalculator onBuildChange={setCurrentBuild} dict={dict} />

      {/* ⚖️ Step 2: Compare & Share (only appears after FPS is calculated) */}
      {currentBuild && (
        <>
          <OtherGamesPerformance
            cpuId={currentBuild.cpu}
            gpuId={currentBuild.gpu}
            resolution={currentBuild.resolution}
            excludedGameId={currentBuild.game}
            dict={dict}
          />
          <FPSCompareAndShare
            currentCPU={currentBuild.cpu}
            currentGPU={currentBuild.gpu}
            currentGame={currentBuild.game}
            currentResolution={currentBuild.resolution}
            dict={dict}
          />
        </>
      )}
    </>
  );
}
