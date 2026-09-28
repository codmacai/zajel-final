'use client';

import { useId, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { seaFreightContent } from '@/data/contact-content';

// ---------------------------------------------------------------------------
// Types (content files import these)
// ---------------------------------------------------------------------------

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select';
export type ContactIcon = 'email' | 'phone' | 'location' | 'clock' | 'whatsapp';

export interface FormField {
  name: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  required?: boolean;      // default true
  options?: string[];      // for type: 'select'
  fullWidth?: boolean;     // span both columns on sm+
}

export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
  icon: ContactIcon;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  fields: FormField[];
  submitLabel: string;
  success: { title: string; message: string };
  direct: { title: string; description: string; details: ContactDetail[] };
}

interface ContactSectionProps {
  /** Defaults to sea freight so existing <ContactSection /> usages keep working. */
  content?: ContactContent;
  /** Receives all field values. Return a promise to show loading; throw to show an error. */
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(' ');
const animateBase = 'transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]';
const fade = (v: boolean) => (v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6');

const fieldClasses =
  'w-full bg-[#F4F8F5] border border-[#E1EAE3] rounded-lg px-3.5 py-2.5 text-[0.88rem] text-[#0A2A16] placeholder:text-[#8CA394] outline-none transition-colors duration-200 focus:border-[#36B936]/60 focus:bg-white';
const labelClasses = 'block text-[11px] font-medium tracking-wide text-[#5C7568] mb-1.5';

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const iconPaths: Record<ContactIcon, React.ReactNode> = {
  email: <path d="M3 6l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  ),
  location: (
    <>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  whatsapp: <path d="M3 21l1.6-4.7A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4-1L3 21z" />,
};

const Icon = ({ name }: { name: ContactIcon }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {iconPaths[name]}
  </svg>
);

// ---------------------------------------------------------------------------
// Contact row
// ---------------------------------------------------------------------------

const ContactRow = ({ label, value, href, icon }: ContactDetail) => {
  const content = (
    <div className="flex items-start gap-3 group">
      <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#04150B]/15 text-white">
        <Icon name={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium tracking-wide text-white/55 mb-0.5">{label}</p>
        <p className={cx('text-[0.88rem] text-white leading-snug break-words', href && 'group-hover:underline underline-offset-2')}>
          {value}
        </p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{content}</a> : content;
};

// ---------------------------------------------------------------------------
// Inquiry form
// ---------------------------------------------------------------------------

const InquiryForm = ({
  fields,
  submitLabel,
  success,
  onSubmit,
}: Pick<ContactContent, 'fields' | 'submitLabel' | 'success'> & Pick<ContactSectionProps, 'onSubmit'>) => {
  const uid = useId();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      setStatus('loading');
      await onSubmit?.(values);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div role="status" className="flex flex-col items-center justify-center text-center h-full py-10">
        <div className="w-12 h-12 rounded-full bg-[#36B936]/10 border border-[#36B936]/30 flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="#36B936" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-[#0A4D26] font-normal text-[1.1rem] mb-1.5">{success.title}</h3>
        <p className="text-[#5C7568] text-[0.88rem] max-w-[300px]">{success.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      {fields.map(({ name, label, type = 'text', placeholder, required = true, options, fullWidth }) => {
        const id = `${uid}-${name}`;
        return (
          <div key={name} className={cx(fullWidth && 'sm:col-span-2')}>
            <label htmlFor={id} className={labelClasses}>{label}</label>
            {type === 'textarea' ? (
              <textarea id={id} name={name} required={required} rows={4} placeholder={placeholder} className={cx(fieldClasses, 'resize-y')} />
            ) : type === 'select' ? (
              <select id={id} name={name} required={required} defaultValue="" className={fieldClasses}>
                <option value="" disabled>{placeholder ?? 'Select'}</option>
                {options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input id={id} name={name} type={type} required={required} placeholder={placeholder} className={fieldClasses} />
            )}
          </div>
        );
      })}

      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 mt-1">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center bg-[#36B936] hover:bg-[#2ea32e] disabled:opacity-60 text-white font-medium text-[0.9rem] rounded-lg px-7 py-2.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#36B936]"
        >
          {status === 'loading' ? 'Sending…' : submitLabel}
        </button>
        {status === 'error' && (
          <p role="alert" className="text-[0.82rem] text-red-600">
            Couldn't send your inquiry. Check your connection and try again.
          </p>
        )}
      </div>
    </form>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

const ContactSection = ({ content = seaFreightContent, onSubmit, className }: ContactSectionProps) => {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { eyebrow, title, description, fields, submitLabel, success, direct } = content;

  return (
    <section
      className={cx('w-full flex items-center bg-white overflow-hidden py-10 sm:py-14 lg:py-16', className)}
      style={{ fontFamily: "'Manrope', system-ui, -apple-system, sans-serif" }}
    >
      <div ref={ref} className="w-full max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className={cx('text-center max-w-[600px] mx-auto mb-6 sm:mb-8', animateBase, fade(isVisible))}>
          <span className="inline-flex items-center gap-2 text-[#36B936] font-medium text-[10px] sm:text-[11px] tracking-[0.22em] uppercase mb-3">
            <span className="w-4 h-px bg-[#36B936]" />
            {eyebrow}
          </span>
          <h2 className="text-[#0A4D26] font-normal leading-[1.15] text-[1.6rem] sm:text-[2rem] lg:text-[2.2rem] tracking-tight mb-2.5">
            {title}
          </h2>
          <p className="text-[#5C7568] text-[0.92rem] sm:text-[0.98rem] leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 lg:gap-7 items-stretch">
          <div
            className={cx(
              'rounded-2xl p-5 sm:p-6 lg:p-7 bg-white border border-[#E1EAE3] shadow-[0_8px_30px_-12px_rgba(10,77,38,0.12)]',
              animateBase,
              fade(isVisible)
            )}
            style={{ transitionDelay: '100ms' }}
          >
            <InquiryForm fields={fields} submitLabel={submitLabel} success={success} onSubmit={onSubmit} />
          </div>

          <aside
            className={cx(
              'rounded-2xl p-5 sm:p-6 lg:p-7 bg-gradient-to-br from-[#36B936] to-[#0A4D26] flex flex-col justify-center',
              animateBase,
              fade(isVisible)
            )}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-white font-normal text-[1.05rem] tracking-tight mb-1">{direct.title}</h3>
            <p className="text-white/70 text-[0.85rem] mb-5">{direct.description}</p>
            <div className="space-y-4">
              {direct.details.map((d) => <ContactRow key={d.label} {...d} />)}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;