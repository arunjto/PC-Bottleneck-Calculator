import Link from 'next/link';
import { ArrowRight, Monitor, Wrench } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getBlogResourceLinks } from '@/lib/blog-resource-links';
import { getToolContent, getToolPath } from '@/lib/pc-tools';
import { getPopularBuild, getPopularBuildAnalysis } from '@/lib/popular-builds';
import { getLocalizedBuildDetails } from '@/lib/popular-builds-i18n';

const COPY: Record<Locale, {
  title: string;
  intro: string;
  tools: string;
  builds: string;
  open: string;
}> = {
  en: { title: 'Continue your PC planning', intro: 'Use the guide as context, then test the decision with a focused calculator or a worked build example.', tools: 'Relevant calculators', builds: 'Build examples', open: 'Open resource' },
  it: { title: 'Continua a pianificare il PC', intro: 'Usa la guida come contesto, poi verifica la decisione con un calcolatore specifico o un esempio di build.', tools: 'Calcolatori pertinenti', builds: 'Esempi di build', open: 'Apri la risorsa' },
  fr: { title: 'Poursuivez la planification du PC', intro: 'Utilisez le guide comme contexte, puis vérifiez votre décision avec un calculateur ciblé ou un exemple de configuration.', tools: 'Calculateurs pertinents', builds: 'Exemples de configurations', open: 'Ouvrir la ressource' },
  de: { title: 'PC-Planung fortsetzen', intro: 'Nutzen Sie den Leitfaden als Kontext und prüfen Sie die Entscheidung mit einem passenden Rechner oder Build-Beispiel.', tools: 'Passende Rechner', builds: 'Build-Beispiele', open: 'Ressource öffnen' },
  es: { title: 'Continúa planificando tu PC', intro: 'Usa la guía como contexto y comprueba la decisión con una calculadora específica o un ejemplo de configuración.', tools: 'Calculadoras relacionadas', builds: 'Ejemplos de configuraciones', open: 'Abrir recurso' },
  ru: { title: 'Продолжите планирование ПК', intro: 'Используйте руководство как контекст, а затем проверьте решение в подходящем калькуляторе или на примере сборки.', tools: 'Подходящие калькуляторы', builds: 'Примеры сборок', open: 'Открыть ресурс' },
};

export function PlanningResources({ lang, canonicalSlug }: { lang: Locale; canonicalSlug: string }) {
  const resources = getBlogResourceLinks(canonicalSlug);
  if (!resources) return null;

  const copy = COPY[lang] ?? COPY.en;
  const builds = resources.builds
    .map((slug) => getPopularBuild(slug))
    .filter((build): build is NonNullable<typeof build> => Boolean(build));

  return (
    <section aria-labelledby="planning-resources-title" className="my-10 rounded-2xl border border-blue-200 bg-blue-50/40 p-5 dark:border-blue-900 dark:bg-blue-950/20 sm:p-6">
      <h2 id="planning-resources-title" className="text-2xl font-bold tracking-tight">{copy.title}</h2>
      <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">{copy.intro}</p>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
            <Wrench className="h-4 w-4" aria-hidden="true" />{copy.tools}
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {resources.tools.map((slug) => {
              const tool = getToolContent(slug, lang);
              return (
                <Link key={slug} href={getToolPath(lang, slug)} className="group rounded-xl border bg-background p-4 no-underline transition hover:border-blue-400 hover:shadow-sm">
                  <span className="font-semibold text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-300">{tool.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">{tool.shortDescription}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300">{copy.open}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>

        {builds.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-violet-800 dark:text-violet-300">
              <Monitor className="h-4 w-4" aria-hidden="true" />{copy.builds}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {builds.map((build) => {
                const { cpu, gpu } = getPopularBuildAnalysis(build);
                const localized = getLocalizedBuildDetails(build, lang);
                return (
                  <Link key={build.slug} href={`/${lang}/builds/${build.slug}`} className="group rounded-xl border bg-background p-4 no-underline transition hover:border-violet-400 hover:shadow-sm">
                    <span className="font-semibold text-foreground group-hover:text-violet-700 dark:group-hover:text-violet-300">{cpu.name} + {gpu.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{localized.category} · {build.ramLabel}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 dark:text-violet-300">{copy.open}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
