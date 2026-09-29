import React from 'react';

interface TrackingStateMessageProps {
  loading: boolean;
  error: string | null;
  hasQuery: boolean;
}

// Every page that calls useShipment() needs to handle the same three
// non-happy-path cases: no query yet, still loading, and the request
// failed. Centralizing it means each page only renders this when there's
// genuinely nothing else to show, instead of duplicating three near
// identical blocks of markup.
const TrackingStateMessage: React.FC<TrackingStateMessageProps> = ({ loading, error, hasQuery }) => {
  if (!hasQuery) {
    return (
      <div className="w-full max-w-[1100px] text-center text-[#064423]/60 text-sm py-16">
        Enter an AWB number or mobile number on the tracking page to see shipment details.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full max-w-[1100px] text-center text-[#064423]/60 text-sm py-16">
        Looking up your shipment…
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[1100px] text-center text-red-600 text-sm py-16">
        {error}
      </div>
    );
  }

  return null;
};

export default TrackingStateMessage;
