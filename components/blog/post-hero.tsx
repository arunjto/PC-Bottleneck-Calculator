// =============================================================================
// components/blog/post-hero.tsx
// Server component — Article hero section for individual blog post pages.
// Renders the cover image, title, and metadata row (author, date, reading time,
// category badge).
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, RefreshCw, User } from "lucide-react";

import CategoryBadge from "@/components/blog/category-badge";
import type { BlogPostMeta } from "@/types/blog";
import { getBlogCopy } from "@/lib/blog-i18n";
import { formatEditorialDate } from "@/lib/date";
import { getLocalizedPath } from "@/lib/path-translations";
import type { Locale } from "@/i18n-config";

/** Props for PostHero */
interface PostHeroProps {
  /** Full blog post metadata */
  post: BlogPostMeta;
  /** Current locale for URL prefix (defaults to 'en') */
  lang?: string;
}

/**
 * PostHero renders the top section of an individual blog post page.
 *
 * Layout:
 * 1. Full-width cover image (21:9 aspect ratio, priority loading)
 *    — or a gradient placeholder if no cover image is set
 * 2. Title (h1)
 * 3. Metadata row: author with avatar placeholder circle, publication date,
 *    optional updated date, reading time, category badge
 */
export default function PostHero({ post, lang = "en" }: PostHeroProps) {
  const copy = getBlogCopy(lang);
  const formattedDate = formatEditorialDate(post.date, lang);
  const formattedUpdated = post.updated
    ? formatEditorialDate(post.updated, lang)
    : null;

  return (
    <header className="mb-8">
      {/* ---- Cover image ---- */}
      <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        ) : (
          /* Gradient fallback */
          <div
            className="
              absolute inset-0
              bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20
            "
            aria-hidden="true"
          />
        )}
      </div>

      {/* ---- Title ---- */}
      <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>

      {/* ---- Metadata row ---- */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        {/* Author with avatar placeholder */}
        <div className="flex items-center gap-2">
          {/* Avatar placeholder circle */}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted"
            aria-hidden="true"
          >
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <Link
            href={getLocalizedPath(lang as Locale, 'author')}
            rel="author"
            className="font-medium text-foreground hover:underline"
          >
            {post.author}
          </Link>
        </div>

        {/* Separator */}
        <span aria-hidden="true" className="text-border">
          •
        </span>

        {/* Publication date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={post.date}>{formattedDate}</time>
        </div>

        {/* Updated date (if present) */}
        {formattedUpdated && (
          <>
            <span aria-hidden="true" className="text-border">
              •
            </span>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{copy.updated} {formattedUpdated}</span>
            </div>
          </>
        )}

        {/* Separator */}
        <span aria-hidden="true" className="text-border">
          •
        </span>

        {/* Reading time */}
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{post.readingTime} {copy.minRead}</span>
        </div>

        {/* Separator */}
        <span aria-hidden="true" className="text-border">
          •
        </span>

        {/* Category badge */}
        <CategoryBadge category={post.category} lang={lang} />
      </div>
    </header>
  );
}
