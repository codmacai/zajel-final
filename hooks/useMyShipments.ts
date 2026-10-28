'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiJson } from '@/lib/api/client';
import type { ShipmentSummary } from '@/types/shipment';

/**
 * Backs the account dashboard's "My Shipments" list — GET /api/shipments (ported from
 * zajel_site_new_angular's injectMyShipments).
 */
export function useMyShipments() {
  const [shipments, setShipments] = useState<ShipmentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reloadToken, setReloadToken] = useState(0);

  // State is only set from the request's callbacks (never synchronously in the effect body).
  useEffect(() => {
    let active = true;
    apiJson<ShipmentSummary[]>('/api/shipments')
      .then((data) => active && setShipments(data ?? []))
      .catch(() => active && setError('Could not load your shipments. Please try again.'))
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

  return { shipments, loading, error, reload: load };
}
