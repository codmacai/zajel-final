// Checks a section's content before it is saved: in the editor as you type, and again on the
// server when you save. Each rule protects the live site, e.g. an image from another website
// would stop the page from loading, and an empty list can leave a section broken.

import { isSafeImage, type Plain } from './content';
import { fieldApplies, isTranslatable, pattern, resolveField, type Hints } from './fields';

export interface Problem {
  path: string;
  message: string;
}

const LINK = /^(\/(?!\/)\S*|#\S*|https?:\/\/[^\s/?#]+\S*|mailto:\S+|tel:\+?[\d\s()-]+)$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COLOR = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/** A real calendar date written as YYYY-MM-DD. */
export function isValidDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

/** Built-in values by field pattern, e.g. every "events.*.cover.src" in the original content. */
export function builtIns(value: Plain, path = '', out = new Map<string, Plain[]>()): Map<string, Plain[]> {
  if (path) {
    const p = pattern(path);
    if (!out.has(p)) out.set(p, []);
    out.get(p)!.push(value);
  }
  if (Array.isArray(value)) value.forEach((v, i) => builtIns(v, path ? `${path}.${i}` : String(i), out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) builtIns(v, path ? `${path}.${k}` : k, out);
  }
  return out;
}

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** A list may be empty if its hint says so, or if the site itself has it empty somewhere. */
export const listCanBeEmpty = (allowEmpty: boolean | undefined, known: Plain[]) =>
  Boolean(allowEmpty) || known.some((v) => Array.isArray(v) && v.length === 0);

/** An image or date may be empty if its hint says so, or if the site itself has it empty somewhere. */
export const valueCanBeEmpty = (optional: boolean | undefined, known: Plain[]) => Boolean(optional) || known.some((v) => v === '');

/** Everything in `content` that would break the site or can't be saved. Empty means fine. */
export function validateContent(content: Plain, original: Plain, hints: Hints = {}): Problem[] {
  const problems: Problem[] = [];
  const originals = builtIns(original);
  const add = (path: string, message: string) => problems.push({ path, message });

  const visit = (value: Plain, path: string, key: string) => {
    const f = path ? resolveField(path, key, value, hints) : null;
    if (f?.hidden) return;
    const known = path ? originals.get(pattern(path)) ?? [] : [];

    if (Array.isArray(value)) {
      const item = lower(f?.itemLabel ?? 'item');
      const canBeEmpty = !f?.required && listCanBeEmpty(f?.allowEmpty, known);
      const fixedLength = known.find(Array.isArray)?.length;
      if (f?.fixed && fixedLength !== undefined && value.length !== fixedLength) {
        add(path, `This list needs exactly ${fixedLength} ${fixedLength === 1 ? item : `${item}s`} to fit the design.`);
      } else if (path && value.length === 0 && !canBeEmpty) {
        add(path, `Add at least one ${item}. The design needs one to show this part of the page.`);
      }
      // Slugs must be unique within their list, because each one is a page address.
      const seen = new Map<string, number>();
      value.forEach((entry, i) => {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return;
        for (const [k, v] of Object.entries(entry)) {
          const p = `${path}.${i}.${k}`;
          if (typeof v !== 'string' || !v || resolveField(p, k, v, hints).kind !== 'slug') continue;
          if (seen.has(v)) add(p, `Item ${seen.get(v)! + 1} already uses this address. Each one must be different.`);
          else seen.set(v, i);
        }
      });
      value.forEach((v, i) => visit(v, path ? `${path}.${i}` : String(i), String(i)));
      return;
    }

    if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        const p = path ? `${path}.${k}` : k;
        // Fields that don't apply here (e.g. a photo on a text block) aren't checked.
        if (fieldApplies(resolveField(p, k, v, hints).when, value)) visit(v, p, k);
      }
      // A date range can't end before it starts.
      const { startDate, endDate } = value as Record<string, Plain>;
      if (typeof startDate === 'string' && typeof endDate === 'string' && isValidDate(startDate) && isValidDate(endDate) && endDate < startDate) {
        add(path ? `${path}.endDate` : 'endDate', 'The end date is before the start date.');
      }
      return;
    }

    if (!f || typeof value !== 'string') return;
    // The site's own content is always allowed back.
    if (value !== '' && known.includes(value)) return;
    const v = value.trim();
    const canBeEmpty = !f.required && valueCanBeEmpty(f.optional, known);
    if (f.required && !v && isTranslatable(f.kind)) {
      add(path, 'This can’t be empty.');
      return;
    }

    switch (f.kind) {
      case 'image':
        if (!v) {
          if (!canBeEmpty) add(path, 'This image is needed by the design. Upload one, or reset it to the original.');
        } else if (!isSafeImage(v)) {
          add(path, 'Upload the image here instead of linking to another website. Outside images can stop the page from loading.');
        }
        break;
      case 'link':
        if (v && !LINK.test(v)) add(path, 'Use a page on this site like /support, a full address starting with https://, or mailto: / tel:.');
        break;
      case 'date':
        if (!v) {
          if (!canBeEmpty) add(path, 'Pick a date.');
        } else if (!isValidDate(v)) add(path, 'Pick a real date.');
        break;
      case 'select':
        if (f.options && !f.options.includes(value)) add(path, `Choose one of: ${f.options.join(', ')}.`);
        break;
      case 'slug':
        if (!SLUG.test(value)) add(path, 'Use lowercase letters, numbers and hyphens only, for example trade-expo-2027.');
        break;
      case 'color':
        if (!COLOR.test(v)) add(path, 'Use a colour code like #36B936.');
        break;
    }
  };

  visit(content, '', '');
  return problems;
}
