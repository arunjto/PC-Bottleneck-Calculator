import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarCheck, UserRound } from 'lucide-react';
import { Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/lib/path-translations';

type MaintainerCopy = {
  eyebrow: string;
  title: string;
  description: string;
  aboutAuthor: string;
  methodology: string;
  reviewed: string;
  imageAlt: string;
};

const COPY: Record<Locale, MaintainerCopy> = {
  en: {
    eyebrow: 'Editorial responsibility',
    title: 'Who maintains this calculator?',
    description:
      'Reviewed and maintained by Arun Kumar Yadav, founder and editor of PCBuildCheck. Arun maintains the hardware database, calculation methodology and practical PC-building guides. Calculator results are planning estimates based on maintained hardware specifications—not laboratory measurements.',
    aboutAuthor: 'About the author',
    methodology: 'Read the methodology',
    reviewed: 'Last reviewed: August 2026',
    imageAlt: 'Arun Kumar Yadav, founder and editor of PCBuildCheck',
  },
  it: {
    eyebrow: 'Responsabilità editoriale',
    title: 'Chi mantiene questo calcolatore?',
    description:
      'Revisionato e mantenuto da Arun Kumar Yadav, fondatore e redattore di PCBuildCheck. Arun cura il database hardware, la metodologia di calcolo e le guide pratiche per l’assemblaggio di PC. I risultati sono stime di pianificazione basate su specifiche hardware mantenute, non misurazioni di laboratorio.',
    aboutAuthor: 'Informazioni sull’autore',
    methodology: 'Leggi la metodologia',
    reviewed: 'Ultima revisione: agosto 2026',
    imageAlt: 'Arun Kumar Yadav, fondatore e redattore di PCBuildCheck',
  },
  fr: {
    eyebrow: 'Responsabilité éditoriale',
    title: 'Qui maintient ce calculateur ?',
    description:
      'Révisé et maintenu par Arun Kumar Yadav, fondateur et éditeur de PCBuildCheck. Arun gère la base de données matérielle, la méthodologie de calcul et les guides pratiques de montage PC. Les résultats sont des estimations de planification fondées sur des spécifications matérielles maintenues, et non des mesures en laboratoire.',
    aboutAuthor: 'À propos de l’auteur',
    methodology: 'Lire la méthodologie',
    reviewed: 'Dernière révision : août 2026',
    imageAlt: 'Arun Kumar Yadav, fondateur et éditeur de PCBuildCheck',
  },
  de: {
    eyebrow: 'Redaktionelle Verantwortung',
    title: 'Wer pflegt diesen Rechner?',
    description:
      'Geprüft und gepflegt von Arun Kumar Yadav, Gründer und Redakteur von PCBuildCheck. Arun betreut die Hardware-Datenbank, die Berechnungsmethodik und praktische PC-Bau-Ratgeber. Die Ergebnisse sind Planungsschätzungen auf Grundlage gepflegter Hardware-Spezifikationen und keine Labormessungen.',
    aboutAuthor: 'Über den Autor',
    methodology: 'Methodik lesen',
    reviewed: 'Zuletzt geprüft: August 2026',
    imageAlt: 'Arun Kumar Yadav, Gründer und Redakteur von PCBuildCheck',
  },
  es: {
    eyebrow: 'Responsabilidad editorial',
    title: '¿Quién mantiene esta calculadora?',
    description:
      'Revisada y mantenida por Arun Kumar Yadav, fundador y editor de PCBuildCheck. Arun mantiene la base de datos de hardware, la metodología de cálculo y las guías prácticas de montaje de PC. Los resultados son estimaciones de planificación basadas en especificaciones de hardware mantenidas, no mediciones de laboratorio.',
    aboutAuthor: 'Sobre el autor',
    methodology: 'Leer la metodología',
    reviewed: 'Última revisión: agosto de 2026',
    imageAlt: 'Arun Kumar Yadav, fundador y editor de PCBuildCheck',
  },
};

export function CalculatorMaintainer({ lang }: { lang: Locale }) {
  const copy = COPY[lang];

  return (
    <aside
      aria-labelledby="calculator-maintainer-title"
      className="my-10 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50/70 shadow-sm dark:border-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30"
    >
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500" />
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start md:p-8">
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400 opacity-70 blur-[2px]" />
          <Image
            src="/author-arun-kumar-yadav.jpg"
            alt={copy.imageAlt}
            width={88}
            height={88}
            className="relative h-20 w-20 rounded-full border-2 border-white object-cover shadow-md dark:border-slate-900 sm:h-[88px] sm:w-[88px]"
          />
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
            <UserRound className="h-4 w-4" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 id="calculator-maintainer-title" className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {copy.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300 md:text-base">
            {copy.description}
          </p>

          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={getLocalizedPath(lang, 'author')}
              className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:underline dark:text-blue-300"
            >
              {copy.aboutAuthor}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="hidden text-slate-300 dark:text-slate-600 sm:inline" aria-hidden="true">•</span>
            <Link
              href={getLocalizedPath(lang, 'methodology')}
              className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:underline dark:text-blue-300"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {copy.methodology}
            </Link>
            <span className="hidden text-slate-300 dark:text-slate-600 sm:inline" aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              {copy.reviewed}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
