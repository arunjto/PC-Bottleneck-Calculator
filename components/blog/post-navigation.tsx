// =============================================================================
// components/blog/post-navigation.tsx
// Server component — Previous / Next article navigation links displayed
// at the bottom of individual blog post pages.
// =============================================================================

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/types/blog";
import { getBlogCopy } from "@/lib/blog-i18n";

/** Props for PostNavigation */
interface PostNavigationProps {
  /** The previous post in sequence (optional — hidden if absent) */
  previousPost?: BlogPostMeta;
  /** The next post in sequence (optional — hidden if absent) */
  nextPost?: BlogPostMeta;
  /** Current locale for URL prefix (defaults to 'en') */
  lang?: string;
}

/**
 * PostNavigation renders a two-column layout at the bottom of an article
 * page, linking to the previous and next articles in the series or
 * chronological order.
 *
 * - Left column: Previous article (ArrowLeft icon)
 * - Right column: Next article (ArrowRight icon)
 * - Each column shows a direction label and the post title
 * - If only one direction exists, the other column is left empty
 */
export default function PostNavigation({
  previousPost,
  nextPost,
  lang = "en",
}: PostNavigationProps) {
  // Don't render if there are no adjacent posts
  if (!previousPost && !nextPost) return null;
  const copy = getBlogCopy(lang);

  return (
    <nav
      aria-label={copy.postNavigation}
      className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      {/* ---- Previous article ---- */}
      {previousPost ? (
        <Link
          href={`/${lang}/blog/${previousPost.slug}`}
          className="
            group flex items-start gap-3 rounded-lg border border-border
            bg-card p-4
            transition-colors duration-200
            hover:border-primary/30 hover:bg-muted/50
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          "
        >
          <ArrowLeft
            className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {copy.previousArticle}
            </span>
            <p className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">
              {previousPost.title}
            </p>
          </div>
        </Link>
      ) : (
        /* Empty spacer to keep next article on the right */
        <div />
      )}

      {/* ---- Next article ---- */}
      {nextPost ? (
        <Link
          href={`/${lang}/blog/${nextPost.slug}`}
          className="
            group flex items-start justify-end gap-3 rounded-lg
            border border-border bg-card p-4 text-right
            transition-colors duration-200
            hover:border-primary/30 hover:bg-muted/50
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          "
        >
          <div className="min-w-0">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {copy.nextArticle}
            </span>
            <p className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">
              {nextPost.title}
            </p>
          </div>
          <ArrowRight
            className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
