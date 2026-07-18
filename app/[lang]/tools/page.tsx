import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Gauge, HardDrive, MemoryStick, Wrench } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { TOOLS, TOOL_SLUGS, getToolContent, getToolPath, type ToolCategory } from '@/lib/pc-tools';
import { getToolsPageCopy } from '@/lib/tools-page-i18n';
import { constructMetadataAlternates } from '@/lib/seo';
import { getLocalizedPath } from '@/lib/path-translations';

const CATEGORY_ORDER: ToolCategory[] = ['upgrade', 'performance', 'memory', 'storage'];
const CATEGORY_ICONS = {
  upgrade: Wrench,
  performance: Gauge,
  memory: MemoryStick,
  storage: HardDrive,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const copy = getToolsPageCopy(lang);
  const alternates = constructMetadataAlternates(lang, '/tools');
  return {
    title: copy.hubTitle,
    description: copy.hubDescription,
    alternates,
    openGraph: {
      type: 'website',
      title: copy.hubTitle,
      description: copy.hubDescription,
      url: alternates.canonical,
    },
  };
}

export default async function ToolsHubPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = getToolsPageCopy(lang);
  const pageUrl = 'https://www.pcbuildcheck.com/' + lang + '/tools';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageUrl + '#webpage',
        url: pageUrl,
        name: copy.hubTitle,
        description: copy.hubDescription,
        inLanguage: lang,
        mainEntity: { '@id': pageUrl + '#tools' },
      },
      {
        '@type': 'ItemList',
        '@id': pageUrl + '#tools',
        numberOfItems: TOOL_SLUGS.length,
        itemListElement: TOOL_SLUGS.map((slug, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: getToolContent(slug, lang).title,
          url: 'https://www.pcbuildcheck.com' + getToolPath(lang, slug),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: copy.home, item: 'https://www.pcbuildcheck.com/' + lang },
          { '@type': 'ListItem', position: 2, name: copy.tools, item: pageUrl },
        ],
      },
    ],
  };

  const coreTools = [
    { href: getLocalizedPath(lang, ''), title: copy.coreTools.bottleneck.title, description: copy.coreTools.bottleneck.description },
    { href: getLocalizedPath(lang, 'fps-calculator'), title: copy.coreTools.fps.title, description: copy.coreTools.fps.description },
    { href: getLocalizedPath(lang, 'psu-calculator'), title: copy.coreTools.psu.title, description: copy.coreTools.psu.description },
  ];

  return (
    <div className="px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-6xl space-y-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href={getLocalizedPath(lang, '')} className="hover:text-primary hover:underline">{copy.home}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-foreground">{copy.tools}</li>
          </ol>
        </nav>

        <header className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Cpu className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{copy.hubTitle}</h1>
          <p className="text-xl leading-8 text-muted-foreground">{copy.hubDescription}</p>
          <p className="leading-7 text-muted-foreground">{copy.hubIntro}</p>
        </header>

        {CATEGORY_ORDER.map((category) => {
          const categoryCopy = copy.categories[category];
          const CategoryIcon = CATEGORY_ICONS[category];
          const tools = TOOL_SLUGS.filter((slug) => TOOLS[slug].category === category);
          return (
            <section key={category} aria-labelledby={'category-' + category} className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 id={'category-' + category} className="text-2xl font-semibold">{categoryCopy.title}</h2>
                  <p className="mt-1 text-muted-foreground">{categoryCopy.description}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tools.map((slug) => {
                  const content = getToolContent(slug, lang);
                  return (
                    <article key={slug} className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                      <h3 className="text-xl font-semibold">{content.title}</h3>
                      <p className="mt-3 flex-1 leading-7 text-muted-foreground">{content.shortDescription}</p>
                      <Link href={getToolPath(lang, slug)} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                        {copy.openTool}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section aria-labelledby="core-tools-heading" className="rounded-2xl border bg-slate-50 p-6 dark:bg-slate-900/50 md:p-8">
          <h2 id="core-tools-heading" className="text-2xl font-semibold">{copy.coreHeading}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {coreTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="rounded-xl border bg-background p-5 transition hover:border-primary/50 hover:shadow-sm">
                <h3 className="font-semibold text-primary">{tool.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
