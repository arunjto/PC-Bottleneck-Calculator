import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowRight, BookOpenCheck, Calculator, CheckCircle2, SquareFunction } from 'lucide-react';
import { i18n, type Locale } from '@/i18n-config';
import { allCPUs, allGPUs, allGames } from '@/lib/hardware-database';
import {
  TOOL_SLUGS,
  getTool,
  getToolContent,
  getToolPath,
  isToolSlug,
  type CoreToolSlug,
} from '@/lib/pc-tools';
import { getToolsPageCopy } from '@/lib/tools-page-i18n';
import { constructMetadataAlternates } from '@/lib/seo';
import { getLocalizedPath } from '@/lib/path-translations';
import { ToolCalculator, type ToolDatasets } from '@/components/tools/tool-calculator';

type PageParams = { lang: Locale; slug: string };

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) => TOOL_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isToolSlug(slug)) return {};
  const content = getToolContent(slug, lang);
  const path = '/tools/' + slug;
  const alternates = constructMetadataAlternates(lang, path);
  return {
    title: content.title,
    description: content.shortDescription,
    alternates,
    openGraph: {
      type: 'website',
      title: content.title,
      description: content.shortDescription,
      url: alternates.canonical,
    },
  };
}

function coreToolPath(lang: Locale, slug: CoreToolSlug) {
  return slug === 'bottleneck-calculator'
    ? getLocalizedPath(lang, '')
    : getLocalizedPath(lang, slug);
}

export default async function ToolPage({ params }: { params: Promise<PageParams> }) {
  const { lang, slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const content = getToolContent(tool.slug, lang);
  const copy = getToolsPageCopy(lang);
  const path = getToolPath(lang, tool.slug);
  const toolsPath = getLocalizedPath(lang, 'tools');
  const pageUrl = 'https://www.pcbuildcheck.com' + path;
  const data: ToolDatasets = {
    cpus: allCPUs.map((cpu) => ({ id: cpu.id, name: cpu.name, score: cpu.benchmarkScore, tdp: cpu.tdp, cores: cpu.cores })),
    gpus: allGPUs.map((gpu) => ({ id: gpu.id, name: gpu.name, score: gpu.benchmarkScore, tdp: gpu.tdp, vram: gpu.vram })),
    games: allGames.map((game) => ({
      id: game.id,
      name: game.name,
      cpuDemand: game.cpuDemand,
      gpuDemand: game.gpuDemand,
      ramRequirement: game.ramRequirement,
    })),
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl + '#webpage',
        url: pageUrl,
        name: content.title,
        description: content.shortDescription,
        inLanguage: lang,
        mainEntity: { '@id': pageUrl + '#app' },
        breadcrumb: { '@id': pageUrl + '#breadcrumbs' },
      },
      {
        '@type': 'WebApplication',
        '@id': pageUrl + '#app',
        name: content.title,
        url: pageUrl,
        description: content.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': pageUrl + '#breadcrumbs',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: copy.home, item: 'https://www.pcbuildcheck.com/' + lang },
          { '@type': 'ListItem', position: 2, name: copy.tools, item: 'https://www.pcbuildcheck.com' + toolsPath },
          { '@type': 'ListItem', position: 3, name: content.title, item: pageUrl },
        ],
      },
    ],
  };

  const related = tool.related.map((relatedSlug) => {
    if (isToolSlug(relatedSlug)) {
      const relatedContent = getToolContent(relatedSlug, lang);
      return { slug: relatedSlug, href: getToolPath(lang, relatedSlug), title: relatedContent.title, description: relatedContent.shortDescription };
    }
    const core = relatedSlug as CoreToolSlug;
    const coreContent = core === 'bottleneck-calculator'
      ? copy.coreTools.bottleneck
      : core === 'fps-calculator'
        ? copy.coreTools.fps
        : copy.coreTools.psu;
    return { slug: core, href: coreToolPath(lang, core), title: coreContent.title, description: coreContent.description };
  });

  return (
    <div className="px-4 py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="mx-auto max-w-6xl space-y-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href={getLocalizedPath(lang, '')} className="hover:text-primary hover:underline">{copy.home}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={toolsPath} className="hover:text-primary hover:underline">{copy.tools}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-foreground">{content.title}</li>
          </ol>
        </nav>

        <header className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            <Calculator className="h-4 w-4" aria-hidden="true" />
            {copy.categories[tool.category].title}
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{content.title}</h1>
          <p className="text-xl leading-8 text-muted-foreground">{content.description}</p>
        </header>

        <section aria-label={content.title}>
          <ToolCalculator slug={tool.slug} lang={lang} data={data} />
        </section>

        <section aria-labelledby="result-meaning" className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 dark:border-blue-900 dark:bg-blue-950/20">
          <h2 id="result-meaning" className="flex items-center gap-2 text-2xl font-semibold">
            <BookOpenCheck className="h-6 w-6 text-blue-600" aria-hidden="true" />
            {copy.resultMeaning}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">{content.resultGuide}</p>
        </section>

        <section id="methodology" aria-labelledby="methodology-title" className="scroll-mt-20 space-y-6">
          <header className="space-y-3">
            <h2 id="methodology-title" className="text-3xl font-semibold">{copy.methodology}</h2>
            <p className="max-w-4xl leading-7 text-muted-foreground">{content.methodologyOverview}</p>
            <p className="text-sm text-muted-foreground">{copy.methodologyIntro}</p>
          </header>

          <div className="grid gap-5 lg:grid-cols-3">
            <section className="rounded-2xl border bg-card p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <SquareFunction className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                {copy.formula}
              </h3>
              <p className="mt-4 break-words rounded-lg bg-muted p-4 font-mono text-sm leading-6">{tool.formula}</p>
            </section>
            <section className="rounded-2xl border bg-card p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                {copy.calculationSteps}
              </h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                {content.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </section>
            <section className="rounded-2xl border border-amber-300/70 bg-amber-50/60 p-6 dark:bg-amber-950/20">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />
                {copy.limitations}
              </h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                {content.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
              </ul>
            </section>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-muted-foreground">{copy.reviewed}</span>
            <Link href={getLocalizedPath(lang, 'methodology')} className="font-semibold text-primary hover:underline">
              {copy.methodology}<span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>

        <section aria-labelledby="related-tools-title" className="border-t pt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="related-tools-title" className="text-3xl font-semibold">{copy.relatedTools}</h2>
              <p className="mt-2 text-muted-foreground">{copy.relatedDescription}</p>
            </div>
            <Link href={toolsPath} className="font-semibold text-primary hover:underline">{copy.viewAllTools}</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={item.href} className="group rounded-2xl border bg-card p-5 transition hover:border-primary/50 hover:shadow-sm">
                <h3 className="font-semibold group-hover:text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {copy.openTool}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
