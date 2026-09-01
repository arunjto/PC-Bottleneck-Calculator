import type { Locale } from '@/i18n-config';
import type { PlanningConstraint } from '@/lib/bottleneck-model';
import type { PopularBuild } from '@/lib/popular-builds';

type BuildLocaleCopy = {
  curated: string;
  sectionTitle: string;
  sectionDescription: string;
  closeMatch: string;
  constraint: (side: string) => string;
  gap: string;
  viewAnalysis: string;
  selectionNote: string;
  reviewed: string;
  back: string;
  analysis: string;
  metaDescription: (cpu: string, gpu: string, resolution: string) => string;
  reviewedLabel: string;
  planningNotice: string;
  resultSummary: string;
  balancedTitle: string;
  balancedBody: string;
  constraintTitle: (side: string) => string;
  constraintBody: (side: string) => string;
  planningGap: string;
  scoreDisclaimer: string;
  loadBuild: string;
  dashboard: string;
  normalizedBalance: string;
  rawScoreNote: string;
  quickPlan: string;
  targetResolution: string;
  memoryPlan: string;
  cpuPlatform: string;
  graphicsMemory: string;
  publishedPower: string;
  psuPlan: string;
  likelyConstraint: string;
  componentOverview: string;
  processor: string;
  graphicsCard: string;
  normalizedScore: string;
  coresThreads: string;
  boostClock: string;
  publishedTdp: string;
  socket: string;
  architecture: string;
  boardPower: string;
  officialDetails: string;
  verifyModel: string;
  resolutionHeading: string;
  resolutionIntro: string;
  pressureGraph: string;
  selected: string;
  graphNote: string;
  resolutionTableHeaders: [string, string, string, string, string, string];
  readiness: {
    title: string;
    memoryTitle: string;
    memoryBody: (ram: string) => string;
    psuTitle: string;
    psuBody: (calculated: number, common: number) => string;
    platformTitle: string;
    platformBody: (socket: string) => string;
    coolingTitle: string;
    coolingBody: string;
  };
  bestFor: string;
  verifyBeforeBuying: string;
  compatibilityHeading: string;
  compatibilityItems: string[];
  interpretation: {
    title: string;
    paragraphs: [string, string];
    methodologyLink: string;
    fpsLink: string;
  };
  relatedBuilds: string;
  openAnalysis: string;
};

