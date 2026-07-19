// =============================================================================
// components/blog/related-posts.tsx
// Server component — "Related Articles" section displaying a grid of PostCard
// components. Used at the bottom of individual blog post pages.
// =============================================================================

import { Sparkles } from "lucide-react";

import PostCard from "@/components/blog/post-card";
import type { BlogPostMeta } from "@/types/blog";
import { getBlogCopy } from "@/lib/blog-i18n";

/** Props for RelatedPosts */
interface RelatedPostsProps {
  /** Array of related post metadata to display as cards */
  posts: BlogPostMeta[];
  /** Current locale for URL prefix (defaults to 'en') */
  lang?: string;
}

/**
 * RelatedPosts renders a titled section with a responsive grid of PostCard
 * components. Shows up to 3 related articles in a row on desktop, 2 on
 * tablet, and 1 on mobile.
 *
 * If the posts array is empty, nothing is rendered.
 */
export default function RelatedPosts({
  posts,
  lang = "en",
}: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;
  const copy = getBlogCopy(lang);

  return (
    <section aria-labelledby="related-posts-heading" className="mt-16">
      {/* Section heading */}
      <div className="mb-8 flex items-center gap-2">
        <Sparkles
          className="h-5 w-5 text-primary"
          aria-hidden="true"
        />
        <h2
          id="related-posts-heading"
          className="text-2xl font-bold tracking-tight"
        >
          {copy.related}
        </h2>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} lang={lang} />
        ))}
      </div>
    </section>
  );
}
