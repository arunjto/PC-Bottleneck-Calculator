import Link from 'next/link';
import { ArrowRight, GitCompareArrows, MemoryStick, Monitor, PlugZap } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import {
  getPopularBuild,
  getPopularBuildAnalysis,
  type PopularBuild,
} from '@/lib/popular-builds';
import {
  getLocalizedBuildDetails,
  getPopularBuildCopy,
  localizedConstraintLabel,
} from '@/lib/popular-builds-i18n';

const ALTERNATIVE_BUILD_SLUGS: Record<string, string> = {
  'ryzen-5-5600x-rtx-4060': 'core-i5-12600k-rtx-4060',
  'core-i5-12600k-rtx-4060': 'ryzen-5-5600x-rtx-4060',
  'ryzen-5-7600x-rx-7800-xt': 'core-i5-14600k-rtx-4070-super',
  'core-i5-14600k-rtx-4070-super': 'ryzen-5-7600x-rx-7800-xt',
  'ryzen-7-7800x3d-rtx-5070': 'core-i5-14600k-rtx-4070-super',
  'ryzen-7-9800x3d-rtx-5080': 'ryzen-7-7800x3d-rtx-5070',
};

const COPY: Record<Locale, {
  heading: string;
  intro: string;
  current: string;
  alternative: string;
  resolution: string;
  platform: string;
  graphicsMemory: string;
  combinedPower: string;
  psu: string;
  modelResult: string;
  open: string;
  note: string;
}> = {
  en: { heading: 'Compare a curated alternative', intro: 'Use this side-by-side view to test whether a different platform or graphics tier better matches your target. Prices and game benchmarks still need separate verification.', current: 'Current build', alternative: 'Alternative to compare', resolution: 'Target', platform: 'Platform', graphicsMemory: 'Graphics memory', combinedPower: 'Published CPU + GPU power', psu: 'PSU planning size', modelResult: 'Modelled constraint', open: 'Open the alternative analysis', note: 'A higher planning score does not automatically make the alternative a better purchase. Compare exact-game results, total platform cost, cooling and upgrade path.' },
  de: { heading: 'Kuratierte Alternative vergleichen', intro: 'Mit diesem direkten Vergleich prüfst du, ob eine andere Plattform oder GPU-Klasse besser zum Ziel passt. Preise und Spiele-Benchmarks müssen separat geprüft werden.', current: 'Aktueller Build', alternative: 'Vergleichsalternative', resolution: 'Ziel', platform: 'Plattform', graphicsMemory: 'Grafikspeicher', combinedPower: 'Veröffentlichte CPU- und GPU-Leistung', psu: 'Netzteil-Planungsgröße', modelResult: 'Modellierter Engpass', open: 'Alternative Analyse öffnen', note: 'Ein höherer Planungswert macht die Alternative nicht automatisch zum besseren Kauf. Prüfe konkrete Spiele, Plattformkosten, Kühlung und Upgrade-Pfad.' },
  fr: { heading: 'Comparer une alternative sélectionnée', intro: 'Cette vue côte à côte aide à déterminer si une autre plateforme ou gamme graphique correspond mieux à la cible. Vérifiez séparément les prix et benchmarks de jeux.', current: 'Configuration actuelle', alternative: 'Alternative à comparer', resolution: 'Cible', platform: 'Plateforme', graphicsMemory: 'Mémoire graphique', combinedPower: 'Puissance CPU + GPU publiée', psu: 'Capacité PSU prévue', modelResult: 'Contrainte modélisée', open: 'Ouvrir l’analyse alternative', note: 'Un score de planification supérieur ne rend pas automatiquement l’alternative préférable. Comparez jeux précis, coût de plateforme, refroidissement et évolutivité.' },
  it: { heading: 'Confronta un’alternativa selezionata', intro: 'Questo confronto aiuta a capire se un’altra piattaforma o fascia grafica si adatta meglio all’obiettivo. Prezzi e benchmark dei giochi vanno verificati separatamente.', current: 'Build attuale', alternative: 'Alternativa da confrontare', resolution: 'Obiettivo', platform: 'Piattaforma', graphicsMemory: 'Memoria grafica', combinedPower: 'Potenza CPU + GPU dichiarata', psu: 'Taglio PSU previsto', modelResult: 'Limite modellato', open: 'Apri l’analisi alternativa', note: 'Un punteggio di pianificazione più alto non rende automaticamente migliore l’acquisto. Confronta giochi specifici, costo della piattaforma, raffreddamento e percorso di upgrade.' },
  es: { heading: 'Compara una alternativa seleccionada', intro: 'Esta vista ayuda a comprobar si otra plataforma o nivel gráfico encaja mejor con el objetivo. Los precios y benchmarks de juegos deben verificarse por separado.', current: 'Configuración actual', alternative: 'Alternativa para comparar', resolution: 'Objetivo', platform: 'Plataforma', graphicsMemory: 'Memoria gráfica', combinedPower: 'Potencia publicada de CPU + GPU', psu: 'Tamaño de PSU previsto', modelResult: 'Límite modelado', open: 'Abrir el análisis alternativo', note: 'Una puntuación de planificación mayor no convierte automáticamente la alternativa en una compra mejor. Compara juegos concretos, coste de plataforma, refrigeración y posibilidades de actualización.' },
  ru: { heading: 'Сравните с подобранной альтернативой', intro: 'Сравнение помогает понять, лучше ли подходит другая платформа или класс видеокарты. Цены и игровые тесты нужно проверять отдельно.', current: 'Текущая сборка', alternative: 'Альтернатива', resolution: 'Цель', platform: 'Платформа', graphicsMemory: 'Видеопамять', combinedPower: 'Заявленная мощность CPU + GPU', psu: 'Плановый блок питания', modelResult: 'Расчётное ограничение', open: 'Открыть анализ альтернативы', note: 'Более высокий плановый индекс не означает автоматически более выгодную покупку. Сравните нужные игры, полную стоимость платформы, охлаждение и путь обновления.' },
};