const COPY: Record<Locale, BuildLocaleCopy> = {
  en: {
    curated: 'Curated examples', sectionTitle: 'Popular PC Build Checks', sectionDescription: 'Explore six supported CPU and GPU combinations covering common 1080p, 1440p and 4K build scenarios.', closeMatch: 'Close index match', constraint: side => `${side}-side planning constraint`, gap: 'planning gap', viewAnalysis: 'View full build analysis', selectionNote: 'Selected to cover varied budgets, platforms and resolutions—not a live popularity ranking.', reviewed: 'Reviewed', back: 'PC Bottleneck Calculator', analysis: 'Bottleneck Analysis', metaDescription: (cpu, gpu, res) => `Review the ${cpu} and ${gpu} pairing at ${res}, including resolution-adjusted planning indexes, RAM, PSU and compatibility checks.`, reviewedLabel: 'Reviewed', planningNotice: 'Planning analysis, not a measured game benchmark', resultSummary: 'Result summary', balancedTitle: 'Close resolution-adjusted index match', balancedBody: 'The CPU and GPU planning indexes are close at the selected target resolution. Real limits can still change by game engine, scene, settings and frame-rate target.', constraintTitle: side => `${side}-side planning constraint`, constraintBody: side => `At the selected target resolution, the ${side} has the lower adjusted planning index and deserves closer testing in relevant games.`, planningGap: 'planning gap', scoreDisclaimer: 'This percentage is the separation between resolution-adjusted planning indexes. It is not measured lost FPS, wasted performance or a guarantee of real-game behavior.', loadBuild: 'Load this build in the calculator', dashboard: 'Build planning dashboard', normalizedBalance: 'Normalized component balance', rawScoreNote: 'These are PCBuildCheck planning scores before the moderate resolution adjustment. They are not PassMark scores, measured FPS or laboratory results.', quickPlan: 'At-a-glance build plan', targetResolution: 'Target resolution', memoryPlan: 'Memory plan', cpuPlatform: 'CPU platform', graphicsMemory: 'Graphics memory', publishedPower: 'Published CPU + GPU power', psuPlan: 'Common PSU planning size', likelyConstraint: 'Likely constraint', componentOverview: 'Component overview', processor: 'Processor', graphicsCard: 'Graphics card', normalizedScore: 'Normalized planning score', coresThreads: 'Cores / threads', boostClock: 'Boost clock', publishedTdp: 'Published TDP', socket: 'Socket', architecture: 'Architecture', boardPower: 'Published board power', officialDetails: 'Official details', verifyModel: 'Verify model', resolutionHeading: 'How resolution changes the likely constraint', resolutionIntro: 'Higher output resolutions generally move more work toward the GPU. These are planning indexes, not measured utilization.', pressureGraph: 'Resolution pressure graph', selected: 'Selected', graphNote: 'The graph applies a moderate resolution workload adjustment to normalized component scores. The lower bar identifies the side to verify first; it does not predict FPS.', resolutionTableHeaders: ['Resolution', 'CPU index', 'GPU index', 'CPU-side pressure', 'GPU-side pressure', 'Likely constraint'], readiness: { title: 'Build readiness checks', memoryTitle: 'Memory plan', memoryBody: ram => `${ram}. Confirm that the selected motherboard supports the memory generation and speed.`, psuTitle: 'PSU capacity', psuBody: (calculated, common) => `Calculated capacity is about ${calculated}W; ${common}W is the next common planning size. Verify the GPU maker’s minimum.`, platformTitle: 'Platform', platformBody: socket => `Use a ${socket} motherboard and verify BIOS support, memory compatibility and available expansion space.`, coolingTitle: 'Cooling and fit', coolingBody: 'Check CPU cooler capacity, GPU length and thickness, case airflow and native power-cable clearance.' }, bestFor: 'Useful for', verifyBeforeBuying: 'Verify before buying', compatibilityHeading: 'Compatibility checklist', compatibilityItems: ['Confirm motherboard socket, chipset and BIOS support.', 'Verify cooler, case clearance and memory compatibility.', 'Check PSU capacity and the exact GPU power connectors.'], interpretation: { title: 'How to interpret this analysis', paragraphs: ['PCBuildCheck compares internally normalized CPU and GPU planning scores derived from published specifications. The model helps identify which side deserves closer testing; it does not reproduce a laboratory benchmark.', 'Real performance changes with the game version, scene, graphics settings, frame cap, cooling, memory configuration, drivers and background applications. Before upgrading, verify the suspected limit with repeatable frame-time and utilization measurements.'], methodologyLink: 'Read the methodology', fpsLink: 'Open the dedicated FPS calculator' }, relatedBuilds: 'Related build checks', openAnalysis: 'Open analysis',
  },
  de: {
    curated: 'Kuratierte Beispiele', sectionTitle: 'Beliebte PC-Build-Prüfungen', sectionDescription: 'Sechs unterstützte CPU-GPU-Kombinationen für typische 1080p-, 1440p- und 4K-Szenarien.', closeMatch: 'Ähnliche Planungsindizes', constraint: side => `${side}-seitiger Planungsengpass`, gap: 'Planungsdifferenz', viewAnalysis: 'Vollständige Build-Analyse', selectionNote: 'Auswahl für unterschiedliche Budgets, Plattformen und Auflösungen – keine Live-Beliebtheitsrangliste.', reviewed: 'Geprüft', back: 'PC-Flaschenhals-Rechner', analysis: 'Flaschenhals-Analyse', metaDescription: (cpu, gpu, res) => `Analyse der Kombination ${cpu} und ${gpu} bei ${res} mit auflösungsangepassten Planungsindizes, RAM-, Netzteil- und Kompatibilitätsprüfung.`, reviewedLabel: 'Geprüft', planningNotice: 'Planungsanalyse, kein gemessener Spiele-Benchmark', resultSummary: 'Ergebnisübersicht', balancedTitle: 'Ähnliche auflösungsangepasste Planungsindizes', balancedBody: 'Die CPU- und GPU-Planungsindizes liegen bei der gewählten Auflösung nahe beieinander. Das reale Limit kann sich je nach Spiel, Szene, Einstellungen und FPS-Ziel ändern.', constraintTitle: side => `${side}-seitiger Planungsengpass`, constraintBody: side => `Bei der gewählten Auflösung hat die Komponente ${side} den niedrigeren angepassten Planungsindex und sollte in passenden Spielen zuerst geprüft werden.`, planningGap: 'Planungsdifferenz', scoreDisclaimer: 'Der Prozentwert ist der Abstand zwischen auflösungsangepassten Planungsindizes. Er ist kein gemessener FPS-Verlust und keine Garantie für reales Spielverhalten.', loadBuild: 'Diesen Build im Rechner laden', dashboard: 'Build-Planungsübersicht', normalizedBalance: 'Normalisierte Komponentenbalance', rawScoreNote: 'Dies sind PCBuildCheck-Planungswerte vor der moderaten Auflösungsanpassung. Es sind keine PassMark-Werte, gemessenen FPS oder Laborergebnisse.', quickPlan: 'Build-Plan auf einen Blick', targetResolution: 'Zielauflösung', memoryPlan: 'Arbeitsspeicher', cpuPlatform: 'CPU-Plattform', graphicsMemory: 'Grafikspeicher', publishedPower: 'Veröffentlichte CPU- und GPU-Leistung', psuPlan: 'Übliche Netzteil-Planungsgröße', likelyConstraint: 'Wahrscheinlicher Engpass', componentOverview: 'Komponentenübersicht', processor: 'Prozessor', graphicsCard: 'Grafikkarte', normalizedScore: 'Normalisierter Planungswert', coresThreads: 'Kerne / Threads', boostClock: 'Boost-Takt', publishedTdp: 'Veröffentlichte TDP', socket: 'Sockel', architecture: 'Architektur', boardPower: 'Veröffentlichte Board-Leistung', officialDetails: 'Offizielle Details', verifyModel: 'Modell prüfen', resolutionHeading: 'Wie die Auflösung den wahrscheinlichen Engpass verändert', resolutionIntro: 'Höhere Auflösungen verlagern meist mehr Arbeit zur GPU. Dies sind Planungsindizes, keine gemessene Auslastung.', pressureGraph: 'Diagramm zum Auflösungsdruck', selected: 'Ausgewählt', graphNote: 'Das Diagramm wendet eine moderate Auflösungsanpassung auf normalisierte Komponentenwerte an. Der niedrigere Balken zeigt, welche Seite zuerst geprüft werden sollte; es sagt keine FPS voraus.', resolutionTableHeaders: ['Auflösung', 'CPU-Index', 'GPU-Index', 'CPU-seitiger Druck', 'GPU-seitiger Druck', 'Wahrscheinlicher Engpass'], readiness: { title: 'Prüfung der Build-Bereitschaft', memoryTitle: 'Arbeitsspeicher', memoryBody: ram => `${ram}. Prüfen Sie, ob das gewählte Mainboard Speichergeneration und Geschwindigkeit unterstützt.`, psuTitle: 'Netzteilkapazität', psuBody: (calculated, common) => `Die berechnete Kapazität liegt bei etwa ${calculated} W; ${common} W ist die nächste übliche Planungsgröße. Herstellerminimum der GPU prüfen.`, platformTitle: 'Plattform', platformBody: socket => `Ein Mainboard mit ${socket} verwenden und BIOS-Unterstützung, Speicherkompatibilität sowie Erweiterungsplatz prüfen.`, coolingTitle: 'Kühlung und Platz', coolingBody: 'CPU-Kühlerleistung, GPU-Länge und -Dicke, Gehäusebelüftung und Platz für native Stromkabel prüfen.' }, bestFor: 'Geeignet für', verifyBeforeBuying: 'Vor dem Kauf prüfen', compatibilityHeading: 'Kompatibilitäts-Checkliste', compatibilityItems: ['Mainboard-Sockel, Chipsatz und BIOS-Unterstützung bestätigen.', 'Kühler-, Gehäuse- und Speicherkompatibilität prüfen.', 'Netzteilkapazität und genaue GPU-Stromanschlüsse prüfen.'], interpretation: { title: 'Diese Analyse richtig interpretieren', paragraphs: ['PCBuildCheck vergleicht intern normalisierte CPU- und GPU-Planungswerte aus veröffentlichten Spezifikationen. Das Modell zeigt, welche Seite genauer getestet werden sollte; es bildet keinen Laborbenchmark nach.', 'Die reale Leistung ändert sich mit Spielversion, Szene, Grafikeinstellungen, FPS-Limit, Kühlung, Speicher, Treibern und Hintergrundprogrammen. Vor einem Upgrade den vermuteten Engpass mit wiederholbaren Frame-Time- und Auslastungsmessungen prüfen.'], methodologyLink: 'Methodik lesen', fpsLink: 'Eigenständigen FPS-Rechner öffnen' }, relatedBuilds: 'Ähnliche Build-Prüfungen', openAnalysis: 'Analyse öffnen',
  },
  fr: {
    curated: 'Exemples sélectionnés', sectionTitle: 'Configurations PC populaires à vérifier', sectionDescription: 'Six associations CPU-GPU prises en charge pour des scénarios courants en 1080p, 1440p et 4K.', closeMatch: 'Indices proches', constraint: side => `Contrainte de planification côté ${side}`, gap: 'écart de planification', viewAnalysis: 'Voir l’analyse complète', selectionNote: 'Sélection couvrant plusieurs budgets, plateformes et résolutions — il ne s’agit pas d’un classement en direct.', reviewed: 'Révisé', back: 'Calculateur de bottleneck PC', analysis: 'Analyse du bottleneck', metaDescription: (cpu, gpu, res) => `Analyse de l’association ${cpu} et ${gpu} en ${res}, avec indices ajustés à la résolution, RAM, alimentation et compatibilité.`, reviewedLabel: 'Révisé', planningNotice: 'Analyse de planification, pas un benchmark de jeu mesuré', resultSummary: 'Résumé du résultat', balancedTitle: 'Indices ajustés à la résolution proches', balancedBody: 'Les indices de planification du CPU et du GPU sont proches à la résolution choisie. La limite réelle peut changer selon le jeu, la scène, les réglages et la cible FPS.', constraintTitle: side => `Contrainte de planification côté ${side}`, constraintBody: side => `À la résolution choisie, le composant ${side} a l’indice ajusté le plus faible et mérite une vérification prioritaire dans les jeux concernés.`, planningGap: 'écart de planification', scoreDisclaimer: 'Ce pourcentage est l’écart entre les indices ajustés à la résolution. Ce n’est ni une perte de FPS mesurée ni une garantie de comportement réel.', loadBuild: 'Charger cette configuration dans le calculateur', dashboard: 'Tableau de planification', normalizedBalance: 'Équilibre normalisé des composants', rawScoreNote: 'Il s’agit des scores de planification PCBuildCheck avant l’ajustement modéré de résolution, et non de scores PassMark, de FPS mesurés ou de résultats de laboratoire.', quickPlan: 'Plan de configuration en bref', targetResolution: 'Résolution cible', memoryPlan: 'Mémoire prévue', cpuPlatform: 'Plateforme CPU', graphicsMemory: 'Mémoire graphique', publishedPower: 'Puissance CPU + GPU publiée', psuPlan: 'Capacité d’alimentation courante', likelyConstraint: 'Contrainte probable', componentOverview: 'Présentation des composants', processor: 'Processeur', graphicsCard: 'Carte graphique', normalizedScore: 'Score de planification normalisé', coresThreads: 'Cœurs / threads', boostClock: 'Fréquence boost', publishedTdp: 'TDP publié', socket: 'Socket', architecture: 'Architecture', boardPower: 'Puissance de carte publiée', officialDetails: 'Détails officiels', verifyModel: 'Vérifier le modèle', resolutionHeading: 'Comment la résolution modifie la contrainte probable', resolutionIntro: 'Une résolution plus élevée déplace généralement davantage de charge vers le GPU. Il s’agit d’indices de planification, pas d’une utilisation mesurée.', pressureGraph: 'Graphique de pression par résolution', selected: 'Sélectionné', graphNote: 'Le graphique applique un ajustement modéré de résolution aux scores normalisés. La barre la plus basse indique le côté à vérifier en premier ; elle ne prédit pas les FPS.', resolutionTableHeaders: ['Résolution', 'Indice CPU', 'Indice GPU', 'Pression côté CPU', 'Pression côté GPU', 'Contrainte probable'], readiness: { title: 'Vérifications avant montage', memoryTitle: 'Mémoire prévue', memoryBody: ram => `${ram}. Confirmez que la carte mère choisie prend en charge la génération et la vitesse de mémoire.`, psuTitle: 'Capacité de l’alimentation', psuBody: (calculated, common) => `La capacité calculée est d’environ ${calculated} W ; ${common} W est la taille courante suivante. Vérifiez le minimum demandé par le fabricant du GPU.`, platformTitle: 'Plateforme', platformBody: socket => `Utilisez une carte mère ${socket} et vérifiez le BIOS, la mémoire et l’espace d’extension disponible.`, coolingTitle: 'Refroidissement et dimensions', coolingBody: 'Vérifiez la capacité du refroidisseur CPU, la longueur et l’épaisseur du GPU, le flux d’air du boîtier et l’espace pour le câble d’alimentation.' }, bestFor: 'Utile pour', verifyBeforeBuying: 'À vérifier avant achat', compatibilityHeading: 'Liste de compatibilité', compatibilityItems: ['Confirmer le socket, le chipset et la version BIOS de la carte mère.', 'Vérifier le refroidissement, l’espace du boîtier et la mémoire.', 'Vérifier la capacité de l’alimentation et les connecteurs GPU exacts.'], interpretation: { title: 'Comment interpréter cette analyse', paragraphs: ['PCBuildCheck compare des scores de planification CPU et GPU normalisés en interne à partir de spécifications publiées. Le modèle indique le côté à tester plus attentivement ; il ne reproduit pas un benchmark de laboratoire.', 'Les performances réelles changent selon la version du jeu, la scène, les réglages, la limite FPS, le refroidissement, la mémoire, les pilotes et les applications de fond. Avant une mise à niveau, vérifiez la limite suspectée avec des mesures répétables de frame times et d’utilisation.'], methodologyLink: 'Lire la méthodologie', fpsLink: 'Ouvrir le calculateur FPS dédié' }, relatedBuilds: 'Configurations associées', openAnalysis: 'Ouvrir l’analyse',
  },
  it: {
    curated: 'Esempi selezionati', sectionTitle: 'Build PC popolari da verificare', sectionDescription: 'Sei combinazioni CPU-GPU supportate per scenari comuni a 1080p, 1440p e 4K.', closeMatch: 'Indici simili', constraint: side => `Limite di pianificazione lato ${side}`, gap: 'differenza di pianificazione', viewAnalysis: 'Vedi l’analisi completa', selectionNote: 'Selezione per budget, piattaforme e risoluzioni diversi, non una classifica di popolarità in tempo reale.', reviewed: 'Revisionato', back: 'Calcolatore bottleneck PC', analysis: 'Analisi del bottleneck', metaDescription: (cpu, gpu, res) => `Analisi dell’abbinamento ${cpu} e ${gpu} a ${res}, con indici adattati alla risoluzione, RAM, alimentatore e compatibilità.`, reviewedLabel: 'Revisionato', planningNotice: 'Analisi di pianificazione, non un benchmark di gioco misurato', resultSummary: 'Riepilogo del risultato', balancedTitle: 'Indici adattati alla risoluzione simili', balancedBody: 'Gli indici di pianificazione di CPU e GPU sono vicini alla risoluzione selezionata. Il limite reale può cambiare in base a gioco, scena, impostazioni e obiettivo FPS.', constraintTitle: side => `Limite di pianificazione lato ${side}`, constraintBody: side => `Alla risoluzione selezionata, il componente ${side} ha l’indice adattato più basso e va verificato per primo nei giochi rilevanti.`, planningGap: 'differenza di pianificazione', scoreDisclaimer: 'La percentuale è la distanza tra gli indici adattati alla risoluzione. Non è una perdita FPS misurata né una garanzia del comportamento reale.', loadBuild: 'Carica questa build nel calcolatore', dashboard: 'Pannello di pianificazione della build', normalizedBalance: 'Bilanciamento normalizzato dei componenti', rawScoreNote: 'Questi sono punteggi di pianificazione PCBuildCheck prima della moderata regolazione della risoluzione, non punteggi PassMark, FPS misurati o risultati di laboratorio.', quickPlan: 'Piano della build in breve', targetResolution: 'Risoluzione obiettivo', memoryPlan: 'Memoria prevista', cpuPlatform: 'Piattaforma CPU', graphicsMemory: 'Memoria grafica', publishedPower: 'Potenza CPU + GPU pubblicata', psuPlan: 'Taglio alimentatore comune', likelyConstraint: 'Limite probabile', componentOverview: 'Panoramica dei componenti', processor: 'Processore', graphicsCard: 'Scheda grafica', normalizedScore: 'Punteggio di pianificazione normalizzato', coresThreads: 'Core / thread', boostClock: 'Clock boost', publishedTdp: 'TDP pubblicato', socket: 'Socket', architecture: 'Architettura', boardPower: 'Potenza scheda pubblicata', officialDetails: 'Dettagli ufficiali', verifyModel: 'Verifica modello', resolutionHeading: 'Come la risoluzione cambia il probabile limite', resolutionIntro: 'Risoluzioni più alte spostano generalmente più lavoro sulla GPU. Sono indici di pianificazione, non utilizzo misurato.', pressureGraph: 'Grafico della pressione per risoluzione', selected: 'Selezionata', graphNote: 'Il grafico applica una regolazione moderata della risoluzione ai punteggi normalizzati. La barra più bassa indica il lato da verificare per primo; non prevede gli FPS.', resolutionTableHeaders: ['Risoluzione', 'Indice CPU', 'Indice GPU', 'Pressione lato CPU', 'Pressione lato GPU', 'Limite probabile'], readiness: { title: 'Controlli prima dell’assemblaggio', memoryTitle: 'Piano memoria', memoryBody: ram => `${ram}. Conferma che la scheda madre scelta supporti generazione e velocità della memoria.`, psuTitle: 'Capacità alimentatore', psuBody: (calculated, common) => `La capacità calcolata è circa ${calculated} W; ${common} W è il taglio comune successivo. Verifica il minimo indicato dal produttore della GPU.`, platformTitle: 'Piattaforma', platformBody: socket => `Usa una scheda madre ${socket} e verifica BIOS, compatibilità memoria e spazio di espansione.`, coolingTitle: 'Raffreddamento e ingombri', coolingBody: 'Controlla capacità del dissipatore CPU, lunghezza e spessore GPU, flusso d’aria e spazio per il cavo di alimentazione.' }, bestFor: 'Utile per', verifyBeforeBuying: 'Da verificare prima dell’acquisto', compatibilityHeading: 'Lista di compatibilità', compatibilityItems: ['Conferma socket, chipset e supporto BIOS della scheda madre.', 'Verifica dissipatore, spazio nel case e compatibilità della memoria.', 'Controlla capacità dell’alimentatore e connettori GPU esatti.'], interpretation: { title: 'Come interpretare questa analisi', paragraphs: ['PCBuildCheck confronta punteggi di pianificazione CPU e GPU normalizzati internamente da specifiche pubblicate. Il modello indica quale lato testare più attentamente; non riproduce un benchmark di laboratorio.', 'Le prestazioni reali cambiano con versione del gioco, scena, impostazioni, limite FPS, raffreddamento, memoria, driver e applicazioni in background. Prima di aggiornare, verifica il limite sospetto con misure ripetibili di frame time e utilizzo.'], methodologyLink: 'Leggi la metodologia', fpsLink: 'Apri il calcolatore FPS dedicato' }, relatedBuilds: 'Build correlate', openAnalysis: 'Apri analisi',
  },
  es: {
    curated: 'Ejemplos seleccionados', sectionTitle: 'Configuraciones de PC populares', sectionDescription: 'Seis combinaciones CPU-GPU compatibles para escenarios habituales en 1080p, 1440p y 4K.', closeMatch: 'Índices similares', constraint: side => `Límite de planificación del lado ${side}`, gap: 'diferencia de planificación', viewAnalysis: 'Ver análisis completo', selectionNote: 'Selección para distintos presupuestos, plataformas y resoluciones; no es una clasificación de popularidad en directo.', reviewed: 'Revisado', back: 'Calculadora de cuello de botella', analysis: 'Análisis del cuello de botella', metaDescription: (cpu, gpu, res) => `Analiza la combinación de ${cpu} y ${gpu} a ${res}, con índices ajustados a la resolución, RAM, fuente y compatibilidad.`, reviewedLabel: 'Revisado', planningNotice: 'Análisis de planificación, no un benchmark de juego medido', resultSummary: 'Resumen del resultado', balancedTitle: 'Índices ajustados a la resolución similares', balancedBody: 'Los índices de planificación de CPU y GPU están próximos con la resolución seleccionada. El límite real puede cambiar según el juego, la escena, los ajustes y el objetivo de FPS.', constraintTitle: side => `Límite de planificación del lado ${side}`, constraintBody: side => `Con la resolución seleccionada, el componente ${side} tiene el índice ajustado más bajo y conviene comprobarlo primero en juegos relevantes.`, planningGap: 'diferencia de planificación', scoreDisclaimer: 'El porcentaje es la separación entre índices ajustados a la resolución. No es una pérdida de FPS medida ni una garantía del comportamiento real.', loadBuild: 'Cargar esta configuración en la calculadora', dashboard: 'Panel de planificación', normalizedBalance: 'Equilibrio normalizado de componentes', rawScoreNote: 'Estas son puntuaciones de planificación de PCBuildCheck antes del ajuste moderado de resolución; no son puntuaciones PassMark, FPS medidos ni resultados de laboratorio.', quickPlan: 'Plan de la configuración', targetResolution: 'Resolución objetivo', memoryPlan: 'Memoria prevista', cpuPlatform: 'Plataforma CPU', graphicsMemory: 'Memoria gráfica', publishedPower: 'Potencia publicada de CPU + GPU', psuPlan: 'Tamaño habitual de fuente', likelyConstraint: 'Límite probable', componentOverview: 'Resumen de componentes', processor: 'Procesador', graphicsCard: 'Tarjeta gráfica', normalizedScore: 'Puntuación de planificación normalizada', coresThreads: 'Núcleos / hilos', boostClock: 'Frecuencia boost', publishedTdp: 'TDP publicado', socket: 'Socket', architecture: 'Arquitectura', boardPower: 'Potencia de placa publicada', officialDetails: 'Detalles oficiales', verifyModel: 'Verificar modelo', resolutionHeading: 'Cómo cambia la resolución el posible límite', resolutionIntro: 'Las resoluciones más altas suelen trasladar más trabajo a la GPU. Son índices de planificación, no utilización medida.', pressureGraph: 'Gráfico de presión por resolución', selected: 'Seleccionada', graphNote: 'El gráfico aplica un ajuste moderado de resolución a las puntuaciones normalizadas. La barra más baja indica qué lado verificar primero; no predice los FPS.', resolutionTableHeaders: ['Resolución', 'Índice CPU', 'Índice GPU', 'Presión de CPU', 'Presión de GPU', 'Límite probable'], readiness: { title: 'Comprobaciones antes del montaje', memoryTitle: 'Plan de memoria', memoryBody: ram => `${ram}. Confirma que la placa elegida admite la generación y velocidad de memoria.`, psuTitle: 'Capacidad de la fuente', psuBody: (calculated, common) => `La capacidad calculada es de unos ${calculated} W; ${common} W es el siguiente tamaño habitual. Comprueba el mínimo del fabricante de la GPU.`, platformTitle: 'Plataforma', platformBody: socket => `Usa una placa base ${socket} y verifica BIOS, memoria y espacio de expansión disponible.`, coolingTitle: 'Refrigeración y espacio', coolingBody: 'Comprueba capacidad del disipador, longitud y grosor de la GPU, flujo de aire y espacio para el cable de alimentación.' }, bestFor: 'Útil para', verifyBeforeBuying: 'Comprobar antes de comprar', compatibilityHeading: 'Lista de compatibilidad', compatibilityItems: ['Confirma socket, chipset y compatibilidad de BIOS de la placa base.', 'Verifica refrigeración, espacio de la caja y memoria.', 'Comprueba capacidad de la fuente y conectores exactos de la GPU.'], interpretation: { title: 'Cómo interpretar este análisis', paragraphs: ['PCBuildCheck compara puntuaciones internas normalizadas de CPU y GPU derivadas de especificaciones publicadas. El modelo ayuda a identificar qué lado requiere más pruebas; no reproduce un benchmark de laboratorio.', 'El rendimiento real cambia con versión del juego, escena, ajustes, límite FPS, refrigeración, memoria, controladores y aplicaciones en segundo plano. Antes de mejorar, verifica el límite sospechado con mediciones repetibles de frame times y utilización.'], methodologyLink: 'Leer la metodología', fpsLink: 'Abrir la calculadora FPS dedicada' }, relatedBuilds: 'Configuraciones relacionadas', openAnalysis: 'Abrir análisis',
  },

  ru: {
    curated: "Кураторские примеры", sectionTitle: "Популярные проверки сборки ПК", sectionDescription: "Ознакомьтесь с шестью поддерживаемыми комбинациями CPU и GPU, охватывающими распространенные сценарии сборки 1080p, 1440p и 4K.", closeMatch: "Закрыть совпадение индекса", constraint: side => `${side}-side planning constraint`, gap: "разрыв в планировании", viewAnalysis: "Посмотреть полный анализ сборки", selectionNote: "Выбрано для покрытия различных бюджетов, платформ и разрешений, а не для живого рейтинга популярности.", reviewed: 'Reviewed', back: "Калькулятор узких мест ПК", analysis: "Анализ узких мест", metaDescription: (cpu, gpu, res) => `Review the ${cpu} and ${gpu} pairing at ${res}, including resolution-adjusted planning indexes, RAM, PSU and compatibility checks.`, reviewedLabel: 'Reviewed', planningNotice: "Анализ планирования, а не измеренный игровой тест", resultSummary: "Сводка результатов", balancedTitle: "Точное совпадение индекса с поправкой на разрешение", balancedBody: "Индексы планирования CPU и GPU близки при выбранном целевом разрешении. Реальные ограничения по-прежнему могут меняться в зависимости от игрового движка, сцены, настроек и целевой частоты кадров.", constraintTitle: side => `${side}-side planning constraint`, constraintBody: side => `At the selected target resolution, the ${side} has the lower adjusted planning index and deserves closer testing in relevant games.`, planningGap: "разрыв в планировании", scoreDisclaimer: "Этот процент представляет собой разделение между индексами планирования, скорректированными с учетом резолюции. Он не измеряется потерянным FPS, потерянной производительностью или гарантией поведения в реальной игре.", loadBuild: "Загрузите эту сборку в калькулятор", dashboard: "Панель планирования сборки", normalizedBalance: "Нормализованный баланс компонентов", rawScoreNote: "Это PCBuildCheck оценки планирования до умеренной корректировки разрешения. Это не результаты PassMark, измеренные FPS или результаты лабораторных исследований.", quickPlan: "Краткий план сборки", targetResolution: "Целевое разрешение", memoryPlan: "План памяти", cpuPlatform: "Платформа CPU", graphicsMemory: "Графическая память", publishedPower: "Опубликовано CPU + GPU мощность", psuPlan: "Общий плановый размер PSU", likelyConstraint: "Вероятное ограничение", componentOverview: "Обзор компонентов", processor: 'Processor', graphicsCard: "Видеокарта", normalizedScore: "Нормализованный показатель планирования", coresThreads: "Ядра/потоки", boostClock: "Увеличение частоты", publishedTdp: "Опубликовано TDP", socket: 'Socket', architecture: 'Architecture', boardPower: "Опубликованная мощность платы", officialDetails: "Официальные подробности", verifyModel: "Проверить модель", resolutionHeading: "Как разрешение меняет вероятное ограничение", resolutionIntro: "Более высокие выходные разрешения обычно требуют больше работы с GPU. Это индексы планирования, а не измеренное использование.", pressureGraph: "График давления разрешения", selected: 'Selected', graphNote: "На графике применяется корректировка рабочей нагрузки умеренного разрешения к нормализованным оценкам компонентов. Нижняя полоса указывает сторону, которую необходимо проверить в первую очередь; он не прогнозирует FPS.", resolutionTableHeaders: ['Resolution', "CPU индекс", "GPU индекс", "CPU — боковое давление", "GPU — боковое давление", "Вероятное ограничение"], readiness: { title: "Проверка готовности сборки", memoryTitle: "План памяти", memoryBody: ram => `${ram}. Confirm that the selected motherboard supports the memory generation and speed.`, psuTitle: "PSU емкость", psuBody: (calculated, common) => `Calculated capacity is about ${calculated}W; ${common}W is the next common planning size. Verify the GPU maker’s minimum.`, platformTitle: 'Platform', platformBody: socket => `Use a ${socket} motherboard and verify BIOS support, memory compatibility and available expansion space.`, coolingTitle: "Охлаждение и посадка", coolingBody: "Проверьте мощность охладителя CPU, длину и толщину GPU, воздушный поток корпуса и родной зазор для кабеля питания." }, bestFor: "Полезно для", verifyBeforeBuying: "Проверьте перед покупкой", compatibilityHeading: "Контрольный список совместимости", compatibilityItems: ["Подтвердите разъем материнской платы, набор микросхем и поддержку BIOS.", "Проверьте кулер, зазор в корпусе и совместимость памяти.", "Проверьте емкость PSU и точные разъемы питания GPU."], interpretation: { title: "Как интерпретировать этот анализ", paragraphs: ["PCBuildCheck сравнивает внутренне нормализованные показатели планирования CPU и GPU, полученные на основе опубликованных спецификаций. Модель помогает определить, какая сторона заслуживает более тщательного тестирования; он не воспроизводит лабораторный тест.", "Реальная производительность зависит от версии игры, сцены, настроек графики, ограничения кадров, охлаждения, конфигурации памяти, драйверов и фоновых приложений. Перед обновлением проверьте предполагаемый предел с помощью повторяемых измерений времени кадра и использования."], methodologyLink: "Читать методологию", fpsLink: "Откройте специальный калькулятор FPS." }, relatedBuilds: "Связанные проверки сборки", openAnalysis: "Открытый анализ",
  },
};

