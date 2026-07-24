import { Locale } from '@/i18n-config';
import pathTranslationsData from '@/lib/path-translations.json';

type PathTranslations = {
    [key in Locale]: {
        [key: string]: string;
    };
};

// Mapping of internal paths (keys) to localized paths (values)
// Keys must match the file system structure relative to app/[lang]/
export const pathTranslations = pathTranslationsData as PathTranslations;

/**
 * Returns the localized path for a given locale and canonical path.
 * @param locale The target locale
 * @param path The internal path (e.g., 'about', '/about', 'fps-calculator')
 */
export function getLocalizedPath(locale: Locale, path: string): string {
    // Normalize path to remove leading slash for lookup
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Return empty string for root
    if (!cleanPath) return `/${locale}`;

    const translatedPath = pathTranslations[locale]?.[cleanPath];

    if (!translatedPath) {
        // If no translation found, fall back to the original path
        return `/${locale}/${cleanPath}`;
    }

    return `/${locale}/${translatedPath}`;
}

/**
 * Returns the canonical (internal) path for a given localized path.
 * Used by middleware to rewrite URLs to the correct file system path.
 * @param locale The current locale
 * @param path The localized path (e.g. 'chi-siamo')
 */
export function getCanonicalPath(locale: Locale, path: string): string | null {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    if (!cleanPath) return null;

    const translations = pathTranslations[locale];
    if (!translations) return null;

    // Find the key (canonical path) where the value matches the requested path
    const canonicalPath = Object.keys(translations).find(key => translations[key] === cleanPath);

    return canonicalPath || null;
}
