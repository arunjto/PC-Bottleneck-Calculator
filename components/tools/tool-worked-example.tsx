import { BookOpenCheck, FlaskConical } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { ToolContent, ToolSlug } from '@/lib/pc-tools';

type PriorityToolSlug = Extract<
  ToolSlug,
  | 'component-comparison'
  | 'pc-upgrade-priority-calculator'
  | 'resolution-scaling-calculator'
  | 'ssd-upgrade-calculator'
>;

type ExampleCopy = {
  heading: string;
  intro: string;
  inputs: string;
  output: string;
  interpretation: string;
  results: Record<PriorityToolSlug, string>;
};

const EXAMPLE_INPUTS: Record<PriorityToolSlug, string> = {
  'component-comparison': 'NVIDIA GeForce RTX 4060 → AMD Radeon RX 7800 XT · GPU',
  'pc-upgrade-priority-calculator': 'Ryzen 5 5600X · RTX 4060 · 16 GB · SATA SSD · 2560×1440',
  'resolution-scaling-calculator': '2560×1440 · 75% render scale · 1920×1080 comparison',
  'ssd-upgrade-calculator': 'HDD → PCIe 4.0 NVMe · 2,000 GB × 0.90 − 200 GB − 500 GB · 80 GB',
};

const COPY: Record<Locale, ExampleCopy> = {
  en: {
    heading: 'Worked planning example',
    intro: 'This static example shows what the calculator evaluates before you enter your own hardware.',
    inputs: 'Example inputs',
    output: 'Calculated reading',
    interpretation: 'How to use it',
    results: {
      'component-comparison': 'Planning score 62 → 77 (+24%); VRAM 8 → 16 GB; published board power 115 → 263 W.',
      'pc-upgrade-priority-calculator': 'GPU shortfall ≈ 35%, RAM shortfall = 35%, CPU shortfall ≈ 1%; storage has no urgent modelled gap.',
      'resolution-scaling-calculator': '1920×1080 internal render, about 2.07 million pixels—43.8% fewer pixels than native 1440p.',
      'ssd-upgrade-calculator': 'About 1,100 GB estimated free capacity, or roughly 13 additional games at 80 GB each.',
    },
  },
  de: {
    heading: 'Durchgerechnetes Planungsbeispiel',
    intro: 'Dieses statische Beispiel zeigt, was der Rechner bewertet, bevor du eigene Hardware eingibst.',
    inputs: 'Beispieleingaben',
    output: 'Berechnete Einordnung',
    interpretation: 'So nutzt du das Ergebnis',
    results: {
      'component-comparison': 'Planungswert 62 → 77 (+24 %); VRAM 8 → 16 GB; veröffentlichte Board-Leistung 115 → 263 W.',
      'pc-upgrade-priority-calculator': 'GPU-Defizit ≈ 35 %, RAM-Defizit = 35 %, CPU-Defizit ≈ 1 %; beim Speicher besteht kein dringender Modellabstand.',
      'resolution-scaling-calculator': 'Interne Ausgabe 1920×1080 mit etwa 2,07 Millionen Pixeln – 43,8 % weniger als natives 1440p.',
      'ssd-upgrade-calculator': 'Etwa 1.100 GB geschätzter freier Platz oder ungefähr 13 weitere Spiele mit je 80 GB.',
    },
  },
  fr: {
    heading: 'Exemple de planification calculé',
    intro: 'Cet exemple statique montre ce que le calculateur évalue avant la saisie de votre matériel.',
    inputs: 'Entrées de l’exemple',
    output: 'Lecture calculée',
    interpretation: 'Comment l’utiliser',
    results: {
      'component-comparison': 'Score de planification 62 → 77 (+24 %) ; VRAM 8 → 16 Go ; puissance de carte publiée 115 → 263 W.',
      'pc-upgrade-priority-calculator': 'Manque GPU ≈ 35 %, manque de RAM = 35 %, manque CPU ≈ 1 % ; aucun manque urgent modélisé pour le stockage.',
      'resolution-scaling-calculator': 'Rendu interne 1920×1080, environ 2,07 millions de pixels — 43,8 % de moins que le 1440p natif.',
      'ssd-upgrade-calculator': 'Environ 1 100 Go de capacité libre estimée, soit près de 13 jeux supplémentaires de 80 Go.',
    },
  },
  it: {
    heading: 'Esempio di pianificazione calcolato',
    intro: 'Questo esempio statico mostra cosa valuta il calcolatore prima di inserire il tuo hardware.',
    inputs: 'Dati dell’esempio',
    output: 'Lettura calcolata',
    interpretation: 'Come usarla',
    results: {
      'component-comparison': 'Punteggio di pianificazione 62 → 77 (+24%); VRAM 8 → 16 GB; potenza dichiarata 115 → 263 W.',
      'pc-upgrade-priority-calculator': 'Carenza GPU ≈ 35%, carenza RAM = 35%, carenza CPU ≈ 1%; nessuna urgenza modellata per lo storage.',
      'resolution-scaling-calculator': 'Rendering interno 1920×1080, circa 2,07 milioni di pixel: il 43,8% in meno rispetto al 1440p nativo.',
      'ssd-upgrade-calculator': 'Circa 1.100 GB di spazio libero stimato, equivalenti a circa 13 giochi aggiuntivi da 80 GB.',
    },
  },
  es: {
    heading: 'Ejemplo de planificación calculado',
    intro: 'Este ejemplo estático muestra qué evalúa la calculadora antes de introducir tu propio hardware.',
    inputs: 'Datos del ejemplo',
    output: 'Lectura calculada',
    interpretation: 'Cómo utilizarla',
    results: {
      'component-comparison': 'Puntuación de planificación 62 → 77 (+24%); VRAM 8 → 16 GB; potencia publicada 115 → 263 W.',
      'pc-upgrade-priority-calculator': 'Déficit de GPU ≈ 35%, déficit de RAM = 35%, déficit de CPU ≈ 1%; el almacenamiento no tiene una carencia urgente modelada.',
      'resolution-scaling-calculator': 'Renderizado interno 1920×1080, unos 2,07 millones de píxeles: un 43,8% menos que 1440p nativo.',
      'ssd-upgrade-calculator': 'Unos 1.100 GB de capacidad libre estimada, aproximadamente 13 juegos adicionales de 80 GB.',
    },
  },
  ru: {
    heading: 'Разобранный пример планирования',
    intro: 'Этот статический пример показывает, что оценивает калькулятор до ввода вашей конфигурации.',
    inputs: 'Исходные данные примера',
    output: 'Расчётная оценка',
    interpretation: 'Как использовать результат',
    results: {
      'component-comparison': 'Плановый индекс 62 → 77 (+24%); VRAM 8 → 16 ГБ; заявленная мощность платы 115 → 263 Вт.',
      'pc-upgrade-priority-calculator': 'Дефицит GPU ≈ 35%, RAM = 35%, CPU ≈ 1%; для накопителя срочного модельного дефицита нет.',
      'resolution-scaling-calculator': 'Внутренний рендер 1920×1080, около 2,07 млн пикселей — на 43,8% меньше нативного 1440p.',
      'ssd-upgrade-calculator': 'Около 1 100 ГБ расчётного свободного места, то есть примерно 13 дополнительных игр по 80 ГБ.',
    },
  },
};

