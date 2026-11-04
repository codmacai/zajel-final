import type { PageDef } from '../registry';
import * as C from '@/components/international/content';
import { CTA_HINTS, FAQ_HINTS, HERO_HINTS } from './shared-hints';

export const INTERNATIONAL_COURIER: PageDef = {
  id: 'international-courier',
  label: 'International Courier',
  path: '/international-courier',
  group: 'Services',
  sections: [
    { id: 'hero', label: 'Hero', defaults: C.INTERNATIONAL_HERO, hints: HERO_HINTS },
    { id: 'two-ways', label: 'Two ways to ship', defaults: C.INTERNATIONAL_TWO_WAYS, hints: { data: { label: 'Content' } } },
    { id: 'why', label: 'Why ship internationally', defaults: C.INTERNATIONAL_WHY, hints: { cards: { itemLabel: 'Card', fixed: true, help: 'Each card keeps its icon.' } } },
    { id: 'shipping-times', label: 'Shipping times', defaults: C.INTERNATIONAL_TIMES, hints: { bannerImageSrc: { kind: 'image', label: 'Banner image' }, bannerImageAlt: { label: 'Banner image description' }, days: { label: 'Transit time' } } },
    { id: 'customs-guide', label: 'Customs duty guide', defaults: C.INTERNATIONAL_CUSTOMS },
    { id: 'faq', label: 'FAQs', defaults: C.INTERNATIONAL_FAQ, hints: FAQ_HINTS },
    { id: 'cta', label: 'Bottom banner', defaults: C.INTERNATIONAL_CTA, hints: CTA_HINTS },
  ],
};
