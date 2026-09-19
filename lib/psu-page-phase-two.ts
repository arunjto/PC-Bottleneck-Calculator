import type { Locale } from '@/i18n-config';
import type { PsuCoolingType, PsuPeripheralBreakdown } from '@/lib/psu-model';

export type PsuPhaseTwoCopy = {
  sectionTitle: string;
  sectionDescription: string;
  platformLabel: string;
  platformDescription: string;
  ramSticks: string;
  nvmeDrives: string;
  sataSsds: string;
  hardDrives: string;
  caseFans: string;
  cooling: string;
  coolingOptions: Record<PsuCoolingType, string>;
  advancedTitle: string;
  advancedDescription: string;
  rgbControllers: string;
  addInCards: string;
  usbDevices: string;
  secondGpu: string;
  secondGpuDescription: string;
  secondGpuPlaceholder: string;
  overclocking: string;
  overclockingDescription: string;
  manualExtra: string;
  manualExtraDescription: string;
  wattsEach: (watts: number) => string;
  estimatedWatts: (watts: number) => string;
  assumptionsNote: string;
  incomplete: string;
  breakdownTitle: string;
  breakdownDescription: string;
  breakdownLabels: Record<keyof PsuPeripheralBreakdown, string>;
};

const COPY: Record<Locale, PsuPhaseTwoCopy> = {
  en: {
    sectionTitle: 'Components beyond the CPU and GPU',
    sectionDescription: 'Adjust the parts actually installed. The watt values are transparent planning allowances, not measured draw for every model.',
    platformLabel: 'Motherboard and platform baseline', platformDescription: 'Chipset, motherboard controllers, and basic platform load',
    ramSticks: 'RAM sticks', nvmeDrives: 'NVMe SSDs', sataSsds: 'SATA SSDs', hardDrives: 'Hard drives', caseFans: 'Case fans', cooling: 'CPU cooling',
    coolingOptions: { air: 'Air cooler', aio: 'AIO liquid cooler', customLoop: 'Custom water loop' },
    advancedTitle: 'Advanced and optional loads', advancedDescription: 'Add only the devices or power allowances that apply to this build.',
    rgbControllers: 'RGB / fan controllers', addInCards: 'Capture or PCIe add-in cards', usbDevices: 'Higher-power USB devices',
    secondGpu: 'Second graphics card', secondGpuDescription: 'For compute, rendering, or another workload that actively uses both cards.', secondGpuPlaceholder: 'No second GPU',
    overclocking: 'Overclocking or raised power limits', overclockingDescription: 'Adds a 15% planning allowance to the selected CPU and GPU power figures.',
    manualExtra: 'Manual extra allowance', manualExtraDescription: 'Use for pumps, unusual PCIe devices, or loads not represented above.',
    wattsEach: watts => `~${watts}W each`, estimatedWatts: watts => `Estimated allowance: ${watts}W`,
    assumptionsNote: 'Changing an input updates the component allowance used by the 15%, 30%, and 50% headroom scenarios. Exact device draw can differ.',
    incomplete: 'Select a CPU and GPU to calculate', breakdownTitle: 'Detailed component allowances', breakdownDescription: 'The non-CPU/GPU portion of the estimate, shown so every added watt remains visible.',
    breakdownLabels: { platform: 'Motherboard and platform', memory: 'Memory', nvme: 'NVMe storage', sataSsds: 'SATA SSD storage', hardDrives: 'Hard drives', caseFans: 'Case fans', cooling: 'CPU cooling', rgbControllers: 'RGB / fan controllers', addInCards: 'PCIe add-in cards', usbDevices: 'USB devices', secondGpu: 'Second GPU', overclocking: 'Overclocking allowance', manualExtra: 'Manual extra allowance' },
  },
  it: {
    sectionTitle: 'Componenti oltre CPU e GPU', sectionDescription: 'Imposta i componenti realmente installati. I watt sono quote di pianificazione trasparenti, non misure per ogni modello.',
    platformLabel: 'Base scheda madre e piattaforma', platformDescription: 'Chipset, controller della scheda madre e carico base', ramSticks: 'Moduli RAM', nvmeDrives: 'SSD NVMe', sataSsds: 'SSD SATA', hardDrives: 'Hard disk', caseFans: 'Ventole del case', cooling: 'Raffreddamento CPU', coolingOptions: { air: 'Dissipatore ad aria', aio: 'AIO a liquido', customLoop: 'Loop personalizzato' },
    advancedTitle: 'Carichi avanzati e opzionali', advancedDescription: 'Aggiungi solo i dispositivi o i margini pertinenti alla configurazione.', rgbControllers: 'Controller RGB / ventole', addInCards: 'Schede di acquisizione o PCIe', usbDevices: 'Dispositivi USB ad alto consumo', secondGpu: 'Seconda scheda grafica', secondGpuDescription: 'Per calcolo, rendering o carichi che usano entrambe le schede.', secondGpuPlaceholder: 'Nessuna seconda GPU', overclocking: 'Overclock o limiti di potenza aumentati', overclockingDescription: 'Aggiunge il 15% ai valori di potenza di CPU e GPU.', manualExtra: 'Margine extra manuale', manualExtraDescription: 'Per pompe, dispositivi PCIe insoliti o carichi non elencati.', wattsEach: watts => `~${watts} W ciascuno`, estimatedWatts: watts => `Quota stimata: ${watts} W`, assumptionsNote: 'Ogni modifica aggiorna la quota usata negli scenari con margine del 15%, 30% e 50%. Il consumo reale può variare.', incomplete: 'Seleziona CPU e GPU per calcolare', breakdownTitle: 'Quote dettagliate dei componenti', breakdownDescription: 'La parte della stima oltre CPU e GPU, mostrata in modo trasparente.', breakdownLabels: { platform: 'Scheda madre e piattaforma', memory: 'Memoria', nvme: 'Archiviazione NVMe', sataSsds: 'SSD SATA', hardDrives: 'Hard disk', caseFans: 'Ventole case', cooling: 'Raffreddamento CPU', rgbControllers: 'Controller RGB / ventole', addInCards: 'Schede PCIe aggiuntive', usbDevices: 'Dispositivi USB', secondGpu: 'Seconda GPU', overclocking: 'Margine overclock', manualExtra: 'Margine manuale' },
  },
  fr: {
    sectionTitle: 'Composants hors CPU et GPU', sectionDescription: 'Réglez les composants réellement installés. Les watts sont des réserves de planification transparentes, pas des mesures pour chaque modèle.',
    platformLabel: 'Base carte mère et plateforme', platformDescription: 'Chipset, contrôleurs de la carte mère et charge de base', ramSticks: 'Barrettes RAM', nvmeDrives: 'SSD NVMe', sataSsds: 'SSD SATA', hardDrives: 'Disques durs', caseFans: 'Ventilateurs du boîtier', cooling: 'Refroidissement CPU', coolingOptions: { air: 'Refroidisseur à air', aio: 'AIO liquide', customLoop: 'Boucle personnalisée' },
    advancedTitle: 'Charges avancées et facultatives', advancedDescription: 'Ajoutez uniquement les appareils ou réserves applicables à cette configuration.', rgbControllers: 'Contrôleurs RGB / ventilateurs', addInCards: 'Cartes de capture ou PCIe', usbDevices: 'Périphériques USB puissants', secondGpu: 'Deuxième carte graphique', secondGpuDescription: 'Pour le calcul, le rendu ou une charge utilisant réellement les deux cartes.', secondGpuPlaceholder: 'Aucun second GPU', overclocking: 'Overclocking ou limites relevées', overclockingDescription: 'Ajoute une réserve de 15% aux puissances CPU et GPU sélectionnées.', manualExtra: 'Réserve manuelle supplémentaire', manualExtraDescription: 'Pour pompes, cartes PCIe atypiques ou charges non représentées.', wattsEach: watts => `~${watts} W chacun`, estimatedWatts: watts => `Réserve estimée : ${watts} W`, assumptionsNote: 'Chaque entrée modifie la réserve utilisée par les scénarios à 15%, 30% et 50%. La consommation réelle peut varier.', incomplete: 'Sélectionnez un CPU et un GPU', breakdownTitle: 'Réserves détaillées des composants', breakdownDescription: 'Part de l’estimation hors CPU et GPU, affichée pour rendre chaque watt ajouté visible.', breakdownLabels: { platform: 'Carte mère et plateforme', memory: 'Mémoire', nvme: 'Stockage NVMe', sataSsds: 'SSD SATA', hardDrives: 'Disques durs', caseFans: 'Ventilateurs boîtier', cooling: 'Refroidissement CPU', rgbControllers: 'Contrôleurs RGB / ventilateurs', addInCards: 'Cartes PCIe', usbDevices: 'Périphériques USB', secondGpu: 'Deuxième GPU', overclocking: 'Réserve overclocking', manualExtra: 'Réserve manuelle' },
  },
  de: {
    sectionTitle: 'Komponenten neben CPU und GPU', sectionDescription: 'Passen Sie die tatsächlich eingebauten Teile an. Die Wattwerte sind transparente Planungspauschalen, keine Messwerte jedes Modells.',
    platformLabel: 'Mainboard- und Plattformbasis', platformDescription: 'Chipsatz, Mainboard-Controller und grundlegende Plattformlast', ramSticks: 'RAM-Module', nvmeDrives: 'NVMe-SSDs', sataSsds: 'SATA-SSDs', hardDrives: 'Festplatten', caseFans: 'Gehäuselüfter', cooling: 'CPU-Kühlung', coolingOptions: { air: 'Luftkühler', aio: 'AIO-Wasserkühlung', customLoop: 'Custom-Wasserkühlung' },
    advancedTitle: 'Erweiterte und optionale Lasten', advancedDescription: 'Fügen Sie nur Geräte oder Reserven hinzu, die für diesen Build gelten.', rgbControllers: 'RGB- / Lüfter-Controller', addInCards: 'Capture- oder PCIe-Zusatzkarten', usbDevices: 'USB-Geräte mit höherem Bedarf', secondGpu: 'Zweite Grafikkarte', secondGpuDescription: 'Für Compute, Rendering oder andere Lasten, die beide Karten aktiv nutzen.', secondGpuPlaceholder: 'Keine zweite GPU', overclocking: 'Übertaktung oder erhöhte Power-Limits', overclockingDescription: 'Addiert 15% Planungsreserve zu den gewählten CPU- und GPU-Leistungswerten.', manualExtra: 'Manuelle Zusatzreserve', manualExtraDescription: 'Für Pumpen, ungewöhnliche PCIe-Geräte oder nicht erfasste Lasten.', wattsEach: watts => `~${watts} W je Stück`, estimatedWatts: watts => `Geschätzte Pauschale: ${watts} W`, assumptionsNote: 'Jede Eingabe verändert die Pauschale der 15%-, 30%- und 50%-Szenarien. Der reale Verbrauch kann abweichen.', incomplete: 'CPU und GPU zum Berechnen auswählen', breakdownTitle: 'Detaillierte Komponentenpauschalen', breakdownDescription: 'Der Anteil außerhalb von CPU und GPU, damit jedes hinzugefügte Watt sichtbar bleibt.', breakdownLabels: { platform: 'Mainboard und Plattform', memory: 'Arbeitsspeicher', nvme: 'NVMe-Speicher', sataSsds: 'SATA-SSDs', hardDrives: 'Festplatten', caseFans: 'Gehäuselüfter', cooling: 'CPU-Kühlung', rgbControllers: 'RGB- / Lüfter-Controller', addInCards: 'PCIe-Zusatzkarten', usbDevices: 'USB-Geräte', secondGpu: 'Zweite GPU', overclocking: 'Übertaktungsreserve', manualExtra: 'Manuelle Reserve' },
  },
  es: {
    sectionTitle: 'Componentes aparte de CPU y GPU', sectionDescription: 'Ajusta las piezas realmente instaladas. Los vatios son asignaciones transparentes, no mediciones de cada modelo.',
    platformLabel: 'Base de placa y plataforma', platformDescription: 'Chipset, controladores de placa y carga básica', ramSticks: 'Módulos RAM', nvmeDrives: 'SSD NVMe', sataSsds: 'SSD SATA', hardDrives: 'Discos duros', caseFans: 'Ventiladores de caja', cooling: 'Refrigeración de CPU', coolingOptions: { air: 'Disipador por aire', aio: 'Refrigeración AIO', customLoop: 'Circuito personalizado' },
    advancedTitle: 'Cargas avanzadas y opcionales', advancedDescription: 'Añade solo los dispositivos o márgenes que correspondan a este equipo.', rgbControllers: 'Controladores RGB / ventiladores', addInCards: 'Tarjetas de captura o PCIe', usbDevices: 'Dispositivos USB de mayor consumo', secondGpu: 'Segunda tarjeta gráfica', secondGpuDescription: 'Para cálculo, renderizado u otra carga que use ambas tarjetas.', secondGpuPlaceholder: 'Sin segunda GPU', overclocking: 'Overclock o límites de potencia elevados', overclockingDescription: 'Añade un 15% a las cifras de potencia de CPU y GPU.', manualExtra: 'Margen extra manual', manualExtraDescription: 'Para bombas, dispositivos PCIe inusuales o cargas no representadas.', wattsEach: watts => `~${watts} W cada uno`, estimatedWatts: watts => `Asignación estimada: ${watts} W`, assumptionsNote: 'Cada entrada actualiza la asignación usada en los escenarios del 15%, 30% y 50%. El consumo real puede variar.', incomplete: 'Selecciona CPU y GPU para calcular', breakdownTitle: 'Asignaciones detalladas', breakdownDescription: 'La parte de la estimación aparte de CPU y GPU, mostrada para que cada vatio añadido sea visible.', breakdownLabels: { platform: 'Placa y plataforma', memory: 'Memoria', nvme: 'Almacenamiento NVMe', sataSsds: 'SSD SATA', hardDrives: 'Discos duros', caseFans: 'Ventiladores de caja', cooling: 'Refrigeración CPU', rgbControllers: 'Controladores RGB / ventiladores', addInCards: 'Tarjetas PCIe', usbDevices: 'Dispositivos USB', secondGpu: 'Segunda GPU', overclocking: 'Margen de overclock', manualExtra: 'Margen manual' },
  },
  ru: {
    sectionTitle: 'Компоненты кроме CPU и GPU', sectionDescription: 'Укажите фактически установленные компоненты. Ватты — прозрачные расчётные допуски, а не измерения каждой модели.',
    platformLabel: 'Базовая нагрузка платы и платформы', platformDescription: 'Чипсет, контроллеры платы и базовая нагрузка', ramSticks: 'Модули RAM', nvmeDrives: 'NVMe SSD', sataSsds: 'SATA SSD', hardDrives: 'Жёсткие диски', caseFans: 'Корпусные вентиляторы', cooling: 'Охлаждение CPU', coolingOptions: { air: 'Воздушный кулер', aio: 'Жидкостная AIO', customLoop: 'Кастомный контур' },
    advancedTitle: 'Расширенные и необязательные нагрузки', advancedDescription: 'Добавляйте только устройства и допуски, относящиеся к этой сборке.', rgbControllers: 'Контроллеры RGB / вентиляторов', addInCards: 'Карты захвата или PCIe', usbDevices: 'Мощные USB-устройства', secondGpu: 'Вторая видеокарта', secondGpuDescription: 'Для вычислений, рендеринга или нагрузки, реально использующей обе карты.', secondGpuPlaceholder: 'Без второй GPU', overclocking: 'Разгон или повышенные лимиты мощности', overclockingDescription: 'Добавляет 15% к выбранным значениям мощности CPU и GPU.', manualExtra: 'Ручной дополнительный запас', manualExtraDescription: 'Для помп, необычных PCIe-устройств и других нагрузок.', wattsEach: watts => `~${watts} Вт каждый`, estimatedWatts: watts => `Расчётный допуск: ${watts} Вт`, assumptionsNote: 'Каждый ввод меняет допуск в сценариях с запасом 15%, 30% и 50%. Реальное потребление может отличаться.', incomplete: 'Выберите CPU и GPU для расчёта', breakdownTitle: 'Подробные допуски компонентов', breakdownDescription: 'Часть оценки помимо CPU и GPU, чтобы каждый добавленный ватт был виден.', breakdownLabels: { platform: 'Материнская плата и платформа', memory: 'Память', nvme: 'NVMe-накопители', sataSsds: 'SATA SSD', hardDrives: 'Жёсткие диски', caseFans: 'Корпусные вентиляторы', cooling: 'Охлаждение CPU', rgbControllers: 'Контроллеры RGB / вентиляторов', addInCards: 'Дополнительные карты PCIe', usbDevices: 'USB-устройства', secondGpu: 'Вторая GPU', overclocking: 'Запас на разгон', manualExtra: 'Ручной запас' },
  },
};

export function getPsuPhaseTwoCopy(lang: Locale): PsuPhaseTwoCopy {
  return COPY[lang] ?? COPY.en;
}
