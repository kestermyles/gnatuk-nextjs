import { SITE } from '@/lib/constants';
import { getAccreditations } from '@/lib/sanity-queries';

type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function OrganizationSchema() {
  const ACCREDITATIONS = await getAccreditations();
  // Promoted from Organization to LocalBusiness — better signal for "demolition
  // contractor near me" / sector queries. Includes the three offices, the area
  // served, and an hours block. Accreditations array is empty until the company
  // confirms which credentials it currently holds.
  const data = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    image: `${SITE.url}/images/services/hero-home.jpg`,
    description: SITE.description,
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: '££££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    location: [
      {
        '@type': 'Place',
        name: 'GNAT UK Head Office — Richmond',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Unit 5, Jackson Court, Olympic Way',
          addressLocality: 'Richmond',
          addressRegion: 'North Yorkshire',
          postalCode: 'DL10 4FD',
          addressCountry: 'GB',
        },
      },
      {
        '@type': 'Place',
        name: 'GNAT UK Midlands Office — Derby',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Unit 7, Riverside Park, East Service Road, Raynesway, Spondon',
          addressLocality: 'Derby',
          postalCode: 'DE21 7RW',
          addressCountry: 'GB',
        },
      },
      {
        '@type': 'Place',
        name: 'GNAT UK Stevenage Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'The Old Lordship Farm, Walkern Road, Bennington',
          addressLocality: 'Hertfordshire',
          postalCode: 'SG2 7LL',
          addressCountry: 'GB',
        },
      },
    ],
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneE164,
        email: SITE.email,
        contactType: 'sales',
        areaServed: 'GB',
        availableLanguage: 'English',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        // Explicit Saturday/Sunday closure — preferred over implicit absence.
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '00:00',
        closes: '00:00',
      },
    ],
    knowsAbout: [
      'Robotic Demolition',
      'Hydrodemolition',
      'Diamond Drilling',
      'Diamond Sawing',
      'Wire Sawing',
      'Stitch Drilling',
      'Abrasive Cold Cutting',
      'Top-Down Demolition',
      'Refractory Demolition',
      'Confined Space Demolition',
      'Structural Concrete Removal',
      'Brokk Robotic Demolition',
      'Husqvarna Robotic Demolition',
      'Aquajet Hydrodemolition',
    ],
    hasCredential: ACCREDITATIONS.map((a) => ({
      '@type': 'EducationalOccupationalCredential',
      name: a.level ? `${a.name} — ${a.level}` : a.name,
      credentialCategory: 'membership',
      recognizedBy: {
        '@type': 'Organization',
        name: a.name,
        url: a.schemeUrl,
      },
    })),
    sameAs: [SITE.social.instagram, SITE.social.facebook],
  };
  return <JsonLd data={data} />;
}

export function ServiceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: SITE.legalName,
      url: SITE.url,
    },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    url: `${SITE.url}/${slug}`,
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock' },
  };
  return <JsonLd data={data} />;
}

export function FAQPageSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  return <JsonLd data={data} />;
}

export function ArticleSchema({
  headline,
  description,
  imageUrl,
  imageAlt,
  datePublished,
  authorName,
  url,
  category,
}: {
  headline: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  datePublished: string;
  authorName: string;
  url: string;
  category?: string;
}) {
  const absoluteImage = imageUrl.startsWith('http') ? imageUrl : `${SITE.url}${imageUrl}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: {
      '@type': 'ImageObject',
      url: absoluteImage,
      caption: imageAlt,
    },
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      worksFor: {
        '@type': 'Organization',
        name: SITE.legalName,
        url: SITE.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.legalName,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(category ? { articleSection: category } : {}),
  };
  return <JsonLd data={data} />;
}

export function ImageGallerySchema({
  name,
  description,
  url,
  imageCount,
}: {
  name: string;
  description: string;
  url: string;
  imageCount: number;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    description,
    url,
    numberOfItems: imageCount,
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.legalName,
      url: SITE.url,
    },
  };
  return <JsonLd data={data} />;
}

// Per-post photo carousel schema — enumerates each image as an ImageObject
// so Google Image Search can index every photo with caption + alt context.
// Generic ImageGallerySchema above only declares the gallery's existence
// and count; this variant attaches the actual image inventory.
export function PostImageGallerySchema({
  postTitle,
  postUrl,
  images,
}: {
  postTitle: string;
  postUrl: string;
  images: { src: string; alt: string; caption: string }[];
}) {
  if (images.length === 0) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${postTitle} — project photos`,
    url: `${postUrl}#photos`,
    numberOfItems: images.length,
    isPartOf: { '@type': 'WebPage', '@id': postUrl },
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: img.src.startsWith('http') ? img.src : `${SITE.url}${img.src}`,
      caption: img.caption,
      description: img.alt,
      isPartOf: { '@type': 'WebPage', '@id': postUrl },
    })),
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

// WebSite + SearchAction — declares the on-site search box so Google can show
// a sitelinks-search UI in branded SERP results (e.g. user types "gnat uk"
// and sees a search box right under the result). Wired up to /search?q={query}
// — we expose this via SearchModal's submit-to-search-page behaviour.
export function WebSiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLd data={data} />;
}

// Person schema — drives the E-E-A-T signal for authored content. Emitted on
// /authors/[slug] and on every /blog/[slug] page (per-post Article schema
// names the author, this schema gives Google the structured identity to link
// to). Without this, the byline is just text.
export function PersonSchema({
  name,
  jobTitle,
  description,
  imageUrl,
  url,
  sameAs,
  knowsAbout,
}: {
  name: string;
  jobTitle: string;
  description: string;
  imageUrl?: string;
  url: string;
  sameAs?: string[];
  knowsAbout?: string[];
}) {
  const absoluteImage = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${SITE.url}${imageUrl}`
    : undefined;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name,
    jobTitle,
    description,
    url,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.legalName,
      url: SITE.url,
    },
  };
  if (absoluteImage) data.image = absoluteImage;
  if (sameAs && sameAs.length > 0) data.sameAs = sameAs;
  if (knowsAbout && knowsAbout.length > 0) data.knowsAbout = knowsAbout;
  return <JsonLd data={data} />;
}
