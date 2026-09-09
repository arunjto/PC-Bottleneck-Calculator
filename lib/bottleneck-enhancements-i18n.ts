import type { Locale } from '@/i18n-config';

export type BottleneckEnhancementCopy = {
  whyTitle: string;
  whyIntro: string;
  baseScore: string;
  resolutionFactor: string;
  adjustedIndex: string;
  formula: string;
  editorialNotice: string;
  dataVersion: string;
  databaseRank: string;
  officialSpecs: string;
  methodology: string;
  shareTitle: string;
  shareIntro: string;
  copyLink: string;
  copied: string;
  share: string;
  download: string;
  gameTitle: string;
  gameIntro: string;
  chooseGame: string;
  quality: string;
  range: string;
  planningMidpoint: string;
  onePercentLow: string;
  likelyLimit: string;
  memoryCheck: string;
  openFps: string;
  modelNotice: string;
  readinessTitle: string;
  readinessIntro: string;
  memoryChannels: string;
  singleChannel: string;
  dualChannel: string;
  storage: string;
  motherboardSocket: string;
  notSure: string;
  psuCapacity: string;
  cooler: string;
  stockCooler: string;
  towerCooler: string;
  liquidCooler: string;
  check: string;
  statusReady: string;
  statusReview: string;
  ramCapacity: string;
  platform: string;
  power: string;
  cooling: string;
  compareTitle: string;
  compareIntro: string;
  buildA: string;
  buildB: string;
  cpu: string;
  gpu: string;
  ram: string;
  metric: string;
  balanceGap: string;
  cpuIndex: string;
  gpuIndex: string;
  suggestedPsu: string;
  selectedGameFps: string;
  comparisonNotice: string;
};

const en: BottleneckEnhancementCopy = {
  whyTitle: 'Why this result?', whyIntro: 'See every value used in the CPU–GPU balance calculation.',
  baseScore: 'Base planning score', resolutionFactor: 'Resolution factor', adjustedIndex: 'Adjusted planning index',
  formula: 'Relative gap = |adjusted CPU index − adjusted GPU index| ÷ higher adjusted index × 100',
  editorialNotice: 'Base scores are versioned editorial planning indexes, not raw laboratory benchmark results. Official specifications verify the selected products; they do not by themselves produce the score.',
  dataVersion: 'Data and model version', databaseRank: 'Position in maintained database', officialSpecs: 'Official specifications', methodology: 'Read full methodology',
  shareTitle: 'Save or share this result', shareIntro: 'The link restores this exact CPU, GPU, RAM and resolution. Parameter URLs are not added to the sitemap and the homepage remains canonical.',
  copyLink: 'Copy result link', copied: 'Link copied', share: 'Share', download: 'Download result card',
  gameTitle: 'Verify with a game scenario', gameIntro: 'Use the same versioned FPS planning model as the detailed calculator. This is a modelled range, not a measured benchmark.',
  chooseGame: 'Game', quality: 'Graphics quality', range: 'Estimated FPS range', planningMidpoint: 'Planning midpoint', onePercentLow: 'Estimated 1% low', likelyLimit: 'Likely constraint', memoryCheck: 'Memory check', openFps: 'Open detailed FPS estimate', modelNotice: 'Actual performance varies with game version, scene, drivers, thermals, power limits and background software.',
  readinessTitle: 'Advanced system readiness', readinessIntro: 'These checks stay separate from the CPU–GPU balance percentage because compatibility, cooling and storage are different constraints.',
  memoryChannels: 'Memory channels', singleChannel: 'Single channel', dualChannel: 'Dual channel', storage: 'Storage type', motherboardSocket: 'Motherboard socket', notSure: 'Not sure', psuCapacity: 'Installed PSU capacity', cooler: 'CPU cooler class', stockCooler: 'Stock / compact', towerCooler: 'Tower air cooler', liquidCooler: 'Large air / liquid', check: 'Check', statusReady: 'Ready', statusReview: 'Review', ramCapacity: 'RAM capacity', platform: 'Platform compatibility', power: 'Power headroom', cooling: 'Cooling headroom',
  compareTitle: 'Compare this PC with another build', compareIntro: 'Build A is your current result. Configure Build B to compare the same resolution and game scenario side by side.',
  buildA: 'Build A', buildB: 'Build B', cpu: 'CPU', gpu: 'GPU', ram: 'RAM', metric: 'Metric', balanceGap: 'CPU–GPU planning gap', cpuIndex: 'Adjusted CPU index', gpuIndex: 'Adjusted GPU index', suggestedPsu: 'Suggested PSU capacity', selectedGameFps: 'Selected-game FPS range', comparisonNotice: 'This comparison shows model inputs and planning ranges. It does not declare a universal winner or replace compatibility checks and independent benchmarks.',
};

