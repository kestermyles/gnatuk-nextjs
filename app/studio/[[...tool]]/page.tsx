'use client';

/**
 * Embedded Sanity Studio mounted at /studio.
 *
 * Editors log in here to edit content. Studio is gated by Sanity's own
 * authentication (Google/GitHub/email — no separate user accounts needed
 * in this app).
 *
 * Disable indexing on this route via the layout below.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export const dynamic = 'force-static';

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  // Friendly setup screen when the project isn't yet configured. Avoids the
  // raw Sanity error and tells whoever's looking what's needed.
  if (!projectId) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f6f8',
          padding: '2rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: '#1a2332',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#ff6b35',
              margin: 0,
            }}
          >
            Studio not yet configured
          </p>
          <h1 style={{ marginTop: 12, fontSize: 28 }}>Sanity setup pending</h1>
          <p style={{ marginTop: 12, lineHeight: 1.6, color: '#5a6470' }}>
            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
            <code>NEXT_PUBLIC_SANITY_DATASET</code> as environment variables in
            Vercel, then redeploy. The Studio will then load here.
          </p>
          <p style={{ marginTop: 12, lineHeight: 1.6, color: '#5a6470' }}>
            Create a free project at{' '}
            <a
              href="https://www.sanity.io/manage"
              style={{ color: '#1a2332', fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              sanity.io/manage
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
