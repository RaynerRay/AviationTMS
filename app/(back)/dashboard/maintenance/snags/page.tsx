
import {  getServerSchool, getServerUser } from "@/actions/auth";
import { getSnags } from "@/actions/snags";
import SnagsList from "@/components/dashboard/SnagsList";

export default async function page() {
  const school = await getServerSchool();
  const user = await getServerUser();

  if (!user?.role) {
    return (
      <div className="p-6 text-center text-red-600">
        Unauthorised: User role missing.
      </div>
    );
  }

  // Filter by school
  const snags =
    (await getSnags(school?.id ?? "", )) || [];

  
console.log("snag" + user?.role)
 

  return (
    <div className="h-screen bg-gray-50">
        <SnagsList snags={snags} currentUserRole={user?.role}/>
    </div>
  );
}