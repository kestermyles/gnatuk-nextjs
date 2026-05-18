# GNAT UK paid-campaign brief

Pre-built ad copy, audience targeting, creative selection and a Keith-only
punch list — ready to paste into LinkedIn Campaign Manager and Meta Ads
Manager once the trackers are live.

## The technical foundation (already shipped)

| Piece | File | Status |
|---|---|---|
| Meta Pixel — page-view + Lead + Contact events | `app/layout.tsx` + `lib/analytics.ts` | Wired; needs `NEXT_PUBLIC_META_PIXEL_ID` env var to activate |
| LinkedIn Insight Tag — page-view + Lead conversion | `app/layout.tsx` + `lib/analytics.ts` | Wired; needs `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` env var to activate |
| UTM capture from URL → form → email | `lib/utm.ts` + `components/ContactForm.tsx` + `lib/email.ts` | Active. Persists `utm_*` / `gclid` / `fbclid` / `li_fat_id` for the session, posts them with the form, surfaces them in the team-notification email |
| GTM dataLayer events | `lib/analytics.ts` | Active (GTM-5RHLSCR) |

All three trackers fire from a **single** `track(...)` call in the form
submission — no duplicate code paths.

## Keith's punch list (the 5 things only you can do)

1. **Create Meta Business Manager + Pixel**
   - [business.facebook.com](https://business.facebook.com) → Business Settings → Data Sources → Pixels → Create
   - Name: `GNAT UK Website Pixel`
   - Copy the Pixel ID (15-digit number)
   - Drop into Vercel env var: `NEXT_PUBLIC_META_PIXEL_ID`

2. **Create LinkedIn Insight Tag + Conversions**
   - [linkedin.com/campaignmanager](https://www.linkedin.com/campaignmanager) → Account Assets → Insight Tag → Install
   - Copy the Partner ID (8-digit number)
   - Drop into Vercel env var: `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
   - Then: Account Assets → Conversions → Create:
     - `GNAT UK Lead` (form submission) — get the numeric conversion ID
     - `GNAT UK Contact` (phone click) — get the numeric conversion ID
   - Drop both into Vercel:
     - `NEXT_PUBLIC_LINKEDIN_CONV_LEAD`
     - `NEXT_PUBLIC_LINKEDIN_CONV_CONTACT`

3. **Create GNAT UK LinkedIn Company Page** (if one doesn't exist)
   - [linkedin.com/company/setup/new](https://www.linkedin.com/company/setup/new)
   - Link it to the GNAT UK domain so company verification clears
   - Upload the GNAT-UK logo (`/public/images/logo.png`) as profile, and the accreditations banner (`/public/images/accreditations/banner.jpg`) as cover
   - Nick + Marc + Keith follow the page; encourage clients to follow

4. **Upload customer list as Custom Audience** (for the Lookalike play)
   - Compile: every client + active prospect + LinkedIn contact Nick has had a real conversation with (ideally 1000+ rows)
   - Columns: `email`, `phone`, `first_name`, `last_name`, `country` (`GB` for all)
   - Upload to Meta Audiences → Custom Audience → Customer File
   - Upload to LinkedIn Matched Audiences → List Upload
   - On both: build a 1% Lookalike of the uploaded list (UK)

5. **Approve the budget**
   - Recommended first month: £500 LinkedIn + £150 Meta = £650 total
   - The LinkedIn-heavy split matches the B2B procurement reality

---

## Ad copy — ready to paste

### Ad 1 — Tier-1 procurement (LinkedIn Sponsored Content)

**Headline:** Specialist demolition for COMAH, AMP8 and listed-building schemes.

**Intro text:**
> Method-led delivery. Robotic, hydrodemolition, diamond cutting and cold cutting — defined and proven on the schemes most contractors won't touch.
>
> 40 years on confined-access, structurally sensitive and live-environment work. Full Tier-1 pre-qual: CHAS, Constructionline Gold, Achilles, RISQS, NFDC.
>
> Bring us in early. We'll tell you up-front whether the method fits — and what the right alternative is if it doesn't.

**CTA:** Request a method proposal

**Destination URL:** `https://www.gnatuk.com/our-process?utm_source=linkedin&utm_medium=cpc&utm_campaign=tier1-procurement&utm_content=method-led`

**Image:** `British-Steel-Banner.webp` (the wide B&W blast-furnace shot — heavy-industrial scale)

### Ad 2 — Water industry / AMP8 (LinkedIn Sponsored Content)

**Headline:** AMP8 specialist demolition — non-percussive, live-asset ready.

**Intro text:**
> Hydrodemolition, robotic and diamond methods for water-utility refurbishment. Selective concrete removal that leaves the rebar intact and the surrounding asset operational.
>
> AMP8 (2025–2030) is the largest UK water investment cycle in history. Most of it is refurbishment, not greenfield — where the method makes or breaks the programme.
>
> Method definition at scope-development stage is where the savings sit. Bring us in early.

**CTA:** See how

**Destination URL:** `https://www.gnatuk.com/industries/water?utm_source=linkedin&utm_medium=cpc&utm_campaign=amp8-water&utm_content=method-definition`

**Image:** `DeepSeaJetty-PageImage.jpg` (rebar emerging clean from selective hydro work — the AMP8 visual story)

### Ad 3 — Heritage / listed buildings (LinkedIn Sponsored Content)

**Headline:** Listed-building demolition — preserve what stays.

**Intro text:**
> Grade I, Grade II and Grade II* schemes. Diamond wire-sawing and robotic methods that discriminate at millimetre tolerance between the original fabric (which stays) and the later interventions (which come out cleanly).
>
> Recent: Bank of England vault, listed industrial heritage, converted Georgian shells. We work the conservation-officer regime the way it's written — not against it.

**CTA:** See projects

**Destination URL:** `https://www.gnatuk.com/industries/heritage?utm_source=linkedin&utm_medium=cpc&utm_campaign=heritage&utm_content=listed-buildings`

**Image:** `heritage-facade-retention.jpg` (yellow Brokk inside the partially-demolished heritage building)

### Ad 4 — Meta retargeting (run once Pixel has 30 days of data)

**Headline:** Brief that needs a specialist eye?

**Intro text:**
> Specialist demolition for the schemes most contractors won't quote on. Robotic, hydrodemolition, diamond cutting, cold cutting. UK-wide.
>
> 40 years. Full Tier-1 pre-qual. Talk to a specialist, not a salesperson.

**CTA:** Get in touch

**Destination URL:** `https://www.gnatuk.com/contact?utm_source=meta&utm_medium=cpc&utm_campaign=retargeting&utm_content=method-led`

**Image options (carousel):**
- `Friday (7)yellow.jpg` (wide refinery + GnatUK van)
- `cold-cutting-pressure-vessel.jpg` (scaffolding + vessel under cold cutting)
- `Nalta-Concrete-Removal.jpg` (NALTA hydro on rebar)
- `chromium-kiln-debricking-elementis` hero (Elementis exterior)

---

## Audience targeting

### LinkedIn — Ad set "Tier-1 procurement"
- **Job titles:** Procurement Manager, Senior Procurement Manager, Category Manager, Senior Buyer, Buyer, Supply Chain Manager, Pre-construction Manager
- **Industries:** Construction, Civil Engineering, Architecture & Planning
- **Company size:** 1000+ employees
- **Companies (named target list):** Costain, Galliford Try, Balfour Beatty, Kier, Skanska UK, Bowmer + Kirkland, Bouygues UK, Morgan Sindall, BAM Nuttall, Lendlease, McLaren Group, Vinci Construction UK, Mace, ISG, Wates, Sir Robert McAlpine, John Sisk & Son, Multiplex
- **Geo:** United Kingdom + Ireland

### LinkedIn — Ad set "Sector specialists" (AMP8)
- **Job titles:** Project Manager, Senior Project Manager, Project Engineer, Design Engineer, Operations Director, Engineering Manager
- **Industries:** Utilities, Water Supply, Civil Engineering
- **Companies:** Anglian Water, Severn Trent, Thames Water, Yorkshire Water, Northumbrian Water, United Utilities, Welsh Water, Wessex Water, Southern Water, Affinity Water, MWH Treatment, Costain (AMP framework), Galliford Try (AMP framework)
- **Geo:** United Kingdom

### LinkedIn — Ad set "Heritage / listed"
- **Job titles:** Conservation Officer, Heritage Consultant, Architect (Senior, Director), Principal Designer, Pre-construction Manager, Quantity Surveyor (heritage)
- **Industries:** Architecture & Planning, Civic & Social Organization, Construction
- **Geo:** United Kingdom (focus London + South-East where most listed schemes sit)

### Meta — Retargeting ad set
- **Custom Audience:** website visitors past 30 days (Pixel-driven, auto-built)
- **Custom Audience:** customer list upload (Lookalike 1%)
- **Geo:** United Kingdom

### Meta — Cold prospecting ad set (only after Pixel has 60 days data)
- **Lookalike 1%** of `Lead` event triggerers (highest-quality seed)
- **Interest layer:** Construction, Industrial demolition, Civil engineering
- **Geo:** UK
- **Behaviours:** Business decision-makers

---

## Budget allocation (first 30 days)

| Channel | Daily | Monthly | Why |
|---|---|---|---|
| LinkedIn — Tier-1 procurement | £10 | £300 | Highest-value audience; £100k+ wins justify the £8-15 CPC |
| LinkedIn — AMP8 sector | £5 | £150 | Sector targeting against named water-utility framework partners |
| LinkedIn — Heritage / listed | £2 | £60 | Smaller addressable audience, but very high-quality leads |
| Meta — Retargeting | £3 | £90 | Cheap; only people who've already visited |
| Meta — Lookalike (after 60d) | £5 | £150 | Switch on month 3 once Pixel has signal |
| **Total** | **~£20–25/day** | **~£600–750/mo** | |

Scale up the LinkedIn budgets on whichever ad set produces the lowest cost
per Lead event after week 2. Pause the others.

---

## Measurement — what success looks like

| Metric | First 30 days | After 90 days |
|---|---|---|
| LinkedIn CTR | 0.4-0.8% | 0.6-1.2% |
| LinkedIn cost per Lead | £80-150 | £40-90 |
| Meta retargeting CTR | 1.5-3% | 2-4% |
| Meta cost per Lead | £20-60 | £15-40 |
| Lead → qualified opportunity rate | 20-30% | 30-50% |
| Qualified opp → won rate | 10-25% | 15-30% |

A win in this industry is north of £50k revenue, often £200k+. A
blended customer acquisition cost up to £500 is healthy; up to £1000 is
defensible. Above that, reconsider.

---

## Operational notes

- **All ad URLs include UTMs.** Every form submission from a paid click will show the source/medium/campaign in Nick + Marc's email notification.
- **Pixel Lead events fire automatically** when the contact form succeeds — no further code needed.
- **LinkedIn conversion firing** depends on the `NEXT_PUBLIC_LINKEDIN_CONV_LEAD` env var being set. Without it, the form still submits but LinkedIn won't count it as a conversion.
- **GDPR posture:** Meta Pixel + LinkedIn Insight Tag both drop cookies. The privacy policy needs updating to declare them — happy to draft that addition when you're ready to spend money. Until then, you can run the trackers without consent banner only if no UK/EU visitor traffic is paid (i.e. organic-only). Once ads run, the banner becomes legally required.
- **Pixel ID + Partner ID added to Vercel env vars** = trackers go live on the next deploy. Both are public values (they're in client-side JS) so safe to mark "Not Sensitive".
