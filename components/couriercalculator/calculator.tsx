'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useValidateShipment } from '@/hooks/useValidateShipment';
import { useCountries, useDocumentWeights } from '@/hooks/useInternationalReferenceData';
import { useRateCard } from '@/hooks/useInternationalShipment';
import { expandDocumentWeightOptions, parseRateQuote, type RateQuote } from '@/lib/shipment/rateCard';
import AddressAutocompleteInput from '@/components/shipment/AddressAutocompleteInput';
import { EMPTY_GEO_ADDRESS, type GeoAddress, type InternationalLookupItem, type ServiceOption } from '@/types/shipment';
import { BIKE_MAX_KG, CAR_MAX_KG, OVERWEIGHT_MESSAGE, vehicleForWeight } from '@/components/send-shipment/data';

/* -------------------------------------------------------------------------- */
/*  Content — edit copy, locations and box presets here                       */
/* -------------------------------------------------------------------------- */

const CONTENT = {
  subtitle: 'Instant shipping quotes',
  title: 'Courier Rate Calculator',
  badges: ['No hidden fees', 'Secure', 'Instant quote'],
  stats: [
    { value: '195', label: 'Countries' },
    { value: '24/7', label: 'Support' },
    { value: '99.5%', label: 'On-time delivery' },
  ],
  formTitle: 'Calculate Your Shipping Rate',
  leftTitle: 'Origin & Destination',
  rightTitle: 'Shipment Details',
  tabs: { domestic: 'Domestic', international: 'International', document: 'Document', parcel: 'Parcel' },
  from: 'From',
  to: 'To',
  fromCountry: 'From country',
  toCountry: 'To country',
  dropdownDefault: 'Select',
  countryPlaceholder: 'Select a country',
  infoBanner: 'Charges are based on the higher of actual weight and volumetric weight.',
  docsOnlyBanner: 'International rates currently cover documents only — parcels are coming soon.',
  weight: 'Weight',
  docWeight: 'Document weight',
  weightPlaceholder: 'Select weight',
  unsureSize: 'Not sure about the size? Pick a preset box.',
  dims: { length: 'Length (cm)', width: 'Width (cm)', height: 'Height (cm)' },
  numberPlaceholder: '0',
  submit: 'Calculate Rate',
  addressPlaceholder: 'Search an address in the UAE',
  resultsTitle: 'Available services',
  inclVat: 'incl. VAT',
  book: 'Book now',
  sameCountryError: "From and to countries can't be the same.",
  noIntlRate: 'No rate is available for this route and weight right now. Please try a different weight or contact support.',
} as const;

/**
 * International flag — flip together with SHOW_INTERNATIONAL in
 * components/send-shipment/data.ts. See that file's comment: the booking wizard's
 * international UI/API wiring isn't built yet even though this toggle is on.
 */
const SHOW_INTERNATIONAL = true;

const BOX_SIZES = [
  { label: 'Small', dims: 'L23 x W14 x H4CM', l: 23, w: 14, h: 4 },
  { label: 'Medium', dims: 'L35 x W20 x H15CM', l: 35, w: 20, h: 15 },
  { label: 'Large', dims: 'L75 x W35 x H35CM', l: 75, w: 35, h: 35 },
] as const;

type RouteType = 'domestic' | 'international';
type WeightUnit = 'Kg' | 'G';

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

