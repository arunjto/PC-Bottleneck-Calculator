// =============================================================================
// components/blog/blog-header.tsx
// Server component — Page header for blog listing/archive pages.
// Renders a large gradient-styled h1 and optional description paragraph.
// =============================================================================

/** Props for BlogHeader */
interface BlogHeaderProps {
  /** The page title (rendered as h1) */
  title: string;
  /** Optional subtitle / description below the title */
  description?: string;
}

/**
 * BlogHeader renders a prominent page heading for blog listing pages
 * (main blog index, category archives, tag archives, search results).
 *
 * The title uses a CSS gradient text effect that works in both
 * light and dark modes via the primary → accent color range.
 */
export default function BlogHeader({ title, description }: BlogHeaderProps) {
  return (
    <header className="mb-10 text-center md:mb-14">
      {/* Gradient text heading */}
      <h1
        className="
          text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl
          bg-gradient-to-r from-primary via-accent to-primary
          bg-clip-text text-transparent
        "
      >
        {title}
      </h1>

      {/* Optional description */}
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  );
}
