'use client';

import { useState, type ComponentType, type ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, X } from 'lucide-react';
import TrackingPageHeader from './TrackingPageHeader';
import TrackingActionButtons from './TrackingActionButtons';
import TrackingStateMessage from './TrackingStateMessage';
import { useShipment } from './useShipment';
import { useMapEmbedUrl } from './useMapEmbedUrl';
import { fetchPodImages } from './trackingApi';
import { ShipmentIcon, UserIcon, PinIcon, CheckCircleIcon, ClockIcon, PackageIcon, ImageIcon } from './TrackingIcons';
import { RESULTS_CONTENT as C, TRACK_CONTENT, TRACK_ROUTES, parseTrackQuery } from './data';
import type { ShipmentParty, TimelineStep } from './types';

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function last5Digits(value: string): string {
  const digits = (value ?? '').replace(/[^0-9]/g, '');
  if (!digits) return '';
  return digits.length <= 5 ? digits : digits.slice(-5);
}

const STEP_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  pickup_completed: PackageIcon,
  inscan_at_hub: PinIcon,
  reached_at_hub: PinIcon,
  accept: ShipmentIcon,
  out_for_delivery: ShipmentIcon,
  delivered: CheckCircleIcon,
};

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

const IconBadge = ({ children, size = 'w-7 h-7' }: { children: ReactNode; size?: string }) => (
  <div className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#36B936] text-white`}>
    {children}
  </div>
);

// Address + phone stay blurred until the recipient is verified — they're the two fields that
// would otherwise let anyone with just an AWB see a real person's address and number.
const PrivateField = ({ verified, value, placeholder }: { verified: boolean; value: string; placeholder: string }) => (
  <div
    className={`mt-0.5 text-[12px] ${verified ? 'text-[#064423]/70' : 'select-none text-[#064423]/40 blur-[5px]'}`}
    aria-hidden={!verified}
  >
    {verified ? value : placeholder}
  </div>
);

interface PartyCardProps {
  partyLabel: string;
  party: ShipmentParty;
  placeLabel: string;
  place: string;
  verified: boolean;
}

const PartyCard = ({ partyLabel, party, placeLabel, place, verified }: PartyCardProps) => (
  <div className="rounded-[1.25rem] bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-6 flex items-start gap-4">
      <IconBadge>
        <UserIcon className="h-[13px] w-[10px]" />
      </IconBadge>
      <div className="min-w-0">
        <div className="mb-1 text-[10px] font-normal tracking-wider text-[#064423]/90">{partyLabel}</div>
        <div className="text-[15px] font-normal leading-tight text-[#064423]">{party.name}</div>
        <PrivateField verified={verified} value={party.addressLine} placeholder="•••• Street, •••• Building" />
        <PrivateField verified={verified} value={party.phone} placeholder="+971 •• ••• ••••" />
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

const StatusPill = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-1.5 rounded-full bg-[#36B936] px-3 py-1.5 text-[11px] text-white">
    <CheckCircleIcon className="h-3 w-3" />
    {children}
  </div>
);

// One verification covers both the address/phone reveal and proof of delivery.
const VerifyForm = ({
  code,
  onCodeChange,
  onVerify,
  error,
}: {
  code: string;
  onCodeChange: (value: string) => void;
  onVerify: () => void;
  error: string | null;
}) => (
  <form
    className="flex flex-col gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      onVerify();
    }}
  >
    <div className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        inputMode="numeric"
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        maxLength={5}
        aria-label={C.verifyPlaceholder}
        aria-invalid={!!error}
        placeholder={C.verifyPlaceholder}
        className="flex-1 rounded-[12px] border border-gray-200 bg-white px-4 py-2.5 text-[13px] text-[#064423] outline-none transition-all placeholder:text-gray-400 focus:border-[#36B936] focus:ring-1 focus:ring-[#36B936]"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-[#36B936] px-6 py-2.5 text-[13px] font-normal text-white outline-none transition-all duration-300 hover:bg-[#2EA32E] focus-visible:ring-2 focus-visible:ring-[#064423] focus-visible:ring-offset-2"
      >
        {C.verifyButton}
      </button>
    </div>
    {error && (
      <div role="alert" className="text-[12px] text-red-600">
        {error}
      </div>
    )}
  </form>
);

