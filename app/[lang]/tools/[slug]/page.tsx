import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowRight, BookOpenCheck, Calculator, CheckCircle2, Database, Gauge, SearchCheck, SquareFunction } from 'lucide-react';
import { i18n, type Locale } from '@/i18n-config';
import {
  allCPUs,
  allGPUs,
  allGames,
  HARDWARE_DATABASE_UPDATED,
  HARDWARE_SCORE_METHODOLOGY_VERSION,
} from '@/lib/hardware-database';
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
import { ComponentComparison } from '@/components/calculators/component-comparison';
import { WhatGamesCanMyPCRun } from '@/components/tools/what-games-can-my-pc-run';

type PageParams = { lang: Locale; slug: string };

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) => TOOL_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isToolSlug(slug)) return {};
  const query = await searchParams;
  const isPrefilledUrl = Object.values(query).some((value) =>
    Array.isArray(value) ? value.length > 0 : typeof value === 'string'
  );
  const content = getToolContent(slug, lang);
  const path = '/tools/' + slug;
  const alternates = constructMetadataAlternates(lang, path);
  return {
    title: content.title,
    description: content.shortDescription,
    alternates,
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

type VramEducationCopy = {
  title: string;
  intro: string;
  allocatedTitle: string;
  allocatedBody: string;
  workingTitle: string;
  workingBody: string;
  pressureTitle: string;
  pressureBody: string;
  verifyTitle: string;
  verifyIntro: string;
  checks: string[];
  guideLink: string;
  fpsLink: string;
};

const VRAM_EDUCATION: Record<Locale, VramEducationCopy> = {
  en: {
    title: 'Allocated VRAM is not the same as required VRAM',
    intro: 'Monitoring software can show memory reserved by a game, but that value alone does not prove the game needs every allocated gigabyte to run smoothly.',
    allocatedTitle: 'Allocated memory',
    allocatedBody: 'Memory the game or driver has reserved. Engines may keep spare capacity and cached assets when more VRAM is available.',
    workingTitle: 'Active working set',
    workingBody: 'Resources actively needed for the current scene and settings. This is closer to practical demand, but most overlays cannot measure it perfectly.',
    pressureTitle: 'Capacity pressure',
    pressureBody: 'Repeatable frame-time spikes, texture pop-in or forced texture reductions that improve when memory-heavy settings are lowered.',
    verifyTitle: 'How to verify VRAM pressure',
    verifyIntro: 'Use the estimate as a test plan, then compare like-for-like runs.',
    checks: ['Keep the same game version, scene, driver and background apps.', 'Record frame time, 1% lows, dedicated VRAM and system RAM—not average FPS alone.', 'Lower textures first while keeping resolution and other settings unchanged.', 'Repeat the same route or benchmark and look for consistent improvement, not a single spike.'],
    guideLink: 'Read the complete VRAM planning guide',
    fpsLink: 'Estimate FPS with your CPU and GPU',
  },
  it: {
    title: 'La VRAM allocata non equivale alla VRAM necessaria',
    intro: 'Il software di monitoraggio mostra la memoria riservata dal gioco, ma questo valore da solo non prova che ogni gigabyte sia necessario per giocare senza problemi.',
    allocatedTitle: 'Memoria allocata',
    allocatedBody: 'Memoria riservata dal gioco o dal driver. I motori possono mantenere capacità libera e asset in cache quando è disponibile più VRAM.',
    workingTitle: 'Working set attivo',
    workingBody: 'Risorse necessarie alla scena e alle impostazioni correnti. È più vicino al fabbisogno pratico, ma gli overlay non lo misurano perfettamente.',
    pressureTitle: 'Pressione sulla capacità',
    pressureBody: 'Picchi ripetibili nel frame time, texture pop-in o riduzioni forzate che migliorano abbassando le impostazioni più pesanti per la memoria.',
    verifyTitle: 'Come verificare la pressione VRAM',
    verifyIntro: 'Usa la stima come piano di test e confronta esecuzioni equivalenti.',
    checks: ['Mantieni uguali versione del gioco, scena, driver e app in background.', 'Registra frame time, 1% low, VRAM dedicata e RAM di sistema, non solo gli FPS medi.', 'Riduci prima le texture senza cambiare risoluzione e altre impostazioni.', 'Ripeti lo stesso percorso o benchmark e cerca un miglioramento costante.'],
    guideLink: 'Leggi la guida completa alla VRAM (in inglese)',
    fpsLink: 'Stima gli FPS con CPU e GPU',
  },
  fr: {
    title: 'La VRAM allouée n’est pas la VRAM nécessaire',
    intro: 'Un outil de suivi affiche la mémoire réservée par le jeu, mais cette valeur seule ne prouve pas que chaque gigaoctet est nécessaire pour jouer sans saccades.',
    allocatedTitle: 'Mémoire allouée',
    allocatedBody: 'Mémoire réservée par le jeu ou le pilote. Les moteurs peuvent garder de la capacité libre et des ressources en cache si davantage de VRAM existe.',
    workingTitle: 'Working set actif',
    workingBody: 'Ressources nécessaires à la scène et aux réglages actuels. Cette valeur approche mieux le besoin pratique, sans être parfaitement mesurable par les overlays.',
    pressureTitle: 'Pression de capacité',
    pressureBody: 'Pics de frame time reproductibles, texture pop-in ou réduction forcée des textures qui s’améliorent en baissant les réglages gourmands en mémoire.',
    verifyTitle: 'Comment vérifier la pression VRAM',
    verifyIntro: 'Utilisez l’estimation comme plan de test et comparez des essais identiques.',
    checks: ['Gardez les mêmes version du jeu, scène, pilote et applications en arrière-plan.', 'Relevez frame time, 1% lows, VRAM dédiée et RAM système, pas seulement les FPS moyens.', 'Baissez d’abord les textures sans modifier résolution ni autres réglages.', 'Répétez le même parcours ou benchmark et recherchez un gain constant.'],
    guideLink: 'Lire le guide VRAM complet (en anglais)',
    fpsLink: 'Estimer les FPS avec votre CPU et GPU',
  },
  de: {
    title: 'Reservierter VRAM ist nicht gleich benötigter VRAM',
    intro: 'Monitoring-Software zeigt vom Spiel reservierten Speicher. Dieser Wert allein beweist nicht, dass jedes reservierte Gigabyte für flüssiges Spielen benötigt wird.',
    allocatedTitle: 'Reservierter Speicher',
    allocatedBody: 'Vom Spiel oder Treiber reservierter Speicher. Engines können bei mehr verfügbarem VRAM freie Kapazität und Assets im Cache halten.',
    workingTitle: 'Aktiver Working Set',
    workingBody: 'Ressourcen, die Szene und Einstellungen aktuell benötigen. Das liegt näher am praktischen Bedarf, lässt sich mit Overlays aber nicht perfekt messen.',
    pressureTitle: 'Kapazitätsdruck',
    pressureBody: 'Wiederholbare Frame-Time-Spitzen, Texture Pop-in oder erzwungene Texturreduktionen, die sich durch niedrigere speicherlastige Einstellungen bessern.',
    verifyTitle: 'VRAM-Druck richtig prüfen',
    verifyIntro: 'Nutze die Schätzung als Testplan und vergleiche gleichartige Durchläufe.',
    checks: ['Spielversion, Szene, Treiber und Hintergrundprogramme gleich halten.', 'Frame Time, 1% Lows, dedizierten VRAM und System-RAM erfassen, nicht nur Durchschnitts-FPS.', 'Zuerst Texturen senken und Auflösung sowie andere Einstellungen beibehalten.', 'Dieselbe Route oder denselben Benchmark wiederholen und auf konstante Verbesserung achten.'],
    guideLink: 'Vollständigen VRAM-Leitfaden lesen (Englisch)',
    fpsLink: 'FPS mit CPU und GPU schätzen',
  },
  es: {
    title: 'La VRAM asignada no es igual a la VRAM necesaria',
    intro: 'El software de monitorización muestra memoria reservada por el juego, pero ese valor por sí solo no demuestra que cada gigabyte sea necesario para jugar con fluidez.',
    allocatedTitle: 'Memoria asignada',
    allocatedBody: 'Memoria reservada por el juego o controlador. Los motores pueden mantener capacidad libre y recursos en caché cuando hay más VRAM disponible.',
    workingTitle: 'Working set activo',
    workingBody: 'Recursos necesarios para la escena y ajustes actuales. Se acerca más a la demanda práctica, pero los overlays no pueden medirlo perfectamente.',
    pressureTitle: 'Presión de capacidad',
    pressureBody: 'Picos repetibles de frame time, texture pop-in o reducciones forzadas que mejoran al bajar los ajustes que consumen memoria.',
    verifyTitle: 'Cómo verificar la presión de VRAM',
    verifyIntro: 'Usa la estimación como plan de prueba y compara ejecuciones equivalentes.',
    checks: ['Mantén iguales versión del juego, escena, controlador y aplicaciones en segundo plano.', 'Registra frame time, 1% lows, VRAM dedicada y RAM del sistema, no solo FPS medios.', 'Baja primero las texturas sin cambiar resolución ni otros ajustes.', 'Repite la misma ruta o benchmark y busca una mejora constante.'],
    guideLink: 'Leer la guía completa de VRAM (en inglés)',
    fpsLink: 'Estimar FPS con tu CPU y GPU',
  },
};

function VramEducationSection({ lang }: { lang: Locale }) {
  const copy = VRAM_EDUCATION[lang] ?? VRAM_EDUCATION.en;
  const cards = [
    { title: copy.allocatedTitle, body: copy.allocatedBody, icon: Database },
    { title: copy.workingTitle, body: copy.workingBody, icon: Gauge },
    { title: copy.pressureTitle, body: copy.pressureBody, icon: AlertTriangle },
  ];

  return (
    <section aria-labelledby="vram-allocation-title" className="space-y-6 rounded-2xl border bg-card p-6 md:p-8">
      <header className="max-w-4xl space-y-3">
        <h2 id="vram-allocation-title" className="text-3xl font-semibold">{copy.title}</h2>
        <p className="leading-7 text-muted-foreground">{copy.intro}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ title, body, icon: Icon }) => (
          <section key={title} className="rounded-xl border bg-muted/30 p-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <Icon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
          </section>
        ))}
      </div>
      <div className="grid gap-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900 dark:bg-emerald-950/20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <SearchCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            {copy.verifyTitle}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.verifyIntro}</p>
        </div>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
          {copy.checks.map((check) => <li key={check}>{check}</li>)}
        </ol>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
        <Link href="/en/blog/how-much-vram-do-you-need-for-gaming" className="text-primary hover:underline">
          {copy.guideLink}<span aria-hidden="true"> →</span>
        </Link>
        <Link href={getLocalizedPath(lang, 'fps-calculator')} className="text-primary hover:underline">
          {copy.fpsLink}<span aria-hidden="true"> →</span>
        </Link>
      </div>
    </section>
  );
}

