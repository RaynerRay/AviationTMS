import SchoolAdminForm from "@/components/dashboard/forms/school/school-admin-form";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ schoolId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const schoolId = (await params).schoolId;
  const name = (await searchParams).name;
  if (!schoolId || !name) {
    return notFound();
  }
  return (
    <>
    <SchoolAdminForm schoolId={schoolId} schoolName={name as string} />
    </>
          
       
  );
}
