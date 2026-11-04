'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ChevronRight, LayoutGrid, LogOut, Menu, Search, X } from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';
import type { NavPage } from '@/lib/cms/admin';
import { pageIcon } from './icons';
import { ToastProvider } from './Toast';



const GROUP_ORDER = ['Site-wide', 'Main', 'Solutions', 'Services', 'Secure', 'Company', 'Help'];

function initials(email: string) {
  const name = email.split('@')[0].replace(/[^a-z]/gi, ' ').trim();
  const parts = name.split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? parts[0]?.[1] ?? '')).toUpperCase() || 'Z';
}

export default function AdminShell({ nav, email, children }: { nav: NavPage[]; email: string; children: ReactNode }) {
  const pathname = usePathname();
  const [sideOpen, setSideOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [, , pageId, sectionId] = pathname.split('/');
  const page = nav.find((p) => p.id === pageId);
  const section = page?.sections.find((s) => s.id === sectionId);

  // Close the mobile menu when the page changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setSideOpen(false);
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const groups = GROUP_ORDER.map((g) => ({ g, pages: nav.filter((p) => p.group === g) })).filter((x) => x.pages.length);

  return (
    <ToastProvider>
    <div className="c-shell">
      {sideOpen && <div className="c-scrim" onClick={() => setSideOpen(false)} />}
      <aside className={`c-side${sideOpen ? ' open' : ''}`} aria-label="CMS navigation">
        <div className="c-brand">
          <div className="c-mark" aria-hidden="true">z</div>
          <div>
            <b>Zajel CMS</b>
            <span>zajel.com</span>
          </div>
        </div>
        <button className="c-search" onClick={() => setPaletteOpen(true)}>
          <Search size={16} aria-hidden="true" />
          Search pages and sections
          <kbd>⌘K</kbd>
        </button>
        <nav className="c-nav">
          <div className="c-nav-group">
            <Link href="/admin" className="c-nav-link" aria-current={pathname === '/admin' ? 'page' : undefined}>
              <LayoutGrid className="c-nav-ic" aria-hidden="true" />
              Overview
            </Link>
          </div>
          {groups.map(({ g, pages }) => (
            <div className="c-nav-group" key={g}>
              <h6>{g}</h6>
              {pages.map((p) => {
                const Icon = pageIcon(p.id);
                return (
                  <Link key={p.id} href={`/admin/${p.id}`} className="c-nav-link" aria-current={p.id === pageId ? 'page' : undefined}>
                    <Icon className="c-nav-ic" aria-hidden="true" />
                    <span>{p.label}</span>
                    {p.missingArabic > 0 && (
                      <span className="c-nav-dot" title={`${p.missingArabic} texts without Arabic`}>
                        {p.missingArabic}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="c-side-foot">
          <div className="c-avatar" aria-hidden="true">{initials(email)}</div>
          <div className="who">
            <b>{email}</b>
            <span>Admin</span>
          </div>
          <form action={logoutAction}>
            <button className="c-icon-btn" type="submit" title="Sign out" aria-label="Sign out">
              <LogOut aria-hidden="true" />
            </button>
          </form>
        </div>
      </aside>

      <div className="c-main">
        <header className={`c-top${scrolled ? ' scrolled' : ''}`}>
          <button className="c-icon-btn c-menu-btn" onClick={() => setSideOpen(true)} aria-label="Open menu">
            <Menu aria-hidden="true" />
          </button>
          <nav className="c-crumbs" aria-label="Breadcrumb">
            {page ? <Link href="/admin">Overview</Link> : <b>Overview</b>}
            {page && <ChevronRight aria-hidden="true" />}
            {page && (section ? <Link href={`/admin/${page.id}`}>{page.label}</Link> : <b>{page.label}</b>)}
            {section && <ChevronRight aria-hidden="true" />}
            {section && <b>{section.label}</b>}
          </nav>
          <div className="grow" />
        </header>
        <main className="c-content">{children}</main>
      </div>

      {paletteOpen && <Palette nav={nav} onClose={() => setPaletteOpen(false)} />}
    </div>
    </ToastProvider>
  );
}

function Palette({ nav, onClose }: { nav: NavPage[]; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const all = useMemo(
    () => [
      { href: '/admin', label: 'Overview', hint: '', icon: LayoutGrid },
      ...nav.flatMap((p) => [
        { href: `/admin/${p.id}`, label: p.label, hint: p.group, icon: pageIcon(p.id) },
        ...p.sections.map((s) => ({ href: `/admin/${p.id}/${s.id}`, label: s.label, hint: p.label, icon: ChevronRight })),
      ]),
    ],
    [nav],
  );
  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return all.filter((r) => r.icon !== ChevronRight).slice(0, 40);
    return all.filter((r) => words.every((w) => `${r.label} ${r.hint}`.toLowerCase().includes(w))).slice(0, 40);
  }, [q, all]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <>
      <div className="c-scrim" onClick={onClose} />
      <div className="c-palette" role="dialog" aria-label="Search pages and sections">
        <div className="c-palette-input">
          <Search aria-hidden="true" />
          <input
            autoFocus
            value={q}
            placeholder="Search pages and sections"
            onChange={(e) => { setQ(e.target.value); setSel(0); }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
              if (e.key === 'Enter' && results[sel]) go(results[sel].href);
              if (e.key === 'Escape') onClose();
            }}
            aria-label="Search"
          />
          <button className="c-icon-btn" onClick={onClose} aria-label="Close">
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="c-palette-list" role="listbox" ref={listRef}>
          {results.length === 0 && <div className="c-empty">Nothing matches “{q}”.</div>}
          {results.map((r, i) => {
            const Icon = r.icon;
            return (
              <button
                key={r.href}
                className="c-palette-item"
                role="option"
                aria-selected={i === sel}
                onMouseEnter={() => setSel(i)}
                onClick={() => go(r.href)}
              >
                <Icon aria-hidden="true" />
                <b>{r.label}</b>
                <span>{r.hint}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
