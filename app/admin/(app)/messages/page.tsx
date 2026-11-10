import type { Metadata } from 'next';
import { CircleAlert } from 'lucide-react';
import { requireAdmin } from '@/lib/cms/auth';
import { InboxMissingError, listMessages, type CmsMessage } from '@/lib/cms/store';
import Inbox from '@/components/cms/admin/Inbox';

export const metadata: Metadata = { title: 'Messages' };

export default async function MessagesPage() {
  const [, result] = await Promise.all([
    requireAdmin('/admin/messages'),
    listMessages().then(
      (messages) => ({ messages, missing: false, error: '' }),
      (e: Error) => ({ messages: [] as CmsMessage[], missing: e instanceof InboxMissingError, error: e.message }),
    ),
  ]);

  return (
    <>
      <div className="c-head">
        <div>
          <h1 className="c-title">Messages</h1>
          <p className="c-sub">From the website’s contact and quote forms. Reply by email, then mark each one as done.</p>
        </div>
      </div>
      {result.missing ? (
        <div className="c-notice" role="status">
          <CircleAlert aria-hidden="true" />
          <div>
            <b>The inbox isn’t switched on yet</b>
            Run the second CMS file (supabase/migrations/20261110000000_cms_hardening.sql) in Supabase → SQL Editor. Messages will then appear here.
          </div>
        </div>
      ) : result.error ? (
        <div className="c-notice" role="status">
          <CircleAlert aria-hidden="true" />
          <div>
            <b>Couldn’t load messages</b>
            {result.error}
          </div>
        </div>
      ) : (
        <Inbox messages={result.messages} />
      )}
    </>
  );
}
