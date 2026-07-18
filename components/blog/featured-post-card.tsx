// =============================================================================
// components/blog/featured-post-card.tsx
// Server component — Large hero-style card for featured blog posts.
// Full-width cover image with a gradient overlay and metadata overlaid.
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { parseISO } from "date-fns";

import CategoryBadge from "@/components/blog/category-badge";
import type { BlogPostMeta } from "@/types/blog";
import { getBlogCopy } from "@/lib/blog-i18n";

/** Props for FeaturedPostCard */
interface FeaturedPostCardProps {
  /** Blog post metadata to render */
  post: BlogPostMeta;
  /** Current locale for URL prefix (defaults to 'en') */
  lang?: string;
}

/**
 * FeaturedPostCard renders a large, hero-style card designed to highlight
 * a featured or pinned blog post at the top of the blog index page.
 *
 * Features:
 * - Wide 21:9 aspect cover image via next/image
 * - Bottom gradient overlay for readable text on any image
 * - Overlaid category badge, title (h2), excerpt, author, date, reading time
 * - Entire card is wrapped in a single Link for ease of navigation
 * - Dark mode compatible — gradient works in both themes
 */
export default function FeaturedPostCard({
  post,
  lang = "en",
}: FeaturedPostCardProps) {
  const postUrl = `/${lang}/blog/${post.slug}`;
  const copy = getBlogCopy(lang);
  const formattedDate = new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(parseISO(post.date));

  return (
    <article className="group relative overflow-hidden rounded-2xl shadow-md">
      {/* Entire card is a link */}
      <Link
        href={postUrl}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`Read featured article: ${post.title}`}
      >
        {/* ---- Cover image ---- */}
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 2.5rem), 592px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* Gradient fallback */
            <div
              className="
                absolute inset-0
                bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30
              "
              aria-hidden="true"
            />
          )}

          {/* ---- Bottom gradient overlay for text readability ---- */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t from-black/80 via-black/40 to-transparent
            "
            aria-hidden="true"
          />

          {/* ---- Overlaid content ---- */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
            {/* Category badge */}
            <div className="mb-3">
              <CategoryBadge category={post.category} lang={lang} linked={false} />
            </div>

            {/* Title */}
            <h2 className="mb-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              {post.title}
            </h2>

            {/* Excerpt */}
            {(post.excerpt || post.description) && (
              <p className="mb-4 line-clamp-2 max-w-3xl text-sm text-white/80 sm:text-base">
                {post.excerpt ?? post.description}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 sm:text-sm">
              {/* Author */}
              <span className="font-medium text-white/90">{post.author}</span>

              <span aria-hidden="true">•</span>

              {/* Date */}
              <time dateTime={post.date}>{formattedDate}</time>

              <span aria-hidden="true">•</span>

              {/* Reading time */}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingTime} {copy.minRead}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
