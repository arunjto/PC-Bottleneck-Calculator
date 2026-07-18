import { Metadata } from 'next';
import { LegalPage } from '@/components/content/legal-page';
import { Locale } from '@/i18n-config';
import { getLegalCopy } from '@/lib/legal-i18n';
import { constructMetadataAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const copy = getLegalCopy(lang, 'disclaimer');
  const alternates = constructMetadataAlternates(lang, '/disclaimer');

  return {
    title: copy.title,
    description: copy.description,
    alternates,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: alternates.canonical,
      siteName: 'PCBuildCheck',
      type: 'website',
      locale: lang,
    },
    twitter: { card: 'summary_large_image', title: copy.title, description: copy.description },
    robots: { index: true, follow: true },
  };
}

export default async function DisclaimerPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  return <LegalPage lang={lang} copy={getLegalCopy(lang, 'disclaimer')} pageKey="disclaimer" />;
}
