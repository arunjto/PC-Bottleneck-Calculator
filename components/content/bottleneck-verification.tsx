import Link from 'next/link';
import { ArrowRight, CheckCircle2, Gauge, SearchCheck } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getLocalizedBlogSlug } from '@/lib/blog-slug-translations';

type VerificationCopy = {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
  guideLink: string;
  comparisonLink: string;
  note: string;
};

const COPY: Record<Locale, VerificationCopy> = {
  en: {
    eyebrow: 'Verify the estimate',
    title: 'How to check whether your PC is actually bottlenecked',
    description: 'Use the calculator as a planning signal, then confirm the likely constraint in a repeatable game or workload.',
    steps: [
      'Test the same scene or benchmark route and record average FPS and frame times.',
      'Monitor per-core CPU load, GPU load, clock speeds, temperatures and any frame cap.',
      'Lower resolution and graphics settings substantially, then repeat the same test.',
      'A large FPS increase suggests a meaningful GPU-side constraint; little change points toward CPU-side work, a cap or another system limit.',
      'Compare independent benchmarks for the same game, hardware and settings before buying an upgrade.',
    ],
    guideLink: 'Open the step-by-step testing guide',
    comparisonLink: 'Compare CPU and GPU bottlenecks',
    note: 'No single utilization percentage or calculator score proves a bottleneck in every workload.',
  },
  it: {
    eyebrow: 'Verifica la stima',
    title: 'Come controllare se il PC ha davvero un collo di bottiglia',
    description: 'Usa il calcolatore come indicazione iniziale, poi verifica il possibile limite in un gioco o carico ripetibile.',
    steps: [
      'Prova la stessa scena o sequenza di benchmark e registra FPS medi e frame time.',
      'Controlla carico per core della CPU, carico GPU, frequenze, temperature ed eventuali limiti FPS.',
      'Riduci nettamente risoluzione e qualità grafica, quindi ripeti lo stesso test.',
      'Un forte aumento degli FPS suggerisce un limite GPU importante; poche variazioni indicano lavoro lato CPU, un cap o un altro limite del sistema.',
      'Confronta benchmark indipendenti dello stesso gioco, hardware e impostazioni prima di acquistare un upgrade.',
    ],
    guideLink: 'Apri la guida ai test passo per passo',
    comparisonLink: 'Confronta i limiti di CPU e GPU',
    note: 'Nessuna singola percentuale di utilizzo o punteggio del calcolatore dimostra un collo di bottiglia in ogni carico.',
  },
  fr: {
    eyebrow: 'Vérifier l’estimation',
    title: 'Comment vérifier si votre PC est réellement limité',
    description: 'Utilisez le calculateur comme signal de planification, puis confirmez la contrainte probable dans un jeu ou une charge reproductible.',
    steps: [
      'Testez la même scène ou le même parcours et relevez les FPS moyens et les temps d’image.',
      'Surveillez la charge par cœur du CPU, la charge GPU, les fréquences, les températures et toute limite de FPS.',
      'Réduisez fortement la résolution et les réglages graphiques, puis répétez exactement le même test.',
      'Une forte hausse des FPS suggère une contrainte GPU importante ; peu de changement indique plutôt le CPU, une limite d’images ou une autre contrainte.',
      'Comparez des benchmarks indépendants pour le même jeu, le même matériel et les mêmes réglages avant tout achat.',
    ],
    guideLink: 'Ouvrir le guide de test étape par étape',
    comparisonLink: 'Comparer les limites CPU et GPU',
    note: 'Aucun pourcentage d’utilisation ni score de calculateur ne prouve à lui seul un goulot d’étranglement dans toutes les charges.',
  },
  de: {
    eyebrow: 'Schätzung überprüfen',
    title: 'So prüfen Sie, ob Ihr PC tatsächlich ausgebremst wird',
    description: 'Nutzen Sie den Rechner als Planungshinweis und bestätigen Sie das wahrscheinliche Limit anschließend in einem wiederholbaren Spieltest.',
    steps: [
      'Testen Sie dieselbe Szene oder Benchmark-Route und erfassen Sie durchschnittliche FPS und Framezeiten.',
      'Beobachten Sie die Auslastung einzelner CPU-Kerne, GPU-Last, Taktraten, Temperaturen und mögliche FPS-Limits.',
      'Senken Sie Auflösung und Grafikeinstellungen deutlich und wiederholen Sie denselben Test.',
      'Ein starker FPS-Anstieg deutet auf ein relevantes GPU-Limit hin; geringe Änderungen eher auf CPU-Arbeit, ein FPS-Limit oder eine andere Systemgrenze.',
      'Vergleichen Sie vor einem Kauf unabhängige Benchmarks mit demselben Spiel, derselben Hardware und denselben Einstellungen.',
    ],
    guideLink: 'Schritt-für-Schritt-Testanleitung öffnen',
    comparisonLink: 'CPU- und GPU-Limits vergleichen',
    note: 'Kein einzelner Auslastungswert oder Rechnerwert beweist einen Flaschenhals in jeder Arbeitslast.',
  },
  es: {
    eyebrow: 'Verifica la estimación',
    title: 'Cómo comprobar si tu PC tiene realmente un cuello de botella',
    description: 'Usa la calculadora como señal de planificación y confirma después el posible límite en una prueba de juego repetible.',
    steps: [
      'Prueba la misma escena o recorrido y registra los FPS medios y los tiempos de fotograma.',
      'Supervisa la carga por núcleo de la CPU, la carga de GPU, frecuencias, temperaturas y cualquier límite de FPS.',
      'Reduce claramente la resolución y los ajustes gráficos, y repite exactamente la misma prueba.',
      'Una gran subida de FPS sugiere una limitación importante de GPU; pocos cambios apuntan a la CPU, un límite de FPS u otra restricción.',
      'Compara benchmarks independientes del mismo juego, hardware y ajustes antes de comprar una actualización.',
    ],
    guideLink: 'Abrir la guía de pruebas paso a paso',
    comparisonLink: 'Comparar límites de CPU y GPU',
    note: 'Ningún porcentaje de uso o puntuación de calculadora demuestra por sí solo un cuello de botella en todas las cargas.',
  },

  ru: {
    eyebrow: "Проверить оценку",
    title: "Как проверить, действительно ли ваш компьютер является узким местом",
    description: "Используйте калькулятор в качестве сигнала для планирования, а затем подтвердите вероятное ограничение в повторяемой игре или рабочей нагрузке.",
    steps: [
      "Протестируйте ту же сцену или эталонный маршрут и запишите среднее значение FPS и время кадра.",
      "Мониторинг нагрузки на ядро CPU, нагрузки GPU, тактовой частоты, температуры и любого ограничения кадров.",
      "Существенно уменьшите разрешение и настройки графики, а затем повторите тот же тест.",
      "Большое увеличение FPS предполагает значимое ограничение на стороне GPU; небольшие изменения указывают на работу на стороне CPU, ограничение или другое системное ограничение.",
      "Прежде чем покупать обновление, сравните независимые тесты для одной и той же игры, оборудования и настроек.",
    ],
    guideLink: "Открыть пошаговое руководство по тестированию",
    comparisonLink: "Сравните узкие места CPU и GPU",
    note: "Ни один процент использования или оценка калькулятора не являются узким местом в каждой рабочей нагрузке.",
  },
};

