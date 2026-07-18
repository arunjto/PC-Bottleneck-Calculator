// =============================================================================
// components/blog/mdx-components.tsx
// Exports the `mdxComponents` object that maps standard HTML elements to
// custom-styled React components for use with next-mdx-remote.
//
// Also re-exports the YouTubeEmbed, Callout, and CalculatorLink components
// so they can be used directly inside MDX files without explicit imports.
// =============================================================================

import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import YouTubeEmbed from "@/components/blog/youtube-embed";
import Callout from "@/components/blog/callout";
import CalculatorLink from "@/components/blog/calculator-link";

// Re-export custom MDX components for convenience
export { YouTubeEmbed, Callout, CalculatorLink };

// -----------------------------------------------------------------------------
// Helper: determine if a URL is internal or external
// -----------------------------------------------------------------------------
function isInternalLink(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

// -----------------------------------------------------------------------------
// Custom element wrappers
// -----------------------------------------------------------------------------

/**
 * Responsive image wrapper using next/image.
 * Falls back to a standard img if src is missing.
 */
function MdxImage(props: ComponentPropsWithoutRef<"img">) {
  // Destructure and discard HTML-specific props that conflict with next/image types
  const { src, alt, width, height, ...rest } = props;

  if (!src || typeof src !== "string") return null;

  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt ?? ""}
        width={Number(width) || 800}
        height={Number(height) || 450}
        className="mx-auto rounded-lg"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Anchor element — uses next/link for internal paths and a regular <a>
 * with security attributes for external links.
 */
function MdxAnchor(
  props: ComponentPropsWithoutRef<"a"> & { children?: ReactNode }
) {
  const { href, children, ...rest } = props;

  if (!href) {
    return <a {...rest}>{children}</a>;
  }

  if (isInternalLink(href)) {
    return (
      <Link
        href={href}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * <pre> wrapper — styled code block with rounded corners and background.
 */
function MdxPre(
  props: ComponentPropsWithoutRef<"pre"> & { children?: ReactNode }
) {
  return (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed"
      {...props}
    />
  );
}

/**
 * Inline <code> styling — subtle background and rounded corners.
 */
function MdxCode(
  props: ComponentPropsWithoutRef<"code"> & { children?: ReactNode }
) {
  // If the code is inside a pre (code block), don't apply inline styles.
  // next-mdx-remote wraps code blocks as <pre><code>. We detect this by
  // checking if className starts with "language-" (set by rehype-pretty-code).
  const isCodeBlock =
    typeof props.className === "string" &&
    props.className.startsWith("language-");

  if (isCodeBlock) {
    return <code {...props} />;
  }

  return (
    <code
      className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground"
      {...props}
    />
  );
}

/**
 * <blockquote> — styled with a left border and italic text.
 */
function MdxBlockquote(
  props: ComponentPropsWithoutRef<"blockquote"> & { children?: ReactNode }
) {
  return (
    <blockquote
      className="my-6 border-l-4 border-primary/30 pl-4 italic text-muted-foreground [&>p]:mb-0"
      {...props}
    />
  );
}

/**
 * <table> wrapper — adds horizontal overflow scrolling on small screens.
 */
function MdxTable(
  props: ComponentPropsWithoutRef<"table"> & { children?: ReactNode }
) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="my-0 w-full min-w-[640px] border-collapse text-left text-sm" {...props} />
    </div>
  );
}

function MdxTableHead(
  props: ComponentPropsWithoutRef<"th"> & { children?: ReactNode }
) {
  return (
    <th
      className="border-b border-border bg-muted/80 px-4 py-3 font-semibold text-foreground"
      scope="col"
      {...props}
    />
  );
}

function MdxTableCell(
  props: ComponentPropsWithoutRef<"td"> & { children?: ReactNode }
) {
  return (
    <td
      className="border-b border-border/70 px-4 py-3 align-top leading-relaxed"
      {...props}
    />
  );
}

/**
 * Heading with scroll-margin-top for TOC anchor offset.
 * The `id` attribute is expected to be injected by rehype-slug.
 */
function MdxH2(
  props: ComponentPropsWithoutRef<"h2"> & { children?: ReactNode }
) {
  return (
    <h2
      className="mb-4 mt-10 scroll-mt-24 text-2xl font-bold tracking-tight"
      {...props}
    />
  );
}

function MdxH3(
  props: ComponentPropsWithoutRef<"h3"> & { children?: ReactNode }
) {
  return (
    <h3
      className="mb-3 mt-8 scroll-mt-24 text-xl font-semibold tracking-tight"
      {...props}
    />
  );
}

function MdxH4(
  props: ComponentPropsWithoutRef<"h4"> & { children?: ReactNode }
) {
  return (
    <h4
      className="mb-2 mt-6 scroll-mt-24 text-lg font-semibold tracking-tight"
      {...props}
    />
  );
}

// -----------------------------------------------------------------------------
// Exported component map
// -----------------------------------------------------------------------------

/**
 * The mdxComponents object maps HTML element names to custom React components.
 * Pass this to the MDXRemote (or similar) renderer to override default elements.
 *
 * Usage:
 *   import { mdxComponents } from '@/components/blog/mdx-components';
 *   <MDXRemote source={content} components={mdxComponents} />
 */
export const mdxComponents: Record<string, React.ComponentType<any>> = {
  // Standard HTML overrides
  img: MdxImage,
  a: MdxAnchor,
  pre: MdxPre,
  code: MdxCode,
  blockquote: MdxBlockquote,
  table: MdxTable,
  th: MdxTableHead,
  td: MdxTableCell,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,

  // Custom MDX components
  YouTubeEmbed,
  Callout,
  CalculatorLink,
};
