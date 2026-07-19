import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';
import Link from 'next/link';
import { getLocalizedPath } from '@/lib/path-translations';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const description = dict.about.intro_p1.replace(/<[^>]*>/g, '').slice(0, 155);
  const url = `https://www.pcbuildcheck.com${getLocalizedPath(lang, 'about')}`;
  return {
    title: dict.about.title,
    description,
    alternates: constructMetadataAlternates(lang, '/about'),
    openGraph: {
      title: dict.about.title,
      description,
      url,
      siteName: 'PCBuildCheck',
      type: 'website',
      images: ['https://www.pcbuildcheck.com/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.about.title,
      description,
      images: ['https://www.pcbuildcheck.com/og-image.png'],
    },
    robots: { index: true, follow: true },
    authors: [{ name: 'Arun Kumar Yadav', url: 'https://www.pcbuildcheck.com/en/author' }],
  };
}

// ---------- SCHEMAS ----------

// Organization schema (brand identity)
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.pcbuildcheck.com/#org',
  name: 'PCBuildCheck',
  url: 'https://www.pcbuildcheck.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.pcbuildcheck.com/og-image.png',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'contact@pcbuildcheck.com',
      availableLanguage: ['en'],
    },
  ],
};

// WebSite schema (domain info)
// (1) Removed SearchAction because /search?q= does not exist
const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.pcbuildcheck.com/#website',
  url: 'https://www.pcbuildcheck.com',
  name: 'PCBuildCheck',
  publisher: { '@id': 'https://www.pcbuildcheck.com/#org' },
};

// AboutPage schema (page identity)
// (3) Added mainEntityOfPage, inLanguage, and image width/height
// AboutPage schema moved inside component to access dynamic lang

// Breadcrumb schema (Home → About) — built inside component to use lang param
// See BREADCRUMB_SCHEMA usage in AboutPage component below

// ---------- PAGE COMPONENT ----------

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const aboutUrl = `https://www.pcbuildcheck.com${getLocalizedPath(lang, 'about')}`;

  // AboutPage schema (page identity)
  const ABOUT_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${aboutUrl}#about`,
    name: 'About PCBuildCheck',
    url: aboutUrl,
    isPartOf: { '@id': 'https://www.pcbuildcheck.com/#website' },
    about: { '@id': 'https://www.pcbuildcheck.com/#org' },
    mainEntityOfPage: aboutUrl,
    inLanguage: lang,
    description:
      'PCBuildCheck is a transparent, data-driven PC performance and bottleneck calculator built by gamers, creators, and developers.',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://www.pcbuildcheck.com/og-image.png',
      width: 1200,
      height: 630,
    },
  };

  // Locale-aware breadcrumb schema
  const BREADCRUMB_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://www.pcbuildcheck.com/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: aboutUrl,
      },
    ],
  };
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* JSON-LD Schemas for Google / EEAT */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              ORG_SCHEMA,
              WEBSITE_SCHEMA,
              ABOUT_SCHEMA,
              BREADCRUMB_SCHEMA,
            ]),
          }}
        />

        {/* (7) Visible breadcrumbs to match JSON-LD */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600 mb-4">
          <ol className="flex gap-1 items-center">
            <li>
              <a href={`/${lang}`} className="hover:underline">Home</a>
            </li>
            <li aria-hidden="true" className="px-1">›</li>
            <li className="text-slate-900 font-medium" aria-current="page">About</li>
          </ol>
        </nav>

        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg">
            <CardContent className="pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-primary mb-6">
                  {dict.about.title}
                </h1>

                <p className="leading-7" dangerouslySetInnerHTML={{ __html: dict.about.intro_p1 }} />

                <p className="leading-7" dangerouslySetInnerHTML={{ __html: dict.about.intro_p2 }} />

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  {dict.about.mission_title}
                </h2>

                <p className="leading-7" dangerouslySetInnerHTML={{ __html: dict.about.mission_desc_1 }} />

                <p className="leading-7" dangerouslySetInnerHTML={{ __html: dict.about.mission_desc_2 }} />

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  {dict.about.how_title}
                </h2>

                <p className="leading-7" dangerouslySetInnerHTML={{ __html: dict.about.how_desc_1 }} />

                <p className="leading-7" dangerouslySetInnerHTML={{ __html: dict.about.how_desc_2 }} />

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  {dict.about.different_title}
                </h2>

                <ul>
                  {dict.about.different_list.map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>

                <p className="mt-4">
                  <Link
                    href={getLocalizedPath(lang, 'methodology')}
                    className="font-semibold text-primary hover:underline"
                  >
                    {lang === 'it' ? 'Leggi la metodologia completa' :
                     lang === 'fr' ? 'Lire la méthodologie complète' :
                     lang === 'de' ? 'Vollständige Methodik lesen' :
                     lang === 'es' ? 'Leer la metodología completa' :
                     'Read the full methodology'}
                  </Link>
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  {dict.about.promise_title}
                </h2>

                <ul>
                  {dict.about.promise_list.map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  {dict.about.community_title}
                </h2>

                <p className="leading-7" dangerouslySetInnerHTML={{ __html: dict.about.community_desc }} />

                <p className="leading-7 mt-4" dangerouslySetInnerHTML={{ __html: dict.about.contact_text }} />

                <p className="leading-7 mt-6" dangerouslySetInnerHTML={{ __html: dict.about.signature }} />
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}
