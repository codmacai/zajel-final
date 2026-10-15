'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { useGoogleMapsScript } from '@/hooks/useGoogleMapsScript';
import { EMPTY_GEO_ADDRESS, type GeoAddress } from '@/types/shipment';

interface AddressAutocompleteInputProps {
  label: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  /** Shows "Optional" next to the label instead of a required marker. */
  optional?: boolean;
  value: GeoAddress;
  onChange: (place: GeoAddress) => void;
  /** Restricts results — 'ae' for the domestic flow, undefined for international. */
  countryRestriction?: string;
  /** Validation message from the parent form. */
  error?: string;
  /** 'default' matches the send-shipment/account forms; 'compact' matches the rate calculator. */
  variant?: 'default' | 'compact';
}

function getComponent(
  components: google.maps.GeocoderAddressComponent[] | undefined,
  type: string,
  useShortName = false,
): string {
  const match = components?.find((c) => c.types.includes(type));
  if (!match) return '';
  return useShortName ? match.short_name : match.long_name;
}

/**
 * Google doesn't tag every result with a `locality`/`country` component — POI-style
 * predictions (a building or landmark name) sometimes come back with sparse component data.
 * As a last resort, parse `formatted_address`'s comma-separated segments (last = country,
 * the one before it = city).
 */
function fallbackFromFormattedAddress(formattedAddress: string): { city: string; country: string } {
  const segments = formattedAddress.split(',').map((s) => s.trim()).filter(Boolean);
  const country = segments[segments.length - 1] ?? '';
  const city = segments[segments.length - 2] ?? '';
  return { city, country };
}

function placeToGeoAddress(place: google.maps.places.PlaceResult): GeoAddress | null {
  const location = place.geometry?.location;
  if (!location) return null;

  const components = place.address_components;
  const formattedAddress = place.formatted_address ?? place.name ?? '';
  const fallback = fallbackFromFormattedAddress(formattedAddress);

  const city =
    getComponent(components, 'locality') ||
    getComponent(components, 'postal_town') ||
    getComponent(components, 'sublocality_level_1') ||
    getComponent(components, 'administrative_area_level_2') ||
    getComponent(components, 'administrative_area_level_1') ||
    fallback.city;
  const country = getComponent(components, 'country') || fallback.country;
  const area = getComponent(components, 'sublocality') || getComponent(components, 'neighborhood');

  return {
    formattedAddress,
    city,
    country,
    area,
    latitude: location.lat(),
    longitude: location.lng(),
  };
}

const STYLES = {
  default: {
    label: 'mx-1 mb-2 flex items-center justify-between text-[12px] text-[#064423] sm:text-[13px]',
    input:
      'h-12 w-full rounded-[12px] border bg-white pl-10 pr-10 text-[14px] text-[#064423] outline-none transition-all ' +
      'placeholder:text-gray-400 focus:border-[#36B936] focus:ring-1 focus:ring-[#36B936] sm:rounded-[14px]',
  },
  compact: {
    label: 'mb-1.5 flex items-center gap-0.5 text-[11px] font-normal text-[#064423]/70',
    input:
      'w-full rounded-xl border bg-white py-3 pl-9 pr-9 text-[13px] text-[#064423] placeholder-[#B0BAB0] ' +
      'transition-colors focus:border-[#36B936] focus:outline-none',
  },
} as const;

/**
 * Google Places Autocomplete text input. The user only ever picks a suggestion — city,
 * country and lat/lng are all derived from the selected place, never hand-typed, so the
 * validate/create APIs (which key pricing + serviceability off lat/lng) always get coordinates
 * that match what's shown on screen.
 */
export default function AddressAutocompleteInput({
  label,
  id,
  placeholder,
  required,
  optional,
  value,
  onChange,
  countryRestriction,
  error,
  variant = 'default',
}: AddressAutocompleteInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const { loaded, error: scriptError } = useGoogleMapsScript();
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  // Keep the latest onChange without re-creating the Google widget on every render.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const [inputText, setInputText] = useState(value.formattedAddress);
  const [resolved, setResolved] = useState(!!value.formattedAddress);
  // Re-sync the visible text when the parent replaces `value` (e.g. picking a saved address)
  // — React's "adjusting state when a prop changes" pattern, done during render.
  const [syncedFrom, setSyncedFrom] = useState(value.formattedAddress);
  if (value.formattedAddress !== syncedFrom) {
    setSyncedFrom(value.formattedAddress);
    setInputText(value.formattedAddress);
    setResolved(!!value.formattedAddress);
  }

  useEffect(() => {
    if (!loaded || !inputRef.current || autocompleteRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ['formatted_address', 'name', 'address_components', 'geometry'],
      ...(countryRestriction ? { componentRestrictions: { country: countryRestriction } } : {}),
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const geo = placeToGeoAddress(place);
      if (!geo) {
        // User hit Enter without picking a suggestion — don't silently accept unresolved text.
        setResolved(false);
        return;
      }
      // Google's widget already rewrites the input to the exact suggestion clicked BEFORE this
      // fires — keep that text rather than `place.formatted_address`, which is often reordered.
      const selectedText = inputRef.current?.value || geo.formattedAddress;
      const finalGeo = { ...geo, formattedAddress: selectedText };
      setInputText(selectedText);
      setSyncedFrom(selectedText);
      setResolved(true);
      onChangeRef.current(finalGeo);
    });

    autocompleteRef.current = autocomplete;
    return () => {
      // clearInstanceListeners() fully disposes the widget; a half-torn-down instance from an
      // earlier step can otherwise swallow clicks on a later step's dropdown.
      google.maps.event.clearInstanceListeners(autocomplete);
      document.querySelectorAll('.pac-container').forEach((el) => el.remove());
      autocompleteRef.current = null;
    };
  }, [loaded, countryRestriction]);

  const s = STYLES[variant];
  const describedBy = error ? `${inputId}-error` : undefined;
  const iconPos = variant === 'compact' ? 'left-3' : 'left-4';

  return (
    <div className="flex min-w-0 flex-col">
      <label htmlFor={inputId} className={s.label}>
        <span>
          {label}
          {required && variant === 'compact' && (
            <span className="mx-0.5 text-[#36B936]" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {optional && <span className="text-[11px] text-[#064423]/45 sm:text-[12px]">Optional</span>}
      </label>
      <div className="relative">
        <MapPin
          className={`pointer-events-none absolute ${iconPos} top-1/2 h-4 w-4 -translate-y-1/2 text-[#064423]/40`}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          placeholder={placeholder ?? 'Start typing an address…'}
          required={required}
          value={inputText}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          onChange={(e) => {
            setInputText(e.target.value);
            setResolved(false);
            // Invalidate the parent's stored place the moment the text no longer matches it —
            // on keystroke, not blur, so there's no race with Google's async place_changed.
            if (value.formattedAddress) {
              setSyncedFrom('');
              onChange(EMPTY_GEO_ADDRESS);
            }
          }}
          autoComplete="off"
          className={`${s.input} ${error ? 'border-red-400' : variant === 'compact' ? 'border-[#E8EBE8]' : 'border-gray-200'}`}
        />
        {!loaded && !scriptError && (
          <Loader2
            className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#064423]/30"
            aria-hidden="true"
          />
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mx-1 mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
      {!error && scriptError && <p className="mx-1 mt-1.5 text-[12px] text-amber-600">{scriptError}</p>}
      {!error && !scriptError && inputText && !resolved && (
        <p className="mx-1 mt-1.5 text-[12px] text-[#064423]/50">Pick a suggestion from the list to confirm this address.</p>
      )}
    </div>
  );
}
