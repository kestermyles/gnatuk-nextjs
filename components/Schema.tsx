import { SITE } from '@/lib/constants';

type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
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
