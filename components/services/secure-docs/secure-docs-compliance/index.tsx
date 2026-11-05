'use client';

import { FeatureListSection } from '../../shared';
import { SECURE_DOCS_DETAILS } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureDocsComplianceDetails = ({ content }: { content: typeof SECURE_DOCS_DETAILS }) => <FeatureListSection {...content} />;

export default cmsSection('secure-docs.details', SECURE_DOCS_DETAILS, SecureDocsComplianceDetails);
