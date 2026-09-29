'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { PackageIcon, PhoneIcon, SearchIcon } from './TrackingIcons';
import { TRACK_CONTENT, TRACK_ROUTES, type TrackTabId } from './data';

const TAB_ICONS: Record<TrackTabId, React.ReactNode> = {
  awb: <PackageIcon className="mt-0.5 h-auto w-[14px] sm:w-[16px]" />,
  mobile: <PhoneIcon className="h-auto w-[13px] sm:w-[15px]" />,
};

export default function TrackShipment() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TrackTabId>('awb');
  const [inputValue, setInputValue] = useState('');

  const tab = TRACK_CONTENT.tabs.find((t) => t.id === activeTab) ?? TRACK_CONTENT.tabs[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;
    // The query lives in the URL, so results pages can be bookmarked and shared.
    router.push(`${TRACK_ROUTES.results}?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center bg-white px-4 pb-20 pt-32 sm:px-6 md:pb-24 md:pt-40 lg:px-8">
      <div className="mb-8 max-w-[500px] px-2 text-center sm:mb-10">
        <h1 className="text-h2 mb-3 tracking-tight text-[#064423] sm:mb-4">{TRACK_CONTENT.title}</h1>
        <p className="text-xs leading-relaxed text-[#064423]/60 sm:text-sm">{TRACK_CONTENT.subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[640px] rounded-[1.25rem] border border-[#E5EBE7] bg-white p-4 shadow-[0_8px_30px_rgba(6,68,35,0.04)] sm:rounded-[1.75rem] sm:p-6 md:p-8"
      >
        {/* Tabs */}
        <div role="tablist" className="relative mb-6 flex rounded-full bg-[#F0F4F2] p-1.5 sm:mb-8">
          {TRACK_CONTENT.tabs.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-[12px] font-normal outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#36B936] sm:gap-2.5 sm:py-3 sm:text-[13px] md:text-sm ${
                  isActive ? 'bg-[#064423] text-[#36B936] shadow-sm' : 'text-[#064423] hover:bg-white/50'
                }`}
              >
                <span aria-hidden="true" className="flex items-center">
                  {TAB_ICONS[id]}
                </span>
                {label}
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div className="mb-5 flex flex-col sm:mb-6">
          <label
            htmlFor="track-input"
            className="mx-1 mb-2.5 text-[12px] font-normal text-[#064423] sm:mb-3 sm:text-[13px]"
          >
            {tab.fieldLabel}
          </label>
          <input
            id="track-input"
            type="text"
            inputMode={activeTab === 'mobile' ? 'tel' : 'text'}
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={tab.placeholder}
            className="w-full rounded-[12px] border border-gray-200 px-4 py-3.5 text-[13px] text-[#064423] outline-none transition-all placeholder:text-gray-400 focus:border-[#36B936] focus:ring-1 focus:ring-[#36B936] sm:rounded-[14px] sm:px-5 sm:py-4 sm:text-[14px]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] py-3.5 text-[13px] font-normal text-white outline-none transition-all duration-300 hover:bg-[#2EA32E] focus-visible:ring-2 focus-visible:ring-[#064423] focus-visible:ring-offset-2 active:scale-[0.99] sm:mb-5 sm:gap-2.5 sm:py-4 sm:text-[14px]"
        >
          <SearchIcon className="h-auto w-[14px] sm:w-[16px]" />
          {TRACK_CONTENT.button}
        </button>

        <p className="px-2 text-center text-[10px] leading-snug text-[#9CA3AF] sm:text-[11px]">
          {TRACK_CONTENT.helperText}
        </p>
      </form>
    </section>
  );
}
