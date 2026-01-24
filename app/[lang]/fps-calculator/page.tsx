import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { constructMetadataAlternates } from "@/lib/seo";

// Dynamically import FpsCalculatorClient
const FpsCalculatorClient = dynamic(
  () => import("./FpsCalculatorClient"),
  {
    loading: () => (
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mx-auto animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded mx-auto animate-pulse" />
          </div>
          <div className="h-[600px] w-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading Calculator...</div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
);

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  return {
    title: `${dict.fps.title} | PCBuildCheck`,
    description: dict.fps.subtitle,
    keywords: [
      "FPS calculator",
      "FPS estimator",
      "PC Builds fps calculator",
      "gaming performance predictor",
      "frame rate calculator",
      "PC FPS benchmark"
    ],
    alternates: constructMetadataAlternates(lang, '/fps-calculator'),
    openGraph: {
      title: `${dict.fps.title} | PCBuildCheck`,
      description: dict.fps.subtitle,
      url: `https://www.pcbuildcheck.com/${lang}/fps-calculator`,
      images: ['https://www.pcbuildcheck.com/og-image-fps.png'],
      type: 'website',
    },
  };
}

export default async function FpsCalculatorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FPS Calculator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": dict.fps.subtitle
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": "FPS Calculator",
        "item": `https://www.pcbuildcheck.com/${lang}/fps-calculator`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schemaData, breadcrumbSchema]) }}
      />
      <FpsCalculatorClient dict={dict} lang={lang} />
    </>
  );
}
