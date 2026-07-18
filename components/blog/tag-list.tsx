// =============================================================================
// components/blog/tag-list.tsx
// Server component — Renders an inline flex-wrap list of tag pill links.
// Each tag links to its archive page at /[lang]/blog/tag/[slug].
// =============================================================================

import Link from "next/link";
import { slugifyTaxonomy } from "@/lib/taxonomy";
import { getBlogCopy } from "@/lib/blog-i18n";

/** Props for TagList */
interface TagListProps {
  /** Array of tag display names */
  tags: string[];
  /** Current locale for URL prefix (defaults to 'en') */
  lang?: string;
}

/**
 * Converts a tag name into a URL-safe slug.
 * e.g. "Graphics Card" → "graphics-card"
 */
/**
 * TagList renders a horizontal, wrapping row of small tag pills.
 * Each pill links to the tag archive page. Uses muted background
 * and muted-foreground text for a subtle appearance.
 */
export default function TagList({ tags, lang = "en" }: TagListProps) {
  if (!tags || tags.length === 0) return null;
  const copy = getBlogCopy(lang);

  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label={copy.tags}>
      {tags.map((tag) => {
        const slug = slugifyTaxonomy(tag);
        return (
          <Link
            key={tag}
            href={`/${lang}/blog/tag/${slug}`}
            role="listitem"
            className="
              inline-flex items-center rounded-full px-2.5 py-0.5
              text-xs font-medium leading-tight
              bg-muted text-muted-foreground
              transition-colors duration-200
              hover:bg-muted/80 hover:text-foreground
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            "
            aria-label={`View all posts tagged ${tag}`}
          >
            #{tag}
          </Link>
        );
      })}
    </div>
  );
}