export function BottleneckVerification({ lang }: { lang: Locale }) {
  const copy = COPY[lang];
  const testingGuideHref = `/${lang}/blog/${getLocalizedBlogSlug(lang, 'how-to-check-pc-bottleneck')}`;
  const comparisonGuideHref = `/${lang}/blog/${getLocalizedBlogSlug(lang, 'cpu-vs-gpu-bottleneck-explained')}`;

  return (
    <section
      aria-labelledby="verify-bottleneck-title"
      className="rounded-2xl border border-cyan-200/80 bg-cyan-50/50 p-6 shadow-sm dark:border-cyan-900 dark:bg-cyan-950/20 md:p-8"
    >
      <div className="mb-6 max-w-3xl">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-300">
          <SearchCheck className="h-4 w-4" aria-hidden="true" />
          {copy.eyebrow}
        </p>
        <h2 id="verify-bottleneck-title" className="text-2xl font-bold tracking-tight md:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">{copy.description}</p>
      </div>

      <ol className="grid gap-3 md:grid-cols-2">
        {copy.steps.map((step, index) => (
          <li key={step} className="flex gap-3 rounded-xl border bg-card p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-900 dark:bg-cyan-900 dark:text-cyan-100">
              {index + 1}
            </span>
            <span className="text-sm leading-6 text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-col gap-4 rounded-xl border border-cyan-200/80 bg-card p-4 dark:border-cyan-900 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-2xl items-start gap-2 text-sm leading-6 text-muted-foreground">
          <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" aria-hidden="true" />
          {copy.note}
        </p>
        <div className="flex shrink-0 flex-col gap-2 text-sm font-semibold sm:items-end">
          <Link href={testingGuideHref} className="inline-flex items-center gap-1.5 text-cyan-800 hover:underline dark:text-cyan-300">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {copy.guideLink}
          </Link>
          <Link href={comparisonGuideHref} className="inline-flex items-center gap-1.5 text-cyan-800 hover:underline dark:text-cyan-300">
            {copy.comparisonLink}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
