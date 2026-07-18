import { Metadata } from "next";
import FpsCalculatorClient from "./FpsCalculatorClient";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { constructMetadataAlternates } from "@/lib/seo";
import { FpsGuideContent } from "@/components/content/fps-guide-content";
import { FAQSection } from "@/components/faq/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocalizedPath } from "@/lib/path-translations";
import { createBreadcrumbSchema, createFaqSchema, createSchemaGraph, createWebApplicationSchema, createWebPageSchema, SITE_URL } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.fps.title;
  const pageUrl = constructMetadataAlternates(lang, '/fps-calculator').canonical;
  return {
    title,
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
      title,
      description: dict.fps.subtitle,
      url: pageUrl,
      images: ['https://www.pcbuildcheck.com/og-image-fps.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: dict.fps.subtitle,
      images: ['https://www.pcbuildcheck.com/og-image-fps.png'],
    },
  };
}

export default async function FpsCalculatorPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const pageUrl = `${SITE_URL}${getLocalizedPath(lang, '/fps-calculator')}`;
  const schemaData = createSchemaGraph([
    createWebPageSchema({
      pageUrl,
      name: dict.fps.title,
      description: dict.fps.subtitle,
      lang,
      image: `${SITE_URL}/og-image-fps.png`,
      mainEntityId: `${pageUrl}#application`,
      hasPartId: `${pageUrl}#faq`,
    }),
    createWebApplicationSchema({ pageUrl, name: dict.fps.title, description: dict.fps.subtitle, lang }),
    createBreadcrumbSchema(pageUrl, [
      { name: 'Home', url: `${SITE_URL}/${lang}` },
      { name: dict.fps.title, url: pageUrl },
    ]),
    createFaqSchema(pageUrl, dict.fps.faqs),
  ]);

  return (
    <>
      <JsonLd data={schemaData} />
      <div className="overflow-x-clip py-8 px-4">
        <header className="mx-auto mb-8 max-w-4xl space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{dict.fps.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{dict.fps.subtitle}</p>
        </header>
        <FpsCalculatorClient dict={dict} lang={lang} />
      </div>
      {/* Below-the-fold content: deferred rendering on mobile */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 900px' }}>
        <div className="max-w-7xl mx-auto py-8 px-4">
          <FpsGuideContent dict={dict} />
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <FAQSection title={dict.fps.faq_title} items={dict.fps.faqs} />
        </div>
      </div>
    </>
  );
}
