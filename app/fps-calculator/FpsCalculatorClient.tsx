"use client";

import { useState } from "react";
import { EnhancedFPSCalculator } from "@/components/calculators/enhanced-fps-calculator";
import FPSCompareAndShare from "@/components/calculators/FPS-Compare-And-Share";
import { InterlinkBox } from "@/components/ui/interlink-box";
import { FpsGuideContent } from "@/components/content/fps-guide-content";

export default function FpsCalculatorClient() {
  const [currentBuild, setCurrentBuild] = useState<{
    cpu: string;
    gpu: string;
    game: string;
    resolution: string;
    fps: number;
  } | null>(null);

  // 🔹 Schema for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "FPS Calculator - Estimate Your Gaming Performance",
        "url": "https://www.pcbuildcheck.com/fps-calculator",
        "description":
          "Free FPS Calculator to estimate average frames per second for your CPU and GPU setup across popular games.",
        "publisher": {
          "@type": "Organization",
          "name": "PC Performance Calculator",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.pcbuildcheck.com/logo.png",
          },
        },
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "FPS Calculator",
          "operatingSystem": "Windows, Linux, macOS",
          "applicationCategory": "UtilityApplication",
          "description":
            "Estimate average frames per second (FPS) for your CPU and GPU combination based on benchmark data.",
          "url": "https://www.pcbuildcheck.com/fps-calculator",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pcbuildcheck.com/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "FPS Calculator",
            "item": "https://www.pcbuildcheck.com/fps-calculator",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the FPS calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "The FPS calculator uses a database of component benchmarks and game optimization data to estimate average frames per second you can expect with your selected CPU and GPU combination.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Why is my actual FPS different from the calculator’s estimate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Real-world FPS can vary due to drivers, cooling, RAM speed, background processes, and specific in-game settings. The calculator provides a baseline estimate for most users.",
            },
          },
          {
            "@type": "Question",
            "name": "Can I use the FPS calculator for future games?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "While the calculator is based on current benchmark data, it can give a rough idea for upcoming titles. However, new game engines and updates may cause performance to differ.",
            },
          },
          {
            "@type": "Question",
            "name": "Does resolution and graphics settings affect FPS results?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. Running games at higher resolutions (1440p, 4K) or ultra settings requires more GPU power, which lowers FPS compared to playing at 1080p or medium settings.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="py-8 px-4">
      {/* ✅ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            FPS Estimator Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estimate your average Frames Per Second (FPS) in popular games.
          </p>
        </div>

        {/* 🧮 Step 1: Main Calculator */}
        <EnhancedFPSCalculator onBuildChange={setCurrentBuild} />

        {/* ⚖️ Step 2: Compare & Share (only appears after FPS is calculated) */}
        {currentBuild && (
          <FPSCompareAndShare
            currentCPU={currentBuild.cpu}
            currentGPU={currentBuild.gpu}
            currentGame={currentBuild.game}
            currentResolution={currentBuild.resolution}
          />
        )}

        {/* 🧭 Guides and Internal Links */}
        <FpsGuideContent />
        <InterlinkBox
          title="Is your FPS lower than expected?"
          description="Your hardware balance could be the issue. A system bottleneck can prevent your components from reaching their full potential."
          href="/"
          linkText="Analyze with our Bottleneck Calculator →"
          variant="accent"
        />

        {/* FAQ Section */}
        <section className="prose prose-slate dark:prose-invert max-w-none relative prose-headings:font-semibold prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
          <header className="relative mb-8 p-8 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-900/20 dark:to-pink-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-pink-100/50 dark:from-indigo-800/30 dark:to-pink-800/30 rounded-full -ml-16 -mt-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-pink-100/50 to-indigo-100/50 dark:from-pink-800/30 dark:to-indigo-800/30 rounded-full -mr-12 -mb-12"></div>
            <div className="relative text-center">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 dark:from-indigo-400 dark:to-pink-400 bg-clip-text leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Quick answers to common questions about estimating FPS and gaming performance.
              </p>
            </div>
          </header>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>How does the FPS calculator work?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                The FPS calculator uses a database of component benchmarks and game optimization data to estimate average frames per second you can expect with your selected CPU and GPU combination.
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Why is my actual FPS different from the calculator’s estimate?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Real-world FPS can vary due to factors like drivers, cooling, RAM speed, background processes, and specific in-game settings. The calculator provides a baseline estimate for most users.
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Can I use the FPS calculator for future games?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                While the calculator is based on current benchmark data, it can give a rough idea for upcoming titles. However, new game engines and updates may cause performance to differ.
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Does resolution and graphics settings affect FPS results?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes. Running games at higher resolutions (1440p, 4K) or ultra settings requires more GPU power, which lowers FPS compared to playing at 1080p or medium settings.
              </div>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
