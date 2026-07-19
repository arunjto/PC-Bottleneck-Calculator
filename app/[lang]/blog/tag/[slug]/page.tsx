// =============================================================================
// app/[lang]/blog/tag/[slug]/page.tsx
// Tag listing page — shows all posts with a specific tag.
// =============================================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { i18n } from '@/i18n-config';
import {
  getPostsByTag,
  getAllTagSlugs,
  getAllTags,
  slugifyTaxonomy,
  SITE_URL,
} from '@/lib/blog';
import BlogHeader from '@/components/blog/blog-header';
import PostCard from '@/components/blog/post-card';
import BackToBlog from '@/components/blog/back-to-blog';
import { getBlogCopy } from '@/lib/blog-i18n';

// ---------------------------------------------------------------------------
// Static params — generate for every tag × locale combination
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  for (const locale of i18n.locales) {
    const tagSlugs = getAllTagSlugs(locale);
    for (const slug of tagSlugs) {
      params.push({ lang: locale, slug });
    }
  }

  return params;
}

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const tags = getAllTags(lang);
  const tagSlug = slug;
  const tag = tags.find(
    (t) => slugifyTaxonomy(t.name) === tagSlug
  );

  if (!tag) return {};

  const title = `#${tag.name} — Blog — PC Build Check`;
  const description = `Browse all articles tagged with "${tag.name}" on the PC Build Check blog. ${tag.count} article${tag.count !== 1 ? 's' : ''} available.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/tag/${tagSlug}`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog/tag/${tagSlug}`,
      siteName: 'PC Build Check',
      type: 'website',
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default async function TagPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const copy = getBlogCopy(lang);
  const tagSlug = slug;

  // Find the matching tag name
  const tags = getAllTags(lang);
  const tag = tags.find(
    (t) => slugifyTaxonomy(t.name) === tagSlug
  );

  if (!tag) notFound();

  const posts = getPostsByTag(tag.name, lang);

  // Schema.org BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/${lang}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `#${tag.name}`,
        item: `${SITE_URL}/${lang}/blog/tag/${tagSlug}`,
      },
    ],
  };

  return (
    <div className="py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        <BackToBlog lang={lang} />

        <BlogHeader
          title={`#${tag.name}`}
          description={`${posts.length} ${posts.length === 1 ? copy.article : copy.articles} ${copy.withTag}`}
        />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {copy.noTag}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
