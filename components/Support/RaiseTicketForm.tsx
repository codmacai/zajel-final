'use client';

import { useEffect, useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Loader2,
  LogIn,
  Paperclip,
  Send,
  ShieldCheck,
  Ticket,
  UserCog,
  XCircle,
  X,
} from 'lucide-react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useMySupportTickets } from '@/hooks/useMySupportTickets';
import { useSubmitSupportTicket } from '@/hooks/useSubmitSupportTicket';
import { getRecaptchaToken } from '@/lib/auth/recaptcha';
import { loginHref } from '@/lib/auth/returnUrl';

// Ported from Zajel-2's SupportTicket.tsx. TEMPORARY: Product / Issue Related To / Name are
// still not collected — the backend hardcodes/derives those to match a confirmed-working
// request shape — see SupportService in Zajel.PrePaid.Api. Only "Complaint" is confirmed
// against the real Freshdesk "Type" picklist so far; the other Ticket Type options are
// best-effort guesses until confirmed (see SupportService.TicketTypeMap). Email falls back
// to the signed-in user's profile email server-side when left blank.
const TICKET_TYPE_OPTIONS = ['Complaint', 'Sales', 'Technical Issue', 'Billing', 'General Inquiry'];

const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_ATTACHMENT_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_MESSAGE_LENGTH = 1000;

const EMPTY_FORM = {
  subject: '',
  description: '',
  ticketType: TICKET_TYPE_OPTIONS[0],
  mobile: '',
  email: '',
  referenceNumber: '',
};

export const ticketControlClass =
  'w-full rounded-xl border border-[#E5EBE7] bg-white px-4 py-3 text-[14px] text-[#064423] ' +
  'placeholder:text-[#064423]/35 outline-none transition ' +
  'hover:border-[#064423]/25 focus:border-[#36B936] focus:ring-4 focus:ring-[#36B936]/15 ' +
  'aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100';

const primaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#36B936] px-8 py-3.5 text-[14px] font-medium text-white ' +
  'shadow-[0_6px_18px_rgba(54,185,54,0.25)] transition hover:bg-[#2EA32E] active:scale-[0.98] ' +
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/30 disabled:cursor-not-allowed disabled:opacity-70';

