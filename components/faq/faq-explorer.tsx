'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Minus, Plus } from 'lucide-react';
import { typo } from '@/components/ui copy/typography';
import type { FaqCategory } from './data';

/** Accordion for one category. Remounted (via `key`) on tab change so the first item re-opens. */
function FaqList({ category, panelId }: { category: FaqCategory; panelId: string }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ul className="divide-y divide-[#1b4332]/10 border-y border-[#1b4332]/10">
      {category.questions.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${panelId}-q${i}`;
        const bodyId = `${panelId}-a${i}`;

        return (
          <li key={item.q}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => toggle(i)}
                className="group flex w-full items-start gap-3 py-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-2 sm:items-center sm:gap-6 sm:py-6 lg:py-7"
              >
                <span className={`${typo.meta} mt-[3px] w-6 shrink-0 text-[#1b4332]/40 transition-colors group-hover:text-[#1b4332] sm:mt-0 sm:w-7`}>
                  {String(i + 1).padStart(2, '0')}.
                </span>

                <span className="flex-1 text-[15px] font-medium leading-snug tracking-tight text-[#1b4332] sm:text-[16px] lg:text-[18px]">
                  {item.q}
                </span>

                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 sm:h-9 sm:w-9 ${
                    isOpen
                      ? 'border-[#36B936] bg-[#36B936]/10 text-[#36B936]'
                      : 'border-[#1b4332]/15 text-[#2d6a4f] group-hover:border-[#1b4332]/40 group-hover:text-[#1b4332]'
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>

            {/* grid-rows 0fr -> 1fr animates height without measuring */}
            <div
              id={bodyId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[75ch] pb-6 ps-9 pe-10 text-[13px] font-normal leading-[1.7] text-[#2d6a4f] sm:pb-8 sm:ps-[3.25rem] sm:pe-14 sm:text-[14px] lg:text-[15px]">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function FaqExplorer({ categories }: { categories: FaqCategory[] }) {
  const uid = useId();
  const [activeId, setActiveId] = useState(categories[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const tabId = (id: string) => `${uid}-tab-${id}`;
  const panelId = `${uid}-panel`;

  const select = (index: number) => {
    const next = (index + categories.length) % categories.length;
    setActiveId(categories[next].id);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') select(index + 1);
    else if (e.key === 'ArrowLeft') select(index - 1);
    else if (e.key === 'Home') select(0);
    else if (e.key === 'End') select(categories.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      {/* Tabs: one scrollable row on mobile, wrapping on large screens */}
      <div className="sticky top-0 z-20 -mx-5 border-b border-[#1b4332]/10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 sm:-mx-8 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none">
        <div
          role="tablist"
          aria-label="FAQ categories"
          className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:px-8 lg:flex-wrap lg:overflow-visible lg:px-0 lg:py-0 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat, i) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={tabId(cat.id)}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(cat.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-[#36B936] bg-[#36B936] text-white shadow-sm'
                    : 'border-[#1b4332]/15 bg-white text-[#2d6a4f] hover:border-[#1b4332]/30 hover:text-[#1b4332]'
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={tabId(active.id)} className="mt-8 sm:mt-10 lg:mt-12">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 sm:mb-6">
          <h2 className={`${typo.subheading} text-[#1b4332]`}>{active.heading}</h2>
          <span className="text-[12px] font-medium text-[#2d6a4f]/70 sm:text-[12.5px]">
            {active.questions.length} {active.questions.length === 1 ? 'question' : 'questions'}
          </span>
        </div>

        <FaqList key={active.id} category={active} panelId={active.id} />
      </div>
    </div>
  );
}
