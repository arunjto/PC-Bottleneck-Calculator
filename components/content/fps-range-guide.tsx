import Link from 'next/link';
import { ArrowRight, BarChart3, Gauge, Laptop, Monitor } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/lib/path-translations';

type MetricRow = { label: string; meaning: string; use: string };
type ResolutionRow = { resolution: string; effect: string; watch: string };

type FpsRangeCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  metricHeading: string;
  metricColumn: string;
  meaningColumn: string;
  useColumn: string;
  metrics: MetricRow[];
  resolutionHeading: string;
  resolutionIntro: string;
  resolutionColumn: string;
  effectColumn: string;
  watchColumn: string;
  resolutions: ResolutionRow[];
  laptopHeading: string;
  laptopBody: string;
  gameLink: string;
  evidenceLink: string;
};

const COPY: Record<Locale, FpsRangeCopy> = {
  en: {
    eyebrow: 'Reading the estimate',
    title: 'How Many FPS Will I Get? How to Read the Estimated Range',
    intro: 'The calculator returns a range because frame rate changes with the scene, game patch, drivers, cooling and background activity. Use the midpoint for planning, then use the low and high estimates to understand realistic variation.',
    metricHeading: 'What each FPS number tells you',
    metricColumn: 'Result',
    meaningColumn: 'What it means',
    useColumn: 'How to use it',
    metrics: [
      { label: 'Low estimate', meaning: 'A heavier scene or less favourable system condition.', use: 'Treat it as the safer expectation for demanding gameplay.' },
      { label: 'Midpoint', meaning: 'The centre of the modelled range for the selected setup.', use: 'Use it to compare configurations under the same inputs.' },
      { label: 'High estimate', meaning: 'A lighter scene or more favourable system condition.', use: 'Do not treat it as a guaranteed minimum.' },
      { label: '1% low', meaning: 'A measure of slower frames rather than the overall average.', use: 'Compare it with average FPS to judge smoothness and stutter.' },
    ],
    resolutionHeading: 'Why 1080p, 1440p and 4K change the result',
    resolutionIntro: 'Resolution changes how much work the GPU must do for every frame. The same CPU and GPU can therefore produce a different balance at each display target.',
    resolutionColumn: 'Target',
    effectColumn: 'Typical effect',
    watchColumn: 'What to watch',
    resolutions: [
      { resolution: '1080p', effect: 'Lower pixel load can expose CPU or frame-rate limits sooner.', watch: 'CPU per-core load, refresh-rate caps and high-FPS consistency.' },
      { resolution: '1440p', effect: 'Higher GPU demand often creates a more balanced gaming workload.', watch: 'Graphics preset, upscaling mode and available VRAM.' },
      { resolution: '4K', effect: 'The GPU renders four times as many pixels as 1080p.', watch: 'GPU load, VRAM use, upscaling and the selected quality preset.' },
    ],
    laptopHeading: 'Checking FPS on a laptop?',
    laptopBody: 'A mobile CPU or GPU can perform differently from a desktop part with a similar name. Laptop power limits, cooling and graphics switching can materially change the result, so select the closest mobile model and verify with an on-device test.',
    gameLink: 'Check a specific game',
    evidenceLink: 'Learn how to measure FPS',
  },
  it: {
    eyebrow: 'Come leggere la stima',
    title: 'Quanti FPS otterrò? Come leggere l’intervallo stimato',
    intro: 'Il calcolatore restituisce un intervallo perché il frame rate cambia in base alla scena, alla versione del gioco, ai driver, al raffreddamento e alle attività in background. Usa il valore centrale per pianificare e gli estremi per capire la variazione realistica.',
    metricHeading: 'Cosa indica ogni valore FPS',
    metricColumn: 'Risultato',
    meaningColumn: 'Cosa significa',
    useColumn: 'Come usarlo',
    metrics: [
      { label: 'Stima minima', meaning: 'Una scena più pesante o condizioni di sistema meno favorevoli.', use: 'Considerala l’aspettativa più prudente per le fasi impegnative.' },
      { label: 'Valore centrale', meaning: 'Il centro dell’intervallo modellato per la configurazione scelta.', use: 'Usalo per confrontare configurazioni con gli stessi parametri.' },
      { label: 'Stima massima', meaning: 'Una scena più leggera o condizioni di sistema più favorevoli.', use: 'Non considerarla un minimo garantito.' },
      { label: '1% low', meaning: 'Misura i fotogrammi più lenti invece della sola media.', use: 'Confrontalo con gli FPS medi per valutare fluidità e scatti.' },
    ],
    resolutionHeading: 'Perché 1080p, 1440p e 4K cambiano il risultato',
    resolutionIntro: 'La risoluzione modifica il lavoro che la GPU deve svolgere per ogni fotogramma. La stessa CPU e GPU possono quindi avere un equilibrio diverso a ogni risoluzione.',
    resolutionColumn: 'Obiettivo',
    effectColumn: 'Effetto tipico',
    watchColumn: 'Cosa controllare',
    resolutions: [
      { resolution: '1080p', effect: 'Il carico di pixel più basso può evidenziare prima i limiti di CPU o frame rate.', watch: 'Carico per core, limite del monitor e stabilità ad alti FPS.' },
      { resolution: '1440p', effect: 'La maggiore richiesta alla GPU crea spesso un carico di gioco più equilibrato.', watch: 'Preset grafico, upscaling e VRAM disponibile.' },
      { resolution: '4K', effect: 'La GPU elabora quattro volte i pixel del 1080p.', watch: 'Carico GPU, uso della VRAM, upscaling e qualità selezionata.' },
    ],
    laptopHeading: 'Stai calcolando gli FPS di un portatile?',
    laptopBody: 'Una CPU o GPU mobile può comportarsi diversamente da un componente desktop con un nome simile. Limiti di potenza, raffreddamento e commutazione grafica del portatile incidono sul risultato: scegli il modello mobile più vicino e verifica sul dispositivo.',
    gameLink: 'Controlla un gioco specifico',
    evidenceLink: 'Leggi la metodologia',
  },
  fr: {
    eyebrow: 'Lire l’estimation',
    title: 'Combien de FPS vais-je obtenir ? Lire la plage estimée',
    intro: 'Le calculateur renvoie une plage, car le nombre d’images par seconde varie selon la scène, la version du jeu, les pilotes, le refroidissement et les tâches en arrière-plan. Utilisez le point médian pour planifier et les deux extrêmes pour comprendre la variation réaliste.',
    metricHeading: 'Ce que chaque valeur FPS indique',
    metricColumn: 'Résultat',
    meaningColumn: 'Signification',
    useColumn: 'Comment l’utiliser',
    metrics: [
      { label: 'Estimation basse', meaning: 'Une scène plus lourde ou des conditions système moins favorables.', use: 'Considérez-la comme l’attente prudente pour les passages exigeants.' },
      { label: 'Point médian', meaning: 'Le centre de la plage modélisée pour la configuration choisie.', use: 'Utilisez-le pour comparer des configurations avec les mêmes paramètres.' },
      { label: 'Estimation haute', meaning: 'Une scène plus légère ou des conditions système plus favorables.', use: 'Ne la considérez pas comme un minimum garanti.' },
      { label: '1% low', meaning: 'Une mesure des images les plus lentes plutôt que de la seule moyenne.', use: 'Comparez-la aux FPS moyens pour évaluer la fluidité et les saccades.' },
    ],
    resolutionHeading: 'Pourquoi 1080p, 1440p et 4K changent le résultat',
    resolutionIntro: 'La résolution modifie la quantité de travail demandée au GPU pour chaque image. Le même CPU et le même GPU peuvent donc présenter un équilibre différent selon la définition.',
    resolutionColumn: 'Cible',
    effectColumn: 'Effet habituel',
    watchColumn: 'À surveiller',
    resolutions: [
      { resolution: '1080p', effect: 'La charge en pixels plus faible peut révéler plus tôt une limite CPU ou de fréquence d’image.', watch: 'Charge par cœur, limite de rafraîchissement et stabilité à FPS élevés.' },
      { resolution: '1440p', effect: 'La demande GPU plus élevée produit souvent une charge de jeu plus équilibrée.', watch: 'Préréglage graphique, mise à l’échelle et VRAM disponible.' },
      { resolution: '4K', effect: 'Le GPU traite quatre fois plus de pixels qu’en 1080p.', watch: 'Charge GPU, VRAM, mise à l’échelle et niveau de qualité.' },
    ],
    laptopHeading: 'Vous estimez les FPS d’un ordinateur portable ?',
    laptopBody: 'Un CPU ou GPU mobile peut se comporter différemment d’un composant de bureau au nom similaire. Les limites de puissance, le refroidissement et la commutation graphique influencent le résultat : choisissez le modèle mobile le plus proche et vérifiez sur la machine.',
    gameLink: 'Vérifier un jeu précis',
    evidenceLink: 'Lire la méthodologie',
  },
  de: {
    eyebrow: 'Schätzung verstehen',
    title: 'Wie viele FPS bekomme ich? Den geschätzten Bereich richtig lesen',
    intro: 'Der Rechner zeigt einen Bereich, weil sich die Bildrate je nach Szene, Spielversion, Treiber, Kühlung und Hintergrundaktivität verändert. Nutzen Sie den Mittelwert zur Planung und die untere sowie obere Schätzung als realistische Spannweite.',
    metricHeading: 'Was die einzelnen FPS-Werte aussagen',
    metricColumn: 'Ergebnis',
    meaningColumn: 'Bedeutung',
    useColumn: 'So verwenden Sie es',
    metrics: [
      { label: 'Untere Schätzung', meaning: 'Eine anspruchsvollere Szene oder ungünstigere Systembedingungen.', use: 'Nutzen Sie sie als vorsichtige Erwartung für belastende Spielabschnitte.' },
      { label: 'Mittelwert', meaning: 'Die Mitte des modellierten Bereichs für die gewählte Konfiguration.', use: 'Vergleichen Sie damit Konfigurationen bei identischen Eingaben.' },
      { label: 'Obere Schätzung', meaning: 'Eine leichtere Szene oder günstigere Systembedingungen.', use: 'Betrachten Sie sie nicht als garantierten Mindestwert.' },
      { label: '1% Low', meaning: 'Ein Maß für langsamere Einzelbilder statt nur für den Durchschnitt.', use: 'Vergleichen Sie es mit den durchschnittlichen FPS, um Ruckler zu beurteilen.' },
    ],
    resolutionHeading: 'Warum 1080p, 1440p und 4K das Ergebnis verändern',
    resolutionIntro: 'Die Auflösung bestimmt, wie viel Arbeit die GPU pro Bild erledigen muss. Dieselbe CPU-GPU-Kombination kann deshalb bei jedem Anzeigeziel anders ausbalanciert sein.',
    resolutionColumn: 'Ziel',
    effectColumn: 'Typische Auswirkung',
    watchColumn: 'Darauf achten',
    resolutions: [
      { resolution: '1080p', effect: 'Die geringere Pixellast kann CPU- oder Bildratenlimits früher sichtbar machen.', watch: 'Last einzelner CPU-Kerne, FPS-Limits und Stabilität bei hohen Bildraten.' },
      { resolution: '1440p', effect: 'Die höhere GPU-Anforderung sorgt häufig für eine ausgeglichenere Spielelast.', watch: 'Grafikprofil, Upscaling-Modus und verfügbarer VRAM.' },
      { resolution: '4K', effect: 'Die GPU verarbeitet viermal so viele Pixel wie bei 1080p.', watch: 'GPU-Last, VRAM, Upscaling und gewählte Qualitätsstufe.' },
    ],
    laptopHeading: 'FPS für einen Laptop berechnen?',
    laptopBody: 'Mobile CPUs und GPUs können sich anders verhalten als ähnlich benannte Desktop-Komponenten. Leistungsgrenzen, Kühlung und Grafikumschaltung des Notebooks beeinflussen das Ergebnis. Wählen Sie das passendste Mobilmodell und prüfen Sie die Leistung anschließend auf dem Gerät.',
    gameLink: 'Ein bestimmtes Spiel prüfen',
    evidenceLink: 'Methodik lesen',
  },
  es: {
    eyebrow: 'Cómo leer la estimación',
    title: '¿Cuántos FPS tendrá mi PC? Cómo interpretar el rango estimado',
    intro: 'La calculadora devuelve un rango porque los fotogramas por segundo cambian según la escena, la versión del juego, los controladores, la refrigeración y las tareas en segundo plano. Usa el punto medio para planificar y los extremos para entender la variación realista.',
    metricHeading: 'Qué indica cada cifra de FPS',
    metricColumn: 'Resultado',
    meaningColumn: 'Qué significa',
    useColumn: 'Cómo utilizarlo',
    metrics: [
      { label: 'Estimación baja', meaning: 'Una escena más exigente o condiciones del sistema menos favorables.', use: 'Tómala como la expectativa prudente para las partes más exigentes.' },
      { label: 'Punto medio', meaning: 'El centro del rango modelado para la configuración seleccionada.', use: 'Úsalo para comparar configuraciones con los mismos parámetros.' },
      { label: 'Estimación alta', meaning: 'Una escena más ligera o condiciones del sistema más favorables.', use: 'No la consideres un mínimo garantizado.' },
      { label: '1% low', meaning: 'Una medida de los fotogramas más lentos, no solo del promedio.', use: 'Compárala con los FPS medios para valorar fluidez y tirones.' },
    ],
    resolutionHeading: 'Por qué 1080p, 1440p y 4K cambian el resultado',
    resolutionIntro: 'La resolución modifica el trabajo que debe realizar la GPU para cada fotograma. La misma CPU y GPU pueden mostrar un equilibrio diferente en cada objetivo de pantalla.',
    resolutionColumn: 'Objetivo',
    effectColumn: 'Efecto habitual',
    watchColumn: 'Qué debes vigilar',
    resolutions: [
      { resolution: '1080p', effect: 'La menor carga de píxeles puede revelar antes un límite de CPU o de fotogramas.', watch: 'Carga por núcleo, límites de refresco y estabilidad a FPS altos.' },
      { resolution: '1440p', effect: 'La mayor exigencia de GPU suele crear una carga de juego más equilibrada.', watch: 'Calidad gráfica, reescalado y VRAM disponible.' },
      { resolution: '4K', effect: 'La GPU procesa cuatro veces más píxeles que a 1080p.', watch: 'Carga de GPU, uso de VRAM, reescalado y calidad seleccionada.' },
    ],
    laptopHeading: '¿Estás calculando los FPS de un portátil?',
    laptopBody: 'Una CPU o GPU móvil puede rendir de forma distinta a un componente de sobremesa con un nombre parecido. Los límites de potencia, la refrigeración y el cambio de gráficos del portátil afectan al resultado; selecciona el modelo móvil más cercano y comprueba el rendimiento en el equipo.',
    gameLink: 'Comprobar un juego concreto',
    evidenceLink: 'Leer la metodología',
  },
  ru: {
    eyebrow: 'Как читать результат',
    title: 'Сколько ФПС будет в игре? Как читать расчётный диапазон',
    intro: 'Калькулятор показывает диапазон, потому что частота кадров меняется в зависимости от сцены, версии игры, драйверов, охлаждения и фоновых задач. Для планирования ориентируйтесь на середину диапазона, а нижнюю и верхнюю границы используйте для оценки возможного разброса.',
    metricHeading: 'Что означает каждое значение ФПС',
    metricColumn: 'Результат',
    meaningColumn: 'Что это значит',
    useColumn: 'Как использовать',
    metrics: [
      { label: 'Нижняя оценка', meaning: 'Более тяжёлая сцена или менее благоприятные условия работы системы.', use: 'Используйте как осторожный ориентир для требовательных эпизодов.' },
      { label: 'Среднее значение', meaning: 'Середина расчётного диапазона для выбранной конфигурации.', use: 'Сравнивайте по нему сборки при одинаковых исходных данных.' },
      { label: 'Верхняя оценка', meaning: 'Более лёгкая сцена или более благоприятные условия работы системы.', use: 'Не считайте её гарантированным минимумом.' },
      { label: '1% low', meaning: 'Показатель более медленных кадров, а не только общей средней частоты.', use: 'Сравнивайте со средним FPS, чтобы оценить плавность и микрофризы.' },
    ],
    resolutionHeading: 'Почему 1080p, 1440p и 4K меняют результат',
    resolutionIntro: 'Разрешение определяет объём работы видеокарты для каждого кадра. Поэтому одна и та же связка процессора и видеокарты может иметь разный баланс при разных настройках экрана.',
    resolutionColumn: 'Разрешение',
    effectColumn: 'Типичный эффект',
    watchColumn: 'На что смотреть',
    resolutions: [
      { resolution: '1080p', effect: 'Меньшая нагрузка на видеокарту раньше выявляет ограничения процессора или частоты кадров.', watch: 'Нагрузка по ядрам, лимит герцовки и стабильность при высоком FPS.' },
      { resolution: '1440p', effect: 'Более высокая нагрузка на видеокарту часто даёт сбалансированный игровой сценарий.', watch: 'Качество графики, масштабирование и доступная видеопамять.' },
      { resolution: '4K', effect: 'Видеокарта обрабатывает в четыре раза больше пикселей, чем в 1080p.', watch: 'Загрузка GPU, видеопамять, масштабирование и выбранный пресет.' },
    ],
    laptopHeading: 'Считаете ФПС для ноутбука?',
    laptopBody: 'Мобильные процессоры и видеокарты могут заметно отличаться от настольных компонентов с похожими названиями. Лимиты мощности, охлаждение и переключение графики влияют на результат, поэтому выбирайте ближайшую мобильную модель и проверяйте производительность на самом ноутбуке.',
    gameLink: 'Проверить конкретную игру',
    evidenceLink: 'Узнать, как проверить FPS',
  },
};

