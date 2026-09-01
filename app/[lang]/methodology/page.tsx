import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Calculator, Database, ExternalLink } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';
import { getLocalizedPath } from '@/lib/path-translations';
import { HARDWARE_DATABASE_UPDATED, HARDWARE_SCORE_METHODOLOGY_VERSION } from '@/lib/hardware-database';
import { FPS_MODEL_VERSION } from '@/lib/fps-model';
import { JsonLd } from '@/components/seo/json-ld';
import { createBreadcrumbSchema, createSchemaGraph, createWebPageSchema, SITE_URL } from '@/lib/structured-data';

const copy: Record<Locale, {
  title: string; description: string; updated: string; data: string; dataBody: string;
  calculations: string; bottleneck: string; fps: string; psu: string;
  limits: string; limitItems: string[]; sources: string; back: string;
}> = {
  en: {
    title: 'Calculator Methodology', description: 'How PCBuildCheck sources hardware specifications and produces bottleneck, FPS, and PSU estimates.', updated: `Database updated: ${HARDWARE_DATABASE_UPDATED} · Score methodology: ${HARDWARE_SCORE_METHODOLOGY_VERSION}`,
    data: 'Hardware data', dataBody: 'CPU and GPU names, clocks, core counts, memory, and power figures are checked against manufacturer product pages where available. PCBuildCheck maintains a documented 0–100 planning index within each component class; those normalized scores are editorial inputs, not official manufacturer ratings or raw lab results.',
    calculations: 'How estimates are calculated', bottleneck: 'Bottleneck: the tool compares normalized CPU and GPU scores. The displayed percentage is their relative score gap, not a measured percentage of lost performance.',
    fps: `FPS model ${FPS_MODEL_VERSION}: each game has a 1080p High reference profile. CPU and GPU scores scale separately, with resolution-sensitive weighting plus quality, supported upscaling, anti-aliasing, RAM and VRAM pressure. Results are shown as an uncertainty range with a planning midpoint and estimated 1% low; they are not measured benchmarks.`,
    psu: 'PSU: published CPU and GPU power figures are combined with a broad allowance for selected components, then 15–50% headroom is applied and the planning result may be rounded to a common PSU size. Always check GPU-vendor, board-partner, and PSU-model guidance.',
    limits: 'Important limitations', limitItems: ['Game patches, drivers, BIOS settings, thermals, RAM, background tasks, power limits, and silicon variation affect performance.', 'Laptop parts and factory-overclocked cards can have very different power limits despite similar names.', 'FPS figures are model outputs, not measurements collected from the selected hardware.', 'Prices are launch references or editorial snapshots, not live offers.', 'Use results as a shortlist aid and verify compatibility plus independent benchmarks matching your exact game and settings before purchasing.'],
    sources: 'Primary specification sources', back: 'Return to the bottleneck calculator',
  },
  it: {
    title: 'Metodologia dei calcolatori', description: 'Come PCBuildCheck raccoglie le specifiche e produce stime di bottleneck, FPS e PSU.', updated: `Database aggiornato: ${HARDWARE_DATABASE_UPDATED} · Metodo punteggi: ${HARDWARE_SCORE_METHODOLOGY_VERSION}`,
    data: 'Dati hardware', dataBody: 'Nomi, frequenze, core, memoria e consumi vengono verificati sulle pagine dei produttori quando disponibili. I punteggi normalizzati sono input editoriali interni, non valutazioni ufficiali né risultati grezzi di laboratorio.',
    calculations: 'Come vengono calcolate le stime', bottleneck: 'Bottleneck: confrontiamo i punteggi normalizzati di CPU e GPU. La percentuale è il divario relativo tra i punteggi, non una perdita di prestazioni misurata.',
    fps: `Modello FPS ${FPS_MODEL_VERSION}: ogni gioco usa un profilo di riferimento 1080p High. CPU e GPU vengono scalate separatamente, considerando risoluzione, qualità, upscaling supportato, anti-aliasing, RAM e pressione VRAM. Il risultato è un intervallo con valore centrale e 1% low stimato, non un benchmark misurato.`,
    psu: 'PSU: sommiamo i dati pubblicati di CPU e GPU a una quota generale per i componenti selezionati, applichiamo il 15–50% di margine e possiamo arrotondare a un taglio PSU comune. Verifica produttore GPU, board partner e modello PSU.',
    limits: 'Limiti importanti', limitItems: ['Patch, driver, BIOS, temperature, RAM, attività in background, limiti di potenza e variazioni del silicio cambiano le prestazioni.', 'Componenti laptop e schede overcloccate possono avere limiti di potenza molto diversi.', 'Le cifre FPS sono output del modello, non misure raccolte sull’hardware selezionato.', 'I prezzi sono riferimenti di lancio o snapshot editoriali, non offerte live.', 'Prima dell’acquisto verifica compatibilità e benchmark indipendenti del tuo gioco e delle tue impostazioni.'],
    sources: 'Fonti primarie delle specifiche', back: 'Torna al calcolatore di bottleneck',
  },
  fr: {
    title: 'Méthodologie des calculateurs', description: 'Comment PCBuildCheck collecte les spécifications et produit ses estimations de bottleneck, FPS et PSU.', updated: `Base mise à jour : ${HARDWARE_DATABASE_UPDATED} · Méthode des scores : ${HARDWARE_SCORE_METHODOLOGY_VERSION}`,
    data: 'Données matérielles', dataBody: 'Les noms, fréquences, cœurs, mémoires et puissances sont vérifiés sur les pages des fabricants lorsque possible. Les scores normalisés sont des entrées éditoriales internes, pas des notes officielles ni des résultats bruts de laboratoire.',
    calculations: 'Calcul des estimations', bottleneck: 'Bottleneck : comparaison des scores normalisés CPU et GPU. Le pourcentage est leur écart relatif, pas une perte de performances mesurée.',
    fps: `Modèle FPS ${FPS_MODEL_VERSION} : chaque jeu utilise un profil de référence 1080p High. CPU et GPU sont mis à l’échelle séparément selon résolution, qualité, upscaling pris en charge, anti-aliasing, RAM et pression VRAM. Le résultat est une plage avec point médian et 1 % low estimé, pas un benchmark mesuré.`,
    psu: 'PSU : les puissances publiées du CPU et du GPU sont additionnées à une réserve générale pour les composants sélectionnés; 15 à 50 % de marge sont appliqués et le résultat peut être arrondi à une puissance courante. Vérifiez fabricant GPU, partenaire et modèle PSU.',
    limits: 'Limites importantes', limitItems: ['Correctifs, pilotes, BIOS, températures, RAM, tâches de fond, limites de puissance et variation du silicium influencent les performances.', 'Les composants mobiles et cartes overclockées peuvent avoir des limites très différentes.', 'Les chiffres FPS sont des sorties du modèle, pas des mesures effectuées sur le matériel choisi.', 'Les prix sont des références de lancement ou des relevés éditoriaux, pas des offres en direct.', 'Vérifiez compatibilité et benchmarks indépendants correspondant à votre jeu et vos réglages avant achat.'],
    sources: 'Sources primaires des spécifications', back: 'Retour au calculateur de bottleneck',
  },
  de: {
    title: 'Methodik der Rechner', description: 'Wie PCBuildCheck Hardwaredaten erfasst und Bottleneck-, FPS- und Netzteilwerte schätzt.', updated: `Datenbank aktualisiert: ${HARDWARE_DATABASE_UPDATED} · Bewertungsmethode: ${HARDWARE_SCORE_METHODOLOGY_VERSION}`,
    data: 'Hardwaredaten', dataBody: 'Namen, Taktraten, Kerne, Speicher und Leistungswerte werden nach Möglichkeit mit Herstellerseiten abgeglichen. Normalisierte Werte sind interne redaktionelle Eingaben, keine offiziellen Bewertungen oder rohen Labormessungen.',
    calculations: 'Berechnung der Schätzwerte', bottleneck: 'Bottleneck: Normalisierte CPU- und GPU-Werte werden verglichen. Der Prozentsatz ist deren relative Differenz, kein gemessener Leistungsverlust.',
    fps: `FPS-Modell ${FPS_MODEL_VERSION}: Jedes Spiel nutzt ein 1080p-High-Referenzprofil. CPU und GPU werden getrennt skaliert; berücksichtigt werden Auflösung, Qualität, unterstütztes Upscaling, Anti-Aliasing, RAM und VRAM-Druck. Das Ergebnis ist ein Bereich mit Planungsmittelwert und geschätztem 1%-Low, kein gemessener Benchmark.`,
    psu: 'Netzteil: Veröffentlichte CPU- und GPU-Werte werden mit einer allgemeinen Pauschale für ausgewählte Komponenten kombiniert; 15–50 % Spielraum werden angewandt und auf eine übliche Netzteilgröße gerundet. Prüfen Sie GPU-Hersteller, Board-Partner und Netzteilmodell.',
    limits: 'Wichtige Einschränkungen', limitItems: ['Patches, Treiber, BIOS, Temperaturen, RAM, Hintergrundaufgaben, Leistungsgrenzen und Chipstreuung beeinflussen die Leistung.', 'Notebook-Teile und übertaktete Karten können stark abweichende Leistungsgrenzen haben.', 'FPS-Zahlen sind Modellausgaben, keine Messungen mit der ausgewählten Hardware.', 'Preise sind Startpreise oder redaktionelle Momentaufnahmen, keine Live-Angebote.', 'Prüfen Sie vor dem Kauf Kompatibilität und unabhängige Benchmarks für Ihr konkretes Spiel und Ihre Einstellungen.'],
    sources: 'Primäre Datenquellen', back: 'Zurück zum Flaschenhals-Rechner',
  },
  es: {
    title: 'Metodología de las calculadoras', description: 'Cómo PCBuildCheck recopila especificaciones y genera estimaciones de cuello de botella, FPS y PSU.', updated: `Base actualizada: ${HARDWARE_DATABASE_UPDATED} · Método de puntuación: ${HARDWARE_SCORE_METHODOLOGY_VERSION}`,
    data: 'Datos de hardware', dataBody: 'Los nombres, frecuencias, núcleos, memoria y potencia se contrastan con páginas de fabricantes cuando están disponibles. Las puntuaciones normalizadas son entradas editoriales internas, no valoraciones oficiales ni resultados brutos de laboratorio.',
    calculations: 'Cómo se calculan las estimaciones', bottleneck: 'Cuello de botella: comparamos puntuaciones normalizadas de CPU y GPU. El porcentaje es su diferencia relativa, no una pérdida de rendimiento medida.',
    fps: `Modelo FPS ${FPS_MODEL_VERSION}: cada juego usa un perfil de referencia 1080p High. CPU y GPU se escalan por separado considerando resolución, calidad, escalado compatible, anti-aliasing, RAM y presión de VRAM. El resultado es un rango con punto medio y 1% bajo estimado, no un benchmark medido.`,
    psu: 'PSU: se combinan las potencias publicadas de CPU y GPU con una asignación general para componentes seleccionados; se aplica 15–50 % de margen y puede redondearse a una potencia común. Comprueba fabricante GPU, ensamblador y modelo de PSU.',
    limits: 'Limitaciones importantes', limitItems: ['Parches, controladores, BIOS, temperaturas, RAM, tareas en segundo plano, límites de potencia y variación del silicio afectan al rendimiento.', 'Componentes portátiles y tarjetas con overclock pueden tener límites de potencia muy distintos.', 'Las cifras FPS son salidas del modelo, no mediciones realizadas con el hardware elegido.', 'Los precios son referencias de lanzamiento o capturas editoriales, no ofertas en vivo.', 'Antes de comprar, revisa compatibilidad y benchmarks independientes de tu juego y ajustes concretos.'],
    sources: 'Fuentes primarias de especificaciones', back: 'Volver a la calculadora de cuello de botella',
  },

  ru: {
    title: "Методика калькулятора", description: "Как PCBuildCheck получает спецификации оборудования и создает узкие места, оценки FPS и PSU.", updated: `Database updated: ${HARDWARE_DATABASE_UPDATED} · Score methodology: ${HARDWARE_SCORE_METHODOLOGY_VERSION}`,
    data: "Данные оборудования", dataBody: "Имена CPU и GPU, тактовые частоты, количество ядер, память и показатели мощности проверяются на страницах продуктов производителя, если таковые имеются. PCBuildCheck поддерживает документированный индекс планирования 0–100 в каждом классе компонентов; эти нормализованные оценки представляют собой редакционные материалы, а не официальные рейтинги производителей или необработанные результаты лабораторных исследований.",
    calculations: "Как рассчитываются оценки", bottleneck: "Узкое место: инструмент сравнивает нормализованные показатели CPU и GPU. Отображаемый процент — это их относительный разрыв в баллах, а не измеренный процент потерянной производительности.",
    fps: `FPS model ${FPS_MODEL_VERSION}: each game has a 1080p High reference profile. CPU and GPU scores scale separately, with resolution-sensitive weighting plus quality, supported upscaling, anti-aliasing, RAM and VRAM pressure. Results are shown as an uncertainty range with a planning midpoint and estimated 1% low; they are not measured benchmarks.`,
    psu: "PSU: опубликованные значения мощности CPU и GPU объединяются с широким допуском для выбранных компонентов, затем применяется запас в 15–50 %, и результат планирования может быть округлен до обычного размера PSU. Всегда проверяйте рекомендации GPU-поставщика, партнера по плате и PSU-модели.",
    limits: "Важные ограничения", limitItems: ["Игровые патчи, драйверы, настройки BIOS, температурные режимы, RAM, фоновые задачи, ограничения мощности и вариации микросхем влияют на производительность.", "Детали ноутбуков и карты с заводским разгоном могут иметь совершенно разные ограничения мощности, несмотря на схожие названия.", "Цифры FPS являются выходными данными модели, а не измерениями, полученными с выбранного оборудования.", "Цены представляют собой ссылки на запуск или редакционные снимки, а не действующие предложения.", "Используйте результаты в качестве подсказки и проверяйте совместимость, а также независимые тесты, соответствующие именно вашей игре и настройкам, перед покупкой."],
    sources: "Источники первичных спецификаций", back: "Вернуться к калькулятору узких мест",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = copy[lang];
  const alternates = constructMetadataAlternates(lang, '/methodology');
  return {
    title: t.title,
    description: t.description,
    alternates,
    openGraph: { title: t.title, description: t.description, url: alternates.canonical, type: 'article' },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description },
  };
}

