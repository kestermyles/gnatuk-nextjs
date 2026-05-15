// Geographic anchoring on service pages — names the three operating bases
// (Richmond / Derby / Stevenage) and the major UK corridors covered.
//
// Copy varies slightly per service so Google sees distinct content on each
// page rather than 5x identical boilerplate (which gets near-deduped).

import { ContentSection } from './ContentSection';

type CoverageNoteProps = {
  /** Which service the note belongs to — drives the tailored copy. */
  service: 'robotic-demolition' | 'hydrodemolition' | 'diamond-drilling' | 'cold-cutting' | 'machine-hire';
};

type Variant = {
  heading: string;
  body: string;
};

const VARIANTS: Record<CoverageNoteProps['service'], Variant> = {
  'robotic-demolition': {
    heading: 'UK-wide robotic demolition coverage.',
    body: 'Our Brokk and Husqvarna fleet deploys from offices in Richmond (North Yorkshire), Derby (Midlands) and Stevenage (Hertfordshire) — covering schemes across Yorkshire, the North-East, the Midlands, the South-East and the M1, M6, M62 and A1 corridors. Confined-access, COMAH and listed-building projects supported nationwide; offshore and tunnel works delivered with operator-paired mobilisations from the nearest base.',
  },
  hydrodemolition: {
    heading: 'Aquajet hydrodemolition, nationwide mobilisation.',
    body: 'Hydrodemolition mobilises from our Yorkshire head office and our Midlands and Hertfordshire depots — supporting current AMP8 water-industry delivery, motorway bridge maintenance, reservoir and dockyard programmes, and marine and coastal jetty works. The full Aquajet fleet, water-management and pH-control kit travels with each deployment.',
  },
  'diamond-drilling': {
    heading: 'Diamond drilling and wire sawing, across the UK.',
    body: 'Diamond drilling, wire sawing and stitch-drilling teams deploy from Richmond (North Yorkshire), Derby (Midlands) and Stevenage (Hertfordshire) — covering rail (Network Rail / RISQS), highways, listed-building, healthcare and industrial schemes nationally. Reinforced-concrete, prestressed and post-tensioned cutting all supported with full method and risk documentation.',
  },
  'cold-cutting': {
    heading: 'Cold cutting, mobilised from three UK bases.',
    body: 'Abrasive cold-cutting teams deploy from our Yorkshire, Midlands and Hertfordshire bases — covering COMAH-regulated petrochemical sites, offshore decommissioning projects, refinery shutdowns and water-treatment plant nationwide. Spark-free isolation in volatile and ATEX-zoned environments delivered with full DSEAR documentation.',
  },
  'machine-hire': {
    heading: 'Brokk fleet hire — nationwide delivery.',
    body: 'The Brokk machine-hire fleet operates from our Richmond head office and Midlands and Hertfordshire depots — delivering across the UK including Scotland and Northern Ireland, with operator-supported mobilisation as standard. From compact Brokk 60s for confined access to the Brokk 800 for foundation breaking, machines move on next-day notice when programmes shift.',
  },
};

export function CoverageNote({ service }: CoverageNoteProps) {
  const v = VARIANTS[service];
  return (
    <ContentSection variant="concrete" eyebrow="Where we work" heading={v.heading} intro={v.body} />
  );
}
