'use client';

import { useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import type { ConfirmShipmentResult } from '@/types/shipment';

/**
 * POST /api/shipments/confirm?referenceNumber=... — the backend must proxy this to the real
 * ConfirmShipment endpoint server-side, only ever called AFTER the payment provider reports
 * success for that referenceNumber. Never call this on the strength of client-side state
 * alone; the payment outcome must be re-verified — see PaymentModal.tsx.
 */
export function useConfirmShipment() {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmShipment = async (referenceNumber: string): Promise<ConfirmShipmentResult | null> => {
    setConfirming(true);
    setError(null);

    try {
      return await apiJson<ConfirmShipmentResult>(
        `/api/shipments/confirm?referenceNumber=${encodeURIComponent(referenceNumber)}`,
        { method: 'POST' },
      );
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Payment was received, but we could not finalize your shipment. Our team will follow up — please save your reference number.';
      setError(message);
      return null;
    } finally {
      setConfirming(false);
    }
  };

  return { confirmShipment, confirming, error };
}
