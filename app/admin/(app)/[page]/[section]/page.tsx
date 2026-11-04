import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/cms/auth';
import { sectionStatus } from '@/lib/cms/admin';
import { cmsWritable } from '@/lib/cms/store';
import { findSection, sectionKey } from '@/lib/cms/registry';
import Editor from '@/components/cms/admin/Editor';

type Props = { params: Promise<{ page: string; section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page, section } = await params;
  const found = findSection(sectionKey(page, section));
  return { title: found ? `${found.section.label} · ${found.page.label}` : 'Section' };
}

export default async function SectionEditor({ params }: Props) {
  const { page, section } = await params;
  const key = sectionKey(page, section);
  await requireAdmin(`/admin/${page}/${section}`);
  const s = await sectionStatus(key);
  if (!s) notFound();
  return (
    <Editor
      key={`${key}-${s.updatedAt ?? 'original'}`}
      sectionKey={key}
      pageId={s.page.id}
      pageLabel={s.page.label}
      pagePath={s.page.path}
      label={s.section.label}
      note={s.section.note}
      hints={s.section.hints ?? {}}
      original={s.original}
      originalArabic={s.originalArabic}
      current={s.current}
      arabic={s.arabic}
      enabled={s.enabled}
      updatedAt={s.updatedAt}
      updatedBy={s.updatedBy}
      writable={cmsWritable()}
    />
  );
}
