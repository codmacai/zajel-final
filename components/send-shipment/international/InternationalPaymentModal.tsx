'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ExternalLink, Loader2, ShieldCheck, X } from 'lucide-react';

export type InternationalPaymentOutcome = 'success' | 'failure' | 'cancelled';

interface InternationalPaymentModalProps {
  paymentUrl: string;
  onOutcome: (outcome: InternationalPaymentOutcome, message?: string) => void;
}

const URL_WATCH_INTERVAL_MS = 500;
const RETURN_PAGE_CLOSE_DELAY_MS = 3000;

interface NoqodiVerifyResponse {
  statusInfo?: {
    status?: string;
    errorCode?: { message?: string; metaData?: { errorDetails?: { customerMessage?: string } } };
  };
}

// Same technique as components/shipment/PaymentModal.tsx's tryReadPopupVerifyResponse — but
// international has NO confirm-shipment endpoint to poll afterwards (see the real
// CreateShipment -> GeneratePaymentLink curl flow, with nothing after it), so this is the
// ONLY signal we get. Unlike the domestic flow, success here is taken from the gateway's own
// return page directly rather than independently re-verified server-side — there's currently
// no server-side endpoint to do that verification against for international.
function tryReadPopupVerifyResponse(popup: Window): { isSuccess: boolean; message?: string } | null {
  let href: string;
  try {
    href = popup.location.href;
  } catch {
    return null; // still cross-origin, on the gateway's own domain
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
      : parsed.statusInfo?.errorCode?.metaData?.errorDetails?.customerMessage ??
        parsed.statusInfo?.errorCode?.message ??
        'Your payment could not be completed.';
    return { isSuccess, message };
  } catch {
    return null;
  }
}

export default function InternationalPaymentModal({ paymentUrl, onOutcome }: InternationalPaymentModalProps) {
  const [status, setStatus] = useState<'idle' | 'waiting' | 'blocked'>('idle');
  const popupRef = useRef<Window | null>(null);
  const settledRef = useRef(false);

  const settle = (outcome: InternationalPaymentOutcome, message?: string) => {
    if (settledRef.current) return;
    settledRef.current = true;
    onOutcome(outcome, message);
  };

  const openPaymentTab = () => {
    const popup = window.open(paymentUrl, 'zajel-international-payment', 'width=500,height=760,noopener=no');
    popupRef.current = popup;
    setStatus(popup ? 'waiting' : 'blocked');
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    openPaymentTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch the popup's own URL for the return to our origin, and also notice if the user just
  // closes it without ever reaching a known outcome (treated as cancelled).
  useEffect(() => {
    if (status !== 'waiting') return undefined;

    const intervalId = window.setInterval(() => {
      if (settledRef.current) return;
      const popup = popupRef.current;
      if (!popup || popup.closed) {
        settle('cancelled');
        return;
      }

      const verifyResult = tryReadPopupVerifyResponse(popup);
      if (!verifyResult) return;

      window.setTimeout(() => {
        popup.close();
        settle(verifyResult.isSuccess ? 'success' : 'failure', verifyResult.message);
      }, RETURN_PAGE_CLOSE_DELAY_MS);
    }, URL_WATCH_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
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
              <p className="text-[14px] text-[#064423]">Opening secure payment in a new tab…</p>
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
              <button
                onClick={openPaymentTab}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-[#064423]/70 font-semibold text-[13px] hover:border-gray-400 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Reopen payment tab
              </button>
            </>
          )}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 text-[11px] text-[#064423]/45 text-center shrink-0">
          <CheckCircle2 className="inline h-3 w-3 mr-1 text-[#36B936]" aria-hidden="true" />
          You&apos;ll see a confirmation here once the payment provider reports a result.
        </div>
      </div>
    </div>
  );
}
