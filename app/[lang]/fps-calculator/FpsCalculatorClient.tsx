"use client";

import dynamic from "next/dynamic";
import { useLayoutEffect, useRef, useState } from "react";
import { EnhancedFPSCalculator } from "@/components/calculators/enhanced-fps-calculator";

const OtherGamesPerformance = dynamic(
  () =>
    import("@/components/calculators/other-games-performance").then(
      (module) => module.OtherGamesPerformance
    ),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="mx-auto mt-6 h-48 max-w-7xl animate-pulse rounded-xl border border-slate-200/70 bg-slate-100/60 dark:border-slate-800/60 dark:bg-slate-900/40"
      />
    ),
  }
);

const FPSCompareAndShare = dynamic(
  () => import("@/components/calculators/FPS-Compare-And-Share"),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="mx-auto mt-6 h-64 max-w-4xl animate-pulse rounded-xl border border-slate-200/70 bg-slate-100/60 dark:border-slate-800/60 dark:bg-slate-900/40"
      />
    ),
  }
);

export default function FpsCalculatorClient({ dict, lang }: { dict: any; lang: string }) {
  const calculatorRegionRef = useRef<HTMLDivElement>(null);
  const [currentBuild, setCurrentBuild] = useState<{
    cpu: string;
    gpu: string;
    game: string;
    resolution: string;
    fps: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!currentBuild) return;

    const scrollToResults = () => {
      const calculatorRegion = calculatorRegionRef.current;
      if (!calculatorRegion) return;

      const top = calculatorRegion.getBoundingClientRect().top + window.scrollY - 64;
      const targetTop = Math.max(0, top);

      // Set every standards/legacy scrolling surface so browser scroll
      // anchoring cannot preserve the former button position.
      window.scrollTo(0, targetTop);
      document.documentElement.scrollTop = targetTop;
      document.body.scrollTop = targetTop;
    };

    const frameId = window.requestAnimationFrame(scrollToResults);
    const settleTimeoutId = window.setTimeout(scrollToResults, 150);
    const finalTimeoutId = window.setTimeout(scrollToResults, 600);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settleTimeoutId);
      window.clearTimeout(finalTimeoutId);
    };
  }, [currentBuild]);

  return (
    <>
      {/* 🧮 Step 1: Main Calculator */}
      <div ref={calculatorRegionRef} className="scroll-mt-16 [overflow-anchor:none]">
        <EnhancedFPSCalculator onBuildChange={setCurrentBuild} dict={dict} />
      </div>

      {/* ⚖️ Step 2: Compare & Share (only appears after FPS is calculated) */}
      {currentBuild && (
        <div
          className="space-y-6"
          style={{ contentVisibility: "auto", containIntrinsicSize: "0 900px" }}
        >
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
            lang={lang}
          />
        </div>
      )}
    </>
  );
}
