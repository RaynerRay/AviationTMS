"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import TextInput from "@/components/FormInputs/TextInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import { createMaintenanceLog } from "@/actions/maintenance";
import { MaintenanceStatus, MaintenanceType, CreateMaintenanceLogProps } from "@/types/types";
import { useUserSession } from "@/store/auth";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import { getCurrentTime } from "@/lib/timeUtils";
import useSchoolStore from "@/store/school";
import { createUserLog } from "@/actions/user-logs";

type MaintenanceLogFormProps = {
  editingId?: string;
  initialData?: Partial<CreateMaintenanceLogProps> | null;
  aircraftId: string;
};

export default function MaintenanceLogForm({
  editingId,
  initialData,
  aircraftId,
}: MaintenanceLogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUserSession();
  const { getDeviceInfo } = useDeviceInfo();
  const { school } = useSchoolStore();


  const maintenanceTypes = Object.values(MaintenanceType).map((type) => ({
    label: type.charAt(0) + type.slice(1).toLowerCase(),
    value: type,
  }));

  const maintenanceStatuses = Object.values(MaintenanceStatus).map((status) => ({
    label: status.replace("_", " ").toLowerCase().replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    value: status,
  }));

  const [selectedType, setSelectedType] = useState(
    maintenanceTypes.find((t) => t.value === initialData?.maintenanceType) || maintenanceTypes[0]
  );

  const [selectedStatus, setSelectedStatus] = useState(
    maintenanceStatuses.find((s) => s.value === initialData?.status) || maintenanceStatuses[0]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMaintenanceLogProps>({
    defaultValues: {
      // Convert initial string dates to Date objects if they exist, otherwise undefined
      logDate: initialData?.logDate ? new Date(initialData.logDate) : undefined,
      description: initialData?.description || "",
      performedBy: initialData?.performedBy || "",
      cost: initialData?.cost || undefined,
      // Update from partReplaced to partsReplaced and ensure it's an array of strings
      partsReplaced: initialData?.partsReplaced || [],
      hoursAtMaintenance: initialData?.hoursAtMaintenance || undefined,
      // Convert initial string dates to Date objects if they exist, otherwise undefined
      nextDueDate: initialData?.nextDueDate ? new Date(initialData.nextDueDate) : undefined,
    },
  });

  async function saveMaintenanceLog(data: CreateMaintenanceLogProps) {
    try {
      setLoading(true);

      const payload: CreateMaintenanceLogProps = {
        ...data,
        aircraftId,
        maintenanceType: selectedType.value as MaintenanceType,
        status: selectedStatus.value as MaintenanceStatus,
        cost: data.cost ? parseFloat(data.cost.toString()) : undefined,
        hoursAtMaintenance: data.hoursAtMaintenance ? Number(data.hoursAtMaintenance) : undefined,
        logDate: new Date(data.logDate), // Ensure this is a Date object
        nextDueDate: data.nextDueDate ? new Date(data.nextDueDate) : undefined, // Ensure this is a Date object or undefined
      
        partsReplaced: Array.isArray(data.partsReplaced) 
          ? data.partsReplaced 
          : (data.partsReplaced ? (data.partsReplaced as string).split(',').map(part => part.trim()) : []),
      };

      await createMaintenanceLog(payload);

      const name = user?.name ?? "";
      const deviceInfo = await getDeviceInfo();
      const { time } = getCurrentTime();

      // Log user activity
      await createUserLog({
        name,
        activity: `Created Maintenance Log for Aircraft (${aircraftId})`,
        time,
        ipAddress: deviceInfo.ipAddress,
        device: deviceInfo.device,
        schoolId: school?.id ?? "",
      });

      toast.success("Maintenance log created successfully");
      reset();
      setSelectedType(maintenanceTypes[0]);
      setSelectedStatus(maintenanceStatuses[0]);
      router.push(`/aircrafts/${aircraftId}`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveMaintenanceLog)}>
      <div className="max-w-5xl mx-auto p-6">
        <FormHeader
          title="Maintenance Log"
          href={`/aircrafts/${aircraftId}`}
          loading={loading}
          editingId={editingId}
          parent="Aircraft"
        />

        <div className="grid grid-cols-12 gap-6 py-8">
          <div className="lg:col-span-12 col-span-full space-y-4">
            {/* Core Inputs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextInput
                register={register}
                errors={errors}
                name="logDate"
                label="Log Date"
                type="date"
              />
              <FormSelectInput
                label="Maintenance Type"
                options={maintenanceTypes}
                option={selectedType}
                setOption={setSelectedType}
              />
              <FormSelectInput
                label="Status"
                options={maintenanceStatuses}
                option={selectedStatus}
                setOption={setSelectedStatus}
              />
              <TextInput
                register={register}
                errors={errors}
                name="performedBy"
                label="Performed By"
                placeholder="e.g., John Doe"
              />
              <TextInput
                register={register}
                errors={errors}
                name="cost"
                label="Cost"
                type="number"
                unit="R"
              />
              <TextInput
                register={register}
                errors={errors}
                name="hoursAtMaintenance"
                label="Hours at Maintenance"
                type="number"
              />
              <TextInput
                register={register}
                errors={errors}
                name="nextDueDate"
                label="Next Due Date"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                name="partsReplaced" // Changed to partsReplaced
                label="Parts Replaced"
                placeholder="Comma-separated values, e.g., 'Engine Oil, Oil Filter'"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2"
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">Description is required</p>
              )}
            </div>
          </div>
        </div>

        <FormFooter
          title="Maintenance Log"
          href={`/aircrafts/${aircraftId}`}
          loading={loading}
          editingId={editingId}
        />
      </div>
    </form>
  );
}