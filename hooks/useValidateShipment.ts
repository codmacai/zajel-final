'use client';

import { useRef, useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import type { ValidateShipmentRequest, ValidateShipmentResult } from '@/types/shipment';

/**
 * POST /api/shipments/validate — the backend must proxy this to the real
 * ShipmentValidation/validate endpoint server-side (that endpoint needs an
 * X-AUTH-API-KEY that must never ship in browser JS). Confirms the From/To pair is
 * serviceable and returns which service levels (NEXT_DAY, SAME_DAY, ...) apply to it.
 */
export function useValidateShipment() {
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Lets the caller ignore a stale response if the user changes an address and
  // re-validates before the first request lands.
  const requestId = useRef(0);

  const validateShipment = async (payload: ValidateShipmentRequest): Promise<ValidateShipmentResult | null> => {
    const currentRequest = ++requestId.current;
    setValidating(true);
    setError(null);

    try {
      const result = await apiJson<ValidateShipmentResult>('/api/shipments/validate', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (requestId.current !== currentRequest) return null;

      if (!result.isValid) {
        setError(result.validationMessage || 'We can\'t deliver between these two addresses yet.');
        return null;
      }

      // isValid:true with an empty availableServices array is a real, legitimate response
      // (confirmed against Zajel.ZAPP.API's own ShipmentValidationResponse) — it means the
      // addresses themselves are fine but no delivery service actually covers this route right
      // now. Never invent a fake option here — show the real "no service available" state
      // instead and let the user retry.
      if (result.availableServices.length === 0) {
        setError('These locations are valid, but no delivery service is available for this route right now. Please try again or choose different addresses.');
        return null;
      }
      return result;
    } catch (err) {
      if (requestId.current !== currentRequest) return null;
      const message =
        err instanceof ApiError ? err.message : 'Could not validate this address right now. Please try again.';
      setError(message);
      return null;
    } finally {
      if (requestId.current === currentRequest) setValidating(false);
    }
  };

  return { validateShipment, validating, error };
}
