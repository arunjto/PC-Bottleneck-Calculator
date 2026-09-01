import type { Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/lib/path-translations';

export const TOOL_SLUGS = [
  'gpu-upgrade-calculator',
  'cpu-upgrade-calculator',
  'component-comparison',
  'what-games-can-my-pc-run',
  'vram-calculator',
  'gaming-ram-calculator',
  'frame-time-calculator',
  'fps-refresh-rate-calculator',
  'resolution-scaling-calculator',
  'game-settings-optimizer',
  'ssd-upgrade-calculator',
  'pc-upgrade-priority-calculator',
] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];
export type ToolCategory = 'upgrade' | 'performance' | 'memory' | 'storage';
export type CoreToolSlug = 'bottleneck-calculator' | 'fps-calculator' | 'psu-calculator';

export type ToolContent = {
  title: string;
  shortDescription: string;
  description: string;
  resultGuide: string;
  methodologyOverview: string;
  steps: string[];
  limitations: string[];
};

export type ToolDefinition = {
  slug: ToolSlug;
  category: ToolCategory;
  formula: string;
  content: Record<Locale, ToolContent>;
  related: Array<ToolSlug | CoreToolSlug>;
};

const localized = (
  en: ToolContent,
  it: ToolContent,
  fr: ToolContent,
  de: ToolContent,
  es: ToolContent,
  ru: ToolContent,
): Record<Locale, ToolContent> => ({ en, it, fr, de, es, ru });

