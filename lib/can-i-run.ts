import type { Locale } from '@/i18n-config';
import {
  GAME_GUIDE_SLUGS,
  getGameGuideDefinition,
  type GameGuideDefinition,
  type GameGuideSlug,
} from '@/lib/game-guides';

export { GAME_GUIDE_SLUGS, isGameGuideSlug } from '@/lib/game-guides';
export type { GameGuideSlug } from '@/lib/game-guides';

type HubCopy = {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  directoryTitle: string;
  directoryDescription: string;
  searchLabel: string;
  searchPlaceholder: string;
  noResults: string;
  openGuide: string;
  reviewed: string;
  howItWorksTitle: string;
  howItWorks: string[];
  reverseTitle: string;
  reverseDescription: string;
  reverseCta: string;
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
};

export type GameCopy = {
  title: string;
  description: string;
  eyebrow: string;
  reviewed: string;
  quickAnswerTitle: string;
  quickAnswer: string;
  requirementsTitle: string;
  requirementsIntro: string;
  minimum: string;
  recommended: string;
  expectedTarget: string;
  requirementLabels: Record<'target' | 'os' | 'cpu' | 'gpu' | 'vram' | 'ram' | 'storage', string>;
  checkerTitle: string;
  checkerDescription: string;
  checkerCta: string;
  examplesTitle: string;
  examplesIntro: string;
  resolution: string;
  estimatedRange: string;
  onePercentLow: string;
  likelyLimit: string;
  exampleNote: string;
  longTailTitle: string;
  longTailBody: string;
  guidanceTitle: string;
  guidance: Array<{ title: string; body: string }>;
  verifyTitle: string;
  verifyItems: string[];
  sourceLabel: string;
  sourceNote: string;
  noRecommended: string;
  allGames: string;
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
};

type GuideCard = {
  slug: GameGuideSlug;
  name: string;
  summary: string;
  category: string;
};

export const CAN_I_RUN_HUB_COPY: Record<Locale, HubCopy> = {
  en: {
    title: 'Can I Run It? Check PC Game Requirements',
    description: 'Choose a reviewed PC game to compare official system requirements, understand likely hardware limits and open a game-specific FPS estimate.',
    eyebrow: 'Game compatibility guides',
    intro: 'Start with the game you want to play. Each guide separates publisher requirements from PCBuildCheck modelling, then shows what to verify on your own system.',
    directoryTitle: 'Search PC games by name',
    directoryDescription: 'Reviewed titles open a source-backed requirements guide. Other supported titles open a clearly labelled reference FPS model so you can begin with the game, then replace the example hardware with your own.',
    searchLabel: 'Search reviewed games', searchPlaceholder: 'Search by game name…', noResults: 'No reviewed game matches that search.', openGuide: 'Open compatibility guide', reviewed: 'Requirements reviewed',
    howItWorksTitle: 'How to check whether your PC can run a game',
    howItWorks: ['Open the game guide and compare your hardware with the official minimum and recommended requirements.', 'Use the preselected FPS calculator for a resolution- and settings-specific planning range.', 'Verify the estimate with the latest driver, current game patch and a repeatable in-game benchmark.'],
    reverseTitle: 'Already know your PC hardware?', reverseDescription: 'Use the reverse game finder to see which titles may suit one CPU, GPU and RAM combination.', reverseCta: 'Find games for my PC',
    faqTitle: 'Can I Run It FAQs',
    faqs: [
      { q: 'Does meeting minimum requirements guarantee smooth gameplay?', a: 'No. Minimum requirements describe a supported starting point. Patches, drivers, laptop power limits, background software and the chosen settings can change real performance.' },
      { q: 'Is this the same as the “What games can my PC run?” tool?', a: 'No. This directory starts with a particular game. The reverse finder starts with your hardware and compares it across many games.' },
      { q: 'Are the FPS figures measured benchmarks?', a: 'No. PCBuildCheck figures are modelled planning ranges. Official requirements are labelled separately and link to their source.' },
    ],
  },
  it: {
    title: 'Posso eseguirlo? Verifica i requisiti dei giochi PC', description: 'Scegli un gioco PC verificato per confrontare i requisiti ufficiali, capire i possibili limiti hardware e aprire una stima FPS specifica.', eyebrow: 'Guide alla compatibilità dei giochi', intro: 'Parti dal gioco che vuoi usare. Ogni guida separa i requisiti dell’editore dalle stime PCBuildCheck e indica cosa verificare sul tuo sistema.', directoryTitle: 'Giochi PC verificati', directoryDescription: 'Cerca tra le guide disponibili. Aggiungiamo nuovi titoli solo dopo aver controllato requisiti e fonte.', searchLabel: 'Cerca giochi verificati', searchPlaceholder: 'Cerca per nome…', noResults: 'Nessun gioco verificato corrisponde alla ricerca.', openGuide: 'Apri la guida', reviewed: 'Requisiti verificati', howItWorksTitle: 'Come verificare se il PC può eseguire un gioco', howItWorks: ['Confronta il tuo hardware con i requisiti minimi e consigliati ufficiali.', 'Apri il calcolatore FPS precompilato per una stima legata a risoluzione e qualità.', 'Verifica con driver e patch aggiornati usando un benchmark ripetibile.'], reverseTitle: 'Conosci già il tuo hardware?', reverseDescription: 'Usa lo strumento inverso per trovare i giochi adatti a CPU, GPU e RAM.', reverseCta: 'Trova giochi per il mio PC', faqTitle: 'Domande frequenti', faqs: [{ q: 'I requisiti minimi garantiscono un gioco fluido?', a: 'No. Sono un punto di partenza; patch, driver, limiti energetici e impostazioni possono cambiare le prestazioni.' }, { q: 'È uguale allo strumento “quali giochi può eseguire il mio PC”?', a: 'No. Questa sezione parte da un gioco; lo strumento inverso parte dall’hardware.' }, { q: 'Gli FPS sono benchmark misurati?', a: 'No. Sono intervalli modellati. I requisiti ufficiali sono indicati separatamente con la fonte.' }],
  },
  fr: {
    title: 'Puis-je le faire tourner ? Vérifier les jeux PC', description: 'Choisissez un jeu vérifié pour comparer les exigences officielles, comprendre les limites probables et ouvrir une estimation FPS dédiée.', eyebrow: 'Guides de compatibilité', intro: 'Commencez par le jeu visé. Chaque guide distingue les exigences de l’éditeur des estimations PCBuildCheck et explique les vérifications utiles.', directoryTitle: 'Jeux PC vérifiés', directoryDescription: 'Recherchez les guides disponibles. De nouveaux titres sont ajoutés après vérification de la source.', searchLabel: 'Rechercher un jeu vérifié', searchPlaceholder: 'Rechercher par nom…', noResults: 'Aucun jeu vérifié ne correspond.', openGuide: 'Ouvrir le guide', reviewed: 'Exigences vérifiées', howItWorksTitle: 'Comment vérifier si votre PC peut lancer un jeu', howItWorks: ['Comparez votre matériel aux exigences minimales et recommandées officielles.', 'Ouvrez le calculateur FPS prérempli pour une plage liée à la résolution et aux réglages.', 'Validez avec le pilote et le jeu à jour dans un test reproductible.'], reverseTitle: 'Vous connaissez déjà votre matériel ?', reverseDescription: 'Utilisez l’outil inverse pour chercher les jeux adaptés à votre CPU, GPU et RAM.', reverseCta: 'Trouver des jeux pour mon PC', faqTitle: 'Questions fréquentes', faqs: [{ q: 'La configuration minimale garantit-elle un jeu fluide ?', a: 'Non. Elle constitue un point de départ; pilotes, mises à jour, puissance et réglages influencent le résultat.' }, { q: 'Est-ce le même outil que « quels jeux mon PC peut-il faire tourner » ?', a: 'Non. Ce répertoire part d’un jeu; l’outil inverse part du matériel.' }, { q: 'Les FPS sont-ils des benchmarks mesurés ?', a: 'Non. Il s’agit de plages modélisées. Les exigences officielles sont séparées et sourcées.' }],
  },
  de: {
    title: 'Kann ich es spielen? PC-Spielanforderungen prüfen', description: 'Wähle ein geprüftes PC-Spiel, vergleiche offizielle Systemanforderungen und öffne eine spielspezifische FPS-Schätzung.', eyebrow: 'Kompatibilitätsleitfäden', intro: 'Beginne mit dem gewünschten Spiel. Jeder Leitfaden trennt Herstelleranforderungen von PCBuildCheck-Modellen und nennt sinnvolle Praxistests.', directoryTitle: 'Geprüfte PC-Spiele', directoryDescription: 'Durchsuche die verfügbaren Leitfäden. Weitere Titel folgen nach Prüfung von Anforderungen und Quelle.', searchLabel: 'Geprüfte Spiele suchen', searchPlaceholder: 'Nach Spielname suchen…', noResults: 'Kein geprüftes Spiel passt zur Suche.', openGuide: 'Leitfaden öffnen', reviewed: 'Anforderungen geprüft', howItWorksTitle: 'So prüfst du, ob dein PC ein Spiel schafft', howItWorks: ['Vergleiche deine Hardware mit den offiziellen Mindest- und empfohlenen Anforderungen.', 'Nutze den vorausgefüllten FPS-Rechner für eine auflösungsspezifische Planungsspanne.', 'Prüfe das Ergebnis mit aktuellem Treiber und Spiel-Patch in einem wiederholbaren Test.'], reverseTitle: 'Du kennst deine PC-Hardware bereits?', reverseDescription: 'Der umgekehrte Spielfinder vergleicht eine CPU-, GPU- und RAM-Kombination mit vielen Spielen.', reverseCta: 'Spiele für meinen PC finden', faqTitle: 'Häufige Fragen', faqs: [{ q: 'Garantieren Mindestanforderungen flüssiges Spielen?', a: 'Nein. Sie sind ein Startpunkt; Patches, Treiber, Leistungsgrenzen und Einstellungen verändern die Praxisleistung.' }, { q: 'Ist dies dasselbe wie „Welche Spiele schafft mein PC“?', a: 'Nein. Dieses Verzeichnis beginnt beim Spiel, das andere Tool bei der Hardware.' }, { q: 'Sind die FPS gemessene Benchmarks?', a: 'Nein. Es sind modellierte Planungsspannen. Offizielle Anforderungen werden getrennt mit Quelle gezeigt.' }],
  },
  es: {
    title: '¿Puedo ejecutarlo? Comprueba juegos de PC', description: 'Elige un juego revisado para comparar los requisitos oficiales, entender posibles límites y abrir una estimación de FPS específica.', eyebrow: 'Guías de compatibilidad', intro: 'Empieza por el juego que quieres usar. Cada guía separa los requisitos del editor del modelado de PCBuildCheck y explica cómo verificarlo.', directoryTitle: 'Juegos de PC revisados', directoryDescription: 'Busca entre las guías disponibles. Añadimos títulos después de comprobar requisitos y fuente.', searchLabel: 'Buscar juegos revisados', searchPlaceholder: 'Buscar por nombre…', noResults: 'Ningún juego revisado coincide.', openGuide: 'Abrir guía', reviewed: 'Requisitos revisados', howItWorksTitle: 'Cómo saber si tu PC puede ejecutar un juego', howItWorks: ['Compara tu hardware con los requisitos mínimos y recomendados oficiales.', 'Abre la calculadora FPS preconfigurada para un rango según resolución y ajustes.', 'Verifica con controladores y juego actualizados mediante una prueba repetible.'], reverseTitle: '¿Ya conoces tu hardware?', reverseDescription: 'Usa el buscador inverso para ver qué juegos encajan con tu CPU, GPU y RAM.', reverseCta: 'Buscar juegos para mi PC', faqTitle: 'Preguntas frecuentes', faqs: [{ q: '¿Cumplir los requisitos mínimos garantiza fluidez?', a: 'No. Son un punto de partida; parches, controladores, energía y ajustes cambian el rendimiento real.' }, { q: '¿Es igual que “qué juegos puede ejecutar mi PC”?', a: 'No. Este directorio empieza por un juego; la herramienta inversa empieza por el hardware.' }, { q: '¿Los FPS son benchmarks medidos?', a: 'No. Son rangos modelados. Los requisitos oficiales aparecen separados y con su fuente.' }],
  },
  ru: {
    title: 'Потянет ли мой ПК игру? Проверка требований', description: 'Выберите проверенную игру, сравните официальные системные требования и откройте расчёт FPS для конкретной игры.', eyebrow: 'Гайды по совместимости игр', intro: 'Начните с нужной игры. В каждом гайде официальные требования отделены от модели PCBuildCheck, а также указано, что проверить на своём ПК.', directoryTitle: 'Проверенные игры для ПК', directoryDescription: 'Ищите по доступным гайдам. Новые игры добавляются после проверки требований и источника.', searchLabel: 'Поиск проверенных игр', searchPlaceholder: 'Введите название игры…', noResults: 'Проверенная игра не найдена.', openGuide: 'Открыть гайд', reviewed: 'Требования проверены', howItWorksTitle: 'Как проверить, потянет ли ПК игру', howItWorks: ['Сравните комплектующие с официальными минимальными и рекомендуемыми требованиями.', 'Откройте предзаполненный калькулятор FPS для оценки с учётом разрешения и настроек.', 'Проверьте результат на актуальном драйвере и патче в повторяемой игровой сцене.'], reverseTitle: 'Уже знаете комплектующие ПК?', reverseDescription: 'Обратный подбор покажет, какие игры подходят выбранным CPU, GPU и объёму RAM.', reverseCta: 'Найти игры для моего ПК', faqTitle: 'Частые вопросы', faqs: [{ q: 'Минимальные требования гарантируют плавную игру?', a: 'Нет. Это начальная точка; патчи, драйверы, энергопотребление и настройки влияют на реальную производительность.' }, { q: 'Это то же самое, что «какие игры потянет мой ПК»?', a: 'Нет. Этот каталог начинается с игры, а обратный инструмент — с комплектующих.' }, { q: 'Значения FPS получены в тестах?', a: 'Нет. Это модельные диапазоны. Официальные требования показаны отдельно со ссылкой на источник.' }],
  },
};

