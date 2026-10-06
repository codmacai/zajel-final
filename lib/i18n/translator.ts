// ===========================================================================
// Site-wide Arabic, applied to the page as it renders.
//
// The site's copy is written in English inside the components. Rather than
// thread a t() call through every one of them, this swaps each English text
// node (and the placeholder / aria-label / title / alt attributes) for its
// Arabic translation from locales/ar.json, keyed by the exact English text.
// A MutationObserver keeps new content (route changes, opened menus, form
// steps) translated, and switching back to English restores the originals.
//
// Arabic also turns the document right-to-left (<html dir="rtl" lang="ar">).
// The choice is remembered in localStorage("lang"); an inline script in the
// layout applies it before first paint (see I18N_BOOT_SCRIPT).
//
// To translate new copy: add "English text": "Arabic text" to locales/ar.json.
// To keep something in English, put data-no-translate on it.
// ===========================================================================

export type Lang = "en" | "ar";

type Dict = Record<string, string>;
const ATTRS = ["placeholder", "aria-label", "title", "alt"] as const;
const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA", "svg", "SVG"]);

let lang: Lang = "en";
let dict: Dict | null = null;
let observer: MutationObserver | null = null;
let queued = false;
const pending = new Set<Node>();
const listeners = new Set<() => void>();
// what we changed, so English can be put back exactly
const texts = new Map<Text, { en: string; ar: string }>();
const attrs = new Map<Element, Map<string, { en: string; ar: string }>>();
let titleEn: string | null = null;

const norm = (s: string) => s.replace(/\s+/g, " ").trim();

export const getLang = (): Lang => lang;
export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => void listeners.delete(fn);
}

function skipped(el: Element | null): boolean {
  for (let e = el; e; e = e.parentElement) {
    if (SKIP.has(e.tagName)) return true;
    if (e.hasAttribute("data-no-translate")) return true;
  }
  return false;
}

/** Arabic for one piece of English, or null. Keeps a trailing colon, ellipsis or asterisk. */
function lookup(en: string): string | null {
  if (!dict) return null;
  const k = norm(en);
  if (!k || !/[A-Za-z]/.test(k)) return null;
  if (dict[k]) return dict[k];
  const m = k.match(/^(.*?)(\s*[:*…]+)$/);
  if (m && dict[m[1]]) return dict[m[1]] + m[2];
  return null;
}

function doText(t: Text) {
  const v = t.nodeValue ?? "";
  const done = texts.get(t);
  if (done && v === done.ar) return;
  if (skipped(t.parentElement)) return;
  const ar = lookup(v);
  if (!ar) return;
  const lead = v.match(/^\s*/)![0];
  const trail = v.match(/\s*$/)![0];
  const next = lead + ar + trail;
  texts.set(t, { en: v, ar: next });
  t.nodeValue = next;
}

function doAttrs(el: Element) {
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (!v) continue;
    const seen = attrs.get(el)?.get(a);
    if (seen && v === seen.ar) continue;
    const ar = lookup(v);
    if (!ar) continue;
    if (!attrs.has(el)) attrs.set(el, new Map());
    attrs.get(el)!.set(a, { en: v, ar });
    el.setAttribute(a, ar);
  }
}

function walk(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return doText(root as Text);
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  if (skipped(el)) return;
  doAttrs(el);
  const w = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.nodeType === Node.ELEMENT_NODE && (SKIP.has((n as Element).tagName) || (n as Element).hasAttribute("data-no-translate"))
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    if (n.nodeType === Node.TEXT_NODE) doText(n as Text);
    else doAttrs(n as Element);
  }
}

function doTitle() {
  const t = document.title;
  if (titleEn !== null && t === translateTitle(titleEn)) return;
  titleEn = t;
  document.title = translateTitle(t);
}
const translateTitle = (t: string) =>
  t
    .split(" | ")
    .map((p) => lookup(p) ?? (p.trim() === "Zajel" ? "زاجل" : p))
    .join(" | ");

function flush() {
  queued = false;
  if (lang !== "ar") return pending.clear();
  pending.forEach((n) => n.isConnected && walk(n));
  pending.clear();
  doTitle();
}

function observe() {
  if (observer) return;
  observer = new MutationObserver((records) => {
    for (const r of records) {
      if (r.type === "characterData") pending.add(r.target);
      else if (r.type === "attributes") pending.add(r.target);
      else r.addedNodes.forEach((n) => pending.add(n));
    }
    if (!queued) {
      queued = true;
      // translate in the same frame the change lands, so English never paints
      queueMicrotask(flush);
    }
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...ATTRS],
  });
}

function restore() {
  observer?.disconnect();
  observer = null;
  texts.forEach(({ en, ar }, t) => {
    if (t.isConnected && t.nodeValue === ar) t.nodeValue = en;
  });
  texts.clear();
  attrs.forEach((m, el) =>
    m.forEach(({ en, ar }, a) => {
      if (el.getAttribute(a) === ar) el.setAttribute(a, en);
    })
  );
  attrs.clear();
  if (titleEn !== null) document.title = titleEn;
  titleEn = null;
}

function applyDocument(l: Lang) {
  const html = document.documentElement;
  html.lang = l;
  html.dir = l === "ar" ? "rtl" : "ltr";
}

export async function setLang(next: Lang) {
  try {
    localStorage.setItem("lang", next);
  } catch {}
  lang = next;
  applyDocument(next);
  if (next === "ar") {
    dict ??= (await import("@/locales/ar.json")).default as Dict;
    if (lang !== "ar") return; // switched back while loading
    walk(document.body);
    doTitle();
    observe();
  } else {
    restore();
  }
  document.documentElement.classList.remove("i18n-pending");
  listeners.forEach((fn) => fn());
}

export function storedLang(): Lang {
  try {
    return localStorage.getItem("lang") === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

/** Runs in <head> before first paint: right-to-left at once, and the page held back until it's in Arabic. */
export const I18N_BOOT_SCRIPT = `(function(){try{if(localStorage.getItem("lang")==="ar"){var h=document.documentElement;h.lang="ar";h.dir="rtl";h.classList.add("i18n-pending");setTimeout(function(){h.classList.remove("i18n-pending")},2500)}}catch(e){}})();`;
