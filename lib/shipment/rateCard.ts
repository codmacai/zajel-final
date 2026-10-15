import type { RateCardResult } from '@/types/shipment';

// GetRateCard response (confirmed):
//   { header_id, carrier_code, rate_card_name, ...,
//     rate_detail: { weight_display: "4.0 KG", base_rate: 249.96, service_code: "AIR",
//                    currency: "AED", discount_amount: 0, total_amount: 361.0533… } }
// The price is rate_detail.total_amount (unrounded), not a top-level field.
export interface RateQuote {
  total: number;
  base: number | null;
  discount: number;
  currency: string;
  weightLabel: string;
  service: string;
}

export function pickNumber(record: RateCardResult, keys: string[]): number | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) return Number(value);
  }
  return null;
}

const roundMoney = (n: number) => Math.round(n * 100) / 100;

export function parseRateQuote(rate: RateCardResult | null): RateQuote | null {
  if (!rate) return null;
  const detail = rate.rate_detail;
  const d: RateCardResult = detail && typeof detail === 'object' ? (detail as RateCardResult) : rate;
  const total = pickNumber(d, ['total_amount', 'totalAmount', 'amount']);
  if (total === null || !(total > 0)) return null;
  const str = (k: string) => (typeof d[k] === 'string' ? (d[k] as string) : '');
  return {
    total: roundMoney(total),
    base: pickNumber(d, ['base_rate']),
    discount: roundMoney(pickNumber(d, ['discount_amount']) ?? 0),
    currency: str('currency') || 'AED',
    weightLabel: str('weight_display'),
    service: str('service_code'),
  };
}

/**
 * GetDocumentWeights answers { weights: [0.5, 4] } — treated as the range of document weights
 * (the rate card has 0.5 kg brackets up to 4 kg), so the picker offers every 0.5 kg step in it.
 * A longer list is used as-is.
 */
export function expandDocumentWeightOptions(documentWeights: number[]): number[] {
  return documentWeights.length === 2 && documentWeights[1] > documentWeights[0]
    ? Array.from({ length: Math.round((documentWeights[1] - documentWeights[0]) / 0.5) + 1 }, (_, i) => documentWeights[0] + i * 0.5)
    : documentWeights;
}