export default async function MethodologyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = copy[lang];
  const pageUrl = `${SITE_URL}${getLocalizedPath(lang, '/methodology')}`;
  const schema = createSchemaGraph([
    createWebPageSchema({ pageUrl, name: t.title, description: t.description, lang, type: 'TechArticle' }),
    createBreadcrumbSchema(pageUrl, [
      { name: 'Home', url: `${SITE_URL}/${lang}` },
      { name: t.title, url: pageUrl },
    ]),
  ]);
  return (
    <div className="px-4 py-10">
      <JsonLd data={schema} />
      <article className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.description}</p>
          <p className="text-sm text-muted-foreground">{t.updated}</p>
        </header>

        <section className="rounded-xl border bg-card p-6">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold"><Database className="h-6 w-6 text-primary" />{t.data}</h2>
          <p className="leading-7 text-muted-foreground">{t.dataBody}</p>
        </section>

        <section className="rounded-xl border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold"><Calculator className="h-6 w-6 text-primary" />{t.calculations}</h2>
          <div className="space-y-4 leading-7 text-muted-foreground"><p>{t.bottleneck}</p><p>{t.fps}</p><p>{t.psu}</p></div>
        </section>

        <section className="rounded-xl border border-amber-300/60 bg-amber-50/60 p-6 dark:bg-amber-950/20">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold"><AlertTriangle className="h-6 w-6 text-amber-600" />{t.limits}</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">{t.limitItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">{t.sources}</h2>
          <ul className="space-y-2">
            {[
              ['NVIDIA GeForce specifications', 'https://www.nvidia.com/en-us/geforce/graphics-cards/compare/'],
              ['AMD graphics specifications', 'https://www.amd.com/en/products/specifications/graphics.html'],
              ['Intel product specifications', 'https://www.intel.com/content/www/us/en/products/details/discrete-gpus/arc.html'],
            ].map(([label, href]) => <li key={href}><a className="inline-flex items-center gap-1 text-primary hover:underline" href={href} target="_blank" rel="noopener noreferrer">{label}<ExternalLink className="h-4 w-4" /></a></li>)}
          </ul>
        </section>

        <Link href={getLocalizedPath(lang, '')} className="inline-flex font-semibold text-primary hover:underline">← {t.back}</Link>
      </article>
    </div>
  );
}
