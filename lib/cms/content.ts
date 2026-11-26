import { isValidElement } from 'react';
import { MEDIA_BUCKET, SUPABASE_URL } from './config';

export type Plain = string | number | boolean | null | Plain[] | { [key: string]: Plain };

export type ArabicMap = Record<string, string>;

export function isPlainObject(v: unknown): v is Record<string, unknown> {
  if (v === null || typeof v !== 'object' || Array.isArray(v) || isValidElement(v)) return false;
  if ('$$typeof' in v) return false;
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
}

function isCodeOnly(v: unknown): boolean {
  if (typeof v === 'function' || typeof v === 'symbol' || typeof v === 'bigint') return true;
  if (isValidElement(v)) return true;
  return v !== null && typeof v === 'object' && !Array.isArray(v) && !isPlainObject(v);
}

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

export const MEDIA_PREFIX = SUPABASE_URL ? `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/` : '';

const LOCAL_IMAGE = /^\/(?!\/)[^\s"'<>\\?#]+$/;
const BUILT_IN_IMAGE = /^\/(?!\/)\S+\.(png|jpe?g|webp|avif|gif|svg)$/i;

export const isSafeImage = (src: string) =>
  LOCAL_IMAGE.test(src) || Boolean(MEDIA_PREFIX && src.startsWith(MEDIA_PREFIX) && !/[?#\s]/.test(src));

function shapeOf(v: unknown): string {
  const p = toPlain(v);
  if (Array.isArray(p)) return '[]';
  if (p !== null && typeof p === 'object') {
    return `{${Object.keys(p).sort().map((k) => `${k}:${shapeOf((p as Record<string, unknown>)[k])}`).join(',')}}`;
  }
  return typeof p;
}

function listExamples(items: unknown[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const item of items) {
    if (!isPlainObject(item)) continue;
    for (const [k, v] of Object.entries(item)) if (Array.isArray(v) && v.length && !(k in out)) out[k] = v[0];
  }
  return out;
}

const idOf = (v: unknown) => (isPlainObject(v) && (typeof v.id === 'string' || typeof v.id === 'number') ? v.id : undefined);

function templateFor(defaults: unknown[], i: number, saved: unknown): unknown {
  const positional = i < defaults.length ? defaults[i] : defaults[defaults.length - 1];
  if (!isPlainObject(saved)) return positional;
  const id = idOf(saved);
  if (id !== undefined) {
    const same = defaults.find((d) => idOf(d) === id);
    if (same) return same;
  }
  const shape = shapeOf(saved);
  const type = typeof saved.type === 'string' ? saved.type : undefined;
  const sameType = (d: unknown) => type === undefined || (isPlainObject(d) && d.type === type);
  const nearest = (fits: (d: unknown) => boolean) => {
    let best: unknown;
    let bestDistance = Infinity;
    defaults.forEach((d, j) => {
      if (Math.abs(j - i) < bestDistance && fits(d)) {
        best = d;
        bestDistance = Math.abs(j - i);
      }
    });
    return best;
  };
  if (shapeOf(positional) === shape && sameType(positional)) return positional;
  return nearest((d) => shapeOf(d) === shape && sameType(d)) ?? nearest((d) => shapeOf(d) === shape) ?? positional;
}

export function mergeContent<T>(defaults: T, saved: unknown, example?: unknown, examples?: Record<string, unknown>): T {
  if (saved === undefined || saved === null) return defaults;
  if (isCodeOnly(defaults)) return defaults;
  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return defaults;
    if (defaults.length === 0) {
      if (example === undefined) return saved.filter((s) => typeof s === 'string') as T;
      return saved.map((item) => mergeContent(example, item)) as T;
    }
    const seen = new Set<string | number>();
    const itemExamples = listExamples(defaults);
    return saved.map((item, i) => {
      const merged = mergeContent(templateFor(defaults, i, item), item, undefined, itemExamples);
      const id = idOf(merged);
      if (id === undefined) return merged;
      const unique = seen.has(id) ? `${id}-${i}` : id;
      seen.add(unique);
      return unique === id ? merged : { ...(merged as Record<string, unknown>), id: unique };
    }) as T;
  }
  if (isPlainObject(defaults)) {
    if (!isPlainObject(saved)) return defaults;
    const out: Record<string, unknown> = { ...defaults };
    for (const k of Object.keys(defaults)) {
      if (k in saved) out[k] = mergeContent((defaults as Record<string, unknown>)[k], saved[k], examples?.[k]);
    }
    return out as T;
  }
  if (defaults === undefined || defaults === null) return (typeof saved === 'string' ? saved : defaults) as T;
  if (typeof defaults === 'string' && typeof saved === 'string' && BUILT_IN_IMAGE.test(defaults) && !isSafeImage(saved.trim())) return defaults;
  return (typeof saved === typeof defaults ? saved : defaults) as T;
}

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

export const normText = (s: string) => s.replace(/\s+/g, ' ').trim();

const MAX_TEXT = 20000;
const MAX_ITEMS = 300;

export function sanitize(defaults: Plain | undefined, input: unknown, example?: Plain, examples?: Record<string, unknown>): Plain | undefined {
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
    if (defaults.length === 0) {
      if (example === undefined) return items.filter((s): s is string => typeof s === 'string');
      return items.map((item) => sanitize(example, item) as Plain);
    }
    const itemExamples = listExamples(defaults);
    return items.map((item, i) => sanitize(templateFor(defaults, i, item) as Plain, item, undefined, itemExamples) as Plain);
  }
  if (!isPlainObject(input)) return defaults;
  const out: { [key: string]: Plain } = {};
  for (const [k, def] of Object.entries(defaults)) {
    const v = k in input ? sanitize(def, input[k], examples?.[k] as Plain | undefined) : def;
    if (v !== undefined) out[k] = v;
  }
  return out;
}