Object.assign(COPY.ru, {
  curated: 'Подобранные примеры',
  closeMatch: 'Близкие индексы',
  constraint: (side: string) => `Вероятное ограничение со стороны ${side}`,
  reviewed: 'Проверено',
  reviewedLabel: 'Проверено',
  metaDescription: (cpu: string, gpu: string, resolution: string) =>
    `Анализ сочетания ${cpu} и ${gpu} в ${resolution}: индексы с поправкой на разрешение, RAM, блок питания и совместимость.`,
  constraintTitle: (side: string) => `Вероятное ограничение со стороны ${side}`,
  constraintBody: (side: string) =>
    `При выбранном разрешении у ${side} ниже скорректированный индекс. Сначала проверьте этот компонент в нужных играх.`,
  processor: 'Процессор',
  socket: 'Сокет',
  architecture: 'Архитектура',
  selected: 'Выбрано',
  resolutionTableHeaders: ['Разрешение', 'Индекс CPU', 'Индекс GPU', 'Нагрузка на CPU', 'Нагрузка на GPU', 'Вероятное ограничение'],
  readiness: {
    title: 'Проверка готовности сборки',
    memoryTitle: 'Память',
    memoryBody: (ram: string) => `${ram}. Убедитесь, что материнская плата поддерживает выбранное поколение и скорость памяти.`,
    psuTitle: 'Мощность блока питания',
    psuBody: (calculated: number, common: number) =>
      `Расчётная мощность — около ${calculated} Вт; ${common} Вт — следующий распространённый номинал. Проверьте минимум, указанный производителем видеокарты.`,
    platformTitle: 'Платформа',
    platformBody: (socket: string) =>
      `Используйте материнскую плату с сокетом ${socket}; проверьте поддержку BIOS, совместимость памяти и доступное пространство.`,
    coolingTitle: 'Охлаждение и габариты',
    coolingBody: 'Проверьте мощность кулера CPU, длину и толщину видеокарты, вентиляцию корпуса и пространство для кабелей питания.',
  },
} satisfies Partial<BuildLocaleCopy>);

