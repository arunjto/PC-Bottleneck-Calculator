import { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';
import { getLocalizedPath } from '@/lib/path-translations';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
  return {
    title: 'Thank You - PCBuildCheck',
    description: 'Thanks for reaching out to PCBuildCheck. We will respond shortly.',
    alternates: constructMetadataAlternates(lang, '/thank-you'),
  };
}

export default async function ThankYouPage({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-sm uppercase tracking-widest text-primary font-semibold">
          PCBuildCheck
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Thanks for contacting us!
        </h1>
        <p className="text-lg text-muted-foreground">
          Your message has been received. Our team usually responds within 48 business hours. Keep an
          eye on your inbox for an update.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            href={`/${lang}`}
          >
            Back to Home
          </a>
          <a
            className="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href={getLocalizedPath(lang, 'psu-calculator')}
          >
            Explore PSU Calculator
          </a>
        </div>
      </div>
    </div>
  );
}

