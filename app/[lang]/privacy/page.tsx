import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { ConsentManagerButton } from '@/components/privacy/manage-consent-button';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(lang);
  return {
    title: `${dict.privacy.title} — PCBuildCheck`,
    description: dict.privacy.intro.replace(/<[^>]*>?/gm, ''), // Strip HTML tags
    alternates: constructMetadataAlternates(lang, '/privacy'),
    openGraph: {
      title: `${dict.privacy.title} — PCBuildCheck`,
      description: dict.privacy.intro.replace(/<[^>]*>?/gm, ''),
      url: `https://www.pcbuildcheck.com/${lang}/privacy`,
      siteName: 'PCBuildCheck',
      type: 'website',
      images: ['https://www.pcbuildcheck.com/og-image.png'],
    },
  };
}

export default async function PrivacyPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  // JSON-LD Schemas (keeping mostly static/english for now as they are structural, 
  // but could be localized if strictly needed. Google understands English schema well.)
  const WEBSITE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.pcbuildcheck.com/#website',
    url: 'https://www.pcbuildcheck.com',
    name: 'PCBuildCheck',
  };

  const PRIVACY_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'PrivacyPolicy',
    '@id': 'https://www.pcbuildcheck.com/privacy#policy',
    url: `https://www.pcbuildcheck.com/${lang}/privacy`,
    isPartOf: { '@id': 'https://www.pcbuildcheck.com/#website' },
    inLanguage: lang,
    name: `${dict.privacy.title} — PCBuildCheck`,
    description: dict.privacy.intro.replace(/<[^>]*>?/gm, ''),
    datePublished: '2024-05-12',
    dateModified: '2025-11-08',
  };

  const BREADCRUMB_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.pcbuildcheck.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Privacy', item: `https://www.pcbuildcheck.com/${lang}/privacy` },
    ],
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([WEBSITE_SCHEMA, PRIVACY_SCHEMA, BREADCRUMB_SCHEMA]) }}
        />

        <nav aria-label="Breadcrumb" className="text-sm text-slate-600 mb-4">
          <ol className="flex gap-1 items-center">
            <li><a href={`/${lang}`} className="hover:underline">Home</a></li>
            <li aria-hidden className="px-1">›</li>
            <li className="text-slate-900 font-medium">Privacy</li>
          </ol>
        </nav>

        <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="shadow-lg">
            <CardContent className="pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-primary mb-2">{dict.privacy.title}</h1>
                <p className="text-muted-foreground italic mb-8">
                  {dict.privacy.last_updated}{' '}
                  <time dateTime="2025-11-08">November 8, 2025</time>
                </p>

                <p className="leading-7" dangerouslySetInnerHTML={{ __html: dict.privacy.intro }} />

                {dict.privacy.sections.map((section: any, index: number) => (
                  <div key={index}>
                    <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                      {section.title}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} className="leading-7" />
                  </div>
                ))}

                {/* Specific Consent Manager Button Section (Keeping explicit as it wraps a component) */}
                <h2 id="preferences" className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  {lang === 'it' ? '6. Preferenze Cookie / Consenso' : '6. Cookie / Consent Preferences'}
                </h2>
                <p className="leading-7">
                  {lang === 'it' ? 'Puoi aprire il gestore del consenso qui: ' : 'You can open the consent manager here: '}
                  <ConsentManagerButton className="underline text-primary" />
                  .
                </p>

              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}
