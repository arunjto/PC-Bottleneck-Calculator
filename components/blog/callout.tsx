// =============================================================================
// components/blog/callout.tsx
// Server component for MDX — Styled callout / admonition block.
// Supports four visual types, each with a distinct colour palette and icon.
//
// Usage in MDX:
//   <Callout type="tip" title="Performance Tip">
//     Lower your resolution to gain extra FPS.
//   </Callout>
// =============================================================================

import { Info, AlertTriangle, Lightbulb, AlertOctagon } from "lucide-react";
import type { ReactNode } from "react";

/** Allowed callout types */
type CalloutType = "info" | "warning" | "tip" | "danger";

/** Props for Callout */
interface CalloutProps {
  /** Visual type — determines colour and icon (defaults to 'info') */
  type?: CalloutType;
  /** Optional title rendered as a bold heading */
  title?: string;
  /** Body content */
  children: ReactNode;
}

/**
 * Style map for each callout type.
 * - `container`: border + background classes
 * - `icon`: the Lucide icon component
 * - `iconClass`: colour applied to the icon
 * - `titleClass`: colour for the title text
 */
const CALLOUT_STYLES: Record<
  CalloutType,
  {
    container: string;
    icon: typeof Info;
    iconClass: string;
    titleClass: string;
  }
> = {
  info: {
    container:
      "border-blue-500/30 bg-blue-500/5 dark:border-blue-400/30 dark:bg-blue-400/5",
    icon: Info,
    iconClass: "text-blue-500 dark:text-blue-400",
    titleClass: "text-blue-700 dark:text-blue-300",
  },
  warning: {
    container:
      "border-yellow-500/30 bg-yellow-500/5 dark:border-yellow-400/30 dark:bg-yellow-400/5",
    icon: AlertTriangle,
    iconClass: "text-yellow-500 dark:text-yellow-400",
    titleClass: "text-yellow-700 dark:text-yellow-300",
  },
  tip: {
    container:
      "border-green-500/30 bg-green-500/5 dark:border-green-400/30 dark:bg-green-400/5",
    icon: Lightbulb,
    iconClass: "text-green-500 dark:text-green-400",
    titleClass: "text-green-700 dark:text-green-300",
  },
  danger: {
    container:
      "border-red-500/30 bg-red-500/5 dark:border-red-400/30 dark:bg-red-400/5",
    icon: AlertOctagon,
    iconClass: "text-red-500 dark:text-red-400",
    titleClass: "text-red-700 dark:text-red-300",
  },
};

/**
 * Callout renders a styled admonition block suitable for embedding
 * inside MDX blog content. It draws readers' attention to tips,
 * warnings, informational notes, or danger notices.
 */
export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  const styles = CALLOUT_STYLES[type];
  const Icon = styles.icon;

  return (
    <aside
      role="note"
      className={`my-6 rounded-lg border-l-4 p-4 ${styles.container}`}
    >
      {/* Header row: icon + optional title */}
      <div className="flex items-start gap-3">
        <Icon
          className={`mt-0.5 h-5 w-5 shrink-0 ${styles.iconClass}`}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          {title && (
            <p className={`mb-1 text-sm font-bold ${styles.titleClass}`}>
              {title}
            </p>
          )}
          {/* Body content */}
          <div className="text-sm text-foreground/90 [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
