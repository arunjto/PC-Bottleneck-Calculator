// =============================================================================
// types/blog.ts
// Centralized type definitions for the blog system.
// =============================================================================

/**
 * Author information displayed on blog posts.
 */
export interface BlogAuthor {
  name: string;
  bio: string;
  avatar: string;
  url: string;
}

/**
 * Frontmatter metadata for a blog post (without content body).
 * Used in listing pages, cards, and search results.
 */
export interface BlogPostMeta {
  /** URL-friendly identifier derived from filename */
  slug: string;
  /** Post title — used in <title>, OG, and headings */
  title: string;
  /** SEO meta description */
  description: string;
  /** ISO date string of first publication */
  date: string;
  /** ISO date string of last update (optional) */
  updated?: string;
  /** Author name */
  author: string;
  /** Primary category (single) */
  category: string;
  /** Tags for taxonomy and related-post matching */
  tags: string[];
  /** Path to cover/hero image (relative to /public) */
  coverImage?: string;
  /** Short excerpt for cards and search */
  excerpt?: string;
  /** Whether this post appears in the featured section */
  featured?: boolean;
  /** Estimated reading time in minutes (auto-calculated) */
  readingTime: number;
  /** SEO keywords (optional override — falls back to tags) */
  keywords?: string[];
}

/**
 * Full blog post including raw MDX content body.
 * Used when rendering a single article page.
 */
export interface BlogPost extends BlogPostMeta {
  /** Raw MDX content (frontmatter stripped) */
  content: string;
}

/**
 * Table of contents item extracted from headings.
 */
export interface TOCItem {
  /** Slugified heading ID for anchor links */
  id: string;
  /** Heading text content */
  text: string;
  /** Heading depth: 2 = h2, 3 = h3, 4 = h4 */
  level: number;
}

/**
 * Paginated result wrapper.
 */
export interface PaginatedPosts {
  posts: BlogPostMeta[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}

/**
 * FAQ item for structured data / schema markup.
 */
export interface FAQItem {
  question: string;
  answer: string;
}
