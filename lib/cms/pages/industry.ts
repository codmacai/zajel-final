import type { PageDef } from '../registry';
import * as C from '@/components/industry-expertise/content';
import { serviceHeroData } from '@/components/sections/ServiceHero/serviceHeroData';
import { CONTACT_BAND_HINTS, FAQ_HINTS, SERVICE_HERO_HINTS } from './shared-hints';

export const INDUSTRY: PageDef = {
  id: 'industry',
  label: 'Industries',
  path: '/industry',
  group: 'Company',
  sections: [
    { id: 'hero', label: 'Hero', defaults: serviceHeroData.industry, hints: SERVICE_HERO_HINTS },
    { id: 'expertise', label: 'Industry expertise', defaults: C.INDUSTRY_EXPERTISE, hints: { industries: { itemLabel: 'Industry' } } },
    { id: 'faq', label: 'FAQs', defaults: C.INDUSTRY_FAQ, hints: FAQ_HINTS },
    { id: 'contact', label: 'Contact band', defaults: C.INDUSTRY_CONTACT, hints: CONTACT_BAND_HINTS },
  ],
};
