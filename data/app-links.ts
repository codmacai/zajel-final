// Official Zajel app store links (same as the React app's platformredirect.html / qr.html).
export const APP_LINKS = {
  appStore: 'https://apps.apple.com/ae/app/zajel-logistics-services/id6739629287',
  playStore: 'https://play.google.com/store/apps/details?id=com.zajel.app',
  /** Detects the device and opens the right store (falls back to the website on desktop). */
  smart: '/platformredirect.html',
} as const;
