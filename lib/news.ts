// SAMPLE NEWS POSTS — short, visual, social-shareable updates designed
// to be cross-posted to Instagram / LinkedIn with a link back to the site.
// All content is fabricated for demo purposes. REPLACE BEFORE LAUNCH.

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string; // ~25 words, social-share length
  body: string[]; // array of paragraphs
  date: string;
  category: 'Project' | 'Fleet' | 'Team' | 'Industry' | 'Award';
  heroImage: string;
  heroAlt: string;
};

export const NEWS: NewsPost[] = [
  {
    slug: 'brokk-800-commissioned-on-northern-water-project',
    title: 'Brokk 800 commissioned on AMP8 northern water project',
    excerpt:
      'Our largest robotic demolition unit is on site for a 6-week selective concrete removal package on a major water treatment refurbishment.',
    date: '2026-05-06',
    category: 'Fleet',
    heroImage: '/images/machines/brokk800.jpg',
    heroAlt: 'Brokk 800 robotic demolition machine on site',
    body: [
      'The Brokk 800 — our heaviest robotic demolition unit — has been commissioned on a Tier-1 framework project for a northern UK water company. The 6-week scope covers selective removal of degraded concrete from primary settlement infrastructure ahead of a full asset refurbishment.',
      'At 11 tonnes operating weight with a 55kW hydraulic power pack, the 800 handles material the smaller fleet members can\'t — heavy reinforcement, thick raft slabs, and continuous primary breaking on structural elements. Paired with a hydrodemolition rig for the substrate-preservation work, it\'s the right tool for AMP8-scale asset refurb.',
      'The project is part of the wider AMP8 capital programme delivering across England and Wales between 2025 and 2030.',
    ],
  },
  {
    slug: 'cscs-and-ccdo-fleet-recertification-complete',
    title: 'Full operator recertification under CCDO scheme complete',
    excerpt:
      'Every operator on our books now holds current CCDO Demolition Plant Operator cards — the demolition industry\'s gold-standard competency credential.',
    date: '2026-04-22',
    category: 'Team',
    heroImage: '/images/projects/confined-space.jpg',
    heroAlt: 'Operator working with robotic demolition equipment',
    body: [
      'Recertification under the NFDC\'s Certificate of Competence for Demolition Operatives (CCDO) scheme is now complete across the entire operating team. Every operator holds a current Demolition Plant Operator card.',
      'The CCDO scheme is the recognised industry benchmark for demolition competence — required for site access on virtually every Tier-1 framework, infrastructure project, and major contractor pre-qualification.',
      'For clients, the practical impact is simple: zero delay at the gate, zero competency exceptions to flag in your CDM pack, and full audit traceability on operator credentials for the project file.',
    ],
  },
  {
    slug: 'world-demolition-summit-attendance-2026',
    title: 'GNAT UK at the 2026 World Demolition Summit',
    excerpt:
      'Joining the global specialist demolition community in Berlin this October. If you\'re going, find us — we\'ll be talking method-led delivery and confined-access work.',
    date: '2026-04-08',
    category: 'Industry',
    heroImage: '/images/services/hero-home.jpg',
    heroAlt: 'Industrial demolition equipment',
    body: [
      'The World Demolition Summit returns to Berlin in October 2026 — the largest annual gathering of specialist demolition contractors, plant manufacturers, and recycling specialists worldwide.',
      'Our team will be there across the two days. If you\'re attending and want to talk method-led delivery on confined-access, structurally sensitive, or live-environment schemes — drop us a line and we\'ll find a window.',
      'It\'s also a useful opportunity to see the latest from Brokk, Aquajet, and Husqvarna ahead of next-season fleet decisions. Expect a follow-up post on what we saw worth investing in.',
    ],
  },
  {
    slug: 'hospital-mri-suite-project-completion',
    title: 'MRI suite plant-room demolition completed under load',
    excerpt:
      'Brokk 70 through a 720mm doorway, full 22m³ removed in 14 days, peak vibration 3.2 mm/s. Live MRI suite never came offline.',
    date: '2026-03-18',
    category: 'Project',
    heroImage: '/images/services/robotic-demolition-hero.jpg',
    heroAlt: 'Brokk 70 robotic demolition machine in a hospital basement',
    body: [
      'Just wrapped a basement plant-room demolition directly under an active MRI suite. Headline numbers: Brokk 70 deployed through a 720mm service door, 22m³ of reinforced concrete removed across 14 working days, peak vibration measured at 3.2 mm/s PPV — well inside the 5 mm/s ceiling agreed with the trust.',
      'Zero MRI bookings cancelled, zero impact on the live clinical environment seven floors above the work. The project is now written up as a full case study.',
      'The detail on access constraints, vibration management, and the why-the-Brokk-70 method choice is on the case study — useful read if you\'ve got similar live-healthcare work in your pipeline.',
    ],
  },
  {
    slug: 'shortlisted-demolition-awards-2026',
    title: 'Shortlisted: Demolition Awards 2026 (Specialist Project)',
    excerpt:
      'Our COMAH-site cold-cut tie-in has been shortlisted for the Specialist Project category at the 2026 Demolition Awards.',
    date: '2026-02-26',
    category: 'Award',
    heroImage: '/images/services/cold-cutting-hero.jpg',
    heroAlt: 'Abrasive cold cutting on a process pipeline',
    body: [
      'Pleased to share that our COMAH petrochemical cold-cut tie-in project has been shortlisted for the Specialist Project category at the 2026 Demolition Awards.',
      'The project — abrasive water-jet cutting on a 12-inch hydrocarbon line in an ATEX zone 1 area, completed in a single 6-hour permit window with the wider plant in operation — is exactly the kind of constraint-heavy, method-led work we\'re built for.',
      'Recognition is one thing; the practical takeaway is more interesting — the same approach is replicable across petrochemical, water and pharma operators with live process constraints. Worth talking through if you\'re scoping similar tie-ins.',
    ],
  },
];

export function getNewsPostBySlug(slug: string): NewsPost | undefined {
  return NEWS.find((p) => p.slug === slug);
}
