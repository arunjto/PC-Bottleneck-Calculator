// =============================================================================
// app/[lang]/blog/blog-home-client.tsx
// Client component that wraps post listing with search and pagination.
// All post data is passed from the server; filtering happens client-side.
// =============================================================================

'use client';

import { useState, useMemo, useCallback } from 'react';
import type { BlogPostMeta } from '@/types/blog';
import PostCard from '@/components/blog/post-card';
import BlogSearch from '@/components/blog/blog-search';
import { getBlogCopy } from '@/lib/blog-i18n';

/** Number of posts to display per page on the blog home */
const CLIENT_POSTS_PER_PAGE = 9;

interface BlogHomeClientProps {
  allPosts: BlogPostMeta[];
  lang: string;
}

export function BlogHomeClient({ allPosts, lang }: BlogHomeClientProps) {
  const copy = getBlogCopy(lang);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // ------------------------------------------------------------------
  // Filter posts by search query (client-side)
  // ------------------------------------------------------------------
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return allPosts;

    const q = searchQuery.toLowerCase();
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [allPosts, searchQuery]);

  // ------------------------------------------------------------------
  // Pagination
  // ------------------------------------------------------------------
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / CLIENT_POSTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * CLIENT_POSTS_PER_PAGE,
    safePage * CLIENT_POSTS_PER_PAGE
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top of posts section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="space-y-8">
      {/* Search */}
      <BlogSearch
        onSearch={handleSearch}
        placeholder={copy.searchPlaceholder}
        searchLabel={copy.searchLabel}
        clearLabel={copy.clearSearch}
      />

      {/* Results count */}
      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          {filteredPosts.length} {filteredPosts.length === 1 ? copy.article : copy.articles}{' '}
          {copy.foundFor} &ldquo;{searchQuery}&rdquo;
        </p>
      )}

      {/* Post Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            {copy.noResults}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label={copy.pagination}
          className="flex justify-center items-center gap-2 pt-4"
        >
          {/* Previous */}
          <button
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage <= 1}
            className="px-3 py-2 rounded-lg border border-border text-sm font-medium
                       disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-muted transition-colors"
            aria-label={`${copy.previous} ${copy.page}`}
          >
            ← {copy.previous}
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors
                ${
                  page === safePage
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-muted'
                }`}
              aria-label={`${copy.page} ${page}`}
              aria-current={page === safePage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage >= totalPages}
            className="px-3 py-2 rounded-lg border border-border text-sm font-medium
                       disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-muted transition-colors"
            aria-label={`${copy.next} ${copy.page}`}
          >
            {copy.next} →
          </button>
        </nav>
      )}
    </div>
  );
}
