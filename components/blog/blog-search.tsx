// =============================================================================
// components/blog/blog-search.tsx
// Client component — Debounced search input for blog post filtering.
// Calls onSearch callback after 300ms of inactivity.
// =============================================================================
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";

/** Props for BlogSearch */
interface BlogSearchProps {
  /** Callback fired with the search query after debounce */
  onSearch: (query: string) => void;
  /** Placeholder text for the input (defaults to 'Search articles…') */
  placeholder?: string;
  searchLabel?: string;
  clearLabel?: string;
}

/**
 * BlogSearch renders a styled search input with:
 * - A Search icon on the left
 * - 300ms debounced input to avoid excessive callback firing
 * - A clear (X) button that appears when text is present
 *
 * Fully keyboard accessible with rounded-full pill styling.
 */
export default function BlogSearch({
  onSearch,
  placeholder = "Search articles…",
  searchLabel = "Search blog posts",
  clearLabel = "Clear search",
}: BlogSearchProps) {
  /** Current value of the input */
  const [query, setQuery] = useState<string>("");

  /** Ref to the debounce timer so we can clear it on cleanup / new input */
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Stable reference to the onSearch callback.
   * Prevents re-creating the debounce effect when the parent re-renders
   * with a new function reference.
   */
  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  /**
   * Debounced effect: fires 300ms after the user stops typing.
   */
  useEffect(() => {
    // Clear any pending timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onSearchRef.current(query);
    }, 300);

    // Cleanup on unmount or when query changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query]);

  /**
   * Clears the search input and immediately fires the callback with
   * an empty string.
   */
  const handleClear = useCallback(() => {
    setQuery("");
    onSearchRef.current("");
  }, []);

  return (
    <div className="relative w-full max-w-md">
      {/* Search icon — left side */}
      <Search
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />

      {/* Input */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={searchLabel}
        className="
          w-full rounded-full border border-input bg-background
          py-2.5 pl-10 pr-10
          text-sm text-foreground
          placeholder:text-muted-foreground
          transition-shadow duration-200
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
        "
      />

      {/* Clear button — only visible when there is text */}
      {query.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label={clearLabel}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            rounded-full p-1
            text-muted-foreground
            transition-colors duration-150
            hover:bg-muted hover:text-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          "
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
