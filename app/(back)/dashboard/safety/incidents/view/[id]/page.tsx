// app/(your-dashboard-path)/incidents/[id]/page.tsx

import { notFound } from "next/navigation";
import { getIncidentById } from "@/actions/incidents";
import IncidentDetailView from "@/components/dashboard/IncidentDetailedView";
import { getServerSchool, getServerUser } from "@/actions/auth";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) return notFound();

  const [user, school, incident] = await Promise.all([
    getServerUser(),
    getServerSchool(),
    getIncidentById(id),
  ]);

  if (!user?.role || !incident || incident.schoolId !== school?.id) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <IncidentDetailView incident={incident} currentUserRole={user.role} />
    </div>
  );
}
