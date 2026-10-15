import type { NextRequest } from 'next/server';
import https from 'node:https';
import http from 'node:http';

// Same-origin proxy for Zajel.PrePaid.Api — replaces the Zajel-2 Vite dev proxy
// (vite.config.ts '/services/prepaid' with changeOrigin + secure:false).
//
// In `next dev` the browser calls /services/prepaid/* on this site and this handler forwards
// it to the backend, so the refresh-token cookie is first-party. Target:
//   - PREPAID_API_PROXY_TARGET if set (e.g. https://api-stg.zajel.com:7861)
//   - otherwise https://localhost:7115 in dev (local Zajel.PrePaid.Api)
//   - otherwise https://api.zajel.com
// Like Vite's `secure: false`, a self-signed certificate is accepted — but ONLY for
// localhost/127.0.0.1 targets (the local .NET dev cert).

export const dynamic = 'force-dynamic';

const isDev = process.env.NODE_ENV === 'development';
const TARGET = (process.env.PREPAID_API_PROXY_TARGET || (isDev ? 'https://api.zajel.com' : 'https://api.zajel.com')).replace(/\/+$/, '');

const HOP_BY_HOP = new Set(['connection', 'keep-alive', 'transfer-encoding', 'upgrade', 'host', 'content-length', 'accept-encoding']);

async function proxy(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }): Promise<Response> {
  const { path } = await ctx.params;
  const target = new URL(`${TARGET}/services/prepaid/${path.map(encodeURIComponent).join('/')}${request.nextUrl.search}`);
  const isLocal = ['localhost', '127.0.0.1', '::1'].includes(target.hostname);

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) headers[key] = value;
  });
  headers.host = target.host; // changeOrigin

  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : Buffer.from(await request.arrayBuffer());
  if (body) headers['content-length'] = String(body.length);

  const transport = target.protocol === 'https:' ? https : http;

  return new Promise<Response>((resolve) => {
    const upstream = transport.request(
      target,
      {
        method: request.method,
        headers,
        rejectUnauthorized: !isLocal,
        timeout: 30_000,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => {
          const out = new Headers();
          for (const [key, value] of Object.entries(res.headers)) {
            if (value === undefined || HOP_BY_HOP.has(key)) continue;
            if (Array.isArray(value)) value.forEach((v) => out.append(key, v));
            else out.set(key, String(value));
          }
          const status = res.statusCode ?? 502;
          const noBody = status === 204 || status === 304 || request.method === 'HEAD';
          resolve(new Response(noBody ? null : Buffer.concat(chunks), { status, headers: out }));
        });
      },
    );
    upstream.on('timeout', () => upstream.destroy(new Error('timeout')));
    upstream.on('error', (err) => {
      console.error(`[prepaid proxy] ${request.method} ${target.href} failed:`, err.message);
      resolve(
        Response.json(
          { message: `Could not reach the Zajel API at ${TARGET}. Is it running?` },
          { status: 502 },
        ),
      );
    });
    if (body) upstream.write(body);
    upstream.end();
  });
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };
