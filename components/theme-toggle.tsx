'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { getSiteChromeCopy } from '@/lib/site-i18n';

export function ThemeToggle({ lang = 'en' }: { lang?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const copy = getSiteChromeCopy(lang);
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md px-0 text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      aria-label={isDark ? copy.switchToLight : copy.switchToDark}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
      <span className="sr-only">{isDark ? copy.switchToLight : copy.switchToDark}</span>
    </button>
  );
}
