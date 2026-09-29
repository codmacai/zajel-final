'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Package,
  Plane,
  Truck,
  User,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Data — copy, options, routes and form types                               */
/* -------------------------------------------------------------------------- */

const SEND_ROUTES = {
  login: '/login',
  payment: '/payment', // TODO: point at your real payment step
  prohibitedItems: '#', // TODO: link to your prohibited-items page
} as const;

const UAE = 'United Arab Emirates';

const AUTH_CONTENT = {
  title: 'Send a shipment.',
  subtitle:
    'Sign in for faster checkout and saved addresses, or continue as a guest to send a shipment immediately.',
  login: {
    title: 'Login to Account',
    description: 'Access saved addresses, view discounted rates, and easily manage your tracking history.',
    cta: 'Sign in',
  },
  guest: {
    title: 'Continue as Guest',
    description: 'No account required. The fastest and simplest way to send a one-off shipment right now.',
    cta: 'Continue',
  },
  footnote: 'Takes about two minutes.',
} as const;

const STEPS = [
  { id: 'destination', label: 'Destination', title: 'Where is it going?', subtitle: 'Choose how far your shipment is travelling.' },
  { id: 'shipper', label: 'Shipper', title: 'Who is sending it?', subtitle: 'Enter the pickup and sender details.' },
  { id: 'receiver', label: 'Receiver', title: 'Who is it for?', subtitle: 'Enter the delivery destination details.' },
  { id: 'parcel', label: 'Parcel', title: 'What are you sending?', subtitle: 'Tell us a little about your shipment.' },
] as const;

interface ChoiceOption<T extends string> {
  value: T;
  title: string;
  description: string;
  Icon: LucideIcon;
}

type DestinationType = 'domestic' | 'international';
type ParcelType = 'document' | 'parcel';
type WeightUnit = 'kg' | 'lb';

const DESTINATION_OPTIONS: ChoiceOption<DestinationType>[] = [
  { value: 'domestic', title: 'Domestic', description: 'Deliveries within the United Arab Emirates.', Icon: Truck },
  { value: 'international', title: 'International', description: 'Shipping to over 200 countries worldwide.', Icon: Plane },
];

const PARCEL_OPTIONS: ChoiceOption<ParcelType>[] = [
  { value: 'document', title: 'Document(s)', description: 'Letters, contracts and papers.', Icon: FileText },
  { value: 'parcel', title: 'Parcel', description: 'Boxes, goods and packages.', Icon: Package },
];

interface ShipperForm {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  unit: string;
}

interface ReceiverForm {
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  postal: string;
}

interface DetailsForm {
  content: string;
  weight: string;
  weightUnit: WeightUnit;
  pieces: string;
  type: ParcelType | null;
}

interface ShipmentForm {
  destination: DestinationType | null;
  shipper: ShipperForm;
  receiver: ReceiverForm;
  details: DetailsForm;
}

const INITIAL_FORM: ShipmentForm = {
  destination: null,
  shipper: { fullName: '', email: '', phone: '', country: UAE, address: '', city: '', unit: '' },
  receiver: { name: '', email: '', phone: '', country: '', address: '', city: '', postal: '' },
  details: { content: '', weight: '', weightUnit: 'kg', pieces: '1', type: null },
};

/* -------------------------------------------------------------------------- */
/*  Validation                                                                */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

const filled = (...values: string[]) => values.every((v) => v.trim().length > 0);
const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());

function isStepValid(step: number, f: ShipmentForm): boolean {
  switch (step) {
    case 1:
      return f.destination !== null;
    case 2: {
      const s = f.shipper;
      return filled(s.fullName, s.phone, s.country, s.address, s.city) && emailOk(s.email);
    }
    case 3: {
      const r = f.receiver;
      return filled(r.name, r.phone, r.country, r.address, r.city) && (r.email.trim() === '' || emailOk(r.email));
    }
    case 4: {
      const d = f.details;
      return filled(d.content) && Number(d.weight) > 0 && Number(d.pieces) >= 1 && d.type !== null;
    }
    default:
      return true;
  }
}

/* -------------------------------------------------------------------------- */
/*  Shared styling                                                            */
/*  Palette: brand green #36B936 · dark green #06301A / #0A4D26 · white       */
/* -------------------------------------------------------------------------- */

