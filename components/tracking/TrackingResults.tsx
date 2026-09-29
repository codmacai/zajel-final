'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import TrackingPageHeader from './TrackingPageHeader';
import TrackingActionButtons from './TrackingActionButtons';
import TrackingStateMessage from './TrackingStateMessage';
import { useShipment } from './useShipment';
import { ShipmentIcon, UserIcon, PinIcon, CheckCircleIcon } from './TrackingIcons';
import { RESULTS_CONTENT as C, TRACK_CONTENT, TRACK_ROUTES } from './data';
import type { ShipmentParty } from './types';

/* -------------------------------------------------------------------------- */
/*  Small building blocks (sender and receiver cards were identical markup)   */
/* -------------------------------------------------------------------------- */

const IconBadge = ({ children, size = 'w-7 h-7' }: { children: React.ReactNode; size?: string }) => (
  <div className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#36B936] text-white`}>
    {children}
  </div>
);

interface PartyCardProps {
  partyLabel: string;
  party: ShipmentParty;
  placeLabel: string;
  place: string;
}

const PartyCard = ({ partyLabel, party, placeLabel, place }: PartyCardProps) => (
  <div className="rounded-[1.25rem] bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-6 flex items-start gap-4">
      <IconBadge>
        <UserIcon className="h-[13px] w-[10px]" />
      </IconBadge>
      <div className="min-w-0">
        <div className="mb-1 text-[10px] font-normal tracking-wider text-[#064423]/90">{partyLabel}</div>
        <div className="text-[15px] font-normal leading-tight text-[#064423]">{party.name}</div>
        <div className="mt-0.5 text-[12px] text-[#064423]/70">{party.addressLine}</div>
        <div className="mt-0.5 text-[12px] text-[#064423]/70">{party.phone}</div>
      </div>
    </div>
    <div className="flex items-start gap-4">
      <IconBadge>
        <PinIcon className="h-[13px] w-[11px]" />
      </IconBadge>
      <div className="min-w-0">
        <div className="mb-1 text-[10px] font-normal tracking-wider text-[#064423]/90">{placeLabel}</div>
        <div className="text-[13px] font-normal text-[#064423]">{place}</div>
      </div>
    </div>
  </div>
);

const ServiceField = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-center gap-3">
    <IconBadge size="w-6 h-6">
      <ShipmentIcon className="h-[10px] w-[10px]" />
    </IconBadge>
    <div>
      <div className="mb-0.5 text-[9px] font-normal tracking-wider text-[#064423]/90">{label}</div>
      <div className="text-[13px] font-normal text-[#064423]">{value}</div>
    </div>
  </div>
);

const StatusPill = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 rounded-full bg-[#36B936] px-3 py-1.5 text-[11px] text-white">
    <CheckCircleIcon className="h-3 w-3" />
    {children}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Page content                                                              */
/* -------------------------------------------------------------------------- */

export default function TrackingResults() {
  const router = useRouter();
  const query = useSearchParams().get('q');
  const { shipment, loading, error } = useShipment(query);

  const nextHref = `${TRACK_ROUTES.timeline}?q=${encodeURIComponent(query ?? '')}`;

  return (
    <section className="flex w-full flex-col items-center bg-white px-4 pb-20 pt-32 sm:px-6 md:pb-24 md:pt-40 lg:px-8">
      <TrackingPageHeader title={TRACK_CONTENT.title} subtitle={TRACK_CONTENT.subtitle} />

      {!shipment ? (
        <TrackingStateMessage loading={loading} error={error} hasQuery={!!query} />
      ) : (
        <div className="grid w-full max-w-[1100px] grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* LEFT: shipment details */}
          <div className="rounded-[1.5rem] bg-[#F0F4F2] p-5 sm:p-6 md:rounded-[2rem] md:p-8 lg:col-span-8">
            <div className="mb-6 flex items-center gap-3 text-[#064423]">
              <ShipmentIcon className="h-auto w-[18px] md:w-[20px]" />
              <h2 className="text-xl font-normal md:text-[1.35rem]">{C.detailsTitle}</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <PartyCard
                  partyLabel={C.sender}
                  party={shipment.sender}
                  placeLabel={C.origin}
                  place={shipment.origin}
                />
                <PartyCard
                  partyLabel={C.receiver}
                  party={shipment.receiver}
                  placeLabel={C.destination}
                  place={shipment.destination}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 rounded-[1.25rem] bg-white p-4 shadow-sm min-[420px]:grid-cols-3 sm:p-5">
                <ServiceField label={C.serviceType} value={shipment.service.serviceType} />
                <ServiceField label={C.weight} value={`${shipment.service.weightKg} ${C.weightUnit}`} />
                <ServiceField label={C.pieces} value={shipment.service.pieces} />
              </div>
            </div>
          </div>

          {/* RIGHT: status tracker */}
          <div className="flex h-full flex-col lg:col-span-4">
            <div className="mb-4 flex-1 rounded-[1.5rem] bg-[#F0F4F2] p-5 sm:p-6 md:mb-6 md:rounded-[2rem] md:p-8">
              <div className="flex items-center justify-between gap-3 pb-5">
                <div className="min-w-0">
                  <div className="mb-1 text-[11px] text-[#064423]/60">{C.trackingNumber}</div>
                  <div className="break-all text-[15px] font-normal text-[#064423]">{shipment.trackingNumber}</div>
                </div>
                <StatusPill>{shipment.statusLabel}</StatusPill>
              </div>

              <div className="w-full border-t border-[#064423]/10" />

              <div className="flex items-center justify-between gap-3 py-5">
                <div className="min-w-0">
                  <div className="mb-1 text-[11px] text-[#064423]/60">{shipment.deliveredAtLabel}</div>
                  <div className="text-[14px] font-normal text-[#064423]">{C.deliveredMessage}</div>
                </div>
                <StatusPill>{C.statusBadge}</StatusPill>
              </div>

              <div className="w-full border-t border-[#064423]/10" />

              <div className="pt-5">
                <div className="mb-1 flex items-center gap-1.5 text-[11px] text-[#064423]/60">
                  <PinIcon className="h-[10px] w-[10px]" />
                  {C.deliveredOn}
                </div>
                <div className="text-[14px] font-normal text-[#064423]">{shipment.deliveredOnLabel}</div>
              </div>
            </div>

            <TrackingActionButtons onBack={() => router.back()} onNext={() => router.push(nextHref)} />
          </div>
        </div>
      )}
    </section>
  );
}
