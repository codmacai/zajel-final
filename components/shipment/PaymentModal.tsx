'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ExternalLink, Loader2, ShieldCheck, X } from 'lucide-react';
import { apiJson, ApiError } from '@/lib/api/client';
import type { ConfirmShipmentResult, PaymentOutcome } from '@/types/shipment';

interface PaymentModalProps {
  paymentUrl: string;
  referenceNumber: string;
  onOutcome: (outcome: PaymentOutcome, result?: ConfirmShipmentResult, message?: string) => void;
}

const POLL_INTERVAL_MS = 8000;
const MAX_WAIT_MS = 10 * 60 * 1000; // 10 min — matches a generous real-world payment session

const URL_WATCH_INTERVAL_MS = 500;
// How long to leave the return page (public/PaymentStatus/Verify.html) open/visible in the
// popup after we've detected it — matches that page's own "please do not close the page"
// messaging — before we close the popup ourselves and move on.
const RETURN_PAGE_CLOSE_DELAY_MS = 3000;

// We can't read the popup's URL (or anything else) while it's on Noqodi's/the bank's domain —
// browsers flatly block that cross-origin. BUT Noqodi eventually redirects back to OUR OWN
// origin at /PaymentStatus/Verify (see public/PaymentStatus/Verify.html, served there by a
// rewrite in next.config.js) — once that happens the popup is same-origin with us again, so
// `popup.location.href` becomes readable. That page embeds the full payment result as a
// `response` query param, which is how we know success/failure immediately instead of
// waiting on blind polling.
function logPayment(event: string, detail?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_DEBUG_PAYMENTS) return;
  console.log(`[PaymentModal] ${new Date().toISOString()} — ${event}`, detail ?? '');
}

interface NoqodiVerifyResponse {
  statusInfo?: {
    status?: string;
    errorCode?: {
      message?: string;
      metaData?: { errorDetails?: { customerMessage?: string } };
    };
  };
}

// Returns null while the popup is still cross-origin (on Noqodi/the bank's domain — expected,
// not an error) or hasn't reached /PaymentStatus/Verify yet. Only returns non-null once we can
// actually read and parse that return URL's `response` param.
function tryReadPopupVerifyResponse(popup: Window): { isSuccess: boolean; message?: string } | null {
  let href: string;
  try {
    href = popup.location.href;
  } catch {
    return null; // still cross-origin
  }
  if (!href) return null;

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin || !url.pathname.toLowerCase().startsWith('/paymentstatus/verify')) {
    return null;
  }

  const rawResponse = url.searchParams.get('response');
  if (!rawResponse) return null;

  try {
    const parsed = JSON.parse(rawResponse) as NoqodiVerifyResponse;
    const isSuccess = parsed.statusInfo?.status?.toUpperCase() === 'SUCCESS';
    const message = isSuccess
      ? undefined
      : parsed.statusInfo?.errorCode?.metaData?.errorDetails?.customerMessage
        ?? parsed.statusInfo?.errorCode?.message
        ?? 'Your payment could not be completed.';
    return { isSuccess, message };
  } catch {
    return null;
  }
}

/**
 * Security/architecture notes (read before changing this file):
 *  - This does NOT embed the payment page in an iframe. The real Noqodi return page
 *    (confirmed from Zajel's own source) relies on `window.opener` and only ever
 *    `postMessage`s to a hardcoded allowlist of Zajel's own origins (bk.zajel.com,
 *    zfze.zajel.com, dashboard.zajel.com:6565) — our origin can never receive that message,
 *    iframe or not, and embedding it as an iframe additionally trips Chrome's Private Network
 *    Access protection (the hosted payment page makes its own calls that get blocked when
 *    loaded as a cross-origin iframe subresource on a public page).
 *  - So the payment page opens in a real new tab/window, and THIS component is the one
 *    polling POST /api/shipments/confirm until it succeeds — never trusting anything the
 *    popup/opener relationship could tell us even if it could. The server independently
 *    re-verifies payment with Noqodi before ever confirming a shipment.
 *  - A `postMessage` listener below is purely a latency optimization (trigger an immediate
 *    confirm check instead of waiting for the next poll tick) IF that staging/production
 *    return page is ever configured to target our origin — we deliberately do NOT branch on
 *    the message's contents (e.g. trust a "SUCCESS" status in the payload directly), only use
 *    its arrival as a hint to check sooner. The polling loop is the real safety net regardless.
 *  - The fire-once guard (`settledRef`) stops us from ever calling onOutcome twice.
 */
