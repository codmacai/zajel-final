// Pure mapping helpers for the MobileApp.API tracking responses (ported 1:1 from the Zajel-2
// React app's trackingApi.ts). Used server-side by app/api/track — no secrets in here.
import type { LatLng, RawShipment, RawShipmentStage, Shipment, TimelineStep } from '@/components/tracking/types';

const EVENT_NAMES_BY_STAGE_KEY: Record<string, string[]> = {
  pickup_completed: ['pickup_completed'],
  inscan_at_hub: ['inscanathub', 'reachedathub'],
  reached_at_hub: ['reachedathub'],
  accept: ['outfordelivery', 'accept'],
  delivered: ['delivered'],
};

const normalize = (value: string): string => value.toLowerCase().replace(/[_\s]/g, '');

function formatDateLabel(input: string | null | undefined): string {
  if (!input) return '';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTimeLabel(input: string | null | undefined): string {
  if (!input) return '';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '';
  const datePart = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timePart = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${datePart} ${timePart}`;
}

function formatTimeLabel(input: string | null | undefined): string {
  if (!input) return '';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function extractWeightKg(packageDescription: string): number | null {
  const match = packageDescription.match(/([\d.]+)\s*kg/i);
  return match ? Number(match[1]) : null;
}

function parseLatLng(lat: string | undefined, lng: string | undefined): LatLng | null {
  if (!lat || !lng) return null;
  const parsedLat = Number(lat);
  const parsedLng = Number(lng);
  if (Number.isNaN(parsedLat) || Number.isNaN(parsedLng)) return null;
  return { lat: parsedLat, lng: parsedLng };
}

function findEventForStage(raw: RawShipment, stage: RawShipmentStage) {
  const candidates = EVENT_NAMES_BY_STAGE_KEY[stage.stageKey] ?? [normalize(stage.stageKey)];
  const matches = raw.shipmentEvents.filter((e) => candidates.includes(normalize(e.event_name)));
  if (!matches.length) return null;
  return matches.reduce((latest, cur) => (cur.event_time_epoch > latest.event_time_epoch ? cur : latest), matches[0]);
}

// Prefers the stage's own pre-formatted `stageName` (e.g. "21 Sep 2026") when the API has
// already reached that stage — only falls back to formatting a matched event's raw
// timestamp when the stage hasn't been reached yet (stageName === '-').
function resolveTimelineDateLabel(raw: RawShipment, stage: RawShipmentStage): string {
  if (stage.stageName && stage.stageName !== '-') return stage.stageName;

  const event = findEventForStage(raw, stage);
  if (!event) return '';

  if (stage.stageKey === 'pickup_completed' || stage.stageKey === 'accept' || stage.stageKey === 'delivered') {
    return formatDateTimeLabel(event.event_time);
  }
  return formatDateLabel(event.event_time);
}

// The API doesn't guarantee `shipmentStages` is already in chronological order — resolve a
// sortable timestamp per stage (parsed stageName, else the matched event's epoch, else +Infinity
// for stages that haven't happened yet) so the timeline always renders oldest-to-newest.
function resolveTimelineEpoch(raw: RawShipment, stage: RawShipmentStage): number {
  if (stage.stageName && stage.stageName !== '-') {
    const parsed = Date.parse(stage.stageName);
    if (!Number.isNaN(parsed)) return parsed;
  }
  const event = findEventForStage(raw, stage);
  if (event) return event.event_time_epoch;
  return Number.POSITIVE_INFINITY;
}

function mapTimelineStep(raw: RawShipment, stage: RawShipmentStage, index: number, activeIndex: number): TimelineStep {
  const isEarlyStage = stage.stageKey === 'pickup_completed' || stage.stageKey === 'inscan_at_hub';
  const reached = stage.stageName !== '-';
  const done = reached || stage.isActive || (activeIndex >= 0 && index < activeIndex);

  return {
    status: stage.stageKey,
    label: stage.friendlyName,
    location: isEarlyStage
      ? `${raw.originInformation.originCity}, ${raw.originInformation.originCountry}`
      : `${raw.destinationInformation.city}, ${raw.destinationInformation.country}`,
    dateLabel: reached ? stage.stageName : resolveTimelineDateLabel(raw, stage),
    done,
    isActive: stage.isActive,
  };
}

export function mapRawShipmentToViewModel(raw: RawShipment): Shipment {
  const activeStage = raw.shipmentStages.find((stage) => stage.isActive);
  const deliveredEvent = raw.shipmentEvents.find((event) => normalize(event.event_name) === 'delivered');
  const isDelivered = raw.currentStatus.toLowerCase().includes('delivered');

  const sortedStages = [...raw.shipmentStages].sort((a, b) => resolveTimelineEpoch(raw, a) - resolveTimelineEpoch(raw, b));
  const sortedActiveIndex = sortedStages.findIndex((stage) => stage.isActive);

  return {
    trackingNumber: raw.refNumber,
    status: activeStage?.stageKey ?? '',
    statusLabel: raw.currentStatus,
    sender: {
      name: raw.originInformation.senderName,
      addressLine: raw.originInformation.originAddress,
      phone: raw.originInformation.senderPhone,
    },
    receiver: {
      name: raw.destinationInformation.customerName,
      addressLine: raw.destinationInformation.receiverAddress,
      phone: raw.destinationInformation.customerPhone,
    },
    origin: `${raw.originInformation.originCity}, ${raw.originInformation.originCountry}`,
    destination: `${raw.destinationInformation.city}, ${raw.destinationInformation.country}`,
    // The API has no origin lat/lng field at all, and destination's is frequently blank —
    // useMapEmbedUrl geocodes origin/destination text when these come back null.
    originCoordinates: null,
    destinationCoordinates: parseLatLng(raw.destinationInformation.desitnationLat, raw.destinationInformation.destinationLng),
    service: {
      serviceType: raw.serviceType,
      weightKg: extractWeightKg(raw.piecesDetails.packageDescription),
      pieces: raw.piecesDetails.pieceCount,
    },
    deliveredAtLabel: formatDateLabel(raw.deliveryDate),
    deliveredOnLabel: formatDateLabel(raw.deliveryDate),
    timeline: sortedStages.map((stage, idx) => mapTimelineStep(raw, stage, idx, sortedActiveIndex)),
    proofOfDelivery:
      isDelivered && deliveredEvent
        ? {
            receivedBy: raw.destinationInformation.customerName,
            deliveryDate: formatDateLabel(deliveredEvent.event_time ?? raw.deliveryDate),
            deliveryTime: formatTimeLabel(deliveredEvent.event_time ?? raw.deliveryDate),
            deliveryNotes: deliveredEvent.remarks || 'Package delivered successfully.',
            photoUrl: '',
          }
        : undefined,
  };
}

function collectUrlsFromUnknown(value: unknown, out: string[]): void {
  if (!value) return;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return;

    // Some fields are JSON-string arrays, e.g. "[\"https://...\", \"https://...\"]".
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed) as unknown;
        collectUrlsFromUnknown(parsed, out);
        return;
      } catch {
        // fall through
      }
    }

    // Some fields are comma-separated URL lists.
    if (trimmed.includes('http') && trimmed.includes(',')) {
      for (const part of trimmed.split(',')) {
        const candidate = part.trim();
        if (/^https?:\/\//i.test(candidate)) out.push(candidate);
      }
      return;
    }

    if (/^https?:\/\//i.test(trimmed)) out.push(trimmed);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectUrlsFromUnknown(item, out);
    return;
  }

  if (typeof value === 'object') {
    for (const entry of Object.values(value as Record<string, unknown>)) {
      collectUrlsFromUnknown(entry, out);
    }
  }
}

/** Picks the proof-of-delivery image URLs out of a GetShipmentTracking response. */
export function extractPodImageUrls(data: unknown): string[] {
  const urls: string[] = [];
  collectUrlsFromUnknown(data, urls);

  const normalized = urls.map((u) => u.trim()).filter(Boolean);
  const dedupedAll = Array.from(new Set(normalized));

  const preferred = dedupedAll.filter((u) =>
    /proof_image_list|proofacceptance|signatureimage|signature_image|poc|pod|proof|delivery|\/poc\//i.test(u),
  );

  const onlyImages = (list: string[]) =>
    list.filter((u) => /\.(png|jpe?g|webp)(\?|#|$)/i.test(u) || /shipsy-img|\/poc\//i.test(u));

  const best = preferred.length ? preferred : dedupedAll;
  const bestImages = onlyImages(best);
  return bestImages.length ? bestImages : best;
}

/**
 * The API only accepts UAE-format mobile numbers for `OptionCode=phone` (country code `971`,
 * with or without a leading `+`) — a bare local number (e.g. `0501234567`) or a number with a
 * different country code is rejected with a 400. Normalize whatever the user typed into that shape.
 */
export function normalizeUaePhoneNumber(raw: string): string {
  const digits = raw.replace(/[^\d]/g, '');
  if (digits.startsWith('00971')) return digits.slice(2);
  if (digits.startsWith('971')) return digits;
  if (digits.startsWith('0')) return `971${digits.slice(1)}`;
  return `971${digits}`;
}
