'use client';

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

export function useSection<T>(key: string, defaults: T): T | null {
  const row = useContext(CmsContext)[key];
  return useMemo(() => {
    if (!row) return defaults;
    if (!row.enabled) return null;
    return mergeContent(defaults, row.en);
  }, [row, defaults]);
}

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
