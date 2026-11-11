'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState, useTransition, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Copy,
  ExternalLink,
  History,
  Link2,
  LoaderCircle,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { historyAction, saveSectionAction, setSectionEnabledAction } from '@/app/admin/actions';
import { getAt, mergeContent, type ArabicMap, type Plain } from '@/lib/cms/content';
import { fieldApplies, isTranslatable, itemTitle, pattern, resolveField, translatablePaths, type Hints } from '@/lib/cms/fields';
import type { CmsVersion } from '@/lib/cms/store';
import { builtIns, listCanBeEmpty, validateContent, valueCanBeEmpty, type Problem } from '@/lib/cms/validate';
import { uploadImage } from './upload';
import { useToast } from './Toast';
import { fullDate, timeAgo } from './time';

export interface EditorProps {
  sectionKey: string;
  pageId: string;
  pageLabel: string;
  pagePath: string | null;
  label: string;
  note?: string;
  hints: Hints;
  original: Plain;
  originalArabic: ArabicMap;
  current: Plain;
  arabic: ArabicMap;
  enabled: boolean;
  updatedAt: string | null;
  updatedBy: string | null;
  writable: boolean;
}

type Obj = { [k: string]: Plain };
const isObj = (v: unknown): v is Obj => !!v && typeof v === 'object' && !Array.isArray(v);

/* ---------- Arabic is kept as a tree shaped like the content, so moving items moves both ---------- */

function arabicTree(content: Plain, map: ArabicMap, path = ''): Plain {
  if (typeof content === 'string') return map[path] ?? '';
  if (Array.isArray(content)) return content.map((v, i) => arabicTree(v, map, path ? `${path}.${i}` : String(i)));
  if (isObj(content)) {
    const out: Obj = {};
    for (const [k, v] of Object.entries(content)) out[k] = arabicTree(v, map, path ? `${path}.${k}` : k);
    return out;
  }
  return null;
}

function arabicMap(content: Plain, tree: Plain, hints: Hints): ArabicMap {
  const out: ArabicMap = {};
  for (const p of translatablePaths(content, hints)) {
    const v = getAt(tree, p);
    if (typeof v === 'string' && v.trim()) out[p] = v;
  }
  return out;
}

function setIn(obj: Plain, parts: string[], value: Plain): Plain {
  if (!parts.length) return value;
  const [head, ...rest] = parts;
  if (Array.isArray(obj)) {
    const copy = [...obj];
    copy[Number(head)] = setIn(copy[Number(head)], rest, value);
    return copy;
  }
  const base = isObj(obj) ? obj : {};
  return { ...base, [head]: setIn(base[head] ?? null, rest, value) };
}

/**
 * A new list item shaped like `template`, with its text cleared (images, links and dates kept
 * as a start). Lists inside it start with one blank item, or none if they may be empty.
 */
function blankFrom(template: Plain, hints: Hints, path: string, canBeEmpty: (path: string) => boolean): Plain {
  const key = path.split('.').pop() ?? '';
  if (typeof template === 'string') {
    const f = resolveField(path, key, template, hints);
    return !f.hidden && (isTranslatable(f.kind) || f.kind === 'slug') ? '' : template;
  }
  if (Array.isArray(template)) {
    if (resolveField(path, key, template, hints).hidden || !template.length) return template;
    return canBeEmpty(path) ? [] : [blankFrom(template[0], hints, `${path}.0`, canBeEmpty)];
  }
  if (isObj(template)) {
    const out: Obj = {};
    for (const [k, v] of Object.entries(template)) out[k] = blankFrom(v, hints, `${path}.${k}`, canBeEmpty);
    return out;
  }
  return template;
}

const TITLE_KEYS = ['title', 'name', 'question', 'q', 'label', 'heading', 'text', 'city', 'country', 'value', 'role'];

