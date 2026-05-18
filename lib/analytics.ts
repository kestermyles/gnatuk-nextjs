// Unified analytics dispatcher.
//
// One call site (`track(...)`) writes to all the trackers that are present —
// GTM dataLayer (for GA4 + everything else), Meta Pixel (`fbq`), and
// LinkedIn Insight Tag (`lintrk`). Each platform is a no-op when its global
// isn't on the page (i.e. the relevant env var wasn't set in layout.tsx).
//
// Adding a new event = adding a new entry to AnalyticsEvent and updating
// the platform mappers below.

export type AnalyticsEvent =
  | { event: 'cta_click'; cta_label: string; cta_destination: string; cta_location: string }
  | { event: 'phone_click'; phone_location: string }
  | { event: 'gallery_image_open'; gallery_tag: string; gallery_image_index: number }
  | { event: 'gallery_filter_change'; gallery_tag: string }
  | { event: 'post_carousel_open'; post_slug: string; carousel_image_index: number }
  | { event: 'social_outbound'; social_network: string; social_location: string }
  | { event: 'form_submission'; form_type: string; service?: string };

type DataLayerWindow = Window & {
  dataLayer?: unknown[];
  fbq?: (action: 'track' | 'trackCustom', name: string, params?: Record<string, unknown>) => void;
  lintrk?: (action: 'track', params: { conversion_id: number | string }) => void;
};

// LinkedIn conversion IDs — env-driven. Each conversion needs to be created
// inside LinkedIn Campaign Manager (Account assets → Conversions) and the
// numeric ID dropped here as an env var. Without an ID the lintrk call is a
// no-op, so the code is safe to ship before the conversions are created.
const LINKEDIN_CONVERSIONS = {
  lead: process.env.NEXT_PUBLIC_LINKEDIN_CONV_LEAD,
  contact: process.env.NEXT_PUBLIC_LINKEDIN_CONV_CONTACT,
} as const;

function pushDataLayer(payload: AnalyticsEvent, w: DataLayerWindow): void {
  if (!w.dataLayer) return;
  w.dataLayer.push(payload);
}

function pushMetaPixel(payload: AnalyticsEvent, w: DataLayerWindow): void {
  if (!w.fbq) return;
  // Map our event names to Meta's standard events where possible — standard
  // events get better optimisation than custom ones in the Pixel.
  switch (payload.event) {
    case 'form_submission':
      w.fbq('track', 'Lead', {
        content_name: payload.form_type,
        content_category: payload.service ?? 'unspecified',
      });
      break;
    case 'phone_click':
      w.fbq('track', 'Contact', { content_name: 'phone', content_category: payload.phone_location });
      break;
    case 'cta_click':
      w.fbq('trackCustom', 'CTAClick', {
        cta_label: payload.cta_label,
        cta_destination: payload.cta_destination,
        cta_location: payload.cta_location,
      });
      break;
    case 'gallery_image_open':
    case 'gallery_filter_change':
    case 'post_carousel_open':
    case 'social_outbound':
      // Engagement signals — useful for retargeting audiences but not lead-worthy.
      w.fbq('trackCustom', payload.event, payload as unknown as Record<string, unknown>);
      break;
  }
}

function pushLinkedIn(payload: AnalyticsEvent, w: DataLayerWindow): void {
  if (!w.lintrk) return;
  switch (payload.event) {
    case 'form_submission':
      if (LINKEDIN_CONVERSIONS.lead) {
        w.lintrk('track', { conversion_id: LINKEDIN_CONVERSIONS.lead });
      }
      break;
    case 'phone_click':
      if (LINKEDIN_CONVERSIONS.contact) {
        w.lintrk('track', { conversion_id: LINKEDIN_CONVERSIONS.contact });
      }
      break;
  }
}

export function track(payload: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  const w = window as DataLayerWindow;
  pushDataLayer(payload, w);
  pushMetaPixel(payload, w);
  pushLinkedIn(payload, w);
}
