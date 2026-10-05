import { useEffect, useState } from 'react';
import { trackShipment } from './trackingApi';
import type { Shipment } from './types';

interface UseShipmentResult {
  shipment: Shipment | null;
  loading: boolean;
  error: string | null;
}


export function useShipment(query: string | null): UseShipmentResult {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setShipment(null);
      setError(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    trackShipment(query)
      .then((result) => {
        if (isMounted) setShipment(result);
      })
      .catch((err) => {
        if (isMounted) setError(err instanceof Error ? err.message : 'Something went wrong.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { shipment, loading, error };
}
