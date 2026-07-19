// =============================================================================
// lib/mdx.ts
// MDX compilation pipeline — transforms raw MDX strings into React elements
// using next-mdx-remote/rsc with rehype plugins for syntax highlighting,
// heading anchors, and custom component overrides.
// =============================================================================

import React from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

import { mdxComponents } from '@/components/blog/mdx-components';

// ---------------------------------------------------------------------------
// Rehype plugin options
// ---------------------------------------------------------------------------

/** Options for rehype-autolink-headings — wraps heading text in an <a>. */
const autolinkOptions = {
  behavior: 'wrap' as const,
};

/** Options for rehype-pretty-code — Shiki-based syntax highlighting. */
const prettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: true,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Compile a raw MDX string into a renderable React element.
 *
 * The pipeline applies the following rehype transformations in order:
 *  1. `rehypeSlug`              — adds `id` attributes to headings
 *  2. `rehypeAutolinkHeadings`  — wraps heading text in anchor links
 *  3. `rehypePrettyCode`        — syntax-highlights fenced code blocks
 *
 * Custom component overrides (e.g. styled callouts, images, links) are
 * injected via the shared `mdxComponents` map.
 *
 * @param source - Raw MDX content string (frontmatter should already be stripped).
 * @returns An object containing the compiled React `content` element.
 */
export async function compileMDXContent(
  source: string
): Promise<{ content: React.ReactElement }> {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, autolinkOptions],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });

  return { content };
}
