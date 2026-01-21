import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { constructMetadataAlternates } from '@/lib/seo';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  return {
    title: `${dict.contact.title} - PC Performance Calculator`,
    description: dict.contact.subtitle,
    alternates: constructMetadataAlternates(lang, '/contact'),
    openGraph: {
      title: `${dict.contact.title} - PC Performance Calculator`,
      description: dict.contact.subtitle,
      url: `https://www.pcbuildcheck.com/${lang}/contact`,
      type: 'website',
      images: ['https://www.pcbuildcheck.com/og-image.png'],
    },
  };
}

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {dict.contact.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </div>

        <ContactForm dict={dict.contact} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: dict.contact.title,
            description: dict.contact.subtitle,
            url: `https://www.pcbuildcheck.com/${lang}/contact`,
            mainEntity: {
              '@type': 'Organization',
              name: 'PCBuildCheck',
              url: 'https://www.pcbuildcheck.com',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'support@pcbuildcheck.com',
              },
            },
          }),
        }}
      />
    </div>
  );
}