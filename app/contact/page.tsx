'use client';

import React, { useId, useState } from 'react';
import { Manrope } from 'next/font/google';

// Only 400 and 500 are loaded, so nothing on this page can render bold.
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const CONTACT_ITEMS: {
  icon: React.ReactNode;
  label: string;
  primary: string;
  secondary?: string;
  href?: string;
}[] = [
  { icon: <PhoneIcon />, label: 'Phone', primary: '+971 60 053 1111', href: 'tel:+971600531111' },
  { icon: <ClockIcon />, label: 'Business hours', primary: 'Mon – Sat: 8 AM – 5 PM', secondary: '' },
  { icon: <PinIcon />, label: 'Headquarters', primary: 'Dubai, United Arab Emirates', secondary: 'ZAJEL Courier Services' },
  { icon: <PinIcon />, label: 'Branch office', primary: 'Abu Dhabi, United Arab Emirates', secondary: 'ZAJEL Courier Services' },
];

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: 'Instagram', href: 'https://instagram.com/', icon: <InstagramIcon /> },
  { label: 'X', href: 'https://x.com/', icon: <XIcon /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: <LinkedInIcon /> },
  { label: 'Facebook', href: 'https://facebook.com/', icon: <FacebookIcon /> },
];

/* -------------------------------------------------------------------------- */
/*  Shared styles                                                             */
/* -------------------------------------------------------------------------- */

const controlClass =
  'w-full rounded-xl border border-[#E5EBE7] bg-white px-4 py-3 text-[14px] font-normal text-[#064423] ' +
  'placeholder:text-[#064423]/35 outline-none transition ' +
  'hover:border-[#064423]/25 focus:border-[#36B936] focus:ring-4 focus:ring-[#36B936]/15';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/25';

// Site-wide primary button (matches the hero CTA). Outline is dark green
// because this page has a light background.
const primaryButton =
  'inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] ' +
  'px-[clamp(1.25rem,2vw,1.75rem)] py-[clamp(0.7rem,1vw,0.85rem)] text-xs font-medium text-[#0B140F] shadow-md ' +
  'transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-[#064423] ' +
  'disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 sm:w-auto sm:text-sm';

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const data = Object.fromEntries(new FormData(e.currentTarget));

    // TODO: replace with your API call, e.g.
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    void data;
    await new Promise((r) => setTimeout(r, 900));

    setStatus('success');
  };

  return (
    <section
      className={`${manrope.className} min-h-[100svh] w-full bg-[#FDFDFD] px-4 pb-16 pt-[calc(var(--navbar-height,5rem)+2rem)] sm:px-6 lg:px-12 lg:pb-24 lg:pt-[calc(var(--navbar-height,5rem)+3rem)]`}
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#36B936]" aria-hidden="true" />
          <span className="text-[13px] font-medium text-[#36B936]">Get in touch</span>
        </div>

        {/* Title */}
        <h1 className="mb-10 max-w-[820px] text-[1.75rem] font-medium leading-[1.25] tracking-[-0.02em] text-[#064423] sm:mb-14 sm:text-[2.25rem] lg:mb-20 lg:text-[3rem]">
          We&apos;re here to help with your shipments, services and general inquiries.
        </h1>

        <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-16 xl:gap-24">
          {/* ------------------------- LEFT: details ------------------------- */}
          <div className="flex w-full flex-col lg:w-[38%]">
            <ul className="border-t border-[#064423]/[0.08]">
              {CONTACT_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-4 border-b border-[#064423]/[0.08] py-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF7EA] text-[#36B936]">
                    {item.icon}
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="mb-0.5 text-[12px] font-normal text-[#064423]/50">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={`break-words text-[15px] font-medium leading-snug text-[#064423] transition-colors hover:text-[#2EA32E] ${focusRing} rounded`}
                      >
                        {item.primary}
                      </a>
                    ) : (
                      <span className="text-[15px] font-medium leading-snug text-[#064423]">{item.primary}</span>
                    )}
                    {item.secondary && (
                      <span className="text-[13px] font-normal leading-snug text-[#064423]/55">{item.secondary}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-8">
              <span className="mb-3 block text-[12px] font-normal text-[#064423]/50">Follow us</span>
              <ul className="flex flex-wrap gap-2.5">
                {SOCIALS.map(({ label, href, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-[#064423]/10 bg-white text-[#064423]/55 transition hover:border-[#36B936]/40 hover:bg-[#EAF7EA] hover:text-[#36B936] ${focusRing}`}
                    >
                      {icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* -------------------------- RIGHT: form -------------------------- */}
          <div className="w-full lg:w-[62%]">
            <div className="rounded-[1.5rem] border border-[#E5EBE7] bg-white p-5 shadow-[0_8px_30px_rgba(6,68,35,0.04)] sm:p-8 lg:rounded-[2rem] lg:p-10">
              {status === 'success' ? (
                <div role="status" className="flex flex-col items-center px-2 py-12 text-center sm:py-16">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF7EA] text-[#36B936]">
                    <CheckIcon />
                  </span>
                  <h2 className="mt-6 text-[1.5rem] font-medium tracking-tight text-[#064423]">Message sent</h2>
                  <p className="mt-2 max-w-[380px] text-[14px] leading-relaxed text-[#064423]/60">
                    Thanks for reaching out. We typically reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className={`mt-8 rounded-full border border-[#E5EBE7] px-6 py-3 text-[14px] font-medium text-[#064423] transition hover:bg-[#F0F4F2] ${focusRing}`}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="mb-6 text-[1.375rem] font-medium tracking-tight text-[#064423] sm:mb-8 sm:text-[1.625rem]">
                    Send us a message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                      <InputField name="name" label="Full name" placeholder="John Doe" autoComplete="name" />
                      <InputField
                        name="email"
                        label="Email address"
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        inputMode="email"
                      />
                      <InputField
                        name="phone"
                        label="Phone number"
                        type="tel"
                        placeholder="+971 50 123 4567"
                        autoComplete="tel"
                        inputMode="tel"
                      />
                      <InputField name="subject" label="Subject" placeholder="How can we help?" />
                    </div>

                    <MessageField />

                    <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:gap-4">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={primaryButton}
                      >
                        {status === 'submitting' ? (
                          <>
                            <Spinner />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <span>Send message</span>
                            <span aria-hidden="true">→</span>
                          </>
                        )}
                      </button>
                      <p className="text-center text-[12px] font-normal text-[#064423]/45 sm:text-left">
                        We typically respond within 24 hours.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form fields                                                               */
/* -------------------------------------------------------------------------- */

function InputField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-[#064423]">
        {label} <span className="text-[#36B936]" aria-hidden="true">*</span>
      </label>
      <input id={id} required className={controlClass} {...props} />
    </div>
  );
}

function MessageField() {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-[#064423]">
        Message <span className="text-[#36B936]" aria-hidden="true">*</span>
      </label>
      <textarea
        id={id}
        name="message"
        required
        rows={5}
        placeholder="Please provide details about your inquiry…"
        className={`${controlClass} min-h-[9rem] resize-y`}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

const svgBase = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...svgBase}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...svgBase}>
      <path d="M4 7l6.2 4.65c1.067.8 2.533.8 3.6 0L20 7" />
      <rect x="3" y="5" width="18" height="14" rx="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...svgBase}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...svgBase}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" {...svgBase} strokeWidth={1.75}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...svgBase}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.985l4.258 5.63 4.751-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...svgBase}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...svgBase}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}