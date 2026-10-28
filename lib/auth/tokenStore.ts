// Tiny external store for the signed-in user's access token — plain module state (not React
// state) so lib/api/client.ts can read the current token synchronously outside of any
// component. AuthProvider subscribes via useSyncExternalStore to expose reactive auth state.
//
// Also doubles as the OTP-login session: Zajel.ZAPP.API's Account/VerifyOtp issues its OWN JWT
// directly (see hooks/useAuth.ts verifyOtp). When the phone is OTP-verified but not yet a
// registered account, Zajel still returns 200 with an EMPTY token — represented here with
// accessToken: '' (so the API client never attaches an Authorization header for it) while still
// carrying `phone`/`isRegistered` so the UI can show a "finish your profile" state.
//
// SSR note: localStorage only exists in the browser. State is loaded lazily on first client
// access, and getServerSnapshot() always returns null so server HTML and the first client
// render (hydration) agree.

export interface TokenState {
  accessToken: string;
  expiresAtUtc: string;
  email: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  isRegistered?: boolean;
}

const STORAGE_KEY = 'zajel_session';

type Listener = () => void;

const isBrowser = typeof window !== 'undefined';

function loadFromStorage(): TokenState | null {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TokenState) : null;
  } catch {
    return null;
  }
}

let loaded = false;
let state: TokenState | null = null;
const listeners = new Set<Listener>();

function ensureLoaded(): void {
  if (loaded || !isBrowser) return;
  loaded = true;
  state = loadFromStorage();
}

function isValid(current: TokenState | null): boolean {
  return !!current && !!current.accessToken && Date.parse(current.expiresAtUtc) - Date.now() > 0;
}

export const tokenStore = {
  get(): TokenState | null {
    ensureLoaded();
    return state;
  },
  getServerSnapshot(): TokenState | null {
    return null;
  },
  set(next: TokenState | null): void {
    loaded = true;
    state = next;
    if (isBrowser) {
      try {
        if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        else window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // localStorage unavailable (private browsing etc.) — session just won't survive a reload.
      }
    }
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getAccessToken(): string | null {
    ensureLoaded();
    return isValid(state) ? state!.accessToken : null;
  },
};
