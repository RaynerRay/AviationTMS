import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Users } from "lucide-react";
import SingleStudentForm from "@/components/dashboard/forms/students/student-form";
import BulkStudentForm from "@/components/dashboard/forms/students/bulk-student-form";
import InfoBanner from "@/components/info-banner";
import { getAllClasses } from "@/actions/classes";
import { getAllParents } from "@/actions/parents";
import { getStudentNextSequence } from "@/actions/students";
import { getServerSchool } from "@/actions/auth";

export default async function AdmissionTabs() {
  const school = await getServerSchool();
  const classes = (await getAllClasses(school?.id ?? "")) || [];
  const parents = (await getAllParents(school?.id ?? "")) || [];
  const nextSequence = (await getStudentNextSequence(school?.id ?? "")) || 0;
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
   <SingleStudentForm
                nextSeq={nextSequence}
                parents={parents}
                classes={classes}
              />
    </div>
  );
}
