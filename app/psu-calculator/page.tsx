import { Metadata } from 'next';
import {EnhancedPSUCalculator} from '@/components/calculators/enhanced-psu-calculator'
import { PsuCalculator } from '@/components/calculators/psu-calculator';
import { InterlinkBox } from '@/components/ui/interlink-box';
import { PsuContent } from '@/components/content/psu-guide-content';

export const metadata: Metadata = {
  title: 'PSU Wattage Calculator - Power Your PC Build',
  description:
    'Calculate the recommended power supply (PSU) wattage for your PC build. Select your CPU and GPU to get an estimated load and a safe PSU recommendation.',
  keywords: [
    'PSU calculator',
    'power supply calculator',
    'PC wattage',
    'system power requirements'
  ],
  alternates: {
    canonical: 'https://www.pcbuildcheck.com/psu-calculator',
  },
};

export default function PsuCalculatorPage() {
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
        // "sameAs": ["https://twitter.com/yourbrand","https://www.youtube.com/@yourbrand"]
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
        "@id": "https://www.pcbuildcheck.com/psu-calculator/#webpage",
        "url": "https://www.pcbuildcheck.com/psu-calculator",
        "name": "PSU Calculator - Find the Right Power Supply for Your PC",
        "description": "Free PSU Calculator to estimate the ideal power supply wattage for your PC build. Avoid crashes and ensure stable performance by choosing the right PSU.",
        "isPartOf": { "@id": "https://www.pcbuildcheck.com/#website" },
        "publisher": { "@id": "https://www.pcbuildcheck.com/#org" },
        "inLanguage": "en",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.pcbuildcheck.com/og-image-psu.png"
        },
        "datePublished": "2025-10-01",
        "dateModified": "2025-11-06",
        "breadcrumb": { "@id": "https://www.pcbuildcheck.com/psu-calculator/#breadcrumbs" },
        "mainEntity": { "@id": "https://www.pcbuildcheck.com/psu-calculator/#app" },
        "hasPart": { "@id": "https://www.pcbuildcheck.com/psu-calculator/#faq" }
      },
      {
        "@type": "WebApplication",
        "@id": "https://www.pcbuildcheck.com/psu-calculator/#app",
        "name": "PSU Calculator",
        "url": "https://www.pcbuildcheck.com/psu-calculator",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Windows, Linux, macOS",
        "isAccessibleForFree": true,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Estimate recommended PSU wattage based on your CPU, GPU, RAM, and other PC components with built-in safety margins."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.pcbuildcheck.com/psu-calculator/#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.pcbuildcheck.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "PSU Calculator",
            "item": "https://www.pcbuildcheck.com/psu-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.pcbuildcheck.com/psu-calculator/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the PSU calculator determine the required wattage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The PSU calculator estimates wattage by analyzing your CPU, GPU, RAM, storage devices, cooling system, and additional components. It also adds a recommended safety margin for stability and future upgrades."
            }
          },
          {
            "@type": "Question",
            "name": "Is it bad to use a PSU with much higher wattage than needed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. A higher-wattage PSU won’t damage your PC — it simply provides extra headroom. Your system only draws what it needs. For best efficiency, aim for 50–70% load utilization."
            }
          },
          {
            "@type": "Question",
            "name": "Does PSU efficiency (80 Plus rating) affect gaming performance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PSU efficiency ratings don’t directly affect FPS. Instead, they show how much power is wasted as heat. A higher efficiency PSU reduces electricity use and helps keep your PC cooler."
            }
          },
          {
            "@type": "Question",
            "name": "Can undervaluing PSU wattage cause hardware damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Using an underpowered PSU may cause crashes, boot failures, or stress components over time. The PSU calculator helps prevent this by recommending the correct wattage for your build."
            }
          }
        ]
      }
    ]
  };
  // Render in <Head>:
  // <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

  return (
    <div className="py-8 px-4">
      {/* ✅ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            PSU Wattage Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ensure your PC has enough power. Select your core components to get a recommended PSU wattage.
          </p>
        </div>

        <EnhancedPSUCalculator />
        <PsuContent />

        <InterlinkBox
          title="Got your power sorted?"
          description="Now, make sure your CPU and GPU are a balanced match for peak performance. An unbalanced system can waste your hardware's potential."
          href="/"
          linkText="Check for Bottlenecks →"
          variant="primary"
        />

        {/* FAQ Section */}
        <section className="prose prose-slate dark:prose-invert max-w-none relative prose-headings:font-semibold prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
          <header className="relative mb-8 p-8 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-900/20 dark:to-pink-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-pink-100/50 dark:from-indigo-800/30 dark:to-pink-800/30 rounded-full -ml-16 -mt-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-pink-100/50 to-indigo-100/50 dark:from-pink-800/30 dark:to-pink-800/30 rounded-full -mr-12 -mb-12"></div>
            <div className="relative text-center">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 dark:from-indigo-400 dark:to-pink-400 bg-clip-text leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Quick answers to common questions about choosing the right PSU for your gaming PC.
              </p>
            </div>
          </header>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>How does the PSU calculator determine the required wattage?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                The PSU calculator estimates wattage by analyzing your CPU, GPU, RAM, storage devices, cooling system, and additional components. It also adds a recommended safety margin for stability and future upgrades.
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Is it bad to use a PSU with much higher wattage than needed?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                No. A higher-wattage PSU won’t damage your PC — it simply provides extra headroom. Your system only draws what it needs. For best efficiency, aim for 50–70% load utilization.
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Does PSU efficiency (80 Plus rating) affect gaming performance?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                PSU efficiency ratings don’t directly affect FPS. Instead, they show how much power is wasted as heat. A higher efficiency PSU reduces electricity use and helps keep your PC cooler.
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                <span>Can undervaluing PSU wattage cause hardware damage?</span>
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes. Using an underpowered PSU may cause crashes, boot failures, or stress components over time. The PSU calculator helps prevent this by recommending the correct wattage for your build.
              </div>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
