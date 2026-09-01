import type { Locale } from '@/i18n-config';

export type BottleneckFieldGuideCopy = {
  badge: string;
  title: string;
  intro: string;
  decisionsEyebrow: string;
  stepsTitle: string;
  steps: Array<{ title: string; body: string }>;
  interpretationEyebrow: string;
  resultTitle: string;
  resultIntro: string;
  scoreCaption: string;
  scoreHeaders: [string, string, string, string];
  scoreRows: Array<{ range: string; label: string; meaning: string; action: string }>;
  important: string;
  thresholdNotice: string;
  contextEyebrow: string;
  workloadTitle: string;
  workloadIntro: string;
  workloadCaption: string;
  workloadHeaders: [string, string, string, string];
  workloadRows: Array<{ scenario: string; likelyPressure: string; reason: string; verify: string }>;
  testEyebrow: string;
  diagnosisTitle: string;
  diagnosisIntro: string;
  diagnosisCaption: string;
  diagnosisHeaders: [string, string, string];
  diagnosisRows: Array<{ observation: string; interpretation: string; next: string }>;
  testingLink: string;
  examplesEyebrow: string;
  examplesTitle: string;
  situation: string;
  whatMatters: string;
  examples: Array<{ title: string; setup: string; lesson: string }>;
  fixEyebrow: string;
  fixTitle: string;
  fixIntro: string;
  fixOrder: Array<[string, string]>;
  limitsTitle: string;
  limitsBody: string;
  methodologyLink: string;
  fpsLink: string;
  psuLink: string;
};

const en: BottleneckFieldGuideCopy = {
  badge: 'Practical guide',
  title: 'How to use a PC bottleneck result without guessing',
  intro: 'A useful bottleneck check should narrow your investigation, not manufacture certainty. This guide explains what the PCBuildCheck result measures, how resolution and workload change the likely constraint, and what to test before spending money.',
  decisionsEyebrow: 'Five decisions',
  stepsTitle: 'How to use the calculator correctly',
  steps: [
    { title: 'Select the exact processor and graphics card', body: 'Laptop, desktop, Ti, SUPER, XT and XTX variants are not interchangeable. Choose the closest exact model because power limits, memory and relative performance can differ substantially.' },
    { title: 'Match the memory profile', body: 'Choose the installed RAM capacity and generation rather than the upgrade you may buy later. Capacity is a supporting signal; dual-channel configuration, timings and application demand still need separate verification.' },
    { title: 'Use the resolution you actually target', body: 'A 1080p high-refresh workload can expose more CPU-side pressure, while 4K usually shifts more rendering work toward the GPU. Resolution changes the question, not the physical hardware.' },
    { title: 'Treat the lower score as a testing priority', body: 'The result highlights which side has less relative headroom in this model. It does not say that the component is defective, incompatible or wasting the displayed percentage of FPS.' },
    { title: 'Confirm the result in a repeatable workload', body: 'Test the same scene, route or built-in benchmark twice. Record frame times, per-core CPU load, GPU load, clocks and temperatures before making an upgrade decision.' },
  ],
  interpretationEyebrow: 'Interpretation',
  resultTitle: 'What the result actually means',
  resultIntro: 'PCBuildCheck starts with maintained 0–100 CPU and GPU planning indices, then applies a moderate gaming-workload adjustment for the selected resolution. The displayed percentage is the relative separation between those adjusted indices. It is not measured FPS loss, wasted hardware, a compatibility rating or a universal industry benchmark.',
  scoreCaption: 'How to interpret normalized CPU and GPU score separation',
  scoreHeaders: ['Model signal', 'Display label', 'What it suggests', 'Useful next action'],
  scoreRows: [
    { range: '0–8% adjusted gap', label: 'Close resolution-adjusted match', meaning: 'Neither side has a large advantage after the selected resolution is applied.', action: 'Choose parts based on game benchmarks, price, features and platform longevity.' },
    { range: 'More than 8% adjusted gap', label: 'Likely planning constraint', meaning: 'The lower-scoring component deserves closer testing in workloads that depend on it.', action: 'Verify the suspected limit; a hardware purchase is not automatic.' },
    { range: 'Large relative gap', label: 'Research priority', meaning: 'The pairing may be intentionally uneven or may suit a different resolution or workload.', action: 'Compare exact-game benchmarks and total upgrade cost before changing the build.' },
  ],
  important: 'Important:',
  thresholdNotice: 'the 8% close-match threshold is part of this site’s planning model, not a claim that every game behaves identically. A deliberately GPU-heavy 4K build or CPU-heavy simulation system can be appropriate even when the adjusted indices are not close.',
  contextEyebrow: 'Context matters',
  workloadTitle: 'Why the bottleneck changes with resolution and workload',
  workloadIntro: 'A PC does not have one permanent bottleneck percentage. Each frame contains processor-side work and graphics-side work, and the part that finishes last sets the pace for that moment. Changing the game, scene, settings or target frame rate can move that limit.',
  workloadCaption: 'How common gaming scenarios shift CPU and GPU pressure',
  workloadHeaders: ['Scenario', 'Typical planning pressure', 'Why', 'What to verify'],
  workloadRows: [
    { scenario: '1080p competitive / high refresh', likelyPressure: 'CPU-side work often matters more', reason: 'The GPU finishes lighter frames quickly, leaving simulation, draw calls and frame delivery more exposed.', verify: 'Per-core CPU load, frame times and scaling after lowering graphics quality.' },
    { scenario: '1440p mixed gaming', likelyPressure: 'Often a mixed constraint', reason: 'The balance depends heavily on the game engine, quality preset, ray tracing and target refresh rate.', verify: 'Independent benchmarks for the same preset and both average and 1% low FPS.' },
    { scenario: '4K high or ultra settings', likelyPressure: 'GPU-side work is commonly dominant', reason: 'More pixels, effects and high-resolution assets increase graphics processing and memory pressure.', verify: 'GPU load, VRAM use, clocks, power and the effect of upscaling or lower settings.' },
    { scenario: 'Simulation, strategy or heavy multiplayer', likelyPressure: 'Can remain CPU-sensitive at any resolution', reason: 'World simulation, AI, physics and player state may not become easier when resolution increases.', verify: 'Busy late-game scenes or full servers—not only an empty tutorial area.' },
  ],
  testEyebrow: 'Repeatable test',
  diagnosisTitle: 'Turn the estimate into evidence',
  diagnosisIntro: 'First capture a baseline in the same scene. Then lower output resolution and major GPU-heavy settings, without changing the route or frame cap, and repeat the test. One observation is not proof, but the direction of change helps identify the next check.',
  diagnosisCaption: 'How to interpret changes in a repeatable gaming test',
  diagnosisHeaders: ['What you observe', 'Likely interpretation', 'Next check'],
  diagnosisRows: [
    { observation: 'FPS rises clearly after lowering resolution and GPU-heavy settings', interpretation: 'A meaningful graphics-side constraint is likely in that tested scene.', next: 'Adjust quality, upscaling and ray tracing before considering a GPU upgrade.' },
    { observation: 'FPS barely changes, while one or more CPU cores remain heavily loaded', interpretation: 'CPU-side work may be setting the frame-rate ceiling.', next: 'Check background tasks, memory configuration, temperatures and CPU-heavy settings.' },
    { observation: 'CPU and GPU usage are both unexpectedly low', interpretation: 'A frame cap, V-Sync, thermal/power limit, driver issue or another dependency may be involved.', next: 'Check caps, clocks, temperatures, power mode and the game’s own telemetry.' },
    { observation: 'Average FPS is acceptable but movement still feels uneven', interpretation: 'Frame pacing or intermittent stalls may matter more than the average.', next: 'Record a frame-time graph and inspect 1% lows, shader compilation, memory and asset streaming.' },
  ],
  testingLink: 'Open the complete testing walkthrough',
  examplesEyebrow: 'Practical examples',
  examplesTitle: 'Three results that require different decisions',
  situation: 'Situation:',
  whatMatters: 'What matters:',
  examples: [
    { title: 'Example A: esports at 1080p', setup: 'A capable GPU is paired with an older mid-range CPU and the target is a very high refresh rate.', lesson: 'Lowering visual quality may not produce much extra FPS if game logic and draw-call work already set the ceiling. Test a crowded match and per-core load before deciding the CPU is responsible.' },
    { title: 'Example B: a modern game at 4K', setup: 'A strong processor and mid-range graphics card are used at a demanding resolution and high preset.', lesson: 'The GPU can become the practical limit even when the same pairing looks closer at 1080p. Upscaling or a lower quality preset may deliver more value than replacing the CPU.' },
    { title: 'Example C: smooth average, occasional stutter', setup: 'The reported average looks healthy, but traversal or new effects cause noticeable pauses.', lesson: 'A CPU/GPU score gap cannot diagnose every stall. Frame-time capture, memory pressure, storage activity, shader compilation and background software are more useful evidence.' },
  ],
  fixEyebrow: 'Low risk first',
  fixTitle: 'Fix performance issues in this order',
  fixIntro: 'Start with reversible checks. A new component should be the conclusion of the diagnosis, not the first test.',
  fixOrder: [
    ['Measure first', 'Save a baseline from the same scene: average FPS, 1% low or frame times, GPU load, per-core CPU load, clocks and temperatures.'],
    ['Remove artificial limits', 'Check V-Sync, frame caps, power-saving modes, thermal throttling and background recording or update tasks.'],
    ['Change the settings that target the suspected side', 'For GPU pressure, test resolution, ray tracing, shadows and upscaling. For CPU pressure, test crowd density, simulation, view distance and background applications.'],
    ['Verify platform health', 'Confirm dual-channel memory where supported, current drivers and BIOS, adequate cooling, stable clocks and enough PSU/connector capacity.'],
    ['Price the complete upgrade', 'Include motherboard, memory, cooler, PSU and case requirements—not only the headline CPU or GPU price. Compare measured benchmarks before buying.'],
  ],
  limitsTitle: 'What no bottleneck calculator can know from a parts list',
  limitsBody: 'A component list cannot observe your exact game patch, scene, driver, BIOS settings, background processes, cooling, power limits, memory channels, frame cap or shader-compilation behavior. It also cannot replace measured reviews. Use the result to prioritize research, then confirm the conclusion with evidence from the workload you care about.',
  methodologyLink: 'Read our calculation methodology',
  fpsLink: 'Estimate game-specific FPS',
  psuLink: 'Check PSU planning capacity',
};

