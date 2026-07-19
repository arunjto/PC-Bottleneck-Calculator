// =============================================================================
// components/blog/reading-progress.tsx
// Client component — Thin progress bar fixed at the very top of the page
// that fills from left to right as the user scrolls through the article.
// =============================================================================
"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * ReadingProgress renders a 3px-tall progress bar at the top of the viewport.
 *
 * - Listens to the scroll event to compute the percentage of the page scrolled.
 * - Uses a gradient of the primary colour for visual appeal.
 * - z-50 ensures it renders above most content but below modals.
 * - No props required — works with any page layout.
 */
export default function ReadingProgress() {
  /** Scroll progress as a percentage (0–100) */
  const [progress, setProgress] = useState<number>(0);

  /**
   * Calculate scroll progress: the amount the user has scrolled
   * divided by the total scrollable height of the document.
   */
  const handleScroll = useCallback(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (scrollHeight > 0) {
      const scrolled = (scrollTop / scrollHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    }
  }, []);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case the page is already partially scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
