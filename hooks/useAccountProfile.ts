'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import type { AccountProfile, GetProfileResult, UpdateProfileInput, UpdateProfileResult } from '@/types/account';

/**
 * GET/POST /api/account/profile — the backend proxies these to Zajel.ZAPP.API's
 * GetUserProfileV2/UpdateUserProfileV2 as a pure passthrough (see AccountService.cs).
 */
export function useAccountProfile() {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reloadToken, setReloadToken] = useState(0);

  // State is only set from the request's callbacks (never synchronously in the effect body).
  useEffect(() => {
    let active = true;
    apiJson<GetProfileResult>('/api/account/profile')
      .then((data) => active && setProfile(data.user))
      .catch((err) => active && setError(err instanceof ApiError ? err.message : 'Could not load your profile. Please try again.'))
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

  const updateProfile = async (input: UpdateProfileInput): Promise<{ success: boolean; message: string }> => {
    setSaving(true);
    setError(null);
    try {
      const data = await apiJson<UpdateProfileResult>('/api/account/profile', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      if (data.user) setProfile(data.user);
      return { success: true, message: data.message };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Could not update your profile. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setSaving(false);
    }
  };

  return { profile, loading, saving, error, reload: load, updateProfile };
}
