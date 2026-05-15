// Lightweight GTM dataLayer helper.
//
// All conversion-adjacent interactions push a typed event so GA4 / GTM can build
// real funnels (CTA click → form view → form submission → reply received).
// Adding a new event = adding a new entry to AnalyticsEvent and calling track().

export type AnalyticsEvent =
  | { event: 'cta_click'; cta_label: string; cta_destination: string; cta_location: string }
  | { event: 'phone_click'; phone_location: string }
  | { event: 'gallery_image_open'; gallery_tag: string; gallery_image_index: number }
  | { event: 'gallery_filter_change'; gallery_tag: string }
  | { event: 'post_carousel_open'; post_slug: string; carousel_image_index: number }
  | { event: 'social_outbound'; social_network: string; social_location: string }
  | { event: 'form_submission'; form_type: string; service?: string };

type DataLayerWindow = Window & { dataLayer?: unknown[] };

export function track(payload: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  // dataLayer is set up by the GTM snippet in app/layout.tsx
  const dl = (window as DataLayerWindow).dataLayer;
  if (!dl) return;
  dl.push(payload);
}
