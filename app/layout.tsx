// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // ✅ AdSense via next/script
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { QuickToolsBar } from '@/components/layout/quick-tools-bar';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
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
    locale: 'en_US',
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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google AdSense verification/loader script.
            Paste this immediately after you apply for AdSense.
            Replace ca-pub-XXXXXXXXXXXX with your own Publisher ID. */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9111916848868133"
          crossOrigin="anonymous"
        />
        {/* Optional: when Google gives you a site verification meta tag, paste it here */}
        {/* <meta name="google-site-verification" content="YOUR_TOKEN" /> */}
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
              <Navbar />
              <div id="quick-tools" tabIndex={-1}>
                <QuickToolsBar />
              </div>
              <main id="main-content" tabIndex={-1} className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
