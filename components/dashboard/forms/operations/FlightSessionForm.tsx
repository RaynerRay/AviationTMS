"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import toast from "react-hot-toast";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import RadioInput from "@/components/FormInputs/RadioInput";
import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import { getCurrentTime } from "@/lib/timeUtils";
import { createUserLog } from "@/actions/user-logs";
import TextArea from "@/components/FormInputs/TextAreaInput";
import { CreateFlightSession} from "@/types/types";

export type SelectOptionProps = {
  label: string;
  value: string;
};

// Enums
export enum SessionType {
  FLIGHT = "FLIGHT",
  SIMULATOR = "SIMULATOR",
  TRAINING = "TRAINING",
  CHECKRIDE = "CHECKRIDE",
  SOLO = "SOLO",
  CROSS_COUNTRY = "CROSS_COUNTRY",
}

export enum SessionStatus {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  RESCHEDULED = "RESCHEDULED",
  NO_SHOW = "NO_SHOW",
  PENDING_REVIEW = "PENDING_REVIEW",
}

export enum CrewOperation {
  SINGLE_PILOT = "SINGLE_PILOT",
  MULTI_PILOT = "MULTI_PILOT",
}

export enum PilotRole {
  PIC = "PIC",
  DUAL = "DUAL",
  COPILOT = "COPILOT",
  PICUS = "PICUS",
  COMMD_PRACTICE = "COMMAND_PRACTICE",
}

// Define interfaces for the props
interface AircraftModel {
  id: string;
  tailNumber: string;
  make: string;
  model: string;
  aircraftType: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
}

interface Teacher {
    id: string;
    firstName: string;
    lastName: string;
  }

interface SimulatorModel {
  id: string;
  name: string;
  model: string;
  simulatorType: string;
}

interface School {
  id: string;
  name: string;
}

type FlightSessionFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  aircrafts?: AircraftModel[] | null;
  students?: Student[] | null;
  teachers?: Teacher[] | null;
  simulators?: SimulatorModel[] | null;
  onSubmit: (data: CreateFlightSession) => Promise<void>;
};

