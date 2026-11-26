import 'server-only';
import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

// One line per call through the /services/prepaid/* proxy, so slow or failing backend calls
// (e.g. shipment confirm during payment) can be measured from the server's filesystem:
//
//   2026-11-09T06:12:03.481Z POST /services/prepaid/api/shipments/confirm 502 30012ms error=timeout
//
// Written to logs/prepaid-proxy-YYYY-MM-DD.log (UTC date, one file per day) next to
// runtime-config.log — see lib/config/prepaidApiTarget.ts for where logs/ lives. Never served
// over HTTP. Only the path is logged: the query string (reference numbers, etc.), headers and
// bodies are left out so no customer data, tokens or card details end up on disk.
const logDir = join(process.cwd(), 'logs');
let dirReady: Promise<unknown> | null = null;

export function logProxyRequest(entry: { method: string; path: string; status: number; ms: number; error?: string }) {
  const at = new Date();
  const line = `${at.toISOString()} ${entry.method} ${entry.path} ${entry.status} ${Math.round(entry.ms)}ms${entry.error ? ` error=${entry.error}` : ''}\n`;
  const file = join(logDir, `prepaid-proxy-${at.toISOString().slice(0, 10)}.log`);

  // Fire-and-forget: logging must never slow down or break the request it describes.
  dirReady ??= mkdir(logDir, { recursive: true });
  void dirReady
    .then(() => appendFile(file, line))
    .catch((err) => {
      console.error('[prepaid proxy] Could not write request log:', err instanceof Error ? err.message : err);
    });
}
