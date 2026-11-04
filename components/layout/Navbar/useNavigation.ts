'use client';

import { useSection } from '@/components/cms/CmsProvider';
import { NAVIGATION } from '@/data/navigation';

/** The menu with any CMS edits (Site-wide → Navigation menu). */
export const useNavigation = () => useSection('global.navigation', NAVIGATION) ?? NAVIGATION;
