'use client';

import { useState } from 'react';
import { apiFetch, ApiError } from '@/lib/api/client';

export interface SupportTicketPayload {
  subject: string;
  description: string;
  ticketType: string;
  mobile: string;
  email: string;
  referenceNumber: string;
  attachments: File[];
  /** reCAPTCHA v3 token from getRecaptchaToken('support_ticket_submit') — verified
   * server-side now (see RecaptchaVerificationService in Zajel.PrePaid.Api). Required: it's
   * the only bot defense left now that submitting doesn't require being signed in. */
  recaptchaToken: string;
}

const GENERIC_ERROR = 'Something went wrong submitting your ticket. Please try again.';

/** What a successful submit returns. `ticketId` is the Freshdesk ticket number the customer
 * quotes to follow up — null only if the backend's response didn't include one. */
export interface SubmitTicketResult {
  ticketId: number | null;
}

/** POST /api/support/tickets responds `{ success, message, ticketId, data }`. Only `ticketId`
 * is used — `data` is the raw Freshdesk payload and arrives with every field emptied. */
function readTicketId(body: unknown): number | null {
  if (!body || typeof body !== 'object') return null;
  const raw = (body as { ticketId?: unknown }).ticketId;
  const id = typeof raw === 'string' ? Number(raw) : raw;
  return typeof id === 'number' && Number.isFinite(id) && id > 0 ? id : null;
}

/**
 * POST /api/support/tickets (ported from Zajel-2). The backend proxies this multipart request,
 * attachments included, to the real CreateSupportTicketWithAttachment endpoint server-side —
 * that endpoint needs a Bearer token + X-AUTH-API-KEY that must never ship in browser JS.
 *
 * Signing in via OTP is no longer required — a logged-out visitor can submit too (the backend
 * forwards a narrow guest credential instead of a Bearer token in that case; see
 * SupportService.CreateTicketAsync). Mobile/Email default to the signed-in user's own
 * number/profile email when signed in; both are mandatory when not (RaiseTicketForm.tsx
 * enforces this since there's no account to fall back on server-side).
 * Product/Issue Related To are still hidden; GroupId/Source/Tags/CcEmails/CustomerCode stay
 * hardcoded server-side — see SupportService in Zajel.PrePaid.Api.
 */
export function useSubmitSupportTicket() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Resolves to the result on success, or null on failure (the message is in `error`). */
  const submitTicket = async (payload: SupportTicketPayload): Promise<SubmitTicketResult | null> => {
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('Subject', payload.subject);
    formData.append('Description', payload.description);
    formData.append('TicketType', payload.ticketType);
    if (payload.mobile) formData.append('Mobile', payload.mobile);
    if (payload.email) formData.append('Email', payload.email);
    if (payload.referenceNumber) formData.append('ReferenceNumber', payload.referenceNumber);
    formData.append('RecaptchaToken', payload.recaptchaToken);
    payload.attachments.forEach((file) => formData.append('Attachments', file));

    try {
      // No Content-Type header — the browser adds the multipart boundary itself
      // (apiJson would force application/json, which breaks this).
      const response = await apiFetch('/api/support/tickets', { method: 'POST', body: formData });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new ApiError(response.status, body?.message ?? GENERIC_ERROR);
      }
      const body: unknown = await response.json().catch(() => null);
      return { ticketId: readTicketId(body) };
    } catch (err) {
      setError(err instanceof ApiError ? err.message : GENERIC_ERROR);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  return { submitTicket, submitting, error, clearError };
}