const HomeIcon = () => (
  <svg aria-hidden="true" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6336 6.61583L8.3836 0.365827C8.1492 0.131584 7.83139 0 7.50001 0C7.16863 0 6.85081 0.131584 6.61641 0.365827L0.366414 6.61583C0.249777 6.7316 0.157319 6.8694 0.0944168 7.02123C0.0315145 7.17305 -0.000577075 7.33586 7.85428e-06 7.5002V15.0002C7.85428e-06 15.166 0.065856 15.3249 0.183066 15.4421C0.300276 15.5594 0.459247 15.6252 0.625008 15.6252H5.62501C5.79077 15.6252 5.94974 15.5594 6.06695 15.4421C6.18416 15.3249 6.25001 15.166 6.25001 15.0002V10.6252H8.75001V15.0002C8.75001 15.166 8.81586 15.3249 8.93307 15.4421C9.05028 15.5594 9.20925 15.6252 9.37501 15.6252H14.375C14.5408 15.6252 14.6997 15.5594 14.817 15.4421C14.9342 15.3249 15 15.166 15 15.0002V7.5002C15.0006 7.33586 14.9685 7.17305 14.9056 7.02123C14.8427 6.8694 14.7502 6.7316 14.6336 6.61583ZM13.75 14.3752H10V10.0002C10 9.83444 9.93416 9.67547 9.81695 9.55826C9.69974 9.44105 9.54077 9.3752 9.37501 9.3752H5.62501C5.45925 9.3752 5.30028 9.44105 5.18307 9.55826C5.06586 9.67547 5.00001 9.83444 5.00001 10.0002V14.3752H1.25001V7.5002L7.50001 1.2502L13.75 7.5002V14.3752Z" fill="currentColor"/>
  </svg>
);

const GlobeIcon = () => (
  <svg aria-hidden="true" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.125 0C6.51803 0 4.94714 0.476523 3.611 1.36931C2.27485 2.2621 1.23344 3.53105 0.618482 5.0157C0.00352044 6.50035 -0.157382 8.13401 0.156123 9.71011C0.469628 11.2862 1.24346 12.7339 2.37976 13.8702C3.51606 15.0065 4.9638 15.7804 6.5399 16.0939C8.11599 16.4074 9.74966 16.2465 11.2343 15.6315C12.719 15.0166 13.9879 13.9752 14.8807 12.639C15.7735 11.3029 16.25 9.73197 16.25 8.125C16.2475 5.97088 15.3907 3.90569 13.8675 2.3825C12.3443 0.859302 10.2791 0.00248123 8.125 0ZM15 8.125C15.0005 8.75903 14.913 9.39007 14.7398 10H11.7313C11.9229 8.75735 11.9229 7.49265 11.7313 6.25H14.7398C14.913 6.85993 15.0005 7.49097 15 8.125ZM6.09375 11.25H10.1563C9.75603 12.5614 9.06124 13.7639 8.125 14.7656C7.18913 13.7637 6.49439 12.5612 6.09375 11.25ZM5.78907 10C5.57449 8.75921 5.57449 7.49079 5.78907 6.25H10.4672C10.6818 7.49079 10.6818 8.75921 10.4672 10H5.78907ZM1.25 8.125C1.24946 7.49097 1.33702 6.85993 1.51016 6.25H4.51875C4.32708 7.49265 4.32708 8.75735 4.51875 10H1.51016C1.33702 9.39007 1.24946 8.75903 1.25 8.125ZM10.1563 5H6.09375C6.49398 3.6886 7.18877 2.48608 8.125 1.48438C9.06088 2.48634 9.75562 3.68878 10.1563 5ZM14.2445 5H11.4617C11.111 3.71321 10.5198 2.50443 9.71953 1.4375C10.6865 1.66979 11.5918 2.10842 12.3734 2.72332C13.155 3.33823 13.7943 4.11487 14.2477 5H14.2445ZM6.53047 1.4375C5.73016 2.50443 5.13903 3.71321 4.78828 5H2.00235C2.45568 4.11487 3.09506 3.33823 3.87663 2.72332C4.65821 2.10842 5.56351 1.66979 6.53047 1.4375ZM2.00235 11.25H4.78828C5.13903 12.5368 5.73016 13.7456 6.53047 14.8125C5.56351 14.5802 4.65821 14.1416 3.87663 13.5267C3.09506 12.9118 2.45568 12.1351 2.00235 11.25ZM9.71953 14.8125C10.5198 13.7456 11.111 12.5368 11.4617 11.25H14.2477C13.7943 12.1351 13.155 12.9118 12.3734 13.5267C11.5918 14.1416 10.6865 14.5802 9.71953 14.8125Z" fill="currentColor"/>
  </svg>
);