function Field({
  label,
  hint,
  htmlFor,
  required = true,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
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

function Notice({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div role="status" className="flex flex-col items-center px-2 py-12 text-center sm:py-14">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6EA] text-[#36B936]">{icon}</span>
      <h2 className="mt-6 text-[1.4rem] font-semibold tracking-tight text-[#064423]">{title}</h2>
      {children}
    </div>
  );
}

/** Shows the signed-in user's own previously-raised tickets (GET /api/support/tickets) —
 * our own local record, not a live Freshdesk status. */
function MyTicketsSection({
  tickets,
  loading,
  error,
}: {
  tickets: ReturnType<typeof useMySupportTickets>['tickets'];
  loading: boolean;
  error: string | null;
}) {
  if (loading && tickets.length === 0) {
    return (
      <div className="mb-8 flex items-center gap-2 text-[13px] text-[#064423]/55">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading your tickets…
      </div>
    );
  }
  if (error && tickets.length === 0) return null;
  if (tickets.length === 0) return null;

  return (
    <div className="mb-8 rounded-2xl border border-[#E5EBE7] bg-[#FAFCFB] p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Ticket className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
        <h3 className="text-[14px] font-semibold text-[#064423]">Your tickets</h3>
      </div>
      <ul className="flex flex-col gap-2.5">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#E5EBE7] bg-white px-4 py-3 text-[13px]"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-[#064423]">{ticket.subject}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-[#064423]/50">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {new Date(ticket.createdAtUtc).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                {' · '}
                {ticket.ticketType}
                {ticket.referenceNumber ? ` · AWB ${ticket.referenceNumber}` : ''}
              </p>
            </div>
            <span
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${
                ticket.success ? 'bg-[#EAF6EA] text-[#36B936]' : 'bg-red-50 text-red-600'
              }`}
            >
              {ticket.success ? <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> : <XCircle className="h-3 w-3" aria-hidden="true" />}
              {ticket.success ? (ticket.freshdeskTicketId ? `#${ticket.freshdeskTicketId}` : 'Submitted') : 'Failed'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface RaiseTicketFormProps {
  /** Where /login should send the user back to after signing in. */
  returnTo?: string;
  /** Shows the compact "Your tickets" list above the form. Off inside the account portal,
   * which has its own dedicated "Ticket history" tab for that. */
  showHistory?: boolean;
}

/**
 * Support ticket form — POST /api/support/tickets (multipart, sign-in required). Used on the
 * public /support page and inside the signed-in account portal (/account?tab=support).
 */
export default function RaiseTicketForm({ returnTo = '/support', showHistory = true }: RaiseTicketFormProps) {
  const { ready, isAuthenticated, isPendingRegistration } = useAuthContext();
  const { submitTicket, submitting, error: submitApiError, clearError } = useSubmitSupportTicket();
  const { tickets, loading: ticketsLoading, error: ticketsError, refresh: refreshTickets } = useMySupportTickets();

  const [form, setForm] = useState(EMPTY_FORM);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  /** Freshdesk ticket number from the last successful submit — shown so the customer can track it. */
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const ticketTypeId = useId();
  const mobileId = useId();
  const emailId = useId();
  const subjectId = useId();
  const referenceNumberId = useId();
  const messageId = useId();
  const filesId = useId();

  const updateField = (field: keyof typeof EMPTY_FORM) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  useEffect(() => {
    if (isAuthenticated) void refreshTickets();
  }, [isAuthenticated, refreshTickets]);

  const handleFilesSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (selected.length === 0) return;

    if (attachments.length + selected.length > MAX_ATTACHMENTS) {
      setFileError(`You can attach up to ${MAX_ATTACHMENTS} files.`);
      return;
    }
    for (const file of selected) {
      if (!ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
        setFileError('Only JPG, PNG, and PDF files are allowed.');
        return;
      }
      if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
        setFileError('Each file must be 10MB or smaller.');
        return;
      }
    }
    setFileError(null);
    setAttachments((prev) => [...prev, ...selected]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setFileError(null);
  };

  // A logged-out visitor can still raise a ticket (the backend authenticates that call with a
  // narrow guest credential instead of a Bearer token — see SupportService.CreateTicketAsync)
  // — but there's no account to fall back on for Mobile/Email, so both become mandatory here.
  const isGuest = !isAuthenticated && !isPendingRegistration;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifyError(null);
    clearError();
    setVerifying(true);

    let recaptchaToken: string;
    try {
      // Same invisible reCAPTCHA v3 flow as the OTP request on /login — replaces the old
      // static "enter the code shown" box. This is the only bot defense for guest
      // submissions, so the token is now actually sent to and verified by the backend.
      recaptchaToken = await getRecaptchaToken('support_ticket_submit');
    } catch (err) {
      setVerifyError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
      setVerifying(false);
      return;
    }
    setVerifying(false);

    const result = await submitTicket({ ...form, attachments, recaptchaToken });
    if (result) {
      setTicketNumber(result.ticketId);
      setCopied(false);
      setSuccess(true);
      setForm(EMPTY_FORM);
      setAttachments([]);
      if (isAuthenticated) void refreshTickets();
    }
  };

  if (!ready) {
    return (
      <div className="flex items-center justify-center py-16" aria-busy="true">
        <Loader2 className="h-6 w-6 animate-spin text-[#36B936]" aria-label="Loading" />
      </div>
    );
  }

  // OTP-verified but not registered yet: /login would bounce them straight back, so point
  // them at finishing their profile instead of letting them submit as a guest.
  if (isPendingRegistration) {
    return (
      <Notice icon={<UserCog className="h-8 w-8" aria-hidden="true" />} title="Finish your profile to raise a ticket">
        <p className="mt-2 max-w-[420px] text-[14px] leading-relaxed text-[#064423]/60">
          Complete your account details first so we can link the ticket to you.
        </p>
        <Link href="/account?tab=profile" className={`${primaryBtn} mt-8`}>
          Complete profile
        </Link>
      </Notice>
    );
  }

  if (success) {
    return (
      <>
        <Notice icon={<CheckCircle2 className="h-8 w-8" aria-hidden="true" />} title="Ticket submitted">
          {ticketNumber !== null && (
            <div className="mt-5 flex flex-col items-center">
              <p className="text-[12px] font-medium uppercase tracking-wide text-[#064423]/50">Your ticket number</p>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#E5EBE7] bg-[#FAFCFB] py-2 pl-5 pr-2">
                <span className="text-[1.6rem] font-semibold tracking-tight text-[#064423] tabular-nums">#{ticketNumber}</span>
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard
                      ?.writeText(String(ticketNumber))
                      .then(() => setCopied(true))
                      .catch(() => undefined);
                  }}
                  aria-label={copied ? 'Ticket number copied' : 'Copy ticket number'}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#064423]/60 transition hover:bg-[#F0F4F2] hover:text-[#064423] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/25"
                >
                  {copied ? <Check className="h-4 w-4 text-[#36B936]" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </div>
          )}
          <p className="mt-4 max-w-[420px] text-[14px] leading-relaxed text-[#064423]/60">
            {ticketNumber !== null
              ? 'Please keep this number and quote it whenever you contact us about this request. Our support team will get back to you by email or phone shortly.'
              : 'Thanks for reaching out — our support team will get back to you by email or phone shortly.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setTicketNumber(null);
            }}
            className="mt-8 rounded-full border border-[#E5EBE7] px-6 py-3 text-[14px] font-medium text-[#064423] transition hover:bg-[#F0F4F2] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#36B936]/25"
          >
            Raise another ticket
          </button>
        </Notice>
        {showHistory && <MyTicketsSection tickets={tickets} loading={ticketsLoading} error={ticketsError} />}
      </>
    );
  }

  const submitError = verifyError ?? submitApiError;

  return (
    <>
      {showHistory && <MyTicketsSection tickets={tickets} loading={ticketsLoading} error={ticketsError} />}
      {isGuest && (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-[#E5EBE7] bg-[#FAFCFB] px-4 py-3 text-[13px] text-[#064423]/70">
          <span>Have an account? Sign in to track this ticket and see your history.</span>
          <Link href={loginHref(returnTo)} className="shrink-0 font-medium text-[#36B936] hover:underline">
            <LogIn className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
            Log in
          </Link>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Ticket Type" htmlFor={ticketTypeId} hint="This helps us route your request faster.">
          <div className="relative">
            <select
              id={ticketTypeId}
              required
              value={form.ticketType}
              onChange={updateField('ticketType')}
              className={`${ticketControlClass} appearance-none pr-10`}
            >
              {TICKET_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#064423]/35" aria-hidden="true" />
          </div>
        </Field>

        <Field
          label="Mobile Number"
          htmlFor={mobileId}
          required={isGuest}
          hint={isGuest ? "So we can reach you about this ticket." : 'Defaults to the number on your account.'}
        >
          <input
            id={mobileId}
            type="tel"
            required={isGuest}
            value={form.mobile}
            onChange={updateField('mobile')}
            placeholder="Enter your mobile number"
            className={ticketControlClass}
          />
        </Field>

        <Field
          label="Email Address"
          htmlFor={emailId}
          required={isGuest}
          hint={isGuest ? "We'll reply to this address." : 'Defaults to the email on your account.'}
        >
          <input
            id={emailId}
            type="email"
            required={isGuest}
            value={form.email}
            onChange={updateField('email')}
            placeholder="Enter your email address"
            className={ticketControlClass}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor={subjectId}>
        <input
          id={subjectId}
          required
          value={form.subject}
          onChange={updateField('subject')}
          maxLength={200}
          placeholder="Briefly summarize your issue"
          className={ticketControlClass}
        />
      </Field>

      <Field
        label="AWB / Application Number"
        htmlFor={referenceNumberId}
        required={false}
        hint="Providing this helps us resolve your issue faster."
      >
        <input
          id={referenceNumberId}
          value={form.referenceNumber}
          onChange={updateField('referenceNumber')}
          placeholder="Enter AWB or application number (if available)"
          className={ticketControlClass}
        />
      </Field>

      <Field
        label="Message"
        htmlFor={messageId}
        hint="Include the AWB / tracking number, dates and locations — the more detail, the faster we can help."
      >
        <textarea
          id={messageId}
          required
          rows={6}
          maxLength={MAX_MESSAGE_LENGTH}
          value={form.description}
          onChange={updateField('description')}
          placeholder="Describe your issue in detail."
          className={`${ticketControlClass} min-h-[9rem] resize-y`}
        />
        <p className="-mt-1 text-right text-[11px] tabular-nums text-[#064423]/40" aria-live="off">
          {form.description.length}/{MAX_MESSAGE_LENGTH}
        </p>
      </Field>

      <Field
        label="Attachments"
        htmlFor={filesId}
        required={false}
        hint={`JPG, PNG or PDF — up to ${MAX_ATTACHMENTS} files, 10MB each.`}
      >
        <label
          htmlFor={filesId}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-[#E5EBE7] bg-white px-4 py-2.5 text-[13px] font-medium text-[#064423] transition hover:border-[#36B936]/40 focus-within:ring-4 focus-within:ring-[#36B936]/25"
        >
          <Paperclip className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
          Add files
          <input
            id={filesId}
            type="file"
            multiple
            accept="image/jpeg,image/png,application/pdf"
            onChange={handleFilesSelected}
            className="sr-only"
          />
        </label>
        {attachments.length > 0 && (
          <ul className="flex flex-col gap-2">
            {attachments.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-2 rounded-xl border border-[#EAF1E7] bg-[#F3F7F3] px-4 py-2 text-[13px] text-[#064423]"
              >
                <span className="truncate">
                  {file.name} <span className="text-[#064423]/45">({(file.size / 1024 / 1024).toFixed(1)}MB)</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  aria-label={`Remove ${file.name}`}
                  className="shrink-0 rounded-full p-1 text-[#064423]/45 transition hover:text-red-500"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileError && (
          <p role="alert" className="text-[12px] text-red-600">
            {fileError}
          </p>
        )}
      </Field>

      <p className="flex items-start gap-2 text-[12px] leading-snug text-[#064423]/50">
        <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-[#36B936]" aria-hidden="true" />
        This form is protected by reCAPTCHA. Your information is secure and only used to assist with your request.
      </p>

      {submitError && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {submitError}
        </p>
      )}

      <div className="flex justify-end border-t border-[#E5EBE7] pt-6">
        <button type="submit" disabled={submitting || verifying} className={`${primaryBtn} w-full sm:w-auto`}>
          {verifying || submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {verifying ? 'Verifying…' : 'Submitting…'}
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
    </>
  );
}
