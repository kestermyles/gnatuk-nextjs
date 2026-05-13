'use client';

import { useEffect, useMemo, useState } from 'react';
import { track } from '@/lib/analytics';

type ShareButtonsProps = {
  /**
   * Fallback URL used during server rendering and for the initial paint.
   * At click time we always prefer window.location.href so the share goes to
   * whichever hostname the visitor is actually on — important before the
   * DNS cutover (gnatuk-nextjs.vercel.app) and after (www.gnatuk.com).
   */
  url: string;
  /** Headline of the piece — used as the share title and email subject. */
  title: string;
};

const buttonClass =
  'inline-flex items-center gap-2 rounded border border-gnat-concrete bg-white px-3 py-2 text-sm font-semibold text-gnat-navy transition hover:border-gnat-orange/50 hover:text-gnat-orange';

export function ShareButtons({ url: fallbackUrl, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  // Set on mount to the real URL the visitor is on; SSR uses the fallback.
  const [liveUrl, setLiveUrl] = useState(fallbackUrl);
  useEffect(() => {
    setLiveUrl(window.location.href);
  }, []);

  const { emailHref, linkedinHref, twitterHref } = useMemo(() => {
    const eu = encodeURIComponent(liveUrl);
    const et = encodeURIComponent(title);
    return {
      emailHref: `mailto:?subject=${encodeURIComponent(`Worth a read: ${title}`)}&body=${encodeURIComponent(`Thought you might find this useful — ${title}\n\n${liveUrl}`)}`,
      linkedinHref: `https://www.linkedin.com/sharing/share-offsite/?url=${eu}`,
      twitterHref: `https://x.com/intent/tweet?text=${et}&url=${eu}`,
    };
  }, [liveUrl, title]);

  function shareNative() {
    track({ event: 'cta_click', cta_label: 'share_native', cta_destination: liveUrl, cta_location: 'share_buttons' });
    if (typeof navigator !== 'undefined' && navigator.share) {
      void navigator.share({ title, url: liveUrl }).catch(() => {
        /* user cancelled — no action */
      });
    }
  }

  function copyLink() {
    track({ event: 'cta_click', cta_label: 'share_copy_link', cta_destination: liveUrl, cta_location: 'share_buttons' });
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    void navigator.clipboard.writeText(liveUrl).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }

  function logShare(network: string) {
    track({ event: 'social_outbound', social_network: network, social_location: 'share_buttons' });
  }

  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className="mt-12 border-t border-gnat-concrete pt-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-gnat-steel-dark">
        Share with a colleague
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {hasNativeShare && (
          <button type="button" onClick={shareNative} className={buttonClass}>
            Share…
          </button>
        )}
        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logShare('linkedin')}
          className={buttonClass}
          aria-label="Share on LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href={twitterHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logShare('twitter')}
          className={buttonClass}
          aria-label="Share on X"
        >
          X / Twitter
        </a>
        <a
          href={emailHref}
          onClick={() => logShare('email')}
          className={buttonClass}
          aria-label="Share by email"
        >
          Email
        </a>
        <button type="button" onClick={copyLink} className={buttonClass}>
          {copied ? 'Link copied ✓' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
