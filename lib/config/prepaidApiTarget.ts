import 'server-only';
import { appendFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Single source of truth for which Zajel.PrePaid.Api host the same-origin proxy
// (app/services/prepaid/[...path]/route.ts) forwards to.
//
// Resolution order:
//   - PREPAID_API_PROXY_TARGET if explicitly set (.env.production / .env.staging / .env.local —
//     see those files; this is the path every real deploy should use, nothing implicit)
//   - otherwise https://localhost:7115 in dev (local Zajel.PrePaid.Api)
//   - otherwise https://api.zajel.com — a safety-net default ONLY, so a deploy that forgot to
//     ship .env.production still fails safe to production rather than refusing to start
//
// IMPORTANT: this is read once, from whatever the server process's env vars are AT STARTUP —
// not baked in at build time for anything other than NEXT_PUBLIC_* vars. The browser has NO way
// to see this (it only ever calls the relative /services/prepaid/* path, same as every
// environment) — which is exactly the point, but it also means the only way to confirm what a
// running deploy is actually pointed at is server-side. See runtime-config.log below.
const isDev = process.env.NODE_ENV === 'development';

export const PREPAID_API_TARGET_SOURCE: 'env:PREPAID_API_PROXY_TARGET' | 'default:dev' | 'default:production' =
  process.env.PREPAID_API_PROXY_TARGET ? 'env:PREPAID_API_PROXY_TARGET' : isDev ? 'default:dev' : 'default:production';

export const PREPAID_API_TARGET = (
  process.env.PREPAID_API_PROXY_TARGET || (isDev ? 'https://localhost:7115' : 'https://api.zajel.com')
).replace(/\/+$/, '');

// Appended once per server process start (cold start / restart) to a plain file on disk — NOT
// an HTTP endpoint, so it's never reachable by a browser or anyone outside direct filesystem
// access to the host. Lives under logs/ next to wherever the process actually runs from
// (.next/standalone/ in the deployed standalone build, the repo root in `next dev`/`next start`)
// — nothing under public/ or .next/static/, so Next never serves it over HTTP either way.
// Open logs/runtime-config.log directly on the server after any deploy to confirm which backend
// it's actually proxying to before trusting it with real traffic.
try {
  const logDir = join(process.cwd(), 'logs');
  mkdirSync(logDir, { recursive: true });
  const line = `${new Date().toISOString()} NODE_ENV=${process.env.NODE_ENV ?? '(unset)'} target=${PREPAID_API_TARGET} source=${PREPAID_API_TARGET_SOURCE} pid=${process.pid}\n`;
  appendFileSync(join(logDir, 'runtime-config.log'), line);
} catch (err) {
  // Never let a logging failure (e.g. read-only filesystem) take the server down over this.
  console.error('[prepaid proxy] Could not write logs/runtime-config.log:', err instanceof Error ? err.message : err);
}