export const BOTTLENECK_ENHANCEMENT_COPY: Record<Locale, BottleneckEnhancementCopy> = {
  en,
  it: {
    whyTitle: 'Perché questo risultato?', whyIntro: 'Visualizza ogni valore usato nel calcolo dell’equilibrio CPU–GPU.',
    baseScore: 'Punteggio base di pianificazione', resolutionFactor: 'Fattore di risoluzione', adjustedIndex: 'Indice di pianificazione corretto',
    formula: 'Divario relativo = |indice CPU corretto − indice GPU corretto| ÷ indice corretto più alto × 100',
    editorialNotice: 'I punteggi base sono indici editoriali versionati, non risultati grezzi di laboratorio. Le specifiche ufficiali verificano i prodotti selezionati, ma non generano da sole il punteggio.',
    dataVersion: 'Versione dati e modello', databaseRank: 'Posizione nel database mantenuto', officialSpecs: 'Specifiche ufficiali', methodology: 'Leggi la metodologia completa',
    shareTitle: 'Salva o condividi il risultato', shareIntro: 'Il link ripristina esattamente CPU, GPU, RAM e risoluzione. Gli URL con parametri non entrano nella sitemap e la homepage resta canonica.',
    copyLink: 'Copia link risultato', copied: 'Link copiato', share: 'Condividi', download: 'Scarica scheda risultato',
    gameTitle: 'Verifica con uno scenario di gioco', gameIntro: 'Usa lo stesso modello FPS versionato del calcolatore dettagliato. È un intervallo modellato, non un benchmark misurato.',
    chooseGame: 'Gioco', quality: 'Qualità grafica', range: 'Intervallo FPS stimato', planningMidpoint: 'Valore centrale di pianificazione', onePercentLow: '1% low stimato', likelyLimit: 'Limite probabile', memoryCheck: 'Controllo memoria', openFps: 'Apri la stima FPS dettagliata', modelNotice: 'Le prestazioni reali cambiano con versione del gioco, scena, driver, temperature, limiti di potenza e software in background.',
    readinessTitle: 'Verifica avanzata del sistema', readinessIntro: 'Questi controlli restano separati dalla percentuale CPU–GPU perché compatibilità, raffreddamento e storage sono vincoli diversi.',
    memoryChannels: 'Canali di memoria', singleChannel: 'Canale singolo', dualChannel: 'Doppio canale', storage: 'Tipo di storage', motherboardSocket: 'Socket scheda madre', notSure: 'Non so', psuCapacity: 'Potenza PSU installata', cooler: 'Classe dissipatore CPU', stockCooler: 'Stock / compatto', towerCooler: 'Dissipatore ad aria a torre', liquidCooler: 'Grande ad aria / liquido', check: 'Controllo', statusReady: 'Pronto', statusReview: 'Da verificare', ramCapacity: 'Capacità RAM', platform: 'Compatibilità piattaforma', power: 'Margine di alimentazione', cooling: 'Margine di raffreddamento',
    compareTitle: 'Confronta questo PC con un’altra build', compareIntro: 'La Build A è il risultato corrente. Configura la Build B per confrontare la stessa risoluzione e lo stesso scenario di gioco.',
    buildA: 'Build A', buildB: 'Build B', cpu: 'CPU', gpu: 'GPU', ram: 'RAM', metric: 'Metrica', balanceGap: 'Divario di pianificazione CPU–GPU', cpuIndex: 'Indice CPU corretto', gpuIndex: 'Indice GPU corretto', suggestedPsu: 'Potenza PSU suggerita', selectedGameFps: 'Intervallo FPS nel gioco selezionato', comparisonNotice: 'Il confronto mostra input del modello e intervalli di pianificazione. Non dichiara un vincitore universale e non sostituisce controlli di compatibilità e benchmark indipendenti.',
  },
  fr: {
    whyTitle: 'Pourquoi ce résultat ?', whyIntro: 'Consultez chaque valeur utilisée pour calculer l’équilibre CPU–GPU.',
    baseScore: 'Score de planification de base', resolutionFactor: 'Facteur de résolution', adjustedIndex: 'Indice de planification ajusté',
    formula: 'Écart relatif = |indice CPU ajusté − indice GPU ajusté| ÷ indice ajusté le plus élevé × 100',
    editorialNotice: 'Les scores de base sont des indices éditoriaux versionnés, pas des résultats bruts de laboratoire. Les spécifications officielles vérifient les produits sélectionnés, mais ne produisent pas seules le score.',
    dataVersion: 'Version des données et du modèle', databaseRank: 'Position dans la base maintenue', officialSpecs: 'Spécifications officielles', methodology: 'Lire la méthodologie complète',
    shareTitle: 'Enregistrer ou partager ce résultat', shareIntro: 'Le lien restaure exactement le CPU, le GPU, la RAM et la résolution. Les URL à paramètres ne figurent pas dans le sitemap et la page d’accueil reste canonique.',
    copyLink: 'Copier le lien du résultat', copied: 'Lien copié', share: 'Partager', download: 'Télécharger la fiche résultat',
    gameTitle: 'Vérifier avec un scénario de jeu', gameIntro: 'Utilise le même modèle FPS versionné que le calculateur détaillé. Il s’agit d’une plage modélisée, pas d’un benchmark mesuré.',
    chooseGame: 'Jeu', quality: 'Qualité graphique', range: 'Plage FPS estimée', planningMidpoint: 'Valeur centrale de planification', onePercentLow: '1 % low estimé', likelyLimit: 'Limite probable', memoryCheck: 'Contrôle mémoire', openFps: 'Ouvrir l’estimation FPS détaillée', modelNotice: 'Les performances réelles varient selon la version du jeu, la scène, les pilotes, les températures, les limites de puissance et les logiciels en arrière-plan.',
    readinessTitle: 'État avancé du système', readinessIntro: 'Ces contrôles restent séparés du pourcentage CPU–GPU, car compatibilité, refroidissement et stockage sont des contraintes différentes.',
    memoryChannels: 'Canaux mémoire', singleChannel: 'Canal unique', dualChannel: 'Double canal', storage: 'Type de stockage', motherboardSocket: 'Socket de la carte mère', notSure: 'Je ne sais pas', psuCapacity: 'Capacité du bloc installé', cooler: 'Classe du refroidisseur CPU', stockCooler: 'D’origine / compact', towerCooler: 'Ventirad tour', liquidCooler: 'Grand ventirad / liquide', check: 'Contrôle', statusReady: 'Prêt', statusReview: 'À vérifier', ramCapacity: 'Capacité RAM', platform: 'Compatibilité de la plateforme', power: 'Marge d’alimentation', cooling: 'Marge de refroidissement',
    compareTitle: 'Comparer ce PC à une autre configuration', compareIntro: 'La configuration A est le résultat actuel. Configurez la B pour comparer la même résolution et le même scénario de jeu.',
    buildA: 'Configuration A', buildB: 'Configuration B', cpu: 'CPU', gpu: 'GPU', ram: 'RAM', metric: 'Mesure', balanceGap: 'Écart de planification CPU–GPU', cpuIndex: 'Indice CPU ajusté', gpuIndex: 'Indice GPU ajusté', suggestedPsu: 'Capacité d’alimentation conseillée', selectedGameFps: 'Plage FPS du jeu choisi', comparisonNotice: 'Cette comparaison montre les entrées du modèle et des plages de planification. Elle ne désigne pas de vainqueur universel et ne remplace ni les contrôles de compatibilité ni les benchmarks indépendants.',
  },
  de: {
    whyTitle: 'Warum dieses Ergebnis?', whyIntro: 'Alle Werte der CPU–GPU-Balanceberechnung anzeigen.',
    baseScore: 'Basis-Planungswert', resolutionFactor: 'Auflösungsfaktor', adjustedIndex: 'Angepasster Planungsindex',
    formula: 'Relativer Abstand = |angepasster CPU-Index − angepasster GPU-Index| ÷ höherer angepasster Index × 100',
    editorialNotice: 'Die Basiswerte sind versionierte redaktionelle Planungsindizes, keine rohen Labor-Benchmarks. Offizielle Spezifikationen bestätigen die gewählten Produkte, erzeugen den Wert aber nicht allein.',
    dataVersion: 'Daten- und Modellversion', databaseRank: 'Position in der gepflegten Datenbank', officialSpecs: 'Offizielle Spezifikationen', methodology: 'Vollständige Methodik lesen',
    shareTitle: 'Ergebnis speichern oder teilen', shareIntro: 'Der Link stellt CPU, GPU, RAM und Auflösung exakt wieder her. Parameter-URLs gelangen nicht in die Sitemap; die Startseite bleibt kanonisch.',
    copyLink: 'Ergebnislink kopieren', copied: 'Link kopiert', share: 'Teilen', download: 'Ergebniskarte herunterladen',
    gameTitle: 'Mit einem Spielszenario prüfen', gameIntro: 'Verwendet dasselbe versionierte FPS-Modell wie der Detailrechner. Es ist ein modellierter Bereich, kein gemessener Benchmark.',
    chooseGame: 'Spiel', quality: 'Grafikqualität', range: 'Geschätzter FPS-Bereich', planningMidpoint: 'Planungsmittelwert', onePercentLow: 'Geschätztes 1%-Low', likelyLimit: 'Wahrscheinliche Grenze', memoryCheck: 'Speicherprüfung', openFps: 'Detaillierte FPS-Schätzung öffnen', modelNotice: 'Die reale Leistung variiert mit Spielversion, Szene, Treibern, Temperaturen, Leistungsgrenzen und Hintergrundsoftware.',
    readinessTitle: 'Erweiterte Systemprüfung', readinessIntro: 'Diese Prüfungen bleiben vom CPU–GPU-Prozentwert getrennt, weil Kompatibilität, Kühlung und Speicher unterschiedliche Grenzen darstellen.',
    memoryChannels: 'Speicherkanäle', singleChannel: 'Single-Channel', dualChannel: 'Dual-Channel', storage: 'Laufwerkstyp', motherboardSocket: 'Mainboard-Sockel', notSure: 'Nicht sicher', psuCapacity: 'Installierte Netzteilleistung', cooler: 'CPU-Kühlerklasse', stockCooler: 'Boxed / kompakt', towerCooler: 'Tower-Luftkühler', liquidCooler: 'Großer Luft- / Flüssigkühler', check: 'Prüfung', statusReady: 'Bereit', statusReview: 'Prüfen', ramCapacity: 'RAM-Kapazität', platform: 'Plattformkompatibilität', power: 'Leistungsreserve', cooling: 'Kühlungsreserve',
    compareTitle: 'Diesen PC mit einem anderen Build vergleichen', compareIntro: 'Build A ist das aktuelle Ergebnis. Konfiguriere Build B für einen Vergleich bei gleicher Auflösung und gleichem Spielszenario.',
    buildA: 'Build A', buildB: 'Build B', cpu: 'CPU', gpu: 'GPU', ram: 'RAM', metric: 'Kennzahl', balanceGap: 'CPU–GPU-Planungsabstand', cpuIndex: 'Angepasster CPU-Index', gpuIndex: 'Angepasster GPU-Index', suggestedPsu: 'Empfohlene Netzteilleistung', selectedGameFps: 'FPS-Bereich im gewählten Spiel', comparisonNotice: 'Der Vergleich zeigt Modelleingaben und Planungsbereiche. Er bestimmt keinen universellen Sieger und ersetzt weder Kompatibilitätsprüfungen noch unabhängige Benchmarks.',
  },
  es: {
    whyTitle: '¿Por qué este resultado?', whyIntro: 'Consulta cada valor usado en el cálculo del equilibrio CPU–GPU.',
    baseScore: 'Puntuación base de planificación', resolutionFactor: 'Factor de resolución', adjustedIndex: 'Índice de planificación ajustado',
    formula: 'Diferencia relativa = |índice CPU ajustado − índice GPU ajustado| ÷ índice ajustado superior × 100',
    editorialNotice: 'Las puntuaciones base son índices editoriales con versión, no resultados brutos de laboratorio. Las especificaciones oficiales verifican los productos elegidos, pero no producen por sí solas la puntuación.',
    dataVersion: 'Versión de datos y modelo', databaseRank: 'Posición en la base mantenida', officialSpecs: 'Especificaciones oficiales', methodology: 'Leer la metodología completa',
    shareTitle: 'Guardar o compartir este resultado', shareIntro: 'El enlace restaura exactamente CPU, GPU, RAM y resolución. Las URL con parámetros no se añaden al sitemap y la página principal sigue siendo la canónica.',
    copyLink: 'Copiar enlace del resultado', copied: 'Enlace copiado', share: 'Compartir', download: 'Descargar tarjeta del resultado',
    gameTitle: 'Verificar con un escenario de juego', gameIntro: 'Usa el mismo modelo FPS con versión que la calculadora detallada. Es un rango modelado, no un benchmark medido.',
    chooseGame: 'Juego', quality: 'Calidad gráfica', range: 'Rango de FPS estimado', planningMidpoint: 'Punto medio de planificación', onePercentLow: '1% bajo estimado', likelyLimit: 'Límite probable', memoryCheck: 'Comprobación de memoria', openFps: 'Abrir estimación FPS detallada', modelNotice: 'El rendimiento real varía según versión del juego, escena, controladores, temperaturas, límites de potencia y software en segundo plano.',
    readinessTitle: 'Comprobación avanzada del sistema', readinessIntro: 'Estas comprobaciones se mantienen separadas del porcentaje CPU–GPU porque compatibilidad, refrigeración y almacenamiento son restricciones diferentes.',
    memoryChannels: 'Canales de memoria', singleChannel: 'Canal único', dualChannel: 'Doble canal', storage: 'Tipo de almacenamiento', motherboardSocket: 'Socket de placa base', notSure: 'No estoy seguro', psuCapacity: 'Capacidad de la fuente instalada', cooler: 'Clase de refrigeración CPU', stockCooler: 'De serie / compacto', towerCooler: 'Disipador de torre', liquidCooler: 'Gran disipador / líquida', check: 'Comprobación', statusReady: 'Listo', statusReview: 'Revisar', ramCapacity: 'Capacidad de RAM', platform: 'Compatibilidad de plataforma', power: 'Margen de alimentación', cooling: 'Margen de refrigeración',
    compareTitle: 'Comparar este PC con otra configuración', compareIntro: 'La configuración A es el resultado actual. Configura la B para comparar la misma resolución y el mismo escenario de juego.',
    buildA: 'Configuración A', buildB: 'Configuración B', cpu: 'CPU', gpu: 'GPU', ram: 'RAM', metric: 'Métrica', balanceGap: 'Diferencia de planificación CPU–GPU', cpuIndex: 'Índice CPU ajustado', gpuIndex: 'Índice GPU ajustado', suggestedPsu: 'Capacidad de fuente sugerida', selectedGameFps: 'Rango FPS del juego elegido', comparisonNotice: 'La comparación muestra entradas del modelo y rangos de planificación. No declara un ganador universal ni sustituye las comprobaciones de compatibilidad y los benchmarks independientes.',
  },
  ru: {
    whyTitle: 'Почему получен такой результат?', whyIntro: 'Посмотрите все значения, использованные при расчёте баланса CPU и GPU.',
    baseScore: 'Базовый плановый балл', resolutionFactor: 'Коэффициент разрешения', adjustedIndex: 'Скорректированный плановый индекс',
    formula: 'Относительный разрыв = |скорректированный индекс CPU − скорректированный индекс GPU| ÷ больший скорректированный индекс × 100',
    editorialNotice: 'Базовые баллы — это версионные редакционные индексы планирования, а не исходные результаты лабораторных тестов. Официальные характеристики подтверждают выбранные модели, но сами по себе не формируют балл.',
    dataVersion: 'Версия данных и модели', databaseRank: 'Позиция в поддерживаемой базе', officialSpecs: 'Официальные характеристики', methodology: 'Читать полную методологию',
    shareTitle: 'Сохранить или поделиться результатом', shareIntro: 'Ссылка восстанавливает выбранные CPU, GPU, RAM и разрешение. URL с параметрами не добавляются в sitemap, а главная страница остаётся канонической.',
    copyLink: 'Копировать ссылку на результат', copied: 'Ссылка скопирована', share: 'Поделиться', download: 'Скачать карточку результата',
    gameTitle: 'Проверить в игровом сценарии', gameIntro: 'Используется та же версионная модель FPS, что и в подробном калькуляторе. Это расчётный диапазон, а не измеренный бенчмарк.',
    chooseGame: 'Игра', quality: 'Качество графики', range: 'Расчётный диапазон FPS', planningMidpoint: 'Расчётная середина', onePercentLow: 'Расчётный 1% low', likelyLimit: 'Вероятное ограничение', memoryCheck: 'Проверка памяти', openFps: 'Открыть подробный расчёт FPS', modelNotice: 'Реальная производительность зависит от версии игры, сцены, драйверов, температур, лимитов мощности и фоновых программ.',
    readinessTitle: 'Расширенная проверка системы', readinessIntro: 'Эти проверки отделены от процента баланса CPU–GPU, поскольку совместимость, охлаждение и накопитель являются разными ограничениями.',
    memoryChannels: 'Каналы памяти', singleChannel: 'Одноканальный режим', dualChannel: 'Двухканальный режим', storage: 'Тип накопителя', motherboardSocket: 'Сокет материнской платы', notSure: 'Не знаю', psuCapacity: 'Мощность установленного БП', cooler: 'Класс охлаждения CPU', stockCooler: 'Штатный / компактный', towerCooler: 'Башенный воздушный', liquidCooler: 'Крупный воздушный / жидкостный', check: 'Проверка', statusReady: 'Готово', statusReview: 'Проверить', ramCapacity: 'Объём RAM', platform: 'Совместимость платформы', power: 'Запас мощности', cooling: 'Запас охлаждения',
    compareTitle: 'Сравнить этот ПК с другой сборкой', compareIntro: 'Сборка A — текущий результат. Настройте сборку B для сравнения при одинаковом разрешении и игровом сценарии.',
    buildA: 'Сборка A', buildB: 'Сборка B', cpu: 'CPU', gpu: 'GPU', ram: 'RAM', metric: 'Показатель', balanceGap: 'Разрыв планового баланса CPU–GPU', cpuIndex: 'Скорректированный индекс CPU', gpuIndex: 'Скорректированный индекс GPU', suggestedPsu: 'Рекомендуемая мощность БП', selectedGameFps: 'Диапазон FPS в выбранной игре', comparisonNotice: 'Сравнение показывает входные данные модели и расчётные диапазоны. Оно не определяет универсального победителя и не заменяет проверку совместимости и независимые бенчмарки.',
  },
};