const EN_GAME: GameCopy = {
  title: 'Can I Run Cyberpunk 2077? PC Requirements & FPS Check',
  description: 'Compare the official Cyberpunk 2077 Update 2.0 PC requirements and review modelled FPS ranges for a Ryzen 5 5600X and RTX 4070 at 1080p, 1440p and 4K.',
  eyebrow: 'Cyberpunk 2077 PC compatibility', reviewed: 'Requirements source reviewed 2026-09-10', quickAnswerTitle: 'Quick answer', quickAnswer: 'Cyberpunk 2077 is demanding on both CPU and GPU. For the current Update 2.0 requirements, 12 GB RAM and an SSD are the minimum starting point. Ray tracing, crowd density and resolution can change the limiting component, so compare the official tier first and then model your exact build.', requirementsTitle: 'Official Cyberpunk 2077 PC requirements', requirementsIntro: 'These values are transcribed from CD Projekt RED’s current Update 2.0 support page. They are publisher targets, not PCBuildCheck estimates.', minimum: 'Minimum', recommended: 'Recommended', expectedTarget: 'Publisher target', requirementLabels: { target: 'Preset / target', os: 'Operating system', cpu: 'Processor', gpu: 'Graphics card', vram: 'VRAM', ram: 'Memory', storage: 'Storage' }, checkerTitle: 'Check your own PC for Cyberpunk 2077', checkerDescription: 'Open the full FPS calculator with Cyberpunk 2077 selected. Add your CPU and GPU, then change resolution, quality, ray tracing, upscaling, RAM and storage.', checkerCta: 'Check my PC now', examplesTitle: 'Ryzen 5 5600X + RTX 4070 planning examples', examplesIntro: 'The same hardware can produce a different constraint at each resolution. These native High estimates use 16 GB RAM, 3200 MT/s memory and NVMe storage.', resolution: 'Resolution', estimatedRange: 'Estimated FPS range', onePercentLow: 'Estimated 1% low', likelyLimit: 'Likely limit', exampleNote: 'These are modelled planning ranges—not measured Cyberpunk 2077 benchmarks. Game patches, scene complexity, thermals, drivers and settings can move the real result.', longTailTitle: 'Will a Ryzen 5 5600X bottleneck an RTX 4070 in Cyberpunk 2077?', longTailBody: 'At 1080p, the CPU can become the practical ceiling sooner, especially in dense city areas and when chasing high refresh rates. At 1440p and 4K, the RTX 4070 normally carries more of the rendering load. That does not make the pairing incompatible: judge it against your resolution, target FPS, ray-tracing choice and measured GPU utilisation rather than a single universal percentage.', guidanceTitle: 'Choose a sensible starting preset', guidance: [{ title: '1080p high refresh', body: 'Start at High, test busy city routes and lower crowd density if frame-time spikes remain CPU-related.' }, { title: '1440p quality', body: 'High settings are a sensible baseline. DLSS Quality can create headroom for heavier effects without changing the CPU ceiling.' }, { title: '4K or ray tracing', body: 'Expect the GPU and VRAM budget to matter most. Use upscaling, test ray tracing separately and watch the 1% lows.' }], verifyTitle: 'Verify before buying an upgrade', verifyItems: ['Use the current game patch and a clean, current graphics driver.', 'Repeat the same route or built-in benchmark with identical settings.', 'Record average FPS, 1% lows, frame time, CPU/GPU utilisation and temperatures.', 'Change one setting at a time; lower crowd density for CPU pressure and ray tracing or resolution for GPU pressure.'], sourceLabel: 'Official requirements source', sourceNote: 'CD Projekt RED notes that the game is CPU- and GPU-intensive, requires DirectX 12 and lists SSD storage for Update 2.0.', noRecommended: 'The publisher does not list a separate official recommended Windows tier. We do not invent one; use the FPS model and measured benchmarks for your target.', allGames: 'Browse all reviewed games', faqTitle: 'Cyberpunk 2077 compatibility FAQs', faqs: [{ q: 'Can Cyberpunk 2077 run with 8 GB RAM?', a: 'The current official minimum is 12 GB RAM. An 8 GB system is below the supported Update 2.0 minimum and may also lose performance to background applications and paging.' }, { q: 'Does Cyberpunk 2077 require an SSD?', a: 'Yes. CD Projekt RED lists 70 GB SSD storage as the minimum for the current Update 2.0 requirements.' }, { q: 'Is Cyberpunk 2077 more CPU- or GPU-intensive?', a: 'It can stress both. Higher resolution and ray tracing usually increase GPU pressure, while dense city scenes, crowd settings and high frame-rate targets can reveal CPU limits.' }, { q: 'Are these FPS numbers guaranteed?', a: 'No. They are planning estimates. Validate them with current independent benchmarks and a repeatable test on your own system.' }],
};

