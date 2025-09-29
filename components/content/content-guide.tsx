'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ContentGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <article className="prose prose-slate dark:prose-invert max-w-none relative prose-headings:font-semibold prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
  {/* Header Section */}
  <header className="relative mb-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full -mr-16 -mt-16"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/50 to-blue-100/50 dark:from-purple-800/30 dark:to-blue-800/30 rounded-full -ml-12 -mb-12"></div>
    <div className="relative">
      <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text leading-tight">
        Understanding PC Bottlenecks: A Complete Guide to a Balanced System
      </h2>
    </div>
  </header>

  {/* Introduction */}
  <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
    <p className="text-justify leading-7 text-lg">
      Welcome to the ultimate resource for PC performance analysis. A <strong>bottleneck</strong> is 
      the single most important concept to understand when building or upgrading a gaming PC. It occurs 
      when one of your components is too slow to keep up with the others, effectively creating a "traffic jam" 
      that limits your entire system's potential. Our <strong>PC Bottleneck Calculator</strong> is designed 
      to instantly identify these issues for you.
    </p>
    <p className="text-justify leading-7 mt-4 text-lg">
      By preventing <strong>bottlenecks</strong>, you ensure that every dollar you spend on hardware 
      translates directly into the <strong>performance</strong> you expect. A <strong>balanced PC</strong> 
      is a powerful, efficient, and cost-effective PC.
    </p>
  </section>

  {/* CPU Bottleneck */}
  <section aria-labelledby="cpu-bottleneck" className="mb-8">
    <h3 id="cpu-bottleneck" className="text-2xl text-red-700 dark:text-red-400 flex items-center gap-2">
      What is a CPU Bottleneck? <span className="text-lg font-normal text-red-600 dark:text-red-500">(The "Bad" Bottleneck)</span>
    </h3>
    <div className="bg-red-50/50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-r-xl p-6 mb-6">
      <p className="text-justify leading-7">
        A <strong>CPU bottleneck</strong> happens when your processor (CPU) cannot process data and 
        instructions fast enough to keep your graphics card (GPU) fully occupied. This is the most common 
        and problematic type of <strong>bottleneck</strong> for gamers, as it leads to inconsistent 
        performance that can't be fixed by simply lowering graphics settings.
      </p>
    </div>
    <div className="bg-card rounded-xl p-6 border border-red-200/60 dark:border-red-800/60 shadow-sm">
      <h4 className="font-semibold text-red-800 dark:text-red-400 mb-3">Common Symptoms:</h4>
      <ul className="space-y-3">
        <li><strong>Stuttering</strong> or choppy gameplay, especially during intense action.</li>
        <li>Low <strong>FPS</strong> in <strong>CPU-intensive games</strong> (Valorant, Counter-Strike 2, strategy titles).</li>
        <li><strong>GPU usage</strong> is low (60–70%) while CPU cores are maxed at 100%.</li>
      </ul>
    </div>
  </section>

  {/* GPU Bottleneck */}
  <section aria-labelledby="gpu-bottleneck" className="mb-8">
    <h3 id="gpu-bottleneck" className="text-2xl text-green-700 dark:text-green-400 flex items-center gap-2">
      What is a GPU Bottleneck? <span className="text-lg font-normal text-green-600 dark:text-green-500">(The "Good" Bottleneck)</span>
    </h3>
    <div className="bg-green-50/50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 rounded-r-xl p-6">
      <p className="text-justify leading-7">
        A <strong>GPU bottleneck</strong>, also known as being "GPU limited," occurs when your graphics 
        card is running at full capacity (99–100% usage). It dictates your maximum 
        <strong> frame rate</strong> because it’s working as hard as possible to render visuals.
      </p>
      <p className="text-justify leading-7 mt-4">
        <strong className="text-green-800 dark:text-green-300">This is generally ideal for gaming.</strong> 
        It means you’re fully utilizing your GPU investment, especially in AAA games at 1440p/4K with ultra settings.
      </p>
    </div>
  </section>

  {/* Action Plan */}
  <section aria-labelledby="action-plan" className="mb-8 p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
    <h2 id="action-plan" className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-700 to-blue-700 dark:from-purple-400 dark:to-blue-400 bg-clip-text">
      How to Fix a Bottleneck: Your Action Plan
    </h2>
    <p className="mt-4 text-lg">
      Once our calculator identifies a <strong>bottleneck</strong>, here are the most effective steps to address it.
    </p>
  </section>

  {/* CPU Bottleneck Solutions */}
  <section aria-labelledby="cpu-solutions" className="mb-8">
    <h3 id="cpu-solutions" className="text-2xl text-orange-700 dark:text-orange-400 mb-6">Tackling a CPU Bottleneck</h3>
    <div className="bg-orange-50/50 dark:bg-orange-900/20 rounded-xl p-6 mb-6 border border-orange-200/60 dark:border-orange-800/60">
      <p>If your CPU is the weak link, reduce its workload or boost its performance.</p>
    </div>
    <div className="grid gap-6">
      <div className="bg-card rounded-xl p-6 border border-orange-200/60 dark:border-orange-800/60 shadow-sm">
        <h4 className="font-semibold text-orange-800 dark:text-orange-400 mb-3">Immediate Fixes:</h4>
        <ul className="space-y-3">
          <li><strong>Close Background Apps:</strong> Shut down browsers/streaming apps before gaming.</li>
          <li><strong>Lower CPU-Heavy Settings:</strong> Reduce physics, crowd density, view distance.</li>
          <li><strong>Increase Resolution:</strong> Shifts workload onto the GPU, balancing the load.</li>
        </ul>
      </div>
      <div className="bg-card rounded-xl p-6 border border-orange-200/60 dark:border-orange-800/60 shadow-sm">
        <h4 className="font-semibold text-orange-800 dark:text-orange-400 mb-3">Long-Term Hardware Solutions:</h4>
        <ul className="space-y-3">
          <li><strong>Overclocking:</strong> With cooling, expect a 5–15% CPU boost.</li>
          <li><strong>Upgrade CPU:</strong> Choose one that matches your GPU as per calculator results.</li>
        </ul>
      </div>
    </div>
  </section>

  {/* Real-World Example CPU */}
  <aside role="note" aria-label="Real-world example: CPU bottleneck" className="bg-card border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-8 mb-8 shadow">
    <h5 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
      Real-World Example: Upgrading Your CPU for a Modern GPU
    </h5>
    <p>
      A user upgrades to a <strong>NVIDIA RTX 4070</strong> but keeps an older <strong>Ryzen 5 3600</strong>.
    </p>
    <p className="mt-3">
      At 1440p/4K it performs decently, but in esports at 1080p, stutters appear regardless of settings.
    </p>
    <p className="mt-3">
      <strong>The Solution:</strong> This is a CPU bottleneck. Upgrading to a <strong>Ryzen 5 7600X</strong> or 
      <strong> Intel Core i5-14600K</strong> restores balance, letting the RTX 4070 shine.
    </p>
  </aside>

  {/* GPU Bottleneck Solutions */}
  <section aria-labelledby="gpu-solutions" className="mb-8">
    <h3 id="gpu-solutions" className="text-2xl text-green-700 dark:text-green-400">Managing a GPU Bottleneck</h3>
    <div className="bg-green-50/50 dark:bg-green-900/20 rounded-xl p-6 mb-6 border border-green-200/60 dark:border-green-800/60">
      <p>This is often a <strong>good thing</strong>. The goal isn’t to remove it, but to tune for your FPS target.</p>
    </div>
    <div className="bg-card rounded-xl p-6 border border-green-200/60 dark:border-green-800/60 shadow-sm">
      <h4 className="font-semibold text-green-800 dark:text-green-400 mb-3">Levers for More FPS:</h4>
      <ul className="space-y-3">
        <li>Lower GPU settings (textures, shadows, ray tracing).</li>
        <li>Enable DLSS/FSR/XeSS for huge gains.</li>
        <li>Drop resolution (e.g., 4K → 1440p).</li>
        <li>Upgrade GPU for higher headroom.</li>
      </ul>
    </div>
  </section>

  {/* Real-World Example GPU */}
  <aside role="note" aria-label="Real-world example: GPU bottleneck" className="bg-card border border-green-200/60 dark:border-green-800/60 rounded-2xl p-8 mb-8 shadow">
    <h5 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4">
      Real-World Example: Overcoming a Mid-Range GPU Limit
    </h5>
    <p>
      A <strong>Ryzen 5 5600X</strong> is paired with an older <strong>GTX 1660 Super</strong>.
    </p>
    <p className="mt-3">
      At 1440p, the CPU can handle the logic, but the GPU maxes out at 100% and struggles to keep smooth FPS.
    </p>
    <p className="mt-3">
      <strong>The Solution:</strong> Upgrade to a <strong>RTX 4060</strong> or <strong>RX 7700 XT</strong> for stable, high-quality 1440p gaming.
    </p>
  </aside>

  {/* Final Section */}
  <section aria-labelledby="final-section" className="mb-8 p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow">
    <h2 id="final-section" className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text">
      How Our Calculator Leads to a Balanced PC
    </h2>
    <p className="mt-4 text-lg">
      Our tool analyzes component relationships so you don’t have to. By entering your parts, you get instant, data-driven analysis to:
    </p>
    <ul className="space-y-4 my-6">
      <li><strong>Build Smarter:</strong> Avoid pairing a high-end GPU with a weak CPU.</li>
      <li><strong>Upgrade with Confidence:</strong> Know which part gives biggest gains.</li>
      <li><strong>Save Money:</strong> Don’t overspend on bottlenecked components.</li>
    </ul>
    <div className="bg-card rounded-xl p-6 border border-purple-200/60 dark:border-purple-800/60">
      <p className="text-center text-lg">
        <strong className="text-purple-800 dark:text-purple-400">Ready to check your build?</strong> Use the calculator to ensure your PC is perfectly balanced for performance.
      </p>
    </div>
  </section>
</article>

        </CardContent>
      </Card>
    </motion.div>
  );
}