export default function FlightSessionForm({
  editingId,
  initialData,
  aircrafts = [],
  students = [],
  teachers = [],
  simulators = [],
  onSubmit,
}: FlightSessionFormProps) {
  
  // Time dropdown options
  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i.toString()
  }));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i.toString()
  }));

  // Time state variables
  const [startHour, setStartHour] = useState<any>(hourOptions[8]); // Default 8 AM
  const [startMinute, setStartMinute] = useState<any>(minuteOptions[0]); // Default :00
  const [endHour, setEndHour] = useState<any>(hourOptions[10]); // Default 10 AM
  const [endMinute, setEndMinute] = useState<any>(minuteOptions[0]); // Default :00
  const [calculatedDuration, setCalculatedDuration] = useState<number>(2.0);

  // Convert arrays to select options
  const studentOptions = (students ?? []).map((student) => ({
    label: student.name || `${student.firstName} ${student.lastName}`,
    value: student.id,
  }));
  const [selectedStudent, setSelectedStudent] = useState<any>(studentOptions[0] ?? null);

  const teacherOptions = (teachers ?? []).map((teacher) => ({
    label: `${teacher.firstName} ${teacher.lastName}`,
    value: teacher.id,
  }));
  const [selectedTeacher, setSelectedTeacher] = useState<any>(teacherOptions[0] ?? null);

  const aircraftOptions = (aircrafts ?? []).map((aircraft) => ({
    label: `${aircraft.tailNumber} - ${aircraft.make} ${aircraft.model}`,
    value: aircraft.id,
  }));
  const [selectedAircraft, setSelectedAircraft] = useState<any>(aircraftOptions[0] ?? null);

  const simulatorOptions = (simulators ?? []).map((simulator) => ({
    label: `${simulator.name} - ${simulator.model}`,
    value: simulator.id,
  }));
  const [selectedSimulator, setSelectedSimulator] = useState<any>(simulatorOptions[0] ?? null);

  // Session Type Options
  const sessionTypes = [
    { label: "Flight Training", value: SessionType.FLIGHT },
    { label: "Simulator Training", value: SessionType.SIMULATOR },
    { label: "Ground Training", value: SessionType.TRAINING },
    { label: "Checkride", value: SessionType.CHECKRIDE },
    { label: "Solo Flight", value: SessionType.SOLO },
    { label: "Cross Country", value: SessionType.CROSS_COUNTRY },
  ];
  const [selectedSessionType, setSelectedSessionType] = useState<any>(sessionTypes[0]);

  // Flight Type Options
  const flightTypes = [
    { label: "Training Flight", value: "Training Flight" },
    { label: "Checkride", value: "Checkride" },
    { label: "Solo", value: "Solo" },
    { label: "Cross Country", value: "Cross Country" },
    { label: "Instrument Training", value: "Instrument Training" },
    { label: "Night Training", value: "Night Training" },
    { label: "Emergency Procedures", value: "Emergency Procedures" },
  ];
  const [selectedFlightType, setSelectedFlightType] = useState<any>(flightTypes[0]);

  // Pilot Role Options
  const pilotRoles = [
    { label: "Pilot-in-Command (PIC)", value: PilotRole.PIC },
    { label: "Co-pilot", value: PilotRole.COPILOT },
    { label: "Dual (Student with Instructor)", value: PilotRole.DUAL },
    { label: "Pilot-in-Command Under Supervision (PICUS)", value: PilotRole.PICUS },
    { label: "Command Practice", value: PilotRole.COMMD_PRACTICE },
  ];
  const [selectedPilotRole, setSelectedPilotRole] = useState<any>(pilotRoles[2]); // Default to DUAL

  // Crew Operation Options
  const crewOperations = [
    { label: "Single Pilot", value: CrewOperation.SINGLE_PILOT },
    { label: "Multi Pilot", value: CrewOperation.MULTI_PILOT },
  ];
  const [selectedCrewOperation, setSelectedCrewOperation] = useState<any>(crewOperations[0]);

  // Session Status Options
  const sessionStatuses = [
    { label: "Scheduled", value: SessionStatus.SCHEDULED },
    { label: "Completed", value: SessionStatus.COMPLETED },
    { label: "Canceled", value: SessionStatus.CANCELED },
    { label: "Rescheduled", value: SessionStatus.RESCHEDULED },
    { label: "No Show", value: SessionStatus.NO_SHOW },
    { label: "Pending Review", value: SessionStatus.PENDING_REVIEW },
  ];
  const [selectedStatus, setSelectedStatus] = useState<any>(sessionStatuses[0]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateFlightSession>({
    defaultValues: {
      actualTime: 0,
      singleEngineDay: 0,
      singleEngineNight: 0,
      multiEngineDay: 0,
      multiEngineNight: 0,
      other: 0,
      ifrApproaches: 0,
      instrumentTime: 0,
      instrumentTimeSe: 0,
      instrumentTimeMe: 0,
      fstdTime: 0,
      fstdDual: 0,
      fstdPic: 0,
      fstdPicPractice: 0,
      takeOffsDay: 0,
      takeOffsNight: 0,
      landingsDay: 0,
      landingsNight: 0,
      verifiedByInstructor: false,
      dayHours: 0,
      nightHours: 0,
      instrumentHours: 0,
      singleEngineTime: 0,
      multiEngineTime: 0,
      actualFlightHours: 0,
      actualSimulatorHours: 0,
      actualGroundHours: 0,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const verificationOptions = [
    { label: "Verified", id: "true" },
    { label: "Not Verified", id: "false" },
  ];

  const { school } = useSchoolStore();
  const { user } = useUserSession();
  const { getDeviceInfo } = useDeviceInfo();

  // Watch session type to conditionally show fields
  const watchedSessionType = watch("sessionType");

  // Auto-calculate duration when time changes
  useEffect(() => {
    if (startHour && startMinute && endHour && endMinute) {
      const startTotalMinutes = parseInt(startHour.value) * 60 + parseInt(startMinute.value);
      const endTotalMinutes = parseInt(endHour.value) * 60 + parseInt(endMinute.value);
      
      let duration = 0;
      if (endTotalMinutes > startTotalMinutes) {
        duration = (endTotalMinutes - startTotalMinutes) / 60;
      } else if (endTotalMinutes < startTotalMinutes) {
        // Handle overnight flights
        duration = ((24 * 60) - startTotalMinutes + endTotalMinutes) / 60;
      }
      
      setCalculatedDuration(duration);
    }
  }, [startHour, startMinute, endHour, endMinute]);

  async function saveFlightSession(data: CreateFlightSession) {
    try {
      setLoading(true);

      // Combine date with selected time dropdowns
      const dateStr = data.date as unknown as string;

      if (!dateStr || !startHour?.value || !startMinute?.value || !endHour?.value || !endMinute?.value) {
        toast.error("Please fill in date and time fields.");
        setLoading(false);
        return;
      }

      // Create time strings from dropdowns
      const startTimeStr = `${startHour.value.padStart(2, '0')}:${startMinute.value.padStart(2, '0')}`;
      const endTimeStr = `${endHour.value.padStart(2, '0')}:${endMinute.value.padStart(2, '0')}`;

      // Create full datetime strings
      const startDateTime = `${dateStr}T${startTimeStr}:00`;
      const endDateTime = `${dateStr}T${endTimeStr}:00`;

      data.startTime = new Date(startDateTime);
      data.endTime = new Date(endDateTime);
      data.durationHours = calculatedDuration;

      // Set selected values
      data.sessionType = selectedSessionType?.value ?? SessionType.FLIGHT;
      data.flightType = selectedFlightType?.value ?? "";
      data.studentId = selectedStudent?.value ?? "";
      data.teacherId = selectedTeacher?.value ?? "";
      data.aircraftId = selectedAircraft?.value ?? "";
      if (selectedSimulator?.value) {
        data.simulatorId = selectedSimulator.value;
      }
      data.pilotRole = selectedPilotRole?.value ?? PilotRole.DUAL;
      data.crewOperation = selectedCrewOperation?.value ?? CrewOperation.SINGLE_PILOT;
      data.status = selectedStatus?.value ?? SessionStatus.SCHEDULED;

      // Convert string inputs to numbers
      data.actualTime = Number(data.actualTime);
      data.singleEngineDay = Number(data.singleEngineDay);
      data.singleEngineNight = Number(data.singleEngineNight);
      data.multiEngineDay = Number(data.multiEngineDay);
      data.multiEngineNight = Number(data.multiEngineNight);
      data.other = Number(data.other);
      data.ifrApproaches = Number(data.ifrApproaches);
      data.instrumentTime = Number(data.instrumentTime);
      data.instrumentTimeSe = Number(data.instrumentTimeSe);
      data.instrumentTimeMe = Number(data.instrumentTimeMe);
      data.fstdTime = Number(data.fstdTime);
      data.fstdDual = Number(data.fstdDual);
      data.fstdPic = Number(data.fstdPic);
      data.fstdPicPractice = Number(data.fstdPicPractice);
      data.takeOffsDay = Number(data.takeOffsDay);
      data.takeOffsNight = Number(data.takeOffsNight);
      data.landingsDay = Number(data.landingsDay);
      data.landingsNight = Number(data.landingsNight);
      
      if (data.dayHours !== undefined) data.dayHours = Number(data.dayHours);
      if (data.nightHours !== undefined) data.nightHours = Number(data.nightHours);
      if (data.instrumentHours !== undefined) data.instrumentHours = Number(data.instrumentHours);
      if (data.singleEngineTime !== undefined) data.singleEngineTime = Number(data.singleEngineTime);
      if (data.multiEngineTime !== undefined) data.multiEngineTime = Number(data.multiEngineTime);
      if (data.actualFlightHours !== undefined) data.actualFlightHours = Number(data.actualFlightHours);
      if (data.actualSimulatorHours !== undefined) data.actualSimulatorHours = Number(data.actualSimulatorHours);
      if (data.actualGroundHours !== undefined) data.actualGroundHours = Number(data.actualGroundHours);
      
      const normalizeToBoolean = (val: string | boolean | undefined): boolean => {
        if (typeof val === "string") return val === "true";
        return Boolean(val); // covers boolean or undefined
      };
      
      data.verifiedByInstructor = normalizeToBoolean(data.verifiedByInstructor);

      console.log(data)
      await onSubmit(data);

      // Log user activity
      const name = user?.name ?? "";
      const deviceInfo = await getDeviceInfo();
      const { time } = getCurrentTime();

      await createUserLog({
        name,
        activity: `User (${name}) Created a new Flight Session`,
        time,
        ipAddress: deviceInfo.ipAddress,
        device: deviceInfo.device,
        schoolId: school?.id ?? "",
      });

      toast.success("Flight Session Successfully Created!");
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error creating flight session");
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveFlightSession)}>
      <FormHeader
        href="/portal/student/flight-sessions"
        parent=""
        title="Flight Session"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          
          {/* Basic Session Information */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Basic Session Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                  label="Session Type"
                  options={sessionTypes}
                  option={selectedSessionType}
                  setOption={setSelectedSessionType}
                  isSearchable={false}
                />
                <FormSelectInput
                  label="Flight Type"
                  options={flightTypes}
                  option={selectedFlightType}
                  setOption={setSelectedFlightType}
                  isSearchable={false}
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Date"
                  name="date"
                  type="date"
                />
              </div>
              
              {/* Time Selection with Dropdowns */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    <FormSelectInput
                      label="Hour"
                      options={hourOptions}
                      option={startHour}
                      setOption={setStartHour}
                      isSearchable={false}
                    />
                    <FormSelectInput
                      label="Minute"
                      options={minuteOptions}
                      option={startMinute}
                      setOption={setStartMinute}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    <FormSelectInput
                      label="Hour"
                      options={hourOptions}
                      option={endHour}
                      setOption={setEndHour}
                      isSearchable={false}
                    />
                    <FormSelectInput
                      label="Minute"
                      options={minuteOptions}
                      option={endMinute}
                      setOption={setEndMinute}
                      isSearchable={false}
                    />
                  </div>
                </div>
              </div>
              
              {/* Duration Display */}
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (hours)
                  </label>
                  <input
                    type="text"
                    value={calculatedDuration.toFixed(1)}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-1 gap-3">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Details of Flight & Remarks"
                  name="detailsOfFlight"
                />
              </div>
            </div>
          </div>

          {/* Personnel Assignment */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Personnel Assignment</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-3">
                <FormSelectInput
                  label="Student"
                  options={studentOptions}
                  option={selectedStudent}
                  setOption={setSelectedStudent}
                  toolTipText="Select the student for this session"
                />
                <FormSelectInput
                  label="Instructor"
                  options={teacherOptions}
                  option={selectedTeacher}
                  setOption={setSelectedTeacher}
                  toolTipText="Select the flight instructor"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <FormSelectInput
                  label="Pilot Role"
                  options={pilotRoles}
                  option={selectedPilotRole}
                  setOption={setSelectedPilotRole}
                  isSearchable={false}
                />
                <FormSelectInput
                  label="Crew Operation"
                  options={crewOperations}
                  option={selectedCrewOperation}
                  setOption={setSelectedCrewOperation}
                  isSearchable={false}
                />
              </div>
            </div>
          </div>

          {/* Aircraft/Simulator Information */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Aircraft/Simulator Information</h3>
            <div className="grid gap-6">
              {selectedSessionType?.value !== SessionType.SIMULATOR && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <FormSelectInput
                    label="Aircraft"
                    options={aircraftOptions}
                    option={selectedAircraft}
                    setOption={setSelectedAircraft}
                    toolTipText="Select the aircraft used"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Aircraft Type"
                    name="aircraftType"
                    placeholder="e.g., Cessna 172"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Registration Number"
                    name="registrationNumber"
                    placeholder="e.g., N12345"
                  />
                </div>
              )}
              {selectedSessionType?.value === SessionType.SIMULATOR && (
                <div className="grid md:grid-cols-1 gap-3">
                  <FormSelectInput
                    label="Simulator"
                    options={simulatorOptions}
                    option={selectedSimulator}
                    setOption={setSelectedSimulator}
                    toolTipText="Select the simulator used"
                  />
                </div>
              )}
              {selectedSessionType?.value === SessionType.FLIGHT && (
                <div className="grid md:grid-cols-2 gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Departure Airport"
                    name="departureAirport"
                    placeholder="ICAO Code (e.g., KJFK)"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Arrival Airport"
                    name="arrivalAirport"
                    placeholder="ICAO Code (e.g., KLGA)"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Flight Time Details */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Flight Time Details</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Actual Time"
                  name="actualTime"
                  type="number"
                 
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Day Hours"
                  name="dayHours"
                  type="number"
                 
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Night Hours"
                  name="nightHours"
                  type="number"
                 
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Instrument Hours"
                  name="instrumentHours"
                  type="number"
                 
                  placeholder="0.0"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Single Engine Day"
                  name="singleEngineDay"
                  type="number"
                 
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Single Engine Night"
                  name="singleEngineNight"
                  type="number"
                 
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Multi Engine Day"
                  name="multiEngineDay"
                  type="number"
                 
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Multi Engine Night"
                  name="multiEngineNight"
                  type="number"
                 
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Instrument Training */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Instrument Training</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="IFR Approaches"
                  name="ifrApproaches"
                  type="number"
                  placeholder="0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Instrument Time"
                  name="instrumentTime"
                  type="number"
                 
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Instrument Time SE"
                  name="instrumentTimeSe"
                  type="number"
                 
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Instrument Time ME"
                  name="instrumentTimeMe"
                  type="number"
                 
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Simulator Time (FSTD) */}
          {(selectedSessionType?.value === SessionType.SIMULATOR || selectedSessionType?.value === SessionType.TRAINING) && (
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Flight Simulation Training Device (FSTD) Time</h3>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="FSTD Time"
                    name="fstdTime"
                    type="number"
                   
                    placeholder="0.0"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="FSTD Dual"
                    name="fstdDual"
                    type="number"
                   
                    placeholder="0.0"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="FSTD PIC"
                    name="fstdPic"
                    type="number"
                   
                    placeholder="0.0"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="FSTD PIC Practice"
                    name="fstdPicPractice"
                    type="number"
                   
                    placeholder="0.0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Takeoffs and Landings */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Takeoffs and Landings</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Takeoffs Day"
                  name="takeOffsDay"
                  type="number"
                  placeholder="0"
                />
                  <TextInput
                  register={register}
                  errors={errors}
                  label="Landings Day"
                  name="landingsDay"
                  type="number"
                  placeholder="0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Takeoffs Night"
                  name="takeOffsNight"
                  type="number"
                  placeholder="0"
                />
              
                <TextInput
                  register={register}
                  errors={errors}
                  label="Landings Night"
                  name="landingsNight"
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Post-Flight Summary */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Post-Flight Summary</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-1 gap-3">
                <TextArea
                  register={register}
                  errors={errors}
                  label="Instructor Feedback"
                  name="teacherFeedback"
                />
              </div>
            </div>
          </div>

          {/* Session Status and Verification */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Session Status and Verification</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-3">
                <FormSelectInput
                  label="Session Status"
                  options={sessionStatuses}
                  option={selectedStatus}
                  setOption={setSelectedStatus}
                  isSearchable={false}
                />
                <RadioInput
                  radioOptions={verificationOptions}
                  register={register}
                  label="Verified by Instructor"
                  name="verifiedByInstructor"
                  errors={errors}
                  defaultValue="false"
                />
              </div>
            </div>
          </div>
        
        </div>
      </div>

      <FormFooter
        href="/portal/student/flight-sessions"
        editingId={editingId}
        loading={loading}
        title="Flight Session"
        parent=""
      />
    </form>
  );
}