const GAME_OVERRIDES: Partial<Record<Locale, Partial<GameCopy>>> = {
  it: { title: 'Posso eseguire Cyberpunk 2077? Requisiti PC e controllo FPS', description: 'Confronta i requisiti ufficiali di Cyberpunk 2077 Update 2.0 e le stime FPS per Ryzen 5 5600X e RTX 4070.', eyebrow: 'Compatibilità PC di Cyberpunk 2077', reviewed: 'Fonte dei requisiti verificata il 09-09-2026', quickAnswerTitle: 'Risposta rapida', requirementsTitle: 'Requisiti PC ufficiali di Cyberpunk 2077', minimum: 'Minimi', recommended: 'Consigliati', checkerTitle: 'Controlla il tuo PC per Cyberpunk 2077', checkerCta: 'Controlla il mio PC', examplesTitle: 'Esempi Ryzen 5 5600X + RTX 4070', longTailTitle: 'Ryzen 5 5600X limita RTX 4070 in Cyberpunk 2077?', guidanceTitle: 'Scegli un preset iniziale sensato', verifyTitle: 'Verifica prima di acquistare un upgrade', sourceLabel: 'Fonte ufficiale dei requisiti', allGames: 'Vedi tutti i giochi verificati', faqTitle: 'FAQ sulla compatibilità di Cyberpunk 2077' },
  fr: { title: 'Puis-je faire tourner Cyberpunk 2077 ? Exigences PC et FPS', description: 'Comparez les exigences officielles de Cyberpunk 2077 Update 2.0 et les estimations FPS pour Ryzen 5 5600X et RTX 4070.', eyebrow: 'Compatibilité PC de Cyberpunk 2077', reviewed: 'Source des exigences vérifiée le 09-09-2026', quickAnswerTitle: 'Réponse rapide', requirementsTitle: 'Exigences PC officielles de Cyberpunk 2077', minimum: 'Minimum', recommended: 'Recommandée', checkerTitle: 'Vérifier votre PC pour Cyberpunk 2077', checkerCta: 'Vérifier mon PC', examplesTitle: 'Exemples Ryzen 5 5600X + RTX 4070', longTailTitle: 'Le Ryzen 5 5600X limite-t-il la RTX 4070 dans Cyberpunk 2077 ?', guidanceTitle: 'Choisir un réglage de départ raisonnable', verifyTitle: 'Vérifier avant une mise à niveau', sourceLabel: 'Source officielle', allGames: 'Voir tous les jeux vérifiés', faqTitle: 'FAQ de compatibilité Cyberpunk 2077' },
  de: { title: 'Läuft Cyberpunk 2077 auf meinem PC? Anforderungen & FPS', description: 'Vergleiche die offiziellen Cyberpunk-2077-Update-2.0-Anforderungen und FPS-Schätzungen für Ryzen 5 5600X und RTX 4070.', eyebrow: 'Cyberpunk 2077 PC-Kompatibilität', reviewed: 'Anforderungsquelle geprüft am 09.09.2026', quickAnswerTitle: 'Kurzantwort', requirementsTitle: 'Offizielle PC-Anforderungen für Cyberpunk 2077', minimum: 'Minimum', recommended: 'Empfohlen', checkerTitle: 'Eigenen PC für Cyberpunk 2077 prüfen', checkerCta: 'Meinen PC prüfen', examplesTitle: 'Beispiele mit Ryzen 5 5600X + RTX 4070', longTailTitle: 'Bremst ein Ryzen 5 5600X die RTX 4070 in Cyberpunk 2077?', guidanceTitle: 'Sinnvolles Start-Preset wählen', verifyTitle: 'Vor einem Upgrade prüfen', sourceLabel: 'Offizielle Anforderungsquelle', allGames: 'Alle geprüften Spiele', faqTitle: 'Cyberpunk 2077 Kompatibilitäts-FAQ' },
  es: { title: '¿Puedo ejecutar Cyberpunk 2077? Requisitos PC y FPS', description: 'Compara los requisitos oficiales de Cyberpunk 2077 Update 2.0 y estimaciones de FPS para Ryzen 5 5600X y RTX 4070.', eyebrow: 'Compatibilidad de Cyberpunk 2077', reviewed: 'Fuente de requisitos revisada el 09-09-2026', quickAnswerTitle: 'Respuesta rápida', requirementsTitle: 'Requisitos oficiales de Cyberpunk 2077 para PC', minimum: 'Mínimos', recommended: 'Recomendados', checkerTitle: 'Comprueba tu PC para Cyberpunk 2077', checkerCta: 'Comprobar mi PC', examplesTitle: 'Ejemplos con Ryzen 5 5600X + RTX 4070', longTailTitle: '¿Ryzen 5 5600X limita a RTX 4070 en Cyberpunk 2077?', guidanceTitle: 'Elige un ajuste inicial razonable', verifyTitle: 'Verifica antes de comprar una mejora', sourceLabel: 'Fuente oficial', allGames: 'Ver todos los juegos revisados', faqTitle: 'Preguntas sobre compatibilidad de Cyberpunk 2077' },
  ru: { title: 'Потянет ли мой ПК Cyberpunk 2077? Требования и FPS', description: 'Сравните официальные требования Cyberpunk 2077 Update 2.0 и расчёт FPS для Ryzen 5 5600X и RTX 4070.', eyebrow: 'Совместимость Cyberpunk 2077 с ПК', reviewed: 'Источник требований проверен 09.09.2026', quickAnswerTitle: 'Краткий ответ', requirementsTitle: 'Официальные требования Cyberpunk 2077 для ПК', minimum: 'Минимальные', recommended: 'Рекомендуемые', checkerTitle: 'Проверить свой ПК для Cyberpunk 2077', checkerCta: 'Проверить мой ПК', examplesTitle: 'Примеры Ryzen 5 5600X + RTX 4070', longTailTitle: 'Будет ли Ryzen 5 5600X ограничивать RTX 4070 в Cyberpunk 2077?', guidanceTitle: 'Выберите разумные начальные настройки', verifyTitle: 'Проверьте перед покупкой апгрейда', sourceLabel: 'Официальный источник', allGames: 'Все проверенные игры', faqTitle: 'Вопросы о совместимости Cyberpunk 2077' },
};

