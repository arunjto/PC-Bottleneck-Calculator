import type { Locale } from '@/i18n-config';

export type ComponentComparisonCopy = {
  configureTitle: string;
  configureDescription: string;
  cpuTab: string;
  gpuTab: string;
  firstCpu: string;
  secondCpu: string;
  firstGpu: string;
  secondGpu: string;
  selectCpu: string;
  selectGpu: string;
  searchCpu: string;
  searchGpu: string;
  noCpuResults: string;
  noGpuResults: string;
  openCpuInstructions: string;
  openGpuInstructions: string;
  cpuListLabel: string;
  gpuListLabel: string;
  swap: string;
  copyLink: string;
  copied: string;
  copyError: string;
  resultsTitle: string;
  baseline: string;
  comparison: string;
  normalizedScore: string;
  coresThreads: string;
  baseBoostClock: string;
  listedPower: string;
  socket: string;
  architecture: string;
  releaseYear: string;
  tier: string;
  vram: string;
  officialSpecs: string;
  relativeChanges: string;
  scoreDifference: string;
  powerDifference: string;
  efficiencyDifference: string;
  coreDifference: string;
  threadDifference: string;
  vramDifference: string;
  categoryLeaders: string;
  metric: string;
  leader: string;
  higherScore: string;
  powerEfficiency: string;
  lowerPower: string;
  moreCores: string;
  moreThreads: string;
  moreVram: string;
  tie: string;
  scoreHigher: string;
  scoreLower: string;
  scoreSame: string;
  socketSame: string;
  socketDifferent: string;
  socketUnknown: string;
  modelNotice: string;
  dataSnapshot: string;
  methodologyVersion: string;
  emptyState: string;
};

