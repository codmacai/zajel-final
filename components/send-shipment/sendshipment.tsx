'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Lock,
  LogIn,
  MapPin,
  Package,
  Plane,
  ShieldCheck,
  Truck,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import {
  AUTH_CONTENT,
  DESTINATION_OPTIONS,
  INITIAL_FORM,
  NEXT_LABELS,
  PAGE_CONTENT,
  PARCEL_OPTIONS,
  SEND_ROUTES,
  STEPS,
  TRUST_POINTS,
  UAE,
  type ChoiceOption,
  type DestinationType,
  type DetailsForm,
  type ReceiverForm,
  type ShipmentForm,
  type ShipperForm,
  type WeightUnit,
} from './data';

/* -------------------------------------------------------------------------- */
/*  Palette (matches the Track page)                                          */
/*  ink #064423 · brand green #36B936 · border #E5EBE7 · soft bg #F0F4F2      */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

const primaryButton =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#36B936] px-7 text-[14px] font-medium text-white ' +
  'outline-none transition-all duration-300 hover:bg-[#2EA32E] active:scale-[0.99] ' +
  'focus-visible:ring-2 focus-visible:ring-[#064423] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70';

const card = 'rounded-[1.25rem] border border-[#E5EBE7] bg-white shadow-[0_8px_30px_rgba(6,68,35,0.04)] sm:rounded-[1.75rem]';

const inputBase =
  'h-12 w-full rounded-[12px] border bg-white px-4 text-[14px] text-[#064423] outline-none transition-all ' +
  'placeholder:text-gray-400 focus:border-[#36B936] focus:ring-1 focus:ring-[#36B936] sm:rounded-[14px] ' +
  '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none';

/* -------------------------------------------------------------------------- */
/*  Validation — one message per field, shown after the first Continue click  */
/* -------------------------------------------------------------------------- */

type Errors = Record<string, string>;

const blank = (v: string) => v.trim().length === 0;
const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());

function stepErrors(step: number, f: ShipmentForm): Errors {
  const e: Errors = {};
  const need = (id: string, v: string, msg: string) => {
    if (blank(v)) e[id] = msg;
  };

  if (step === 1 && !f.destination) e.destination = 'Choose where your shipment is going.';

  if (step === 2) {
    const s = f.shipper;
    need('s-name', s.fullName, 'Enter your full name.');
    if (!emailOk(s.email)) e['s-email'] = 'Enter a valid email address.';
    need('s-phone', s.phone, 'Enter a phone number.');
    need('s-address', s.address, 'Enter the pickup address.');
    need('s-city', s.city, 'Enter the city.');
    need('s-country', s.country, 'Enter the country.');
  }

  if (step === 3) {
    const r = f.receiver;
    need('r-name', r.name, "Enter the receiver's name.");
    need('r-phone', r.phone, "Enter the receiver's phone number.");
    if (!blank(r.email) && !emailOk(r.email)) e['r-email'] = 'Enter a valid email address.';
    need('r-address', r.address, 'Enter the delivery address.');
    need('r-city', r.city, 'Enter the city.');
    need('r-country', r.country, 'Enter the destination country.');
  }

  if (step === 4) {
    const d = f.details;
    if (!d.type) e.type = 'Choose documents or parcel.';
    need('d-content', d.content, 'Describe what is inside.');
    if (!(Number(d.weight) > 0)) e['d-weight'] = 'Enter the weight.';
    if (!(Number(d.pieces) >= 1)) e['d-pieces'] = 'Enter at least 1 piece.';
  }

  return e;
}

/* -------------------------------------------------------------------------- */
/*  Form building blocks                                                      */
/* -------------------------------------------------------------------------- */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  error?: string;
  optional?: boolean;
  readOnly?: boolean;
  type?: string;
  placeholder?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal';
  autoComplete?: string;
  min?: number;
  step?: number | string;
  className?: string;
}

