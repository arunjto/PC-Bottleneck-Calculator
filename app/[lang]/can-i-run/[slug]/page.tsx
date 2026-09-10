import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, CircleGauge, Cpu, ExternalLink, Gamepad2, Gauge, HardDrive, ListChecks, MemoryStick, Monitor, Settings2, ShieldCheck, TriangleAlert, Zap, type LucideIcon } from 'lucide-react';
import { i18n, type Locale } from '@/i18n-config';
import { JsonLd } from '@/components/seo/json-ld';
import {
  GAME_GUIDE_SLUGS,
  getCanIRunHubCopy,
  getGameGuideCopy,
  isGameGuideSlug,
  type GameGuideSlug,
} from '@/lib/can-i-run';
import { getGameGuideDefinition, type GameGuideDefinition, type RequirementValues } from '@/lib/game-guides';
import { estimateFPSWithBreakdown } from '@/lib/fps-model';
import { serializeFPSShareConfig } from '@/lib/fps-share';
import { allCPUs, allGPUs, allGames } from '@/lib/hardware-database';
import { getLocalizedPath } from '@/lib/path-translations';
import { constructMetadataAlternates } from '@/lib/seo';
import { createBreadcrumbSchema, createFaqSchema, createSchemaGraph, createWebPageSchema, SITE_URL } from '@/lib/structured-data';
import { getSiteChromeCopy } from '@/lib/site-i18n';

type PageParams = { lang: Locale; slug: string };

type GameInsight = {
  positioning: string;
  cpuNote: string;
  gpuNote: string;
  memoryNote: string;
  testScene: string;
  upgradeNote: string;
};

const GAME_INSIGHTS: Record<GameGuideSlug, GameInsight> = {
  'cyberpunk-2077': {
    positioning: 'A demanding open-world test where crowd density, ray tracing and streaming make frame-time consistency as important as the headline FPS.',
    cpuNote: 'Dense Night City areas and high crowd density can expose CPU limits, especially when targeting a high-refresh 1080p display.',
    gpuNote: 'Resolution, ray tracing and volumetric effects quickly increase GPU and VRAM pressure. Upscaling is a tuning control, not a quality failure.',
    memoryNote: 'The 12 GB minimum is a real floor for the current version; 16 GB and an SSD leave more room for Windows, patches and background apps.',
    testScene: 'Repeat a busy city route with the same crowd, ray-tracing and upscaling settings.',
    upgradeNote: 'Upgrade only after you identify whether the GPU is near full utilisation or the CPU is limiting frame time in your target scene.',
  },
  'forza-horizon-5': {
    positioning: 'A scalable racing game: open-world streaming and weather can shift the practical limit between CPU consistency and GPU rendering load.',
    cpuNote: 'Busy races, traffic and world streaming can make CPU frame time important at 1080p and high refresh rates.',
    gpuNote: 'Higher resolution, anti-aliasing, shadows and environmental detail raise GPU demand; 1440p is often a useful quality/performance balance.',
    memoryNote: 'The 8 GB official minimum is a launch baseline. Keep extra RAM and free disk space for Windows, the large install and updates.',
    testScene: 'Use the same race, weather preset and camera view so traffic and scene complexity stay comparable.',
    upgradeNote: 'A GPU upgrade helps most when GPU utilisation stays high at the target resolution; a CPU upgrade helps when frame time spikes during races.',
  },
  'apex-legends': {
    positioning: 'A competitive shooter where stable frame times and 1% lows matter more than a single peak FPS reading.',
    cpuNote: 'High-refresh 1080p play can become CPU-limited; background processes and inconsistent frame time are easy to feel during fights.',
    gpuNote: 'The GPU handles resolution and visual quality. Lowering visual effects can create headroom, but it cannot fix a processor-side limit.',
    memoryNote: 'The official 6 GB minimum can launch the game, while 8 GB or more gives Windows and the game safer headroom during a session.',
    testScene: 'Compare the same firing-range movement and one repeatable combat route at your intended frame-rate cap.',
    upgradeNote: 'For competitive play, prioritise the component that limits 1% lows—not the one that produces the highest uncapped average.',
  },
  'counter-strike-2': {
    positioning: 'A CPU-sensitive competitive FPS where latency, frame pacing and a stable high refresh rate are more useful goals than cinematic settings.',
    cpuNote: 'Smoke, player counts, physics and high frame-rate targets can expose CPU and memory limits even when the game launches easily.',
    gpuNote: 'The official GPU floor is modest, but higher resolution and visual effects still affect the GPU when you target a high refresh display.',
    memoryNote: 'Valve publishes an 8 GB minimum and no recommended tier. Keep background applications closed and judge the result from 1% lows.',
    testScene: 'Use the same workshop benchmark or practice route with identical launch options and a fixed frame-rate target.',
    upgradeNote: 'If GPU utilisation is low while frame time is inconsistent, investigate CPU, memory, thermals and background load before buying a graphics card.',
  },
  fortnite: {
    positioning: 'Fortnite can represent several workloads: Performance Mode, DX11/DX12, Nanite and Lumen produce very different results on the same hardware.',
    cpuNote: 'Large fights, view distance and high object counts can make CPU frame time the limit, particularly at 1080p.',
    gpuNote: 'Nanite, Lumen, shadows and higher resolution shift more work to the GPU. Performance Mode is a different target, not a direct quality equivalent.',
    memoryNote: 'Epic lists 8 GB minimum and 16 GB or higher for recommended play; an NVMe SSD helps with asset streaming and update headroom.',
    testScene: 'Test the same island or replay with the same rendering mode, view distance, frame cap and effects.',
    upgradeNote: 'Choose the upgrade around your mode: competitive Performance Mode may prefer CPU consistency, while Nanite/Lumen benefits from GPU and VRAM headroom.',
  },
  'elden-ring': {
    positioning: 'A demanding action RPG with an official 60 FPS cap, so stable frame pacing and avoiding stutter matter more than chasing an uncapped average.',
    cpuNote: 'Traversal, streaming and complex encounters can create short CPU-side frame-time spikes even when the average looks healthy.',
    gpuNote: 'Resolution, shadows and effects increase GPU load; stay within the game’s frame-rate behaviour before treating a higher average as useful.',
    memoryNote: 'The official floor is 12 GB RAM and 60 GB storage. 16 GB gives Windows and background services more breathing room.',
    testScene: 'Repeat a traversal route and one demanding encounter at the same resolution, preset and frame cap.',
    upgradeNote: 'Look for repeatable frame-time problems first; a faster GPU cannot remove a cap or fix a CPU/streaming spike by itself.',
  },
};

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) => GAME_GUIDE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isGameGuideSlug(slug)) return {};
  const copy = getGameGuideCopy(lang, slug);
  const alternates = constructMetadataAlternates(lang, `/can-i-run/${slug}`);
  return {
    title: copy.title,
    description: copy.description,
    alternates,
    openGraph: { type: 'article', title: copy.title, description: copy.description, url: alternates.canonical },
  };
}