const PinFromIcon = () => (
  <svg aria-hidden="true" width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.625 0C7.07318 0.00289486 4.6267 1.01788 2.82229 2.82229C1.01788 4.6267 0.00289486 7.07318 0 9.625C0 17.8609 8.75 24.0811 9.12297 24.3414C9.27009 24.4445 9.44537 24.4998 9.625 24.4998C9.80463 24.4998 9.97991 24.4445 10.127 24.3414C10.5 24.0811 19.25 17.8609 19.25 9.625C19.2471 7.07318 18.2321 4.6267 16.4277 2.82229C14.6233 1.01788 12.1768 0.00289486 9.625 0ZM9.625 6.125C10.3172 6.125 10.9939 6.33027 11.5695 6.71486C12.1451 7.09944 12.5937 7.64606 12.8586 8.28561C13.1235 8.92515 13.1928 9.62888 13.0577 10.3078C12.9227 10.9867 12.5894 11.6104 12.0999 12.0999C11.6104 12.5894 10.9867 12.9227 10.3078 13.0577C9.62888 13.1928 8.92515 13.1235 8.28561 12.8586C7.64607 12.5937 7.09944 12.1451 6.71486 11.5695C6.33027 10.9939 6.125 10.3172 6.125 9.625C6.125 8.69674 6.49375 7.8065 7.15013 7.15012C7.8065 6.49375 8.69674 6.125 9.625 6.125Z" fill="#34644B"/>
  </svg>
);

const PinToIcon = () => (
  <svg aria-hidden="true" width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 19.627C13.6511 19.7134 13.8222 19.7588 13.9963 19.7588C14.1703 19.7588 14.3414 19.7134 14.4925 19.627C14.7987 19.4507 21.9925 15.252 21.9925 7.75822C21.9297 5.67985 21.0601 3.7076 19.568 2.25939C18.0759 0.811181 16.0786 0.000813229 13.9993 6.11741e-07C11.92 -0.000812006 9.92201 0.807995 8.4288 2.25504C6.9356 3.70208 6.06447 5.67365 6 7.75197C6 15.252 13.1975 19.4445 13.5 19.627ZM14 4.75197C14.5933 4.75197 15.1734 4.92792 15.6667 5.25757C16.1601 5.58721 16.5446 6.05575 16.7716 6.60392C16.9987 7.1521 17.0581 7.7553 16.9424 8.33724C16.8266 8.91919 16.5409 9.45374 16.1213 9.87329C15.7018 10.2929 15.1672 10.5786 14.5853 10.6943C14.0033 10.8101 13.4001 10.7507 12.8519 10.5236C12.3038 10.2966 11.8352 9.91203 11.5056 9.41868C11.1759 8.92534 11 8.34532 11 7.75197C11 6.95632 11.3161 6.19326 11.8787 5.63065C12.4413 5.06804 13.2044 4.75197 14 4.75197ZM28 20.752C28 24.6495 20.7863 26.752 14 26.752C7.21375 26.752 0 24.6495 0 20.752C0 18.9282 1.6525 17.3132 4.65375 16.2057C4.89987 16.1244 5.16795 16.1418 5.40147 16.2543C5.63499 16.3669 5.8157 16.5656 5.90551 16.8088C5.99531 17.0519 5.98719 17.3205 5.88286 17.5577C5.77853 17.795 5.58614 17.9825 5.34625 18.0807C3.2825 18.8445 2 19.867 2 20.752C2 22.422 6.565 24.752 14 24.752C21.435 24.752 26 22.422 26 20.752C26 19.867 24.7175 18.8445 22.6537 18.082C22.4139 17.9838 22.2215 17.7963 22.1171 17.559C22.0128 17.3217 22.0047 17.0532 22.0945 16.81C22.1843 16.5669 22.365 16.3681 22.5985 16.2556C22.832 16.1431 23.1001 16.1257 23.3463 16.207C26.3475 17.3132 28 18.9282 28 20.752Z" fill="#2BA735"/>
  </svg>
);