export function getPopularBuildCopy(locale: Locale) {
  return COPY[locale];
}

const PRESSURE_LABELS: Record<Locale, Record<string, string>> = {
  en: { High: 'High', Moderate: 'Moderate', Lower: 'Lower', 'Very high': 'Very high' },
  de: { High: 'Hoch', Moderate: 'Mittel', Lower: 'Niedriger', 'Very high': 'Sehr hoch' },
  fr: { High: 'Élevée', Moderate: 'Modérée', Lower: 'Plus faible', 'Very high': 'Très élevée' },
  it: { High: 'Alta', Moderate: 'Moderata', Lower: 'Più bassa', 'Very high': 'Molto alta' },
  es: { High: 'Alta', Moderate: 'Moderada', Lower: 'Más baja', 'Very high': 'Muy alta' },

  ru: { High: 'Высокая', Moderate: 'Умеренная', Lower: 'Ниже', 'Very high': 'Очень высокая' },
};

export function localizePressureLabel(locale: Locale, label: string) {
  return PRESSURE_LABELS[locale][label] || label;
}

const REVIEWED_DATES: Record<Locale, string> = {
  en: 'August 22, 2026',
  de: '22. August 2026',
  fr: '22 août 2026',
  it: '22 agosto 2026',
  es: '22 de agosto de 2026',

  ru: "22 августа 2026 г.",
};

