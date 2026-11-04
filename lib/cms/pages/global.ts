import type { PageDef } from '../registry';
import { NAVIGATION } from '@/data/navigation';
import { FOOTER } from '@/components/footer-content';

const MENU_ITEM_HINTS = {
  name: { label: 'Name' },
  desc: { label: 'Short description' },
  path: { label: 'Link' },
  badge: { label: 'Badge', help: 'Optional, for example New' },
} as const;

export const GLOBAL: PageDef = {
  id: 'global',
  label: 'Menu & footer',
  path: null,
  group: 'Site-wide',
  sections: [
    {
      id: 'navigation',
      label: 'Navigation menu',
      note: 'The menu at the top of every page, on desktop and phones',
      defaults: NAVIGATION,
      hints: {
        labels: { label: 'Menu names' },
        'labels.quote': { label: 'Get a Quote button' },
        solutions: { label: 'Solutions menu', itemLabel: 'Column', fixed: true },
        'solutions.*.label': { label: 'Name' },
        'solutions.*.columnLabel': { label: 'Column title' },
        'solutions.*.viewAllLabel': { label: '“View all” link text' },
        'solutions.*.path': { label: '“View all” link' },
        'solutions.*.highlight': { hidden: true },
        'solutions.*.items': { label: 'Links', itemLabel: 'Link' },
        ...Object.fromEntries(Object.entries(MENU_ITEM_HINTS).map(([k, v]) => [`solutions.*.items.*.${k}`, v])),
        about: { label: 'About Us menu', itemLabel: 'Link' },
        ...Object.fromEntries(Object.entries(MENU_ITEM_HINTS).map(([k, v]) => [`about.*.${k}`, v])),
        resources: { label: 'Resources menu', itemLabel: 'Link' },
        ...Object.fromEntries(Object.entries(MENU_ITEM_HINTS).map(([k, v]) => [`resources.*.${k}`, v])),
      },
    },
    {
      id: 'footer',
      label: 'Footer',
      note: 'The green footer at the bottom of every page',
      defaults: FOOTER,
      hints: {
        columns: { label: 'Link columns', itemLabel: 'Column' },
        'columns.*.links': { label: 'Links', itemLabel: 'Link' },
        'columns.*.links.*.external': { label: 'Opens in a new tab' },
        socials: { label: 'Social media', itemLabel: 'Profile', fixed: true, help: 'The icons stay as designed; change the links here.' },
        'socials.*.label': { label: 'Network' },
        'socials.*.href': { label: 'Profile link' },
        companyName: { label: 'Company name', help: 'In the copyright line' },
        legalLinks: { label: 'Bottom links', itemLabel: 'Link' },
      },
    },
  ],
};
