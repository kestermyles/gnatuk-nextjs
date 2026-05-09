// SAMPLE INSIGHTS / BLOG POSTS — for demo / launch placeholder.
// Content is technically grounded but not bylined to a real GNAT UK author.
// REVIEW AND BYLINE BEFORE PUBLIC LAUNCH.

export type InsightSection =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'comparison'; headers: string[]; rows: string[][] };

export type InsightPost = {
  slug: string;
  title: string;
  dek: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  heroImage: string;
  heroAlt: string;
  sections: InsightSection[];
};

export const INSIGHTS: InsightPost[] = [
  {
    slug: 'early-method-definition-saves-money',
    title: 'Why early method definition saves money on confined-space demolition',
    dek: 'Most demolition tenders price what was specified, not what will actually work. Here\'s why bringing a specialist in pre-tender removes the £40k surprise.',
    excerpt:
      'Most demolition tenders arrive with a detailed scope, a fixed programme, and a line item that says "remove existing structure." The problem isn\'t what\'s written. It\'s what\'s missing.',
    date: '2026-05-09',
    readingTime: '4 min read',
    category: 'Method',
    heroImage: '/images/services/robotic-demolition-hero.jpg',
    heroAlt: 'Robotic demolition machine working in a confined basement environment',
    sections: [
      {
        type: 'paragraph',
        text:
          'Most demolition tenders arrive with a detailed scope, a fixed programme, and a line item that says "remove existing structure in basement void." The problem isn\'t what\'s written. It\'s what\'s missing.',
      },
      {
        type: 'paragraph',
        text:
          'Access width? Structural sensitivity? Live services overhead? None of that made it into the pricing assumptions. So the contractor prices the work based on what usually works — manual breakers, skips, scaffolding — and everyone moves on. Then someone opens the door to the basement.',
      },
      { type: 'heading', text: 'The £47,000 assumption', level: 2 },
      {
        type: 'paragraph',
        text:
          'A central London retrofit. Original scope: remove 40 cubic metres of reinforced concrete from a basement plant room to make way for new MEP risers. Standard demolition. Except — 680mm doorway access, no goods lift, seven floors down. 2.1m headroom under a post-tensioned slab. Live data centre two walls away with single-digit-hertz vibration tolerance. Four-week window before mechanical rough-in.',
      },
      {
        type: 'paragraph',
        text:
          'The contractor had priced manual breakers and a muck-away gang. Reality: no pneumatic equipment allowed (vibration), no way to get a 900mm skip through the door, and the post-tensioned slab meant percussive breaking risked catastrophic structural failure. The repricing exercise: an additional £47,000 and a six-week delay while they worked out what would actually fit through the door, wouldn\'t shake the building apart, and could remove concrete without overstressing the slab above.',
      },
      { type: 'heading', text: 'What "bring us in early" actually means', level: 2 },
      {
        type: 'paragraph',
        text:
          'We\'re not selling robots. We\'re selling the answer to "what\'s actually going to work in there?" That\'s a different conversation than "what demolition do you need?" — and it needs to happen before the price goes into the tender, not after the PO is raised.',
      },
      { type: 'heading', text: 'What changes pre-tender', level: 3 },
      {
        type: 'list',
        items: [
          'Access constraints define the equipment, not the other way around. 750mm of working width and 14m of corridor means a Brokk 110 or 170, possibly in sections, with a custom transport rig — not the Brokk 500 a pricing assumption might default to.',
          'Structural sensitivity determines the technique. Hydrodemolition doesn\'t care about post-tensioned slabs. Robotic breakers transmit less vibration than manual tools because the impact reacts through the machine. Manual is low-vibration but high-risk under pre-stressed structure.',
          'Programme compression has a cost — but only if you plan for it. A Brokk 200 with a hydraulic shear removes more concrete per shift than three manual gangs. Tight programme: that premium pays for itself in avoided delay. Loose programme: optimise for £/m³ instead.',
        ],
      },
      {
        type: 'callout',
        text:
          '"Can you get us a price for removing this concrete?" is the wrong question. The right question is "what\'s the most effective way to remove this concrete given these constraints, and what does that method cost?"',
      },
      { type: 'heading', text: 'When to involve a specialist', level: 2 },
      {
        type: 'paragraph',
        text:
          'You don\'t need a specialist for every slab break. You need one when access is constrained, the structure is sensitive, the environment is live, or the sequence isn\'t obvious. If any of those apply, the method needs to be defined before the price is locked in — not discovered three weeks into the job.',
      },
    ],
  },

  {
    slug: 'brokk-70-110-170-comparison',
    title: 'Brokk 70 vs 110 vs 170: which robotic demolition machine fits your access constraint?',
    dek: 'A practical decision guide for the three most-requested compact-access Brokk models. Specs, real-world fit, and when you should size up.',
    excerpt:
      'Most enquiries we get for confined-access demolition come down to one question: which Brokk fits through the door and still does the work? Here\'s the practical answer for the three most-requested compact models.',
    date: '2026-05-02',
    readingTime: '5 min read',
    category: 'Equipment',
    heroImage: '/images/services/machine-hire-hero.jpg',
    heroAlt: 'Brokk robotic demolition machines on site',
    sections: [
      {
        type: 'paragraph',
        text:
          'Most enquiries we get for confined-access demolition come down to one question: which Brokk fits through the door and still does the work? Here\'s the practical answer for the three most-requested compact models.',
      },
      { type: 'heading', text: 'The numbers', level: 2 },
      {
        type: 'paragraph',
        text:
          'Approximate working dimensions and output. Verify against current Brokk spec sheets before final method selection — figures move between model revisions.',
      },
      {
        type: 'comparison',
        headers: ['', 'Brokk 70', 'Brokk 110', 'Brokk 170'],
        rows: [
          ['Transport width', '~600 mm', '~780 mm', '~780 mm'],
          ['Transport height', '~1230 mm', '~1290 mm', '~1300 mm'],
          ['Weight', '~560 kg', '~1100 kg', '~1650 kg'],
          ['Reach', '~3.5 m', '~4.6 m', '~5.2 m'],
          ['Hydraulic power', '5.5 kW', '9 kW', '15 kW'],
          ['Recommended breaker class', '~80 kg', '~140 kg', '~210 kg'],
        ],
      },
      { type: 'heading', text: 'When to use the Brokk 70', level: 2 },
      {
        type: 'paragraph',
        text:
          'The 70 is the access-first choice. Through a standard 760mm doorway with room to spare, into kitchens and bathrooms in occupied buildings, into tank manholes, into anywhere a wheeled tracked unit needs to fit through a single hinged door. Its productivity is genuinely lower than the 110 — the 80kg breaker class is the bottleneck — but if access is the constraint, that\'s the trade-off.',
      },
      { type: 'heading', text: 'When to use the Brokk 110', level: 2 },
      {
        type: 'paragraph',
        text:
          'The general-purpose compact. The 110 is what you use when you have a normal door but a confined space beyond it — basements, tank rooms, lift shafts. It\'s significantly more productive than the 70 (almost double the hydraulic output) but at the cost of about 180mm of access width. If your tightest pinch point is over 800mm, default to the 110.',
      },
      { type: 'heading', text: 'When to use the Brokk 170', level: 2 },
      {
        type: 'paragraph',
        text:
          'The reach-and-power option in the compact range. Same transport width as the 110 but with a metre more reach and 60% more hydraulic output. The 170 is the right call for taller plant rooms, mid-height tank walls, or any application where you\'d be moving the 110 around constantly to cover the same area. The extra reach reduces re-positioning time, which often matters more than peak breaking output.',
      },
      { type: 'heading', text: 'When to size up to a 200 or above', level: 2 },
      {
        type: 'list',
        items: [
          'Continuous heavy concrete (>1m thick reinforced sections) — the 170\'s breaker class becomes the bottleneck.',
          'Outdoor or yard work where access isn\'t the constraint — the 200 series is more productive £/m³.',
          'When you need attachments beyond the standard breaker — bigger shears, crushers, or milling heads usually need the larger frame.',
        ],
      },
      {
        type: 'callout',
        text:
          'Picking on access alone misses the point. The right machine is the one that gets through your tightest constraint AND finishes the work in your programme. Send us the doorway width, the work area dimensions, and what you\'re removing — we\'ll specify.',
      },
    ],
  },

  {
    slug: 'hydrodemolition-vs-mechanical-breaking',
    title: 'Hydrodemolition vs mechanical breaking: when does water win?',
    dek: 'A decision matrix for choosing between high-pressure water and mechanical methods. The answer is rarely about cost — it\'s about what\'s left behind.',
    excerpt:
      'Hydrodemolition costs more per cubic metre than mechanical breaking. So why specify it? Because the question isn\'t "how cheap can we remove this concrete?" — it\'s "what state do we need the structure to be in afterwards?"',
    date: '2026-04-18',
    readingTime: '6 min read',
    category: 'Method',
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt: 'Hydrodemolition robot removing concrete from a structural element',
    sections: [
      {
        type: 'paragraph',
        text:
          'Hydrodemolition costs more per cubic metre than mechanical breaking. So why specify it? Because the question isn\'t "how cheap can we remove this concrete?" — it\'s "what state do we need the structure to be in afterwards?"',
      },
      { type: 'heading', text: 'The three things hydrodemolition does that breakers can\'t', level: 2 },
      {
        type: 'list',
        items: [
          'Selectively removes degraded concrete while leaving sound substrate intact. Operators set the working pressure to remove concrete below a defined compressive strength — sound concrete passes through unscathed. Mechanical breakers can\'t make that distinction; they remove whatever they hit.',
          'Preserves rebar with no induced damage. Steel reinforcement is untouched by water at typical operating pressures (1,500–3,000 bar). Mechanical breaking deforms exposed rebar, often requiring replacement bar in the rebuild — extra cost, extra programme.',
          'Eliminates impact-induced micro-cracking in retained concrete. This matters for partial-depth removals on bridge decks, water-retaining structures, and any element where the rebuild needs to bond cleanly to retained substrate. Mechanical breakers create a fractured zone of micro-cracks that compromises the bond.',
        ],
      },
      { type: 'heading', text: 'Where mechanical still wins', level: 2 },
      {
        type: 'list',
        items: [
          'Whole-element removal where the structure is being demolished entirely — no need to preserve substrate or rebar.',
          'Sites with no water management capability and limited space for treatment plant.',
          'Light strip-out work at low volumes where mobilising hydrodemolition isn\'t economic.',
          'Programme-critical work where the higher productivity of breaking outweighs the rework cost of damaged rebar.',
        ],
      },
      { type: 'heading', text: 'The decision matrix', level: 2 },
      {
        type: 'comparison',
        headers: ['Factor', 'Mechanical breaking', 'Hydrodemolition'],
        rows: [
          ['Cost per m³', 'Lower', 'Higher (typically 1.5–2.5×)'],
          ['Rebar damage', 'Likely', 'None at correct pressure'],
          ['Selective removal of degraded concrete', 'No', 'Yes (pressure-tunable)'],
          ['Substrate micro-cracking', 'Yes', 'None'],
          ['Vibration in surrounding structure', 'High', 'Effectively none'],
          ['Water management required', 'No', 'Yes — capture, treat, discharge'],
          ['Best for', 'Whole-element removal, dry sites', 'Refurbishment, water-retaining, post-tensioned'],
        ],
      },
      { type: 'heading', text: 'The total-cost view', level: 2 },
      {
        type: 'paragraph',
        text:
          'Specifying hydrodemolition because of headline £/m³ misses the picture. On a clarifier wall refurbishment, the hidden costs of mechanical breaking — replacement rebar, extra fixings to bridge micro-cracked substrate, longer cure times for the rebuild — frequently exceed the apparent saving. We\'ve walked into projects mid-programme where the original mechanical method had to be abandoned because the structural engineer rejected the substrate condition for re-encasement. The repricing exercise was always more expensive than the original hydrodemolition quote.',
      },
      {
        type: 'callout',
        text:
          'Hydrodemolition is not a premium service. It\'s the right method for any application where the post-removal condition of the structure matters as much as the removal itself.',
      },
    ],
  },

  {
    slug: 'amp8-demolition-supply-chain',
    title: 'AMP8 and the demolition supply chain: what Tier-1 contractors should be asking specialist subcontractors in 2026',
    dek: 'The £104bn AMP8 water programme has triggered a wave of clarifier, sludge tank, and treatment-asset refurbishment work. Here\'s what a Tier-1 procurement team needs to interrogate when subletting the specialist demolition.',
    excerpt:
      'AMP8 final determinations unlocked record capex across England and Wales. Most of the demolition work is at the specialist end — selective concrete removal, hydrodemolition, confined-access plant strip-out. Procurement teams used to whole-element demolition pricing are getting bid responses they don\'t know how to compare.',
    date: '2026-04-04',
    readingTime: '5 min read',
    category: 'Sector',
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt: 'Specialist demolition equipment at a water treatment plant',
    sections: [
      {
        type: 'paragraph',
        text:
          'AMP8 final determinations (December 2024) unlocked record capex across England and Wales — £104bn over 2025–2030. A meaningful slice of that programme is asset refurbishment: clarifiers, sludge tanks, lamella plates, contact tanks, screening chambers. All structures where the specialist demolition is selective concrete removal, not whole-element wrecking.',
      },
      {
        type: 'paragraph',
        text:
          'For Tier-1 contractors building bid stacks, the challenge is comparing specialist subcontractor responses on apples-to-apples terms. Headline £/m³ rates can vary by 3× between bids — and the cheapest is often not the one that delivers the asset back in commissioning condition.',
      },
      { type: 'heading', text: 'Five questions worth asking before award', level: 2 },
      {
        type: 'list',
        items: [
          '"What\'s your assumption on substrate condition after removal?" — A bid based on mechanical breaking will leave a micro-cracked substrate that may need additional bond-coat or replacement rebar. A bid based on hydrodemolition delivers a clean, sound substrate ready for re-encasement. The £/m³ comparison is meaningless without this.',
          '"How will you manage the water and how will you discharge it?" — Hydrodemolition produces high-pH water with suspended solids and sometimes contamination. Bids that don\'t mention treatment (Siltbuster, BossTek, etc.) are either underestimating cost or planning to discharge non-compliantly. Either way, a problem.',
          '"What\'s your method for keeping the adjacent treatment line in service?" — Most water-asset refurb is in live works. The bid should reference sequencing, isolation strategy, vibration limits at adjacent process tanks, and how arisings are removed without disrupting consented operations.',
          '"What productivity do you assume per shift, and what drives it?" — Specialist demolition output is rarely the limiting factor. Access, water capture, waste segregation, and shift-window restrictions all dominate. A specialist who quotes a single productivity figure with no caveats is making it up.',
          '"Have you delivered this asset class on a Tier-1 framework before?" — AMP8 documentation, CDM packs, environmental controls, and reporting cadence are non-trivial. A bidder new to framework delivery will be slow on submissions, even if technically competent.',
        ],
      },
      { type: 'heading', text: 'What good looks like', level: 2 },
      {
        type: 'paragraph',
        text:
          'A serious specialist bid will quantify each of those five points before being asked. The bid should include a method statement extract, vibration and water-management appendices, and clear assumptions on substrate condition. Anything less is either a generic price waiting to be revised on site, or a bid that hasn\'t actually been thought through.',
      },
      {
        type: 'callout',
        text:
          'Procurement teams used to comparing whole-element demolition prices need a different evaluation framework for AMP8 specialist work. The cheapest bid almost always reveals additional cost on site. The right bid prices the method that\'ll work, and shows its workings.',
      },
    ],
  },

  {
    slug: 'cold-cutting-atex-zones-dsear',
    title: 'Cold cutting in ATEX zones: how spark-free abrasive cutting passes DSEAR',
    dek: 'Why abrasive water jet cutting is the only safe method for live cuts in ATEX-classified areas — and what a DSEAR-compliant method statement looks like.',
    excerpt:
      'In an ATEX zone 1 or 2 area, hot work is either prohibited or requires a habitat with full inerting and continuous monitoring. Abrasive cold cutting bypasses that entirely — no heat, no sparks, no ignition source.',
    date: '2026-03-21',
    readingTime: '4 min read',
    category: 'Safety & compliance',
    heroImage: '/images/services/cold-cutting-hero.jpg',
    heroAlt: 'Abrasive cold cutting equipment cutting steel pipework in an ATEX area',
    sections: [
      {
        type: 'paragraph',
        text:
          'In an ATEX zone 1 or 2 area — anywhere a flammable atmosphere may be present in normal operation, or in fault conditions — hot work is either prohibited or requires a habitat with full inerting and continuous monitoring. Abrasive cold cutting bypasses that entirely: no heat, no sparks, no ignition source. It\'s the only mechanical method that lets you cut through pressurised carbon-steel pipework, vessel walls, or structural steel inside a live process area without shutting the area down.',
      },
      { type: 'heading', text: 'How abrasive cold cutting works', level: 2 },
      {
        type: 'paragraph',
        text:
          'Water at 3,500–4,100 bar carries an abrasive (typically garnet) at high velocity through a precision nozzle. The abrasive does the cutting; the water carries it. Cut energy is converted to kinetic energy, not heat — the cut zone temperature rises by single-digit degrees Celsius, far below any ignition threshold. There are no rotating mechanical parts at the cut face, no electrical arcs, no localised hot spots.',
      },
      { type: 'heading', text: 'DSEAR risk assessment — the four points to evidence', level: 2 },
      {
        type: 'list',
        items: [
          'Ignition source classification: confirmed as none under EN 1127-1. The cutting nozzle introduces no thermal, electrical, mechanical-impact, or static-electricity ignition source.',
          'Earthing and bonding: the cutting head and feed hose are earthed to plant earth via a documented strap. Static dissipation is positively confirmed before each cut.',
          'Atmosphere monitoring: continuous LEL monitoring at the cut face throughout the work, with automatic stop interlock at 10% LEL.',
          'Containment of arisings: water and abrasive captured in a bunded tray; any hydrocarbon contamination is segregated and disposed of via the operator\'s waste stream.',
        ],
      },
      { type: 'heading', text: 'When the operator wants third-party sign-off', level: 2 },
      {
        type: 'paragraph',
        text:
          'COMAH operators frequently require a third-party DSEAR consultant to review and sign off the method before any cut starts. This isn\'t hostile — it\'s standard for any work that touches their hazardous-area boundary. We support this by providing the method statement, equipment certification, operator competency records, and risk assessment in advance, so the consultant\'s review is a verification exercise rather than a development exercise.',
      },
      {
        type: 'callout',
        text:
          'If your scope mentions "ATEX area," "zone 1 or 2," or "DSEAR sign-off," cold cutting is the default method. Hot work alternatives (with habitat, inerting, monitoring) cost 5–10× more in setup and disrupt the operating area. Specify cold cutting at tender, not as a variation.',
      },
      { type: 'heading', text: 'What we\'ll need to mobilise', level: 2 },
      {
        type: 'list',
        items: [
          'Pipe or vessel material, wall thickness, and contents (or last-known contents).',
          'Site access for the high-pressure pump (typically van-mounted, 3.5t).',
          'Water supply and discharge route for spent water and abrasive.',
          'DSEAR / hazardous area classification and any operator-specific permit requirements.',
        ],
      },
    ],
  },
];

export function getInsightBySlug(slug: string): InsightPost | undefined {
  return INSIGHTS.find((p) => p.slug === slug);
}
