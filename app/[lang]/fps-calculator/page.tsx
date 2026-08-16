import { Metadata } from "next";
import Link from "next/link";
import FpsCalculatorClient from "./FpsCalculatorClient";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { constructMetadataAlternates } from "@/lib/seo";
import { FpsGuideContent } from "@/components/content/fps-guide-content";
import { CalculatorMethodology } from "@/components/content/calculator-methodology";
import { FAQSection } from "@/components/faq/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocalizedPath } from "@/lib/path-translations";
import { createBreadcrumbSchema, createFaqSchema, createSchemaGraph, createWebApplicationSchema, createWebPageSchema, SITE_URL } from "@/lib/structured-data";
import { BookOpen, Calculator, ChevronDown, CircleHelp } from "lucide-react";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  const query = await searchParams;
  const isPrefilledResult = Array.isArray(query.fps)
    ? query.fps.includes('1')
    : query.fps === '1';
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
    ...(isPrefilledResult && {
      robots: {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
        },
      },
    }),
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
        <div className="mx-auto mt-8 max-w-4xl">
          <details className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-card shadow-sm dark:border-slate-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [&::-webkit-details-marker]:hidden sm:p-6">
              <span className="flex items-center gap-3 text-lg font-semibold">
                <Calculator className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                {dict.fps_calculator.share_result.methodology}
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="border-t border-slate-200/80 p-4 dark:border-slate-800 sm:p-6">
              <CalculatorMethodology lang={lang} variant="fps" />
              {lang === 'en' && (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Want to validate the estimate on your own PC?{' '}
                  <Link
                    href="/en/blog/how-to-check-fps-on-pc"
                    className="font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Follow the step-by-step guide to checking FPS in Windows games.
                  </Link>
                </p>
              )}
            </div>
          </details>
        </div>
      </div>
      {/* Below-the-fold content: deferred rendering on mobile */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 900px' }}>
        <div className="max-w-7xl mx-auto py-8 px-4">
          <details className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-card shadow-sm dark:border-slate-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [&::-webkit-details-marker]:hidden sm:p-6">
              <span className="flex items-center gap-3 text-lg font-semibold">
                <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
                {dict.fps_guide.title}
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="border-t border-slate-200/80 p-4 dark:border-slate-800 sm:p-6">
              <FpsGuideContent dict={dict} />
            </div>
          </details>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <details className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-card shadow-sm dark:border-slate-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [&::-webkit-details-marker]:hidden sm:p-6">
              <span className="flex items-center gap-3 text-lg font-semibold">
                <CircleHelp className="h-5 w-5 text-cyan-600" aria-hidden="true" />
                {dict.fps.faq_title}
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="border-t border-slate-200/80 p-4 dark:border-slate-800 sm:p-6">
              <FAQSection title={dict.fps.faq_title} items={dict.fps.faqs} />
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
