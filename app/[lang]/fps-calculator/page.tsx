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
import { BookOpen, Calculator, ChevronDown, CircleHelp, Cpu, Gamepad2 } from "lucide-react";

type Cs2SpotlightCopy = {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
  cpu_note_title: string;
  cpu_note: string;
  disclaimer: string;
  cta: string;
};

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
      images: [
        {
          url: 'https://www.pcbuildcheck.com/og-image-fps.png',
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'Gaming monitor showing an illustrative 240 FPS and frame-time analysis',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: dict.fps.subtitle,
      images: [
        {
          url: 'https://www.pcbuildcheck.com/og-image-fps.png',
          alt: 'Gaming monitor showing an illustrative 240 FPS and frame-time analysis',
        },
      ],
    },
  };
}

export default async function FpsCalculatorPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const cs2Spotlight = lang === 'ru'
    ? (dict.fps as { cs2_spotlight?: Cs2SpotlightCopy }).cs2_spotlight ?? null
    : null;

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
        <div id="fps-calculator" className="scroll-mt-20">
          <FpsCalculatorClient dict={dict} lang={lang} />
        </div>
        {cs2Spotlight && (
          <section
            aria-labelledby="cs2-fps-heading"
            className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-sm dark:border-cyan-900/70 dark:from-cyan-950/30 dark:to-blue-950/30"
          >
            <div className="p-5 sm:p-7">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
                <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                {cs2Spotlight.eyebrow}
              </p>
              <h2 id="cs2-fps-heading" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {cs2Spotlight.title}
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">{cs2Spotlight.description}</p>

              <ol className="mt-5 grid gap-3 sm:grid-cols-3">
                {cs2Spotlight.steps.map((step: string, index: number) => (
                  <li key={step} className="rounded-xl border border-cyan-200/80 bg-white/80 p-4 text-sm leading-6 dark:border-cyan-900/60 dark:bg-slate-950/50">
                    <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-700 font-bold text-white dark:bg-cyan-500 dark:text-slate-950">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="mt-5 rounded-xl border border-blue-200/80 bg-blue-100/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/40">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Cpu className="h-5 w-5 text-blue-700 dark:text-blue-300" aria-hidden="true" />
                  {cs2Spotlight.cpu_note_title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{cs2Spotlight.cpu_note}</p>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">{cs2Spotlight.disclaimer}</p>
              <a
                href="#fps-calculator"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-700 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-cyan-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
              >
                {cs2Spotlight.cta}
              </a>
            </div>
          </section>
        )}
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
              {lang === 'ru' && (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Хотите проверить расчёт на своём компьютере?{' '}
                  <Link
                    href="/ru/blog/kak-proverit-uzkoe-mesto-pk"
                    className="font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Следуйте пошаговому руководству по измерению FPS и поиску ограничений системы.
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
