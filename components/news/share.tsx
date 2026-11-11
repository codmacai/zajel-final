'use client';

import { useState } from 'react';
import { Check, Link2, Mail } from 'lucide-react';

const btn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-[#1b4332]/10 bg-white text-[#1b4332]/70 transition-colors hover:border-[#36B936]/40 hover:bg-[#36B936]/10 hover:text-[#1b4332] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36B936]';

/** Share buttons for an article: LinkedIn, X, WhatsApp, email and copy link. */
export default function ShareBar({ url, title, label, copiedLabel }: { url: string; title: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
      <span className="w-full text-[13px] font-medium text-[#1b4332]/60 sm:me-1 sm:w-auto">{label}</span>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      </a>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
        </svg>
      </a>
      <a className={btn} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.21 4.24-9.45 9.46-9.45 2.53 0 4.9.99 6.69 2.78a9.39 9.39 0 0 1 2.77 6.69c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.69C5.78.69.68 5.79.68 12.05c0 2 .52 3.96 1.52 5.68L.58 23.31l5.7-1.5a11.34 11.34 0 0 0 5.43 1.38h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.32-8.03z" />
        </svg>
      </a>
      <a className={btn} href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email">
        <Mail aria-hidden="true" className="h-4 w-4" />
      </a>
      <span className="relative">
        <button type="button" className={btn} onClick={copy} aria-label="Copy link">
          {copied ? <Check aria-hidden="true" className="h-4 w-4 text-[#2ea22e]" /> : <Link2 aria-hidden="true" className="h-4 w-4" />}
        </button>
        <span
          role="status"
          className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1b4332] px-3 py-1 text-[12px] font-medium text-white shadow-md transition-all duration-200 ${copied ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}
        >
          {copiedLabel}
        </span>
      </span>
    </div>
  );
}
