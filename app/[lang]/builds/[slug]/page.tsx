import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Info,
  MemoryStick,
  Monitor,
  ShieldCheck,
  Table2,
  Thermometer,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JsonLd } from '@/components/seo/json-ld';
import { LoadBuildButton } from '@/components/builds/load-build-button';
import { LocalizedBuildAnalysis } from '@/components/builds/localized-build-analysis';
import { i18n, isSupportedLocale, type Locale } from '@/i18n-config';
import { getPopularBuildCopy } from '@/lib/popular-builds-i18n';
import {
  POPULAR_BUILDS,
  POPULAR_BUILDS_REVIEWED,
  getPopularBuild,
  getPopularBuildAnalysis,
  getResolutionPlanningRows,
} from '@/lib/popular-builds';
import {
  SITE_URL,
  createBreadcrumbSchema,
  createSchemaGraph,
  createWebPageSchema,
} from '@/lib/structured-data';

type PageParams = { lang: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) => POPULAR_BUILDS.map((build) => ({ lang, slug: build.slug })));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const build = getPopularBuild(slug);
  if (!isSupportedLocale(lang) || !build) return {};

  const { cpu, gpu } = getPopularBuildAnalysis(build);
  const copy = getPopularBuildCopy(lang);
  const pageUrl = `${SITE_URL}/${lang}/builds/${build.slug}`;
  const title = `${cpu.name} + ${gpu.name} ${copy.analysis} (${build.resolution})`;
  const description = copy.metaDescription(cpu.name, gpu.name, build.resolution);
  const languages = Object.fromEntries(i18n.locales.map(locale => [locale, `${SITE_URL}/${locale}/builds/${build.slug}`]));

  return {
    title,
    description,
    alternates: { canonical: pageUrl, languages },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

function resultCopy(constraint: 'CPU' | 'GPU' | 'Balanced') {
  if (constraint === 'Balanced') {
    return {
      title: 'Close resolution-adjusted index match',
      body: 'The CPU and GPU planning indexes are close at the selected target resolution. Real limits can still change by game engine, scene, settings and frame-rate target.',
      color: 'text-emerald-700 dark:text-emerald-300',
    };
  }
  return {
    title: `${constraint}-side planning constraint`,
    body: `At the selected target resolution, the ${constraint} has the lower adjusted planning index and deserves closer testing in relevant games.`,
    color: 'text-amber-700 dark:text-amber-300',
  };
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
        <span className="font-bold tabular-nums">{value}/100</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(2, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

function HardwareBrandMark({ brand, kind }: { brand: string; kind: 'CPU' | 'GPU' }) {
  const brandStyle = brand === 'Intel'
    ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300'
    : brand === 'NVIDIA'
      ? 'border-lime-200 bg-lime-50 text-lime-800 dark:border-lime-800 dark:bg-lime-950/40 dark:text-lime-300'
      : 'border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-300';

  return (
    <div
      className={`flex h-16 w-20 shrink-0 flex-col items-center justify-center rounded-xl border ${brandStyle}`}
      role="img"
      aria-label={`${brand} ${kind} brand badge`}
    >
      <div className="flex items-center gap-1">
        {kind === 'CPU' ? <Cpu className="h-4 w-4" aria-hidden="true" /> : <Monitor className="h-4 w-4" aria-hidden="true" />}
        <span className="text-sm font-black leading-none tracking-tight">{brand.toUpperCase()}</span>
      </div>
      <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] opacity-75">{kind}</span>
    </div>
  );
}

export default async function PopularBuildPage({ params }: { params: Promise<PageParams> }) {
  const { lang, slug } = await params;
  const build = getPopularBuild(slug);
  if (!isSupportedLocale(lang) || !build) notFound();

  if (lang !== 'en') {
    const locale = lang as Locale;
    const copy = getPopularBuildCopy(locale);
    const { cpu, gpu } = getPopularBuildAnalysis(build);
    const localizedUrl = `${SITE_URL}/${locale}/builds/${build.slug}`;
    const localizedTitle = `${cpu.name} + ${gpu.name} ${copy.analysis}`;
    const localizedDescription = copy.metaDescription(cpu.name, gpu.name, build.resolution);
    const localizedSchema = createSchemaGraph([
      createWebPageSchema({ pageUrl: localizedUrl, name: localizedTitle, description: localizedDescription, lang: locale, image: `${SITE_URL}/og-image.png`, type: 'TechArticle' }),
      createBreadcrumbSchema(localizedUrl, [
        { name: copy.back, url: `${SITE_URL}/${locale}` },
        { name: copy.sectionTitle, url: `${SITE_URL}/${locale}#popular-builds-title` },
        { name: `${cpu.name} + ${gpu.name}`, url: localizedUrl },
      ]),
    ]);
    return <><JsonLd data={localizedSchema} /><LocalizedBuildAnalysis lang={locale} build={build} /></>;
  }

  const { cpu, gpu, scoreGap, constraint, calculatedPsu, commonPsu } = getPopularBuildAnalysis(build);
  const resolutionRows = getResolutionPlanningRows(cpu, gpu);
  const result = resultCopy(constraint);
  const pageUrl = `${SITE_URL}/en/builds/${build.slug}`;
  const pageTitle = `${cpu.name} + ${gpu.name} Bottleneck Analysis`;
  const description = `A practical ${build.resolution} planning analysis for ${cpu.name} and ${gpu.name}.`;
  const related = POPULAR_BUILDS.filter((candidate) => candidate.slug !== build.slug).slice(0, 3);
  const schema = createSchemaGraph([
    createWebPageSchema({
      pageUrl,
      name: pageTitle,
      description,
      lang: 'en',
      image: `${SITE_URL}/og-image.png`,
      type: 'TechArticle',
    }),
    createBreadcrumbSchema(pageUrl, [
      { name: 'PC Bottleneck Calculator', url: `${SITE_URL}/en` },
      { name: 'Popular PC Build Checks', url: `${SITE_URL}/en#popular-builds-title` },
      { name: `${cpu.name} + ${gpu.name}`, url: pageUrl },
    ]),
  ]);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
      <JsonLd data={schema} />

      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 dark:text-gray-400">
        <Link href="/en" className="inline-flex items-center hover:text-blue-600 hover:underline">
          <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> PC Bottleneck Calculator
        </Link>
      </nav>

      <header className="space-y-4 rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-violet-50 p-6 dark:border-gray-800 dark:from-blue-950/40 dark:via-gray-950 dark:to-violet-950/30 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{build.category}</Badge>
          <Badge variant="secondary">{build.resolution}</Badge>
          <Badge variant="secondary">{build.ramLabel}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
          {cpu.name} + {gpu.name} Bottleneck Analysis
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">{build.overview}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Reviewed <time dateTime="2026-08-22">{POPULAR_BUILDS_REVIEWED}</time> · Planning analysis, not a measured game benchmark
        </p>
      </header>

      <Card className="border-2 border-blue-200 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {constraint === 'Balanced' ? <CheckCircle2 className="h-6 w-6 text-emerald-600" /> : <AlertTriangle className="h-6 w-6 text-amber-600" />}
            Result summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h2 className={`text-xl font-bold ${result.color}`}>{result.title}</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{result.body}</p>
            </div>
            <div className="rounded-xl bg-gray-100 px-4 py-3 text-center dark:bg-gray-900">
              <p className="text-2xl font-bold">{scoreGap}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">planning score gap</p>
            </div>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
            This percentage is the separation between the resolution-adjusted planning indexes for this target. It is not measured lost FPS, wasted performance or a guarantee of real-game behavior.
          </div>
          <LoadBuildButton cpu={build.cpuId} gpu={build.gpuId} ram={build.ramId} resolution={build.resolution} lang="en" />
        </CardContent>
      </Card>

      <section aria-labelledby="planning-dashboard" className="space-y-4">
        <h2 id="planning-dashboard" className="text-2xl font-bold">Build planning dashboard</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Normalized component balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <figure className="space-y-5" aria-labelledby="component-score-caption">
                <ScoreBar label={`${cpu.name} CPU score`} value={cpu.benchmarkScore} color="bg-blue-600" />
                <ScoreBar label={`${gpu.name} GPU score`} value={gpu.benchmarkScore} color="bg-violet-600" />
                <figcaption id="component-score-caption" className="rounded-lg bg-gray-50 p-3 text-xs leading-relaxed text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                  Higher bars indicate more relative headroom inside PCBuildCheck&apos;s normalized planning model. They are not PassMark scores, measured FPS or cross-vendor laboratory results.
                </figcaption>
              </figure>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Table2 className="h-5 w-5 text-emerald-600" />
                At-a-glance build plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr><th scope="row" className="bg-gray-50 px-3 py-2.5 text-left font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">Target resolution</th><td className="px-3 py-2.5 text-right font-semibold">{build.resolution}</td></tr>
                    <tr><th scope="row" className="bg-gray-50 px-3 py-2.5 text-left font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">Memory plan</th><td className="px-3 py-2.5 text-right font-semibold">{build.ramLabel}</td></tr>
                    <tr><th scope="row" className="bg-gray-50 px-3 py-2.5 text-left font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">CPU platform</th><td className="px-3 py-2.5 text-right font-semibold">{cpu.socket || 'Verify model'}</td></tr>
                    <tr><th scope="row" className="bg-gray-50 px-3 py-2.5 text-left font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">Graphics memory</th><td className="px-3 py-2.5 text-right font-semibold">{gpu.vram}GB VRAM</td></tr>
                    <tr><th scope="row" className="bg-gray-50 px-3 py-2.5 text-left font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">Published CPU + GPU power</th><td className="px-3 py-2.5 text-right font-semibold">{cpu.tdp + gpu.tdp}W</td></tr>
                    <tr><th scope="row" className="bg-gray-50 px-3 py-2.5 text-left font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">Common PSU planning size</th><td className="px-3 py-2.5 text-right font-semibold">{commonPsu}W</td></tr>
                    <tr><th scope="row" className="bg-gray-50 px-3 py-2.5 text-left font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">Likely constraint</th><td className="px-3 py-2.5 text-right font-semibold">{constraint === 'Balanced' ? 'Close match' : `${constraint}-side`}</td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section aria-labelledby="component-overview" className="space-y-4">
        <h2 id="component-overview" className="text-2xl font-bold">Component overview</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <HardwareBrandMark brand={cpu.brand} kind="CPU" />
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{cpu.brand} · Processor</p>
                  <CardTitle className="text-lg leading-snug">{cpu.name}</CardTitle>
                  <p className="mt-1 text-xs font-medium text-blue-700 dark:text-blue-300">Normalized planning score: {cpu.benchmarkScore}/100</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Cores / threads</span><p className="font-semibold">{cpu.cores} / {cpu.threads}</p></div>
              <div><span className="text-gray-500">Boost clock</span><p className="font-semibold">Up to {cpu.boostClock} GHz</p></div>
              <div><span className="text-gray-500">Published TDP</span><p className="font-semibold">{cpu.tdp}W</p></div>
              <div><span className="text-gray-500">Socket</span><p className="font-semibold">{cpu.socket || 'Verify model'}</p></div>
              {cpu.officialUrl && <a href={cpu.officialUrl} target="_blank" rel="noopener noreferrer" className="col-span-2 inline-flex items-center font-medium text-blue-700 hover:underline dark:text-blue-300">Official CPU details <ExternalLink className="ml-1 h-3.5 w-3.5" /></a>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <HardwareBrandMark brand={gpu.brand} kind="GPU" />
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{gpu.brand} · Graphics card</p>
                  <CardTitle className="text-lg leading-snug">{gpu.name}</CardTitle>
                  <p className="mt-1 text-xs font-medium text-violet-700 dark:text-violet-300">Normalized planning score: {gpu.benchmarkScore}/100</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Graphics memory</span><p className="font-semibold">{gpu.vram}GB VRAM</p></div>
              <div><span className="text-gray-500">Architecture</span><p className="font-semibold">{gpu.architecture}</p></div>
              <div><span className="text-gray-500">Published board power</span><p className="font-semibold">{gpu.tdp}W</p></div>
              <div><span className="text-gray-500">Target here</span><p className="font-semibold">{build.resolution}</p></div>
              {gpu.officialUrl && <a href={gpu.officialUrl} target="_blank" rel="noopener noreferrer" className="col-span-2 inline-flex items-center font-medium text-blue-700 hover:underline dark:text-blue-300">Official GPU details <ExternalLink className="ml-1 h-3.5 w-3.5" /></a>}
            </CardContent>
          </Card>
        </div>
      </section>

      <section aria-labelledby="resolution-analysis" className="space-y-4">
        <div>
          <h2 id="resolution-analysis" className="text-2xl font-bold">How resolution changes the likely constraint</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-300">Higher output resolutions generally move more work toward the GPU. These labels describe planning pressure, not measured utilization.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resolution pressure graph</CardTitle>
          </CardHeader>
          <CardContent>
            <figure className="space-y-5" aria-labelledby="resolution-graph-caption">
              {resolutionRows.map((row) => (
                <div key={row.resolution} className={`rounded-xl border p-3 ${row.resolution === build.resolution ? 'border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/20' : 'border-gray-200 dark:border-gray-800'}`}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2"><span className="font-bold">{row.resolution}</span>{row.resolution === build.resolution && <Badge>Selected</Badge>}</div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{row.likelyConstraint}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-[46px_1fr_34px] items-center gap-2 text-xs"><span>CPU</span><div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"><div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.max(2, row.cpuIndex)}%` }} /></div><span className="text-right font-semibold tabular-nums">{row.cpuIndex}</span></div>
                    <div className="grid grid-cols-[46px_1fr_34px] items-center gap-2 text-xs"><span>GPU</span><div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"><div className="h-full rounded-full bg-violet-600" style={{ width: `${Math.max(2, row.gpuIndex)}%` }} /></div><span className="text-right font-semibold tabular-nums">{row.gpuIndex}</span></div>
                  </div>
                </div>
              ))}
              <figcaption id="resolution-graph-caption" className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                The graph applies the calculator&apos;s simplified resolution scaling to normalized component scores. The lower bar indicates the side that deserves closer testing; it does not predict utilization or FPS.
              </figcaption>
            </figure>
          </CardContent>
        </Card>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
              <tr><th className="px-4 py-3">Resolution</th><th className="px-4 py-3">CPU index</th><th className="px-4 py-3">GPU index</th><th className="px-4 py-3">CPU-side pressure</th><th className="px-4 py-3">GPU-side pressure</th><th className="px-4 py-3">Likely constraint</th></tr>
            </thead>
            <tbody>
              {resolutionRows.map((row) => (
                <tr key={row.resolution} className={`border-t border-gray-200 dark:border-gray-800 ${row.resolution === build.resolution ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                  <td className="px-4 py-3 font-semibold">{row.resolution}{row.resolution === build.resolution && <Badge className="ml-2">Selected</Badge>}</td>
                  <td className="px-4 py-3 font-semibold tabular-nums">{row.cpuIndex}</td><td className="px-4 py-3 font-semibold tabular-nums">{row.gpuIndex}</td><td className="px-4 py-3">{row.cpuPressure}</td><td className="px-4 py-3">{row.gpuPressure}</td><td className="px-4 py-3 font-medium">{row.likelyConstraint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="readiness" className="space-y-4">
        <h2 id="readiness" className="text-2xl font-bold">Build readiness checks</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card><CardContent className="pt-6"><MemoryStick className="mb-3 h-6 w-6 text-emerald-600" /><h3 className="font-semibold">Memory plan</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{build.ramLabel}. Confirm that the selected motherboard supports the memory generation and speed.</p></CardContent></Card>
          <Card><CardContent className="pt-6"><Zap className="mb-3 h-6 w-6 text-amber-600" /><h3 className="font-semibold">PSU capacity</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Calculated capacity is about {calculatedPsu}W; {commonPsu}W is the next common planning size. Verify the GPU maker’s minimum.</p></CardContent></Card>
          <Card><CardContent className="pt-6"><ShieldCheck className="mb-3 h-6 w-6 text-blue-600" /><h3 className="font-semibold">Platform</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Use a {cpu.socket || 'compatible'} motherboard and verify BIOS support, memory compatibility and available expansion space.</p></CardContent></Card>
          <Card><CardContent className="pt-6"><Thermometer className="mb-3 h-6 w-6 text-red-600" /><h3 className="font-semibold">Cooling and fit</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Check CPU cooler capacity, GPU length and thickness, case airflow and native power-cable clearance.</p></CardContent></Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600" />Who this build suits</CardTitle></CardHeader>
          <CardContent><ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">{build.bestFor.map((item) => <li key={item} className="flex gap-2"><span className="text-emerald-600">✓</span>{item}</li>)}</ul></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-600" />Check before buying</CardTitle></CardHeader>
          <CardContent><ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">{build.watchFor.map((item) => <li key={item} className="flex gap-2"><span className="text-amber-600">•</span>{item}</li>)}</ul></CardContent>
        </Card>
      </section>

      <Card className="border-indigo-200 bg-indigo-50/60 dark:border-indigo-900 dark:bg-indigo-950/20">
        <CardHeader><CardTitle className="flex items-center gap-2"><Info className="h-5 w-5 text-indigo-600" />How to interpret this analysis</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          <p>PCBuildCheck compares internally normalized CPU and GPU planning scores derived from published specifications. The model helps identify which side deserves closer testing; it does not reproduce a laboratory benchmark.</p>
          <p>Real performance changes with the game version, scene, graphics settings, frame cap, cooling, memory configuration, drivers and background applications. Before upgrading, verify the suspected limit with repeatable frame-time and utilization measurements.</p>
          <div className="flex flex-wrap gap-4 pt-1 font-semibold">
            <Link href="/en/methodology" className="text-indigo-700 hover:underline dark:text-indigo-300">Read the methodology</Link>
            <Link href="/en/fps-calculator" className="text-indigo-700 hover:underline dark:text-indigo-300">Open the dedicated FPS calculator</Link>
          </div>
        </CardContent>
      </Card>

      <section aria-labelledby="related-builds" className="space-y-4">
        <h2 id="related-builds" className="text-2xl font-bold">Compare other popular build checks</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {related.map((candidate) => {
            const candidateAnalysis = getPopularBuildAnalysis(candidate);
            return (
              <Link key={candidate.slug} href={`/en/builds/${candidate.slug}`} className="rounded-xl border border-gray-200 p-4 transition hover:border-blue-400 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/20">
                <p className="text-xs font-semibold uppercase text-gray-500">{candidate.resolution}</p>
                <p className="mt-1 font-semibold">{candidateAnalysis.cpu.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{candidateAnalysis.gpu.name}</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-700 dark:text-blue-300">View analysis <ArrowRight className="ml-1 h-4 w-4" /></span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
