import type { Locale } from '@/i18n-config';

export type PsuFaq = { q: string; a: string };

export type PsuPhaseOneCopy = {
  heroSubtitle: string;
  examples: {
    eyebrow: string;
    title: string;
    intro: string;
    build: string;
    publishedPower: string;
    estimatedLoad: string;
    planningSize: string;
    loadCalculator: string;
    note: string;
  };
  decision: {
    eyebrow: string;
    title: string;
    intro: string;
    floorTitle: string;
    floorBody: string;
    recommendedTitle: string;
    recommendedBody: string;
    verifyTitle: string;
    verifyBody: string;
    checks: string[];
  };
  resources: {
    eyebrow: string;
    title: string;
    intro: string;
    guideTitle: string;
    guideDescription: string;
    methodologyTitle: string;
    methodologyDescription: string;
    upgradeTitle: string;
    upgradeDescription: string;
    comparisonTitle: string;
    comparisonDescription: string;
    midrangeBuildTitle: string;
    midrangeBuildDescription: string;
    enthusiastBuildTitle: string;
    enthusiastBuildDescription: string;
    open: string;
  };
  extraFaqs: PsuFaq[];
};

export const PSU_EXAMPLES = [
  { cpuId: 'ryzen-5-5600X', gpuId: 'rtx-4060' },
  { cpuId: 'i5-14600K', gpuId: 'rtx-4070-super' },
  { cpuId: 'ryzen-5-7600X', gpuId: 'rx-7800-XT' },
  { cpuId: 'ryzen-7-9800x3d', gpuId: 'rtx-5080' },
  { cpuId: 'ryzen-9-9950X', gpuId: 'rtx-5090' },
] as const;