const ru: BottleneckFieldGuideCopy = {
  badge: "Практическое руководство",
  title: "Как использовать результат узкого места ПК, не догадываясь",
  intro: "Полезная проверка узких мест должна сузить ваше расследование, а не создать уверенность. В этом руководстве объясняется, что измеряет результат PCBuildCheck, как разрешение и рабочая нагрузка меняют вероятное ограничение и что нужно протестировать, прежде чем тратить деньги.",
  decisionsEyebrow: "Пять решений",
  stepsTitle: "Как правильно пользоваться калькулятором",
  steps: [
    { title: "Выберите точный процессор и видеокарту", body: "Варианты для ноутбуков, настольных компьютеров, Ti, SUPER, XT и XTX не являются взаимозаменяемыми. Выберите наиболее близкую точную модель, поскольку пределы мощности, памяти и относительной производительности могут существенно отличаться." },
    { title: "Соответствие профилю памяти", body: "Выберите установленную мощность и поколение RAM, а не обновление, которое вы можете купить позже. Емкость является поддерживающим сигналом; двухканальная конфигурация, тайминги и требования приложений по-прежнему требуют отдельной проверки." },
    { title: "Используйте разрешение, на которое вы действительно нацелены.", body: "Рабочая нагрузка с высокой частотой обновления 1080p может подвергнуть большему давлению со стороны CPU, в то время как 4K обычно смещает большую часть работы по рендерингу в сторону GPU. Разрешение меняет вопрос, а не физическое оборудование." },
    { title: "Рассматривайте более низкий балл как приоритет тестирования.", body: "Результат показывает, какая сторона имеет меньший относительный запас высоты в этой модели. Это не говорит о том, что компонент неисправен, несовместим или тратит отображаемый процент FPS." },
    { title: "Подтвердите результат с помощью повторяемой рабочей нагрузки", body: "Проверьте одну и ту же сцену, маршрут или встроенный тест дважды. Прежде чем принимать решение об обновлении, записывайте время кадра, нагрузку CPU каждого ядра, нагрузку GPU, тактовую частоту и температуру." },
  ],
  interpretationEyebrow: 'Interpretation',
  resultTitle: "Что на самом деле означает результат",
  resultIntro: "PCBuildCheck начинается с поддерживаемых индексов планирования 0–100 CPU и GPU, затем применяется умеренная корректировка игровой нагрузки для выбранного разрешения. Отображаемый процент представляет собой относительное разделение между скорректированными индексами. Он не измеряется FPS потерями, потраченным впустую оборудованием, рейтингом совместимости или универсальными отраслевыми стандартами.",
  scoreCaption: "Как интерпретировать нормализованное разделение оценок CPU и GPU",
  scoreHeaders: ["Модельный сигнал", "Отображать этикетку", "Что это предполагает", "Полезное следующее действие"],
  scoreRows: [
    { range: "Скорректированный разрыв 0–8%", label: "Близкое совпадение с поправкой на разрешение", meaning: "Ни одна из сторон не имеет большого преимущества после применения выбранного разрешения.", action: "Выбирайте детали на основе игровых тестов, цены, функций и долговечности платформы." },
    { range: "Скорректированный разрыв более 8%", label: "Вероятное ограничение планирования", meaning: "Компонент с более низким рейтингом заслуживает более тщательного тестирования в рабочих нагрузках, которые от него зависят.", action: "Проверьте предполагаемый предел; покупка оборудования не происходит автоматически." },
    { range: "Большой относительный разрыв", label: "Приоритет исследования", meaning: "Сопряжение может быть намеренно неравномерным или соответствовать другому разрешению или рабочей нагрузке.", action: "Прежде чем менять сборку, сравните тесты конкретной игры и общую стоимость обновления." },
  ],
  important: "Важно:",
  thresholdNotice: "порог близкого совпадения в 8% является частью модели планирования этого сайта, а не утверждением, что все игры ведут себя одинаково. Намеренно GPU-тяжелая сборка 4K или CPU-тяжелая система моделирования могут быть подходящими, даже если скорректированные индексы не близки.",
  contextEyebrow: "Контекст имеет значение",
  workloadTitle: "Почему узкое место меняется в зависимости от разрешения и рабочей нагрузки",
  workloadIntro: "У ПК нет одного постоянного процента узких мест. Каждый кадр содержит работу на стороне процессора и графики, а та часть, которая завершается последней, задает темп на этот момент. Изменение игры, сцены, настроек или целевой частоты кадров может увеличить этот предел.",
  workloadCaption: "Как распространенные игровые сценарии меняют давление CPU и GPU",
  workloadHeaders: ['Scenario', "Типичное давление при планировании", 'Why', "Что проверить"],
  workloadRows: [
    { scenario: "Конкурсное разрешение 1080p/высокая частота обновления", likelyPressure: "CPU работа на стороне часто имеет большее значение", reason: "GPU быстро завершает более легкие кадры, оставляя моделирование, вызовы отрисовки и доставку кадров более открытыми.", verify: "Поядерная CPU загрузка, время кадра и масштабирование после снижения качества графики." },
    { scenario: "Смешанные игры 1440p", likelyPressure: "Часто смешанное ограничение", reason: "Баланс сильно зависит от игрового движка, настроек качества, трассировки лучей и целевой частоты обновления.", verify: "Независимые тесты для одной и той же предустановки, как среднего, так и минимального на 1 % FPS." },
    { scenario: "Настройки 4K высокие или ультра", likelyPressure: "Обычно доминирует работа на стороне GPU.", reason: "Больше пикселей, эффектов и ресурсов с высоким разрешением увеличивают обработку графики и нагрузку на память.", verify: "GPU нагрузка, VRAM использование, тактовая частота, мощность и эффект масштабирования или понижения настроек." },
    { scenario: "Симулятор, стратегия или тяжелый мультиплеер", likelyPressure: "Может оставаться чувствительным к CPU при любом разрешении.", reason: "Симуляция мира, искусственный интеллект, физика и состояние игрока могут не стать проще с увеличением разрешения.", verify: "Занятые сцены поздней игры или полные серверы, а не только пустая область обучения." },
  ],
  testEyebrow: "Повторяемый тест",
  diagnosisTitle: "Превратите оценку в доказательство",
  diagnosisIntro: "Сначала захватите базовую линию в той же сцене. Затем уменьшите выходное разрешение и основные настройки, требующие большого количества GPU, без изменения маршрута или ограничения кадра, и повторите тест. Одно наблюдение не является доказательством, но направление изменения помогает определить следующую проверку.",
  diagnosisCaption: "Как интерпретировать изменения в повторяемом игровом тесте",
  diagnosisHeaders: ["Что вы наблюдаете", "Вероятная интерпретация", "Следующая проверка"],
  diagnosisRows: [
    { observation: "FPS явно повышается после снижения разрешения и GPU-тяжелых настроек", interpretation: "В этой тестируемой сцене, скорее всего, имеется значимое ограничение на стороне графики.", next: "Настройте качество, масштабирование и трассировку лучей, прежде чем рассматривать возможность обновления GPU." },
    { observation: "FPS практически не меняется, в то время как одно или несколько ядер CPU остаются сильно загруженными", interpretation: "CPU работа может заключаться в установке потолка частоты кадров.", next: "Проверьте фоновые задачи, конфигурацию памяти, температуру и настройки CPU." },
    { observation: "Использование CPU и GPU неожиданно низкое.", interpretation: "Могут быть задействованы ограничение кадра, вертикальная синхронизация, ограничение температуры/мощности, проблема с драйвером или другая зависимость.", next: "Проверьте крышки, часы, температуру, режим питания и собственную телеметрию игры." },
    { observation: "Среднее значение FPS приемлемо, но движение по-прежнему ощущается неравномерным.", interpretation: "Частота кадров или периодические остановки могут иметь большее значение, чем среднее значение.", next: "Запишите график времени кадра и проверьте минимумы 1%, компиляцию шейдеров, память и потоковую передачу ресурсов." },
  ],
  testingLink: "Открыть полное пошаговое руководство по тестированию",
  examplesEyebrow: "Практические примеры",
  examplesTitle: "Три результата, которые требуют разных решений",
  situation: "Ситуация:",
  whatMatters: "Что важно:",
  examples: [
    { title: "Пример А: киберспорт в разрешении 1080p", setup: "Способный GPU соединен со старым CPU среднего класса, и целью является очень высокая частота обновления.", lesson: "Снижение визуального качества может не привести к дополнительному FPS, если игровая логика и работа с отрисовкой уже установили потолок. Прежде чем решить, что за это отвечает CPU, проверьте переполненное совпадение и загрузку каждого ядра." },
    { title: "Пример Б: современная игра в разрешении 4К.", setup: "Мощный процессор и видеокарта среднего класса используются при требовательном разрешении и высоких настройках.", lesson: "GPU может стать практическим пределом, даже если то же самое сочетание выглядит ближе к разрешению 1080p. Увеличение масштаба или настройка более низкого качества могут принести больше пользы, чем замена CPU." },
    { title: "Пример C: плавное среднее значение, периодические заикания", setup: "Сообщаемое среднее значение выглядит здоровым, но обход или новые эффекты вызывают заметные паузы.", lesson: "Разрыв в баллах CPU/GPU не может диагностировать каждую остановку. Захват времени кадра, нехватка памяти, активность хранилища, компиляция шейдеров и фоновое программное обеспечение являются более полезными доказательствами." },
  ],
  fixEyebrow: "Сначала низкий риск",
  fixTitle: "Исправьте проблемы с производительностью в этом порядке",
  fixIntro: "Начните с обратимых проверок. Новый компонент должен стать заключением диагноза, а не первого теста.",
  fixOrder: [
    ["Сначала измерьте", "Сохраните базовый показатель из той же сцены: среднее значение FPS, низкое время кадра 1 %, нагрузка GPU, нагрузка на ядро CPU, тактовые частоты и температура."],
    ["Удалите искусственные ограничения", "Проверьте вертикальную синхронизацию, ограничение кадров, режимы энергосбережения, температурное регулирование, а также фоновую запись или задачи обновления."],
    ["Измените настройки, нацеленные на подозреваемую сторону", "Для давления GPU, тестового разрешения, трассировки лучей, теней и масштабирования. Для CPU давления, проверки плотности толпы, моделирования, расстояния просмотра и фоновых приложений."],
    ["Проверьте работоспособность платформы", "Убедитесь, что двухканальная память поддерживается, текущие драйверы и BIOS, достаточное охлаждение, стабильная тактовая частота и достаточная емкость PSU/разъема."],
    ["Цена полного обновления", "Укажите материнскую плату, память, кулер, PSU и требования к корпусу, а не только заголовок CPU или цену GPU. Перед покупкой сравните измеренные показатели."],
  ],
  limitsTitle: "Что ни один калькулятор узких мест не может знать из списка деталей",
  limitsBody: "Список компонентов не может отслеживать ваш точный игровой патч, сцену, драйвер, настройки BIOS, фоновые процессы, охлаждение, ограничения мощности, каналы памяти, ограничение кадров или поведение компиляции шейдеров. Он также не может заменить объективные отзывы. Используйте результат, чтобы расставить приоритеты в исследованиях, а затем подтвердите вывод данными, полученными из рабочей нагрузки, которая вас волнует.",
  methodologyLink: "Ознакомьтесь с нашей методикой расчета",
  fpsLink: "Оцените FPS для конкретной игры.",
  psuLink: "Проверьте возможности планирования PSU",
};

