import type { PageDef } from '../registry';
import * as C from '@/components/land-freight/content';
import { HERO_HINTS, BANNER_HINTS, FAQ_HINTS, STEPS_HINTS, WHEN_HINTS, SOLUTIONS_HINTS, MARQUEE_HINTS } from './shared-hints';

export const LAND_FREIGHT: PageDef = {
  id: 'land-freight',
  label: 'Land Freight',
  path: '/land-freight',
  group: 'Services',
  sections: [
    { id: 'hero', label: 'Hero', defaults: C.LAND_HERO, hints: HERO_HINTS },
    { id: 'solutions', label: 'Land freight solutions', defaults: C.LAND_SOLUTIONS, hints: SOLUTIONS_HINTS },
    { id: 'when-to-choose', label: 'When to choose land freight', defaults: C.LAND_WHEN_TO_CHOOSE, hints: WHEN_HINTS },
    { id: 'coverage', label: 'Road freight coverage', defaults: C.LAND_COVERAGE, hints: { stops: { itemLabel: 'Coverage type' }, 'stops.*.blurb': { label: 'Text' }, 'stops.*.iconSrc': { kind: 'image', label: 'Icon' } } },
    { id: 'fleet', label: 'Our fleet', defaults: C.LAND_FLEET, hints: { trucks: { label: 'Truck types', itemLabel: 'Truck' }, 'trucks.*.features': { itemLabel: 'Feature' } } },
    { id: 'compliance', label: 'Compliance & customs', defaults: C.LAND_COMPLIANCE, hints: { sentences: { label: 'Paragraphs', itemLabel: 'Paragraph' } } },
    { id: 'what-we-move', label: 'What we move', defaults: C.LAND_WHAT_WE_MOVE, hints: { items: { itemLabel: 'Cargo type' }, 'items.*.label': { label: 'Name' } } },
    { id: 'banner', label: 'Project banner', defaults: C.LAND_BANNER, hints: BANNER_HINTS },
    { id: 'industries', label: 'Industries we serve', defaults: C.LAND_INDUSTRIES, hints: MARQUEE_HINTS },
    { id: 'border-crossings', label: 'Border crossings', defaults: C.LAND_BORDERS, hints: { rows: { label: 'Border crossings table', itemLabel: 'Row' }, contactLabel: { label: 'Button text' } } },
    { id: 'quote-steps', label: 'How a freight quote works', defaults: C.LAND_QUOTE_STEPS, hints: STEPS_HINTS },
    { id: 'tir', label: 'TIR transport', defaults: C.LAND_TIR, hints: { benefits: { label: 'Advantages', itemLabel: 'Advantage' }, chips: { label: 'Tags', itemLabel: 'Tag' }, whatTextBefore: { label: 'What is TIR? (before the highlight)', kind: 'textarea' }, whatHighlight: { label: 'Highlighted words' }, whatTextAfter: { label: 'What is TIR? (after the highlight)' } } },
    { id: 'cold-chain', label: 'Cold chain logistics', defaults: C.LAND_COLD_CHAIN, hints: { cards: { itemLabel: 'Card' }, suitable: { label: 'Suitable for', itemLabel: 'Item' } } },
    { id: 'faq', label: 'FAQs', defaults: C.LAND_FAQ, hints: FAQ_HINTS },
  ],
};
