'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { i18n, Locale } from '@/i18n-config';
import { getCanonicalPath, getLocalizedPath } from '@/lib/path-translations';
import {
    blogSlugTranslations,
    getCanonicalBlogSlug,
} from '@/lib/blog-slug-translations';
import { getSiteChromeCopy } from '@/lib/site-i18n';
import { getAvailableLocalizedTaxonomySlug } from '@/lib/taxonomy-translations';
import type {
    TaxonomyAvailability,
    TaxonomyKind,
} from '@/lib/taxonomy-translations';

const languageOptions: Record<Locale, { label: string; flag: string }> = {
    en: { label: 'English', flag: '/flags/en.svg' },
    it: { label: 'Italiano', flag: '/flags/it.svg' },
    fr: { label: 'Français', flag: '/flags/fr.svg' },
    de: { label: 'Deutsch', flag: '/flags/de.svg' },
    es: { label: 'Español', flag: '/flags/es.svg' },
    ru: { label: 'Русский', flag: '/flags/ru.svg' },
};

export function LanguageSwitcher({
    taxonomyAvailability,
}: {
    taxonomyAvailability: TaxonomyAvailability;
}) {
    const pathname = usePathname();
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const summaryRef = useRef<HTMLElement>(null);

    const currentLocale = (pathname?.split('/')[1] || i18n.defaultLocale) as Locale;
    const currentLanguage = languageOptions[currentLocale] ?? languageOptions[i18n.defaultLocale];
    const copy = getSiteChromeCopy(currentLocale);

    useEffect(() => {
        const details = detailsRef.current;
        if (details) {
            details.open = false;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const currentDetails = detailsRef.current;
            if (
                currentDetails?.open &&
                event.target instanceof Node &&
                !currentDetails.contains(event.target)
            ) {
                currentDetails.open = false;
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const currentDetails = detailsRef.current;
            if (event.key === 'Escape' && currentDetails?.open) {
                currentDetails.open = false;
                summaryRef.current?.focus();
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [pathname]);

    const getLocaleHref = (newLocale: Locale) => {
        if (!pathname) return `/${newLocale}`;

        // Remove locale from path to get the rest, e.g. /it/chi-siamo -> /chi-siamo.
        const segments = pathname.split('/');
        const pathAfterLocale = segments.slice(2).join('/');

        if (!pathAfterLocale) {
            return `/${newLocale}`;
        }

        // Tag and category slugs are localized independently. Link to the
        // translated archive only when it exists in the target locale;
        // otherwise fall back to that locale's blog index instead of a 404.
        const blogTaxonomyMatch = pathAfterLocale.match(
            /^blog\/(tag|category)\/([^/]+)$/
        );
        if (blogTaxonomyMatch) {
            if (newLocale === currentLocale) {
                return pathname;
            }

            const kind = blogTaxonomyMatch[1] as TaxonomyKind;
            const localizedSlug = getAvailableLocalizedTaxonomySlug(
                kind,
                currentLocale,
                blogTaxonomyMatch[2],
                newLocale,
                taxonomyAvailability
            );

            return localizedSlug
                ? `/${newLocale}/blog/${kind}/${localizedSlug}`
                : `/${newLocale}/blog`;
        }

        // Blog articles are localized independently from normal app routes.
        // If the current article has no real translation in the requested
        // language, send the visitor to that language's blog index instead of
        // an English fallback URL that would return 404.
        const blogArticleMatch = pathAfterLocale.match(/^blog\/([^/]+)$/);
        if (blogArticleMatch) {
            if (newLocale === currentLocale) {
                return pathname;
            }

            const canonicalSlug = getCanonicalBlogSlug(
                currentLocale,
                blogArticleMatch[1]
            );
            const localizedSlug = blogSlugTranslations[newLocale]?.[canonicalSlug];

            return localizedSlug
                ? `/${newLocale}/blog/${localizedSlug}`
                : `/${newLocale}/blog`;
        }

        const canonicalPath = getCanonicalPath(currentLocale, pathAfterLocale);

        if (canonicalPath) {
            return getLocalizedPath(newLocale, canonicalPath);
        }

        return getLocalizedPath(newLocale, pathAfterLocale);
    };

    return (
        <details ref={detailsRef} className="group relative">
            <summary
                ref={summaryRef}
                className="inline-flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md hover:bg-slate-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white [&::-webkit-details-marker]:hidden"
                aria-label={`${copy.switchLanguage}: ${currentLanguage.label}`}
            >
                <Image
                    src={currentLanguage.flag}
                    alt=""
                    width={24}
                    height={16}
                    className="h-4 w-6 rounded-[2px] border border-white/30 object-cover shadow-sm"
                    aria-hidden="true"
                />
                <span className="sr-only">{copy.switchLanguage}</span>
            </summary>

            <nav
                aria-label={copy.switchLanguage}
                className="absolute right-0 z-50 mt-2 w-[12rem] origin-top-right rounded-lg border border-slate-200 bg-white p-1.5 text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
                <ul className="space-y-0.5">
                    {i18n.locales.map((locale) => (
                        <li key={locale}>
                            <a
                                href={getLocaleHref(locale)}
                                hrefLang={locale}
                                aria-current={locale === currentLocale ? 'page' : undefined}
                                onClick={() => {
                                    if (detailsRef.current) {
                                        detailsRef.current.open = false;
                                    }
                                }}
                                className={`flex min-h-10 items-center gap-3.5 rounded-md px-3.5 py-2.5 text-[15px] leading-none hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-slate-800 ${
                                    locale === currentLocale ? 'font-bold' : ''
                                }`}
                            >
                                <Image
                                    src={languageOptions[locale].flag}
                                    alt=""
                                    width={28}
                                    height={18}
                                    className="h-[18px] w-7 shrink-0 rounded-[2px] border border-border object-cover shadow-sm"
                                    aria-hidden="true"
                                />
                                <span className="whitespace-nowrap">{languageOptions[locale].label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </details>
    );
}
