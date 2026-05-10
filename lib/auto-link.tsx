import Link from 'next/link';
import type { ReactNode } from 'react';

// Service-keyword auto-linking. Wraps the FIRST occurrence of each pattern in
// a piece of text with a link to the relevant service page. This builds internal
// link equity, helps Google understand topical clustering, and gives readers a
// natural path from a story into the service that delivers it.

type LinkRule = {
  // Word-boundary regex. Use a NON-CAPTURING group for the inner pattern.
  pattern: RegExp;
  href: string;
  // Display text override (otherwise uses the matched substring).
  label?: string;
};

const RULES: LinkRule[] = [
  // Order matters — more specific patterns first so they win over generic ones.
  { pattern: /\bhydrodemolition\b/i, href: '/hydrodemolition' },
  { pattern: /\b(?:hydroblasting|hydro[\s-]?demolition|hydro[\s-]?blasting)\b/i, href: '/hydrodemolition' },
  { pattern: /\bdiamond (?:drilling|sawing|wire (?:saw|sawing))\b/i, href: '/diamond-drilling' },
  { pattern: /\bwire saw(?:ing)?\b/i, href: '/diamond-drilling' },
  { pattern: /\bstitch drilling\b/i, href: '/diamond-drilling' },
  { pattern: /\bcold[-\s]?cutting\b/i, href: '/cold-cutting' },
  { pattern: /\babrasive (?:water[-\s]?jet|cold) cutting\b/i, href: '/cold-cutting' },
  { pattern: /\brobotic demolition\b/i, href: '/robotic-demolition' },
  { pattern: /\bbrokk(?:\s+\d+(?:\s+(?:diesel|electric))?)?\b/i, href: '/machine-hire' },
  { pattern: /\bhusqvarna(?:\s+\w+)?\b/i, href: '/machine-hire' },
  { pattern: /\baquajet(?:\s+\w+)?\b/i, href: '/hydrodemolition' },
];

/**
 * Returns a React node for a paragraph string, with the FIRST occurrence of each
 * service keyword wrapped in a Link to the relevant service page.
 *
 * Only one match per rule per paragraph (avoids over-linking the same word).
 */
export function autoLinkText(text: string): ReactNode {
  // Find the earliest match across all rules, take it, recurse on the remainder.
  // Track which rules have already been used in this call.
  const usedRules = new Set<number>();

  function process(input: string): ReactNode[] {
    const matches: Array<{ index: number; match: string; rule: LinkRule; ruleIdx: number }> = [];
    for (let i = 0; i < RULES.length; i++) {
      if (usedRules.has(i)) continue;
      const rule = RULES[i];
      const m = input.match(rule.pattern);
      if (m && m.index !== undefined) {
        matches.push({ index: m.index, match: m[0], rule, ruleIdx: i });
      }
    }
    if (matches.length === 0) return [input];

    // Take earliest match (left-most wins).
    matches.sort((a, b) => a.index - b.index);
    const first = matches[0];
    usedRules.add(first.ruleIdx);

    const before = input.slice(0, first.index);
    const after = input.slice(first.index + first.match.length);

    return [
      before,
      <Link
        key={`al-${first.ruleIdx}-${first.index}`}
        href={first.rule.href}
        className="font-semibold text-gnat-navy underline decoration-gnat-orange/40 underline-offset-2 transition-colors hover:text-gnat-orange hover:decoration-gnat-orange"
      >
        {first.rule.label ?? first.match}
      </Link>,
      ...process(after),
    ];
  }

  return process(text);
}
