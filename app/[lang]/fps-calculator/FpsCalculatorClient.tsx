"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BarChart3, ChevronDown } from "lucide-react";
import { EnhancedFPSCalculator } from "@/components/calculators/enhanced-fps-calculator";
import { FPSSavedHistory } from "@/components/calculators/fps-saved-history";
import { getCPUById, getGameById, getGPUById } from "@/lib/hardware-database";
import {
  configFromFPSBuild,
  FPS_HISTORY_STORAGE_KEY,
  parseFPSHistory,
  removeFPSHistoryEntry,
  renameFPSHistoryEntry,
  serializeFPSHistory,
  upsertFPSHistory,
  type FPSHistoryEntry,
} from "@/lib/fps-history";
import {
  parseFPSShareParams,
  removeFPSShareParams,
  serializeFPSShareConfig,
  type FPSCalculatorBuild,
  type FPSCalculatorConfig,
} from "@/lib/fps-share";

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
  const urlStateActiveRef = useRef(false);
  const [currentBuild, setCurrentBuild] = useState<FPSCalculatorBuild | null>(null);
  const [initialConfig, setInitialConfig] = useState<FPSCalculatorConfig | null | undefined>(undefined);
  const [calculatorRevision, setCalculatorRevision] = useState(0);
  const [savedHistory, setSavedHistory] = useState<FPSHistoryEntry[]>([]);
  const [historyReady, setHistoryReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [extendedAnalysisExpanded, setExtendedAnalysisExpanded] = useState(false);

  const persistHistory = useCallback((entries: FPSHistoryEntry[]) => {
    try {
      window.localStorage.setItem(FPS_HISTORY_STORAGE_KEY, serializeFPSHistory(entries));
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, []);

  const updateHistory = useCallback(
    (updater: (entries: FPSHistoryEntry[]) => FPSHistoryEntry[]) => {
      setSavedHistory((entries) => {
        const nextEntries = updater(entries);
        persistHistory(nextEntries);
        return nextEntries;
      });
    },
    [persistHistory]
  );

  const readSharedConfig = useCallback(() => {
    const parsedConfig = parseFPSShareParams(window.location.search);
    const parsed = parsedConfig
      && getCPUById(parsedConfig.cpu)
      && getGPUById(parsedConfig.gpu)
      && getGameById(parsedConfig.game)
      ? parsedConfig
      : null;
    const currentParams = new URLSearchParams(window.location.search);
    urlStateActiveRef.current = Boolean(parsed);

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`
      );
    }

    if (!parsed && currentParams.has("fps")) {
      const cleanParams = removeFPSShareParams(currentParams);
      const cleanQuery = cleanParams.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ""}`
      );
    }

    setInitialConfig(parsed);
    setCurrentBuild(null);
  }, []);

  useEffect(() => {
    readSharedConfig();

    const handlePopState = () => {
      readSharedConfig();
      setCalculatorRevision((revision) => revision + 1);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [readSharedConfig]);

  useEffect(() => {
    try {
      const parsedEntries = parseFPSHistory(
        window.localStorage.getItem(FPS_HISTORY_STORAGE_KEY)
      );
      const validEntries = parsedEntries.filter(
        (entry) => getCPUById(entry.config.cpu)
          && getGPUById(entry.config.gpu)
          && getGameById(entry.config.game)
      );
      setSavedHistory(validEntries);
      persistHistory(validEntries);
    } catch {
      setStorageAvailable(false);
    } finally {
      setHistoryReady(true);
    }
  }, [persistHistory]);

  const handleBuildChange = useCallback((build: FPSCalculatorBuild | null) => {
    setCurrentBuild(build);

    if (build) {
      if (!urlStateActiveRef.current) return;
      const params = serializeFPSShareConfig(build);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`
      );
      return;
    }

    urlStateActiveRef.current = false;
    const cleanParams = removeFPSShareParams(window.location.search);
    const cleanQuery = cleanParams.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ""}`
    );
  }, []);

  useEffect(() => {
    if (!historyReady || !currentBuild || !storageAvailable) return;
    const config = configFromFPSBuild(currentBuild);
    updateHistory((entries) => upsertFPSHistory(entries, config));
  }, [currentBuild, historyReady, storageAvailable, updateHistory]);

  const openSavedConfig = useCallback((config: FPSCalculatorConfig) => {
    if (!getCPUById(config.cpu) || !getGPUById(config.gpu) || !getGameById(config.game)) return;

    urlStateActiveRef.current = true;
    const params = serializeFPSShareConfig(config);
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    setCurrentBuild(null);
    setInitialConfig(config);
    setCalculatorRevision((revision) => revision + 1);
  }, []);

  const renameSavedEntry = useCallback((id: string, name: string) => {
    updateHistory((entries) => renameFPSHistoryEntry(entries, id, name));
  }, [updateHistory]);

  const deleteSavedEntry = useCallback((id: string) => {
    updateHistory((entries) => removeFPSHistoryEntry(entries, id));
  }, [updateHistory]);

  const clearSavedHistory = useCallback(() => {
    updateHistory(() => []);
  }, [updateHistory]);

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
        {initialConfig === undefined ? (
          <div
            aria-hidden="true"
            className="mx-auto h-96 max-w-7xl animate-pulse rounded-xl border border-slate-200/70 bg-slate-100/60 dark:border-slate-800/60 dark:bg-slate-900/40"
          />
        ) : (
          <EnhancedFPSCalculator
            key={calculatorRevision}
            initialConfig={initialConfig}
            onBuildChange={handleBuildChange}
            dict={dict}
            lang={lang}
          />
        )}
      </div>

      {/* ⚖️ Step 2: Compare & Share (only appears after FPS is calculated) */}
      {historyReady ? (
        <FPSSavedHistory
          entries={savedHistory}
          storageAvailable={storageAvailable}
          dict={dict}
          lang={lang}
          onOpen={openSavedConfig}
          onRename={renameSavedEntry}
          onDelete={deleteSavedEntry}
          onClear={clearSavedHistory}
        />
      ) : (
        <div
          aria-hidden="true"
          className="mx-auto mt-8 h-40 max-w-4xl animate-pulse rounded-xl border border-slate-200/70 bg-slate-100/60 dark:border-slate-800/60 dark:bg-slate-900/40"
        />
      )}

      {currentBuild && (
        <section className="mx-auto mt-8 w-full max-w-4xl rounded-xl border border-slate-200 bg-card shadow-sm dark:border-slate-800">
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <BarChart3 className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                {dict?.fps_calculator?.organization?.more_analysis_title ?? 'More FPS analysis'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {dict?.fps_calculator?.organization?.more_analysis_description
                  ?? 'Explore performance in other games or compare this build with another configuration.'}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={extendedAnalysisExpanded}
              aria-controls="fps-extended-analysis-content"
              onClick={() => setExtendedAnalysisExpanded((expanded) => !expanded)}
            >
              <ChevronDown
                className={`mr-1.5 h-4 w-4 transition-transform ${extendedAnalysisExpanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
              {extendedAnalysisExpanded
                ? dict?.fps_calculator?.results_navigation?.collapse ?? 'Collapse'
                : dict?.fps_calculator?.results_navigation?.expand ?? 'Expand'}
            </button>
          </div>

          {extendedAnalysisExpanded && (
            <div
              id="fps-extended-analysis-content"
              className="space-y-6 border-t border-slate-200 p-4 dark:border-slate-800 sm:p-6"
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
        </section>
      )}
    </>
  );
}
