import { apiFetch } from '@/lib/api/client';

// window.grecaptcha is typed in types/google-maps.d.ts.

let siteKeyPromise: Promise<string> | null = null;
let loadPromise: Promise<void> | null = null;

// Fetched from the backend (appsettings "Recaptcha:SiteKey") rather than duplicated in this
// project's own .env — one source of truth to update. See
// Zajel.PrePaid.Api/Endpoints/Auth/GetRecaptchaConfig.cs. Only the public SITE key is ever
// exposed this way; the secret that verifies tokens stays server-side.
function fetchSiteKey(): Promise<string> {
  if (!siteKeyPromise) {
    siteKeyPromise = apiFetch('/api/auth/recaptcha-config', { skipAuthRetry: true })
      .then(async (response) => {
        if (!response.ok) throw new Error('recaptcha-config-failed');
        const data = (await response.json()) as { siteKey: string };
        if (!data.siteKey) throw new Error('recaptcha-config-missing-site-key');
        return data.siteKey;
      })
      .catch((err) => {
        siteKeyPromise = null; // allow retrying on the next call instead of caching a failure forever
        throw err;
      });
  }
  return siteKeyPromise;
}

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (window.grecaptcha?.execute) return Promise.resolve();

  if (!loadPromise) {
    loadPromise = new Promise<void>((resolve, reject) => {
      const existing = document.getElementById('recaptcha-js') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('load-failed')));
        return;
      }

      const script = document.createElement('script');
      script.id = 'recaptcha-js';
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('load-failed'));
      document.head.appendChild(script);
    });
  }
  return loadPromise;
}

/**
 * Obtains a reCAPTCHA v3 token for the given action (e.g. "otp_request") to send as
 * X-Recaptcha-Token to the backend's /api/auth/otp/request proxy, which forwards it to the
 * real Account/RequestOtp endpoint. The secret key that actually *verifies* this token lives
 * server-side only — the site key here is meant to be public.
 */
export async function getRecaptchaToken(action: string): Promise<string> {
  let siteKey: string;
  try {
    siteKey = await fetchSiteKey();
  } catch {
    throw new Error('Verification is temporarily unavailable. Please try again shortly.');
  }

  await loadRecaptchaScript(siteKey);
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window.grecaptcha!.execute(siteKey, { action }).then(resolve).catch(reject);
    });
  });
}
