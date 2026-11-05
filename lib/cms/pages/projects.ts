import type { PageDef } from '../registry';
import { PROJECT_LIST } from '@/components/project-logistics/data';
import { PROJECTS_HERO } from '@/components/project-logistics/project-logistics-hero';
import { HERO_HINTS } from './shared-hints';

export const PROJECTS: PageDef = {
  id: 'projects',
  label: 'Projects',
  path: '/projects',
  group: 'Company',
  sections: [
    { id: 'hero', label: 'Hero', defaults: PROJECTS_HERO, hints: HERO_HINTS },
    {
      id: 'list',
      label: 'Projects',
      defaults: PROJECT_LIST,
      note: 'Also shown on the home page (first three)',
      hints: { projects: { itemLabel: 'Project' }, 'projects.*.place': { label: 'Place' }, 'projects.*.caption': { kind: 'textarea' }, 'projects.*.alt': { label: 'Image description' } },
    },
  ],
};
