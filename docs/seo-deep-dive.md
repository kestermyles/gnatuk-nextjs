# GNAT UK SEO deep dive — 15 May 2026

Audit covers structured data, on-page SEO, technical SEO, and content gaps.
Goal: build the SEO powerhouse Keith asked for.

## What's already strong (don't lose it)

- **Organization / LocalBusiness schema** in `components/Schema.tsx`:
  GeneralContractor with full UK address, three offices listed as `Place`,
  all 11 accreditations as `hasCredential`, sales `contactPoint`,
  `knowsAbout` of 14 specialist methods, `sameAs` to socials.
- **Service pages** each emit `ServiceSchema` + `FAQPageSchema`.
- **Blog posts** emit `ArticleSchema` with author + publisher + canonical.
- **Breadcrumbs** (visual + `BreadcrumbList` JSON-LD) on every internal page.
- **Gallery** has `ImageGallerySchema` with item count.
- **Sitemap** is dynamic, Sanity-driven, with sensible priorities.
- **robots.txt** correct — allow `/`, disallow `/api/`.
- **Canonicals, OG, Twitter cards** on every page-level metadata block.
- **`metadataBase`** set so relative OG paths resolve.
- **GTM-5RHLSCR** installed; analytics events typed.
- **Hreflang / `lang="en-GB"`** set on `<html>`.

## High-impact gaps (do these first)

### 1. No `WebSite` schema with `SearchAction`
Google rewards sites that declare an internal search with a **sitelinks
search box** in branded SERP results. SearchModal exists in
`components/SearchModal.tsx` but there's no JSON-LD pointer to it.

**Fix:** add `WebSiteSchema` emitted from `app/layout.tsx` alongside
`OrganizationSchema`. Maps the search input to a URL pattern.

**Effort:** ~10 lines, one new function in Schema.tsx.

### 2. No `Person` schema for authors → weakens E-E-A-T
Posts emit `Article` with `author.name` but no structured Person entity.
For Google's E-E-A-T scoring (Experience, Expertise, Authoritativeness,
Trustworthiness — heavily weighted for trade contractors), Nick's "40
years experience, MD" needs to be machine-readable. Right now it lives
only as prose in the `<AuthorBio>` component.

**Fix:** new `PersonSchema` component, emitted on each blog post page,
populated from Sanity author docs (which already have `blurb`, `role`).
Include `jobTitle`, `worksFor`, `knowsAbout`, `sameAs` (LinkedIn).

**Effort:** medium — new schema function + small schema field addition
on author in Sanity (LinkedIn URL field).

### 3. No per-post `ImageGallery` schema
Each blog post now has a carousel (just shipped) with up to 14 photos.
Currently those images render with alt text but no `ImageGallery`
JSON-LD. Result: invisible to Google Image Search.

**Fix:** emit a per-post `ImageGallery` (or array of `ImageObject`) from
`PostCarousel`, listing the photos with caption + contentUrl.

**Effort:** ~15 lines server-side; the data is already collected.

### 4. Missing default Open Graph image at root
`app/layout.tsx` has `openGraph` block but no `images` array. Pages that
don't override OG images (about 60% of current pages) share without a
preview image. Result: lower CTR from social and Slack-style previews.

**Fix:** add a default OG card image (1200x630) and reference it in the
root metadata. Brand-aware default that says "GNAT UK | Specialist
Demolition".

**Effort:** trivial code change; need a 1200x630 OG image file.

### 5. `/accreditations` has no FAQ → massive missed rich-result opportunity
People search "what is CHAS accredited?", "what does RISQS verified
mean?", "is X contractor NFDC certified?" — these are intent-rich
queries with low competition. FAQ schema on the accreditations page
would trigger the FAQ rich result in SERPs.

**Fix:** add ~8 FAQ items (one per major accreditation) to
`app/accreditations/page.tsx` with `FAQPageSchema`.

**Effort:** small code change + ~30 min writing the FAQ copy.

### 6. Three offices ranked as one entity
Currently `OrganizationSchema` has 3 offices in `location[]`. This is
correct *for the GeneralContractor*, but local searches like "demolition
contractor in Derby" don't see a distinct Derby entity to rank.

**Fix:** split into one `LocalBusiness` per office (Richmond, Derby,
Stevenage), each as its own JSON-LD entity with `@id`, address, area
served (regional), and `parentOrganization` pointing back to GNAT UK.

