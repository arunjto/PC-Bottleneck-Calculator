// =============================================================================
// lib/rss.ts
// RSS 2.0 feed generator — builds a valid XML string from all blog posts.
// No external RSS library is used; the XML is constructed manually.
// =============================================================================

import { getAllPosts, SITE_URL } from '@/lib/blog';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Escape special XML characters so that titles and descriptions
 * don't break the feed markup.
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate a complete RSS 2.0 XML feed string containing every blog post.
 *
 * Channel metadata:
 *  - Title:       PC Build Check Blog
 *  - Link:        {SITE_URL}/en/blog
 *  - Description: Latest PC gaming guides, hardware reviews, and
 *                 optimization tips from PC Build Check.
 *  - Language:    en
 *
 * Each `<item>` includes:
 *  - title, description (excerpt or meta description), link, guid,
 *    pubDate, and one `<category>` element for the primary category
 *    plus one for each tag.
 *
 * @returns A UTF-8 RSS 2.0 XML string ready to be served with
 *          `Content-Type: application/rss+xml`.
 */
export function generateRSSFeed(): string {
  const posts = getAllPosts();

  const channelLink = `${SITE_URL}/en/blog`;

  // Build <item> elements for every post
  const items = posts
    .map((post) => {
      const postLink = `${SITE_URL}/en/blog/${post.slug}`;
      const description = post.excerpt || post.description;
      const pubDate = new Date(post.date).toUTCString();

      // Collect category + tags into <category> elements
      const categories = [post.category, ...post.tags]
        .map((cat) => `      <category>${escapeXml(cat)}</category>`)
        .join('\n');

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(description)}</description>
      <link>${postLink}</link>
      <guid isPermaLink="true">${postLink}</guid>
      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`;
    })
    .join('\n');

  // Assemble the full RSS document
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PC Build Check Blog</title>
    <link>${channelLink}</link>
    <description>Latest PC gaming guides, hardware reviews, and optimization tips from PC Build Check.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
}
