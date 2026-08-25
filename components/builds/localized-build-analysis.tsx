import Link from 'next/link';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Cpu, ExternalLink, Info, MemoryStick, Monitor, ShieldCheck, Thermometer, Zap } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadBuildButton } from '@/components/builds/load-build-button';
import { POPULAR_BUILDS, getPopularBuildAnalysis, getResolutionPlanningRows, type PopularBuild } from '@/lib/popular-builds';
import { getLocalizedBuildDetails, getPopularBuildCopy, getPopularBuildReviewedDate, localizedConstraintLabel, localizePressureLabel } from '@/lib/popular-builds-i18n';
import { getLocalizedPath } from '@/lib/path-translations';

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-sm"><span className="font-medium">{label}</span><span className="font-bold tabular-nums">{value}/100</span></div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(2, Math.min(100, value))}%` }} /></div>
    </div>
  );
}

export function LocalizedBuildAnalysis({ lang, build }: { lang: Locale; build: PopularBuild }) {
  const copy = getPopularBuildCopy(lang);
  const details = getLocalizedBuildDetails(build, lang);
  const { cpu, gpu, scoreGap, constraint, calculatedPsu, commonPsu } = getPopularBuildAnalysis(build);
  const rows = getResolutionPlanningRows(cpu, gpu);
  const related = POPULAR_BUILDS.filter(candidate => candidate.slug !== build.slug).slice(0, 3);
  const balanced = constraint === 'Balanced';

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 dark:text-gray-400">
        <Link href={`/${lang}`} className="inline-flex items-center hover:text-blue-600 hover:underline"><ArrowLeft className="mr-1.5 h-4 w-4" />{copy.back}</Link>
      </nav>

      <header className="space-y-4 rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-violet-50 p-6 dark:border-gray-800 dark:from-blue-950/40 dark:via-gray-950 dark:to-violet-950/30 sm:p-8">
        <div className="flex flex-wrap gap-2"><Badge variant="outline">{details.category}</Badge><Badge variant="secondary">{build.resolution}</Badge><Badge variant="secondary">{build.ramLabel}</Badge></div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{cpu.name} + {gpu.name} {copy.analysis}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">{details.overview}</p>
        <p className="text-sm text-gray-500">{copy.reviewedLabel} <time dateTime="2026-08-22">{getPopularBuildReviewedDate(lang)}</time> · {copy.planningNotice}</p>
      </header>

      <Card className="border-2 border-blue-200 dark:border-blue-900">
        <CardHeader><CardTitle className="flex items-center gap-2">{balanced ? <CheckCircle2 className="h-6 w-6 text-emerald-600" /> : <Info className="h-6 w-6 text-amber-600" />}{copy.resultSummary}</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div><h2 className={`text-xl font-bold ${balanced ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>{balanced ? copy.balancedTitle : copy.constraintTitle(constraint)}</h2><p className="mt-2 text-gray-700 dark:text-gray-300">{balanced ? copy.balancedBody : copy.constraintBody(constraint)}</p></div>
            <div className="shrink-0 rounded-xl bg-gray-100 px-4 py-3 text-center dark:bg-gray-900"><p className="text-2xl font-bold">{scoreGap}%</p><p className="text-xs text-gray-500">{copy.planningGap}</p></div>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">{copy.scoreDisclaimer}</div>
          <LoadBuildButton cpu={build.cpuId} gpu={build.gpuId} ram={build.ramId} resolution={build.resolution} lang={lang} label={copy.loadBuild} />
        </CardContent>
      </Card>

      <section aria-labelledby="localized-dashboard" className="space-y-4">
        <h2 id="localized-dashboard" className="text-2xl font-bold">{copy.dashboard}</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-blue-600" />{copy.normalizedBalance}</CardTitle></CardHeader><CardContent className="space-y-5"><ScoreBar label={`CPU · ${cpu.name}`} value={cpu.benchmarkScore} color="bg-blue-600" /><ScoreBar label={`GPU · ${gpu.name}`} value={gpu.benchmarkScore} color="bg-violet-600" /><p className="rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-600 dark:bg-gray-900 dark:text-gray-300">{copy.rawScoreNote}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>{copy.quickPlan}</CardTitle></CardHeader><CardContent><div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><tbody className="divide-y dark:divide-gray-800">
            {[[copy.targetResolution, build.resolution], [copy.memoryPlan, build.ramLabel], [copy.cpuPlatform, cpu.socket || copy.verifyModel], [copy.graphicsMemory, `${gpu.vram}GB VRAM`], [copy.publishedPower, `${cpu.tdp + gpu.tdp}W`], [copy.psuPlan, `${commonPsu}W`], [copy.likelyConstraint, localizedConstraintLabel(copy, constraint)]].map(([label, value]) => <tr key={label}><th className="bg-gray-50 px-3 py-2.5 text-left font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">{label}</th><td className="px-3 py-2.5 text-right font-semibold">{value}</td></tr>)}
          </tbody></table></div></CardContent></Card>
        </div>
      </section>

      <section aria-labelledby="localized-components" className="space-y-4">
        <h2 id="localized-components" className="text-2xl font-bold">{copy.componentOverview}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Cpu className="h-6 w-6 text-blue-600" />{cpu.name}</CardTitle><p className="text-xs font-semibold uppercase text-gray-500">{cpu.brand} · {copy.processor}</p></CardHeader><CardContent className="grid grid-cols-2 gap-3 text-sm"><div><span className="text-gray-500">{copy.normalizedScore}</span><p className="font-semibold">{cpu.benchmarkScore}/100</p></div><div><span className="text-gray-500">{copy.coresThreads}</span><p className="font-semibold">{cpu.cores} / {cpu.threads}</p></div><div><span className="text-gray-500">{copy.boostClock}</span><p className="font-semibold">{cpu.boostClock} GHz</p></div><div><span className="text-gray-500">{copy.publishedTdp}</span><p className="font-semibold">{cpu.tdp}W</p></div>{cpu.officialUrl && <a href={cpu.officialUrl} target="_blank" rel="noopener noreferrer" className="col-span-2 inline-flex items-center font-medium text-blue-700 hover:underline dark:text-blue-300">{copy.officialDetails}<ExternalLink className="ml-1 h-3.5 w-3.5" /></a>}</CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Monitor className="h-6 w-6 text-violet-600" />{gpu.name}</CardTitle><p className="text-xs font-semibold uppercase text-gray-500">{gpu.brand} · {copy.graphicsCard}</p></CardHeader><CardContent className="grid grid-cols-2 gap-3 text-sm"><div><span className="text-gray-500">{copy.normalizedScore}</span><p className="font-semibold">{gpu.benchmarkScore}/100</p></div><div><span className="text-gray-500">{copy.graphicsMemory}</span><p className="font-semibold">{gpu.vram}GB</p></div><div><span className="text-gray-500">{copy.architecture}</span><p className="font-semibold">{gpu.architecture}</p></div><div><span className="text-gray-500">{copy.boardPower}</span><p className="font-semibold">{gpu.tdp}W</p></div>{gpu.officialUrl && <a href={gpu.officialUrl} target="_blank" rel="noopener noreferrer" className="col-span-2 inline-flex items-center font-medium text-blue-700 hover:underline dark:text-blue-300">{copy.officialDetails}<ExternalLink className="ml-1 h-3.5 w-3.5" /></a>}</CardContent></Card>
        </div>
      </section>

      <section aria-labelledby="localized-resolution" className="space-y-4">
        <div><h2 id="localized-resolution" className="text-2xl font-bold">{copy.resolutionHeading}</h2><p className="mt-1 text-gray-600 dark:text-gray-300">{copy.resolutionIntro}</p></div>
        <Card><CardHeader><CardTitle>{copy.pressureGraph}</CardTitle></CardHeader><CardContent><figure className="space-y-4">
          {rows.map(row => <div key={row.resolution} className={`rounded-xl border p-3 ${row.resolution === build.resolution ? 'border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/20' : 'dark:border-gray-800'}`}><div className="mb-3 flex justify-between"><div className="flex gap-2"><strong>{row.resolution}</strong>{row.resolution === build.resolution && <Badge>{copy.selected}</Badge>}</div><span className="text-xs font-semibold">{row.likelyConstraint === 'Close match' ? copy.closeMatch : copy.constraint(row.likelyConstraint.startsWith('CPU') ? 'CPU' : 'GPU')}</span></div><ScoreBar label="CPU" value={row.cpuIndex} color="bg-blue-600" /><div className="mt-3"><ScoreBar label="GPU" value={row.gpuIndex} color="bg-violet-600" /></div></div>)}
          <figcaption className="text-xs leading-5 text-gray-500">{copy.graphNote}</figcaption>
        </figure></CardContent></Card>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
              <tr>{copy.resolutionTableHeaders.map(header => <th key={header} className="px-4 py-3">{header}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.resolution} className={`border-t border-gray-200 dark:border-gray-800 ${row.resolution === build.resolution ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                  <td className="px-4 py-3 font-semibold">{row.resolution}{row.resolution === build.resolution && <Badge className="ml-2">{copy.selected}</Badge>}</td>
                  <td className="px-4 py-3 font-semibold tabular-nums">{row.cpuIndex}</td>
                  <td className="px-4 py-3 font-semibold tabular-nums">{row.gpuIndex}</td>
                  <td className="px-4 py-3">{localizePressureLabel(lang, row.cpuPressure)}</td>
                  <td className="px-4 py-3">{localizePressureLabel(lang, row.gpuPressure)}</td>
                  <td className="px-4 py-3 font-medium">{row.likelyConstraint === 'Close match' ? copy.closeMatch : copy.constraint(row.likelyConstraint.startsWith('CPU') ? 'CPU' : 'GPU')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="localized-readiness" className="space-y-4">
        <h2 id="localized-readiness" className="text-2xl font-bold">{copy.readiness.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card><CardContent className="pt-6"><MemoryStick className="mb-3 h-6 w-6 text-emerald-600" /><h3 className="font-semibold">{copy.readiness.memoryTitle}</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{copy.readiness.memoryBody(build.ramLabel)}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><Zap className="mb-3 h-6 w-6 text-amber-600" /><h3 className="font-semibold">{copy.readiness.psuTitle}</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{copy.readiness.psuBody(calculatedPsu, commonPsu)}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><ShieldCheck className="mb-3 h-6 w-6 text-blue-600" /><h3 className="font-semibold">{copy.readiness.platformTitle}</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{copy.readiness.platformBody(cpu.socket || copy.verifyModel)}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><Thermometer className="mb-3 h-6 w-6 text-red-600" /><h3 className="font-semibold">{copy.readiness.coolingTitle}</h3><p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{copy.readiness.coolingBody}</p></CardContent></Card>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle>{copy.bestFor}</CardTitle></CardHeader><CardContent><ul className="space-y-2">{details.bestFor.map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}</ul></CardContent></Card>
        <Card><CardHeader><CardTitle>{copy.verifyBeforeBuying}</CardTitle></CardHeader><CardContent><ul className="space-y-2">{details.watchFor.map(item => <li key={item} className="flex gap-2"><Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />{item}</li>)}</ul></CardContent></Card>
      </div>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-600" />{copy.compatibilityHeading}</CardTitle></CardHeader><CardContent><ul className="grid gap-3 md:grid-cols-3">{copy.compatibilityItems.map(item => <li key={item} className="rounded-lg bg-gray-50 p-3 text-sm dark:bg-gray-900">{item}</li>)}</ul></CardContent></Card>

      <Card className="border-indigo-200 bg-indigo-50/60 dark:border-indigo-900 dark:bg-indigo-950/20">
        <CardHeader><CardTitle className="flex items-center gap-2"><Info className="h-5 w-5 text-indigo-600" />{copy.interpretation.title}</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {copy.interpretation.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="flex flex-wrap gap-4 pt-1 font-semibold">
            <Link href={getLocalizedPath(lang, 'methodology')} className="text-indigo-700 hover:underline dark:text-indigo-300">{copy.interpretation.methodologyLink}</Link>
            <Link href={getLocalizedPath(lang, 'fps-calculator')} className="text-indigo-700 hover:underline dark:text-indigo-300">{copy.interpretation.fpsLink}</Link>
          </div>
        </CardContent>
      </Card>

      <section aria-labelledby="localized-related" className="space-y-4"><h2 id="localized-related" className="text-2xl font-bold">{copy.relatedBuilds}</h2><div className="grid gap-3 md:grid-cols-3">{related.map(candidate => { const analysis = getPopularBuildAnalysis(candidate); return <Link key={candidate.slug} href={`/${lang}/builds/${candidate.slug}`} className="rounded-xl border p-4 transition hover:border-violet-400 hover:shadow-sm"><p className="font-semibold">{analysis.cpu.name} + {analysis.gpu.name}</p><p className="mt-2 inline-flex items-center text-sm text-violet-700 dark:text-violet-300">{copy.openAnalysis}<ArrowRight className="ml-1 h-4 w-4" /></p></Link>; })}</div></section>
    </main>
  );
}
