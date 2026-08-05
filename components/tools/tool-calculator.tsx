'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, BarChart3, Calculator, ExternalLink, RotateCcw, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { ToolSlug } from '@/lib/pc-tools';
import { getLocalizedPath } from '@/lib/path-translations';
import { estimatePSUPlanningFromPower } from '@/lib/psu-model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type ToolHardwareOption = {
  id: string;
  name: string;
  score: number;
  tdp: number;
  vram?: number;
  cores?: number;
  socket?: string;
};

export type ToolGameOption = {
  id: string;
  name: string;
  cpuDemand: 'Low' | 'Medium' | 'High' | 'Extreme';
  gpuDemand: 'Low' | 'Medium' | 'High' | 'Extreme';
  ramRequirement: number;
};

export type ToolDatasets = {
  cpus: ToolHardwareOption[];
  gpus: ToolHardwareOption[];
  games: ToolGameOption[];
};

type FieldKey =
  | 'currentGpu' | 'newGpu' | 'cpu' | 'currentFps' | 'currentCpu' | 'newCpu' | 'gpu'
  | 'useCase' | 'gameType' | 'resolution' | 'textureQuality' | 'rayTracing' | 'monitorCount'
  | 'multitasking' | 'streaming' | 'modding' | 'targetFps' | 'refreshRate' | 'baseResolution'
  | 'targetResolution' | 'scalePercent' | 'ramCapacity' | 'game' | 'currentStorage' | 'newStorage'
  | 'driveCapacity' | 'systemSpace' | 'librarySize' | 'averageGameSize' | 'storageType';

type ResultKey =
  | 'expectedFps' | 'usefulGain' | 'theoreticalGain' | 'vramChange' | 'powerChange' | 'cpuLimit'
  | 'expectedOutcome' | 'coreChange' | 'gpuLimit' | 'recommendedVram' | 'workingVram' | 'headroom'
  | 'recommendedRam' | 'workingRam' | 'currentFrameTime' | 'targetFrameTime' | 'frameTimeDifference'
  | 'displayUtilization' | 'fpsSurplus' | 'refreshHeadroom' | 'renderInterval' | 'refreshInterval'
  | 'renderedResolution' | 'renderedPixels' | 'nativeWorkloadChange' | 'targetWorkloadChange'
  | 'suggestedPreset' | 'presetFps' | 'ultraFps' | 'limitingComponent' | 'ramStatus'
  | 'responsivenessGain' | 'freeCapacity' | 'additionalGames' | 'upgradeClass' | 'firstPriority'
  | 'secondPriority' | 'thirdPriority' | 'fourthPriority' | 'currentPsu' | 'proposedPsu'
  | 'socketChange' | 'platformCheck';

type Option = { value: string; label: string };
type Field = {
  key: FieldKey;
  type: 'number' | 'select';
  defaultValue: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: Option[];
};

type ResultItem = {
  key: ResultKey;
  value: number | string;
  unit?: string;
  digits?: number;
  primary?: boolean;
};

type UiCopy = {
  calculator: string;
  results: string;
  calculate: string;
  reset: string;
  estimateNotice: string;
  fields: Record<FieldKey, string>;
  resultLabels: Record<ResultKey, string>;
  options: Record<string, string>;
  messages: Record<string, string>;
};

const EN_FIELDS: Record<FieldKey, string> = {
  currentGpu: 'Current GPU', newGpu: 'Proposed GPU', cpu: 'Current CPU', currentFps: 'Current FPS or performance baseline',
  currentCpu: 'Current CPU', newCpu: 'Proposed CPU', gpu: 'Current GPU', useCase: 'Primary use case',
  gameType: 'Game workload', resolution: 'Resolution', textureQuality: 'Texture quality', rayTracing: 'Ray tracing',
  monitorCount: 'Active monitors', multitasking: 'Concurrent multitasking', streaming: 'Stream while gaming',
  modding: 'Modding level', targetFps: 'Target FPS', refreshRate: 'Monitor refresh rate',
  baseResolution: 'Base display resolution', targetResolution: 'Comparison resolution', scalePercent: 'Render scale',
  ramCapacity: 'Installed RAM', game: 'Game', currentStorage: 'Current storage', newStorage: 'Proposed storage',
  driveCapacity: 'New drive capacity', systemSpace: 'System and app allowance', librarySize: 'Existing game library',
  averageGameSize: 'Average game size', storageType: 'Current storage type',
};

const EN_RESULTS: Record<ResultKey, string> = {
  expectedFps: 'Estimated effective FPS', usefulGain: 'Estimated useful gain', theoreticalGain: 'Raw score difference',
  vramChange: 'VRAM change', powerChange: 'Board-power change', cpuLimit: 'CPU headroom check',
  expectedOutcome: 'Estimated performance value', coreChange: 'Core-count change', gpuLimit: 'GPU headroom check',
  recommendedVram: 'Suggested VRAM tier', workingVram: 'Planning requirement', headroom: 'Capacity headroom',
  recommendedRam: 'Suggested RAM tier', workingRam: 'Estimated working RAM', currentFrameTime: 'Current frame time',
  targetFrameTime: 'Target frame time', frameTimeDifference: 'Difference from target',
  displayUtilization: 'Refresh-rate utilization', fpsSurplus: 'FPS above refresh rate', refreshHeadroom: 'Unused refresh headroom',
  renderInterval: 'Render interval', refreshInterval: 'Display refresh interval', renderedResolution: 'Internal rendered resolution',
  renderedPixels: 'Rendered pixels', nativeWorkloadChange: 'Pixel change vs base native', targetWorkloadChange: 'Pixel change vs comparison',
  suggestedPreset: 'Suggested quality preset', presetFps: 'Estimated FPS at preset', ultraFps: 'Estimated FPS at ultra',
  limitingComponent: 'Likely slower component', ramStatus: 'Memory capacity check', responsivenessGain: 'Relative responsiveness-index gain',
  freeCapacity: 'Usable capacity after allowances', additionalGames: 'Approximate additional games', upgradeClass: 'Upgrade summary',
  firstPriority: '1st priority', secondPriority: '2nd priority', thirdPriority: '3rd priority', fourthPriority: '4th priority',
  currentPsu: 'Current-build PSU planning value', proposedPsu: 'Proposed-build PSU planning value',
  socketChange: 'Listed CPU socket', platformCheck: 'Platform check',
};

const EN_OPTIONS: Record<string, string> = {
  gaming: 'Gaming', productivity: 'Productivity / creation', everyday: 'Everyday use', esports: 'Esports',
  streamingCreator: 'Gaming + streaming', creator: 'Content creation', aaa: 'Modern AAA games', mainstream: 'Mainstream games',
  modded: 'Heavily modded / simulation', medium: 'Medium', high: 'High', ultra: 'Ultra', none: 'Off / none',
  light: 'Light', heavy: 'Heavy', one: '1 monitor', two: '2 monitors', three: '3 monitors',
  multitaskLight: 'Light: voice chat and a few tabs', multitaskMedium: 'Moderate: many tabs and background apps',
  multitaskHeavy: 'Heavy: multiple active applications', yes: 'Yes', no: 'No',
  modLight: 'A few lightweight mods', modHeavy: 'Large mod pack / high-resolution assets',
  hdd: 'Hard disk drive (HDD)', sata: 'SATA SSD', nvme3: 'NVMe SSD (PCIe 3.0)', nvme4: 'NVMe SSD (PCIe 4.0+)',
};

const buildCopy = (
  locale: Locale,
  shell: Pick<UiCopy, 'calculator' | 'results' | 'calculate' | 'reset' | 'estimateNotice'>,
  fields: Partial<Record<FieldKey, string>>,
  resultLabels: Partial<Record<ResultKey, string>>,
  options: Record<string, string>,
  messages: Record<string, string>,
): UiCopy => ({
  ...shell,
  fields: { ...EN_FIELDS, ...fields },
  resultLabels: { ...EN_RESULTS, ...resultLabels },
  options: { ...EN_OPTIONS, ...options },
  messages,
});