export default function PaymentModal({ paymentUrl, referenceNumber, onOutcome }: PaymentModalProps) {
  // We try to open the payment tab immediately on mount for a seamless flow — this still
  // happens within the same user gesture (the "Proceed to Payment" click) in practice, since
  // shipment creation typically resolves fast. If the browser blocks it anyway (no gesture
  // left, strict popup settings, etc.) we fall back to the 'blocked' state below, which gives
  // the user an explicit button click to retry — that one is guaranteed to be allowed.
  const [status, setStatus] = useState<'idle' | 'waiting' | 'blocked'>('idle');
  const [checking, setChecking] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const settledRef = useRef(false);
  const pollTimeoutRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  // Set once we've read a definitive result off the popup's own URL (see
  // tryReadPopupVerifyResponse) — lets the generic poll loop below tell "we closed the popup
  // ourselves after a known-successful return" apart from "the user closed it early/gave up".
  const knownOutcomeRef = useRef<'success' | 'failure' | null>(null);
  const verifyUrlHandledRef = useRef(false);

  const settle = (outcome: PaymentOutcome, result?: ConfirmShipmentResult, message?: string) => {
    if (settledRef.current) return;
    settledRef.current = true;
    logPayment('settled', { outcome, referenceNumber, awb: result?.awb, message });
    if (pollTimeoutRef.current) window.clearTimeout(pollTimeoutRef.current);
    onOutcome(outcome, result, message);
  };

  const openPaymentTab = () => {
    logPayment('opening payment tab', { paymentUrl, referenceNumber });
    const popup = window.open(paymentUrl, 'zajel-payment', 'width=500,height=760,noopener=no');
    popupRef.current = popup;
    if (popup && !startedAtRef.current) startedAtRef.current = Date.now();
    logPayment(popup ? 'popup opened' : 'popup BLOCKED by browser');
    setStatus(popup ? 'waiting' : 'blocked');
  };

  const checkConfirmation = async (): Promise<boolean> => {
    setChecking(true);
    logPayment('checking confirm with our server', { referenceNumber });
    try {
      const result = await apiJson<ConfirmShipmentResult>(
        `/api/shipments/confirm?referenceNumber=${encodeURIComponent(referenceNumber)}`,
        { method: 'POST' },
      );
      logPayment('confirm SUCCEEDED', { awb: result.awb });
      settle('success', result);
      return true;
    } catch (err) {
      // 404/401 are terminal — the shipment/session itself is invalid, no amount of waiting
      // fixes that. Anything else (502 etc.) means "payment not confirmed yet" — keep polling;
      // the server already re-tries against Noqodi internally before returning that.
      const status = err instanceof ApiError ? err.status : undefined;
      if (err instanceof ApiError && (err.status === 404 || err.status === 401)) {
        logPayment('confirm TERMINAL FAILURE', { status, message: err.message });
        settle('failure');
        return true;
      }
      logPayment('confirm not ready yet, will keep polling', { status, message: err instanceof Error ? err.message : String(err) });
      return false;
    } finally {
      setChecking(false);
    }
  };

  // Auto-open the payment tab as soon as this modal mounts — no extra click required.
  useEffect(() => {
    // Opening the payment window IS the external side effect; its status update follows it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    openPaymentTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== 'waiting') return undefined;

    const tick = async () => {
      if (settledRef.current) return;

      if (Date.now() - startedAtRef.current > MAX_WAIT_MS) {
        logPayment('max wait time exceeded, giving up', { waitedMs: Date.now() - startedAtRef.current });
        settle('failure');
        return;
      }

      const popupClosed = !popupRef.current || popupRef.current.closed;
      logPayment('poll tick', { popupClosed });
      const confirmed = await checkConfirmation();
      if (confirmed || settledRef.current) return;

      if (popupClosed) {
        if (knownOutcomeRef.current === 'success') {
          // We closed the popup ourselves after reading a SUCCESS result off its own return
          // URL (see the URL-watch effect below) — keep polling confirm, this isn't the user
          // bailing out.
          logPayment('popup closed by us after a known-success return — still polling confirm');
          pollTimeoutRef.current = window.setTimeout(tick, POLL_INTERVAL_MS);
          return;
        }
        // User closed the payment tab without us ever seeing a success — treat as cancelled
        // rather than keep polling forever.
        logPayment('popup is closed and payment never confirmed — treating as cancelled');
        settle('cancelled');
        return;
      }

      pollTimeoutRef.current = window.setTimeout(tick, POLL_INTERVAL_MS);
    };

    pollTimeoutRef.current = window.setTimeout(tick, POLL_INTERVAL_MS);
    return () => {
      if (pollTimeoutRef.current) window.clearTimeout(pollTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Actively watch the popup's own URL (not just poll our server blindly) — once Noqodi
  // redirects it back to OUR origin at /PaymentStatus/Verify, we can read its `response` query
  // param directly and know immediately whether the payment succeeded or failed, rather than
  // waiting out the whole poll/timeout cycle to find out. Leaves the return page visible for
  // RETURN_PAGE_CLOSE_DELAY_MS (matches its own "please do not close this page" messaging)
  // before closing the popup ourselves.
  useEffect(() => {
    if (status !== 'waiting') return undefined;

    const intervalId = window.setInterval(() => {
      if (settledRef.current || verifyUrlHandledRef.current) return;
      const popup = popupRef.current;
      if (!popup || popup.closed) return;

      const verifyResult = tryReadPopupVerifyResponse(popup);
      if (!verifyResult) return; // still cross-origin or hasn't reached the return URL yet

      verifyUrlHandledRef.current = true;
      knownOutcomeRef.current = verifyResult.isSuccess ? 'success' : 'failure';
      logPayment('detected PaymentStatus/Verify URL in popup', verifyResult);

      window.setTimeout(() => {
        popup.close();
        if (verifyResult.isSuccess) {
          // Still never trust this directly — just prompt an immediate confirm check instead
          // of waiting for the next regular poll tick. The server independently re-verifies
          // with Noqodi before ever confirming (see checkConfirmation/ConfirmShipmentAsync).
          void checkConfirmation();
        } else {
          // The gateway itself told us this failed (declined card, invalid amount, etc.) —
          // definitively failed, nothing to confirm, no point waiting any further.
          settle('payment-failed', undefined, verifyResult.message);
        }
      }, RETURN_PAGE_CLOSE_DELAY_MS);
    }, URL_WATCH_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Optional fast-path: if the payment return page is ever configured to postMessage our
  // origin, react to it immediately instead of waiting for the next poll tick. We never trust
  // the message content itself — just use it to check sooner. Harmless no-op if it never
  // arrives (which is the default — see the class doc above).
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      // Logged regardless of origin/content — this is the one thing that WOULD tell us the
      // return page's postMessage actually reached us, if it ever does.
      logPayment('received window message', { origin: event.origin, data: event.data });
      if (settledRef.current || status !== 'waiting') return;
      void checkConfirmation();
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Payment"
    >
      <div className="relative w-full max-w-[440px] bg-white rounded-[1.5rem] shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 text-[#064423]">
            <ShieldCheck className="w-4 h-4 text-[#36B936]" />
            <span className="text-[13px] font-semibold">Secure Payment</span>
          </div>
          <button
            type="button"
            onClick={() => settle('cancelled')}
            aria-label="Cancel payment"
            className="p-1.5 rounded-full hover:bg-gray-100 text-[#064423]/45 hover:text-[#064423] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
          {status === 'idle' && (
            <>
              <div className="w-14 h-14 rounded-full bg-[#36B936]/10 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-[#36B936] animate-spin" />
              </div>
              <p className="text-[14px] text-[#064423]">
                Opening secure payment — we&apos;ll open the payment page in a new tab and check in the background, so you
                can come right back here.
              </p>
              <p className="text-[12px] text-[#064423]/45">Reference: {referenceNumber}</p>
            </>
          )}

          {status === 'blocked' && (
            <>
              <ExternalLink className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
              <p className="text-[14px] text-[#064423]">
                Your browser blocked the payment page from opening. Allow pop-ups for this site, then try again.
              </p>
              <button
                onClick={openPaymentTab}
                className="px-5 py-2.5 rounded-full bg-[#36B936] text-white font-semibold text-[14px] hover:bg-[#2EA32E] transition-all"
              >
                Open payment page
              </button>
            </>
          )}

          {status === 'waiting' && (
            <>
              <Loader2 className="w-8 h-8 text-[#36B936] animate-spin" />
              <p className="text-[14px] text-[#064423]">
                Complete your payment in the tab we just opened. We&apos;ll pick it up automatically — don&apos;t close this window.
              </p>
              <p className="text-[12px] text-[#064423]/45">Reference: {referenceNumber}</p>
              <div className="flex gap-3">
                <button
                  onClick={openPaymentTab}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-[#064423]/70 font-semibold text-[13px] hover:border-gray-400 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Reopen payment tab
                </button>
                <button
                  onClick={checkConfirmation}
                  disabled={checking}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#36B936] text-white font-semibold text-[13px] hover:bg-[#2EA32E] transition-all disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> {checking ? 'Checking…' : 'I’ve paid, check now'}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 text-[11px] text-[#064423]/45 text-center shrink-0">
          We independently verify your payment with the provider before confirming your shipment.
        </div>
      </div>
    </div>
  );
}
