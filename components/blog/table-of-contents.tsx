// =============================================================================
// components/blog/table-of-contents.tsx
// Client component — Sticky sidebar table of contents with active heading
// tracking via IntersectionObserver and smooth scroll on click.
// =============================================================================
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { List } from "lucide-react";
import type { TOCItem } from "@/types/blog";
import { getBlogCopy } from "@/lib/blog-i18n";

/** Props for TableOfContents */
interface TableOfContentsProps {
  /** Array of heading items extracted from the MDX content */
  items: TOCItem[];
  lang?: string;
}

/**
 * TableOfContents renders a sticky sidebar navigation that:
 * 1. Lists all h2/h3/h4 headings with appropriate indentation
 * 2. Highlights the currently visible heading via IntersectionObserver
 * 3. Scrolls smoothly to the target heading on click
 *
 * The component is sticky-positioned at `top-24` so it stays visible
 * while the user scrolls the article content.
 */
export default function TableOfContents({ items, lang = 'en' }: TableOfContentsProps) {
  const copy = getBlogCopy(lang);
  /** ID of the heading currently in the viewport */
  const [activeId, setActiveId] = useState<string>("");

  /** Ref to avoid stale-closure issues in the observer callback */
  const activeIdRef = useRef<string>("");

  /**
   * Set up the IntersectionObserver to track which heading
   * is currently at the top of the viewport.
   */
  useEffect(() => {
    if (items.length === 0) return;

    // Collect all heading elements that match our TOC items
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry (top-most visible heading)
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          const id = intersecting[0].target.id;
          if (id !== activeIdRef.current) {
            activeIdRef.current = id;
            setActiveId(id);
          }
        }
      },
      {
        // rootMargin: small area near the top of the viewport
        rootMargin: "0px 0px -80% 0px",
        threshold: 1.0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  /**
   * Smooth-scroll to the heading when a TOC item is clicked.
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update active state immediately for snappy feedback
        setActiveId(id);
        activeIdRef.current = id;
      }
    },
    []
  );

  // Don't render if there are no headings
  if (items.length === 0) return null;

  return (
    <nav
      aria-label={copy.toc}
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      {/* Title */}
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <List className="h-4 w-4" aria-hidden="true" />
        <span>{copy.toc}</span>
      </div>

      {/* Heading list */}
      <ul className="space-y-1 border-l border-border">
        {items.map((item) => {
          const isActive = activeId === item.id;

          // Compute left padding based on heading level
          // h2 = pl-4, h3 = pl-7, h4 = pl-10
          const indent =
            item.level === 2
              ? "pl-4"
              : item.level === 3
                ? "pl-7"
                : "pl-10";

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`
                  block border-l-2 py-1 text-sm leading-snug transition-colors duration-200
                  ${indent}
                  ${
                    isActive
                      ? "border-primary font-medium text-primary"
                      : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                  }
                `}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
