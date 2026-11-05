'use client';

import { ProtocolCardsSection } from '../../shared';
import { SECURE_MAIL_PROTOCOL } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureMailProtocol = ({ content }: { content: typeof SECURE_MAIL_PROTOCOL }) => <ProtocolCardsSection {...content} />;

export default cmsSection('secure-mail.protocol', SECURE_MAIL_PROTOCOL, SecureMailProtocol);
