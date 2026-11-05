'use client';

import { ProtocolCardsSection } from '../../shared';
import { SECURE_DOCS_PROTOCOL } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureDocsProtocol = ({ content }: { content: typeof SECURE_DOCS_PROTOCOL }) => <ProtocolCardsSection {...content} />;

export default cmsSection('secure-docs.protocol', SECURE_DOCS_PROTOCOL, SecureDocsProtocol);
