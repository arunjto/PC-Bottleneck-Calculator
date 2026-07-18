// =============================================================================
// app/[lang]/blog/[slug]/page.tsx
// Individual blog article page with full SEO, TOC, progress bar, share buttons,
// prev/next navigation, related posts, and ad slots.
// =============================================================================

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { i18n, Locale } from '@/i18n-config';
import {
  getPostBySlug,
  getAllSlugs,
  getAllPosts,
  getRelatedPosts,
  extractTOC,
  formatDate,
  SITE_URL,
} from '@/lib/blog';
import { compileMDXContent } from '@/lib/mdx';
import ReadingProgress from '@/components/blog/reading-progress';
import TableOfContents from '@/components/blog/table-of-contents';
import PostHero from '@/components/blog/post-hero';
import ShareButtons from '@/components/blog/share-buttons';
import PostNavigation from '@/components/blog/post-navigation';
import RelatedPosts from '@/components/blog/related-posts';
import TagList from '@/components/blog/tag-list';
import BackToBlog from '@/components/blog/back-to-blog';
import { AdSlotTop, AdSlotMiddle, AdSlotBottom } from '@/components/blog/ad-slots';
import { getCanonicalBlogSlug, getLocalizedBlogSlug } from '@/lib/blog-slug-translations';
import { getBlogCopy } from '@/lib/blog-i18n';
import { getLocalizedPath } from '@/lib/path-translations';

// ---------------------------------------------------------------------------
// Static params — generate for every slug × locale combination
// Uses translated slugs per locale so URLs are naturally localized.
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  for (const locale of i18n.locales) {
    const slugs = getAllSlugs(locale);
    for (const slug of slugs) {
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
  const post = getPostBySlug(slug, lang);
  if (!post) return {};

  const url = `${SITE_URL}/${lang}/blog/${post.slug}`;
  const keywords = post.keywords || post.tags;
  const canonicalSlug = getCanonicalBlogSlug(lang, post.slug);
  const description = post.description.length > 160 ? `${post.description.slice(0, 157)}…` : post.description;

  return {
    title: post.title,
    description,
    keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        [
          ...i18n.locales.map((locale) => [
            locale,
            `${SITE_URL}/${locale}/blog/${getLocalizedBlogSlug(locale, canonicalSlug)}`,
          ]),
          ['x-default', `${SITE_URL}/en/blog/${canonicalSlug}`],
        ]
      ),
    },
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: 'PC Build Check',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage
        ? [{ url: `${SITE_URL}${post.coverImage}`, width: 1200, height: 630 }]
        : undefined,
      locale:
        lang === 'it'
          ? 'it_IT'
          : lang === 'fr'
          ? 'fr_FR'
          : lang === 'de'
          ? 'de_DE'
          : lang === 'es'
          ? 'es_ES'
          : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.coverImage ? [`${SITE_URL}${post.coverImage}`] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug, lang);
  if (!post) notFound();

  const copy = getBlogCopy(lang);
  const articleUrl = `${SITE_URL}/${lang}/blog/${post.slug}`;
  const authorUrl = `${SITE_URL}${getLocalizedPath(lang as Locale, 'author')}`;

  // Compile MDX content
  const { content: mdxContent } = await compileMDXContent(post.content);

  // Extract table of contents
  const tocItems = extractTOC(post.content);

  // Get related posts
  const relatedPosts = getRelatedPosts(
    post.slug,
    post.category,
    post.tags,
    3,
    lang
  );

  // Get previous/next posts for navigation
  const allPosts = getAllPosts(lang);
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : undefined;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        headline: post.title,
        description: post.description,
        image: post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        author: {
          '@type': 'Person',
          name: post.author,
          url: authorUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'PC Build Check',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.webp`,
          },
        },
        mainEntityOfPage: articleUrl,
        wordCount: post.content.split(/\s+/).length,
        articleSection: post.category,
        keywords: post.tags.join(', '),
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
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Reading progress bar */}
      <ReadingProgress />

      <article className="py-8 px-4">
        {/* Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Back to blog */}
          <BackToBlog lang={lang} />

          {/* Hero section */}
          <PostHero post={post} lang={lang} />

          {/* AdSense Top */}
          <AdSlotTop />

          {/* Main content + TOC sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 mt-8">
            {/* Article body */}
            <div className="min-w-0">
              <div className="blog-prose">
                {mdxContent}
              </div>

              {/* AdSense Middle */}
              <div className="my-8">
                <AdSlotMiddle />
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    {copy.tags}
                  </h3>
                  <TagList tags={post.tags} lang={lang} />
                </div>
              )}

              {/* Share buttons */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                  {copy.share}
                </h3>
                <ShareButtons
                  url={articleUrl}
                  title={post.title}
                  description={post.description}
                />
              </div>
            </div>

            {/* TOC Sidebar (desktop only) */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block" aria-label={copy.toc}>
                <TableOfContents items={tocItems} lang={lang} />
              </aside>
            )}
          </div>

          {/* Previous / Next navigation */}
          <div className="mt-12">
            <PostNavigation
              previousPost={previousPost}
              nextPost={nextPost}
              lang={lang}
            />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <RelatedPosts posts={relatedPosts} lang={lang} />
            </div>
          )}

          {/* AdSense Bottom */}
          <AdSlotBottom />
        </div>
      </article>
    </>
  );
}
