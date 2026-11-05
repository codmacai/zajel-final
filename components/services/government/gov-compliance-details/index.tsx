'use client';

import { FeatureListSection } from '../../shared';
import { GOV_DETAILS } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const GovComplianceDetails = ({ content }: { content: typeof GOV_DETAILS }) => <FeatureListSection {...content} />;

export default cmsSection('secure-gov.details', GOV_DETAILS, GovComplianceDetails);
