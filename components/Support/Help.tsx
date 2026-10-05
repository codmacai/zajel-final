'use client';

import React, { useCallback, useEffect, useId, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  CalendarCheck,
  Calculator,
  MessageSquare,
  Smartphone,
  ChevronDown,
  Box,
  FileText,
  Phone,
  ShieldCheck,
  Clock,
  Send,
  RefreshCw,
  CheckCircle2,
  Loader2,
  type LucideIcon,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Static content                                                            */
/* -------------------------------------------------------------------------- */

const ACTIONS: { href: string; icon: LucideIcon; title: string; text: string }[] = [
  { href: '/track', icon: Search, title: 'Track your shipment', text: 'Enter your tracking number to see real-time status updates.' },
  { href: '/send-shipment', icon: CalendarCheck, title: 'Schedule a pickup', text: 'Choose a location, time and details for your next shipment.' },
  { href: '/quotation', icon: Calculator, title: 'Get a quote', text: 'Calculate domestic and international shipping rates instantly.' },
  { href: '#contact', icon: MessageSquare, title: 'Contact our team', text: 'Reach support by phone, email or through the portal.' },
  { href: '/#download-app', icon: Smartphone, title: 'Download the app', text: 'Track, book and get support from your mobile device.' },
];

const PRODUCTS = ['Express delivery', 'International shipping', 'Freight', 'E-commerce fulfilment', 'Other'];
const TICKET_TYPES = ['Complaint', 'Inquiry', 'Request', 'Feedback'];
const ISSUES = ['Delayed shipment', 'Damaged shipment', 'Lost shipment', 'Billing or invoice', 'Pickup problem', 'Other'];

const QUICK_LINKS: { href: string; icon: LucideIcon; label: string }[] = [
  { href: '/track', icon: Box, label: 'Track your shipment' },
  { href: '/faq', icon: FileText, label: 'View FAQs' },
  { href: '#contact', icon: Phone, label: 'Contact support' },
];

/* -------------------------------------------------------------------------- */
/*  Shared style tokens                                                       */
/* -------------------------------------------------------------------------- */

const controlClass =
  'w-full rounded-xl border border-[#E5EBE7] bg-white px-4 py-3 text-[14px] text-[#064423] ' +
  'placeholder:text-[#064423]/35 outline-none transition ' +
  'hover:border-[#064423]/25 focus:border-[#36B936] focus:ring-4 focus:ring-[#36B936]/15 ' +
  'aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100';

const card = 'rounded-[1.75rem] border border-[#E5EBE7] bg-white';

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  hint,
  required = true,
  children,
  htmlFor,
  className = '',
}: {
  label: string;
  hint?: string;
  required?: boolean;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-[#064423]">
        {label}
        {required ? (
          <span className="ml-0.5 text-[#36B936]" aria-hidden="true">*</span>
        ) : (
          <span className="ml-1.5 text-[12px] font-normal text-[#064423]/45">(optional)</span>
        )}
      </label>
      {children}
      {hint && <p className="text-[12px] leading-snug text-[#064423]/50">{hint}</p>}
    </div>
  );
}

function TextField({
  label,
  hint,
  required = true,
  type = 'text',
  ...props
}: {
  label: string;
  hint?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Field label={label} hint={hint} required={required} htmlFor={id}>
      <input id={id} type={type} required={required} className={controlClass} {...props} />
    </Field>
  );
}

