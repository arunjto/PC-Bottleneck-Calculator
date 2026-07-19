// =============================================================================
// components/blog/back-to-blog.tsx
// Server component — A subtle navigation link that takes users back to the
// main blog listing page. Includes an ArrowLeft icon for visual cue.
// =============================================================================

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogCopy } from "@/lib/blog-i18n";

/** Props for BackToBlog */
interface BackToBlogProps {
  /** Current locale for URL prefix (defaults to 'en') */
  lang?: string;
}

/**
 * BackToBlog renders a simple left-arrow link that navigates
 * back to the blog listing page. Used at the top of individual
 * blog post pages for easy navigation.
 */
export default function BackToBlog({ lang = "en" }: BackToBlogProps) {
  const copy = getBlogCopy(lang);
  return (
    <Link
      href={`/${lang}/blog`}
      className="
        group inline-flex items-center gap-2
        text-sm font-medium text-muted-foreground
        transition-colors duration-200
        hover:text-foreground
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        focus-visible:rounded-sm
      "
      aria-label={copy.back}
    >
      {/* Arrow icon — slides left on hover */}
      <ArrowLeft
        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      <span>{copy.back}</span>
    </Link>
  );
}