const de: BottleneckFieldGuideCopy = {
  badge: 'Praxisleitfaden',
  title: 'So nutzen Sie ein PC-Engpass-Ergebnis ohne zu raten',
  intro: 'Eine hilfreiche Engpassprüfung sollte die Fehlersuche eingrenzen, nicht falsche Gewissheit erzeugen. Dieser Leitfaden erklärt, was das PCBuildCheck-Ergebnis misst, wie Auflösung und Workload den wahrscheinlichen Engpass verändern und was Sie vor einer Ausgabe testen sollten.',
  decisionsEyebrow: 'Fünf Entscheidungen',
  stepsTitle: 'So verwenden Sie den Rechner richtig',
  steps: [
    { title: 'Exakten Prozessor und exakte Grafikkarte wählen', body: 'Laptop-, Desktop-, Ti-, SUPER-, XT- und XTX-Varianten sind nicht austauschbar. Wählen Sie das genaueste Modell, da Leistungsgrenzen, Speicher und relative Performance deutlich abweichen können.' },
    { title: 'Passendes Speicherprofil wählen', body: 'Wählen Sie die installierte RAM-Kapazität und Generation, nicht ein später geplantes Upgrade. Die Kapazität ist nur ein Hilfssignal; Dual-Channel, Timings und Anwendungsbedarf müssen separat geprüft werden.' },
    { title: 'Die tatsächlich gewünschte Auflösung verwenden', body: '1080p mit hoher Bildrate kann mehr CPU-Druck sichtbar machen, während 4K meist mehr Renderarbeit auf die GPU verlagert. Die Auflösung ändert die Fragestellung, nicht die Hardware.' },
    { title: 'Den niedrigeren Wert als Testpriorität behandeln', body: 'Das Ergebnis zeigt, welche Seite in diesem Modell weniger relativen Spielraum hat. Es bedeutet nicht, dass die Komponente defekt, inkompatibel oder für den angezeigten FPS-Prozentsatz verantwortlich ist.' },
    { title: 'Das Ergebnis in einem wiederholbaren Workload bestätigen', body: 'Testen Sie dieselbe Szene, Route oder den integrierten Benchmark zweimal. Erfassen Sie Frame Times, Last pro CPU-Kern, GPU-Last, Taktraten und Temperaturen vor einer Upgrade-Entscheidung.' },
  ],
  interpretationEyebrow: 'Interpretation',
  resultTitle: 'Was das Ergebnis tatsächlich bedeutet',
  resultIntro: 'PCBuildCheck beginnt mit gepflegten CPU- und GPU-Planungsindizes von 0–100 und wendet anschließend eine moderate Gaming-Anpassung für die gewählte Auflösung an. Der Prozentwert ist der relative Abstand dieser angepassten Indizes. Er ist weder gemessener FPS-Verlust noch verschwendete Hardware, Kompatibilitätsnote oder allgemeiner Branchenbenchmark.',
  scoreCaption: 'Interpretation des Abstands normalisierter CPU- und GPU-Werte',
  scoreHeaders: ['Modellsignal', 'Angezeigte Einstufung', 'Mögliche Bedeutung', 'Sinnvoller nächster Schritt'],
  scoreRows: [
    { range: '0–8 % angepasste Lücke', label: 'Enge auflösungsangepasste Abstimmung', meaning: 'Nach Anwendung der Auflösung hat keine Seite einen großen Vorteil.', action: 'Teile anhand von Spielebenchmarks, Preis, Funktionen und Plattformlebensdauer wählen.' },
    { range: 'Mehr als 8 % angepasste Lücke', label: 'Wahrscheinlicher Planungsengpass', meaning: 'Die niedriger bewertete Komponente sollte in abhängigen Workloads genauer getestet werden.', action: 'Das vermutete Limit prüfen; ein Hardwarekauf ist nicht automatisch nötig.' },
    { range: 'Große relative Lücke', label: 'Recherchepriorität', meaning: 'Die Kombination kann absichtlich ungleich sein oder zu einer anderen Auflösung beziehungsweise Nutzung passen.', action: 'Benchmarks der exakten Spiele und die gesamten Upgrade-Kosten vergleichen.' },
  ],
  important: 'Wichtig:',
  thresholdNotice: 'Die 8-%-Schwelle für eine enge Abstimmung gehört zum Planungsmodell dieser Website und behauptet nicht, dass jedes Spiel gleich reagiert. Ein bewusst GPU-lastiger 4K-PC oder ein CPU-lastiges Simulationssystem kann trotz größerer Indexlücke sinnvoll sein.',
  contextEyebrow: 'Kontext entscheidet',
  workloadTitle: 'Warum sich der Engpass mit Auflösung und Workload ändert',
  workloadIntro: 'Ein PC hat keinen dauerhaft festen Engpass-Prozentsatz. Jeder Frame enthält CPU- und GPU-Arbeit; die zuletzt fertig werdende Seite bestimmt in diesem Moment das Tempo. Spiel, Szene, Einstellungen oder Zielbildrate können dieses Limit verschieben.',
  workloadCaption: 'Wie typische Spielszenarien CPU- und GPU-Druck verschieben',
  workloadHeaders: ['Szenario', 'Typischer Planungsdruck', 'Warum', 'Was zu prüfen ist'],
  workloadRows: [
    { scenario: '1080p kompetitiv / hohe Bildrate', likelyPressure: 'CPU-seitige Arbeit ist oft wichtiger', reason: 'Die GPU beendet leichtere Frames schnell, wodurch Simulation, Draw Calls und Frame-Ausgabe stärker auffallen.', verify: 'Last pro CPU-Kern, Frame Times und Skalierung nach Senkung der Grafikqualität.' },
    { scenario: '1440p gemischtes Gaming', likelyPressure: 'Häufig gemischter Engpass', reason: 'Die Balance hängt stark von Engine, Qualitätsprofil, Raytracing und Zielbildrate ab.', verify: 'Unabhängige Benchmarks mit gleichem Profil sowie Durchschnitts- und 1%-Low-FPS.' },
    { scenario: '4K mit hohen oder Ultra-Einstellungen', likelyPressure: 'GPU-seitige Arbeit dominiert häufig', reason: 'Mehr Pixel, Effekte und hochauflösende Assets erhöhen Grafik- und Speicherlast.', verify: 'GPU-Last, VRAM, Taktraten, Leistung sowie Wirkung von Upscaling oder niedrigeren Einstellungen.' },
    { scenario: 'Simulation, Strategie oder großes Multiplayer-Spiel', likelyPressure: 'Kann bei jeder Auflösung CPU-sensitiv bleiben', reason: 'Weltsimulation, KI, Physik und Spielerzustände werden durch höhere Auflösung nicht automatisch leichter.', verify: 'Belebte Late-Game-Szenen oder volle Server statt nur eines leeren Tutorials.' },
  ],
  testEyebrow: 'Wiederholbarer Test',
  diagnosisTitle: 'Aus der Schätzung belastbare Hinweise machen',
  diagnosisIntro: 'Erfassen Sie zuerst eine Ausgangsmessung in derselben Szene. Senken Sie danach Auflösung und wichtige GPU-lastige Einstellungen, ohne Route oder FPS-Limit zu ändern, und wiederholen Sie den Test. Eine Beobachtung ist kein Beweis, aber die Richtung der Veränderung zeigt den nächsten sinnvollen Check.',
  diagnosisCaption: 'Veränderungen in einem wiederholbaren Spieletest interpretieren',
  diagnosisHeaders: ['Beobachtung', 'Wahrscheinliche Interpretation', 'Nächster Check'],
  diagnosisRows: [
    { observation: 'FPS steigen nach Senkung von Auflösung und GPU-lastigen Einstellungen deutlich', interpretation: 'In der getesteten Szene liegt wahrscheinlich ein relevanter Grafikengpass vor.', next: 'Qualität, Upscaling und Raytracing anpassen, bevor ein GPU-Upgrade erwogen wird.' },
    { observation: 'FPS ändern sich kaum, während ein oder mehrere CPU-Kerne stark ausgelastet bleiben', interpretation: 'CPU-seitige Arbeit könnte die Bildratenobergrenze setzen.', next: 'Hintergrundaufgaben, Speicherkonfiguration, Temperaturen und CPU-lastige Einstellungen prüfen.' },
    { observation: 'CPU- und GPU-Auslastung sind beide unerwartet niedrig', interpretation: 'FPS-Limit, V-Sync, Temperatur-/Leistungslimit, Treiberproblem oder eine andere Abhängigkeit kann beteiligt sein.', next: 'Limits, Taktraten, Temperaturen, Energiemodus und Spieltelemetrie prüfen.' },
    { observation: 'Durchschnitts-FPS sind gut, Bewegungen wirken aber ungleichmäßig', interpretation: 'Frame Pacing oder kurze Aussetzer können wichtiger sein als der Durchschnitt.', next: 'Frame-Time-Diagramm aufzeichnen und 1%-Lows, Shader-Kompilierung, Speicher und Asset-Streaming prüfen.' },
  ],
  testingLink: 'Vollständige Testanleitung öffnen',
  examplesEyebrow: 'Praktische Beispiele',
  examplesTitle: 'Drei Ergebnisse, die unterschiedliche Entscheidungen erfordern',
  situation: 'Situation:',
  whatMatters: 'Entscheidend:',
  examples: [
    { title: 'Beispiel A: E-Sport bei 1080p', setup: 'Eine leistungsfähige GPU wird mit einer älteren Mittelklasse-CPU kombiniert; Ziel ist eine sehr hohe Bildrate.', lesson: 'Weniger Grafikqualität bringt möglicherweise kaum zusätzliche FPS, wenn Spiellogik und Draw Calls bereits limitieren. Testen Sie ein volles Match und die Last pro Kern, bevor Sie die CPU verantwortlich machen.' },
    { title: 'Beispiel B: modernes Spiel bei 4K', setup: 'Ein starker Prozessor und eine Mittelklasse-Grafikkarte werden bei hoher Auflösung und hohem Preset verwendet.', lesson: 'Die GPU kann praktisch limitieren, obwohl dieselbe Kombination bei 1080p näher wirkt. Upscaling oder ein niedrigeres Preset kann mehr Nutzen bringen als ein CPU-Wechsel.' },
    { title: 'Beispiel C: guter Durchschnitt, gelegentliches Stottern', setup: 'Der Durchschnitt wirkt gesund, aber beim Bewegen oder bei neuen Effekten treten spürbare Pausen auf.', lesson: 'Eine CPU/GPU-Wertlücke erklärt nicht jeden Aussetzer. Frame-Time-Aufzeichnung, Speicherdruck, Laufwerksaktivität, Shader-Kompilierung und Hintergrundsoftware liefern bessere Hinweise.' },
  ],
  fixEyebrow: 'Zuerst geringes Risiko',
  fixTitle: 'Leistungsprobleme in dieser Reihenfolge beheben',
  fixIntro: 'Beginnen Sie mit umkehrbaren Prüfungen. Eine neue Komponente sollte das Ergebnis der Diagnose sein, nicht der erste Test.',
  fixOrder: [
    ['Zuerst messen', 'Aus derselben Szene eine Basis speichern: Durchschnitts-FPS, 1%-Low oder Frame Times, GPU-Last, Last pro CPU-Kern, Taktraten und Temperaturen.'],
    ['Künstliche Limits entfernen', 'V-Sync, FPS-Limits, Energiesparmodi, thermische Drosselung sowie Aufzeichnungs- oder Updateprozesse prüfen.'],
    ['Einstellungen der vermuteten Seite ändern', 'Bei GPU-Druck Auflösung, Raytracing, Schatten und Upscaling testen; bei CPU-Druck Menschenmenge, Simulation, Sichtweite und Hintergrundprogramme.'],
    ['Plattformzustand prüfen', 'Dual-Channel-Speicher, aktuelle Treiber und BIOS, ausreichende Kühlung, stabile Taktraten sowie Netzteil- und Anschlusskapazität bestätigen.'],
    ['Komplettes Upgrade kalkulieren', 'Mainboard, Speicher, Kühler, Netzteil und Gehäuse berücksichtigen, nicht nur CPU- oder GPU-Preis. Vor dem Kauf gemessene Benchmarks vergleichen.'],
  ],
  limitsTitle: 'Was kein Engpassrechner aus einer Teileliste wissen kann',
  limitsBody: 'Eine Komponentenliste sieht weder exakten Spielpatch und Szene noch Treiber, BIOS-Einstellungen, Hintergrundprozesse, Kühlung, Leistungsgrenzen, Speicherkanäle, FPS-Limit oder Shader-Kompilierung. Sie ersetzt auch keine gemessenen Tests. Nutzen Sie das Ergebnis zur Priorisierung und bestätigen Sie die Schlussfolgerung mit Belegen aus Ihrem relevanten Workload.',
  methodologyLink: 'Berechnungsmethodik lesen',
  fpsLink: 'Spielspezifische FPS schätzen',
  psuLink: 'Netzteilkapazität planen',
};

