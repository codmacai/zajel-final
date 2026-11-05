import type { PageDef } from '../registry';
import * as C from '@/components/about/content';
import { CTA_HINTS } from './shared-hints';

export const ABOUT: PageDef = {
  id: 'about',
  label: 'About',
  path: '/about',
  group: 'Company',
  sections: [
    { id: 'hero', label: 'Hero', defaults: C.ABOUT_HERO },
    { id: 'story', label: 'Our story', defaults: C.ABOUT_STORY },
    { id: 'journey', label: 'Our journey', defaults: C.ABOUT_JOURNEY, hints: { stops: { label: 'Timeline', itemLabel: 'Year' }, 'stops.*.beats': { label: 'Milestones', itemLabel: 'Milestone' }, 'stops.*.isPresent': { label: 'This is today' } } },
    { id: 'mission-vision', label: 'Mission & vision', defaults: C.ABOUT_MISSION },
    { id: 'how-we-work', label: 'How we work', defaults: C.ABOUT_HOW_WE_WORK },
    { id: 'alliances', label: 'Global alliances', defaults: C.ABOUT_ALLIANCES },
    { id: 'environment', label: 'Environmental responsibility', defaults: C.ABOUT_ENVIRONMENT },
    { id: 'gallery', label: 'Facility gallery', defaults: C.ABOUT_GALLERY, hints: { photos: { itemLabel: 'Photo' } } },
    { id: 'app-download', label: 'App download banner', defaults: C.ABOUT_APP_DOWNLOAD, hints: { phoneImageSrc: { kind: 'image', label: 'App image (phones)' }, desktopImageSrc: { kind: 'image', label: 'App image (desktop)' } } },
    { id: 'documents', label: 'Company documents', defaults: C.ABOUT_DOCUMENTS, hints: { documents: { itemLabel: 'Document' }, 'documents.*.fileUrl': { kind: 'link', label: 'PDF file link' }, 'documents.*.theme': { hidden: true } } },
    { id: 'cta', label: 'Bottom banner', defaults: C.ABOUT_CTA, hints: CTA_HINTS },
  ],
};