const primaryButton =
  'inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-[#36B936] px-8 text-[15px] font-semibold text-[#06301A] ' +
  'transition duration-200 hover:bg-[#3ccb3c] active:scale-[0.98] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06301A] ' +
  'disabled:cursor-not-allowed disabled:bg-[#0A4D26]/[0.08] disabled:text-[#0A4D26]/35 disabled:active:scale-100';

const fieldBase =
  'peer h-14 w-full rounded-2xl bg-[#0A4D26]/[0.05] px-4 pb-1.5 pt-5 text-base text-[#06301A] outline-none ' +
  'ring-2 ring-transparent transition duration-200 focus:bg-white focus:ring-[#36B936]';

/* -------------------------------------------------------------------------- */
/*  Fields (floating labels)                                                  */
/* -------------------------------------------------------------------------- */

function FloatingLabel({ htmlFor, text, optional, lifted }: { htmlFor: string; text: string; optional?: boolean; lifted: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`pointer-events-none absolute left-4 max-w-[calc(100%-2rem)] truncate text-[#0A4D26]/55 transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#2E9E2E] ${
        lifted ? 'top-2.5 text-[11px]' : 'top-1/2 -translate-y-1/2 text-[15px]'
      }`}
    >
      {text}
      {optional && <span className="ml-1 opacity-70">· optional</span>}
    </label>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal';
  autoComplete?: string;
  min?: number;
  step?: number | string;
}