const UI_COPY: Record<Locale, UiCopy> = {
  en: buildCopy('en', {
    calculator: 'Enter your configuration', results: 'Calculated planning result', calculate: 'Calculate', reset: 'Reset',
    estimateNotice: 'Planning estimate only — verify important upgrade decisions with measurements, compatibility checks and independent benchmarks.',
  }, {}, {}, {}, {
    likely: 'Likely limitation', noLikely: 'No strong limit indicated', cpu: 'CPU', gpu: 'GPU', balanced: 'Balanced',
    sufficient: 'Capacity is at or above the game baseline', pressure: 'Below the game baseline; paging may reduce consistency',
    competitive: 'Competitive', low: 'Low', medium: 'Medium', high: 'High', ultra: 'Ultra',
    hddToSsd: 'Major responsiveness upgrade from HDD to solid-state storage', ssdStep: 'Faster storage tier; game-load gains vary',
    sameTier: 'Similar storage class; capacity may be the main benefit', noUrgent: 'No large modeled shortfall',
    componentCpu: 'CPU', componentGpu: 'GPU', componentRam: 'RAM', componentStorage: 'Storage',
    unknown: 'Unknown', sameSocket: 'Same socket listed; verify the exact motherboard and BIOS support list',
    platformChange: 'Different socket; motherboard or platform replacement is likely', verifyPlatform: 'Socket data incomplete; verify the platform manually',
    checklistTitle: 'Compatibility checks before buying',
    cpuSocketSame: 'Both CPUs list {socket}, but a matching socket does not guarantee chipset or BIOS support.',
    cpuSocketChanged: 'The listed socket changes from {current} to {proposed}; a motherboard or platform change is likely.',
    cpuSocketUnknown: 'Socket information is incomplete. Confirm both CPUs and the exact motherboard support list.',
    cpuBios: 'Confirm motherboard model, chipset, BIOS version, RAM generation and CPU support list.',
    cpuCooling: 'Check cooler mounting, thermal capacity, case clearance and power limits.',
    gpuPower: 'Confirm PSU wattage and native connector guidance from the GPU manufacturer and board partner.',
    gpuClearance: 'Check card length, thickness, slot clearance, support bracket and case airflow.',
    gpuDrivers: 'Verify display outputs, driver support and any required adapter or native cable.',
    openPsu: 'Open prefilled PSU Calculator',
  }),
  it: buildCopy('it', {
    calculator: 'Inserisci la configurazione', results: 'Risultato di pianificazione', calculate: 'Calcola', reset: 'Ripristina',
    estimateNotice: 'Stima di pianificazione — verifica gli upgrade con misure, compatibilità e benchmark indipendenti.',
  }, {
    currentGpu: 'GPU attuale', newGpu: 'GPU proposta', cpu: 'CPU attuale', currentFps: 'FPS attuali o valore di base',
    currentCpu: 'CPU attuale', newCpu: 'CPU proposta', gpu: 'GPU attuale', useCase: 'Utilizzo principale',
    gameType: 'Tipo di gioco', resolution: 'Risoluzione', textureQuality: 'Qualità texture', rayTracing: 'Ray tracing',
    monitorCount: 'Monitor attivi', multitasking: 'Multitasking simultaneo', streaming: 'Streaming durante il gioco',
    modding: 'Livello mod', targetFps: 'FPS obiettivo', refreshRate: 'Frequenza monitor',
    baseResolution: 'Risoluzione di base', targetResolution: 'Risoluzione di confronto', scalePercent: 'Scala rendering',
    ramCapacity: 'RAM installata', game: 'Gioco', currentStorage: 'Storage attuale', newStorage: 'Nuovo storage',
    driveCapacity: 'Capacità nuova unità', systemSpace: 'Spazio per sistema e app', librarySize: 'Libreria giochi esistente',
    averageGameSize: 'Dimensione media gioco', storageType: 'Tipo di storage attuale',
  }, {
    expectedFps: 'FPS effettivi stimati', usefulGain: 'Guadagno utile stimato', theoreticalGain: 'Differenza grezza punteggio',
    vramChange: 'Variazione VRAM', powerChange: 'Variazione potenza scheda', cpuLimit: 'Controllo margine CPU',
    expectedOutcome: 'Valore prestazionale stimato', coreChange: 'Variazione core', gpuLimit: 'Controllo margine GPU',
    recommendedVram: 'Taglio VRAM suggerito', workingVram: 'Requisito di pianificazione', headroom: 'Margine capacità',
    recommendedRam: 'Taglio RAM suggerito', workingRam: 'RAM di lavoro stimata', currentFrameTime: 'Frame time attuale',
    targetFrameTime: 'Frame time obiettivo', frameTimeDifference: 'Differenza dall’obiettivo',
    displayUtilization: 'Utilizzo frequenza', fpsSurplus: 'FPS oltre la frequenza', refreshHeadroom: 'Margine refresh inutilizzato',
    renderedResolution: 'Risoluzione interna', renderedPixels: 'Pixel renderizzati', suggestedPreset: 'Preset qualità suggerito',
    presetFps: 'FPS stimati al preset', ultraFps: 'FPS stimati a ultra', limitingComponent: 'Componente probabilmente più lento',
    ramStatus: 'Controllo capacità memoria', freeCapacity: 'Capacità utilizzabile', additionalGames: 'Giochi aggiuntivi approssimativi',
    upgradeClass: 'Sintesi upgrade', firstPriority: '1ª priorità', secondPriority: '2ª priorità', thirdPriority: '3ª priorità', fourthPriority: '4ª priorità',
    currentPsu: 'Valore PSU della configurazione attuale', proposedPsu: 'Valore PSU della configurazione proposta',
    socketChange: 'Socket CPU indicato', platformCheck: 'Controllo piattaforma',
  }, {
    gaming: 'Gaming', productivity: 'Produttività / creazione', everyday: 'Uso quotidiano', esports: 'Esports',
    streamingCreator: 'Gaming + streaming', creator: 'Creazione contenuti', aaa: 'Giochi AAA moderni', mainstream: 'Giochi comuni',
    modded: 'Molte mod / simulazione', medium: 'Media', high: 'Alta', ultra: 'Ultra', none: 'Disattivato / nessuno',
    light: 'Leggero', heavy: 'Pesante', one: '1 monitor', two: '2 monitor', three: '3 monitor',
    multitaskLight: 'Leggero: chat vocale e poche schede', multitaskMedium: 'Moderato: molte schede e app',
    multitaskHeavy: 'Pesante: più applicazioni attive', yes: 'Sì', no: 'No',
    modLight: 'Poche mod leggere', modHeavy: 'Grande mod pack / texture ad alta risoluzione',
  }, {
    likely: 'Limite probabile', noLikely: 'Nessun limite forte indicato', cpu: 'CPU', gpu: 'GPU', balanced: 'Bilanciato',
    sufficient: 'Capacità pari o superiore al requisito base', pressure: 'Sotto il requisito base; possibile paging',
    competitive: 'Competitivo', low: 'Basso', medium: 'Medio', high: 'Alto', ultra: 'Ultra',
    hddToSsd: 'Grande miglioramento passando da HDD a SSD', ssdStep: 'Storage più veloce; i caricamenti variano',
    sameTier: 'Classe simile; il vantaggio principale può essere la capacità', noUrgent: 'Nessuna carenza importante nel modello',
    componentCpu: 'CPU', componentGpu: 'GPU', componentRam: 'RAM', componentStorage: 'Storage',
    unknown: 'Sconosciuto', sameSocket: 'Stesso socket indicato; verifica scheda madre e supporto BIOS',
    platformChange: 'Socket diverso; probabile sostituzione della scheda madre o piattaforma', verifyPlatform: 'Dati socket incompleti; verifica manualmente la piattaforma',
    checklistTitle: 'Controlli di compatibilità prima dell’acquisto',
    cpuSocketSame: 'Entrambe le CPU indicano {socket}, ma lo stesso socket non garantisce chipset o BIOS compatibili.',
    cpuSocketChanged: 'Il socket cambia da {current} a {proposed}; è probabile un cambio di scheda madre o piattaforma.',
    cpuSocketUnknown: 'Informazioni socket incomplete. Verifica entrambe le CPU e la lista di supporto della scheda madre.',
    cpuBios: 'Conferma modello, chipset, versione BIOS, generazione RAM e lista CPU supportate.',
    cpuCooling: 'Controlla montaggio e capacità del dissipatore, spazio nel case e limiti di potenza.',
    gpuPower: 'Conferma potenza PSU e connettori indicati dal produttore GPU e dal partner della scheda.',
    gpuClearance: 'Controlla lunghezza, spessore, slot, staffa di supporto e flusso d’aria del case.',
    gpuDrivers: 'Verifica uscite video, driver ed eventuali adattatori o cavi nativi necessari.',
    openPsu: 'Apri il Calcolatore PSU precompilato',
  }),
  fr: buildCopy('fr', {
    calculator: 'Saisissez votre configuration', results: 'Résultat de planification', calculate: 'Calculer', reset: 'Réinitialiser',
    estimateNotice: 'Estimation de planification — vérifiez avec mesures, compatibilité et benchmarks indépendants.',
  }, {
    currentGpu: 'GPU actuel', newGpu: 'GPU proposé', cpu: 'CPU actuel', currentFps: 'FPS actuels ou valeur de base',
    currentCpu: 'CPU actuel', newCpu: 'CPU proposé', gpu: 'GPU actuel', useCase: 'Usage principal',
    gameType: 'Type de jeu', resolution: 'Résolution', textureQuality: 'Qualité des textures', rayTracing: 'Ray tracing',
    monitorCount: 'Écrans actifs', multitasking: 'Multitâche simultané', streaming: 'Streaming pendant le jeu',
    modding: 'Niveau de mods', targetFps: 'FPS cibles', refreshRate: 'Fréquence du moniteur',
    baseResolution: 'Résolution de base', targetResolution: 'Résolution de comparaison', scalePercent: 'Échelle de rendu',
    ramCapacity: 'RAM installée', game: 'Jeu', currentStorage: 'Stockage actuel', newStorage: 'Stockage proposé',
    driveCapacity: 'Capacité du nouveau disque', systemSpace: 'Réserve système et applications', librarySize: 'Bibliothèque existante',
    averageGameSize: 'Taille moyenne d’un jeu', storageType: 'Type de stockage actuel',
  }, {
    expectedFps: 'FPS effectifs estimés', usefulGain: 'Gain utile estimé', theoreticalGain: 'Écart brut des scores',
    vramChange: 'Variation de VRAM', powerChange: 'Variation de puissance', cpuLimit: 'Vérification de la marge CPU',
    expectedOutcome: 'Valeur de performance estimée', coreChange: 'Variation du nombre de cœurs', gpuLimit: 'Vérification de la marge GPU',
    recommendedVram: 'Palier VRAM conseillé', workingVram: 'Besoin de planification', headroom: 'Marge de capacité',
    recommendedRam: 'Palier RAM conseillé', workingRam: 'RAM de travail estimée', currentFrameTime: 'Temps d’image actuel',
    targetFrameTime: 'Temps d’image cible', frameTimeDifference: 'Écart à la cible',
    displayUtilization: 'Utilisation de la fréquence', fpsSurplus: 'FPS au-dessus de la fréquence', refreshHeadroom: 'Marge de fréquence inutilisée',
    renderedResolution: 'Résolution interne', renderedPixels: 'Pixels rendus', suggestedPreset: 'Préréglage conseillé',
    presetFps: 'FPS estimés au préréglage', ultraFps: 'FPS estimés en ultra', limitingComponent: 'Composant probablement le plus lent',
    ramStatus: 'Vérification de la mémoire', freeCapacity: 'Capacité utilisable', additionalGames: 'Jeux supplémentaires approximatifs',
    upgradeClass: 'Résumé de la mise à niveau', firstPriority: '1re priorité', secondPriority: '2e priorité', thirdPriority: '3e priorité', fourthPriority: '4e priorité',
    currentPsu: 'Valeur d’alimentation actuelle', proposedPsu: 'Valeur d’alimentation proposée',
    socketChange: 'Socket CPU indiqué', platformCheck: 'Vérification de plateforme',
  }, {
    gaming: 'Jeu', productivity: 'Productivité / création', everyday: 'Usage quotidien', esports: 'Esports',
    streamingCreator: 'Jeu + streaming', creator: 'Création de contenu', aaa: 'Jeux AAA modernes', mainstream: 'Jeux courants',
    modded: 'Fortement moddé / simulation', medium: 'Moyenne', high: 'Élevée', ultra: 'Ultra', none: 'Désactivé / aucun',
    light: 'Léger', heavy: 'Lourd', one: '1 écran', two: '2 écrans', three: '3 écrans',
    multitaskLight: 'Léger : chat vocal et quelques onglets', multitaskMedium: 'Modéré : nombreux onglets et applications',
    multitaskHeavy: 'Lourd : plusieurs applications actives', yes: 'Oui', no: 'Non',
    modLight: 'Quelques mods légers', modHeavy: 'Grand pack de mods / textures haute résolution',
  }, {
    likely: 'Limitation probable', noLikely: 'Aucune forte limite indiquée', cpu: 'CPU', gpu: 'GPU', balanced: 'Équilibré',
    sufficient: 'Capacité au niveau ou au-dessus du minimum du jeu', pressure: 'Sous le minimum; pagination possible',
    competitive: 'Compétitif', low: 'Faible', medium: 'Moyen', high: 'Élevé', ultra: 'Ultra',
    hddToSsd: 'Gain majeur en passant du HDD au SSD', ssdStep: 'Stockage plus rapide; les chargements varient',
    sameTier: 'Classe similaire; la capacité peut être le principal gain', noUrgent: 'Aucun grand déficit modélisé',
    componentCpu: 'CPU', componentGpu: 'GPU', componentRam: 'RAM', componentStorage: 'Stockage',
    unknown: 'Inconnu', sameSocket: 'Même socket indiqué ; vérifiez la carte mère et le BIOS',
    platformChange: 'Socket différent ; remplacement de carte mère ou plateforme probable', verifyPlatform: 'Données de socket incomplètes ; vérifiez la plateforme',
    checklistTitle: 'Compatibilité à vérifier avant achat',
    cpuSocketSame: 'Les deux CPU indiquent {socket}, mais le même socket ne garantit pas le chipset ou le BIOS.',
    cpuSocketChanged: 'Le socket passe de {current} à {proposed} ; un changement de carte mère ou plateforme est probable.',
    cpuSocketUnknown: 'Informations de socket incomplètes. Vérifiez les CPU et la liste de support de la carte mère.',
    cpuBios: 'Confirmez modèle, chipset, version du BIOS, génération de RAM et liste des CPU pris en charge.',
    cpuCooling: 'Vérifiez montage et capacité du refroidisseur, espace du boîtier et limites de puissance.',
    gpuPower: 'Confirmez puissance et connecteurs conseillés par les fabricants de l’alimentation et de la carte.',
    gpuClearance: 'Vérifiez longueur, épaisseur, emplacements, support et circulation d’air du boîtier.',
    gpuDrivers: 'Vérifiez sorties d’affichage, pilotes et adaptateurs ou câbles natifs nécessaires.',
    openPsu: 'Ouvrir le calculateur d’alimentation prérempli',
  }),
  de: buildCopy('de', {
    calculator: 'Konfiguration eingeben', results: 'Berechnetes Planungsergebnis', calculate: 'Berechnen', reset: 'Zurücksetzen',
    estimateNotice: 'Planungsschätzung — Upgrades mit Messungen, Kompatibilitätsprüfung und unabhängigen Benchmarks verifizieren.',
  }, {
    currentGpu: 'Aktuelle GPU', newGpu: 'Geplante GPU', cpu: 'Aktuelle CPU', currentFps: 'Aktuelle FPS oder Basiswert',
    currentCpu: 'Aktuelle CPU', newCpu: 'Geplante CPU', gpu: 'Aktuelle GPU', useCase: 'Hauptnutzung',
    gameType: 'Spiel-Last', resolution: 'Auflösung', textureQuality: 'Texturqualität', rayTracing: 'Raytracing',
    monitorCount: 'Aktive Monitore', multitasking: 'Gleichzeitiges Multitasking', streaming: 'Beim Spielen streamen',
    modding: 'Modding-Stufe', targetFps: 'Ziel-FPS', refreshRate: 'Monitor-Bildrate',
    baseResolution: 'Basisauflösung', targetResolution: 'Vergleichsauflösung', scalePercent: 'Render-Skalierung',
    ramCapacity: 'Installierter RAM', game: 'Spiel', currentStorage: 'Aktueller Speicher', newStorage: 'Geplanter Speicher',
    driveCapacity: 'Kapazität des neuen Laufwerks', systemSpace: 'Reserve für System und Apps', librarySize: 'Bestehende Spielebibliothek',
    averageGameSize: 'Mittlere Spielgröße', storageType: 'Aktueller Speichertyp',
  }, {
    expectedFps: 'Geschätzte effektive FPS', usefulGain: 'Geschätzter nutzbarer Zuwachs', theoreticalGain: 'Roher Wertunterschied',
    vramChange: 'VRAM-Änderung', powerChange: 'Leistungsaufnahme-Änderung', cpuLimit: 'CPU-Spielraumprüfung',
    expectedOutcome: 'Geschätzter Leistungswert', coreChange: 'Kernzahl-Änderung', gpuLimit: 'GPU-Spielraumprüfung',
    recommendedVram: 'Empfohlene VRAM-Stufe', workingVram: 'Planungsbedarf', headroom: 'Kapazitätsreserve',
    recommendedRam: 'Empfohlene RAM-Stufe', workingRam: 'Geschätzter Arbeits-RAM', currentFrameTime: 'Aktuelle Frame Time',
    targetFrameTime: 'Ziel-Frame-Time', frameTimeDifference: 'Abstand zum Ziel',
    displayUtilization: 'Nutzung der Bildrate', fpsSurplus: 'FPS über Bildrate', refreshHeadroom: 'Ungenutzte Bildratenreserve',
    renderedResolution: 'Interne Renderauflösung', renderedPixels: 'Gerenderte Pixel', suggestedPreset: 'Empfohlenes Qualitäts-Preset',
    presetFps: 'Geschätzte FPS beim Preset', ultraFps: 'Geschätzte FPS auf Ultra', limitingComponent: 'Wahrscheinlich langsamere Komponente',
    ramStatus: 'Speicherkapazitätsprüfung', freeCapacity: 'Nutzbare Kapazität', additionalGames: 'Ungefähre zusätzliche Spiele',
    upgradeClass: 'Upgrade-Zusammenfassung', firstPriority: '1. Priorität', secondPriority: '2. Priorität', thirdPriority: '3. Priorität', fourthPriority: '4. Priorität',
    currentPsu: 'Netzteil-Planungswert des aktuellen PCs', proposedPsu: 'Netzteil-Planungswert des geplanten PCs',
    socketChange: 'Gelisteter CPU-Sockel', platformCheck: 'Plattformprüfung',
  }, {
    gaming: 'Gaming', productivity: 'Produktivität / Kreativarbeit', everyday: 'Alltag', esports: 'Esports',
    streamingCreator: 'Gaming + Streaming', creator: 'Content-Erstellung', aaa: 'Moderne AAA-Spiele', mainstream: 'Normale Spiele',
    modded: 'Stark gemoddet / Simulation', medium: 'Mittel', high: 'Hoch', ultra: 'Ultra', none: 'Aus / keine',
    light: 'Leicht', heavy: 'Stark', one: '1 Monitor', two: '2 Monitore', three: '3 Monitore',
    multitaskLight: 'Leicht: Sprachchat und wenige Tabs', multitaskMedium: 'Mittel: viele Tabs und Programme',
    multitaskHeavy: 'Stark: mehrere aktive Anwendungen', yes: 'Ja', no: 'Nein',
    modLight: 'Wenige leichte Mods', modHeavy: 'Großes Mod-Paket / hochauflösende Assets',
  }, {
    likely: 'Wahrscheinliches Limit', noLikely: 'Kein starkes Limit erkennbar', cpu: 'CPU', gpu: 'GPU', balanced: 'Ausgeglichen',
    sufficient: 'Kapazität entspricht oder übertrifft die Spielbasis', pressure: 'Unter der Spielbasis; Paging möglich',
    competitive: 'Competitive', low: 'Niedrig', medium: 'Mittel', high: 'Hoch', ultra: 'Ultra',
    hddToSsd: 'Großer Reaktionssprung von HDD zu SSD', ssdStep: 'Schnellere Speicherstufe; Ladezeiten variieren',
    sameTier: 'Ähnliche Klasse; Kapazität kann der Hauptvorteil sein', noUrgent: 'Kein großer modellierter Rückstand',
    componentCpu: 'CPU', componentGpu: 'GPU', componentRam: 'RAM', componentStorage: 'Speicher',
    unknown: 'Unbekannt', sameSocket: 'Gleicher Sockel gelistet; Mainboard- und BIOS-Support prüfen',
    platformChange: 'Anderer Sockel; Mainboard- oder Plattformwechsel wahrscheinlich', verifyPlatform: 'Sockeldaten unvollständig; Plattform manuell prüfen',
    checklistTitle: 'Kompatibilitätsprüfung vor dem Kauf',
    cpuSocketSame: 'Beide CPUs listen {socket}, aber ein gleicher Sockel garantiert keinen Chipsatz- oder BIOS-Support.',
    cpuSocketChanged: 'Der Sockel wechselt von {current} zu {proposed}; ein Mainboard- oder Plattformwechsel ist wahrscheinlich.',
    cpuSocketUnknown: 'Sockelangaben sind unvollständig. Beide CPUs und die Mainboard-Supportliste prüfen.',
    cpuBios: 'Mainboardmodell, Chipsatz, BIOS-Version, RAM-Generation und CPU-Supportliste bestätigen.',
    cpuCooling: 'Kühlerbefestigung, thermische Kapazität, Gehäuseplatz und Power-Limits prüfen.',
    gpuPower: 'Netzteil- und Anschlussvorgaben von GPU-Hersteller und Boardpartner bestätigen.',
    gpuClearance: 'Kartenlänge, Dicke, Slot-Freiraum, Halterung und Gehäusebelüftung prüfen.',
    gpuDrivers: 'Display-Ausgänge, Treiber und erforderliche Adapter oder native Kabel prüfen.',
    openPsu: 'Vorausgefüllten Netzteil-Rechner öffnen',
  }),
  es: buildCopy('es', {
    calculator: 'Introduce tu configuración', results: 'Resultado de planificación', calculate: 'Calcular', reset: 'Restablecer',
    estimateNotice: 'Estimación de planificación — verifica con mediciones, compatibilidad y benchmarks independientes.',
  }, {
    currentGpu: 'GPU actual', newGpu: 'GPU propuesta', cpu: 'CPU actual', currentFps: 'FPS actuales o valor base',
    currentCpu: 'CPU actual', newCpu: 'CPU propuesta', gpu: 'GPU actual', useCase: 'Uso principal',
    gameType: 'Tipo de juego', resolution: 'Resolución', textureQuality: 'Calidad de texturas', rayTracing: 'Ray tracing',
    monitorCount: 'Monitores activos', multitasking: 'Multitarea simultánea', streaming: 'Streaming mientras juegas',
    modding: 'Nivel de mods', targetFps: 'FPS objetivo', refreshRate: 'Frecuencia del monitor',
    baseResolution: 'Resolución base', targetResolution: 'Resolución de comparación', scalePercent: 'Escala de renderizado',
    ramCapacity: 'RAM instalada', game: 'Juego', currentStorage: 'Almacenamiento actual', newStorage: 'Almacenamiento propuesto',
    driveCapacity: 'Capacidad de la nueva unidad', systemSpace: 'Reserva para sistema y aplicaciones', librarySize: 'Biblioteca existente',
    averageGameSize: 'Tamaño medio de juego', storageType: 'Tipo de almacenamiento actual',
  }, {
    expectedFps: 'FPS efectivos estimados', usefulGain: 'Mejora útil estimada', theoreticalGain: 'Diferencia bruta de puntuación',
    vramChange: 'Cambio de VRAM', powerChange: 'Cambio de potencia', cpuLimit: 'Comprobación de margen CPU',
    expectedOutcome: 'Valor de rendimiento estimado', coreChange: 'Cambio de núcleos', gpuLimit: 'Comprobación de margen GPU',
    recommendedVram: 'Nivel de VRAM sugerido', workingVram: 'Necesidad de planificación', headroom: 'Margen de capacidad',
    recommendedRam: 'Nivel de RAM sugerido', workingRam: 'RAM de trabajo estimada', currentFrameTime: 'Tiempo de fotograma actual',
    targetFrameTime: 'Tiempo de fotograma objetivo', frameTimeDifference: 'Diferencia con el objetivo',
    displayUtilization: 'Uso de la frecuencia', fpsSurplus: 'FPS sobre la frecuencia', refreshHeadroom: 'Margen de refresco sin usar',
    renderedResolution: 'Resolución interna', renderedPixels: 'Píxeles renderizados', suggestedPreset: 'Ajuste de calidad sugerido',
    presetFps: 'FPS estimados con el ajuste', ultraFps: 'FPS estimados en ultra', limitingComponent: 'Componente probablemente más lento',
    ramStatus: 'Comprobación de memoria', freeCapacity: 'Capacidad utilizable', additionalGames: 'Juegos adicionales aproximados',
    upgradeClass: 'Resumen de la actualización', firstPriority: '1.ª prioridad', secondPriority: '2.ª prioridad', thirdPriority: '3.ª prioridad', fourthPriority: '4.ª prioridad',
    currentPsu: 'Valor de PSU del equipo actual', proposedPsu: 'Valor de PSU del equipo propuesto',
    socketChange: 'Socket de CPU indicado', platformCheck: 'Comprobación de plataforma',
  }, {
    gaming: 'Juegos', productivity: 'Productividad / creación', everyday: 'Uso diario', esports: 'Esports',
    streamingCreator: 'Juegos + streaming', creator: 'Creación de contenido', aaa: 'Juegos AAA modernos', mainstream: 'Juegos comunes',
    modded: 'Muchos mods / simulación', medium: 'Media', high: 'Alta', ultra: 'Ultra', none: 'Desactivado / ninguno',
    light: 'Ligero', heavy: 'Intenso', one: '1 monitor', two: '2 monitores', three: '3 monitores',
    multitaskLight: 'Ligera: chat y pocas pestañas', multitaskMedium: 'Moderada: muchas pestañas y aplicaciones',
    multitaskHeavy: 'Intensa: varias aplicaciones activas', yes: 'Sí', no: 'No',
    modLight: 'Pocos mods ligeros', modHeavy: 'Gran paquete de mods / texturas de alta resolución',
  }, {
    likely: 'Limitación probable', noLikely: 'No se indica un límite fuerte', cpu: 'CPU', gpu: 'GPU', balanced: 'Equilibrado',
    sufficient: 'Capacidad igual o superior al mínimo del juego', pressure: 'Por debajo del mínimo; posible paginación',
    competitive: 'Competitivo', low: 'Bajo', medium: 'Medio', high: 'Alto', ultra: 'Ultra',
    hddToSsd: 'Gran mejora al pasar de HDD a SSD', ssdStep: 'Nivel más rápido; las cargas varían',
    sameTier: 'Clase similar; la capacidad puede ser el beneficio principal', noUrgent: 'Sin gran carencia modelada',
    componentCpu: 'CPU', componentGpu: 'GPU', componentRam: 'RAM', componentStorage: 'Almacenamiento',
    unknown: 'Desconocido', sameSocket: 'Mismo socket indicado; verifica placa y soporte de BIOS',
    platformChange: 'Socket diferente; probable cambio de placa o plataforma', verifyPlatform: 'Datos de socket incompletos; verifica la plataforma',
    checklistTitle: 'Compatibilidad que debes verificar antes de comprar',
    cpuSocketSame: 'Ambas CPU indican {socket}, pero compartir socket no garantiza compatibilidad de chipset o BIOS.',
    cpuSocketChanged: 'El socket cambia de {current} a {proposed}; probablemente necesitarás otra placa o plataforma.',
    cpuSocketUnknown: 'La información de socket está incompleta. Verifica ambas CPU y la lista de soporte de la placa.',
    cpuBios: 'Confirma modelo de placa, chipset, BIOS, generación de RAM y lista de CPU compatibles.',
    cpuCooling: 'Comprueba montaje y capacidad del disipador, espacio de la caja y límites de potencia.',
    gpuPower: 'Confirma potencia y conectores recomendados por el fabricante de la GPU y de la tarjeta.',
    gpuClearance: 'Comprueba longitud, grosor, ranuras, soporte y ventilación de la caja.',
    gpuDrivers: 'Verifica salidas de pantalla, controladores y adaptadores o cables nativos necesarios.',
    openPsu: 'Abrir Calculadora de PSU preconfigurada',
  }),
};

