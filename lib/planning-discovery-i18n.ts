import type { Locale } from '@/i18n-config';

type DiscoveryCopy = {
  eyebrow: string; gamesTitle: string; gamesIntro: string; openGame: string; allGames: string;
  buildsTitle: string; buildsIntro: string; openBuild: string; allBuilds: string;
  buildsHubTitle: string; buildsHubDescription: string; buildsHubIntro: string;
  home: string; nextStepTitle: string; nextStepIntro: string;
};

const COPY: Record<Locale, DiscoveryCopy> = {
  en: {
    eyebrow: 'Plan with a real workload', gamesTitle: 'Check your PC against a specific game',
    gamesIntro: 'Choose a reviewed game guide when the FPS target matters more than a generic score. Each guide separates official requirements from modelled estimates and shows what to verify.',
    openGame: 'Open game check', allGames: 'Browse all game checks', buildsTitle: 'Compare complete CPU and GPU build plans',
    buildsIntro: 'These builds connect component balance with resolution, memory, PSU capacity and compatibility. Use them as planning examples, not fixed shopping lists.',
    openBuild: 'Open build analysis', allBuilds: 'Browse all build analyses', buildsHubTitle: 'PC Build Analyses by CPU, GPU and Resolution',
    buildsHubDescription: 'Compare curated builds for 1080p, 1440p and 4K, including CPU-GPU balance, memory, PSU and compatibility guidance.',
    buildsHubIntro: 'Start with the build closest to your resolution and budget, then test its parts in the calculators.', home: 'PC Bottleneck Calculator',
    nextStepTitle: 'Turn an example into your own plan', nextStepIntro: 'Check component balance, FPS for a specific game and PSU capacity before choosing parts.',
  },
  it: {
    eyebrow: 'Pianifica con un carico reale', gamesTitle: 'Verifica il PC con un gioco specifico', gamesIntro: 'Scegli una guida verificata quando l’obiettivo FPS conta più di un punteggio generico. Requisiti ufficiali e stime modellate restano separati.',
    openGame: 'Apri verifica gioco', allGames: 'Tutte le verifiche dei giochi', buildsTitle: 'Confronta configurazioni CPU e GPU complete', buildsIntro: 'Queste build collegano equilibrio, risoluzione, memoria, PSU e compatibilità. Sono esempi, non liste acquisti fisse.',
    openBuild: 'Apri analisi build', allBuilds: 'Tutte le analisi delle build', buildsHubTitle: 'Analisi build PC per CPU, GPU e risoluzione', buildsHubDescription: 'Confronta build per 1080p, 1440p e 4K con indicazioni su equilibrio, memoria, PSU e compatibilità.',
    buildsHubIntro: 'Parti dalla build più vicina a risoluzione e budget, poi prova i componenti nei calcolatori.', home: 'Calcolatore bottleneck PC', nextStepTitle: 'Adatta l’esempio al tuo piano', nextStepIntro: 'Controlla equilibrio, FPS nel gioco scelto e potenza PSU prima dell’acquisto.',
  },
  fr: {
    eyebrow: 'Planifier avec une charge réelle', gamesTitle: 'Vérifier votre PC pour un jeu précis', gamesIntro: 'Choisissez un guide vérifié lorsque la cible FPS compte plus qu’un score générique. Exigences officielles et estimations restent séparées.',
    openGame: 'Ouvrir la vérification', allGames: 'Toutes les vérifications de jeux', buildsTitle: 'Comparer des configurations CPU et GPU complètes', buildsIntro: 'Ces exemples relient équilibre, résolution, mémoire, alimentation et compatibilité sans imposer une liste d’achat.',
    openBuild: 'Ouvrir l’analyse', allBuilds: 'Toutes les analyses de configurations', buildsHubTitle: 'Analyses de configurations PC par CPU, GPU et résolution', buildsHubDescription: 'Comparez des configurations 1080p, 1440p et 4K avec conseils sur la mémoire, l’alimentation et la compatibilité.',
    buildsHubIntro: 'Commencez par la configuration la plus proche de votre résolution et de votre budget.', home: 'Calculateur de bottleneck PC', nextStepTitle: 'Adapter l’exemple à votre projet', nextStepIntro: 'Vérifiez équilibre, FPS dans un jeu précis et puissance PSU avant achat.',
  },
  de: {
    eyebrow: 'Mit einer echten Last planen', gamesTitle: 'Den PC für ein bestimmtes Spiel prüfen', gamesIntro: 'Wähle einen geprüften Spieleleitfaden, wenn das FPS-Ziel wichtiger als ein allgemeiner Wert ist. Anforderungen und Schätzungen bleiben getrennt.',
    openGame: 'Spielprüfung öffnen', allGames: 'Alle Spieleprüfungen', buildsTitle: 'Vollständige CPU- und GPU-Builds vergleichen', buildsIntro: 'Diese Builds verbinden Balance, Auflösung, RAM, Netzteil und Kompatibilität. Sie sind Beispiele, keine starren Einkaufslisten.',
    openBuild: 'Build-Analyse öffnen', allBuilds: 'Alle Build-Analysen', buildsHubTitle: 'PC-Build-Analysen nach CPU, GPU und Auflösung', buildsHubDescription: 'Vergleiche Builds für 1080p, 1440p und 4K mit Hinweisen zu Balance, RAM, Netzteil und Kompatibilität.',
    buildsHubIntro: 'Beginne mit dem Build, der Auflösung und Budget am nächsten kommt.', home: 'PC-Bottleneck-Rechner', nextStepTitle: 'Das Beispiel an den eigenen Plan anpassen', nextStepIntro: 'Prüfe Komponentenbalance, Spiel-FPS und Netzteilgröße vor dem Kauf.',
  },
  es: {
    eyebrow: 'Planifica con una carga real', gamesTitle: 'Comprueba tu PC con un juego concreto', gamesIntro: 'Elige una guía revisada cuando el objetivo de FPS importe más que una puntuación genérica. Requisitos y estimaciones quedan separados.',
    openGame: 'Abrir comprobación', allGames: 'Todas las comprobaciones de juegos', buildsTitle: 'Compara configuraciones completas de CPU y GPU', buildsIntro: 'Estos equipos conectan equilibrio, resolución, memoria, PSU y compatibilidad. Son ejemplos, no listas de compra fijas.',
    openBuild: 'Abrir análisis', allBuilds: 'Todos los análisis de equipos', buildsHubTitle: 'Análisis de equipos PC por CPU, GPU y resolución', buildsHubDescription: 'Compara equipos para 1080p, 1440p y 4K con orientación sobre memoria, PSU y compatibilidad.',
    buildsHubIntro: 'Empieza por el equipo más cercano a tu resolución y presupuesto.', home: 'Calculadora de cuello de botella', nextStepTitle: 'Adapta el ejemplo a tu plan', nextStepIntro: 'Comprueba equilibrio, FPS en un juego concreto y potencia PSU antes de comprar.',
  },
  ru: {
    eyebrow: 'Планирование реальной нагрузки', gamesTitle: 'Проверьте ПК для конкретной игры', gamesIntro: 'Выберите проверенный гайд, если целевой FPS важнее общего балла. Официальные требования отделены от модельных оценок.',
    openGame: 'Открыть проверку игры', allGames: 'Все проверки игр', buildsTitle: 'Сравните готовые сочетания CPU и GPU', buildsIntro: 'Сборки связывают баланс с разрешением, памятью, блоком питания и совместимостью. Это примеры, а не списки покупок.',
    openBuild: 'Открыть анализ сборки', allBuilds: 'Все анализы сборок', buildsHubTitle: 'Анализ сборок ПК по CPU, GPU и разрешению', buildsHubDescription: 'Сравните сборки для 1080p, 1440p и 4K с рекомендациями по памяти, питанию и совместимости.',
    buildsHubIntro: 'Начните со сборки, близкой к разрешению и бюджету.', home: 'Калькулятор узких мест ПК', nextStepTitle: 'Адаптируйте пример под свой план', nextStepIntro: 'Проверьте баланс, FPS в нужной игре и мощность блока питания до покупки.',
  },
};

export function getPlanningDiscoveryCopy(locale: Locale) {
  return COPY[locale] ?? COPY.en;
}
