import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Locale } from '@/i18n-config';
import { getAllPosts } from '@/lib/blog';
import { getAuthorCopy } from '@/lib/author-i18n';
import { getLocalizedPath } from '@/lib/path-translations';
import { constructMetadataAlternates } from '@/lib/seo';
import { getSiteChromeCopy } from '@/lib/site-i18n';
import { Facebook, Instagram, Globe, MapPin, GraduationCap, Briefcase } from 'lucide-react';

const AUTHOR_IMAGE = 'https://www.pcbuildcheck.com/author-arun-kumar-yadav.jpg';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const copy = getAuthorCopy(lang);
  const alternates = constructMetadataAlternates(lang, '/author');

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates,
    openGraph: {
      title: copy.metaTitle,
      description: copy.profileDescription,
      url: alternates.canonical,
      siteName: 'PCBuildCheck',
      type: 'profile',
      locale: lang,
      images: [{ url: AUTHOR_IMAGE, width: 400, height: 400, alt: copy.imageAlt }],
    },
    twitter: {
      card: 'summary',
      title: copy.metaTitle,
      description: copy.profileDescription,
      images: [AUTHOR_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = getAuthorCopy(lang);
  const chrome = getSiteChromeCopy(lang);
  const authorPath = getLocalizedPath(lang, 'author');
  const contactPath = getLocalizedPath(lang, 'contact');
  const authorUrl = `https://www.pcbuildcheck.com${authorPath}`;
  const recentPosts = getAllPosts(lang).slice(0, 5);
  const dateFormatter = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.pcbuildcheck.com/#author',
    name: 'Arun Kumar Yadav',
    url: authorUrl,
    image: { '@type': 'ImageObject', url: AUTHOR_IMAGE, width: 400, height: 400 },
    description: copy.profileDescription,
    jobTitle: copy.role,
    inLanguage: lang,
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://www.pcbuildcheck.com/#org',
      name: 'PCBuildCheck',
      url: 'https://www.pcbuildcheck.com',
    },
    alumniOf: { '@type': 'EducationalOrganization', name: 'BTech Program' },
    knowsAbout: copy.expertiseItems,
    sameAs: [
      'https://www.pcbuildcheck.com',
      'https://www.facebook.com/people/PC-Build-Check/61576275498498/',
      'https://www.instagram.com/pcbuildcheck/',
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: chrome.home, item: `https://www.pcbuildcheck.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: chrome.author, item: authorUrl },
    ],
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, breadcrumbSchema]) }}
        />

        <nav aria-label={chrome.breadcrumb} className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          <ol className="flex gap-1 items-center">
            <li><Link href={`/${lang}`} className="hover:underline">{chrome.home}</Link></li>
            <li aria-hidden="true" className="px-1">›</li>
            <li className="text-slate-900 dark:text-slate-200 font-medium" aria-current="page">{chrome.author}</li>
          </ol>
        </nav>

        <Card className="shadow-lg overflow-hidden">
          <CardContent className="pt-8 pb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <Image
                src="/author-arun-kumar-yadav.jpg"
                alt={copy.imageAlt}
                width={150}
                height={150}
                className="rounded-full border-4 border-primary/20 shadow-md flex-shrink-0"
                priority
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-1">Arun Kumar Yadav</h1>
                <p className="text-primary font-medium mb-3">{copy.role}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" aria-hidden="true" /> PCBuildCheck.com
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {copy.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" /> BTech
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" aria-hidden="true" /> {copy.experience}
                  </span>
                </div>
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mt-0 mb-4">{copy.about}</h2>
              {copy.bio.map((paragraph) => <p key={paragraph} className="leading-7">{paragraph}</p>)}

              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mt-8 mb-4">{copy.expertise}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 list-disc pl-5">
                {copy.expertiseItems.map((item) => <li key={item}>{item}</li>)}
              </ul>

              {recentPosts.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mt-8 mb-4">
                    {copy.recentArticles}
                  </h2>
                  <ul className="space-y-2 list-none pl-0">
                    {recentPosts.map((post) => (
                      <li key={post.slug}>
                        <Link href={`/${lang}/blog/${post.slug}`} className="text-primary hover:underline font-medium no-underline">
                          {post.title}
                        </Link>
                        {post.date && (
                          <span className="text-muted-foreground text-sm ml-2">
                            — {dateFormatter.format(new Date(post.date))}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mt-8 mb-4">{copy.connect}</h2>
              <div className="flex flex-wrap gap-3 not-prose">
                <a
                  href="https://www.facebook.com/people/PC-Build-Check/61576275498498/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Facebook className="w-4 h-4" aria-hidden="true" /> Facebook
                </a>
                <a
                  href="https://www.instagram.com/pcbuildcheck/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" /> Instagram
                </a>
                <Link
                  href={contactPath}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  <Globe className="w-4 h-4" aria-hidden="true" /> {copy.contact}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
