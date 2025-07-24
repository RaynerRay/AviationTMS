import { getServerUser } from '@/actions/auth';
import { getSchoolNotifications } from '@/actions/site';
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  // Redirect unauthenticated or unauthorized users
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  // const notifications = await getSchoolNotifications(user.schoolId ?? '');
  // const notifications = await getSchoolNotifications(user.schoolId ?? '');

  return (
    <ClientDashboard user={user}
    //  notifications={notifications}
     >
      {children}
    </ClientDashboard>
  );
}
