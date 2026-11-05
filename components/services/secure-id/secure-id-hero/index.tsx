'use client';

import { ServiceHero } from '../../shared';
import { SECURE_ID_HERO } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureIdHero = ({ content }: { content: typeof SECURE_ID_HERO }) => <ServiceHero {...content} />;

export default cmsSection('secure-id.hero', SECURE_ID_HERO, SecureIdHero);
