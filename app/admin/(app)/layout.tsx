import { requireAdmin } from '@/lib/cms/auth';
import { allStatuses, navFrom } from '@/lib/cms/admin';
import AdminShell from '@/components/cms/admin/AdminShell';

// Admin pages always show the latest content.
export const dynamic = 'force-dynamic';

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const nav = navFrom(await allStatuses().catch(() => []));
  return (
    <AdminShell nav={nav} email={admin.email}>
      {children}
    </AdminShell>
  );
}
