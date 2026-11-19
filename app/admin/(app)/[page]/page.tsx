import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { requireAdmin } from '@/lib/cms/auth';
import { allStatuses, hiddenPageIds } from '@/lib/cms/admin';
import { canHide } from '@/lib/cms/visibility';
import PageSwitch from '@/components/cms/admin/PageSwitch';
import { findPage } from '@/lib/cms/registry';
import SectionList from '@/components/cms/admin/SectionList';

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: findPage((await params).page)?.label ?? 'Page' };
}

export default async function PageSections({ params }: Props) {
  const { page: pageId } = await params;
  const page = findPage(pageId);
  const [, all, hidden] = await Promise.all([requireAdmin(`/admin/${pageId}`), allStatuses(), hiddenPageIds()]);
  if (!page) notFound();
  const statuses = all.filter((s) => s.page.id === page.id);
  const missing = statuses.reduce((n, s) => n + s.missingArabic, 0);

  return (
    <>
      <div className="c-head">
        <div>
          <h1 className="c-title">{page.label}</h1>
          <p className="c-sub">
            {page.path
              ? `${statuses.length} sections, in the order they appear on the page. Switch one off to hide it from the site.`
              : `${statuses.length} parts that appear on every page of the site.`}
          </p>
        </div>
        <div className="c-head-actions">
          {missing > 0 && <span className="c-pill warn"><i />{missing} texts need Arabic</span>}
          {page.path && (
            <a className="c-btn" href={page.path} target="_blank" rel="noopener">
              <ExternalLink aria-hidden="true" />
              View page
            </a>
          )}
        </div>
      </div>
      {canHide(page.path) && <PageSwitch key={String(hidden.includes(page.id))} pageId={page.id} label={page.label} enabled={!hidden.includes(page.id)} />}
      <SectionList
        pageId={page.id}
        sections={statuses.map((s) => ({
          id: s.section.id,
          key: s.key,
          label: s.section.label,
          summary: s.section.note ?? s.summary,
          enabled: s.enabled,
          edited: s.edited,
          missingArabic: s.missingArabic,
        }))}
      />
    </>
  );
}
