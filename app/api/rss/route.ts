// =============================================================================
// app/api/rss/route.ts
// RSS feed endpoint — returns XML containing all blog posts.
// Available at /api/rss
// =============================================================================

import { generateRSSFeed } from '@/lib/rss';

// Blog content changes only when a new deployment is created, so generate the
// feed once at build time instead of invoking Fluid Compute for RSS requests.
export const dynamic = 'force-static';

/**
 * GET handler for the RSS feed.
 * Returns XML with appropriate content type headers.
 */
export async function GET() {
  const feed = generateRSSFeed();

  return new Response(feed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