export function BuildAlternativeComparison({ lang, build }: { lang: Locale; build: PopularBuild }) {
  const alternative = getPopularBuild(ALTERNATIVE_BUILD_SLUGS[build.slug]);
  if (!alternative) return null;

  const copy = COPY[lang] ?? COPY.en;
  const buildCopy = getPopularBuildCopy(lang);
  const current = getPopularBuildAnalysis(build);
  const candidate = getPopularBuildAnalysis(alternative);
  const currentDetails = getLocalizedBuildDetails(build, lang);
  const candidateDetails = getLocalizedBuildDetails(alternative, lang);
  const cards = [
    { label: copy.current, build, details: currentDetails, analysis: current },
    { label: copy.alternative, build: alternative, details: candidateDetails, analysis: candidate },
  ];
  const headingId = `alternative-${build.slug}`;

  return (
    <section aria-labelledby={headingId} className="space-y-5 rounded-2xl border border-violet-200 bg-violet-50/30 p-6 dark:border-violet-900 dark:bg-violet-950/20 md:p-8">
      <div className="max-w-4xl">
        <h2 id={headingId} className="flex items-center gap-2 text-2xl font-bold">
          <GitCompareArrows className="h-6 w-6 text-violet-600" aria-hidden="true" />
          {copy.heading}
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {cards.map((item) => (
          <article key={item.build.slug} className="rounded-xl border bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">{item.label}</p>
            <h3 className="mt-2 text-lg font-bold">{item.analysis.cpu.name} + {item.analysis.gpu.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.details.category}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-muted/50 p-3"><dt className="text-muted-foreground">{copy.resolution}</dt><dd className="mt-1 font-semibold">{item.build.resolution}</dd></div>
              <div className="rounded-lg bg-muted/50 p-3"><dt className="text-muted-foreground">{copy.platform}</dt><dd className="mt-1 font-semibold">{item.analysis.cpu.socket}</dd></div>
              <div className="rounded-lg bg-muted/50 p-3"><dt className="flex items-center gap-1 text-muted-foreground"><MemoryStick className="h-4 w-4" aria-hidden="true" />{copy.graphicsMemory}</dt><dd className="mt-1 font-semibold">{item.analysis.gpu.vram} GB</dd></div>
              <div className="rounded-lg bg-muted/50 p-3"><dt className="flex items-center gap-1 text-muted-foreground"><PlugZap className="h-4 w-4" aria-hidden="true" />{copy.combinedPower}</dt><dd className="mt-1 font-semibold">{item.analysis.cpu.tdp + item.analysis.gpu.tdp} W</dd></div>
              <div className="rounded-lg bg-muted/50 p-3"><dt className="text-muted-foreground">{copy.psu}</dt><dd className="mt-1 font-semibold">{item.analysis.commonPsu} W</dd></div>
              <div className="rounded-lg bg-muted/50 p-3"><dt className="flex items-center gap-1 text-muted-foreground"><Monitor className="h-4 w-4" aria-hidden="true" />{copy.modelResult}</dt><dd className="mt-1 font-semibold">{localizedConstraintLabel(buildCopy, item.analysis.constraint)}</dd></div>
            </dl>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-xl border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{copy.note}</p>
        <Link href={`/${lang}/builds/${alternative.slug}`} className="inline-flex shrink-0 items-center gap-1 font-semibold text-violet-700 hover:underline dark:text-violet-300">
          {copy.open}<ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
