'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { setPageEnabledAction } from '@/app/admin/actions';
import { useToast } from './Toast';

/** "Page on the website" switch on a page's screen in the CMS. */
export default function PageSwitch({ pageId, label, enabled: initial }: { pageId: string; label: string; enabled: boolean }) {
  const router = useRouter();
  const toast = useToast();
  const [enabled, setEnabled] = useState(initial);
  const [pending, start] = useTransition();

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    start(async () => {
      const res = await setPageEnabledAction(pageId, next);
      if (!res.ok) {
        setEnabled(!next);
        return toast(res.error, 'error');
      }
      toast(next ? `${label} is back on the website` : `${label} is hidden from the website`);
      router.refresh();
    });
  };

  return (
    <div className={`c-card c-page-switch${enabled ? '' : ' off'}`}>
      <div className="t">
        <b>{enabled ? 'This page is on the website' : 'This page is hidden from the website'}</b>
        <span>
          {enabled
            ? 'Switch it off to hide the whole page. Visitors will see “page not found” and its links leave the menu and footer.'
            : 'Visitors see “page not found”, and it is out of the menu, footer and Google sitemap. You can still edit it here.'}
        </span>
      </div>
      <button className="c-switch" role="switch" aria-checked={enabled} aria-label={`Show ${label} on the website`} disabled={pending} onClick={toggle} />
    </div>
  );
}
