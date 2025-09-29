'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function PsuContent() {
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
      <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text leading-tight">
        PSU Wattage Calculator – Find the Right Power Supply for Your Gaming PC
      </h1>
    </div>
  </header>

  {/* Introduction */}
  <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
    <p className="text-justify leading-7 text-lg">
      Choosing the right <strong>Power Supply Unit (PSU)</strong> is critical for building a stable and 
      future-proof gaming PC. An underpowered PSU can cause crashes, random shutdowns, or even long-term 
      damage to your components. Our <strong>PSU Calculator</strong> makes it easy to estimate the exact 
      wattage your system needs, whether you’re planning a fresh build or upgrading your graphics card.
    </p>
  </section>

  {/* Why You Need a PSU Calculator */}
  <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Why Use a PSU Wattage Calculator?</h2>
    <p className="text-justify leading-7">
      Picking a PSU isn’t just about grabbing the highest wattage you can find. Overspending on an 
      unnecessarily powerful PSU wastes money, while underestimating your needs risks system instability. 
      A <strong>PSU wattage calculator</strong> ensures that you strike the perfect balance between cost, 
      efficiency, and performance.
    </p>
  </section>

  {/* How It Works */}
  <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
    <h2 className="text-xl font-semibold mb-4">How Does the PSU Calculator Work?</h2>
    <p className="text-justify leading-7">
      Our tool analyzes the combined power requirements of your CPU, GPU, RAM, storage devices, and 
      peripherals. It then recommends the ideal PSU wattage to prevent bottlenecks and ensure long-term 
      stability. This way, you can buy confidently without overpaying for extra power you’ll never use.
    </p>
    <p className="text-justify leading-7 mt-4">
      For the most accurate analysis, pair this tool with our 
      <strong> <a href="https://www.pcbuildcheck.com" className="text-primary hover:underline">PC Bottleneck Calculator</a></strong>. 
      It identifies weak links in your system so you know whether your next upgrade should be a GPU, CPU, 
      or power supply.
    </p>
  </section>

  {/* Benefits */}
  <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Benefits of Using Our PSU Calculator</h2>
    <ul className="space-y-3">
      <li><strong>Prevent Crashes & Instability:</strong> Ensure your PSU can handle your most demanding gaming sessions.</li>
      <li><strong>Save Money:</strong> Avoid overspending on an unnecessarily high-wattage power supply.</li>
      <li><strong>Future-Proof Your Build:</strong> Account for upcoming upgrades like GPUs or additional storage.</li>
      <li><strong>Peace of Mind:</strong> Build a system that runs smoothly under full load without risk.</li>
    </ul>
  </section>

  {/* Conclusion */}
<section className="bg-card rounded-xl p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
  <h2 className="text-xl font-semibold mb-4">Build Smarter with the Right PSU</h2>
  <p className="text-justify leading-7">
    The PSU is the foundation of a reliable gaming rig. With our <strong>PSU Wattage Calculator</strong>, 
    you can accurately determine how much power your system needs before making a purchase. 
    Pair it with our 
    <strong> <a href="/fps-calculator" className="text-primary hover:underline"> FPS Calculator </a></strong> 
    to see how your hardware translates into real-world gaming performance and achieve the perfect balance between power and gameplay.
  </p>
</section>

</article>
    </CardContent>
      </Card>
    </motion.div>
  );
}