const COPY: Record<Locale, PsuPhaseOneCopy> = {
  en: {
    heroSubtitle: 'Select your CPU and GPU to compare estimated component load, recommended PSU capacity, upgrade headroom, and the connector checks to complete before buying.',
    examples: {
      eyebrow: 'Worked examples',
      title: 'What PSU wattage do common PC builds need?',
      intro: 'These examples use the same defaults as the form above: published CPU and GPU power, motherboard baseline, two RAM sticks, one NVMe SSD, three case fans, air cooling, 30% planning headroom, and rounding up to a common PSU size.',
      build: 'Example build', publishedPower: 'CPU + GPU power', estimatedLoad: 'Estimated load', planningSize: 'Planning size', loadCalculator: 'Load in calculator',
      note: 'These are capacity-planning examples, not wall-power measurements or safety certifications. Verify the exact GPU maker and board partner recommendation before purchase.',
    },
    decision: {
      eyebrow: 'Buying decision', title: 'Minimum vs recommended PSU: which number should you buy?',
      intro: 'A calculated threshold and a sensible purchase target answer different questions. Use the recommended common size for shopping, then verify the exact model, cables, and manufacturer guidance.',
      floorTitle: 'Lower-headroom estimate', floorBody: 'This is a calculation boundary with 15% headroom. It is useful for comparison, but it is not our purchase recommendation and leaves less room for uncertainty or upgrades.',
      recommendedTitle: 'Recommended planning size', recommendedBody: 'The calculator applies 30% headroom and rounds upward to a commonly sold capacity. This is the primary capacity to research for your current build.',
      verifyTitle: 'Verify before buying', verifyBody: 'Wattage alone cannot establish compatibility or PSU quality.',
      checks: ['Use the higher value when the GPU maker specifies a larger system PSU.', 'Confirm every required PCIe or 12V-2x6 connector and prefer a native compatible cable.', 'Check independent model-level reviews for protections, voltage regulation, noise, and thermals.'],
    },
    resources: {
      eyebrow: 'Continue planning', title: 'Guides and checks related to PSU sizing', intro: 'Use the wattage result as one part of the build decision. These pages add methodology, upgrade, compatibility, and complete-build context.',
      guideTitle: 'Complete PSU wattage guide', guideDescription: 'Work through headroom, connectors, manufacturer guidance, and five practical build examples.',
      methodologyTitle: 'Power-planning methodology', methodologyDescription: 'Review the site-wide assumptions, formulas, and limitations behind calculator results.',
      upgradeTitle: 'PC Upgrade Priority Calculator', upgradeDescription: 'Decide whether CPU, GPU, RAM, or storage should be upgraded first.',
      comparisonTitle: 'Component Comparison Tool', comparisonDescription: 'Compare two CPUs or GPUs, including published power and platform differences.',
      midrangeBuildTitle: 'Core i5-14600K + RTX 4070 Super build', midrangeBuildDescription: 'Review a high-refresh 1440p build with PSU and connector checks.',
      enthusiastBuildTitle: 'Ryzen 7 9800X3D + RTX 5080 build', enthusiastBuildDescription: 'Review an enthusiast 4K build with power, cooling, and fit considerations.', open: 'Open resource',
    },
    extraFaqs: [
      { q: 'How much PSU headroom should I keep for a future GPU upgrade?', a: 'The calculator shows a 50% headroom scenario as an upgrade-oriented comparison. Do not buy from that percentage alone: estimate the planned GPU, compare its official system-PSU recommendation, and make sure the unit has the required native connectors.' },
      { q: 'Do modern graphics cards require an ATX 3.0 or ATX 3.1 power supply?', a: 'Not every graphics card requires an ATX 3.x unit. For a current high-power GPU, an ATX 3.x PSU can provide more relevant power-excursion and connector support. Follow the exact GPU and PSU documentation instead of assuming the standard from wattage alone.' },
      { q: 'Can a power supply bottleneck gaming performance?', a: 'A PSU does not normally create a classic CPU- or GPU-style performance bottleneck. An undersized, incompatible, or poor-quality unit can instead cause shutdowns, reboots, instability, or failure under load. Diagnose low FPS separately from power-related crashes.' },
      { q: 'Which GPU power connector does my PSU need?', a: 'Check the exact graphics-card model and board-partner manual. Depending on the card, it may require one or more PCIe 8-pin connectors or a native 12V-2x6 cable. Do not assume that two cards with the same GPU use identical connectors.' },
    ],
  },
  it: {
    heroSubtitle: 'Seleziona CPU e GPU per confrontare carico stimato, capacità PSU consigliata, margine per upgrade e verifiche dei connettori prima dell’acquisto.',
    examples: { eyebrow: 'Esempi pratici', title: 'Di quale potenza PSU hanno bisogno le configurazioni comuni?', intro: 'Gli esempi usano gli stessi valori predefiniti del calcolatore: potenza pubblicata di CPU e GPU, base della scheda madre, due moduli RAM, un SSD NVMe, tre ventole, raffreddamento ad aria, margine del 30% e arrotondamento a un taglio comune.', build: 'Configurazione', publishedPower: 'Potenza CPU + GPU', estimatedLoad: 'Carico stimato', planningSize: 'Taglio pianificato', loadCalculator: 'Carica nel calcolatore', note: 'Sono esempi di pianificazione, non misure alla presa o certificazioni di sicurezza. Verifica sempre i requisiti del produttore della GPU.' },
    decision: { eyebrow: 'Decisione di acquisto', title: 'PSU minimo o consigliato: quale valore scegliere?', intro: 'La soglia calcolata e il target di acquisto rispondono a domande diverse. Usa il taglio comune consigliato, poi verifica modello, cavi e indicazioni del produttore.', floorTitle: 'Stima con margine ridotto', floorBody: 'È un limite di confronto con il 15% di margine, non una raccomandazione di acquisto. Lascia meno spazio a incertezza e upgrade.', recommendedTitle: 'Taglio di pianificazione consigliato', recommendedBody: 'Il calcolatore applica il 30% di margine e arrotonda a una capacità comune. È il valore principale da valutare per la configurazione attuale.', verifyTitle: 'Verifica prima dell’acquisto', verifyBody: 'Il solo wattaggio non garantisce compatibilità o qualità.', checks: ['Usa il valore maggiore se il produttore GPU richiede un PSU di sistema più potente.', 'Conferma tutti i connettori PCIe o 12V-2x6 e preferisci un cavo nativo compatibile.', 'Consulta recensioni indipendenti del modello per protezioni, regolazione, rumore e temperature.'] },
    resources: { eyebrow: 'Continua la pianificazione', title: 'Guide e controlli collegati al dimensionamento PSU', intro: 'Il wattaggio è solo una parte della decisione. Queste risorse aggiungono metodologia, upgrade, compatibilità e contesto di configurazione.', guideTitle: 'Guida completa alla potenza PSU', guideDescription: 'Margine, connettori, indicazioni dei produttori e cinque esempi pratici. Disponibile in inglese.', methodologyTitle: 'Metodologia di pianificazione energetica', methodologyDescription: 'Consulta ipotesi, formule e limiti dei risultati.', upgradeTitle: 'Calcolatore priorità upgrade PC', upgradeDescription: 'Decidi se aggiornare prima CPU, GPU, RAM o archiviazione.', comparisonTitle: 'Strumento di confronto componenti', comparisonDescription: 'Confronta due CPU o GPU, inclusi consumi pubblicati e piattaforma.', midrangeBuildTitle: 'Build Core i5-14600K + RTX 4070 Super', midrangeBuildDescription: 'Analisi 1440p con controlli PSU e connettori.', enthusiastBuildTitle: 'Build Ryzen 7 9800X3D + RTX 5080', enthusiastBuildDescription: 'Analisi 4K con potenza, raffreddamento e ingombri.', open: 'Apri risorsa' },
    extraFaqs: [
      { q: 'Quanto margine PSU serve per un futuro upgrade della GPU?', a: 'Il calcolatore mostra uno scenario con margine del 50% come confronto orientato agli upgrade. Stima però la GPU prevista, verifica il requisito ufficiale del PSU di sistema e controlla i connettori nativi.' },
      { q: 'Le GPU moderne richiedono un alimentatore ATX 3.0 o 3.1?', a: 'Non tutte. Per una GPU moderna ad alto consumo, un PSU ATX 3.x può offrire supporto più pertinente per escursioni di potenza e connettori. Segui la documentazione dei modelli esatti.' },
      { q: 'Un alimentatore può creare un bottleneck nei giochi?', a: 'Normalmente non crea un limite prestazionale come CPU o GPU. Un’unità insufficiente o scadente può invece causare spegnimenti, riavvii o instabilità sotto carico.' },
      { q: 'Quale connettore GPU deve avere il PSU?', a: 'Controlla il modello esatto e il manuale del produttore. Può richiedere uno o più PCIe 8-pin oppure un cavo 12V-2x6 nativo; schede con la stessa GPU possono differire.' },
    ],
  },
  fr: {
    heroSubtitle: 'Sélectionnez le CPU et le GPU pour comparer la charge estimée, la capacité PSU conseillée, la marge d’évolution et les connecteurs à vérifier avant l’achat.',
    examples: { eyebrow: 'Exemples calculés', title: 'Quelle puissance PSU pour des configurations PC courantes ?', intro: 'Ces exemples utilisent les mêmes valeurs par défaut : puissances du CPU et du GPU, base de la carte mère, deux barrettes RAM, un SSD NVMe, trois ventilateurs, refroidissement à air, marge de 30% et arrondi au palier supérieur.', build: 'Configuration', publishedPower: 'Puissance CPU + GPU', estimatedLoad: 'Charge estimée', planningSize: 'Palier conseillé', loadCalculator: 'Charger dans le calculateur', note: 'Ce sont des exemples de planification, pas des mesures à la prise ni des certifications. Vérifiez les recommandations du fabricant de la carte graphique.' },
    decision: { eyebrow: 'Décision d’achat', title: 'PSU minimum ou recommandé : quel chiffre choisir ?', intro: 'Le seuil calculé et la cible d’achat répondent à deux questions différentes. Utilisez le palier courant recommandé, puis vérifiez le modèle, les câbles et les consignes du fabricant.', floorTitle: 'Estimation à faible marge', floorBody: 'Cette limite avec 15% de marge sert à comparer. Ce n’est pas une recommandation d’achat et elle laisse moins de place aux incertitudes et évolutions.', recommendedTitle: 'Palier de planification recommandé', recommendedBody: 'Le calculateur applique 30% de marge et arrondit à une capacité courante. C’est la valeur principale à étudier pour la configuration actuelle.', verifyTitle: 'Vérifier avant l’achat', verifyBody: 'La puissance seule ne garantit ni compatibilité ni qualité.', checks: ['Retenez la valeur supérieure si le fabricant du GPU exige davantage.', 'Vérifiez tous les connecteurs PCIe ou 12V-2x6 et préférez un câble natif compatible.', 'Consultez des tests indépendants du modèle pour les protections, la régulation, le bruit et les températures.'] },
    resources: { eyebrow: 'Poursuivre la planification', title: 'Guides et vérifications liés au dimensionnement PSU', intro: 'Le wattage n’est qu’une partie de la décision. Ces ressources ajoutent méthodologie, évolution, compatibilité et contexte de configuration.', guideTitle: 'Guide complet de puissance PSU', guideDescription: 'Marge, connecteurs, recommandations constructeur et cinq exemples. Disponible en anglais.', methodologyTitle: 'Méthodologie de planification électrique', methodologyDescription: 'Consultez les hypothèses, formules et limites des résultats.', upgradeTitle: 'Calculateur de priorité de mise à niveau', upgradeDescription: 'Déterminez si le CPU, le GPU, la RAM ou le stockage doit évoluer en premier.', comparisonTitle: 'Comparateur de composants', comparisonDescription: 'Comparez deux CPU ou GPU avec puissance publiée et différences de plateforme.', midrangeBuildTitle: 'Configuration Core i5-14600K + RTX 4070 Super', midrangeBuildDescription: 'Analyse 1440p avec contrôles PSU et connecteurs.', enthusiastBuildTitle: 'Configuration Ryzen 7 9800X3D + RTX 5080', enthusiastBuildDescription: 'Analyse 4K avec puissance, refroidissement et encombrement.', open: 'Ouvrir la ressource' },
    extraFaqs: [
      { q: 'Quelle marge PSU conserver pour une future mise à niveau du GPU ?', a: 'Le scénario à 50% sert de comparaison orientée évolution. Estimez toutefois le futur GPU, vérifiez la recommandation officielle de puissance système et les connecteurs natifs requis.' },
      { q: 'Les cartes graphiques modernes exigent-elles un PSU ATX 3.0 ou 3.1 ?', a: 'Pas toutes. Pour un GPU moderne puissant, un PSU ATX 3.x peut offrir une prise en charge plus adaptée des excursions de puissance et des connecteurs. Suivez la documentation des modèles exacts.' },
      { q: 'Une alimentation peut-elle limiter les performances en jeu ?', a: 'Elle ne crée normalement pas un bottleneck classique comme le CPU ou le GPU. Une unité insuffisante ou médiocre peut plutôt provoquer arrêts, redémarrages et instabilité en charge.' },
      { q: 'Quel connecteur GPU mon PSU doit-il fournir ?', a: 'Vérifiez le modèle exact de la carte et son manuel. Il peut demander un ou plusieurs connecteurs PCIe 8 broches ou un câble 12V-2x6 natif; deux cartes utilisant le même GPU peuvent différer.' },
    ],
  },
  de: {
    heroSubtitle: 'Wählen Sie CPU und GPU, um geschätzte Komponentenlast, empfohlene Netzteilkapazität, Upgrade-Reserve und die vor dem Kauf nötigen Anschlussprüfungen zu vergleichen.',
    examples: { eyebrow: 'Berechnete Beispiele', title: 'Welche Netzteilleistung benötigen typische PC-Builds?', intro: 'Die Beispiele verwenden dieselben Standardwerte: CPU- und GPU-Leistung, Mainboardbasis, zwei RAM-Module, eine NVMe-SSD, drei Lüfter, Luftkühlung, 30% Planungsspielraum und Aufrundung auf eine übliche Größe.', build: 'Beispiel-Build', publishedPower: 'CPU- + GPU-Leistung', estimatedLoad: 'Geschätzte Last', planningSize: 'Planungsgröße', loadCalculator: 'Im Rechner laden', note: 'Dies sind Planungsbeispiele, keine Messungen an der Steckdose oder Sicherheitszertifizierungen. Prüfen Sie die genaue Herstellerempfehlung der Grafikkarte.' },
    decision: { eyebrow: 'Kaufentscheidung', title: 'Minimales oder empfohlenes Netzteil: Welcher Wert zählt?', intro: 'Berechnete Schwelle und sinnvolles Kaufziel beantworten verschiedene Fragen. Nutzen Sie die empfohlene übliche Größe und prüfen Sie anschließend Modell, Kabel und Herstellerangaben.', floorTitle: 'Schätzung mit geringer Reserve', floorBody: 'Diese Grenze mit 15% Reserve dient dem Vergleich. Sie ist keine Kaufempfehlung und lässt weniger Raum für Unsicherheit und Upgrades.', recommendedTitle: 'Empfohlene Planungsgröße', recommendedBody: 'Der Rechner verwendet 30% Reserve und rundet auf eine übliche Kapazität auf. Dies ist der wichtigste Wert für den aktuellen Build.', verifyTitle: 'Vor dem Kauf prüfen', verifyBody: 'Watt allein garantiert weder Kompatibilität noch Qualität.', checks: ['Den höheren Wert verwenden, wenn der GPU-Hersteller ein größeres Systemnetzteil verlangt.', 'Alle PCIe- oder 12V-2x6-Anschlüsse bestätigen und ein natives kompatibles Kabel bevorzugen.', 'Unabhängige Modelltests zu Schutzschaltungen, Spannungsregelung, Lautstärke und Temperatur lesen.'] },
    resources: { eyebrow: 'Planung fortsetzen', title: 'Leitfäden und Prüfungen zur Netzteildimensionierung', intro: 'Die Wattzahl ist nur ein Teil der Entscheidung. Diese Seiten ergänzen Methodik, Upgrade-, Kompatibilitäts- und Build-Kontext.', guideTitle: 'Vollständiger Netzteil-Wattleitfaden', guideDescription: 'Reserve, Anschlüsse, Herstellerangaben und fünf Beispiele. Auf Englisch verfügbar.', methodologyTitle: 'Methodik der Leistungsplanung', methodologyDescription: 'Annahmen, Formeln und Grenzen der Rechnerergebnisse prüfen.', upgradeTitle: 'PC-Upgrade-Prioritätsrechner', upgradeDescription: 'Ermitteln, ob CPU, GPU, RAM oder Speicher zuerst aufgerüstet werden sollte.', comparisonTitle: 'Komponentenvergleich', comparisonDescription: 'Zwei CPUs oder GPUs samt veröffentlichter Leistung und Plattform vergleichen.', midrangeBuildTitle: 'Core i5-14600K + RTX 4070 Super Build', midrangeBuildDescription: '1440p-Analyse mit Netzteil- und Anschlussprüfung.', enthusiastBuildTitle: 'Ryzen 7 9800X3D + RTX 5080 Build', enthusiastBuildDescription: '4K-Analyse mit Leistung, Kühlung und Platzbedarf.', open: 'Ressource öffnen' },
    extraFaqs: [
      { q: 'Wie viel Netzteilreserve brauche ich für ein späteres GPU-Upgrade?', a: 'Das 50%-Szenario dient als upgradeorientierter Vergleich. Schätzen Sie dennoch die geplante GPU, prüfen Sie deren offizielle Systemnetzteil-Empfehlung und die benötigten nativen Anschlüsse.' },
      { q: 'Benötigen moderne Grafikkarten ein ATX-3.0- oder ATX-3.1-Netzteil?', a: 'Nicht jede Karte. Bei einer aktuellen leistungsstarken GPU kann ATX 3.x passendere Unterstützung für Leistungsspitzen und Anschlüsse bieten. Maßgeblich ist die Dokumentation der exakten Modelle.' },
      { q: 'Kann ein Netzteil die Spieleleistung begrenzen?', a: 'Normalerweise entsteht kein klassischer CPU- oder GPU-Engpass. Ein zu kleines, inkompatibles oder schlechtes Netzteil kann stattdessen Abschaltungen, Neustarts und Instabilität unter Last verursachen.' },
      { q: 'Welchen GPU-Stromanschluss muss mein Netzteil haben?', a: 'Prüfen Sie das exakte Grafikkartenmodell und dessen Handbuch. Erforderlich sein können ein oder mehrere PCIe-8-Pin-Anschlüsse oder ein natives 12V-2x6-Kabel.' },
    ],
  },
  es: {
    heroSubtitle: 'Selecciona CPU y GPU para comparar carga estimada, capacidad PSU recomendada, margen de actualización y conectores que debes verificar antes de comprar.',
    examples: { eyebrow: 'Ejemplos calculados', title: '¿Qué potencia de PSU necesitan configuraciones comunes?', intro: 'Los ejemplos usan los mismos valores predeterminados: potencia de CPU y GPU, base de placa, dos módulos RAM, un SSD NVMe, tres ventiladores, refrigeración por aire, 30% de margen y redondeo al tamaño habitual superior.', build: 'Configuración', publishedPower: 'Potencia CPU + GPU', estimatedLoad: 'Carga estimada', planningSize: 'Tamaño recomendado', loadCalculator: 'Cargar en calculadora', note: 'Son ejemplos de planificación, no mediciones en la pared ni certificaciones. Verifica la recomendación exacta del fabricante de la GPU.' },
    decision: { eyebrow: 'Decisión de compra', title: 'PSU mínima o recomendada: ¿qué cifra debes comprar?', intro: 'El umbral calculado y el objetivo de compra responden preguntas distintas. Usa el tamaño habitual recomendado y después verifica modelo, cables y fabricante.', floorTitle: 'Estimación con margen reducido', floorBody: 'Este límite con 15% de margen sirve para comparar. No es una recomendación de compra y deja menos espacio para incertidumbre o mejoras.', recommendedTitle: 'Tamaño de planificación recomendado', recommendedBody: 'La calculadora aplica 30% de margen y redondea a una capacidad habitual. Es el valor principal que debes investigar para el equipo actual.', verifyTitle: 'Verifica antes de comprar', verifyBody: 'La potencia por sí sola no garantiza compatibilidad ni calidad.', checks: ['Usa el valor superior si el fabricante de la GPU exige una fuente mayor.', 'Confirma todos los conectores PCIe o 12V-2x6 y prefiere un cable nativo compatible.', 'Consulta análisis independientes del modelo sobre protecciones, regulación, ruido y temperatura.'] },
    resources: { eyebrow: 'Continúa la planificación', title: 'Guías y comprobaciones relacionadas con la PSU', intro: 'La potencia es solo una parte de la decisión. Estas páginas añaden metodología, mejoras, compatibilidad y contexto de configuraciones completas.', guideTitle: 'Guía completa de potencia PSU', guideDescription: 'Margen, conectores, recomendaciones del fabricante y cinco ejemplos. Disponible en inglés.', methodologyTitle: 'Metodología de planificación eléctrica', methodologyDescription: 'Revisa supuestos, fórmulas y limitaciones de los resultados.', upgradeTitle: 'Calculadora de prioridad de actualización', upgradeDescription: 'Decide si actualizar primero CPU, GPU, RAM o almacenamiento.', comparisonTitle: 'Comparador de componentes', comparisonDescription: 'Compara dos CPU o GPU, incluida la potencia publicada y la plataforma.', midrangeBuildTitle: 'Equipo Core i5-14600K + RTX 4070 Super', midrangeBuildDescription: 'Análisis 1440p con comprobaciones de PSU y conectores.', enthusiastBuildTitle: 'Equipo Ryzen 7 9800X3D + RTX 5080', enthusiastBuildDescription: 'Análisis 4K con potencia, refrigeración y espacio.', open: 'Abrir recurso' },
    extraFaqs: [
      { q: '¿Cuánto margen de PSU necesito para una futura actualización de GPU?', a: 'El escenario del 50% sirve como comparación orientada a mejoras. Calcula también la GPU prevista, consulta su recomendación oficial de fuente del sistema y confirma los conectores nativos.' },
      { q: '¿Las GPU modernas necesitan una fuente ATX 3.0 o ATX 3.1?', a: 'No todas. Para una GPU moderna de alto consumo, ATX 3.x puede ofrecer soporte más adecuado para excursiones de potencia y conectores. Sigue la documentación de los modelos exactos.' },
      { q: '¿Una fuente de alimentación puede limitar el rendimiento gaming?', a: 'Normalmente no crea un cuello de botella clásico como CPU o GPU. Una unidad insuficiente o de mala calidad puede causar apagados, reinicios e inestabilidad bajo carga.' },
      { q: '¿Qué conector de GPU necesita mi PSU?', a: 'Consulta el modelo exacto de la tarjeta y su manual. Puede necesitar uno o varios conectores PCIe de 8 pines o un cable 12V-2x6 nativo; dos tarjetas con la misma GPU pueden diferir.' },
    ],
  },
  ru: {
    heroSubtitle: 'Выберите CPU и GPU, чтобы сравнить расчётную нагрузку, рекомендуемую мощность PSU, запас для обновления и разъёмы, которые нужно проверить перед покупкой.',
    examples: { eyebrow: 'Расчётные примеры', title: 'Какая мощность PSU нужна типичным сборкам ПК?', intro: 'Примеры используют те же значения по умолчанию: мощность CPU и GPU, базовую нагрузку платы, два модуля RAM, один NVMe SSD, три вентилятора, воздушное охлаждение, запас 30% и округление до распространённой мощности.', build: 'Пример сборки', publishedPower: 'Мощность CPU + GPU', estimatedLoad: 'Расчётная нагрузка', planningSize: 'Плановая мощность', loadCalculator: 'Загрузить в калькулятор', note: 'Это примеры планирования, а не измерения из розетки или сертификаты безопасности. Проверьте точную рекомендацию производителя видеокарты.' },
    decision: { eyebrow: 'Решение о покупке', title: 'Минимальный или рекомендуемый PSU: какое значение выбрать?', intro: 'Расчётный порог и разумная цель покупки отвечают на разные вопросы. Ориентируйтесь на рекомендуемую стандартную мощность, затем проверьте модель, кабели и требования производителя.', floorTitle: 'Оценка с малым запасом', floorBody: 'Граница с запасом 15% полезна для сравнения, но не является рекомендацией к покупке и оставляет меньше места для неопределённости и обновлений.', recommendedTitle: 'Рекомендуемая плановая мощность', recommendedBody: 'Калькулятор добавляет 30% и округляет вверх до распространённой мощности. Это основной показатель для текущей сборки.', verifyTitle: 'Проверьте перед покупкой', verifyBody: 'Одна лишь мощность не гарантирует совместимость и качество.', checks: ['Используйте большее значение, если производитель GPU требует более мощный системный PSU.', 'Проверьте все разъёмы PCIe или 12V-2x6 и предпочитайте совместимый штатный кабель.', 'Изучите независимые обзоры конкретной модели: защиты, напряжения, шум и температуры.'] },
    resources: { eyebrow: 'Продолжить планирование', title: 'Руководства и проверки по выбору PSU', intro: 'Мощность — лишь одна часть решения. Эти материалы добавляют методику, контекст обновления, совместимости и готовых сборок.', guideTitle: 'Полное руководство по мощности PSU', guideDescription: 'Запас, разъёмы, рекомендации производителей и пять примеров. Доступно на английском.', methodologyTitle: 'Методика расчёта мощности', methodologyDescription: 'Изучите предположения, формулы и ограничения результатов.', upgradeTitle: 'Калькулятор приоритета обновления ПК', upgradeDescription: 'Определите, что обновлять первым: CPU, GPU, RAM или накопитель.', comparisonTitle: 'Сравнение компонентов', comparisonDescription: 'Сравните два CPU или GPU, включая опубликованную мощность и платформу.', midrangeBuildTitle: 'Сборка Core i5-14600K + RTX 4070 Super', midrangeBuildDescription: 'Анализ 1440p с проверкой PSU и разъёмов.', enthusiastBuildTitle: 'Сборка Ryzen 7 9800X3D + RTX 5080', enthusiastBuildDescription: 'Анализ 4K с учётом питания, охлаждения и размеров.', open: 'Открыть материал' },
    extraFaqs: [
      { q: 'Какой запас PSU нужен для будущего обновления GPU?', a: 'Сценарий с запасом 50% служит ориентиром для обновления. Также оцените планируемую GPU, проверьте официальную рекомендацию системного PSU и необходимые штатные разъёмы.' },
      { q: 'Нужен ли современным видеокартам блок питания ATX 3.0 или ATX 3.1?', a: 'Не всем. Для современной мощной GPU ATX 3.x может лучше поддерживать кратковременные нагрузки и новые разъёмы. Следуйте документации точных моделей GPU и PSU.' },
      { q: 'Может ли блок питания ограничивать игровую производительность?', a: 'Обычно он не создаёт классическое узкое место CPU или GPU. Недостаточный или некачественный PSU может вместо этого вызывать отключения, перезагрузки и нестабильность под нагрузкой.' },
      { q: 'Какой разъём питания GPU должен быть у PSU?', a: 'Проверьте точную модель видеокарты и её руководство. Может потребоваться один или несколько PCIe 8-pin либо штатный кабель 12V-2x6; карты на одном GPU могут различаться.' },
    ],
  },
};

export function getPsuPhaseOneCopy(lang: Locale): PsuPhaseOneCopy {
  return COPY[lang] ?? COPY.en;
}

export function getPsuPhaseOneFaqs(lang: Locale, baseFaqs: PsuFaq[]): PsuFaq[] {
  return [...baseFaqs, ...getPsuPhaseOneCopy(lang).extraFaqs];
}
