import { Metadata } from "next";
import FpsCalculatorClient from "./FpsCalculatorClient";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { constructMetadataAlternates } from "@/lib/seo";

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
      images: ['https://www.pcbuildcheck.com/og-image-fps.png'], // Ensure you have this image or use default
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
