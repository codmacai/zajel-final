import type { PageDef } from '../registry';
import { CONTENT } from '@/components/career/shared/content';
import { CAREERS_JOBS } from '@/components/career/job-openings/data';
import { CAREERS_LIFE } from '@/components/career/life-at-zajel';

export const CAREERS: PageDef = {
  id: 'careers',
  label: 'Careers',
  path: '/careers',
  group: 'Company',
  sections: [
    { id: 'hero', label: 'Hero', defaults: CONTENT.careers_hero.en, hints: { title: { kind: 'textarea', help: 'Press Enter to start a new line' }, image_url: { kind: 'image', label: 'Image', help: 'Leave empty to use the standard photo' } } },
    { id: 'values', label: 'Our values', defaults: CONTENT.careers_values.en, hints: { heading: { kind: 'textarea' }, values: { itemLabel: 'Value', fixed: true, help: 'Exactly six, to match the six icons' } } },
    { id: 'life', label: 'Life at Zajel', defaults: CAREERS_LIFE, hints: { photos: { label: 'Photos' } } },
    { id: 'benefits', label: 'Benefits', defaults: CONTENT.careers_benefits.en },
    { id: 'jobs', label: 'Job openings', defaults: CAREERS_JOBS, hints: { jobs: { itemLabel: 'Job', allowEmpty: true, help: 'With no jobs, this section is hidden from the page' }, 'jobs.*.href': { label: 'Apply link', help: 'A page, or mailto:email@zajel.ae' }, buttonLabel: { label: 'Apply button text' } } },
  ],
};
