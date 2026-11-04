// Content helpers shared by the site, the admin and the server.
//
// A section's content is a plain object (strings, numbers, lists). The built-in content in the
// code is the "defaults"; what editors save in the CMS is laid over it with mergeContent().
// Things the CMS can't store (icons written as React elements, functions) always come from
// the defaults, so an edit can never remove them.

import { isValidElement } from 'react';

export type Plain = string | number | boolean | null | Plain[] | { [key: string]: Plain };

/** Arabic text for a section, by field path, e.g. { "items.0.title": "…" }. */
export type ArabicMap = Record<string, string>;

export function isPlainObject(v: unknown): v is Record<string, unknown> {
  if (v === null || typeof v !== 'object' || Array.isArray(v) || isValidElement(v)) return false;
  if ('$$typeof' in v) return false; // icon components (forwardRef, memo)
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
}

/** Values that live only in code: React elements, functions, symbols, class instances. */
function isCodeOnly(v: unknown): boolean {
  if (typeof v === 'function' || typeof v === 'symbol' || typeof v === 'bigint') return true;
  if (isValidElement(v)) return true;
  return v !== null && typeof v === 'object' && !Array.isArray(v) && !isPlainObject(v);
}

/** The editable part of a value: drops icons, functions and undefined. */
export function toPlain(v: unknown): Plain | undefined {
  if (v === undefined || isCodeOnly(v)) return undefined;
  if (v === null || typeof v === 'string' || typeof v === 'boolean') return v;
  if (typeof v === 'number') return Number.isFinite(v) ? v : undefined;
  if (Array.isArray(v)) {
    const out: Plain[] = [];
    for (const item of v) {
      const p = toPlain(item);
      if (p !== undefined) out.push(p);
    }
    return out;
  }
  const out: { [key: string]: Plain } = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    const p = toPlain(val);
    if (p !== undefined) out[k] = p;
  }
  return out;
}

/** The item new list entries are modelled on: the matching default, or else the last one. */
function template(defaults: unknown[], i: number): unknown {
  return i < defaults.length ? defaults[i] : defaults[defaults.length - 1];
}

/**
 * Lays saved content over the defaults. Only fields the defaults have are taken, and only
 * with the same type, so saved content from an older version of a section can't break it.
 * Lists take their length from the saved content; new items borrow icons from the defaults.
 */
export function mergeContent<T>(defaults: T, saved: unknown): T {
  if (saved === undefined || saved === null) return defaults;
  if (isCodeOnly(defaults)) return defaults;
  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return defaults;
    if (defaults.length === 0) return saved.filter((s) => typeof s === 'string') as T;
    return saved.map((item, i) => {
      const merged = mergeContent(template(defaults, i), item);
      // New items copy hidden fields from an existing one; give each its own id.
      if (i >= defaults.length && isPlainObject(merged) && (typeof merged.id === 'string' || typeof merged.id === 'number')) {
        return { ...merged, id: `${merged.id}-${i}` };
      }
      return merged;
    }) as T;
  }
  if (isPlainObject(defaults)) {
    if (!isPlainObject(saved)) return defaults;
    const out: Record<string, unknown> = { ...defaults };
    for (const k of Object.keys(defaults)) {
      if (k in saved) out[k] = mergeContent((defaults as Record<string, unknown>)[k], saved[k]);
    }
    return out as T;
  }
  if (defaults === undefined || defaults === null) return (typeof saved === 'string' ? saved : defaults) as T;
  return (typeof saved === typeof defaults ? saved : defaults) as T;
}

/** Every text field with its path, e.g. ["items.0.title", "Air Freight"]. */
export function textFields(v: unknown, prefix = ''): [string, string][] {
  if (typeof v === 'string') return prefix ? [[prefix, v]] : [];
  if (Array.isArray(v)) return v.flatMap((item, i) => textFields(item, prefix ? `${prefix}.${i}` : String(i)));
  if (isPlainObject(v)) {
    return Object.entries(v).flatMap(([k, val]) => textFields(val, prefix ? `${prefix}.${k}` : k));
  }
  return [];
}

export function getAt(obj: unknown, path: string): unknown {
  let cur: unknown = obj;
  for (const part of path.split('.')) {
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}

/** Same spacing rule the site translator uses to match English text. */
export const normText = (s: string) => s.replace(/\s+/g, ' ').trim();

const MAX_TEXT = 20000;
const MAX_ITEMS = 300;

/**
 * Checks content sent by the admin against the section's built-in content and returns a
 * clean copy with exactly the same fields and types. Anything else is dropped.
 */
export function sanitize(defaults: Plain | undefined, input: unknown): Plain | undefined {
  if (defaults === undefined) return undefined;
  if (typeof defaults === 'string' || defaults === null) {
    return typeof input === 'string' ? input.slice(0, MAX_TEXT) : defaults;
  }
  if (typeof defaults === 'number') {
    const n = typeof input === 'string' && input.trim() !== '' ? Number(input) : input;
    return typeof n === 'number' && Number.isFinite(n) ? n : defaults;
  }
  if (typeof defaults === 'boolean') return typeof input === 'boolean' ? input : defaults;
  if (Array.isArray(defaults)) {
    if (!Array.isArray(input)) return defaults;
    const items = input.slice(0, MAX_ITEMS);
    if (defaults.length === 0) return items.filter((s): s is string => typeof s === 'string');
    return items.map((item, i) => sanitize(defaults[Math.min(i, defaults.length - 1)], item) as Plain);
  }
  if (!isPlainObject(input)) return defaults;
  const out: { [key: string]: Plain } = {};
  for (const [k, def] of Object.entries(defaults)) {
    const v = k in input ? sanitize(def, input[k]) : def;
    if (v !== undefined) out[k] = v;
  }
  return out;
}
