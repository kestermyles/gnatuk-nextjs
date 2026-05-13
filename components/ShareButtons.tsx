'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

type ShareButtonsProps = {
  /** Full absolute URL of the page to share. */
  url: string;
  /** Headline of the piece — used as the share title and email subject. */
  title: string;
};

const buttonClass =
  'inline-flex items-center gap-2 rounded border border-gnat-concrete bg-white px-3 py-2 text-sm font-semibold text-gnat-navy transition hover:border-gnat-orange/50 hover:text-gnat-orange';

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const emailSubject = encodeURIComponent(`Worth a read: ${title}`);
  const emailBody = encodeURIComponent(`Thought you might find this useful — ${title}\n\n${url}`);

  function shareNative() {
    track({ event: 'cta_click', cta_label: 'share_native', cta_destination: url, cta_location: 'share_buttons' });
    if (typeof navigator !== 'undefined' && navigator.share) {
      void navigator.share({ title, url }).catch(() => {
        /* user cancelled — no action */
      });
    }
  }

  function copyLink() {
    track({ event: 'cta_click', cta_label: 'share_copy_link', cta_destination: url, cta_location: 'share_buttons' });
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    void navigator.clipboard.writeText(url).then(() => {
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
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logShare('linkedin')}
          className={buttonClass}
          aria-label="Share on LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logShare('twitter')}
          className={buttonClass}
          aria-label="Share on X"
        >
          X / Twitter
        </a>
        <a
          href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
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