/** A copy of a list item, marked "(copy)" so it can be told apart; page addresses get "-copy". */
function copyOf(item: Plain, hints: Hints, path: string): Plain {
  if (!isObj(item)) return item;
  const out: Obj = { ...item };
  let marked = false;
  for (const k of [...TITLE_KEYS, ...Object.keys(item)]) {
    const v = out[k];
    if (marked || typeof v !== 'string' || !v.trim()) continue;
    const f = resolveField(`${path}.${k}`, k, v, hints);
    if (!f.hidden && isTranslatable(f.kind)) {
      out[k] = `${v} (copy)`;
      marked = true;
    }
  }
  for (const [k, v] of Object.entries(item)) {
    if (typeof v === 'string' && v && resolveField(`${path}.${k}`, k, v, hints).kind === 'slug') out[k] = `${v}-copy`;
  }
  return out;
}

/* ---------- the editor ---------- */

export default function Editor(props: EditorProps) {
  const { sectionKey, hints, original, originalArabic, writable } = props;
  const router = useRouter();
  const toast = useToast();
  const [en, setEn] = useState<Plain>(props.current);
  const [ar, setAr] = useState<Plain>(() => arabicTree(props.current, props.arabic));
  const [enabled, setEnabled] = useState(props.enabled);
  const [baseline, setBaseline] = useState(() => JSON.stringify([props.current, props.arabic]));
  const [saving, startSave] = useTransition();
  const [toggling, startToggle] = useTransition();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [updated, setUpdated] = useState({ at: props.updatedAt, by: props.updatedBy });

  const arMap = useMemo(() => arabicMap(en, ar, hints), [en, ar, hints]);
  const dirty = JSON.stringify([en, arMap]) !== baseline;
  // The same checks the server runs on save, shown next to each field as you type.
  const problems = useMemo(() => validateContent(en, original, hints), [en, original, hints]);
  const problemAt = useMemo(() => new Map(problems.map((p: Problem) => [p.path, p.message])), [problems]);
  const originals = useMemo(() => builtIns(original), [original]);
  const missing = useMemo(
    () => translatablePaths(en, hints).filter((p) => {
      const v = getAt(en, p);
      return typeof v === 'string' && v.trim() && !arMap[p];
    }).length,
    [en, arMap, hints],
  );

  const update = useCallback((lang: 'en' | 'ar', path: string, value: Plain) => {
    const parts = path.split('.');
    (lang === 'en' ? setEn : setAr)((prev) => setIn(prev, parts, value));
  }, []);

  /** List changes apply to the English and Arabic together. */
  const updateList = useCallback((path: string, fn: (list: Plain[]) => Plain[], fnAr: (list: Plain[]) => Plain[]) => {
    const parts = path.split('.');
    setEn((prev) => setIn(prev, parts, fn([...((getAt(prev, path) as Plain[]) ?? [])])));
    setAr((prev) => setIn(prev, parts, fnAr([...((getAt(prev, path) as Plain[]) ?? [])])));
  }, []);

  const showProblem = useCallback(() => {
    const first = problems[0];
    if (!first) return;
    const el = document.querySelector(`[data-path="${CSS.escape(first.path)}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el?.querySelector<HTMLElement>('input, textarea, select, button')?.focus({ preventScroll: true });
  }, [problems]);

  const save = useCallback(() => {
    if (!dirty || saving) return;
    if (problems.length) {
      showProblem();
      return toast(problems.length === 1 ? 'Fix the highlighted field before saving.' : `Fix the ${problems.length} highlighted fields before saving.`, 'error');
    }
    startSave(async () => {
      const res = await saveSectionAction({ key: sectionKey, en, ar: arMap, enabled });
      if (!res.ok) return toast(res.error, 'error');
      setBaseline(JSON.stringify([en, arMap]));
      setUpdated({ at: res.updatedAt, by: 'you' });
      toast('Published. Live on zajel.com in a few seconds.');
      router.refresh();
    });
  }, [dirty, saving, problems, showProblem, sectionKey, en, arMap, enabled, toast, router]);

  const discard = () => {
    const [c, a] = JSON.parse(baseline) as [Plain, ArabicMap];
    setEn(c);
    setAr(arabicTree(c, a));
  };

  const resetToOriginal = () => {
    setEn(original);
    setAr(arabicTree(original, originalArabic));
    toast('Original content loaded. Save to make it live.');
  };

  const restore = (v: CmsVersion) => {
    const content = mergeContent(original, v.en);
    setEn(content);
    setAr(arabicTree(content, v.ar ?? {}));
    setHistoryOpen(false);
    toast('Older version loaded. Save to make it live.');
  };

  const toggleEnabled = () => {
    const next = !enabled;
    setEnabled(next);
    startToggle(async () => {
      const res = await setSectionEnabledAction(sectionKey, next);
      if (!res.ok) {
        setEnabled(!next);
        toast(res.error, 'error');
      } else toast(next ? 'Shown on the site' : 'Hidden from the site');
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        save();
      }
    };
    const onLeave = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('beforeunload', onLeave);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('beforeunload', onLeave);
    };
  }, [save, dirty]);

  const ctx: Ctx = { en, ar, hints, original, originals, problemAt, update, updateList, sectionKey, writable, toast };

  return (
    <>
      <div className="c-eyebrow">
        <Link href={`/admin/${props.pageId}`}>
          <ChevronLeft size={15} aria-hidden="true" style={{ verticalAlign: '-3px' }} /> {props.pageLabel}
        </Link>
      </div>
      <div className="c-ed-head">
        <div>
          <div className="c-ed-title">
            <h1 className="c-title">{props.label}</h1>
            {missing > 0 ? <span className="c-pill warn"><i />{missing} Arabic missing</span> : <span className="c-pill ok"><i />Arabic done</span>}
          </div>
          <div className="c-ed-meta" suppressHydrationWarning>
            {props.note ? `${props.note} · ` : ''}
            {updated.at ? `Last saved ${timeAgo(updated.at)}${updated.by ? ` by ${updated.by}` : ''}` : 'Original content, not edited yet'}
          </div>
        </div>
        <div className="c-head-actions">
          <span className="c-visible">
            Show on site
            <button className="c-switch" role="switch" aria-checked={enabled} aria-label="Show on site" disabled={toggling || !writable} onClick={toggleEnabled} />
          </span>
          <button className="c-btn" onClick={() => setHistoryOpen(true)}>
            <History aria-hidden="true" />History
          </button>
          <button className="c-btn" onClick={resetToOriginal} title="Load the original content of this section">
            <RotateCcw aria-hidden="true" />Reset
          </button>
          {props.pagePath && (
            <a className="c-btn" href={props.pagePath} target="_blank" rel="noopener">
              <ExternalLink aria-hidden="true" />View
            </a>
          )}
        </div>
      </div>

      <Fields value={en} path="" ctx={ctx} />

      {dirty && (
        <div className="c-savebar" role="region" aria-label="Unsaved changes">
          <span className="msg">Unsaved changes<span>{missing > 0 ? `${missing} without Arabic` : 'English and Arabic'}</span></span>
          {problems.length > 0 && (
            <button className="c-btn danger" onClick={showProblem}>
              <CircleAlert aria-hidden="true" />
              {problems.length === 1 ? '1 field to fix' : `${problems.length} fields to fix`}
            </button>
          )}
          <button className="c-btn" onClick={discard} disabled={saving}>Discard</button>
          <button className="c-btn primary" onClick={save} disabled={saving || !writable || problems.length > 0}>
            {saving ? <LoaderCircle className="c-spin" aria-hidden="true" /> : null}
            {saving ? 'Publishing…' : 'Save and publish'}
            {!saving && <kbd>⌘S</kbd>}
          </button>
        </div>
      )}

      {historyOpen && <HistorySheet sectionKey={sectionKey} onClose={() => setHistoryOpen(false)} onRestore={restore} />}
    </>
  );
}

/* ---------- fields ---------- */

interface Ctx {
  en: Plain;
  ar: Plain;
  hints: Hints;
  original: Plain;
  /** Built-in values by field pattern, e.g. every "events.*.cover.src". */
  originals: Map<string, Plain[]>;
  /** What's wrong with a field, by path. */
  problemAt: Map<string, string>;
  sectionKey: string;
  writable: boolean;
  update: (lang: 'en' | 'ar', path: string, value: Plain) => void;
  updateList: (path: string, fn: (l: Plain[]) => Plain[], fnAr: (l: Plain[]) => Plain[]) => void;
  toast: (m: string, k?: 'ok' | 'error') => void;
}

const join = (path: string, key: string | number) => (path ? `${path}.${key}` : String(key));
const isSimple = (v: Plain) => v === null || typeof v !== 'object';
const knownAt = (ctx: Ctx, path: string) => ctx.originals.get(pattern(path)) ?? [];
const hasProblemIn = (ctx: Ctx, path: string) => [...ctx.problemAt.keys()].some((p) => p === path || p.startsWith(`${path}.`));

function FieldError({ ctx, path }: { ctx: Ctx; path: string }) {
  const message = ctx.problemAt.get(path);
  if (!message) return null;
  return (
    <p className="c-field-error" role="alert">
      <CircleAlert aria-hidden="true" />
      {message}
    </p>
  );
}

/** Top level: plain fields share one card; each group or list gets its own card. */
function Fields({ value, path, ctx }: { value: Plain; path: string; ctx: Ctx }) {
  if (!isObj(value)) return null;
  const blocks: ReactNode[] = [];
  let simple: [string, Plain][] = [];
  const flush = () => {
    if (!simple.length) return;
    const items = simple;
    simple = [];
    const visible = items.filter(([k, v]) => !resolveField(join(path, k), k, v, ctx.hints).hidden);
    if (!visible.length) return;
    blocks.push(
      <section className="c-group" key={`s-${items[0][0]}`}>
        <div className="c-card c-fields">
          <LangBar items={visible} path={path} ctx={ctx} />
          {visible.map(([k, v]) => <Field key={k} k={k} value={v} path={join(path, k)} ctx={ctx} />)}
        </div>
      </section>,
    );
  };
  for (const [k, v] of Object.entries(value)) {
    if (isSimple(v)) simple.push([k, v]);
    else {
      flush();
      const f = resolveField(join(path, k), k, v, ctx.hints);
      if (f.hidden) continue;
      blocks.push(
        <section className="c-group" key={k} data-path={join(path, k)}>
          <div className="c-group-head">
            <div>
              <h3>{f.label}</h3>
              {f.help && <p>{f.help}</p>}
            </div>
            {Array.isArray(v) && <span className="c-pill">{v.length} {v.length === 1 ? 'item' : 'items'}</span>}
          </div>
          <div className="c-card">
            {Array.isArray(v) ? (
              <>
                <ListField value={v} path={join(path, k)} k={k} ctx={ctx} />
                <div style={{ padding: '0 14px' }}><FieldError ctx={ctx} path={join(path, k)} /></div>
              </>
            ) : (
              <div className="c-fields">
                <ObjectFields value={v} path={join(path, k)} ctx={ctx} />
              </div>
            )}
          </div>
        </section>,
      );
    }
  }
  flush();
  return <>{blocks}</>;
}

function LangBar({ items, path, ctx }: { items: [string, Plain][]; path: string; ctx: Ctx }) {
  const any = items.some(([k, v]) => typeof v === 'string' && isTranslatable(resolveField(join(path, k), k, v, ctx.hints).kind));
  if (!any) return null;
  return (
    <div className="c-langbar" style={{ paddingTop: 14 }}>
      <span>English</span>
      <span>العربية</span>
    </div>
  );
}

function ObjectFields({ value, path, ctx }: { value: Obj; path: string; ctx: Ctx }) {
  return (
    <>
      {Object.entries(value).map(([k, v]) => {
        const p = join(path, k);
        const f = resolveField(p, k, v, ctx.hints);
        // Hidden, or not used here (e.g. a photo field on a text block).
        if (f.hidden || !fieldApplies(f.when, value)) return null;
        if (Array.isArray(v)) {
          return (
            <div className="c-field" key={k} data-path={p}>
              <div className="c-label"><b>{f.label}</b>{f.help && <span>{f.help}</span>}</div>
              <div className="c-nested"><ListField value={v} path={p} k={k} ctx={ctx} /></div>
              <FieldError ctx={ctx} path={p} />
            </div>
          );
        }
        if (isObj(v)) {
          return (
            <div className="c-field" key={k}>
              <div className="c-label"><b>{f.label}</b>{f.help && <span>{f.help}</span>}</div>
              <div className="c-nested"><ObjectFields value={v} path={p} ctx={ctx} /></div>
            </div>
          );
        }
        return <Field key={k} k={k} value={v} path={p} ctx={ctx} />;
      })}
    </>
  );
}

function Field({ k, value, path, ctx }: { k: string; value: Plain; path: string; ctx: Ctx }) {
  const f = resolveField(path, k, value, ctx.hints);
  if (f.hidden) return null;
  const label = (
    <div className="c-label">
      <b>{f.label}</b>
      {f.help && <span>{f.help}</span>}
    </div>
  );
  const id = `f-${path}`;
  const bad = ctx.problemAt.has(path);
  const cls = `c-input${bad ? ' invalid' : ''}`;
  const wrap = (body: ReactNode) => (
    <div className="c-field" data-path={path}>
      {label}
      {body}
      <FieldError ctx={ctx} path={path} />
    </div>
  );

  if (f.kind === 'image') return wrap(<ImageField value={String(value ?? '')} path={path} ctx={ctx} optional={!f.required && valueCanBeEmpty(f.optional, knownAt(ctx, path))} />);

  if (f.kind === 'toggle') {
    return (
      <div className="c-field" data-path={path} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        {label}
        <button className="c-switch" role="switch" aria-checked={Boolean(value)} aria-label={f.label} onClick={() => ctx.update('en', path, !value)} />
      </div>
    );
  }
  if (f.kind === 'number') {
    return wrap(
      <input id={id} className={cls} type="number" value={typeof value === 'number' ? value : ''} style={{ maxWidth: 220 }}
        onChange={(e) => ctx.update('en', path, e.target.value === '' ? 0 : Number(e.target.value))} />,
    );
  }
  if (f.kind === 'date') {
    const optional = !f.required && valueCanBeEmpty(f.optional, knownAt(ctx, path));
    return wrap(
      <div className="c-inline">
        <input id={id} className={cls} type="date" value={String(value ?? '')} style={{ maxWidth: 220 }} aria-label={f.label}
          onChange={(e) => ctx.update('en', path, e.target.value)} />
        {optional && value ? (
          <button className="c-btn sm plain" onClick={() => ctx.update('en', path, '')}>
            <X aria-hidden="true" />Clear
          </button>
        ) : null}
      </div>,
    );
  }
  if (f.kind === 'select') {
    const v = String(value ?? '');
    const options = f.options ?? [];
    return wrap(
      <select id={id} className={`${cls} c-select`} value={v} style={{ maxWidth: 320 }} aria-label={f.label} onChange={(e) => ctx.update('en', path, e.target.value)}>
        {!options.includes(v) && <option value={v}>{v || 'Choose…'}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>,
    );
  }
  if (f.kind === 'slug') {
    return wrap(
      <div className="c-affix text">
        {f.prefix && <span className="pre">{f.prefix}</span>}
        <input id={id} className={cls} value={String(value ?? '')} spellCheck={false} autoCapitalize="none" placeholder="my-page-address"
          onChange={(e) => ctx.update('en', path, e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
      </div>,
    );
  }
  if (f.kind === 'color') {
    const v = String(value ?? '');
    return wrap(
      <div className="c-color">
        <input type="color" value={/^#[0-9a-f]{6}$/i.test(v) ? v : '#36b936'} aria-label={f.label} onChange={(e) => ctx.update('en', path, e.target.value)} />
        <input className={cls} value={v} style={{ maxWidth: 160, fontFamily: 'var(--font-mono)' }} onChange={(e) => ctx.update('en', path, e.target.value)} aria-label={`${f.label} code`} />
      </div>,
    );
  }
  if (f.kind === 'link') {
    return wrap(
      <div className="c-affix">
        <Link2 aria-hidden="true" />
        <input id={id} className={cls} value={String(value ?? '')} spellCheck={false} placeholder="/page or https://…"
          onChange={(e) => ctx.update('en', path, e.target.value)} />
      </div>,
    );
  }

  // Text in English and Arabic
  const enV = String(value ?? '');
  const arV = String(getAt(ctx.ar, path) ?? '');
  const long = f.kind === 'textarea';
  const missing = Boolean(enV.trim()) && !arV.trim();
  const common = { className: cls, spellCheck: true };
  return wrap(
    <div className="c-pair">
      <div className="c-input-wrap">
        {long ? (
          <textarea {...common} id={id} value={enV} aria-label={`${f.label} (English)`} rows={Math.min(8, Math.max(3, Math.ceil(enV.length / 70)))}
            onChange={(e) => ctx.update('en', path, e.target.value)} />
        ) : (
          <input {...common} id={id} value={enV} aria-label={`${f.label} (English)`} onChange={(e) => ctx.update('en', path, e.target.value)} />
        )}
        {long && <span className="c-count">{enV.length}</span>}
      </div>
      <div className="c-input-wrap">
        {long ? (
          <textarea {...common} className={`c-input${missing ? ' missing' : ''}`} dir="rtl" lang="ar" value={arV} placeholder="أضف الترجمة العربية"
            aria-label={`${f.label} (Arabic)`} rows={Math.min(8, Math.max(3, Math.ceil(arV.length / 70)))} onChange={(e) => ctx.update('ar', path, e.target.value)} />
        ) : (
          <input {...common} className={`c-input${missing ? ' missing' : ''}`} dir="rtl" lang="ar" value={arV} placeholder="أضف الترجمة العربية"
            aria-label={`${f.label} (Arabic)`} onChange={(e) => ctx.update('ar', path, e.target.value)} />
        )}
      </div>
    </div>,
  );
}

function ImageField({ value, path, ctx, optional }: { value: string; path: string; ctx: Ctx; optional: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [broken, setBroken] = useState(false);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    const res = await uploadImage(ctx.sectionKey, file);
    setBusy(false);
    if (!res.ok) return ctx.toast(res.error, 'error');
    setBroken(false);
    ctx.update('en', path, res.url);
    ctx.toast('Image uploaded. Save to make it live.');
  };

  const name = value ? decodeURIComponent(value.split('/').pop() ?? value) : 'No image';
  return (
    <div className="c-image">
      <div
        className={`c-image-box${drag ? ' drag' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files[0]); }}
      >
        {value && !broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" onError={() => setBroken(true)} />
        ) : (
          <div className="busy" style={{ background: 'transparent', backdropFilter: 'none', color: 'var(--text-3)' }}>
            {value ? 'Preview not available' : 'Drop an image here'}
          </div>
        )}
        {busy && <div className="busy"><LoaderCircle className="c-spin" size={22} aria-label="Uploading" /></div>}
      </div>
      <div className="c-image-side">
        <span className="name">{name}</span>
        <div className="acts">
          <button className="c-btn sm" onClick={() => inputRef.current?.click()} disabled={busy || !ctx.writable}>
            <Upload aria-hidden="true" />{value ? 'Replace image' : 'Upload image'}
          </button>
          {value && optional && (
            <button className="c-btn sm plain" onClick={() => ctx.update('en', path, '')}>
              <X aria-hidden="true" />Remove
            </button>
          )}
        </div>
        <input
          className={`c-input${ctx.problemAt.has(path) ? ' invalid' : ''}`}
          value={value}
          spellCheck={false}
          onChange={(e) => { setBroken(false); ctx.update('en', path, e.target.value); }}
          aria-label="Image address"
          placeholder="/folder/image.webp or https://…"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
        />
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" hidden onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ''; }} />
      </div>
    </div>
  );
}

