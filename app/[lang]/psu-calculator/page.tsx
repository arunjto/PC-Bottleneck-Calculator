import { Metadata } from 'next';
import EnhancedPSUCalculator from '@/components/calculators/enhanced-psu-calculator';
import { InterlinkBox } from '@/components/ui/interlink-box';
import { PsuContent } from '@/components/content/psu-guide-content';
import { CalculatorMethodology } from '@/components/content/calculator-methodology';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { getLocalizedPath } from '@/lib/path-translations';
import { createBreadcrumbSchema, createFaqSchema, createSchemaGraph, createWebApplicationSchema, createWebPageSchema, SITE_URL } from '@/lib/structured-data';
import { BookOpen, ChevronDown, FlaskConical } from 'lucide-react';

type Props = {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ cpu?: string | string[]; gpu?: string | string[] }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { lang } = await params;
  const query = await searchParams;
  const isPrefilledUrl = Object.values(query).some((value) =>
    Array.isArray(value) ? value.length > 0 : typeof value === 'string'
  );
  const dict = await getDictionary(lang);
  const pageUrl = constructMetadataAlternates(lang, '/psu-calculator').canonical;
  const socialImage = `${SITE_URL}/og-image.png`;

  return {
    title: dict.psu_page.title,
    description: dict.psu_page.description,
    keywords: [
      'PSU calculator',
      'power supply calculator',
      'PC wattage',
      'system power requirements'
    ],
    alternates: constructMetadataAlternates(lang, '/psu-calculator'),
    ...(isPrefilledUrl && {
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
      title: dict.psu_page.title,
      description: dict.psu_page.description,
      url: pageUrl,
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.psu_page.title,
      description: dict.psu_page.description,
      images: [socialImage],
    },
  };
}

export default async function PsuCalculatorPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const query = await searchParams;
  const dict = await getDictionary(lang);
  const t = dict.psu_page;
  const technical = dict.psu_calculator.technical;

  const pageUrl = `${SITE_URL}${getLocalizedPath(lang, '/psu-calculator')}`;
  const schemaData = createSchemaGraph([
    createWebPageSchema({
      pageUrl,
      name: t.title,
      description: t.description,
      lang,
      image: `${SITE_URL}/og-image.png`,
      mainEntityId: `${pageUrl}#application`,
      hasPartId: `${pageUrl}#faq`,
    }),
    createWebApplicationSchema({ pageUrl, name: t.title, description: t.description, lang }),
    createBreadcrumbSchema(pageUrl, [
      { name: 'Home', url: `${SITE_URL}/${lang}` },
      { name: t.title, url: pageUrl },
    ]),
    createFaqSchema(pageUrl, t.faqs),
  ]);

  return (
    <div className="py-8 px-4">
      {/* ✅ Schema JSON-LD */}
      <JsonLd data={schemaData} />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {t.hero_title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.hero_subtitle}
          </p>
        </div>

        <EnhancedPSUCalculator
          dict={dict}
          initialSelection={{
            cpu: typeof query.cpu === 'string' ? query.cpu : undefined,
            gpu: typeof query.gpu === 'string' ? query.gpu : undefined,
          }}
        />
        <details className="group overflow-hidden rounded-xl border bg-card shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
            <div className="flex items-start gap-3">
              <FlaskConical className="mt-0.5 h-6 w-6 flex-none text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold">{technical.methodology_title}</h2>
                <p className="mt-1 text-sm font-normal text-muted-foreground">{technical.methodology_subtitle}</p>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 flex-none text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t p-4 md:p-6">
            <CalculatorMethodology lang={lang} variant="psu" />
          </div>
        </details>

        <details className="group overflow-hidden rounded-xl border bg-card shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 h-6 w-6 flex-none text-violet-600" />
              <div>
                <h2 className="text-xl font-semibold">{technical.guide_title}</h2>
                <p className="mt-1 text-sm font-normal text-muted-foreground">{technical.guide_subtitle}</p>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 flex-none text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t p-4 md:p-6">
            <PsuContent dict={dict.psu_guide} />
          </div>
        </details>

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
