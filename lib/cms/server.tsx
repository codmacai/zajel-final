import type React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "./seo";
// CMS content for server components (pages, layouts, the footer).

import { mergeContent } from './content';
import { readAllRows } from './store';

/** The section's content (built-in content with CMS edits laid over it), or null if switched off. */
export async function getSection<T>(key: string, defaults: T): Promise<T | null> {
  const row = (await readAllRows()).find((r) => r.key === key);
  if (!row) return defaults;
  if (!row.enabled) return null;
  return mergeContent(defaults, row.en);
}

/**
 * Connects a server component to the CMS (the server twin of cmsSection in CmsProvider).
 * The component receives its content as `content`; a page can pass `cmsKey` and `content`.
 */
export function serverSection<T, P extends { content?: T }>(
  key: string | null,
  defaults: T | null,
  Inner: (props: P) => React.ReactNode | Promise<React.ReactNode>,
) {
  return async function CmsServerSection(props: Omit<P, 'content'> & { content?: T; cmsKey?: string }) {
    const { cmsKey, content: given, ...rest } = props;
    const content = await getSection(cmsKey ?? key ?? '', (given ?? defaults) as T);
    if (!content) return null;
    return Inner({ ...(rest as unknown as P), content });
  };
}

/**
 * A page's metadata with its CMS-edited Google title and description.
 *   export const generateMetadata = cmsMetadata('sea-freight', '/sea-freight');
 */
export function cmsMetadata(page: string, path: string, options: { noIndex?: boolean } = {}) {
  return async function generateMetadata(): Promise<Metadata> {
    const defaults = PAGE_SEO[page];
    const seo = defaults ? ((await getSection(`${page}.seo`, defaults)) ?? defaults) : { title: '', description: '' };
    return pageMetadata({ ...seo, path, ...options });
  };
}
