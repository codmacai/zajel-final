import type React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "./seo";

import { mergeContent } from './content';
import { readAllRows } from './store';
import { PAGES_KEY, parseVisibility, type PageVisibility } from './visibility';

export async function hiddenPages(): Promise<PageVisibility> {
  return parseVisibility((await readAllRows()).find((r) => r.key === PAGES_KEY)?.en);
}

export async function notFoundIfHidden(page: string) {
  if ((await hiddenPages()).pages.includes(page)) notFound();
}

export async function getSection<T>(key: string, defaults: T): Promise<T | null> {
  const row = (await readAllRows()).find((r) => r.key === key);
  if (!row) return defaults;
  if (!row.enabled) return null;
  return mergeContent(defaults, row.en);
}

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

export function cmsMetadata(page: string, path: string, options: { noIndex?: boolean } = {}) {
  return async function generateMetadata(): Promise<Metadata> {
    if (page !== 'home') await notFoundIfHidden(page);
    const defaults = PAGE_SEO[page];
    const seo = defaults ? ((await getSection(`${page}.seo`, defaults)) ?? defaults) : { title: '', description: '' };
    return pageMetadata({ ...seo, path, ...options });
  };
}
