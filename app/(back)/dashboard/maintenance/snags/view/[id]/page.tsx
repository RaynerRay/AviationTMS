// app/(your-dashboard-path)/snags/[id]/page.tsx

import { notFound } from "next/navigation";
import { getSnagById } from "@/actions/snags";
import SnagDetailedView from "@/components/dashboard/SnagDetailedView";
import { getServerSchool, getServerUser } from "@/actions/auth";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) return notFound();

  const [user, school, snag] = await Promise.all([
    getServerUser(),
    getServerSchool(),
    getSnagById(id),
  ]);

  if (!user?.role || !snag || snag.schoolId !== school?.id) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SnagDetailedView snag={snag} currentUserRole={user.role} />
    </div>
  );
}
