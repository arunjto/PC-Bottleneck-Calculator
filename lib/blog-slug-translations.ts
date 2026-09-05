// Blog slug translations — maps English slugs to locale-specific slugs

/**
 * Blog slug translations: maps English (canonical) slugs to locale-specific slugs.
 * The keys are the English filenames (without .mdx), values are the translated filenames.
 * English entries map to themselves.
 */
export const blogSlugTranslations: Record<string, Record<string, string>> = {
  en: {
    'best-gpu-for-gaming-2026': 'best-gpu-for-gaming-2026',
    'cpu-vs-gpu-bottleneck-explained': 'cpu-vs-gpu-bottleneck-explained',
    'how-to-check-pc-bottleneck': 'how-to-check-pc-bottleneck',
  },
  it: {
    'best-gpu-for-gaming-2026': 'migliori-gpu-per-gaming-2026',
    'cpu-vs-gpu-bottleneck-explained': 'bottleneck-cpu-vs-gpu-spiegato',
    'how-to-check-pc-bottleneck': 'come-verificare-bottleneck-pc',
  },
  fr: {
    'best-gpu-for-gaming-2026': 'meilleures-gpu-pour-gaming-2026',
    'cpu-vs-gpu-bottleneck-explained': 'bottleneck-cpu-vs-gpu-explique',
    'how-to-check-pc-bottleneck': 'comment-verifier-bottleneck-pc',
  },
  de: {
    'best-gpu-for-gaming-2026': 'beste-gpu-fuer-gaming-2026',
    'cpu-vs-gpu-bottleneck-explained': 'cpu-vs-gpu-bottleneck-erklaert',
    'how-to-check-pc-bottleneck': 'wie-man-pc-bottleneck-prueft',
  },
  es: {
    'best-gpu-for-gaming-2026': 'mejores-gpu-para-gaming-2026',
    'cpu-vs-gpu-bottleneck-explained': 'bottleneck-cpu-vs-gpu-explicado',
    'how-to-check-pc-bottleneck': 'como-verificar-bottleneck-pc',
  },
  ru: {
    'cpu-vs-gpu-bottleneck-explained': 'uzkoe-mesto-cpu-ili-gpu',
    'how-to-check-pc-bottleneck': 'kak-proverit-uzkoe-mesto-pk',
    'how-to-estimate-gaming-fps': 'kak-uznat-skolko-fps-budet-v-igre',
  },
};

/**
 * Get the translated blog slug for a given locale and English slug.
 * Falls back to the English slug if no translation exists.
 */
export function getLocalizedBlogSlug(locale: string, englishSlug: string): string {
  return blogSlugTranslations[locale]?.[englishSlug] || englishSlug;
}

/**
 * Get the English (canonical) slug from a localized slug.
 * Used by the blog route to resolve translated URLs back to content files.
 */
export function getCanonicalBlogSlug(locale: string, localizedSlug: string): string {
  const translations = blogSlugTranslations[locale];
  if (!translations) return localizedSlug;

  // Reverse lookup: find the English key whose value matches the localized slug
  const canonicalSlug = Object.keys(translations).find(
    (key) => translations[key] === localizedSlug
  );

  return canonicalSlug || localizedSlug;
}

/**
 * Get all translated slugs for a given locale.
 * Returns the translated slug values (not the English keys).
 */
export function getAllLocalizedSlugs(locale: string): string[] {
  const translations = blogSlugTranslations[locale];
  if (!translations) return [];
  return Object.values(translations);
}
