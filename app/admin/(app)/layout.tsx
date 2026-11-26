import { requireAdmin } from '@/lib/cms/auth';
import { allStatuses, hiddenPageIds, navFrom } from '@/lib/cms/admin';
import AdminShell from '@/components/cms/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const [admin, statuses, hidden] = await Promise.all([requireAdmin(), allStatuses().catch(() => []), hiddenPageIds()]);
  const nav = navFrom(statuses);
  return (
    <AdminShell nav={nav} email={admin.email} hiddenPages={hidden}>
      {children}
    </AdminShell>
  );
}