export const COMPONENT_COMPARISON_COPY: Record<Locale, ComponentComparisonCopy> = {
  en: {
    configureTitle: 'Choose two components',
    configureDescription: 'Select a component class and compare two models from the same class. The first model is the baseline.',
    cpuTab: 'Compare CPUs', gpuTab: 'Compare GPUs', firstCpu: 'Baseline CPU', secondCpu: 'Comparison CPU',
    firstGpu: 'Baseline GPU', secondGpu: 'Comparison GPU', selectCpu: 'Select a CPU', selectGpu: 'Select a GPU',
    searchCpu: 'Search CPUs by name, tier or specification', searchGpu: 'Search GPUs by name, tier or specification',
    noCpuResults: 'No CPU matches {query}', noGpuResults: 'No GPU matches {query}',
    openCpuInstructions: 'Open the CPU list. Use search or arrow keys to choose a processor.',
    openGpuInstructions: 'Open the GPU list. Use search or arrow keys to choose a graphics card.',
    cpuListLabel: 'Available processors', gpuListLabel: 'Available graphics cards',
    swap: 'Swap components', copyLink: 'Copy comparison link', copied: 'Link copied',
    copyError: 'The link could not be copied. Copy the URL from the address bar instead.',
    resultsTitle: 'Side-by-side comparison', baseline: 'Baseline', comparison: 'Comparison',
    normalizedScore: 'Normalized planning score', coresThreads: 'Cores / threads', baseBoostClock: 'Base / boost clock',
    listedPower: 'Listed power', socket: 'Socket', architecture: 'Architecture', releaseYear: 'Release year', tier: 'Tier',
    vram: 'Graphics memory', officialSpecs: 'Official specifications', relativeChanges: 'Relative changes from the baseline',
    scoreDifference: 'Score difference', powerDifference: 'Power difference', efficiencyDifference: 'Score-per-watt index',
    coreDifference: 'Core difference', threadDifference: 'Thread difference', vramDifference: 'VRAM difference',
    categoryLeaders: 'Category leaders', metric: 'Metric', leader: 'Leader', higherScore: 'Higher normalized score',
    powerEfficiency: 'Higher score-per-watt index', lowerPower: 'Lower listed power', moreCores: 'More CPU cores',
    moreThreads: 'More CPU threads', moreVram: 'More graphics memory', tie: 'Tie',
    scoreHigher: '{component} has a {value}% higher normalized planning score than {baseline}.',
    scoreLower: '{component} has a {value}% lower normalized planning score than {baseline}.',
    scoreSame: 'Both components have the same normalized planning score.',
    socketSame: 'Both processors list the {socket} socket. Confirm the exact motherboard chipset and BIOS support before buying.',
    socketDifferent: 'The listed CPU sockets differ. A motherboard or platform change may be required.',
    socketUnknown: 'Socket information is incomplete. Verify both processors against the motherboard support list.',
    modelNotice: 'Scores are editorial planning indexes, not measured benchmark percentages. Do not compare CPU scores directly with GPU scores.',
    dataSnapshot: 'Hardware data snapshot', methodologyVersion: 'Score methodology version',
    emptyState: 'Choose two different components to view the comparison.',
  },
  it: {
    configureTitle: 'Scegli due componenti',
    configureDescription: 'Seleziona una categoria e confronta due modelli della stessa classe. Il primo modello è il riferimento.',
    cpuTab: 'Confronta CPU', gpuTab: 'Confronta GPU', firstCpu: 'CPU di riferimento', secondCpu: 'CPU da confrontare',
    firstGpu: 'GPU di riferimento', secondGpu: 'GPU da confrontare', selectCpu: 'Seleziona una CPU', selectGpu: 'Seleziona una GPU',
    searchCpu: 'Cerca CPU per nome, fascia o specifica', searchGpu: 'Cerca GPU per nome, fascia o specifica',
    noCpuResults: 'Nessuna CPU corrisponde a {query}', noGpuResults: 'Nessuna GPU corrisponde a {query}',
    openCpuInstructions: 'Apri l’elenco CPU. Usa la ricerca o le frecce per scegliere un processore.',
    openGpuInstructions: 'Apri l’elenco GPU. Usa la ricerca o le frecce per scegliere una scheda video.',
    cpuListLabel: 'Processori disponibili', gpuListLabel: 'Schede video disponibili',
    swap: 'Scambia componenti', copyLink: 'Copia link confronto', copied: 'Link copiato',
    copyError: 'Impossibile copiare il link. Copia invece l’URL dalla barra degli indirizzi.',
    resultsTitle: 'Confronto affiancato', baseline: 'Riferimento', comparison: 'Confronto',
    normalizedScore: 'Punteggio di pianificazione normalizzato', coresThreads: 'Core / thread', baseBoostClock: 'Clock base / boost',
    listedPower: 'Potenza indicata', socket: 'Socket', architecture: 'Architettura', releaseYear: 'Anno di uscita', tier: 'Fascia',
    vram: 'Memoria grafica', officialSpecs: 'Specifiche ufficiali', relativeChanges: 'Variazioni rispetto al riferimento',
    scoreDifference: 'Differenza punteggio', powerDifference: 'Differenza potenza', efficiencyDifference: 'Indice punteggio per watt',
    coreDifference: 'Differenza core', threadDifference: 'Differenza thread', vramDifference: 'Differenza VRAM',
    categoryLeaders: 'Leader per categoria', metric: 'Metrica', leader: 'Leader', higherScore: 'Punteggio normalizzato più alto',
    powerEfficiency: 'Indice punteggio per watt più alto', lowerPower: 'Potenza indicata inferiore', moreCores: 'Più core CPU',
    moreThreads: 'Più thread CPU', moreVram: 'Più memoria grafica', tie: 'Parità',
    scoreHigher: '{component} ha un punteggio di pianificazione normalizzato superiore del {value}% rispetto a {baseline}.',
    scoreLower: '{component} ha un punteggio di pianificazione normalizzato inferiore del {value}% rispetto a {baseline}.',
    scoreSame: 'I due componenti hanno lo stesso punteggio di pianificazione normalizzato.',
    socketSame: 'Entrambi i processori indicano il socket {socket}. Verifica chipset e supporto BIOS esatti prima dell’acquisto.',
    socketDifferent: 'I socket CPU indicati sono diversi. Potrebbe essere necessario cambiare scheda madre o piattaforma.',
    socketUnknown: 'Le informazioni sul socket sono incomplete. Verifica entrambi i processori nella lista di supporto della scheda madre.',
    modelNotice: 'I punteggi sono indici editoriali di pianificazione, non percentuali benchmark misurate. Non confrontare direttamente punteggi CPU e GPU.',
    dataSnapshot: 'Snapshot dati hardware', methodologyVersion: 'Versione metodologia punteggi',
    emptyState: 'Scegli due componenti diversi per vedere il confronto.',
  },
  fr: {
    configureTitle: 'Choisissez deux composants',
    configureDescription: 'Sélectionnez une catégorie et comparez deux modèles de la même classe. Le premier sert de référence.',
    cpuTab: 'Comparer des CPU', gpuTab: 'Comparer des GPU', firstCpu: 'CPU de référence', secondCpu: 'CPU comparé',
    firstGpu: 'GPU de référence', secondGpu: 'GPU comparé', selectCpu: 'Sélectionner un CPU', selectGpu: 'Sélectionner un GPU',
    searchCpu: 'Rechercher un CPU par nom, gamme ou caractéristique', searchGpu: 'Rechercher un GPU par nom, gamme ou caractéristique',
    noCpuResults: 'Aucun CPU ne correspond à {query}', noGpuResults: 'Aucun GPU ne correspond à {query}',
    openCpuInstructions: 'Ouvrez la liste des CPU. Utilisez la recherche ou les flèches pour choisir un processeur.',
    openGpuInstructions: 'Ouvrez la liste des GPU. Utilisez la recherche ou les flèches pour choisir une carte graphique.',
    cpuListLabel: 'Processeurs disponibles', gpuListLabel: 'Cartes graphiques disponibles',
    swap: 'Permuter les composants', copyLink: 'Copier le lien de comparaison', copied: 'Lien copié',
    copyError: 'Impossible de copier le lien. Copiez plutôt l’URL depuis la barre d’adresse.',
    resultsTitle: 'Comparaison côte à côte', baseline: 'Référence', comparison: 'Comparaison',
    normalizedScore: 'Score de planification normalisé', coresThreads: 'Cœurs / threads', baseBoostClock: 'Fréquence base / boost',
    listedPower: 'Puissance indiquée', socket: 'Socket', architecture: 'Architecture', releaseYear: 'Année de sortie', tier: 'Gamme',
    vram: 'Mémoire graphique', officialSpecs: 'Spécifications officielles', relativeChanges: 'Écarts par rapport à la référence',
    scoreDifference: 'Écart de score', powerDifference: 'Écart de puissance', efficiencyDifference: 'Indice score par watt',
    coreDifference: 'Écart de cœurs', threadDifference: 'Écart de threads', vramDifference: 'Écart de VRAM',
    categoryLeaders: 'Leaders par catégorie', metric: 'Mesure', leader: 'Leader', higherScore: 'Score normalisé supérieur',
    powerEfficiency: 'Indice score par watt supérieur', lowerPower: 'Puissance indiquée inférieure', moreCores: 'Plus de cœurs CPU',
    moreThreads: 'Plus de threads CPU', moreVram: 'Plus de mémoire graphique', tie: 'Égalité',
    scoreHigher: '{component} possède un score de planification normalisé supérieur de {value}% à {baseline}.',
    scoreLower: '{component} possède un score de planification normalisé inférieur de {value}% à {baseline}.',
    scoreSame: 'Les deux composants ont le même score de planification normalisé.',
    socketSame: 'Les deux processeurs indiquent le socket {socket}. Vérifiez le chipset exact et la prise en charge BIOS avant l’achat.',
    socketDifferent: 'Les sockets CPU indiqués diffèrent. Un changement de carte mère ou de plateforme peut être nécessaire.',
    socketUnknown: 'Les informations de socket sont incomplètes. Vérifiez les deux processeurs dans la liste de compatibilité de la carte mère.',
    modelNotice: 'Les scores sont des indices éditoriaux de planification, pas des pourcentages de benchmark mesurés. Ne comparez pas directement les scores CPU et GPU.',
    dataSnapshot: 'Instantané des données matérielles', methodologyVersion: 'Version de la méthodologie',
    emptyState: 'Choisissez deux composants différents pour afficher la comparaison.',
  },
  de: {
    configureTitle: 'Zwei Komponenten auswählen',
    configureDescription: 'Wähle eine Komponentenklasse und vergleiche zwei Modelle derselben Klasse. Das erste Modell ist die Referenz.',
    cpuTab: 'CPUs vergleichen', gpuTab: 'GPUs vergleichen', firstCpu: 'Referenz-CPU', secondCpu: 'Vergleichs-CPU',
    firstGpu: 'Referenz-GPU', secondGpu: 'Vergleichs-GPU', selectCpu: 'CPU auswählen', selectGpu: 'GPU auswählen',
    searchCpu: 'CPUs nach Name, Klasse oder Spezifikation suchen', searchGpu: 'GPUs nach Name, Klasse oder Spezifikation suchen',
    noCpuResults: 'Keine CPU passt zu {query}', noGpuResults: 'Keine GPU passt zu {query}',
    openCpuInstructions: 'CPU-Liste öffnen. Suche oder Pfeiltasten verwenden, um einen Prozessor auszuwählen.',
    openGpuInstructions: 'GPU-Liste öffnen. Suche oder Pfeiltasten verwenden, um eine Grafikkarte auszuwählen.',
    cpuListLabel: 'Verfügbare Prozessoren', gpuListLabel: 'Verfügbare Grafikkarten',
    swap: 'Komponenten tauschen', copyLink: 'Vergleichslink kopieren', copied: 'Link kopiert',
    copyError: 'Der Link konnte nicht kopiert werden. Kopiere stattdessen die URL aus der Adressleiste.',
    resultsTitle: 'Direkter Vergleich', baseline: 'Referenz', comparison: 'Vergleich',
    normalizedScore: 'Normalisierter Planungswert', coresThreads: 'Kerne / Threads', baseBoostClock: 'Basis- / Boost-Takt',
    listedPower: 'Angegebene Leistung', socket: 'Sockel', architecture: 'Architektur', releaseYear: 'Erscheinungsjahr', tier: 'Klasse',
    vram: 'Grafikspeicher', officialSpecs: 'Offizielle Spezifikationen', relativeChanges: 'Änderungen gegenüber der Referenz',
    scoreDifference: 'Wertunterschied', powerDifference: 'Leistungsunterschied', efficiencyDifference: 'Wert-pro-Watt-Index',
    coreDifference: 'Kernunterschied', threadDifference: 'Thread-Unterschied', vramDifference: 'VRAM-Unterschied',
    categoryLeaders: 'Kategoriesieger', metric: 'Messgröße', leader: 'Führend', higherScore: 'Höherer normalisierter Wert',
    powerEfficiency: 'Höherer Wert-pro-Watt-Index', lowerPower: 'Niedrigere angegebene Leistung', moreCores: 'Mehr CPU-Kerne',
    moreThreads: 'Mehr CPU-Threads', moreVram: 'Mehr Grafikspeicher', tie: 'Gleichstand',
    scoreHigher: '{component} hat einen um {value}% höheren normalisierten Planungswert als {baseline}.',
    scoreLower: '{component} hat einen um {value}% niedrigeren normalisierten Planungswert als {baseline}.',
    scoreSame: 'Beide Komponenten haben denselben normalisierten Planungswert.',
    socketSame: 'Beide Prozessoren führen den Sockel {socket}. Prüfe vor dem Kauf den genauen Chipsatz und die BIOS-Unterstützung.',
    socketDifferent: 'Die angegebenen CPU-Sockel unterscheiden sich. Ein Mainboard- oder Plattformwechsel kann erforderlich sein.',
    socketUnknown: 'Sockelangaben sind unvollständig. Prüfe beide Prozessoren anhand der Mainboard-Supportliste.',
    modelNotice: 'Die Werte sind redaktionelle Planungsindizes, keine gemessenen Benchmark-Prozente. CPU- und GPU-Werte nicht direkt miteinander vergleichen.',
    dataSnapshot: 'Stand der Hardwaredaten', methodologyVersion: 'Version der Wertemethodik',
    emptyState: 'Wähle zwei unterschiedliche Komponenten für den Vergleich.',
  },
  es: {
    configureTitle: 'Elige dos componentes',
    configureDescription: 'Selecciona una categoría y compara dos modelos de la misma clase. El primer modelo es la referencia.',
    cpuTab: 'Comparar CPU', gpuTab: 'Comparar GPU', firstCpu: 'CPU de referencia', secondCpu: 'CPU comparada',
    firstGpu: 'GPU de referencia', secondGpu: 'GPU comparada', selectCpu: 'Selecciona una CPU', selectGpu: 'Selecciona una GPU',
    searchCpu: 'Buscar CPU por nombre, gama o especificación', searchGpu: 'Buscar GPU por nombre, gama o especificación',
    noCpuResults: 'Ninguna CPU coincide con {query}', noGpuResults: 'Ninguna GPU coincide con {query}',
    openCpuInstructions: 'Abre la lista de CPU. Usa la búsqueda o las flechas para elegir un procesador.',
    openGpuInstructions: 'Abre la lista de GPU. Usa la búsqueda o las flechas para elegir una tarjeta gráfica.',
    cpuListLabel: 'Procesadores disponibles', gpuListLabel: 'Tarjetas gráficas disponibles',
    swap: 'Intercambiar componentes', copyLink: 'Copiar enlace de comparación', copied: 'Enlace copiado',
    copyError: 'No se pudo copiar el enlace. Copia la URL desde la barra de direcciones.',
    resultsTitle: 'Comparación lado a lado', baseline: 'Referencia', comparison: 'Comparación',
    normalizedScore: 'Puntuación de planificación normalizada', coresThreads: 'Núcleos / hilos', baseBoostClock: 'Frecuencia base / boost',
    listedPower: 'Potencia indicada', socket: 'Socket', architecture: 'Arquitectura', releaseYear: 'Año de lanzamiento', tier: 'Gama',
    vram: 'Memoria gráfica', officialSpecs: 'Especificaciones oficiales', relativeChanges: 'Cambios respecto a la referencia',
    scoreDifference: 'Diferencia de puntuación', powerDifference: 'Diferencia de potencia', efficiencyDifference: 'Índice de puntuación por vatio',
    coreDifference: 'Diferencia de núcleos', threadDifference: 'Diferencia de hilos', vramDifference: 'Diferencia de VRAM',
    categoryLeaders: 'Líderes por categoría', metric: 'Métrica', leader: 'Líder', higherScore: 'Mayor puntuación normalizada',
    powerEfficiency: 'Mayor índice de puntuación por vatio', lowerPower: 'Menor potencia indicada', moreCores: 'Más núcleos de CPU',
    moreThreads: 'Más hilos de CPU', moreVram: 'Más memoria gráfica', tie: 'Empate',
    scoreHigher: '{component} tiene una puntuación de planificación normalizada un {value}% superior a {baseline}.',
    scoreLower: '{component} tiene una puntuación de planificación normalizada un {value}% inferior a {baseline}.',
    scoreSame: 'Ambos componentes tienen la misma puntuación de planificación normalizada.',
    socketSame: 'Ambos procesadores indican el socket {socket}. Comprueba el chipset exacto y la compatibilidad de BIOS antes de comprar.',
    socketDifferent: 'Los sockets de CPU indicados son diferentes. Puede ser necesario cambiar la placa base o la plataforma.',
    socketUnknown: 'La información de socket está incompleta. Verifica ambos procesadores en la lista de compatibilidad de la placa base.',
    modelNotice: 'Las puntuaciones son índices editoriales de planificación, no porcentajes de benchmark medidos. No compares directamente puntuaciones CPU y GPU.',
    dataSnapshot: 'Instantánea de datos de hardware', methodologyVersion: 'Versión de metodología',
    emptyState: 'Elige dos componentes diferentes para ver la comparación.',
  },
};
