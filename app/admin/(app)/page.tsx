import Link from 'next/link';
import { ChevronRight, CircleAlert } from 'lucide-react';
import { requireAdmin } from '@/lib/cms/auth';
import { allStatuses } from '@/lib/cms/admin';
import { PAGES } from '@/lib/cms/registry';
import { cmsWritable } from '@/lib/cms/store';
import { timeAgo } from '@/components/cms/admin/time';
import { pageIcon } from '@/components/cms/admin/icons';

function greeting() {
  const h = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Asia/Dubai' }).format(new Date()));
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default async function Overview() {
  const admin = await requireAdmin();
  const { statuses, error } = await allStatuses().then(
    (statuses) => ({ statuses, error: '' }),
    (e: Error) => ({ statuses: [], error: e.message }),
  );
  const name = admin.email.split('@')[0].split(/[._-]/)[0];
  const sections = statuses.length;
  const edited = statuses.filter((s) => s.edited);
  const missing = statuses.filter((s) => s.missingArabic > 0);
  const texts = statuses.reduce((n, s) => n + Object.keys(s.arabic).length + s.missingArabic, 0);
  const translated = statuses.reduce((n, s) => n + Object.keys(s.arabic).length, 0);
  const coverage = texts ? Math.round((translated / texts) * 100) : 100;
  const recent = [...edited].sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')).slice(0, 6);
  const attention = [...missing].sort((a, b) => b.missingArabic - a.missingArabic).slice(0, 6);

  return (
    <>
      <div className="c-head">
        <div>
          <h1 className="c-title">
            {greeting()}, {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <p className="c-sub">Every page of zajel.com is in the sidebar. Open one to edit its sections in English and Arabic.</p>
        </div>
      </div>

      {(!cmsWritable() || error) && (
        <div className="c-notice" role="status">
          <CircleAlert aria-hidden="true" />
          <div>
            <b>{error ? 'Couldn’t load the content' : 'Saving is turned off'}</b>
            {error || 'The server is missing the Supabase secret key (SUPABASE_SECRET_KEY). You can look around, but changes can’t be saved.'}
          </div>
        </div>
      )}

      <div className="c-stats">
        <div className="c-card c-stat"><span>Pages</span><b>{PAGES.length}</b></div>
        <div className="c-card c-stat"><span>Sections</span><b>{sections}</b></div>
        <div className="c-card c-stat"><span>Edited in the CMS</span><b>{edited.length}</b></div>
        <div className={`c-card c-stat${coverage < 100 ? ' warn' : ''}`}>
          <span>Arabic translated</span>
          <b>{coverage}%</b>
          <div className="bar" aria-hidden="true"><i style={{ width: `${coverage}%` }} /></div>
        </div>
      </div>

      <h2 className="c-h2">Activity</h2>
      <div className="c-cols">
        <div className="c-card c-list">
          <div className="c-card-head"><h3>Recent changes</h3></div>
          {recent.length === 0 && <div className="c-empty">Nothing edited yet. The site shows its original content until you save a section.</div>}
          {recent.map((s) => {
            const Icon = pageIcon(s.page.id);
            return (
              <Link key={s.key} href={`/admin/${s.page.id}/${s.section.id}`} className="c-row">
                <div className="c-tile" style={{ background: 'var(--green)' }}><Icon aria-hidden="true" /></div>
                <div className="t">
                  <b>{s.section.label} · {s.page.label}</b>
                  <span>{s.updatedBy ?? 'Someone'} · {timeAgo(s.updatedAt)}</span>
                </div>
                <ChevronRight className="chev" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
        <div className="c-card c-list">
          <div className="c-card-head"><h3>Needs Arabic</h3></div>
          {attention.length === 0 && <div className="c-empty">Every text has its Arabic translation.</div>}
          {attention.map((s) => (
            <Link key={s.key} href={`/admin/${s.page.id}/${s.section.id}`} className="c-row">
              <div className="t">
                <b>{s.section.label}</b>
                <span>{s.page.label}</span>
              </div>
              <span className="c-pill warn">{s.missingArabic} missing</span>
              <ChevronRight className="chev" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
