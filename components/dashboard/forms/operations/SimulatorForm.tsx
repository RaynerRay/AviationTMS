"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { SimulatorType, SimulatorStatus } from "@/types/types";
import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import { getCurrentTime } from "@/lib/timeUtils";
import { createUserLog } from "@/actions/user-logs";
import { createSimulator } from "@/actions/simulator";

export type SelectOptionProps = {
  label: string;
  value: string;
};

type SingleSimulatorFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};

export type SimulatorProps = {
  name: string;
  model: string;
  simulatorType: SimulatorType;
  hourlyRate: number;
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: SimulatorStatus;
  schoolId: string;
  imageUrl?: string;
};

export default function SimulatorForm({
  editingId,
  initialData,
}: SingleSimulatorFormProps) {
  // Simulator type options
  const simulatorTypes = [
    { label: "Basic Aviation Training Device (BATD)", value: "BASIC_AVIATION_TRAINING_DEVICE" },
    { label: "Advanced Aviation Training Device (AATD)", value: "ADVANCED_AVIATION_TRAINING_DEVICE" },
    { label: "Flight Training Device (FTD)", value: "FLIGHT_TRAINING_DEVICE" },
    { label: "Full Flight Simulator (FFS)", value: "FULL_FLIGHT_SIMULATOR" },
    { label: "Virtual Reality", value: "VIRTUAL_REALITY" },
    { label: "Fixed Base", value: "FIXED_BASE" },
  ];
  const [selectedSimulatorType, setSelectedSimulatorType] = useState<any>(
    simulatorTypes.find(type => type.value === initialData?.simulatorType) || simulatorTypes[0]
  );

  // Simulator status options
  const simulatorStatuses = [
    { label: "Available", value: "AVAILABLE" },
    { label: "In Use", value: "IN_USE" },
    { label: "Maintenance", value: "MAINTENANCE" },
    { label: "Out of Service", value: "OUT_OF_SERVICE" },
  ];
  const [selectedStatus, setSelectedStatus] = useState<any>(
    simulatorStatuses.find(status => status.value === initialData?.status) || simulatorStatuses[0]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SimulatorProps>({
    defaultValues: {
      name: initialData?.name || "",
      model: initialData?.model || "",
      hourlyRate: initialData?.hourlyRate || 0,
      location: initialData?.location || "",
      lastMaintenance: initialData?.lastMaintenance ? 
        new Date(initialData.lastMaintenance).toISOString().split('T')[0] : "",
      nextMaintenance: initialData?.nextMaintenance ? 
        new Date(initialData.nextMaintenance).toISOString().split('T')[0] : "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/simulator.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  const { school } = useSchoolStore();
  const { user } = useUserSession();
  const { getDeviceInfo } = useDeviceInfo();

  async function saveSimulator(data: SimulatorProps) {
    try {
      setLoading(true);

      // Convert string values to proper types for database
      const simulatorData = {
        ...data,
        hourlyRate: parseFloat(data.hourlyRate.toString()) || 0,
        schoolId: school?.id ?? "",
        imageUrl: imageUrl,
        simulatorType: selectedSimulatorType?.value as SimulatorType,
        status: selectedStatus?.value as SimulatorStatus,
        // Convert date strings to Date objects if they exist
        lastMaintenance: data.lastMaintenance ? new Date(data.lastMaintenance) : undefined,
        nextMaintenance: data.nextMaintenance ? new Date(data.nextMaintenance) : undefined,
      };

      if (!editingId) {
        await createSimulator(simulatorData);

        const name = user?.name ?? "";
        const deviceInfo = await getDeviceInfo();
        const { time } = getCurrentTime();

        await createUserLog({
          name,
          activity: `User (${name}) Created a new Simulator (${simulatorData.name})`,
          time,
          ipAddress: deviceInfo.ipAddress,
          device: deviceInfo.device,
          schoolId: school?.id ?? "",
        });

       
        reset();
        setImageUrl("/simulator.png");
        setSelectedSimulatorType(simulatorTypes[0]);
        setSelectedStatus(simulatorStatuses[0]);
        toast.success("Simulator Successfully Created!");
        router.push("/dashboard/operations/simulators");
      } else {
        // Handle update logic here when implementing edit functionality
        toast.success("Simulator Successfully Updated!");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveSimulator)}>
      <div className="max-w-7xl mx-auto p-6">
        
      <FormHeader
        href="/simulators"
        parent=""
        title="Simulator"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8 ">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            {/* Basic Simulator Information */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Simulator Name"
                name="name"
                placeholder="e.g., Cessna 172 Simulator"
                toolTipText="A descriptive name for the simulator"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Model"
                name="model"
                placeholder="e.g., Redbird TD2"
                toolTipText="The specific model/brand of the simulator"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Location"
                name="location"
                placeholder="e.g., Training Room A"
                toolTipText="Physical location of the simulator"
              />
            </div>

            {/* Simulator Type and Status */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Simulator Type"
                options={simulatorTypes}
                option={selectedSimulatorType}
                setOption={setSelectedSimulatorType}
                isSearchable={false}
                toolTipText="Select the certification level of the simulator"
              />
              <FormSelectInput
                label="Status"
                options={simulatorStatuses}
                option={selectedStatus}
                setOption={setSelectedStatus}
                isSearchable={false}
                toolTipText="Current operational status of the simulator"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Hourly Rate"
                name="hourlyRate"
                type="number"
                min={0}
                unit="R"
                toolTipText="Cost per hour for simulator training"
              />
            </div>

            {/* Maintenance Dates */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Last Maintenance"
                name="lastMaintenance"
                type="date"
                toolTipText="Date of the most recent maintenance check"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Next Maintenance"
                name="nextMaintenance"
                type="date"
                toolTipText="Scheduled date for the next maintenance check"
              />
              <div></div> {/* Empty div for grid alignment */}
            </div>

            {/* Image Upload */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="grid">
                <ImageInput
                  title="Simulator Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="simulatorImage"
                  className="object-contain"
                />
              </div>
              <div></div> {/* Empty div for grid alignment */}
            </div>
          </div>
        </div>
      </div>

      <FormFooter
        href="/simulators"
        editingId={editingId}
        loading={loading}
        title="Simulator"
        parent=""
      />
      </div>
    </form>
  );
}