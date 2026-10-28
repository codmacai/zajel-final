'use client';

import { useEffect, useState } from 'react';
import { trackShipment } from './trackingApi';
import type { Shipment, ShipmentQuery } from './types';

interface UseShipmentResult {
  shipment: Shipment | null;
  loading: boolean;
  error: string | null;
}

interface Settled {
  key: string;
  shipment: Shipment | null;
  error: string | null;
}

export function useShipment(query: ShipmentQuery | null): UseShipmentResult {
  const value = query?.value ?? null;
  const optionCode = query?.optionCode ?? null;
  const key = value && optionCode ? `${optionCode}:${value}` : null;

  // Only the settled result is stored; "loading" is derived (a key with no result yet), so the
  // effect never has to set state synchronously.
  const [settled, setSettled] = useState<Settled | null>(null);

  useEffect(() => {
    if (!key || !value || !optionCode) return;
    let isMounted = true;

    trackShipment({ value, optionCode })
      .then((shipment) => {
        if (isMounted) setSettled({ key, shipment, error: null });
      })
      .catch((err) => {
        if (isMounted) setSettled({ key, shipment: null, error: err instanceof Error ? err.message : 'Something went wrong.' });
      });

    return () => {
      isMounted = false;
    };
  }, [key, value, optionCode]);

  if (!key) return { shipment: null, loading: false, error: null };
  if (settled?.key !== key) return { shipment: null, loading: true, error: null };
  return { shipment: settled.shipment, loading: false, error: settled.error };
}