function Field({ id, label, value, onChange, error, optional, readOnly, className = '', ...input }: FieldProps) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <label htmlFor={id} className="mx-1 mb-2 flex items-center justify-between text-[12px] text-[#064423] sm:text-[13px]">
        <span>{label}</span>
        {optional && <span className="text-[11px] text-[#064423]/45 sm:text-[12px]">Optional</span>}
        {readOnly && <Lock className="h-3.5 w-3.5 text-[#064423]/40" aria-hidden="true" />}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputBase} ${
          error ? 'border-red-400' : 'border-gray-200'
        } ${readOnly ? 'cursor-default bg-[#F0F4F2] text-[#064423]/70 focus:border-gray-200 focus:ring-0' : ''}`}
        {...input}
      />
      {error && (
        <p id={`${id}-error`} className="mx-1 mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function GroupTitle({ children }: { children: string }) {
  return <p className="col-span-full -mb-1 text-[11px] font-medium uppercase tracking-wider text-[#064423]/45">{children}</p>;
}

function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onSelect,
  error,
}: {
  label: string;
  options: ChoiceOption<T>[];
  value: T | null;
  onSelect: (value: T) => void;
  error?: string;
}) {
  return (
    <div>
      <div role="radiogroup" aria-label={label} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map(({ value: v, title, description, Icon }) => {
          const selected = value === v;
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(v)}
              className={`flex items-center gap-4 rounded-[14px] border p-4 text-left outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#36B936] sm:p-5 ${
                selected
                  ? 'border-[#36B936] bg-[#36B936]/[0.06] ring-1 ring-[#36B936]'
                  : `bg-white hover:border-[#36B936]/60 ${error ? 'border-red-400' : 'border-gray-200'}`
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  selected ? 'bg-[#36B936] text-white' : 'bg-[#F0F4F2] text-[#064423]'
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-[#064423]">{title}</span>
                <span className="mt-0.5 block text-[12px] leading-snug text-[#064423]/60 sm:text-[13px]">{description}</span>
              </span>
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? 'border-[#36B936] bg-[#36B936] text-white' : 'border-gray-300'
                }`}
              >
                {selected && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="mx-1 mt-2 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stepper — completed steps are clickable so customers can jump back        */
/* -------------------------------------------------------------------------- */

function Stepper({ current, onJump }: { current: number; onJump: (step: number) => void }) {
  return (
    <nav aria-label="Booking steps" className="mb-6 sm:mb-8">
      <ol className="flex items-start">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li key={s.id} className="relative flex flex-1 flex-col items-center">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute right-1/2 top-4 h-[2px] w-full -translate-y-1/2 ${n <= current ? 'bg-[#36B936]' : 'bg-[#E5EBE7]'}`}
                />
              )}
              <button
                type="button"
                disabled={!done}
                onClick={() => onJump(n)}
                aria-current={active ? 'step' : undefined}
                aria-label={`${s.label}${done ? ' (completed, go back)' : ''}`}
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-medium outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-2 ${
                  done
                    ? 'cursor-pointer bg-[#36B936] text-white hover:bg-[#2EA32E]'
                    : active
                      ? 'bg-[#064423] text-white ring-4 ring-[#36B936]/20'
                      : 'cursor-default border border-[#E5EBE7] bg-white text-[#064423]/40'
                }`}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : n}
              </button>
              <span
                className={`mt-2 text-[11px] sm:text-[13px] ${
                  active ? 'font-medium text-[#064423]' : done ? 'text-[#064423]/70' : 'text-[#064423]/40'
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Summary — the route visual updates as the customer types                  */
/* -------------------------------------------------------------------------- */

function RouteStop({ label, primary, secondary }: { label: string; primary: string; secondary: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[#36B936] bg-white">
        <span className="h-1.5 w-1.5 rounded-full bg-[#36B936]" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">{label}</p>
        <p className="truncate text-[14px] font-medium text-[#064423]">{primary || '—'}</p>
        {secondary && <p className="truncate text-[12px] text-[#064423]/55">{secondary}</p>}
      </div>
    </div>
  );
}

function Summary({ form }: { form: ShipmentForm }) {
  const { destination, shipper, receiver, details } = form;
  const ModeIcon = destination === 'international' ? Plane : Truck;
  const pkg =
    [
      details.type ? (details.type === 'document' ? 'Documents' : 'Parcel') : '',
      details.weight ? `${details.weight} ${details.weightUnit}` : '',
      details.pieces ? `${details.pieces} ${details.pieces === '1' ? 'piece' : 'pieces'}` : '',
    ]
      .filter(Boolean)
      .join(' · ') || '—';

  return (
    <aside className={`${card} h-fit p-5 sm:p-6 lg:sticky lg:top-28`} aria-label="Shipment summary">
      <p className="mb-5 text-[13px] font-medium text-[#064423]">Shipment summary</p>

      <div className="relative">
        <RouteStop label="Pickup" primary={shipper.city} secondary={shipper.country} />
        <div className="my-1 ml-[7px] flex items-center gap-3 border-l-2 border-dashed border-[#36B936]/40 py-3 pl-5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0F4F2] text-[#064423]">
            <ModeIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-[12px] text-[#064423]/60">
            {destination ? (destination === 'domestic' ? 'Domestic delivery' : 'International delivery') : 'Choose a route'}
          </span>
        </div>
        <RouteStop label="Delivery" primary={receiver.city} secondary={receiver.country} />
      </div>

      <div className="mt-5 flex items-start gap-3 border-t border-[#E5EBE7] pt-5">
        <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#36B936]" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Package</p>
          <p className="text-[14px] font-medium text-[#064423]">{pkg}</p>
        </div>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*  Start screen                                                              */
/* -------------------------------------------------------------------------- */

function StartOption({ Icon, title, description, primary }: { Icon: LucideIcon; title: string; description: string; primary?: boolean }) {
  return (
    <span className="flex items-center gap-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          primary ? 'bg-[#36B936] text-white' : 'bg-[#F0F4F2] text-[#064423]'
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[15px] font-medium text-[#064423]">{title}</span>
        <span className="mt-0.5 block text-[12px] leading-snug text-[#064423]/60 sm:text-[13px]">{description}</span>
      </span>
      <ChevronRight
        className="h-5 w-5 shrink-0 text-[#064423]/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#36B936]"
        aria-hidden="true"
      />
    </span>
  );
}

const startRow =
  'group block w-full rounded-[14px] border p-4 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#36B936] sm:p-5';

function StartScreen({ onGuest }: { onGuest: () => void }) {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className={`${card} p-4 sm:p-6 md:p-8`}>
        <p className="mx-1 mb-4 text-[13px] text-[#064423] sm:mb-5 sm:text-[14px]">{AUTH_CONTENT.heading}</p>
        <div className="flex flex-col gap-3">
          <button type="button" onClick={onGuest} className={`${startRow} border-[#36B936] bg-[#36B936]/[0.06] hover:bg-[#36B936]/[0.1]`}>
            <StartOption Icon={UserRound} title={AUTH_CONTENT.guest.title} description={AUTH_CONTENT.guest.description} primary />
          </button>
          <Link href={`${SEND_ROUTES.login}?next=/send-shipment`} className={`${startRow} border-gray-200 bg-white hover:border-[#36B936]/60`}>
            <StartOption Icon={LogIn} title={AUTH_CONTENT.login.title} description={AUTH_CONTENT.login.description} />
          </Link>
        </div>
        <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-[#9CA3AF] sm:text-[12px]">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {AUTH_CONTENT.footnote}
        </p>
      </div>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {TRUST_POINTS.map((t, i) => {
          const Icon = [MapPin, Truck, ShieldCheck][i];
          return (
            <li key={t} className="flex items-center gap-1.5 text-[12px] text-[#064423]/60 sm:text-[13px]">
              <Icon className="h-4 w-4 text-[#36B936]" aria-hidden="true" />
              {t}
            </li>
          );
        })}
      </ul>
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
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const total = STEPS.length;
  const errors = showErrors ? stepErrors(step, form) : {};
  const domestic = form.destination === 'domestic';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const goTo = (n: number) => {
    setShowErrors(false);
    setStep(Math.max(0, Math.min(n, total)));
  };

  // Field updaters: all state lives in one place, so going back never loses input.
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
    if (submitting) return;

    const found = stepErrors(step, form);
    if (Object.keys(found).length > 0) {
      setShowErrors(true);
      // Move focus to the first field that needs attention.
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    if (step < total) {
      goTo(step + 1);
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
      <section className="min-h-screen w-full bg-white px-4 pb-20 pt-32 font-sans antialiased sm:px-6 md:pb-24 md:pt-40 lg:px-8">
        <div className="mx-auto mb-8 max-w-[560px] px-2 text-center sm:mb-10">
          <h1 className="mb-3 text-2xl font-medium tracking-tight text-[#064423] sm:mb-4 sm:text-3xl md:text-4xl">{PAGE_CONTENT.title}</h1>
          {step === 0 && <p className="text-xs leading-relaxed text-[#064423]/60 sm:text-sm">{PAGE_CONTENT.subtitle}</p>}
        </div>

        {step === 0 ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <StartScreen onGuest={() => goTo(1)} />
          </motion.div>
        ) : (
          <div className="mx-auto w-full max-w-[1040px]">
            <div className="mx-auto max-w-[640px] lg:ml-0">
              <Stepper current={step} onJump={goTo} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-8">
              <div className={`${card} min-w-0 p-4 sm:p-6 md:p-8`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.form
                    ref={formRef}
                    key={step}
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <div className="mb-6 sm:mb-8">
                      <h2 className="text-xl font-medium tracking-tight text-[#064423] sm:text-2xl">{current?.title}</h2>
                      <p className="mt-1 text-[13px] text-[#064423]/60 sm:text-[14px]">{current?.subtitle}</p>
                    </div>

                    {step === 1 && (
                      <ChoiceGroup
                        label="Destination"
                        options={DESTINATION_OPTIONS}
                        value={form.destination}
                        onSelect={chooseDestination}
                        error={errors.destination}
                      />
                    )}

                    {step === 2 && (
                      <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
                        <GroupTitle>Contact</GroupTitle>
                        <Field id="s-name" label="Full name" autoComplete="name" className="md:col-span-2"
                          value={form.shipper.fullName} onChange={setShipper('fullName')} error={errors['s-name']} />
                        <Field id="s-email" label="Email" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com"
                          value={form.shipper.email} onChange={setShipper('email')} error={errors['s-email']} />
                        <Field id="s-phone" label="Phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 5X XXX XXXX"
                          value={form.shipper.phone} onChange={setShipper('phone')} error={errors['s-phone']} />

                        <GroupTitle>Pickup address</GroupTitle>
                        <Field id="s-address" label="Street address" autoComplete="street-address" className="md:col-span-2"
                          placeholder="Building, street, area"
                          value={form.shipper.address} onChange={setShipper('address')} error={errors['s-address']} />
                        <Field id="s-unit" label="Apartment, office or floor" optional
                          value={form.shipper.unit} onChange={setShipper('unit')} />
                        <Field id="s-city" label="City" autoComplete="address-level2" placeholder="e.g. Dubai"
                          value={form.shipper.city} onChange={setShipper('city')} error={errors['s-city']} />
                        <Field id="s-country" label="Country" autoComplete="country-name" className="md:col-span-2"
                          value={form.shipper.country} onChange={setShipper('country')} error={errors['s-country']} />
                      </div>
                    )}

                    {step === 3 && (
                      <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
                        <GroupTitle>Contact</GroupTitle>
                        <Field id="r-name" label="Receiver's full name" className="md:col-span-2"
                          value={form.receiver.name} onChange={setReceiver('name')} error={errors['r-name']} />
                        <Field id="r-phone" label="Phone" type="tel" inputMode="tel"
                          placeholder={domestic ? '+971 5X XXX XXXX' : 'Include country code'}
                          value={form.receiver.phone} onChange={setReceiver('phone')} error={errors['r-phone']} />
                        <Field id="r-email" label="Email" type="email" inputMode="email" optional placeholder="For delivery updates"
                          value={form.receiver.email} onChange={setReceiver('email')} error={errors['r-email']} />

                        <GroupTitle>Delivery address</GroupTitle>
                        <Field id="r-address" label="Street address" className="md:col-span-2" placeholder="Building, street, area"
                          value={form.receiver.address} onChange={setReceiver('address')} error={errors['r-address']} />
                        <Field id="r-city" label="City"
                          value={form.receiver.city} onChange={setReceiver('city')} error={errors['r-city']} />
                        <Field id="r-postal" label="Postal or ZIP code" optional
                          value={form.receiver.postal} onChange={setReceiver('postal')} />
                        <Field id="r-country" label="Country" className="md:col-span-2" readOnly={domestic}
                          value={form.receiver.country} onChange={setReceiver('country')} error={errors['r-country']} />
                      </div>
                    )}

                    {step === 4 && (
                      <div className="flex flex-col gap-6">
                        <ChoiceGroup
                          label="Shipment type"
                          options={PARCEL_OPTIONS}
                          value={form.details.type}
                          onSelect={setDetails('type')}
                          error={errors.type}
                        />

                        <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
                          <Field id="d-content" label="What's inside?" className="md:col-span-2" placeholder="e.g. Contracts, clothing, electronics"
                            value={form.details.content} onChange={setDetails('content')} error={errors['d-content']} />

                          {/* Weight with unit toggle */}
                          <div className="flex min-w-0 flex-col">
                            <label htmlFor="d-weight" className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">
                              Weight
                            </label>
                            <div className="relative">
                              <input
                                id="d-weight"
                                type="number"
                                inputMode="decimal"
                                min={0}
                                step={0.1}
                                placeholder="0.0"
                                value={form.details.weight}
                                onChange={(e) => setDetails('weight')(e.target.value)}
                                aria-invalid={!!errors['d-weight']}
                                className={`${inputBase} pr-28 ${errors['d-weight'] ? 'border-red-400' : 'border-gray-200'}`}
                              />
                              <div role="radiogroup" aria-label="Weight unit" className="absolute right-1.5 top-1/2 flex -translate-y-1/2 rounded-full bg-[#F0F4F2] p-1">
                                {(['kg', 'lb'] as WeightUnit[]).map((u) => (
                                  <button
                                    key={u}
                                    type="button"
                                    role="radio"
                                    aria-checked={form.details.weightUnit === u}
                                    onClick={() => setDetails('weightUnit')(u)}
                                    className={`rounded-full px-3 py-1 text-[12px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#36B936] ${
                                      form.details.weightUnit === u ? 'bg-white text-[#064423] shadow-sm' : 'text-[#064423]/50'
                                    }`}
                                  >
                                    {u}
                                  </button>
                                ))}
                              </div>
                            </div>
                            {errors['d-weight'] && <p className="mx-1 mt-1.5 text-[12px] text-red-600">{errors['d-weight']}</p>}
                          </div>

                          <Field id="d-pieces" label="Number of pieces" type="number" inputMode="numeric" min={1} step={1}
                            value={form.details.pieces} onChange={setDetails('pieces')} error={errors['d-pieces']} />
                        </div>

                        <p className="rounded-[14px] bg-[#F0F4F2] p-4 text-[12px] leading-relaxed text-[#064423]/70 sm:text-[13px]">
                          Please check the list of{' '}
                          <Link
                            href={SEND_ROUTES.prohibitedItems}
                            className="font-medium text-[#064423] underline decoration-[#36B936] decoration-2 underline-offset-4"
                          >
                            prohibited items
                          </Link>
                          . The price may change if the weight differs at final inspection.
                        </p>
                      </div>
                    )}

                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#E5EBE7] pt-6 sm:mt-10">
                      <button
                        type="button"
                        onClick={() => goTo(step - 1)}
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-[14px] text-[#064423]/70 outline-none transition-colors hover:text-[#064423] focus-visible:ring-2 focus-visible:ring-[#36B936]"
                      >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back
                      </button>
                      <button type="submit" disabled={submitting} className={primaryButton}>
                        {submitting ? 'Please wait…' : NEXT_LABELS[step - 1]}
                        {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                      </button>
                    </div>
                  </motion.form>
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-4">
                <Summary form={form} />
                <p className="px-2 text-center text-[12px] text-[#064423]/55 lg:text-left">
                  {PAGE_CONTENT.helpText}{' '}
                  <Link href={SEND_ROUTES.help} className="font-medium text-[#064423] underline decoration-[#36B936] underline-offset-4">
                    {PAGE_CONTENT.helpCta}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </MotionConfig>
  );
}