function Field({ id, label, value, onChange, type = 'text', optional, inputMode, autoComplete, min, step }: FieldProps) {
  return (
    <div className="relative min-w-0">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        inputMode={inputMode}
        autoComplete={autoComplete}
        min={min}
        step={step}
        className={fieldBase}
      />
      <FloatingLabel htmlFor={id} text={label} optional={optional} lifted={value !== ''} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Choice cards                                                              */
/* -------------------------------------------------------------------------- */

interface ChoiceCardProps<T extends string> {
  option: ChoiceOption<T>;
  selected: boolean;
  onSelect: (value: T) => void;
}

function ChoiceCard<T extends string>({ option, selected, onSelect }: ChoiceCardProps<T>) {
  const { Icon, title, description, value } = option;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={`group relative flex flex-col items-start rounded-3xl p-6 text-left transition-all duration-300 sm:p-7 ${
        selected
          ? 'bg-white shadow-[0_18px_40px_-18px_rgba(6,48,26,0.35)] ring-2 ring-[#36B936]'
          : 'bg-white ring-1 ring-[#0A4D26]/10 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(6,48,26,0.3)] hover:ring-[#36B936]/50'
      }`}
    >
      <span
        className={`absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-[#36B936] text-[#06301A] transition-all duration-300 ${
          selected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
        aria-hidden="true"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <span
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${
          selected ? 'bg-[#06301A] text-[#36B936]' : 'bg-[#0A4D26]/[0.06] text-[#0A4D26] group-hover:bg-[#06301A] group-hover:text-[#36B936]'
        }`}
      >
        <Icon className="h-7 w-7" strokeWidth={1.4} />
      </span>
      <span className="text-lg font-semibold tracking-tight text-[#06301A]">{title}</span>
      <span className="mt-1 text-sm leading-relaxed text-[#0A4D26]/65">{description}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step chrome                                                               */
/* -------------------------------------------------------------------------- */

function Progress({ current }: { current: number }) {
  return (
    <div className="mb-10 sm:mb-12">
      <div className="mb-3 flex items-center justify-between text-[13px]">
        <span className="font-semibold text-[#06301A]">{STEPS[current - 1].label}</span>
        <span className="text-[#0A4D26]/50">
          Step {current} of {STEPS.length}
        </span>
      </div>
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={current}
        aria-label="Shipment progress"
      >
        {STEPS.map((s, i) => (
          <span key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-[#0A4D26]/10">
            <span
              className="block h-full rounded-full bg-[#36B936] transition-all duration-500"
              style={{ width: current > i ? '100%' : '0%' }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function StepActions({
  onBack,
  nextLabel,
  disabled,
  loading,
}: {
  onBack: () => void;
  nextLabel: string;
  disabled: boolean;
  loading?: boolean;
}) {
  return (
    <div className="mt-12 flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 rounded-full py-2 pr-3 text-[15px] font-medium text-[#0A4D26]/70 transition-colors hover:text-[#06301A]"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        Back
      </button>
      <button type="submit" disabled={disabled || loading} className={primaryButton}>
        {loading ? 'Please wait…' : nextLabel}
        {!loading && <ChevronRight className="-mr-1 h-5 w-5" aria-hidden="true" />}
      </button>
    </div>
  );
}

const place = (city: string, country: string) => [city.trim(), country.trim()].filter(Boolean).join(', ') || '—';

function Summary({ form }: { form: ShipmentForm }) {
  const { destination, shipper, receiver, details } = form;
  const rows: { label: string; value: string }[] = [
    { label: 'Service', value: destination ? (destination === 'domestic' ? 'Domestic' : 'International') : '—' },
    { label: 'From', value: place(shipper.city, shipper.country) },
    { label: 'To', value: place(receiver.city, receiver.country) },
    {
      label: 'Package',
      value:
        [
          details.weight ? `${details.weight} ${details.weightUnit}` : '',
          details.pieces ? `${details.pieces} pc` : '',
          details.type ? (details.type === 'document' ? 'Document' : 'Parcel') : '',
        ]
          .filter(Boolean)
          .join(' · ') || '—',
    },
  ];

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0A4D26] to-[#06301A] p-7 text-white shadow-[0_30px_60px_-30px_rgba(6,48,26,0.7)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#36B936]/30 blur-3xl"
        />
        <div className="relative">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#36B936]" />
            <h3 className="text-sm font-semibold tracking-tight">Your shipment</h3>
          </div>
          <dl className="flex flex-col">
            {rows.map((r) => (
              <div key={r.label} className="border-t border-white/10 py-4 first:border-0 first:pt-0 last:pb-0">
                <dt className="mb-1 text-[11px] font-medium uppercase tracking-wider text-white/45">{r.label}</dt>
                <dd className="break-words text-[15px] font-medium text-white">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*  Auth step                                                                 */
/* -------------------------------------------------------------------------- */

function AuthCard({
  icon: Icon,
  title,
  description,
  cta,
  dark,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  dark?: boolean;
}): ReactNode {
  return (
    <div
      className={`group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[2rem] p-8 text-left transition-all duration-300 hover:-translate-y-1 sm:p-10 ${
        dark
          ? 'bg-gradient-to-br from-[#0A4D26] to-[#06301A] text-white shadow-[0_30px_60px_-30px_rgba(6,48,26,0.7)]'
          : 'bg-white text-[#06301A] ring-1 ring-[#0A4D26]/10 hover:shadow-[0_30px_60px_-30px_rgba(6,48,26,0.35)] hover:ring-[#36B936]/50'
      }`}
    >
      {dark && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#36B936]/30 blur-3xl"
        />
      )}
      <span
        className={`relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl ${
          dark ? 'bg-[#36B936] text-[#06301A]' : 'bg-[#0A4D26]/[0.06] text-[#0A4D26] transition-colors duration-300 group-hover:bg-[#06301A] group-hover:text-[#36B936]'
        }`}
      >
        <Icon className="h-7 w-7" strokeWidth={1.4} />
      </span>
      <h3 className="relative mb-2 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className={`relative mb-8 text-[15px] leading-relaxed ${dark ? 'text-white/70' : 'text-[#0A4D26]/65'}`}>{description}</p>
      <span
        className={`relative mt-auto inline-flex items-center gap-0.5 text-[15px] font-semibold ${
          dark ? 'text-[#36B936]' : 'text-[#0A4D26]'
        }`}
      >
        {cta}
        <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function SendShipment() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ShipmentForm>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const total = STEPS.length;
  const valid = isStepValid(step, form);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const goNext = () => setStep((s) => Math.min(s + 1, total));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  // Field updaters: all state lives in one place, so going Back never loses input.
  const setShipper = (key: keyof ShipperForm) => (value: string) =>
    setForm((f) => ({ ...f, shipper: { ...f.shipper, [key]: value } }));
  const setReceiver = (key: keyof ReceiverForm) => (value: string) =>
    setForm((f) => ({ ...f, receiver: { ...f.receiver, [key]: value } }));
  const setDetails = <K extends keyof DetailsForm>(key: K) => (value: DetailsForm[K]) =>
    setForm((f) => ({ ...f, details: { ...f.details, [key]: value } }));

  const chooseDestination = (value: DestinationType) =>
    setForm((f) => ({
      ...f,
      destination: value,
      // Domestic always lands in the UAE; switching to international clears that guess.
      receiver: {
        ...f.receiver,
        country: value === 'domestic' ? UAE : f.receiver.country === UAE ? '' : f.receiver.country,
      },
    }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    if (step < total) {
      goNext();
      return;
    }
    // Final step: hand the collected data to your payment step / API.
    setSubmitting(true);
    // TODO: POST `form` to your API (or stash it in your store) before navigating.
    router.push(SEND_ROUTES.payment);
  };

  const current = step > 0 ? STEPS[step - 1] : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-hidden bg-white font-sans antialiased">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[1000px] max-w-full -translate-x-1/2 rounded-full bg-[#36B936]/[0.09] blur-[130px]"
        />

        <div className="relative mx-auto w-full max-w-[1080px] px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
          {step === 0 ? (
            /* ---------------------------- Auth choice ---------------------------- */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mx-auto flex w-full max-w-[900px] flex-col items-center"
            >
              <div className="mb-12 text-center sm:mb-16">
                <h1 className="mb-5 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#06301A] sm:text-6xl md:text-[4.25rem]">
                  {AUTH_CONTENT.title}
                </h1>
                <p className="mx-auto max-w-[540px] text-base leading-relaxed text-[#0A4D26]/65 sm:text-lg">
                  {AUTH_CONTENT.subtitle}
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <Link
                  href={`${SEND_ROUTES.login}?next=/send-shipment`}
                  className="block rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-4"
                >
                  <AuthCard
                    icon={UserCheck}
                    title={AUTH_CONTENT.login.title}
                    description={AUTH_CONTENT.login.description}
                    cta={AUTH_CONTENT.login.cta}
                    dark
                  />
                </Link>

                <button
                  type="button"
                  onClick={goNext}
                  className="block rounded-[2rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-4"
                >
                  <AuthCard
                    icon={User}
                    title={AUTH_CONTENT.guest.title}
                    description={AUTH_CONTENT.guest.description}
                    cta={AUTH_CONTENT.guest.cta}
                  />
                </button>
              </div>

              <p className="mt-10 text-sm text-[#0A4D26]/45">{AUTH_CONTENT.footnote}</p>
            </motion.div>
          ) : (
            /* ------------------------------ Steps ------------------------------ */
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
              <div className="min-w-0 max-w-[680px]">
                <Progress current={step} />

                <AnimatePresence mode="wait" initial={false}>
                  <motion.form
                    key={step}
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="mb-10">
                      <h1 className="mb-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#06301A] sm:text-5xl">
                        {current?.title}
                      </h1>
                      <p className="text-base text-[#0A4D26]/65 sm:text-lg">{current?.subtitle}</p>
                    </div>

                    {/* Step 1: Destination */}
                    {step === 1 && (
                      <div role="radiogroup" aria-label="Destination" className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                        {DESTINATION_OPTIONS.map((opt) => (
                          <ChoiceCard
                            key={opt.value}
                            option={opt}
                            selected={form.destination === opt.value}
                            onSelect={chooseDestination}
                          />
                        ))}
                      </div>
                    )}

                    {/* Step 2: Shipper */}
                    {step === 2 && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field id="s-name" label="Full name" autoComplete="name"
                          value={form.shipper.fullName} onChange={setShipper('fullName')} />
                        <Field id="s-email" label="Email address" type="email" inputMode="email" autoComplete="email"
                          value={form.shipper.email} onChange={setShipper('email')} />
                        <Field id="s-phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel"
                          value={form.shipper.phone} onChange={setShipper('phone')} />
                        <Field id="s-country" label="Country" autoComplete="country-name"
                          value={form.shipper.country} onChange={setShipper('country')} />
                        <div className="md:col-span-2">
                          <Field id="s-address" label="Street address" autoComplete="street-address"
                            value={form.shipper.address} onChange={setShipper('address')} />
                        </div>
                        <Field id="s-city" label="City" autoComplete="address-level2"
                          value={form.shipper.city} onChange={setShipper('city')} />
                        <Field id="s-unit" label="Apt, suite or unit" optional
                          value={form.shipper.unit} onChange={setShipper('unit')} />
                      </div>
                    )}

                    {/* Step 3: Receiver */}
                    {step === 3 && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field id="r-name" label="Receiver's name"
                          value={form.receiver.name} onChange={setReceiver('name')} />
                        <Field id="r-email" label="Receiver's email" type="email" inputMode="email" optional
                          value={form.receiver.email} onChange={setReceiver('email')} />
                        <Field id="r-phone" label="Receiver's phone" type="tel" inputMode="tel"
                          value={form.receiver.phone} onChange={setReceiver('phone')} />
                        <Field id="r-country" label="Destination country"
                          value={form.receiver.country} onChange={setReceiver('country')} />
                        <div className="md:col-span-2">
                          <Field id="r-address" label="Delivery address"
                            value={form.receiver.address} onChange={setReceiver('address')} />
                        </div>
                        <Field id="r-city" label="City"
                          value={form.receiver.city} onChange={setReceiver('city')} />
                        <Field id="r-postal" label="Postal or zip code" optional
                          value={form.receiver.postal} onChange={setReceiver('postal')} />
                      </div>
                    )}

                    {/* Step 4: Shipment details */}
                    {step === 4 && (
                      <div className="flex flex-col gap-10">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="md:col-span-2">
                            <Field id="d-content" label="What's inside?"
                              value={form.details.content} onChange={setDetails('content')} />
                          </div>

                          {/* Weight with unit selector */}
                          <div className="relative min-w-0">
                            <input
                              id="d-weight"
                              type="number"
                              inputMode="decimal"
                              min={0}
                              step={0.1}
                              placeholder=" "
                              value={form.details.weight}
                              onChange={(e) => setDetails('weight')(e.target.value)}
                              className={`${fieldBase} pr-24`}
                            />
                            <FloatingLabel htmlFor="d-weight" text="Gross weight" lifted={form.details.weight !== ''} />
                            <select
                              aria-label="Weight unit"
                              value={form.details.weightUnit}
                              onChange={(e) => setDetails('weightUnit')(e.target.value as WeightUnit)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#06301A] outline-none ring-1 ring-[#0A4D26]/10 focus:ring-2 focus:ring-[#36B936]"
                            >
                              <option value="kg">Kg</option>
                              <option value="lb">Lb</option>
                            </select>
                          </div>

                          <Field id="d-pieces" label="Number of pieces" type="number" inputMode="numeric" min={1} step={1}
                            value={form.details.pieces} onChange={setDetails('pieces')} />
                        </div>

                        <div>
                          <p className="mb-4 text-[13px] font-semibold text-[#06301A]">Shipment type</p>
                          <div role="radiogroup" aria-label="Shipment type" className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                            {PARCEL_OPTIONS.map((opt) => (
                              <ChoiceCard
                                key={opt.value}
                                option={opt}
                                selected={form.details.type === opt.value}
                                onSelect={setDetails('type')}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="rounded-2xl bg-[#0A4D26]/[0.05] p-5 text-sm leading-relaxed text-[#0A4D26]/70">
                          Please check the list of{' '}
                          <Link
                            href={SEND_ROUTES.prohibitedItems}
                            className="font-medium text-[#06301A] underline decoration-[#36B936] decoration-2 underline-offset-4"
                          >
                            prohibited items
                          </Link>
                          . Price may change in case of any weight difference upon final inspection.
                        </p>
                      </div>
                    )}

                    <StepActions
                      onBack={goBack}
                      disabled={!valid}
                      loading={submitting}
                      nextLabel={
                        step === 1 ? 'Continue' : step === 2 ? 'Next: Receiver' : step === 3 ? 'Next: Shipment' : 'Continue to Payment'
                      }
                    />
                  </motion.form>
                </AnimatePresence>
              </div>

              <Summary form={form} />
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}