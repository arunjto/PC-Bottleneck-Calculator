import Link from 'next/link';
import { ArrowRight, Gamepad2, Monitor, Zap } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getGuideCards } from '@/lib/can-i-run';
import { getLocalizedPath } from '@/lib/path-translations';
import { POPULAR_BUILDS, getPopularBuildAnalysis } from '@/lib/popular-builds';
import { getLocalizedBuildDetails } from '@/lib/popular-builds-i18n';
import { getPlanningDiscoveryCopy } from '@/lib/planning-discovery-i18n';

export function GameGuideLinks({ lang }: { lang: Locale }) {
  const copy = getPlanningDiscoveryCopy(lang);
  const games = getGuideCards(lang);
  return (
    <section aria-labelledby="game-guide-links-title" className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
          <Gamepad2 className="h-4 w-4" aria-hidden="true" />{copy.eyebrow}
        </p>
        <h2 id="game-guide-links-title" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{copy.gamesTitle}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.gamesIntro}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link key={game.slug} href={getLocalizedPath(lang, `can-i-run/${game.slug}`)} className="group rounded-xl border bg-background p-4 transition hover:border-indigo-400 hover:shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{game.category}</p>
            <h3 className="mt-2 font-bold group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{game.name}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{game.summary}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
              {copy.openGame}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
      <Link href={getLocalizedPath(lang, 'can-i-run')} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
        {copy.allGames}<ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

export function BuildGuideLinks({ lang }: { lang: Locale }) {
  const copy = getPlanningDiscoveryCopy(lang);
  return (
    <section aria-labelledby="build-guide-links-title" className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-300">
          <Zap className="h-4 w-4" aria-hidden="true" />{copy.eyebrow}
        </p>
        <h2 id="build-guide-links-title" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{copy.buildsTitle}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.buildsIntro}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR_BUILDS.map((build) => {
          const { cpu, gpu, commonPsu } = getPopularBuildAnalysis(build);
          const localized = getLocalizedBuildDetails(build, lang);
          return (
            <Link key={build.slug} href={`/${lang}/builds/${build.slug}`} className="group rounded-xl border bg-background p-4 transition hover:border-violet-400 hover:shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{localized.category}</p>
              <h3 className="mt-2 font-bold group-hover:text-violet-700 dark:group-hover:text-violet-300">{cpu.name} + {gpu.name}</h3>
              <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span><Monitor className="mr-1 inline h-4 w-4" />{build.resolution}</span>
                <span><Zap className="mr-1 inline h-4 w-4" />{commonPsu}W PSU</span>
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 dark:text-violet-300">
                {copy.openBuild}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
      <Link href={`/${lang}/builds`} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
        {copy.allBuilds}<ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