const GAME_DETAIL_OVERRIDES: Partial<Record<Locale, Partial<GameCopy>>> = {
  it: {
    quickAnswer: 'Cyberpunk 2077 richiede molto sia alla CPU sia alla GPU. Con i requisiti attuali di Update 2.0, 12 GB di RAM e un SSD sono il punto di partenza minimo. Ray tracing, densità della folla e risoluzione possono cambiare il componente limitante: confronta prima il livello ufficiale, poi modella la tua configurazione esatta.',
    requirementsIntro: 'Questi valori sono trascritti dalla pagina di supporto aggiornata di CD Projekt RED per Update 2.0. Sono obiettivi dichiarati dall’editore, non stime di PCBuildCheck.',
    requirementLabels: { target: 'Preset / obiettivo', os: 'Sistema operativo', cpu: 'Processore', gpu: 'Scheda video', vram: 'VRAM', ram: 'Memoria', storage: 'Archiviazione' },
    checkerDescription: 'Apri il calcolatore FPS completo con Cyberpunk 2077 già selezionato. Inserisci CPU e GPU, poi modifica risoluzione, qualità, ray tracing, upscaling, RAM e archiviazione.',
    examplesIntro: 'La stessa configurazione può incontrare un limite diverso a ogni risoluzione. Queste stime native su qualità Alta usano 16 GB di RAM a 3200 MT/s e un SSD NVMe.',
    resolution: 'Risoluzione', estimatedRange: 'Intervallo FPS stimato', onePercentLow: '1% low stimato', likelyLimit: 'Limite probabile',
    exampleNote: 'Sono intervalli di pianificazione modellati, non benchmark misurati in Cyberpunk 2077. Patch, complessità della scena, temperature, driver e impostazioni possono modificare il risultato reale.',
    longTailBody: 'A 1080p la CPU può diventare prima il limite pratico, soprattutto nelle zone affollate e quando si punta a un refresh elevato. A 1440p e 4K la RTX 4070 sostiene normalmente una parte maggiore del carico grafico. La coppia non è per questo incompatibile: valutala rispetto a risoluzione, FPS obiettivo, ray tracing e utilizzo GPU misurato, non con una percentuale universale.',
    guidance: [{ title: '1080p ad alto refresh', body: 'Inizia da Alta, prova percorsi urbani affollati e riduci la densità della folla se gli spike di frame time restano legati alla CPU.' }, { title: 'Qualità a 1440p', body: 'Alta è una base sensata. DLSS Qualità può liberare margine per effetti più pesanti senza cambiare il limite della CPU.' }, { title: '4K o ray tracing', body: 'GPU e VRAM contano di più. Usa l’upscaling, prova il ray tracing separatamente e controlla gli 1% low.' }],
    verifyItems: ['Usa la patch corrente e un driver grafico aggiornato e pulito.', 'Ripeti lo stesso percorso o benchmark con impostazioni identiche.', 'Registra FPS medi, 1% low, frame time, utilizzo CPU/GPU e temperature.', 'Cambia una sola impostazione alla volta: folla per la pressione CPU, ray tracing o risoluzione per quella GPU.'],
    sourceNote: 'CD Projekt RED indica che il gioco è impegnativo per CPU e GPU, richiede DirectX 12 e prevede un SSD con Update 2.0.',
    faqs: [{ q: 'Cyberpunk 2077 può funzionare con 8 GB di RAM?', a: 'Il minimo ufficiale attuale è 12 GB. Un sistema con 8 GB è sotto il requisito supportato di Update 2.0 e può soffrire anche per app in background e paging.' }, { q: 'Cyberpunk 2077 richiede un SSD?', a: 'Sì. CD Projekt RED indica 70 GB su SSD come requisito minimo attuale di Update 2.0.' }, { q: 'Cyberpunk 2077 dipende più dalla CPU o dalla GPU?', a: 'Può stressare entrambe. Risoluzione e ray tracing aumentano in genere il carico GPU; città affollate, folla e FPS elevati possono evidenziare limiti CPU.' }, { q: 'Questi FPS sono garantiti?', a: 'No. Sono stime di pianificazione da verificare con benchmark recenti e una prova ripetibile sul proprio sistema.' }],
  },
  fr: {
    quickAnswer: 'Cyberpunk 2077 sollicite fortement le CPU et le GPU. Pour les exigences actuelles de l’Update 2.0, 12 Go de RAM et un SSD constituent le minimum. Ray tracing, densité de foule et résolution peuvent déplacer la limite : comparez d’abord le palier officiel, puis modélisez votre configuration exacte.',
    requirementsIntro: 'Ces valeurs proviennent de la page d’assistance actuelle de CD Projekt RED pour l’Update 2.0. Ce sont des objectifs de l’éditeur, pas des estimations PCBuildCheck.',
    requirementLabels: { target: 'Préréglage / cible', os: 'Système', cpu: 'Processeur', gpu: 'Carte graphique', vram: 'VRAM', ram: 'Mémoire', storage: 'Stockage' },
    checkerDescription: 'Ouvrez le calculateur FPS complet avec Cyberpunk 2077 présélectionné. Ajoutez votre CPU et GPU, puis réglez résolution, qualité, ray tracing, upscaling, RAM et stockage.',
    examplesIntro: 'Le même matériel peut rencontrer une limite différente selon la résolution. Ces estimations natives en qualité Élevée utilisent 16 Go de RAM à 3200 MT/s et un SSD NVMe.',
    resolution: 'Résolution', estimatedRange: 'Plage FPS estimée', onePercentLow: '1% low estimé', likelyLimit: 'Limite probable',
    exampleNote: 'Ce sont des plages de planification modélisées, pas des benchmarks mesurés. Les mises à jour, la scène, les températures, les pilotes et les réglages influencent le résultat réel.',
    longTailBody: 'En 1080p, le CPU peut devenir plus tôt la limite pratique, surtout dans les zones urbaines denses et à haute fréquence. En 1440p et 4K, la RTX 4070 porte généralement davantage de charge graphique. La configuration reste cohérente : jugez-la selon la résolution, la cible FPS, le ray tracing et l’utilisation GPU mesurée, pas avec un pourcentage universel.',
    guidance: [{ title: '1080p à haute fréquence', body: 'Commencez en Élevé, testez des trajets urbains chargés et réduisez la foule si les pics de frame time restent liés au CPU.' }, { title: 'Qualité en 1440p', body: 'Le réglage Élevé est une bonne base. DLSS Qualité peut libérer de la marge pour les effets lourds sans modifier le plafond CPU.' }, { title: '4K ou ray tracing', body: 'Le GPU et la VRAM deviennent prioritaires. Utilisez l’upscaling, testez le ray tracing séparément et surveillez les 1% lows.' }],
    verifyItems: ['Utilisez la version actuelle du jeu et un pilote graphique propre et récent.', 'Répétez le même trajet ou benchmark avec des réglages identiques.', 'Relevez FPS moyens, 1% lows, frame time, utilisation CPU/GPU et températures.', 'Modifiez un réglage à la fois : foule pour le CPU, ray tracing ou résolution pour le GPU.'],
    sourceNote: 'CD Projekt RED précise que le jeu sollicite CPU et GPU, exige DirectX 12 et requiert un SSD avec l’Update 2.0.',
    faqs: [{ q: 'Cyberpunk 2077 fonctionne-t-il avec 8 Go de RAM ?', a: 'Le minimum officiel actuel est de 12 Go. Un PC avec 8 Go se situe sous le minimum pris en charge pour l’Update 2.0.' }, { q: 'Cyberpunk 2077 exige-t-il un SSD ?', a: 'Oui. CD Projekt RED indique 70 Go sur SSD dans les exigences minimales actuelles.' }, { q: 'Cyberpunk 2077 dépend-il davantage du CPU ou du GPU ?', a: 'Les deux peuvent limiter. Résolution et ray tracing accentuent la charge GPU; foule et haute fréquence peuvent révéler une limite CPU.' }, { q: 'Ces FPS sont-ils garantis ?', a: 'Non. Ce sont des estimations à vérifier avec des benchmarks actuels et un test reproductible.' }],
  },
  de: {
    quickAnswer: 'Cyberpunk 2077 fordert CPU und GPU. Für die aktuellen Update-2.0-Anforderungen sind 12 GB RAM und eine SSD das Minimum. Raytracing, Bevölkerungsdichte und Auflösung können den Engpass verschieben. Vergleiche zuerst die offizielle Stufe und modelliere danach deine genaue Konfiguration.',
    requirementsIntro: 'Die Werte stammen von der aktuellen Support-Seite von CD Projekt RED zu Update 2.0. Es sind Herstellerziele und keine PCBuildCheck-Schätzungen.',
    requirementLabels: { target: 'Preset / Ziel', os: 'Betriebssystem', cpu: 'Prozessor', gpu: 'Grafikkarte', vram: 'VRAM', ram: 'Arbeitsspeicher', storage: 'Speicher' },
    checkerDescription: 'Öffne den vollständigen FPS-Rechner mit vorausgewähltem Cyberpunk 2077. Trage CPU und GPU ein und ändere Auflösung, Qualität, Raytracing, Upscaling, RAM und Speicher.',
    examplesIntro: 'Dieselbe Hardware kann je Auflösung anders begrenzt werden. Diese nativen Hoch-Schätzungen nutzen 16 GB RAM mit 3200 MT/s und eine NVMe-SSD.',
    resolution: 'Auflösung', estimatedRange: 'Geschätzter FPS-Bereich', onePercentLow: 'Geschätztes 1% Low', likelyLimit: 'Wahrscheinliches Limit',
    exampleNote: 'Dies sind modellierte Planungsspannen und keine gemessenen Cyberpunk-2077-Benchmarks. Patches, Szenen, Temperaturen, Treiber und Einstellungen verändern die Praxiswerte.',
    longTailBody: 'Bei 1080p kann die CPU früher zur praktischen Grenze werden, besonders in dichten Stadtgebieten und bei hohen Bildraten. Bei 1440p und 4K übernimmt die RTX 4070 meist mehr Renderlast. Das Paar ist dennoch sinnvoll: Beurteile es anhand von Auflösung, Ziel-FPS, Raytracing und gemessener GPU-Auslastung statt einer universellen Prozentzahl.',
    guidance: [{ title: '1080p mit hoher Bildrate', body: 'Starte mit Hoch, teste belebte Stadtstrecken und senke die Bevölkerungsdichte bei CPU-bedingten Frame-Time-Spitzen.' }, { title: '1440p-Qualität', body: 'Hoch ist eine gute Basis. DLSS Qualität schafft Reserven für stärkere Effekte, ändert aber nicht die CPU-Grenze.' }, { title: '4K oder Raytracing', body: 'GPU und VRAM zählen am meisten. Nutze Upscaling, teste Raytracing getrennt und beobachte die 1% Lows.' }],
    verifyItems: ['Aktuellen Spiel-Patch und einen sauberen, aktuellen Grafiktreiber verwenden.', 'Dieselbe Route oder denselben Benchmark mit gleichen Einstellungen wiederholen.', 'Durchschnitts-FPS, 1% Lows, Frame Time, CPU/GPU-Auslastung und Temperaturen erfassen.', 'Nur eine Einstellung ändern: Bevölkerungsdichte für CPU-Druck, Raytracing oder Auflösung für GPU-Druck.'],
    sourceNote: 'CD Projekt RED nennt das Spiel CPU- und GPU-intensiv, verlangt DirectX 12 und führt für Update 2.0 eine SSD auf.',
    faqs: [{ q: 'Läuft Cyberpunk 2077 mit 8 GB RAM?', a: 'Das aktuelle offizielle Minimum beträgt 12 GB. Ein System mit 8 GB liegt unter der unterstützten Update-2.0-Anforderung.' }, { q: 'Benötigt Cyberpunk 2077 eine SSD?', a: 'Ja. CD Projekt RED nennt aktuell 70 GB SSD-Speicher als Minimum.' }, { q: 'Ist Cyberpunk 2077 CPU- oder GPU-lastiger?', a: 'Beides ist möglich. Auflösung und Raytracing erhöhen den GPU-Druck; dichte Stadtbereiche und hohe Bildraten können CPU-Limits zeigen.' }, { q: 'Sind diese FPS garantiert?', a: 'Nein. Es sind Planungsschätzungen, die mit aktuellen Benchmarks und einem wiederholbaren eigenen Test geprüft werden sollten.' }],
  },
  es: {
    quickAnswer: 'Cyberpunk 2077 exige tanto a la CPU como a la GPU. En los requisitos actuales de Update 2.0, 12 GB de RAM y un SSD son el punto de partida mínimo. Ray tracing, densidad de población y resolución pueden cambiar el componente limitante; compara primero el nivel oficial y después modela tu equipo exacto.',
    requirementsIntro: 'Estos valores proceden de la página de soporte actual de CD Projekt RED para Update 2.0. Son objetivos del editor, no estimaciones de PCBuildCheck.',
    requirementLabels: { target: 'Preajuste / objetivo', os: 'Sistema operativo', cpu: 'Procesador', gpu: 'Tarjeta gráfica', vram: 'VRAM', ram: 'Memoria', storage: 'Almacenamiento' },
    checkerDescription: 'Abre la calculadora FPS completa con Cyberpunk 2077 seleccionado. Añade CPU y GPU y cambia resolución, calidad, ray tracing, reescalado, RAM y almacenamiento.',
    examplesIntro: 'El mismo hardware puede tener un límite distinto según la resolución. Estas estimaciones nativas en calidad Alta usan 16 GB de RAM a 3200 MT/s y SSD NVMe.',
    resolution: 'Resolución', estimatedRange: 'Rango estimado de FPS', onePercentLow: '1% low estimado', likelyLimit: 'Límite probable',
    exampleNote: 'Son rangos de planificación modelados, no benchmarks medidos. Parches, escena, temperaturas, controladores y ajustes pueden modificar el resultado real.',
    longTailBody: 'A 1080p la CPU puede convertirse antes en el límite práctico, sobre todo en zonas urbanas densas y al buscar muchos FPS. A 1440p y 4K la RTX 4070 suele soportar más carga de renderizado. La combinación no es incompatible: evalúala según resolución, FPS objetivo, ray tracing y uso de GPU medido, no con un porcentaje universal.',
    guidance: [{ title: '1080p con alta frecuencia', body: 'Empieza en Alta, prueba rutas urbanas concurridas y baja la densidad de población si los picos de frame time siguen ligados a la CPU.' }, { title: 'Calidad a 1440p', body: 'Alta es una base sensata. DLSS Calidad puede liberar margen para efectos exigentes sin cambiar el techo de CPU.' }, { title: '4K o ray tracing', body: 'GPU y VRAM importan más. Usa reescalado, prueba el ray tracing por separado y vigila los 1% lows.' }],
    verifyItems: ['Usa el parche actual y un controlador gráfico limpio y actualizado.', 'Repite la misma ruta o benchmark con ajustes idénticos.', 'Registra FPS medios, 1% lows, frame time, uso de CPU/GPU y temperaturas.', 'Cambia un ajuste cada vez: población para la CPU, ray tracing o resolución para la GPU.'],
    sourceNote: 'CD Projekt RED indica que el juego exige CPU y GPU, requiere DirectX 12 y enumera un SSD para Update 2.0.',
    faqs: [{ q: '¿Puede funcionar Cyberpunk 2077 con 8 GB de RAM?', a: 'El mínimo oficial actual es 12 GB. Un sistema con 8 GB está por debajo del mínimo compatible de Update 2.0.' }, { q: '¿Cyberpunk 2077 requiere un SSD?', a: 'Sí. CD Projekt RED indica actualmente 70 GB en SSD como requisito mínimo.' }, { q: '¿Cyberpunk 2077 depende más de CPU o GPU?', a: 'Puede exigir ambas. Resolución y ray tracing elevan la carga GPU; ciudades densas y FPS altos pueden revelar límites CPU.' }, { q: '¿Estos FPS están garantizados?', a: 'No. Son estimaciones de planificación que deben verificarse con benchmarks actuales y una prueba repetible.' }],
  },
  ru: {
    quickAnswer: 'Cyberpunk 2077 требователен и к процессору, и к видеокарте. Для актуальных требований Update 2.0 минимальная отправная точка — 12 ГБ RAM и SSD. Трассировка лучей, плотность толпы и разрешение меняют ограничивающий компонент: сначала сравните официальный уровень, затем рассчитайте точную сборку.',
    requirementsIntro: 'Значения перенесены с актуальной страницы поддержки CD Projekt RED для Update 2.0. Это цели издателя, а не расчёты PCBuildCheck.',
    requirementLabels: { target: 'Настройки / цель', os: 'Операционная система', cpu: 'Процессор', gpu: 'Видеокарта', vram: 'Видеопамять', ram: 'Оперативная память', storage: 'Накопитель' },
    checkerDescription: 'Откройте полный калькулятор FPS с выбранной Cyberpunk 2077. Укажите CPU и GPU, затем измените разрешение, качество, трассировку лучей, апскейлинг, RAM и накопитель.',
    examplesIntro: 'Одна сборка может иметь разное ограничение при разных разрешениях. Нативные расчёты на высоких настройках используют 16 ГБ RAM 3200 МТ/с и NVMe SSD.',
    resolution: 'Разрешение', estimatedRange: 'Расчётный диапазон FPS', onePercentLow: 'Расчётный 1% low', likelyLimit: 'Вероятное ограничение',
    exampleNote: 'Это модельные диапазоны, а не измеренные тесты Cyberpunk 2077. Патчи, сцена, температуры, драйверы и настройки меняют реальный результат.',
    longTailBody: 'В 1080p процессор может раньше стать практическим пределом, особенно в плотной городской среде и при высокой частоте кадров. В 1440p и 4K большая часть нагрузки обычно ложится на RTX 4070. Это не делает связку несовместимой: оценивайте её по разрешению, целевому FPS, трассировке лучей и измеренной загрузке GPU, а не по единому проценту.',
    guidance: [{ title: '1080p и высокий FPS', body: 'Начните с высоких настроек, проверьте нагруженный городской маршрут и уменьшите плотность толпы при процессорных скачках времени кадра.' }, { title: 'Качество в 1440p', body: 'Высокие настройки — разумная база. DLSS Quality даёт запас для тяжёлых эффектов, но не меняет предел CPU.' }, { title: '4K или трассировка лучей', body: 'Главными становятся GPU и видеопамять. Используйте апскейлинг, тестируйте RT отдельно и следите за 1% lows.' }],
    verifyItems: ['Используйте актуальный патч игры и чистую свежую версию драйвера.', 'Повторяйте один маршрут или бенчмарк с одинаковыми настройками.', 'Записывайте средний FPS, 1% lows, время кадра, загрузку CPU/GPU и температуры.', 'Меняйте один параметр: плотность толпы для CPU, трассировку или разрешение для GPU.'],
    sourceNote: 'CD Projekt RED отмечает высокую нагрузку на CPU и GPU, требует DirectX 12 и указывает SSD для Update 2.0.',
    faqs: [{ q: 'Запустится ли Cyberpunk 2077 с 8 ГБ RAM?', a: 'Актуальный официальный минимум — 12 ГБ. Система с 8 ГБ находится ниже поддерживаемых требований Update 2.0.' }, { q: 'Нужен ли SSD для Cyberpunk 2077?', a: 'Да. CD Projekt RED указывает 70 ГБ на SSD как актуальное минимальное требование.' }, { q: 'Cyberpunk 2077 больше зависит от CPU или GPU?', a: 'Ограничивать могут оба. Разрешение и RT повышают нагрузку на GPU; городские сцены и высокий FPS могут показать предел CPU.' }, { q: 'Расчёт FPS гарантирован?', a: 'Нет. Это плановая оценка, которую нужно сравнить с актуальными тестами и проверить на своём ПК.' }],
  },
};

