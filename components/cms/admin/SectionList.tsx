'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { ChevronRight } from 'lucide-react';
import { setSectionEnabledAction } from '@/app/admin/actions';
import { useToast } from './Toast';

interface Item {
  id: string;
  key: string;
  label: string;
  summary: string;
  enabled: boolean;
  edited: boolean;
  missingArabic: number;
}

export default function SectionList({ pageId, sections }: { pageId: string; sections: Item[] }) {
  const [enabled, setEnabled] = useState(() => Object.fromEntries(sections.map((s) => [s.key, s.enabled])));
  const [pending, start] = useTransition();
  const toast = useToast();

  const toggle = (s: Item) => {
    const next = !enabled[s.key];
    setEnabled((e) => ({ ...e, [s.key]: next }));
    start(async () => {
      const res = await setSectionEnabledAction(s.key, next);
      if (!res.ok) {
        setEnabled((e) => ({ ...e, [s.key]: !next }));
        toast(res.error, 'error');
      } else toast(next ? `“${s.label}” is shown on the site` : `“${s.label}” is hidden from the site`);
    });
  };

  return (
    <div className="c-card c-list">
      {sections.map((s, i) => {
        const on = enabled[s.key];
        return (
          <div key={s.key} className={`c-row link${on ? '' : ' off'}`}>
            <Link href={`/admin/${pageId}/${s.id}`} className="c-row-link" aria-label={`Edit ${s.label}`} />
            <div className="c-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
            <div className="t">
              <b>{s.label}</b>
              <span>{s.summary || '—'}</span>
            </div>
            <div className="meta">
              {!on && <span className="c-pill off"><i />Hidden</span>}
              {s.missingArabic > 0 ? (
                <span className="c-pill warn"><i />{s.missingArabic} Arabic missing</span>
              ) : (
                <span className="c-pill ok"><i />Arabic done</span>
              )}
              {s.edited && <span className="c-pill">Edited</span>}
            </div>
            <button
              className="c-switch"
              role="switch"
              aria-checked={on}
              aria-label={`Show “${s.label}” on the site`}
              disabled={pending}
              onClick={() => toggle(s)}
            />
            <ChevronRight className="chev" aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
}
