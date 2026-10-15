import { clientEnv } from './env';
import { tokenStore } from '@/lib/auth/tokenStore';

interface RefreshResponse {
  accessToken: string;
  expiresAtUtc: string;
  email: string | null;
}

let refreshPromise: Promise<boolean> | null = null;

/**
 * Silently refreshes the access token via the httpOnly refresh-token cookie. De-duped so
 * concurrent 401s only trigger one refresh call (same behaviour as the old React app and
 * zajel_site_new_angular's TokenService).
 */
export async function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${clientEnv.apiBaseUrl}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!response.ok) {
          // Don't wipe a still-pending OTP registration (accessToken '') on a failed refresh.
          if (tokenStore.get()?.accessToken) tokenStore.set(null);
          return false;
        }
        const data = (await response.json()) as RefreshResponse;
        tokenStore.set(data);
        return true;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

export interface ApiFetchOptions extends RequestInit {
  /** Skip the automatic refresh-and-retry-once on 401 (used by the auth endpoints themselves). */
  skipAuthRetry?: boolean;
}

function withAuthHeader(headers: HeadersInit | undefined): Headers {
  const result = new Headers(headers);
  const token = tokenStore.getAccessToken();
  if (token) result.set('Authorization', `Bearer ${token}`);
  return result;
}

/**
 * fetch() wrapper for Zajel.PrePaid.Api: attaches the bearer token, sends cookies (needed for
 * the refresh-token cookie), and retries once via a silent refresh on a 401 — except for the
 * auth endpoints themselves, to avoid a refresh-retry loop on login/refresh/logout.
 *
 * Browser-only: call it from client components / effects, never during server rendering.
 */
export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<Response> {
  const isAuthEndpoint = path.includes('/api/auth/');
  const { skipAuthRetry, ...init } = options;

  const response = await fetch(`${clientEnv.apiBaseUrl}${path}`, {
    ...init,
    headers: withAuthHeader(init.headers),
    credentials: 'include',
  });

  if (response.status === 401 && !isAuthEndpoint && !skipAuthRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return fetch(`${clientEnv.apiBaseUrl}${path}`, {
        ...init,
        headers: withAuthHeader(init.headers),
        credentials: 'include',
      });
    }
  }

  return response;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function readErrorBody(response: Response): Promise<{ message?: string; code?: string }> {
  try {
    return (await response.json()) as { message?: string; code?: string };
  } catch {
    return {};
  }
}

/** JSON convenience wrapper around apiFetch — throws ApiError on non-2xx responses. */
export async function apiJson<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await apiFetch(path, { ...options, headers });

  if (!response.ok) {
    const body = await readErrorBody(response);
    throw new ApiError(response.status, body.message ?? `Request failed with status ${response.status}`, body.code);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}
