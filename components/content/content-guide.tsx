'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function ContentGuide({ dict }: { dict: any }) {
  if (!dict) return null;

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
                  {dict.guide.title}
                </h2>
              </div>
            </header>

            {/* Introduction */}
            <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
              <p className="text-justify leading-7 text-lg" dangerouslySetInnerHTML={{ __html: dict.guide.intro }} />
              <p className="text-justify leading-7 mt-4 text-lg" dangerouslySetInnerHTML={{ __html: dict.guide.intro_p2 }} />
            </section>

            {/* CPU Bottleneck */}
            <section aria-labelledby="cpu-bottleneck" className="mb-8">
              <h3 id="cpu-bottleneck" className="text-2xl text-red-700 dark:text-red-400 flex items-center gap-2">
                {dict.guide.cpu_section.title} <span className="text-lg font-normal text-red-600 dark:text-red-500">{dict.guide.cpu_section.subtitle}</span>
              </h3>
              <div className="bg-red-50/50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-r-xl p-6 mb-6">
                <p className="text-justify leading-7" dangerouslySetInnerHTML={{ __html: dict.guide.cpu_section.description }} />
              </div>
              <div className="bg-card rounded-xl p-6 border border-red-200/60 dark:border-red-800/60 shadow-sm">
                <h4 className="font-semibold text-red-800 dark:text-red-400 mb-3">{dict.guide.cpu_section.symptoms_title}</h4>
                <ul className="space-y-3">
                  {dict.guide.cpu_section.symptoms_list.map((symptom: string, i: number) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: symptom }} />
                  ))}
                </ul>
              </div>
            </section>

            {/* GPU Bottleneck */}
            <section aria-labelledby="gpu-bottleneck" className="mb-8">
              <h3 id="gpu-bottleneck" className="text-2xl text-green-700 dark:text-green-400 flex items-center gap-2">
                {dict.guide.gpu_section.title} <span className="text-lg font-normal text-green-600 dark:text-green-500">{dict.guide.gpu_section.subtitle}</span>
              </h3>
              <div className="bg-green-50/50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 rounded-r-xl p-6">
                <p className="text-justify leading-7" dangerouslySetInnerHTML={{ __html: dict.guide.gpu_section.description }} />
                <p className="text-justify leading-7 mt-4" dangerouslySetInnerHTML={{ __html: dict.guide.gpu_section.description_p2 }} />
              </div>
            </section>

            {/* Action Plan */}
            <section aria-labelledby="action-plan" className="mb-8 p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
              <h2 id="action-plan" className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-700 to-blue-700 dark:from-purple-400 dark:to-blue-400 bg-clip-text">
                {dict.guide.action_plan.title}
              </h2>
              <p className="mt-4 text-lg" dangerouslySetInnerHTML={{ __html: dict.guide.action_plan.description }} />
            </section>

            {/* CPU Bottleneck Solutions */}
            <section aria-labelledby="cpu-solutions" className="mb-8">
              <h3 id="cpu-solutions" className="text-2xl text-orange-700 dark:text-orange-400 mb-6">{dict.guide.cpu_solutions.title}</h3>
              <div className="bg-orange-50/50 dark:bg-orange-900/20 rounded-xl p-6 mb-6 border border-orange-200/60 dark:border-orange-800/60">
                <p>{dict.guide.cpu_solutions.intro}</p>
              </div>
              <div className="grid gap-6">
                <div className="bg-card rounded-xl p-6 border border-orange-200/60 dark:border-orange-800/60 shadow-sm">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-400 mb-3">{dict.guide.cpu_solutions.immediate_fixes_title}</h4>
                  <ul className="space-y-3">
                    {dict.guide.cpu_solutions.immediate_fixes_list.map((item: string, i: number) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-xl p-6 border border-orange-200/60 dark:border-orange-800/60 shadow-sm">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-400 mb-3">{dict.guide.cpu_solutions.long_term_fixes_title}</h4>
                  <ul className="space-y-3">
                    {dict.guide.cpu_solutions.long_term_fixes_list.map((item: string, i: number) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Real-World Example CPU */}
            <aside role="note" aria-label="Real-world example: CPU bottleneck" className="bg-card border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-8 mb-8 shadow">
              <h5 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
                {dict.guide.cpu_solutions.example_title}
              </h5>
              <p dangerouslySetInnerHTML={{ __html: dict.guide.cpu_solutions.example_desc }} />
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: dict.guide.cpu_solutions.example_issue }} />
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: dict.guide.cpu_solutions.example_solution }} />
            </aside>

            {/* GPU Bottleneck Solutions */}
            <section aria-labelledby="gpu-solutions" className="mb-8">
              <h3 id="gpu-solutions" className="text-2xl text-green-700 dark:text-green-400">{dict.guide.gpu_solutions.title}</h3>
              <div className="bg-green-50/50 dark:bg-green-900/20 rounded-xl p-6 mb-6 border border-green-200/60 dark:border-green-800/60">
                <p dangerouslySetInnerHTML={{ __html: dict.guide.gpu_solutions.intro }} />
              </div>
              <div className="bg-card rounded-xl p-6 border border-green-200/60 dark:border-green-800/60 shadow-sm">
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-3">{dict.guide.gpu_solutions.levers_title}</h4>
                <ul className="space-y-3">
                  {dict.guide.gpu_solutions.levers_list.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Real-World Example GPU */}
            <aside role="note" aria-label="Real-world example: GPU bottleneck" className="bg-card border border-green-200/60 dark:border-green-800/60 rounded-2xl p-8 mb-8 shadow">
              <h5 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4">
                {dict.guide.gpu_solutions.example_title}
              </h5>
              <p dangerouslySetInnerHTML={{ __html: dict.guide.gpu_solutions.example_desc }} />
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: dict.guide.gpu_solutions.example_issue }} />
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: dict.guide.gpu_solutions.example_solution }} />
            </aside>

            {/* Final Section */}
            <section aria-labelledby="final-section" className="mb-8 p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow">
              <h2 id="final-section" className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text">
                {dict.guide.final_section.title}
              </h2>
              <p className="mt-4 text-lg">
                {dict.guide.final_section.description}
              </p>
              <ul className="space-y-4 my-6">
                {dict.guide.final_section.benefits_list.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
              <div className="bg-card rounded-xl p-6 border border-purple-200/60 dark:border-purple-800/60">
                <p className="text-center text-lg" dangerouslySetInnerHTML={{ __html: dict.guide.final_section.cta }} />
              </div>
            </section>
          </article>

        </CardContent>
      </Card>
    </motion.div>
  );
}