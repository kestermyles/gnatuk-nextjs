// Per-office landing pages — the local-SEO play.
//
// Each office gets its own LocalBusiness JSON-LD entity (rather than being a
// nested location[] entry under the parent GeneralContractor). That gives
// Google three distinct local entities to surface for queries like
// "demolition contractor Derby" or "specialist demolition Yorkshire" —
// rather than one national entity that fights itself across regions.

export type LocationSlug = 'richmond-yorkshire' | 'derby-midlands' | 'stevenage-hertfordshire';

export type Location = {
  slug: LocationSlug;
  name: string;
  shortName: string;
  /** SERP title — under 60 chars. */
  metaTitle: string;
  metaDescription: string;
  /** Hero eyebrow. */
  eyebrow: string;
  hero: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  /** Four short benefit lines surfaced under the hero. */
  benefits: string[];
  /** Address fields used in both visible markup and LocalBusiness schema. */
  address: {
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    country: 'GB';
  };
  /** Approximate office geolocation — used in LocalBusiness schema. */
  geo: { latitude: number; longitude: number };
  /** "Areas served from this base" bullet list. */
  areasServed: string[];
  /** Body paragraphs explaining the office context and why it's set up where it is. */
  body: string[];
};

export const LOCATIONS: Record<LocationSlug, Location> = {
  'richmond-yorkshire': {
    slug: 'richmond-yorkshire',
    name: 'Richmond, North Yorkshire (Head Office)',
    shortName: 'Richmond — Head Office',
    metaTitle: 'GNAT UK Richmond Head Office — Yorkshire Specialist Demolition',
    metaDescription:
      "GNAT UK's Richmond head office — North Yorkshire base for the UK robotic-demolition fleet. Covering Yorkshire, the North-East, Scotland, the Tees and Wear corridor.",
    eyebrow: 'Richmond, North Yorkshire',
    hero: 'GNAT UK head office — Richmond, North Yorkshire.',
    subtitle:
      'Where the company is run from, where the fleet is held, and the operational anchor for schemes across Yorkshire, the North-East and the Tees corridor.',
    heroImage: '/images/services/hero-home.jpg',
    heroAlt:
      'GNAT UK Brokk and Husqvarna fleet on hard standing at the Richmond head-office yard, ready for mobilisation',
    benefits: [
      'Yorkshire & North-East coverage',
      'Brokk fleet held on site',
      'Tees / Wear / A1 corridor base',
      'M1 / M62 / A66 access',
    ],
    address: {
      streetAddress: 'Unit 5, Jackson Court, Olympic Way',
      locality: 'Richmond',
      region: 'North Yorkshire',
      postalCode: 'DL10 4FD',
      country: 'GB',
    },
    geo: { latitude: 54.412, longitude: -1.733 },
    areasServed: [
      'North Yorkshire and West Yorkshire',
      'County Durham and the North-East',
      'Tees Valley and the Tees/Wear corridor',
      'Cumbria and the North-West',
      'Scotland (Borders, Edinburgh, Glasgow)',
      'A1, M1, M62 and A66 corridors',
    ],
    body: [
      "Richmond is where the company started and where it's still run from. The head-office yard holds the bulk of the Brokk and Husqvarna robotic-demolition fleet plus the hydrodemolition and diamond-cutting kit — the assets that get mobilised across the UK from the depot most likely to be nearest the job. For Yorkshire, the North-East, the Tees corridor and into Scotland, Richmond is typically the originating base.",
      "The location works for the network it serves: junction with the A1(M) for north-south routing, the A66 east-west across to the Lakes and the M6, and a short hop into the Tees Valley industrial belt where a meaningful share of our COMAH and process-industry work happens. Plant movements out of Richmond reach Newcastle, Edinburgh, Leeds, Manchester and Sheffield inside a normal working shift.",
      "Most of the company's operational, commercial and pre-construction work happens out of Richmond. If you're putting a brief in front of GNAT UK, this is where it lands first — method definition, proposal preparation and the documentation pack are produced here, then the project mobilises from whichever base is closest to site.",
    ],
  },

  'derby-midlands': {
    slug: 'derby-midlands',
    name: 'Derby, Midlands',
    shortName: 'Derby — Midlands',
    metaTitle: 'GNAT UK Derby Office — Midlands Specialist Demolition',
    metaDescription:
      "GNAT UK Derby office — Midlands base for AMP8 water-industry delivery, process and refractory work, and M1/M6/A1 corridor mobilisation.",
    eyebrow: 'Derby, Midlands',
    hero: 'GNAT UK Midlands office — Derby.',
    subtitle:
      'Midlands operational base — anchoring AMP8 water-industry delivery, process and refractory schemes, and M1/M6 corridor mobilisation.',
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt:
      "GNAT UK hydrodemolition equipment staged at the Derby Midlands yard, ready to deploy across the Midlands water-industry network",
    benefits: [
      'Midlands and East Midlands coverage',
      'AMP8 water-industry positioning',
      'Process & refractory experience',
      'M1 / M6 / A1 corridor base',
    ],
    address: {
      streetAddress: 'Unit 7, Riverside Park, East Service Road, Raynesway, Spondon',
      locality: 'Derby',
      region: 'Derbyshire',
      postalCode: 'DE21 7RW',
      country: 'GB',
    },
    geo: { latitude: 52.928, longitude: -1.42 },
    areasServed: [
      'Derbyshire, Nottinghamshire and Leicestershire',
      'The West Midlands (Birmingham, Wolverhampton, Coventry)',
      'East Midlands (Lincolnshire, Northamptonshire)',
      'South Yorkshire and the M1 spine',
      'Staffordshire and the M6 corridor',
      'Severn Trent and Anglian Water operating areas',
    ],
    body: [
      "Derby is the Midlands operational base — strategically positioned for the water-industry, process-industry and Midlands manufacturing work that anchors a large share of our project pipeline. The site sits adjacent to Severn Trent and Anglian Water territories and within a normal day's reach of nearly every Midlands and East-Midlands COMAH site.",
      "The Midlands has historically been the centre of the UK's refractory industry — cement works, brick kilns, steel-industry process plant, glass furnaces — and remains the centre of much of it today. Derby keeps the specialist refractory crew close to the work, and reduces the travel premium on schemes that historically had to be priced from a Yorkshire base.",
      "For AMP8 water-industry delivery (2025-2030), Derby is the mobilisation point for projects across Severn Trent, Anglian Water and adjacent operating areas. Hydrodemolition kit, water-management plant and operator teams stage from here, with method-definition work supported jointly with Richmond head office.",
    ],
  },

  'stevenage-hertfordshire': {
    slug: 'stevenage-hertfordshire',
    name: 'Stevenage, Hertfordshire',
    shortName: 'Stevenage — Hertfordshire',
    metaTitle: 'GNAT UK Stevenage Office — South-East & London Specialist Demolition',
    metaDescription:
      "GNAT UK Stevenage office — Hertfordshire base for London, South-East and East-of-England specialist demolition, with M1, M25 and A1(M) corridor access.",
    eyebrow: 'Stevenage, Hertfordshire',
    hero: 'GNAT UK Stevenage office — Hertfordshire.',
    subtitle:
      "South-East operational base — anchoring London, the Home Counties and East-of-England schemes, with M1, M25 and A1(M) access for rapid mobilisation.",
    heroImage: '/images/services/diamond-drilling-hero.jpg',
    heroAlt:
      'GNAT UK diamond drilling and specialist cutting equipment staged at the Stevenage Hertfordshire yard',
    benefits: [
      'London & South-East coverage',
      'Home Counties + East of England',
      'M1 / M25 / A1(M) access',
      'Heritage + listed-building base',
    ],
    address: {
      streetAddress: 'The Old Lordship Farm, Walkern Road, Bennington',
      locality: 'Stevenage',
      region: 'Hertfordshire',
      postalCode: 'SG2 7LL',
      country: 'GB',
    },
    geo: { latitude: 51.88, longitude: -0.18 },
    areasServed: [
      'Greater London and Inner London',
      'Hertfordshire, Bedfordshire, Cambridgeshire',
      'Essex and the East of England',
      'Kent, Surrey, Sussex (M25 corridor)',
      'Buckinghamshire and the M1 spine south',
      'East Anglia and the A14 corridor',
    ],
    body: [
      "Stevenage is the South-East operational base, sitting on the A1(M) just outside the M25 with rapid access into London, the Home Counties and across to the M1 and the East of England. The location is built for the Greater London project pipeline: heritage and listed-building works in the City and West End, infrastructure schemes across the South-East, and dockside / Thames-adjacent works.",
      "Much of our Grade I and Grade II* listed-building work mobilises from here — the proximity to the London conservation pipeline keeps the specialist crew close to the work and the architect / heritage-consultant team. Diamond drilling and wire sawing assets are held at Stevenage as a default, with the rest of the fleet movable from Richmond or Derby on demand.",
      "For South-East and East-of-England COMAH, water-industry and infrastructure schemes, Stevenage cuts the mobilisation distance significantly versus a single-base operation. Plant movements reach Central London, Cambridge, Stansted, Dover and Norwich inside a normal working window.",
    ],
  },
};

export const LOCATION_LIST: Location[] = Object.values(LOCATIONS);
