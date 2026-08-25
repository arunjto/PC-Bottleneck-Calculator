import Link from 'next/link';
import { ArrowRight, Cpu, Gauge, MemoryStick, Monitor, Sparkles, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { POPULAR_BUILDS, getPopularBuildAnalysis } from '@/lib/popular-builds';
import type { Locale } from '@/i18n-config';
import { getLocalizedBuildDetails, getPopularBuildCopy, getPopularBuildReviewedDate, localizedConstraintLabel } from '@/lib/popular-builds-i18n';

export function PopularBuilds({ lang }: { lang: Locale }) {
  const copy = getPopularBuildCopy(lang);
  return (
    <section aria-labelledby="popular-builds-title" className="space-y-5">
      <div className="text-center">
        <Badge variant="outline" className="mb-3 border-violet-300 text-violet-700 dark:border-violet-700 dark:text-violet-300">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
          {copy.curated}
        </Badge>
        <h2 id="popular-builds-title" className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
          {copy.sectionTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
          {copy.sectionDescription}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {POPULAR_BUILDS.map((build) => {
          const { cpu, gpu, constraint, scoreGap, commonPsu } = getPopularBuildAnalysis(build);
          const localizedBuild = getLocalizedBuildDetails(build, lang);
          return (
            <Card key={build.slug} className="group border-gray-200 transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-gray-800 dark:hover:border-violet-700">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">{localizedBuild.category}</p>
                    <CardTitle className="mt-1 text-lg leading-snug">{cpu.name} + {gpu.name}</CardTitle>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-violet-600" aria-hidden="true" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-900">
                    <Monitor className="mb-1 h-4 w-4 text-blue-600" aria-hidden="true" />
                    <span className="font-medium">{build.resolution}</span>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-900">
                    <MemoryStick className="mb-1 h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <span className="font-medium">{build.ramLabel.split(' ')[0]}</span>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-900">
                    <Zap className="mb-1 h-4 w-4 text-amber-600" aria-hidden="true" />
                    <span className="font-medium">{commonPsu}W PSU</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant={constraint === 'Balanced' ? 'secondary' : 'outline'}>{localizedConstraintLabel(copy, constraint)}</Badge>
                  <span className="text-gray-500 dark:text-gray-400"><Gauge className="mr-1 inline h-3.5 w-3.5" />{scoreGap}% {copy.gap}</span>
                </div>
                <Link
                  href={`/${lang}/builds/${build.slug}`}
                  className="inline-flex items-center font-semibold text-violet-700 hover:underline dark:text-violet-300"
                >
                  {copy.viewAnalysis} <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-600 sm:flex-row dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
        <span className="flex items-center gap-1.5"><Cpu className="h-4 w-4" />{copy.selectionNote}</span>
        <span>{copy.reviewed} {getPopularBuildReviewedDate(lang)}</span>
      </div>
    </section>
  );
}