function SelectField({
  label,
  hint,
  options,
  ...props
}: {
  label: string;
  hint?: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <div className="relative">
        <select
          id={id}
          required
          defaultValue=""
          className={`${controlClass} appearance-none pr-11 invalid:text-[#064423]/35`}
          {...props}
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-[#064423]">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#064423]/40"
        />
      </div>
    </Field>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0 space-y-5 border-0 p-0">
      <legend className="mb-5 w-full border-b border-[#E5EBE7] pb-3 text-[17px] font-semibold tracking-tight text-[#064423]">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const makeCode = () => {
  // Avoids look-alike characters (0/O, 1/I)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export default function SupportTicketPage() {
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [ticketRef, setTicketRef] = useState('');

  const codeId = useId();

  // Generated on the client only, so server and client HTML never mismatch.
  const refreshCode = useCallback(() => {
    setCode(makeCode());
    setCodeInput('');
    setCodeError(false);
  }, []);
  useEffect(refreshCode, [refreshCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (codeInput.trim().toUpperCase() !== code) {
      setCodeError(true);
      return;
    }

    setStatus('submitting');
    const formData = new FormData(e.currentTarget);

    // TODO: replace with your API call, e.g.
    // await fetch('/api/tickets', { method: 'POST', body: formData });
    // and verify the captcha on the server, not in the browser.
    void formData;
    await new Promise((r) => setTimeout(r, 900));

    setTicketRef(`TKT-${Date.now().toString().slice(-6)}`);
    setStatus('success');
  };

  const reset = () => {
    setStatus('idle');
    refreshCode();
  };

  return (
    <section className="min-h-[100svh] w-full bg-[#F7FAF8] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 md:pt-36 lg:px-10 xl:px-16">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* ------------------------------ Heading ------------------------------ */}
        <header className="mx-auto mb-10 max-w-[620px] text-center sm:mb-12">
          <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-[#064423] sm:text-[2.25rem]">
            How can we help?
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[#064423]/60 sm:text-[15px]">
            Try a self-service option first. If you still need us, raise a ticket below.
          </p>
        </header>

        {/* --------------------------- Self-service grid ----------------------- */}
        <ul className="mb-12 flex flex-wrap justify-center gap-4 sm:mb-16 sm:gap-5">
          {ACTIONS.map(({ href, icon: Icon, title, text }) => (
            <li key={title} className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]">
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-3xl border border-[#E5EBE7] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#36B936]/40 hover:shadow-[0_16px_36px_rgba(6,68,35,0.08)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/25 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF6EA] text-[#36B936] transition-colors group-hover:bg-[#36B936] group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[16px] font-semibold tracking-tight text-[#064423]">{title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-[#064423]/55">{text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* ----------------------------- Main layout --------------------------- */}
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
          {/* ------------------------------ Form ------------------------------- */}
          <div className={`${card} w-full min-w-0 flex-1 p-5 shadow-[0_8px_30px_rgba(6,68,35,0.04)] sm:p-8 lg:p-10`}>
            {status === 'success' ? (
              <div role="status" className="flex flex-col items-center px-2 py-12 text-center sm:py-16">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6EA] text-[#36B936]">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-[1.5rem] font-semibold tracking-tight text-[#064423]">Ticket submitted</h2>
                <p className="mt-2 max-w-[420px] text-[14px] leading-relaxed text-[#064423]/60">
                  Your reference is <strong className="font-semibold text-[#064423]">{ticketRef}</strong>. We&apos;ll send
                  updates to the email you provided.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 rounded-full border border-[#E5EBE7] px-6 py-3 text-[14px] font-medium text-[#064423] transition hover:bg-[#F0F4F2] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/25"
                >
                  Raise another ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-9 sm:space-y-10">
                <Section title="Service information">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <SelectField
                      name="product"
                      label="Product"
                      hint="The service related to your issue"
                      options={PRODUCTS}
                    />
                    <SelectField
                      name="ticketType"
                      label="Ticket type"
                      hint="Helps us route your request faster"
                      options={TICKET_TYPES}
                    />
                  </div>
                  <SelectField
                    name="issue"
                    label="Issue related to"
                    hint="Select the closest match to your concern"
                    options={ISSUES}
                  />
                </Section>

                <Section title="Personal details">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TextField name="firstName" label="First name" placeholder="Enter your first name" autoComplete="given-name" />
                    <TextField name="lastName" label="Last name" placeholder="Enter your last name" autoComplete="family-name" />
                    <TextField
                      name="email"
                      type="email"
                      label="Email address"
                      placeholder="you@example.com"
                      hint="Ticket updates are sent here"
                      autoComplete="email"
                      inputMode="email"
                    />
                    <TextField
                      name="phone"
                      type="tel"
                      label="Phone number"
                      placeholder="+971 50 123 4567"
                      hint="Used only if we need urgent clarification"
                      autoComplete="tel"
                      inputMode="tel"
                      required={false}
                    />
                  </div>
                </Section>

                <Section title="Shipment identifier">
                  <TextField
                    name="awb"
                    label="AWB / application number"
                    placeholder="Enter AWB or application number"
                    hint="Providing this helps us resolve your issue faster"
                    required={false}
                  />
                </Section>

                <Section title="Issue details">
                  <MessageField />
                </Section>

                <Section title="Verification">
                  <div className="flex flex-col gap-2">
                    <label htmlFor={codeId} className="text-[13px] font-medium text-[#064423]">
                      Enter the code shown below <span className="text-[#36B936]" aria-hidden="true">*</span>
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                      <div className="flex items-stretch gap-2">
                        <div
                          aria-label={`Verification code ${code.split('').join(' ')}`}
                          className="flex min-w-[9.5rem] flex-1 select-none items-center justify-center rounded-xl border border-[#D8E8D8] bg-[#EFF7EF] px-5 py-3 text-[18px] font-bold tracking-[0.3em] text-[#2EA32E] sm:flex-none"
                        >
                          {code || '······'}
                        </div>
                        <button
                          type="button"
                          onClick={refreshCode}
                          aria-label="Get a new code"
                          className="flex w-12 shrink-0 items-center justify-center rounded-xl border border-[#E5EBE7] text-[#064423]/60 transition hover:bg-[#F0F4F2] hover:text-[#064423] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/25"
                        >
                          <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <input
                        id={codeId}
                        value={codeInput}
                        onChange={(e) => {
                          setCodeInput(e.target.value);
                          setCodeError(false);
                        }}
                        required
                        autoComplete="off"
                        autoCapitalize="characters"
                        placeholder="Enter code"
                        aria-invalid={codeError}
                        aria-describedby={codeError ? `${codeId}-err` : undefined}
                        className={`${controlClass} min-w-0 flex-1`}
                      />
                    </div>
                    {codeError && (
                      <p id={`${codeId}-err`} role="alert" className="text-[12px] text-red-600">
                        That code doesn&apos;t match. Check it or get a new one.
                      </p>
                    )}
                  </div>
                  <p className="flex items-start gap-2 text-[12px] leading-snug text-[#064423]/50">
                    <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-[#36B936]" aria-hidden="true" />
                    Your information is secure and only used to assist with your request.
                  </p>
                </Section>

                <div className="flex justify-end border-t border-[#E5EBE7] pt-6">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-9 py-3.5 text-[14px] font-medium text-white shadow-[0_6px_18px_rgba(54,185,54,0.25)] transition hover:bg-[#2EA32E] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit ticket
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ------------------------------ Sidebar ---------------------------- */}
          <aside
            id="contact"
            className="w-full shrink-0 lg:sticky lg:top-28 lg:w-[320px] xl:w-[360px]"
          >
            <div className={`${card} p-6 shadow-[0_8px_30px_rgba(6,68,35,0.04)] sm:p-8`}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF6EA] text-[#064423]">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="text-[17px] font-semibold tracking-tight text-[#064423]">Need quick help?</h2>
              </div>
              <p className="mb-5 mt-2 text-[13px] text-[#064423]/55">Before raising a ticket, you may try:</p>

              <ul className="space-y-2.5">
                {QUICK_LINKS.map(({ href, icon: Icon, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-3 rounded-xl border border-[#E5EBE7] px-4 py-3.5 text-[13px] text-[#064423] transition hover:border-[#36B936]/40 hover:bg-[#F4FAF4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/25"
                    >
                      <Icon
                        className="h-[18px] w-[18px] shrink-0 text-[#064423]/35 transition-colors group-hover:text-[#36B936]"
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 space-y-6 border-t border-[#E5EBE7] pt-7">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-[14px] font-medium text-[#064423]">
                    <Clock className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
                    Support hours
                  </h3>
                  <dl className="space-y-2 text-[13px]">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#064423]/60">Monday – Friday</dt>
                      <dd className="text-right text-[#064423]">8:00 AM – 6:00 PM</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#064423]/60">Saturday</dt>
                      <dd className="text-right text-[#064423]">9:00 AM – 2:00 PM</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#064423]/60">Sunday</dt>
                      <dd className="text-right text-[#064423]/45">Closed</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-2xl bg-[#064423] p-5">
                  <h3 className="flex items-center gap-2 text-[13px] font-medium text-white/80">
                    <Phone className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
                    Emergency support
                  </h3>
                  <a
                    href="tel:+97160053111"
                    className="mt-1.5 inline-block text-[20px] font-semibold tracking-tight text-[#36B936] focus-visible:outline-none focus-visible:underline"
                  >
                    600 53 11 11
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* Message field with a live character counter */
function MessageField() {
  const id = useId();
  const [value, setValue] = useState('');
  const max = 1000;

  return (
    <Field
      label="Message"
      htmlFor={id}
      hint="The more detail you give (status, dates, locations), the faster we can help."
    >
      <textarea
        id={id}
        name="message"
        required
        rows={5}
        maxLength={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Describe your issue in detail."
        className={`${controlClass} min-h-[9rem] resize-y`}
      />
      <p className="-mt-1 text-right text-[11px] tabular-nums text-[#064423]/40" aria-live="off">
        {value.length}/{max}
      </p>
    </Field>
  );
}