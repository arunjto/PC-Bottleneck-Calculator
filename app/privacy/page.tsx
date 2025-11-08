import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import { ConsentManagerButton } from '@/components/privacy/manage-consent-button';

export const metadata: Metadata = {
  title: 'Privacy Policy — PCBuildCheck',
  description:
    'Learn how PCBuildCheck collects and uses data, our cookie practices, advertising partners, and your privacy rights.',
  alternates: {
    canonical: 'https://www.pcbuildcheck.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — PCBuildCheck',
    description:
      'How we collect and use data, cookie/advertising practices, and how to exercise your privacy rights.',
    url: 'https://www.pcbuildcheck.com/privacy',
    siteName: 'PCBuildCheck',
    type: 'website',
    images: ['https://www.pcbuildcheck.com/og-image.png'], // TODO: provide lightweight 1200x630 image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — PCBuildCheck',
    description:
      'How we collect and use data, cookie/advertising practices, and how to exercise your privacy rights.',
    images: ['https://www.pcbuildcheck.com/og-image.png'], // TODO
  },
  robots: { index: true, follow: true },
  authors: [{ name: 'PCBuildCheck Team', url: 'https://www.pcbuildcheck.com' }],
};

// ---------- SCHEMAS ----------
// Minimal, fast JSON-LD: WebSite (no SearchAction), PrivacyPolicy, BreadcrumbList

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
  url: 'https://www.pcbuildcheck.com/privacy',
  isPartOf: { '@id': 'https://www.pcbuildcheck.com/#website' },
  inLanguage: 'en-CA',
  name: 'Privacy Policy — PCBuildCheck',
  description:
    'Privacy, cookies, advertising technologies, analytics, and user rights for PCBuildCheck.',
  datePublished: '2024-05-12',
  dateModified: '2025-11-08',  // keep this in sync with the visible date below
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pcbuildcheck.com/' },
    { '@type': 'ListItem', position: 2, name: 'Privacy', item: 'https://www.pcbuildcheck.com/privacy' },
  ],
};

// ---------- PAGE COMPONENT ----------

export default function PrivacyPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([WEBSITE_SCHEMA, PRIVACY_SCHEMA, BREADCRUMB_SCHEMA]) }}
        />

        {/* Visible breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600 mb-4">
          <ol className="flex gap-1 items-center">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li aria-hidden className="px-1">›</li>
            <li className="text-slate-900 font-medium">Privacy</li>
          </ol>
        </nav>

        <MotionWrapper initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="shadow-lg">
            <CardContent className="pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-primary mb-2">Privacy Policy</h1>
                <p className="text-muted-foreground italic mb-8">
                  Last updated:{' '}
                  <time dateTime="2025-11-08">November 8, 2025</time>
                  {/* Keep this date in sync with PRIVACY_SCHEMA.dateModified */}
                </p>

                <p className="leading-7">
                  Your privacy matters to us. This policy explains what we collect, how we use it, and the choices you have
                  when using <strong>PCBuildCheck.com</strong>.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  1. Information We Collect
                </h2>
                <p className="leading-7">
                  We do not collect personally identifiable information unless you voluntarily provide it (for example, via our
                  contact form or email). We automatically process limited technical data (e.g., IP address, device/browser
                  info, pages viewed, timestamps) for security, analytics, and performance.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  2. Cookies & Local Storage
                </h2>
                <p className="leading-7">
                  We use cookies/local storage for essential functionality (e.g., theme preference) and to remember calculator
                  settings. These do not store personal data.
                </p>

                <h3 className="text-xl font-semibold mt-6">Advertising cookies (if enabled)</h3>
                <p className="leading-7">
                  If we integrate third-party ads (e.g., Google AdSense), those partners may use cookies or similar
                  technologies to show relevant ads. You can manage personalization in your ad settings (e.g., Google:{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                    https://www.google.com/settings/ads
                  </a>).
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  3. Analytics
                </h2>
                <p className="leading-7">
                  We use privacy-respecting analytics to understand site usage and improve performance. Where applicable, we
                  enable IP anonymization and respect regional consent requirements.
                </p>

                <h2 id="third-parties" className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  4. Third-Party Links & Services
                </h2>
                <p className="leading-7">
                  We may link to external sites (e.g., reviews, tools). Their privacy practices are their own—please review
                  their policies when you visit them.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  5. Your Choices & Rights
                </h2>
                <ul>
                  <li><strong>Cookie preferences:</strong> Manage or withdraw consent at any time from the <a href="#preferences">Cookie Preferences</a> section.</li>
                  <li><strong>Access, correction, deletion:</strong> You may request a copy or deletion of data we hold about you (if any).</li>
                  <li><strong>Opt-out of personalized ads:</strong> Use your ad settings (e.g., Google Ads Settings) or industry pages like <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">AboutAds</a>.</li>
                </ul>

                <h3 id="regional-rights" className="text-xl font-semibold mt-6">Regional rights (GDPR/CCPA/CPRA)</h3>
                <ul>
                  <li><strong>GDPR (EEA/UK):</strong> Right of access, rectification, erasure, restriction, portability, and objection.</li>
                  <li><strong>CCPA/CPRA (California):</strong> Right to know, delete, correct; opt-out of sale/share of personal information. See <a href="#do-not-sell">Do Not Sell or Share My Personal Information</a>.</li>
                </ul>

                <h2 id="preferences" className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  6. Cookie / Consent Preferences
                </h2>
                <p className="leading-7">
                  You can open the consent manager here:{' '}
                  <ConsentManagerButton className="underline text-primary" />
                  .
                </p>

                <h3 id="do-not-sell" className="text-xl font-semibold mt-6">Do Not Sell or Share My Personal Information</h3>
                <p className="leading-7">
                  California residents can exercise opt-out choices using the consent manager above or by emailing us.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  7. Children’s Privacy
                </h2>
                <p className="leading-7">
                  We do not knowingly collect personal information from children under 13. If you believe a child has provided
                  such information, contact us and we will remove it.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  8. Changes to This Policy
                </h2>
                <p className="leading-7">
                  We may update this page to reflect changes in practices or legal requirements. We encourage you to check the
                  “Last updated” date at the top.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  9. Contact Us
                </h2>
                <p className="leading-7">
                  Questions or requests? Email us at{' '}
                  <a href="mailto:rekhareet07@gmail.com">rekhareet07@gmail.com</a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}
