"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CreateIncident, IncidentStatus, IncidentType } from "@/types/types";
import { createIncident } from "@/actions/incidents";
import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";
import { getTodayDate } from "@/lib/getTodayDate";
import FormHeader from "./FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import FormFooter from "./FormFooter";

type IncidentFormValues = {
  occurredAt: string;
  reportedBy: string;
  involvedPeople: string;
  equipmentName?: string;
  flightSessionId?: string;
  location: string;
  description: string;
  investigator?: string | null;
  investigation?: string | null;
  correctiveAction?: string | null;
  closedAt?: string | null;
  schoolId: string;
};

interface IncidentFormProps {
  editingId?: string;
  initialData?: Partial<CreateIncident> | null;
}

export default function IncidentForm({ editingId, initialData }: IncidentFormProps) {
  const typeOptions = [
    { label: "SAFETY", value: "SAFETY" },
    { label: "OPERATIONAL", value: "OPERATIONAL" },
    { label: "MEDICAL", value: "MEDICAL" },
    { label: "TECHNICAL", value: "TECHNICAL" },
    { label: "OTHER", value: "OTHER" },
  ];

  const statusOptions = [
    { label: "Open", value: "OPEN" },
    { label: "Investigating", value: "INVESTIGATING" },
    { label: "Closed", value: "CLOSED" },
  ];

  const { school } = useSchoolStore();
  const { user } = useUserSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedType, setSelectedType] = useState(
    typeOptions.find((s) => s.value === initialData?.type) || typeOptions[0]
  );

  const [selectedStatus, setSelectedStatus] = useState(
    statusOptions.find((s) => s.value === initialData?.status) || statusOptions[0]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IncidentFormValues>({
    defaultValues: {
      occurredAt: initialData?.occurredAt || getTodayDate(),
      reportedBy: "", // will be set in useEffect
      involvedPeople: (initialData?.involvedPeople || []).join(", "),
      equipmentName: initialData?.equipmentName || "",
      flightSessionId: initialData?.flightSessionId || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      investigator: initialData?.investigator || "",
      investigation: initialData?.investigation || "",
      correctiveAction: initialData?.correctiveAction || "",
      closedAt: initialData?.closedAt || "",
      schoolId: school?.id || "",
    },
  });

  // Set reportedBy once user is loaded
  useEffect(() => {
    if (user?.name || user?.email) {
      setValue("reportedBy", user.name || user.email);
    }
  }, [user, setValue]);

  async function saveIncident(data: IncidentFormValues) {
    if (!user || !school) {
      toast.error("Missing user or school information.");
      return;
    }

    try {
      setLoading(true);

      const payload: CreateIncident = {
        ...data,
        type: selectedType.value as IncidentType,
        status: selectedStatus.value as IncidentStatus,
        occurredAt: new Date(data.occurredAt).toISOString(),
        involvedPeople: data.involvedPeople
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
        schoolId: school.id,
        school: school, // full object required by type
      };

      if (!editingId) {
        delete payload.investigator;
        delete payload.investigation;
        delete payload.correctiveAction;
        delete payload.closedAt;
      }

      await createIncident(payload);
      toast.success("Incident successfully saved!");

      if (user.role === "ADMIN") {
        router.push("/dashboard/safety/incidents");
      } else if (user.role === "STUDENT" || user.role === "TEACHER") {
        router.push("/portal/incidents");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save incident.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(saveIncident)}>
      <div className="max-w-5xl mx-auto p-6">
        <FormHeader
          href="/incidents"
          parent="/"
          title="Incident Report"
          editingId={editingId}
          loading={loading}
        />

        <div className="grid grid-cols-12 gap-6 py-8">
          <div className="lg:col-span-12 col-span-full space-y-3">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
              {/* <TextInput
  register={register}
  errors={errors}
  label="Reported By"
  name="reportedBy"
  placeholder="Reporter name"
  disabled
/> */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="Occurred At"
                  name="occurredAt"
                  type="date"
                  disabled={loading}
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Location"
                  name="location"
                  placeholder="Where it happened"
                  disabled={loading}
                />
              </div>

              <TextInput
                register={register}
                errors={errors}
                label="Involved People (comma-separated)"
                name="involvedPeople"
                placeholder="Names of those involved"
                disabled={loading}
              />

              <TextInput
                register={register}
                errors={errors}
                label="Equipment Name"
                name="equipmentName"
                placeholder="Name of equipment involved"
                disabled={loading}
              />

<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
              <FormSelectInput
                label="Type"
                options={typeOptions}
                option={selectedType}
                setOption={setSelectedType}
                isSearchable={false}
                disabled={loading}
              />
              <FormSelectInput
                label="Status"
                options={statusOptions}
                option={selectedStatus}
                setOption={setSelectedStatus}
                isSearchable={false}
                disabled={loading}
              />
              </div>

              <TextArea
                register={register}
                errors={errors}
                label="Describe what happened"
                name="description"
                disabled={loading}
              />

              {editingId && (
                <>
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Investigator"
                    name="investigator"
                    placeholder="Who is handling the case"
                    disabled={loading}
                  />

                  <TextArea
                    register={register}
                    errors={errors}
                    label="Investigation Details"
                    name="investigation"
                    disabled={loading}
                  />

                  <TextArea
                    register={register}
                    errors={errors}
                    label="Steps taken to prevent recurrence"
                    name="correctiveAction"
                    disabled={loading}
                  />

                  <TextInput
                    register={register}
                    errors={errors}
                    label="Closed At"
                    name="closedAt"
                    type="date"
                    disabled={loading}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <FormFooter
          href="/incidents"
          editingId={editingId}
          loading={loading}
          title="Incident"
          parent="Safety"
        />
      </div>
    </form>
  );
}
