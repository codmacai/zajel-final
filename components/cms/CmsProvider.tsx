'use client';

// Gives sections on the page their saved CMS content.
//
//   const content = useSection('sea-freight.hero', DEFAULT_CONTENT);
//   if (!content) return null; // the section is switched off in the CMS
//
// With nothing saved, a section gets exactly its built-in content.

import { createContext, useContext, useMemo, type ComponentType, type ReactNode } from 'react';
import { mergeContent, type Plain } from '@/lib/cms/content';

export interface SavedSection {
  en: Plain;
  enabled: boolean;
}

type Saved = Record<string, SavedSection>;

const CmsContext = createContext<Saved>({});

export function CmsProvider({ saved, children }: { saved: Saved; children: ReactNode }) {
  const parent = useContext(CmsContext);
  const value = useMemo(() => ({ ...parent, ...saved }), [parent, saved]);
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

/** The section's content (built-in content with CMS edits laid over it), or null if switched off. */
export function useSection<T>(key: string, defaults: T): T | null {
  const row = useContext(CmsContext)[key];
  return useMemo(() => {
    if (!row) return defaults;
    if (!row.enabled) return null;
    return mergeContent(defaults, row.en);
  }, [row, defaults]);
}

/**
 * Connects a section component to the CMS. The component receives its content as `content`.
 *
 *   export default cmsSection('home.why-choose-us', DEFAULTS, WhyChooseUs);
 *
 * A component used on several pages takes its key and built-in content from the page instead:
 *   <ContactSection cmsKey="sea-freight.contact" content={seaFreightContent} />
 */
export function cmsSection<T, P extends { content?: T }>(
  key: string | null,
  defaults: T | null,
  Inner: ComponentType<P>,
) {
  function CmsSection(props: Omit<P, 'content'> & { content?: T; cmsKey?: string }) {
    const { cmsKey, content: given, ...rest } = props;
    const base = (given ?? defaults) as T;
    const content = useSection(cmsKey ?? key ?? '', base);
    if (!content) return null;
    return <Inner {...(rest as unknown as P)} content={content} />;
  }
  CmsSection.displayName = `CmsSection(${Inner.displayName ?? Inner.name ?? 'Section'})`;
  return CmsSection;
}