function isPriorityTool(slug: ToolSlug): slug is PriorityToolSlug {
  return slug in EXAMPLE_INPUTS;
}

export function ToolWorkedExample({
  slug,
  lang,
  content,
}: {
  slug: ToolSlug;
  lang: Locale;
  content: ToolContent;
}) {
  if (!isPriorityTool(slug)) return null;

  const copy = COPY[lang] ?? COPY.en;
  return (
    <section aria-labelledby="worked-example-title" className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 dark:border-emerald-900 dark:bg-emerald-950/20 md:p-8">
      <div className="max-w-4xl">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
          <FlaskConical className="h-4 w-4" aria-hidden="true" />
          {copy.heading}
        </p>
        <h2 id="worked-example-title" className="mt-3 text-3xl font-semibold">{content.title}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-background p-5">
          <h3 className="font-semibold">{copy.inputs}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{EXAMPLE_INPUTS[slug]}</p>
        </div>
        <div className="rounded-xl border bg-background p-5">
          <h3 className="font-semibold">{copy.output}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.results[slug]}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/60 p-5 dark:border-blue-900 dark:bg-blue-950/20">
        <h3 className="flex items-center gap-2 font-semibold">
          <BookOpenCheck className="h-5 w-5 text-blue-600" aria-hidden="true" />
          {copy.interpretation}
        </h3>
        <p className="mt-2 leading-7 text-muted-foreground">{content.resultGuide}</p>
        <p className="mt-3 text-sm leading-6 text-blue-900 dark:text-blue-100">{content.methodologyOverview}</p>
      </div>
    </section>
  );
}
