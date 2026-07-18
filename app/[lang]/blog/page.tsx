// =============================================================================
// app/[lang]/blog/page.tsx
// Blog home page — lists featured posts, latest posts with search, categories,
// and tags. Fully static (SSG) with client-side search interactivity.
// =============================================================================

import { Metadata } from 'next';
import { i18n } from '@/i18n-config';
import {
  getAllPosts,
  getFeaturedPosts,
  getAllCategories,
  getAllTags,
  SITE_URL,
} from '@/lib/blog';
import BlogHeader from '@/components/blog/blog-header';
import FeaturedPostCard from '@/components/blog/featured-post-card';
import PostCard from '@/components/blog/post-card';
import CategoryBadge from '@/components/blog/category-badge';
import TagList from '@/components/blog/tag-list';
import { AdSlotTop } from '@/components/blog/ad-slots';
import { BlogHomeClient } from './blog-home-client';
import { getBlogCopy } from '@/lib/blog-i18n';

// ---------------------------------------------------------------------------
// Static params — generate for every locale
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const copy = getBlogCopy(lang);
  const title = copy.title;
  const description = copy.description;

  return {
    title,
    description,
    keywords: [
      'PC gaming blog',
      'hardware reviews',
      'bottleneck guide',
      'GPU reviews',
      'PC optimization',
    ],
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${SITE_URL}/${l}/blog`])
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog`,
      siteName: 'PC Build Check',
      type: 'website',
      locale: lang === 'it' ? 'it_IT' : lang === 'fr' ? 'fr_FR' : lang === 'de' ? 'de_DE' : lang === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const copy = getBlogCopy(lang);
  const allPosts = getAllPosts(lang);
  const featuredPosts = getFeaturedPosts(lang);
  const categories = getAllCategories(lang);
  const tags = getAllTags(lang);

  // Schema.org BlogPosting list + BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/${lang}/blog#webpage`,
        url: `${SITE_URL}/${lang}/blog`,
        name: copy.title,
        description: copy.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: lang,
      },
      {
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
        ],
      },
    ],
  };

  return (
    <div className="py-8 px-4">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <BlogHeader
          title={copy.title}
          description={copy.description}
        />

        {/* AdSense Top Slot */}
        <AdSlotTop />

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section aria-labelledby="featured-heading">
            <h2
              id="featured-heading"
              className="text-2xl font-bold text-foreground mb-6"
            >
              {copy.featured}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post) => (
                <FeaturedPostCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
          </section>
        )}

        {/* Main content: posts grid + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Posts Column (3/4 width on desktop) */}
          <div className="lg:col-span-3">
            {/* Client wrapper handles search + filtering + pagination */}
            <BlogHomeClient allPosts={allPosts} lang={lang} />
          </div>

          {/* Sidebar (1/4 width on desktop) */}
          <aside className="lg:col-span-1 space-y-8" aria-label="Blog sidebar">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {copy.categories}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <CategoryBadge
                      key={cat.name}
                      category={cat.name}
                      lang={lang}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {copy.popularTags}
                </h3>
                <TagList
                  tags={tags.map((t) => t.name)}
                  lang={lang}
                />
              </div>
            )}

            {/* RSS Link */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {copy.stayUpdated}
              </h3>
              <a
                href="/api/rss"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                aria-label={copy.subscribe}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
                {copy.subscribe}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
