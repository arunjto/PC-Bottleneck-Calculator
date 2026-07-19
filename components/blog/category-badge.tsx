// =============================================================================
// components/blog/category-badge.tsx
// Server component — Styled category pill/badge that links to the category
// listing page. Used in post cards, post hero, and featured cards.
// =============================================================================

import Link from "next/link";
import { slugifyTaxonomy } from "@/lib/taxonomy";

/** Props for CategoryBadge */
interface CategoryBadgeProps {
  /** The display name of the category */
  category: string;
  /** Current locale for URL prefix (defaults to 'en') */
  lang?: string;
  /** Render a non-interactive badge when the parent is already a link. */
  linked?: boolean;
}

/**
 * Converts a category name into a URL-safe slug.
 * e.g. "PC Hardware" → "pc-hardware"
 */
/**
 * CategoryBadge renders a small pill-shaped link to the category archive page.
 * Uses the primary color at 10% opacity for background with full primary text.
 */
export default function CategoryBadge({
  category,
  lang = "en",
  linked = true,
}: CategoryBadgeProps) {
  const slug = slugifyTaxonomy(category);
  const className = `
    inline-flex items-center rounded-full px-3 py-1
    text-xs font-semibold leading-tight
    bg-primary/10 text-primary
    transition-colors duration-200
    ${linked ? 'hover:bg-primary/20 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring' : ''}
  `;

  if (!linked) {
    return <span className={className}>{category}</span>;
  }

  return (
    <Link
      href={`/${lang}/blog/category/${slug}`}
      className={className}
      aria-label={`View all posts in ${category}`}
    >
      {category}
    </Link>
  );
}
