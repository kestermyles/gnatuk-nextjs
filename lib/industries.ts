// Industry / sector content hubs.
//
// Buyers source specialist demolition by industry context, not by tool name
// ("AMP8 contractor" beats "robotic demolition contractor" for ranking
// intent). These hubs are the SEO landing pages for that procurement
// reality — each is ~500-700 words of substantive sector context, the
// methods that apply, the constraints that shape them, and links into the
// case studies and service pages where the work is documented.

import type { ServiceSlug } from './constants';

export type IndustrySlug =
  | 'water'
  | 'petrochemical-comah'
  | 'process-refractory'
  | 'highways'
  | 'heritage'
  | 'offshore-marine';

export type IndustryHub = {
  slug: IndustrySlug;
  /** Used in nav and breadcrumbs. */
  shortName: string;
  /** SERP title — under 60 chars. */
  metaTitle: string;
  /** Meta description — 150-160 chars. */
  metaDescription: string;
  /** Hero eyebrow (small caps line above H1). */
  eyebrow: string;
  /** H1. */
  hero: string;
  /** One-sentence positioning under the hero. */
  subtitle: string;
  /** Background image for hero (path under /public). */
  heroImage: string;
  heroAlt: string;
  /** 4 short benefit lines surfaced under the hero. */
  benefits: string[];
  /** Three opening paragraphs of body copy — the sector framing. */
  intro: string[];
  /** Methods that anchor in this sector — drives the "Disciplines applied" grid. */
  primaryServices: ServiceSlug[];
  /** Three "what makes this sector different" feature cards. */
  whatMakesItDifferent: { title: string; body: string }[];
  /** Subsectors / project types within this industry. */
  subSectors: string[];
  /** Blog post slugs (from Sanity) most relevant to this sector. */
  caseStudySlugs: string[];
  /** Sector-specific FAQ items. */
  faqs: { question: string; answer: string }[];
  /** Final CTA block. */
  cta: { heading: string; body: string };
};