const RESOLUTIONS: Option[] = [
  { value: '1920x1080', label: '1920 × 1080 (1080p)' },
  { value: '2560x1440', label: '2560 × 1440 (1440p)' },
  { value: '3440x1440', label: '3440 × 1440 (ultrawide)' },
  { value: '3840x2160', label: '3840 × 2160 (4K)' },
];

const option = (copy: UiCopy, value: string, key: string): Option => ({ value, label: copy.options[key] ?? key });
const choose = (items: ToolHardwareOption[], needle: string, fallback: number) =>
  items.find((item) => item.id.toLowerCase().includes(needle))?.id ?? items[Math.min(fallback, Math.max(0, items.length - 1))]?.id ?? '';

function getFields(slug: ToolSlug, data: ToolDatasets, copy: UiCopy): Field[] {
  const cpuOptions = data.cpus.map((item) => ({ value: item.id, label: item.name }));
  const gpuOptions = data.gpus.map((item) => ({ value: item.id, label: item.name }));
  const gameOptions = data.games.map((item) => ({ value: item.id, label: item.name }));
  const currentCpu = choose(data.cpus, '7800x3d', 10);
  const proposedCpu = choose(data.cpus, '9800x3d', 3);
  const currentGpu = choose(data.gpus, 'rtx-4060', 15);
  const proposedGpu = choose(data.gpus, 'rtx-5070', 4);

  switch (slug) {
    case 'gpu-upgrade-calculator':
      return [
        { key: 'currentGpu', type: 'select', defaultValue: currentGpu, options: gpuOptions },
        { key: 'newGpu', type: 'select', defaultValue: proposedGpu, options: gpuOptions },
        { key: 'cpu', type: 'select', defaultValue: currentCpu, options: cpuOptions },
        { key: 'currentFps', type: 'number', defaultValue: '60', min: 1, max: 1000, step: 1, unit: 'FPS' },
      ];
    case 'cpu-upgrade-calculator':
      return [
        { key: 'currentCpu', type: 'select', defaultValue: currentCpu, options: cpuOptions },
        { key: 'newCpu', type: 'select', defaultValue: proposedCpu, options: cpuOptions },
        { key: 'gpu', type: 'select', defaultValue: currentGpu, options: gpuOptions },
        { key: 'useCase', type: 'select', defaultValue: 'gaming', options: [option(copy, 'gaming', 'gaming'), option(copy, 'productivity', 'productivity')] },
        { key: 'currentFps', type: 'number', defaultValue: '60', min: 1, max: 10000, step: 1 },
      ];
    case 'vram-calculator':
      return [
        { key: 'gameType', type: 'select', defaultValue: 'aaa', options: [option(copy, 'esports', 'esports'), option(copy, 'mainstream', 'mainstream'), option(copy, 'aaa', 'aaa'), option(copy, 'modded', 'modded')] },
        { key: 'resolution', type: 'select', defaultValue: '2560x1440', options: RESOLUTIONS },
        { key: 'textureQuality', type: 'select', defaultValue: 'high', options: [option(copy, 'medium', 'medium'), option(copy, 'high', 'high'), option(copy, 'ultra', 'ultra')] },
        { key: 'rayTracing', type: 'select', defaultValue: 'light', options: [option(copy, 'none', 'none'), option(copy, 'light', 'light'), option(copy, 'heavy', 'heavy')] },
        { key: 'monitorCount', type: 'select', defaultValue: '1', options: [option(copy, '1', 'one'), option(copy, '2', 'two'), option(copy, '3', 'three')] },
      ];
    case 'gaming-ram-calculator':
      return [
        { key: 'gameType', type: 'select', defaultValue: 'aaa', options: [option(copy, 'esports', 'esports'), option(copy, 'mainstream', 'mainstream'), option(copy, 'aaa', 'aaa'), option(copy, 'modded', 'modded')] },
        { key: 'multitasking', type: 'select', defaultValue: 'medium', options: [option(copy, 'light', 'multitaskLight'), option(copy, 'medium', 'multitaskMedium'), option(copy, 'heavy', 'multitaskHeavy')] },
        { key: 'streaming', type: 'select', defaultValue: 'no', options: [option(copy, 'no', 'no'), option(copy, 'yes', 'yes')] },
        { key: 'modding', type: 'select', defaultValue: 'light', options: [option(copy, 'none', 'none'), option(copy, 'light', 'modLight'), option(copy, 'heavy', 'modHeavy')] },
      ];
    case 'frame-time-calculator':
      return [
        { key: 'currentFps', type: 'number', defaultValue: '60', min: 1, max: 1000, step: 1, unit: 'FPS' },
        { key: 'targetFps', type: 'number', defaultValue: '144', min: 1, max: 1000, step: 1, unit: 'FPS' },
      ];
    case 'fps-refresh-rate-calculator':
      return [
        { key: 'currentFps', type: 'number', defaultValue: '120', min: 1, max: 1000, step: 1, unit: 'FPS' },
        { key: 'refreshRate', type: 'number', defaultValue: '144', min: 1, max: 1000, step: 1, unit: 'Hz' },
      ];
    case 'resolution-scaling-calculator':
      return [
        { key: 'baseResolution', type: 'select', defaultValue: '3840x2160', options: RESOLUTIONS },
        { key: 'scalePercent', type: 'number', defaultValue: '67', min: 25, max: 200, step: 1, unit: '%' },
        { key: 'targetResolution', type: 'select', defaultValue: '2560x1440', options: RESOLUTIONS },
      ];
    case 'game-settings-optimizer':
      return [
        { key: 'cpu', type: 'select', defaultValue: currentCpu, options: cpuOptions },
        { key: 'gpu', type: 'select', defaultValue: currentGpu, options: gpuOptions },
        { key: 'ramCapacity', type: 'number', defaultValue: '32', min: 4, max: 512, step: 4, unit: 'GB' },
        { key: 'game', type: 'select', defaultValue: gameOptions[0]?.value ?? '', options: gameOptions },
        { key: 'resolution', type: 'select', defaultValue: '2560x1440', options: RESOLUTIONS },
        { key: 'targetFps', type: 'number', defaultValue: '60', min: 15, max: 500, step: 1, unit: 'FPS' },
      ];
    case 'ssd-upgrade-calculator':
      return [
        { key: 'currentStorage', type: 'select', defaultValue: 'hdd', options: [option(copy, 'hdd', 'hdd'), option(copy, 'sata', 'sata'), option(copy, 'nvme3', 'nvme3'), option(copy, 'nvme4', 'nvme4')] },
        { key: 'newStorage', type: 'select', defaultValue: 'nvme4', options: [option(copy, 'hdd', 'hdd'), option(copy, 'sata', 'sata'), option(copy, 'nvme3', 'nvme3'), option(copy, 'nvme4', 'nvme4')] },
        { key: 'driveCapacity', type: 'number', defaultValue: '2000', min: 128, max: 100000, step: 1, unit: 'GB' },
        { key: 'systemSpace', type: 'number', defaultValue: '200', min: 0, max: 100000, step: 1, unit: 'GB' },
        { key: 'librarySize', type: 'number', defaultValue: '500', min: 0, max: 100000, step: 1, unit: 'GB' },
        { key: 'averageGameSize', type: 'number', defaultValue: '80', min: 1, max: 2000, step: 1, unit: 'GB' },
      ];
    case 'pc-upgrade-priority-calculator':
      return [
        { key: 'cpu', type: 'select', defaultValue: currentCpu, options: cpuOptions },
        { key: 'gpu', type: 'select', defaultValue: currentGpu, options: gpuOptions },
        { key: 'ramCapacity', type: 'number', defaultValue: '16', min: 4, max: 512, step: 4, unit: 'GB' },
        { key: 'storageType', type: 'select', defaultValue: 'sata', options: [option(copy, 'hdd', 'hdd'), option(copy, 'sata', 'sata'), option(copy, 'nvme3', 'nvme3'), option(copy, 'nvme4', 'nvme4')] },
        { key: 'resolution', type: 'select', defaultValue: '2560x1440', options: RESOLUTIONS },
        { key: 'useCase', type: 'select', defaultValue: 'gaming', options: [option(copy, 'gaming', 'gaming'), option(copy, 'esports', 'esports'), option(copy, 'streaming', 'streamingCreator'), option(copy, 'creator', 'creator'), option(copy, 'everyday', 'everyday')] },
      ];
  }
}

