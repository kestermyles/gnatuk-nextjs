'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export type FAQItem = { question: string; answer: string };

export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gnat-concrete border-y border-gnat-concrete">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-gnat-navy transition-colors hover:text-gnat-orange"
              >
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-7 w-7 flex-none items-center justify-center rounded-full border border-gnat-steel/40 text-gnat-steel-dark transition-transform',
                    isOpen && 'rotate-45 border-gnat-orange text-gnat-orange',
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-12 text-gnat-steel-dark"
            >
              <p className="leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