const fr: BottleneckFieldGuideCopy = {
  badge: 'Guide pratique',
  title: 'Utiliser un résultat de bottleneck PC sans tirer de conclusion hâtive',
  intro: 'Une vérification utile doit orienter le diagnostic, pas créer une fausse certitude. Ce guide explique ce que mesure PCBuildCheck, comment la résolution et la charge déplacent la contrainte probable, et quels tests effectuer avant de dépenser.',
  decisionsEyebrow: 'Cinq décisions',
  stepsTitle: 'Comment utiliser correctement le calculateur',
  steps: [
    { title: 'Sélectionner précisément le processeur et la carte graphique', body: 'Les variantes portable, bureau, Ti, SUPER, XT et XTX ne sont pas interchangeables. Choisissez le modèle exact le plus proche, car limites de puissance, mémoire et performances relatives peuvent fortement varier.' },
    { title: 'Faire correspondre le profil mémoire', body: 'Choisissez la capacité et la génération de RAM installées, pas une future mise à niveau. La capacité reste un indicateur secondaire ; dual-channel, timings et besoins de l’application doivent être vérifiés séparément.' },
    { title: 'Utiliser la résolution réellement visée', body: 'Une charge 1080p à fréquence élevée peut révéler davantage de pression CPU, tandis que la 4K déplace généralement plus de rendu vers le GPU. La résolution change la question, pas le matériel.' },
    { title: 'Traiter le score inférieur comme une priorité de test', body: 'Le résultat indique le côté qui possède le moins de marge relative dans ce modèle. Il ne signifie pas que le composant est défectueux, incompatible ou qu’il gaspille le pourcentage de FPS affiché.' },
    { title: 'Confirmer le résultat dans une charge répétable', body: 'Testez deux fois la même scène, le même parcours ou benchmark intégré. Relevez frame times, charge par cœur CPU, charge GPU, fréquences et températures avant toute décision de mise à niveau.' },
  ],
  interpretationEyebrow: 'Interprétation',
  resultTitle: 'Ce que signifie réellement le résultat',
  resultIntro: 'PCBuildCheck utilise des indices de planification CPU et GPU maintenus sur 0–100, puis applique un ajustement modéré de charge gaming selon la résolution choisie. Le pourcentage affiché est l’écart relatif entre ces indices ajustés. Ce n’est ni une perte de FPS mesurée, ni du matériel gaspillé, ni une note de compatibilité ou un benchmark universel.',
  scoreCaption: 'Comment interpréter l’écart entre indices CPU et GPU normalisés',
  scoreHeaders: ['Signal du modèle', 'Libellé affiché', 'Ce qu’il suggère', 'Action utile suivante'],
  scoreRows: [
    { range: 'Écart ajusté de 0 à 8 %', label: 'Association proche après ajustement', meaning: 'Aucun côté ne possède un avantage important une fois la résolution appliquée.', action: 'Choisir selon les benchmarks de jeux, le prix, les fonctions et la durée de vie de la plateforme.' },
    { range: 'Écart ajusté supérieur à 8 %', label: 'Contrainte de planification probable', meaning: 'Le composant au score inférieur mérite des tests ciblés dans les charges qui en dépendent.', action: 'Vérifier la limite suspectée ; un achat matériel n’est pas automatique.' },
    { range: 'Grand écart relatif', label: 'Priorité de recherche', meaning: 'L’association peut être volontairement déséquilibrée ou adaptée à une autre résolution ou charge.', action: 'Comparer des benchmarks des jeux exacts et le coût total de la mise à niveau.' },
  ],
  important: 'Important :',
  thresholdNotice: 'le seuil de 8 % appartient au modèle de planification du site ; il ne prétend pas que tous les jeux réagissent de la même façon. Une configuration 4K volontairement orientée GPU ou un système de simulation très dépendant du CPU peut rester pertinent même si les indices ne sont pas proches.',
  contextEyebrow: 'Le contexte compte',
  workloadTitle: 'Pourquoi le bottleneck change avec la résolution et la charge',
  workloadIntro: 'Un PC ne possède pas un pourcentage de bottleneck permanent. Chaque image comprend du travail processeur et graphique ; le côté qui termine en dernier fixe le rythme à cet instant. Jeu, scène, réglages et objectif FPS peuvent déplacer cette limite.',
  workloadCaption: 'Comment les scénarios de jeu courants déplacent la pression CPU et GPU',
  workloadHeaders: ['Scénario', 'Pression typique', 'Pourquoi', 'À vérifier'],
  workloadRows: [
    { scenario: '1080p compétitif / fréquence élevée', likelyPressure: 'Le travail CPU compte souvent davantage', reason: 'Le GPU termine rapidement les images légères, ce qui expose simulation, draw calls et livraison des images.', verify: 'Charge par cœur, frame times et évolution après baisse de la qualité graphique.' },
    { scenario: 'Gaming mixte en 1440p', likelyPressure: 'Contrainte souvent mixte', reason: 'L’équilibre dépend fortement du moteur, du preset, du ray tracing et de la fréquence visée.', verify: 'Benchmarks indépendants au même preset, FPS moyens et 1% low.' },
    { scenario: '4K élevée ou ultra', likelyPressure: 'Le travail GPU domine souvent', reason: 'Davantage de pixels, d’effets et d’assets haute résolution augmentent traitement graphique et pression mémoire.', verify: 'Charge GPU, VRAM, fréquences, puissance et effet de l’upscaling ou de réglages inférieurs.' },
    { scenario: 'Simulation, stratégie ou multijoueur chargé', likelyPressure: 'Peut rester sensible au CPU à toute résolution', reason: 'Simulation du monde, IA, physique et état des joueurs ne deviennent pas forcément plus simples en augmentant la résolution.', verify: 'Scènes de fin de partie chargées ou serveurs pleins, pas seulement un tutoriel vide.' },
  ],
  testEyebrow: 'Test répétable',
  diagnosisTitle: 'Transformer l’estimation en éléments vérifiables',
  diagnosisIntro: 'Capturez d’abord une référence dans la même scène. Réduisez ensuite la résolution et les principaux réglages lourds pour le GPU, sans changer le parcours ni la limite FPS, puis recommencez. Une observation n’est pas une preuve, mais la direction du changement guide le contrôle suivant.',
  diagnosisCaption: 'Comment interpréter les changements dans un test de jeu répétable',
  diagnosisHeaders: ['Observation', 'Interprétation probable', 'Contrôle suivant'],
  diagnosisRows: [
    { observation: 'Les FPS augmentent clairement après réduction de la résolution et des réglages GPU', interpretation: 'Une contrainte graphique significative est probable dans la scène testée.', next: 'Ajuster qualité, upscaling et ray tracing avant d’envisager une nouvelle carte graphique.' },
    { observation: 'Les FPS changent peu tandis qu’un ou plusieurs cœurs CPU restent très chargés', interpretation: 'Le travail CPU peut fixer le plafond de fréquence.', next: 'Contrôler tâches de fond, mémoire, températures et réglages lourds pour le CPU.' },
    { observation: 'Les utilisations CPU et GPU sont toutes deux anormalement faibles', interpretation: 'Limite FPS, V-Sync, limite thermique/électrique, pilote ou autre dépendance peuvent intervenir.', next: 'Contrôler limites, fréquences, températures, mode d’alimentation et télémétrie du jeu.' },
    { observation: 'Les FPS moyens sont corrects mais les mouvements restent irréguliers', interpretation: 'Le frame pacing ou des blocages intermittents peuvent compter davantage que la moyenne.', next: 'Enregistrer les frame times et examiner 1% low, compilation des shaders, mémoire et streaming des assets.' },
  ],
  testingLink: 'Ouvrir le guide complet de vérification',
  examplesEyebrow: 'Exemples pratiques',
  examplesTitle: 'Trois résultats qui demandent des décisions différentes',
  situation: 'Situation :',
  whatMatters: 'Point essentiel :',
  examples: [
    { title: 'Exemple A : esport en 1080p', setup: 'Un GPU performant est associé à un ancien CPU milieu de gamme avec un objectif de fréquence très élevée.', lesson: 'Baisser la qualité peut apporter peu de FPS si logique du jeu et draw calls fixent déjà le plafond. Testez une partie chargée et la charge par cœur avant d’accuser le CPU.' },
    { title: 'Exemple B : jeu moderne en 4K', setup: 'Un processeur puissant et une carte graphique milieu de gamme sont utilisés avec une résolution exigeante et un preset élevé.', lesson: 'Le GPU peut devenir la limite pratique même si l’association semble plus proche en 1080p. Upscaling ou preset inférieur peut être plus rentable qu’un changement de CPU.' },
    { title: 'Exemple C : moyenne fluide, saccades occasionnelles', setup: 'La moyenne paraît saine, mais les déplacements ou nouveaux effets provoquent des pauses perceptibles.', lesson: 'Un écart CPU/GPU ne diagnostique pas chaque blocage. Capture des frame times, pression mémoire, activité du stockage, compilation des shaders et logiciels de fond sont plus utiles.' },
  ],
  fixEyebrow: 'Faible risque d’abord',
  fixTitle: 'Corriger les problèmes de performances dans cet ordre',
  fixIntro: 'Commencez par des contrôles réversibles. Un nouveau composant doit être la conclusion du diagnostic, pas le premier test.',
  fixOrder: [
    ['Mesurer d’abord', 'Sauvegarder une référence de la même scène : FPS moyens, 1% low ou frame times, charge GPU, charge par cœur CPU, fréquences et températures.'],
    ['Supprimer les limites artificielles', 'Vérifier V-Sync, limites FPS, modes d’économie d’énergie, throttling thermique et tâches d’enregistrement ou de mise à jour.'],
    ['Modifier les réglages qui ciblent le côté suspecté', 'Pour le GPU, tester résolution, ray tracing, ombres et upscaling ; pour le CPU, densité de foule, simulation, distance de vue et applications de fond.'],
    ['Vérifier la santé de la plateforme', 'Confirmer dual-channel, pilotes et BIOS à jour, refroidissement suffisant, fréquences stables ainsi que capacité et connecteurs de l’alimentation.'],
    ['Chiffrer la mise à niveau complète', 'Inclure carte mère, mémoire, refroidisseur, alimentation et boîtier, pas seulement le prix du CPU ou GPU. Comparer des benchmarks mesurés avant achat.'],
  ],
  limitsTitle: 'Ce qu’aucun calculateur ne peut connaître depuis une liste de composants',
  limitsBody: 'Une liste de composants ne voit ni version exacte du jeu et scène, ni pilote, BIOS, processus de fond, refroidissement, limites de puissance, canaux mémoire, limite FPS ou compilation des shaders. Elle ne remplace pas non plus des tests mesurés. Utilisez le résultat pour prioriser la recherche, puis confirmez avec des preuves issues de votre charge réelle.',
  methodologyLink: 'Lire notre méthodologie de calcul',
  fpsLink: 'Estimer les FPS d’un jeu précis',
  psuLink: 'Planifier la capacité de l’alimentation',
};

