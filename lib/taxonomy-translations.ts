import type { Locale } from '@/i18n-config';

export type TaxonomyKind = 'tag' | 'category';

export type TaxonomyAvailability = Record<
  Locale,
  Record<TaxonomyKind, string[]>
>;

type LocalizedTaxonomySlugs = Partial<Record<Locale, string>>;

/**
 * Semantic taxonomy groups for blog archives.
 *
 * Values are URL slugs rather than display labels so this module can be used
 * safely by the client-side language switcher without importing the
 * filesystem-backed blog data layer.
 */
const taxonomySlugTranslations: Record<
  TaxonomyKind,
  LocalizedTaxonomySlugs[]
> = {
  category: [
    {
      en: 'hardware',
      it: 'hardware',
      fr: 'hardware',
      de: 'hardware',
      es: 'hardware',
      ru: 'oborudovanie',
    },
    {
      en: 'guides',
      it: 'guide',
      fr: 'guides',
      de: 'ratgeber',
      es: 'guias',
      ru: 'rukovodstva',
    },
  ],
  tag: [
    { en: 'cpu', it: 'cpu', fr: 'cpu', de: 'cpu', es: 'cpu', ru: 'cpu' },
    { en: 'gpu', it: 'gpu', fr: 'gpu', de: 'gpu', es: 'gpu', ru: 'gpu' },
    {
      en: 'bottleneck',
      it: 'bottleneck',
      fr: 'bottleneck',
      de: 'bottleneck',
      es: 'bottleneck',
      ru: 'uzkoe-mesto',
    },
    {
      en: 'gaming',
      it: 'gaming',
      fr: 'gaming',
      de: 'gaming',
      es: 'gaming',
      ru: 'igry',
    },
    {
      en: 'performance',
      it: 'prestazioni',
      fr: 'performance',
      de: 'leistung',
      es: 'rendimiento',
      ru: 'proizvoditelnost',
    },
    {
      en: 'pc-performance',
      it: 'prestazioni-pc',
      fr: 'performance-pc',
      de: 'pc-leistung',
      es: 'rendimiento-pc',
      ru: 'proizvoditelnost-pk',
    },
    {
      en: 'gaming-fps',
      ru: 'igrovoy-fps',
    },
    {
      en: 'fps-calculator',
      ru: 'kalkulyator-fps',
    },
    {
      en: 'frame-time',
      ru: 'vremya-kadra',
    },
    {
      en: 'optimization',
      it: 'ottimizzazione',
      fr: 'optimisation',
      de: 'optimierung',
      es: 'optimizacion',
      ru: 'optimizatsiya',
    },
    {
      en: 'graphics-card',
      it: 'scheda-grafica',
      fr: 'carte-graphique',
      de: 'grafikkarte',
      es: 'tarjeta-grafica',
      ru: 'videokarta',
    },
    {
      en: 'pc-build',
      it: 'pc-build',
      fr: 'pc-build',
      de: 'pc-build',
      es: 'pc-build',
      ru: 'sborka-pk',
    },
    {
      en: 'nvidia',
      it: 'nvidia',
      fr: 'nvidia',
      de: 'nvidia',
      es: 'nvidia',
      ru: 'nvidia',
    },
    { en: 'amd', it: 'amd', fr: 'amd', de: 'amd', es: 'amd', ru: 'amd' },
  ],
};

/**
 * Resolve an equivalent archive slug in another locale.
 *
 * A translated slug is returned only when that archive is backed by at least
 * one currently published post in the target locale. Unknown translations or
 * unavailable archives return null so callers can use a safe blog-index
 * fallback instead of creating an internal 404 link.
 */
export function getAvailableLocalizedTaxonomySlug(
  kind: TaxonomyKind,
  currentLocale: Locale,
  currentSlug: string,
  targetLocale: Locale,
  availability: TaxonomyAvailability
): string | null {
  const targetSlugs = availability[targetLocale]?.[kind] ?? [];
  const translation = taxonomySlugTranslations[kind].find(
    (entry) => entry[currentLocale] === currentSlug
  );
  const translatedSlug = translation?.[targetLocale];

  if (translatedSlug && targetSlugs.includes(translatedSlug)) {
    return translatedSlug;
  }

  // Preserve universal or not-yet-mapped slugs only when the target archive
  // is known to exist. This keeps future shared taxonomies working safely.
  return targetSlugs.includes(currentSlug) ? currentSlug : null;
}
