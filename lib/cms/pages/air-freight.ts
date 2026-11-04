import type { PageDef } from '../registry';
import * as C from '@/components/AirFreight/content';
import { HERO_HINTS, BANNER_HINTS, FAQ_HINTS, STEPS_HINTS, WHEN_HINTS, DELIVERY_HINTS, SOLUTIONS_HINTS, MARQUEE_HINTS } from './shared-hints';

export const AIR_FREIGHT: PageDef = {
  id: 'air-freight',
  label: 'Air Freight',
  path: '/air-freight',
  group: 'Services',
  sections: [
    { id: 'hero', label: 'Hero', defaults: C.AIR_HERO, hints: HERO_HINTS },
    { id: 'network', label: 'Global network', defaults: C.AIR_NETWORK, note: 'The animated route map stays as designed' },
    { id: 'solutions', label: 'Air freight solutions', defaults: C.AIR_SOLUTIONS, hints: SOLUTIONS_HINTS },
    { id: 'when-to-choose', label: 'When to choose air freight', defaults: C.AIR_WHEN_TO_CHOOSE, hints: WHEN_HINTS },
    { id: 'delivery-compliance', label: 'Delivery & compliance', defaults: C.AIR_DELIVERY, hints: DELIVERY_HINTS },
    { id: 'what-we-move', label: 'What we move', defaults: C.AIR_WHAT_WE_MOVE, hints: { items: { itemLabel: 'Cargo type' }, 'items.*.label': { label: 'Name' } } },
    { id: 'banner', label: 'Project banner', defaults: C.AIR_BANNER, hints: BANNER_HINTS },
    { id: 'industries', label: 'Industries we serve', defaults: C.AIR_INDUSTRIES, hints: MARQUEE_HINTS },
    { id: 'quote-steps', label: 'How a freight quote works', defaults: C.AIR_QUOTE_STEPS, hints: STEPS_HINTS },
    { id: 'value-added', label: 'Value-added services', defaults: C.AIR_VALUE_ADDED, hints: { items: { label: 'Services', itemLabel: 'Service' }, buttonLabel: { label: 'Button text' }, contactLabel: { label: 'Contact link text' } } },
    { id: 'weight-dimensions', label: 'Weight & dimension guidelines', defaults: C.AIR_WEIGHTS, hints: { notes: { label: 'Guidelines', itemLabel: 'Guideline' }, buttonLabel: { label: 'Button text' }, contactLabel: { label: 'Contact link text' } } },
    { id: 'faq', label: 'FAQs', defaults: C.AIR_FAQ, hints: FAQ_HINTS },
  ],
};
