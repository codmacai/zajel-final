'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2, Lock, Pencil, Plus, ShieldAlert, Trash2 } from 'lucide-react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useAccountAddresses } from '@/hooks/useAccountAddresses';
import { useCountries, useCities, useDocumentWeights } from '@/hooks/useInternationalReferenceData';
import {
  useRateCard,
  useCreateInternationalShipment,
  useGenerateInternationalPaymentLink,
  useConfirmInternationalShipment,
} from '@/hooks/useInternationalShipment';
import {
  expandDocumentWeightOptions,
  parseIntlQuote,
  parseQuoteWeights,
  parseRateQuote,
  pickNumber,
  rateUnavailableMessage,
} from '@/lib/shipment/rateCard';
import AddressAutocompleteInput from '@/components/shipment/AddressAutocompleteInput';
import SavedAddressPicker, { type PartyMode } from '../SavedAddressPicker';
import { CARD_HOVER, CARD_TAP, PAGE_VARIANTS, SOFT_SPRING, SPRING, useAutoAdvance } from '../motion';
import type { SavedAddress } from '@/types/account';
import {
  lookupKey,
  QUOTE_ERROR_CODES,
  type GeoAddress,
  type IntlQuote,
  type InternationalLookupItem,
  type QuotePieceRequest,
  type QuoteWeights,
  type RateCardResult,
} from '@/types/shipment';
import InternationalPaymentModal, { type InternationalPaymentOutcome } from './InternationalPaymentModal';
import {
  BOOKING_SOURCE,
  CASH_CUSTOMER_CODE,
  CUSTOMER_MASK,
  DECLARED_CURRENCY,
  DIRECTION_OPTIONS,
  DOCUMENT_DIMENSION_CM,
  EMPTY_INTERNATIONAL_PARTY,
  EMPTY_INTERNATIONAL_PIECE,
  INCO_TERMS,
  INITIAL_INTERNATIONAL_FORM,
  INTERNATIONAL_REVIEW_CONTENT,
  MAX_NON_DOC_PIECES,
  PRODUCT_TYPE_OPTIONS,
  SERVICE_TYPES,
  STEPS,
  UAE_COUNTRY_CODE,
  UAE_COUNTRY_NAME,
  VOLUMETRIC_DIVISOR_HINT,
  type InternationalPackageForm,
  type InternationalPartyForm,
  type InternationalPieceForm,
  type InternationalShipmentForm,
  type InternationalStepId,
  type ShipmentDirection,
} from './data';
import type { ChoiceOption } from '../data';

function savedAddressToGeo(addr: SavedAddress): GeoAddress {
  return {
    formattedAddress: addr.address ?? '',
    city: addr.city ?? '',
    country: UAE_COUNTRY_NAME,
    area: addr.defaultArea ?? '',
    latitude: Number(addr.latitude) || 0,
    longitude: Number(addr.longitude) || 0,
  };
}

// GetCities(AE) codes are what CreateShipment/GetRateCard need, but the UAE side's city comes
// from Google Places / a saved address as a plain name ("Dubai", "Abu Dhabi", "Al Ain"…).
// Match by normalised name; when nothing matches, a City dropdown is shown so the customer
// can pick it.
const normaliseCity = (v: string) => v.toLowerCase().replace(/[^a-z]/g, '').replace(/^(al|el)/, '');

function matchUaeCity(cities: InternationalLookupItem[], ...candidates: (string | undefined)[]): InternationalLookupItem | null {
  for (const candidate of candidates) {
    const key = normaliseCity(candidate ?? '');
    if (!key) continue;
    const hit =
      cities.find((c) => normaliseCity(c.name) === key || normaliseCity(c.code) === key) ??
      cities.find((c) => {
        const name = normaliseCity(c.name);
        return name.length > 2 && (key.includes(name) || name.includes(key));
      });
    if (hit) return hit;
  }
  return null;
}



const primaryButton =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#36B936] px-7 text-[14px] font-medium text-white ' +
  'outline-none transition-all duration-300 hover:bg-[#2EA32E] active:scale-[0.99] ' +
  'focus-visible:ring-2 focus-visible:ring-[#064423] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70';

const card = 'rounded-[1.25rem] border border-[#E5EBE7] bg-white shadow-[0_8px_30px_rgba(6,68,35,0.04)] sm:rounded-[1.75rem]';

const inputBase =
  'h-12 w-full rounded-[12px] border bg-white px-4 text-[14px] text-[#064423] outline-none transition-all ' +
  'placeholder:text-gray-400 focus:border-[#36B936] focus:ring-1 focus:ring-[#36B936] sm:rounded-[14px] disabled:bg-[#F0F4F2] disabled:text-[#064423]/60';

const REVIEW = STEPS.length + 1;
const stepNumber = (id: InternationalStepId) => STEPS.findIndex((s) => s.id === id) + 1;

type Errors = Record<string, string>;
const blank = (v: string) => v.trim().length === 0;
const num = (v: string) => Number(v);

