'use client';

import { useLinkStatus } from 'next/link';

/** Put inside a <Link>: tints the row the moment it's clicked, until its screen opens. */
export default function LinkPending() {
  const { pending } = useLinkStatus();
  return <span aria-hidden="true" className={`c-link-pending${pending ? ' on' : ''}`} />;
}
