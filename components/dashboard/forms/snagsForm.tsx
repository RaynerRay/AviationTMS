"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createSnag } from "@/actions/snags";
import { CreateSnag, SnagSeverity, SnagStatus } from "@/types/types";

import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";

import TextInput from "@/components/FormInputs/TextInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import TextArea from "@/components/FormInputs/TextAreaInput";

interface SnagFormProps {
  editingId?: string;
  initialData?: Partial<CreateSnag> | null;
}

export default function SnagsForm({ editingId, initialData }: SnagFormProps) {
  const severityOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Critical", value: "CRITICAL" },
  ];

  const statusOptions = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Resolved", value: "RESOLVED" },
    { label: "Closed", value: "CLOSED" },
  ];

  const [selectedSeverity, setSelectedSeverity] = useState(
    severityOptions.find((s) => s.value === initialData?.severity) || severityOptions[0]
  );

  const [selectedStatus, setSelectedStatus] = useState(
    statusOptions.find((s) => s.value === initialData?.status) || statusOptions[0]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSnag>({
    defaultValues: {
      reportedAt: initialData?.reportedAt || new Date().toISOString().split("T")[0],
      reportedBy: initialData?.reportedBy || "",
      equipmentName: initialData?.equipmentName || "",
      description: initialData?.description || "",
      assignedTo: initialData?.assignedTo || "",
      resolvedAt: initialData?.resolvedAt || "",
      resolutionNote: initialData?.resolutionNote || "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { school } = useSchoolStore();
  const { user } = useUserSession();

  async function saveSnag(data: CreateSnag) {
    try {
      setLoading(true);
  
      const payload: CreateSnag = {
        ...data,
        severity: selectedSeverity.value as SnagSeverity,
        status: selectedStatus.value as SnagStatus,
        reportedAt: new Date(data.reportedAt).toISOString(),
        schoolId: school?.id || "",
      };
  
      if (!editingId) {
        delete payload.assignedTo;
        delete payload.resolvedAt;
        delete payload.resolutionNote;
      }
  
      await createSnag(payload);
      toast.success("Snag successfully saved!");
  
      // ✅ Role-based redirect
      if (user?.role === "ADMIN") {
        router.push("/dashboard/maintenance/snags");
      } else if (user?.role === "STUDENT" || user?.role === "TEACHER") {
        router.push("/portal/snags");
      } else {
        router.push("/"); // fallback
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save snag.");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <form onSubmit={handleSubmit(saveSnag)}>
      <div className="max-w-5xl mx-auto p-6">
        <FormHeader
          href="/snags"
          parent="Portal"
          title="Snag Report"
          editingId={editingId}
          loading={loading}
        />

        <div className="grid grid-cols-12 gap-6 py-8">
          <div className="lg:col-span-12 col-span-full space-y-3">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Reported By"
                  name="reportedBy"
                  placeholder="Technician or Instructor name"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Reported At"
                  name="reportedAt"
                  type="date"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Equipment Name"
                  name="equipmentName"
                  placeholder="e.g. ZS-ABC or Simulator 1"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                  label="Severity"
                  options={severityOptions}
                  option={selectedSeverity}
                  setOption={setSelectedSeverity}
                  isSearchable={false}
                />
                <FormSelectInput
                  label="Status"
                  options={statusOptions}
                  option={selectedStatus}
                  setOption={setSelectedStatus}
                  isSearchable={false}
                />
              </div>

              <TextArea
                register={register}
                errors={errors}
                label="Description"
                name="description"
              />

              {/* Only show these if editing */}
              {editingId && (
                <>
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Assigned To"
                    name="assignedTo"
                    placeholder="Engineer or team assigned"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Resolved At"
                    name="resolvedAt"
                    type="date"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Resolution Note"
                    name="resolutionNote"
                    placeholder="Details on how it was resolved"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <FormFooter
          href="/snags"
          editingId={editingId}
          loading={loading}
          title="Snag"
          parent="Maintenance"
        />
      </div>
    </form>
  );
}
