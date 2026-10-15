const STORAGE_KEY = 'zajel_device_id';

/**
 * A stable, anonymous per-browser identifier sent as VerifyOtp's `deviceId` — persisted in
 * localStorage so it survives reloads (but is scoped to this browser only; it's not a
 * fingerprint of any kind, just a random value we generate once and reuse).
 */
export function getDeviceId(): string {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
