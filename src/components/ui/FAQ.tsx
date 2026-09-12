"use client";

import { track } from "@/lib/analytics";

export type FAQItem = { question: string; answer: string };

export function FAQ({ items }: { items: readonly FAQItem[] }) {
  return <div className="faq-list">{items.map((item) => <details key={item.question} onToggle={(event) => event.currentTarget.open && track("faq_open", { question: item.question })}>
    <summary>{item.question}<span>+</span></summary><p>{item.answer}</p>
  </details>)}</div>;
}
