"use client";

// Put this file at: components/support/SupportTicketPage.tsx
import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Clock,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  ACTION_CARDS,
  EMERGENCY_PHONE,
  FORM_SECTIONS,
  HELP_HEADING,
  HELP_SUBHEADING,
  QUICK_LINKS,
  SUCCESS_COPY,
  SUPPORT_CLOSED_NOTE,
  SUPPORT_HOURS,
  type FieldDef,
} from "./support-ticket";

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const controlClass =
  "w-full rounded-xl border border-gray-200 bg-[#FCFCFC] px-4 py-3 text-sm text-[#064423] outline-none transition-colors " +
  "placeholder:text-gray-400 focus:border-[#36B936]/60 focus:bg-white focus-visible:ring-2 focus-visible:ring-[#36B936]/20";

const labelClass = "text-[13px] font-medium text-[#064423]/90";
const hintClass = "text-xs text-gray-400";
const cardClass = "rounded-3xl border border-gray-100 bg-white";

type Status = "idle" | "submitting" | "success" | "error";

interface SupportTicketPageProps {
  /** Receives all form values except the captcha. Throw to show an error. */
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
}

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------

const Field = ({ field }: { field: FieldDef }) => {
  const id = useId();
  const hintId = `${id}-hint`;
  const { name, label, kind = "text", placeholder, hint, options, required = true, autoComplete, rows } = field;
  const common = {
    id,
    name,
    required,
    autoComplete,
    "aria-describedby": hint ? hintId : undefined,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <span className="ml-0.5 text-[#36B936]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {kind === "textarea" ? (
        <textarea {...common} rows={rows ?? 4} placeholder={placeholder} className={`${controlClass} resize-y`} />
      ) : kind === "select" ? (
        <div className="relative">
          <select
            {...common}
            defaultValue=""
            className={`${controlClass} appearance-none pr-10 invalid:text-gray-400 [&>option]:text-[#064423]`}
          >
            <option value="" disabled>
              {placeholder ?? "Select an option"}
            </option>
            {options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
        </div>
      ) : (
        <input {...common} type={kind} placeholder={placeholder} className={controlClass} />
      )}

      {hint && (
        <p id={hintId} className={hintClass}>
          {hint}
        </p>
      )}
    </div>
  );
};

const makeCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no look-alike characters
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SupportTicketPage({ onSubmit }: SupportTicketPageProps) {
  const formId = useId();
  const codeId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [code, setCode] = useState(""); // generated after mount to avoid a hydration mismatch
  const [codeError, setCodeError] = useState(false);

  const refreshCode = useCallback(() => setCode(makeCode()), []);
  useEffect(refreshCode, [refreshCode]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const { captcha, ...payload } = values;

    if (captcha.trim().toUpperCase() !== code) {
      setCodeError(true);
      return;
    }
    setCodeError(false);
    setStatus("submitting");
    try {
      await onSubmit?.(payload);
      setStatus("success");
    } catch {
      setStatus("error");
      refreshCode();
    }
  };

  const reset = () => {
    setStatus("idle");
    refreshCode();
  };

  return (
    <section className="min-h-svh w-full bg-[#FDFDFD] px-4 pb-16 pt-[calc(var(--navbar-h,76px)+2.5rem)] font-sans sm:px-6 lg:px-12 lg:pb-20 xl:px-24">
      <div className="mx-auto max-w-[1300px]">
        {/* Self-service cards: 1 col → 2 cols → 3 + 2 centered */}
        <div className="mb-12 lg:mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-normal tracking-tight text-[#064423] sm:text-[1.75rem] lg:text-[2rem]">
              {HELP_HEADING}
            </h2>
            <p className="mx-auto max-w-[600px] text-sm text-[#064423]/60 sm:text-[15px]">{HELP_SUBHEADING}</p>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
            {ACTION_CARDS.map(({ title, description, href, icon: Icon }, i) => {
              const placement =
                i === 3
                  ? "lg:col-span-2 lg:col-start-2"
                  : i === 4
                    ? "sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:justify-self-center lg:col-span-2 lg:w-auto lg:justify-self-stretch"
                    : "lg:col-span-2";
              return (
                <li key={title} className={placement}>
                  <Link
                    href={href}
                    className={`${cardClass} group flex h-full flex-col items-center p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all hover:border-[#36B936]/30 hover:shadow-[0_20px_40px_rgba(54,185,54,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36B936] sm:p-8`}
                  >
                    <Icon
                      className="mb-5 h-12 w-12 text-[#36B936] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none sm:mb-6 sm:h-14 sm:w-14"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="mb-2 text-lg font-bold tracking-tight text-[#064423]">{title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Form + sidebar */}
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-10">
          {/* Form */}
          <div className={`${cardClass} w-full flex-1 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] sm:p-8 lg:rounded-[2.5rem] lg:p-12`}>
            {status === "success" ? (
              <div role="status" className="flex flex-col items-center py-12 text-center">
                <CheckCircle2 className="mb-4 h-14 w-14 text-[#36B936]" strokeWidth={1.5} aria-hidden="true" />
                <h2 className="mb-2 text-xl font-bold tracking-tight text-[#064423]">{SUCCESS_COPY.title}</h2>
                <p className="mb-6 max-w-[420px] text-sm text-gray-500">{SUCCESS_COPY.message}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-[#36B936] px-6 py-2.5 text-sm font-medium text-[#1F9E1F] transition-colors hover:bg-[#36B936]/10"
                >
                  Submit another ticket
                </button>
              </div>
            ) : (
              <form id={formId} onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">
                {FORM_SECTIONS.map((section) => (
                  <fieldset key={section.title} className="min-w-0 space-y-4 border-0 p-0 lg:space-y-6">
                    <legend className="mb-4 text-lg font-bold tracking-tight text-[#064423] lg:mb-6">
                      {section.title}
                    </legend>
                    <div
                      className={`grid grid-cols-1 gap-4 lg:gap-6 ${section.columns === 2 ? "md:grid-cols-2" : ""}`}
                    >
                      {section.fields.map((f) => (
                        <Field key={f.name} field={f} />
                      ))}
                    </div>
                  </fieldset>
                ))}

                {/* Verification */}
                <fieldset className="min-w-0 space-y-4 border-0 p-0">
                  <legend className="mb-4 text-lg font-bold tracking-tight text-[#064423]">Verification</legend>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={codeId} className={labelClass}>
                      Enter the code shown below
                      <span className="ml-0.5 text-[#36B936]" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <div className="flex flex-wrap items-stretch gap-3">
                      <div className="flex items-center gap-2 rounded-xl border border-[#EAF1E7] bg-[#F3F7F3] py-2 pl-5 pr-2">
                        <span
                          aria-label={`Code: ${code.split("").join(" ")}`}
                          className="select-none text-lg font-bold tracking-[0.3em] text-[#36B936] sm:text-xl"
                        >
                          {code || "······"}
                        </span>
                        <button
                          type="button"
                          onClick={refreshCode}
                          aria-label="Get a new code"
                          className="rounded-lg p-2 text-[#064423]/50 transition-colors hover:bg-white hover:text-[#36B936]"
                        >
                          <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <input
                        id={codeId}
                        name="captcha"
                        type="text"
                        required
                        autoComplete="off"
                        placeholder="Enter code"
                        aria-invalid={codeError}
                        aria-describedby={codeError ? `${codeId}-error` : undefined}
                        className={`${controlClass} min-w-[160px] flex-1`}
                      />
                    </div>
                    {codeError && (
                      <p id={`${codeId}-error`} role="alert" className="text-xs text-red-600">
                        That code doesn't match. Check it and try again.
                      </p>
                    )}
                  </div>
                  <p className="flex items-start gap-2 text-xs text-gray-400">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#36B936]" aria-hidden="true" />
                    Your information is secure and will only be used to assist with your request.
                  </p>
                </fieldset>

                {/* Submit */}
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                  {status === "error" && (
                    <p role="alert" className="text-sm text-red-600 sm:mr-auto">
                      We couldn't submit your ticket. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#36B936] px-8 py-3.5 text-sm font-medium tracking-wide text-white shadow-sm transition-all hover:bg-[#2da12d] active:scale-95 disabled:opacity-60 motion-reduce:transition-none lg:px-12"
                  >
                    {status === "submitting" ? "Submitting…" : "Submit Ticket"}
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:sticky lg:top-[calc(var(--navbar-h,76px)+1.5rem)] lg:w-[clamp(280px,25vw,360px)]">
            <div className={`${cardClass} p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] lg:rounded-[2.5rem] lg:p-8`}>
              <div className="mb-1 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF1E7]">
                  <MessageSquare className="h-4 w-4 text-[#064423]" aria-hidden="true" />
                </span>
                <h3 className="text-base font-normal leading-tight text-[#064423] lg:text-lg">Need Quick Help?</h3>
              </div>
              <p className="mb-6 text-[13px] text-[#064423]/50">Before raising a ticket, you may try:</p>

              <ul className="mb-6 space-y-2">
                {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex w-full items-center gap-3 rounded-xl border border-gray-100 p-3.5 text-[13px] text-[#064423] transition-colors hover:bg-[#F9FBF9]"
                    >
                      <Icon
                        className="h-[18px] w-[18px] shrink-0 text-gray-300 transition-colors group-hover:text-[#36B936]"
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Second submit: desktop only, since on mobile the form's own button is right above */}
              {status !== "success" && (
                <button
                  type="submit"
                  form={formId}
                  disabled={status === "submitting"}
                  className="hidden h-12 w-full items-center justify-center rounded-full bg-[#064423] text-sm font-medium tracking-wide text-[#36B936] transition-colors hover:bg-[#0b180e] disabled:opacity-60 lg:flex"
                >
                  Submit
                </button>
              )}

              <div className="mt-6 space-y-6 border-t border-gray-100 pt-6">
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-medium text-[#064423]">
                    <Clock className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
                    Support Hours
                  </h4>
                  <dl className="space-y-2 text-[13px] text-[#064423]/60">
                    {SUPPORT_HOURS.map(({ day, time }) => (
                      <div key={day} className="flex justify-between gap-4">
                        <dt>{day}</dt>
                        <dd className="text-right text-[#064423]">{time}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-[13px] text-[#064423]/40">{SUPPORT_CLOSED_NOTE}</p>
                </div>

                <div>
                  <h4 className="mb-1 flex items-center gap-2 text-sm font-medium text-[#064423]">
                    <Phone className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
                    Emergency Support
                  </h4>
                  <a
                    href={EMERGENCY_PHONE.href}
                    className="text-base font-semibold tracking-tight text-[#064423] hover:underline"
                  >
                    {EMERGENCY_PHONE.display}
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