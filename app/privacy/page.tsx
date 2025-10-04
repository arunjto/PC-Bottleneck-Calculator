import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy - PC Performance Calculator',
  description: 'Our privacy policy explains how we handle your data and protect your privacy while using our PC performance tools.',
  alternates: {
    canonical: "https://www.pcbuildcheck.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg">
  <CardContent className="pt-8">
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground italic mb-8">Last Updated: October 2025</p>

      <p className="leading-7">
        Your privacy is very important to us. This Privacy Policy document outlines the types of
        information collected and recorded by <strong>PCBuildCheck.com</strong> and how we use it.
      </p>

      <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
        1. Information We Collect
      </h2>

      <p className="leading-7">
        We do not collect personally identifiable information unless you voluntarily provide it
        (for example, by contacting us through our contact form or email).
      </p>

      <p className="leading-7">
        Like many websites, we may automatically collect technical information such as your IP
        address, browser type, referring/exit pages, and the date and time of your visit. This
        information is used solely for analytics, site performance, and improving user experience.
      </p>

      <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
        2. Cookies and Advertising
      </h2>

      <p className="leading-7">
        <strong>PCBuildCheck.com</strong> uses cookies to improve your experience, such as saving
        your theme preference (light or dark mode). These cookies do not store any personal
        information.
      </p>

      <p className="leading-7">
        In the future, we may work with third-party advertising partners to display ads on our
        website. These partners may use cookies and similar technologies to serve personalized ads
        based on your interests and browsing activity.
      </p>

      <p className="leading-7">
        If we partner with Google AdSense or other advertising networks, they may use cookies
        (including the <strong>DoubleClick DART cookie</strong>) to serve ads to our visitors
        based on their visit to <strong>PCBuildCheck.com</strong> and other websites. Users will be
        able to opt out of personalized advertising by visiting their ad settings page (for example,
        Google’s Ads Settings at{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.google.com/settings/ads
        </a>).
      </p>

      <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
        3. Third-Party Services
      </h2>

      <p className="leading-7">
        Our website may contain links to external sites that are not operated by us (e.g., benchmark
        tools, affiliate partners, or hardware reviews). Please be aware that we are not responsible
        for the privacy practices or content of these external websites. We encourage you to review
        the privacy policies of any third-party sites you visit.
      </p>

      <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
        4. Children’s Privacy
      </h2>

      <p className="leading-7">
        Protecting children’s privacy is especially important. Our website does not knowingly
        collect any personal information from children under the age of 13. If you believe your
        child has provided such information, please contact us immediately and we will promptly
        remove it.
      </p>

      <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
        5. Your Consent
      </h2>

      <p className="leading-7">
        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
      </p>

      <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
        6. Updates to This Privacy Policy
      </h2>

      <p className="leading-7">
        We may update this Privacy Policy from time to time. Any changes will be posted on this
        page with the updated date. We encourage you to review this Privacy Policy periodically.
      </p>

      <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
        7. Contact Us
      </h2>

      <p className="leading-7">
        If you have any questions about this Privacy Policy or our practices, please contact us at:
      </p>
      <p className="leading-7">
        📧 <a href="mailto:contact@pcbuildcheck.com">contact@pcbuildcheck.com</a>
      </p>
    </div>
  </CardContent>
</Card>
</MotionWrapper>
</div>
</div>
  );
}