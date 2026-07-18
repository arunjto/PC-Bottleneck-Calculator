import { Metadata } from 'next';
import EnhancedBottleneckCalculator from '@/components/calculators/enhanced-bottleneck-calculator';
import { UpdateBanner } from '@/components/ui/update-banner';
import { InterlinkBox } from '@/components/ui/interlink-box';
import { ContentGuide } from '@/components/content/content-guide';

import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';
import { getLocalizedPath } from '@/lib/path-translations';
import { getToolsPageCopy } from '@/lib/tools-page-i18n';
import { JsonLd } from '@/components/seo/json-ld';
import { createBreadcrumbSchema, createFaqSchema, createSchemaGraph, createWebApplicationSchema, createWebPageSchema, SITE_URL } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const alternates = constructMetadataAlternates(lang);
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
    alternates,
    openGraph: {
      title: dict.common.title,
      description: dict.common.description,
      url: alternates.canonical,
      images: [`${SITE_URL}/og-image.png`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.common.title,
      description: dict.common.description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const toolsCopy = getToolsPageCopy(lang);
  const pageUrl = `https://www.pcbuildcheck.com${getLocalizedPath(lang, '')}`;
  const schemaData = createSchemaGraph([
    createWebPageSchema({
      pageUrl,
      name: dict.common.title,
      description: dict.common.description,
      lang,
      image: `${SITE_URL}/og-image.png`,
      mainEntityId: `${pageUrl}#application`,
      hasPartId: `${pageUrl}#faq`,
    }),
    createWebApplicationSchema({
      pageUrl,
      name: dict.home.hero_title,
      description: dict.common.description,
      lang,
    }),
    createBreadcrumbSchema(pageUrl, [{ name: 'Home', url: pageUrl }]),
    createFaqSchema(pageUrl, dict.home.faqs),
  ]);

  return (
    <div className="py-8 px-4">
      <JsonLd data={schemaData} />

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
        <EnhancedBottleneckCalculator
          dict={{ calculator: dict.calculator, results: dict.results }}
        />

        {/* Below-the-fold: deferred rendering via content-visibility for mobile performance */}
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1200px' }}>
          <InterlinkBox
            title={dict.home.fps_promo_title}
            description={dict.home.fps_promo_desc}
            href={getLocalizedPath(lang, 'fps-calculator')}
            linkText={dict.home.fps_promo_link}
            variant="primary"
          />

          <div className="mt-6">
            <InterlinkBox
              title={toolsCopy.hubTitle}
              description={toolsCopy.hubDescription}
              href={`/${lang}/tools`}
              linkText={toolsCopy.viewAllTools}
              variant="accent"
            />
          </div>

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
    </div>
  );
}
