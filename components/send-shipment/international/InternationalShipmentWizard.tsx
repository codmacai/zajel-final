'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2, Lock, Pencil, ShieldAlert } from 'lucide-react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useAccountAddresses } from '@/hooks/useAccountAddresses';
import { useCountries, useCities, useDocumentWeights } from '@/hooks/useInternationalReferenceData';
import { useRateCard, useCreateInternationalShipment, useGenerateInternationalPaymentLink } from '@/hooks/useInternationalShipment';
import { expandDocumentWeightOptions, parseRateQuote, pickNumber } from '@/lib/shipment/rateCard';
import AddressAutocompleteInput from '@/components/shipment/AddressAutocompleteInput';
import SavedAddressPicker, { type PartyMode } from '../SavedAddressPicker';
import { CARD_HOVER, CARD_TAP, PAGE_VARIANTS, SOFT_SPRING, SPRING, useAutoAdvance } from '../motion';
import type { SavedAddress } from '@/types/account';
import { lookupKey, type GeoAddress, type InternationalLookupItem, type RateCardResult } from '@/types/shipment';
import InternationalPaymentModal, { type InternationalPaymentOutcome } from './InternationalPaymentModal';
import {
  BOOKING_SOURCE,
  BOX_OPTIONS,
  BOX_SPECS,
  CASH_CUSTOMER_CODE,
  CUSTOMER_MASK,
  DECLARED_CURRENCY,
  DIRECTION_OPTIONS,
  EMPTY_INTERNATIONAL_PARTY,
  INCO_TERMS,
  INITIAL_INTERNATIONAL_FORM,
  INTERNATIONAL_REVIEW_CONTENT,
  PRODUCT_TYPE_OPTIONS,
  SERVICE_TYPES,
  STEPS,
  UAE_COUNTRY_CODE,
  UAE_COUNTRY_NAME,
  type InternationalPackageForm,
  type InternationalPartyForm,
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

/**
 * Same CreateShipment body the dashboard builds (prepareShipmentData), in the camelCase keys
 * MobileApp.API's International/CreateShipment binds (System.Text.Json) — it re-serialises to
 * the CRM's snake_case itself. City is sent the dashboard way: name AND code = city NAME in caps.
 */
function buildCreateShipmentPayload(
  form: InternationalShipmentForm,
  totalAmount: number,
  account: { name: string; phone: string; email: string },
) {
  const { details, pkg } = form;
  const direction = details.direction ?? 'OUTBOUND';
  const isDoc = pkg.productType === 'DOCUMENT';
  // The booker is the customer on the UAE side (sender when sending abroad, receiver when
  // receiving) — already entered on Origin/Destination, so it isn't asked again. Their account
  // fills any gap (email, or a phone that isn't a UAE mobile).
  const uaeParty = direction === 'OUTBOUND' ? form.sender : form.receiver;
  const partyMsisdn = toUaeMsisdn(uaeParty.phone);
  const customerPhone = /^971\d{9}$/.test(partyMsisdn) ? partyMsisdn : toUaeMsisdn(account.phone);
  const customerName = uaeParty.name.trim() || account.name;
  const customerEmail = account.email.trim();
  // Pieces aren't asked any more — every booking is one piece.
  const pieces = 1;
  const box = !isDoc && pkg.box ? BOX_SPECS[pkg.box] : null;
  // No HS code on the website: documents don't need one, and non-documents are handed to the
  // sales team, who complete the details with the customer.
  const hsCode = '';

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
    direction,
    customerReferenceNumber: '',
    customerCode: CASH_CUSTOMER_CODE,
    customerMask: CUSTOMER_MASK,
    serviceType: SERVICE_TYPES[direction],
    productType: pkg.productType,
    description: pkg.packageDescription.trim(),
    consignmentType: '',
    declaredCurrency: DECLARED_CURRENCY,
    numberOfPeices: pieces,
    incoTerms: INCO_TERMS,
    paymentReference: '',
    invoiceNumber: '',
    createdBy: customerEmail || customerPhone,
    origin: party(form.sender, direction === 'OUTBOUND'),
    destination: party(form.receiver, direction === 'INBOUND'),
    autoCreatePickup: false,
    piecesDetail: [
      {
        description: pkg.packageDescription.trim() || 'Product',
        declaredValue: isDoc ? 0 : num(pkg.declaredValue) || 0,
        // Non-documents: the chosen box's weight limit and standard size (not asked separately).
        weightInKg: box ? box.maxKg : num(pkg.weight) || 0,
        lengthInCm: box ? box.lengthCm : num(pkg.length) || 1,
        widthInCm: box ? box.widthCm : num(pkg.width) || 1,
        heightInCm: box ? box.heightCm : num(pkg.height) || 1,
        quantity: pieces,
        piecesItemDetails: [{ hsCode }],
      },
    ],
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
type SubmitPhase = 'idle' | 'creating' | 'awaiting-payment' | 'success' | 'requested' | 'failed';

export default function InternationalShipmentWizard({ onBack }: { onBack: () => void }) {
  const auth = useAuthContext();
  const { getCountries, loading: loadingCountries } = useCountries();
  const { getCities, loading: loadingCities } = useCities();
  const { getRateCard, loading: ratingLoading, error: rateError } = useRateCard();
  const { getDocumentWeights } = useDocumentWeights();
  const { createShipment, error: createError } = useCreateInternationalShipment();
  const { generatePaymentLink, error: paymentLinkError } = useGenerateInternationalPaymentLink();
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

  // Rate card inputs — fetched automatically (debounced) as soon as they're all known, i.e.
  // once the foreign country and the weight are filled in. A quote only counts if it was
  // fetched for exactly the current inputs, so editing the weight/country/type can never
  // leave a stale price on screen or in the booking.
  const rateFrom = direction === 'OUTBOUND' ? UAE_COUNTRY_CODE : form.sender.countryCode;
  const rateTo = direction === 'OUTBOUND' ? form.receiver.countryCode : UAE_COUNTRY_CODE;
  const rateWeight = num(form.pkg.weight);
  // GetDocumentWeights answers { weights: [0.5, 4] } — treated as the range of document weights
  // (the rate card has 0.5 kg brackets up to 4 kg), so the picker offers every 0.5 kg step in it.
  // A longer list is used as-is.
  const docWeightOptions = expandDocumentWeightOptions(documentWeights);

  // Only documents are priced online — non-documents go to the sales team for a quote.
  const rateDocType = 'DOC';
  const rateKey =
    direction && form.pkg.productType === 'DOCUMENT' && rateFrom && rateTo && rateWeight > 0
      ? `${rateFrom}|${rateTo}|${rateDocType}|${rateWeight}`
      : null;
  const rateCurrent = rateKey !== null && rateState.key === rateKey;
  const quote = rateCurrent ? parseRateQuote(rateState.rate) : null;
  // The call succeeded but returned no usable price (no rate_detail for this route/weight).
  const noRate = rateCurrent && rateState.rate !== null && quote === null;
  const rateFailed = rateCurrent && rateState.rate === null;
  const ratePending = rateKey !== null && !rateCurrent;

  useEffect(() => {
    if (!rateKey || rateState.key === rateKey) return undefined;
    const mine = ++rateSeq.current;
    const timer = window.setTimeout(async () => {
      const result = await getRateCard({ fromCountry: rateFrom, toCountry: rateTo, docType: rateDocType, weight: rateWeight });
      if (mine === rateSeq.current) setRateState({ key: rateKey, rate: result });
    }, 400);
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
      if (isDoc) {
        if (!(num(p.weight) > 0)) e['p-weight'] = 'Choose the weight of your documents.';
        else if (!quote) e.rate = ratePending ? 'Getting your rate — one moment.' : 'We need a rate for this shipment before you can continue.';
      } else if (p.productType) {
        if (!p.box) e['p-box'] = 'Choose a box size.';
        if (blank(p.declaredValue) || !(num(p.declaredValue) >= 0)) e['p-value'] = 'Enter the declared value.';
        if (blank(p.packageDescription)) e['p-description'] = 'Tell us what you are sending.';
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
  // without creating a duplicate shipment). Cleared if the booking details change.
  const [createdShipment, setCreatedShipment] = useState<{ id: number; signature: string } | null>(null);
  const bookingSignature = JSON.stringify(form);

  const handleCreateShipment = async () => {
    if (submitPhase === 'creating' || submitPhase === 'awaiting-payment') return;
    if (isDoc && !quote) return;
    setSubmitPhase('creating');
    setPaymentFailureMessage(null);

    let shipmentId = createdShipment && createdShipment.signature === bookingSignature ? createdShipment.id : null;
    if (shipmentId === null) {
      // Documents carry the rate-card total; non-documents go in with no amount for sales to price.
      const created = await createShipment(buildCreateShipmentPayload(form, isDoc && quote ? quote.total : 0, account));
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

    if (!isDoc) {
      // Non-document: no payment online — the sales team follows up with a price.
      setSubmitPhase('requested');
      return;
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

  const handlePaymentOutcome = (outcome: InternationalPaymentOutcome, message?: string) => {
    if (outcome === 'success') {
      setSubmitPhase('success');
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

  const busy = submitPhase === 'creating' || submitPhase === 'awaiting-payment';
  const onReview = step === REVIEW;
  const showingOutcome = onReview && (submitPhase === 'success' || submitPhase === 'requested' || submitPhase === 'failed');
  const locked = busy || submitPhase === 'success' || submitPhase === 'requested';

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

  // Shown live on the Package step (updates as the weight changes), on Amount, and on Review.
  const rateBox = (
    <div aria-live="polite">
      {!rateKey ? (
        <p className="rounded-[14px] border border-dashed border-[#E5EBE7] p-4 text-[13px] text-[#064423]/55">
          Choose the weight to see your price.
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
        </motion.div>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-[14px] border border-amber-200 bg-amber-50 p-5 text-[13px] text-amber-900">
          <p>
            {noRate
              ? 'We don’t have an online rate for this destination, weight and product type. Our team can quote it for you.'
              : rateFailed
                ? rateError ?? 'We couldn’t get a rate for this shipment.'
                : 'We couldn’t get a rate for this shipment.'}
          </p>
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
          <p className="rounded-[14px] border border-[#36B936]/25 bg-[#36B936]/[0.04] p-4 text-[13px] leading-relaxed text-[#064423]/75">
            Parcels and goods are priced by our sales team. Send us the details below — we&apos;ll create your shipment request and
            get back to you with a price. No payment is taken now.
          </p>
          <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
            <Field
              id="p-description"
              label="What's inside?"
              className="md:col-span-2"
              placeholder="e.g. Clothes, electronics, spare parts"
              value={form.pkg.packageDescription}
              onChange={setPkg('packageDescription')}
              error={errors['p-description']}
            />
            <Field
              id="p-value"
              label="Declared value (AED)"
              type="number"
              inputMode="decimal"
              className="md:col-span-2"
              value={form.pkg.declaredValue}
              onChange={setPkg('declaredValue')}
              error={errors['p-value']}
            />
          </div>
          <div>
            <p className="mx-1 mb-2 text-[12px] text-[#064423] sm:text-[13px]">Box size</p>
            <ChoiceGroup options={BOX_OPTIONS} value={form.pkg.box} onSelect={setPkg('box')} error={errors['p-box']} columns={3} />
          </div>
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
                  {form.pkg.box ? `${BOX_SPECS[form.pkg.box].label} (up to ${BOX_SPECS[form.pkg.box].maxKg} kg)` : '—'}
                </p>
                <p className="text-[12px] text-[#064423]/60">
                  {[form.pkg.packageDescription, form.pkg.declaredValue && `Declared AED ${num(form.pkg.declaredValue).toFixed(2)}`].filter(Boolean).join(' · ')}
                </p>
              </>
            )}
          </ReviewBlock>
          {isDoc ? (
            <div className="flex items-center justify-between rounded-[14px] border border-[#36B936]/30 bg-[#36B936]/[0.04] p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-wider text-[#064423]/45">Total to pay</p>
              <p className="text-[20px] font-medium text-[#064423]">{quote ? `${quote.currency} ${quote.total.toFixed(2)}` : '—'}</p>
            </div>
          ) : (
            <p className="rounded-[14px] border border-[#E5EBE7] bg-white p-4 text-[13px] text-[#064423]/70">
              No payment now — our sales team will contact you with a price for this shipment.
            </p>
          )}
          {createError && <ErrorBanner>{createError}</ErrorBanner>}
        </>
      )}
    </div>
  );

  /* -------------------------------- Render -------------------------------- */

  return (
    <div className="mx-auto w-full max-w-[1040px]">
      <div className="mx-auto max-w-[640px] lg:ml-0">
        <Stepper current={step} onJump={(n) => !locked && goTo(n)} reviewLabel={isDoc ? 'Review & pay' : 'Review & submit'} />
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
                  {currentStep ? currentStep.title : isDoc ? INTERNATIONAL_REVIEW_CONTENT.title : 'Review & submit'}
                </h2>
                <p className="mt-1 text-[13px] text-[#064423]/60 sm:text-[14px]">
                  {currentStep
                    ? currentStep.subtitle
                    : isDoc
                      ? INTERNATIONAL_REVIEW_CONTENT.subtitle
                      : 'Double-check everything before you send the request to our sales team.'}
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
                  <button type="button" onClick={handleCreateShipment} disabled={busy || (isDoc && !quote)} className={primaryButton}>
                    {busy ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />{' '}
                        {isDoc ? INTERNATIONAL_REVIEW_CONTENT.preparing : INTERNATIONAL_REVIEW_CONTENT.submitting}
                      </>
                    ) : isDoc ? (
                      <>
                        <Lock className="h-4 w-4" aria-hidden="true" /> {INTERNATIONAL_REVIEW_CONTENT.pay}
                      </>
                    ) : (
                      <>
                        {INTERNATIONAL_REVIEW_CONTENT.submit}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    // No price yet → can't move past Package/Amount (dashboard requires the amount too).
                    disabled={currentStep?.id === 'package' && isDoc && !quote}
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
                <button type="button" onClick={() => setSubmitPhase('idle')} className={primaryButton}>
                  Try again
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