function getExampleRows(gameId: string) {
  const cpu = allCPUs.find((item) => item.id === 'ryzen-5-5600X');
  const gpu = allGPUs.find((item) => item.id === 'rtx-4070');
  const game = allGames.find((item) => item.id === gameId);
  if (!cpu || !gpu || !game) return [];
  return ['1080p', '1440p', '4K'].map((resolution) => ({
    resolution,
    result: estimateFPSWithBreakdown(cpu, gpu, game, {
      resolution,
      quality: 'high',
      upscaling: 'off',
      antiAliasing: 'fxaa',
      ramGB: 16,
      ramSpeedMT: 3200,
      storage: 'nvme-ssd',
    }).estimate,
  }));
}

function RequirementCard({
  title,
  requirements,
  labels,
}: {
  title: string;
  requirements: RequirementValues;
  labels: ReturnType<typeof getGameGuideCopy>['requirementLabels'];
}) {
  const rows: Array<[keyof typeof requirements, string]> = [
    ['target', labels.target], ['os', labels.os], ['cpu', labels.cpu], ['gpu', labels.gpu],
    ['vram', labels.vram], ['ram', labels.ram], ['storage', labels.storage],
  ];
  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <h3 className="border-b bg-muted/50 px-5 py-4 text-xl font-bold">{title}</h3>
      <dl className="divide-y">
        {rows.map(([key, label]) => (
          <div key={key} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="text-sm font-semibold">{label}</dt>
            <dd className="text-sm leading-6 text-muted-foreground">{requirements[key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function demandScore(value: string | undefined) {
  const normalized = value?.toLowerCase() ?? '';
  if (normalized.includes('extreme') || normalized.includes('extrême') || normalized.includes('extrem') || normalized.includes('extremo') || normalized.includes('экстрем') || normalized.includes('ultra')) return 90;
  if (normalized.includes('high') || normalized.includes('alto') || normalized.includes('élevé') || normalized.includes('hoch') || normalized.includes('высок')) return 75;
  if (normalized.includes('medium') || normalized.includes('medio') || normalized.includes('moyen') || normalized.includes('mittel') || normalized.includes('сред')) return 55;
  if (normalized.includes('low') || normalized.includes('basso') || normalized.includes('faible') || normalized.includes('niedrig') || normalized.includes('bajo') || normalized.includes('низ')) return 35;
  return 50;
}

function localizeDemandValue(locale: Locale, value: string | undefined) {
  if (!value || locale === 'en') return value ?? 'Modelled';
  const translations: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
    it: { Low: 'Basso', Medium: 'Medio', High: 'Alto', Extreme: 'Estremo' },
    fr: { Low: 'Faible', Medium: 'Moyen', High: 'Élevé', Extreme: 'Extrême' },
    de: { Low: 'Niedrig', Medium: 'Mittel', High: 'Hoch', Extreme: 'Extrem' },
    es: { Low: 'Bajo', Medium: 'Medio', High: 'Alto', Extreme: 'Extremo' },
    ru: { Low: 'Низкая', Medium: 'Средняя', High: 'Высокая', Extreme: 'Экстремальная' },
  };
  return translations[locale][value] ?? value;
}

function localizeTargetValue(locale: Locale, value: string) {
  if (locale === 'en') return value;
  const translations: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
    it: { 'Official minimum tier': 'Livello minimo ufficiale', 'Official recommended tier': 'Livello consigliato ufficiale', 'Official Windows minimum tier': 'Livello minimo Windows ufficiale' },
    fr: { 'Official minimum tier': 'Palier minimal officiel', 'Official recommended tier': 'Palier recommandé officiel', 'Official Windows minimum tier': 'Palier Windows minimal officiel' },
    de: { 'Official minimum tier': 'Offizielle Mindeststufe', 'Official recommended tier': 'Offizielle empfohlene Stufe', 'Official Windows minimum tier': 'Offizielle Windows-Mindeststufe' },
    es: { 'Official minimum tier': 'Nivel mínimo oficial', 'Official recommended tier': 'Nivel recomendado oficial', 'Official Windows minimum tier': 'Nivel mínimo oficial de Windows' },
    ru: { 'Official minimum tier': 'Официальный минимальный уровень', 'Official recommended tier': 'Официальный рекомендуемый уровень', 'Official Windows minimum tier': 'Официальный минимальный уровень Windows' },
  };
  return translations[locale][value] ?? value;
}

function DemandSignal({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: LucideIcon }) {
  const score = demandScore(value);
  return (
    <article className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold"><Icon className="h-5 w-5 text-primary" aria-hidden="true" />{label}</span>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">{value || 'Modelled'}</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500" style={{ width: `${score}%` }} /></div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p>
    </article>
  );
}

type RichPageCopy = {
  snapshotEyebrow: string; snapshotTitle: string; officialBadge: string; statLabels: [string, string, string, string];
  workloadEyebrow: string; workloadTitle: string; workloadIntro: string; demandLabels: [string, string, string];
  answerPathTitle: string; answerPathIntro: string; steps: Array<{ title: string; body: string; link: string }>;
  rangeEyebrow: string; rangeTitle: string; rangeBody: string; rangeLabels: [string, string, string]; rangeValues: [string, string, string];
  testEyebrow: string; testTitle: string; testBullets: [string, string, string];
  relatedTitle: string; relatedCards: Array<{ title: string; body: string }>; methodologyLink: string;
};

const RICH_PAGE_COPY: Record<Locale, RichPageCopy> = {
  en: {
    snapshotEyebrow: 'Build snapshot', snapshotTitle: 'The numbers that answer the first question', officialBadge: 'Official requirements', statLabels: ['Minimum RAM', 'Minimum GPU', 'Storage', 'Publisher target'],
    workloadEyebrow: 'Planning profile', workloadTitle: 'What will matter most on your PC?', workloadIntro: 'These bars are model signals, not publisher benchmarks. They explain why the same requirements can feel different at 1080p, 1440p and 4K.', demandLabels: ['CPU workload', 'GPU workload', 'Memory & storage'],
    answerPathTitle: 'How to get a trustworthy answer', answerPathIntro: 'A useful “Can I run it?” answer has three layers. Follow them in order so a green minimum check does not get mistaken for a guaranteed FPS result.', steps: [
      { title: 'Check the official floor', body: 'Compare your operating system, CPU, GPU, RAM and storage with the source-backed table below.', link: 'Read requirements' },
      { title: 'Model your target', body: 'Use resolution, quality, RAM and refresh-rate settings that match how you actually play.', link: 'Open FPS calculator' },
      { title: 'Validate and compare', body: 'Repeat the same scene, then compare a possible CPU or GPU change before spending money.', link: 'Compare components' },
    ],
    rangeEyebrow: 'Read the range', rangeTitle: 'Average FPS is only one part of the answer', rangeBody: 'The lower end of the range is a planning guardrail. The 1% low helps explain stutter and uneven delivery, while the likely-limit column tells you which component to investigate first.', rangeLabels: ['Low', '1% low', 'Limit'], rangeValues: ['Busy moments', 'Frame pacing', 'What to tune'],
    testEyebrow: 'Test recipe', testTitle: 'Make your result repeatable', testBullets: ['Use the same resolution, preset, upscaling and frame cap.', 'Capture average FPS, 1% lows, temperatures and utilisation.', 'Change one setting at a time and keep the comparison fair.'],
    relatedTitle: 'Continue with the right PCBuildCheck tool', relatedCards: [{ title: 'FPS Calculator', body: 'Swap in your exact CPU, GPU, resolution and settings for a personalized range.' }, { title: 'Component Comparison', body: 'Compare a possible CPU or GPU upgrade before you spend money.' }, { title: 'What Games Can My PC Run?', body: 'Start with your existing hardware and discover other supported games.' }], methodologyLink: 'Read how the planning model works',
  },
  it: {
    snapshotEyebrow: 'Riepilogo della configurazione', snapshotTitle: 'I numeri che rispondono alla prima domanda', officialBadge: 'Requisiti ufficiali', statLabels: ['RAM minima', 'GPU minima', 'Archiviazione', 'Obiettivo editore'],
    workloadEyebrow: 'Profilo di pianificazione', workloadTitle: 'Cosa conterà di più sul tuo PC?', workloadIntro: 'Queste barre sono segnali del modello, non benchmark dell’editore. Spiegano perché gli stessi requisiti possono comportarsi diversamente a 1080p, 1440p e 4K.', demandLabels: ['Carico CPU', 'Carico GPU', 'Memoria e archiviazione'],
    answerPathTitle: 'Come ottenere una risposta affidabile', answerPathIntro: 'Una risposta utile a “posso eseguirlo?” ha tre livelli. Seguili in ordine per non confondere il controllo minimo con una garanzia di FPS.', steps: [
      { title: 'Controlla il requisito minimo', body: 'Confronta sistema operativo, CPU, GPU, RAM e archiviazione con la tabella verificata qui sotto.', link: 'Leggi i requisiti' },
      { title: 'Modella il tuo obiettivo', body: 'Scegli risoluzione, qualità, RAM e refresh coerenti con il modo in cui giochi davvero.', link: 'Apri il calcolatore FPS' },
      { title: 'Verifica e confronta', body: 'Ripeti la stessa scena, poi confronta un possibile cambio di CPU o GPU prima di spendere.', link: 'Confronta i componenti' },
    ],
    rangeEyebrow: 'Leggi l’intervallo', rangeTitle: 'Gli FPS medi sono solo una parte della risposta', rangeBody: 'Il limite inferiore è una protezione di pianificazione. L’1% low aiuta a capire scatti e irregolarità; la colonna del limite indica quale componente analizzare per primo.', rangeLabels: ['Basso', '1% low', 'Limite'], rangeValues: ['Momenti impegnativi', 'Fluidità dei frame', 'Cosa regolare'],
    testEyebrow: 'Ricetta di test', testTitle: 'Rendi il risultato ripetibile', testBullets: ['Usa la stessa risoluzione, preset, upscaling e limite FPS.', 'Registra FPS medi, 1% low, temperature e utilizzo.', 'Cambia un’impostazione alla volta per un confronto corretto.'],
    relatedTitle: 'Continua con lo strumento PCBuildCheck giusto', relatedCards: [{ title: 'Calcolatore FPS', body: 'Inserisci CPU, GPU, risoluzione e impostazioni per una stima personalizzata.' }, { title: 'Confronto componenti', body: 'Confronta un possibile upgrade di CPU o GPU prima di acquistare.' }, { title: 'Quali giochi può eseguire il mio PC?', body: 'Parti dal tuo hardware e scopri gli altri giochi supportati.' }], methodologyLink: 'Scopri come funziona il modello',
  },
  fr: {
    snapshotEyebrow: 'Vue d’ensemble de la configuration', snapshotTitle: 'Les chiffres qui répondent à la première question', officialBadge: 'Exigences officielles', statLabels: ['RAM minimale', 'GPU minimale', 'Stockage', 'Cible de l’éditeur'],
    workloadEyebrow: 'Profil de planification', workloadTitle: 'Qu’est-ce qui comptera le plus sur votre PC ?', workloadIntro: 'Ces barres sont des signaux du modèle, pas des benchmarks de l’éditeur. Elles expliquent pourquoi les mêmes exigences peuvent différer en 1080p, 1440p et 4K.', demandLabels: ['Charge CPU', 'Charge GPU', 'Mémoire et stockage'],
    answerPathTitle: 'Obtenir une réponse fiable', answerPathIntro: 'Une réponse utile à « puis-je le faire tourner ? » comporte trois niveaux. Suivez-les dans l’ordre pour ne pas confondre le minimum avec une garantie de FPS.', steps: [
      { title: 'Vérifier le minimum officiel', body: 'Comparez système, CPU, GPU, RAM et stockage avec le tableau sourcé ci-dessous.', link: 'Lire les exigences' },
      { title: 'Modéliser votre objectif', body: 'Choisissez résolution, qualité, RAM et fréquence selon votre façon de jouer.', link: 'Ouvrir le calculateur FPS' },
      { title: 'Valider et comparer', body: 'Répétez la même scène, puis comparez un changement de CPU ou GPU avant d’acheter.', link: 'Comparer les composants' },
    ],
    rangeEyebrow: 'Lire la plage', rangeTitle: 'Les FPS moyens ne sont qu’une partie de la réponse', rangeBody: 'Le bas de la plage sert de garde-fou. Le 1% low aide à comprendre les saccades, tandis que la colonne de limite indique le composant à examiner en premier.', rangeLabels: ['Bas', '1% low', 'Limite'], rangeValues: ['Moments chargés', 'Régularité des images', 'Réglage à tester'],
    testEyebrow: 'Méthode de test', testTitle: 'Rendre le résultat reproductible', testBullets: ['Gardez la même résolution, le même préréglage, upscaling et plafond FPS.', 'Relevez FPS moyens, 1% lows, températures et utilisation.', 'Modifiez un seul réglage à la fois pour comparer proprement.'],
    relatedTitle: 'Poursuivre avec le bon outil PCBuildCheck', relatedCards: [{ title: 'Calculateur FPS', body: 'Saisissez votre CPU, GPU, résolution et réglages pour une plage personnalisée.' }, { title: 'Comparaison de composants', body: 'Comparez une mise à niveau CPU ou GPU avant de dépenser.' }, { title: 'Quels jeux mon PC peut-il faire tourner ?', body: 'Partez de votre matériel pour découvrir les autres jeux pris en charge.' }], methodologyLink: 'Voir le fonctionnement du modèle',
  },
  de: {
    snapshotEyebrow: 'Konfigurationsübersicht', snapshotTitle: 'Die Zahlen für die erste Antwort', officialBadge: 'Offizielle Anforderungen', statLabels: ['Mindest-RAM', 'Mindest-GPU', 'Speicher', 'Herstellerziel'],
    workloadEyebrow: 'Planungsprofil', workloadTitle: 'Was zählt auf deinem PC am meisten?', workloadIntro: 'Diese Balken sind Modellsignale, keine Hersteller-Benchmarks. Sie erklären, warum dieselben Anforderungen bei 1080p, 1440p und 4K unterschiedlich wirken können.', demandLabels: ['CPU-Last', 'GPU-Last', 'Speicher und RAM'],
    answerPathTitle: 'So bekommst du eine belastbare Antwort', answerPathIntro: 'Eine gute Antwort auf „Kann ich es spielen?“ hat drei Ebenen. Arbeite sie der Reihe nach durch, damit das Minimum nicht als FPS-Garantie missverstanden wird.', steps: [
      { title: 'Offizielles Minimum prüfen', body: 'Vergleiche Betriebssystem, CPU, GPU, RAM und Speicher mit der belegten Tabelle unten.', link: 'Anforderungen lesen' },
      { title: 'Dein Ziel modellieren', body: 'Wähle Auflösung, Qualität, RAM und Bildrate passend zu deiner tatsächlichen Nutzung.', link: 'FPS-Rechner öffnen' },
      { title: 'Prüfen und vergleichen', body: 'Wiederhole dieselbe Szene und vergleiche ein mögliches CPU- oder GPU-Upgrade vor dem Kauf.', link: 'Komponenten vergleichen' },
    ],
    rangeEyebrow: 'Bereich richtig lesen', rangeTitle: 'Durchschnitts-FPS sind nur ein Teil der Antwort', rangeBody: 'Das untere Ende ist eine Planungsgrenze. Die 1% Lows zeigen Ruckler und ungleichmäßige Ausgabe; die Limit-Spalte nennt das erste Bauteil für weitere Tests.', rangeLabels: ['Niedrig', '1% Low', 'Limit'], rangeValues: ['Belastete Momente', 'Frame-Pacing', 'Was anpassen?'],
    testEyebrow: 'Testrezept', testTitle: 'Ergebnis wiederholbar machen', testBullets: ['Gleiche Auflösung, Preset, Upscaling und Bildratenbegrenzung verwenden.', 'Durchschnitts-FPS, 1% Lows, Temperaturen und Auslastung erfassen.', 'Nur eine Einstellung gleichzeitig ändern und fair vergleichen.'],
    relatedTitle: 'Mit dem passenden PCBuildCheck-Tool weitermachen', relatedCards: [{ title: 'FPS-Rechner', body: 'Trage CPU, GPU, Auflösung und Einstellungen für eine persönliche Spanne ein.' }, { title: 'Komponentenvergleich', body: 'Vergleiche ein mögliches CPU- oder GPU-Upgrade vor dem Kauf.' }, { title: 'Welche Spiele schafft mein PC?', body: 'Starte mit deiner Hardware und entdecke weitere unterstützte Spiele.' }], methodologyLink: 'So funktioniert das Planungsmodell',
  },
  es: {
    snapshotEyebrow: 'Resumen del equipo', snapshotTitle: 'Los números que responden a la primera pregunta', officialBadge: 'Requisitos oficiales', statLabels: ['RAM mínima', 'GPU mínima', 'Almacenamiento', 'Objetivo del editor'],
    workloadEyebrow: 'Perfil de planificación', workloadTitle: '¿Qué tendrá más importancia en tu PC?', workloadIntro: 'Estas barras son señales del modelo, no benchmarks del editor. Explican por qué los mismos requisitos pueden sentirse distintos a 1080p, 1440p y 4K.', demandLabels: ['Carga de CPU', 'Carga de GPU', 'Memoria y almacenamiento'],
    answerPathTitle: 'Cómo obtener una respuesta fiable', answerPathIntro: 'Una respuesta útil a “¿puedo ejecutarlo?” tiene tres capas. Síguelas para no confundir el mínimo con una garantía de FPS.', steps: [
      { title: 'Comprueba el mínimo oficial', body: 'Compara sistema operativo, CPU, GPU, RAM y almacenamiento con la tabla verificada.', link: 'Leer requisitos' },
      { title: 'Modela tu objetivo', body: 'Usa resolución, calidad, RAM y frecuencia que coincidan con tu forma real de jugar.', link: 'Abrir calculadora FPS' },
      { title: 'Valida y compara', body: 'Repite la misma escena y compara un posible cambio de CPU o GPU antes de comprar.', link: 'Comparar componentes' },
    ],
    rangeEyebrow: 'Lee el rango', rangeTitle: 'Los FPS medios son solo una parte de la respuesta', rangeBody: 'El extremo inferior sirve de referencia. El 1% low ayuda a entender tirones, mientras que la columna de límite indica qué componente investigar primero.', rangeLabels: ['Bajo', '1% low', 'Límite'], rangeValues: ['Momentos exigentes', 'Estabilidad de frames', 'Qué ajustar'],
    testEyebrow: 'Receta de prueba', testTitle: 'Haz que el resultado sea repetible', testBullets: ['Usa la misma resolución, preajuste, reescalado y límite de FPS.', 'Registra FPS medios, 1% lows, temperaturas y uso.', 'Cambia un ajuste cada vez para comparar de forma justa.'],
    relatedTitle: 'Continúa con la herramienta PCBuildCheck adecuada', relatedCards: [{ title: 'Calculadora FPS', body: 'Introduce tu CPU, GPU, resolución y ajustes para obtener un rango personalizado.' }, { title: 'Comparación de componentes', body: 'Compara una posible mejora de CPU o GPU antes de gastar.' }, { title: '¿Qué juegos puede ejecutar mi PC?', body: 'Empieza con tu hardware y descubre otros juegos compatibles.' }], methodologyLink: 'Consulta cómo funciona el modelo',
  },
  ru: {
    snapshotEyebrow: 'Сводка конфигурации', snapshotTitle: 'Показатели для первого ответа', officialBadge: 'Официальные требования', statLabels: ['Минимум RAM', 'Минимум GPU', 'Накопитель', 'Цель издателя'],
    workloadEyebrow: 'Профиль расчёта', workloadTitle: 'Что сильнее всего повлияет на ваш ПК?', workloadIntro: 'Эти полосы показывают сигналы модели, а не бенчмарки издателя. Они объясняют, почему одинаковые требования ощущаются по-разному в 1080p, 1440p и 4K.', demandLabels: ['Нагрузка CPU', 'Нагрузка GPU', 'Память и накопитель'],
    answerPathTitle: 'Как получить надёжный ответ', answerPathIntro: 'Полезный ответ на вопрос «потянет ли мой ПК?» состоит из трёх уровней. Пройдите их по порядку, чтобы не принять минимум за гарантию FPS.', steps: [
      { title: 'Проверьте официальный минимум', body: 'Сравните ОС, CPU, GPU, RAM и накопитель с таблицей требований ниже.', link: 'Открыть требования' },
      { title: 'Рассчитайте свою цель', body: 'Укажите разрешение, качество, RAM и частоту обновления, которые используете на самом деле.', link: 'Открыть калькулятор FPS' },
      { title: 'Проверьте и сравните', body: 'Повторите ту же сцену и сравните возможный апгрейд CPU или GPU до покупки.', link: 'Сравнить компоненты' },
    ],
    rangeEyebrow: 'Как читать диапазон', rangeTitle: 'Средний FPS — только часть ответа', rangeBody: 'Нижняя граница задаёт запас для планирования. 1% low показывает рывки, а колонка ограничения подсказывает, какой компонент проверять первым.', rangeLabels: ['Низкий', '1% low', 'Предел'], rangeValues: ['Нагруженные моменты', 'Плавность кадров', 'Что настроить'],
    testEyebrow: 'Рецепт проверки', testTitle: 'Сделайте результат повторяемым', testBullets: ['Используйте одинаковые разрешение, пресет, апскейлинг и лимит FPS.', 'Записывайте средний FPS, 1% lows, температуры и загрузку.', 'Меняйте только один параметр за раз для честного сравнения.'],
    relatedTitle: 'Продолжите с подходящим инструментом PCBuildCheck', relatedCards: [{ title: 'Калькулятор FPS', body: 'Укажите CPU, GPU, разрешение и настройки для персонального диапазона.' }, { title: 'Сравнение компонентов', body: 'Сравните возможный апгрейд CPU или GPU до покупки.' }, { title: 'Какие игры потянет мой ПК?', body: 'Начните со своей конфигурации и найдите другие поддерживаемые игры.' }], methodologyLink: 'Как работает модель расчёта',
  },
};

const LOCALIZED_INSIGHT_TEXT: Record<Exclude<Locale, 'en'>, Omit<GameInsight, 'positioning'> & { positioningPrefix: string }> = {
  it: { positioningPrefix: 'Ogni gioco ha un profilo di carico diverso. Questa guida separa requisiti ufficiali e pianificazione FPS per', cpuNote: 'Scene affollate, streaming e obiettivi ad alto refresh possono evidenziare il limite della CPU prima del previsto.', gpuNote: 'Risoluzione ed effetti visivi pesanti aumentano il carico su GPU e VRAM; l’upscaling è uno strumento di regolazione.', memoryNote: 'Il requisito RAM ufficiale è il punto di partenza. Lascia margine per Windows, patch e applicazioni in background.', testScene: 'Ripeti la stessa scena impegnativa con risoluzione, preset e limite FPS identici.', upgradeNote: 'Aggiorna solo dopo aver verificato quale componente limita davvero frame time e 1% low.' },
  fr: { positioningPrefix: 'Chaque jeu a un profil de charge différent. Ce guide sépare les exigences officielles et la planification FPS pour', cpuNote: 'Les scènes chargées, le streaming et une cible haute fréquence peuvent révéler plus tôt une limite CPU.', gpuNote: 'Résolution et effets lourds augmentent la charge GPU et VRAM; l’upscaling est un réglage utile.', memoryNote: 'La RAM officielle est un point de départ. Gardez une marge pour Windows, les mises à jour et les applications.', testScene: 'Répétez la même scène exigeante avec résolution, préréglage et plafond FPS identiques.', upgradeNote: 'Ne mettez à niveau qu’après avoir identifié le composant qui limite réellement le frame time et les 1% lows.' },
  de: { positioningPrefix: 'Jedes Spiel hat ein eigenes Lastprofil. Dieser Leitfaden trennt offizielle Anforderungen und FPS-Planung für', cpuNote: 'Belastete Szenen, Streaming und hohe Bildraten können ein CPU-Limit früher sichtbar machen.', gpuNote: 'Auflösung und schwere Effekte erhöhen GPU- und VRAM-Last; Upscaling ist ein sinnvolles Stellrad.', memoryNote: 'Die offizielle RAM-Angabe ist der Startpunkt. Plane Reserven für Windows, Patches und Hintergrundprogramme ein.', testScene: 'Dieselbe anspruchsvolle Szene mit identischer Auflösung, Preset und Bildratenbegrenzung wiederholen.', upgradeNote: 'Erst aufrüsten, wenn klar ist, welches Bauteil Frame Time und 1% Lows tatsächlich begrenzt.' },
  es: { positioningPrefix: 'Cada juego tiene un perfil de carga distinto. Esta guía separa los requisitos oficiales y la planificación de FPS para', cpuNote: 'Las escenas cargadas, el streaming y una frecuencia alta pueden revelar antes un límite de CPU.', gpuNote: 'La resolución y los efectos exigentes aumentan la carga de GPU y VRAM; el reescalado es un control útil.', memoryNote: 'La RAM oficial es el punto de partida. Deja margen para Windows, parches y aplicaciones en segundo plano.', testScene: 'Repite la misma escena exigente con resolución, preajuste y límite de FPS idénticos.', upgradeNote: 'Actualiza solo después de identificar qué componente limita realmente el frame time y los 1% lows.' },
  ru: { positioningPrefix: 'У каждой игры свой профиль нагрузки. Этот гайд отделяет официальные требования и расчёт FPS для', cpuNote: 'Нагруженные сцены, стриминг и высокая частота кадров могут раньше показать предел CPU.', gpuNote: 'Разрешение и тяжёлые эффекты увеличивают нагрузку GPU и видеопамяти; апскейлинг помогает настроить запас.', memoryNote: 'Официальный объём RAM — это отправная точка. Оставьте запас для Windows, патчей и фоновых программ.', testScene: 'Повторите одну требовательную сцену с одинаковыми разрешением, пресетом и лимитом FPS.', upgradeNote: 'Покупайте апгрейд только после проверки компонента, который действительно ограничивает время кадра и 1% lows.' },
};

function getRichPageCopy(locale: Locale) {
  return RICH_PAGE_COPY[locale] ?? RICH_PAGE_COPY.en;
}

function getLocalizedGameInsight(locale: Locale, guide: GameGuideDefinition): GameInsight {
  if (locale === 'en') return GAME_INSIGHTS[guide.slug];
  const localized = LOCALIZED_INSIGHT_TEXT[locale];
  return { positioning: `${localized.positioningPrefix} ${guide.name}.`, cpuNote: localized.cpuNote, gpuNote: localized.gpuNote, memoryNote: localized.memoryNote, testScene: localized.testScene, upgradeNote: localized.upgradeNote };
}

export default async function GameGuidePage({ params }: { params: Promise<PageParams> }) {
  const { lang, slug } = await params;
  if (!isGameGuideSlug(slug)) notFound();
  const typedSlug = slug as GameGuideSlug;
  const guide = getGameGuideDefinition(typedSlug);
  const copy = getGameGuideCopy(lang, typedSlug);
  const game = allGames.find((item) => item.id === guide.gameId);
  const insight = getLocalizedGameInsight(lang, guide);
  const rich = getRichPageCopy(lang);
  const hubCopy = getCanIRunHubCopy(lang);
  const chrome = getSiteChromeCopy(lang);
  const pageUrl = `${SITE_URL}${getLocalizedPath(lang, `can-i-run/${typedSlug}`)}`;
  const hubUrl = `${SITE_URL}${getLocalizedPath(lang, 'can-i-run')}`;
  const examples = getExampleRows(guide.gameId);
  const fpsParams = serializeFPSShareConfig({
    cpu: 'ryzen-5-5600X', gpu: 'rtx-4070', game: guide.gameId, resolution: '1440p',
    ramSize: '16gb', ramSpeed: '3200', storage: 'nvme-ssd', quality: 'high', upscaling: 'off',
    refreshRate: '144hz', antiAliasing: 'fxaa',
  });
  const fpsHref = `${getLocalizedPath(lang, 'fps-calculator')}?${fpsParams.toString()}`;
  const reverseHref = getLocalizedPath(lang, 'tools/what-games-can-my-pc-run');
  const comparisonHref = getLocalizedPath(lang, 'tools/component-comparison');
  const methodologyHref = getLocalizedPath(lang, 'methodology');
  const maxExampleFps = Math.max(...examples.map(({ result }) => result.high), 1);
  const schema = createSchemaGraph([
    createWebPageSchema({ pageUrl, name: copy.title, description: copy.description, lang, type: 'TechArticle', mainEntityId: `${pageUrl}#game` }),
    {
      '@type': 'VideoGame', '@id': `${pageUrl}#game`, name: guide.name, url: pageUrl,
      applicationCategory: guide.category, gamePlatform: 'PC', operatingSystem: guide.minimum.os,
      storageRequirements: guide.minimum.storage,
      memoryRequirements: guide.recommended
        ? `${guide.minimum.ram} minimum; ${guide.recommended.ram} recommended`
        : `${guide.minimum.ram} minimum`,
      publisher: { '@type': 'Organization', name: guide.publisher },
    },
    createBreadcrumbSchema(pageUrl, [
      { name: chrome.home, url: `${SITE_URL}/${lang}` },
      { name: hubCopy.title, url: hubUrl },
      { name: guide.name, url: pageUrl },
    ]),
    createFaqSchema(pageUrl, copy.faqs),
  ]);

  return (
    <div className="px-4 py-10 sm:py-14">
      <JsonLd data={schema} />
      <article className="mx-auto max-w-6xl space-y-12">
        <nav aria-label={chrome.breadcrumb}>
          <Link href={getLocalizedPath(lang, 'can-i-run')} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />{hubCopy.title}
          </Link>
        </nav>

        <header className="max-w-4xl space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />{copy.reviewed}
          </p>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{copy.eyebrow}</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="text-lg leading-8 text-muted-foreground">{copy.description}</p>
        </header>

        {(
          <>
            <section aria-labelledby="game-snapshot" className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6 shadow-sm dark:border-indigo-900 dark:from-indigo-950/50 dark:via-blue-950/30 dark:to-cyan-950/20 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-indigo-700 dark:text-indigo-300"><CircleGauge className="h-4 w-4" aria-hidden="true" />{rich.snapshotEyebrow}</p><h2 id="game-snapshot" className="mt-2 text-3xl font-bold">{rich.snapshotTitle}</h2></div>
                <span className="rounded-full border border-indigo-200 bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground dark:border-indigo-800">{rich.officialBadge}</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: rich.statLabels[0], value: guide.minimum.ram, icon: MemoryStick },
                  { label: rich.statLabels[1], value: guide.minimum.gpu, icon: Monitor },
                  { label: rich.statLabels[2], value: guide.minimum.storage, icon: HardDrive },
                  { label: rich.statLabels[3], value: localizeTargetValue(lang, guide.minimum.target), icon: ShieldCheck },
                ].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border bg-background/75 p-4"><Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" aria-hidden="true" /><p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold leading-6">{value}</p></div>)}
              </div>
              <p className="mt-5 max-w-4xl text-sm leading-6 text-muted-foreground">{insight.positioning}</p>
            </section>

            <section aria-labelledby="workload-profile" className="space-y-5">
              <div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary"><BarChart3 className="h-4 w-4" aria-hidden="true" />{rich.workloadEyebrow}</p><h2 id="workload-profile" className="mt-2 text-3xl font-bold">{rich.workloadTitle}</h2><p className="mt-2 max-w-4xl leading-7 text-muted-foreground">{rich.workloadIntro}</p></div>
              <div className="grid gap-4 md:grid-cols-3">
                <DemandSignal label={rich.demandLabels[0]} value={localizeDemandValue(lang, game?.cpuDemand ?? 'Medium')} detail={insight.cpuNote} icon={Cpu} />
                <DemandSignal label={rich.demandLabels[1]} value={localizeDemandValue(lang, game?.gpuDemand ?? 'Medium')} detail={insight.gpuNote} icon={Monitor} />
                <DemandSignal label={rich.demandLabels[2]} value={`${game?.ramRequirement ?? guide.minimum.ram} GB RAM`} detail={insight.memoryNote} icon={MemoryStick} />
              </div>
            </section>

            <section aria-labelledby="answer-path" className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-3"><ListChecks className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" /><div><h2 id="answer-path" className="text-3xl font-bold">{rich.answerPathTitle}</h2><p className="mt-2 max-w-4xl leading-7 text-muted-foreground">{rich.answerPathIntro}</p></div></div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {rich.steps.map((step, index) => <article key={step.title} className="rounded-2xl border bg-muted/30 p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{index + 1}</span><h3 className="mt-4 text-xl font-bold">{step.title}</h3><p className="mt-2 leading-7 text-muted-foreground">{step.body}</p>{index === 0 ? <a href="#official-requirements" className="mt-3 inline-flex font-semibold text-primary hover:underline">{step.link}<ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></a> : <Link href={index === 1 ? fpsHref : comparisonHref} className="mt-3 inline-flex font-semibold text-primary hover:underline">{step.link}<ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></Link>}</article>)}
              </div>
            </section>
          </>
        )}

        <section aria-labelledby="quick-answer" className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30 sm:p-8">
          <h2 id="quick-answer" className="flex items-center gap-2 text-2xl font-bold"><CheckCircle2 className="h-6 w-6 text-blue-700 dark:text-blue-300" aria-hidden="true" />{copy.quickAnswerTitle}</h2>
          <p className="mt-3 max-w-4xl leading-8 text-muted-foreground">{copy.quickAnswer}</p>
        </section>

        <section aria-labelledby="official-requirements" className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="official-requirements" className="text-3xl font-bold">{copy.requirementsTitle}</h2>
              <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">{copy.requirementsIntro}</p>
            </div>
            <a href={guide.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 font-semibold text-primary hover:bg-muted">
              {copy.sourceLabel}<ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <RequirementCard title={copy.minimum} requirements={guide.minimum} labels={copy.requirementLabels} />
            {guide.recommended ? (
              <RequirementCard title={copy.recommended} requirements={guide.recommended} labels={copy.requirementLabels} />
            ) : (
              <aside className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-950 shadow-sm dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <p className="leading-7">{copy.noRecommended}</p>
              </aside>
            )}
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{copy.sourceNote}</p>
        </section>

        <section className="rounded-2xl border border-indigo-300 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 dark:border-indigo-800 dark:from-indigo-950/40 dark:to-blue-950/30 sm:p-8">
          <Gamepad2 className="h-7 w-7 text-indigo-700 dark:text-indigo-300" aria-hidden="true" />
          <h2 className="mt-3 text-3xl font-bold">{copy.checkerTitle}</h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">{copy.checkerDescription}</p>
          <Link href={fpsHref} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-indigo-700 px-6 font-semibold text-white hover:bg-indigo-800">
            {copy.checkerCta}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section aria-labelledby="planning-examples" className="space-y-5">
          <div>
            <h2 id="planning-examples" className="text-3xl font-bold">{copy.examplesTitle}</h2>
            <p className="mt-2 max-w-4xl leading-7 text-muted-foreground">{copy.examplesIntro}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b bg-muted/50 text-sm">
                <tr><th className="px-5 py-4">{copy.resolution}</th><th className="px-5 py-4">{copy.estimatedRange}</th><th className="px-5 py-4">{copy.onePercentLow}</th><th className="px-5 py-4">{copy.likelyLimit}</th></tr>
              </thead>
              <tbody className="divide-y">
                {examples.map(({ resolution, result }) => (
                  <tr key={resolution}>
                    <th className="px-5 py-4 font-semibold">{resolution}</th>
                    <td className="px-5 py-4 font-bold text-emerald-700 dark:text-emerald-400"><span className="block">{result.low}–{result.high} FPS</span><span className="mt-2 block h-2 w-full max-w-[18rem] overflow-hidden rounded-full bg-muted" aria-hidden="true"><span className="block h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400" style={{ width: `${Math.max(8, Math.round((result.high / maxExampleFps) * 100))}%` }} /></span></td>
                    <td className="px-5 py-4">{result.onePercentLow} FPS</td>
                    <td className="px-5 py-4">{result.limitingComponent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"><TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />{copy.exampleNote}</p>
        </section>

        {(
          <section aria-labelledby="read-fps-range" className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/25 sm:p-8">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300"><Zap className="h-4 w-4" aria-hidden="true" />{rich.rangeEyebrow}</p>
              <h2 id="read-fps-range" className="mt-2 text-2xl font-bold">{rich.rangeTitle}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{rich.rangeBody}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {rich.rangeLabels.map((label, index) => <div key={label} className="rounded-xl border bg-background/70 p-4"><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-1 font-semibold">{rich.rangeValues[index]}</p></div>)}
              </div>
            </article>
            <article className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary"><Settings2 className="h-4 w-4" aria-hidden="true" />{rich.testEyebrow}</p><h2 className="mt-2 text-2xl font-bold">{rich.testTitle}</h2><p className="mt-3 leading-7 text-muted-foreground">{insight.testScene}</p><ul className="mt-5 space-y-3 text-sm leading-6">{rich.testBullets.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul></article>
          </section>
        )}

        <section aria-labelledby="specific-answer" className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <h2 id="specific-answer" className="text-3xl font-bold">{copy.longTailTitle}</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{copy.longTailBody}</p>
        </section>

        <section aria-labelledby="resolution-guidance" className="space-y-5">
          <h2 id="resolution-guidance" className="text-3xl font-bold">{copy.guidanceTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.guidance.map((item, index) => (
              <article key={item.title} className="rounded-2xl border bg-card p-5 shadow-sm">
                {index === 0 ? <Gauge className="h-6 w-6 text-primary" aria-hidden="true" /> : <Monitor className="h-6 w-6 text-primary" aria-hidden="true" />}
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="verify-upgrade" className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
          <h2 id="verify-upgrade" className="text-3xl font-bold">{copy.verifyTitle}</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {copy.verifyItems.map((item) => <li key={item} className="flex items-start gap-3 leading-7"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
          <p className="mt-6 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100"><TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />{insight.upgradeNote}</p>
        </section>

        <section aria-labelledby="game-faq" className="space-y-4">
          <h2 id="game-faq" className="text-3xl font-bold">{copy.faqTitle}</h2>
          {copy.faqs.map((faq) => (
            <details key={faq.q} className="rounded-xl border bg-card p-5">
              <summary className="cursor-pointer font-semibold">{faq.q}</summary>
              <p className="mt-3 leading-7 text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </section>

        <section aria-labelledby="related-tools" className="rounded-3xl border border-blue-200 bg-blue-50/60 p-6 dark:border-blue-900 dark:bg-blue-950/30 sm:p-8">
          <h2 id="related-tools" className="flex items-center gap-2 text-2xl font-bold"><ArrowRight className="h-5 w-5 text-primary" aria-hidden="true" />{rich.relatedTitle}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Link href={fpsHref} className="rounded-2xl border bg-background/80 p-5 transition hover:-translate-y-0.5 hover:border-primary"><p className="font-bold">{rich.relatedCards[0].title}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{rich.relatedCards[0].body}</p></Link>
            <Link href={comparisonHref} className="rounded-2xl border bg-background/80 p-5 transition hover:-translate-y-0.5 hover:border-primary"><p className="font-bold">{rich.relatedCards[1].title}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{rich.relatedCards[1].body}</p></Link>
            <Link href={reverseHref} className="rounded-2xl border bg-background/80 p-5 transition hover:-translate-y-0.5 hover:border-primary"><p className="font-bold">{rich.relatedCards[2].title}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{rich.relatedCards[2].body}</p></Link>
          </div>
          <Link href={methodologyHref} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">{rich.methodologyLink} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </section>

        <div className="border-t pt-6">
          <Link href={getLocalizedPath(lang, 'can-i-run')} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">{copy.allGames}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </article>
    </div>
  );
}
