import { requireAdmin } from '@/lib/cms/auth';
import { allStatuses, hiddenPageIds, navFrom } from '@/lib/cms/admin';
import AdminShell from '@/components/cms/admin/AdminShell';

// Admin pages always show the latest content.
export const dynamic = 'force-dynamic';

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  // Checked side by side; nothing is shown unless the sign-in check passes.
  const [admin, statuses, hidden] = await Promise.all([requireAdmin(), allStatuses().catch(() => []), hiddenPageIds()]);
  const nav = navFrom(statuses);
  return (
    <AdminShell nav={nav} email={admin.email} hiddenPages={hidden}>
      {children}
    </AdminShell>
  );
}
