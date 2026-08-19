export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'it', 'fr', 'de', 'es'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export function isSupportedLocale(value: string): value is Locale {
    return (i18n.locales as readonly string[]).includes(value);
}
