// =============================================================================
// lib/blog.ts
// Core blog data layer — reading MDX files, parsing frontmatter, filtering,
// pagination, search, and taxonomy helpers.
// =============================================================================

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getLocalizedBlogSlug, getCanonicalBlogSlug } from '@/lib/blog-slug-translations';
import { slugifyTaxonomy } from '@/lib/taxonomy';
import { formatEditorialDate } from '@/lib/date';
import GithubSlugger from 'github-slugger';

export { slugifyTaxonomy } from '@/lib/taxonomy';

import type {
  BlogAuthor,
  BlogPost,
  BlogPostMeta,
  PaginatedPosts,
  TOCItem,
} from '@/types/blog';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Canonical site URL used for RSS, OG tags, and sitemaps. */
export const SITE_URL = 'https://www.pcbuildcheck.com';

/** Number of posts shown per page on listing pages. */
export const POSTS_PER_PAGE = 9;

/** Default author for every post on the site. */
export const AUTHOR: BlogAuthor = {
  name: 'Arun Kumar Yadav',
  bio: 'Founder, editor, tech writer, and tool creator at Pcbuildcheck.com. BTech graduate and web developer from Lucknow with 10 years of experience.',
  avatar: '/author-arun-kumar-yadav.jpg',
  url: 'https://www.pcbuildcheck.com/en/author',
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Absolute path to the blog content directory. */
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Get the content directory for a given locale.
 * Returns the locale-specific directory if it exists, otherwise the default.
 */
function getContentDir(locale?: string): string {
  if (locale && locale !== 'en') {
    const localeDir = path.join(CONTENT_DIR, locale);
    if (fs.existsSync(localeDir)) return localeDir;
  }
  return CONTENT_DIR;
}

/**
 * Get the file path for a given slug and locale.
 * For non-English locales, translates the slug to the locale-specific filename.
 * Checks locale-specific directory first, then falls back to default.
 */
function getPostFilePath(slug: string, locale?: string): string | null {
  // Try locale-specific directory first
  if (locale && locale !== 'en') {
    // The slug coming in could be either a translated slug or an English slug.
    // First try: use the slug as-is (it might already be the translated filename)
    const directPath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
    if (fs.existsSync(directPath)) return directPath;

    // Second try: treat the slug as an English slug and look up the translated filename
    const translatedSlug = getLocalizedBlogSlug(locale, slug);
    if (translatedSlug !== slug) {
      const translatedPath = path.join(CONTENT_DIR, locale, `${translatedSlug}.mdx`);
      if (fs.existsSync(translatedPath)) return translatedPath;
    }

    // Third try: treat the slug as a translated slug and resolve to canonical, then look for English
    const canonicalSlug = getCanonicalBlogSlug(locale, slug);
    if (canonicalSlug !== slug) {
      const canonicalLocalePath = path.join(CONTENT_DIR, locale, `${canonicalSlug}.mdx`);
      if (fs.existsSync(canonicalLocalePath)) return canonicalLocalePath;
    }
  }
  // Fallback to default (English) directory
  // The slug might be a translated slug, so resolve to canonical first
  const canonicalSlug = locale ? getCanonicalBlogSlug(locale, slug) : slug;
  const defaultPath = path.join(CONTENT_DIR, `${canonicalSlug}.mdx`);
  if (fs.existsSync(defaultPath)) return defaultPath;
  // Also try the original slug directly
  const directDefault = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (fs.existsSync(directDefault)) return directDefault;
  return null;
}

/**
 * Slugify a heading string for use as an HTML id / anchor target.
 * Strips non-word characters (except spaces and hyphens), lowercases, and
 * replaces whitespace runs with a single hyphen.
 */
/** Return true only when a post's publication date has arrived in the site's timezone. */
export function isPublished(date: string, now = new Date()): boolean {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const currentDateParts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(now);
    const part = (type: Intl.DateTimeFormatPartTypes) =>
      currentDateParts.find((item) => item.type === type)?.value ?? '';
    const currentSiteDate = `${part('year')}-${part('month')}-${part('day')}`;
    return date <= currentSiteDate;
  }

  const timestamp = Date.parse(date);
  return Number.isFinite(timestamp) && timestamp <= now.getTime();
}

// ---------------------------------------------------------------------------
// Reading-time & TOC utilities
// ---------------------------------------------------------------------------

/**
 * Estimate reading time in whole minutes (minimum 1).
 * Uses a rate of 200 words per minute.
 */
export function calculateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

