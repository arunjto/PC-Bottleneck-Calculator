import type { Locale } from '@/i18n-config';
import { getLocalizedPath } from '@/lib/path-translations';

export const TOOL_SLUGS = [
  'gpu-upgrade-calculator',
  'cpu-upgrade-calculator',
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
): Record<Locale, ToolContent> => ({ en, it, fr, de, es });

export const TOOLS: Record<ToolSlug, ToolDefinition> = {
  'gpu-upgrade-calculator': {
    slug: 'gpu-upgrade-calculator',
    category: 'upgrade',
    formula: 'Estimated gain = (new effective GPU score / current effective GPU score - 1) x 100',
    related: ['cpu-upgrade-calculator', 'pc-upgrade-priority-calculator', 'fps-calculator'],
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
    ),
  },
  'cpu-upgrade-calculator': {
    slug: 'cpu-upgrade-calculator',
    category: 'upgrade',
    formula: 'Useful gain = selected use-case ratio, limited by the selected GPU for gaming',
    related: ['gpu-upgrade-calculator', 'pc-upgrade-priority-calculator', 'bottleneck-calculator'],
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
    ),
  },
  'vram-calculator': {
    slug: 'vram-calculator',
    category: 'memory',
    formula: 'VRAM planning estimate = workload base + resolution + textures + ray tracing + extra-display allowance',
    related: ['gaming-ram-calculator', 'resolution-scaling-calculator', 'game-settings-optimizer'],
    content: localized(
      {
        title: 'VRAM Requirement Calculator', shortDescription: 'Estimate a practical graphics-memory tier for your display and settings.',
        description: 'Build a transparent VRAM planning estimate from game type, resolution, texture quality, ray tracing and the number of active monitors.',
        resultGuide: 'Choose a GPU tier at or above the suggested capacity when buying for demanding future games. Allocation is not the same as active use, so treat the number as capacity guidance.',
        methodologyOverview: 'A game-type base is adjusted by resolution, texture quality, ray tracing and a small allowance for extra displays, then rounded up to a common VRAM tier.',
        steps: ['Start with a base for esports, mainstream, AAA or modded games.', 'Add allowances for pixels, textures, ray tracing and extra monitors.', 'Round the total up to a commonly available VRAM capacity.'],
        limitations: ['Game engines allocate and stream assets differently.', 'Mods, patches, high-resolution texture packs and creator workloads can exceed the estimate.'],
      },
      {
        title: 'Calcolatore requisiti VRAM', shortDescription: 'Stima una capacità di memoria grafica adatta a display e impostazioni.',
        description: 'Crea una stima trasparente da tipo di gioco, risoluzione, texture, ray tracing e numero di monitor.',
        resultGuide: 'Per acquisti destinati a giochi futuri scegli una capacità pari o superiore. Memoria allocata e realmente usata non coincidono.',
        methodologyOverview: 'Una base per tipo di gioco viene corretta per risoluzione, texture, ray tracing e monitor aggiuntivi, poi arrotondata a un taglio comune.',
        steps: ['Scegli la base del tipo di gioco.', 'Aggiungi i margini per qualità e display.', 'Arrotonda a una capacità VRAM disponibile.'],
        limitations: ['I motori gestiscono memoria e streaming in modi diversi.', 'Mod e pacchetti texture possono superare la stima.'],
      },
      {
        title: 'Calculateur de besoin en VRAM', shortDescription: 'Estimez une capacité graphique adaptée à votre écran et vos réglages.',
        description: 'Construisez une estimation transparente selon type de jeu, résolution, textures, ray tracing et nombre d\'écrans.',
        resultGuide: 'Pour des jeux futurs exigeants, choisissez une capacité au moins égale. Mémoire allouée et réellement utilisée ne sont pas identiques.',
        methodologyOverview: 'Une base par type de jeu est ajustée selon résolution, textures, ray tracing et écrans supplémentaires, puis arrondie à un palier courant.',
        steps: ['Choisir la base du type de jeu.', 'Ajouter les marges de qualité et d\'affichage.', 'Arrondir à une capacité VRAM disponible.'],
        limitations: ['Les moteurs gèrent mémoire et streaming différemment.', 'Mods et textures haute résolution peuvent dépasser l\'estimation.'],
      },
      {
        title: 'VRAM-Bedarfsrechner', shortDescription: 'Eine passende Grafikspeicher-Stufe für Display und Einstellungen schätzen.',
        description: 'Erstelle eine transparente Planung aus Spieltyp, Auflösung, Texturqualität, Raytracing und Monitorzahl.',
        resultGuide: 'Für anspruchsvolle zukünftige Spiele mindestens die empfohlene Stufe wählen. Reservierter und aktiv genutzter Speicher sind nicht identisch.',
        methodologyOverview: 'Ein Spieltyp-Basiswert wird um Auflösung, Texturen, Raytracing und weitere Displays ergänzt und auf eine übliche VRAM-Stufe gerundet.',
        steps: ['Basis nach Spieltyp wählen.', 'Aufschläge für Qualität und Displays addieren.', 'Auf eine verfügbare VRAM-Stufe aufrunden.'],
        limitations: ['Engines verwalten Speicher und Streaming unterschiedlich.', 'Mods und hochauflösende Texturpakete können mehr benötigen.'],
      },
      {
        title: 'Calculadora de requisitos de VRAM', shortDescription: 'Estima una capacidad gráfica adecuada para pantalla y ajustes.',
        description: 'Crea una estimación transparente según tipo de juego, resolución, texturas, ray tracing y número de monitores.',
        resultGuide: 'Para juegos futuros exigentes elige al menos la capacidad sugerida. Memoria asignada y usada no son lo mismo.',
        methodologyOverview: 'Una base por tipo de juego se ajusta por resolución, texturas, ray tracing y pantallas adicionales, y se redondea a un nivel común.',
        steps: ['Elige la base del tipo de juego.', 'Añade márgenes de calidad y pantallas.', 'Redondea a una capacidad de VRAM disponible.'],
        limitations: ['Los motores gestionan memoria y streaming de forma distinta.', 'Mods y texturas de alta resolución pueden superar la estimación.'],
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
