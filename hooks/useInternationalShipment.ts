'use client';

import { useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import { tokenStore } from '@/lib/auth/tokenStore';
import type {
  InternationalConfirmShipmentResult,
  InternationalCreateShipmentResult,
  InternationalPaymentLinkResult,
  RateCardRequest,
  RateCardResult,
} from '@/types/shipment';

const SIGN_IN_ERROR = 'You need to be signed in to book an international shipment.';

/**
 * POST /api/international/rate-card — the backend proxies this to the real
 * International/GetRateCard endpoint server-side. See InternationalShipmentService.
 */
export function useRateCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRateCard = async (payload: RateCardRequest): Promise<RateCardResult | null> => {
    setLoading(true);
    setError(null);
    try {
      return await apiJson<RateCardResult>('/api/international/rate-card', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not fetch a rate for this route. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getRateCard, loading, error };
}

/**
 * POST /api/international/shipments — the backend proxies this to the real
 * International/CreateShipment endpoint server-side (needs a Bearer token +
 * X-AUTH-API-KEY that must never ship in browser JS). The request body is sent in the real
 * API's own shape directly (see the confirmed curl) — there's no intermediate DTO here.
 */
export function useCreateInternationalShipment() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Set for quote problems (QUOTE_EXPIRED / QUOTE_ALREADY_USED / …) so the wizard can re-quote.
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const createShipment = async (payload: Record<string, unknown>): Promise<InternationalCreateShipmentResult | null> => {
    setSubmitting(true);
    setError(null);
    setErrorCode(null);

    if (!tokenStore.getAccessToken()) {
      setError(SIGN_IN_ERROR);
      setSubmitting(false);
      return null;
    }

    try {
      return await apiJson<InternationalCreateShipmentResult>('/api/international/shipments', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong creating your shipment. Please try again.');
      setErrorCode(err instanceof ApiError ? err.code ?? null : null);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return { createShipment, submitting, error, errorCode };
}

/**
 * POST /api/international/shipments/confirm — after payment: CRM verifies the payment with the
 * gateway and books the shipment (with the quoted pieces) with Shipsy, returning the final AWB.
 * Proxies to the real International/ConfirmInternationalShipment endpoint.
 */
export function useConfirmInternationalShipment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmShipment = async (shipmentId: number): Promise<InternationalConfirmShipmentResult | null> => {
    setLoading(true);
    setError(null);
    try {
      return await apiJson<InternationalConfirmShipmentResult>('/api/international/shipments/confirm', {
        method: 'POST',
        body: JSON.stringify({ id: shipmentId }),
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'We received your payment but could not confirm the shipment yet. Please contact support.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { confirmShipment, loading, error };
}

/**
 * POST /api/international/shipments/payment-link — generates the hosted payment page URL for
 * a just-created international shipment (by id). Proxies to the real
 * International/GeneratePaymentLink endpoint.
 */
export function useGenerateInternationalPaymentLink() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePaymentLink = async (shipmentId: number): Promise<InternationalPaymentLinkResult | null> => {
    setLoading(true);
    setError(null);
    try {
      return await apiJson<InternationalPaymentLinkResult>('/api/international/shipments/payment-link', {
        method: 'POST',
        body: JSON.stringify({ id: shipmentId }),
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not generate a payment link. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generatePaymentLink, loading, error };
}
