import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrganizationSchema, WebSiteSchema } from '@/components/Schema';
import { SITE } from '@/lib/constants';
import './globals.css';

// Default Open Graph image — used by every page that doesn't override its own.
// Pages with their own (blog posts) keep their post-hero. 1200×630, the size
// LinkedIn / Slack / X all prefer.
const DEFAULT_OG_IMAGE = {
  url: '/images/og/default.jpg',
  width: 1200,
  height: 630,
  alt: 'GNAT UK — Specialist Demolition: robotic, hydrodemolition, diamond drilling, cold cutting',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1a2332',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'GNAT UK | Specialist Demolition — Robotic & Confined Access',
    template: '%s | GNAT UK',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  keywords: [
    'robotic demolition',
    'hydrodemolition',
    'diamond drilling',
    'cold cutting',
    'specialist demolition UK',
    'confined access demolition',
    'COMAH demolition',
    'AMP8 water infrastructure',
    'Brokk machine hire',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_GB',
    url: SITE.url,
    title: 'GNAT UK | Specialist Demolition — Robotic & Confined Access',
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GNAT UK | Specialist Demolition',
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className="flex min-h-screen flex-col">
        {SITE.gtmId && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${SITE.gtmId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="gtm"
              />
            </noscript>
          </>
        )}
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
