'use client';

import { FeatureListSection } from '../../shared';
import { SECURE_MAIL_DETAILS } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureMailDetails = ({ content }: { content: typeof SECURE_MAIL_DETAILS }) => <FeatureListSection {...content} />;

export default cmsSection('secure-mail.details', SECURE_MAIL_DETAILS, SecureMailDetails);
