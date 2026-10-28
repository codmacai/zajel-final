'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import type { NewAddressInput, SavedAddress } from '@/types/account';

/**
 * GET/POST /api/account/addresses — the backend proxies these to Zajel.ZAPP.API's
 * GetCustomerAddressBookV2/AddCustomerAddressV2 as a pure passthrough (see AccountService.cs).
 * GetCustomerAddressBook can legitimately return `null` (no address book row for this user yet).
 */
export function useAccountAddresses() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reloadToken, setReloadToken] = useState(0);

  // State is only set from the request's callbacks (never synchronously in the effect body).
  useEffect(() => {
    let active = true;
    apiJson<SavedAddress[] | null>('/api/account/addresses')
      .then((data) => active && setAddresses((data ?? []).filter((a) => !a.isDeleted)))
      .catch((err) => active && setError(err instanceof ApiError ? err.message : 'Could not load your saved addresses. Please try again.'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [reloadToken]);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    setReloadToken((t) => t + 1);
  }, []);

  const addAddress = async (input: NewAddressInput): Promise<boolean> => {
    setSaving(true);
    setError(null);
    try {
      const success = await apiJson<boolean>('/api/account/addresses', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      if (success) {
        load();
      } else {
        setError('Could not save this address. Please check the details and try again.');
      }
      return success;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save this address. Please try again.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { addresses, loading, saving, error, reload: load, addAddress };
}