**Effort:** medium. Best paired with future local landing pages
(`/locations/derby`, etc.).

## Medium-impact gaps

### 7. `openingHoursSpecification` doesn't say "closed Sat/Sun"
Implicit closures are weaker than explicit ones. Google prefers a
weekly schedule that names all 7 days.

**Fix:** add a second spec block for Sat/Sun with `opens`/`closes` set
to the same time (or `validFrom`/`validThrough` omitted entirely).

**Effort:** 5 lines.

### 8. `sameAs` is missing LinkedIn
GNAT has Instagram and Facebook in `SITE.social`. No LinkedIn. Either
because the company doesn't have a LinkedIn presence (worth fixing
separately) or because Keith just hasn't added the URL.

**Action item for Keith:** is there a GNAT UK *company* LinkedIn page?
If so, send me the URL and I'll add it to `sameAs`.

### 9. Service pages don't mention UK regions
Every service page (`/hydrodemolition`, `/cold-cutting` etc.) is method-
focused with zero geographic anchoring. "Hydrodemolition contractor
Yorkshire" should win for a Richmond-based business; right now we're
not even competing for it.

**Fix:** add a paragraph to each service page explicitly listing the
counties/regions covered (e.g. "Working out of Richmond, Derby and
Stevenage, we deliver across Yorkshire, the Midlands, the North-East,
the South-East and the M1/M62/A1 corridors"). Mentioning the M-roads /
A-roads is a known infrastructure-SEO play.

### 10. `/case-studies` and `/insights` index pages have thin intros
Both have a single short paragraph as intro. These pages have authority
they're not using — they'd benefit from 200-300 words of intro copy
that ranks for "demolition case studies UK", "robotic demolition
methods", etc.

### 11. No industry content hubs
We slice content by **method** (robotic, hydro, diamond, cold) but not
by **industry**. There's no `/industries/water`, `/industries/refractory`,
`/industries/comah`, `/industries/heritage`. Each would group relevant
case studies, define industry-specific challenges, and rank for "AMP8
demolition contractor", "petrochemical COMAH demolition" etc.

This is the **single highest-leverage content investment** available —
demolition is a service that buyers source by industry context, not by
tool name. A buyer at Anglian Water doesn't type "robotic demolition";
they type "AMP8 specialist contractor" or "water industry concrete
removal".

**Effort:** significant — 5–6 new landing pages, each ~600 words. Best
as a 2-week content sprint with Nick.

## Lower-impact (nice to have)

- **Article schema** missing `wordCount`, `articleBody`, `inLanguage` —
  trivial to add, marginal benefit.
- **`mentions[]` in Article** for equipment models (Brokk 60, Aquajet,
  Hilti) — helps entity linking but probably noise at this scale.
- **Glossary page** (`/specialist-demolition-glossary`) — would rank
  for definitional queries ("what is stitch drilling?", "what is
  hydrodemolition?"). Defensible long-tail traffic.
- **`/our-process`** or methodology page — "method-led" is everywhere
  on the site but no canonical page explains it. Risk: another tab
  for users to bounce off.

## Quick-win batch (proposed for tonight)

These all fit inside an hour and ship as one commit while waiting for
Christine:

1. **WebSite schema with SearchAction** (gap #1)
2. **Default OG image** placeholder + wire-up (gap #4) — needs a 1200×630
   asset; can use the existing accreditations banner or a hero crop as
   a stopgap.
3. **`/accreditations` FAQ + schema** (gap #5) — I'll draft the 8
   questions; Keith reviews copy before publishing.
4. **Explicit Sat/Sun "closed"** (gap #7)
5. **Per-post `ImageGallery` schema in PostCarousel** (gap #3)

**Holding back for Keith to confirm first:**

- Person schema for authors (gap #2) — needs Nick's LinkedIn URL +
  decision on what credentials to surface
- LocalBusiness split per office (gap #6) — fine to do solo but pairs
  best with local landing pages, which is a content decision
- Industry content hubs (gap #11) — needs Nick's input on industries
  to prioritise

## Open items unrelated to schema/SEO

- **Contact form 502** — still blocked on Christine's DNS records
  (`send.send` → `send` rename) per the email I just drafted.
- **`FROM_EMAIL` underscore check in Vercel** — still pending eyeball.

---

**Recommendation:** Approve the quick-win batch and I'll ship it now.
Person schema + industry hubs are a separate conversation that's worth
having with Nick to get the substantive content right.
