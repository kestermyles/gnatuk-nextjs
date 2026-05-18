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
  // Ad-platform tracker IDs — env-driven so the scripts only fire when the
  // platform is actually being used. No IDs = no tracker, no noise.
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const linkedinPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

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

        {/* Meta (Facebook + Instagram) Pixel — fires PageView on load. Custom
            events (Lead, Contact, ViewContent) are pushed from track() in
            lib/analytics.ts so the dataLayer + Pixel stay in sync. */}
        {metaPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${metaPixelId}');
              fbq('track','PageView');`}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* LinkedIn Insight Tag — fires page-view-equivalent on load. Lead
            conversions are sent via lintrk('track', { conversion_id }) from
            the contact form on success. */}
        {linkedinPartnerId && (
          <>
            <Script id="linkedin-insight" strategy="afterInteractive">
              {`_linkedin_partner_id="${linkedinPartnerId}";
              window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];
              var b=document.createElement("script");b.type="text/javascript";b.async=!0;
              b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b,s);})(window.lintrk);`}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://px.ads.linkedin.com/collect/?pid=${linkedinPartnerId}&fmt=gif`}
                alt=""
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