export const INDUSTRIES: Record<IndustrySlug, IndustryHub> = {
  water: {
    slug: 'water',
    shortName: 'Water Infrastructure',
    metaTitle: 'Water Industry Demolition — AMP8, Treatment Plant & Reservoirs',
    metaDescription:
      'Specialist demolition for the UK water industry — AMP8 delivery, treatment-plant refurbishment, reservoir works and sewer infrastructure. Hydrodemolition, robotic and diamond methods.',
    eyebrow: 'Water Industry',
    hero: 'Specialist demolition for UK water — AMP8 and beyond.',
    subtitle:
      'Treatment plants, reservoirs, sewer flumes, bridge decks and dockside structures — delivered without taking the asset offline.',
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt:
      'Aquajet hydrodemolition robot selectively removing concrete on a water-industry refurbishment, water-management kit alongside',
    benefits: [
      'AMP8 framework experience',
      'Non-percussive methods on live assets',
      'Water-management built in',
      'Reinforcement-safe selective removal',
    ],
    intro: [
      "The UK water industry's eighth Asset Management Period (AMP8, 2025-2030) is the largest investment cycle in the sector's history — and almost none of it is greenfield. Most of the work is refurbishment of operational treatment plants, reservoirs, network assets and bridge structures where the wrong demolition method costs more in shutdown than it saves in tool selection.",
      "GNAT UK has delivered specialist demolition for water-industry clients across multiple AMP cycles, working directly for water companies and as supply-chain to Tier-1 contractors including Costain, Galliford Try and other framework partners. The work spans concrete-asset refurbishment (selective removal preserving reinforcement), full-asset decommissioning, and the precision cuts and break-outs that enable new plant to land into existing structures.",
      "What sets the sector apart isn't the demolition itself — it's the surrounding constraints. Water-retaining structures can't accept percussive vibration. Live treatment plants can't accept downtime. Runoff has to be captured, pH-controlled and disposed of compliantly. Operator competency, permits-to-work and asset-owner safety regimes shape every method choice. We work the constraints into the method up-front, not after the first day on site.",
    ],
    primaryServices: ['hydrodemolition', 'robotic-demolition', 'diamond-drilling'],
    whatMakesItDifferent: [
      {
        title: 'Non-percussive on live assets',
        body: 'Hydrodemolition and selective robotic work remove concrete without the vibration that conventional breakers introduce — essential where the structure stays operational.',
      },
      {
        title: 'Water management designed in',
        body: 'Capture, filtration, pH control and discharge planning built into the method statement at proposal stage — not retro-fitted on site.',
      },
      {
        title: 'Framework-ready documentation',
        body: 'Pre-construction packs returned in your preferred PQQ template, with RISQS, CHAS, Constructionline Gold and Achilles credentials current.',
      },
    ],
    subSectors: [
      'Water treatment works (potable & wastewater)',
      'Reservoirs, dams and water-retaining structures',
      'Sewer flumes and trunk-main infrastructure',
      'Pumping stations and CSO chambers',
      'Coastal and dockside water assets',
      'Bridge decks and viaduct strengthening over watercourses',
    ],
    caseStudySlugs: [
      'hydrodemolition-north-sea-jetty',
      'aquajet-motorway-bridge-parapet',
      'hydroblasting-city-bridge-deck',
      'diamond-wire-sawing-glasgow-sewer-flumes',
      'bulk-hydrodemolition-coastal-jetties',
      'hydroblasting-factory-floor-rebates',
    ],
    faqs: [
      {
        question: 'Are you on the AMP8 supply chain?',
        answer:
          "Yes. GNAT UK is engaged as a specialist demolition sub-contractor to several Tier-1 contractors delivering AMP8 schemes for UK water companies, and we are positioned to be brought into AMP8 schemes at framework or scheme-specific level. Speak to us early — method definition at scope-development stage is where the savings sit.",
      },
      {
        question: 'How is water managed on a hydrodemolition project?',
        answer:
          "Capture, filtration and pH control are designed into the method from the proposal stage. We assess discharge constraints (foul sewer, surface water, watercourse) against the volume of runoff the method will produce, and integrate water-management plant (settlement tanks, neutralisation kit, monitored discharge) into the site setup. The plan goes into the method statement, not into a 'we'll work it out on site' bucket.",
      },
      {
        question: 'Can you work in live treatment plant?',
        answer:
          "Yes — the bulk of our water-industry work is in operational assets. Live working drives a tighter method definition: confined-access robotic methods for restricted areas, hydrodemolition where vibration is unacceptable, and full integration with the asset operator's permit-to-work and HazID regime.",
      },
      {
        question: 'What about asbestos or contaminated substrates?',
        answer:
          "Older water-industry assets routinely include legacy contaminants — asbestos in pipework lagging, heavy-metal residues in process tanks, or chlorinated solvents in pre-treatment plant. Pre-survey results drive the method: hot-work restrictions, atmosphere monitoring, decontamination plan and waste-stream segregation are written into the method statement before mobilisation.",
      },
    ],
    cta: {
      heading: 'AMP8 brief that needs a specialist demolition view?',
      body: 'Bring us in at scope-development. Method definition at this stage is where the real programme savings sit — we will tell you upfront where the brief is structurally workable and where it needs a re-think.',
    },
  },

  'petrochemical-comah': {
    slug: 'petrochemical-comah',
    shortName: 'Petrochemical & COMAH',
    metaTitle: 'COMAH Demolition — Petrochemical, Oil & Gas, Refinery Specialists',
    metaDescription:
      'Specialist demolition for COMAH-regulated petrochemical, oil & gas and refining facilities. Cold cutting, hydrodemolition and ATEX-compliant methods for major-hazard installations.',
    eyebrow: 'Petrochemical & COMAH',
    hero: 'Specialist demolition for COMAH-regulated sites.',
    subtitle:
      'Petrochemical, oil & gas, refining — spark-free, ATEX-compliant methods built around DSEAR and major-hazard safety regimes.',
    heroImage: '/images/services/cold-cutting-hero.jpg',
    heroAlt:
      'Abrasive cold cutting equipment isolating pipework on a COMAH-regulated petrochemical site, full PPE and atmosphere monitoring in place',
    benefits: [
      'Spark-free isolation methods',
      'ATEX-zone-compliant kit',
      'DSEAR documentation included',
      'Full operator-competency chain',
    ],
    intro: [
      "Demolition on a COMAH-regulated site is unlike any other discipline. The Control of Major Accident Hazards regulations sit on top of every method choice — no flame, no spark, no vibration into adjacent live process equipment, full atmosphere monitoring, permits-to-work that take longer to write than the work takes to complete. Pick the wrong method on a petrochemical site and you don't just lose a programme; you lose the licence to operate.",
      "GNAT UK has worked on Tier-1 and Tier-2 COMAH sites including refineries, gas-processing terminals, chemical works and oil-and-gas storage. The work splits two ways: surgical isolations (where a section of live plant needs to come out without flame) and full-asset decommissioning (where a redundant unit is dismantled while the rest of the site stays operational).",
      "The methods that apply here are deliberately narrow. Abrasive cold cutting delivers spark-free isolation of pipework and pressure vessels. Hydrodemolition removes concrete without percussion in proximity to live process equipment. Robotic demolition keeps operators out of confined or contaminated zones. We will not use hot work, conventional cutting or impact breaking on a COMAH site unless the area has been formally certified gas-free and the permit explicitly authorises it.",
    ],
    primaryServices: ['cold-cutting', 'hydrodemolition', 'robotic-demolition'],
    whatMakesItDifferent: [
      {
        title: 'Spark-free as a starting point',
        body: 'Abrasive cold cutting and hydrodemolition are inherently no-spark, no-flame methods — the safe default before any hot-work permit is even discussed.',
      },
      {
        title: 'DSEAR documentation included',
        body: 'Dangerous Substances and Explosive Atmospheres assessment, atmosphere monitoring plan and zone-specific equipment ratings written into every COMAH-site method statement.',
      },
      {
        title: 'Operator competency, audited',
        body: 'Operators carry CCDO, CSCS, IPAF, PASMA plus discipline-specific cards (Brokk, WJA hydrodemolition, abrasive-cutting); records returnable on request for any client PQQ.',
      },
    ],
    subSectors: [
      'Oil & gas terminals and storage',
      'Refineries and downstream processing',
      'Petrochemical plant and chemical works',
      'Gas-handling and LPG infrastructure',
      'Process pipework isolation and tie-ins',
      'Pressure vessel and tank decommissioning',
    ],
    caseStudySlugs: [
      'cold-cutting-brokk-800-oil-sludge-tank',
      'abrasive-cold-cutting-pressure-vessels',
      'refractory-vessel-cold-cut-brokk-debricking',
      'brokk-800-steel-shears-girder-removal',
    ],
    faqs: [
      {
        question: 'Do you carry the certifications COMAH sites require?',
        answer:
          'Yes. GNAT UK Limited holds CHAS Accredited Contractor, Constructionline Gold Member, Achilles BuildingConfidence Audited and SSIP Acclaim Accreditation — the standard pre-qualification expected of demolition supply-chain on Tier-1 and Tier-2 COMAH sites. Certificates and current insurance documents are returnable on request.',
      },
      {
        question: 'Can you work in ATEX zones?',
        answer:
          'Yes — equipment specification matches the zone classification. Cold-cutting and hydrodemolition kit can be configured for Zone 1 and Zone 2 operation; robotic demolition machines run from remote control well outside the hazardous zone. We carry the equipment certifications and operator records to demonstrate compliance.',
      },
      {
        question: 'What about hot work?',
        answer:
          "We don't propose hot work as a default on COMAH sites. Where the brief or programme makes it unavoidable, it follows the site's hot-work permit regime with full atmosphere monitoring and fire-watch — and only after we've exhausted the no-flame alternatives.",
      },
      {
        question: 'How do you handle contaminated substrates and process residues?',
        answer:
          'Pre-decontamination is part of the method definition. Sludge, hydrocarbon residue and chemical contamination are removed and disposed of via licensed waste streams before the cutting work begins. Atmosphere monitoring continues throughout the operation, and any change in reading triggers a stop-work review.',
      },
    ],
    cta: {
      heading: 'COMAH site brief in development?',
      body: "The earlier we're brought in, the cleaner the method definition. We will tell you up front whether a flame-free approach is achievable in your scenario — and what it looks like commercially against the alternatives.",
    },
  },

  'process-refractory': {
    slug: 'process-refractory',
    shortName: 'Process & Refractory',
    metaTitle: 'Refractory & Process Industry Demolition — Kiln Strip & Vessel Works',
    metaDescription:
      'Specialist demolition for industrial process plant and refractory linings — kiln de-bricking, furnace strip, vessel work and process-equipment decommissioning across UK manufacturing.',
    eyebrow: 'Process & Manufacturing',
    hero: 'Refractory kiln strip and process-vessel demolition.',
    subtitle:
      'Confined-space robotic work inside kilns, furnaces and process vessels — controlled contaminant handling, operator-safe remote operation.',
    heroImage: '/images/services/robotic-demolition-hero.jpg',
    heroAlt:
      'Brokk robotic demolition machine inside the confined space of a refractory kiln, removing high-temperature brick lining from the kiln wall',
    benefits: [
      'Confined-vessel access',
      'Contaminant containment',
      'Operator-safe remote ops',
      'Crane-in plant deployment',
    ],
    intro: [
      "Refractory and process-industry demolition is a confined-space discipline by default. The asset is usually a kiln, furnace, vessel or chamber that has spent decades absorbing whatever it processed — chromium, asbestos, hydrocarbons, heavy metals — into a thick refractory lining that now has to come out before the asset is decommissioned, relined or repurposed. The constraints are mechanical (limited access for plant), atmospheric (residual contaminants), and ergonomic (manual de-bricking in a hot, dusty, low-clearance space is the job nobody wants).",
      "GNAT UK's refractory work spans rotary kilns up to 100m long, vertical shaft furnaces, glass-industry tanks, cement kilns, biomass boiler chambers and chemical-process vessels. Access is typically by cutting a hole in the vessel wall and craning a compact robot into the well — a Brokk 60 in tight refractory, a Brokk 110 or 170 where headroom allows, occasionally a manipulator system where the geometry rules out a tracked machine.",
      "What changes the economics is taking the operator out of the vessel. Manual de-bricking with hand-held breakers is slow, fatiguing and physically risky; remote-operated robotic demolition runs the same hammer power continuously, from outside the chamber. The lining drops out faster, the operator works in a safe environment, and the project finishes ahead of the manual-method baseline.",
    ],
    primaryServices: ['robotic-demolition', 'cold-cutting', 'diamond-drilling'],
    whatMakesItDifferent: [
      {
        title: 'Compact robots, vessel access',
        body: 'Brokk 60 and Husqvarna DXR140 machines fit through cut access holes and operate continuously inside the vessel — same hammer power as a 250kg machine, fraction of the footprint.',
      },
      {
        title: 'Contaminant containment',
        body: 'Fine mist suppression, sealed access points, sealed discharge to waiting tippers, full atmosphere monitoring — refractory dust never leaves the vessel uncontrolled.',
      },
      {
        title: 'Method-led around the vessel geometry',
        body: 'Cylindrical, rectangular, tapered — every vessel is different. Method statement defines access cuts, robot position progression and lining removal sequence before mobilisation.',
      },
    ],
    subSectors: [
      'Rotary kilns (cement, lime, chromium, calciner)',
      'Refractory furnace strip-outs',
      'Glass-industry tank dismantling',
      'Pressure vessels and process tanks',
      'Biomass boilers and incinerator chambers',
      'Process pipework and tie-in removal',
    ],
    caseStudySlugs: [
      'chromium-kiln-debricking-elementis',
      'refractory-vessel-cold-cut-brokk-debricking',
      'mast-climber-refractory-kiln-debricking',
      'husqvarna-140-archimedes-screw-trough',
      'ergo-hydrodemolition-biomass-boiler',
      'high-reach-confined-space-husqvarna-dxr140',
    ],
    faqs: [
      {
        question: "What's the largest vessel you've stripped?",
        answer:
          "A six-kiln Elementis chromium plant — rotary kilns up to 100m long, ranging from 3m to 5m diameter. Approximately 200 tonnes of brick and chromium-oxide contaminated powder removed across a six-month operation using compact Brokk machines craned in through cut access holes.",
      },
      {
        question: 'How do you handle hot kilns?',
        answer:
          "We don't — refractory linings come out cold. The kiln has to be offline long enough to cool through the refractory mass, which is typically days. Once cool, the methods we use don't reintroduce a heat risk: robotic mechanical breaking, hydrodemolition where moisture is acceptable, and cold cutting where flame is restricted.",
      },
      {
        question: 'What happens to the contaminated waste?',
        answer:
          'The refractory lining and any contaminant residue are segregated at source, sealed at the point of removal and disposed of via licensed hazardous-waste streams. Waste-stream classification and consignment-note tracking are part of the method documentation; we work with the asset owner and their licensed waste contractor to keep the chain of custody intact.',
      },
      {
        question: 'Can you do partial relining works?',
        answer:
          'Yes. Selective removal — taking out a damaged section while leaving sound refractory in place — is a precision job and exactly what compact robotic methods are suited to. Method statement defines the boundary of removal and the verification check before reinstatement.',
      },
    ],
    cta: {
      heading: 'Kiln strip or vessel work coming up?',
      body: "Outage windows are unforgiving. Bring us into the planning early — method, plant and access sequencing get defined together, so the strip-out doesn't slip the relining programme.",
    },
  },

  highways: {
    slug: 'highways',
    shortName: 'Highways & Bridges',
    metaTitle: 'Highways Demolition — Bridge Decks, Parapets & Motorway Refurb',
    metaDescription:
      'Specialist demolition for UK highways, bridges and motorway infrastructure — hydrodemolition deck refurbishment, parapet removal, diamond cutting and reinforcement-safe selective removal.',
    eyebrow: 'Highways & Bridges',
    hero: 'Highways and bridges — selective removal, live carriageway adjacent.',
    subtitle:
      'Bridge-deck refurbishment, parapet removal, deck saddling and structural break-outs delivered without compromising the live network.',
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt:
      'Aquajet hydrodemolition robot performing selective concrete removal on a motorway bridge deck, with the live carriageway running alongside',
    benefits: [
      'Reinforcement-safe selective removal',
      'Possessions and lane-closure aware',
      'No vibration into adjacent live carriageway',
      'Overnight noise compliance',
    ],
    intro: [
      "Highways demolition is rarely demolition in the traditional sense. The dominant work is selective removal — taking out deteriorated concrete on bridge decks while preserving the reinforcement underneath, dropping parapets without disturbing the soffit, cutting deck saddles to a millimetric tolerance so the strengthening overlay bonds properly. The structures involved are usually live infrastructure that cannot be replaced; the technique has to be subtractive without ever being destructive.",
      "GNAT UK delivers highways demolition for National Highways supply-chain, Tier-1 contractors and bridge-asset owners across the UK strategic road network. The flagship method is hydrodemolition — high-pressure water removes deteriorated concrete on bridge decks while leaving the rebar clean, undamaged and bond-ready. The follow-on reinstatement is faster too, because the substrate the new concrete bonds to is mechanically prepared rather than damaged by impact methods.",
      "What shapes the work is the network around it. Live carriageway alongside means vibration limits. Overnight possessions mean a hard finish time. Lane closures cost money and have to be earned every shift. Water management on a bridge deck has to handle runoff into watercourses or drainage. Every method choice is conditioned by these realities, and we resource the project to deliver inside them.",
    ],
    primaryServices: ['hydrodemolition', 'diamond-drilling', 'robotic-demolition', 'cold-cutting'],
    whatMakesItDifferent: [
      {
        title: 'Reinforcement-safe by design',
        body: 'Hydrodemolition removes only the concrete you specify — deteriorated, cover or full-depth — while leaving the embedded rebar clean and bond-ready. Conventional breaking damages both, and you pay to re-prepare the substrate.',
      },
      {
        title: 'Possession-aware mobilisation',
        body: 'Plant arrives configured for the possession window. Setup, full-shift production, demobilisation and lane-clear within the agreed envelope — not over it.',
      },
      {
        title: 'Vibration controls for live infrastructure',
        body: 'Hydrodemolition and diamond methods are inherently low-vibration. Where mechanical methods are needed, the method statement names the vibration limit and the monitoring regime up front.',
      },
    ],
    subSectors: [
      'Bridge deck refurbishment and strengthening',
      'Parapet removal and replacement',
      'Deck saddle and overlay preparation',
      'Highway structure decommissioning',
      'Retaining wall and abutment works',
      'Drainage and surface-water infrastructure removal',
    ],
    caseStudySlugs: [
      'aquajet-motorway-bridge-parapet',
      'hydroblasting-city-bridge-deck',
      'uk-highway-renovation-projects',
      'large-slab-removal-diamond-sawing',
      'leeds-factory-floor-cutting-track-saws',
    ],
    faqs: [
      {
        question: 'Can you work to a possession window?',
        answer:
          'Yes — most of our highways work is possession-bound. Method, plant and crew sizing are dimensioned for the possession length. Setup-to-clear timing is built into the method statement, and the team is briefed against it daily.',
      },
      {
        question: 'Do you handle deck saddling and overlay preparation?',
        answer:
          "Yes. Hydrodemolition delivers the bond-ready substrate that strengthening overlays require — the rebar is clean and the surface micro-texture is mechanically prepared rather than fractured. That accelerates the follow-on works.",
      },
      {
        question: 'What about noise overnight?',
        answer:
          'Hydrodemolition is genuinely quieter than mechanical breaking, but the supporting plant (HP pumps, water-management kit) still has a noise envelope. We model it against the site-specific limits and propose acoustic enclosures, plant positioning or working-pattern adjustments as needed.',
      },
      {
        question: 'Is GNAT RISQS Verified for rail-adjacent works?',
        answer:
          "Yes. GNAT UK is RISQS Verified for the categories required to work on or adjacent to Network Rail-controlled infrastructure. We routinely deliver work on highway structures that interface with the rail boundary — the documentation chain crosses both regimes.",
      },
    ],
    cta: {
      heading: 'Bridge or highway scheme needing a method view?',
      body: "Tell us the possession window, the structure and the constraints — we'll come back with the method that fits inside them, not the one that needs them to flex.",
    },
  },

  heritage: {
    slug: 'heritage',
    shortName: 'Heritage & Listed Buildings',
    metaTitle: 'Heritage Demolition — Grade I, Grade II & Listed Building Specialists',
    metaDescription:
      'Specialist demolition for Grade I, Grade II and Grade II* listed buildings and conservation sites — diamond cutting, wire sawing and robotic methods that preserve original fabric.',
    eyebrow: 'Heritage & Listed Buildings',
    hero: 'Listed-building demolition — preserve what stays.',
    subtitle:
      'Grade I, Grade II and Grade II* schemes where the original fabric must survive while non-original elements come out cleanly.',
    heroImage: '/images/services/diamond-drilling-hero.jpg',
    heroAlt:
      'Diamond wire saw making a controlled cut through reinforced concrete inside a Grade-listed building, with original fabric preserved alongside',
    benefits: [
      'Listed-building consent aware',
      'Millimetric cut tolerance',
      'Original fabric preserved',
      'Conservation-officer collaboration',
    ],
    intro: [
      "Demolition inside a listed building is a contradiction in terms — until you separate what's actually being demolished from what's being preserved. The original fabric (the bit that earned the listing) stays. The later interventions — twentieth-century reinforced-concrete floors slotted into a Victorian shell, post-war partitions in a Georgian townhouse, redundant industrial fit-out in a converted mill — come out, cleanly, without disturbing what's around them. The method has to discriminate at millimetre tolerance between the two.",
      "GNAT UK works regularly on Grade I and Grade II* schemes including Bank of England vaults, listed industrial heritage, ecclesiastical buildings and converted mills. The discipline that anchors most of this work is diamond cutting and wire sawing — precision-controlled, no vibration, no impact, capable of taking out reinforced-concrete sections in pre-defined geometries while the structure around them stays untouched. Robotic demolition supplements where bulk material has to come out of a confined volume.",
      "Process-wise, listed-building work is a collaboration with the conservation officer, the architect, the heritage consultant and sometimes the archaeologist. Method statements go through more review than on a standard scheme; sample cuts are typically required before the main works; and the change-control regime is tighter because every variation potentially affects listed-building consent. We work the way the regime requires — not against it.",
    ],
    primaryServices: ['diamond-drilling', 'robotic-demolition', 'hydrodemolition'],
    whatMakesItDifferent: [
      {
        title: 'No-vibration cuts',
        body: 'Diamond saws and wire saws cut concrete cleanly without transmitting impact energy into the surrounding fabric — the only credible approach where lath-and-plaster, lime mortar or fragile masonry sits adjacent.',
      },
      {
        title: 'Geometric tolerance',
        body: 'Cuts placed and dimensioned to drawing — typically within ±5mm — so the new intervention fits the opening, and the original fabric beyond the cut line is undisturbed.',
      },
      {
        title: 'Conservation-team collaboration',
        body: 'Method definition with the architect, conservation officer and heritage consultant from the outset; sample cuts, photographic documentation and change-control built into the project rhythm.',
      },
    ],
    subSectors: [
      'Grade I and Grade II* listed buildings',
      'Ecclesiastical and heritage church works',
      'Listed industrial mills and warehouses',
      'Bank vaults and high-security listed structures',
      'Listed bridge and infrastructure works',
      'Scheduled-monument adjacent demolition',
    ],
    caseStudySlugs: [
      'bank-of-england-vault-grade-1-london',
      'shropshire-flax-mill-silo-deconstruction',
      'railway-arch-pedestrian-walkway-shotcrete',
      'industrial-heritage-landmark-farewell',
      'top-down-robotic-demolition-leeds-tower',
    ],
    faqs: [
      {
        question: 'Do you work with the conservation officer directly?',
        answer:
          "Yes — typically through the architect or heritage consultant on the design team, with direct dialogue where the conservation officer wants method-level conversation. We provide method-statement drafts, sample-cut photographs and material samples on request.",
      },
      {
        question: "What's the cut tolerance you can hold?",
        answer:
          'For diamond-sawing and wire-sawing work, typical tolerance is ±5mm on the cut line. Tighter tolerance is achievable on shorter cuts — we will tell you what is achievable for the specific configuration during method definition.',
      },
      {
        question: 'How do you handle archaeological constraints?',
        answer:
          "We work with the archaeologist appointed under the consent or planning condition — typically a watching brief during break-out, with stop-work triggers if anything is uncovered. The method statement names the protocol and the contact tree before mobilisation.",
      },
      {
        question: "Can you work with lime-based or historic mortars?",
        answer:
          "Yes — though we typically remove the post-original element rather than touching the historic mortar itself. Where the historic fabric needs intervention, the method gets defined alongside a heritage specialist, and we limit our scope to the work the consent permits.",
      },
    ],
    cta: {
      heading: 'Listed-building scheme in design?',
      body: "Bring us in alongside the heritage team. Method conversations early help shape what the consent application can credibly propose — and avoid the situations where the consent is granted but the method to deliver it doesn't exist.",
    },
  },

  'offshore-marine': {
    slug: 'offshore-marine',
    shortName: 'Offshore & Marine',
    metaTitle: 'Offshore & Marine Demolition — Decommissioning, Jetties & Dockyards',
    metaDescription:
      'Specialist demolition for offshore decommissioning, marine infrastructure, dockyards and coastal jetties — hydrodemolition, diamond wire and cold cutting in marine environments.',
    eyebrow: 'Offshore & Marine',
    hero: 'Offshore decommissioning and marine demolition.',
    subtitle:
      'Coastal jetties, dockside structures, offshore decommissioning and tidal working — methods that deliver inside marine and weather constraints.',
    heroImage: '/images/services/hydrodemolition-hero.jpg',
    heroAlt:
      'Hydrodemolition equipment working on a North Sea coastal jetty, removing deteriorated concrete from marine infrastructure while the structure remains operational',
    benefits: [
      'Tidal-window aware',
      'Marine-compatible methods',
      'Weather-window mobilisation',
      'Decommissioning regulation compliance',
    ],
    intro: [
      "Marine and offshore demolition is dimensioned by constraints the inland industry rarely meets: tidal windows that govern when work can happen, weather windows that govern when vessels can mobilise, and decommissioning regulations that govern what condition the asset has to be left in. The methods that work onshore aren't all transferable — the saline environment, the lift-plan complexity, the limited working envelope on a deck or jetty all narrow the choice.",
      "GNAT UK has delivered marine demolition for coastal jetty refurbishment, dockyard concrete works, North Sea infrastructure and marine-adjacent decommissioning. The dominant methods are hydrodemolition (selective marine-concrete removal, with water as the working fluid the structure already lives in), diamond wire cutting (large-section cuts on platforms and substructures), and cold cutting (spark-free isolation of pipework in marine atmosphere).",
      "What makes marine work different is the operational pattern. Mobilisation is by working boat or barge for offshore, by HGV plus crane for jetty work — both governed by weather and tide. The team often works compressed-shift patterns to maximise on-station productivity. Waste management has to handle saline-contaminated material; PPE and atmosphere monitoring have to handle marine humidity. We resource the project for the working environment, not against it.",
    ],
    primaryServices: ['hydrodemolition', 'diamond-drilling', 'cold-cutting', 'robotic-demolition'],
    whatMakesItDifferent: [
      {
        title: 'Tidal-window scheduling',
        body: "Method, plant positioning and crew rotation defined around the tidal cycle — productive hours sit inside the working window, support tasks fill the dead time.",
      },
      {
        title: 'Marine-compatible methods',
        body: "Hydrodemolition and diamond cutting use water and abrasive — both marine-compatible. Cold cutting handles spark-free isolation in marine atmosphere where hot work is restricted.",
      },
      {
        title: 'Vessel and lift-plan integration',
        body: "For offshore work, plant mobilisation joins the wider lift plan and SIMOPS schedule — not a separate workflow bolted onto the end.",
      },
    ],
    subSectors: [
      'Offshore platform decommissioning',
      'Coastal and harbour jetties',
      'Dockyard concrete works',
      'Marine pipeline tie-ins and isolation',
      'Sea-defence and coastal protection works',
      'Subsea pipeline preparation cuts',
    ],
    caseStudySlugs: [
      'hydrodemolition-north-sea-jetty',
      'bulk-hydrodemolition-coastal-jetties',
      'aquajet-motorway-bridge-parapet',
      'cold-cutting-brokk-800-oil-sludge-tank',
    ],
    faqs: [
      {
        question: 'Can you mobilise to an offshore platform?',
        answer:
          "Yes — typically via the asset operator's mobilisation routine (working boat or vessel, helicopter for crew), with plant containerised for offshore deployment. We work to the operator's permit-to-work, SIMOPS and lift-plan regime; method statement integrates with the wider decommissioning programme.",
      },
      {
        question: "How do you handle weather and tide constraints?",
        answer:
          'Programme is sized against the tidal cycle and a realistic weather-availability assumption for the season. Stop-work triggers (wind, swell, visibility) are named in the method statement; the team works compressed productive hours when the window is open.',
      },
      {
        question: 'Are your methods OSPAR / decommissioning-compliant?',
        answer:
          'Cutting and removal methods integrate with the wider decommissioning plan and OSPAR-compliant disposal strategy. We are not the regulatory lead on a decommissioning programme — that sits with the asset operator — but our methods and waste-management approach are dimensioned to fit the regime.',
      },
      {
        question: 'Do you do subsea cutting?',
        answer:
          'Subsea cutting (genuinely underwater, with diver or ROV support) is delivered with specialist subsea-cutting partners under our overall scope where required. Most of our marine work is above the waterline — jetties, dockside structures, platform superstructure — where our standard methods apply directly.',
      },
    ],
    cta: {
      heading: 'Marine or offshore brief in early planning?',
      body: 'Mobilisation logistics and weather-window planning shape the method. Bring us in before the lift plan and decommissioning sequence are locked — method changes after that are an order of magnitude more expensive.',
    },
  },
};

export const INDUSTRY_LIST: IndustryHub[] = Object.values(INDUSTRIES);
