'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Download,
  Loader2,
  Lock,
  LogIn,
  MapPin,
  Package,
  Pencil,
  Plane,
  Search,
  ShieldAlert,
  ShieldCheck,
  Truck,
  XCircle,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useAccountAddresses } from '@/hooks/useAccountAddresses';
import { useValidateShipment } from '@/hooks/useValidateShipment';
import { useCreateShipment } from '@/hooks/useCreateShipment';
import AddressAutocompleteInput from '@/components/shipment/AddressAutocompleteInput';
import PaymentModal from '@/components/shipment/PaymentModal';
import SavedAddressPicker, { type PartyMode } from './SavedAddressPicker';
import { CARD_HOVER, CARD_TAP, CHIP_HOVER, CHIP_TAP, PAGE_VARIANTS, SOFT_SPRING, SPRING, useAutoAdvance } from './motion';
import InternationalShipmentWizard from './international/InternationalShipmentWizard';
import { loginHref } from '@/lib/auth/returnUrl';
import { isValidEmail } from '@/lib/validation';
import type { SavedAddress } from '@/types/account';
import type {
  ConfirmShipmentResult,
  CreateShipmentV2Result,
  GeoAddress,
  PaymentOutcome,
  ServiceOption,
  WorkingDay,
} from '@/types/shipment';
import {
  AUTH_CONTENT,
  DEFAULT_DIMENSION_CM,
  DESTINATION_OPTIONS,
  INITIAL_FORM,
  NEXT_LABELS,
  PAGE_CONTENT,
  REVIEW_CONTENT,
  SEND_ROUTES,
  STEPS,
  TRUST_POINTS,
  UAE,
  VEHICLE_MAX_KG,
  VEHICLE_OPTIONS,
  type ChoiceOption,
  type DestinationType,
  type DetailsForm,
  type PartyForm,
  type ShipmentForm,
  type StepId,
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

/** Index into STEPS is 1-based; REVIEW is the screen after the last step. */
const REVIEW = STEPS.length + 1;
const stepNumber = (id: StepId) => STEPS.findIndex((s) => s.id === id) + 1;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

type Errors = Record<string, string>;

const blank = (v: string) => v.trim().length === 0;

/** The weight sent for a domestic booking is the chosen vehicle's limit — weight isn't asked. */
function weightInKg(d: DetailsForm): number {
  return d.vehicle ? VEHICLE_MAX_KG[d.vehicle] : 0;
}

const vehicleLabel = (d: DetailsForm) => (d.vehicle ? `${d.vehicle === 'bike' ? 'Bike' : 'Car'} (up to ${VEHICLE_MAX_KG[d.vehicle]} kg)` : '');


function savedAddressToGeo(addr: SavedAddress): GeoAddress {
  return {
    formattedAddress: addr.address ?? '',
    city: addr.city ?? '',
    country: UAE,
    area: addr.defaultArea ?? '',
    latitude: Number(addr.latitude) || 0,
    longitude: Number(addr.longitude) || 0,
  };
}

function partyErrors(prefix: 's' | 'r', p: PartyForm, mode: PartyMode, who: 'pickup' | 'delivery'): Errors {
  const e: Errors = {};
  if (mode === 'pick') {
    if (!p.savedAddressId) e[`${prefix}-saved`] = `Choose a saved address or add a new ${who} address.`;
    return e;
  }
  if (blank(p.fullName)) e[`${prefix}-name`] = prefix === 's' ? 'Enter your full name.' : "Enter the receiver's name.";
  if (blank(p.phone)) e[`${prefix}-phone`] = 'Enter a phone number.';
  if (!blank(p.email) && !isValidEmail(p.email)) e[`${prefix}-email`] = 'Enter a valid email address.';
  if (!p.place.latitude) e[`${prefix}-address`] = `Pick the ${who} address from the suggestions.`;
  if (blank(p.building)) e[`${prefix}-building`] = 'Enter the building or landmark.';
  return e;
}

function weekdayAndDay(isoDate: string | undefined): { weekday: string; day: string; month: string } {
  if (!isoDate) return { weekday: '', day: '', month: '' };
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return { weekday: isoDate, day: '', month: '' };
  return {
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
  };
}

const SERVICE_ICONS: Record<string, LucideIcon> = { SAME_DAY: Zap, NEXT_DAY: Clock };

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

function ErrorBanner({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="mt-6 flex items-start gap-2 rounded-[14px] border border-red-100 bg-red-50 p-4 text-[13px] text-red-700">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onSelect,
  error,
  iconTile = false,
}: {
  label: string;
  options: ChoiceOption<T>[];
  value: T | null;
  onSelect: (value: T) => void;
  error?: string;
  /** Larger icon on a tinted tile — used for the vehicle choice. */
  iconTile?: boolean;
}) {
  return (
    <div>
      <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-3">
        {options.map(({ value: v, title, description, Icon, disabled, badge }) => {
          const selected = value === v;
          return (
            <motion.button
              key={v}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-disabled={disabled}
              disabled={disabled}
              onClick={() => onSelect(v)}
              whileHover={disabled ? undefined : CARD_HOVER}
              whileTap={disabled ? undefined : CARD_TAP}
              transition={SPRING}
              className={`group relative flex min-h-[132px] flex-col items-start justify-between rounded-[14px] border p-4 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[148px] sm:p-5 ${
                selected
                  ? 'border-[#36B936] bg-[#36B936]/[0.04]'
                  : `bg-white hover:border-[#064423]/25 ${error ? 'border-red-400' : 'border-[#E5EBE7]'}`
              }`}
            >
              {iconTile ? (
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-[12px] transition-colors duration-200 sm:h-14 sm:w-14 ${
                    selected ? 'bg-[#36B936] text-white shadow-[0_6px_16px_-6px_rgba(54,185,54,0.55)]' : 'bg-[#F0F4F2] text-[#064423]/70 group-hover:text-[#064423]'
                  }`}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} aria-hidden="true" />
                </span>
              ) : (
                <Icon
                  className={`h-6 w-6 transition-colors duration-200 ${
                    selected ? 'text-[#36B936]' : 'text-[#064423]/50 group-hover:text-[#064423]'
                  }`}
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              )}
              <span
                aria-hidden="true"
                className={`absolute right-4 top-4 flex h-[18px] w-[18px] items-center justify-center rounded-full transition-all duration-200 sm:right-5 sm:top-5 ${
                  selected ? 'bg-[#36B936] text-white' : 'border border-[#064423]/20'
                }`}
              >
                <AnimatePresence>
                  {selected && (
                    <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={SPRING}>
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="mt-6 block">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-[14px] font-medium tracking-tight text-[#064423] sm:text-[15px]">{title}</span>
                  {badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors duration-200 ${
                        selected ? 'bg-[#36B936]/15 text-[#1f7a1f]' : 'bg-[#F0F4F2] text-[#064423]/70'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-[12px] font-light leading-snug text-[#064423]/55 sm:text-[13px]">{description}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
      {error && <p className="mx-1 mt-2 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress — thin segments; finished steps can be clicked to go back        */
/* -------------------------------------------------------------------------- */

function Stepper({ current, onJump }: { current: number; onJump: (step: number) => void }) {
  const onReview = current > STEPS.length;
  return (
    <nav aria-label="Booking steps" className="mb-6 sm:mb-8">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[#36B936] sm:text-[12px]">
        {onReview ? 'Review & pay' : `Step ${current} of ${STEPS.length}`}
      </p>
      <ol className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))` }}>
        {STEPS.map((s, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li key={s.id}>
              <button
                type="button"
                disabled={!done}
                onClick={() => onJump(n)}
                aria-current={active ? 'step' : undefined}
                aria-label={`${s.label}${done ? ' (completed, go back)' : ''}`}
                className={`group block w-full rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-4 ${
                  done ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-[#E5EBE7]">
                  <motion.span
                    initial={false}
                    animate={{ scaleX: done ? 1 : active ? 0.5 : 0 }}
                    transition={SOFT_SPRING}
                    style={{ transformOrigin: 'left' }}
                    className={`block h-full w-full rounded-full transition-colors duration-300 ${
                      done ? 'bg-[#36B936] group-hover:bg-[#2EA32E]' : 'bg-[#064423]'
                    }`}
                  />
                </span>
                <span
                  className={`mt-2.5 block truncate text-[11px] transition-colors sm:text-[13px] ${
                    active
                      ? 'font-medium text-[#064423]'
                      : done
                        ? 'text-[#064423]/60 group-hover:text-[#36B936]'
                        : 'text-[#064423]/35'
                  }`}
                >
                  {s.label}
                </span>
              </button>
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

function Summary({ form, service }: { form: ShipmentForm; service: ServiceOption | undefined }) {
  const { destination, shipper, receiver, details } = form;
  const ModeIcon = destination === 'international' ? Plane : Truck;
  const pkg =
    [
      'Parcel',
      vehicleLabel(details),
    ]
      .filter(Boolean)
      .join(' · ') || '—';

  return (
    <aside className={`${card} h-fit p-5 sm:p-6 lg:sticky lg:top-28`} aria-label="Shipment summary">
      <p className="mb-5 text-[13px] font-medium text-[#064423]">Shipment summary</p>

      <div className="relative">
        <RouteStop label="Pickup" primary={shipper.place.city} secondary={shipper.place.city ? shipper.place.country : ''} />
        <div className="my-1 ml-[7px] flex items-center gap-3 border-l-2 border-dashed border-[#36B936]/40 py-3 pl-5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0F4F2] text-[#064423]">
            <ModeIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-[12px] text-[#064423]/60">
            {destination ? (destination === 'domestic' ? 'Domestic delivery' : 'International delivery') : 'Choose a route'}
          </span>
        </div>
        <RouteStop label="Delivery" primary={receiver.place.city} secondary={receiver.place.city ? receiver.place.country : ''} />
      </div>

      <div className="mt-5 flex items-start gap-3 border-t border-[#E5EBE7] pt-5">
        <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#36B936]" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Package</p>
          <p className="text-[14px] font-medium text-[#064423]">{pkg}</p>
        </div>
      </div>

      {service && (
        <div className="mt-5 flex items-start justify-between gap-3 border-t border-[#E5EBE7] pt-5">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Service</p>
            <p className="text-[14px] font-medium text-[#064423]">{service.name}</p>
          </div>
          <p className="shrink-0 text-[15px] font-medium text-[#064423]">AED {service.grossAmount.toFixed(2)}</p>
        </div>
      )}
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/*  Start screens (signed out / profile incomplete)                           */
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

function TrustPoints() {
  return (
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
  );
}

// Guest checkout isn't supported by the booking API — a signed-in session is required.
function StartScreen() {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className={`${card} p-4 sm:p-6 md:p-8`}>
        <p className="mx-1 mb-4 text-[13px] text-[#064423] sm:mb-5 sm:text-[14px]">{AUTH_CONTENT.heading}</p>
        <div className="flex flex-col gap-3">
          <Link href={loginHref('/send-shipment')} className={`${startRow} border-[#36B936] bg-[#36B936]/[0.06] hover:bg-[#36B936]/[0.1]`}>
            <StartOption Icon={LogIn} title={AUTH_CONTENT.login.title} description={AUTH_CONTENT.login.description} primary />
          </Link>
          <Link href="/track" className={`${startRow} border-gray-200 bg-white hover:border-[#36B936]/60`}>
            <StartOption Icon={Search} title={AUTH_CONTENT.track.title} description={AUTH_CONTENT.track.description} />
          </Link>
        </div>
        <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-[#9CA3AF] sm:text-[12px]">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {AUTH_CONTENT.footnote}
        </p>
      </div>
      <TrustPoints />
    </div>
  );
}

function PendingRegistrationNotice({ phone }: { phone: string | null }) {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className={`${card} p-5 sm:p-8`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <div>
            <p className="text-[15px] font-medium text-[#064423]">{AUTH_CONTENT.pendingTitle}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#064423]/65">
              {phone ? <strong className="font-medium text-[#064423]">{phone}: </strong> : null}
              {AUTH_CONTENT.pendingBody}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={SEND_ROUTES.profileTab} className={primaryButton}>
            Go to my account
          </Link>
          <Link
            href={SEND_ROUTES.help}
            className="inline-flex h-12 items-center rounded-full border border-[#E5EBE7] px-6 text-[14px] text-[#064423] transition-colors hover:border-[#36B936]"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

function ReviewBlock({
  title,
  onEdit,
  editDisabled,
  children,
}: {
  title: string;
  onEdit: () => void;
  editDisabled: boolean;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[14px] border border-[#E5EBE7] bg-[#F0F4F2]/60 p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          disabled={editDisabled}
          className="inline-flex items-center gap-1 rounded-full px-1 text-[12px] font-medium text-[#36B936] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[#36B936] disabled:opacity-40"
        >
          <Pencil className="h-3 w-3" aria-hidden="true" /> Edit <span className="sr-only">{title.toLowerCase()}</span>
        </button>
      </div>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Booking wizard (signed-in users)                                          */
/* -------------------------------------------------------------------------- */

type SubmitPhase = 'idle' | 'creating' | 'awaiting-payment' | 'confirm-failed' | 'success' | 'payment-failed';

function BookingWizard() {
  const router = useRouter();
  const { addresses: savedAddresses, loading: savedLoading } = useAccountAddresses();
  const { validateShipment, validating, error: validateError } = useValidateShipment();
  const { createShipment, error: createError } = useCreateShipment();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ShipmentForm>(INITIAL_FORM);
  const [showErrors, setShowErrors] = useState(false);
  // International has its own, differently-shaped wizard (countries/cities, document weight,
  // rate card, CreateShipment -> GeneratePaymentLink with no confirm step) — see
  // components/send-shipment/international. Branched to right after the route step rather
  // than threaded through this domestic state machine.
  const [showInternational, setShowInternational] = useState(false);
  const [originMode, setOriginMode] = useState<PartyMode>('pick');
  const [destinationMode, setDestinationMode] = useState<PartyMode>('pick');

  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [selectedServiceCode, setSelectedServiceCode] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ pickupTime?: string; deliveryTime?: string } | null>(null);

  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>('idle');
  const [payment, setPayment] = useState<CreateShipmentV2Result | null>(null);
  const [confirmed, setConfirmed] = useState<ConfirmShipmentResult | null>(null);
  const [paymentFailureMessage, setPaymentFailureMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // With nothing saved there's nothing to pick from — fall back to the manual form.
  const noSaved = !savedLoading && savedAddresses.length === 0;
  const effOriginMode: PartyMode = noSaved ? 'new' : originMode;
  const effDestinationMode: PartyMode = noSaved ? 'new' : destinationMode;

  const selectedService = serviceOptions.find((o) => o.serviceCode === selectedServiceCode);
  const workingDays: WorkingDay[] = selectedService?.workingDaysListWithTime ?? [];
  const slotsForDate = workingDays.find((d) => d.workingDate === selectedDate)?.timeBetweenList ?? [];

  const currentStep = step <= STEPS.length ? STEPS[step - 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const stepErrors = (id: StepId | undefined): Errors => {
    const e: Errors = {};
    if (id === 'route' && !form.destination) e.destination = 'Choose where your shipment is going.';
    if (id === 'sender') Object.assign(e, partyErrors('s', form.shipper, effOriginMode, 'pickup'));
    if (id === 'receiver') Object.assign(e, partyErrors('r', form.receiver, effDestinationMode, 'delivery'));
    if (id === 'package') {
      const d = form.details;
      if (blank(d.content)) e['d-content'] = 'Describe what is inside.';
      if (!d.vehicle) e.vehicle = 'Choose bike or car.';
    }
    if (id === 'service') {
      if (!selectedService) e.service = 'Choose a delivery service.';
      else if (workingDays.length > 0 && (!selectedDate || !selectedSlot)) e.slot = 'Pick a pickup date and time slot.';
    }
    return e;
  };

  const errors = showErrors ? stepErrors(currentStep?.id) : {};

  const goTo = (n: number) => {
    setShowErrors(false);
    setStep(Math.max(1, Math.min(n, REVIEW)));
  };

  // Field updaters: all state lives in one place, so going back never loses input.
  const setParty = (who: 'shipper' | 'receiver') => (key: keyof PartyForm) => (value: string) =>
    setForm((f) => ({ ...f, [who]: { ...f[who], [key]: value, savedAddressId: null } }));
  const setPartyPlace = (who: 'shipper' | 'receiver') => (place: GeoAddress) =>
    setForm((f) => ({ ...f, [who]: { ...f[who], place, savedAddressId: null } }));
  const pickSaved = (who: 'shipper' | 'receiver') => (addr: SavedAddress) =>
    setForm((f) => ({
      ...f,
      [who]: {
        fullName: addr.name ?? '',
        email: f[who].email,
        phone: addr.phone ?? '',
        place: savedAddressToGeo(addr),
        building: addr.building ?? '',
        apartment: addr.apartment ?? '',
        savedAddressId: addr.id,
      },
    }));
  const setDetails = <K extends keyof DetailsForm>(key: K) => (value: DetailsForm[K]) =>
    setForm((f) => ({ ...f, details: { ...f.details, [key]: value } }));

  const chooseDestination = (value: DestinationType) => setForm((f) => ({ ...f, destination: value }));

  const dimensions = () => ({
    lengthCm: DEFAULT_DIMENSION_CM,
    widthCm: DEFAULT_DIMENSION_CM,
    heightCm: DEFAULT_DIMENSION_CM,
    weightKg: weightInKg(form.details),
  });

  // Leaving the package step: ask the API which services cover this route + weight.
  const findServices = async () => {
    const { shipper, receiver, details } = form;
    const result = await validateShipment({
      phoneNo: shipper.phone,
      parcelType: details.vehicle ?? 'car',
      from: { city: shipper.place.city, latitude: shipper.place.latitude, longitude: shipper.place.longitude },
      to: { city: receiver.place.city, latitude: receiver.place.latitude, longitude: receiver.place.longitude },
      dimensions: [dimensions()],
    });
    if (!result) return;
    setServiceOptions(result.availableServices);
    const first = result.availableServices[0]?.serviceCode ?? null;
    // Keep the previous choice if it's still offered for the (possibly edited) route.
    setSelectedServiceCode((prev) => (prev && result.availableServices.some((o) => o.serviceCode === prev) ? prev : first));
    setSelectedDate(null);
    setSelectedSlot(null);
    goTo(stepNumber('service'));
  };

  const goNext = async () => {
    if (validating) return;

    const found = stepErrors(currentStep?.id);
    if (Object.keys(found).length > 0) {
      setShowErrors(true);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    if (currentStep?.id === 'route' && form.destination === 'international') {
      setShowInternational(true);
      return;
    }
    if (currentStep?.id === 'package') {
      await findServices();
      return;
    }
    goTo(step + 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void goNext();
  };

  // A pick that completes its step (route type, a saved address, the final time slot) moves on
  // by itself, as in the React wizard — see useAutoAdvance.
  const autoAdvance = useAutoAdvance(step, () => void goNext());

  const selectService = (option: ServiceOption) => {
    setSelectedServiceCode(option.serviceCode);
    setSelectedDate(null);
    setSelectedSlot(null);
    // No dates/slots for this service: choosing it is the last answer on this step.
    if (!option.workingDaysListWithTime?.length) autoAdvance();
  };

  const handleCreateShipment = async () => {
    if (!selectedService || submitPhase === 'creating' || submitPhase === 'awaiting-payment') return;
    const strip = (p: PartyForm) => ({
      fullName: p.fullName.trim(),
      email: p.email.trim(),
      phone: p.phone.trim(),
      place: p.place,
      building: p.building.trim(),
      apartment: p.apartment.trim(),
    });

    setSubmitPhase('creating');
    const result = await createShipment({
      shipmentScope: form.destination ?? '',
      shipper: strip(form.shipper),
      receiver: strip(form.receiver),
      parcel: {
        content: form.details.content.trim(),
        weightValue: weightInKg(form.details),
        weightUnit: 'kg',
        numberOfPieces: 1,
        parcelType: 'parcel',
        dimensions: dimensions(),
        vehicleType: form.details.vehicle ?? 'car',
      },
      serviceTypeId: selectedService.serviceCode,
      vatAmount: selectedService.vatAmount,
      amount: selectedService.price,
      pickupDate: selectedDate ?? undefined,
      pickupTime: selectedSlot?.pickupTime,
      deliveryTime: selectedSlot?.deliveryTime,
    });

    if (result) {
      setPayment(result);
      setSubmitPhase('awaiting-payment');
    } else {
      setSubmitPhase('idle');
    }
  };

  // PaymentModal polls our own server for confirmation and only calls this once settled.
  const handlePaymentOutcome = (outcome: PaymentOutcome, result?: ConfirmShipmentResult, message?: string) => {
    if (outcome === 'success' && result) {
      // Stay on this screen (as in Zajel-2) so the user sees what was booked and can grab the
      // receipt before moving on.
      setConfirmed(result);
      setSubmitPhase('success');
      return;
    }
    if (outcome === 'cancelled') {
      setPayment(null);
      setSubmitPhase('idle');
      return;
    }
    if (outcome === 'payment-failed') {
      // The gateway itself said the payment was declined/invalid (read off the
      // /PaymentStatus/Verify return URL) — definitively failed, so a retry is safe. Distinct
      // from 'confirm-failed', where we don't know what happened and must not invite a re-pay.
      setPaymentFailureMessage(message ?? 'Your payment could not be completed.');
      setSubmitPhase('payment-failed');
      return;
    }
    setSubmitPhase('confirm-failed');
  };

  const retryPayment = () => {
    setPayment(null);
    setPaymentFailureMessage(null);
    setSubmitPhase('idle');
  };

  /* ----------------------------- Step bodies ----------------------------- */

  const partyFields = (who: 'shipper' | 'receiver') => {
    const prefix = who === 'shipper' ? 's' : 'r';
    const p = form[who];
    const mode = who === 'shipper' ? effOriginMode : effDestinationMode;
    const setMode = who === 'shipper' ? setOriginMode : setDestinationMode;
    const set = setParty(who);
    const isShipper = who === 'shipper';

    return (
      <>
        <SavedAddressPicker
          idPrefix={prefix}
          addresses={savedAddresses}
          loading={savedLoading}
          mode={mode}
          setMode={setMode}
          selectedId={p.savedAddressId}
          onPick={(addr) => {
            pickSaved(who)(addr);
            autoAdvance(350);
          }}
          error={errors[`${prefix}-saved`]}
        />

        {mode === 'new' && !savedLoading && (
          <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
            <GroupTitle>Contact</GroupTitle>
            <Field id={`${prefix}-name`} label={isShipper ? 'Full name' : "Receiver's full name"} autoComplete={isShipper ? 'name' : 'off'}
              className="md:col-span-2" value={p.fullName} onChange={set('fullName')} error={errors[`${prefix}-name`]} />
            <Field id={`${prefix}-phone`} label="Phone" type="tel" inputMode="tel" autoComplete={isShipper ? 'tel' : 'off'} placeholder="+971 5X XXX XXXX"
              value={p.phone} onChange={set('phone')} error={errors[`${prefix}-phone`]} />
            <Field id={`${prefix}-email`} label="Email" type="email" inputMode="email" optional autoComplete={isShipper ? 'email' : 'off'}
              placeholder={isShipper ? 'name@example.com' : 'For delivery updates'} value={p.email} onChange={set('email')} error={errors[`${prefix}-email`]} />

            <GroupTitle>{isShipper ? 'Pickup address' : 'Delivery address'}</GroupTitle>
            <div className="md:col-span-2">
              <AddressAutocompleteInput
                id={`${prefix}-address`}
                label="Address"
                placeholder="Search for a building, street or area"
                value={p.place}
                onChange={setPartyPlace(who)}
                countryRestriction={form.destination === 'domestic' ? 'ae' : undefined}
                error={errors[`${prefix}-address`]}
              />
            </div>
            <Field id={`${prefix}-building`} label="Building or landmark" placeholder="e.g. Al Nahda Tower"
              value={p.building} onChange={set('building')} error={errors[`${prefix}-building`]} />
            <Field id={`${prefix}-apartment`} label="Apartment, office or floor" optional
              value={p.apartment} onChange={set('apartment')} />
            <Field id={`${prefix}-city`} label="City" readOnly placeholder="Filled in from the address" value={p.place.city} />
            <Field id={`${prefix}-country`} label="Country" readOnly placeholder="Filled in from the address" value={p.place.country} />
          </div>
        )}
      </>
    );
  };

  const packageStep = (
    <div className="flex flex-col gap-6">
      <Field id="d-content" label="What's inside?" placeholder="e.g. Contracts, clothing, electronics"
        value={form.details.content} onChange={setDetails('content')} error={errors['d-content']} />

      <div>
        <p className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">How should it travel?</p>
        <ChoiceGroup label="How should it travel?" options={VEHICLE_OPTIONS} value={form.details.vehicle} onSelect={setDetails('vehicle')} error={errors.vehicle} iconTile />
      </div>

      <p className="rounded-[14px] bg-[#F0F4F2] p-4 text-[12px] leading-relaxed text-[#064423]/70 sm:text-[13px]">
        Please check the list of{' '}
        <Link
          href={SEND_ROUTES.prohibitedItems}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#064423] underline decoration-[#36B936] decoration-2 underline-offset-4"
        >
          prohibited items
          <span className="sr-only"> (opens in a new tab)</span>
        </Link>
        . The price may change if the weight differs at final inspection.
      </p>

      {validateError && <ErrorBanner>{validateError}</ErrorBanner>}
    </div>
  );

  const serviceStep = (
    <div className="flex flex-col gap-6">
      <div role="radiogroup" aria-label="Delivery service" className="flex flex-col gap-3">
        {serviceOptions.map((option) => {
          const Icon = SERVICE_ICONS[option.serviceCode] ?? Package;
          const selected = selectedServiceCode === option.serviceCode;
          const eta = option.deliveryBeforeTime ?? option.pickupBeforeTime;
          return (
            <motion.button
              key={option.serviceCode}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => selectService(option)}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={CARD_TAP}
              transition={SPRING}
              className={`flex items-center gap-4 rounded-[14px] border p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#36B936] sm:p-5 ${
                selected ? 'border-[#36B936] bg-[#36B936]/[0.04]' : `bg-white hover:border-[#064423]/25 ${errors.service ? 'border-red-400' : 'border-[#E5EBE7]'}`
              }`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-[#36B936] text-white' : 'bg-[#F0F4F2] text-[#064423]'}`}>
                <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-[#064423]">{option.name}</span>
                {eta && <span className="block text-[12px] text-[#064423]/60 sm:text-[13px]">{eta}</span>}
                {option.description && <span className="mt-0.5 block text-[12px] text-[#064423]/45">{option.description}</span>}
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-[15px] font-medium text-[#064423]">AED {option.grossAmount.toFixed(2)}</span>
                <span className="block text-[11px] text-[#064423]/45">incl. VAT</span>
              </span>
            </motion.button>
          );
        })}
      </div>
      {errors.service && <p className="mx-1 -mt-3 text-[12px] text-red-600">{errors.service}</p>}

      {selectedService && workingDays.length > 0 && (
        <div className="flex flex-col gap-5 rounded-[14px] border border-[#E5EBE7] bg-[#F0F4F2]/60 p-4 sm:p-5">
          <div>
            <p id="date-label" className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[#064423]">
              <CalendarDays className="h-4 w-4 text-[#36B936]" aria-hidden="true" /> Pickup date
            </p>
            <div role="radiogroup" aria-labelledby="date-label" className="flex gap-2.5 overflow-x-auto pb-1">
              {workingDays.map((day) => {
                const { weekday, day: dayNum, month } = weekdayAndDay(day.workingDate);
                const active = selectedDate === day.workingDate;
                return (
                  <motion.button
                    key={day.workingDate}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setSelectedDate(day.workingDate ?? null);
                      setSelectedSlot(null);
                    }}
                    whileHover={CHIP_HOVER}
                    whileTap={CHIP_TAP}
                    transition={SPRING}
                    className={`flex w-16 shrink-0 flex-col items-center gap-0.5 rounded-[14px] border py-3 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#36B936] ${
                      active ? 'border-[#36B936] bg-[#36B936] text-white' : 'border-[#E5EBE7] bg-white text-[#064423]'
                    }`}
                  >
                    <span className={`text-[10px] font-medium uppercase tracking-wide ${active ? 'text-white/80' : 'text-[#064423]/45'}`}>{weekday}</span>
                    <span className="text-[18px] font-medium">{dayNum}</span>
                    <span className={`text-[10px] font-medium ${active ? 'text-white/80' : 'text-[#064423]/45'}`}>{month}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <motion.div key={selectedDate} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={SOFT_SPRING}>
              <p id="slot-label" className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[#064423]">
                <Clock className="h-4 w-4 text-[#36B936]" aria-hidden="true" /> Time slot
              </p>
              {slotsForDate.length === 0 ? (
                <p className="text-[13px] text-[#064423]/55">No slots left on this date — please pick another day.</p>
              ) : (
                <div role="radiogroup" aria-labelledby="slot-label" className="flex flex-wrap gap-2">
                  {slotsForDate.map((slot, idx) => {
                    const active = selectedSlot?.pickupTime === slot.pickupTime && selectedSlot?.deliveryTime === slot.deliveryTime;
                    return (
                      <motion.button
                        key={`${slot.pickupTime}-${slot.deliveryTime}-${idx}`}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          setSelectedSlot({ pickupTime: slot.pickupTime, deliveryTime: slot.deliveryTime });
                          // Last answer on the service step — straight on to review.
                          autoAdvance();
                        }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={CHIP_HOVER}
                        whileTap={CHIP_TAP}
                        transition={{ ...SOFT_SPRING, delay: Math.min(idx, 8) * 0.03 }}
                        className={`rounded-full border px-4 py-2 text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#36B936] ${
                          active ? 'border-[#36B936] bg-[#36B936]/10 font-medium text-[#064423]' : 'border-[#E5EBE7] bg-white text-[#064423]/70 hover:border-[#064423]/25'
                        }`}
                      >
                        {slot.pickupTime}
                        {slot.deliveryTime ? ` → ${slot.deliveryTime}` : ''}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
          {errors.slot && <p className="mx-1 text-[12px] text-red-600">{errors.slot}</p>}
        </div>
      )}
    </div>
  );

  /* ------------------------------ Review step ----------------------------- */

  const reviewBlock = (title: string, edit: StepId, children: ReactNode) => (
    <ReviewBlock title={title} onEdit={() => goTo(stepNumber(edit))} editDisabled={submitPhase !== 'idle'}>
      {children}
    </ReviewBlock>
  );

  const partyReview = (p: PartyForm) => (
    <>
      <p className="text-[14px] font-medium text-[#064423]">{p.fullName}</p>
      <p className="text-[13px] text-[#064423]/65">{p.phone}</p>
      <p className="text-[13px] text-[#064423]/65">{p.place.formattedAddress}</p>
      {p.building && (
        <p className="text-[12px] text-[#064423]/45">
          {p.building}
          {p.apartment ? `, ${p.apartment}` : ''}
        </p>
      )}
    </>
  );

  const secondaryButton =
    'inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#E5EBE7] px-6 text-[14px] text-[#064423] transition-colors hover:border-[#36B936]';

  const reviewStep =
    submitPhase === 'success' && confirmed ? (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#36B936]/10">
          <Check className="h-7 w-7 text-[#36B936]" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h2 className="text-xl font-medium tracking-tight text-[#064423] sm:text-2xl">{REVIEW_CONTENT.bookedTitle}</h2>
        <p className="mt-2 max-w-[440px] text-[14px] text-[#064423]/65">
          Payment received. Your tracking number (AWB) is{' '}
          <span className="font-medium text-[#064423]">{confirmed.awb}</span>.
        </p>

        <div className="mt-6 w-full rounded-[14px] border border-[#E5EBE7] bg-[#F0F4F2]/60 p-5 text-left">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#E5EBE7] pb-3 text-[14px] text-[#064423]">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="h-4 w-4 shrink-0 text-[#36B936]" strokeWidth={2} aria-hidden="true" />
              {form.shipper.place.city || form.shipper.place.formattedAddress}
              <ArrowRight className="h-3.5 w-3.5 text-[#064423]/40" aria-hidden="true" />
              {form.receiver.place.city || form.receiver.place.formattedAddress}
            </span>
            {payment && (
              <span className="font-medium">
                {payment.amount.toFixed(2)} {payment.currency}
              </span>
            )}
          </div>
          <dl className="grid grid-cols-2 gap-y-2 text-[13px]">
            <dt className="text-[#064423]/50">Receiver</dt>
            <dd className="text-right font-medium text-[#064423]">{form.receiver.fullName}</dd>
            {selectedService && (
              <>
                <dt className="text-[#064423]/50">Service</dt>
                <dd className="text-right font-medium text-[#064423]">{selectedService.name}</dd>
              </>
            )}
            {payment && (
              <>
                <dt className="text-[#064423]/50">Reference number</dt>
                <dd className="text-right font-medium text-[#064423]">{payment.referenceNumber}</dd>
              </>
            )}
          </dl>
        </div>

        <div className="mt-6 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          {confirmed.shipmentId > 0 && (
            <button
              type="button"
              onClick={() => window.open(SEND_ROUTES.receipt(confirmed.shipmentId), '_blank', 'noopener')}
              className={secondaryButton}
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Download receipt
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push(`${SEND_ROUTES.shipmentsTab}&booked=${encodeURIComponent(confirmed.awb)}`)}
            className={primaryButton}
          >
            View my shipments
          </button>
        </div>
      </div>
    ) : submitPhase === 'payment-failed' ? (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-7 w-7 text-red-600" strokeWidth={2} aria-hidden="true" />
        </span>
        <h2 className="text-xl font-medium tracking-tight text-[#064423] sm:text-2xl">Payment failed</h2>
        <p className="mt-2 max-w-[440px] text-[14px] text-[#064423]/65">{paymentFailureMessage}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={retryPayment} className={primaryButton}>
            Try again
          </button>
          <Link href={SEND_ROUTES.support} className={secondaryButton}>
            Contact support
          </Link>
        </div>
      </div>
    ) : submitPhase === 'confirm-failed' && payment ? (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <ShieldAlert className="h-7 w-7 text-amber-600" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-medium tracking-tight text-[#064423] sm:text-2xl">{REVIEW_CONTENT.confirmFailedTitle}</h2>
        <p className="mt-2 max-w-[440px] text-[14px] text-[#064423]/65">{REVIEW_CONTENT.confirmFailedBody}</p>
        <p className="mt-4 text-[13px] text-[#064423]/55">
          Reference: <span className="font-medium text-[#064423]">{payment.referenceNumber}</span>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={SEND_ROUTES.support} className={primaryButton}>
            Contact support
          </Link>
          <Link
            href={SEND_ROUTES.shipmentsTab}
            className="inline-flex h-12 items-center rounded-full border border-[#E5EBE7] px-6 text-[14px] text-[#064423] transition-colors hover:border-[#36B936]"
          >
            My shipments
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl font-medium tracking-tight text-[#064423] sm:text-2xl">{REVIEW_CONTENT.title}</h2>
          <p className="mt-1 text-[13px] text-[#064423]/60 sm:text-[14px]">{REVIEW_CONTENT.subtitle}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reviewBlock('From', 'sender', partyReview(form.shipper))}
            {reviewBlock('To', 'receiver', partyReview(form.receiver))}
          </div>
          {reviewBlock(
            'Package',
            'package',
            <>
            <p className="text-[14px] font-medium text-[#064423]">{form.details.content}</p>
            <p className="text-[13px] capitalize text-[#064423]/65">
              Parcel · {vehicleLabel(form.details)}
            </p>
            </>,
          )}
          {reviewBlock(
            'Service',
            'service',
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-[#064423]">{selectedService?.name ?? '—'}</p>
                {selectedDate && (
                  <p className="text-[13px] text-[#064423]/65">
                    {selectedDate}
                    {selectedSlot ? ` · ${selectedSlot.pickupTime}${selectedSlot.deliveryTime ? ` → ${selectedSlot.deliveryTime}` : ''}` : ''}
                  </p>
                )}
              </div>
              {selectedService && (
                <p className="shrink-0 text-[20px] font-medium text-[#064423]">AED {selectedService.grossAmount.toFixed(2)}</p>
              )}
            </div>,
          )}
        </div>

        {createError && <ErrorBanner>{createError}</ErrorBanner>}
      </div>
    );

  /* -------------------------------- Render -------------------------------- */

  if (showInternational) {
    return (
      <InternationalShipmentWizard
        onBack={() => {
          setShowInternational(false);
          goTo(stepNumber('route'));
        }}
      />
    );
  }

  const busy = submitPhase === 'creating' || submitPhase === 'awaiting-payment';
  const onReview = step === REVIEW;
  // Once booked (or after a definitive outcome screen) the wizard is locked: no step jumps,
  // no Back/Pay footer.
  const showingOutcome = onReview && ['success', 'payment-failed', 'confirm-failed'].includes(submitPhase);
  const locked = busy || submitPhase === 'success';

  return (
    <div className="mx-auto w-full max-w-[1040px]">
      <div className="mx-auto max-w-[640px] lg:ml-0">
        <Stepper current={step} onJump={(n) => !locked && goTo(n)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-8">
        <div className={`${card} min-w-0 p-4 sm:p-6 md:p-8`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.form
              ref={formRef}
              key={step}
              onSubmit={onReview ? (e) => e.preventDefault() : handleSubmit}
              noValidate
              variants={PAGE_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={SOFT_SPRING}
            >
              {currentStep && (
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl font-medium tracking-tight text-[#064423] sm:text-2xl">{currentStep.title}</h2>
                  <p className="mt-1 text-[13px] text-[#064423]/60 sm:text-[14px]">{currentStep.subtitle}</p>
                </div>
              )}

              {currentStep?.id === 'route' && (
                <ChoiceGroup
                  label="Destination"
                  options={DESTINATION_OPTIONS}
                  value={form.destination}
                  onSelect={(v) => {
                    chooseDestination(v);
                    autoAdvance();
                  }}
                  error={errors.destination}
                  iconTile
                />
              )}
              {currentStep?.id === 'sender' && partyFields('shipper')}
              {currentStep?.id === 'receiver' && partyFields('receiver')}
              {currentStep?.id === 'package' && packageStep}
              {currentStep?.id === 'service' && serviceStep}
              {onReview && reviewStep}

              {!showingOutcome && (
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#E5EBE7] pt-6 sm:mt-10">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => goTo(step - 1)}
                      disabled={busy}
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-[14px] text-[#064423]/70 outline-none transition-colors hover:text-[#064423] focus-visible:ring-2 focus-visible:ring-[#36B936] disabled:opacity-40"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Back
                    </button>
                  ) : (
                    <Link
                      href={SEND_ROUTES.account}
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-[14px] text-[#064423]/70 outline-none transition-colors hover:text-[#064423] focus-visible:ring-2 focus-visible:ring-[#36B936]"
                    >
                      Cancel
                    </Link>
                  )}

                  {onReview ? (
                    <button type="button" onClick={handleCreateShipment} disabled={busy || !selectedService} className={primaryButton}>
                      {busy ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {REVIEW_CONTENT.preparing}
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" aria-hidden="true" /> {REVIEW_CONTENT.pay}
                        </>
                      )}
                    </button>
                  ) : (
                    <button type="submit" disabled={validating} className={primaryButton}>
                      {validating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Checking services…
                        </>
                      ) : (
                        <>
                          {currentStep ? NEXT_LABELS[currentStep.id] : 'Continue'}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </motion.form>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4">
          <Summary form={form} service={step >= stepNumber('service') ? selectedService : undefined} />
          <p className="px-2 text-center text-[12px] text-[#064423]/55 lg:text-left">
            {PAGE_CONTENT.helpText}{' '}
            <Link href={SEND_ROUTES.help} className="font-medium text-[#064423] underline decoration-[#36B936] underline-offset-4">
              {PAGE_CONTENT.helpCta}
            </Link>
          </p>
        </div>
      </div>

      {/* The hosted payment page opens in a new tab — PaymentModal polls our server for the result. */}
      {submitPhase === 'awaiting-payment' && payment && (
        <PaymentModal paymentUrl={payment.paymentUrl} referenceNumber={payment.referenceNumber} onOutcome={handlePaymentOutcome} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function SendShipment() {
  const { ready, isAuthenticated, isPendingRegistration, phone } = useAuthContext();

  let body: ReactNode;
  if (!ready) {
    body = (
      <div className="flex justify-center py-16" aria-busy="true">
        <Loader2 className="h-6 w-6 animate-spin text-[#36B936]" aria-label="Loading" />
      </div>
    );
  } else if (isAuthenticated) {
    body = <BookingWizard />;
  } else if (isPendingRegistration) {
    body = <PendingRegistrationNotice phone={phone} />;
  } else {
    body = <StartScreen />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <section className="min-h-screen w-full bg-white px-4 pb-20 pt-32 font-sans antialiased sm:px-6 md:pb-24 md:pt-40 lg:px-8">
        <div className="mx-auto mb-8 max-w-[560px] px-2 text-center sm:mb-10">
          <h1 className="mb-3 text-2xl font-medium tracking-tight text-[#064423] sm:mb-4 sm:text-3xl md:text-4xl">{PAGE_CONTENT.title}</h1>
          {!isAuthenticated && <p className="text-xs leading-relaxed text-[#064423]/60 sm:text-sm">{PAGE_CONTENT.subtitle}</p>}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          {body}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
