import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { InterlinkBox } from '@/components/ui/interlink-box';
import { PsuContent } from '@/components/content/psu-guide-content';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';

// Dynamically import EnhancedPSUCalculator
const EnhancedPSUCalculator = dynamic(
  () => import('@/components/calculators/enhanced-psu-calculator'),
  {
    loading: () => (
      <div className="w-full max-w-4xl mx-auto h-[500px] bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
        </div>
      </div>
    ),
    ssr: false // Client-side interactive component
  }
);

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  return {
    title: dict.psu_page.title,
    description: dict.psu_page.description,
    keywords: [
      'PSU calculator',
      'power supply calculator',
      'PC wattage',
      'system power requirements'
    ],
    alternates: constructMetadataAlternates(params.lang, '/psu-calculator'),
    openGraph: {
      title: dict.psu_page.title,
      description: dict.psu_page.description,
      url: `https://www.pcbuildcheck.com/${params.lang}/psu-calculator`,
      type: 'website',
      images: ['https://www.pcbuildcheck.com/og-image-psu.png'],
    },
  };
}

export default async function PsuCalculatorPage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);
  const t = dict.psu_page;

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
        "@id": `https://www.pcbuildcheck.com/${lang}/psu-calculator/#webpage`,
        "url": `https://www.pcbuildcheck.com/${lang}/psu-calculator`,
        "name": t.title,
        "description": t.description,
        "isPartOf": { "@id": "https://www.pcbuildcheck.com/#website" },
        "publisher": { "@id": "https://www.pcbuildcheck.com/#org" },
        "inLanguage": lang,
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.pcbuildcheck.com/og-image-psu.png"
        },
        "datePublished": "2025-10-01",
        "dateModified": "2025-11-06",
        "breadcrumb": { "@id": `https://www.pcbuildcheck.com/${lang}/psu-calculator/#breadcrumbs` },
        "mainEntity": { "@id": `https://www.pcbuildcheck.com/${lang}/psu-calculator/#app` },
        "hasPart": { "@id": `https://www.pcbuildcheck.com/${lang}/psu-calculator/#faq` }
      },
      {
        "@type": "WebApplication",
        "@id": `https://www.pcbuildcheck.com/${lang}/psu-calculator/#app`,
        "name": "PSU Calculator",
        "url": `https://www.pcbuildcheck.com/${lang}/psu-calculator`,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Windows, Linux, macOS",
        "isAccessibleForFree": true,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": t.description
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.pcbuildcheck.com/${lang}/psu-calculator/#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `https://www.pcbuildcheck.com/${lang}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "PSU Calculator",
            "item": `https://www.pcbuildcheck.com/${lang}/psu-calculator`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://www.pcbuildcheck.com/${lang}/psu-calculator/#faq`,
        "mainEntity": t.faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
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
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {t.hero_title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.hero_subtitle}
          </p>
        </div>

        <EnhancedPSUCalculator dict={dict} />
        <PsuContent dict={dict.psu_guide} />

        <InterlinkBox
          title={t.interlink_title}
          description={t.interlink_desc}
          href={`/${lang}`}
          linkText={t.interlink_btn}
          variant="primary"
        />

        {/* FAQ Section */}
        <section className="prose prose-slate dark:prose-invert max-w-none relative prose-headings:font-semibold prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
          <header className="relative mb-8 p-8 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-900/20 dark:to-pink-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-pink-100/50 dark:from-indigo-800/30 dark:to-pink-800/30 rounded-full -ml-16 -mt-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-pink-100/50 to-indigo-100/50 dark:from-pink-800/30 dark:to-pink-800/30 rounded-full -mr-12 -mb-12"></div>
            <div className="relative text-center">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-700 to-pink-700 dark:from-indigo-400 dark:to-pink-400 bg-clip-text leading-tight">
                {t.faq_title}
              </h2>
              <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                {t.faq_subtitle}
              </p>
            </div>
          </header>

          <div className="space-y-4">
            {t.faqs.map((faq: any, index: number) => (
              <details key={index} className="group bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer px-6 py-4 font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
