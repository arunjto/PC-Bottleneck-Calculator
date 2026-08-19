// app/layout.tsx
import '@/app/globals.css';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { i18n, isSupportedLocale } from '@/i18n-config';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === 'it' ? 'it_IT' : lang === 'fr' ? 'fr_FR' : lang === 'de' ? 'de_DE' : lang === 'es' ? 'es_ES' : 'en_US';

  return {
    metadataBase: new URL('https://www.pcbuildcheck.com'),
    title: {
      template: '%s | PCBuildCheck',
      default: 'PC Bottleneck Calculator - Optimize CPU & GPU Performance'
    },
    description:
      'Use our free PC Bottleneck Calculator to analyze CPU and GPU performance, fix system bottlenecks, and build a balanced gaming PC for maximum FPS.',
    keywords: [
      'PC Bottleneck Calculator',
      'CPU GPU bottleneck',
      'gaming performance',
      'FPS calculator',
      'PSU calculator',
      'balanced PC build'
    ],
    authors: [{ name: 'PC Build Check' }],
    openGraph: {
      type: 'website',
      locale: locale,
      url: 'https://www.pcbuildcheck.com',
      title: 'PC Bottleneck Calculator - Analyze CPU & GPU Performance',
      description:
        'Free PC Bottleneck Calculator to find CPU/GPU mismatches, optimize gaming FPS, and build a balanced PC system.',
      siteName: 'PC Build Check'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'PC Bottleneck Calculator',
      description:
        'Free tools to analyze CPU/GPU bottlenecks, estimate gaming FPS, and calculate PSU requirements.'
    },
    icons: {
      icon: [
        {
          url: '/favicon-96x96.png',
          type: 'image/png',
          sizes: '96x96',
        },
      ],
      shortcut: '/favicon.ico',
      apple: [
        {
          url: '/apple-touch-icon.png',
          type: 'image/png',
          sizes: '180x180',
        },
      ],
    },
    manifest: '/manifest.json',
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLocale(lang)) {
    notFound();
  }

  const adsConfigured =
    process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' &&
    process.env.NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_CONFIGURED === 'true';

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-9111916848868133"
        />
        {adsConfigured && (
          <>
            <link
              rel="preconnect"
              href="https://pagead2.googlesyndication.com"
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
          </>
        )}
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:border focus:border-primary focus:text-foreground"
            >
              Skip to main content
            </a>
            <Navbar lang={lang} />
            <main id="main-content" tabIndex={-1} className="flex-grow">
              {children}
            </main>
            <Footer lang={lang} />
          </div>
        </ThemeProvider>

        {/* AdSense — lazyOnload ensures it doesn't block interactivity on mobile */}
        {adsConfigured && (
          <Script
            id="adsbygoogle-init"
            strategy="lazyOnload"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9111916848868133"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