const GAME_FOCUS: Record<Exclude<GameGuideSlug, 'cyberpunk-2077'>, string> = {
  'forza-horizon-5': 'Its open world can shift load between the processor and graphics card, while resolution, anti-aliasing and environmental detail raise GPU demand.',
  'apex-legends': 'Competitive frame-rate targets make CPU consistency and 1% lows important, while resolution and visual quality increase GPU load.',
  'counter-strike-2': 'High-refresh competitive play can expose CPU and memory limits well before a basic launch check does.',
  fortnite: 'Performance Mode, DirectX 11/12, Nanite, Lumen and view distance can produce very different hardware loads on the same PC.',
  'elden-ring': 'Its 60 FPS cap changes how results should be read: stable frame pacing matters more than chasing an uncapped average.',
};

function createEnglishGameCopy(guide: GameGuideDefinition): GameCopy {
  const { name, publisher, minimum } = guide;
  return {
    title: `Can I Run ${name}? PC Requirements & FPS Check`,
    description: `Compare the official ${name} PC system requirements with your hardware, then review modelled FPS ranges for a Ryzen 5 5600X and RTX 4070 at 1080p, 1440p and 4K.`,
    eyebrow: `${name} PC compatibility`,
    reviewed: 'Requirements source reviewed 2026-09-10',
    quickAnswerTitle: 'Quick answer',
    quickAnswer: `${name} can run on a PC that meets the official minimum, but meeting that tier does not guarantee your preferred resolution, settings or frame rate. ${GAME_FOCUS[guide.slug as Exclude<GameGuideSlug, 'cyberpunk-2077'>]} Compare the official tiers first, then model and test your exact build.`,
    requirementsTitle: `Official ${name} PC requirements`,
    requirementsIntro: `These values are transcribed from the linked ${publisher} or publisher-controlled listing. They are official requirements, not PCBuildCheck performance estimates.`,
    minimum: 'Minimum', recommended: 'Recommended', expectedTarget: 'Publisher target',
    requirementLabels: EN_GAME.requirementLabels,
    checkerTitle: `Check your own PC for ${name}`,
    checkerDescription: `Open the FPS calculator with ${name} selected. Add your exact CPU and GPU, then choose resolution, quality, RAM, storage and the display target you actually use.`,
    checkerCta: 'Check my PC now',
    examplesTitle: `${name}: Ryzen 5 5600X + RTX 4070 planning examples`,
    examplesIntro: 'The same hardware can meet a different practical limit at each resolution. These native High estimates use 16 GB RAM, 3200 MT/s memory and NVMe storage.',
    resolution: 'Resolution', estimatedRange: 'Estimated FPS range', onePercentLow: 'Estimated 1% low', likelyLimit: 'Likely limit',
    exampleNote: `These are modelled planning ranges—not measured ${name} benchmarks. Patches, scenes, thermals, drivers, modes and settings can change the real result.`,
    longTailTitle: `Will a Ryzen 5 5600X bottleneck an RTX 4070 in ${name}?`,
    longTailBody: `There is no useful universal answer without a resolution, preset and frame-rate target. At 1080p and high refresh rates, the Ryzen 5 5600X can become the practical ceiling sooner. At 1440p and 4K, the RTX 4070 usually carries more rendering load. This does not make the pairing incompatible: compare average FPS, 1% lows, frame time and measured utilisation in a repeatable ${name} scene before replacing hardware.`,
    guidanceTitle: 'Choose a sensible starting preset',
    guidance: [
      { title: '1080p high refresh', body: 'Start at High, test a demanding repeatable scene and reduce CPU-heavy options if frame-time spikes remain processor-related.' },
      { title: '1440p quality', body: 'High is a useful baseline. Adjust upscaling and the heaviest effects separately so you can see what actually changes the limit.' },
      { title: '4K or heavy effects', body: 'Expect the GPU and VRAM budget to matter most. Watch 1% lows and avoid treating a higher average as proof of smooth delivery.' },
    ],
    verifyTitle: 'Verify before buying an upgrade',
    verifyItems: ['Use the current game patch and a clean, current graphics driver.', 'Repeat the same route, replay or built-in benchmark with identical settings.', 'Record average FPS, 1% lows, frame time, CPU/GPU utilisation and temperatures.', 'Change one setting at a time and compare the result before blaming one component.'],
    sourceLabel: 'Official requirements source',
    sourceNote: `${publisher} lists ${minimum.ram} RAM and ${minimum.storage} for the official minimum tier. A requirements match is a starting point; it is not a guaranteed FPS result.`,
    noRecommended: `${publisher} does not publish a separate official recommended Windows tier for ${name}. We do not invent one; use the FPS model and current measured benchmarks for your target.`,
    allGames: 'Browse all reviewed games',
    faqTitle: `${name} compatibility FAQs`,
    faqs: [
      { q: `Can my PC run ${name} if it only meets the minimum requirements?`, a: 'It may launch and run at the official minimum tier, but smoothness depends on resolution, settings, background load, drivers and the current game build. Treat minimum requirements as a supported starting point.' },
      { q: `How much RAM and storage does ${name} need?`, a: `The official minimum lists ${minimum.ram} RAM and ${minimum.storage}. Keep additional free storage for patches and allow memory headroom for Windows and background applications.` },
      { q: `Is ${name} more CPU- or GPU-intensive?`, a: 'Either component can become the practical limit. Lower resolutions and high frame-rate targets tend to reveal CPU limits; higher resolution and heavier visual settings tend to increase GPU and VRAM pressure.' },
      { q: 'Are these FPS estimates guaranteed?', a: 'No. They are modelled planning ranges. Verify them against current independent benchmarks and a repeatable test on your own PC.' },
    ],
  };
}

