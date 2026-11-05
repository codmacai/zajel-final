'use client';

import { ServiceHero } from '../../shared';
import { GOV_HERO } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const GovHero = ({ content }: { content: typeof GOV_HERO }) => <ServiceHero {...content} />;

export default cmsSection('secure-gov.hero', GOV_HERO, GovHero);
