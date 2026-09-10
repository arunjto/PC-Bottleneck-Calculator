import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cpu, Database, Gamepad2, Gauge, SearchCheck, ShieldCheck, Sparkles } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { GameGuideDirectory } from '@/components/can-i-run/game-guide-directory';
import { JsonLd } from '@/components/seo/json-ld';
import { getCanIRunHubCopy, getGuideCards } from '@/lib/can-i-run';
import { allGames } from '@/lib/hardware-database';
import { serializeFPSShareConfig } from '@/lib/fps-share';
import { getLocalizedPath } from '@/lib/path-translations';
import { constructMetadataAlternates } from '@/lib/seo';
import { createBreadcrumbSchema, createFaqSchema, createSchemaGraph, ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from '@/lib/structured-data';

const DIRECTORY_LABELS: Record<Locale, {
  estimateFps: string; modelled: string; allCategories: string; recentTitle: string; showMore: string; showLess: string;
}> = {
  en: { estimateFps: 'Try a reference FPS estimate', modelled: 'Model profile', allCategories: 'All categories', recentTitle: 'Recently opened on this browser', showMore: 'Show more games', showLess: 'Show fewer games' },
  it: { estimateFps: 'Prova una stima FPS', modelled: 'Profilo modellato', allCategories: 'Tutte le categorie', recentTitle: 'Aperti di recente in questo browser', showMore: 'Mostra altri giochi', showLess: 'Mostra meno giochi' },
  fr: { estimateFps: 'Essayer une estimation FPS', modelled: 'Profil modélisé', allCategories: 'Toutes les catégories', recentTitle: 'Ouverts récemment dans ce navigateur', showMore: 'Afficher plus de jeux', showLess: 'Afficher moins de jeux' },
  de: { estimateFps: 'Referenz-FPS schätzen', modelled: 'Modellprofil', allCategories: 'Alle Kategorien', recentTitle: 'Zuletzt in diesem Browser geöffnet', showMore: 'Mehr Spiele anzeigen', showLess: 'Weniger Spiele anzeigen' },
  es: { estimateFps: 'Probar una estimación de FPS', modelled: 'Perfil modelado', allCategories: 'Todas las categorías', recentTitle: 'Abiertos recientemente en este navegador', showMore: 'Mostrar más juegos', showLess: 'Mostrar menos juegos' },
  ru: { estimateFps: 'Открыть пример расчёта FPS', modelled: 'Профиль модели', allCategories: 'Все категории', recentTitle: 'Недавно открытые в этом браузере', showMore: 'Показать больше игр', showLess: 'Показать меньше игр' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const copy = getCanIRunHubCopy(lang);
  const alternates = constructMetadataAlternates(lang, '/can-i-run');
  return {
    title: copy.title,
    description: copy.description,
    alternates,
    openGraph: { type: 'website', title: copy.title, description: copy.description, url: alternates.canonical },
  };
}

export default async function CanIRunHubPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = getCanIRunHubCopy(lang);
  const guides = getGuideCards(lang);
  const directoryLabels = DIRECTORY_LABELS[lang] ?? DIRECTORY_LABELS.en;
  const reviewedBySlug = new Map(guides.map((guide) => [guide.slug, guide]));
  const gameCards = [...allGames].sort((a, b) => {
    const aReviewed = reviewedBySlug.has(a.id as typeof guides[number]['slug']);
    const bReviewed = reviewedBySlug.has(b.id as typeof guides[number]['slug']);
    if (aReviewed !== bReviewed) return aReviewed ? -1 : 1;
    return a.name.localeCompare(b.name);
  }).map((game) => {
    const guide = reviewedBySlug.get(game.id as typeof guides[number]['slug']);
    const estimateParams = serializeFPSShareConfig({
      cpu: 'ryzen-5-5600X', gpu: 'rtx-4070', game: game.id, resolution: '1440p', ramSize: '16gb',
      ramSpeed: '3200', storage: 'nvme-ssd', quality: 'high', upscaling: 'off', refreshRate: '144hz', antiAliasing: 'fxaa',
    });
    return {
      id: game.id,
      name: game.name,
      summary: guide?.summary ?? `CPU: ${game.cpuDemand} · GPU: ${game.gpuDemand} · RAM: ${game.ramRequirement} GB · ${game.optimizations.join(', ') || 'Native rendering'}`,
      category: game.category,
      reviewed: Boolean(guide),
      href: guide
        ? getLocalizedPath(lang, `can-i-run/${guide.slug}`)
        : `${getLocalizedPath(lang, 'fps-calculator')}?${estimateParams.toString()}`,
    };
  });
  const pagePath = getLocalizedPath(lang, 'can-i-run');
  const pageUrl = `${SITE_URL}${pagePath}`;
  const schema = createSchemaGraph([
    {
      '@type': 'CollectionPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: copy.title,
      description: copy.description, inLanguage: lang, isPartOf: { '@id': WEBSITE_ID },
      publisher: { '@id': ORGANIZATION_ID }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      mainEntity: { '@id': `${pageUrl}#games` },
    },
    {
      '@type': 'ItemList', '@id': `${pageUrl}#games`, name: copy.directoryTitle,
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, index) => ({
        '@type': 'ListItem', position: index + 1, name: guide.name,
        url: `${SITE_URL}${getLocalizedPath(lang, `can-i-run/${guide.slug}`)}`,
      })),
    },
    createBreadcrumbSchema(pageUrl, [
      { name: copy.title, url: pageUrl },
    ]),
    createFaqSchema(pageUrl, copy.faqs),
  ]);

  return (
    <div className="px-4 py-10 sm:py-14">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="mx-auto max-w-4xl space-y-5 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
            <Gamepad2 className="h-4 w-4" aria-hidden="true" />{copy.eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">{copy.intro}</p>
          {lang === 'en' && <p className="mx-auto max-w-3xl text-sm leading-6 text-muted-foreground">Bookmark this hub: games you open are remembered on this browser, so you can return to the same checks without searching again.</p>}
        </header>

        {lang === 'en' && (
          <section aria-label="Can I Run It coverage" className="grid gap-4 sm:grid-cols-3">
            {[
              { value: String(allGames.length), label: 'searchable game profiles', icon: Database },
              { value: String(guides.length), label: 'source-reviewed guides live', icon: ShieldCheck },
              { value: '3', label: 'resolution targets per estimate', icon: Gauge },
            ].map((item) => <div key={item.label} className="rounded-2xl border bg-card p-5 text-center shadow-sm"><item.icon className="mx-auto h-6 w-6 text-primary" aria-hidden="true" /><p className="mt-2 text-3xl font-bold">{item.value}</p><p className="mt-1 text-sm text-muted-foreground">{item.label}</p></div>)}
          </section>
        )}

        {lang === 'en' && (
          <section aria-labelledby="choose-route" className="space-y-5">
            <div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Start with your question</p><h2 id="choose-route" className="mt-2 text-3xl font-bold">Choose the fastest route to a useful answer</h2></div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: ShieldCheck, title: 'Can I run one specific game?', body: 'Search below for a reviewed requirements guide or a supported modelling profile.', href: '#reviewed-games', cta: 'Search games' },
                { icon: Gauge, title: 'How many FPS could I get?', body: 'Use the full FPS calculator when you already know the exact CPU, GPU, settings and display target.', href: getLocalizedPath(lang, 'fps-calculator'), cta: 'Open FPS calculator' },
                { icon: Cpu, title: 'What games can my PC run?', body: 'Start with your hardware and compare it across the supported game library in one result.', href: getLocalizedPath(lang, 'tools/what-games-can-my-pc-run'), cta: 'Use reverse finder' },
              ].map((item) => <article key={item.title} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm"><item.icon className="h-7 w-7 text-primary" aria-hidden="true" /><h3 className="mt-4 text-xl font-bold">{item.title}</h3><p className="mt-2 flex-1 leading-7 text-muted-foreground">{item.body}</p><Link href={item.href} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary hover:underline">{item.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>)}
            </div>
          </section>
        )}

        <section aria-labelledby="reviewed-games" className="space-y-6">
          <div>
            <h2 id="reviewed-games" className="text-3xl font-bold">{copy.directoryTitle}</h2>
            <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">{copy.directoryDescription}</p>
          </div>
          <GameGuideDirectory
            games={gameCards}
            labels={{
              searchLabel: copy.searchLabel, searchPlaceholder: copy.searchPlaceholder, noResults: copy.noResults,
              openGuide: copy.openGuide, reviewed: copy.reviewed, ...directoryLabels,
            }}
          />
        </section>

        {lang === 'en' && (
          <section aria-labelledby="read-result" className="space-y-5">
            <div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary"><Sparkles className="h-4 w-4" aria-hidden="true" />Avoid a yes-or-no trap</p><h2 id="read-result" className="mt-2 text-3xl font-bold">What a useful “Can I run it?” answer should tell you</h2><p className="mt-2 max-w-4xl leading-7 text-muted-foreground">A PC can launch a game and still miss the experience you expect. Use these four checks before calling a build suitable.</p></div>
            <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
              <table className="w-full min-w-[760px] text-left">
                <thead className="border-b bg-muted/50"><tr><th className="px-5 py-4">Check</th><th className="px-5 py-4">What it answers</th><th className="px-5 py-4">What to do next</th></tr></thead>
                <tbody className="divide-y text-sm leading-6">
                  {[
                    ['Official minimum requirements', 'Can the current game version start from a supported hardware baseline?', 'Treat this as the floor, not a promise of smooth frame times.'],
                    ['Recommended requirements', 'Which hardware tier targets a better publisher-defined preset or FPS?', 'Match the exact preset, resolution and ray-tracing notes.'],
                    ['Modelled FPS range', 'Where might your exact CPU and GPU land under stated assumptions?', 'Compare the low and 1% low—not only the average.'],
                    ['Repeatable local test', 'How does your real PC behave in the same scene after patches and drivers?', 'Measure frame time, utilisation, temperatures and memory pressure.'],
                  ].map((row) => <tr key={row[0]}><th className="px-5 py-4 font-semibold">{row[0]}</th><td className="px-5 py-4 text-muted-foreground">{row[1]}</td><td className="px-5 py-4 text-muted-foreground">{row[2]}</td></tr>)}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section aria-labelledby="how-it-works" className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <h2 id="how-it-works" className="text-2xl font-bold">{copy.howItWorksTitle}</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.howItWorks.map((step, index) => (
              <li key={step} className="rounded-xl border bg-muted/30 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{index + 1}</span>
                <p className="mt-4 leading-7 text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {lang === 'en' && (
          <section className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 dark:border-emerald-900 dark:bg-emerald-950/25"><h2 className="text-2xl font-bold">What we check</h2><ul className="mt-4 space-y-3">{['Publisher minimum and recommended system requirements when a reviewed guide is available.', 'CPU, GPU, RAM, VRAM, storage, resolution and quality assumptions used by the planning model.', 'Likely CPU, GPU or mixed pressure plus an estimated FPS range and 1% low.', 'Practical settings and a repeatable validation checklist before you spend money.'].map((item) => <li key={item} className="flex gap-3 leading-7"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul></article>
            <article className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 dark:border-amber-900 dark:bg-amber-950/25"><h2 className="text-2xl font-bold">What no online checker can guarantee</h2><ul className="mt-4 space-y-3 text-muted-foreground">{['An identical FPS figure in every map, patch, multiplayer match or heavily modded save.', 'Laptop performance from a desktop component name without knowing its power limit and cooling.', 'The effect of background software, unstable overclocks, thermal throttling or a damaged installation.', 'Future performance after a game update, driver change or engine migration.'].map((item) => <li key={item} className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />{item}</li>)}</ul></article>
          </section>
        )}

        <section className="flex flex-col gap-5 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-3xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold"><SearchCheck className="h-6 w-6 text-blue-600" aria-hidden="true" />{copy.reverseTitle}</h2>
            <p className="mt-2 leading-7 text-muted-foreground">{copy.reverseDescription}</p>
          </div>
          <Link href={getLocalizedPath(lang, 'tools/what-games-can-my-pc-run')} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 font-semibold text-white hover:bg-blue-800">
            {copy.reverseCta}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section aria-labelledby="can-i-run-faq" className="space-y-4">
          <h2 id="can-i-run-faq" className="text-3xl font-bold">{copy.faqTitle}</h2>
          {copy.faqs.map((faq) => (
            <details key={faq.q} className="group rounded-xl border bg-card p-5">
              <summary className="flex cursor-pointer list-none items-center gap-3 font-semibold [&::-webkit-details-marker]:hidden">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />{faq.q}
              </summary>
              <p className="mt-3 pl-8 leading-7 text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  );
}
