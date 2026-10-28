'use client';

import { useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import { lookupKey, type DocumentWeightOption, type InternationalLookupItem, type PickupDayOption } from '@/types/shipment';

const GENERIC_ERROR = 'Could not load that right now. Please try again.';

// The upstream Master API shapes (seen in the PrePaid API logs) differ per list:
//   GetCountries -> [{ alpha2Code: "AE", countryName: "UNITED ARAB EMIRATES", ... }]
//   GetCities    -> [{ cityCode: "DXB", cityName: "Dubai", countryCode: "AE" }]
//   GetDocumentWeights -> { weights: [0.5, 4] }
// They're normalised here to { code, name } / number[] so the UI never renders blank options.
type RawRecord = Record<string, unknown>;

const firstString = (r: RawRecord, keys: string[]) => {
  for (const k of keys) {
    const v = r[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
};

// "UNITED ARAB EMIRATES" -> "United Arab Emirates", "FUJAIRAH" -> "Fujairah"; mixed-case
// names are left alone.
const tidyName = (name: string) =>
  name === name.toUpperCase() ? name.toLowerCase().replace(/(^|[\s(/-])([a-z])/g, (_, p: string, c: string) => p + c.toUpperCase()) : name;

// `byName`: cities share their station's code (LHE, KHI, ISB…), so they're keyed on code + name;
// countries are unique by code.
function toLookupItems(raw: unknown, codeKeys: string[], nameKeys: string[], byName = false): InternationalLookupItem[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const items: InternationalLookupItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const code = firstString(entry as RawRecord, codeKeys);
    const name = firstString(entry as RawRecord, nameKeys);
    if (!code) continue;
    const display = tidyName(name || code);
    const key = byName ? lookupKey(code, display) : code;
    if (seen.has(key)) continue;
    seen.add(key);
    const item: InternationalLookupItem = byName ? { code, name: display, key } : { code, name: display };
    const postal = (entry as RawRecord).is_postal_code_required;
    if (typeof postal === 'boolean') item.postalCodeRequired = postal;
    items.push(item);
  }
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

function toWeights(raw: unknown): DocumentWeightOption[] {
  const list = Array.isArray(raw) ? raw : raw && typeof raw === 'object' ? (raw as RawRecord).weights : null;
  if (!Array.isArray(list)) return [];
  return list.map(Number).filter((n) => Number.isFinite(n) && n > 0);
}

function useAsync<TArgs extends unknown[], TResult>(load: (...args: TArgs) => Promise<TResult>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (...args: TArgs): Promise<TResult | null> => {
    setLoading(true);
    setError(null);
    try {
      return await load(...args);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : GENERIC_ERROR);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { run, loading, error };
}

/**
 * GET /api/international/countries — the backend proxies this to the real GetCountries
 * endpoint server-side (needs a Bearer token + X-AUTH-API-KEY that must never ship in browser
 * JS). See InternationalShipmentService.
 */
export function useCountries() {
  const { run, loading, error } = useAsync(async () =>
    toLookupItems(await apiJson<unknown>('/api/international/countries'), ['code', 'alpha2Code', 'countryCode'], ['name', 'countryName']),
  );
  return { getCountries: run, loading, error };
}

/**
 * GET /api/international/cities?countryCode=XX — populated once a country is chosen. Proxies
 * to the real GetCities endpoint.
 */
export function useCities() {
  const { run, loading, error } = useAsync(async (countryCode: string) =>
    toLookupItems(
      await apiJson<unknown>(`/api/international/cities?countryCode=${encodeURIComponent(countryCode)}`),
      ['code', 'cityCode'],
      ['name', 'cityName'],
      true,
    ),
  );
  return { getCities: run, loading, error };
}

/**
 * GET /api/international/document-weights — the preset weight brackets for a DOC shipment.
 * Proxies to the real International/GetDocumentWeights endpoint.
 */
export function useDocumentWeights() {
  const { run, loading, error } = useAsync(async () => toWeights(await apiJson<unknown>('/api/international/document-weights')));
  return { getDocumentWeights: run, loading, error };
}

/**
 * GET /api/international/next-pickup-days?fromCity=XX — available pickup dates for the chosen
 * origin city. Proxies to the real International/GetNextPickupDays endpoint.
 */
export function useNextPickupDays() {
  const { run, loading, error } = useAsync((fromCity: string) =>
    apiJson<PickupDayOption[]>(`/api/international/next-pickup-days?fromCity=${encodeURIComponent(fromCity)}`),
  );
  return { getNextPickupDays: run, loading, error };
}
