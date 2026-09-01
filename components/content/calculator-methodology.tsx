import Link from 'next/link';
import { ArrowRight, Calculator, Database, FlaskConical, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/lib/path-translations';
import { FPS_MODEL_VERSION } from '@/lib/fps-model';

export type CalculatorMethodologyVariant = 'bottleneck' | 'fps' | 'psu';

type MethodologyCopy = {
  eyebrow: string;
  title: string;
  inputsLabel: string;
  calculationLabel: string;
  interpretationLabel: string;
  limitationsLabel: string;
  fullMethodology: string;
  variants: Record<CalculatorMethodologyVariant, {
    summary: string;
    inputs: string;
    calculation: string;
    formula: string;
    interpretation: string;
    limitations: string;
  }>;
};

const COPY: Record<Locale, MethodologyCopy> = {
  en: {
    eyebrow: 'Методология',
    title: 'How this calculator works',
    inputsLabel: 'Исходные данные',
    calculationLabel: 'Calculation model',
    interpretationLabel: 'How to read the result',
    limitationsLabel: 'Important limitations',
    fullMethodology: 'Read the complete methodology',
    variants: {
      bottleneck: {
        summary: 'This calculator compares an internally normalized CPU planning score with a normalized GPU planning score. It does not measure performance loss.',
        inputs: 'Selected CPU, GPU, RAM profile and target resolution, using the site’s maintained hardware specifications and 0–100 comparison indices.',
        calculation: 'CPU and GPU planning indices are adjusted for the selected resolution, then compared using a relative gap. An adjusted gap of 8% or less is classified as a close match.',
        formula: 'Adjusted gap = |adjusted CPU index − adjusted GPU index| ÷ higher adjusted index × 100',
        interpretation: 'The lower normalized score identifies the likely planning constraint. The percentage describes score separation—not guaranteed FPS loss, utilization or incompatibility.',
        limitations: 'Games, workloads, cooling, drivers, BIOS, power limits and resolution can change the real bottleneck. Verify with benchmarks matching your exact workload.',
      },
      fps: {
        summary: `Модель FPS ${FPS_MODEL_VERSION} рассчитывает ориентировочный диапазон по игровому профилю, выбранному оборудованию и графическим настройкам. Это не результат измеренного теста.`,
        inputs: 'CPU and GPU indices, game profile, resolution, quality preset, upscaling, anti-aliasing, RAM capacity and speed, VRAM pressure and storage type.',
        calculation: 'A per-game 1080p High reference is scaled by weighted CPU/GPU capacity, resolution and quality factors, supported upscaling, memory pressure and smaller system modifiers.',
        formula: 'Estimated FPS = game reference × hardware scale × resolution × quality × supported modifiers',
        interpretation: 'Results include a likely range, planning midpoint, estimated 1% low and likely limiting component. Wider uncertainty is used for speculative game profiles.',
        limitations: 'Patches, drivers, map or scene complexity, background tasks, thermals and game-specific settings can materially change FPS. Compare against independent benchmarks.',
      },
      psu: {
        summary: 'The PSU calculator estimates broad system load from published component power figures, adds a component allowance and applies planning headroom.',
        inputs: 'Published CPU and GPU power figures, selected additional-component profile and the chosen efficiency tier.',
        calculation: 'CPU and GPU power are added to the selected component allowance. The tool shows 15%, 30% and 50% headroom scenarios and rounds the planning result to a common PSU wattage where possible.',
        formula: 'Planning wattage = next common PSU size ≥ (CPU + GPU + component allowance) × 1.30',
        interpretation: 'The recommended wattage is a capacity-planning target. Efficiency certification describes conversion efficiency; it does not reduce the required output capacity.',
        limitations: 'Transient spikes, connector requirements, overclocking, PSU quality and manufacturer recommendations still matter. Confirm the exact GPU and PSU model documentation.',
      },
    },
  },
  it: {
    eyebrow: 'Metodologia',
    title: 'Come funziona questo calcolatore',
    inputsLabel: 'Dati utilizzati',
    calculationLabel: 'Modello di calcolo',
    interpretationLabel: 'Come leggere il risultato',
    limitationsLabel: 'Limiti importanti',
    fullMethodology: 'Leggi la metodologia completa',
    variants: {
      bottleneck: {
        summary: 'Confronta un indice CPU normalizzato interno con un indice GPU normalizzato. Non misura una perdita reale di prestazioni.',
        inputs: 'CPU, GPU, profilo RAM e risoluzione selezionati, usando specifiche hardware e indici comparativi 0–100 mantenuti dal sito.',
        calculation: 'Gli indici di pianificazione CPU e GPU vengono adattati alla risoluzione selezionata e poi confrontati con un divario relativo. Un divario adattato fino all’8% è classificato come abbinamento vicino.',
        formula: 'Divario adattato = |indice CPU adattato − indice GPU adattato| ÷ indice adattato maggiore × 100',
        interpretation: 'Il punteggio inferiore indica il possibile limite di pianificazione. La percentuale non è una perdita FPS, un utilizzo o un’incompatibilità garantiti.',
        limitations: 'Giochi, carichi, raffreddamento, driver, BIOS, limiti di potenza e risoluzione cambiano il risultato reale. Verifica con benchmark pertinenti.',
      },
      fps: {
        summary: `Il modello FPS ${FPS_MODEL_VERSION} genera un intervallo di pianificazione da un profilo del gioco, hardware e impostazioni. Non è un benchmark misurato.`,
        inputs: 'Indici CPU/GPU, profilo del gioco, risoluzione, qualità, upscaling, anti-aliasing, RAM, pressione VRAM e tipo di archiviazione.',
        calculation: 'Un riferimento 1080p High per gioco viene scalato con capacità CPU/GPU pesate, risoluzione, qualità, upscaling supportato e fattori di memoria.',
        formula: 'FPS stimati = riferimento gioco × scala hardware × risoluzione × qualità × modificatori supportati',
        interpretation: 'Il risultato mostra intervallo probabile, valore centrale, 1% low stimato e componente limitante. I profili speculativi hanno maggiore incertezza.',
        limitations: 'Patch, driver, scene, attività in background, temperature e impostazioni specifiche possono cambiare molto gli FPS. Confronta benchmark indipendenti.',
      },
      psu: {
        summary: 'Stima il carico del sistema da valori di potenza pubblicati, aggiunge una quota per gli altri componenti e applica margine di pianificazione.',
        inputs: 'Potenza pubblicata di CPU e GPU, profilo dei componenti aggiuntivi e livello di efficienza selezionato.',
        calculation: 'Somma CPU, GPU e quota componenti; mostra scenari con margine del 15%, 30% e 50% e arrotonda a un wattaggio PSU comune.',
        formula: 'Wattaggio pianificato = taglio PSU comune ≥ (CPU + GPU + quota componenti) × 1,30',
        interpretation: 'Il wattaggio consigliato è un obiettivo di capacità. La certificazione di efficienza non riduce la potenza di uscita richiesta.',
        limitations: 'Picchi transitori, connettori, overclock, qualità del PSU e indicazioni del produttore restano essenziali. Verifica i modelli esatti.',
      },
    },
  },
  fr: {
    eyebrow: 'Méthodologie',
    title: 'Fonctionnement de ce calculateur',
    inputsLabel: 'Données utilisées',
    calculationLabel: 'Modèle de calcul',
    interpretationLabel: 'Interprétation du résultat',
    limitationsLabel: 'Limites importantes',
    fullMethodology: 'Lire la méthodologie complète',
    variants: {
      bottleneck: {
        summary: 'Compare un indice CPU normalisé interne à un indice GPU normalisé. Il ne mesure pas une perte réelle de performances.',
        inputs: 'CPU, GPU, profil RAM et résolution sélectionnés, avec les spécifications et indices comparatifs 0–100 maintenus par le site.',
        calculation: 'Les indices de planification CPU et GPU sont ajustés selon la résolution sélectionnée, puis comparés par écart relatif. Un écart ajusté inférieur ou égal à 8 % est classé comme association proche.',
        formula: 'Écart ajusté = |indice CPU ajusté − indice GPU ajusté| ÷ indice ajusté le plus élevé × 100',
        interpretation: 'Le score inférieur indique la contrainte probable de planification. Le pourcentage ne garantit ni perte de FPS, ni utilisation, ni incompatibilité.',
        limitations: 'Jeux, usages, refroidissement, pilotes, BIOS, limites de puissance et résolution modifient le résultat réel. Vérifiez avec des benchmarks adaptés.',
      },
      fps: {
        summary: `Le modèle FPS ${FPS_MODEL_VERSION} produit une plage indicative à partir du profil du jeu, du matériel et des réglages. Ce n’est pas un benchmark mesuré.`,
        inputs: 'Indices CPU/GPU, profil du jeu, résolution, qualité, upscaling, anti-aliasing, RAM, pression VRAM et stockage.',
        calculation: 'Une référence 1080p High propre au jeu est ajustée selon les capacités CPU/GPU pondérées, la résolution, la qualité et les modificateurs pris en charge.',
        formula: 'FPS estimés = référence du jeu × échelle matérielle × résolution × qualité × modificateurs',
        interpretation: 'Le résultat comprend plage probable, valeur centrale, 1% low estimé et composant limitant. Les profils spéculatifs ont plus d’incertitude.',
        limitations: 'Correctifs, pilotes, scènes, tâches de fond, températures et réglages peuvent fortement modifier les FPS. Comparez des benchmarks indépendants.',
      },
      psu: {
        summary: 'Estime la charge du système depuis les puissances publiées, ajoute une réserve pour les composants et applique une marge de planification.',
        inputs: 'Puissances publiées du CPU et du GPU, profil des composants supplémentaires et niveau d’efficacité choisi.',
        calculation: 'Additionne CPU, GPU et réserve composants; présente 15%, 30% et 50% de marge puis arrondit à une puissance PSU courante.',
        formula: 'Puissance planifiée = taille PSU courante ≥ (CPU + GPU + réserve composants) × 1,30',
        interpretation: 'La puissance recommandée est un objectif de capacité. La certification d’efficacité ne réduit pas la puissance de sortie nécessaire.',
        limitations: 'Pics transitoires, connecteurs, overclocking, qualité du PSU et recommandations constructeur restent essentiels. Vérifiez les modèles exacts.',
      },
    },
  },
  de: {
    eyebrow: 'Methodik',
    title: 'So funktioniert dieser Rechner',
    inputsLabel: 'Verwendete Eingaben',
    calculationLabel: 'Berechnungsmodell',
    interpretationLabel: 'Ergebnis richtig lesen',
    limitationsLabel: 'Wichtige Grenzen',
    fullMethodology: 'Vollständige Methodik lesen',
    variants: {
      bottleneck: {
        summary: 'Vergleicht einen intern normalisierten CPU-Planungswert mit einem GPU-Planungswert. Ein realer Leistungsverlust wird nicht gemessen.',
        inputs: 'Gewählte CPU, GPU, RAM-Profil und Auflösung sowie gepflegte Spezifikationen und interne Vergleichswerte von 0–100.',
        calculation: 'Die CPU- und GPU-Planungswerte werden an die gewählte Auflösung angepasst und anschließend über eine relative Lücke verglichen. Eine angepasste Lücke bis 8 % gilt als enge Abstimmung.',
        formula: 'Angepasste Lücke = |angepasster CPU-Wert − angepasster GPU-Wert| ÷ höherer angepasster Wert × 100',
        interpretation: 'Der niedrigere Wert zeigt den wahrscheinlichen Planungsengpass. Der Prozentsatz garantiert weder FPS-Verlust noch Auslastung oder Inkompatibilität.',
        limitations: 'Spiele, Workloads, Kühlung, Treiber, BIOS, Leistungsgrenzen und Auflösung verändern den realen Engpass. Prüfen Sie passende Benchmarks.',
      },
      fps: {
        summary: `Das FPS-Modell ${FPS_MODEL_VERSION} erzeugt aus Spielprofil, Hardware und Einstellungen einen Planungsbereich. Es ist kein gemessener Benchmark.`,
        inputs: 'CPU/GPU-Werte, Spielprofil, Auflösung, Qualität, Upscaling, Anti-Aliasing, RAM, VRAM-Druck und Speichertyp.',
        calculation: 'Eine 1080p-High-Referenz pro Spiel wird mit gewichteter CPU/GPU-Kapazität, Auflösung, Qualität und unterstützten Faktoren skaliert.',
        formula: 'Geschätzte FPS = Spielreferenz × Hardwareskala × Auflösung × Qualität × Modifikatoren',
        interpretation: 'Ausgegeben werden Bereich, Planungsmittelwert, geschätztes 1%-Low und wahrscheinlicher Engpass. Spekulative Profile haben höhere Unsicherheit.',
        limitations: 'Patches, Treiber, Szenen, Hintergrundaufgaben, Temperaturen und Einstellungen können FPS stark verändern. Vergleichen Sie unabhängige Benchmarks.',
      },
      psu: {
        summary: 'Schätzt die Systemlast aus veröffentlichten Leistungswerten, einer Komponentenpauschale und zusätzlichem Planungsspielraum.',
        inputs: 'Veröffentlichte CPU- und GPU-Leistungswerte, Profil zusätzlicher Komponenten und gewählte Effizienzklasse.',
        calculation: 'Addiert CPU, GPU und Komponentenpauschale; zeigt 15%, 30% und 50% Spielraum und rundet auf eine übliche Netzteilgröße.',
        formula: 'Planungsleistung = übliche PSU-Größe ≥ (CPU + GPU + Komponentenpauschale) × 1,30',
        interpretation: 'Die Empfehlung ist ein Kapazitätsziel. Die Effizienzzertifizierung senkt nicht die benötigte Ausgangsleistung.',
        limitations: 'Lastspitzen, Anschlüsse, Übertaktung, Netzteilqualität und Herstellerangaben bleiben entscheidend. Prüfen Sie die exakten Modelle.',
      },
    },
  },
  es: {
    eyebrow: 'Metodología',
    title: 'Cómo funciona esta calculadora',
    inputsLabel: 'Datos utilizados',
    calculationLabel: 'Modelo de cálculo',
    interpretationLabel: 'Cómo interpretar el resultado',
    limitationsLabel: 'Limitaciones importantes',
    fullMethodology: 'Leer la metodología completa',
    variants: {
      bottleneck: {
        summary: 'Compara un índice interno normalizado de CPU con otro de GPU. No mide una pérdida real de rendimiento.',
        inputs: 'CPU, GPU, perfil de RAM y resolución seleccionados, con especificaciones e índices comparativos 0–100 mantenidos por el sitio.',
        calculation: 'Los índices de planificación de CPU y GPU se ajustan según la resolución elegida y después se comparan mediante una diferencia relativa. Una diferencia ajustada de hasta el 8 % se clasifica como combinación cercana.',
        formula: 'Diferencia ajustada = |índice CPU ajustado − índice GPU ajustado| ÷ índice ajustado mayor × 100',
        interpretation: 'La puntuación inferior identifica la posible limitación. El porcentaje no garantiza pérdida de FPS, utilización ni incompatibilidad.',
        limitations: 'Juegos, cargas, refrigeración, controladores, BIOS, límites de potencia y resolución cambian el cuello de botella real. Comprueba benchmarks adecuados.',
      },
      fps: {
        summary: `El modelo FPS ${FPS_MODEL_VERSION} genera un rango orientativo desde el perfil del juego, hardware y ajustes. No es un benchmark medido.`,
        inputs: 'Índices CPU/GPU, perfil del juego, resolución, calidad, reescalado, antialiasing, RAM, presión de VRAM y almacenamiento.',
        calculation: 'Una referencia 1080p High por juego se ajusta por capacidad CPU/GPU ponderada, resolución, calidad y modificadores compatibles.',
        formula: 'FPS estimados = referencia del juego × escala de hardware × resolución × calidad × modificadores',
        interpretation: 'Incluye rango probable, punto medio, 1% bajo estimado y componente limitante. Los perfiles especulativos tienen mayor incertidumbre.',
        limitations: 'Parches, controladores, escenas, tareas en segundo plano, temperaturas y ajustes pueden cambiar mucho los FPS. Compara benchmarks independientes.',
      },
      psu: {
        summary: 'Estima la carga desde potencias publicadas, añade una asignación para componentes y aplica margen de planificación.',
        inputs: 'Potencias publicadas de CPU y GPU, perfil de componentes adicionales y nivel de eficiencia elegido.',
        calculation: 'Suma CPU, GPU y asignación; muestra márgenes del 15%, 30% y 50% y redondea a una potencia PSU habitual.',
        formula: 'Potencia planificada = tamaño PSU habitual ≥ (CPU + GPU + asignación) × 1,30',
        interpretation: 'La recomendación es un objetivo de capacidad. La certificación de eficiencia no reduce la potencia de salida necesaria.',
        limitations: 'Picos transitorios, conectores, overclocking, calidad de la PSU y recomendaciones del fabricante siguen siendo esenciales. Verifica los modelos exactos.',
      },
    },
  },

  ru: {
    eyebrow: 'Methodology',
    title: "Как работает этот калькулятор",
    inputsLabel: 'Inputs',
    calculationLabel: "Модель расчета",
    interpretationLabel: "Как прочитать результат",
    limitationsLabel: "Важные ограничения",
    fullMethodology: "Прочитать полную методологию",
    variants: {
      bottleneck: {
        summary: "Этот калькулятор сравнивает внутренне нормализованную оценку планирования CPU с нормализованной оценкой планирования GPU. Он не измеряет потерю производительности.",
        inputs: "Выбран профиль CPU, GPU, RAM и целевое разрешение, используя поддерживаемые на сайте характеристики оборудования и индексы сравнения 0–100.",
        calculation: "Индексы планирования CPU и GPU корректируются для выбранного разрешения, а затем сравниваются с использованием относительного разрыва. Скорректированный разрыв в 8% или менее классифицируется как близкое совпадение.",
        formula: "Скорректированный разрыв = | скорректированный индекс CPU − скорректированный индекс GPU | ÷ более высокий скорректированный индекс × 100",
        interpretation: "Более низкий нормализованный балл указывает на вероятное ограничение планирования. Процент описывает разделение оценок — не гарантируется потеря, использование или несовместимость FPS.",
        limitations: "Игры, рабочие нагрузки, охлаждение, драйверы, BIOS, ограничения мощности и разрешение могут изменить реальное узкое место. Проверьте с помощью тестов, соответствующих вашей конкретной рабочей нагрузке.",
      },
      fps: {
        summary: `FPS model ${FPS_MODEL_VERSION} produces a planning range from a game reference profile and the selected hardware and graphics settings. It is not a measured benchmark.`,
        inputs: "Индексы CPU и GPU, профиль игры, разрешение, предустановка качества, масштабирование, сглаживание, емкость и скорость RAM, давление VRAM и тип хранилища.",
        calculation: "Эталонное разрешение 1080p High для каждой игры масштабируется с учетом взвешенной CPU/GPU емкости, разрешения и коэффициентов качества, поддерживаемого масштабирования, нехватки памяти и меньших системных модификаторов.",
        formula: "Примерное значение FPS = ссылка на игру × аппаратный масштаб × разрешение × качество × поддерживаемые модификаторы.",
        interpretation: "Результаты включают вероятный диапазон, среднюю точку планирования, расчетный минимум 1% и вероятный ограничивающий компонент. Более широкая неопределенность используется для спекулятивных игровых профилей.",
        limitations: "Патчи, драйверы, сложность карты или сцены, фоновые задачи, термические параметры и настройки, специфичные для игры, могут существенно изменить FPS. Сравните с независимыми тестами.",
      },
      psu: {
        summary: "Калькулятор PSU оценивает общую нагрузку системы на основе опубликованных значений мощности компонентов, добавляет допуск на компоненты и применяет запас планирования.",
        inputs: "Опубликованные показатели мощности CPU и GPU, выбранный профиль дополнительных компонентов и выбранный уровень эффективности.",
        calculation: "Мощность CPU и GPU добавляется к выбранному допуску компонента. Инструмент отображает сценарии с запасом мощности 15 %, 30 % и 50 % и округляет результат планирования до общей мощности PSU, где это возможно.",
        formula: "Планируемая мощность = следующий общий размер PSU ≥ (CPU + GPU + допуск на компонент) × 1,30",
        interpretation: "Рекомендуемая мощность является целью планирования мощности. Сертификация эффективности описывает эффективность преобразования; это не снижает требуемую выходную мощность.",
        limitations: "Переходные всплески, требования к разъемам, разгон, качество PSU и рекомендации производителя по-прежнему имеют значение. Подтвердите точную документацию модели GPU и PSU.",
      },
    },
  },
};

export function CalculatorMethodology({
  lang,
  variant,
}: {
  lang: Locale;
  variant: CalculatorMethodologyVariant;
}) {
  const t = COPY[lang];
  const content = t.variants[variant];

  return (
    <section
      id={`${variant}-methodology`}
      aria-labelledby={`${variant}-methodology-title`}
      className="rounded-2xl border border-slate-200/80 bg-card p-6 shadow-sm dark:border-slate-800 md:p-8"
    >
      <div className="mb-6 max-w-3xl">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-400">
          <FlaskConical className="h-4 w-4" aria-hidden="true" />
          {t.eyebrow}
        </p>
        <h2 id={`${variant}-methodology-title`} className="text-2xl font-bold tracking-tight md:text-3xl">
          {t.title}
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">{content.summary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-muted/30 p-5">
          <h3 className="mb-2 flex items-center gap-2 font-semibold">
            <Database className="h-5 w-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
            {t.inputsLabel}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">{content.inputs}</p>
        </div>
        <div className="rounded-xl border bg-muted/30 p-5">
          <h3 className="mb-2 flex items-center gap-2 font-semibold">
            <Calculator className="h-5 w-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
            {t.calculationLabel}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">{content.calculation}</p>
        </div>
        <div className="rounded-xl border bg-muted/30 p-5">
          <h3 className="mb-2 flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-5 w-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
            {t.interpretationLabel}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">{content.interpretation}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-blue-200/70 bg-blue-50/70 p-4 dark:border-blue-900 dark:bg-blue-950/30">
        <code className="block overflow-x-auto whitespace-normal text-sm font-semibold text-blue-950 dark:text-blue-100">
          {content.formula}
        </code>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h3 className="font-semibold">{t.limitationsLabel}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{content.limitations}</p>
        </div>
        <Link
          href={getLocalizedPath(lang, 'methodology')}
          className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-blue-700 hover:underline dark:text-blue-400"
        >
          {t.fullMethodology}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