const it: BottleneckFieldGuideCopy = {
  badge: 'Guida pratica',
  title: 'Come usare un risultato di bottleneck PC senza affidarsi alle supposizioni',
  intro: 'Un controllo utile dovrebbe restringere l’indagine, non creare false certezze. Questa guida spiega cosa misura PCBuildCheck, come risoluzione e carico cambiano il probabile limite e quali test eseguire prima di spendere.',
  decisionsEyebrow: 'Cinque decisioni',
  stepsTitle: 'Come usare correttamente il calcolatore',
  steps: [
    { title: 'Seleziona processore e scheda grafica esatti', body: 'Le varianti laptop, desktop, Ti, SUPER, XT e XTX non sono intercambiabili. Scegli il modello esatto più vicino perché limiti di potenza, memoria e prestazioni relative possono cambiare molto.' },
    { title: 'Abbina il profilo di memoria', body: 'Scegli capacità e generazione della RAM installata, non l’upgrade futuro. La capacità è un segnale di supporto; dual-channel, timing e domanda dell’applicazione richiedono verifiche separate.' },
    { title: 'Usa la risoluzione che vuoi davvero utilizzare', body: 'Un carico 1080p ad alto refresh può mostrare più pressione lato CPU, mentre il 4K sposta in genere più rendering sulla GPU. La risoluzione cambia la domanda, non l’hardware.' },
    { title: 'Tratta il punteggio inferiore come priorità di test', body: 'Il risultato evidenzia il lato con meno margine relativo nel modello. Non afferma che il componente sia difettoso, incompatibile o che sprechi la percentuale di FPS mostrata.' },
    { title: 'Conferma il risultato in un carico ripetibile', body: 'Testa due volte la stessa scena, percorso o benchmark integrato. Registra frame time, carico per core CPU, carico GPU, frequenze e temperature prima di decidere un upgrade.' },
  ],
  interpretationEyebrow: 'Interpretazione',
  resultTitle: 'Cosa significa davvero il risultato',
  resultIntro: 'PCBuildCheck parte da indici di pianificazione CPU e GPU mantenuti su scala 0–100 e applica poi un moderato adattamento gaming per la risoluzione scelta. La percentuale è la separazione relativa tra gli indici adattati. Non è perdita FPS misurata, hardware sprecato, voto di compatibilità o benchmark universale.',
  scoreCaption: 'Come interpretare la distanza tra indici CPU e GPU normalizzati',
  scoreHeaders: ['Segnale del modello', 'Etichetta mostrata', 'Cosa suggerisce', 'Azione utile successiva'],
  scoreRows: [
    { range: 'Differenza adattata 0–8%', label: 'Abbinamento vicino adattato alla risoluzione', meaning: 'Nessun lato ha un grande vantaggio dopo l’applicazione della risoluzione.', action: 'Scegliere in base a benchmark dei giochi, prezzo, funzioni e longevità della piattaforma.' },
    { range: 'Differenza adattata oltre l’8%', label: 'Probabile limite di pianificazione', meaning: 'Il componente con punteggio più basso merita test mirati nei carichi che ne dipendono.', action: 'Verificare il limite sospetto; l’acquisto di hardware non è automatico.' },
    { range: 'Grande differenza relativa', label: 'Priorità di ricerca', meaning: 'L’abbinamento può essere volutamente sbilanciato o adatto a un’altra risoluzione o carico.', action: 'Confrontare benchmark dei giochi esatti e costo totale dell’upgrade.' },
  ],
  important: 'Importante:',
  thresholdNotice: 'la soglia dell’8% fa parte del modello di pianificazione del sito e non implica che ogni gioco reagisca allo stesso modo. Una build 4K volutamente orientata alla GPU o un sistema di simulazione dipendente dalla CPU può essere adatto anche con indici non vicini.',
  contextEyebrow: 'Il contesto conta',
  workloadTitle: 'Perché il bottleneck cambia con risoluzione e carico',
  workloadIntro: 'Un PC non ha una percentuale di bottleneck permanente. Ogni frame include lavoro CPU e GPU; la parte che termina per ultima detta il ritmo in quel momento. Gioco, scena, impostazioni e obiettivo FPS possono spostare il limite.',
  workloadCaption: 'Come gli scenari di gioco comuni spostano la pressione CPU e GPU',
  workloadHeaders: ['Scenario', 'Pressione tipica', 'Perché', 'Cosa verificare'],
  workloadRows: [
    { scenario: '1080p competitivo / alto refresh', likelyPressure: 'Il lavoro lato CPU spesso conta di più', reason: 'La GPU completa rapidamente i frame leggeri, rendendo più visibili simulazione, draw call e consegna dei frame.', verify: 'Carico per core CPU, frame time e variazione dopo la riduzione della qualità grafica.' },
    { scenario: 'Gaming misto a 1440p', likelyPressure: 'Spesso un limite misto', reason: 'L’equilibrio dipende molto da motore, preset, ray tracing e refresh obiettivo.', verify: 'Benchmark indipendenti con lo stesso preset, FPS medi e 1% low.' },
    { scenario: '4K con impostazioni alte o ultra', likelyPressure: 'Il lavoro lato GPU domina spesso', reason: 'Più pixel, effetti e asset ad alta risoluzione aumentano elaborazione grafica e pressione sulla memoria.', verify: 'Carico GPU, VRAM, frequenze, potenza ed effetto di upscaling o impostazioni inferiori.' },
    { scenario: 'Simulazione, strategia o multiplayer intenso', likelyPressure: 'Può restare sensibile alla CPU a ogni risoluzione', reason: 'Simulazione del mondo, IA, fisica e stato dei giocatori non diventano più semplici aumentando la risoluzione.', verify: 'Scene affollate a partita avanzata o server pieni, non solo tutorial vuoti.' },
  ],
  testEyebrow: 'Test ripetibile',
  diagnosisTitle: 'Trasforma la stima in evidenza',
  diagnosisIntro: 'Acquisisci prima una base nella stessa scena. Riduci poi risoluzione e principali impostazioni pesanti per la GPU, senza cambiare percorso o limite FPS, e ripeti. Una sola osservazione non è una prova, ma la direzione del cambiamento aiuta a scegliere il controllo successivo.',
  diagnosisCaption: 'Come interpretare i cambiamenti in un test di gioco ripetibile',
  diagnosisHeaders: ['Cosa osservi', 'Interpretazione probabile', 'Controllo successivo'],
  diagnosisRows: [
    { observation: 'Gli FPS aumentano chiaramente riducendo risoluzione e impostazioni GPU', interpretation: 'Nella scena testata è probabile un limite grafico significativo.', next: 'Regolare qualità, upscaling e ray tracing prima di valutare un upgrade GPU.' },
    { observation: 'Gli FPS cambiano poco mentre uno o più core CPU restano molto occupati', interpretation: 'Il lavoro CPU può impostare il tetto del frame rate.', next: 'Controllare attività in background, memoria, temperature e impostazioni CPU-intensive.' },
    { observation: 'Utilizzo CPU e GPU entrambi insolitamente bassi', interpretation: 'Potrebbero intervenire limite FPS, V-Sync, limite termico/energetico, driver o altra dipendenza.', next: 'Controllare limiti, frequenze, temperature, modalità energetica e telemetria del gioco.' },
    { observation: 'FPS medi accettabili ma movimento ancora irregolare', interpretation: 'Frame pacing o blocchi intermittenti possono contare più della media.', next: 'Registrare il grafico dei frame time e controllare 1% low, shader, memoria e streaming degli asset.' },
  ],
  testingLink: 'Apri la guida completa ai test',
  examplesEyebrow: 'Esempi pratici',
  examplesTitle: 'Tre risultati che richiedono decisioni diverse',
  situation: 'Situazione:',
  whatMatters: 'Cosa conta:',
  examples: [
    { title: 'Esempio A: esport a 1080p', setup: 'Una GPU capace è abbinata a una CPU di fascia media più vecchia con obiettivo di refresh molto elevato.', lesson: 'Ridurre la qualità può dare pochi FPS extra se logica e draw call fissano già il limite. Testa una partita affollata e il carico per core prima di attribuire la causa alla CPU.' },
    { title: 'Esempio B: gioco moderno a 4K', setup: 'Un processore potente e una scheda grafica di fascia media sono usati ad alta risoluzione e preset elevato.', lesson: 'La GPU può diventare il limite pratico anche se la stessa coppia appare più vicina a 1080p. Upscaling o preset inferiore possono valere più della sostituzione della CPU.' },
    { title: 'Esempio C: media fluida, stutter occasionale', setup: 'La media sembra buona, ma spostamenti o nuovi effetti causano pause percepibili.', lesson: 'La distanza CPU/GPU non diagnostica ogni blocco. Frame time, pressione memoria, attività storage, compilazione shader e software in background sono prove più utili.' },
  ],
  fixEyebrow: 'Prima il basso rischio',
  fixTitle: 'Correggi i problemi di prestazioni in questo ordine',
  fixIntro: 'Inizia con controlli reversibili. Un nuovo componente deve essere la conclusione della diagnosi, non il primo test.',
  fixOrder: [
    ['Misura prima', 'Salva una base dalla stessa scena: FPS medi, 1% low o frame time, carico GPU, carico per core CPU, frequenze e temperature.'],
    ['Rimuovi i limiti artificiali', 'Controlla V-Sync, limiti FPS, risparmio energetico, throttling termico e attività di registrazione o aggiornamento.'],
    ['Cambia le impostazioni del lato sospetto', 'Per la GPU testa risoluzione, ray tracing, ombre e upscaling; per la CPU densità, simulazione, distanza visiva e applicazioni in background.'],
    ['Verifica la salute della piattaforma', 'Conferma dual-channel, driver e BIOS aggiornati, raffreddamento adeguato, frequenze stabili e capacità di alimentatore e connettori.'],
    ['Calcola l’upgrade completo', 'Includi scheda madre, memoria, dissipatore, alimentatore e case, non solo il prezzo di CPU o GPU. Confronta benchmark misurati prima dell’acquisto.'],
  ],
  limitsTitle: 'Cosa nessun calcolatore può sapere da una lista di componenti',
  limitsBody: 'Una lista non osserva patch e scena esatte, driver, BIOS, processi in background, raffreddamento, limiti di potenza, canali RAM, limite FPS o compilazione shader. Non sostituisce neppure recensioni misurate. Usa il risultato per dare priorità alla ricerca, poi conferma con prove del carico che ti interessa.',
  methodologyLink: 'Leggi la metodologia di calcolo',
  fpsLink: 'Stima gli FPS di un gioco specifico',
  psuLink: 'Pianifica la capacità dell’alimentatore',
};

