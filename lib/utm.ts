// UTM parameter capture.
//
// When a paid-ad visitor lands with ?utm_source=meta&utm_campaign=tier1-procurement,
// we want to persist those params so the eventual form submission can tell the team
// (and the Pixel / Insight Tag) which campaign delivered the lead.
//
// Strategy:
//   • First-touch: persisted to sessionStorage on first page load with UTMs
//   • Read on form submission and posted to /api/contact alongside the form data
//   • Resend email includes the UTM context so the team can see the source
//   • Meta + LinkedIn fire their conversion events natively; UTMs are
//     a separate channel for the human team
//
// We deliberately use sessionStorage (not a cookie) — no cross-session
// tracking, no GDPR consent banner required for this layer (the underlying
// Pixel + Insight Tag do require it; that's a separate gate).

const STORAGE_KEY = 'gnat_utm_v1';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid', // Google Ads click ID
  'fbclid', // Meta click ID
  'li_fat_id', // LinkedIn click ID
] as const;

export type UtmPayload = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing_path?: string;
  landing_referrer?: string;
  captured_at?: string;
};

/** Call on first client-side mount of any page that should capture UTMs. */
export function captureUtmsFromLocation(): UtmPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const captured: UtmPayload = {};
    let foundAny = false;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        captured[key] = value;
        foundAny = true;
      }
    }
    if (!foundAny) return readStoredUtms();
    captured.landing_path = window.location.pathname;
    captured.landing_referrer = document.referrer || undefined;
    captured.captured_at = new Date().toISOString();
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    return captured;
  } catch {
    return null;
  }
}

/** Read the persisted UTM payload for the current session. */
export function readStoredUtms(): UtmPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmPayload) : null;
  } catch {
    return null;
  }
}
