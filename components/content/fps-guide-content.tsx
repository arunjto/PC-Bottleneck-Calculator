'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function FpsGuideContent({ dict }: { dict: any }) {
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
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/50 to-blue-100/50 dark:from-blue-800/30 dark:to-blue-800/30 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text leading-tight">
                  {dict.fps_guide.title}
                </h2>
              </div>
            </header>

            {/* Introduction */}
            <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
              <p className="text-justify leading-7 text-lg" dangerouslySetInnerHTML={{ __html: dict.fps_guide.intro }} />
            </section>

            {/* Why Estimate FPS */}
            <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{dict.fps_guide.why_estimate.title}</h3>
              <p className="text-justify leading-7" dangerouslySetInnerHTML={{ __html: dict.fps_guide.why_estimate.content }} />
            </section>

            {/* How FPS Calculator Works */}
            <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{dict.fps_guide.how_works.title}</h3>
              <p className="text-justify leading-7">
                {dict.fps_guide.how_works.content}
              </p>
              <ul className="space-y-3 mt-4">
                {dict.fps_guide.how_works.list.map((item: string, i: number) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </section>

            {/* Low FPS Solutions */}
            <header className="relative mb-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/50 to-blue-100/50 dark:from-purple-800/30 dark:to-blue-800/30 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text leading-tight">
                  {dict.fps_guide.low_fps.title}
                </h2>
              </div>
            </header>

            <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{dict.fps_guide.low_fps.step1.title}</h3>
              <p className="text-justify leading-7" dangerouslySetInnerHTML={{ __html: dict.fps_guide.low_fps.step1.p1 }} />
              <p className="text-justify leading-7 mt-4" dangerouslySetInnerHTML={{ __html: dict.fps_guide.low_fps.step1.p2 }} />
            </section>

            <section className="bg-card rounded-xl p-6 mb-8 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{dict.fps_guide.low_fps.step2.title}</h3>
              <p className="text-justify leading-7" dangerouslySetInnerHTML={{ __html: dict.fps_guide.low_fps.step2.p1 }} />
              <p className="text-justify leading-7 mt-4" dangerouslySetInnerHTML={{ __html: dict.fps_guide.low_fps.step2.p2 }} />
            </section>
          </article>

        </CardContent>
      </Card>
    </motion.div>
  );
}