import { Metadata } from 'next';
import { EnhancedBottleneckCalculator } from '@/components/calculators/enhanced-bottleneck-calculator';
import { UpdateBanner } from '@/components/ui/update-banner';
import { InterlinkBox } from '@/components/ui/interlink-box';
import { ContentGuide } from '@/components/content/content-guide';

export const metadata: Metadata = {
  title: 'Free PC Bottleneck Calculator - Instantly Find CPU & GPU Limits (2025)',
  description:
    'Use our free PC Bottleneck Calculator to analyze CPU and GPU performance, fix system bottlenecks, and build a balanced gaming PC for maximum FPS.',
  keywords: [
    'PC Bottleneck Calculator',
    'CPU GPU bottleneck',
    'gaming performance',
    'system optimization',
    'balanced PC build'
  ],
  alternates: {
    canonical: 'https://www.pcbuildcheck.com',
  },
};

export default function HomePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.pcbuildcheck.com/#org",
        "name": "PC Build Check",
        "url": "https://www.pcbuildcheck.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.pcbuildcheck.com/logo.png",
          "width": 512,
          "height": 512
        }
        // "sameAs": ["https://twitter.com/yourbrand","https://www.youtube.com/@yourbrand"] // add if real
      },
      {
        "@type": "WebSite",
        "@id": "https://www.pcbuildcheck.com/#website",
        "url": "https://www.pcbuildcheck.com/",
        "name": "PC Build Check",
        "publisher": { "@id": "https://www.pcbuildcheck.com/#org" },
        "inLanguage": "en"
      },
      {
        "@type": "WebPage",
        "@id": "https://www.pcbuildcheck.com/#webpage",
        "url": "https://www.pcbuildcheck.com/",
        "name": "Free PC Bottleneck Calculator - Instantly Find CPU & GPU Limits (2025)",
        "isPartOf": { "@id": "https://www.pcbuildcheck.com/#website" },
        "publisher": { "@id": "https://www.pcbuildcheck.com/#org" },
        "description": "Free PC Bottleneck Calculator to analyze CPU and GPU performance, fix bottlenecks, and build a balanced gaming PC.",
        "inLanguage": "en",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.pcbuildcheck.com/og-image.png"
        },
        "datePublished": "2025-10-01",
        "dateModified": "2025-11-06",
        "mainEntity": { "@id": "https://www.pcbuildcheck.com/#app" },
        "hasPart": { "@id": "https://www.pcbuildcheck.com/#faq" }
      },
      {
        "@type": "WebApplication",
        "@id": "https://www.pcbuildcheck.com/#app",
        "name": "PC Bottleneck Calculator",
        "url": "https://www.pcbuildcheck.com/",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "isAccessibleForFree": true,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Check CPU and GPU bottlenecks instantly for gaming and productivity."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pcbuildcheck.com/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pcbuildcheck.com/"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pcbuildcheck.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a PC bottleneck?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A PC bottleneck happens when one component limits the performance of the whole system. For example, even with a high-end GPU, a weaker CPU may prevent it from reaching full potential."
            }
          },
          {
            "@type": "Question",
            "name": "Is a CPU or GPU bottleneck worse?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For gaming, a mild GPU bottleneck is usually fine because it means your graphics card is working fully. A strong CPU bottleneck is worse, as it often causes stuttering and inconsistent frame rates."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the bottleneck calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our PC Bottleneck Calculator uses data-driven estimates to provide a highly reliable analysis. Still, real-world results can vary depending on games, applications, and driver updates."
            }
          },
          {
            "@type": "Question",
            "name": "Do RAM or storage also cause bottlenecks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Insufficient or slow RAM can cause stutters in heavy workloads. Similarly, using an HDD instead of an SSD will lead to slower loading times."
            }
          },
          {
            "@type": "Question",
            "name": "Should CPU and GPU both run at 100%?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ideally, your GPU should be close to full utilization for gaming. CPU usage will vary, and it’s not always ideal for it to hit 100%. If CPU is maxed out but GPU is underutilized, that’s a clear CPU bottleneck."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="py-8 px-4">
      {/* ✅ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            PC Bottleneck Calculator – Optimize Your PC Performance
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Instantly check your CPU and GPU balance with our advanced <strong>PC Bottleneck Calculator</strong>. 
            Pinpoint performance bottlenecks, prevent slowdowns, and build a powerful, balanced PC for gaming and productivity.
          </p>
          <p className="text-muted-foreground">
            Select your components to analyze your PC&apos;s performance balance in seconds.
          </p>
        </div>

        <UpdateBanner />
        <EnhancedBottleneckCalculator />

        <InterlinkBox
          title="Curious about gaming performance?"
          description="Estimate your average Frames Per Second in popular titles with our new tool."
          href="/fps-calculator"
          linkText="Try the FPS Estimator →"
          variant="primary"
        />

        <ContentGuide />

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
                Quick answers to common questions about PC bottlenecks and performance issues.
              </p>
            </div>
          </header>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>What is a PC bottleneck?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                A <strong>PC bottleneck</strong> happens when one component limits the performance of the whole system. 
                For example, even with a high-end GPU, a weaker CPU may prevent it from reaching full potential.
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Is a CPU or GPU bottleneck worse?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                For gaming, a mild <strong>GPU bottleneck</strong> is usually fine because it means your graphics card is working fully.  
                A strong <strong>CPU bottleneck</strong> is worse, as it often causes stuttering and inconsistent frame rates.
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>How accurate is the bottleneck calculator?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Our <strong>PC Bottleneck Calculator</strong> uses data-driven estimates to provide a highly reliable analysis.  
                Still, real-world results can vary depending on games, applications, and driver updates.
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Do RAM or storage also cause bottlenecks?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes. Insufficient or slow <strong>RAM</strong> can cause stutters in heavy workloads.  
                Similarly, using an <strong>HDD</strong> instead of an SSD will lead to slower loading times.
              </div>
            </details>

            {/* FAQ Item 5 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Should CPU and GPU both run at 100%?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Ideally, your <strong>GPU</strong> should be close to full utilization for gaming.  
                CPU usage will vary, and it’s not always ideal for it to hit 100%.  
                If CPU is maxed out but GPU is underutilized, that’s a clear CPU bottleneck.
              </div>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
