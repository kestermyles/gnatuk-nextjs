// SAMPLE CASE STUDIES — for demo / launch placeholder only.
// All client names, project specifics, and numbers are fabricated using realistic
// industry context. REPLACE WITH REAL PROJECT DETAILS BEFORE PUBLIC LAUNCH.

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  year: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  challenge: string;
  method: string;
  outcome: string;
  equipment: string[];
  duration: string;
  highlights: { label: string; value: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'water-treatment-clarifier-refurbishment',
    title: 'AMP8 clarifier wall refurbishment without service disruption',
    sector: 'Water & Utilities (AMP8)',
    location: 'North West England',
    year: '2026',
    summary:
      'Selective hydrodemolition of degraded concrete from a 32-metre clarifier wall while the adjacent treatment line stayed in service.',
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt: 'Hydrodemolition equipment on a water treatment clarifier wall',
    challenge:
      'A Tier-1 contractor delivering an AMP8 framework refurbishment needed 180mm of degraded concrete removed from the inner wall of a 32m diameter clarifier. The adjacent treatment line had to remain operational throughout, which ruled out percussive breaking — vibration would risk damaging the live tank wall — and ruled out long shutdowns. Existing rebar had to be preserved for re-encasement.',
    method:
      'We deployed an Aquajet Aqua Cutter robotic hydrodemolition rig at 2,500 bar, working in vertical bands of 2m at a time. A Siltbuster water-treatment unit captured run-off and returned compliant water to the works. A Brokk 200 followed up to remove loose concrete fragments and prepare the substrate for the rebuild crew.',
    outcome:
      'Removed 28m³ of degraded concrete in 11 working days against an originally programmed 18 days for manual breaking. Rebar preservation was 100% — no replacement bar needed. Adjacent treatment line maintained full output for the duration; no consented discharge breach.',
    equipment: ['Aquajet Aqua Cutter (hydrodemolition)', 'Brokk 200', 'Siltbuster HB10 (water treatment)'],
    duration: '11 working days',
    highlights: [
      { label: 'Concrete removed', value: '28m³' },
      { label: 'Rebar preserved', value: '100%' },
      { label: 'Programme saved', value: '7 days' },
    ],
  },
  {
    slug: 'hospital-plant-room-strip-out',
    title: 'Live-hospital basement plant-room demolition under MRI suite',
    sector: 'Healthcare',
    location: 'Greater London',
    year: '2025',
    summary:
      'Brokk 70 deployed through a 720mm doorway to remove 22m³ of reinforced concrete directly below an active MRI suite — vibration kept under 5 mm/s peak particle velocity.',
    heroImage: '/images/services/robotic-demolition-hero.jpg',
    heroAlt: 'Brokk 70 robotic demolition machine in a confined hospital basement',
    challenge:
      'An NHS Trust facilities team needed an old chiller plant room cleared to make way for new MEP risers. The room sat directly below an active MRI suite with strict vibration tolerances (sub-5 mm/s PPV) and noise restrictions (no work outside 08:00–18:00 weekdays). Access was via a single 720mm-wide service door, seven floors down with no goods lift on the demolition route.',
    method:
      'A Brokk 70 was disassembled into transportable sections, lift-shafted to the basement, and reassembled on site. Continuous vibration monitoring was set up at the slab soffit beneath the MRI room with live alerts to the operator. A small-bore hydraulic breaker was used at controlled impact-energy settings; concrete was broken into hand-portable sections and bagged out via the same access route.',
    outcome:
      'All 22m³ of reinforced concrete removed across 14 working days. Peak measured vibration was 3.2 mm/s — well within the agreed limit. MRI suite remained operational throughout the works with no scan re-bookings caused by the demolition.',
    equipment: ['Brokk 70', 'Atlas Copco SB52 hydraulic breaker', 'Continuous vibration monitoring (Instantel Micromate)'],
    duration: '14 working days',
    highlights: [
      { label: 'Door access', value: '720 mm' },
      { label: 'Peak vibration', value: '3.2 mm/s PPV' },
      { label: 'MRI bookings affected', value: '0' },
    ],
  },
  {
    slug: 'comah-petrochemical-cold-cut-tie-in',
    title: 'ATEX-zone 1 cold-cut tie-in on live hydrocarbon process line',
    sector: 'COMAH / Petrochemical',
    location: 'Teesside',
    year: '2025',
    summary:
      'Spark-free abrasive water jet cutting on a 12-inch process pipeline within an ATEX zone 1 area while the wider plant remained in operation.',
    heroImage: '/images/services/cold-cutting-hero.jpg',
    heroAlt: 'Abrasive cold cutting equipment on a process pipeline at a petrochemical facility',
    challenge:
      'A COMAH-regulated petrochemical operator required a 1.4m section removed from a 12-inch carbon-steel hydrocarbon line to install a new tie-in. Hot work was prohibited (DSEAR risk assessment placed the area in ATEX zone 1) and the surrounding process units could not be shut down. Third-party DSEAR sign-off was required before any work commenced.',
    method:
      'Used a portable abrasive water jet cutting rig with garnet abrasive. The cut was made in two passes — a relief slot and the through-cut — at 4,100 bar, with on-demand operation triggered by a permit-controlled switch. A bunded catch tray collected used abrasive and any residual hydrocarbon for compliant disposal.',
    outcome:
      'Cut completed in a single 6-hour permit window. Zero hot-work incidents, zero LOPC events. The tie-in welds were carried out separately under a hot-work permit in a temporary habitat after the line was made safe.',
    equipment: ['ANT abrasive water jet cutter', '4,100 bar high-pressure pump', 'Garnet abrasive feed system'],
    duration: '6-hour permit window',
    highlights: [
      { label: 'ATEX zone', value: 'Zone 1' },
      { label: 'Process shutdown', value: 'None' },
      { label: 'Hot-work events', value: '0' },
    ],
  },
  {
    slug: 'data-centre-slab-penetration',
    title: 'Diamond core penetrations through live Tier III data centre slab',
    sector: 'Data Centres',
    location: 'M4 Corridor',
    year: '2026',
    summary:
      'Forty-eight large-diameter core penetrations through a 600mm post-tensioned slab in a live colocation hall — zero white-space dust migration.',
    heroImage: '/images/services/diamond-drilling-hero.jpg',
    heroAlt: 'Diamond core drilling rig on the slab of a live data centre',
    challenge:
      'A hyperscale colocation operator was adding chiller capacity above an active Tier III data hall. The work required 48 cored penetrations (diameters 200–450mm) through a 600mm post-tensioned slab, with the live IT load running directly below. Any dust ingress to the white space would breach the operator\'s contamination SLA.',
    method:
      'Pre-survey by GPR scan to map post-tensioning tendons; cores re-positioned where conflicts were found. Used water-cooled diamond core rigs with bespoke negative-pressure shrouds vented to a HEPA-filtered extraction unit. Slurry capture trays at every core; trays emptied to a collection IBC outside the building. Working hours aligned with the operator\'s low-load window.',
    outcome:
      '48 cores completed in 9 working days. No dust events recorded by the operator\'s contamination monitoring. Zero impact on live IT load. All cores within ±3mm tolerance of their setting-out.',
    equipment: ['Hilti DD350 core rigs ×4', 'Custom negative-pressure shrouds', 'GPR slab survey (Hilti PS 1000)'],
    duration: '9 working days',
    highlights: [
      { label: 'Cores completed', value: '48' },
      { label: 'Dust events', value: '0' },
      { label: 'Tolerance achieved', value: '±3 mm' },
    ],
  },
  {
    slug: 'nuclear-ancillary-building-deconstruction',
    title: 'Selective deconstruction of ancillary plant building, controlled area',
    sector: 'Nuclear Decommissioning',
    location: 'North West England',
    year: '2025',
    summary:
      'Brokk 500 deployed inside a controlled area to selectively dismantle a redundant ancillary plant structure with full LLW / free-release waste segregation.',
    heroImage: '/images/services/hero-home.jpg',
    heroAlt: 'Brokk 500 robotic demolition machine inside a controlled area',
    challenge:
      'An ancillary plant building serving a decommissioning facility had reached end of life. The structure contained both contaminated and free-release zones, requiring 100% segregation of arisings at source. Operatives had restricted dose-time windows, making manual breaking inefficient and high-risk.',
    method:
      'A Brokk 500 with hydraulic shear and breaker attachments was deployed under remote operation from outside the controlled area. Pre-demolition characterisation identified contamination boundaries; the demolition sequence was planned to maintain segregation. Arisings were sized at-source for direct loading into LLW or free-release containers as appropriate.',
    outcome:
      '320 tonnes of structure removed across 22 working shifts. 100% waste-stream segregation maintained — independently audited. Zero personnel dose uptake from demolition activities (operator outside controlled area for entire programme).',
    equipment: ['Brokk 500 with HB780 breaker and CC880 shear', 'Pre-demolition radiological characterisation'],
    duration: '22 working shifts',
    highlights: [
      { label: 'Material removed', value: '320 t' },
      { label: 'Segregation accuracy', value: '100%' },
      { label: 'Personnel dose', value: 'Zero' },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
