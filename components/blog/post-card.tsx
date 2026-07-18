// =============================================================================
// components/blog/post-card.tsx
// Server component — Blog post card for listing pages. Shows cover image
// (or gradient fallback), category badge, title, excerpt, and footer metadata.
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { parseISO } from "date-fns";

import CategoryBadge from "@/components/blog/category-badge";
import type { BlogPostMeta } from "@/types/blog";
import { getBlogCopy } from "@/lib/blog-i18n";

/** Props for PostCard */
interface PostCardProps {
  /** Blog post metadata to render */
  post: BlogPostMeta;
  /** Current locale for URL prefix (defaults to 'en') */
  lang?: string;
}

/**
 * PostCard renders a single blog post as a card suitable for grid layouts.
 *
 * Features:
 * - 16:9 cover image via next/image (with gradient fallback when absent)
 * - Category badge overlaid in the top-left of the image area
 * - Title linked to the full article page
 * - Two-line clamped excerpt
 * - Footer with author, formatted date, and estimated reading time
 * - Hover: subtle scale + shadow transition
 * - Full dark mode support
 */
export default function PostCard({ post, lang = "en" }: PostCardProps) {
  const postUrl = `/${lang}/blog/${post.slug}`;
  const copy = getBlogCopy(lang);
  const formattedDate = new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(parseISO(post.date));

  return (
    <article
      className="
        group relative flex flex-col overflow-hidden rounded-xl
        border border-border bg-card text-card-foreground shadow-sm
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:shadow-lg
        focus-within:ring-2 focus-within:ring-ring
      "
    >
      {/* ---- Cover image area ---- */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* Gradient fallback when no cover image is provided */
          <div
            className="
              absolute inset-0
              bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20
            "
            aria-hidden="true"
          />
        )}

        {/* Category badge — floats in top-left corner */}
        <div className="absolute left-3 top-3 z-10">
          <CategoryBadge category={post.category} lang={lang} />
        </div>
      </div>

      {/* ---- Card body ---- */}
      <div className="flex flex-1 flex-col p-5">
        {/* Post title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight">
          <Link
            href={postUrl}
            className="
              after:absolute after:inset-0
              focus-visible:outline-none
            "
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt — two-line clamp */}
        {(post.excerpt || post.description) && (
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {post.excerpt ?? post.description}
          </p>
        )}

        {/* Footer metadata */}
        <footer className="mt-auto flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
          {/* Author */}
          <span className="font-medium">{post.author}</span>

          {/* Separator dot */}
          <span aria-hidden="true" className="text-border">
            •
          </span>

          {/* Date */}
          <time dateTime={post.date}>{formattedDate}</time>

          {/* Separator dot */}
          <span aria-hidden="true" className="text-border">
            •
          </span>

          {/* Reading time */}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readingTime} {copy.minRead}
          </span>
        </footer>
      </div>
    </article>
  );
}
