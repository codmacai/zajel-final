'use client';

import { ServiceHero } from '../../shared';
import { SECURE_MAIL_HERO } from '../data';
import { cmsSection } from '@/components/cms/CmsProvider';

const SecureMailHero = ({ content }: { content: typeof SECURE_MAIL_HERO }) => <ServiceHero {...content} />;

export default cmsSection('secure-mail.hero', SECURE_MAIL_HERO, SecureMailHero);
