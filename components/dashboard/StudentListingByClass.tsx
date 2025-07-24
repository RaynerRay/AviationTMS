"use client";

import useSchoolStore from "@/store/school";
import { Class, Student, UserRole } from "@/types/types";
import React, { useState } from "react";
import TableHeader from "./Tables/TableHeader";
import DataTable from "../DataTableComponents/DataTable";
import { columns } from "@/app/(back)/dashboard/students/columns";
import { columns as studentColumns } from "@/app/(portals)/portal/teacher/students/columns";
import { columns as secStudentColumns } from "@/app/(portals)/portal/secretary/students/columns";
import { Card, CardContent } from "../ui/card";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { Button } from "../ui/button";
import { getStudentsByClass } from "@/actions/students";
import { Loader2 } from "lucide-react";

export type StudentByClassProps = {
  classId: string;
  streamId: string;
  schoolId: string;
};

export default function StudentListingByClass({
  classes = [],
  role = "ADMIN",
}: {
  classes?: Class[] | null;
  role?: UserRole;
}) {
  const { school } = useSchoolStore();
  const [students, setStudents] = useState<Student[]>([]);

  const classOptions = (classes ?? []).map((item) => ({
    label: item.title,
    value: item.id,
  }));
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0] ?? null);
  const classId = selectedClass?.value ?? "";

  const streams = classes?.find((item) => item.id === classId)?.streams ?? [];
  const streamsOptions = [
    {
      label: "All Streams",
      value: "all",
    },
    ...streams.map((item) => ({
      label: item.title,
      value: item.id,
    })),
  ];
  const [selectedStream, setSelectedStream] = useState<any>(streamsOptions[0] ?? null);

  const [loading, setLoading] = useState(false);

  const displayColumns =
    role === "TEACHER"
      ? studentColumns
      : role === "SECRETARY"
      ? secStudentColumns
      : columns;

  async function getStudentList() {
    setStudents([]);
    setLoading(true);
    try {
      const classId = selectedClass?.value ?? "";
      const streamId = selectedStream?.value ?? "";
      const data: StudentByClassProps = {
        classId,
        streamId,
        schoolId: school?.id ?? "",
      };
      const students = await getStudentsByClass(data);
      setStudents(students);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 space-y-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-3">
            <FormSelectInput
              label="Class"
              options={classOptions}
              option={selectedClass}
              setOption={setSelectedClass}
            />
            <FormSelectInput
              label="Stream/Section"
              options={streamsOptions}
              option={selectedStream}
              setOption={setSelectedStream}
            />
          </div>
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin mr-2" />
              Fetching Please wait...
            </Button>
          ) : (
            <Button onClick={getStudentList}>Get Student List</Button>
          )}
        </CardContent>
      </Card>

      {students.length > 0 && (
        <>
          <TableHeader
            title={`Student List (${selectedClass?.label ?? "Class"}) - ${selectedStream?.label ?? "Stream"}`}
            linkTitle="Add student"
            href={
              role === "SECRETARY"
                ? "/portal/secretary/students/new"
                : "/dashboard/students/new"
            }
            data={students}
            model="student"
          />
          <div className="py-8">
            <DataTable data={students} columns={displayColumns} />
          </div>
        </>
      )}
    </div>
  );
}
