import 'server-only';
import type { Locale } from './i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
    en: () => import('./app/dictionaries/en.json').then((module) => module.default),
    it: () => import('./app/dictionaries/it.json').then((module) => module.default),
    fr: () => import('./app/dictionaries/fr.json').then((module) => module.default),
    de: () => import('./app/dictionaries/de.json').then((module) => module.default),
    es: () => import('./app/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en();
