'use client';

import { ProtocolCardsSection } from '../../shared';
import { GOV_PROTOCOL } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const GovInstitutionalProtocol = ({ content }: { content: typeof GOV_PROTOCOL }) => <ProtocolCardsSection {...content} />;

export default cmsSection('secure-gov.protocol', GOV_PROTOCOL, GovInstitutionalProtocol);
