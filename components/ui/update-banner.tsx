'use client';

import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function UpdateBanner({ dict, href }: { dict: any; href: string }) {
  if (!dict) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-4 shadow-sm dark:border-green-800 dark:bg-green-950/30 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <Rocket className="h-8 w-8 text-green-600" />
        <div>
          <h2 className="font-semibold text-green-800 dark:text-green-200 m-0">
            {dict.title}
          </h2>
          <p className="text-sm text-green-700 dark:text-green-300 m-0">
            {dict.description}
          </p>
          <Link
            href={href}
            className="mt-1 inline-flex text-sm font-semibold text-green-800 underline-offset-4 hover:underline dark:text-green-200"
          >
            {dict.link_text}
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full text-xs font-bold text-green-800 dark:text-green-200 whitespace-nowrap">
        <Sparkles className="h-3 w-3" />
        {dict.badge}
      </div>
    </motion.div>
  );
}