export const TOOLS: Record<ToolSlug, ToolDefinition> = {
  'gpu-upgrade-calculator': {
    slug: 'gpu-upgrade-calculator',
    category: 'upgrade',
    formula: 'Estimated gain = (new effective GPU score / current effective GPU score - 1) x 100',
    related: ['component-comparison', 'cpu-upgrade-calculator', 'pc-upgrade-priority-calculator', 'fps-calculator'],
    content: localized(
      {
        title: 'GPU Upgrade Calculator',
        shortDescription: 'Compare two graphics cards and estimate the useful gaming uplift.',
        description: 'Compare normalized GPU performance, VRAM and power data, then include your CPU and current FPS to see how much of the theoretical upgrade may be usable.',
        resultGuide: 'Use the estimated FPS as a planning scenario, not a benchmark. A CPU-limit warning means the selected processor may prevent the new GPU from delivering its full normalized score uplift.',
        methodologyOverview: 'The tool compares internal normalized GPU scores. It caps usable GPU score at 115% of the selected CPU score, scales the entered FPS by the effective score ratio, and separately reports VRAM and board-power changes.',
        steps: ['Compare the current and proposed GPU normalized scores.', 'Apply a CPU-side ceiling to both GPU scores.', 'Scale current FPS by the effective ratio and compare VRAM and power.'],
        limitations: ['Normalized scores are editorial comparison inputs, not measured FPS for every game.', 'Drivers, game engine, resolution, ray tracing, cooling and power limits can change real gains.'],
      },
      {
        title: 'Calcolatore upgrade GPU',
        shortDescription: 'Confronta due schede video e stima il miglioramento utile nei giochi.',
        description: 'Confronta prestazioni normalizzate, VRAM e potenza, includendo CPU e FPS attuali per stimare quanta parte dell\'upgrade sia utilizzabile.',
        resultGuide: 'Gli FPS stimati sono uno scenario di pianificazione, non un benchmark. L\'avviso CPU indica che il processore potrebbe limitare la nuova GPU.',
        methodologyOverview: 'Lo strumento confronta punteggi GPU normalizzati, limita il punteggio utilizzabile al 115% di quello CPU e scala gli FPS inseriti con tale rapporto.',
        steps: ['Confronta i punteggi delle due GPU.', 'Applica un limite legato alla CPU.', 'Scala gli FPS e confronta VRAM e potenza.'],
        limitations: ['I punteggi sono valori editoriali, non FPS misurati per ogni gioco.', 'Driver, risoluzione, ray tracing, temperature e limiti di potenza cambiano i risultati reali.'],
      },
      {
        title: 'Calculateur de mise à niveau GPU',
        shortDescription: 'Comparez deux cartes graphiques et estimez le gain utile en jeu.',
        description: 'Comparez performances normalisées, VRAM et puissance, puis ajoutez votre CPU et vos FPS actuels pour estimer le gain exploitable.',
        resultGuide: 'Les FPS estimés sont un scénario, pas un benchmark. Une alerte CPU indique que le processeur peut empêcher la nouvelle carte d\'atteindre tout son potentiel.',
        methodologyOverview: 'L\'outil compare des scores GPU normalisés, limite le score utilisable à 115 % du score CPU et applique le rapport obtenu aux FPS saisis.',
        steps: ['Comparer les scores des deux GPU.', 'Appliquer une limite liée au CPU.', 'Ajuster les FPS et comparer VRAM et puissance.'],
        limitations: ['Les scores sont des repères éditoriaux, pas des FPS mesurés pour chaque jeu.', 'Pilotes, résolution, ray tracing, températures et limites de puissance modifient le gain réel.'],
      },
      {
        title: 'GPU-Upgrade-Rechner',
        shortDescription: 'Zwei Grafikkarten vergleichen und den nutzbaren Gaming-Zuwachs schätzen.',
        description: 'Vergleiche normalisierte Leistung, VRAM und Leistungsaufnahme und beziehe CPU sowie aktuelle FPS in die nutzbare Schätzung ein.',
        resultGuide: 'Die FPS-Schätzung ist ein Planungsszenario, kein Benchmark. Eine CPU-Warnung bedeutet, dass der Prozessor die neue GPU begrenzen kann.',
        methodologyOverview: 'Das Tool vergleicht normalisierte GPU-Werte, begrenzt den nutzbaren GPU-Wert auf 115 % des CPU-Werts und skaliert damit die eingegebenen FPS.',
        steps: ['Werte beider GPUs vergleichen.', 'CPU-bezogene Obergrenze anwenden.', 'FPS skalieren sowie VRAM und Leistung vergleichen.'],
        limitations: ['Die Werte sind redaktionelle Vergleichsgrößen, keine je Spiel gemessenen FPS.', 'Treiber, Auflösung, Raytracing, Temperatur und Power-Limits verändern reale Gewinne.'],
      },
      {
        title: 'Calculadora de actualización de GPU',
        shortDescription: 'Compara dos tarjetas gráficas y estima la mejora útil en juegos.',
        description: 'Compara rendimiento normalizado, VRAM y potencia e incluye CPU y FPS actuales para estimar cuánto se aprovechará la mejora.',
        resultGuide: 'Los FPS estimados son un escenario, no un benchmark. El aviso de CPU indica que el procesador podría limitar la nueva GPU.',
        methodologyOverview: 'La herramienta compara puntuaciones GPU normalizadas, limita la puntuación útil al 115 % de la CPU y escala los FPS con esa relación.',
        steps: ['Compara las puntuaciones de ambas GPU.', 'Aplica un límite relacionado con la CPU.', 'Escala los FPS y compara VRAM y potencia.'],
        limitations: ['Las puntuaciones son referencias editoriales, no FPS medidos para cada juego.', 'Controladores, resolución, ray tracing, temperatura y potencia cambian la mejora real.'],
      },

      {
        title: "GPU Калькулятор обновления",
        shortDescription: "Сравните две видеокарты и оцените полезный игровой прирост.",
        description: "Сравните нормализованную производительность GPU, VRAM и данные о питании, затем включите ваш CPU и текущий FPS, чтобы увидеть, какую часть теоретического обновления можно использовать.",
        resultGuide: "Используйте расчетное значение FPS в качестве сценария планирования, а не контрольного показателя. Предупреждение о пределе CPU означает, что выбранный процессор может помешать новому GPU обеспечить полное нормализованное повышение оценки.",
        methodologyOverview: "Инструмент сравнивает внутренние нормализованные оценки GPU. Он ограничивает применимую оценку GPU на уровне 115 % от выбранной оценки CPU, масштабирует введенный FPS по эффективному коэффициенту оценки и отдельно сообщает о VRAM и изменениях мощности платы.",
        steps: ["Сравните текущие и предлагаемые нормализованные оценки GPU.", "Примените верхний предел со стороны CPU к обеим оценкам GPU.", "Масштабируйте ток FPS по эффективному коэффициенту и сравните VRAM и мощность."],
        limitations: ["Нормализованные оценки представляют собой исходные данные редакционного сравнения, а не измеряемые FPS для каждой игры.", "Драйверы, игровой движок, разрешение, трассировка лучей, охлаждение и ограничения по мощности могут повлиять на реальный выигрыш."],
      },
    ),
  },
  'cpu-upgrade-calculator': {
    slug: 'cpu-upgrade-calculator',
    category: 'upgrade',
    formula: 'Useful gain = selected use-case ratio, limited by the selected GPU for gaming',
    related: ['component-comparison', 'gpu-upgrade-calculator', 'pc-upgrade-priority-calculator', 'bottleneck-calculator'],
    content: localized(
      {
        title: 'CPU Upgrade Calculator',
        shortDescription: 'Compare processors for gaming or productivity and check the GPU limit.',
        description: 'Compare two CPUs using normalized performance, core count, clocks and power, with a selected GPU to distinguish theoretical CPU uplift from useful gaming uplift.',
        resultGuide: 'Productivity uses the raw normalized CPU ratio. Gaming is capped by GPU headroom, so a large CPU upgrade can show a smaller useful gain when the graphics card is already the slower component.',
        methodologyOverview: 'The productivity scenario compares normalized CPU scores directly. The gaming scenario compares effective system scores where CPU performance is capped by 110% of the selected GPU score.',
        steps: ['Calculate the proposed CPU score increase.', 'For gaming, cap both CPU scores using GPU headroom.', 'Report theoretical and useful gain plus core and power differences.'],
        limitations: ['Application scaling varies with thread count, architecture and software version.', 'A normalized score cannot represent every game, compiler, codec or memory configuration.'],
      },
      {
        title: 'Calcolatore upgrade CPU', shortDescription: 'Confronta processori per gaming o produttività e verifica il limite GPU.',
        description: 'Confronta due CPU per prestazioni, core, frequenze e potenza, usando la GPU selezionata per separare vantaggio teorico e utile nel gaming.',
        resultGuide: 'La produttività usa il rapporto CPU diretto. Nel gaming il margine GPU può ridurre il beneficio utile.',
        methodologyOverview: 'Lo scenario produttività confronta i punteggi CPU. Nel gaming il punteggio effettivo della CPU viene limitato al 110% di quello GPU.',
        steps: ['Calcola l\'aumento del punteggio CPU.', 'Nel gaming applica il margine della GPU.', 'Confronta guadagno, core e potenza.'],
        limitations: ['La scalabilità cambia tra applicazioni e versioni software.', 'Un punteggio normalizzato non rappresenta ogni gioco o carico.'],
      },
      {
        title: 'Calculateur de mise à niveau CPU', shortDescription: 'Comparez des processeurs pour jeu ou productivité et vérifiez la limite GPU.',
        description: 'Comparez deux CPU selon performance, cœurs, fréquences et puissance, avec le GPU choisi pour distinguer gain théorique et gain utile en jeu.',
        resultGuide: 'La productivité utilise le rapport CPU direct. En jeu, la marge du GPU peut réduire le gain réellement utile.',
        methodologyOverview: 'Le scénario productivité compare les scores CPU. En jeu, le score effectif est limité à 110 % du score GPU.',
        steps: ['Calculer la hausse du score CPU.', 'Appliquer en jeu la marge imposée par le GPU.', 'Comparer gain, cœurs et puissance.'],
        limitations: ['La mise à l\'échelle varie selon les applications.', 'Un score normalisé ne représente pas chaque jeu ou logiciel.'],
      },
      {
        title: 'CPU-Upgrade-Rechner', shortDescription: 'Prozessoren für Gaming oder Produktivität vergleichen und GPU-Limit prüfen.',
        description: 'Vergleiche zwei CPUs nach Leistung, Kernen, Takten und Leistungsaufnahme und trenne mit der gewählten GPU theoretischen von nutzbarem Gaming-Zuwachs.',
        resultGuide: 'Produktivität nutzt das direkte CPU-Verhältnis. Beim Gaming kann die GPU den nutzbaren Vorteil begrenzen.',
        methodologyOverview: 'Für Produktivität werden CPU-Werte direkt verglichen. Im Gaming wird der effektive CPU-Wert auf 110 % des GPU-Werts begrenzt.',
        steps: ['CPU-Wertzuwachs berechnen.', 'Beim Gaming GPU-Spielraum anwenden.', 'Gewinn, Kerne und Leistungsaufnahme vergleichen.'],
        limitations: ['Software skaliert unterschiedlich mit Kernen und Architektur.', 'Ein normalisierter Wert bildet nicht jedes Spiel oder Programm ab.'],
      },
      {
        title: 'Calculadora de actualización de CPU', shortDescription: 'Compara procesadores para juegos o productividad y comprueba el límite de la GPU.',
        description: 'Compara dos CPU por rendimiento, núcleos, frecuencias y potencia, usando la GPU elegida para separar mejora teórica y útil en juegos.',
        resultGuide: 'Productividad usa la relación directa de CPU. En juegos, el margen de la GPU puede reducir la mejora aprovechable.',
        methodologyOverview: 'Productividad compara las puntuaciones CPU. En juegos, la CPU efectiva se limita al 110 % de la puntuación GPU.',
        steps: ['Calcula el aumento de puntuación CPU.', 'En juegos aplica el margen de la GPU.', 'Compara mejora, núcleos y potencia.'],
        limitations: ['La escalabilidad cambia según la aplicación.', 'Una puntuación normalizada no representa cada juego o programa.'],
      },

      {
        title: "CPU Калькулятор обновления",
        shortDescription: "Сравните процессоры для игр или производительности и проверьте предел GPU.",
        description: "Сравните два процессора с использованием нормализованной производительности, количества ядер, тактовой частоты и мощности с выбранным GPU, чтобы отличить теоретический прирост CPU от полезного прироста в играх.",
        resultGuide: "Производительность использует необработанное нормализованное соотношение CPU. Игры ограничены запасом GPU, поэтому большое обновление CPU может дать меньший полезный прирост, если видеокарта уже является более медленным компонентом.",
        methodologyOverview: "Сценарий производительности напрямую сравнивает нормализованные показатели CPU. В игровом сценарии сравниваются эффективные показатели системы, где производительность CPU ограничена 110 % от выбранного показателя GPU.",
        steps: ["Рассчитайте предлагаемое увеличение балла CPU.", "В играх ограничьте оба результата CPU, используя запас GPU.", "Сообщите о теоретическом и полезном выигрыше, а также о различиях в ядре и мощности."],
        limitations: ["Масштабирование приложения зависит от количества потоков, архитектуры и версии программного обеспечения.", "Нормализованная оценка не может отражать каждую игру, компилятор, кодек или конфигурацию памяти."],
      },
    ),
  },
  'component-comparison': {
    slug: 'component-comparison',
    category: 'performance',
    formula: 'Relative difference = (comparison value / baseline value - 1) × 100; score-per-watt index = normalized score / listed TDP',
    related: ['cpu-upgrade-calculator', 'gpu-upgrade-calculator', 'bottleneck-calculator'],
    content: localized(
      {
        title: 'CPU & GPU Comparison Tool',
        shortDescription: 'Compare two processors or graphics cards side by side with transparent planning metrics.',
        description: 'Compare two CPUs or two GPUs using normalized planning scores, core or VRAM capacity, clocks, listed power, architecture and release data—without unreliable live-price claims.',
        resultGuide: 'Use the category leaders to identify factual trade-offs rather than treating one component as universally better. A higher normalized score suggests broader performance positioning, while power, socket, VRAM and workload needs can change the practical choice.',
        methodologyOverview: 'The tool compares components only within the same class. It treats the first selection as the baseline, calculates relative score and power differences, derives a simple score-per-watt planning index, and reports category leaders without converting the score gap into claimed real-world FPS.',
        steps: ['Choose CPU or GPU mode and select two different models.', 'Compare listed specifications and calculate differences relative to the first model.', 'Review category leaders, compatibility notes and manufacturer specifications before deciding.'],
        limitations: ['Normalized scores are editorial planning indexes, not measured application or gaming benchmark percentages.', 'Listed TDP or board power is not whole-system consumption, and actual clocks, thermals and performance vary by workload and implementation.', 'The tool intentionally omits current prices because prices change by region, retailer and date.'],
      },
      {
        title: 'Strumento di confronto CPU e GPU',
        shortDescription: 'Confronta due processori o schede video con metriche di pianificazione trasparenti.',
        description: 'Confronta due CPU o due GPU per punteggio normalizzato, core o VRAM, frequenze, potenza indicata, architettura e anno, senza prezzi live inaffidabili.',
        resultGuide: 'Usa i leader per categoria per valutare i compromessi, non per dichiarare un vincitore universale. Punteggio, potenza, socket, VRAM e carico reale possono favorire scelte diverse.',
        methodologyOverview: 'Confronta solo componenti della stessa classe. Il primo è il riferimento; vengono calcolate differenze relative, un semplice indice punteggio per watt e leader per categoria, senza trasformare lo scarto in FPS reali dichiarati.',
        steps: ['Scegli la modalità CPU o GPU e due modelli diversi.', 'Confronta specifiche e differenze rispetto al primo modello.', 'Verifica leader, compatibilità e specifiche del produttore.'],
        limitations: ['I punteggi sono indici editoriali, non percentuali misurate in ogni gioco o applicazione.', 'TDP e potenza scheda non rappresentano il consumo dell’intero sistema.', 'I prezzi correnti sono esclusi perché cambiano per regione, negozio e data.'],
      },
      {
        title: 'Outil de comparaison CPU et GPU',
        shortDescription: 'Comparez deux processeurs ou cartes graphiques avec des mesures de planification transparentes.',
        description: 'Comparez deux CPU ou deux GPU selon score normalisé, cœurs ou VRAM, fréquences, puissance indiquée, architecture et date, sans prix en direct peu fiables.',
        resultGuide: 'Utilisez les leaders par catégorie pour comprendre les compromis plutôt que chercher un vainqueur universel. Score, puissance, socket, VRAM et charge réelle peuvent conduire à des choix différents.',
        methodologyOverview: 'L’outil compare uniquement des composants de même classe. Le premier sert de référence; il calcule écarts relatifs, indice simple score par watt et leaders par catégorie, sans convertir l’écart en FPS réels annoncés.',
        steps: ['Choisir le mode CPU ou GPU et deux modèles différents.', 'Comparer les caractéristiques et les écarts par rapport au premier.', 'Vérifier leaders, compatibilité et spécifications constructeur.'],
        limitations: ['Les scores sont des indices éditoriaux, pas des pourcentages mesurés dans chaque jeu ou application.', 'Le TDP ou la puissance carte ne représente pas la consommation totale du système.', 'Les prix actuels sont exclus car ils varient selon région, vendeur et date.'],
      },
      {
        title: 'CPU- und GPU-Vergleichstool',
        shortDescription: 'Zwei Prozessoren oder Grafikkarten mit transparenten Planungswerten vergleichen.',
        description: 'Vergleiche zwei CPUs oder zwei GPUs nach normalisiertem Wert, Kernen oder VRAM, Takten, angegebener Leistung, Architektur und Jahr—ohne unzuverlässige Live-Preise.',
        resultGuide: 'Nutze Kategoriesieger, um konkrete Kompromisse zu erkennen, statt einen universellen Sieger anzunehmen. Wert, Leistung, Sockel, VRAM und reale Last können unterschiedliche Modelle bevorzugen.',
        methodologyOverview: 'Das Tool vergleicht nur Komponenten derselben Klasse. Die erste Auswahl ist die Referenz; berechnet werden relative Unterschiede, ein einfacher Wert-pro-Watt-Index und Kategoriesieger, ohne den Abstand als reale FPS auszugeben.',
        steps: ['CPU- oder GPU-Modus und zwei verschiedene Modelle wählen.', 'Spezifikationen und Unterschiede zur Referenz vergleichen.', 'Kategoriesieger, Kompatibilität und Herstellerangaben prüfen.'],
        limitations: ['Normalisierte Werte sind redaktionelle Indizes, keine in jedem Spiel oder Programm gemessenen Prozente.', 'TDP oder Board-Power entspricht nicht dem gesamten Systemverbrauch.', 'Aktuelle Preise fehlen bewusst, da sie nach Region, Händler und Datum variieren.'],
      },
      {
        title: 'Comparador de CPU y GPU',
        shortDescription: 'Compara dos procesadores o tarjetas gráficas con métricas de planificación transparentes.',
        description: 'Compara dos CPU o dos GPU por puntuación normalizada, núcleos o VRAM, frecuencias, potencia indicada, arquitectura y año, sin precios en vivo poco fiables.',
        resultGuide: 'Usa los líderes por categoría para entender las diferencias, no para asumir un ganador universal. Puntuación, potencia, socket, VRAM y carga real pueden favorecer elecciones distintas.',
        methodologyOverview: 'La herramienta compara únicamente componentes de la misma clase. La primera selección es la referencia; calcula diferencias relativas, un índice sencillo de puntuación por vatio y líderes por categoría, sin convertir la diferencia en FPS reales.',
        steps: ['Elige modo CPU o GPU y dos modelos diferentes.', 'Compara especificaciones y diferencias respecto al primero.', 'Revisa líderes, compatibilidad y especificaciones del fabricante.'],
        limitations: ['Las puntuaciones son índices editoriales, no porcentajes medidos en cada juego o aplicación.', 'El TDP o la potencia de tarjeta no representa el consumo total del sistema.', 'Se omiten precios actuales porque varían según región, tienda y fecha.'],
      },

      {
        title: "Инструмент сравнения CPU и GPU",
        shortDescription: "Сравните два процессора или видеокарты бок о бок с помощью прозрачных показателей планирования.",
        description: "Сравнивайте два процессора или два графических процессора, используя нормализованные показатели планирования, мощность ядра или VRAM, тактовую частоту, указанную мощность, архитектуру и данные о выпуске — без ненадежных заявлений о реальной цене.",
        resultGuide: "Используйте лидеров категорий для выявления фактических компромиссов, а не рассматривайте один компонент как универсально лучший. Более высокий нормализованный балл предполагает более широкую позицию по производительности, в то время как потребности в мощности, разъеме, VRAM и рабочей нагрузке могут изменить практический выбор.",
        methodologyOverview: "Инструмент сравнивает компоненты только внутри одного класса. Он рассматривает первый выбор как базовый, вычисляет относительный балл и разницу в мощности, выводит простой индекс планирования оценки на ватт и сообщает о лидерах категорий, не конвертируя разрыв в баллах в заявленный реальный FPS.",
        steps: ["Выберите режим CPU или GPU и выберите две разные модели.", "Сравните перечисленные характеристики и рассчитайте различия по сравнению с первой моделью.", "Прежде чем принять решение, ознакомьтесь с лидерами категорий, примечаниями о совместимости и спецификациями производителей."],
        limitations: ["Нормализованные оценки представляют собой индексы редакционного планирования, а не измеренные проценты показателей приложений или игр.", "Указанный TDP или мощность платы не является потреблением всей системы, а фактические тактовые частоты, тепловые характеристики и производительность зависят от рабочей нагрузки и реализации.", "Инструмент намеренно не учитывает текущие цены, поскольку цены меняются в зависимости от региона, продавца и даты."],
      },
    ),
  },
  'what-games-can-my-pc-run': {
    slug: 'what-games-can-my-pc-run',
    category: 'performance',
    formula: 'Per-game FPS range = calibrated game profile × CPU factor × GPU factor × resolution factor × quality factor × RAM/VRAM adjustments',
    related: ['fps-calculator', 'game-settings-optimizer', 'vram-calculator', 'component-comparison'],
    content: localized(
      {
        title: 'What Games Can My PC Run? Free Game Compatibility Checker',
        shortDescription: 'Check estimated FPS ranges across supported games using your CPU, GPU, RAM, resolution and target FPS.',
        description: 'Select your PC hardware once to compare transparent FPS planning ranges across every maintained game profile. Filter strong matches, games near your target, titles that may need lower settings and hardware-limited scenarios.',
        resultGuide: 'Start with Strong fit and Meets target, then open any game in the detailed FPS calculator to test upscaling, memory speed, storage and anti-aliasing. A result is a planning estimate, not proof that a game will run at the same FPS in every scene.',
        methodologyOverview: 'Each game uses the same versioned FPS model as the detailed calculator. The model combines an editorial game reference profile with normalized CPU and GPU positioning, resolution, quality, memory capacity and an uncertainty range.',
        steps: ['Apply the selected CPU, GPU, RAM, resolution and quality to every maintained game profile.', 'Calculate a midpoint, planning range, estimated 1% low and likely limiting component for each game.', 'Group results against the selected target FPS and suggest the least-reduced preset that reaches the target midpoint.'],
        limitations: ['Results are modelled planning ranges rather than measurements from your exact PC, game build or scene.', 'Drivers, cooling, power limits, background software, game patches and unsupported hardware details can materially change performance.', 'Only games with maintained profiles are included; a missing game is not evidence that the PC cannot run it.'],
      },
      {
        title: 'Quali giochi può eseguire il mio PC? Verifica gratuita',
        shortDescription: 'Confronta intervalli FPS stimati usando CPU, GPU, RAM, risoluzione e FPS obiettivo.',
        description: 'Seleziona l’hardware una volta per confrontare intervalli FPS trasparenti in tutti i profili di gioco mantenuti e trovare titoli adatti, vicini all’obiettivo o da regolare.',
        resultGuide: 'Inizia da Ottimo abbinamento e Raggiunge l’obiettivo, poi apri il calcolatore FPS dettagliato per provare upscaling, memoria, storage e anti-aliasing. È una stima di pianificazione, non una garanzia per ogni scena.',
        methodologyOverview: 'Ogni gioco usa lo stesso modello FPS versionato del calcolatore dettagliato, combinando profilo editoriale, posizione normalizzata di CPU e GPU, risoluzione, qualità, memoria e incertezza.',
        steps: ['Applica hardware e impostazioni a ogni profilo mantenuto.', 'Calcola valore medio, intervallo, 1% low e componente limitante.', 'Raggruppa i risultati rispetto agli FPS obiettivo e suggerisce un preset pratico.'],
        limitations: ['Gli intervalli sono modellati, non misurati sul PC e nella scena esatti.', 'Driver, temperature, limiti di potenza, patch e software in background cambiano le prestazioni.', 'Sono inclusi solo i giochi con profili mantenuti.'],
      },
      {
        title: 'À quels jeux mon PC peut-il jouer ? Vérificateur gratuit',
        shortDescription: 'Comparez les plages FPS estimées avec votre CPU, GPU, RAM, résolution et cible FPS.',
        description: 'Sélectionnez votre matériel une fois pour comparer les plages FPS de tous les profils maintenus et repérer les jeux adaptés, proches de la cible ou nécessitant des réglages.',
        resultGuide: 'Commencez par les meilleurs groupes, puis ouvrez le calculateur FPS détaillé pour tester mise à l’échelle, mémoire, stockage et anti-aliasing. Il s’agit d’une estimation, pas d’une garantie pour chaque scène.',
        methodologyOverview: 'Chaque jeu utilise le même modèle FPS versionné que le calculateur détaillé : profil éditorial, position CPU/GPU normalisée, résolution, qualité, mémoire et incertitude.',
        steps: ['Appliquer le matériel et les réglages à chaque profil maintenu.', 'Calculer moyenne, plage, 1% low et composant limitant.', 'Classer selon la cible FPS et suggérer un préréglage pratique.'],
        limitations: ['Les plages sont modélisées et non mesurées sur votre PC exact.', 'Pilotes, températures, limites de puissance, correctifs et logiciels modifient les performances.', 'Seuls les jeux avec un profil maintenu sont inclus.'],
      },
      {
        title: 'Welche Spiele schafft mein PC? Kostenloser Spiele-Check',
        shortDescription: 'Vergleiche geschätzte FPS-Bereiche mit CPU, GPU, RAM, Auflösung und Ziel-FPS.',
        description: 'Wähle deine Hardware einmal aus und vergleiche transparente FPS-Bereiche aller gepflegten Spielprofile – von gut geeigneten Titeln bis zu Szenarien mit Anpassungsbedarf.',
        resultGuide: 'Beginne mit Sehr gut geeignet und Ziel erreicht. Öffne danach den detaillierten FPS-Rechner für Upscaling, Speicher, Laufwerk und Kantenglättung. Das Ergebnis ist eine Planungsschätzung, keine Garantie für jede Szene.',
        methodologyOverview: 'Jedes Spiel nutzt dasselbe versionierte FPS-Modell wie der Detailrechner: redaktionelles Spielprofil, normalisierte CPU-/GPU-Position, Auflösung, Qualität, Speicher und Unsicherheit.',
        steps: ['Hardware und Einstellungen auf jedes gepflegte Spielprofil anwenden.', 'Mittelwert, Bereich, 1% Low und wahrscheinliches Limit berechnen.', 'Nach Ziel-FPS gruppieren und ein praktikables Preset vorschlagen.'],
        limitations: ['Die Bereiche sind modelliert und nicht auf deinem exakten PC gemessen.', 'Treiber, Temperaturen, Power-Limits, Patches und Hintergrundsoftware verändern die Leistung.', 'Enthalten sind nur Spiele mit gepflegtem Profil.'],
      },
      {
        title: '¿Qué juegos puede ejecutar mi PC? Comprobador gratuito',
        shortDescription: 'Compara rangos FPS estimados con tu CPU, GPU, RAM, resolución y objetivo FPS.',
        description: 'Selecciona el hardware una vez para comparar rangos FPS transparentes de todos los perfiles mantenidos y encontrar juegos adecuados, cercanos al objetivo o que necesitan ajustes.',
        resultGuide: 'Empieza por los mejores grupos y abre después la calculadora FPS detallada para probar reescalado, memoria, almacenamiento y antialiasing. Es una estimación de planificación, no una garantía para cada escena.',
        methodologyOverview: 'Cada juego usa el mismo modelo FPS versionado de la calculadora detallada: perfil editorial, posición normalizada de CPU/GPU, resolución, calidad, memoria e incertidumbre.',
        steps: ['Aplica hardware y ajustes a cada perfil mantenido.', 'Calcula promedio, rango, 1% low y componente limitante.', 'Agrupa según el objetivo FPS y sugiere un preajuste práctico.'],
        limitations: ['Los rangos son modelados y no mediciones del PC exacto.', 'Controladores, temperaturas, límites de potencia, parches y software cambian el rendimiento.', 'Solo se incluyen juegos con perfiles mantenidos.'],
      },

      {
        title: "Какие игры можно запускать на моем компьютере? Бесплатная проверка совместимости игр",
        shortDescription: "Проверьте предполагаемые диапазоны FPS в поддерживаемых играх, используя CPU, GPU, RAM, разрешение и целевой показатель FPS.",
        description: "Выберите оборудование вашего ПК один раз, чтобы сравнить прозрачные FPS диапазоны планирования для каждого поддерживаемого игрового профиля. Фильтруйте сильные совпадения, игры, близкие к вашей цели, игры, для которых могут потребоваться более низкие настройки, и сценарии с аппаратными ограничениями.",
        resultGuide: "Начните с «Сильного соответствия» и «Соответствует цели», затем откройте любую игру в подробном калькуляторе FPS, чтобы проверить масштабирование, скорость памяти, объем памяти и сглаживание. Результатом является плановая оценка, а не доказательство того, что игра будет работать с одним и тем же FPS в каждой сцене.",
        methodologyOverview: "В каждой игре используется та же версия модели FPS, что и в подробном калькуляторе. Модель сочетает в себе редакционный справочный профиль игры с нормализованными CPU и GPU позиционированием, разрешением, качеством, объемом памяти и диапазоном неопределенности.",
        steps: ["Примените выбранные CPU, GPU, RAM, разрешение и качество к каждому поддерживаемому игровому профилю.", "Рассчитайте среднюю точку, диапазон планирования, предполагаемый минимум 1% и вероятный ограничивающий компонент для каждой игры.", "Сгруппируйте результаты по выбранному целевому значению FPS и предложите предустановку с наименьшим сокращением, которая достигает целевой средней точки."],
        limitations: ["Результаты представляют собой смоделированные диапазоны планирования, а не измерения на конкретном ПК, игровой сборке или сцене.", "Драйверы, охлаждение, ограничения мощности, фоновое программное обеспечение, игровые патчи и детали неподдерживаемого оборудования могут существенно повлиять на производительность.", "Включены только игры с сохраненными профилями; отсутствие игры не является свидетельством того, что ПК не может ее запустить."],
      },
    ),
  },
  'vram-calculator': {
    slug: 'vram-calculator',
    category: 'memory',
    formula: 'Planning midpoint = game-profile base + resolution + textures + ray tracing − conservative upscaling adjustment; working range = midpoint ± 10%; suggested tier = next common capacity at or above the range',
    related: ['fps-calculator', 'resolution-scaling-calculator', 'game-settings-optimizer'],
    content: localized(
      {
        title: 'How Much VRAM Do I Need? Gaming VRAM Calculator', shortDescription: 'Estimate a practical gaming VRAM range from your game, resolution and graphics settings.',
        description: 'Select a game, resolution, texture quality, ray tracing level and upscaling mode to estimate a working VRAM range, a common capacity tier and every allowance used in the calculation.',
        resultGuide: 'Treat the suggested tier as capacity-planning guidance, not a measured requirement or GPU-performance ranking. Compare exact-game benchmarks and frame-time behavior before buying; allocated memory can be higher than the active working set.',
        methodologyOverview: 'The selected game contributes an editorial workload-profile base. Resolution, texture and ray-tracing allowances are added, a deliberately small upscaling adjustment is applied, and a ±10% uncertainty band is rounded up to a common GPU memory capacity.',
        steps: ['Map the selected game’s graphics-demand profile to a transparent starting allowance.', 'Add the visible resolution, texture and ray-tracing allowances and the conservative upscaling adjustment.', 'Create a ±10% working range and round its upper end to the next common VRAM capacity.'],
        limitations: ['This is a planning model, not telemetry from the selected game; patches, scenes, drivers and engine memory management can change actual use.', 'Upscaling does not reduce every VRAM workload equally, while mods, creator workloads and high-resolution texture packs can exceed the range.'],
      },
      {
        title: 'Quanta VRAM serve? Calcolatore VRAM per il gaming', shortDescription: 'Stima un intervallo VRAM pratico da gioco, risoluzione e impostazioni grafiche.',
        description: 'Seleziona gioco, risoluzione, qualità texture, ray tracing e upscaling per stimare intervallo operativo, taglio comune e ogni margine del calcolo.',
        resultGuide: 'Usa il taglio suggerito come guida di capacità, non come requisito misurato o classifica delle GPU. Prima dell’acquisto confronta benchmark e frame time dello stesso gioco; memoria allocata e working set attivo non coincidono.',
        methodologyOverview: 'Il profilo grafico del gioco fornisce la base. Si aggiungono risoluzione, texture e ray tracing, si applica una piccola correzione per l’upscaling e una fascia di incertezza del ±10%, poi si arrotonda a un taglio comune.',
        steps: ['Associa il profilo grafico del gioco a una base trasparente.', 'Somma i margini visibili e la correzione prudente per l’upscaling.', 'Crea un intervallo del ±10% e arrotonda il limite superiore al taglio VRAM comune successivo.'],
        limitations: ['È un modello di pianificazione, non telemetria del gioco: patch, scene, driver e motore possono cambiare l’uso reale.', 'L’upscaling non riduce ogni carico VRAM allo stesso modo; mod, texture ad alta risoluzione e creazione possono superare l’intervallo.'],
      },
      {
        title: 'De combien de VRAM ai-je besoin ? Calculateur VRAM gaming', shortDescription: 'Estimez une plage de VRAM pratique selon le jeu, la résolution et les réglages.',
        description: 'Sélectionnez jeu, résolution, textures, ray tracing et mise à l’échelle pour obtenir une plage de travail, un palier courant et le détail de chaque marge.',
        resultGuide: 'Le palier conseillé guide la capacité : ce n’est ni une mesure ni un classement de GPU. Vérifiez des benchmarks et frame times du même jeu avant achat ; mémoire allouée et working set actif diffèrent.',
        methodologyOverview: 'Le profil graphique du jeu fournit la base. Les marges de résolution, textures et ray tracing sont ajoutées, une petite correction de mise à l’échelle est appliquée, puis une plage de ±10% est arrondie à une capacité courante.',
        steps: ['Associer le profil graphique du jeu à une base transparente.', 'Ajouter les marges visibles et la correction prudente de mise à l’échelle.', 'Créer une plage de ±10% et arrondir sa borne haute au palier VRAM courant suivant.'],
        limitations: ['C’est un modèle de planification, pas la télémétrie du jeu ; correctifs, scènes, pilotes et moteur changent l’usage réel.', 'La mise à l’échelle ne réduit pas toutes les charges VRAM pareil ; mods, création et textures haute résolution peuvent dépasser la plage.'],
      },
      {
        title: 'Wie viel VRAM brauche ich? Gaming-VRAM-Rechner', shortDescription: 'Schätze einen praktischen VRAM-Bereich aus Spiel, Auflösung und Grafikeinstellungen.',
        description: 'Wähle Spiel, Auflösung, Texturqualität, Raytracing und Upscaling für Arbeitsbereich, gängige Kapazitätsstufe und eine sichtbare Aufschlüsselung.',
        resultGuide: 'Die empfohlene Stufe ist Kapazitätsplanung, keine Messung oder GPU-Rangliste. Prüfe vor dem Kauf Benchmarks und Frame Times desselben Spiels; reservierter Speicher und aktiver Working Set sind nicht identisch.',
        methodologyOverview: 'Das Grafikprofil des Spiels liefert die Basis. Auflösung, Texturen und Raytracing werden addiert, ein kleiner Upscaling-Abschlag angewendet und ein Unsicherheitsbereich von ±10% auf eine gängige Kapazität aufgerundet.',
        steps: ['Das Grafikprofil des Spiels einer transparenten Basis zuordnen.', 'Sichtbare Aufschläge und die vorsichtige Upscaling-Anpassung addieren.', 'Einen Bereich von ±10% bilden und dessen Obergrenze auf die nächste gängige VRAM-Stufe aufrunden.'],
        limitations: ['Dies ist ein Planungsmodell, keine Spieltelemetrie; Patches, Szenen, Treiber und Engine-Verwaltung ändern die reale Nutzung.', 'Upscaling senkt nicht jede VRAM-Last gleich; Mods, Kreativarbeit und hochauflösende Texturen können den Bereich überschreiten.'],
      },
      {
        title: '¿Cuánta VRAM necesito? Calculadora de VRAM para gaming', shortDescription: 'Estima un rango práctico de VRAM según juego, resolución y ajustes gráficos.',
        description: 'Selecciona juego, resolución, texturas, ray tracing y reescalado para obtener rango de trabajo, nivel común y el desglose de cada margen.',
        resultGuide: 'El nivel sugerido orienta la capacidad; no es una medición ni una clasificación de GPU. Revisa benchmarks y frame times del mismo juego antes de comprar; memoria asignada y working set activo no son iguales.',
        methodologyOverview: 'El perfil gráfico del juego aporta la base. Se suman resolución, texturas y ray tracing, se aplica un pequeño ajuste de reescalado y un rango de incertidumbre de ±10%, y se redondea a una capacidad común.',
        steps: ['Asocia el perfil gráfico del juego a una base transparente.', 'Suma los márgenes visibles y el ajuste prudente de reescalado.', 'Crea un rango de ±10% y redondea su límite superior al siguiente nivel común de VRAM.'],
        limitations: ['Es un modelo de planificación, no telemetría del juego; parches, escenas, controladores y motor cambian el uso real.', 'El reescalado no reduce todas las cargas VRAM por igual; mods, creación y texturas de alta resolución pueden superar el rango.'],
      },

      {
        title: "Сколько VRAM мне нужно? Игровой VRAM Калькулятор", shortDescription: "Оцените практический игровой диапазон VRAM исходя из вашей игры, разрешения и настроек графики.",
        description: "Выберите игру, разрешение, качество текстур, уровень трассировки лучей и режим масштабирования, чтобы оценить рабочий диапазон VRAM, общий уровень емкости и все допуски, используемые в расчетах.",
        resultGuide: "Рассматривайте предлагаемый уровень как руководство по планированию мощности, а не как измеренное требование или рейтинг производительности GPU. Перед покупкой сравните тесты конкретной игры и поведение во времени кадра; выделенная память может быть больше, чем активный рабочий набор.",
        methodologyOverview: "Выбранная игра составляет основу профиля редакционной нагрузки. Добавляются разрешения, текстуры и трассировка лучей, применяется намеренно небольшая корректировка масштабирования, а диапазон неопределенности ± 10% округляется до общего объема памяти GPU.",
        steps: ["Сопоставьте профиль требований к графике выбранной игры с прозрачным стартовым допуском.", "Добавьте видимое разрешение, текстуру и трассировку лучей, а также консервативную настройку масштабирования.", "Создайте рабочий диапазон ±10% и округлите его верхний конец до следующей общей емкости VRAM."],
        limitations: ["Это модель планирования, а не телеметрия из выбранной игры; патчи, сцены, драйверы и управление памятью движка могут изменить фактическое использование.", "Масштабирование не снижает одинаково каждую рабочую нагрузку VRAM, в то время как моды, рабочие нагрузки создателей и пакеты текстур высокого разрешения могут превышать диапазон."],
      },
    ),
  },
  'gaming-ram-calculator': {
    slug: 'gaming-ram-calculator',
    category: 'memory',
    formula: 'Working RAM = game base + multitasking + streaming + modding; recommendation includes 20% headroom',
    related: ['vram-calculator', 'game-settings-optimizer', 'pc-upgrade-priority-calculator'],
    content: localized(
      {
        title: 'Gaming RAM Calculator', shortDescription: 'Estimate RAM capacity for gaming, multitasking, streaming and mods.',
        description: 'Select the kind of games you play and add browser, background-app, streaming and modding demands to plan a sensible memory capacity.',
        resultGuide: 'The recommended tier includes working headroom. More capacity does not increase FPS when the system already has enough, but insufficient capacity can cause paging and stutter.',
        methodologyOverview: 'The calculator starts with a workload base, adds explicit allowances for concurrent activity and mods, applies 20% headroom, then rounds up to a common memory-kit size.',
        steps: ['Select a baseline based on game type.', 'Add multitasking, streaming and modding allowances.', 'Apply headroom and round up to a common RAM capacity.'],
        limitations: ['Individual games and mod packs can use much more or less memory.', 'Memory speed, latency, channel layout and page-file behavior are outside this capacity estimate.'],
      },
      {
        title: 'Calcolatore RAM per gaming', shortDescription: 'Stima la RAM per giochi, multitasking, streaming e mod.',
        description: 'Seleziona il tipo di gioco e aggiungi browser, app, streaming e mod per pianificare la capacità.',
        resultGuide: 'Il taglio suggerito include margine. Più RAM non aumenta gli FPS se quella disponibile è già sufficiente.',
        methodologyOverview: 'Parte da una base di utilizzo, aggiunge attività simultanee e mod, applica il 20% di margine e arrotonda a un kit comune.',
        steps: ['Seleziona la base del gioco.', 'Aggiungi multitasking, streaming e mod.', 'Applica il margine e arrotonda.'],
        limitations: ['Giochi e mod pack hanno consumi molto diversi.', 'Velocità, latenza e canali RAM non sono stimati.'],
      },
      {
        title: 'Calculateur de RAM pour le jeu', shortDescription: 'Estimez la RAM pour jeu, multitâche, streaming et mods.',
        description: 'Choisissez le type de jeu et ajoutez navigateur, applications, streaming et mods pour planifier la capacité.',
        resultGuide: 'Le palier conseillé inclut une marge. Plus de RAM n\'augmente pas les FPS si la capacité est déjà suffisante.',
        methodologyOverview: 'L\'outil part d\'une base, ajoute les activités simultanées et les mods, applique 20 % de marge puis arrondit à un kit courant.',
        steps: ['Choisir la base du jeu.', 'Ajouter multitâche, streaming et mods.', 'Appliquer la marge et arrondir.'],
        limitations: ['Jeux et packs de mods consomment des quantités très différentes.', 'Vitesse, latence et canaux mémoire ne sont pas estimés.'],
      },
      {
        title: 'Gaming-RAM-Rechner', shortDescription: 'RAM-Kapazität für Spiele, Multitasking, Streaming und Mods schätzen.',
        description: 'Wähle den Spieltyp und ergänze Browser, Hintergrundprogramme, Streaming und Mods.',
        resultGuide: 'Die Empfehlung enthält Reserve. Mehr RAM erhöht keine FPS, wenn bereits genügend Kapazität vorhanden ist.',
        methodologyOverview: 'Das Tool nutzt einen Basisbedarf, addiert gleichzeitige Aufgaben und Mods, gibt 20 % Reserve hinzu und rundet auf eine übliche Kit-Größe.',
        steps: ['Spiel-Basis auswählen.', 'Multitasking, Streaming und Mods addieren.', 'Reserve anwenden und aufrunden.'],
        limitations: ['Spiele und Mod-Pakete benötigen sehr unterschiedliche Mengen.', 'Takt, Latenz und Speicherkanäle werden nicht bewertet.'],
      },
      {
        title: 'Calculadora de RAM para juegos', shortDescription: 'Estima RAM para juegos, multitarea, streaming y mods.',
        description: 'Elige el tipo de juego y añade navegador, aplicaciones, streaming y mods para planificar la capacidad.',
        resultGuide: 'La recomendación incluye margen. Más RAM no aumenta los FPS si ya existe capacidad suficiente.',
        methodologyOverview: 'Parte de una base, suma tareas simultáneas y mods, aplica 20 % de margen y redondea a un kit común.',
        steps: ['Elige la base del juego.', 'Añade multitarea, streaming y mods.', 'Aplica margen y redondea.'],
        limitations: ['Juegos y paquetes de mods consumen cantidades muy distintas.', 'Velocidad, latencia y canales no se valoran.'],
      },

      {
        title: "Игровой RAM Калькулятор", shortDescription: "Оцените емкость RAM для игр, многозадачности, потоковой передачи и модов.",
        description: "Выберите тип игр, в которые вы играете, и добавьте требования к браузеру, фоновым приложениям, потоковой передаче и моддингу, чтобы спланировать разумный объем памяти.",
        resultGuide: "Рекомендуемый уровень включает рабочий запас. Увеличение емкости не увеличивает FPS, если в системе уже достаточно, но недостаточная емкость может привести к подкачке страниц и зависаниям.",
        methodologyOverview: "Калькулятор начинает с базы рабочей нагрузки, добавляет явные допуски на одновременную деятельность и модификации, применяет 20% запаса, а затем округляет до общего размера комплекта памяти.",
        steps: ["Выберите базовый уровень в зависимости от типа игры.", "Добавьте возможности многозадачности, потоковой передачи и моддинга.", "Примените запас и округлите до общей емкости RAM."],
        limitations: ["Отдельные игры и пакеты модов могут использовать гораздо больше или меньше памяти.", "Скорость памяти, задержка, расположение каналов и поведение файла подкачки выходят за пределы этой оценки емкости."],
      },
    ),
  },
  'frame-time-calculator': {
    slug: 'frame-time-calculator', category: 'performance', formula: 'Frame time (ms) = 1,000 / FPS',
    related: ['fps-refresh-rate-calculator', 'fps-calculator', 'game-settings-optimizer'],
    content: localized(
      {
        title: 'Frame Time Calculator', shortDescription: 'Convert FPS into milliseconds per frame and compare two targets.',
        description: 'See the time budget for every rendered frame. Frame time makes performance differences easier to understand than FPS alone.',
        resultGuide: 'Lower frame time is faster, but consistency also matters. Average FPS cannot reveal spikes, stutter or poor 1% lows.',
        methodologyOverview: 'This is an exact unit conversion using the reciprocal relationship between frames per second and milliseconds per frame.',
        steps: ['Divide 1,000 by current FPS.', 'Repeat for target FPS.', 'Subtract target frame time from current frame time.'],
        limitations: ['Average FPS does not describe frame-time variance.', 'Frame pacing, input latency and display latency are separate measurements.'],
      },
      {
        title: 'Calcolatore del tempo per fotogramma', shortDescription: 'Converti FPS in millisecondi e confronta due obiettivi.',
        description: 'Visualizza il tempo disponibile per ogni fotogramma e interpreta meglio le differenze di prestazioni.',
        resultGuide: 'Un tempo inferiore è più veloce, ma conta anche la regolarità. Gli FPS medi non mostrano picchi o scatti.',
        methodologyOverview: 'Conversione esatta basata sulla relazione inversa tra FPS e millisecondi per fotogramma.',
        steps: ['Dividi 1.000 per gli FPS attuali.', 'Ripeti per gli FPS obiettivo.', 'Calcola la differenza.'],
        limitations: ['Gli FPS medi non mostrano la variabilità.', 'Frame pacing e latenza sono misure separate.'],
      },
      {
        title: 'Calculateur de temps d\'image', shortDescription: 'Convertissez les FPS en millisecondes et comparez deux objectifs.',
        description: 'Affichez le budget de temps de chaque image pour mieux comprendre les écarts de performances.',
        resultGuide: 'Un temps inférieur est plus rapide, mais la régularité compte. Les FPS moyens masquent pics et saccades.',
        methodologyOverview: 'Conversion exacte fondée sur la relation inverse entre FPS et millisecondes par image.',
        steps: ['Diviser 1 000 par les FPS actuels.', 'Répéter pour la cible.', 'Calculer la différence.'],
        limitations: ['La moyenne ne décrit pas la variance.', 'Frame pacing et latence sont des mesures séparées.'],
      },
      {
        title: 'Frame-Time-Rechner', shortDescription: 'FPS in Millisekunden pro Bild umrechnen und zwei Ziele vergleichen.',
        description: 'Zeigt das Zeitbudget je Bild und macht Leistungsunterschiede verständlicher.',
        resultGuide: 'Weniger Zeit ist schneller, doch Gleichmäßigkeit zählt. Durchschnitts-FPS verbergen Spitzen und Ruckler.',
        methodologyOverview: 'Exakte Einheitenumrechnung über den Kehrwert von FPS und Millisekunden pro Bild.',
        steps: ['1.000 durch aktuelle FPS teilen.', 'Für Ziel-FPS wiederholen.', 'Differenz berechnen.'],
        limitations: ['Durchschnitts-FPS zeigen keine Streuung.', 'Frame Pacing und Latenz sind getrennte Messungen.'],
      },
      {
        title: 'Calculadora de tiempo por fotograma', shortDescription: 'Convierte FPS en milisegundos y compara dos objetivos.',
        description: 'Consulta el tiempo disponible para cada fotograma y entiende mejor las diferencias.',
        resultGuide: 'Menos tiempo es más rápido, pero también importa la regularidad. La media oculta picos y tirones.',
        methodologyOverview: 'Conversión exacta basada en la relación inversa entre FPS y milisegundos por fotograma.',
        steps: ['Divide 1.000 entre los FPS actuales.', 'Repite para el objetivo.', 'Calcula la diferencia.'],
        limitations: ['La media no describe la variación.', 'Frame pacing y latencia son medidas distintas.'],
      },

      {
        title: "Калькулятор времени кадра", shortDescription: "Преобразуйте FPS в миллисекунды на кадр и сравните две цели.",
        description: "Посмотрите бюджет времени для каждого визуализированного кадра. Время кадра облегчает понимание различий в производительности, чем использование только FPS.",
        resultGuide: "Меньшее время кадра быстрее, но последовательность также имеет значение. Средний FPS не может выявить скачков, заиканий или плохих минимумов в 1%.",
        methodologyOverview: "Это точное преобразование единиц измерения с использованием обратного соотношения между количеством кадров в секунду и миллисекундами на кадр.",
        steps: ["Разделите 1000 на текущий FPS.", "Повторите действия для цели FPS.", "Вычтите целевое время кадра из текущего времени кадра."],
        limitations: ["Среднее значение FPS не описывает отклонение времени кадра.", "Частота кадров, задержка ввода и задержка отображения — это отдельные измерения."],
      },
    ),
  },
  'fps-refresh-rate-calculator': {
    slug: 'fps-refresh-rate-calculator', category: 'performance', formula: 'Display use (%) = min(FPS / refresh rate, 1) x 100',
    related: ['frame-time-calculator', 'fps-calculator', 'game-settings-optimizer'],
    content: localized(
      {
        title: 'FPS and Refresh Rate Matcher', shortDescription: 'Compare expected FPS with monitor refresh rate and frame budget.',
        description: 'Check whether a monitor can display every distinct frame your system produces and whether the PC can feed every refresh cycle.',
        resultGuide: 'FPS above refresh rate can still reduce input latency, but the display cannot show more complete refreshes per second than its rated frequency. Adaptive sync changes pacing, not the basic ratio.',
        methodologyOverview: 'The tool compares FPS and hertz directly, calculates utilization of the refresh ceiling, and converts both values to frame-time budgets.',
        steps: ['Divide FPS by refresh rate for display utilization.', 'Find excess FPS or unused refresh headroom.', 'Compare render and refresh intervals in milliseconds.'],
        limitations: ['Actual refresh behavior depends on adaptive sync, V-Sync and frame caps.', 'Response time, scanout, latency and frame pacing are not predicted.'],
      },
      {
        title: 'Abbinamento FPS e frequenza', shortDescription: 'Confronta FPS previsti e frequenza del monitor.',
        description: 'Verifica se il monitor può mostrare ogni fotogramma distinto e se il PC alimenta ogni ciclo di refresh.',
        resultGuide: 'FPS oltre la frequenza possono ridurre la latenza, ma il display non mostra più refresh completi del valore nominale.',
        methodologyOverview: 'Confronta direttamente FPS e hertz, calcola l\'uso della frequenza e converte entrambi in tempi per fotogramma.',
        steps: ['Dividi FPS per hertz.', 'Trova FPS in eccesso o margine inutilizzato.', 'Confronta gli intervalli in ms.'],
        limitations: ['Adaptive sync, V-Sync e limiter cambiano il comportamento.', 'Tempo di risposta e latenza non sono previsti.'],
      },
      {
        title: 'Comparateur FPS et fréquence', shortDescription: 'Comparez les FPS prévus à la fréquence du moniteur.',
        description: 'Vérifiez si l\'écran peut afficher chaque image distincte et si le PC alimente chaque cycle.',
        resultGuide: 'Des FPS supérieurs peuvent réduire la latence, mais l\'écran ne montre pas plus de rafraîchissements complets que sa fréquence.',
        methodologyOverview: 'Compare directement FPS et hertz, calcule l\'utilisation et convertit les deux en temps d\'image.',
        steps: ['Diviser FPS par hertz.', 'Trouver excès de FPS ou marge inutilisée.', 'Comparer les intervalles en ms.'],
        limitations: ['Adaptive Sync, V-Sync et limiteurs changent le comportement.', 'Temps de réponse et latence ne sont pas prédits.'],
      },
      {
        title: 'FPS- und Bildraten-Abgleich', shortDescription: 'Erwartete FPS mit der Monitorfrequenz vergleichen.',
        description: 'Prüfe, ob der Monitor jedes unterschiedliche Bild darstellen und der PC jeden Aktualisierungszyklus bedienen kann.',
        resultGuide: 'FPS oberhalb der Frequenz können Latenz senken, der Monitor zeigt aber nicht mehr vollständige Aktualisierungen als seine Nennrate.',
        methodologyOverview: 'Vergleicht FPS und Hertz, berechnet die Nutzung und wandelt beide in Bildzeit um.',
        steps: ['FPS durch Hertz teilen.', 'Überschuss oder ungenutzte Reserve bestimmen.', 'Intervalle in ms vergleichen.'],
        limitations: ['Adaptive Sync, V-Sync und Limits verändern das Verhalten.', 'Reaktionszeit und Latenz werden nicht vorhergesagt.'],
      },
      {
        title: 'Comparador de FPS y frecuencia', shortDescription: 'Compara FPS esperados con la frecuencia del monitor.',
        description: 'Comprueba si la pantalla muestra cada fotograma distinto y si el PC alimenta cada ciclo.',
        resultGuide: 'Más FPS pueden reducir latencia, pero la pantalla no muestra más refrescos completos que su frecuencia nominal.',
        methodologyOverview: 'Compara FPS y hercios, calcula el uso y convierte ambos en tiempos por fotograma.',
        steps: ['Divide FPS entre hercios.', 'Calcula exceso o margen sin usar.', 'Compara intervalos en ms.'],
        limitations: ['Adaptive Sync, V-Sync y límites cambian el comportamiento.', 'Respuesta y latencia no se predicen.'],
      },

      {
        title: "FPS и средство сопоставления частоты обновления", shortDescription: "Сравните ожидаемый FPS с частотой обновления монитора и бюджетом кадров.",
        description: "Проверьте, может ли монитор отображать каждый отдельный кадр, создаваемый вашей системой, и может ли ПК обрабатывать каждый цикл обновления.",
        resultGuide: "Частота обновления FPS выше может снизить задержку ввода, но дисплей не может отображать больше полных обновлений в секунду, чем его номинальная частота. Адаптивная синхронизация меняет темп, а не базовое соотношение.",
        methodologyOverview: "Инструмент напрямую сравнивает FPS и герц, рассчитывает использование потолка обновления и преобразует оба значения в бюджеты времени кадра.",
        steps: ["Разделите FPS на частоту обновления для определения использования дисплея.", "Найдите лишний FPS или неиспользованный запас обновления.", "Сравните интервалы рендеринга и обновления в миллисекундах."],
        limitations: ["Фактическое поведение обновления зависит от адаптивной синхронизации, вертикальной синхронизации и ограничения кадров.", "Время отклика, сканирование, задержка и частота кадров не прогнозируются."],
      },
    ),
  },
  'resolution-scaling-calculator': {
    slug: 'resolution-scaling-calculator', category: 'performance', formula: 'Rendered pixels = width x height x (scale / 100)^2',
    related: ['fps-refresh-rate-calculator', 'vram-calculator', 'game-settings-optimizer'],
    content: localized(
      {
        title: 'Resolution Scaling Calculator', shortDescription: 'Compare rendered pixel count and relative workload across resolutions.',
        description: 'Calculate the internal rendered resolution for a scaling percentage and compare its pixel workload with another display mode.',
        resultGuide: 'Pixel ratio is not an FPS multiplier. Geometry shows the change in shaded pixels, while CPU limits, memory bandwidth, upscaler cost and game behavior affect the real frame-rate change.',
        methodologyOverview: 'Both dimensions are multiplied by the scale fraction. Their product gives rendered pixels; the result is compared with native and target pixel counts.',
        steps: ['Multiply width and height by the scale fraction.', 'Calculate rendered and target pixel totals.', 'Report percentage workload differences.'],
        limitations: ['Dynamic resolution and non-uniform upscalers can use different internal sizes.', 'Pixel count alone does not model CPU work, ray tracing or memory bandwidth.'],
      },
      {
        title: 'Calcolatore scaling risoluzione', shortDescription: 'Confronta pixel renderizzati e carico relativo tra risoluzioni.',
        description: 'Calcola la risoluzione interna a una percentuale di scala e confrontala con un\'altra modalità.',
        resultGuide: 'Il rapporto dei pixel non è un moltiplicatore FPS: CPU, banda e gioco modificano il risultato reale.',
        methodologyOverview: 'Moltiplica entrambe le dimensioni per la scala, calcola i pixel e li confronta con risoluzione nativa e obiettivo.',
        steps: ['Scala larghezza e altezza.', 'Calcola i pixel totali.', 'Mostra le differenze percentuali.'],
        limitations: ['Risoluzione dinamica e upscaler possono usare dimensioni diverse.', 'I pixel non modellano CPU, ray tracing o banda.'],
      },
      {
        title: 'Calculateur de mise à l\'échelle', shortDescription: 'Comparez pixels rendus et charge relative entre résolutions.',
        description: 'Calculez la résolution interne à un pourcentage donné et comparez-la à un autre mode.',
        resultGuide: 'Le rapport de pixels n\'est pas un multiplicateur de FPS : CPU, bande passante et jeu modifient le résultat.',
        methodologyOverview: 'Multiplie les deux dimensions par l\'échelle, calcule les pixels et compare aux modes natif et cible.',
        steps: ['Mettre largeur et hauteur à l\'échelle.', 'Calculer les pixels.', 'Afficher les différences en pourcentage.'],
        limitations: ['Résolution dynamique et upscalers peuvent utiliser d\'autres tailles.', 'Les pixels ne modélisent ni CPU, ni ray tracing, ni bande passante.'],
      },
      {
        title: 'Auflösungsskalierungs-Rechner', shortDescription: 'Gerenderte Pixel und relative Last verschiedener Auflösungen vergleichen.',
        description: 'Berechne die interne Auflösung eines Skalierungswerts und vergleiche sie mit einem anderen Modus.',
        resultGuide: 'Das Pixelverhältnis ist kein FPS-Multiplikator; CPU, Bandbreite und Spielverhalten verändern reale Werte.',
        methodologyOverview: 'Beide Dimensionen werden skaliert, die Pixelzahl berechnet und mit nativer sowie Zielauflösung verglichen.',
        steps: ['Breite und Höhe skalieren.', 'Pixelzahlen berechnen.', 'Prozentuale Unterschiede ausgeben.'],
        limitations: ['Dynamische Auflösung und Upscaler nutzen teils andere Größen.', 'Pixelzahl modelliert weder CPU noch Raytracing oder Bandbreite.'],
      },
      {
        title: 'Calculadora de escalado de resolución', shortDescription: 'Compara píxeles renderizados y carga relativa entre resoluciones.',
        description: 'Calcula la resolución interna a un porcentaje de escala y compárala con otro modo.',
        resultGuide: 'La relación de píxeles no multiplica directamente los FPS; CPU, ancho de banda y juego cambian el resultado.',
        methodologyOverview: 'Escala ambas dimensiones, calcula los píxeles y compara con resolución nativa y objetivo.',
        steps: ['Escala ancho y alto.', 'Calcula los píxeles.', 'Muestra diferencias porcentuales.'],
        limitations: ['Resolución dinámica y escaladores pueden usar otros tamaños.', 'Los píxeles no modelan CPU, ray tracing ni ancho de banda.'],
      },

      {
        title: "Калькулятор масштабирования разрешения", shortDescription: "Сравните количество отображаемых пикселей и относительную рабочую нагрузку для разных разрешений.",
        description: "Рассчитайте внутреннее разрешение рендеринга для процентного масштабирования и сравните рабочую нагрузку пикселей с другим режимом отображения.",
        resultGuide: "Соотношение пикселей не является множителем FPS. Геометрия показывает изменение затененных пикселей, а на реальное изменение частоты кадров влияют ограничения CPU, пропускная способность памяти, стоимость апскейлера и поведение игры.",
        methodologyOverview: "Оба размера умножаются на долю масштаба. Их продукт дает визуализированные пиксели; результат сравнивается с собственным и целевым количеством пикселей.",
        steps: ["Умножьте ширину и высоту на долю масштаба.", "Рассчитайте общее количество визуализированных и целевых пикселей.", "Сообщайте о процентных различиях в рабочей нагрузке."],
        limitations: ["Средства динамического разрешения и неоднородного масштабирования могут использовать разные внутренние размеры.", "Количество пикселей само по себе не моделирует работу CPU, трассировку лучей или пропускную способность памяти."],
      },
    ),
  },
  'game-settings-optimizer': {
    slug: 'game-settings-optimizer', category: 'performance', formula: 'Preset estimate = site FPS model x resolution factor x preset factor',
    related: ['fps-calculator', 'vram-calculator', 'fps-refresh-rate-calculator'],
    content: localized(
      {
        title: 'Game Settings Optimizer', shortDescription: 'Find a planning preset for selected hardware, game and target FPS.',
        description: 'Select a CPU, GPU, RAM capacity, game, resolution and target FPS to compare competitive, low, medium, high and ultra planning scenarios.',
        resultGuide: 'Start with the suggested preset, then measure in the actual game. Lower shadows, ray tracing and volumetrics first when GPU-limited; reduce simulation or crowd settings when CPU-limited.',
        methodologyOverview: 'The tool starts with the site\'s broad CPU/GPU/game FPS model, applies transparent preset multipliers and a modest RAM-pressure penalty, then selects the highest-quality preset meeting the target.',
        steps: ['Estimate a baseline from CPU, GPU, game demand and resolution.', 'Apply preset and RAM-pressure modifiers.', 'Choose the highest-quality preset at or above target FPS.'],
        limitations: ['The output is not a game benchmark or a per-setting test.', 'Patches, drivers, scene complexity, upscaling and ray tracing can materially change FPS.'],
      },
      {
        title: 'Ottimizzatore impostazioni di gioco', shortDescription: 'Trova un preset indicativo per hardware, gioco e FPS obiettivo.',
        description: 'Seleziona CPU, GPU, RAM, gioco, risoluzione e obiettivo per confrontare preset competitivo, basso, medio, alto e ultra.',
        resultGuide: 'Parti dal preset suggerito e misura nel gioco. Riduci prima ombre, ray tracing e volumetrici se il limite è GPU.',
        methodologyOverview: 'Usa il modello FPS generale del sito, applica moltiplicatori per preset e pressione RAM e sceglie la qualità più alta che raggiunge l\'obiettivo.',
        steps: ['Stima la base da hardware e gioco.', 'Applica preset e RAM.', 'Scegli il preset che raggiunge gli FPS.'],
        limitations: ['Non è un benchmark specifico del gioco.', 'Patch, driver, scene e upscaling cambiano gli FPS.'],
      },
      {
        title: 'Optimiseur de réglages de jeu', shortDescription: 'Trouvez un préréglage indicatif pour matériel, jeu et FPS cibles.',
        description: 'Sélectionnez CPU, GPU, RAM, jeu, résolution et cible pour comparer compétitif, faible, moyen, élevé et ultra.',
        resultGuide: 'Commencez avec le réglage conseillé puis mesurez en jeu. Réduisez d\'abord ombres, ray tracing et effets volumétriques si le GPU limite.',
        methodologyOverview: 'Utilise le modèle FPS général du site, applique des coefficients de réglage et de RAM puis choisit la meilleure qualité atteignant la cible.',
        steps: ['Estimer la base matériel-jeu.', 'Appliquer réglage et RAM.', 'Choisir le préréglage atteignant la cible.'],
        limitations: ['Ce n\'est pas un benchmark propre au jeu.', 'Correctifs, pilotes, scènes et upscaling changent les FPS.'],
      },
      {
        title: 'Spiel-Einstellungsoptimierer', shortDescription: 'Planungs-Preset für Hardware, Spiel und Ziel-FPS finden.',
        description: 'CPU, GPU, RAM, Spiel, Auflösung und Ziel auswählen und Competitive bis Ultra vergleichen.',
        resultGuide: 'Mit dem Vorschlag beginnen und im Spiel messen. Bei GPU-Limit zuerst Schatten, Raytracing und Volumetrie senken.',
        methodologyOverview: 'Nutzt das grobe FPS-Modell der Website, wendet Preset- und RAM-Faktoren an und wählt die höchste Qualität über dem Ziel.',
        steps: ['Basis aus Hardware und Spiel schätzen.', 'Preset- und RAM-Faktoren anwenden.', 'Passendes Preset wählen.'],
        limitations: ['Kein spielspezifischer Benchmark.', 'Patches, Treiber, Szenen und Upscaling verändern FPS.'],
      },
      {
        title: 'Optimizador de ajustes de juego', shortDescription: 'Encuentra un preset orientativo para hardware, juego y FPS objetivo.',
        description: 'Selecciona CPU, GPU, RAM, juego, resolución y objetivo para comparar competitivo, bajo, medio, alto y ultra.',
        resultGuide: 'Empieza con el ajuste sugerido y mide en el juego. Si limita la GPU, reduce primero sombras, ray tracing y volumétricos.',
        methodologyOverview: 'Usa el modelo FPS general del sitio, aplica factores de preset y RAM y elige la mayor calidad que alcance el objetivo.',
        steps: ['Estima la base de hardware y juego.', 'Aplica preset y RAM.', 'Elige el ajuste que alcance el objetivo.'],
        limitations: ['No es un benchmark específico del juego.', 'Parches, controladores, escenas y escalado cambian los FPS.'],
      },

      {
        title: "Оптимизатор настроек игры", shortDescription: "Найдите предустановку планирования для выбранного оборудования, игры и цели FPS.",
        description: "Выберите CPU, GPU, RAM емкость, игру, разрешение и целевое значение FPS, чтобы сравнить сценарии конкурентного, низкого, среднего, высокого и сверхвысокого планирования.",
        resultGuide: "Начните с предложенной настройки, затем измерьте ее в реальной игре. Уменьшите тени, трассировку лучей и объемность в первую очередь, если GPU-ограничено; уменьшите настройки симуляции или толпы, если CPU-ограничено.",
        methodologyOverview: "Инструмент начинается с широкой модели сайта CPU/GPU/game FPS, применяет прозрачные предустановленные множители и скромный штраф давления RAM, а затем выбирает предустановку высочайшего качества, соответствующую цели.",
        steps: ["Оцените базовый уровень по CPU, GPU, требованиям игры и разрешению.", "Примените предустановку и модификаторы давления RAM.", "Выберите предустановку высочайшего качества, соответствующую целевому значению FPS или превышающему его."],
        limitations: ["Результат не является игровым тестом или тестом для каждой настройки.", "Патчи, драйверы, сложность сцены, масштабирование и трассировка лучей могут существенно изменить FPS."],
      },
    ),
  },
  'ssd-upgrade-calculator': {
    slug: 'ssd-upgrade-calculator', category: 'storage', formula: 'Usable capacity = drive capacity x 0.90 - system reserve - existing library',
    related: ['pc-upgrade-priority-calculator', 'gaming-ram-calculator', 'psu-calculator'],
    content: localized(
      {
        title: 'Storage Upgrade Advisor', shortDescription: 'Compare HDD, SATA SSD and NVMe SSD options for games and daily use.',
        description: 'Compare your current and proposed storage types, capacity and library size to plan responsiveness, free space and approximate game capacity.',
        resultGuide: 'Moving from HDD to any SSD usually provides the largest responsiveness change. NVMe improves sequential transfers, but many game load-time differences versus SATA SSD are smaller than headline bandwidth suggests.',
        methodologyOverview: 'The advisor uses broad relative responsiveness tiers, reserves 10% of nominal capacity plus the entered system allowance, and divides remaining space by average game size.',
        steps: ['Compare broad storage responsiveness tiers.', 'Reserve formatting, system and free-space allowances.', 'Calculate remaining space and approximate additional game capacity.'],
        limitations: ['Load times depend on game engine, CPU, compression and random-I/O behavior.', 'Manufacturer capacity is decimal and real formatted capacity appears lower in many operating systems.'],
      },
      {
        title: 'Consulente upgrade SSD', shortDescription: 'Confronta HDD, SSD SATA e NVMe per giochi e uso quotidiano.',
        description: 'Confronta tipo attuale e nuovo, capacità e libreria per pianificare reattività e spazio.',
        resultGuide: 'Da HDD a SSD si nota il salto maggiore. NVMe aumenta i trasferimenti, ma nei giochi il vantaggio su SATA può essere inferiore ai dati di targa.',
        methodologyOverview: 'Usa livelli relativi di reattività, riserva il 10% più lo spazio di sistema e divide il resto per la dimensione media dei giochi.',
        steps: ['Confronta i livelli di storage.', 'Riserva spazio libero e di sistema.', 'Calcola capacità restante e giochi aggiuntivi.'],
        limitations: ['I caricamenti dipendono da gioco, CPU e compressione.', 'La capacità formattata appare inferiore a quella nominale.'],
      },
      {
        title: 'Conseiller de mise à niveau SSD', shortDescription: 'Comparez HDD, SSD SATA et NVMe pour jeux et usage quotidien.',
        description: 'Comparez support actuel et futur, capacité et bibliothèque pour planifier réactivité et espace.',
        resultGuide: 'Le passage du HDD au SSD apporte généralement le plus grand changement. En jeu, NVMe peut moins devancer SATA que ne le suggère le débit maximal.',
        methodologyOverview: 'Utilise des niveaux relatifs, réserve 10 % plus l\'espace système et divise le reste par la taille moyenne des jeux.',
        steps: ['Comparer les niveaux de stockage.', 'Réserver espace libre et système.', 'Calculer capacité restante et jeux supplémentaires.'],
        limitations: ['Les chargements dépendent du jeu, du CPU et de la compression.', 'La capacité formatée paraît inférieure à la valeur nominale.'],
      },
      {
        title: 'SSD-Upgrade-Berater', shortDescription: 'HDD, SATA-SSD und NVMe für Spiele und Alltag vergleichen.',
        description: 'Vergleiche aktuellen und geplanten Typ, Kapazität und Bibliothek für Reaktion und freien Platz.',
        resultGuide: 'Von HDD zu SSD ist der größte Sprung. NVMe steigert Transfers, doch Spiele laden gegenüber SATA oft weniger stark schneller als Spitzenwerte vermuten lassen.',
        methodologyOverview: 'Nutzt grobe Reaktionsstufen, reserviert 10 % plus Systemplatz und teilt den Rest durch die mittlere Spielgröße.',
        steps: ['Speicherstufen vergleichen.', 'Freien und Systemplatz reservieren.', 'Restplatz und zusätzliche Spiele berechnen.'],
        limitations: ['Ladezeiten hängen von Spiel, CPU und Kompression ab.', 'Formatierte Kapazität wirkt kleiner als die Nennangabe.'],
      },
      {
        title: 'Asesor de actualización SSD', shortDescription: 'Compara HDD, SSD SATA y NVMe para juegos y uso diario.',
        description: 'Compara tipo actual y futuro, capacidad y biblioteca para planificar respuesta y espacio.',
        resultGuide: 'Pasar de HDD a SSD suele ser el mayor salto. NVMe mejora transferencias, pero en juegos la diferencia frente a SATA puede ser menor que el ancho de banda anunciado.',
        methodologyOverview: 'Usa niveles relativos, reserva 10 % más el espacio del sistema y divide el resto entre el tamaño medio de los juegos.',
        steps: ['Compara niveles de almacenamiento.', 'Reserva espacio libre y del sistema.', 'Calcula espacio y juegos adicionales.'],
        limitations: ['Las cargas dependen del juego, CPU y compresión.', 'La capacidad formateada parece menor que la nominal.'],
      },

      {
        title: "Советник по обновлению хранилища", shortDescription: "Сравните варианты HDD, SATA SSD и NVMe SSD для игр и повседневного использования.",
        description: "Сравните текущие и предлагаемые типы хранилища, емкость и размер библиотеки, чтобы спланировать скорость реагирования, свободное пространство и приблизительную емкость игры.",
        resultGuide: "Перемещение с жесткого диска на любой SSD обычно обеспечивает наибольшее изменение скорости реагирования. NVMe улучшает последовательную передачу, но многие различия во времени загрузки игр по сравнению с SATA SSD меньше, чем предполагает заголовок заголовка.",
        methodologyOverview: "Советник использует широкие уровни относительной отзывчивости, резервирует 10 % номинальной мощности плюс введенный системный лимит и делит оставшееся пространство на средний размер игры.",
        steps: ["Сравните широкие уровни реагирования хранилища.", "Резервное форматирование, системное и свободное пространство.", "Рассчитайте оставшееся пространство и приблизительную дополнительную вместимость игры."],
        limitations: ["Время загрузки зависит от игрового движка, CPU, сжатия и поведения случайного ввода-вывода.", "Емкость производителя указана в десятичном виде, а реальная форматированная емкость во многих операционных системах оказывается ниже."],
      },
    ),
  },
  'pc-upgrade-priority-calculator': {
    slug: 'pc-upgrade-priority-calculator', category: 'upgrade', formula: 'Priority score = weighted shortfall against use-case targets for CPU, GPU, RAM and storage',
    related: ['gpu-upgrade-calculator', 'cpu-upgrade-calculator', 'ssd-upgrade-calculator'],
    content: localized(
      {
        title: 'PC Upgrade Priority Calculator', shortDescription: 'Rank CPU, GPU, RAM and storage upgrade priorities for your use case.',
        description: 'Analyze selected CPU, GPU, RAM, storage, resolution and use case to identify the weakest planning area and avoid upgrading a component that is not holding the system back.',
        resultGuide: 'Investigate the highest-ranked component first; do not purchase from the score alone. Confirm utilization, temperatures, memory pressure and storage behavior in your real workload.',
        methodologyOverview: 'Each component receives a transparent shortfall score against use-case targets. CPU and GPU weights change by workload and resolution; RAM and storage use capacity/type thresholds. The largest weighted shortfall ranks first.',
        steps: ['Set CPU and GPU target scores for the selected use case and resolution.', 'Calculate weighted hardware, RAM and storage shortfalls.', 'Rank components and explain the leading priority.'],
        limitations: ['The model cannot observe utilization, temperatures, motherboard compatibility or budget.', 'Some workloads depend on a specific feature, codec, instruction set or storage pattern not represented by broad scores.'],
      },
      {
        title: 'Calcolatore priorità upgrade PC', shortDescription: 'Ordina CPU, GPU, RAM e storage per il tuo utilizzo.',
        description: 'Analizza componenti, memoria, storage, risoluzione e uso per individuare l\'area più debole.',
        resultGuide: 'Verifica prima il componente in cima, ma non acquistare solo dal punteggio. Controlla uso, temperature e pressione della memoria.',
        methodologyOverview: 'Ogni componente riceve uno scarto rispetto a obiettivi per uso e risoluzione, poi gli scarti pesati vengono ordinati.',
        steps: ['Definisce gli obiettivi per l\'uso.', 'Calcola gli scarti pesati.', 'Ordina i componenti e spiega il primo.'],
        limitations: ['Non osserva utilizzo, temperature, compatibilità o budget.', 'Funzioni specifiche di software e hardware non sono rappresentate.'],
      },
      {
        title: 'Calculateur de priorité de mise à niveau', shortDescription: 'Classez CPU, GPU, RAM et stockage selon votre usage.',
        description: 'Analysez composants, mémoire, stockage, résolution et usage pour identifier la zone la plus faible.',
        resultGuide: 'Examinez d\'abord le composant classé premier, mais n\'achetez pas sur ce seul score. Vérifiez charge, températures et pression mémoire.',
        methodologyOverview: 'Chaque composant reçoit un écart par rapport à des cibles d\'usage et de résolution, puis les écarts pondérés sont classés.',
        steps: ['Définir les cibles de l\'usage.', 'Calculer les écarts pondérés.', 'Classer et expliquer la priorité.'],
        limitations: ['N\'observe ni charge, ni températures, ni compatibilité, ni budget.', 'Des fonctions logicielles spécifiques peuvent manquer.'],
      },
      {
        title: 'PC-Upgrade-Prioritätsrechner', shortDescription: 'CPU, GPU, RAM und Speicher nach Nutzung priorisieren.',
        description: 'Analysiere Komponenten, Speicher, Auflösung und Nutzung, um den schwächsten Planungsbereich zu finden.',
        resultGuide: 'Zuerst die höchste Priorität untersuchen, aber nicht allein nach dem Wert kaufen. Auslastung, Temperatur und Speicherdruck prüfen.',
        methodologyOverview: 'Komponenten erhalten Abstände zu Nutzungs- und Auflösungszielen; gewichtete Abstände werden anschließend sortiert.',
        steps: ['Ziele für die Nutzung festlegen.', 'Gewichtete Abstände berechnen.', 'Komponenten sortieren und Spitze erklären.'],
        limitations: ['Beobachtet weder Auslastung, Temperaturen, Kompatibilität noch Budget.', 'Spezielle Softwarefunktionen können fehlen.'],
      },
      {
        title: 'Calculadora de prioridad de actualización', shortDescription: 'Ordena CPU, GPU, RAM y almacenamiento según tu uso.',
        description: 'Analiza componentes, memoria, almacenamiento, resolución y uso para encontrar el área más débil.',
        resultGuide: 'Investiga primero el componente mejor clasificado, pero no compres solo por la puntuación. Comprueba uso, temperaturas y presión de memoria.',
        methodologyOverview: 'Cada componente recibe una carencia respecto a objetivos de uso y resolución; después se ordenan las carencias ponderadas.',
        steps: ['Define objetivos para el uso.', 'Calcula carencias ponderadas.', 'Ordena y explica la prioridad.'],
        limitations: ['No observa uso, temperaturas, compatibilidad ni presupuesto.', 'Pueden faltar funciones específicas de software.'],
      },

      {
        title: "Калькулятор приоритета обновления ПК", shortDescription: "Ранжируйте CPU, GPU, RAM и приоритеты обновления хранилища для вашего варианта использования.",
        description: "Проанализируйте выбранные CPU, GPU, RAM, хранилище, разрешение и вариант использования, чтобы определить самую слабую область планирования и избежать обновления компонента, который не сдерживает работу системы.",
        resultGuide: "Сначала исследуйте компонент с самым высоким рейтингом; не покупайте, основываясь только на счете. Проверьте использование, температуру, нехватку памяти и поведение хранилища при реальной рабочей нагрузке.",
        methodologyOverview: "Каждый компонент получает прозрачную оценку несоответствия целевым показателям варианта использования. Веса CPU и GPU меняются в зависимости от рабочей нагрузки и разрешения; RAM и пороговые значения емкости/типа использования хранилища. На первом месте находится наибольший взвешенный дефицит.",
        steps: ["Установите целевые показатели CPU и GPU для выбранного варианта использования и решения.", "Рассчитайте взвешенное оборудование, RAM и нехватку памяти.", "Ранжируйте компоненты и объясните ведущий приоритет."],
        limitations: ["Модель не может учитывать использование, температуру, совместимость материнской платы или бюджет.", "Некоторые рабочие нагрузки зависят от конкретной функции, кодека, набора команд или шаблона хранения, не представленного широкими оценками."],
      },
    ),
  },
};

export function isToolSlug(value: string): value is ToolSlug {
  return TOOL_SLUGS.includes(value as ToolSlug);
}

export function getTool(slug: string): ToolDefinition | undefined {
  return isToolSlug(slug) ? TOOLS[slug] : undefined;
}

export function getToolContent(slug: ToolSlug, locale: Locale): ToolContent {
  return TOOLS[slug].content[locale] ?? TOOLS[slug].content.en;
}

export function getToolPath(locale: Locale, slug: ToolSlug): string {
  return getLocalizedPath(locale, `tools/${slug}`);
}
