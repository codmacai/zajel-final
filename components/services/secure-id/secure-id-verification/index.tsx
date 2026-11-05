'use client';

import { FeatureListSection } from '../../shared';
import { SECURE_ID_DETAILS } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureIdVerificationDetails = ({ content }: { content: typeof SECURE_ID_DETAILS }) => <FeatureListSection {...content} />;

export default cmsSection('secure-id.details', SECURE_ID_DETAILS, SecureIdVerificationDetails);
