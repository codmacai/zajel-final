// How each field of a section is edited, worked out from its name and built-in value.
// A section can override any of this with hints (see cms/registry.ts).

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'image'
  | 'link'
  | 'number'
  | 'toggle'
  | 'color'
  | 'date'
  | 'select'
  | 'slug'
  | 'list'
  | 'group';

export interface FieldHint {
  label?: string;
  help?: string;
  kind?: FieldKind;
  /** Keep the field out of the editor (it keeps its built-in value). */
  hidden?: boolean;
  /** For lists: the number of items can't change (the design needs exactly this many). */
  fixed?: boolean;
  /** For lists: what one item is called, e.g. "Question". */
  itemLabel?: string;
  /** For lists: may have no items (the design shows nothing, or a message). */
  allowEmpty?: boolean;
  /** For images and dates: may be left empty. */
  optional?: boolean;
  /** For select fields: the choices. */
  options?: string[];
  /** For slug fields: what comes before it in the address, e.g. "/events/". */
  prefix?: string;
}

/** Hints by field path, with * for list positions, e.g. { "items.*.icon": { hidden: true } }. */
export type Hints = Record<string, FieldHint>;

export const pattern = (path: string) => path.replace(/\.\d+(?=\.|$)/g, '.*').replace(/^\d+(?=\.|$)/, '*');

const IMAGE_KEY = /(image|img|src|photo|picture|logo|thumbnail|thumb|poster|background|avatar|cover|screenshot|mockup)/i;
const IMAGE_VALUE = /^(\/|https?:\/\/).*\.(png|jpe?g|webp|avif|gif|svg)(\?.*)?$/i;
const LINK_KEY = /(^|_)(url|href|link|path|to)$|(Url|Href|Link|Path)$/;
const LINK_VALUE = /^(\/[^\s]*|https?:\/\/\S+|mailto:\S+|tel:\S+|#\S*)$/;
const HIDDEN_KEY = /^(id|key|slug|_id|icon|iconName|iconKey|variant|layout|className|tone|theme|align|position|size|type_id)$|(Id|Key)$/;

export function inferKind(key: string, value: unknown): FieldKind | 'hidden' {
  if (HIDDEN_KEY.test(key)) return 'hidden';
  if (typeof value === 'boolean') return 'toggle';
  if (typeof value === 'number') return 'number';
  if (Array.isArray(value)) return 'list';
  if (value !== null && typeof value === 'object') return 'group';
  const s = typeof value === 'string' ? value : '';
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(s)) return 'color';
  if (IMAGE_VALUE.test(s) || (IMAGE_KEY.test(key) && !/alt|caption|label|title/i.test(key) && (s === '' || /^(\/|https?:)/.test(s)))) return 'image';
  if (LINK_KEY.test(key) || (s !== '' && LINK_VALUE.test(s))) return 'link';
  if (s.length > 90 || s.includes('\n')) return 'textarea';
  return 'text';
}

/** Text that is language: shown in both English and Arabic. */
export const isTranslatable = (kind: FieldKind) => kind === 'text' || kind === 'textarea';

const LABELS: Record<string, string> = {
  titleLine1: 'Title, line 1',
  titleLine2: 'Title, line 2',
  primaryCta: 'Main button',
  secondaryCta: 'Second button',
  cta: 'Button',
  ctas: 'Buttons',
  ctaLabel: 'Button text',
  ctaHref: 'Button link',
  buttonLabel: 'Button text',
  buttonText: 'Button text',
  buttonHref: 'Button link',
  imageAlt: 'Image description',
  alt: 'Image description',
  image_url: 'Image',
  imageUrl: 'Image',
  imageSrc: 'Image',
  src: 'Image',
  href: 'Link',
  url: 'Link',
  desc: 'Description',
  eyebrow: 'Eyebrow',
  subheading: 'Subheading',
  faqs: 'Questions',
  items: 'Items',
  statValue: 'Number',
  statSuffix: 'After the number',
};

const HELP: Record<string, string> = {
  eyebrow: 'Small label above the heading',
  badge: 'Small label above the title',
  imageAlt: 'Describes the image for screen readers and Google',
  alt: 'Describes the image for screen readers and Google',
  titleLine2: 'Shown in green',
  statSuffix: 'For example + or M+',
};

export function labelFor(key: string): string {
  if (LABELS[key]) return LABELS[key];
  if (/^\d+$/.test(key)) return `Item ${Number(key) + 1}`;
  const words = key
    .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\bcta\b/g, 'button')
    .replace(/\bdesc\b/g, 'description')
    .replace(/\bimg\b/g, 'image')
    .replace(/\b(url|href)\b/g, 'link')
    .replace(/\bfaq(s?)\b/g, 'FAQ$1');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export const helpFor = (key: string): string | undefined => HELP[key];

const TITLE_KEYS = ['title', 'name', 'question', 'label', 'heading', 'text', 'city', 'country', 'value', 'role'];

/** A short name for a list item, from its first title-like text. */
export function itemTitle(item: unknown, index: number): string {
  if (typeof item === 'string') return item || `Item ${index + 1}`;
  if (item && typeof item === 'object') {
    const o = item as Record<string, unknown>;
    for (const k of TITLE_KEYS) if (typeof o[k] === 'string' && o[k]) return o[k] as string;
    for (const v of Object.values(o)) if (typeof v === 'string' && v && !/^(\/|https?:|#)/.test(v)) return v;
  }
  return `Item ${index + 1}`;
}

/** Resolves how one field is edited, applying the section's hints. */
export type ResolvedField = ReturnType<typeof resolveField>;

export function resolveField(path: string, key: string, value: unknown, hints: Hints = {}) {
  const hint = hints[pattern(path)] ?? {};
  const inferred = inferKind(key, value);
  const hidden = hint.hidden ?? (inferred === 'hidden' && !hint.kind);
  const kind: FieldKind = hint.kind ?? (inferred === 'hidden' ? 'text' : inferred);
  return {
    kind,
    hidden,
    label: hint.label ?? labelFor(key),
    help: hint.help ?? helpFor(key),
    fixed: hint.fixed ?? false,
    itemLabel: hint.itemLabel,
    allowEmpty: hint.allowEmpty ?? false,
    optional: hint.optional ?? false,
    options: hint.options,
    prefix: hint.prefix,
  };
}

/** Paths of every Arabic-translatable text field in the content. */
export function translatablePaths(content: unknown, hints: Hints = {}, prefix = '', key = ''): string[] {
  if (typeof content === 'string') {
    if (!prefix) return [];
    const f = resolveField(prefix, key, content, hints);
    return !f.hidden && isTranslatable(f.kind) ? [prefix] : [];
  }
  if (Array.isArray(content)) {
    const f = prefix ? resolveField(prefix, key, content, hints) : null;
    if (f?.hidden) return [];
    return content.flatMap((item, i) => translatablePaths(item, hints, prefix ? `${prefix}.${i}` : String(i), String(i)));
  }
  if (content && typeof content === 'object') {
    const f = prefix ? resolveField(prefix, key, content, hints) : null;
    if (f?.hidden) return [];
    return Object.entries(content).flatMap(([k, v]) => translatablePaths(v, hints, prefix ? `${prefix}.${k}` : k, k));
  }
  return [];
}