const numeric = (values: Record<string, string>, key: FieldKey) => Number(values[key]) || 0;
const byId = (items: ToolHardwareOption[], id: string) => items.find((item) => item.id === id) ?? items[0];
const gameById = (items: ToolGameOption[], id: string) => items.find((item) => item.id === id) ?? items[0];
const tier = (value: number, tiers: number[]) => tiers.find((item) => item >= value) ?? Math.ceil(value / 16) * 16;
const parseResolution = (value: string) => value.split('x').map(Number) as [number, number];
const signed = (value: number, digits = 0) => (value > 0 ? '+' : '') + value.toFixed(digits);

function calculate(slug: ToolSlug, values: Record<string, string>, data: ToolDatasets, copy: UiCopy): ResultItem[] {
  switch (slug) {
    case 'gpu-upgrade-calculator': {
      const current = byId(data.gpus, values.currentGpu);
      const proposed = byId(data.gpus, values.newGpu);
      const cpu = byId(data.cpus, values.cpu);
      const cpuCeiling = cpu.score * 1.15;
      const currentEffective = Math.min(current.score, cpuCeiling);
      const proposedEffective = Math.min(proposed.score, cpuCeiling);
      const usefulGain = (proposedEffective / Math.max(1, currentEffective) - 1) * 100;
      const theoretical = (proposed.score / Math.max(1, current.score) - 1) * 100;
      const fps = numeric(values, 'currentFps') * proposedEffective / Math.max(1, currentEffective);
      const currentPsu = estimatePSUPlanningFromPower(cpu.tdp, current.tdp).planningWattage;
      const proposedPsu = estimatePSUPlanningFromPower(cpu.tdp, proposed.tdp).planningWattage;
      return [
        { key: 'expectedFps', value: fps, unit: 'FPS', digits: 0, primary: true },
        { key: 'usefulGain', value: signed(usefulGain, 1), unit: '%'},
        { key: 'theoreticalGain', value: signed(theoretical, 1), unit: '%' },
        { key: 'vramChange', value: signed((proposed.vram ?? 0) - (current.vram ?? 0)), unit: 'GB' },
        { key: 'powerChange', value: signed(proposed.tdp - current.tdp), unit: 'W' },
        { key: 'currentPsu', value: currentPsu, unit: 'W' },
        { key: 'proposedPsu', value: proposedPsu, unit: 'W' },
        { key: 'cpuLimit', value: proposed.score > cpuCeiling ? copy.messages.likely : copy.messages.noLikely },
      ];
    }
    case 'cpu-upgrade-calculator': {
      const current = byId(data.cpus, values.currentCpu);
      const proposed = byId(data.cpus, values.newCpu);
      const gpu = byId(data.gpus, values.gpu);
      const gaming = values.useCase === 'gaming';
      const cap = gpu.score * 1.1;
      const currentEffective = gaming ? Math.min(current.score, cap) : current.score;
      const proposedEffective = gaming ? Math.min(proposed.score, cap) : proposed.score;
      const gain = (proposedEffective / Math.max(1, currentEffective) - 1) * 100;
      const theoretical = (proposed.score / Math.max(1, current.score) - 1) * 100;
      const currentPsu = estimatePSUPlanningFromPower(current.tdp, gpu.tdp).planningWattage;
      const proposedPsu = estimatePSUPlanningFromPower(proposed.tdp, gpu.tdp).planningWattage;
      const currentSocket = current.socket || copy.messages.unknown;
      const proposedSocket = proposed.socket || copy.messages.unknown;
      const platformCheck = !current.socket || !proposed.socket
        ? copy.messages.verifyPlatform
        : current.socket.toLowerCase() === proposed.socket.toLowerCase()
          ? copy.messages.sameSocket
          : copy.messages.platformChange;
      return [
        { key: 'expectedOutcome', value: numeric(values, 'currentFps') * proposedEffective / Math.max(1, currentEffective), unit: gaming ? 'FPS' : 'index', digits: 0, primary: true },
        { key: 'usefulGain', value: signed(gain, 1), unit: '%' },
        { key: 'theoreticalGain', value: signed(theoretical, 1), unit: '%' },
        { key: 'coreChange', value: signed((proposed.cores ?? 0) - (current.cores ?? 0)), unit: 'cores' },
        { key: 'powerChange', value: signed(proposed.tdp - current.tdp), unit: 'W' },
        { key: 'socketChange', value: `${currentSocket} → ${proposedSocket}` },
        { key: 'platformCheck', value: platformCheck },
        { key: 'currentPsu', value: currentPsu, unit: 'W' },
        { key: 'proposedPsu', value: proposedPsu, unit: 'W' },
        { key: 'gpuLimit', value: gaming && proposed.score > cap ? copy.messages.likely : copy.messages.noLikely },
      ];
    }
    case 'vram-calculator': {
      const bases: Record<string, number> = { esports: 3, mainstream: 4, aaa: 6, modded: 8 };
      const resolution: Record<string, number> = { '1920x1080': 0, '2560x1440': 1.5, '3440x1440': 2.5, '3840x2160': 4 };
      const textures: Record<string, number> = { medium: 0, high: 1.5, ultra: 3 };
      const rt: Record<string, number> = { none: 0, light: 1.5, heavy: 3 };
      const working = (bases[values.gameType] ?? 4) + (resolution[values.resolution] ?? 0) +
        (textures[values.textureQuality] ?? 0) + (rt[values.rayTracing] ?? 0) + Math.max(0, numeric(values, 'monitorCount') - 1) * 0.4;
      const recommendation = tier(working * 1.1, [4, 6, 8, 10, 12, 16, 20, 24, 32]);
      return [
        { key: 'recommendedVram', value: recommendation, unit: 'GB', digits: 0, primary: true },
        { key: 'workingVram', value: working, unit: 'GB', digits: 1 },
        { key: 'headroom', value: recommendation - working, unit: 'GB', digits: 1 },
      ];
    }
    case 'gaming-ram-calculator': {
      const bases: Record<string, number> = { esports: 10, mainstream: 12, aaa: 16, modded: 22 };
      const multi: Record<string, number> = { light: 1, medium: 4, heavy: 8 };
      const mods: Record<string, number> = { none: 0, light: 3, heavy: 12 };
      const working = (bases[values.gameType] ?? 16) + (multi[values.multitasking] ?? 0) +
        (values.streaming === 'yes' ? 6 : 0) + (mods[values.modding] ?? 0);
      const recommendation = tier(working * 1.2, [16, 24, 32, 48, 64, 96, 128]);
      return [
        { key: 'recommendedRam', value: recommendation, unit: 'GB', digits: 0, primary: true },
        { key: 'workingRam', value: working, unit: 'GB', digits: 1 },
        { key: 'headroom', value: recommendation - working, unit: 'GB', digits: 1 },
      ];
    }
    case 'frame-time-calculator': {
      const current = 1000 / Math.max(1, numeric(values, 'currentFps'));
      const target = 1000 / Math.max(1, numeric(values, 'targetFps'));
      return [
        { key: 'currentFrameTime', value: current, unit: 'ms', digits: 2, primary: true },
        { key: 'targetFrameTime', value: target, unit: 'ms', digits: 2 },
        { key: 'frameTimeDifference', value: signed(current - target, 2), unit: 'ms' },
      ];
    }
    case 'fps-refresh-rate-calculator': {
      const fps = numeric(values, 'currentFps');
      const hz = Math.max(1, numeric(values, 'refreshRate'));
      return [
        { key: 'displayUtilization', value: Math.min(100, fps / hz * 100), unit: '%', digits: 1, primary: true },
        { key: 'fpsSurplus', value: Math.max(0, fps - hz), unit: 'FPS', digits: 0 },
        { key: 'refreshHeadroom', value: Math.max(0, hz - fps), unit: 'Hz', digits: 0 },
        { key: 'renderInterval', value: 1000 / Math.max(1, fps), unit: 'ms', digits: 2 },
        { key: 'refreshInterval', value: 1000 / hz, unit: 'ms', digits: 2 },
      ];
    }
    case 'resolution-scaling-calculator': {
      const [baseWidth, baseHeight] = parseResolution(values.baseResolution);
      const [targetWidth, targetHeight] = parseResolution(values.targetResolution);
      const scale = numeric(values, 'scalePercent') / 100;
      const renderWidth = Math.round(baseWidth * scale);
      const renderHeight = Math.round(baseHeight * scale);
      const rendered = renderWidth * renderHeight;
      const native = baseWidth * baseHeight;
      const target = targetWidth * targetHeight;
      return [
        { key: 'renderedResolution', value: renderWidth + ' × ' + renderHeight, primary: true },
        { key: 'renderedPixels', value: rendered / 1_000_000, unit: 'MP', digits: 2 },
        { key: 'nativeWorkloadChange', value: signed((rendered / native - 1) * 100, 1), unit: '%' },
        { key: 'targetWorkloadChange', value: signed((rendered / target - 1) * 100, 1), unit: '%' },
      ];
    }
    case 'game-settings-optimizer': {
      const cpu = byId(data.cpus, values.cpu);
      const gpu = byId(data.gpus, values.gpu);
      const game = gameById(data.games, values.game);
      const [width, height] = parseResolution(values.resolution);
      const pixelFactor = 2_073_600 / Math.max(1, width * height);
      const resolutionFactor = Math.pow(pixelFactor, 0.55);
      const demand: Record<string, number> = { Low: 1.2, Medium: 1, High: 0.8, Extreme: 0.6 };
      const cpuDemandFactor = demand[game.cpuDemand] ?? 1;
      const gpuDemandFactor = demand[game.gpuDemand] ?? 1;
      const cpuContribution = cpu.score * cpuDemandFactor;
      const gpuContribution = gpu.score * gpuDemandFactor * resolutionFactor;
      const baseline = Math.min(cpuContribution, gpuContribution) * 1.5;
      const ramFactor = numeric(values, 'ramCapacity') >= game.ramRequirement ? 1 : Math.max(0.7, numeric(values, 'ramCapacity') / game.ramRequirement);
      const presets = [
        { id: 'ultra', factor: 0.72 }, { id: 'high', factor: 0.86 }, { id: 'medium', factor: 1 },
        { id: 'low', factor: 1.18 }, { id: 'competitive', factor: 1.35 },
      ];
      const target = numeric(values, 'targetFps');
      const selected = presets.find((preset) => baseline * preset.factor * ramFactor >= target) ?? presets[presets.length - 1];
      const limited = cpuContribution < gpuContribution * 0.9 ? copy.messages.cpu : gpuContribution < cpuContribution * 0.9 ? copy.messages.gpu : copy.messages.balanced;
      return [
        { key: 'suggestedPreset', value: copy.messages[selected.id], primary: true },
        { key: 'presetFps', value: baseline * selected.factor * ramFactor, unit: 'FPS', digits: 0 },
        { key: 'ultraFps', value: baseline * presets[0].factor * ramFactor, unit: 'FPS', digits: 0 },
        { key: 'limitingComponent', value: limited },
        { key: 'ramStatus', value: numeric(values, 'ramCapacity') >= game.ramRequirement ? copy.messages.sufficient : copy.messages.pressure },
      ];
    }
    case 'ssd-upgrade-calculator': {
      const scores: Record<string, number> = { hdd: 1, sata: 3.5, nvme3: 5, nvme4: 6 };
      const current = scores[values.currentStorage] ?? 1;
      const proposed = scores[values.newStorage] ?? 1;
      const free = Math.max(0, numeric(values, 'driveCapacity') * 0.9 - numeric(values, 'systemSpace') - numeric(values, 'librarySize'));
      const summary = values.currentStorage === 'hdd' && values.newStorage !== 'hdd'
        ? copy.messages.hddToSsd
        : proposed > current ? copy.messages.ssdStep : copy.messages.sameTier;
      return [
        { key: 'upgradeClass', value: summary, primary: true },
        { key: 'responsivenessGain', value: signed((proposed / current - 1) * 100, 0), unit: '% index' },
        { key: 'freeCapacity', value: free, unit: 'GB', digits: 0 },
        { key: 'additionalGames', value: Math.floor(free / Math.max(1, numeric(values, 'averageGameSize'))), digits: 0 },
      ];
    }
    case 'pc-upgrade-priority-calculator': {
      const cpu = byId(data.cpus, values.cpu);
      const gpu = byId(data.gpus, values.gpu);
      const storageScores: Record<string, number> = { hdd: 1, sata: 3.5, nvme3: 5, nvme4: 6 };
      const profile: Record<string, { cpu: number; gpu: number; ram: number; storage: number; weights: number[] }> = {
        gaming: { cpu: 75, gpu: 80, ram: 32, storage: 3.5, weights: [0.9, 1.2, 0.7, 0.5] },
        esports: { cpu: 85, gpu: 65, ram: 24, storage: 3.5, weights: [1.2, 0.8, 0.6, 0.4] },
        streaming: { cpu: 85, gpu: 75, ram: 32, storage: 3.5, weights: [1.1, 1, 0.9, 0.5] },
        creator: { cpu: 90, gpu: 75, ram: 64, storage: 5, weights: [1.2, 0.8, 1, 0.8] },
        everyday: { cpu: 50, gpu: 35, ram: 16, storage: 3.5, weights: [0.7, 0.3, 0.8, 1.1] },
      };
      const selected = profile[values.useCase] ?? profile.gaming;
      const resolutionBoost: Record<string, number> = { '1920x1080': 0, '2560x1440': 8, '3440x1440': 12, '3840x2160': 20 };
      const gpuTarget = selected.gpu + (resolutionBoost[values.resolution] ?? 0);
      const shortfall = (actual: number, target: number, weight: number) => Math.max(0, (target - actual) / target * 100) * weight;
      const ranked = [
        { name: copy.messages.componentCpu, score: shortfall(cpu.score, selected.cpu, selected.weights[0]) },
        { name: copy.messages.componentGpu, score: shortfall(gpu.score, gpuTarget, selected.weights[1]) },
        { name: copy.messages.componentRam, score: shortfall(numeric(values, 'ramCapacity'), selected.ram, selected.weights[2]) },
        { name: copy.messages.componentStorage, score: shortfall(storageScores[values.storageType] ?? 1, selected.storage, selected.weights[3]) },
      ].sort((a, b) => b.score - a.score);
      const value = (item: { name: string; score: number }) => item.score < 1 ? item.name + ' — ' + copy.messages.noUrgent : item.name + ' — ' + item.score.toFixed(0) + '%';
      return [
        { key: 'firstPriority', value: value(ranked[0]), primary: true },
        { key: 'secondPriority', value: value(ranked[1]) },
        { key: 'thirdPriority', value: value(ranked[2]) },
        { key: 'fourthPriority', value: value(ranked[3]) },
      ];
    }
  }
}

