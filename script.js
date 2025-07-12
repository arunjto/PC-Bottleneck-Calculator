document.addEventListener('DOMContentLoaded', () => {

    const data = {
        cpus: { "Intel Core i9-14900K": 100, "Intel Core i7-14700K": 95, "Intel Core i5-14600K": 90, "AMD Ryzen 9 7950X3D": 98, "AMD Ryzen 7 7800X3D": 96, "AMD Ryzen 5 7600X": 88, "Apple M3 Max": 92, "Intel Core i7-13700K": 90, "AMD Ryzen 7 5800X3D": 85, "Intel Core i5-12600K": 80, "Intel Core i7-10700K": 70, "AMD Ryzen 5 3600": 65, "Intel Core i5-9600K": 60, "Intel Core i7-7700K": 55, "Intel Core i5-4690K": 45, "Intel Core 2 Quad Q6600": 20, "Intel Pentium G4560": 30, "Intel Celeron G5905": 25, "AMD FX-8350": 35, "AMD A10-7850K": 28, "AMD Athlon X4 860K": 22, "AMD Threadripper 3990X": 99, "AMD EPYC 7763": 97, "Apple M2": 75, "Apple M1": 68, "Intel Core i9-13900K": 98, "Intel Core i5-13600K": 90, "AMD Ryzen 9 7900X": 94, "AMD Ryzen 7 7700X": 92, "AMD Ryzen 5 7600": 87, "Intel Core i9-12900K": 93, "Intel Core i7-12700K": 91, "Intel Core i5-12400": 82, "AMD Ryzen 9 5950X": 89, "AMD Ryzen 7 5800X": 84, "AMD Ryzen 5 5600X": 78, "Intel Core i9-11900K": 85, "Intel Core i7-11700K": 80, "Intel Core i5-11600K": 75, "AMD Ryzen 9 3950X": 80, "AMD Ryzen 7 3700X": 72, "AMD Ryzen 5 3600X": 68, "Intel Core i9-10900K": 78, "Intel Core i5-10600K": 65, "AMD Ryzen 9 2950X": 70, "AMD Ryzen 7 2700X": 62, "AMD Ryzen 5 2600X": 58, "Intel Core i7-8700K": 60, "Intel Core i5-8600K": 55, "Intel Core i3-8100": 40, "AMD Ryzen 7 1800X": 50, "AMD Ryzen 5 1600X": 45, "AMD Ryzen 3 1300X": 38, "Intel Core i7-6700K": 50, "Intel Core i5-6600K": 48, "Intel Core i3-6100": 35, "Intel Core i7-4790K": 42, "Intel Core i3-4130": 30, "Intel Core i7-2600K": 35, "Intel Core i5-2500K": 32, "Intel Core i3-2100": 25, "Intel Core i7-920": 20, "Intel Core i5-750": 18, "Intel Core i3-530": 15, "Intel Xeon E3-1230 V2": 40, "Intel Xeon E5-2690 V4": 70, "AMD Athlon 3000G": 20, "AMD A8-9600": 20, "AMD Threadripper 1950X": 60, "AMD EPYC 7702": 80, "Apple M3 Pro": 85, "Apple M3": 78, "Apple M2 Pro": 80, "Apple M2 Max": 88, "Apple M1 Pro": 72, "Apple M1 Max": 80, "Intel Core i9-9900K": 70, "Intel Core i7-9700K": 65, "Intel Core i5-9400F": 55, "AMD Ryzen 9 3900X": 75, "AMD Ryzen 7 3800X": 68, "AMD Ryzen 5 3500X": 60, "Intel Core i7-7700": 50, "Intel Core i5-7600": 45, "Intel Core i3-7100": 30, "AMD Ryzen 7 2700": 55, "AMD Ryzen 5 2600": 50, "AMD Ryzen 3 2200G": 35, "Intel Core i7-6700": 48, "Intel Core i5-6500": 42, "Intel Core i7-4770": 38, "Intel Core i5-4570": 35, "Intel Core i3-4160": 28, "Intel Core i7-3770": 32, "Intel Core i5-3570": 30, "Intel Core i3-3220": 22, "Intel Core i7-870": 25, "Intel Core i5-760": 20, "Intel Core i3-540": 18, "Intel Pentium G3258": 25, "Intel Celeron G1840": 15, "AMD FX-6300": 28, "AMD A8-7600": 18, "AMD Athlon X4 760K": 15, "AMD Threadripper 2990WX": 85, "AMD EPYC 7502": 90, "Apple M1 Ultra": 95, "Apple M2 Ultra": 98, "Intel Core i9-14900HX": 95, "Intel Core i7-14700HX": 90, "Intel Core i5-14500HX": 85, "AMD Ryzen 9 8945HS": 93, "AMD Ryzen 7 8840HS": 90, "AMD Ryzen 5 8640HS": 85, "Intel Core Ultra 9 185H": 92, "Intel Core Ultra 7 155H": 88, "Intel Core Ultra 5 125H": 82, "Apple M3 Pro (Laptop)": 88, "Apple M3 Max (Laptop)": 95, "Intel Core i9-13980HX": 93, "Intel Core i7-13700HX": 88, "Intel Core i5-13600HX": 83, "AMD Ryzen 9 7945HX": 91, "AMD Ryzen 7 7745HX": 87, "AMD Ryzen 5 7645HX": 82, "Intel Core i9-12900HX": 89, "Intel Core i7-12700H": 84, "Intel Core i5-12500H": 78, "AMD Ryzen 9 6900HX": 85, "AMD Ryzen 7 6800H": 80, "AMD Ryzen 5 6600H": 75, "Intel Core i9-11980HK": 82, "Intel Core i7-11800H": 77, "Intel Core i5-11400H": 72, "AMD Ryzen 9 5900HX": 78, "AMD Ryzen 7 5800H": 73, "AMD Ryzen 5 5600H": 68, "Intel Core i7-10750H": 65, "Intel Core i5-10300H": 60, "Intel Core i7-9750H": 58, "AMD Ryzen 7 3750H": 55, "AMD Ryzen 5 3550H": 50, "Intel Core i7-8750H": 52, "Intel Core i5-8300H": 48, "Intel Core i7-7700HQ": 45, "Intel Core i5-7300HQ": 40, "Intel Core i7-6700HQ": 38, "Intel Core i5-6300HQ": 35, "Intel Core i7-4700MQ": 32, "Intel Core i5-4200M": 28, "Intel Core i3-4000M": 20, "Intel Pentium N5030": 15, "Intel Celeron N4020": 10, "AMD Ryzen 7 2700U": 30, "AMD Ryzen 5 2500U": 25, "AMD Athlon 300U": 12, "Apple M2 Pro (Laptop)": 85, "Apple M2 Max (Laptop)": 92, "Apple M1 Pro (Laptop)": 75, "Apple M1 Max (Laptop)": 83, "Intel Core i9-12900HK": 88, "Intel Core i7-12800H": 83, "Intel Core i5-12600H": 77, "AMD Ryzen 9 6980HX": 87, "AMD Ryzen 7 6800HS": 82, "AMD Ryzen 5 6600HS": 76, "Intel Core i7-1165G7": 68, "Intel Core i5-1135G7": 63, "Intel Core i3-1115G4": 55, "AMD Ryzen 7 5700U": 60, "AMD Ryzen 5 5500U": 55, "AMD Ryzen 3 5300U": 48, "Intel Core i7-1065G7": 58, "Intel Core i5-1035G1": 52, "Intel Core i3-1005G1": 45, "AMD Ryzen 7 4700U": 50, "AMD Ryzen 5 4500U": 45, "AMD Ryzen 3 4300U": 38, "Intel Core i7-8550U": 40, "Intel Core i5-8250U": 35, "Intel Core i3-8130U": 28, "Intel Core i7-7500U": 30, "Intel Core i5-7200U": 25, "Intel Core i3-7100U": 20, "Intel Core i7-6500U": 28, "Intel Core i5-6200U": 22, "Intel Core i3-6100U": 18, "Intel Core i7-5500U": 25, "Intel Core i5-5200U": 20, "Intel Core i3-5005U": 15, "Intel Core i7-4500U": 22, "Intel Core i5-4200U": 18, "Intel Core i3-4010U": 12, "Intel Pentium 4415U": 10, "Intel Celeron 3867U": 8, "AMD A12-9720P": 20, "AMD A9-9420": 15, "AMD A6-9220": 12, "AMD E1-7010": 5, "AMD Ryzen 7 3700U": 40, "AMD Ryzen 5 3500U": 35, "AMD Ryzen 3 3200U": 28, "AMD Athlon 220GE": 15, "AMD Athlon Gold 3150U": 18, "AMD Athlon Silver 3050U": 10, },
        gpus: { "NVIDIA GeForce RTX 4090": 100, "NVIDIA GeForce RTX 4080 Super": 95, "NVIDIA GeForce RTX 4070 Ti Super": 90, "AMD Radeon RX 7900 XTX": 98, "AMD Radeon RX 7900 XT": 92, "Intel Arc A770": 60, "Apple M3 Max (GPU)": 85, "NVIDIA GeForce RTX 3090 Ti": 90, "AMD Radeon RX 6950 XT": 88, "NVIDIA GeForce RTX 3080": 85, "AMD Radeon RX 6800 XT": 82, "NVIDIA GeForce RTX 3070": 78, "AMD Radeon RX 6700 XT": 75, "NVIDIA GeForce RTX 2080 Ti": 70, "AMD Radeon RX 5700 XT": 65, "NVIDIA GeForce GTX 1080 Ti": 60, "AMD Radeon RX 580": 50, "NVIDIA GeForce GTX 1060": 45, "AMD Radeon RX 570": 40, "NVIDIA GeForce GTX 970": 35, "AMD Radeon R9 390": 30, "NVIDIA GeForce GTX 750 Ti": 25, "AMD Radeon HD 7870": 20, "NVIDIA GeForce GT 1030": 15, "Intel Iris Xe Graphics": 10, "Apple M2 (GPU)": 65, "Apple M1 (GPU)": 55, "NVIDIA GeForce RTX 4070 Super": 88, "NVIDIA GeForce RTX 4060 Ti": 80, "NVIDIA GeForce RTX 4060": 70, "AMD Radeon RX 7800 XT": 85, "AMD Radeon RX 7700 XT": 78, "AMD Radeon RX 7600": 68, "Intel Arc A750": 55, "Intel Arc A580": 48, "Intel Arc A380": 40, "NVIDIA GeForce RTX 3070 Ti": 82, "NVIDIA GeForce RTX 3060 Ti": 75, "NVIDIA GeForce RTX 3060": 68, "AMD Radeon RX 6700": 70, "AMD Radeon RX 6600 XT": 65, "AMD Radeon RX 6600": 60, "NVIDIA GeForce RTX 2070 Super": 65, "NVIDIA GeForce RTX 2060 Super": 60, "NVIDIA GeForce RTX 2060": 55, "AMD Radeon RX 5600 XT": 58, "AMD Radeon RX 5500 XT": 52, "NVIDIA GeForce GTX 1660 Super": 50, "NVIDIA GeForce GTX 1650 Super": 45, "NVIDIA GeForce GTX 1650": 40, "AMD Radeon RX 590": 48, "AMD Radeon RX 560": 38, "NVIDIA GeForce GTX 1070 Ti": 55, "NVIDIA GeForce GTX 1070": 52, "NVIDIA GeForce GTX 1050 Ti": 30, "NVIDIA GeForce GTX 1050": 28, "AMD Radeon R9 Fury X": 55, "AMD Radeon R9 Nano": 50, "AMD Radeon R9 380": 28, "NVIDIA GeForce GTX 980 Ti": 58, "NVIDIA GeForce GTX 980": 52, "NVIDIA GeForce GTX 960": 32, "AMD Radeon HD 7970": 35, "AMD Radeon HD 7950": 30, "AMD Radeon HD 7770": 18, "NVIDIA GeForce GTX 660 Ti": 22, "NVIDIA GeForce GTX 660": 20, "NVIDIA GeForce GT 730": 10, "AMD Radeon R7 240": 8, "Intel UHD Graphics 770": 5, "Intel UHD Graphics 630": 3, "Apple M3 Pro (GPU)": 75, "Apple M3 (GPU)": 68, "Apple M2 Pro (GPU)": 70, "Apple M2 Max (GPU)": 78, "Apple M1 Pro (GPU)": 60, "Apple M1 Max (GPU)": 70, "NVIDIA GeForce RTX 4050 Laptop": 70, "NVIDIA GeForce RTX 4060 Laptop": 75, "NVIDIA GeForce RTX 4070 Laptop": 80, "NVIDIA GeForce RTX 4080 Laptop": 88, "NVIDIA GeForce RTX 4090 Laptop": 92, "AMD Radeon RX 7600S": 65, "AMD Radeon RX 7700S": 70, "AMD Radeon RX 7800S": 75, "AMD Radeon RX 7900S": 80, "Intel Arc A570M": 50, "Intel Arc A550M": 45, "Intel Arc A530M": 40, "Intel Arc A370M": 35, "Intel Arc A350M": 30, "Intel Iris Xe Graphics G7": 12, "Intel Iris Plus Graphics": 8, "Intel UHD Graphics": 5, "Apple M3 Pro (Laptop GPU)": 80, "Apple M3 Max (Laptop GPU)": 88, "Apple M2 Pro (Laptop GPU)": 75, "Apple M2 Max (Laptop GPU)": 83, "Apple M1 Pro (Laptop GPU)": 65, "Apple M1 Max (Laptop GPU)": 75, "NVIDIA GeForce RTX 3050 Laptop": 60, "NVIDIA GeForce RTX 3050 Ti Laptop": 62, "NVIDIA GeForce RTX 3060 Laptop": 68, "NVIDIA GeForce RTX 3070 Laptop": 75, "NVIDIA GeForce RTX 3080 Laptop": 82, "AMD Radeon RX 6600M": 58, "AMD Radeon RX 6700M": 65, "AMD Radeon RX 6800M": 72, "AMD Radeon RX 6850M XT": 78, "Intel Iris Xe Max": 15, "NVIDIA GeForce GTX 1650 Laptop": 35, "NVIDIA GeForce GTX 1660 Ti Laptop": 48, "NVIDIA GeForce GTX 1050 Laptop": 25, "NVIDIA GeForce GTX 1060 Laptop": 40, "NVIDIA GeForce GTX 1070 Laptop": 50, "NVIDIA GeForce GTX 1080 Laptop": 55, "AMD Radeon RX 560X": 30, "AMD Radeon RX 550X": 25, "AMD Radeon RX 540X": 20, "NVIDIA GeForce MX450": 18, "NVIDIA GeForce MX350": 15, "NVIDIA GeForce MX250": 12, "NVIDIA GeForce MX150": 10, "AMD Radeon 680M": 18, "AMD Radeon 660M": 15, "AMD Radeon 610M": 10, "AMD Radeon Vega 8": 10, "AMD Radeon Vega 7": 8, "AMD Radeon Vega 6": 6, },
        ramImpact: { "8": 0.9, "16": 1.0, "32": 1.05, "64": 1.1 },
        purposeImpact: { gaming: { cpu: 0.9, gpu: 1.1 }, streaming: { cpu: 1.1, gpu: 1.0 }, video_editing: { cpu: 1.15, gpu: 0.95 }, "3d_rendering": { cpu: 1.05, gpu: 1.05 }, general: { cpu: 1.0, gpu: 1.0 } },
        resolutionImpact: { "1080p": { cpu: 1.05, gpu: 0.9 }, "1440p": { cpu: 1.0, gpu: 1.0 }, "4k": { cpu: 0.9, gpu: 1.15 }, ultrawide: { cpu: 0.95, gpu: 1.05 } }
    };

    const dom = {
        calculatorView: document.getElementById('calculator-view'),
        resultsView: document.getElementById('results-view'),
        cpuSelect: document.getElementById('cpu-select'),
        gpuSelect: document.getElementById('gpu-select'),
        ramSelect: document.getElementById('ram-select'),
        resolutionSelect: document.getElementById('resolution-select'),
        purposeSelect: document.getElementById('purpose-select'),
        calculateBtn: document.getElementById('calculate-btn'),
        toggleAdvancedBtn: document.getElementById('toggle-advanced'),
        advancedContent: document.getElementById('advanced-content'),
        themeToggle: document.getElementById('theme-toggle'),
    };

    function populateDropdown(selectElement, data) {
        Object.keys(data).sort().forEach(item => {
            selectElement.add(new Option(item, item));
        });
    }

    function calculateBottleneck() {
        const selected = {
            cpu: dom.cpuSelect.value, gpu: dom.gpuSelect.value, ram: dom.ramSelect.value,
            resolution: dom.resolutionSelect.value, purpose: dom.purposeSelect.value
        };

        if (!selected.cpu || !selected.gpu) {
            alert('Please select both a CPU and a GPU.'); return;
        }

        const baseScores = { cpu: data.cpus[selected.cpu], gpu: data.gpus[selected.gpu] };
        const modifiers = {
            ram: data.ramImpact[selected.ram],
            purpose: data.purposeImpact[selected.purpose],
            resolution: data.resolutionImpact[selected.resolution]
        };

        const finalScores = {
            cpu: baseScores.cpu * modifiers.purpose.cpu * modifiers.ram,
            gpu: baseScores.gpu * modifiers.purpose.gpu * modifiers.resolution.gpu
        };
        
        let bottleneck = { percentage: 0, component: 'None', text: '' };
        if (finalScores.cpu > finalScores.gpu * 1.05) {
            bottleneck.percentage = ((finalScores.cpu - finalScores.gpu) / finalScores.cpu) * 100;
            bottleneck.component = 'CPU';
        } else if (finalScores.gpu > finalScores.cpu * 1.05) {
            bottleneck.percentage = ((finalScores.gpu - finalScores.cpu) / finalScores.gpu) * 100;
            bottleneck.component = 'GPU';
        }

        if (bottleneck.percentage > 20) bottleneck.text = `Severe ${bottleneck.component} Bottleneck`;
        else if (bottleneck.percentage > 10) bottleneck.text = `Moderate ${bottleneck.component} Bottleneck`;
        else if (bottleneck.component !== 'None') bottleneck.text = `Minor ${bottleneck.component} Bottleneck`;
        else bottleneck.text = 'Excellent System Balance';
        
        displayResults(selected, bottleneck);
    }
    
    function displayResults(selected, bottleneck) {
        dom.calculatorView.classList.add('hidden');
        dom.resultsView.classList.remove('hidden');

        let summaryColor = bottleneck.percentage > 10 ? 'var(--accent)' : 'var(--success)';
        let summaryText = bottleneck.component === 'CPU' ? `Your GPU is being limited by your CPU's performance.` :
                          bottleneck.component === 'GPU' ? `Your CPU is powerful enough for a stronger GPU.` :
                          'Your components are very well-balanced for this workload.';
        
        dom.resultsView.innerHTML = `
            <h2>Bottleneck Analysis</h2>
            <div class="bottleneck-summary" style="border-color: ${summaryColor}; background-color: ${summaryColor}1A;">
                <h3 style="color: ${summaryColor};">${bottleneck.text}</h3>
                <p>${summaryText}</p>
            </div>
            <div class="results-card">
                <h4>Bottleneck: ${bottleneck.percentage.toFixed(1)}% at ${dom.resolutionSelect.options[dom.resolutionSelect.selectedIndex].text}</h4>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${bottleneck.percentage}%; background-color: ${summaryColor};">${bottleneck.percentage.toFixed(1)}%</div>
                </div>
            </div>
            <div class="component-analysis">
                <div class="component-card">
                    <h4>Processor (CPU)</h4>
                    <img src="https://i.imgur.com/PHYyIxl.png" alt="CPU Chip">
                    <p><strong>${selected.cpu}</strong></p>
                    <a href="https://cpu.userbenchmark.com/" target="_blank" rel="noopener">View Benchmarks &rarr;</a>
                </div>
                <div class="component-card">
                    <h4>Graphics Card (GPU)</h4>
                    <img src="https://i.imgur.com/Jprx55s.png" alt="GPU Graphics Card">
                    <p><strong>${selected.gpu}</strong></p>
                    <a href="https://gpu.userbenchmark.com/" target="_blank" rel="noopener">View Benchmarks &rarr;</a>
                </div>
            </div>
            <div class="performance-details">
                <h4>Recommendations & Insights</h4>
                <ul>
                    <li><strong>System Balance:</strong> ${bottleneck.component === 'None' ? 'Your system is well-balanced.' : `Your <strong>${bottleneck.component}</strong> is the limiting factor.`}</li>
                    <li><strong>Gaming Performance:</strong> ${bottleneck.component === 'CPU' ? 'In CPU-heavy games (e.g., strategy, simulations), you may see inconsistent framerates. Consider lowering settings like physics or NPC density.' : 'Your system is well-suited for GPU-intensive games. You can likely increase graphical settings without a major performance hit.'}</li>
                    <li><strong>Resolution Impact:</strong> At ${dom.resolutionSelect.options[dom.resolutionSelect.selectedIndex].text}, the workload is ${data.resolutionImpact[selected.resolution].gpu > 1 ? 'heavily placed on the GPU' : 'balanced between the CPU and GPU'}.</li>
                    ${bottleneck.percentage > 10 ? `<li><strong>Upgrade Path:</strong> To improve performance for this workload, upgrading your <strong>${bottleneck.component}</strong> would yield the best results.</li>` : ''}
                </ul>
            </div>
            <div class="action-buttons">
                <button id="new-calculation-btn">Calculate Again</button>
            </div>
        `;
        document.getElementById('new-calculation-btn').addEventListener('click', () => {
            dom.resultsView.classList.add('hidden');
            dom.calculatorView.classList.remove('hidden');
        });
    }

    function setupTheme() {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = storedTheme || (systemPrefersDark ? 'dark-mode' : 'light-mode');
        
        document.body.classList.toggle('dark-mode', currentTheme === 'dark-mode');
        dom.themeToggle.checked = currentTheme === 'dark-mode';

        dom.themeToggle.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'dark-mode' : 'light-mode';
            document.body.classList.toggle('dark-mode', e.target.checked);
            localStorage.setItem('theme', theme);
        });
    }

    // Initial Setup
    populateDropdown(dom.cpuSelect, data.cpus);
    populateDropdown(dom.gpuSelect, data.gpus);
    setupTheme();

    // Event Listeners
    dom.calculateBtn.addEventListener('click', calculateBottleneck);
    dom.toggleAdvancedBtn.addEventListener('click', () => {
        const isHidden = dom.advancedContent.classList.toggle('hidden');
        dom.toggleAdvancedBtn.textContent = isHidden ? 'Advanced Options ▼' : 'Advanced Options ▲';
    });
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            button.classList.toggle('active');
            answer.style.maxHeight = button.classList.contains('active') ? answer.scrollHeight + "px" : null;
        });
    });
});