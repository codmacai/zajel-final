'use client';

import { useMemo } from 'react';
import { useSection } from '@/components/cms/CmsProvider';
import { NAVIGATION, type NavigationContent } from '@/data/navigation';
import { linksToHidden, NONE_HIDDEN, PAGES_KEY } from '@/lib/cms/visibility';

/** The menu without links to pages switched off in the CMS. */
function withoutHidden(nav: NavigationContent, paths: string[]): NavigationContent {
  if (!paths.length) return nav;
  const keep = <T extends { path: string }>(items: T[]) => items.filter((i) => !linksToHidden(i.path, paths));
  return {
    ...nav,
    solutions: nav.solutions.map((c) => ({ ...c, path: linksToHidden(c.path, paths) ? '' : c.path, items: keep(c.items) })),
    about: keep(nav.about),
    resources: keep(nav.resources),
  };
}

/** The menu with any CMS edits (Site-wide → Navigation menu), minus switched-off pages. */
export const useNavigation = () => {
  const nav = useSection('global.navigation', NAVIGATION) ?? NAVIGATION;
  const hidden = useSection(PAGES_KEY, NONE_HIDDEN) ?? NONE_HIDDEN;
  return useMemo(() => withoutHidden(nav, hidden.paths), [nav, hidden]);
};
