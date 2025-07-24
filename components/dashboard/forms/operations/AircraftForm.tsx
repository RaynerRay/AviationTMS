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
import { AircraftType, AircraftStatus, AircraftProps } from "@/types/types";
import { createAircraft } from "@/actions/aircrafts";
import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import { getCurrentTime } from "@/lib/timeUtils";
import { createUserLog } from "@/actions/user-logs";
import AircraftHoursInput from "./AircraftHoursInput";



type SingleAircraftFormProps = {
  editingId?: string;
  initialData?: Partial<AircraftProps> | null;
};

export default function AircraftForm({
  editingId,
  initialData,
}: SingleAircraftFormProps) {
  const aircraftTypes = [
    { label: "Single Engine Piston", value: "SINGLE_ENGINE_PISTON" },
    { label: "Multi Engine Piston", value: "MULTI_ENGINE_PISTON" },
    { label: "Turboprop", value: "TURBOPROP" },
    { label: "Jet", value: "JET" },
    { label: "Helicopter", value: "HELICOPTER" },
    { label: "Glider", value: "GLIDER" },
    { label: "Ultralight", value: "ULTRALIGHT" },
  ];

  const aircraftStatuses = [
    { label: "Available", value: "AVAILABLE" },
    { label: "In Flight", value: "IN_FLIGHT" },
    { label: "Maintenance", value: "MAINTENANCE" },
    { label: "Out of Service", value: "OUT_OF_SERVICE" },
    { label: "Reserved", value: "RESERVED" },
  ];

  const [selectedAircraftType, setSelectedAircraftType] = useState(
    aircraftTypes.find((type) => type.value === initialData?.aircraftType) || aircraftTypes[0]
  );

  const [selectedStatus, setSelectedStatus] = useState(
    aircraftStatuses.find((status) => status.value === initialData?.status) || aircraftStatuses[0]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AircraftProps>({
    defaultValues: {
      tailNumber: initialData?.tailNumber || "",
      make: initialData?.make || "",
      model: initialData?.model || "",
      engineHours: initialData?.engineHours || 0,
      
      airframeHours: initialData?.airframeHours || 0,
      lastInspection: initialData?.lastInspection
        ? new Date(initialData.lastInspection).toISOString().split("T")[0]
        : "",
      nextInspection: initialData?.nextInspection
        ? new Date(initialData.nextInspection).toISOString().split("T")[0]
        : "",
      location: initialData?.location || "",
      hourlyRate: initialData?.hourlyRate || 0,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/aircraft.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  const { school } = useSchoolStore();
  const { user } = useUserSession();
  const { getDeviceInfo } = useDeviceInfo();

  async function saveAircraft(data: AircraftProps) {
    try {
      setLoading(true);
  
      const aircraftData: AircraftProps = {
        ...data,
        engineHours: Number(data.engineHours),
        airframeHours: Number(data.airframeHours),
        hourlyRate: Number(data.hourlyRate),
        schoolId: school?.id ?? "",
        schoolName: school?.name ?? "",
        imageUrl: imageUrl,
        aircraftType: selectedAircraftType?.value as AircraftType,
        status: selectedStatus?.value as AircraftStatus,
      };
  
      if (!editingId) {
        await createAircraft(aircraftData);
  
        const name = user?.name ?? "";
        const deviceInfo = await getDeviceInfo();
        const { time } = getCurrentTime();
  
        await createUserLog({
          name,
          activity: `User (${name}) Created a new Aircraft (${aircraftData.tailNumber})`,
          time,
          ipAddress: deviceInfo.ipAddress,
          device: deviceInfo.device,
          schoolId: school?.id ?? "",
        });
  
        toast.success("Aircraft Successfully Created!");
        router.push("/dashboard/operations/aircrafts");
      } else {
        toast.success("Aircraft Successfully Updated!");
        router.push("/dashboard/operations/aircrafts");
        // TODO: Handle update logic if needed
      }
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  
  

  return (
    <form onSubmit={handleSubmit(saveAircraft)}>
      <div className="max-w-7xl mx-auto p-6">
        <FormHeader
          href="/aircrafts"
          parent=""
          title="Aircraft"
          editingId={editingId}
          loading={loading}
        />

        <div className="grid grid-cols-12 gap-6 py-8">
          <div className="lg:col-span-12 col-span-full space-y-3">
            <div className="grid gap-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Tail Number"
                  name="tailNumber"
                  placeholder="e.g., N12345"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Make"
                  name="make"
                  placeholder="e.g., Cessna"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Model"
                  name="model"
                  placeholder="e.g., 172"
                />
              </div>

              {/* Type / Status / Location */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                  label="Aircraft Type"
                  options={aircraftTypes}
                  option={selectedAircraftType}
                  setOption={setSelectedAircraftType}
                  isSearchable={false}
                />
                <FormSelectInput
                  label="Status"
                  options={aircraftStatuses}
                  option={selectedStatus}
                  setOption={setSelectedStatus}
                  isSearchable={false}
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Location"
                  name="location"
                  placeholder="Hangar/Airfield location"
                />
              </div>

              {/* Hours */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Engine Hours"
                  name="engineHours"
                  type="number"
                  min={0}
                  max={99999.9}
                  toolTipText="Total engine operating hours since overhaul or manufacture"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Airframe Hours"
                  name="airframeHours"
                  type="number"
                  min={0}
                  max={99999.9}
                  toolTipText="Total airframe hours since manufacture"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Hourly Rate"
                  name="hourlyRate"
                  type="number"
                  min={0}
                  unit="R"
                  toolTipText="Cost per flight hour for training or rental"
                />
              </div>

              {/* Inspections */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Last Inspection"
                  name="lastInspection"
                  type="date"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Next Inspection"
                  name="nextInspection"
                  type="date"
                />
              </div>

              {/* Image */}
              <div className="grid md:grid-cols-2 gap-3">
                <ImageInput
                  title="Aircraft Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="aircraftImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <FormFooter
          href="/aircrafts"
          editingId={editingId}
          loading={loading}
          title="Aircraft"
          parent=""
        />
      </div>
    </form>
  );
}
