import type { PageDef } from '../registry';
import * as C from '@/components/sea-freight/content';
import { HERO_HINTS, BANNER_HINTS, FAQ_HINTS, STEPS_HINTS, WHEN_HINTS, DELIVERY_HINTS, SOLUTIONS_HINTS, MARQUEE_HINTS } from './shared-hints';

export const SEA_FREIGHT: PageDef = {
  id: 'sea-freight',
  label: 'Sea Freight',
  path: '/sea-freight',
  group: 'Services',
  sections: [
    { id: 'hero', label: 'Hero', defaults: C.SEA_HERO, hints: HERO_HINTS },
    { id: 'solutions', label: 'Sea freight solutions', defaults: C.SEA_SOLUTIONS, hints: SOLUTIONS_HINTS },
    { id: 'when-to-choose', label: 'When to choose sea freight', defaults: C.SEA_WHEN_TO_CHOOSE, hints: WHEN_HINTS },
    { id: 'delivery-compliance', label: 'Delivery & compliance', defaults: C.SEA_DELIVERY, hints: DELIVERY_HINTS },
    { id: 'what-we-move', label: 'What we move', defaults: C.SEA_WHAT_WE_MOVE, hints: { items: { itemLabel: 'Cargo type' }, 'items.*.label': { label: 'Name' } } },
    { id: 'banner', label: 'Project banner', defaults: C.SEA_BANNER, hints: BANNER_HINTS },
    {
      id: 'vessels',
      label: 'Ocean cargo vessels',
      defaults: C.SEA_VESSELS,
      hints: { vessels: { itemLabel: 'Vessel' }, 'vessels.*.type': { hidden: true }, 'vessels.*.purpose': { kind: 'textarea' }, 'vessels.*.feature': { label: 'Key feature', kind: 'textarea' } },
    },
    {
      id: 'containers',
      label: 'Container guide',
      defaults: C.SEA_CONTAINERS,
      hints: {
        categories: { label: 'Container types', itemLabel: 'Type', fixed: true },
        'categories.*.entries': { label: 'Sizes', itemLabel: 'Size' },
        'categories.*.entries.*.size': { label: 'Size tab', kind: 'text' },
        'categories.*.entries.*.dims': { label: 'Dimensions' },
        'categories.*.entries.*.door': { label: 'Door opening' },
        'categories.*.entries.*.tare': { label: 'Tare weight' },
        'categories.*.entries.*.maxCargo': { label: 'Max payload' },
      },
    },
    { id: 'industries', label: 'Industries we serve', defaults: C.SEA_INDUSTRIES, hints: MARQUEE_HINTS },
    { id: 'quote-steps', label: 'How a freight quote works', defaults: C.SEA_QUOTE_STEPS, hints: STEPS_HINTS },
    {
      id: 'bonded-storage',
      label: 'Bonded warehouse storage',
      defaults: C.SEA_BONDED,
      hints: { items: { itemLabel: 'Row' }, contactHref: { label: 'Contact link' } },
    },
    { id: 'faq', label: 'FAQs', defaults: C.SEA_FAQ, hints: FAQ_HINTS },
  ],
};