function buildInitialValues(fields: Field[], initial?: Record<string, string>) {
  return fields.reduce<Record<string, string>>((accumulator, field) => {
    const candidate = initial?.[field.key];
    const validSelect = field.type === 'select'
      && Boolean(field.options?.some((item) => item.value === candidate));
    const numericCandidate = field.type === 'number' && candidate !== undefined
      ? Number(candidate)
      : Number.NaN;
    const validNumber = field.type === 'number'
      && Number.isFinite(numericCandidate)
      && (field.min === undefined || numericCandidate >= field.min)
      && (field.max === undefined || numericCandidate <= field.max);
    accumulator[field.key] = validSelect || validNumber ? candidate! : field.defaultValue;
    return accumulator;
  }, {});
}

export function ToolCalculator({
  slug,
  lang,
  data,
  initialSelection,
}: {
  slug: ToolSlug;
  lang: Locale;
  data: ToolDatasets;
  initialSelection?: Record<string, string>;
}) {
  const copy = UI_COPY[lang] ?? UI_COPY.en;
  const fields = useMemo(() => getFields(slug, data, copy), [slug, data, copy]);
  const defaults = useMemo(
    () => buildInitialValues(fields, initialSelection),
    [fields, initialSelection]
  );
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [submitted, setSubmitted] = useState<Record<string, string>>(defaults);
  const results = useMemo(() => calculate(slug, submitted, data, copy), [slug, submitted, data, copy]);

  useEffect(() => {
    setValues(defaults);
    setSubmitted(defaults);
  }, [defaults]);
  const readiness = useMemo(() => {
    if (slug === 'cpu-upgrade-calculator') {
      const current = byId(data.cpus, submitted.currentCpu);
      const proposed = byId(data.cpus, submitted.newCpu);
      const gpu = byId(data.gpus, submitted.gpu);
      const socketMessage = !current.socket || !proposed.socket
        ? copy.messages.cpuSocketUnknown
        : current.socket.toLowerCase() === proposed.socket.toLowerCase()
          ? copy.messages.cpuSocketSame.replace('{socket}', proposed.socket)
          : copy.messages.cpuSocketChanged
              .replace('{current}', current.socket)
              .replace('{proposed}', proposed.socket);
      return {
        items: [socketMessage, copy.messages.cpuBios, copy.messages.cpuCooling],
        psuHref: `${getLocalizedPath(lang, 'psu-calculator')}?${new URLSearchParams({
          cpu: proposed.id,
          gpu: gpu.id,
        }).toString()}`,
      };
    }

    if (slug === 'gpu-upgrade-calculator') {
      const proposed = byId(data.gpus, submitted.newGpu);
      const cpu = byId(data.cpus, submitted.cpu);
      return {
        items: [copy.messages.gpuPower, copy.messages.gpuClearance, copy.messages.gpuDrivers],
        psuHref: `${getLocalizedPath(lang, 'psu-calculator')}?${new URLSearchParams({
          cpu: cpu.id,
          gpu: proposed.id,
        }).toString()}`,
      };
    }

    return null;
  }, [copy.messages, data.cpus, data.gpus, lang, slug, submitted]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted({ ...values });
  };

  const reset = () => {
    setValues(defaults);
    setSubmitted(defaults);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(290px,0.85fr)]">
      <Card className="border-slate-200 shadow-sm dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calculator className="h-5 w-5 text-blue-600" aria-hidden="true" />
            {copy.calculator}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => {
              const id = slug + '-' + field.key;
              return (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={id}>{copy.fields[field.key]}</Label>
                  <div className="relative">
                    {field.type === 'select' ? (
                      <select
                        id={id}
                        value={values[field.key] ?? field.defaultValue}
                        onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                        className="flex min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {field.options?.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                      </select>
                    ) : (
                      <Input
                        id={id}
                        type="number"
                        inputMode="decimal"
                        value={values[field.key] ?? field.defaultValue}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        required
                        onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                        className={field.unit ? 'min-h-11 pr-16' : 'min-h-11'}
                      />
                    )}
                    {field.unit && field.type === 'number' && (
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-muted-foreground">{field.unit}</span>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="flex flex-wrap gap-3 pt-1 sm:col-span-2">
              <Button type="submit">{copy.calculate}</Button>
              <Button type="button" variant="outline" onClick={reset}>
                <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                {copy.reset}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card aria-live="polite" className="border-blue-200 bg-blue-50/60 shadow-sm dark:border-blue-900 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-blue-600" aria-hidden="true" />
            {copy.results}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {results.map((result) => {
            const rendered = typeof result.value === 'number'
              ? new Intl.NumberFormat(lang, {
                minimumFractionDigits: result.digits ?? 0,
                maximumFractionDigits: result.digits ?? 0,
              }).format(result.value)
              : result.value;
            return (
              <div key={result.key} className={result.primary ? 'rounded-xl bg-blue-600 p-4 text-white' : 'rounded-lg border bg-background/85 p-3'}>
                <div className={result.primary ? 'text-sm text-blue-100' : 'text-sm text-muted-foreground'}>
                  {copy.resultLabels[result.key]}
                </div>
                <div className={result.primary ? 'mt-1 break-words text-2xl font-bold' : 'mt-1 break-words text-lg font-semibold'}>
                  {rendered}{result.unit ? ' ' + result.unit : ''}
                </div>
              </div>
            );
          })}
          {readiness && (
            <div className="mt-4 rounded-xl border border-amber-300/70 bg-amber-50/70 p-4 dark:border-amber-800 dark:bg-amber-950/25">
              <h3 className="flex items-center gap-2 font-semibold text-amber-950 dark:text-amber-100">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                {copy.messages.checklistTitle}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-950/90 dark:text-amber-100/90">
                {readiness.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <AlertTriangle className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-4 w-full bg-background/80">
                <Link href={readiness.psuHref}>
                  {copy.messages.openPsu}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          )}
          <p className="pt-2 text-xs leading-relaxed text-muted-foreground">{copy.estimateNotice}</p>
        </CardContent>
      </Card>
    </div>
  );
}