function createLocalizedGenericCopy(locale: Locale, guide: GameGuideDefinition): GameCopy {
  const base = createEnglishGameCopy(guide);
  if (locale === 'en') return base;
  const shared = { ...EN_GAME, ...(GAME_OVERRIDES[locale] ?? {}), ...(GAME_DETAIL_OVERRIDES[locale] ?? {}) };
  const n = guide.name;
  const p = guide.publisher;
  const ram = guide.minimum.ram;
  const storage = guide.minimum.storage;

  const common = {
    ...base,
    quickAnswerTitle: shared.quickAnswerTitle,
    minimum: shared.minimum,
    recommended: shared.recommended,
    requirementLabels: shared.requirementLabels,
    checkerCta: shared.checkerCta,
    resolution: shared.resolution,
    estimatedRange: shared.estimatedRange,
    onePercentLow: shared.onePercentLow,
    likelyLimit: shared.likelyLimit,
    guidanceTitle: shared.guidanceTitle,
    verifyTitle: shared.verifyTitle,
    sourceLabel: shared.sourceLabel,
    allGames: shared.allGames,
  };

  if (locale === 'it') return {
    ...common,
    title: `Posso eseguire ${n}? Requisiti PC e controllo FPS`, description: `Confronta i requisiti PC ufficiali di ${n} con il tuo hardware e consulta stime FPS modellate a 1080p, 1440p e 4K.`, eyebrow: `Compatibilità PC di ${n}`, reviewed: 'Fonte dei requisiti verificata il 10-09-2026',
    quickAnswer: `${n} può funzionare su un PC che soddisfa il minimo ufficiale, ma ciò non garantisce risoluzione, qualità o FPS desiderati. Confronta prima i livelli ufficiali, poi modella e prova la tua configurazione esatta.`, requirementsTitle: `Requisiti PC ufficiali di ${n}`, requirementsIntro: `Valori trascritti dalla fonte collegata di ${p} o da una pagina controllata dall’editore. Sono requisiti ufficiali, non stime prestazionali di PCBuildCheck.`,
    checkerTitle: `Controlla il tuo PC per ${n}`, checkerDescription: `Apri il calcolatore FPS con ${n} selezionato. Inserisci CPU e GPU, quindi scegli risoluzione, qualità, RAM, archiviazione e obiettivo del display.`, examplesTitle: `${n}: esempi con Ryzen 5 5600X + RTX 4070`, examplesIntro: 'La stessa configurazione può incontrare un limite diverso a ogni risoluzione. Le stime native su Alta usano 16 GB di RAM a 3200 MT/s e SSD NVMe.', exampleNote: `Sono intervalli modellati, non benchmark misurati di ${n}. Patch, scene, temperature, driver, modalità e impostazioni modificano il risultato reale.`,
    longTailTitle: `Ryzen 5 5600X limita RTX 4070 in ${n}?`, longTailBody: `Non esiste una risposta universale senza risoluzione, preset e FPS obiettivo. A 1080p e alto refresh la CPU può diventare prima il limite; a 1440p e 4K aumenta in genere il carico sulla RTX 4070. Verifica FPS medi, 1% low, frame time e utilizzo in una scena ripetibile prima di sostituire hardware.`,
    guidance: [{ title: '1080p ad alto refresh', body: 'Parti da Alta e prova una scena impegnativa e ripetibile; riduci le opzioni CPU-heavy se il frame time resta instabile.' }, { title: 'Qualità a 1440p', body: 'Alta è una base utile. Modifica separatamente upscaling ed effetti pesanti per identificare il limite reale.' }, { title: '4K o effetti pesanti', body: 'GPU e VRAM contano di più. Controlla gli 1% low e non giudicare la fluidità soltanto dagli FPS medi.' }],
    verifyItems: ['Usa la patch corrente e un driver grafico pulito e aggiornato.', 'Ripeti la stessa scena o benchmark con impostazioni identiche.', 'Registra FPS medi, 1% low, frame time, utilizzo CPU/GPU e temperature.', 'Cambia una sola impostazione alla volta e confronta il risultato.'], sourceNote: `${p} indica ${ram} di RAM e ${storage} per il livello minimo ufficiale. È un punto di partenza, non una garanzia di FPS.`, noRecommended: `${p} non pubblica un livello Windows consigliato separato per ${n}. Non ne inventiamo uno: usa il modello FPS e benchmark attuali.`, faqTitle: `FAQ sulla compatibilità di ${n}`,
    faqs: [{ q: `Il mio PC può eseguire ${n} se soddisfa solo i requisiti minimi?`, a: 'Può avviarsi al livello minimo, ma fluidità e stabilità dipendono da risoluzione, impostazioni, driver e versione del gioco.' }, { q: `Quanta RAM e archiviazione richiede ${n}?`, a: `Il minimo ufficiale indica ${ram} di RAM e ${storage}. Mantieni spazio libero aggiuntivo per patch e memoria per Windows.` }, { q: `${n} dipende più dalla CPU o dalla GPU?`, a: 'Possono limitare entrambe: risoluzioni basse e FPS elevati evidenziano più spesso la CPU; risoluzioni ed effetti pesanti aumentano il carico GPU.' }, { q: 'Le stime FPS sono garantite?', a: 'No. Sono intervalli modellati da verificare con benchmark recenti e una prova ripetibile sul proprio PC.' }],
  };

  if (locale === 'fr') return {
    ...common,
    title: `Puis-je faire tourner ${n} ? Exigences PC et FPS`, description: `Comparez les exigences PC officielles de ${n} à votre matériel et consultez des plages FPS modélisées en 1080p, 1440p et 4K.`, eyebrow: `Compatibilité PC de ${n}`, reviewed: 'Source des exigences vérifiée le 10-09-2026',
    quickAnswer: `${n} peut fonctionner sur un PC qui atteint le minimum officiel, sans garantir la résolution, la qualité ou les FPS visés. Comparez les paliers officiels, puis modélisez et testez votre configuration exacte.`, requirementsTitle: `Exigences PC officielles de ${n}`, requirementsIntro: `Valeurs transcrites depuis la source liée de ${p} ou une fiche contrôlée par l’éditeur. Ce sont des exigences officielles, pas des estimations PCBuildCheck.`,
    checkerTitle: `Vérifier votre PC pour ${n}`, checkerDescription: `Ouvrez le calculateur FPS avec ${n} présélectionné. Ajoutez CPU et GPU, puis choisissez résolution, qualité, RAM, stockage et cible d’affichage.`, examplesTitle: `${n} : exemples Ryzen 5 5600X + RTX 4070`, examplesIntro: 'La même configuration peut rencontrer une limite différente selon la résolution. Les estimations natives en Élevé utilisent 16 Go de RAM à 3200 MT/s et un SSD NVMe.', exampleNote: `Ce sont des plages modélisées, pas des benchmarks mesurés de ${n}. Mises à jour, scènes, températures, pilotes, modes et réglages modifient le résultat réel.`,
    longTailTitle: `Le Ryzen 5 5600X limite-t-il la RTX 4070 dans ${n} ?`, longTailBody: `Il n’existe pas de réponse universelle sans résolution, préréglage et cible FPS. En 1080p à haute fréquence, le CPU peut limiter plus tôt; en 1440p et 4K, la RTX 4070 porte généralement plus de charge. Vérifiez FPS moyens, 1% lows, frame time et utilisation dans une scène reproductible avant une mise à niveau.`,
    guidance: [{ title: '1080p à haute fréquence', body: 'Commencez en Élevé et testez une scène exigeante et reproductible; réduisez les options CPU si le frame time reste irrégulier.' }, { title: 'Qualité en 1440p', body: 'Élevé est une base utile. Modifiez séparément l’upscaling et les effets lourds pour trouver la vraie limite.' }, { title: '4K ou effets lourds', body: 'GPU et VRAM comptent davantage. Surveillez les 1% lows et ne jugez pas la fluidité uniquement sur la moyenne.' }],
    verifyItems: ['Utilisez la version actuelle du jeu et un pilote graphique propre et récent.', 'Répétez la même scène ou le même benchmark avec des réglages identiques.', 'Relevez FPS moyens, 1% lows, frame time, utilisation CPU/GPU et températures.', 'Modifiez un seul réglage à la fois et comparez le résultat.'], sourceNote: `${p} indique ${ram} de RAM et ${storage} pour le minimum officiel. C’est un point de départ, pas une garantie de FPS.`, noRecommended: `${p} ne publie pas de palier Windows recommandé distinct pour ${n}. Nous n’en inventons pas : utilisez le modèle FPS et des benchmarks récents.`, faqTitle: `FAQ de compatibilité ${n}`,
    faqs: [{ q: `Mon PC peut-il lancer ${n} s’il atteint seulement le minimum ?`, a: 'Il peut fonctionner au palier minimal, mais la fluidité dépend de la résolution, des réglages, des pilotes et de la version du jeu.' }, { q: `Combien de RAM et de stockage faut-il pour ${n} ?`, a: `Le minimum officiel indique ${ram} de RAM et ${storage}. Prévoyez de la marge pour les mises à jour et Windows.` }, { q: `${n} dépend-il davantage du CPU ou du GPU ?`, a: 'Les deux peuvent limiter : basse résolution et FPS élevés révèlent souvent le CPU; résolution et effets lourds augmentent la charge GPU.' }, { q: 'Les estimations FPS sont-elles garanties ?', a: 'Non. Ce sont des plages modélisées à vérifier avec des benchmarks récents et un test reproductible.' }],
  };

  if (locale === 'de') return {
    ...common,
    title: `Läuft ${n} auf meinem PC? Anforderungen & FPS`, description: `Vergleiche die offiziellen PC-Anforderungen von ${n} mit deiner Hardware und prüfe modellierte FPS-Bereiche für 1080p, 1440p und 4K.`, eyebrow: `${n} PC-Kompatibilität`, reviewed: 'Anforderungsquelle geprüft am 10.09.2026',
    quickAnswer: `${n} kann auf einem PC laufen, der das offizielle Minimum erfüllt. Das garantiert jedoch nicht deine gewünschte Auflösung, Qualität oder Bildrate. Vergleiche die offiziellen Stufen und teste danach die genaue Konfiguration.`, requirementsTitle: `Offizielle PC-Anforderungen für ${n}`, requirementsIntro: `Die Werte stammen aus der verlinkten Quelle von ${p} oder einem herstellerkontrollierten Eintrag. Es sind offizielle Anforderungen, keine PCBuildCheck-Leistungsschätzungen.`,
    checkerTitle: `Eigenen PC für ${n} prüfen`, checkerDescription: `Öffne den FPS-Rechner mit vorausgewähltem ${n}. Trage CPU und GPU ein und wähle Auflösung, Qualität, RAM, Speicher und dein Anzeigeziel.`, examplesTitle: `${n}: Beispiele mit Ryzen 5 5600X + RTX 4070`, examplesIntro: 'Dieselbe Hardware kann je Auflösung anders begrenzt werden. Die nativen Hoch-Schätzungen nutzen 16 GB RAM mit 3200 MT/s und eine NVMe-SSD.', exampleNote: `Dies sind modellierte Bereiche und keine gemessenen ${n}-Benchmarks. Patches, Szenen, Temperaturen, Treiber, Modi und Einstellungen verändern das Ergebnis.`,
    longTailTitle: `Bremst ein Ryzen 5 5600X die RTX 4070 in ${n}?`, longTailBody: `Ohne Auflösung, Preset und Ziel-FPS gibt es keine universelle Antwort. Bei 1080p und hoher Bildrate kann die CPU früher begrenzen; bei 1440p und 4K trägt die RTX 4070 meist mehr Last. Prüfe Durchschnitt, 1% Lows, Frame Time und Auslastung in einer wiederholbaren Szene, bevor du Hardware ersetzt.`,
    guidance: [{ title: '1080p mit hoher Bildrate', body: 'Starte mit Hoch und teste eine anspruchsvolle, wiederholbare Szene. Reduziere CPU-lastige Optionen bei unruhiger Frame Time.' }, { title: '1440p-Qualität', body: 'Hoch ist eine gute Basis. Ändere Upscaling und schwere Effekte getrennt, um das tatsächliche Limit zu erkennen.' }, { title: '4K oder schwere Effekte', body: 'GPU und VRAM werden wichtiger. Beobachte die 1% Lows und bewerte Flüssigkeit nicht nur nach dem Durchschnitt.' }],
    verifyItems: ['Aktuellen Spiel-Patch und einen sauberen, aktuellen Grafiktreiber verwenden.', 'Dieselbe Szene oder denselben Benchmark mit gleichen Einstellungen wiederholen.', 'Durchschnitts-FPS, 1% Lows, Frame Time, CPU/GPU-Auslastung und Temperaturen erfassen.', 'Nur eine Einstellung ändern und das Ergebnis vergleichen.'], sourceNote: `${p} nennt ${ram} RAM und ${storage} für das offizielle Minimum. Das ist ein Startpunkt, keine FPS-Garantie.`, noRecommended: `${p} veröffentlicht für ${n} keine eigene offizielle empfohlene Windows-Stufe. Wir erfinden keine; nutze das FPS-Modell und aktuelle Benchmarks.`, faqTitle: `${n} Kompatibilitäts-FAQ`,
    faqs: [{ q: `Läuft ${n}, wenn mein PC nur das Minimum erfüllt?`, a: 'Es kann auf der Mindeststufe laufen, aber Flüssigkeit hängt von Auflösung, Einstellungen, Treibern und der aktuellen Spielversion ab.' }, { q: `Wie viel RAM und Speicher benötigt ${n}?`, a: `Das offizielle Minimum nennt ${ram} RAM und ${storage}. Plane zusätzlichen Platz für Updates und Reserven für Windows ein.` }, { q: `Ist ${n} eher CPU- oder GPU-lastig?`, a: 'Beides kann begrenzen: niedrige Auflösung und hohe Bildrate zeigen häufiger CPU-Limits; hohe Auflösung und Effekte erhöhen den GPU-Druck.' }, { q: 'Sind die FPS-Schätzungen garantiert?', a: 'Nein. Es sind modellierte Bereiche, die mit aktuellen Benchmarks und einem wiederholbaren eigenen Test geprüft werden sollten.' }],
  };

  if (locale === 'es') return {
    ...common,
    title: `¿Puedo ejecutar ${n}? Requisitos PC y FPS`, description: `Compara los requisitos oficiales de ${n} con tu hardware y consulta rangos de FPS modelados a 1080p, 1440p y 4K.`, eyebrow: `Compatibilidad de ${n} en PC`, reviewed: 'Fuente de requisitos revisada el 10-09-2026',
    quickAnswer: `${n} puede funcionar en un PC que cumpla el mínimo oficial, pero eso no garantiza la resolución, calidad o FPS deseados. Compara primero los niveles oficiales y después modela y prueba tu equipo exacto.`, requirementsTitle: `Requisitos oficiales de ${n} para PC`, requirementsIntro: `Valores transcritos de la fuente enlazada de ${p} o una ficha controlada por el editor. Son requisitos oficiales, no estimaciones de rendimiento de PCBuildCheck.`,
    checkerTitle: `Comprueba tu PC para ${n}`, checkerDescription: `Abre la calculadora FPS con ${n} seleccionado. Añade CPU y GPU y elige resolución, calidad, RAM, almacenamiento y objetivo de pantalla.`, examplesTitle: `${n}: ejemplos con Ryzen 5 5600X + RTX 4070`, examplesIntro: 'El mismo hardware puede tener un límite distinto según la resolución. Las estimaciones nativas en Alta usan 16 GB de RAM a 3200 MT/s y SSD NVMe.', exampleNote: `Son rangos modelados, no benchmarks medidos de ${n}. Parches, escenas, temperaturas, controladores, modos y ajustes cambian el resultado real.`,
    longTailTitle: `¿Ryzen 5 5600X limita a RTX 4070 en ${n}?`, longTailBody: `No existe una respuesta universal sin resolución, preajuste y FPS objetivo. A 1080p y alta frecuencia la CPU puede limitar antes; a 1440p y 4K la RTX 4070 suele asumir más carga. Comprueba FPS medios, 1% lows, frame time y uso en una escena repetible antes de sustituir hardware.`,
    guidance: [{ title: '1080p con alta frecuencia', body: 'Empieza en Alta y prueba una escena exigente y repetible; reduce opciones de CPU si el frame time sigue siendo irregular.' }, { title: 'Calidad a 1440p', body: 'Alta es una base útil. Cambia por separado el reescalado y los efectos exigentes para localizar el límite.' }, { title: '4K o efectos exigentes', body: 'GPU y VRAM importan más. Vigila los 1% lows y no juzgues la fluidez solo por el promedio.' }],
    verifyItems: ['Usa el parche actual y un controlador gráfico limpio y actualizado.', 'Repite la misma escena o benchmark con ajustes idénticos.', 'Registra FPS medios, 1% lows, frame time, uso de CPU/GPU y temperaturas.', 'Cambia un solo ajuste y compara el resultado.'], sourceNote: `${p} indica ${ram} de RAM y ${storage} para el mínimo oficial. Es un punto de partida, no una garantía de FPS.`, noRecommended: `${p} no publica un nivel Windows recomendado separado para ${n}. No inventamos uno: usa el modelo FPS y benchmarks actuales.`, faqTitle: `Preguntas de compatibilidad de ${n}`,
    faqs: [{ q: `¿Puede mi PC ejecutar ${n} si solo cumple el mínimo?`, a: 'Puede funcionar en el nivel mínimo, pero la fluidez depende de resolución, ajustes, controladores y versión actual del juego.' }, { q: `¿Cuánta RAM y almacenamiento necesita ${n}?`, a: `El mínimo oficial indica ${ram} de RAM y ${storage}. Deja margen adicional para parches y Windows.` }, { q: `¿${n} depende más de CPU o GPU?`, a: 'Ambas pueden limitar: baja resolución y FPS altos suelen revelar la CPU; mayor resolución y efectos aumentan la carga GPU.' }, { q: '¿Las estimaciones FPS están garantizadas?', a: 'No. Son rangos modelados que debes verificar con benchmarks recientes y una prueba repetible.' }],
  };

  return {
    ...common,
    title: `Потянет ли мой ПК ${n}? Требования и FPS`, description: `Сравните официальные требования ${n} со своим ПК и изучите модельные диапазоны FPS для 1080p, 1440p и 4K.`, eyebrow: `Совместимость ${n} с ПК`, reviewed: 'Источник требований проверен 10.09.2026',
    quickAnswer: `${n} может работать на ПК, соответствующем официальному минимуму, но это не гарантирует нужные разрешение, качество и FPS. Сначала сравните официальные уровни, затем рассчитайте и проверьте свою сборку.`, requirementsTitle: `Официальные требования ${n} для ПК`, requirementsIntro: `Значения взяты из указанного источника ${p} или контролируемой издателем страницы. Это официальные требования, а не оценка производительности PCBuildCheck.`,
    checkerTitle: `Проверить свой ПК для ${n}`, checkerDescription: `Откройте калькулятор FPS с выбранной ${n}. Укажите CPU и GPU, затем выберите разрешение, качество, RAM, накопитель и цель дисплея.`, examplesTitle: `${n}: примеры Ryzen 5 5600X + RTX 4070`, examplesIntro: 'Одна сборка может иметь разное ограничение при разных разрешениях. Нативные расчёты на высоких настройках используют 16 ГБ RAM 3200 МТ/с и NVMe SSD.', exampleNote: `Это модельные диапазоны, а не измеренные тесты ${n}. Патчи, сцены, температуры, драйверы, режимы и настройки меняют результат.`,
    longTailTitle: `Будет ли Ryzen 5 5600X ограничивать RTX 4070 в ${n}?`, longTailBody: `Без разрешения, пресета и целевого FPS универсального ответа нет. В 1080p и при высокой частоте кадров раньше может ограничить CPU; в 1440p и 4K нагрузка обычно смещается к RTX 4070. Перед апгрейдом сравните средний FPS, 1% lows, время кадра и загрузку в повторяемой сцене.`,
    guidance: [{ title: '1080p и высокий FPS', body: 'Начните с высоких настроек и проверьте тяжёлую повторяемую сцену. Уменьшите CPU-зависимые параметры при скачках времени кадра.' }, { title: 'Качество в 1440p', body: 'Высокие настройки — полезная база. Меняйте апскейлинг и тяжёлые эффекты отдельно, чтобы найти реальное ограничение.' }, { title: '4K или тяжёлые эффекты', body: 'Главными становятся GPU и видеопамять. Следите за 1% lows и не оценивайте плавность только по среднему FPS.' }],
    verifyItems: ['Используйте актуальный патч игры и чистый свежий драйвер.', 'Повторяйте одну сцену или бенчмарк с одинаковыми настройками.', 'Записывайте средний FPS, 1% lows, время кадра, загрузку CPU/GPU и температуры.', 'Меняйте один параметр и сравнивайте результат.'], sourceNote: `${p} указывает ${ram} RAM и ${storage} для официального минимума. Это начальная точка, а не гарантия FPS.`, noRecommended: `${p} не публикует отдельный официальный рекомендуемый уровень Windows для ${n}. Мы его не придумываем: используйте расчёт FPS и актуальные тесты.`, faqTitle: `Вопросы о совместимости ${n}`,
    faqs: [{ q: `Запустится ли ${n}, если ПК соответствует только минимуму?`, a: 'Игра может работать на минимальном уровне, но плавность зависит от разрешения, настроек, драйверов и текущей версии.' }, { q: `Сколько RAM и места нужно для ${n}?`, a: `Официальный минимум указывает ${ram} RAM и ${storage}. Оставьте запас для патчей и работы Windows.` }, { q: `${n} больше зависит от CPU или GPU?`, a: 'Ограничивать могут оба: низкое разрешение и высокий FPS чаще показывают предел CPU; разрешение и тяжёлые эффекты повышают нагрузку GPU.' }, { q: 'Расчёт FPS гарантирован?', a: 'Нет. Это модельные диапазоны, которые нужно проверить по свежим тестам и в повторяемой сцене на своём ПК.' }],
  };
}

export function getCanIRunHubCopy(locale: Locale): HubCopy {
  return CAN_I_RUN_HUB_COPY[locale] ?? CAN_I_RUN_HUB_COPY.en;
}

export function getGameGuideCopy(locale: Locale, slug: GameGuideSlug): GameCopy {
  if (slug === 'cyberpunk-2077') return { ...EN_GAME, ...(GAME_OVERRIDES[locale] ?? {}), ...(GAME_DETAIL_OVERRIDES[locale] ?? {}) };
  return createLocalizedGenericCopy(locale, getGameGuideDefinition(slug));
}

export function getGuideCards(locale: Locale): GuideCard[] {
  return GAME_GUIDE_SLUGS.map((slug) => {
    const guide = getGameGuideDefinition(slug);
    return { slug, name: guide.name, summary: getGameGuideCopy(locale, slug).quickAnswer, category: guide.category };
  });
}