function ListField({ value, path, k, ctx }: { value: Plain[]; path: string; k: string; ctx: Ctx }) {
  const f = resolveField(path, k, value, ctx.hints);
  const [open, setOpen] = useState<number | null>(value.length === 1 ? 0 : null);
  const itemLabel = f.itemLabel ?? 'item';
  const simpleItems = value.every((v) => typeof v === 'string');
  const canBeEmpty = (p: string) => {
    const r = resolveField(p, p.split('.').pop() ?? '', [], ctx.hints);
    return !r.required && listCanBeEmpty(r.allowEmpty, knownAt(ctx, p));
  };
  const atMinimum = value.length <= 1 && !canBeEmpty(path);

  const template = (): Plain => {
    // The last item, or else the first item of this list anywhere in the original content.
    const example = knownAt(ctx, path).find((l) => Array.isArray(l) && l.length) as Plain[] | undefined;
    const src = value[value.length - 1] ?? example?.[0] ?? '';
    return blankFrom(src, ctx.hints, `${path}.${value.length}`, canBeEmpty);
  };
  const add = () => {
    const item = template();
    ctx.updateList(path, (l) => [...l, item], (l) => [...l, arabicTree(item, {})]);
    setOpen(value.length);
  };
  const duplicate = (i: number) => {
    const copy = copyOf(value[i], ctx.hints, `${path}.${i}`);
    ctx.updateList(path, (l) => [...l.slice(0, i + 1), copy, ...l.slice(i + 1)], (l) => [...l.slice(0, i + 1), l[i], ...l.slice(i + 1)]);
    setOpen(i + 1);
  };
  const remove = (i: number) => {
    ctx.updateList(path, (l) => l.filter((_, j) => j !== i), (l) => l.filter((_, j) => j !== i));
    setOpen(null);
    ctx.toast(`${itemLabel.charAt(0).toUpperCase() + itemLabel.slice(1)} removed. Discard to undo.`);
  };
  const move = (i: number, d: number) => {
    const j = i + d;
    const swap = (l: Plain[]) => { const c = [...l]; [c[i], c[j]] = [c[j], c[i]]; return c; };
    ctx.updateList(path, swap, swap);
    setOpen(open === i ? j : open === j ? i : open);
  };

  return (
    <div className="c-items">
      {value.map((item, i) => {
        const p = `${path}.${i}`;
        const isOpen = open === i || simpleItems || hasProblemIn(ctx, p);
        const arItem = getAt(ctx.ar, p);
        const itemMissing = translatablePaths(item, ctx.hints, p).some((tp) => {
          const ev = getAt(ctx.en, tp);
          return typeof ev === 'string' && ev.trim() && !String(getAt(ctx.ar, tp) ?? '').trim();
        });
        return (
          <div key={i} className={`c-item${isOpen && !simpleItems ? ' open' : ''}`}>
            <div className="c-item-head">
              {simpleItems ? (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="c-pair">
                    <input className="c-input" value={String(item ?? '')} aria-label={`${itemLabel} ${i + 1} (English)`} onChange={(e) => ctx.update('en', p, e.target.value)} />
                    <input className={`c-input${String(item).trim() && !String(arItem ?? '').trim() ? ' missing' : ''}`} dir="rtl" lang="ar" value={String(arItem ?? '')}
                      placeholder="أضف الترجمة العربية" aria-label={`${itemLabel} ${i + 1} (Arabic)`} onChange={(e) => ctx.update('ar', p, e.target.value)} />
                  </div>
                </div>
              ) : (
                <button className="c-item-toggle" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span className="n">{i + 1}</span>
                  <b>{itemTitle(item, i)}</b>
                  {hasProblemIn(ctx, p) ? <span className="c-pill bad" style={{ height: 20 }}>Fix</span> : itemMissing && <span className="c-pill warn" style={{ height: 20 }}>Arabic</span>}
                  <ChevronRight className="chev" aria-hidden="true" />
                </button>
              )}
              <div className="c-item-tools">
                <button className="c-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" title="Move up"><ArrowUp aria-hidden="true" /></button>
                <button className="c-icon-btn" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down" title="Move down"><ArrowDown aria-hidden="true" /></button>
                {!f.fixed && (
                  <>
                    <button className="c-icon-btn" onClick={() => duplicate(i)} aria-label="Duplicate" title="Duplicate"><Copy aria-hidden="true" /></button>
                    <button className="c-icon-btn" onClick={() => remove(i)} disabled={atMinimum} aria-label="Delete"
                      title={atMinimum ? `Keep at least one ${itemLabel.toLowerCase()}. Edit it instead.` : 'Delete'} style={{ color: 'var(--red)' }}>
                      <Trash2 aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </div>
            {isOpen && !simpleItems && (
              <div className="c-item-body">
                {isObj(item) ? <ObjectFields value={item} path={p} ctx={ctx} /> : Array.isArray(item) ? <ListField value={item} path={p} k={String(i)} ctx={ctx} /> : null}
              </div>
            )}
          </div>
        );
      })}
      {!f.fixed && (
        <button className="c-add" onClick={add}>
          <Plus aria-hidden="true" />Add {itemLabel.toLowerCase()}
        </button>
      )}
    </div>
  );
}

/* ---------- history ---------- */

function HistorySheet({ sectionKey, onClose, onRestore }: { sectionKey: string; onClose: () => void; onRestore: (v: CmsVersion) => void }) {
  const [versions, setVersions] = useState<CmsVersion[] | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    historyAction(sectionKey).then((res) => (res.ok ? setVersions(res.versions) : setError(res.error)));
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sectionKey, onClose]);

  return (
    <>
      <div className="c-scrim" onClick={onClose} />
      <aside className="c-sheet" role="dialog" aria-label="History">
        <div className="c-sheet-head">
          <div>
            <h4>History</h4>
            <p>Every saved version. Restoring loads it into the editor; save to make it live.</p>
          </div>
          <button className="c-icon-btn" onClick={onClose} aria-label="Close"><X aria-hidden="true" /></button>
        </div>
        <div className="c-sheet-body">
          {!versions && !error && <div className="c-empty"><LoaderCircle className="c-spin" aria-label="Loading" /></div>}
          {error && <div className="c-error" style={{ margin: 12 }}>{error}</div>}
          {versions?.length === 0 && <div className="c-empty">No saved versions yet. The section still shows its original content.</div>}
          {versions?.map((v, i) => (
            <div className="c-version" key={v.id}>
              <div className="c-avatar" aria-hidden="true">{(v.saved_by ?? '?').slice(0, 2).toUpperCase()}</div>
              <div className="t">
                <b>{fullDate(v.saved_at)}</b>
                <span>{v.saved_by ?? 'Unknown'}{v.enabled ? '' : ' · hidden'} · {timeAgo(v.saved_at)}</span>
              </div>
              {i === 0 ? <span className="c-pill ok">Live now</span> : <button className="c-btn sm" onClick={() => onRestore(v)}>Restore</button>}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
