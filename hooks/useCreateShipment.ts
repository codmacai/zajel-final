'use client';

import { useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import { tokenStore } from '@/lib/auth/tokenStore';
import type { CreateShipmentPayload, CreateShipmentV2Result } from '@/types/shipment';

/**
 * POST /api/shipments — the backend must proxy this to the real CreateShipmentV2 endpoint
 * server-side (that endpoint needs a Bearer token + X-AUTH-API-KEY that must never ship in
 * browser JS). Returns a hosted payment page URL + the referenceNumber needed to confirm the
 * shipment once payment succeeds — the frontend never touches money directly.
 */
export function useCreateShipment() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createShipment = async (payload: CreateShipmentPayload): Promise<CreateShipmentV2Result | null> => {
    setSubmitting(true);
    setError(null);

    if (!tokenStore.getAccessToken()) {
      setError('You need to be signed in to book a shipment.');
      setSubmitting(false);
      return null;
    }

    try {
      return await apiJson<CreateShipmentV2Result>('/api/shipments', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Something went wrong creating your shipment. Please try again.';
      setError(message);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return { createShipment, submitting, error };
}
