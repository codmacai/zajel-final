// Minimal ambient types for the parts of the Google Maps JS API (Places Autocomplete) this
// site uses — avoids adding @types/google.maps as a dependency. If you start using more of
// the Maps API, install @types/google.maps and delete this file.

declare namespace google.maps {
  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface MapsEventListener {
    remove(): void;
  }

  interface GeocoderAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  namespace event {
    function clearInstanceListeners(instance: object): void;
  }

  namespace places {
    interface PlaceGeometry {
      location?: LatLng;
    }

    interface PlaceResult {
      address_components?: GeocoderAddressComponent[];
      formatted_address?: string;
      geometry?: PlaceGeometry;
      name?: string;
    }

    interface ComponentRestrictions {
      country: string | string[];
    }

    interface AutocompleteOptions {
      fields?: string[];
      componentRestrictions?: ComponentRestrictions;
    }

    class Autocomplete {
      constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
      addListener(eventName: string, handler: () => void): MapsEventListener;
      getPlace(): PlaceResult;
    }
  }
}

interface Window {
  google?: { maps?: { places?: unknown } };
  __zajelGoogleMapsCallback?: () => void;
  grecaptcha?: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
}