function getEvidenceHref(lang: Locale) {
  if (lang === 'en') return '/en/blog/how-to-check-fps-on-pc';
  if (lang === 'ru') return '/ru/blog/kak-uznat-skolko-fps-budet-v-igre';
  return getLocalizedPath(lang, 'methodology');
}

export function FpsRangeGuide({ lang }: { lang: Locale }) {
  const copy = COPY[lang];

  return (
    <section
      aria-labelledby="fps-range-guide-title"
      className="overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/80 via-background to-cyan-50/70 shadow-sm dark:border-blue-900/70 dark:from-blue-950/30 dark:to-cyan-950/20"
    >
      <div className="p-5 sm:p-7">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
          <BarChart3 className="h-4 w-4" aria-hidden="true" />
          {copy.eyebrow}
        </p>
        <h2 id="fps-range-guide-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{copy.intro}</p>

        <h3 className="mt-7 flex items-center gap-2 text-xl font-semibold">
          <Gauge className="h-5 w-5 text-blue-700 dark:text-blue-300" aria-hidden="true" />
          {copy.metricHeading}
        </h3>
        <div className="mt-3 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-muted/70 text-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">{copy.metricColumn}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{copy.meaningColumn}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{copy.useColumn}</th>
              </tr>
            </thead>
            <tbody>
              {copy.metrics.map((metric) => (
                <tr key={metric.label} className="border-t">
                  <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{metric.label}</th>
                  <td className="px-4 py-3 leading-6 text-muted-foreground">{metric.meaning}</td>
                  <td className="px-4 py-3 leading-6 text-muted-foreground">{metric.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-7 flex items-center gap-2 text-xl font-semibold">
          <Monitor className="h-5 w-5 text-cyan-700 dark:text-cyan-300" aria-hidden="true" />
          {copy.resolutionHeading}
        </h3>
        <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">{copy.resolutionIntro}</p>
        <div className="mt-3 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-muted/70 text-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">{copy.resolutionColumn}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{copy.effectColumn}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{copy.watchColumn}</th>
              </tr>
            </thead>
            <tbody>
              {copy.resolutions.map((row) => (
                <tr key={row.resolution} className="border-t">
                  <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{row.resolution}</th>
                  <td className="px-4 py-3 leading-6 text-muted-foreground">{row.effect}</td>
                  <td className="px-4 py-3 leading-6 text-muted-foreground">{row.watch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/80 p-4 dark:border-amber-900/70 dark:bg-amber-950/20">
          <h3 className="flex items-center gap-2 font-semibold">
            <Laptop className="h-5 w-5 text-amber-700 dark:text-amber-300" aria-hidden="true" />
            {copy.laptopHeading}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.laptopBody}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={getLocalizedPath(lang, 'can-i-run')}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400"
          >
            {copy.gameLink}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={getEvidenceHref(lang)}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {copy.evidenceLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
