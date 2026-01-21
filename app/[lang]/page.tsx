import { Metadata } from 'next';
import { EnhancedBottleneckCalculator } from '@/components/calculators/enhanced-bottleneck-calculator';
import { UpdateBanner } from '@/components/ui/update-banner';
import { InterlinkBox } from '@/components/ui/interlink-box';
import { ContentGuide } from '@/components/content/content-guide';

import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';
import { getLocalizedPath } from '@/lib/path-translations';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  return {
    title: dict.common.title,
    description: dict.common.description,
    keywords: [
      'PC Bottleneck Calculator',
      'CPU GPU bottleneck',
      'gaming performance',
      'system optimization',
      'balanced PC build'
    ],
    alternates: constructMetadataAlternates(lang),
  };
}

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
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
        "inLanguage": lang
      },
      {
        "@type": "WebPage",
        "@id": "https://www.pcbuildcheck.com/#webpage",
        "url": "https://www.pcbuildcheck.com/",
        "name": dict.common.title,
        "isPartOf": { "@id": "https://www.pcbuildcheck.com/#website" },
        "publisher": { "@id": "https://www.pcbuildcheck.com/#org" },
        "description": dict.common.description,
        "inLanguage": lang,
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
            {dict.home.hero_title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {dict.home.hero_subtitle}
          </p>
          <p className="text-muted-foreground">
            {dict.home.select_components}
          </p>
        </div>

        <UpdateBanner dict={dict.home.update_banner} />
        <EnhancedBottleneckCalculator dict={dict} />

        <InterlinkBox
          title={dict.home.fps_promo_title}
          description={dict.home.fps_promo_desc}
          href={getLocalizedPath(lang, 'fps-calculator')}
          linkText={dict.home.fps_promo_link}
          variant="primary"
        />

        <ContentGuide dict={dict} />

        {/* FAQ Section */}
        <section className="prose prose-slate dark:prose-invert max-w-none relative prose-headings:font-semibold prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
          <header className="relative mb-8 p-8 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-900/20 dark:to-pink-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-pink-100/50 dark:from-indigo-800/30 dark:to-pink-800/30 rounded-full -ml-16 -mt-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-pink-100/50 to-indigo-100/50 dark:from-pink-800/30 dark:to-indigo-800/30 rounded-full -mr-12 -mb-12"></div>
            <div className="relative text-center">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 dark:from-indigo-400 dark:to-pink-400 bg-clip-text leading-tight">
                {dict.home.faq_title}
              </h2>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                {dict.home.faq_subtitle}
              </p>
            </div>
          </header>

          <div className="space-y-4">
            {dict.home.faqs?.map((faq: any, index: number) => (
              <details key={index} className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div
                  className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