export default async function ToolPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang, slug } = await params;
  const query = await searchParams;
  const tool = getTool(slug);
  if (!tool) notFound();

  const content = getToolContent(tool.slug, lang);
  const copy = getToolsPageCopy(lang);
  const path = getToolPath(lang, tool.slug);
  const toolsPath = getLocalizedPath(lang, 'tools');
  const pageUrl = 'https://www.pcbuildcheck.com' + path;
  const includeComparisonDetails = tool.slug === 'component-comparison';
  const includeGameFinderDetails = tool.slug === 'what-games-can-my-pc-run';
  const initialSelection = Object.fromEntries(
    Object.entries(query).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
  );
  const data: ToolDatasets = {
    cpus: allCPUs.map((cpu) => ({
      id: cpu.id,
      name: cpu.name,
      score: cpu.benchmarkScore,
      tdp: cpu.tdp,
      cores: cpu.cores,
      socket: cpu.socket,
      ...(includeComparisonDetails || includeGameFinderDetails ? {
        brand: cpu.brand,
        series: cpu.series,
        tier: cpu.tier,
        category: cpu.category,
        baseClock: cpu.baseClock,
        boostClock: cpu.boostClock,
        threads: cpu.threads,
        architecture: cpu.architecture,
        releaseYear: cpu.releaseYear,
        officialUrl: cpu.officialUrl,
      } : {}),
    })),
    gpus: allGPUs.map((gpu) => ({
      id: gpu.id,
      name: gpu.name,
      score: gpu.benchmarkScore,
      tdp: gpu.tdp,
      vram: gpu.vram,
      ...(includeComparisonDetails || includeGameFinderDetails ? {
        brand: gpu.brand,
        series: gpu.series,
        tier: gpu.tier,
        category: gpu.category,
        baseClock: gpu.baseClock,
        boostClock: gpu.boostClock,
        architecture: gpu.architecture,
        releaseYear: gpu.releaseYear,
        officialUrl: gpu.officialUrl,
      } : {}),
    })),
    games: allGames.map((game) => ({
      id: game.id,
      name: game.name,
      cpuDemand: game.cpuDemand,
      gpuDemand: game.gpuDemand,
      ramRequirement: game.ramRequirement,
      ...(includeGameFinderDetails ? {
        category: game.category,
        storageRequirement: game.storageRequirement,
        releaseYear: game.releaseYear,
        optimizations: game.optimizations,
      } : {}),
    })),
    databaseUpdated: HARDWARE_DATABASE_UPDATED,
    scoreMethodologyVersion: HARDWARE_SCORE_METHODOLOGY_VERSION,
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
          {tool.slug === 'component-comparison' ? (
            <ComponentComparison
              lang={lang}
              cpus={data.cpus}
              gpus={data.gpus}
              initialSelection={initialSelection}
              databaseUpdated={data.databaseUpdated}
              scoreMethodologyVersion={data.scoreMethodologyVersion}
            />
          ) : tool.slug === 'what-games-can-my-pc-run' ? (
            <WhatGamesCanMyPCRun
              lang={lang}
              data={data}
              initialSelection={initialSelection}
            />
          ) : (
            <ToolCalculator
              slug={tool.slug}
              lang={lang}
              data={data}
              initialSelection={initialSelection}
            />
          )}
        </section>

        <section aria-labelledby="result-meaning" className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 dark:border-blue-900 dark:bg-blue-950/20">
          <h2 id="result-meaning" className="flex items-center gap-2 text-2xl font-semibold">
            <BookOpenCheck className="h-6 w-6 text-blue-600" aria-hidden="true" />
            {copy.resultMeaning}
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">{content.resultGuide}</p>
        </section>

        {tool.slug === 'vram-calculator' && <VramEducationSection lang={lang} />}

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
