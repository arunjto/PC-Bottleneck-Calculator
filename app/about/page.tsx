import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

export const metadata: Metadata = {
  title: 'About Us – PCBuildCheck (PC Performance & Bottleneck Calculator)',
  description:
    'PCBuildCheck helps gamers, creators, and professionals make confident PC decisions with transparent, data-driven performance insights and clear explanations.',
  keywords: [
    'PC bottleneck calculator',
    'PC performance calculator',
    'FPS estimates',
    'CPU GPU compatibility',
    'build a gaming PC',
  ],
  alternates: {
    canonical: 'https://www.pcbuildcheck.com/about',
  },
  openGraph: {
    title: 'About PCBuildCheck – Transparent, Data-Driven PC Performance',
    description:
      'Learn how PCBuildCheck delivers accurate, explainable PC performance insights using verified benchmarks and transparent methodology.',
    url: 'https://www.pcbuildcheck.com/about',
    siteName: 'PCBuildCheck',
    type: 'website',
    images: ['https://www.pcbuildcheck.com/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PCBuildCheck – Transparent, Data-Driven PC Performance',
    description:
      'We demystify PC performance with verified data, explainable estimates, and privacy-first tools.',
    images: ['https://www.pcbuildcheck.com/og-image.png'],
  },
  robots: { index: true, follow: true },
  authors: [{ name: 'PCBuildCheck Team', url: 'https://www.pcbuildcheck.com' }],
};

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

// WebSite schema (search action & domain info)
const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.pcbuildcheck.com/#website',
  url: 'https://www.pcbuildcheck.com',
  name: 'PCBuildCheck',
  publisher: { '@id': 'https://www.pcbuildcheck.com/#org' },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.pcbuildcheck.com/search?q={query}',
    'query-input': 'required name=query',
  },
};

// AboutPage schema (page identity)
const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://www.pcbuildcheck.com/about#about',
  name: 'About PCBuildCheck',
  url: 'https://www.pcbuildcheck.com/about',
  isPartOf: { '@id': 'https://www.pcbuildcheck.com/#website' },
  about: { '@id': 'https://www.pcbuildcheck.com/#org' },
  description:
    'PCBuildCheck is a transparent, data-driven PC performance and bottleneck calculator built by gamers, creators, and developers.',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: 'https://www.pcbuildcheck.com/og-image.png',
  },
};

// Breadcrumb schema (Home → About)
const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.pcbuildcheck.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: 'https://www.pcbuildcheck.com/about',
    },
  ],
};

// ---------- PAGE COMPONENT ----------

export default function AboutPage() {
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

        <MotionWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg">
            <CardContent className="pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold text-primary mb-6">
                  About Us
                </h1>

                <p className="leading-7">
                  Welcome to <strong>PCBuildCheck.com</strong> — your trusted hub
                  for accurate, data-driven PC performance insights. We’re a
                  team of PC builders, gamers, and developers with one mission:{' '}
                  <em>
                    to make complex hardware decisions simple, explainable, and
                    reliable.
                  </em>
                </p>

                <p className="leading-7">
                  Whether you’re planning your next gaming rig, editing
                  workstation, or a budget build, our tools help you{' '}
                  <strong>understand</strong> performance — not just estimate
                  it — so you can buy and upgrade with confidence.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  Our Mission: Clarity You Can Trust
                </h2>

                <p className="leading-7">
                  Building or upgrading a PC shouldn’t be a guessing game. With
                  hundreds of CPUs, GPUs, and new hardware released every year,
                  it’s easy to get lost in specs and opinions.{' '}
                  <strong>PCBuildCheck</strong> exists to demystify performance
                  by combining verified benchmark data with clear explanations —
                  helping you spot bottlenecks before they cost you money.
                </p>

                <p className="leading-7">
                  We believe every gamer, creator, and professional deserves a
                  PC that performs to its full potential. Our calculators and
                  databases empower you with{' '}
                  <strong>informed, data-backed decisions</strong> so you get
                  maximum performance for every dollar spent.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  How It Works: Data + Real-World Testing
                </h2>

                <p className="leading-7">
                  Our proprietary hardware database aggregates verified
                  benchmarks and real-world game data. By analyzing CPU-GPU
                  balance, RAM capacity, and in-game results, we provide FPS
                  estimates and upgrade insights that mirror real performance —
                  not marketing claims.
                </p>

                <p className="leading-7">
                  Each result is an <strong>insight</strong>, not just a number.
                  We highlight why certain builds underperform and show you
                  practical, component-level optimizations.
                </p>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  What Makes Us Different
                </h2>

                <ul>
                  <li>
                    <strong>Transparency First:</strong> We explain how every
                    estimate is calculated. See our{' '}
                    <a href="/methodology">methodology</a>.
                  </li>
                  <li>
                    <strong>Built by Enthusiasts:</strong> Our algorithms are
                    powered by real benchmarks, not marketing promises.
                  </li>
                  <li>
                    <strong>User-First Design:</strong> Every tool is optimized
                    for speed, accessibility, and Core Web Vitals. Try our{' '}
                    <a href="/fps-calculator">FPS Calculator</a> or{' '}
                    <a href="/psu-calculator">PSU Calculator</a>.
                  </li>
                  <li>
                    <strong>Continuous Updates:</strong> We constantly add new
                    CPUs, GPUs, and games to stay accurate with the latest
                    releases.
                  </li>
                  <li>
                    <strong>Education Over Guesswork:</strong> We help you learn
                    <em> why</em> a configuration performs a certain way — not
                    just how much it scores.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  Our Promise
                </h2>

                <ul>
                  <li>
                    <strong>Accuracy:</strong> Benchmarks and models are refined
                    with real-world feedback.
                  </li>
                  <li>
                    <strong>Independence:</strong> We do not sell hardware or
                    accept sponsored rankings.
                  </li>
                  <li>
                    <strong>Privacy:</strong> Calculations run client-side. We
                    never collect or sell your personal data. Read our{' '}
                    <a href="/privacy">Privacy Policy</a>.
                  </li>
                  <li>
                    <strong>Accessibility:</strong> Our calculators are built
                    for beginners and experts alike, ensuring clarity for all
                    users.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mt-10 mb-6">
                  Join the Community
                </h2>

                <p className="leading-7">
                  <strong>PCBuildCheck</strong> is a growing community of
                  builders, gamers, and creators. We welcome feedback, bug
                  reports, and feature suggestions.
                </p>

                <p className="leading-7">
                  💬 Have a suggestion or found an issue?{' '}
                  <a href="/contact">Contact us</a> — we’d love to hear from
                  you.
                </p>

                <p className="leading-7 mt-6">
                  Let’s build something amazing together.<br />
                  <strong>— The Team at PCBuildCheck.com</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
}
