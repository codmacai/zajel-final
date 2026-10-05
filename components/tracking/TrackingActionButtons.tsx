import React from 'react';

interface TrackingActionButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}

const TrackingActionButtons: React.FC<TrackingActionButtonsProps> = ({ onBack, onNext, nextLabel = 'Next' }) => (
  <div className="flex gap-3 sm:gap-4">
    <button
      onClick={onBack}
      className="flex-1 bg-white border border-[#E5EBE7] text-[#064423] text-[13px] sm:text-sm py-3 sm:py-3.5 rounded-full hover:bg-gray-50 transition-colors duration-300 outline-none"
    >
      Back
    </button>
    <button
      onClick={onNext}
      className="flex-1 bg-[#36B936] text-white font-normal text-[13px] sm:text-sm py-3 sm:py-3.5 rounded-full hover:bg-[#2EA32E] active:scale-[0.99] transition-all duration-300 shadow-[0_4px_14px_rgba(54,185,54,0.15)] outline-none"
    >
      {nextLabel}
    </button>
  </div>
);

export default TrackingActionButtons;