/**
 * Extract a table-of-contents structure from raw markdown/MDX content.
 * Matches h2 – h4 headings written in ATX style (`## Heading`).
 */
export function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: TOCItem[] = [];
  const slugger = new GithubSlugger();
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // 2 = h2, 3 = h3, 4 = h4
    const text = match[2].trim();
    // Match rehype-slug's GitHub-compatible IDs, including numeric suffixes
    // for repeated headings (for example, common-causes and common-causes-1).
    const id = slugger.slug(text);
    items.push({ id, text, level });
  }

  return items;
}

// ---------------------------------------------------------------------------
// Post data fetching
// ---------------------------------------------------------------------------

/**
 * Return metadata for every blog post, sorted by date descending (newest first).
 * When a locale is provided, returns translated content from content/blog/{locale}/
 * with fallback to the default English content.
 * Slugs are translated to the locale-specific versions.
 * Gracefully returns an empty array if the content directory does not exist yet.
 */
export function getAllPosts(locale?: string): BlogPostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  // Always get the list of slugs from the default (English) directory
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file): BlogPostMeta | null => {
    const englishSlug = file.replace(/\.mdx$/, '');
    const englishRaw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data: englishData } = matter(englishRaw);
    const supportedLocales = (englishData.locales as string[] | undefined);

    // Do not publish English fallback articles under Russian URLs. Russian
    // posts become available only after their frontmatter explicitly includes
    // `ru` and a real localized MDX file is added.
    if (locale === 'ru' && !supportedLocales?.includes('ru')) {
      return null;
    }

    // Do not publish an English fallback under another locale URL when the
    // post explicitly declares the languages in which it is available.
    if (locale && supportedLocales && !supportedLocales.includes(locale)) {
      return null;
    }

    // Use translated slug for the URL, but load content from the right file
    const displaySlug = locale ? getLocalizedBlogSlug(locale, englishSlug) : englishSlug;
    const filePath = getPostFilePath(englishSlug, locale) || path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug: displaySlug,
      title: (data.title as string) || displaySlug,
      description: (data.description as string) || '',
      date: data.date ? String(data.date) : new Date().toISOString(),
      updated: data.updated ? String(data.updated) : undefined,
      author: (data.author as string) || AUTHOR.name,
      category: (data.category as string) || 'General',
      tags: (data.tags as string[]) || [],
      locales: supportedLocales,
      coverImage: (data.coverImage as string) || undefined,
      excerpt: (data.excerpt as string) || undefined,
      featured: Boolean(data.featured) || false,
      readingTime: calculateReadingTime(content),
      keywords: (data.keywords as string[]) || undefined,
    };
  }).filter((post): post is BlogPostMeta => post !== null);

  // Keep scheduled content out of listings, static routes, RSS, and sitemaps.
  return posts.filter((post) => isPublished(post.date)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single blog post by its slug, including the raw MDX content body.
 * When a locale is provided, resolves translated slugs and returns translated content if available.
 * Returns `null` when the slug does not correspond to a file on disk.
 */
export function getPostBySlug(slug: string, locale?: string): BlogPost | null {
  const filePath = getPostFilePath(slug, locale);
  if (!filePath) return null;

  const canonicalSlug = locale ? getCanonicalBlogSlug(locale, slug) : slug;
  const englishPath = path.join(CONTENT_DIR, `${canonicalSlug}.mdx`);
  const englishData = fs.existsSync(englishPath)
    ? matter(fs.readFileSync(englishPath, 'utf-8')).data
    : {};
  const supportedLocales = englishData.locales as string[] | undefined;
  if (locale === 'ru' && !supportedLocales?.includes('ru')) {
    return null;
  }
  if (locale && supportedLocales && !supportedLocales.includes(locale)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const publicationDate = data.date ? String(data.date) : '';
  if (!isPublished(publicationDate)) return null;

  // Determine the display slug (translated for non-English)
  // If the incoming slug is already translated, use it; otherwise translate it
  const displaySlug = locale ? getLocalizedBlogSlug(locale, canonicalSlug) : slug;

  return {
    slug: displaySlug,
    title: (data.title as string) || displaySlug,
    description: (data.description as string) || '',
    date: publicationDate,
    updated: data.updated ? String(data.updated) : undefined,
    author: (data.author as string) || AUTHOR.name,
    category: (data.category as string) || 'General',
    tags: (data.tags as string[]) || [],
    locales: supportedLocales,
    coverImage: (data.coverImage as string) || undefined,
    excerpt: (data.excerpt as string) || undefined,
    featured: Boolean(data.featured) || false,
    readingTime: calculateReadingTime(content),
    keywords: (data.keywords as string[]) || undefined,
    content,
  };
}

// ---------------------------------------------------------------------------
// Filtering helpers
// ---------------------------------------------------------------------------

/**
 * Return only posts whose frontmatter has `featured: true`.
 */
export function getFeaturedPosts(locale?: string): BlogPostMeta[] {
  return getAllPosts(locale).filter((post) => post.featured === true);
}

/**
 * Return posts belonging to the given category (case-insensitive comparison).
 */
export function getPostsByCategory(category: string, locale?: string): BlogPostMeta[] {
  return getAllPosts(locale).filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Return posts that include the given tag (case-insensitive comparison).
 */
export function getPostsByTag(tag: string, locale?: string): BlogPostMeta[] {
  const normalised = tag.toLowerCase();
  return getAllPosts(locale).filter((post) =>
    post.tags.some((t) => t.toLowerCase() === normalised)
  );
}

/**
 * Score and return related posts for a given article.
 *
 * Scoring:
 *  - Matching category → +2 points
 *  - Each shared tag   → +1 point
 *
 * Posts with zero relevance are excluded. Results are sorted by score
 * descending and capped to `limit` (default 3).
 */
export function getRelatedPosts(
  currentSlug: string,
  category: string,
  tags: string[],
  limit = 3,
  locale?: string
): BlogPostMeta[] {
  const all = getAllPosts(locale).filter((p) => p.slug !== currentSlug);

  const lowerCategory = category.toLowerCase();
  const lowerTags = tags.map((t) => t.toLowerCase());

  const scored = all.map((post) => {
    let score = 0;

    // Category match is worth 2 points
    if (post.category.toLowerCase() === lowerCategory) {
      score += 2;
    }

    // Each shared tag is worth 1 point
    score += post.tags.filter((t) => lowerTags.includes(t.toLowerCase())).length;

    return { post, score };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}

// ---------------------------------------------------------------------------
// Taxonomy helpers
// ---------------------------------------------------------------------------

/**
 * Get every unique category with its post count, sorted by count descending.
 */
export function getAllCategories(locale?: string): { name: string; count: number }[] {
  const posts = getAllPosts(locale);
  const map = new Map<string, number>();

  for (const post of posts) {
    const cat = post.category;
    map.set(cat, (map.get(cat) || 0) + 1);
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get every unique tag with its post count, sorted by count descending.
 */
export function getAllTags(locale?: string): { name: string; count: number }[] {
  const posts = getAllPosts(locale);
  const map = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Return all unique category values as URL-safe slugs (lowercased, hyphenated).
 * Useful for `generateStaticParams` on category pages.
 */
export function getAllCategorySlugs(locale?: string): string[] {
  const categories = getAllCategories(locale);
  return categories.map((c) => slugifyTaxonomy(c.name));
}

/**
 * Return all unique tag values as URL-safe slugs (lowercased, hyphenated).
 * Useful for `generateStaticParams` on tag pages.
 */
export function getAllTagSlugs(locale?: string): string[] {
  const tags = getAllTags(locale);
  return tags.map((t) => slugifyTaxonomy(t.name));
}

// ---------------------------------------------------------------------------
// Slugs, pagination, and search
// ---------------------------------------------------------------------------

/**
 * Return every post slug for a given locale. Handy for `generateStaticParams`.
 * Returns translated slugs for non-English locales.
 */
export function getAllSlugs(locale?: string): string[] {
  return getAllPosts(locale).map((post) => post.slug);
}

/**
 * Paginate an already-filtered list of posts.
 * Page numbers are 1-indexed and clamped to valid bounds.
 */
export function paginatePosts(
  posts: BlogPostMeta[],
  page: number
): PaginatedPosts {
  const totalPosts = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;

  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    currentPage,
    totalPosts,
  };
}

/**
 * Case-insensitive full-text search across title, description, excerpt,
 * category, and tags.
 */
export function searchPosts(
  posts: BlogPostMeta[],
  query: string
): BlogPostMeta[] {
  const q = query.toLowerCase().trim();
  if (!q) return posts;

  return posts.filter((post) => {
    const haystack = [
      post.title,
      post.description,
      post.excerpt || '',
      post.category,
      ...post.tags,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(q);
  });
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Format an ISO date string into a human-readable form, e.g. "July 2, 2026".
 */
export function formatDate(dateString: string): string {
  return formatEditorialDate(dateString, 'en', 'long');
}
