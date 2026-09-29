import Link from 'next/link';
import { ArrowRight, Cpu, Gamepad2, Zap } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { Card, CardContent } from '@/components/ui/card';
import { getBuildDecisionCopy } from '@/lib/build-decision-i18n';
import { BUILD_GAMES } from '@/lib/detail-recommendations';
import { getGameGuideDefinition } from '@/lib/game-guides';
import { getLocalizedPath } from '@/lib/path-translations';
import { getPopularBuildAnalysis, type PopularBuild } from '@/lib/popular-builds';

export function BuildDecisionCheckpoint({ lang, build }: { lang: Locale; build: PopularBuild }) {
  const copy = getBuildDecisionCopy(lang);
  const gameSlug = BUILD_GAMES[build.slug]?.[0];

  if (!copy || !gameSlug) return null;

  const summary = copy.summaries[build.slug];
  const game = getGameGuideDefinition(gameSlug);
  const { cpu, gpu, commonPsu } = getPopularBuildAnalysis(build);
  const publishedPower = cpu.tdp + gpu.tdp;

  if (!summary) return null;

  const checks = [
    {
      title: copy.platformTitle,
      body: copy.platformBody(cpu.socket || 'CPU', build.ramLabel),
      icon: Cpu,
      iconClass: 'text-blue-600',
    },
    {
      title: copy.workloadTitle,
      body: copy.workloadBody(build.resolution, gpu.vram, game.name),
      icon: Gamepad2,
      iconClass: 'text-violet-600',
    },
    {
      title: copy.powerTitle,
      body: copy.powerBody(publishedPower, commonPsu),
      icon: Zap,
      iconClass: 'text-amber-600',
    },
  ] as const;

  return (
    <section aria-labelledby={`build-decision-${build.slug}`} className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-950/40 sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">{copy.eyebrow}</p>
        <h2 id={`build-decision-${build.slug}`} className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{copy.title}</h2>
        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">{copy.intro}</p>
        <p className="mt-4 border-l-4 border-blue-500 pl-4 font-medium leading-7 text-gray-800 dark:text-gray-100">{summary}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {checks.map(({ title, body, icon: Icon, iconClass }) => (
          <Card key={title} className="bg-background/90 shadow-none">
            <CardContent className="pt-6">
              <Icon className={`mb-3 h-6 w-6 ${iconClass}`} aria-hidden="true" />
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href={getLocalizedPath(lang, `can-i-run/${game.slug}`)} className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:underline dark:text-blue-300">
        {copy.gameLink(game.name)}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
