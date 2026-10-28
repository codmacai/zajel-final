'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, Loader2, MapPin, Phone, Plus } from 'lucide-react';
import { CARD_TAP, SOFT_SPRING, SPRING } from './motion';
import type { SavedAddress } from '@/types/account';

// Shared by the domestic wizard (sendshipment.tsx) and the UAE side of the international
// wizard (international/InternationalShipmentWizard.tsx) — same saved-address-or-new flow.

export type PartyMode = 'pick' | 'new';

export default function SavedAddressPicker({
  idPrefix,
  addresses,
  loading,
  mode,
  setMode,
  selectedId,
  onPick,
  error,
}: {
  idPrefix: string;
  addresses: SavedAddress[];
  loading: boolean;
  mode: PartyMode;
  setMode: (m: PartyMode) => void;
  selectedId: number | null;
  onPick: (addr: SavedAddress) => void;
  error?: string;
}) {
  if (loading) {
    return (
      <div className="mb-6 flex items-center gap-2 text-[13px] text-[#064423]/55">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading your saved addresses…
      </div>
    );
  }
  if (addresses.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p id={`${idPrefix}-saved-label`} className="mx-1 text-[12px] text-[#064423] sm:text-[13px]">
          {mode === 'pick' ? 'Use a saved address' : 'New address'}
        </p>
        <button
          type="button"
          onClick={() => setMode(mode === 'pick' ? 'new' : 'pick')}
          className="inline-flex items-center gap-1.5 rounded-full px-1 text-[13px] font-medium text-[#36B936] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[#36B936]"
        >
          {mode === 'pick' ? (
            <>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add a new address
            </>
          ) : (
            <>
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Choose a saved address
            </>
          )}
        </button>
      </div>

      {mode === 'pick' && (
        <>
          <div role="radiogroup" aria-labelledby={`${idPrefix}-saved-label`} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {addresses.map((addr, idx) => {
              const selected = selectedId === addr.id;
              return (
                <motion.button
                  key={addr.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onPick(addr)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.015 }}
                  whileTap={CARD_TAP}
                  transition={{ ...SOFT_SPRING, delay: Math.min(idx, 8) * 0.03 }}
                  className={`relative flex items-start gap-3 rounded-[14px] border p-4 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#36B936] ${
                    selected ? 'border-[#36B936] bg-[#36B936]/[0.04]' : `bg-white hover:border-[#064423]/25 ${error ? 'border-red-400' : 'border-[#E5EBE7]'}`
                  }`}
                >
                  <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${selected ? 'text-[#36B936]' : 'text-[#064423]/40'}`} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-medium text-[#064423]">{addr.name || addr.type || 'Saved address'}</span>
                    <span className="block truncate text-[12px] text-[#064423]/55">{addr.address}</span>
                    {addr.phone && (
                      <span className="mt-1 flex items-center gap-1 text-[12px] text-[#064423]/70">
                        <Phone className="h-3 w-3" aria-hidden="true" /> {addr.phone}
                      </span>
                    )}
                  </span>
                  <AnimatePresence>
                    {selected && (
                      <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={SPRING} className="shrink-0">
                        <Check className="h-4 w-4 text-[#36B936]" strokeWidth={2.5} aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
          {error && <p className="mx-1 mt-2 text-[12px] text-red-600">{error}</p>}
        </>
      )}
    </div>
  );
}
