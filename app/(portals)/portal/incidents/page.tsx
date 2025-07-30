import { getServerSchool, getServerUser } from "@/actions/auth";
import { getIncidents } from "@/actions/incidents";
import IncidentsList from "@/components/dashboard/IncidentsList";

export default async function page() {
  const school = await getServerSchool();
  const incidents = (await getIncidents(school?.id ?? "")) || [];
  const user = await getServerUser();

  if (!user?.role) {
    return (
      <div className="p-6 text-center text-red-600">
        Unauthorized: User role missing.
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50">
      <IncidentsList incidents={incidents}  currentUserRole={user.role} />
    </div>
  );
}
