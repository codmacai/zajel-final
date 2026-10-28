'use client';

import { useEffect, useState } from 'react';
import { clientEnv } from '@/lib/api/env';

let loadPromise: Promise<void> | null = null;

function placesReady(): boolean {
  return typeof window !== 'undefined' && !!window.google?.maps?.places;
}

/**
 * Loads the Google Maps JS API (places library) exactly once, no matter how many components
 * mount this hook concurrently — de-duped via a module-level promise. Safe to use with an
 * HTTP-referrer-restricted browser key.
 */
export function useGoogleMapsScript(): { loaded: boolean; error: string | null } {
  // Always start false so the server render and hydration match; flips on mount.
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const hasKey = !!clientEnv.googleMapsApiKey;

  useEffect(() => {
    if (!hasKey) return;
    if (!loadPromise && placesReady()) loadPromise = Promise.resolve();

    if (!loadPromise) {
      loadPromise = new Promise<void>((resolve, reject) => {
        // `loading=async`'s own script `load` event fires once the bootstrap loader has run —
        // NOT once the `places` library is attached to `google.maps`. The `callback` param
        // only fires after the requested libraries are ready.
        window.__zajelGoogleMapsCallback = () => resolve();

        const existing = document.getElementById('google-maps-js') as HTMLScriptElement | null;
        if (existing) {
          if (placesReady()) resolve();
          else existing.addEventListener('error', () => reject(new Error('load-failed')));
          return;
        }

        const script = document.createElement('script');
        script.id = 'google-maps-js';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(clientEnv.googleMapsApiKey)}&libraries=places&loading=async&callback=__zajelGoogleMapsCallback`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          loadPromise = null;
          reject(new Error('load-failed'));
        };
        document.head.appendChild(script);
      });
    }

    let cancelled = false;
    loadPromise
      .then(() => {
        if (!cancelled) setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoadError('Could not load address search. Please refresh the page and try again.');
      });

    return () => {
      cancelled = true;
    };
  }, [hasKey]);

  const error = !hasKey ? 'Address search is unavailable right now.' : loadError;
  return { loaded, error };
}