export function getPopularBuildReviewedDate(locale: Locale) {
  return REVIEWED_DATES[locale];
}

export function getLocalizedBuildDetails(build: PopularBuild, locale: Locale) {
  if (locale === 'en') return build;
  const categoryByLocale: Record<Exclude<Locale, 'en'>, string> = {
    de: `${build.resolution}-Gaming-Build`,
    fr: `Configuration gaming ${build.resolution}`,
    it: `Build gaming ${build.resolution}`,
    es: `Configuración gaming ${build.resolution}`,
    ru: `Игровая сборка для ${build.resolution}`,
  };
  const overviewByLocale: Record<Exclude<Locale, 'en'>, string> = {
    de: `Eine praktische Kombination aus ${build.resolution}-Ziel, ${build.ramLabel} und den gewählten CPU-/GPU-Klassen. Prüfe Spiele-Benchmarks, Plattformkosten, Kühlung und Stromversorgung vor dem Kauf.`,
    fr: `Une association pratique visant le ${build.resolution} avec ${build.ramLabel}. Vérifiez les benchmarks de vos jeux, le coût de la plateforme, le refroidissement et l’alimentation avant achat.`,
    it: `Un abbinamento pratico per il ${build.resolution} con ${build.ramLabel}. Prima dell’acquisto verifica benchmark dei giochi, costo della piattaforma, raffreddamento e alimentazione.`,
    es: `Una combinación práctica para ${build.resolution} con ${build.ramLabel}. Antes de comprar, comprueba benchmarks de tus juegos, coste de plataforma, refrigeración y alimentación.`,
    ru: `Практичная комбинация для ${build.resolution} с ${build.ramLabel}. Перед покупкой проверьте тесты нужных игр, совместимость платформы, охлаждение и питание.`,
  };
  const bestFor: Record<Exclude<Locale, 'en'>, string[]> = {
    de: [`Gaming bei ${build.resolution}`, 'Vergleich einer vollständigen Teileliste', 'Planung von Plattform und Netzteil'],
    fr: [`Jeu en ${build.resolution}`, 'Comparaison d’une configuration complète', 'Planification de la plateforme et de l’alimentation'],
    it: [`Gaming a ${build.resolution}`, 'Confronto di una configurazione completa', 'Pianificazione di piattaforma e alimentatore'],
    es: [`Gaming a ${build.resolution}`, 'Comparación de una configuración completa', 'Planificación de plataforma y fuente'],
    ru: [`Игры в ${build.resolution}`, 'Сравнение полной конфигурации', 'Планирование платформы и блока питания'],
  };
  const watchFor: Record<Exclude<Locale, 'en'>, string[]> = {
    de: ['Mainboard- und BIOS-Kompatibilität prüfen', 'Gehäuse, Kühlung und Stromanschlüsse prüfen', 'Ergebnis mit Benchmarks der eigenen Spiele bestätigen'],
    fr: ['Vérifier la carte mère et le BIOS', 'Vérifier le boîtier, le refroidissement et les connecteurs', 'Confirmer avec les benchmarks de vos jeux'],
    it: ['Verificare scheda madre e BIOS', 'Controllare case, raffreddamento e connettori', 'Confermare con benchmark dei propri giochi'],
    es: ['Verificar placa base y BIOS', 'Comprobar caja, refrigeración y conectores', 'Confirmar con benchmarks de tus juegos'],
    ru: ['Проверить совместимость материнской платы и BIOS', 'Проверить корпус, охлаждение и разъёмы питания', 'Сверить результат с тестами нужных игр'],
  };
  const local = locale as Exclude<Locale, 'en'>;
  return { ...build, category: categoryByLocale[local], overview: overviewByLocale[local], bestFor: bestFor[local], watchFor: watchFor[local] };
}

export function localizedConstraintLabel(copy: BuildLocaleCopy, constraint: PlanningConstraint) {
  return constraint === 'Balanced' ? copy.closeMatch : copy.constraint(constraint);
}
