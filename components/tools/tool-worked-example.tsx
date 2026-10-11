import { BookOpenCheck, FlaskConical } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { ToolContent, ToolSlug } from '@/lib/pc-tools';

type ExampleCopy = {
  heading: string;
  intro: string;
  inputs: string;
  output: string;
  interpretation: string;
};

const EXAMPLE_INPUTS: Record<ToolSlug, string> = {
  'gpu-upgrade-calculator': 'Ryzen 5 5600X · RTX 4060 → RX 7800 XT · 60 FPS',
  'cpu-upgrade-calculator': 'Ryzen 5 5600X → Ryzen 5 7600X · RTX 4060 · 100 FPS',
  'component-comparison': 'NVIDIA GeForce RTX 4060 → AMD Radeon RX 7800 XT · GPU',
  'what-games-can-my-pc-run': 'Ryzen 5 5600X · RTX 4060 · 16 GB · 1920×1080 · ≥60 FPS',
  'vram-calculator': 'Cyberpunk 2077 · 2560×1440 · Ultra · RT Light · Upscaling Quality',
  'gaming-ram-calculator': 'AAA 16 GB + multitasking 4 GB + streaming 6 GB + mods 3 GB',
  'frame-time-calculator': '60 FPS → 120 FPS',
  'fps-refresh-rate-calculator': '110 FPS · 144 Hz',
  'resolution-scaling-calculator': '2560×1440 · 75% · 1920×1080',
  'game-settings-optimizer': 'Ryzen 5 5600X · RTX 4060 · Cyberpunk 2077 · 2560×1440 · 16 GB · ≥60 FPS',
  'ssd-upgrade-calculator': 'HDD → PCIe 4.0 NVMe · 2,000 GB × 0.90 − 200 GB − 500 GB · 80 GB',
  'pc-upgrade-priority-calculator': 'Ryzen 5 5600X · RTX 4060 · 16 GB · SATA SSD · 2560×1440',
};

// These outputs are intentionally static and reproducible from the public
// formula shown on each page. They demonstrate the model without pretending
// to be measured benchmarks.
const EXAMPLE_OUTPUTS: Record<ToolSlug, string> = {
  'gpu-upgrade-calculator': '60 → ≈75 FPS · +24.2% · VRAM 8 → 16 GB · TBP +148 W',
  'cpu-upgrade-calculator': '100 → ≈100 FPS · +0.0% · score +4.1% · AM4 → AM5',
  'component-comparison': 'Score 62 → 77 (+24%) · VRAM 8 → 16 GB · TBP 115 → 263 W',
  'what-games-can-my-pc-run': '6 profiles · 1920×1080 · ≥60 FPS · minimum → recommended → model',
  'vram-calculator': '11.75 GB · 10.6–12.9 GB → 16 GB · +4.25 GB',
  'gaming-ram-calculator': '29 GB × 1.20 → 48 GB · +19 GB',
  'frame-time-calculator': '60 FPS = 16.67 ms · 120 FPS = 8.33 ms · Δ 8.34 ms',
  'fps-refresh-rate-calculator': '110 ÷ 144 = 76.4% · +34 Hz · 9.09 ms',
  'resolution-scaling-calculator': '1920×1080 · 2.07 MP · −43.8%',
  'game-settings-optimizer': 'Competitive · ≈55 FPS · Ultra ≈29 FPS · GPU',
  'ssd-upgrade-calculator': '2,000 × 0.90 − 200 − 500 = 1,100 GB · floor(1,100 ÷ 80) = 13',
  'pc-upgrade-priority-calculator': 'GPU ≈35% · RAM = 35% · CPU ≈1% · SSD = 0%',
};

const COPY: Record<Locale, ExampleCopy> = {
  en: {
    heading: 'Worked planning example',
    intro: 'This reproducible example shows the inputs, formula outcome and decision the calculator supports before you enter your own hardware.',
    inputs: 'Example inputs',
    output: 'Calculated reading',
    interpretation: 'How to use it',
  },
  de: {
    heading: 'Durchgerechnetes Planungsbeispiel',
    intro: 'Dieses reproduzierbare Beispiel zeigt Eingaben, Formelergebnis und die unterstützte Entscheidung, bevor du eigene Hardware eingibst.',
    inputs: 'Beispieleingaben',
    output: 'Berechnete Einordnung',
    interpretation: 'So nutzt du das Ergebnis',
  },
  fr: {
    heading: 'Exemple de planification calculé',
    intro: 'Cet exemple reproductible présente les entrées, le résultat de la formule et la décision aidée avant la saisie de votre matériel.',
    inputs: 'Entrées de l’exemple',
    output: 'Lecture calculée',
    interpretation: 'Comment l’utiliser',
  },
  it: {
    heading: 'Esempio di pianificazione calcolato',
    intro: 'Questo esempio riproducibile mostra input, risultato della formula e decisione supportata prima di inserire il tuo hardware.',
    inputs: 'Dati dell’esempio',
    output: 'Lettura calcolata',
    interpretation: 'Come usarla',
  },
  es: {
    heading: 'Ejemplo de planificación calculado',
    intro: 'Este ejemplo reproducible muestra los datos, el resultado de la fórmula y la decisión que apoya antes de introducir tu hardware.',
    inputs: 'Datos del ejemplo',
    output: 'Lectura calculada',
    interpretation: 'Cómo utilizarla',
  },
  ru: {
    heading: 'Разобранный пример планирования',
    intro: 'Этот воспроизводимый пример показывает исходные данные, результат формулы и поддерживаемое решение до ввода вашей конфигурации.',
    inputs: 'Исходные данные примера',
    output: 'Расчётная оценка',
    interpretation: 'Как использовать результат',
  },
};

export function ToolWorkedExample({
  slug,
  lang,
  content,
}: {
  slug: ToolSlug;
  lang: Locale;
  content: ToolContent;
}) {
  const copy = COPY[lang] ?? COPY.en;
  return (
    <section aria-labelledby={`worked-example-${slug}`} className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 dark:border-emerald-900 dark:bg-emerald-950/20 md:p-8">
      <div className="max-w-4xl">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
          <FlaskConical className="h-4 w-4" aria-hidden="true" />
          {copy.heading}
        </p>
        <h2 id={`worked-example-${slug}`} className="mt-3 text-3xl font-semibold">{content.title}</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-background p-5">
          <h3 className="font-semibold">{copy.inputs}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{EXAMPLE_INPUTS[slug]}</p>
        </div>
        <div className="rounded-xl border bg-background p-5">
          <h3 className="font-semibold">{copy.output}</h3>
          <p className="mt-3 leading-7 text-muted-foreground">{EXAMPLE_OUTPUTS[slug]}</p>
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