const es: BottleneckFieldGuideCopy = {
  badge: 'Guía práctica',
  title: 'Cómo usar un resultado de cuello de botella sin adivinar',
  intro: 'Una comprobación útil debe acotar la investigación, no fabricar certeza. Esta guía explica qué mide PCBuildCheck, cómo la resolución y la carga cambian el posible límite y qué probar antes de gastar dinero.',
  decisionsEyebrow: 'Cinco decisiones',
  stepsTitle: 'Cómo usar correctamente la calculadora',
  steps: [
    { title: 'Selecciona el procesador y la tarjeta gráfica exactos', body: 'Las variantes de portátil, sobremesa, Ti, SUPER, XT y XTX no son intercambiables. Elige el modelo exacto más cercano porque límites de potencia, memoria y rendimiento relativo pueden variar mucho.' },
    { title: 'Haz coincidir el perfil de memoria', body: 'Selecciona capacidad y generación de RAM instaladas, no una futura mejora. La capacidad es una señal secundaria; dual-channel, latencias y demanda de la aplicación necesitan verificación aparte.' },
    { title: 'Usa la resolución que realmente quieres', body: 'Una carga 1080p de alta frecuencia puede mostrar más presión de CPU, mientras que 4K suele trasladar más renderizado a la GPU. La resolución cambia la pregunta, no el hardware.' },
    { title: 'Trata la puntuación inferior como prioridad de prueba', body: 'El resultado señala qué lado tiene menos margen relativo en este modelo. No dice que el componente esté defectuoso, sea incompatible o desperdicie el porcentaje de FPS mostrado.' },
    { title: 'Confirma el resultado con una carga repetible', body: 'Prueba dos veces la misma escena, ruta o benchmark integrado. Registra frame times, carga por núcleo, carga GPU, frecuencias y temperaturas antes de decidir una mejora.' },
  ],
  interpretationEyebrow: 'Interpretación',
  resultTitle: 'Qué significa realmente el resultado',
  resultIntro: 'PCBuildCheck parte de índices de planificación CPU y GPU mantenidos de 0–100 y aplica un ajuste moderado de carga gaming según la resolución elegida. El porcentaje es la separación relativa entre esos índices ajustados. No es pérdida de FPS medida, hardware desperdiciado, nota de compatibilidad ni benchmark universal.',
  scoreCaption: 'Cómo interpretar la separación entre índices CPU y GPU normalizados',
  scoreHeaders: ['Señal del modelo', 'Etiqueta mostrada', 'Qué sugiere', 'Siguiente acción útil'],
  scoreRows: [
    { range: 'Diferencia ajustada de 0–8 %', label: 'Combinación cercana ajustada a resolución', meaning: 'Ningún lado tiene una gran ventaja después de aplicar la resolución.', action: 'Elegir según benchmarks de juegos, precio, funciones y vida de la plataforma.' },
    { range: 'Diferencia ajustada superior al 8 %', label: 'Posible límite de planificación', meaning: 'El componente con menor puntuación merece pruebas específicas en cargas que dependen de él.', action: 'Verificar el límite sospechado; comprar hardware no es automático.' },
    { range: 'Gran diferencia relativa', label: 'Prioridad de investigación', meaning: 'La combinación puede ser desigual a propósito o adecuada para otra resolución o carga.', action: 'Comparar benchmarks de los juegos exactos y el coste total de la mejora.' },
  ],
  important: 'Importante:',
  thresholdNotice: 'el umbral del 8 % forma parte del modelo de planificación del sitio; no afirma que todos los juegos se comporten igual. Un equipo 4K deliberadamente orientado a GPU o un sistema de simulación dependiente de CPU puede ser adecuado aunque los índices no estén cerca.',
  contextEyebrow: 'El contexto importa',
  workloadTitle: 'Por qué el cuello de botella cambia con resolución y carga',
  workloadIntro: 'Un PC no tiene un porcentaje de cuello de botella permanente. Cada fotograma contiene trabajo de CPU y GPU; la parte que termina última marca el ritmo en ese momento. Juego, escena, ajustes u objetivo de FPS pueden mover ese límite.',
  workloadCaption: 'Cómo los escenarios habituales desplazan la presión CPU y GPU',
  workloadHeaders: ['Escenario', 'Presión típica', 'Por qué', 'Qué comprobar'],
  workloadRows: [
    { scenario: '1080p competitivo / alta frecuencia', likelyPressure: 'El trabajo de CPU suele importar más', reason: 'La GPU termina rápido los fotogramas ligeros, dejando más expuestos simulación, draw calls y entrega de fotogramas.', verify: 'Carga por núcleo, frame times y escalado tras bajar la calidad gráfica.' },
    { scenario: 'Gaming mixto a 1440p', likelyPressure: 'A menudo un límite mixto', reason: 'El equilibrio depende mucho del motor, preset, ray tracing y frecuencia objetivo.', verify: 'Benchmarks independientes con el mismo preset, FPS medios y 1% low.' },
    { scenario: '4K en alto o ultra', likelyPressure: 'El trabajo de GPU suele dominar', reason: 'Más píxeles, efectos y recursos de alta resolución aumentan procesamiento gráfico y presión de memoria.', verify: 'Carga GPU, VRAM, frecuencias, potencia y efecto del reescalado o ajustes inferiores.' },
    { scenario: 'Simulación, estrategia o multijugador intenso', likelyPressure: 'Puede seguir dependiendo de CPU a cualquier resolución', reason: 'Simulación, IA, física y estado de jugadores no se simplifican necesariamente al subir la resolución.', verify: 'Escenas concurridas de partida avanzada o servidores llenos, no solo un tutorial vacío.' },
  ],
  testEyebrow: 'Prueba repetible',
  diagnosisTitle: 'Convierte la estimación en evidencia',
  diagnosisIntro: 'Primero captura una referencia en la misma escena. Después reduce resolución y ajustes principales de GPU sin cambiar ruta ni límite FPS, y repite. Una observación no es prueba, pero la dirección del cambio ayuda a elegir la siguiente comprobación.',
  diagnosisCaption: 'Cómo interpretar cambios en una prueba de juego repetible',
  diagnosisHeaders: ['Qué observas', 'Interpretación probable', 'Siguiente comprobación'],
  diagnosisRows: [
    { observation: 'Los FPS suben claramente al bajar resolución y ajustes de GPU', interpretation: 'Es probable una limitación gráfica significativa en esa escena.', next: 'Ajustar calidad, reescalado y ray tracing antes de considerar una nueva GPU.' },
    { observation: 'Los FPS apenas cambian mientras uno o más núcleos siguen muy cargados', interpretation: 'El trabajo de CPU puede estar fijando el techo de fotogramas.', next: 'Comprobar tareas de fondo, memoria, temperaturas y ajustes dependientes de CPU.' },
    { observation: 'El uso de CPU y GPU es inesperadamente bajo', interpretation: 'Puede intervenir un límite FPS, V-Sync, límite térmico/energético, controlador u otra dependencia.', next: 'Comprobar límites, frecuencias, temperaturas, modo de energía y telemetría del juego.' },
    { observation: 'Los FPS medios son aceptables pero el movimiento sigue irregular', interpretation: 'El frame pacing o las pausas intermitentes pueden importar más que la media.', next: 'Registrar frame times y revisar 1% low, compilación de shaders, memoria y streaming de recursos.' },
  ],
  testingLink: 'Abrir la guía completa de pruebas',
  examplesEyebrow: 'Ejemplos prácticos',
  examplesTitle: 'Tres resultados que requieren decisiones diferentes',
  situation: 'Situación:',
  whatMatters: 'Qué importa:',
  examples: [
    { title: 'Ejemplo A: esports a 1080p', setup: 'Una GPU capaz se combina con una CPU de gama media antigua y se busca una frecuencia muy alta.', lesson: 'Bajar calidad puede añadir pocos FPS si lógica y draw calls ya fijan el techo. Prueba una partida concurrida y la carga por núcleo antes de culpar a la CPU.' },
    { title: 'Ejemplo B: juego moderno a 4K', setup: 'Un procesador potente y una gráfica de gama media se usan con resolución exigente y preset alto.', lesson: 'La GPU puede ser el límite práctico aunque la misma pareja parezca más equilibrada a 1080p. Reescalado o un preset inferior pueden aportar más que cambiar la CPU.' },
    { title: 'Ejemplo C: media fluida, tirones ocasionales', setup: 'La media parece saludable, pero al desplazarse o aparecer nuevos efectos hay pausas perceptibles.', lesson: 'Una diferencia CPU/GPU no diagnostica cada pausa. Frame times, presión de memoria, actividad de almacenamiento, shaders y software de fondo son mejores pruebas.' },
  ],
  fixEyebrow: 'Primero el bajo riesgo',
  fixTitle: 'Corrige los problemas de rendimiento en este orden',
  fixIntro: 'Empieza con comprobaciones reversibles. Un componente nuevo debe ser la conclusión del diagnóstico, no la primera prueba.',
  fixOrder: [
    ['Mide primero', 'Guarda una referencia de la misma escena: FPS medios, 1% low o frame times, carga GPU, carga por núcleo CPU, frecuencias y temperaturas.'],
    ['Elimina límites artificiales', 'Comprueba V-Sync, límites FPS, ahorro de energía, throttling térmico y tareas de grabación o actualización.'],
    ['Cambia los ajustes que afectan al lado sospechado', 'Para GPU prueba resolución, ray tracing, sombras y reescalado; para CPU densidad, simulación, distancia de visión y aplicaciones de fondo.'],
    ['Verifica la salud de la plataforma', 'Confirma memoria dual-channel, controladores y BIOS actuales, refrigeración suficiente, frecuencias estables y capacidad de fuente y conectores.'],
    ['Calcula la mejora completa', 'Incluye placa base, memoria, refrigerador, fuente y caja, no solo el precio de CPU o GPU. Compara benchmarks medidos antes de comprar.'],
  ],
  limitsTitle: 'Qué no puede saber ninguna calculadora desde una lista de piezas',
  limitsBody: 'Una lista no observa parche y escena exactos, controlador, BIOS, procesos de fondo, refrigeración, límites de potencia, canales de memoria, límite FPS o compilación de shaders. Tampoco sustituye pruebas medidas. Usa el resultado para priorizar la investigación y confirma la conclusión con evidencia de tu carga real.',
  methodologyLink: 'Leer nuestra metodología de cálculo',
  fpsLink: 'Estimar FPS de un juego concreto',
  psuLink: 'Planificar la capacidad de la fuente',
};

const COPY: Record<Locale, BottleneckFieldGuideCopy> = { en, de, fr, it, es ,
  ru,
};

export function getBottleneckFieldGuideCopy(locale: Locale) {
  return COPY[locale];
}
