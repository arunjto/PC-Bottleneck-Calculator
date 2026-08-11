import Link from 'next/link';
import { ArrowRight, Gamepad2, Wrench, Zap } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/lib/path-translations';
import { getToolsPageCopy } from '@/lib/tools-page-i18n';

const SECTION_COPY: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Continue Your Build Check',
    description: 'Use the result as context, then answer the next practical question with a focused calculator.',
  },
  it: {
    title: 'Continua la Verifica della Build',
    description: 'Usa il risultato come contesto, poi rispondi alla domanda pratica successiva con un calcolatore specifico.',
  },
  fr: {
    title: 'Poursuivez la Vérification de Votre Configuration',
    description: 'Utilisez le résultat comme contexte, puis répondez à la prochaine question pratique avec un calculateur ciblé.',
  },
  de: {
    title: 'Build-Prüfung Fortsetzen',
    description: 'Nutzen Sie das Ergebnis als Kontext und beantworten Sie die nächste praktische Frage mit einem passenden Rechner.',
  },
  es: {
    title: 'Continúa Comprobando tu Configuración',
    description: 'Usa el resultado como contexto y responde a la siguiente pregunta práctica con una calculadora específica.',
  },
};

export function FeaturedCalculators({ lang }: { lang: Locale }) {
  const section = SECTION_COPY[lang];
  const toolsCopy = getToolsPageCopy(lang);
  const calculators = [
    {
      key: 'fps',
      href: getLocalizedPath(lang, 'fps-calculator'),
      title: toolsCopy.coreTools.fps.title,
      description: toolsCopy.coreTools.fps.description,
      icon: Gamepad2,
      cardClass: 'border-blue-200 bg-blue-50/60 hover:border-blue-400 dark:border-blue-900 dark:bg-blue-950/20 dark:hover:border-blue-700',
      iconClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/70 dark:text-blue-200',
      linkClass: 'text-blue-700 dark:text-blue-300',
    },
    {
      key: 'psu',
      href: getLocalizedPath(lang, 'psu-calculator'),
      title: toolsCopy.coreTools.psu.title,
      description: toolsCopy.coreTools.psu.description,
      icon: Zap,
      cardClass: 'border-amber-200 bg-amber-50/60 hover:border-amber-400 dark:border-amber-900 dark:bg-amber-950/20 dark:hover:border-amber-700',
      iconClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/70 dark:text-amber-200',
      linkClass: 'text-amber-700 dark:text-amber-300',
    },
  ];

  return (
    <section aria-labelledby="featured-calculators-title" className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      <div className="mb-6 max-w-3xl">
        <h2 id="featured-calculators-title" className="text-2xl font-bold tracking-tight md:text-3xl">
          {section.title}
        </h2>
        <p className="mt-2 leading-7 text-muted-foreground">{section.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {calculators.map(({ key, href, title, description, icon: Icon, cardClass, iconClass, linkClass }) => (
          <Link
            key={key}
            href={href}
            className={`group rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${cardClass}`}
          >
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{description}</p>
            <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${linkClass}`}>
              {toolsCopy.openTool}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-5 text-center">
        <Link
          href={getLocalizedPath(lang, 'tools')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          <Wrench className="h-4 w-4" aria-hidden="true" />
          {toolsCopy.viewAllTools}
        </Link>
      </div>
    </section>
  );
}
