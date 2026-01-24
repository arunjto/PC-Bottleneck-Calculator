// app/layout.tsx
import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // Import Script
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { QuickToolsBar } from '@/components/layout/quick-tools-bar';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'], display: 'swap' }); // Add display swap

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const locale = params.lang === 'it' ? 'it_IT' : 'en_US';

  return {
    metadataBase: new URL('https://www.pcbuildcheck.com'),
    title: {
      template: '%s | PC Bottleneck Calculator',
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
    manifest: '/manifest.json',
    viewport: 'width=device-width, initial-scale=1'
  };
}

// app/[lang]/layout.tsx
import { i18n } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang as any);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        {/* AdSense optimized with Next.js Script */}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:border focus:border-primary focus:text-foreground"
              >
                Skip to main content
              </a>
              <a
                href="#quick-tools"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:border focus:border-primary focus:text-foreground"
              >
                Skip to quick tools
              </a>
              <Navbar lang={params.lang} />
              <div id="quick-tools" tabIndex={-1}>
                <QuickToolsBar dict={dict.quick_tools} lang={params.lang} />
              </div>
              <main id="main-content" tabIndex={-1} className="flex-grow">
                {children}
              </main>
              <Footer dict={dict.footer} lang={params.lang} />
            </div>
          </TooltipProvider>
        </ThemeProvider>

        {/* AdSense Script moved to body/afterInteractive */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9111916848868133"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
