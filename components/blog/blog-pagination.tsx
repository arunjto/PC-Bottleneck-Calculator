// =============================================================================
// components/blog/blog-pagination.tsx
// Server component — Pagination controls with Previous/Next buttons and
// numbered page links with ellipsis for large page counts.
// =============================================================================

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Props for BlogPagination */
interface BlogPaginationProps {
  /** The currently active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Base URL path to which the page number is appended (e.g. '/en/blog') */
  basePath: string;
}

/**
 * Computes which page numbers to show.
 * Strategy: always show first, last, and currentPage ± 1.
 * Gaps are filled with -1 (rendered as ellipsis).
 */
function getPageNumbers(current: number, total: number): number[] {
  if (total <= 7) {
    // Show all pages when there are 7 or fewer
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>();

  // Always include first and last
  pages.add(1);
  pages.add(total);

  // Include current and its neighbours
  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) {
      pages.add(i);
    }
  }

  // Convert to sorted array and insert ellipsis markers (-1)
  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: number[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push(-1); // ellipsis marker
    }
    result.push(sorted[i]);
  }

  return result;
}

/**
 * Helper to build the URL for a given page number.
 * Page 1 links to the basePath itself; others append `?page=N`.
 */
function pageUrl(basePath: string, page: number): string {
  if (page === 1) return basePath;
  return `${basePath}?page=${page}`;
}

/**
 * Shared Tailwind classes for page number buttons.
 */
const basePageClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * BlogPagination renders a row of Previous / numbered pages / Next controls.
 *
 * Features:
 * - Previous & Next buttons with chevron icons
 * - Disabled state at boundary pages
 * - Active page highlighted with primary background
 * - Ellipsis for large page ranges
 */
export default function BlogPagination({
  currentPage,
  totalPages,
  basePath,
}: BlogPaginationProps) {
  // Nothing to render for single-page results
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex items-center justify-center gap-1"
    >
      {/* ---- Previous button ---- */}
      {hasPrev ? (
        <Link
          href={pageUrl(basePath, currentPage - 1)}
          className={`${basePageClass} hover:bg-muted`}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span
          className={`${basePageClass} cursor-not-allowed opacity-40`}
          aria-disabled="true"
        >
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {/* ---- Page numbers ---- */}
      {pages.map((page, idx) => {
        // Ellipsis
        if (page === -1) {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
              aria-hidden="true"
            >
              …
            </span>
          );
        }

        const isActive = page === currentPage;

        if (isActive) {
          return (
            <span
              key={page}
              className={`${basePageClass} bg-primary text-primary-foreground`}
              aria-current="page"
              aria-label={`Page ${page}, current page`}
            >
              {page}
            </span>
          );
        }

        return (
          <Link
            key={page}
            href={pageUrl(basePath, page)}
            className={`${basePageClass} hover:bg-muted`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </Link>
        );
      })}

      {/* ---- Next button ---- */}
      {hasNext ? (
        <Link
          href={pageUrl(basePath, currentPage + 1)}
          className={`${basePageClass} hover:bg-muted`}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span
          className={`${basePageClass} cursor-not-allowed opacity-40`}
          aria-disabled="true"
        >
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