function digitsOnly(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

/** Dashboard validates customerPhone as 971XXXXXXXXX — accept 05X…, 5X…, +971… and normalise. */
function toUaeMsisdn(phone: string): string {
  const d = digitsOnly(phone);
  if (/^971\d{9}$/.test(d)) return d;
  if (/^0\d{9}$/.test(d)) return `971${d.slice(1)}`;
  if (/^\d{9}$/.test(d)) return `971${d}`;
  if (/^00971\d{9}$/.test(d)) return d.slice(2);
  return d;
}

const pieceValid = (p: InternationalPieceForm) =>
  num(p.weight) > 0 &&
  num(p.length) > 0 &&
  num(p.width) > 0 &&
  num(p.height) > 0 &&
  Number.isInteger(num(p.quantity)) &&
  num(p.quantity) >= 1 &&
  !blank(p.description) &&
  !blank(p.declaredValue) &&
  num(p.declaredValue) >= 0;

/** Live hint only — CRM's quote is what prices the shipment. */
const volumetricHint = (p: InternationalPieceForm) =>
  num(p.length) > 0 && num(p.width) > 0 && num(p.height) > 0
    ? Math.round(((num(p.length) * num(p.width) * num(p.height)) / VOLUMETRIC_DIVISOR_HINT) * 1000) / 1000
    : null;

/**
 * GetRateCard V2 pieces — the same QuotePieceRequest the mobile app sends. Item details (description,
 * declared value) go on the quote too, so CreateShipment only needs the quoteId. Documents are one
 * piece priced on the picked weight; non-documents on chargeable weight per piece.
 */
function buildQuotePieces(pkg: InternationalPackageForm): QuotePieceRequest[] | null {
  if (pkg.productType === 'DOCUMENT') {
    if (!(num(pkg.weight) > 0)) return null;
    return [
      {
        description: 'Documents',
        declaredValue: 0,
        hsCode: '',
        weightInKg: num(pkg.weight),
        lengthInCm: DOCUMENT_DIMENSION_CM,
        widthInCm: DOCUMENT_DIMENSION_CM,
        heightInCm: DOCUMENT_DIMENSION_CM,
        quantity: 1,
      },
    ];
  }
  if (pkg.productType !== 'NON-DOCUMENT' || pkg.pieces.length === 0 || !pkg.pieces.every(pieceValid)) return null;
  return pkg.pieces.map((p) => ({
    description: p.description.trim(),
    declaredValue: num(p.declaredValue),
    hsCode: '',
    weightInKg: num(p.weight),
    lengthInCm: num(p.length),
    widthInCm: num(p.width),
    heightInCm: num(p.height),
    quantity: num(p.quantity),
  }));
}

/**
 * Same CreateShipment body the dashboard builds (prepareShipmentData), in the camelCase keys
 * MobileApp.API's International/CreateShipment binds — it re-serialises to the CRM's snake_case
 * itself. City is sent the dashboard way: name AND code = city NAME in caps.
 *
 * Booked against the quote (quoteId → X-Version 2.0 upstream): CRM replaces the pieces, weights,
 * product type and amount with the quoted ones and refuses the booking if the quote is expired,
 * used, someone else's, or for another route/doc type. The quoted pieces and amount are still
 * sent below so the body reads the same as before.
 */
function buildCreateShipmentPayload(
  form: InternationalShipmentForm,
  intlQuote: IntlQuote,
  totalAmount: number,
  account: { name: string; phone: string; email: string },
) {
  const { details, pkg } = form;
  const direction = details.direction ?? 'OUTBOUND';
  // The booker is the customer on the UAE side (sender when sending abroad, receiver when
  // receiving) — already entered on Origin/Destination, so it isn't asked again. Their account
  // fills any gap (email, or a phone that isn't a UAE mobile).
  const uaeParty = direction === 'OUTBOUND' ? form.sender : form.receiver;
  const partyMsisdn = toUaeMsisdn(uaeParty.phone);
  const customerPhone = /^971\d{9}$/.test(partyMsisdn) ? partyMsisdn : toUaeMsisdn(account.phone);
  const customerName = uaeParty.name.trim() || account.name;
  const customerEmail = account.email.trim();
  // No HS code on the website — not required until customs clearance.
  const hsCode = '';
  const quotedPieces = intlQuote.pieces ?? [];
  const description =
    pkg.productType === 'DOCUMENT'
      ? 'Documents'
      : quotedPieces.map((p) => p.description).filter(Boolean).join(', ') || 'Product';

  const party = (p: InternationalPartyForm, isUae: boolean) => {
    const cityName = (p.cityName || p.place.city).toUpperCase();
    return {
      name: p.name.trim(),
      phone: digitsOnly(p.phone),
      company: p.company.trim(),
      addressLine1: (isUae ? p.place.formattedAddress : p.addressLine1).trim(),
      addressLine2: (isUae ? [p.building, p.apartment].filter((v) => v.trim()).join(', ') : p.addressLine2).trim(),
      area: (isUae ? p.place.area || p.building : p.area).trim(),
      postalCode: p.postalCode.trim(),
      country: { id: 1, name: p.countryName.toUpperCase(), code: p.countryCode },
      city: { id: 1, name: cityName, code: cityName },
    };
  };

  return {
    quoteId: intlQuote.quote_id,
    direction,
    customerReferenceNumber: '',
    customerCode: CASH_CUSTOMER_CODE,
    customerMask: CUSTOMER_MASK,
    serviceType: SERVICE_TYPES[direction],
    productType: pkg.productType,
    description,
    consignmentType: '',
    declaredCurrency: DECLARED_CURRENCY,
    numberOfPeices: quotedPieces.length,
    incoTerms: INCO_TERMS,
    paymentReference: '',
    invoiceNumber: '',
    createdBy: customerEmail || customerPhone,
    origin: party(form.sender, direction === 'OUTBOUND'),
    destination: party(form.receiver, direction === 'INBOUND'),
    autoCreatePickup: false,
    piecesDetail: quotedPieces.map((p) => ({
      description: p.description || description,
      declaredValue: p.declared_value ?? 0,
      weightInKg: p.weight_in_kg,
      lengthInCm: p.length_in_cm,
      widthInCm: p.width_in_cm,
      heightInCm: p.height_in_cm,
      quantity: p.quantity,
      piecesItemDetails: [{ hsCode }],
    })),
    hsCode,
    hsCodeDescription: '',
    amountDetails: { amount: totalAmount, totalAmount, additionalAmounts: [] },
    customerName,
    customerPhone,
    customerEmail,
    source: BOOKING_SOURCE,
  };
}

/** CreateShipment answers { status_code, status_message, data: { id, awb, … } }. */
function createdShipmentId(created: Record<string, unknown>): number | null {
  const data = created.data && typeof created.data === 'object' ? (created.data as Record<string, unknown>) : created;
  return pickNumber(data, ['id', 'Id', 'shipmentId', 'shipment_id']);
}

function pickString(record: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim() !== '') return value;
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Small form building blocks                                                */
/* -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  value,
  onChange,
  error,
  optional,
  ...input
}: {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  error?: string;
  optional?: boolean;
  type?: string;
  placeholder?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal';
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  const { className = '', ...rest } = input;
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <label htmlFor={id} className="mx-1 mb-2 flex items-center justify-between text-[12px] text-[#064423] sm:text-[13px]">
        <span>{label}</span>
        {optional && <span className="text-[11px] text-[#064423]/45 sm:text-[12px]">Optional</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        aria-invalid={!!error}
        className={`${inputBase} ${error ? 'border-red-400' : 'border-gray-200'}`}
        {...rest}
      />
      {error && <p className="mx-1 mt-1.5 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  options,
  error,
  disabled,
  placeholder,
  className = '',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: InternationalLookupItem[];
  error?: string;
  disabled?: boolean;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <label htmlFor={id} className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`${inputBase} appearance-none ${error ? 'border-red-400' : 'border-gray-200'}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.key ?? o.code} value={o.key ?? o.code}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <p className="mx-1 mt-1.5 text-[12px] text-red-600">{error}</p>}
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
  options,
  value,
  onSelect,
  error,
  columns = 2,
}: {
  options: ChoiceOption<T>[];
  value: T | null;
  onSelect: (value: T) => void;
  error?: string;
  /** 3 lays the cards out three across from sm up (stacked on phones). */
  columns?: 2 | 3;
}) {
  return (
    <div>
      <div role="radiogroup" className={`grid gap-3 ${columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
        {options.map(({ value: v, title, description, Icon, badge }) => {
          const selected = value === v;
          return (
            <motion.button
              key={v}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(v)}
              whileHover={CARD_HOVER}
              whileTap={CARD_TAP}
              transition={SPRING}
              className={`group relative flex min-h-[132px] flex-col items-start justify-between rounded-[14px] border p-4 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#36B936] sm:min-h-[148px] sm:p-5 ${
                selected ? 'border-[#36B936] bg-[#36B936]/[0.04]' : `bg-white hover:border-[#064423]/25 ${error ? 'border-red-400' : 'border-[#E5EBE7]'}`
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-[12px] transition-colors duration-200 sm:h-14 sm:w-14 ${
                  selected ? 'bg-[#36B936] text-white shadow-[0_6px_16px_-6px_rgba(54,185,54,0.55)]' : 'bg-[#F0F4F2] text-[#064423]/70 group-hover:text-[#064423]'
                }`}
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span
                aria-hidden="true"
                className={`absolute right-4 top-4 flex h-[18px] w-[18px] items-center justify-center rounded-full sm:right-5 sm:top-5 ${
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
              <span className="mt-5 block">
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

function Stepper({ current, onJump, reviewLabel }: { current: number; onJump: (step: number) => void; reviewLabel: string }) {
  const onReview = current > STEPS.length;
  return (
    <nav aria-label="International booking steps" className="mb-6 sm:mb-8">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[#36B936] sm:text-[12px]">
        {onReview ? reviewLabel : `Step ${current} of ${STEPS.length}`}
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
                className={`group block w-full rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-[#36B936] focus-visible:ring-offset-4 ${done ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-[#E5EBE7]">
                  <motion.span
                    initial={false}
                    animate={{ scaleX: done ? 1 : active ? 0.5 : 0 }}
                    transition={SOFT_SPRING}
                    style={{ transformOrigin: 'left' }}
                    className={`block h-full w-full rounded-full ${done ? 'bg-[#36B936] group-hover:bg-[#2EA32E]' : 'bg-[#064423]'}`}
                  />
                </span>
                <span
                  className={`mt-2.5 block truncate text-[11px] transition-colors sm:text-[13px] ${
                    active ? 'font-medium text-[#064423]' : done ? 'text-[#064423]/60 group-hover:text-[#36B936]' : 'text-[#064423]/35'
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

function ReviewBlock({ title, onEdit, disabled, children }: { title: string; onEdit: () => void; disabled: boolean; children: ReactNode }) {
  return (
    <div className="rounded-[14px] border border-[#E5EBE7] bg-[#F0F4F2]/60 p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          disabled={disabled}
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
/*  Main wizard                                                               */
/* -------------------------------------------------------------------------- */

// 'requested' = a non-document shipment was created for the sales team to price (no payment).
// 'confirming' = paid; CRM is verifying the payment and booking the shipment with Shipsy.
type SubmitPhase = 'idle' | 'creating' | 'awaiting-payment' | 'confirming' | 'success' | 'requested' | 'failed';

const isQuoteError = (code: string | null) => !!code && (QUOTE_ERROR_CODES as readonly string[]).includes(code);

export default function InternationalShipmentWizard({ onBack }: { onBack: () => void }) {
  const auth = useAuthContext();
  const { getCountries, loading: loadingCountries } = useCountries();
  const { getCities, loading: loadingCities } = useCities();
  const { getRateCard, loading: ratingLoading, error: rateError } = useRateCard();
  const { getDocumentWeights } = useDocumentWeights();
  const { createShipment, error: createError, errorCode: createErrorCode } = useCreateInternationalShipment();
  const { generatePaymentLink, error: paymentLinkError } = useGenerateInternationalPaymentLink();
  const { confirmShipment } = useConfirmInternationalShipment();
  const { addresses: savedAddresses, loading: savedLoading } = useAccountAddresses();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<InternationalShipmentForm>(INITIAL_INTERNATIONAL_FORM);
  const account = {
    name: [auth.firstName, auth.lastName].filter(Boolean).join(' '),
    phone: auth.phone ?? '',
    email: auth.email ?? '',
  };
  const [showErrors, setShowErrors] = useState(false);
  const [senderAddressMode, setSenderAddressMode] = useState<PartyMode>('pick');
  const [receiverAddressMode, setReceiverAddressMode] = useState<PartyMode>('pick');

  const [countries, setCountries] = useState<InternationalLookupItem[]>([]);
  const [uaeCities, setUaeCities] = useState<InternationalLookupItem[]>([]);
  const [foreignCities, setForeignCities] = useState<InternationalLookupItem[]>([]);
  const [documentWeights, setDocumentWeights] = useState<number[]>([]);
  const [bookedAwb, setBookedAwb] = useState<string | null>(null);
  // Last rate-card answer, tagged with the inputs it was for (see rateKey below).
  const [rateState, setRateState] = useState<{ key: string; rate: RateCardResult | null }>({ key: '', rate: null });
  const rateSeq = useRef(0);

  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>('idle');
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentFailureMessage, setPaymentFailureMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const direction = form.details.direction;
  const isDoc = form.pkg.productType === 'DOCUMENT';
  const senderIsForeign = direction === 'INBOUND';
  const receiverIsForeign = direction === 'OUTBOUND';
  const currentStep = step <= STEPS.length ? STEPS[step - 1] : null;

  const noSavedAddresses = !savedLoading && savedAddresses.length === 0;
  const effSenderAddressMode: PartyMode = noSavedAddresses ? 'new' : senderAddressMode;
  const effReceiverAddressMode: PartyMode = noSavedAddresses ? 'new' : receiverAddressMode;

  const foreignParty = senderIsForeign ? form.sender : receiverIsForeign ? form.receiver : null;
  const foreignCountry = countries.find((c) => c.code === foreignParty?.countryCode);
  // Dashboard: postal code required for non-GCC countries — the API flags those directly.
  const postalCodeRequired = !!foreignCountry && foreignCountry.postalCodeRequired !== false;

  // Quote inputs — fetched automatically (debounced) as soon as they're all known, i.e. once
  // the foreign country and every piece are filled in. A quote only counts if it was fetched
  // for exactly the current inputs, so editing a piece/country/type can never leave a stale
  // price (or quote id) on screen or in the booking.
  const rateFrom = direction === 'OUTBOUND' ? UAE_COUNTRY_CODE : form.sender.countryCode;
  const rateTo = direction === 'OUTBOUND' ? form.receiver.countryCode : UAE_COUNTRY_CODE;
  // GetDocumentWeights answers { weights: [0.5, 4] } — treated as the range of document weights
  // (the rate card has 0.5 kg brackets up to 4 kg), so the picker offers every 0.5 kg step in it.
  // A longer list is used as-is.
  const docWeightOptions = expandDocumentWeightOptions(documentWeights);

  // Same quote flow as the mobile app for both product types (GetRateCard with pieces →
  // X-Version 2.0): CRM prices on chargeable weight and returns the quote the booking,
  // payment link and Shipsy booking are all tied to.
  const rateDocType = isDoc ? 'DOC' : 'NON_DOC';
  const quotePieces = buildQuotePieces(form.pkg);
  const rateKey =
    direction && rateFrom && rateTo && quotePieces ? `${rateFrom}|${rateTo}|${rateDocType}|${JSON.stringify(quotePieces)}` : null;
  const rateCurrent = rateKey !== null && rateState.key === rateKey;
  const priced = rateCurrent ? parseRateQuote(rateState.rate) : null;
  const intlQuote = rateCurrent ? parseIntlQuote(rateState.rate) : null;
  // A price only counts with a quote id to book it against.
  const quote = priced && intlQuote ? priced : null;
  const quoteWeights: QuoteWeights | null = rateCurrent ? parseQuoteWeights(rateState.rate) : null;
  // The call succeeded but returned no usable price (no rate for this route / chargeable weight).
  const noRate = rateCurrent && rateState.rate !== null && quote === null;
  // Priced but no quote id = the API answered with V1 pricing (X-Version 2.0 didn't reach
  // MobileApp.API). Can't be booked, and it isn't "no rate" either.
  const pricedWithoutQuote = noRate && priced !== null && intlQuote === null;
  if (pricedWithoutQuote) console.warn('[international] GetRateCard returned a price without a quote — is the Prepaid API sending X-Version 2.0?');
  const noRateMessage = pricedWithoutQuote
    ? 'We couldn’t lock in a price for this shipment right now. Please try again shortly.'
    : noRate
      ? rateUnavailableMessage(rateState.rate)
      : null;
  const rateFailed = rateCurrent && rateState.rate === null;
  const ratePending = rateKey !== null && !rateCurrent;

  useEffect(() => {
    if (!rateKey || !quotePieces || rateState.key === rateKey) return undefined;
    const mine = ++rateSeq.current;
    const timer = window.setTimeout(async () => {
      const result = await getRateCard({ fromCountry: rateFrom, toCountry: rateTo, docType: rateDocType, pieces: quotePieces });
      if (mine === rateSeq.current) setRateState({ key: rateKey, rate: result });
    }, 500);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateKey, rateState.key]);

  const retryRate = () => setRateState({ key: '', rate: null });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    void (async () => {
      const [countryList, aeCities, weights] = await Promise.all([getCountries(), getCities(UAE_COUNTRY_CODE), getDocumentWeights()]);
      if (countryList) setCountries(countryList);
      if (aeCities) setUaeCities(aeCities);
      if (weights) setDocumentWeights(weights);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (uaeCities.length === 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- derived from data that just loaded
    setForm((f) => {
      const resolve = (p: InternationalPartyForm): InternationalPartyForm => {
        if (p.countryCode !== UAE_COUNTRY_CODE || p.cityCode || !p.place.formattedAddress) return p;
        const city = matchUaeCity(uaeCities, p.place.city, p.place.area, p.place.formattedAddress);
        return city ? { ...p, cityCode: city.code, cityName: city.name } : p;
      };
      return { ...f, sender: resolve(f.sender), receiver: resolve(f.receiver) };
    });
  }, [uaeCities]);

  const foreignCountryCode = foreignParty?.countryCode ?? '';

  useEffect(() => {
    if (!foreignCountryCode) return;
    void (async () => {
      const cities = await getCities(foreignCountryCode);
      setForeignCities(cities ?? []);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foreignCountryCode]);


  /* ------------------------------ Setters -------------------------------- */

  const setPkg = <K extends keyof InternationalPackageForm>(key: K) => (value: InternationalPackageForm[K]) => {
    setForm((f) => ({ ...f, pkg: { ...f.pkg, [key]: value } }));
  };

  const chooseDirection = (d: ShipmentDirection) => {
    if (d === form.details.direction) return;
    const uae = { ...EMPTY_INTERNATIONAL_PARTY, countryCode: UAE_COUNTRY_CODE, countryName: UAE_COUNTRY_NAME };
    setForm((f) => ({
      ...f,
      details: { ...f.details, direction: d },
      sender: d === 'INBOUND' ? EMPTY_INTERNATIONAL_PARTY : uae,
      receiver: d === 'OUTBOUND' ? EMPTY_INTERNATIONAL_PARTY : uae,
    }));
  };

  const chooseProductType = (t: InternationalPackageForm['productType']) => setPkg('productType')(t);

  const setPiece = (index: number, key: keyof InternationalPieceForm) => (value: string) =>
    setForm((f) => ({
      ...f,
      pkg: { ...f.pkg, pieces: f.pkg.pieces.map((p, i) => (i === index ? { ...p, [key]: value } : p)) },
    }));

  const addPiece = () =>
    setForm((f) =>
      f.pkg.pieces.length >= MAX_NON_DOC_PIECES ? f : { ...f, pkg: { ...f.pkg, pieces: [...f.pkg.pieces, EMPTY_INTERNATIONAL_PIECE] } },
    );

  const removePiece = (index: number) =>
    setForm((f) => (f.pkg.pieces.length <= 1 ? f : { ...f, pkg: { ...f.pkg, pieces: f.pkg.pieces.filter((_, i) => i !== index) } }));

  const setParty = (who: 'sender' | 'receiver') => (key: keyof InternationalPartyForm) => (value: string) =>
    setForm((f) => ({ ...f, [who]: { ...f[who], [key]: value, savedAddressId: key === 'postalCode' ? f[who].savedAddressId : null } }));

  const localFromPlace = (prev: InternationalPartyForm, place: GeoAddress): InternationalPartyForm => {
    const city = matchUaeCity(uaeCities, place.city, place.area, place.formattedAddress);
    return {
      ...prev,
      place,
      countryCode: UAE_COUNTRY_CODE,
      countryName: UAE_COUNTRY_NAME,
      cityCode: city?.code ?? '',
      cityName: city?.name ?? place.city,
      area: place.area,
      addressLine1: place.formattedAddress,
    };
  };

  const setPartyPlace = (who: 'sender' | 'receiver') => (place: GeoAddress) =>
    setForm((f) => ({ ...f, [who]: { ...localFromPlace(f[who], place), savedAddressId: null } }));

  const pickSaved = (who: 'sender' | 'receiver') => (addr: SavedAddress) =>
    setForm((f) => ({
      ...f,
      [who]: {
        ...localFromPlace(f[who], savedAddressToGeo(addr)),
        name: addr.name ?? '',
        phone: addr.phone ?? '',
        building: addr.building ?? '',
        apartment: addr.apartment ?? '',
        savedAddressId: addr.id,
      },
    }));

  const setPartyCountry = (who: 'sender' | 'receiver') => (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode);
    setForm((f) => ({
      ...f,
      [who]: { ...f[who], countryCode, countryName: country?.name ?? '', cityCode: '', cityName: '' },
    }));
    setForeignCities([]);
  };

  // The select's value is the option key (code + name) — see InternationalLookupItem.key.
  const setPartyCity = (who: 'sender' | 'receiver', cityOptions: InternationalLookupItem[]) => (key: string) => {
    const city = cityOptions.find((c) => (c.key ?? c.code) === key);
    setForm((f) => ({ ...f, [who]: { ...f[who], cityCode: city?.code ?? '', cityName: city?.name ?? '' } }));
  };

  /* ------------------------------ Validation ----------------------------- */

  const localPartyErrors = (prefix: 's' | 'r', p: InternationalPartyForm, mode: PartyMode, label: string): Errors => {
    const e: Errors = {};
    if (mode === 'pick') {
      if (!p.savedAddressId) e[`${prefix}-saved`] = `Choose a saved address or add a new ${label} address.`;
      else if (!p.cityCode) e[`${prefix}-city`] = 'Choose the city for this address.';
      return e;
    }
    if (blank(p.name)) e[`${prefix}-name`] = 'Enter a full name.';
    if (!/^\d{6,15}$/.test(digitsOnly(p.phone))) e[`${prefix}-phone`] = 'Enter a valid phone number.';
    if (!p.place.latitude) e[`${prefix}-address`] = `Pick the ${label} address from the suggestions.`;
    if (blank(p.building)) e[`${prefix}-building`] = 'Enter the building or landmark.';
    if (p.place.latitude && !p.cityCode) e[`${prefix}-city`] = 'Choose the city for this address.';
    return e;
  };

  const foreignPartyErrors = (prefix: 's' | 'r', p: InternationalPartyForm): Errors => {
    const e: Errors = {};
    if (blank(p.name)) e[`${prefix}-name`] = 'Enter a full name.';
    if (!/^\d{6,15}$/.test(digitsOnly(p.phone))) e[`${prefix}-phone`] = 'Enter a valid phone number (6–15 digits, with country code).';
    if (!p.countryCode) e[`${prefix}-country`] = 'Choose a country.';
    if (!p.cityCode) e[`${prefix}-city`] = 'Choose a city.';
    if (blank(p.addressLine1)) e[`${prefix}-address1`] = 'Enter an address.';
    if (postalCodeRequired && blank(p.postalCode)) e[`${prefix}-postal`] = 'Enter the postal code — required for this country.';
    return e;
  };

  const stepErrors = (id: InternationalStepId | undefined): Errors => {
    const e: Errors = {};
    const d = form.details;
    if (id === 'details') {
      if (!d.direction) e.direction = 'Choose a direction.';
    }
    if (id === 'origin') {
      Object.assign(e, senderIsForeign ? foreignPartyErrors('s', form.sender) : localPartyErrors('s', form.sender, effSenderAddressMode, 'pickup'));
    }
    if (id === 'destination') {
      Object.assign(e, receiverIsForeign ? foreignPartyErrors('r', form.receiver) : localPartyErrors('r', form.receiver, effReceiverAddressMode, 'delivery'));
    }
    if (id === 'package') {
      const p = form.pkg;
      if (!p.productType) e.productType = 'Choose document or non-document.';
      else if (isDoc) {
        if (!(num(p.weight) > 0)) e['p-weight'] = 'Choose the weight of your documents.';
        else if (!quote) e.rate = ratePending ? 'Getting your rate — one moment.' : 'We need a rate for this shipment before you can continue.';
      } else {
        p.pieces.forEach((piece, i) => {
          const k = (field: string) => `p${i}-${field}`;
          if (blank(piece.description)) e[k('description')] = 'Tell us what is in this piece.';
          if (blank(piece.declaredValue) || !(num(piece.declaredValue) >= 0)) e[k('value')] = 'Enter the declared value.';
          if (!(num(piece.weight) > 0)) e[k('weight')] = 'Enter the weight.';
          if (!(num(piece.length) > 0)) e[k('length')] = 'Enter the length.';
          if (!(num(piece.width) > 0)) e[k('width')] = 'Enter the width.';
          if (!(num(piece.height) > 0)) e[k('height')] = 'Enter the height.';
          if (!Number.isInteger(num(piece.quantity)) || !(num(piece.quantity) >= 1)) e[k('quantity')] = 'At least 1.';
        });
        // The quote needs every piece — don't pile a rate error onto incomplete pieces.
        if (Object.keys(e).length === 0 && !quote) {
          e.rate = ratePending ? 'Getting your rate — one moment.' : 'We need a rate for this shipment before you can continue.';
        }
      }
    }
    return e;
  };

  const errors = showErrors ? stepErrors(currentStep?.id) : {};

  /* ------------------------------ Navigation ----------------------------- */

  const goTo = (n: number) => {
    setShowErrors(false);
    setStep(Math.max(1, Math.min(n, REVIEW)));
  };

  const goNext = () => {
    const found = stepErrors(currentStep?.id);
    if (Object.keys(found).length > 0) {
      setShowErrors(true);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    goTo(step + 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    goNext();
  };

  // A saved UAE address completes the origin/destination step on its own — move on.
  const autoAdvance = useAutoAdvance(step, goNext);

  /* ------------------------------ Booking -------------------------------- */

  // Shipment already created in this session (kept so a cancelled/failed payment can be retried
  // without creating a duplicate shipment — a quote can only be booked once). Cleared if the
  // booking details or the quote change.
  const [createdShipment, setCreatedShipment] = useState<{ id: number; signature: string } | null>(null);
  const bookingSignature = JSON.stringify({ form, quoteId: intlQuote?.quote_id ?? null });
  // Shown when CRM refused the quote (expired / used / mismatch) and a fresh one is being fetched.
  const [quoteNotice, setQuoteNotice] = useState<string | null>(null);

  const handleCreateShipment = async () => {
    if (submitPhase === 'creating' || submitPhase === 'awaiting-payment' || submitPhase === 'confirming') return;
    // stepErrors already blocks reaching Review without a quote — same guard directly on submit.
    if (!quote || !intlQuote) return;
    setQuoteNotice(null);

    // Expiry isn't checked here: CRM's expires_at has no time zone, and CRM refuses an expired
    // quote anyway (QUOTE_EXPIRED), which re-quotes below.
    let shipmentId = createdShipment && createdShipment.signature === bookingSignature ? createdShipment.id : null;

    setSubmitPhase('creating');
    setPaymentFailureMessage(null);

    if (shipmentId === null) {
      const created = await createShipment(buildCreateShipmentPayload(form, intlQuote, quote.total, account));
      if (!created) {
        setSubmitPhase('idle');
        return;
      }
      shipmentId = createdShipmentId(created);
      const data = created.data && typeof created.data === 'object' ? (created.data as Record<string, unknown>) : created;
      setBookedAwb(pickString(data, ['awb', 'AWB', 'awbNumber']));
      if (shipmentId === null) {
        setSubmitPhase('failed');
        setPaymentFailureMessage('Your shipment was created, but we could not read its reference. Please contact support.');
        return;
      }
      setCreatedShipment({ id: shipmentId, signature: bookingSignature });
    }

    const link = await generatePaymentLink(shipmentId);
    const url = link ? pickString(link, ['paymentUrl', 'PaymentUrl', 'payment_url', 'url']) : null;
    if (!url) {
      setSubmitPhase('failed');
      setPaymentFailureMessage('Your shipment was created, but we could not get a payment link. Please try again or contact support.');
      return;
    }

    setPaymentUrl(url);
    setSubmitPhase('awaiting-payment');
  };

  // Paid → CRM verifies the payment with the gateway and books the (quoted) shipment with Shipsy.
  // Until this succeeds the shipment is paid but not booked, so a failure keeps a retry.
  const [paid, setPaid] = useState(false);
  const confirmPaidShipment = async () => {
    if (!createdShipment) return;
    setPaid(true);
    setSubmitPhase('confirming');
    setPaymentFailureMessage(null);
    const confirmed = await confirmShipment(createdShipment.id);
    if (!confirmed) {
      setPaymentFailureMessage(
        'Payment received, but we could not confirm your shipment yet. Please try again in a moment — you will not be charged twice.',
      );
      setSubmitPhase('failed');
      return;
    }
    const awb = pickString(confirmed, ['reference_number', 'referenceNumber', 'awb']);
    if (awb) setBookedAwb(awb);
    setSubmitPhase('success');
  };

  const handlePaymentOutcome = (outcome: InternationalPaymentOutcome, message?: string) => {
    if (outcome === 'success') {
      void confirmPaidShipment();
      return;
    }
    if (outcome === 'cancelled') {
      setPaymentUrl(null);
      setSubmitPhase('idle');
      return;
    }
    setPaymentFailureMessage(message ?? 'Your payment could not be completed.');
    setSubmitPhase('failed');
  };

  // A refused quote (expired / used / mismatch) needs a new one — fetch it right away.
  useEffect(() => {
    if (!isQuoteError(createErrorCode)) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- re-quote after CRM refused the quote
    setQuoteNotice(`${createError ?? 'Your price changed.'} We fetched a new price — please check it and pay again.`);
    retryRate();
  }, [createErrorCode, createError]);

  // Paid but the confirm call failed — retry the confirm, never the payment.
  const paidNotConfirmed = submitPhase === 'failed' && paid;

  const busy = submitPhase === 'creating' || submitPhase === 'awaiting-payment' || submitPhase === 'confirming';
  const onReview = step === REVIEW;
  const showingOutcome = onReview && (submitPhase === 'success' || submitPhase === 'requested' || submitPhase === 'failed');
  const locked = busy || paid || submitPhase === 'success' || submitPhase === 'requested';

  /* ------------------------------ Step bodies ---------------------------- */

  // Only the direction is asked here — picking it is the whole step, so it moves on by itself.
  const detailsStep = (
    <ChoiceGroup
      options={DIRECTION_OPTIONS}
      value={direction}
      onSelect={(d) => {
        chooseDirection(d);
        autoAdvance();
      }}
      error={errors.direction}
    />
  );

  const partyFields = (who: 'sender' | 'receiver') => {
    const prefix = who === 'sender' ? 's' : 'r';
    const p = form[who];
    const isForeign = who === 'sender' ? senderIsForeign : receiverIsForeign;
    const set = setParty(who);

    if (!isForeign) {
      const mode = who === 'sender' ? effSenderAddressMode : effReceiverAddressMode;
      const setMode = who === 'sender' ? setSenderAddressMode : setReceiverAddressMode;
      const citySelect = p.place.formattedAddress && !p.cityCode && (
        <Select
          id={`${prefix}-city`}
          label="City"
          className="md:col-span-2"
          value={p.cityCode ? lookupKey(p.cityCode, p.cityName) : ''}
          onChange={setPartyCity(who, uaeCities)}
          options={uaeCities}
          disabled={loadingCities}
          placeholder={loadingCities ? 'Loading cities…' : 'Choose the city'}
          error={errors[`${prefix}-city`]}
        />
      );

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
          {mode === 'pick' && citySelect && <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{citySelect}</div>}
          {mode === 'new' && !savedLoading && (
            <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
              <GroupTitle>Contact</GroupTitle>
              <Field id={`${prefix}-name`} label="Full name" className="md:col-span-2" value={p.name} onChange={set('name')} error={errors[`${prefix}-name`]} />
              <Field id={`${prefix}-phone`} label="Phone" type="tel" inputMode="tel" placeholder="971 5X XXX XXXX" value={p.phone} onChange={set('phone')} error={errors[`${prefix}-phone`]} />
              <Field id={`${prefix}-company`} label="Company" optional value={p.company} onChange={set('company')} />
              <GroupTitle>{who === 'sender' ? 'Pickup address' : 'Delivery address'}</GroupTitle>
              <div className="md:col-span-2">
                <AddressAutocompleteInput
                  id={`${prefix}-address`}
                  label="Address"
                  placeholder="Search for a building, street or area"
                  value={p.place}
                  onChange={setPartyPlace(who)}
                  countryRestriction="ae"
                  error={errors[`${prefix}-address`]}
                />
              </div>
              <Field id={`${prefix}-building`} label="Building or landmark" placeholder="e.g. Al Nahda Tower" value={p.building} onChange={set('building')} error={errors[`${prefix}-building`]} />
              <Field id={`${prefix}-apartment`} label="Apartment, office or floor" optional value={p.apartment} onChange={set('apartment')} />
              {citySelect || <Field id={`${prefix}-city-name`} label="City" readOnly placeholder="Filled in from the address" value={p.cityName} />}
              <Field id={`${prefix}-country`} label="Country" value={UAE_COUNTRY_NAME} readOnly disabled />
            </div>
          )}
        </>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
        <GroupTitle>Contact</GroupTitle>
        <Field id={`${prefix}-name`} label="Full name" className="md:col-span-2" value={p.name} onChange={set('name')} error={errors[`${prefix}-name`]} />
        <Field id={`${prefix}-phone`} label="Phone (with country code)" type="tel" inputMode="tel" placeholder="e.g. 923001234567" value={p.phone} onChange={set('phone')} error={errors[`${prefix}-phone`]} />
        <Field id={`${prefix}-company`} label="Company" optional value={p.company} onChange={set('company')} />

        <GroupTitle>Address</GroupTitle>
        <Select
          id={`${prefix}-country`}
          label="Country"
          value={p.countryCode}
          onChange={setPartyCountry(who)}
          options={countries.filter((c) => c.code !== UAE_COUNTRY_CODE)}
          disabled={loadingCountries}
          placeholder={loadingCountries ? 'Loading countries…' : 'Choose a country'}
          error={errors[`${prefix}-country`]}
        />
        <Select
          id={`${prefix}-city`}
          label="City"
          value={p.cityCode ? lookupKey(p.cityCode, p.cityName) : ''}
          onChange={setPartyCity(who, foreignCities)}
          options={foreignCities}
          disabled={loadingCities || !p.countryCode}
          placeholder={!p.countryCode ? 'Choose a country first' : loadingCities ? 'Loading cities…' : 'Choose a city'}
          error={errors[`${prefix}-city`]}
        />
        <Field id={`${prefix}-area`} label="Area" optional value={p.area} onChange={set('area')} />
        <Field
          id={`${prefix}-postal`}
          label="Postal code"
          optional={!postalCodeRequired}
          value={p.postalCode}
          onChange={set('postalCode')}
          error={errors[`${prefix}-postal`]}
        />
        <Field id={`${prefix}-address1`} label="Address line 1" className="md:col-span-2" value={p.addressLine1} onChange={set('addressLine1')} error={errors[`${prefix}-address1`]} />
        <Field id={`${prefix}-address2`} label="Address line 2" optional className="md:col-span-2" value={p.addressLine2} onChange={set('addressLine2')} />
      </div>
    );
  };

  const kg = (n: number | null | undefined) => `${(Number(n) || 0).toLocaleString(undefined, { maximumFractionDigits: 3 })} kg`;

  // How CRM worked out the chargeable weight — per piece the higher of actual and volumetric.
  const weightBreakdown = (w: QuoteWeights) => (
    <div className="mt-4 border-t border-[#064423]/10 pt-3 text-[12px] text-[#064423]/70">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Actual</p>
          <p className="font-medium text-[#064423]">{kg(w.total_actual_weight)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Volumetric</p>
          <p className="font-medium text-[#064423]">{kg(w.total_volumetric_weight)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Chargeable</p>
          <p className="font-medium text-[#064423]">{kg(w.chargeable_weight)}</p>
        </div>
      </div>
      {w.pieces?.length > 1 && (
        <ul className="mt-2 space-y-0.5">
          {w.pieces.map((p) => (
            <li key={p.piece_number}>
              Piece {p.piece_number}
              {p.quantity > 1 ? ` × ${p.quantity}` : ''}: charged on {p.charged_on === 'VOLUMETRIC' ? 'volumetric' : 'actual'} weight ({kg(p.chargeable_weight)} each)
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-[11px] text-[#064423]/45">
        Volumetric weight = L × W × H (cm) ÷ {w.volumetric_divisor || VOLUMETRIC_DIVISOR_HINT}. You pay on whichever is higher.
      </p>
    </div>
  );

  // Shown live on the Package step (updates as the pieces change) and on Review.
  const rateBox = (
    <div aria-live="polite">
      {!rateKey ? (
        <p className="rounded-[14px] border border-dashed border-[#E5EBE7] p-4 text-[13px] text-[#064423]/55">
          {isDoc ? 'Choose the weight to see your price.' : 'Fill in every piece to see your price.'}
        </p>
      ) : ratePending || ratingLoading ? (
        <div className="flex items-center gap-2 rounded-[14px] border border-[#E5EBE7] p-4 text-[14px] text-[#064423]/60">
          <Loader2 className="h-4 w-4 animate-spin text-[#36B936]" aria-hidden="true" /> Getting your rate…
        </div>
      ) : quote ? (
        <motion.div
          key={rateKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SOFT_SPRING}
          className="rounded-[14px] border border-[#36B936]/30 bg-[#36B936]/[0.04] p-5"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Total amount</p>
              <p className="text-[26px] font-medium tracking-tight text-[#064423]">
                {quote.currency} {quote.total.toFixed(2)}
              </p>
            </div>
            <p className="text-right text-[12px] text-[#064423]/60">
              {[quote.service === 'AIR' ? 'Air express' : quote.service, quote.weightLabel && `${quote.weightLabel} bracket`].filter(Boolean).join(' · ')}
            </p>
          </div>
          {quote.discount > 0 && (
            <p className="mt-1 text-[12px] text-[#36B936]">
              Includes a discount of {quote.currency} {quote.discount.toFixed(2)}
            </p>
          )}
          {!isDoc && quoteWeights && weightBreakdown(quoteWeights)}
        </motion.div>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-[14px] border border-amber-200 bg-amber-50 p-5 text-[13px] text-amber-900">
          <p>
            {noRate
              ? noRateMessage ?? 'We don’t have an online rate for this destination, weight and product type. Our team can quote it for you.'
              : rateFailed
                ? rateError ?? 'We couldn’t get a rate for this shipment.'
                : 'We couldn’t get a rate for this shipment.'}
          </p>
          {!isDoc && noRate && quoteWeights && <div className="w-full">{weightBreakdown(quoteWeights)}</div>}
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={retryRate} className="font-medium text-[#064423] underline">
              Try again
            </button>
            <a href="/support" className="font-medium text-[#064423] underline">
              Contact support
            </a>
          </div>
        </div>
      )}
      {errors.rate && !ratePending && <p className="mx-1 mt-2 text-[12px] text-red-600">{errors.rate}</p>}
    </div>
  );

  const packageStep = (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">What are you sending?</p>
        <ChoiceGroup options={PRODUCT_TYPE_OPTIONS} value={form.pkg.productType} onSelect={chooseProductType} error={errors.productType} />
      </div>

      {isDoc && (
        <motion.div key="doc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={SOFT_SPRING} className="flex flex-col gap-5">
          <div>
            <p id="doc-weight-label" className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">
              Weight of your documents
            </p>
            {docWeightOptions.length === 0 ? (
              <p className="flex items-center gap-2 text-[13px] text-[#064423]/55">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading weights…
              </p>
            ) : (
              <div role="radiogroup" aria-labelledby="doc-weight-label" className="flex flex-wrap gap-2">
                {docWeightOptions.map((w) => {
                  const active = num(form.pkg.weight) === w;
                  return (
                    <motion.button
                      key={w}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setPkg('weight')(String(w))}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={SPRING}
                      className={`min-w-[76px] rounded-full border px-4 py-2 text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#36B936] ${
                        active ? 'border-[#36B936] bg-[#36B936] font-medium text-white' : 'border-[#E5EBE7] bg-white text-[#064423] hover:border-[#064423]/25'
                      }`}
                    >
                      Up to {w} kg
                    </motion.button>
                  );
                })}
              </div>
            )}
            {errors['p-weight'] && <p className="mx-1 mt-2 text-[12px] text-red-600">{errors['p-weight']}</p>}
          </div>
          {rateBox}
        </motion.div>
      )}

      {form.pkg.productType === 'NON-DOCUMENT' && (
        <motion.div key="nondoc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={SOFT_SPRING} className="flex flex-col gap-5">
          {form.pkg.pieces.map((piece, i) => {
            const id = (field: string) => `p${i}-${field}`;
            const vol = volumetricHint(piece);
            return (
              <div key={i} className="rounded-[14px] border border-[#E5EBE7] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[13px] font-medium text-[#064423]">Piece {i + 1}</p>
                  {form.pkg.pieces.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePiece(i)}
                      className="inline-flex items-center gap-1 rounded-full px-1 text-[12px] text-red-600 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Remove <span className="sr-only">piece {i + 1}</span>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
                  <Field
                    id={id('description')}
                    label="What's inside?"
                    className="col-span-2 md:col-span-3"
                    placeholder="e.g. Clothes, electronics, spare parts"
                    value={piece.description}
                    onChange={setPiece(i, 'description')}
                    error={errors[id('description')]}
                  />
                  <Field
                    id={id('value')}
                    label="Declared value (AED)"
                    className="col-span-2 md:col-span-1"
                    type="number"
                    inputMode="decimal"
                    value={piece.declaredValue}
                    onChange={setPiece(i, 'declaredValue')}
                    error={errors[id('value')]}
                  />
                  <Field id={id('weight')} label="Weight (kg)" type="number" inputMode="decimal" value={piece.weight} onChange={setPiece(i, 'weight')} error={errors[id('weight')]} />
                  <Field id={id('quantity')} label="Quantity" type="number" inputMode="numeric" value={piece.quantity} onChange={setPiece(i, 'quantity')} error={errors[id('quantity')]} />
                  <div className="hidden md:block" aria-hidden="true" />
                  <div className="hidden md:block" aria-hidden="true" />
                  <Field id={id('length')} label="Length (cm)" type="number" inputMode="decimal" value={piece.length} onChange={setPiece(i, 'length')} error={errors[id('length')]} />
                  <Field id={id('width')} label="Width (cm)" type="number" inputMode="decimal" value={piece.width} onChange={setPiece(i, 'width')} error={errors[id('width')]} />
                  <Field id={id('height')} label="Height (cm)" type="number" inputMode="decimal" value={piece.height} onChange={setPiece(i, 'height')} error={errors[id('height')]} />
                </div>
                {vol !== null && (
                  <p className="mx-1 mt-3 text-[12px] text-[#064423]/55">
                    ≈ {kg(vol)} volumetric{num(piece.weight) > 0 ? ` · charged on ${vol > num(piece.weight) ? 'volumetric' : 'actual'} weight` : ''}
                    {num(piece.quantity) > 1 ? ', per item' : ''}
                  </p>
                )}
              </div>
            );
          })}
          {form.pkg.pieces.length < MAX_NON_DOC_PIECES && (
            <button
              type="button"
              onClick={addPiece}
              className="inline-flex items-center gap-1.5 self-start rounded-full px-1 text-[13px] font-medium text-[#36B936] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[#36B936]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" /> Add another piece
            </button>
          )}
          {rateBox}
        </motion.div>
      )}
    </div>
  );

  const partySummary = (p: InternationalPartyForm, isUae: boolean) => (
    <>
      <p className="text-[14px] font-medium text-[#064423]">{p.name || '—'}</p>
      <p className="text-[12px] text-[#064423]/60">{p.phone}</p>
      <p className="text-[12px] text-[#064423]/60">
        {[isUae ? p.place.formattedAddress : p.addressLine1, isUae ? p.building : p.addressLine2, p.cityName, p.postalCode, p.countryName].filter(Boolean).join(', ')}
      </p>
    </>
  );

  const reviewStep = (
    <div className="flex flex-col gap-3">
      {submitPhase === 'success' || submitPhase === 'requested' ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#36B936]/10"
          >
            <Check className="h-7 w-7 text-[#36B936]" strokeWidth={2.5} />
          </motion.div>
          <p className="text-xl font-medium tracking-tight text-[#064423]">
            {submitPhase === 'success' ? INTERNATIONAL_REVIEW_CONTENT.bookedTitle : INTERNATIONAL_REVIEW_CONTENT.requestedTitle}
          </p>
          <p className="max-w-[420px] text-[14px] text-[#064423]/65">
            {submitPhase === 'success'
              ? 'Payment received — your international shipment is booked.'
              : 'Your shipment request has been created. Our sales team will contact you with a price and the next steps.'}
          </p>
          {bookedAwb && (
            <p className="text-[13px] text-[#064423]/60">
              Reference: <span className="font-medium text-[#064423]">{bookedAwb}</span>
            </p>
          )}
          <a href="/account?tab=shipments" className={`${primaryButton} mt-4`}>
            View my shipments
          </a>
        </div>
      ) : submitPhase === 'failed' ? (
        <ErrorBanner>{paymentFailureMessage ?? createError ?? paymentLinkError ?? 'Something went wrong. Please try again.'}</ErrorBanner>
      ) : (
        <>
          <ReviewBlock title="Shipment" onEdit={() => goTo(stepNumber('details'))} disabled={locked}>
            <p className="text-[14px] font-medium text-[#064423]">
              {direction === 'INBOUND' ? 'Receiving from abroad' : 'Sending abroad'} · {isDoc ? 'Document' : 'Non-document'}
            </p>

          </ReviewBlock>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ReviewBlock title="Origin" onEdit={() => goTo(stepNumber('origin'))} disabled={locked}>
              {partySummary(form.sender, !senderIsForeign)}
            </ReviewBlock>
            <ReviewBlock title="Destination" onEdit={() => goTo(stepNumber('destination'))} disabled={locked}>
              {partySummary(form.receiver, !receiverIsForeign)}
            </ReviewBlock>
          </div>
          <ReviewBlock title="Package" onEdit={() => goTo(stepNumber('package'))} disabled={locked}>
            {isDoc ? (
              <p className="text-[14px] font-medium text-[#064423]">Documents · up to {form.pkg.weight} kg</p>
            ) : (
              <>
                <p className="text-[14px] font-medium text-[#064423]">
                  Non-document · {form.pkg.pieces.length} {form.pkg.pieces.length === 1 ? 'piece' : 'pieces'}
                  {quoteWeights ? ` · ${kg(quoteWeights.chargeable_weight)} chargeable` : ''}
                </p>
                <ul className="mt-1 space-y-0.5 text-[12px] text-[#064423]/60">
                  {form.pkg.pieces.map((p, i) => (
                    <li key={i}>
                      {[
                        p.description,
                        `${num(p.quantity) > 1 ? `${num(p.quantity)} × ` : ''}${kg(num(p.weight))}`,
                        `${num(p.length)} × ${num(p.width)} × ${num(p.height)} cm`,
                        `Declared AED ${num(p.declaredValue).toFixed(2)}`,
                      ].join(' · ')}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ReviewBlock>
          <div className="flex items-center justify-between rounded-[14px] border border-[#36B936]/30 bg-[#36B936]/[0.04] p-4 sm:p-5">
            <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Total to pay</p>
            <p className="flex items-center gap-2 text-[20px] font-medium text-[#064423]">
              {ratePending || ratingLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#36B936]" aria-label="Getting a new price" />
              ) : quote ? (
                `${quote.currency} ${quote.total.toFixed(2)}`
              ) : (
                '—'
              )}
            </p>
          </div>
          {submitPhase === 'confirming' && (
            <p className="flex items-center gap-2 text-[13px] text-[#064423]/70" aria-live="polite">
              <Loader2 className="h-4 w-4 animate-spin text-[#36B936]" aria-hidden="true" /> Payment received — confirming your shipment…
            </p>
          )}
          {quoteNotice ? <ErrorBanner>{quoteNotice}</ErrorBanner> : createError && <ErrorBanner>{createError}</ErrorBanner>}
          {noRate && !ratePending && <ErrorBanner>{noRateMessage ?? 'We could not price this shipment any more. Please edit the package or contact support.'}</ErrorBanner>}
        </>
      )}
    </div>
  );

  /* -------------------------------- Render -------------------------------- */

  return (
    <div className="mx-auto w-full max-w-[1040px]">
      <div className="mx-auto max-w-[640px] lg:ml-0">
        <Stepper current={step} onJump={(n) => !locked && goTo(n)} reviewLabel="Review & pay" />
      </div>

      <div className={`${card} mx-auto max-w-[640px] min-w-0 p-4 sm:p-6 md:p-8 lg:ml-0`}>
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
            {!showingOutcome || submitPhase === 'failed' ? (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl font-medium tracking-tight text-[#064423] sm:text-2xl">
                  {currentStep ? currentStep.title : INTERNATIONAL_REVIEW_CONTENT.title}
                </h2>
                <p className="mt-1 text-[13px] text-[#064423]/60 sm:text-[14px]">
                  {currentStep ? currentStep.subtitle : INTERNATIONAL_REVIEW_CONTENT.subtitle}
                </p>
              </div>
            ) : null}

            {currentStep?.id === 'details' && detailsStep}
            {currentStep?.id === 'origin' && partyFields('sender')}
            {currentStep?.id === 'destination' && partyFields('receiver')}
            {currentStep?.id === 'package' && packageStep}
            {onReview && reviewStep}

            {!showingOutcome && (
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#E5EBE7] pt-6 sm:mt-10">
                <button
                  type="button"
                  onClick={() => (step > 1 ? goTo(step - 1) : onBack())}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-[14px] text-[#064423]/70 outline-none transition-colors hover:text-[#064423] disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back
                </button>

                {onReview ? (
                  <button type="button" onClick={handleCreateShipment} disabled={busy || !quote} className={primaryButton}>
                    {busy ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {INTERNATIONAL_REVIEW_CONTENT.preparing}
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" aria-hidden="true" /> {INTERNATIONAL_REVIEW_CONTENT.pay}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    // No price yet → can't move past the Package step (both product types need
                    // an online quote now).
                    disabled={currentStep?.id === 'package' && !quote}
                    className={`${primaryButton} disabled:cursor-not-allowed`}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
            {showingOutcome && submitPhase === 'failed' && (
              <div className="mt-8 flex justify-end border-t border-[#E5EBE7] pt-6">
                <button
                  type="button"
                  onClick={() => (paidNotConfirmed ? void confirmPaidShipment() : setSubmitPhase('idle'))}
                  className={primaryButton}
                >
                  {paidNotConfirmed ? 'Confirm shipment again' : 'Try again'}
                </button>
              </div>
            )}
          </motion.form>
        </AnimatePresence>
      </div>

      {submitPhase === 'awaiting-payment' && paymentUrl && <InternationalPaymentModal paymentUrl={paymentUrl} onOutcome={handlePaymentOutcome} />}
    </div>
  );
}
