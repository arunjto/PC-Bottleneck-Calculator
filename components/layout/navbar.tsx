import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Menu, X } from 'lucide-react';
import { getLocalizedPath } from '@/lib/path-translations';
import { i18n, Locale } from '@/i18n-config';
import { getSiteChromeCopy } from '@/lib/site-i18n';
import { getAllCategorySlugs, getAllTagSlugs } from '@/lib/blog';
import type { TaxonomyAvailability } from '@/lib/taxonomy-translations';

const taxonomyAvailability = Object.fromEntries(
  i18n.locales.map((locale) => [
    locale,
    {
      tag: getAllTagSlugs(locale),
      category: getAllCategorySlugs(locale),
    },
  ])
) as TaxonomyAvailability;

export function Navbar({ lang }: { lang: string; dict?: unknown }) {
  const t = getSiteChromeCopy(lang);

  const navLinks = [
    { href: `/${lang}`, label: t.home },
    { href: getLocalizedPath(lang as Locale, 'tools'), label: t.tools },
    { href: getLocalizedPath(lang as Locale, 'fps-calculator'), label: t.fpsCalculator },
    { href: getLocalizedPath(lang as Locale, 'psu-calculator'), label: t.psuCalculator },
    { href: `/${lang}/blog`, label: t.blog },
    { href: getLocalizedPath(lang as Locale, 'author'), label: t.author },
    { href: getLocalizedPath(lang as Locale, 'about'), label: t.about },
    { href: getLocalizedPath(lang as Locale, 'contact'), label: t.contact },
    { href: getLocalizedPath(lang as Locale, 'privacy'), label: t.privacy },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1e293b] text-white shadow-lg xl:bg-[#1e293b]/95 xl:backdrop-blur-md">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Brand */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2.5 font-semibold text-base hover:text-blue-300 transition-colors flex-shrink-0"
          >
            <Image
              src="/logo.webp"
              alt="PC Build Check"
              width={28}
              height={28}
              className="rounded"
            />
            <span className="hidden sm:inline">PC Build Check</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1" aria-label={t.mainNavigation}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-white 2xl:px-3 2xl:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageSwitcher taxonomyAvailability={taxonomyAvailability} />
            <ThemeToggle lang={lang} />
            <details className="group xl:hidden">
              <summary
                aria-controls="mobile-menu"
                aria-label={t.mobileNavigation}
                className="inline-flex cursor-pointer list-none items-center justify-center rounded-md p-2 text-gray-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white [&::-webkit-details-marker]:hidden"
              >
                <Menu className="h-5 w-5 group-open:hidden" aria-hidden="true" />
                <X className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
              </summary>

              <nav
                id="mobile-menu"
                aria-label={t.mobileNavigation}
                className="fixed inset-x-0 top-14 border-t border-slate-600/50 bg-[#1e293b] shadow-lg"
              >
                <ul className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6 lg:px-8">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-md px-3 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
