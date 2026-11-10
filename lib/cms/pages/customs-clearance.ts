import type { PageDef } from '../registry';
import * as C from '@/components/customs-clearance/content';
import { serviceHeroData } from '@/components/sections/ServiceHero/serviceHeroData';
import { FAQ_HINTS, MARQUEE_HINTS, SERVICE_HERO_HINTS, STEPS_HINTS } from './shared-hints';

export const CUSTOMS_CLEARANCE: PageDef = {
  id: 'customs-clearance',
  label: 'Customs Clearance',
  path: '/customs-clearance',
  group: 'Services',
  sections: [
    { id: 'hero', label: 'Hero', defaults: serviceHeroData.customs, hints: SERVICE_HERO_HINTS },
    { id: 'services', label: 'Clearance services', defaults: C.CUSTOMS_SERVICES, hints: { cards: { itemLabel: 'Card' } } },
    { id: 'locations', label: 'Ports, airports & free zones', defaults: C.CUSTOMS_LOCATIONS, hints: { groups: { itemLabel: 'Group' }, freeZoneNote: { label: 'Free zone note' } } },
    { id: 'documents', label: 'Documentation & compliance', defaults: C.CUSTOMS_DOCUMENTS, hints: { columns: { itemLabel: 'Column' }, 'columns.*.body.kind': { hidden: true } } },
    { id: 'how-it-works', label: 'How clearance works', defaults: C.CUSTOMS_STEPS, hints: { ...STEPS_HINTS, timelineRows: { label: 'Clearance timelines', itemLabel: 'Row' }, timelineLabel: { label: 'Timeline table title' } } },
    { id: 'industries', label: 'Industries we serve', defaults: C.CUSTOMS_INDUSTRIES, hints: MARQUEE_HINTS },
    { id: 'faq', label: 'FAQs', defaults: C.CUSTOMS_FAQ, hints: FAQ_HINTS },
  ],
};
