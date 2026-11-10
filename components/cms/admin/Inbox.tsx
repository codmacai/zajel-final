'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { ArrowLeft, Check, Copy, Inbox as InboxIcon, Mail, Phone, Reply, RotateCcw, Search, Trash2 } from 'lucide-react';
import { deleteMessageAction, setMessageStatusAction } from '@/app/admin/actions';
import type { CmsMessage, MessageStatus } from '@/lib/cms/store';
import { useToast } from './Toast';
import { fullDate, timeAgo } from './time';

type Filter = 'open' | 'done' | 'all';

const FORM_NAMES: Record<string, string> = { contact: 'Contact form', quote: 'Quote request' };

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || '?';
}

export default function Inbox({ messages: initial }: { messages: CmsMessage[] }) {
  const router = useRouter();
  const toast = useToast();
  const [messages, setMessages] = useState(initial);
  // Take in the latest list after a refresh (new messages, or changes from another admin).
  const [lastInitial, setLastInitial] = useState(initial);
  if (lastInitial !== initial) {
    setLastInitial(initial);
    setMessages(initial);
  }
  const [filter, setFilter] = useState<Filter>('open');
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [, startTransition] = useTransition();

  const counts = useMemo(
    () => ({ open: messages.filter((m) => m.status !== 'done').length, done: messages.filter((m) => m.status === 'done').length, all: messages.length }),
    [messages],
  );
  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return messages.filter((m) => {
      if (filter === 'open' && m.status === 'done') return false;
      if (filter === 'done' && m.status !== 'done') return false;
      const text = `${m.name} ${m.email} ${m.phone ?? ''} ${m.subject ?? ''} ${m.message}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }, [messages, filter, q]);
  const open = messages.find((m) => m.id === openId) ?? null;

  /** Changes a message here at once, then saves it; puts it back if saving fails. */
  const change = (m: CmsMessage, status: MessageStatus, done?: string) => {
    const before = messages;
    setMessages((list) => list.map((x) => (x.id === m.id ? { ...x, status } : x)));
    startTransition(async () => {
      const res = await setMessageStatusAction(m.id, status);
      if (!res.ok) {
        setMessages(before);
        toast(res.error, 'error');
        return;
      }
      if (done) toast(done);
      router.refresh();
    });
  };

  const openMessage = (m: CmsMessage) => {
    setOpenId(m.id);
    setConfirmDelete(false);
    if (m.status === 'new') change(m, 'read');
  };

  const remove = (m: CmsMessage) => {
    if (!confirmDelete) return setConfirmDelete(true);
    const before = messages;
    setMessages((list) => list.filter((x) => x.id !== m.id));
    setOpenId(null);
    setConfirmDelete(false);
    startTransition(async () => {
      const res = await deleteMessageAction(m.id);
      if (!res.ok) {
        setMessages(before);
        return toast(res.error, 'error');
      }
      toast('Message deleted');
      router.refresh();
    });
  };

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${what} copied`);
    } catch {
      toast(`Couldn’t copy the ${what.toLowerCase()}`, 'error');
    }
  };

  if (messages.length === 0) {
    return (
      <div className="c-card c-inbox-empty">
        <div className="c-inbox-empty-ic"><InboxIcon aria-hidden="true" /></div>
        <b>No messages yet</b>
        <p>Messages sent from the website’s contact and quote forms will appear here.</p>
      </div>
    );
  }

  return (
    <div className={`c-inbox${open ? ' reading' : ''}`}>
      <div className="c-card c-inbox-list">
        <div className="c-inbox-tools">
          <div className="c-seg" role="group" aria-label="Show">
            {(['open', 'done', 'all'] as Filter[]).map((f) => (
              <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f === 'open' ? 'To do' : f === 'done' ? 'Done' : 'All'} <span className="n">{counts[f]}</span>
              </button>
            ))}
          </div>
          <label className="c-inbox-search">
            <Search aria-hidden="true" />
            <input className="c-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search messages" aria-label="Search messages" />
          </label>
        </div>
        {shown.length === 0 && <div className="c-empty">{q ? `Nothing matches “${q}”.` : filter === 'open' ? 'All caught up. Nothing to do.' : 'Nothing here yet.'}</div>}
        {shown.map((m) => (
          <button key={m.id} className={`c-msg${m.id === openId ? ' active' : ''}${m.status === 'new' ? ' unread' : ''}`} onClick={() => openMessage(m)}>
            <div className="c-avatar" aria-hidden="true">{initials(m.name)}</div>
            <div className="t">
              <div className="top">
                <b>{m.name}</b>
                <time dateTime={m.created_at} suppressHydrationWarning>{timeAgo(m.created_at)}</time>
              </div>
              <span className="subj">{m.subject || FORM_NAMES[m.form] || 'Message'}</span>
              <span className="prev">{m.message.replace(/\s+/g, ' ').slice(0, 140)}</span>
            </div>
            {m.status === 'new' && <i className="dot" aria-label="New" />}
            {m.status === 'done' && <Check className="done" aria-label="Done" />}
          </button>
        ))}
      </div>

      <div className="c-card c-inbox-read">
        {!open ? (
          <div className="c-empty c-inbox-pick">
            <Mail aria-hidden="true" />
            Choose a message to read it.
          </div>
        ) : (
          <article>
            <button className="c-btn sm plain c-inbox-back" onClick={() => setOpenId(null)}>
              <ArrowLeft aria-hidden="true" />All messages
            </button>
            <header className="c-read-head">
              <div className="c-avatar lg" aria-hidden="true">{initials(open.name)}</div>
              <div className="who">
                <h2>{open.name}</h2>
                <span suppressHydrationWarning>
                  {FORM_NAMES[open.form] ?? 'Website form'} · {fullDate(open.created_at)}
                  {open.page ? ` · from ${open.page}` : ''}
                </span>
              </div>
              {open.status === 'done' ? <span className="c-pill ok"><i />Done</span> : <span className="c-pill warn"><i />To do</span>}
            </header>

            <div className="c-read-contact">
              <a href={`mailto:${open.email}`}><Mail aria-hidden="true" />{open.email}</a>
              <button className="c-icon-btn" onClick={() => copy(open.email, 'Email')} aria-label="Copy email" title="Copy email"><Copy aria-hidden="true" /></button>
              {open.phone && (
                <>
                  <a href={`tel:${open.phone.replace(/[^\d+]/g, '')}`}><Phone aria-hidden="true" />{open.phone}</a>
                  <button className="c-icon-btn" onClick={() => copy(open.phone!, 'Phone number')} aria-label="Copy phone number" title="Copy phone number"><Copy aria-hidden="true" /></button>
                </>
              )}
            </div>

            {open.subject && <h3 className="c-read-subj">{open.subject}</h3>}
            <div className="c-read-body">{open.message}</div>
            {open.status === 'done' && open.handled_by && (
              <p className="c-read-note" suppressHydrationWarning>Marked done by {open.handled_by}{open.handled_at ? `, ${timeAgo(open.handled_at)}` : ''}</p>
            )}

            <footer className="c-read-actions">
              <a
                className="c-btn primary"
                href={`mailto:${open.email}?subject=${encodeURIComponent(`Re: ${open.subject || 'Your message to Zajel'}`)}`}
              >
                <Reply aria-hidden="true" />Reply by email
              </a>
              {open.status === 'done' ? (
                <button className="c-btn" onClick={() => change(open, 'read', 'Moved back to To do')}>
                  <RotateCcw aria-hidden="true" />Not done
                </button>
              ) : (
                <button className="c-btn" onClick={() => change(open, 'done', 'Marked as done')}>
                  <Check aria-hidden="true" />Mark as done
                </button>
              )}
              <div className="grow" />
              <button className={`c-btn${confirmDelete ? ' danger-solid' : ' danger'}`} onClick={() => remove(open)} onBlur={() => setConfirmDelete(false)}>
                <Trash2 aria-hidden="true" />{confirmDelete ? 'Click again to delete' : 'Delete'}
              </button>
            </footer>
          </article>
        )}
      </div>
    </div>
  );
}
