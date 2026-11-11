'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  text: string;
}

/** "On this page": the article's headings, with the one being read highlighted. */
export default function TableOfContents({ items, label }: { items: TocItem[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((h): h is HTMLElement => !!h);
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;
  return (
    <nav aria-label={label}>
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1b4332]/50">{label}</p>
      <ol className="space-y-1 border-s border-[#1b4332]/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={`-ms-px block border-s-2 py-1.5 ps-4 text-[13.5px] leading-snug transition-colors ${
                active === item.id ? 'border-[#36B936] font-medium text-[#1b4332]' : 'border-transparent text-[#1b4332]/55 hover:text-[#1b4332]'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