const DocumentIcon = () => (
  <svg aria-hidden="true" width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5672 4.55781L9.19219 0.182813C9.1341 0.124791 9.06515 0.0787825 8.98928 0.0474149C8.91341 0.0160474 8.8321 -6.43662e-05 8.75 1.93249e-07H1.25C0.918479 1.93249e-07 0.600537 0.131696 0.366116 0.366117C0.131696 0.600537 0 0.91848 0 1.25V15C0 15.3315 0.131696 15.6495 0.366116 15.8839C0.600537 16.1183 0.918479 16.25 1.25 16.25H12.5C12.8315 16.25 13.1495 16.1183 13.3839 15.8839C13.6183 15.6495 13.75 15.3315 13.75 15V5C13.7501 4.9179 13.734 4.83659 13.7026 4.76072C13.6712 4.68485 13.6252 4.6159 13.5672 4.55781ZM9.375 2.13359L11.6164 4.375H9.375V2.13359ZM12.5 15H1.25V1.25H8.125V5C8.125 5.16576 8.19085 5.32473 8.30806 5.44194C8.42527 5.55915 8.58424 5.625 8.75 5.625H12.5V15Z" fill="currentColor"/>
  </svg>
);

const BoxPresetIcon = () => (
  <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.0489 14.0197L8.97588 11.6097L10.5849 10.5547L26.5469 13.6197L21.9979 19.5897L21.0489 14.0197Z" fill="#354C07"/>
    <path opacity="0.5" d="M2.55294 10.3239L2.12194 8.78394L9.71894 5.08594L10.5859 10.5509L8.97694 11.6059L2.55294 10.3239Z" fill="#2BA735"/>
    <path opacity="0.7" d="M22 26.9148L4.205 21.7498L3.855 14.9688L22 19.5888V26.9148ZM9.87 20.6047L4.635 19.2708L6.139 19.6537L9.696 20.5597L9.87 20.6047Z" fill="#2BA735"/>
    <path d="M8.976 11.6097L21.05 14.0197L22 19.5897L3.854 14.9697L1.188 10.0547L2.553 10.3267L8.976 11.6097Z" fill="#2BA735"/>
    <path d="M26.5469 17.375V19.915L21.9979 26.914V19.588L26.5469 17.375Z" fill="#2BA735"/>
    <path opacity="0.5" d="M26.5475 13.6156L30.8125 11.5156L28.3805 16.4816L26.5475 17.3736L21.9985 19.5866L26.5475 13.6156Z" fill="#2BA735"/>
    <path opacity="0.5" d="M12.6204 5.82031L28.6484 8.32031L26.5494 13.6183L10.5874 10.5523L12.6204 5.82031Z" fill="#2BA735"/>
  </svg>
);

const InfoIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#36B936" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Shared styles                                                             */
/* -------------------------------------------------------------------------- */

const TAB_WRAPPER = 'flex gap-1 rounded-full bg-[#EFEFEF] p-1';
const TAB_BTN_BASE =
  'flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[13px] transition-all duration-200 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#36B936]';
const TAB_BTN_ACTIVE = 'bg-[#064423] text-[#36B936]';
const TAB_BTN_INACTIVE = 'text-[#064423]/40 hover:text-[#064423]/70';

const INPUT_CLS =
  'w-full rounded-xl border border-[#E8EBE8] bg-white px-3 py-3 text-[13px] text-[#064423] placeholder-[#B0BAB0] ' +
  'transition-colors focus:border-[#36B936] focus:outline-none';

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

