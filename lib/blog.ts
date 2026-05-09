// Blog posts ported verbatim from the original Wix site at gnatuk.com/blog.
// All authored by Nick Turnbull. Dates preserved from the original publications.
// Hero images scraped from the original posts and stored under /public/images/blog/.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string; // ISO yyyy-mm-dd
  category: 'Project' | 'Fleet' | 'Team' | 'Industry' | 'Award' | 'Method';
  heroImage: string;
  heroAlt: string;
  author: string;
};

export const BLOG: BlogPost[] = [
  {
    slug: 'refractory-vessel-cold-cut-brokk-debricking',
    title:
      'Precision Cold-Cutting & BROKK Debricking within the Complex Geometry of a Large Refractory Vessel',
    excerpt:
      'A highly complex project: precision abrasive cold-cutting on a massive industrial vessel, followed by a full robotic debricking of its interior.',
    date: '2025-10-01',
    category: 'Project',
    heroImage: '/images/blog/refractory-vessel-cold-cut.jpg',
    heroAlt: 'Brokk robotic demolition machine debricking a large refractory vessel',
    author: 'Nick Turnbull',
    body: [
      'Robotic demolition specialists Gnat-UK were entrusted with a highly complex project: precision abrasive cold-cutting on a massive industrial vessel, followed by a full robotic debricking of its interior.',
      'Owing to the vessel\'s sheer scale and intricate geometry, traditional access methods were impossible. The cold-cutting phase created safe entry points through the vessel\'s side, enabling the dismantling works that followed.',
      'Once the access route was established, a Brokk 180 with an extended, custom-designed boom was deployed to methodically remove refractory brickwork and castable linings. This unique setup allowed reaching even the most demanding areas, including the angled Lobster Back Section.',
      'With the Lobster Back cleared, scaffolding and a hoist provided access to the vertical shaft. In this confined space, a compact Brokk 70 robot took over, progressing chamber by chamber until the final breakthrough was achieved at the vessel\'s base.',
      'Another technically challenging project delivered safely, efficiently, and on schedule.',
    ],
  },
  {
    slug: 'hydrodemolition-hand-lancing',
    title: 'Hydrodemolition — A Case for Hand Lancing',
    excerpt:
      'Robotics first, always. But in confined or irregular spaces where robotic access isn\'t viable, controlled hand lancing keeps the work moving — with the same commitment to safety and efficiency.',
    date: '2025-07-11',
    category: 'Method',
    heroImage: '/images/blog/hand-lancing-hydrodemolition.jpg',
    heroAlt: 'Operative carrying out controlled hand lancing hydrodemolition',
    author: 'Nick Turnbull',
    body: [
      'At GnatUK, we prioritise safety and precision by preferring robotic hydrodemolition methods. Our Aquajet systems provide pinpoint accuracy, maintain operator distance, and significantly reduce the risk of injury, fatigue, and exposure to vibration or silica dust.',
      'In certain confined or irregular spaces, robotic access just isn\'t viable. That\'s when we carefully deploy experienced operatives to carry out controlled hand lancing — with the same commitment to safety and efficiency, and only when absolutely necessary.',
      'Robotics first, always. But when the job demands it, we\'re ready to adapt.',
    ],
  },
  {
    slug: 'turbine-hall-wire-sawing',
    title: 'Turbine Hall — Bulk Concrete Cutting undertaken by our Wire Sawing Team',
    excerpt:
      'Decommissioning of a Turbine Hall is proceeding smoothly, thanks to GnatUK\'s skilled HILTI concrete wire-sawing team.',
    date: '2024-12-02',
    category: 'Project',
    heroImage: '/images/blog/turbine-hall-wire-saw.jpg',
    heroAlt: 'HILTI wire sawing equipment cutting bulk concrete sections in a turbine hall',
    author: 'Nick Turnbull',
    body: [
      'Following HILTI wire sawing, the bulk concrete sections are progressively craned out and removed from site.',
      'Progress in decommissioning this Turbine Hall is proceeding smoothly, thanks to the expertise of GnatUK\'s skilled HILTI concrete wire-sawing team. Their precision and efficiency in utilising this advanced method are driving the project forward, yielding outstanding results.',
    ],
  },
  {
    slug: 'brokk-500-london-deployment',
    title: 'One of our BROKK 500s, embarking on an extended demolition project in London',
    excerpt:
      'One of our BROKK 500 units, fully loaded and ready to start a long work assignment in London — 40% more demolition power than its predecessor, the BROKK 400.',
    date: '2024-08-01',
    category: 'Fleet',
    heroImage: '/images/blog/brokk-500-london.jpg',
    heroAlt: 'Brokk 500 robotic demolition unit loaded onto a transport ready for site',
    author: 'Nick Turnbull',
    body: [
      'One of our BROKK 500 units, fully loaded and ready to start a long work assignment in London.',
      'This powerhouse is set to impress, boasting 40% more demolition power than its predecessor, the BROKK 400. It\'s fair to say our clients love our BROKKs.',
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG.find((p) => p.slug === slug);
}
