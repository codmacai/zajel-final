/**
 * Reads the post-login destination from the query string. Accepts both `returnUrl` (used by
 * the ported React flow) and `next` (used by the Next.js UI's links), and only allows
 * same-site relative paths so /login can't be used as an open redirect.
 */
export function getSafeReturnUrl(params: URLSearchParams | null, fallback = '/account'): string {
  const raw = params?.get('returnUrl') ?? params?.get('next') ?? '';
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/\\')) return fallback;
  return raw;
}

export function loginHref(returnTo: string): string {
  return `/login?returnUrl=${encodeURIComponent(returnTo)}`;
}
