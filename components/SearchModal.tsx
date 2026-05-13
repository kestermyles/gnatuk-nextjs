'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';

type SearchEntry = {
  title: string;
  excerpt: string;
  body: string;
  href: string;
  type: 'service' | 'blog' | 'case-study' | 'insight' | 'page';
  date?: string;
};

type ScoredEntry = SearchEntry & { score: number };

const TYPE_LABEL: Record<SearchEntry['type'], string> = {
  service: 'Service',
  'case-study': 'Case study',
  insight: 'Insight',
  blog: 'Blog',
  page: 'Page',
};

const TYPE_COLOR: Record<SearchEntry['type'], string> = {
  service: 'bg-gnat-orange/10 text-gnat-orange',
  'case-study': 'bg-gnat-navy/10 text-gnat-navy',
  insight: 'bg-blue-100 text-blue-800',
  blog: 'bg-gnat-concrete text-gnat-steel-dark',
  page: 'bg-gnat-concrete text-gnat-steel-dark',
};

function scoreEntry(entry: SearchEntry, tokens: string[]): number {
  if (tokens.length === 0) return 0;
  const title = entry.title.toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  const body = entry.body.toLowerCase();
  let total = 0;
  for (const tok of tokens) {
    if (!tok) continue;
    if (title.includes(tok)) total += 10;
    if (excerpt.includes(tok)) total += 4;
    if (body.includes(tok)) total += 1;
    // Token start-of-title bonus
    if (title.startsWith(tok)) total += 5;
  }
  return total;
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load the index the first time the modal opens.
  useEffect(() => {
    if (!open || entries !== null || loading) return;
    setLoading(true);
    fetch('/api/search-index')
      .then((r) => r.json())
      .then((data: { entries: SearchEntry[] }) => {
        setEntries(data.entries);
      })
      .catch(() => {
        setEntries([]);
      })
      .finally(() => setLoading(false));
  }, [open, entries, loading]);

  // Focus input on open + escape to close + body scroll lock
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results: ScoredEntry[] =
    tokens.length === 0
      ? []
      : (entries ?? [])
          .map((e) => ({ ...e, score: scoreEntry(e, tokens) }))
          .filter((e) => e.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-12"
      role="dialog"
      aria-modal="true"
      aria-label="Search GNAT UK"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-gnat-concrete px-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="flex-none text-gnat-steel-dark"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, projects, insights, blog…"
            aria-label="Search query"
            className="w-full bg-transparent py-4 text-base text-gnat-navy placeholder:text-gnat-steel focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-8 w-8 flex-none items-center justify-center rounded text-gnat-steel-dark hover:bg-gnat-concrete-light"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {tokens.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-gnat-steel-dark">
              {loading ? 'Loading search…' : 'Start typing to search across services, case studies, insights and the blog.'}
            </p>
          )}

          {tokens.length > 0 && results.length === 0 && !loading && (
            <p className="px-4 py-8 text-center text-sm text-gnat-steel-dark">
              No results. Try a different keyword — or{' '}
              <Link href="/contact" onClick={onClose} className="font-semibold text-gnat-orange hover:underline">
                ask a specialist
              </Link>
              .
            </p>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-gnat-concrete">
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={() => {
                      track({
                        event: 'cta_click',
                        cta_label: r.title,
                        cta_destination: r.href,
                        cta_location: 'search_modal',
                      });
                      onClose();
                    }}
                    className="block px-4 py-3 transition hover:bg-gnat-concrete-light"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex-none rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${TYPE_COLOR[r.type]}`}
                      >
                        {TYPE_LABEL[r.type]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-semibold text-gnat-navy">
                          {r.title}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-sm text-gnat-steel-dark">
                          {r.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-gnat-concrete bg-gnat-concrete-light px-4 py-2 text-xs text-gnat-steel-dark">
          <kbd className="rounded border border-gnat-concrete bg-white px-1.5 py-0.5 text-[10px] font-semibold">Esc</kbd>{' '}
          to close
        </div>
      </div>
    </div>
  );
}
