import type { Locale } from '@/i18n-config';

type BuildDecisionCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  platformTitle: string;
  platformBody: (socket: string, memory: string) => string;
  workloadTitle: string;
  workloadBody: (resolution: string, vram: number, game: string) => string;
  powerTitle: string;
  powerBody: (publishedPower: number, psu: number) => string;
  gameLink: (game: string) => string;
  summaries: Record<string, string>;
};

const COPY: Partial<Record<Locale, BuildDecisionCopy>> = {
  it: {
    eyebrow: 'Punto decisionale',
    title: 'Prima di acquistare questa configurazione',
    intro: 'I punteggi da soli non dicono se la spesa è sensata. Verifica questi tre vincoli in base ai componenti reali della build.',
    platformTitle: 'Piattaforma e riutilizzo',
    platformBody: (socket, memory) => `La piattaforma è ${socket} con ${memory}. Controlla socket, tipo di memoria e BIOS prima di riutilizzare una scheda madre.`,
    workloadTitle: 'Obiettivo di gioco',
    workloadBody: (resolution, vram, game) => `Il piano punta a ${resolution} con ${vram} GB di VRAM. Usa ${game} come controllo pratico, non come promessa di FPS identici in ogni gioco.`,
    powerTitle: 'Alimentazione e margine',
    powerBody: (publishedPower, psu) => `CPU e GPU dichiarano insieme ${publishedPower} W; ${psu} W è il taglio PSU comune consigliato, con margine per picchi, ventole e periferiche.`,
    gameLink: (game) => `Verifica i requisiti di ${game}`,
    summaries: {
      'ryzen-5-5600x-rtx-4060': 'È soprattutto un aggiornamento conveniente per un PC AM4/DDR4 già esistente. Per una build completamente nuova, confronta il costo totale con AM5; il prezzo iniziale può essere maggiore, ma il percorso di upgrade è più lungo.',
      'core-i5-12600k-rtx-4060': 'Ha senso se puoi riutilizzare una scheda LGA1700, la memoria e un dissipatore adeguato. Verifica se la scheda madre usa DDR4 o DDR5: non sono intercambiabili, e il costo della piattaforma può cambiare la scelta.',
      'ryzen-5-7600x-rx-7800-xt': 'È una base AM5 equilibrata per un nuovo PC 1440p: 16 GB di VRAM aiutano con texture pesanti e la piattaforma lascia spazio a futuri upgrade CPU. Prima dell’acquisto controlla ingombro della GPU, airflow e alimentazione.',
      'core-i5-14600k-rtx-4070-super': 'È indicata per 1440p ad alto refresh e carichi misti, ma dissipatore, scheda madre e alimentatore incidono molto sul costo reale. Se giochi soltanto, confronta il vantaggio della CPU con un’opzione più efficiente.',
      'ryzen-7-7800x3d-rtx-5070': 'La CPU offre molto margine nei giochi competitivi e sensibili al processore. Nei titoli limitati dalla GPU, una CPU meno costosa può produrre risultati simili: verifica prima il gioco e il refresh rate che userai davvero.',
      'ryzen-7-9800x3d-rtx-5080': 'È una configurazione 4K enthusiast, dove qualità dell’alimentatore, connettore nativo, spazio nel case e raffreddamento sono criteri di acquisto essenziali. Il prezzo premium va giustificato dal monitor e dalle impostazioni realmente usate.',
    },
  },
  fr: {
    eyebrow: 'Point de décision',
    title: 'Avant d’acheter cette configuration',
    intro: 'Un score ne suffit pas à valider un achat. Contrôlez ces trois contraintes à partir des composants réels de la configuration.',
    platformTitle: 'Plateforme et réutilisation',
    platformBody: (socket, memory) => `Cette configuration utilise ${socket} et ${memory}. Vérifiez le socket, le type de mémoire et le BIOS avant de réutiliser une carte mère.`,
    workloadTitle: 'Objectif de jeu',
    workloadBody: (resolution, vram, game) => `L’objectif est ${resolution} avec ${vram} Go de VRAM. Utilisez ${game} comme test pratique, pas comme garantie de FPS identiques dans tous les jeux.`,
    powerTitle: 'Alimentation et marge',
    powerBody: (publishedPower, psu) => `Le CPU et le GPU totalisent ${publishedPower} W annoncés ; ${psu} W est le palier d’alimentation conseillé avec une marge pour les pointes, ventilateurs et périphériques.`,
    gameLink: (game) => `Vérifier les exigences de ${game}`,
    summaries: {
      'ryzen-5-5600x-rtx-4060': 'C’est surtout une mise à niveau rentable pour un PC AM4/DDR4 existant. Pour une machine entièrement neuve, comparez le coût global avec AM5 : l’investissement initial peut être supérieur, mais la voie d’évolution est plus longue.',
      'core-i5-12600k-rtx-4060': 'Le choix est pertinent si vous réutilisez une carte LGA1700, la mémoire et un refroidissement adapté. Vérifiez si la carte mère accepte la DDR4 ou la DDR5 : elles ne sont pas interchangeables et le coût de plateforme peut changer la décision.',
      'ryzen-5-7600x-rx-7800-xt': 'C’est une base AM5 cohérente pour un nouveau PC 1440p : 16 Go de VRAM favorisent les textures lourdes et la plateforme permet de futures évolutions CPU. Vérifiez l’encombrement du GPU, l’airflow et l’alimentation.',
      'core-i5-14600k-rtx-4070-super': 'Cette combinaison vise le 1440p à fréquence élevée et les usages mixtes, mais le refroidissement, la carte mère et l’alimentation pèsent dans le coût réel. Pour le jeu seul, comparez-la à un processeur plus efficient.',
      'ryzen-7-7800x3d-rtx-5070': 'Le processeur offre une forte marge dans les jeux compétitifs ou sensibles au CPU. Dans les titres limités par le GPU, un CPU moins cher peut donner un résultat proche : testez d’abord le jeu et la fréquence d’écran réellement visés.',
      'ryzen-7-9800x3d-rtx-5080': 'C’est une configuration 4K enthusiast où la qualité du bloc, le connecteur natif, l’espace du boîtier et le refroidissement sont décisifs. Le surcoût doit être justifié par l’écran et les réglages que vous utiliserez vraiment.',
    },
  },
  de: {
    eyebrow: 'Entscheidungspunkt',
    title: 'Vor dem Kauf dieses Builds',
    intro: 'Ein Score allein macht noch keinen sinnvollen Kauf. Prüfe diese drei Grenzen anhand der tatsächlichen Komponenten.',
    platformTitle: 'Plattform und Wiederverwendung',
    platformBody: (socket, memory) => `Der Build nutzt ${socket} und ${memory}. Prüfe Sockel, Speichertyp und BIOS, bevor du ein Mainboard weiterverwendest.`,
    workloadTitle: 'Konkretes Spielziel',
    workloadBody: (resolution, vram, game) => `Geplant sind ${resolution} mit ${vram} GB VRAM. Nutze ${game} als praxisnahen Check, nicht als Garantie für gleiche FPS in jedem Spiel.`,
    powerTitle: 'Netzteil und Reserve',
    powerBody: (publishedPower, psu) => `CPU und GPU kommen zusammen auf ${publishedPower} W veröffentlichte Leistung; ${psu} W ist die empfohlene gängige Netzteilgröße mit Reserve für Lastspitzen, Lüfter und Peripherie.`,
    gameLink: (game) => `Anforderungen für ${game} prüfen`,
    summaries: {
      'ryzen-5-5600x-rtx-4060': 'Dieser Build ist vor allem als preiswertes Upgrade eines vorhandenen AM4/DDR4-PCs sinnvoll. Bei einem kompletten Neubau solltest du die Gesamtkosten mit AM5 vergleichen: Der Einstieg kann teurer sein, bietet aber den längeren Upgrade-Pfad.',
      'core-i5-12600k-rtx-4060': 'Die Kombination lohnt sich besonders, wenn LGA1700-Mainboard, Speicher und ein passender Kühler vorhanden sind. Prüfe, ob das Board DDR4 oder DDR5 nutzt – beides ist nicht austauschbar und verändert die Plattformkosten.',
      'ryzen-5-7600x-rx-7800-xt': 'Das ist eine ausgewogene AM5-Basis für einen neuen 1440p-PC: 16 GB VRAM helfen bei großen Texturen, während die Plattform spätere CPU-Upgrades erlaubt. Prüfe vor dem Kauf GPU-Abmessungen, Airflow und Stromversorgung.',
      'core-i5-14600k-rtx-4070-super': 'Die Kombination passt zu 1440p mit hoher Bildrate und gemischten Workloads, doch Kühler, Mainboard und Netzteil bestimmen die realen Gesamtkosten. Für reines Gaming sollte der CPU-Vorteil mit einer effizienteren Alternative verglichen werden.',
      'ryzen-7-7800x3d-rtx-5070': 'Die CPU bietet viel Reserve in kompetitiven und prozessorlastigen Spielen. In GPU-limitierten Titeln kann ein günstigerer Prozessor ähnlich abschneiden – prüfe deshalb zuerst das konkrete Spiel und die tatsächlich gewünschte Bildrate.',
      'ryzen-7-9800x3d-rtx-5080': 'Bei diesem 4K-Enthusiasten-Build sind Netzteilqualität, nativer Stromanschluss, Gehäuseplatz und Kühlung zentrale Kaufkriterien. Der Aufpreis lohnt sich nur, wenn Monitor und tatsächlich genutzte Einstellungen ihn ausspielen.',
    },
  },
  es: {
    eyebrow: 'Punto de decisión',
    title: 'Antes de comprar esta configuración',
    intro: 'Una puntuación no basta para justificar la compra. Comprueba estos tres límites usando los componentes reales del equipo.',
    platformTitle: 'Plataforma y reutilización',
    platformBody: (socket, memory) => `La configuración usa ${socket} y ${memory}. Confirma socket, tipo de memoria y BIOS antes de reutilizar una placa base.`,
    workloadTitle: 'Objetivo de juego',
    workloadBody: (resolution, vram, game) => `El objetivo es ${resolution} con ${vram} GB de VRAM. Usa ${game} como comprobación práctica, no como promesa de los mismos FPS en todos los juegos.`,
    powerTitle: 'Fuente y margen',
    powerBody: (publishedPower, psu) => `CPU y GPU suman ${publishedPower} W publicados; ${psu} W es el tamaño de fuente común recomendado, con margen para picos, ventiladores y periféricos.`,
    gameLink: (game) => `Comprobar los requisitos de ${game}`,
    summaries: {
      'ryzen-5-5600x-rtx-4060': 'Es principalmente una actualización rentable para un PC AM4/DDR4 existente. Si vas a montar desde cero, compara el coste total con AM5: la entrada puede ser más cara, pero ofrece un recorrido de actualización más largo.',
      'core-i5-12600k-rtx-4060': 'Tiene sentido si puedes reutilizar una placa LGA1700, memoria y refrigeración adecuada. Confirma si la placa usa DDR4 o DDR5; no son intercambiables y el coste de plataforma puede cambiar la decisión.',
      'ryzen-5-7600x-rx-7800-xt': 'Es una base AM5 equilibrada para un PC 1440p nuevo: los 16 GB de VRAM ayudan con texturas pesadas y la plataforma permite futuras mejoras de CPU. Revisa tamaño de la GPU, flujo de aire y alimentación.',
      'core-i5-14600k-rtx-4070-super': 'Encaja en 1440p de alta tasa y cargas mixtas, pero disipador, placa y fuente pesan mucho en el coste real. Si solo juegas, compara la ventaja del procesador con una alternativa más eficiente.',
      'ryzen-7-7800x3d-rtx-5070': 'La CPU aporta mucho margen en juegos competitivos y sensibles al procesador. En títulos limitados por GPU, una CPU más barata puede rendir de forma parecida: comprueba antes el juego y la tasa de refresco que usarás.',
      'ryzen-7-9800x3d-rtx-5080': 'Es un equipo 4K entusiasta donde la calidad de la fuente, el conector nativo, el espacio de la caja y la refrigeración son criterios esenciales. El precio extra debe justificarse con el monitor y los ajustes que realmente usarás.',
    },
  },
  ru: {
    eyebrow: 'Точка принятия решения',
    title: 'Что проверить перед покупкой этой сборки',
    intro: 'Одной оценки недостаточно, чтобы оправдать покупку. Проверьте три ограничения по реальным компонентам сборки.',
    platformTitle: 'Платформа и повторное использование',
    platformBody: (socket, memory) => `Сборка использует ${socket} и ${memory}. Перед повторным использованием платы проверьте сокет, тип памяти и версию BIOS.`,
    workloadTitle: 'Игровая цель',
    workloadBody: (resolution, vram, game) => `Цель — ${resolution} при ${vram} ГБ VRAM. Используйте ${game} как практическую проверку, а не как обещание одинакового FPS во всех играх.`,
    powerTitle: 'Блок питания и запас',
    powerBody: (publishedPower, psu) => `Заявленная мощность CPU и GPU вместе составляет ${publishedPower} Вт; ${psu} Вт — рекомендуемый стандартный номинал с запасом для пиков, вентиляторов и периферии.`,
    gameLink: (game) => `Проверить требования ${game}`,
    summaries: {
      'ryzen-5-5600x-rtx-4060': 'В первую очередь это выгодный апгрейд существующего ПК на AM4/DDR4. Для полностью новой сборки сравните общую стоимость с AM5: старт может быть дороже, зато путь дальнейшего обновления будет длиннее.',
      'core-i5-12600k-rtx-4060': 'Связка особенно разумна, если уже есть плата LGA1700, память и подходящее охлаждение. Уточните, поддерживает ли плата DDR4 или DDR5: они несовместимы между собой, а стоимость платформы может изменить выбор.',
      'ryzen-5-7600x-rx-7800-xt': 'Это сбалансированная база AM5 для нового ПК под 1440p: 16 ГБ VRAM полезны для тяжёлых текстур, а платформа оставляет возможность обновить CPU. Проверьте габариты видеокарты, airflow и питание.',
      'core-i5-14600k-rtx-4070-super': 'Сборка подходит для 1440p с высокой частотой и смешанных задач, но кулер, плата и БП заметно влияют на итоговую цену. Если нужен только гейминг, сравните преимущество CPU с более эффективной альтернативой.',
      'ryzen-7-7800x3d-rtx-5070': 'Процессор даёт большой запас в соревновательных и CPU-зависимых играх. В проектах с упором в GPU более дешёвый CPU может показать близкий результат — сначала проверьте конкретную игру и нужную частоту кадров.',
      'ryzen-7-9800x3d-rtx-5080': 'Это энтузиастская 4K-сборка, где качество БП, нативный разъём питания, место в корпусе и охлаждение критичны. Премиальная цена оправдана только подходящим монитором и реально используемыми настройками.',
    },
  },
};

export function getBuildDecisionCopy(lang: Locale) {
  return COPY[lang] ?? null;
}
