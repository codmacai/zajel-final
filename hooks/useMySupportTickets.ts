'use client';

import { useCallback, useState } from 'react';
import { apiJson, ApiError } from '@/lib/api/client';
import { tokenStore } from '@/lib/auth/tokenStore';

/** One row of GET /api/support/tickets — our own local record of a ticket raised via the
 * Support page's form (see SupportService.GetMyTicketsAsync in Zajel.PrePaid.Api), not a
 * Freshdesk passthrough. */
export interface SupportTicketSummary {
  id: number;
  freshdeskTicketId: number | null;
  subject: string;
  ticketType: string;
  referenceNumber: string | null;
  success: boolean;
  createdAtUtc: string;
}

const GENERIC_ERROR = 'Could not load your support tickets right now. Please try again.';

/**
 * GET /api/support/tickets — lists the signed-in user's own previously-raised tickets
 * (matched by their account's phone number). Call `refresh()` again after submitting a new
 * ticket to pick it up.
 */
export function useMySupportTickets() {
  const [tickets, setTickets] = useState<SupportTicketSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!tokenStore.getAccessToken()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiJson<SupportTicketSummary[]>('/api/support/tickets');
      setTickets(result);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  return { tickets, loading, error, refresh };
}