function TimelineItem({ step, isLast }: { step: TimelineStep; isLast: boolean }) {
  const StepIcon = STEP_ICON_MAP[step.status] ?? ShipmentIcon;
  return (
    <li className="flex gap-2.5 sm:gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
            step.done ? 'bg-[#36B936] text-white' : 'bg-gray-200 text-gray-400'
          } ${step.isActive ? 'ring-4 ring-[#36B936]/25' : ''}`}
        >
          <StepIcon className="h-[14px] w-[14px]" />
        </div>
        {!isLast && (
          <div
            className={`my-1 w-[2px] flex-1 ${step.done ? 'bg-[#36B936] opacity-35' : 'bg-gray-200'}`}
            style={{ minHeight: '1.25rem' }}
          />
        )}
      </div>

      <div
        className={`min-w-0 flex-1 rounded-[12px] bg-white p-3 sm:rounded-[14px] sm:p-4 ${isLast ? '' : 'mb-2.5 sm:mb-3'} ${
          step.isActive ? 'ring-1 ring-[#36B936]/30' : ''
        }`}
        aria-current={step.isActive ? 'step' : undefined}
      >
        <div className={`mb-1 text-[13px] font-medium sm:text-[14px] ${step.done ? 'text-[#064423]' : 'text-[#064423]/40'}`}>
          {step.label}
        </div>
        <div className={`mb-1 flex items-center gap-1 text-[10px] sm:text-[11px] ${step.done ? 'text-[#064423]/60' : 'text-[#064423]/30'}`}>
          <PinIcon className="h-[12px] w-[10px]" />
          <span className="truncate">{step.location}</span>
        </div>
        {step.dateLabel ? (
          <div className="text-[10px] text-[#064423]/50 sm:text-[11px]">{step.dateLabel}</div>
        ) : (
          <div className="text-[10px] italic text-[#064423]/30 sm:text-[11px]">{C.pending}</div>
        )}
      </div>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page content                                                              */
/* -------------------------------------------------------------------------- */

export default function TrackingResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = parseTrackQuery(searchParams);
  const { shipment, loading, error } = useShipment(query);
  const { url: mapUrl, loading: mapLoading } = useMapEmbedUrl(shipment);

  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState('');
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [showPodModal, setShowPodModal] = useState(false);
  const [podLoading, setPodLoading] = useState(false);
  const [podFetchError, setPodFetchError] = useState<string | null>(null);
  const [podImageUrls, setPodImageUrls] = useState<string[]>([]);
  const [podSelectedIndex, setPodSelectedIndex] = useState(0);

  // A different shipment means verification starts over (React's "reset state on prop change").
  const shipmentKey = shipment?.trackingNumber ?? null;
  const [verifiedFor, setVerifiedFor] = useState<string | null>(shipmentKey);
  if (shipmentKey !== verifiedFor) {
    setVerifiedFor(shipmentKey);
    setVerified(false);
    setCode('');
    setVerifyError(null);
    setPodImageUrls([]);
    setShowPodModal(false);
  }

  const isDelivered = !!shipment?.proofOfDelivery;

  const setCodeValue = (value: string) => {
    setCode(value.replace(/[^0-9]/g, '').slice(0, 5));
    setVerifyError(null);
  };

  const handleVerify = async () => {
    const expected = shipment ? last5Digits(shipment.receiver.phone) : '';
    if (code.length !== 5) {
      setVerifyError("Please enter the last 5 digits of the recipient's phone number.");
      return;
    }
    if (!expected) {
      setVerifyError('Unable to verify the phone number for this shipment.');
      return;
    }
    if (code !== expected) {
      setVerifyError('The last 5 digits do not match.');
      return;
    }

    setVerified(true);
    setVerifyError(null);

    if (!isDelivered || !shipment) return;

    setPodLoading(true);
    setPodFetchError(null);
    setPodImageUrls([]);
    setPodSelectedIndex(0);
    try {
      setPodImageUrls(await fetchPodImages(shipment.trackingNumber));
    } catch (err) {
      setPodFetchError(err instanceof Error ? err.message : 'Unable to load proof of delivery.');
    } finally {
      setPodLoading(false);
    }
  };

  return (
    <section className="flex w-full flex-col items-center bg-white px-4 pb-20 pt-32 sm:px-6 md:pb-24 md:pt-40 lg:px-8">
      <TrackingPageHeader title={TRACK_CONTENT.title} subtitle={TRACK_CONTENT.subtitle} />

      {!shipment ? (
        <TrackingStateMessage loading={loading} error={error} hasQuery={!!query} />
      ) : (
        <div className="flex w-full max-w-[1100px] flex-col gap-6">
          {/* Status overview */}
          <div className="rounded-[1.5rem] bg-[#F0F4F2] p-5 sm:p-6 md:rounded-[2rem] md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <div className="min-w-0">
                  <div className="mb-1 text-[11px] text-[#064423]/60">{C.trackingNumber}</div>
                  <div className="break-all text-[15px] font-normal text-[#064423] sm:text-[16px]">{shipment.trackingNumber}</div>
                </div>
                <div className="hidden h-8 w-px bg-[#064423]/10 sm:block" />
                <div>
                  <div className="mb-1.5 text-[11px] text-[#064423]/60">{C.currentStatus}</div>
                  <StatusPill>{shipment.statusLabel}</StatusPill>
                </div>
                {isDelivered && (
                  <>
                    <div className="hidden h-8 w-px bg-[#064423]/10 sm:block" />
                    <div>
                      <div className="mb-1 flex items-center gap-1.5 text-[11px] text-[#064423]/60">
                        <PinIcon className="h-[10px] w-[10px]" />
                        {C.deliveredOn}
                      </div>
                      <div className="text-[15px] font-normal text-[#064423] sm:text-[16px]">{shipment.deliveredOnLabel}</div>
                    </div>
                  </>
                )}
              </div>

              {isDelivered && (
                <button
                  onClick={() => setShowPodModal(true)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#36B936] px-5 py-2.5 text-[13px] font-normal text-white outline-none transition-all duration-300 hover:bg-[#2EA32E] focus-visible:ring-2 focus-visible:ring-[#064423] focus-visible:ring-offset-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  {C.viewPod}
                </button>
              )}
            </div>
          </div>

          {/* Verify banner — shown before the blurred content so it's clear why it's hidden */}
          {!verified && (
            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-[#E5EBE7] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6 md:rounded-[2rem]">
              <div className="flex shrink-0 items-center gap-2.5 text-[#064423]">
                <Lock className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                <span className="text-[13px] font-normal">{C.verifyBanner}</span>
              </div>
              <div className="flex-1">
                <VerifyForm code={code} onCodeChange={setCodeValue} onVerify={handleVerify} error={verifyError} />
              </div>
            </div>
          )}

          {/* Details + timeline */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="rounded-[1.5rem] bg-[#F0F4F2] p-5 sm:p-6 md:rounded-[2rem] md:p-8 lg:col-span-7">
              <div className="mb-6 flex items-center gap-3 text-[#064423]">
                <ShipmentIcon className="h-auto w-[18px] md:w-[20px]" />
                <h2 className="text-xl font-normal md:text-[1.35rem]">{C.detailsTitle}</h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <PartyCard partyLabel={C.sender} party={shipment.sender} placeLabel={C.origin} place={shipment.origin} verified={verified} />
                  <PartyCard
                    partyLabel={C.receiver}
                    party={shipment.receiver}
                    placeLabel={C.destination}
                    place={shipment.destination}
                    verified={verified}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 rounded-[1.25rem] bg-white p-4 shadow-sm min-[420px]:grid-cols-3 sm:p-5">
                  <ServiceField label={C.serviceType} value={shipment.service.serviceType || '—'} />
                  <ServiceField
                    label={C.weight}
                    value={shipment.service.weightKg != null ? `${shipment.service.weightKg} ${C.weightUnit}` : '—'}
                  />
                  <ServiceField label={C.pieces} value={shipment.service.pieces} />
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-[#F0F4F2] p-5 sm:p-6 md:rounded-[2rem] md:p-8 lg:col-span-5">
              <div className="mb-6 flex items-center gap-2.5 text-[#064423]">
                <ClockIcon className="h-[18px] w-[18px]" />
                <h2 className="text-xl font-normal md:text-[1.35rem]">{C.timelineTitle}</h2>
              </div>
              <ol className="flex max-h-[360px] flex-col overflow-y-auto pr-1">
                {shipment.timeline.map((step, idx) => (
                  <TimelineItem key={`${step.status}-${idx}`} step={step} isLast={idx === shipment.timeline.length - 1} />
                ))}
              </ol>
            </div>
          </div>

          {/* Route map */}
          <div
            className="relative flex w-full items-center justify-center overflow-hidden rounded-[1.5rem] md:rounded-[2rem]"
            style={{ background: '#064423', minHeight: '360px' }}
          >
            {mapUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- remote Google Static Maps URL with a signed key
              <img src={mapUrl} alt={C.mapAlt} className="absolute inset-0 h-full w-full object-cover" />
            ) : mapLoading ? (
              <span className="text-[13px] text-white/40">{C.mapLoading}</span>
            ) : (
              <span className="px-6 text-center text-[13px] text-white/40">{C.mapUnavailable}</span>
            )}
          </div>

          <div className="mx-auto w-full max-w-[420px]">
            <TrackingActionButtons
              onBack={() => router.push(TRACK_ROUTES.search)}
              onNext={() => router.push('/support')}
              nextLabel={C.needHelp}
            />
          </div>
        </div>
      )}

      {/* Proof of delivery modal — reuses the same verification state as the reveal above */}
      {showPodModal && shipment && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={C.podTitle}
          onKeyDown={(e) => e.key === 'Escape' && setShowPodModal(false)}
        >
          <div className="relative flex w-full max-w-[480px] flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2 text-[#064423]">
                <ImageIcon className="h-4 w-4" />
                <span className="text-[14px] font-medium">{C.podTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPodModal(false)}
                aria-label="Close"
                autoFocus
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {!verified ? (
                <div className="flex flex-col gap-3">
                  <p className="text-[13px] text-[#064423]/70">{C.verifyPodHint}</p>
                  <VerifyForm code={code} onCodeChange={setCodeValue} onVerify={handleVerify} error={verifyError} />
                </div>
              ) : (
                <>
                  <div
                    className="mb-3 flex w-full items-center justify-center overflow-hidden rounded-[1rem]"
                    style={{ minHeight: '280px', background: 'rgba(6, 68, 35, 0.1)' }}
                  >
                    {podLoading ? (
                      <span className="text-[13px] text-[#064423]/40">Loading proof of delivery…</span>
                    ) : podFetchError ? (
                      <div className="px-4 text-center text-[12px] text-red-600">{podFetchError}</div>
                    ) : podImageUrls.length ? (
                      // eslint-disable-next-line @next/next/no-img-element -- remote POD image from the courier platform
                      <img src={podImageUrls[podSelectedIndex]} alt={C.podTitle} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 px-6 text-center text-[13px] text-[#064423]/60">
                        <span>No photo was attached to this delivery.</span>
                        {shipment.proofOfDelivery && (
                          <span className="text-[12px] text-[#064423]/45">
                            Received by {shipment.proofOfDelivery.receivedBy} · {shipment.proofOfDelivery.deliveryDate}{' '}
                            {shipment.proofOfDelivery.deliveryTime}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {podImageUrls.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {podImageUrls.map((imgUrl, idx) => (
                        <button
                          key={imgUrl}
                          type="button"
                          onClick={() => setPodSelectedIndex(idx)}
                          aria-label={`Photo ${idx + 1}`}
                          aria-pressed={podSelectedIndex === idx}
                          className={`h-12 w-12 shrink-0 overflow-hidden rounded-[10px] border ${
                            podSelectedIndex === idx ? 'border-[#36B936]' : 'border-[#E5EBE7]'
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element -- remote POD thumbnail */}
                          <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
