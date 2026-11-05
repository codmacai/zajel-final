'use client';

import { ServiceHero } from '../../shared';
import { SECURE_DOCS_HERO } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureDocsHero = ({ content }: { content: typeof SECURE_DOCS_HERO }) => <ServiceHero {...content} />;

export default cmsSection('secure-docs.hero', SECURE_DOCS_HERO, SecureDocsHero);
