'use client';

import { useLinkStatus } from 'next/link';

export default function LinkPending() {
  const { pending } = useLinkStatus();
  return <span aria-hidden="true" className={`c-link-pending${pending ? ' on' : ''}`} />;
}