const FieldLabel = ({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) => (
  <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-0.5 text-[11px] font-normal text-[#064423]/70">
    {children}
    {optional ? (
      <span className="ml-1 text-[#064423]/40">(optional)</span>
    ) : (
      <span className="mx-0.5 text-[#36B936]" aria-hidden="true">*</span>
    )}
  </label>
);

interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  optional?: boolean;
}

const NumberField = ({ id, label, value, onChange, className = '', optional }: NumberFieldProps) => (
  <div className={`min-w-0 ${className}`}>
    <FieldLabel htmlFor={id} optional={optional}>
      {label}
    </FieldLabel>
    <input
      id={id}
      type="number"
      inputMode="decimal"
      min={0}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={CONTENT.numberPlaceholder}
      className={INPUT_CLS}
    />
  </div>
);

interface SelectFieldProps<T extends string | number> {
  id: string;
  label: string;
  value: T | '';
  onChange: (value: string) => void;
  options: { value: T; label: string }[];
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

function SelectField<T extends string | number>({ id, label, value, onChange, options, placeholder, disabled, className = '' }: SelectFieldProps<T>) {
  return (
    <div className={`min-w-0 ${className}`}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`${INPUT_CLS} appearance-none pr-9 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#064423]/35" aria-hidden="true" />
      </div>
    </div>
  );
}

const countryOptions = (countries: InternationalLookupItem[]) => countries.map((c) => ({ value: c.code, label: c.name }));

/* -------------------------------------------------------------------------- */
/*  Calculator                                                                */
/* -------------------------------------------------------------------------- */

export default function CourierCalculator() {
  // Rates don't need an account: logged-out visitors are quoted through the PrePaid API's guest
  // access. A signed-in customer's phone is still sent so they get their own account rates.
  const { ready, phone } = useAuthContext();
  const { validateShipment, validating, error: validateError } = useValidateShipment();
  const { getCountries } = useCountries();
  const { getDocumentWeights } = useDocumentWeights();
  const { getRateCard, loading: rating, error: rateError } = useRateCard();

  const [routeType, setRouteType] = useState<RouteType>('domestic');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('Kg');
  const [from, setFrom] = useState<GeoAddress>(EMPTY_GEO_ADDRESS);
  const [to, setTo] = useState<GeoAddress>(EMPTY_GEO_ADDRESS);
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceOption[] | null>(null);

  // International: country-to-country, documents only — no address autocomplete/dimensions.
  const [countries, setCountries] = useState<InternationalLookupItem[]>([]);
  const [documentWeights, setDocumentWeights] = useState<number[]>([]);
  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [intlWeight, setIntlWeight] = useState('');
  const [intlQuote, setIntlQuote] = useState<RateQuote | null>(null);
  const [intlNoRate, setIntlNoRate] = useState(false);

  const countryRestriction = routeType === 'domestic' ? 'ae' : undefined;
  const docWeightOptions = expandDocumentWeightOptions(documentWeights);

  // Country list + document weight brackets are only needed once International is picked.
  useEffect(() => {
    if (routeType !== 'international' || countries.length > 0) return;
    void (async () => {
      const [countryList, weights] = await Promise.all([getCountries(), getDocumentWeights()]);
      if (countryList) setCountries(countryList);
      if (weights) setDocumentWeights(weights);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeType, countries.length]);

  // Switching domestic/international changes which addresses/fields are valid, so stale picks
  // are cleared. International is documents only and domestic is always a parcel, so there's
  // no shipment-type choice to reset.
  const changeRoute = (type: RouteType) => {
    setRouteType(type);
    setFrom(EMPTY_GEO_ADDRESS);
    setTo(EMPTY_GEO_ADDRESS);
    setServices(null);
    setFromCountry('');
    setToCountry('');
    setIntlWeight('');
    setIntlQuote(null);
    setIntlNoRate(false);
  };

  // Choosing a preset box fills in the dimensions too.
  const pickBox = (box: (typeof BOX_SIZES)[number]) => {
    setSelectedBox(box.label);
    setLength(String(box.l));
    setWidth(String(box.w));
    setHeight(String(box.h));
  };

  const positive = (v: string) => Number(v) > 0;
  const weightKg = positive(weight) ? (weightUnit === 'G' ? Number(weight) / 1000 : Number(weight)) : 0;
  // Domestic vehicle follows the weight: bike up to 10 kg, car up to 30 kg, nothing heavier.
  const domesticVehicle = vehicleForWeight(weightKg);
  const overweight = weightKg > CAR_MAX_KG;
  const canSubmitDomestic =
    !!from.latitude && !!to.latitude && !!domesticVehicle && positive(length) && positive(width) && positive(height);
  const canSubmitIntl = !!fromCountry && !!toCountry && fromCountry !== toCountry && positive(intlWeight);
  const canSubmit = routeType === 'international' ? canSubmitIntl : canSubmitDomestic;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || (routeType === 'domestic' && !domesticVehicle)) return;

    if (routeType === 'international') {
      setIntlQuote(null);
      setIntlNoRate(false);
      const result = await getRateCard({ fromCountry, toCountry, docType: 'DOC', weight: Number(intlWeight) });
      const quote = parseRateQuote(result);
      setIntlQuote(quote);
      if (result && !quote) setIntlNoRate(true);
      return;
    }

    setServices(null);
    const result = await validateShipment({
      phoneNo: phone ?? '',
      parcelType: domesticVehicle!,
      from: { city: from.city, latitude: from.latitude, longitude: from.longitude },
      to: { city: to.city, latitude: to.latitude, longitude: to.longitude },
      dimensions: [{ lengthCm: Number(length), widthCm: Number(width), heightCm: Number(height), weightKg }],
    });
    if (result) setServices(result.availableServices);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white px-4 pb-16 pt-28">
      {/* Header */}
      <div className="mb-10 w-full max-w-[900px] text-center">
        <p className="mb-3 text-[13px] tracking-wide text-[#064423]/40">{CONTENT.subtitle}</p>
        <h1
          className="mb-7 leading-tight tracking-tight text-[#064423]"
          style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)' }}
        >
          {CONTENT.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {CONTENT.badges.map((label) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-[#36B936]/20 px-4 py-1.5 text-[12px] text-[#064423]/60"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#36B936]" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8 sm:gap-14">
          {CONTENT.stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-[1.5rem] leading-none text-[#064423] sm:text-[1.7rem]">{value}</p>
              <p className="mt-1 text-[12px] text-[#064423]/40">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator card */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-[980px] rounded-[2rem] bg-[#EEF5EE] p-4 sm:p-6 md:p-8"
      >
        <h2 className="mb-6 text-center text-[1.5rem] tracking-tight text-[#064423] sm:text-3xl">
          {CONTENT.formTitle}
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* LEFT: origin & destination */}
          <div className="flex flex-col gap-5 rounded-[1.5rem] bg-white p-5 sm:p-6">
            <h3 className="text-center text-[13px] font-normal text-[#064423]/80">{CONTENT.leftTitle}</h3>

            {SHOW_INTERNATIONAL && (
            <div className={TAB_WRAPPER} role="group" aria-label="Route type">
              {(['domestic', 'international'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={routeType === type}
                  onClick={() => changeRoute(type)}
                  className={`${TAB_BTN_BASE} ${routeType === type ? TAB_BTN_ACTIVE : TAB_BTN_INACTIVE}`}
                >
                  {type === 'domestic' ? <HomeIcon /> : <GlobeIcon />}
                  {CONTENT.tabs[type]}
                </button>
              ))}
            </div>
            )}

            {routeType === 'international' ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex flex-shrink-0 flex-col items-center">
                    <PinFromIcon />
                    <div style={{ width: '2px', height: '44px', borderLeft: '2px dashed #36B936', marginTop: '4px' }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <SelectField
                      id="calc-from-country"
                      label={CONTENT.fromCountry}
                      value={fromCountry}
                      onChange={(v) => {
                        setFromCountry(v);
                        setIntlQuote(null);
                      }}
                      options={countryOptions(countries)}
                      placeholder={CONTENT.countryPlaceholder}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <PinToIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <SelectField
                      id="calc-to-country"
                      label={CONTENT.toCountry}
                      value={toCountry}
                      onChange={(v) => {
                        setToCountry(v);
                        setIntlQuote(null);
                      }}
                      options={countryOptions(countries)}
                      placeholder={CONTENT.countryPlaceholder}
                    />
                  </div>
                </div>
                {fromCountry && toCountry && fromCountry === toCountry && (
                  <p role="alert" className="mx-1 text-[12px] text-red-600">
                    {CONTENT.sameCountryError}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex flex-shrink-0 flex-col items-center">
                    <PinFromIcon />
                    <div style={{ width: '2px', height: '44px', borderLeft: '2px dashed #36B936', marginTop: '4px' }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <AddressAutocompleteInput
                      id="calc-from"
                      variant="compact"
                      label={CONTENT.from}
                      required
                      placeholder={CONTENT.addressPlaceholder}
                      value={from}
                      onChange={(place) => {
                        setFrom(place);
                        setServices(null);
                      }}
                      countryRestriction={countryRestriction}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <PinToIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <AddressAutocompleteInput
                      id="calc-to"
                      variant="compact"
                      label={CONTENT.to}
                      required
                      placeholder={CONTENT.addressPlaceholder}
                      value={to}
                      onChange={(place) => {
                        setTo(place);
                        setServices(null);
                      }}
                      countryRestriction={countryRestriction}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: shipment details */}
          <div className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-5 sm:p-6">
            <h3 className="text-center text-[13px] font-normal text-[#064423]/80">{CONTENT.rightTitle}</h3>

            {routeType === 'international' ? (
              <>
                <div className="flex items-center gap-2 rounded-full bg-[#064423] px-4 py-2.5 text-[13px] text-[#36B936]">
                  <DocumentIcon />
                  {CONTENT.tabs.document}
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#36B936]/10 bg-[#F6FCF6] px-3 py-2.5">
                  <span className="flex-shrink-0">
                    <InfoIcon />
                  </span>
                  <p className="text-[11px] leading-snug text-[#064423]/50">{CONTENT.docsOnlyBanner}</p>
                </div>

                <SelectField
                  id="calc-intl-weight"
                  label={CONTENT.docWeight}
                  value={intlWeight}
                  onChange={(v) => {
                    setIntlWeight(v);
                    setIntlQuote(null);
                  }}
                  options={docWeightOptions.map((w) => ({ value: String(w), label: `${w} Kg` }))}
                  placeholder={CONTENT.weightPlaceholder}
                />

                {rateError && (
                  <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-[12px] text-red-600">
                    {rateError}
                  </p>
                )}
                {intlNoRate && !rateError && (
                  <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-[12px] text-red-600">
                    {CONTENT.noIntlRate}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 rounded-xl border border-[#36B936]/10 bg-[#F6FCF6] px-3 py-2.5">
                  <span className="flex-shrink-0">
                    <InfoIcon />
                  </span>
                  <p className="text-[11px] leading-snug text-[#064423]/50">{CONTENT.infoBanner}</p>
                </div>

                {/* Weight */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="min-w-0 flex-1">
                    <FieldLabel htmlFor="calc-weight">{CONTENT.weight}</FieldLabel>
                    <div className="flex items-center gap-2">
                      <input
                        id="calc-weight"
                        type="number"
                        inputMode="decimal"
                        min={0}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={CONTENT.numberPlaceholder}
                        className={`${INPUT_CLS} min-w-0 flex-1`}
                      />
                      <div className="flex flex-shrink-0 rounded-full bg-[#EFEFEF] p-1" role="group" aria-label="Weight unit">
                        {(['Kg', 'G'] as const).map((u) => (
                          <button
                            key={u}
                            type="button"
                            aria-pressed={weightUnit === u}
                            onClick={() => setWeightUnit(u)}
                            className={`rounded-full px-3 py-1.5 text-[11px] transition-all duration-200 ${
                              weightUnit === u
                                ? 'bg-[#064423] text-[#36B936] shadow-sm'
                                : 'text-[#064423]/40 hover:text-[#064423]/70'
                            }`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className={`mt-1.5 text-[11px] ${overweight ? 'text-red-600' : 'text-[#064423]/50'}`} role={overweight ? 'alert' : undefined}>
                      {overweight
                        ? OVERWEIGHT_MESSAGE
                        : domesticVehicle === 'car'
                          ? `Goes by car (over ${BIKE_MAX_KG} kg, up to ${CAR_MAX_KG} kg).`
                          : domesticVehicle === 'bike'
                            ? `Goes by bike (up to ${BIKE_MAX_KG} kg).`
                            : `Up to ${BIKE_MAX_KG} kg goes by bike, up to ${CAR_MAX_KG} kg by car.`}
                    </p>
                  </div>
                </div>

                {/* Box presets */}
                <div>
                  <p className="mb-2 text-[12px] text-[#064423]/70">{CONTENT.unsureSize}</p>
                  <div className={`grid gap-2 grid-cols-3`}>
                    {BOX_SIZES.map((box) => {
                      const isSelected = selectedBox === box.label;
                      return (
                        <button
                          key={box.label}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => pickBox(box)}
                          className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-center transition-all duration-200 ${
                            isSelected
                              ? 'border-[#36B936] bg-[#F0FAF0]'
                              : 'border-[#E8EBE8] bg-white hover:border-[#36B936]/40'
                          }`}
                        >
                          <BoxPresetIcon />
                          <p className={`text-[10px] leading-tight ${isSelected ? 'font-semibold text-[#064423]' : 'text-[#064423]/50'}`}>
                            {box.dims}
                          </p>
                          <p className={`mt-1 text-[11px] ${isSelected ? 'font-semibold text-[#064423]' : 'text-[#064423]/60'}`}>
                            {box.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-3 gap-3">
                  <NumberField id="calc-length" label={CONTENT.dims.length} value={length} onChange={setLength} />
                  <NumberField id="calc-width" label={CONTENT.dims.width} value={width} onChange={setWidth} />
                  <NumberField id="calc-height" label={CONTENT.dims.height} value={height} onChange={setHeight} />
                </div>

                {validateError && (
                  <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-[12px] text-red-600">
                    {validateError}
                  </p>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={!ready || !canSubmit || validating || rating}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] py-4 text-[14px] text-white transition-all duration-200 hover:bg-[#2da52d] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#36B936] disabled:active:scale-100"
            >
              {(validating || rating) && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {CONTENT.submit}
            </button>
          </div>
        </div>

        {/* Live rate from /api/international/rate-card */}
        {routeType === 'international' && intlQuote && (
          <div className="mt-6 rounded-[1.5rem] bg-white p-5 sm:p-6" aria-live="polite">
            <h3 className="mb-4 text-[15px] font-medium text-[#064423]">{CONTENT.resultsTitle}</h3>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E8EBE8] px-4 py-3.5">
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-[#064423]">
                  {intlQuote.service || 'Document'} · {intlQuote.weightLabel || `${intlWeight} Kg`}
                </p>
                <p className="mt-0.5 text-[12px] text-[#064423]/50">Door-to-door document delivery</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="whitespace-nowrap text-right text-[18px] font-medium text-[#064423]">
                  {intlQuote.currency} {intlQuote.total.toFixed(2)}
                  <span className="block text-[11px] font-normal text-[#064423]/45">{CONTENT.inclVat}</span>
                </p>
                <Link
                  href="/send-shipment"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#064423] px-4 py-2 text-[13px] text-[#36B936] transition-opacity hover:opacity-90"
                >
                  {CONTENT.book} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Live services + prices from /api/shipments/validate */}
        {routeType === 'domestic' && services && (
          <div className="mt-6 rounded-[1.5rem] bg-white p-5 sm:p-6" aria-live="polite">
            <h3 className="mb-4 text-[15px] font-medium text-[#064423]">{CONTENT.resultsTitle}</h3>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li
                  key={service.serviceCode}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E8EBE8] px-4 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-[#064423]">{service.name}</p>
                    {service.description && <p className="mt-0.5 text-[12px] text-[#064423]/50">{service.description}</p>}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="whitespace-nowrap text-right text-[18px] font-medium text-[#064423]">
                      AED {service.grossAmount.toFixed(2)}
                      <span className="block text-[11px] font-normal text-[#064423]/45">{CONTENT.inclVat}</span>
                    </p>
                    <Link
                      href="/send-shipment"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#064423] px-4 py-2 text-[13px] text-[#36B936] transition-opacity hover:opacity-90"
                    >
                      {CONTENT.book} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
