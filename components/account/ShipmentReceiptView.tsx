'use client';

import Link from 'next/link';
import { ArrowLeft, Loader2, Package, Printer } from 'lucide-react';
import { useShipmentReceipt } from '@/hooks/useShipmentReceipt';
import type { ShipmentReceiptParty } from '@/types/shipment';

const SHIPMENTS_HREF = '/account?tab=shipments';

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const labelClass = 'mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#064423]/45';

function Party({ title, party }: { title: string; party: ShipmentReceiptParty }) {
  return (
    <div>
      <p className={labelClass}>{title}</p>
      <p className="text-[14px] font-semibold text-[#064423]">{party.name}</p>
      <p className="mt-0.5 text-[13px] text-[#064423]/65">{party.address}</p>
      <p className="text-[13px] text-[#064423]/65">{[party.city, party.country].filter(Boolean).join(', ')}</p>
      <p className="mt-0.5 text-[13px] text-[#064423]/45">{party.phone}</p>
    </div>
  );
}

/**
 * Printable payment receipt (ported from Zajel-2's ShipmentReceiptPage). No PDF library — the
 * browser's own print dialog ("Save as PDF") produces the file; the print: utilities below
 * hide the on-screen controls from that output.
 */
export default function ShipmentReceiptView({ shipmentId }: { shipmentId: number | null }) {
  const { receipt, loading, error } = useShipmentReceipt(shipmentId);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 text-[14px] text-[#064423]/60" aria-busy="true">
        <Loader2 className="h-5 w-5 animate-spin text-[#36B936]" aria-hidden="true" /> Loading receipt…
      </div>
    );
  }

  if (error || !receipt) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <Package className="h-10 w-10 text-[#064423]/25" strokeWidth={1.5} aria-hidden="true" />
        <p className="text-[14px] text-[#064423]/60">{error ?? 'Receipt not found.'}</p>
        <Link href={SHIPMENTS_HREF} className="text-[13px] font-semibold text-[#36B936] hover:underline">
          Back to my shipments
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] px-4 py-10 print:bg-white print:p-0">
      <div className="mx-auto mb-4 flex max-w-[680px] items-center justify-between gap-3 print:hidden">
        <Link
          href={SHIPMENTS_HREF}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#064423]/55 hover:text-[#064423]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to my shipments
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-[#36B936] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#2EA32E]"
        >
          <Printer className="h-4 w-4" aria-hidden="true" /> Print / Save as PDF
        </button>
      </div>

      <article className="mx-auto max-w-[680px] rounded-[1.25rem] border border-[#E5EBE7] bg-white p-8 shadow-[0_8px_30px_rgba(6,68,35,0.04)] print:rounded-none print:border-0 print:shadow-none sm:p-10">
        <header className="flex items-center justify-between border-b border-[#E5EBE7] pb-6">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element -- plain img prints reliably */}
            <img src="/assets/img/new-images/logo.svg" alt="Zajel" className="h-8 w-auto" />
            <p className="mt-1 text-[12px] text-[#064423]/45">Payment receipt</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-[#064423]/45">Receipt date</p>
            <p className="text-[13px] font-semibold text-[#064423]">{formatDate(receipt.createdAt)}</p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-6 border-b border-[#E5EBE7] py-6">
          <div>
            <p className={labelClass}>AWB / tracking number</p>
            <p className="text-[15px] font-bold text-[#064423]">{receipt.referenceNumber ?? receipt.awb}</p>
          </div>
          <div>
            <p className={labelClass}>Status</p>
            <p className="text-[15px] font-bold text-[#36B936]">{receipt.shipmentStatusLabel}</p>
          </div>
          {receipt.serviceTypeName && (
            <div>
              <p className={labelClass}>Service</p>
              <p className="text-[14px] text-[#064423]/80">{receipt.serviceTypeName}</p>
            </div>
          )}
          <div>
            <p className={labelClass}>Pieces</p>
            <p className="text-[14px] text-[#064423]/80">
              {receipt.numOfPieces} {receipt.weightInKg ? `· ${receipt.weightInKg} kg` : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 border-b border-[#E5EBE7] py-6 sm:grid-cols-2 print:grid-cols-2">
          <Party title="From" party={receipt.origin} />
          <Party title="To" party={receipt.destination} />
        </div>

        {receipt.description && (
          <div className="border-b border-[#E5EBE7] py-6">
            <p className={labelClass}>Parcel description</p>
            <p className="text-[14px] text-[#064423]/80">{receipt.description}</p>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-6">
          <div className="flex items-center justify-between text-[14px] text-[#064423]/65">
            <span>Shipping amount</span>
            <span>
              {receipt.amount.toFixed(2)} {receipt.currency}
            </span>
          </div>
          <div className="flex items-center justify-between text-[14px] text-[#064423]/65">
            <span>VAT</span>
            <span>
              {receipt.vat.toFixed(2)} {receipt.currency}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between border-t border-[#E5EBE7] pt-3 text-[18px] font-bold text-[#064423]">
            <span>Total paid</span>
            <span>
              {receipt.total.toFixed(2)} {receipt.currency}
            </span>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-[#064423]/45">
          This is a computer-generated receipt and does not require a signature. Thank you for choosing Zajel.
        </p>
      </article>
    </div>
  );
}
