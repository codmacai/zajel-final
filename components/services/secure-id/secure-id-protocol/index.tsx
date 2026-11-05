'use client';

import { ProtocolCardsSection } from '../../shared';
import { SECURE_ID_PROTOCOL } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureIdProtocol = ({ content }: { content: typeof SECURE_ID_PROTOCOL }) => <ProtocolCardsSection {...content} />;

export default cmsSection('secure-id.protocol', SECURE_ID_PROTOCOL, SecureIdProtocol);
