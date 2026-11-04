// Field hints for the section designs that many pages share.
import type { Hints } from '../fields';

export const HERO_HINTS: Hints = {
  badge: { label: 'Badge', help: 'Small label above the title' },
  primaryCta: { label: 'Main button' },
  secondaryCta: { label: 'Second button' },
  'primaryCta.label': { label: 'Text' },
  'secondaryCta.label': { label: 'Text' },
  'primaryCta.url': { label: 'Link' },
  'secondaryCta.url': { label: 'Link' },
  image_url: { kind: 'image', label: 'Image' },
  button: { label: 'Button text' },
  ctaLink: { label: 'Button link', kind: 'link' },
};

export const BANNER_HINTS: Hints = {
  imageSrc: { kind: 'image', label: 'Image' },
  projectLabel: { label: 'Project name', help: 'Shown on the image' },
  ctaLabel: { label: 'Button text' },
  ctaHref: { label: 'Button link' },
};

export const FAQ_HINTS: Hints = {
  items: { label: 'Questions', itemLabel: 'Question' },
  'items.*.answer': { kind: 'textarea' },
};

export const STEPS_HINTS: Hints = {
  headingLine1: { label: 'Heading, line 1' },
  headingLine2: { label: 'Heading, line 2' },
  footnote: { label: 'Note under the steps' },
  steps: { itemLabel: 'Step' },
};

export const WHEN_HINTS: Hints = {
  image: { kind: 'image' },
  body: { label: 'Text', itemLabel: 'Part', help: 'The paragraph in parts; switch on “Emphasis” to show a part in bold green.' },
  'body.*.emphasis': { label: 'Emphasis' },
  alternatives: { label: 'Other options', itemLabel: 'Link' },
};

export const DELIVERY_HINTS: Hints = {
  delivery: { label: 'Delivery arrangement' },
  compliance: { label: 'Compliance & customs' },
  'delivery.baseImage': { kind: 'image', label: 'Background image' },
  'delivery.cutoutImage': { kind: 'image', label: 'Cut-out image' },
  'delivery.baseAlt': { label: 'Background image description' },
  'delivery.cutoutAlt': { label: 'Cut-out image description' },
  'delivery.ctaLabel': { label: 'Button text' },
  'delivery.ctaUrl': { label: 'Button link' },
  'delivery.note': { kind: 'textarea' },
  'compliance.sentences': { label: 'Paragraphs', itemLabel: 'Paragraph' },
};

export const SOLUTIONS_HINTS: Hints = {
  cards: { itemLabel: 'Card' },
  'cards.*.buttonLabel': { label: 'Button text' },
  'cards.*.buttonUrl': { label: 'Button link' },
};

export const MARQUEE_HINTS: Hints = {
  items: { label: 'Industries', itemLabel: 'Industry' },
};
