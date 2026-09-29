import React from 'react';

interface TrackingPageHeaderProps {
  title: string;
  subtitle: string;
}

// Identical header markup was copy-pasted across TrackingResults,
// ShipmentTimeline, and ProofOfDelivery. One component now, one place
// to change copy or styling.
const TrackingPageHeader: React.FC<TrackingPageHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-8 sm:mb-10 md:mb-14 max-w-[500px] px-2">
    <h2 className="text-h2 text-[#064423] tracking-tight mb-3 sm:mb-4">
      {title}
    </h2>
    <p className="text-[#064423]/60 text-xs sm:text-sm leading-relaxed">{subtitle}</p>
  </div>
);

export default TrackingPageHeader;
