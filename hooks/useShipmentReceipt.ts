'use client';

import { useEffect, useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import type { ShipmentReceipt } from '@/types/shipment';

type ReceiptState = { key: number | null; receipt: ShipmentReceipt | null; error: string | null };

/**
 * Backs the printable receipt view — GET /api/shipments/{id}/receipt (ported from Zajel-2).
 * Only resolves for the signed-in user's own, already-PAID shipments; anything else (wrong
 * owner, not paid yet, doesn't exist) comes back as a 404.
 */
export function useShipmentReceipt(shipmentId: number | null) {
  // Keyed by shipmentId so a stale result is never shown for a different id, and state is
  // only set from the request's callbacks (never synchronously in the effect body).
  const [state, setState] = useState<ReceiptState>({ key: null, receipt: null, error: null });

  useEffect(() => {
    if (shipmentId === null) return undefined;
    let active = true;
    apiJson<ShipmentReceipt>(`/api/shipments/${shipmentId}/receipt`)
      .then((receipt) => active && setState({ key: shipmentId, receipt, error: null }))
      .catch((err) => {
        if (!active) return;
        const error =
          err instanceof ApiError && err.status === 404
            ? 'No receipt is available for this shipment yet.'
            : 'Could not load this receipt. Please try again.';
        setState({ key: shipmentId, receipt: null, error });
      });
    return () => {
      active = false;
    };
  }, [shipmentId]);

  if (shipmentId === null) return { receipt: null, loading: false, error: 'Receipt not found.' };
  const settled = state.key === shipmentId;
  return {
    receipt: settled ? state.receipt : null,
    loading: !settled,
    error: settled ? state.error : null,
  };
}
