#!/usr/bin/env node

// Loads KEY=VALUE pairs from an .env-style file into process.env, then runs the Next.js CLI.
// Used by the build:staging/start:staging npm scripts — see .env.staging's own header comment.
// No external dependency (e.g. dotenv) needed for a format this simple.
//
//   node scripts/build-env.mjs build .env.staging
//     Loads every var from the file, then runs `next build`. NEXT_PUBLIC_* vars get baked into
//     the client bundle at this point, same as any other `next build` — use this whenever a
//     NEXT_PUBLIC_* value actually changed (e.g. a different API base URL).
//
//   node scripts/build-env.mjs start .env.staging
//     Loads only the server-only vars (anything NOT prefixed NEXT_PUBLIC_) from the file, then
//     runs `next start` against the EXISTING build in .next/. NEXT_PUBLIC_* vars are already
//     compiled into that build's client bundle and can't change without a rebuild — this just
//     lets an already-built artifact talk to a different backend (e.g. PREPAID_API_PROXY_TARGET)
//     without rebuilding.

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const [, , mode, envFileArg] = process.argv;

if ((mode !== 'build' && mode !== 'start') || !envFileArg) {
  console.error('Usage: node scripts/build-env.mjs <build|start> <path-to-env-file>');
  process.exit(1);
}

const envPath = resolve(process.cwd(), envFileArg);
if (!existsSync(envPath)) {
  console.error(`[build-env] Env file not found: ${envPath}`);
  process.exit(1);
}

/** Minimal .env parser — KEY=VALUE per line, '#' comments/blank lines skipped, optional quotes. */
function parseEnvFile(filePath) {
  const vars = {};
  for (const rawLine of readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) vars[key] = value;
  }
  return vars;
}

const fileVars = parseEnvFile(envPath);
const isPublic = (key) => key.startsWith('NEXT_PUBLIC_');
const varsToApply = mode === 'build' ? fileVars : Object.fromEntries(Object.entries(fileVars).filter(([key]) => !isPublic(key)));

if (mode === 'start') {
  const skipped = Object.keys(fileVars).filter(isPublic);
  if (skipped.length > 0) {
    console.log(`[build-env] start mode — NOT re-applying NEXT_PUBLIC_* vars (already baked into the build): ${skipped.join(', ')}`);
  }
}

console.log(`[build-env] Loaded ${Object.keys(varsToApply).length} var(s) from ${envFileArg} for \`next ${mode}\`.`);

const result = spawnSync('npx', ['next', mode], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, ...varsToApply },
});

process.exit(result.status ?? 1);
