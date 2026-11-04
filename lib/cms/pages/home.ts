import type { PageDef } from '../registry';
import {
  HOME_APP_DOWNLOAD,
  HOME_CERTIFICATIONS,
  HOME_FILM,
  HOME_HERO,
  HOME_NEWS,
  HOME_PROJECTS,
  HOME_SERVICES,
  HOME_ZAJEL_NOW,
} from '@/components/home/content';
import { whyChooseUsContent } from '@/data/whyChooseUs';
import { howItWorksContent } from '@/data/howItWorks';

export const HOME: PageDef = {
  id: 'home',
  label: 'Home',
  path: '/',
  group: 'Main',
  sections: [
    {
      id: 'hero',
      label: 'Hero',
      defaults: HOME_HERO,
      hints: {
        trackPlaceholderMobile: { label: 'Track box hint (phones)' },
        trackPlaceholder: { label: 'Track box hint' },
        trackLabel: { label: 'Track box label' },
        trackButton: { label: 'Track button' },
        actions: { label: 'Quick actions', itemLabel: 'Action', fixed: true, help: 'The row of shortcuts under the banner. Icons stay as designed.' },
        'actions.*.sublabel': { label: 'Second line' },
      },
    },
    {
      id: 'services',
      label: 'Our services',
      defaults: HOME_SERVICES,
      hints: {
        categories: { label: 'Service columns', itemLabel: 'Column', fixed: true },
        'categories.*.accent': { hidden: true },
        'categories.*.accentTint': { hidden: true },
        'categories.*.path': { label: 'Page link' },
        'categories.*.ctaLabel': { label: 'Button text' },
        'categories.*.subServices': { label: 'Services listed', itemLabel: 'Service' },
      },
    },
    {
      id: 'film',
      label: 'Brand film',
      defaults: HOME_FILM,
      hints: {
        videoDesktop: { kind: 'link', label: 'Video file (desktop, MP4)' },
        videoMobile: { kind: 'link', label: 'Video file (phones, MP4)' },
        poster: { kind: 'image', label: 'Poster image', help: 'Shown before the film plays' },
        videoLabel: { label: 'Film name (for screen readers)' },
      },
    },
    {
      id: 'why-choose-us',
      label: 'Why Zajel',
      defaults: whyChooseUsContent,
      hints: {
        'tracking.badgeText': { label: 'Badge' },
        government: { label: 'Government & legal card' },
        experience: { label: 'Years of experience card' },
        shipments: { label: 'Shipments delivered card' },
      },
    },
    {
      id: 'how-it-works',
      label: 'How it works',
      defaults: howItWorksContent,
      hints: { steps: { itemLabel: 'Step' }, 'steps.*.imageUrl': { kind: 'image', label: 'Image' } },
    },
    { id: 'zajel-now', label: 'Zajel Now banner', defaults: HOME_ZAJEL_NOW, hints: { highlight: { label: 'Highlighted words', help: 'Shown in green after the text' } } },
    {
      id: 'news',
      label: 'Latest news',
      defaults: HOME_NEWS,
      hints: {
        articles: { itemLabel: 'Article' },
        'articles.*.accent': { kind: 'color', label: 'Dot colour' },
        'articles.*.date': { kind: 'text' },
      },
    },
    {
      id: 'app-download',
      label: 'App download banner',
      defaults: HOME_APP_DOWNLOAD,
      hints: {
        phoneImageSrc: { kind: 'image', label: 'App screenshot (phones)' },
        desktopImageSrc: { kind: 'image', label: 'App screenshot (desktop)' },
        appStoreUrl: { label: 'App Store link' },
        playStoreUrl: { label: 'Google Play link' },
      },
    },
    {
      id: 'certifications',
      label: 'Certifications',
      defaults: HOME_CERTIFICATIONS,
      hints: { logos: { itemLabel: 'Logo' }, 'logos.*.name': { label: 'Name', help: 'Read by screen readers' }, 'logos.*.logo': { kind: 'image', label: 'Logo' } },
    },
    {
      id: 'projects',
      label: 'Featured projects',
      defaults: HOME_PROJECTS,
      note: 'Shows the first three projects from the Projects page',
    },
  ],
};
