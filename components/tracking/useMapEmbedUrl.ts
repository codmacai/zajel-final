'use client';

import { useEffect, useState } from 'react';
import { clientEnv } from '@/lib/api/env';
import type { LatLng, Shipment } from './types';

interface NominatimResult {
  lat: string;
  lon: string;
}

/**
 * The API rarely supplies real coordinates — geocode the city/country text as a fallback
 * using OpenStreetMap's free Nominatim service. Deliberately NOT Google's Geocoding API:
 * Google forbids referer-restricted keys (the only kind safe to ship in browser JS) from
 * calling it, and an unrestricted key would be stealable from the page source.
 */
async function geocode(address: string): Promise<LatLng | null> {
  if (!address.trim()) return null;

  const params = new URLSearchParams({ q: address, format: 'json', limit: '1' });
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
  if (!response.ok) return null;

  const results = (await response.json()) as NominatimResult[];
  const result = results[0];
  return result ? { lat: Number(result.lat), lng: Number(result.lon) } : null;
}

function resolveCoordinates(coordinates: LatLng | null, address: string): Promise<LatLng | null> {
  return coordinates ? Promise.resolve(coordinates) : geocode(address);
}

/**
 * Google Static Maps image with origin/destination pins. Requires a Maps key whose HTTP
 * referrer allowlist includes this site — returns '' until one is configured or coordinates
 * can't be resolved, so the caller can show a fallback instead of a broken map.
 */
export function useMapEmbedUrl(shipment: Shipment | null): { url: string; loading: boolean } {
  const enabled = !!shipment && !!clientEnv.googleMapsApiKey;
  // Keyed on the shipment so a stale result never shows for a newer one; loading is derived.
  const [settled, setSettled] = useState<{ for: Shipment; url: string } | null>(null);

  useEffect(() => {
    if (!shipment || !clientEnv.googleMapsApiKey) return;
    let active = true;

    Promise.all([
      resolveCoordinates(shipment.originCoordinates, shipment.origin),
      resolveCoordinates(shipment.destinationCoordinates, shipment.destination),
    ])
      .then(([origin, destination]) => {
        if (!active) return;
        if (!origin || !destination) {
          setSettled({ for: shipment, url: '' });
          return;
        }
        const params = new URLSearchParams({
          key: clientEnv.googleMapsApiKey,
          size: '900x520',
          scale: '2',
          maptype: 'roadmap',
        });
        params.append('markers', `color:green|label:O|${origin.lat},${origin.lng}`);
        params.append('markers', `color:red|label:D|${destination.lat},${destination.lng}`);
        setSettled({ for: shipment, url: `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}` });
      })
      .catch(() => {
        if (active) setSettled({ for: shipment, url: '' });
      });

    return () => {
      active = false;
    };
  }, [shipment]);

  if (!enabled) return { url: '', loading: false };
  if (settled?.for !== shipment) return { url: '', loading: true };
  return { url: settled.url, loading: false };
}
