import type { Locale } from '@/i18n-config';

export type ToolsPageCopy = {
  hubTitle: string;
  hubDescription: string;
  hubIntro: string;
  home: string;
  tools: string;
  openTool: string;
  formula: string;
  methodology: string;
  methodologyIntro: string;
  calculationSteps: string;
  limitations: string;
  resultMeaning: string;
  relatedTools: string;
  relatedDescription: string;
  viewAllTools: string;
  reviewed: string;
  coreHeading: string;
  categories: Record<'upgrade' | 'performance' | 'memory' | 'storage', { title: string; description: string }>;
  coreTools: {
    bottleneck: { title: string; description: string };
    fps: { title: string; description: string };
    psu: { title: string; description: string };
  };
};

const COPY: Record<Locale, ToolsPageCopy> = {
  en: {
    hubTitle: 'Free PC Calculators & Upgrade Tools',
    hubDescription: 'Plan GPU, CPU, memory, display, settings and storage upgrades with transparent calculators.',
    hubIntro: 'Choose a focused tool below. Each result shows the calculation basis, assumptions and limitations so you can verify it before buying hardware.',
    home: 'Home', tools: 'Tools', openTool: 'Open calculator', formula: 'Formula or model used', methodology: 'Calculation methodology',
    methodologyIntro: 'The calculator runs in your browser from the values you select. Estimates use transparent planning rules and the site’s normalized hardware data; they are not lab benchmarks.',
    calculationSteps: 'Calculation steps', limitations: 'Assumptions and limitations', resultMeaning: 'How to interpret the result',
    relatedTools: 'Related PC tools', relatedDescription: 'Continue with a calculator that answers the next part of the same upgrade decision.',
    viewAllTools: 'Browse all PC tools', reviewed: 'Methodology reviewed: July 17, 2026', coreHeading: 'Core PCBuildCheck calculators',
    categories: {
      upgrade: { title: 'Upgrade planning', description: 'Compare components and identify which upgrade deserves attention first.' },
      performance: { title: 'Gaming performance & display', description: 'Understand FPS, frame time, refresh rate, resolution scaling and settings.' },
      memory: { title: 'Memory planning', description: 'Estimate graphics-memory and system-memory capacity for your workload.' },
      storage: { title: 'Storage planning', description: 'Compare storage types and plan usable capacity for a game library.' },
    },
    coreTools: {
      bottleneck: { title: 'PC Bottleneck Calculator', description: 'Compare CPU and GPU balance with the main PCBuildCheck model.' },
      fps: { title: 'Game FPS Calculator', description: 'Estimate a broad FPS scenario for selected hardware and a game.' },
      psu: { title: 'PSU Wattage Calculator', description: 'Estimate system power demand and practical PSU headroom.' },
    },
  },
  it: {
    hubTitle: 'Calcolatori PC e strumenti di upgrade gratuiti',
    hubDescription: 'Pianifica upgrade di GPU, CPU, memoria, display, impostazioni e storage con calcolatori trasparenti.',
    hubIntro: 'Scegli uno strumento specifico. Ogni risultato mostra metodo, ipotesi e limiti da verificare prima di acquistare hardware.',
    home: 'Home', tools: 'Strumenti', openTool: 'Apri calcolatore', formula: 'Formula o modello utilizzato', methodology: 'Metodologia di calcolo',
    methodologyIntro: 'Il calcolo avviene nel browser dai valori selezionati. Le stime usano regole trasparenti e dati hardware normalizzati; non sono benchmark di laboratorio.',
    calculationSteps: 'Passaggi di calcolo', limitations: 'Ipotesi e limitazioni', resultMeaning: 'Come interpretare il risultato',
    relatedTools: 'Strumenti PC correlati', relatedDescription: 'Continua con il calcolatore che risponde alla fase successiva della stessa decisione.',
    viewAllTools: 'Vedi tutti gli strumenti PC', reviewed: 'Metodologia revisionata: 17 luglio 2026', coreHeading: 'Calcolatori principali di PCBuildCheck',
    categories: {
      upgrade: { title: 'Pianificazione upgrade', description: 'Confronta componenti e identifica la priorità di aggiornamento.' },
      performance: { title: 'Prestazioni gaming e display', description: 'Comprendi FPS, frame time, refresh, scaling e impostazioni.' },
      memory: { title: 'Pianificazione memoria', description: 'Stima la capacità di memoria grafica e di sistema.' },
      storage: { title: 'Pianificazione storage', description: 'Confronta le unità e pianifica lo spazio per i giochi.' },
    },
    coreTools: {
      bottleneck: { title: 'Calcolatore bottleneck PC', description: 'Confronta l’equilibrio tra CPU e GPU con il modello principale.' },
      fps: { title: 'Calcolatore FPS nei giochi', description: 'Stima uno scenario FPS generale per hardware e gioco selezionati.' },
      psu: { title: 'Calcolatore potenza PSU', description: 'Stima il consumo e un margine pratico per l’alimentatore.' },
    },
  },
  fr: {
    hubTitle: 'Calculateurs PC et outils de mise à niveau gratuits',
    hubDescription: 'Planifiez GPU, CPU, mémoire, affichage, réglages et stockage avec des calculateurs transparents.',
    hubIntro: 'Choisissez un outil ciblé. Chaque résultat présente méthode, hypothèses et limites à vérifier avant tout achat.',
    home: 'Accueil', tools: 'Outils', openTool: 'Ouvrir le calculateur', formula: 'Formule ou modèle utilisé', methodology: 'Méthodologie de calcul',
    methodologyIntro: 'Le calcul s’effectue dans votre navigateur. Les estimations utilisent des règles transparentes et des données normalisées; ce ne sont pas des benchmarks de laboratoire.',
    calculationSteps: 'Étapes du calcul', limitations: 'Hypothèses et limites', resultMeaning: 'Comment interpréter le résultat',
    relatedTools: 'Outils PC associés', relatedDescription: 'Continuez avec le calculateur répondant à l’étape suivante de la même décision.',
    viewAllTools: 'Voir tous les outils PC', reviewed: 'Méthodologie vérifiée : 17 juillet 2026', coreHeading: 'Calculateurs principaux de PCBuildCheck',
    categories: {
      upgrade: { title: 'Planification des mises à niveau', description: 'Comparez les composants et identifiez la priorité.' },
      performance: { title: 'Performances de jeu et affichage', description: 'Comprenez FPS, temps d’image, fréquence, échelle et réglages.' },
      memory: { title: 'Planification de la mémoire', description: 'Estimez les capacités de mémoire graphique et système.' },
      storage: { title: 'Planification du stockage', description: 'Comparez les supports et planifiez l’espace des jeux.' },
    },
    coreTools: {
      bottleneck: { title: 'Calculateur de goulot d’étranglement', description: 'Comparez l’équilibre CPU-GPU avec le modèle principal.' },
      fps: { title: 'Calculateur de FPS en jeu', description: 'Estimez un scénario FPS général pour le matériel et le jeu choisis.' },
      psu: { title: 'Calculateur de puissance PSU', description: 'Estimez la demande et une marge pratique d’alimentation.' },
    },
  },
  de: {
    hubTitle: 'Kostenlose PC-Rechner und Upgrade-Tools',
    hubDescription: 'GPU-, CPU-, Speicher-, Display-, Einstellungs- und Laufwerks-Upgrades transparent planen.',
    hubIntro: 'Wähle ein passendes Tool. Jedes Ergebnis zeigt Methode, Annahmen und Grenzen zur Prüfung vor einem Hardwarekauf.',
    home: 'Startseite', tools: 'Tools', openTool: 'Rechner öffnen', formula: 'Verwendete Formel oder Modell', methodology: 'Berechnungsmethodik',
    methodologyIntro: 'Die Berechnung läuft im Browser. Schätzungen nutzen transparente Regeln und normalisierte Hardwaredaten; sie sind keine Labor-Benchmarks.',
    calculationSteps: 'Berechnungsschritte', limitations: 'Annahmen und Grenzen', resultMeaning: 'Ergebnis richtig einordnen',
    relatedTools: 'Verwandte PC-Tools', relatedDescription: 'Fahre mit dem Rechner für den nächsten Teil derselben Upgrade-Entscheidung fort.',
    viewAllTools: 'Alle PC-Tools ansehen', reviewed: 'Methodik geprüft: 17. Juli 2026', coreHeading: 'Zentrale PCBuildCheck-Rechner',
    categories: {
      upgrade: { title: 'Upgrade-Planung', description: 'Komponenten vergleichen und die wichtigste Aufrüstung finden.' },
      performance: { title: 'Gaming-Leistung und Display', description: 'FPS, Frame Time, Bildrate, Skalierung und Einstellungen verstehen.' },
      memory: { title: 'Speicherplanung', description: 'Grafik- und Arbeitsspeicher für die Nutzung schätzen.' },
      storage: { title: 'Laufwerksplanung', description: 'Speichertypen und Platz für die Spielebibliothek vergleichen.' },
    },
    coreTools: {
      bottleneck: { title: 'PC-Flaschenhals-Rechner', description: 'CPU-GPU-Balance mit dem Hauptmodell vergleichen.' },
      fps: { title: 'Spiele-FPS-Rechner', description: 'Ein grobes FPS-Szenario für Hardware und Spiel schätzen.' },
      psu: { title: 'Netzteil-Watt-Rechner', description: 'Systembedarf und praktischen Netzteil-Spielraum schätzen.' },
    },
  },
  es: {
    hubTitle: 'Calculadoras de PC y herramientas de actualización gratis',
    hubDescription: 'Planifica GPU, CPU, memoria, pantalla, ajustes y almacenamiento con calculadoras transparentes.',
    hubIntro: 'Elige una herramienta específica. Cada resultado muestra método, supuestos y límites para verificarlos antes de comprar.',
    home: 'Inicio', tools: 'Herramientas', openTool: 'Abrir calculadora', formula: 'Fórmula o modelo utilizado', methodology: 'Metodología de cálculo',
    methodologyIntro: 'El cálculo se realiza en el navegador. Las estimaciones usan reglas transparentes y datos normalizados; no son benchmarks de laboratorio.',
    calculationSteps: 'Pasos del cálculo', limitations: 'Supuestos y limitaciones', resultMeaning: 'Cómo interpretar el resultado',
    relatedTools: 'Herramientas de PC relacionadas', relatedDescription: 'Continúa con la calculadora que responde a la siguiente parte de la misma decisión.',
    viewAllTools: 'Ver todas las herramientas PC', reviewed: 'Metodología revisada: 17 de julio de 2026', coreHeading: 'Calculadoras principales de PCBuildCheck',
    categories: {
      upgrade: { title: 'Planificación de actualizaciones', description: 'Compara componentes e identifica la prioridad.' },
      performance: { title: 'Rendimiento y pantalla', description: 'Comprende FPS, tiempo de fotograma, frecuencia, escalado y ajustes.' },
      memory: { title: 'Planificación de memoria', description: 'Estima memoria gráfica y del sistema.' },
      storage: { title: 'Planificación de almacenamiento', description: 'Compara unidades y planifica espacio para juegos.' },
    },
    coreTools: {
      bottleneck: { title: 'Calculadora de cuello de botella', description: 'Compara equilibrio CPU-GPU con el modelo principal.' },
      fps: { title: 'Calculadora de FPS en juegos', description: 'Estima un escenario FPS general para el hardware y juego elegidos.' },
      psu: { title: 'Calculadora de potencia PSU', description: 'Estima demanda y margen práctico de la fuente.' },
    },
  },
};

export function getToolsPageCopy(locale: Locale): ToolsPageCopy {
  return COPY[locale] ?? COPY.en;
}
