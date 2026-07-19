// =============================================================================
// components/blog/calculator-link.tsx
// Server component for MDX — Renders a prominent card-style link that directs
// readers to one of the site's calculator tools (e.g. FPS Calculator,
// Bottleneck Calculator). Designed for embedding within blog post content.
//
// Usage in MDX:
//   <CalculatorLink href="/en/fps-calculator">
//     Try our FPS Calculator
//   </CalculatorLink>
// =============================================================================

import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Props for CalculatorLink */
interface CalculatorLinkProps {
  /** The internal path to link to (e.g. "/en/fps-calculator") */
  href: string;
  /** Link label / description — rendered as children */
  children: ReactNode;
}

/**
 * CalculatorLink renders a visually distinct card-style link
 * that stands out from surrounding prose content. It uses the
 * primary colour as an accent and includes a Calculator icon
 * on the left and an arrow on the right.
 */
export default function CalculatorLink({
  href,
  children,
}: CalculatorLinkProps) {
  return (
    <Link
      href={href}
      className="
        group my-6 flex items-center gap-4
        rounded-lg border border-primary/20 bg-primary/5
        px-5 py-4
        text-foreground no-underline
        transition-all duration-200
        hover:border-primary/40 hover:bg-primary/10 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      "
    >
      {/* Calculator icon */}
      <div
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-full bg-primary/10
        "
        aria-hidden="true"
      >
        <Calculator className="h-5 w-5 text-primary" />
      </div>

      {/* Label text */}
      <span className="flex-1 text-base font-semibold">{children}</span>

      {/* Arrow icon — slides right on hover */}
      <ArrowRight
        className="
          h-5 w-5 shrink-0 text-primary
          transition-transform duration-200
          group-hover:translate-x-1
        "
        aria-hidden="true"
      />
    </Link>
  );
}
