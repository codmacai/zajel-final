// Renews an expired admin session from the refresh cookie, then returns to the page.

import { NextResponse, type NextRequest } from 'next/server';
import { clearSession, refreshSession, safeNext } from '@/lib/cms/auth';

export async function GET(request: NextRequest) {
  const next = safeNext(request.nextUrl.searchParams.get('next'));
  if (await refreshSession()) return NextResponse.redirect(new URL(next, request.url));
  await clearSession();
  return NextResponse.redirect(new URL(`/admin/login?next=${encodeURIComponent(next)}`, request.url));
}
