import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, Gamepad2, Zap } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config';
import { JsonLd } from '@/components/seo/json-ld';
import { PopularBuilds } from '@/components/content/popular-builds';
import { getPlanningDiscoveryCopy } from '@/lib/planning-discovery-i18n';
import { getLocalizedPath } from '@/lib/path-translations';
import { POPULAR_BUILDS, getPopularBuildAnalysis } from '@/lib/popular-builds';
import { createBreadcrumbSchema, createItemListSchema, createSchemaGraph, createWebPageSchema, SITE_URL } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const copy = getPlanningDiscoveryCopy(lang);
  const pageUrl = `${SITE_URL}/${lang}/builds`;
  const languages = Object.fromEntries([
    ...i18n.locales.map((locale) => [locale, `${SITE_URL}/${locale}/builds`]),
    ['x-default', `${SITE_URL}/en/builds`],
  ]);
  return {
    title: copy.buildsHubTitle,
    description: copy.buildsHubDescription,
    alternates: { canonical: pageUrl, languages },
    openGraph: { type: 'website', url: pageUrl, title: copy.buildsHubTitle, description: copy.buildsHubDescription },
  };
}

export default async function BuildsHubPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = getPlanningDiscoveryCopy(lang);
  const pageUrl = `${SITE_URL}/${lang}/builds`;
  const schema = createSchemaGraph([
    createWebPageSchema({ pageUrl, name: copy.buildsHubTitle, description: copy.buildsHubDescription, lang }),
    createBreadcrumbSchema(pageUrl, [
      { name: copy.home, url: `${SITE_URL}/${lang}` },
      { name: copy.buildsHubTitle, url: pageUrl },
    ]),
    createItemListSchema(pageUrl, copy.buildsTitle, POPULAR_BUILDS.map((build) => {
      const { cpu, gpu } = getPopularBuildAnalysis(build);
      return { name: `${cpu.name} + ${gpu.name}`, url: `${SITE_URL}/${lang}/builds/${build.slug}` };
    })),
  ]);
  const nextSteps = [
    { href: getLocalizedPath(lang, ''), label: copy.home, icon: Calculator },
    { href: getLocalizedPath(lang, 'fps-calculator'), label: 'FPS Calculator', icon: Gamepad2 },
    { href: getLocalizedPath(lang, 'psu-calculator'), label: 'PSU Calculator', icon: Zap },
  ];

  return (
    <main className="px-4 py-10">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-5xl space-y-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href={getLocalizedPath(lang, '')} className="hover:text-primary hover:underline">{copy.home}</Link>
          <span className="mx-2" aria-hidden="true">/</span><span aria-current="page">{copy.buildsTitle}</span>
        </nav>
        <header className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">{copy.eyebrow}</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{copy.buildsHubTitle}</h1>
          <p className="text-xl leading-8 text-muted-foreground">{copy.buildsHubDescription}</p>
          <p className="leading-7 text-muted-foreground">{copy.buildsHubIntro}</p>
        </header>
        <PopularBuilds lang={lang} />
        <section aria-labelledby="build-next-steps" className="rounded-2xl border bg-muted/30 p-6 md:p-8">
          <h2 id="build-next-steps" className="text-2xl font-bold">{copy.nextStepTitle}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{copy.nextStepIntro}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {nextSteps.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="group flex items-center justify-between rounded-xl border bg-background p-4 font-semibold transition hover:border-primary">
                <span className="flex items-center gap-2"><Icon className="h-5 w-5 text-primary" aria-hidden="true" />{label}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
