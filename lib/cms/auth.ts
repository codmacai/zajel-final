import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, cmsConfigured } from './config';

export const ACCESS_COOKIE = 'zajel_cms_at';
export const REFRESH_COOKIE = 'zajel_cms_rt';
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;

export interface Admin {
  id: string;
  email: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: { id: string; email?: string };
}

function allowed(email: string): boolean {
  const list = (process.env.CMS_ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.length === 0 || list.includes(email.toLowerCase());
}

async function authRequest(path: string, init: RequestInit & { token?: string } = {}): Promise<Response> {
  const { token, headers, ...rest } = init;
  return fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    ...rest,
    cache: 'no-store',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  }).catch(() => new Response(null, { status: 503 }));
}

export function cookieOptions(maxAge: number) {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge };
}

export async function storeSession(tokens: TokenResponse) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, tokens.access_token, cookieOptions(tokens.expires_in));
  jar.set(REFRESH_COOKIE, tokens.refresh_token, cookieOptions(REFRESH_MAX_AGE));
}

export async function clearSession() {
  const jar = await cookies();
  const token = jar.get(ACCESS_COOKIE)?.value;
  if (token) recentlyChecked.delete(token);
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
}

export async function signIn(email: string, password: string): Promise<string | null> {
  if (!cmsConfigured) return 'Sign-in is not available right now. Please try again later.';
  if (!allowed(email)) return 'This email is not allowed to use the CMS. Ask an admin to add it.';
  const res = await authRequest('token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    if (res.status === 400) return 'That email and password don’t match. Check them and try again.';
    if (res.status === 429) return 'Too many attempts. Wait a minute, then try again.';
    if (res.status === 503) return 'Couldn’t connect. Please try again in a moment.';
    return `Couldn’t sign in (error ${res.status}). Try again in a moment.`;
  }
  await storeSession((await res.json()) as TokenResponse);
  return null;
}

export async function refreshSession(): Promise<boolean> {
  const jar = await cookies();
  const refresh = jar.get(REFRESH_COOKIE)?.value;
  if (!refresh || !cmsConfigured) return false;
  const res = await authRequest('token?grant_type=refresh_token', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refresh }),
  });
  if (!res.ok) return false;
  const tokens = (await res.json()) as TokenResponse;
  if (!allowed(tokens.user.email ?? '')) return false;
  await storeSession(tokens);
  return true;
}

const recentlyChecked = new Map<string, { admin: Admin; until: number }>();
const TRUST_MS = 60_000;

export const getAdmin = cache(async (): Promise<Admin | null> => {
  if (!cmsConfigured) return null;
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  const known = recentlyChecked.get(token);
  if (known && known.until > Date.now() && allowed(known.admin.email)) return known.admin;
  const res = await authRequest('user', { token });
  if (!res.ok) {
    recentlyChecked.delete(token);
    return null;
  }
  const user = (await res.json()) as { id: string; email?: string };
  if (!user.email || !allowed(user.email)) return null;
  const admin = { id: user.id, email: user.email };
  if (recentlyChecked.size > 200) recentlyChecked.clear();
  recentlyChecked.set(token, { admin, until: Date.now() + TRUST_MS });
  return admin;
});

export async function requireAdmin(returnTo = '/admin'): Promise<Admin> {
  const admin = await getAdmin();
  if (admin) return admin;
  const hasRefresh = Boolean((await cookies()).get(REFRESH_COOKIE)?.value);
  const next = encodeURIComponent(returnTo);
  redirect(hasRefresh ? `/admin/session?next=${next}` : `/admin/login?next=${next}`);
}

export const safeNext = (next: string | null | undefined) =>
  next && /^\/admin(\/[\w\-./]*)?$/.test(next) && !next.startsWith('/admin/login') ? next : '/admin';
