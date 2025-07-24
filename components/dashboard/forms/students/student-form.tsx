"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { countries } from "@/countries";
import { Class, Parent } from "@/types/types";
import { createStudent } from "@/actions/students";
import RadioInput from "@/components/FormInputs/RadioInput";
import { generateRegistrationNumber } from "@/lib/generateRegNo";
import { generateRollNumber } from "@/lib/generateRoll";
import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";
import { getCurrentTime } from "@/lib/timeUtils";
import { createUserLog } from "@/actions/user-logs";
import TextArea from "@/components/FormInputs/TextAreaInput";

export type SelectOptionProps = {
  label: string;
  value: string;
};

type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes?: Class[] | null;
  parents?: Parent[] | null;
  nextSeq: number;
};

export type StudentProps = {
  // Basic Information
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  imageUrl: string;
  password: string;
  
  // Personal Information
  gender: string;
  dob: string;
  idNumber: string; // ID/Passport Number
  nationality: string;
  // religion: string;
  state: string;
  address: string;
  
  // Academic Information
  parentId: string;
  parentName?: string;
  classId: string;
  classTitle?: string;
  streamId: string;
  streamTitle?: string;
  studentType: string;
  rollNo: string;
  regNo: string; // Registration Number
  admissionDate: string;
  
  // Flight Training Specific
  licenseType: string; // e.g., PPL, CPL, ATPL
  pilotLicenseNumber?: string;
  licenseExpiryDate?: string;
  medicalCertificateExpiry?: string;
  
  // Flight Time Totals
  totalFlightHours?: number;
  totalSimulatorHours?: number;
  dayHours?: number;
  nightHours?: number;
  instrumentHours?: number;
  singleEngineTime?: number;
  multiEngineTime?: number;
  
  // School Information
  schoolId: string;
  schoolName: string;
  
  // Legacy field (keeping for compatibility)
  BCN?: string; // Birth Certificate No. - mapped to idNumber
};

export default function SingleStudentForm({
  editingId,
  initialData,
  classes = [],
  parents = [],
  nextSeq,
}: SingleStudentFormProps) {
  const parentOptions = (parents ?? []).map((parent) => ({
    label: `${parent.firstName} ${parent.lastName}`,
    value: parent.id,
  }));
  const [selectedParent, setSelectedParent] = useState<any>(parentOptions[0] ?? null);

  const classOptions = (classes ?? []).map((item) => ({
    label: item.title,
    value: item.id,
  }));
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0] ?? null);

  const classId = selectedClass?.value ?? "";
  const streams = classes?.find((item) => item.id === classId)?.streams ?? [];

  const streamsOptions = streams.map((item) => ({
    label: item.title,
    value: item.id,
  }));
  const [selectedStream, setSelectedStream] = useState<any>(streamsOptions[0] ?? null);

  const genders = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
    { label: "OTHER", value: "OTHER" },
  ];
  const [selectedGender, setSelectedGender] = useState<any>(genders[0]);

  const initialCountry = countries.find((item) => item.countryCode === "ZA");
  const [selectedNationality, setSelectedNationality] = useState<any>(initialCountry ?? countries[0]);

  

  // License Type Options
  const licenseTypes = [
    { label: "Private Pilot License (PPL)", value: "PPL" },
    { label: "Commercial Pilot License (CPL)", value: "CPL" },
    { label: "Airline Transport Pilot License (ATPL)", value: "ATPL" },
    { label: "Recreational Pilot License (RPL)", value: "RPL" },
    { label: "Student Pilot License (SPL)", value: "SPL" },
  ];
  const [selectedLicenseType, setSelectedLicenseType] = useState<any>(licenseTypes[4]); // Default to Student

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProps>({
    defaultValues: { 
      name: "",
      totalFlightHours: 0,
      totalSimulatorHours: 0,
      dayHours: 0,
      nightHours: 0,
      instrumentHours: 0,
      singleEngineTime: 0,
      multiEngineTime: 0,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  const studentTypes = [
    { label: "Private Student", id: "PS" },
    { label: "Sponsored Student", id: "SS" },
  ];

  const { school } = useSchoolStore();
  const { user } = useUserSession();
  const { getDeviceInfo } = useDeviceInfo();

  async function saveStudent(data: StudentProps) {
    try {
      setLoading(true);

      data.schoolId = school?.id ?? "";
      data.schoolName = school?.name ?? "";
      data.imageUrl = imageUrl;
      data.name = `${data.firstName} ${data.lastName}`;
      data.parentId = selectedParent?.value ?? "";
      data.parentName = selectedParent?.label ?? "";
      data.classId = selectedClass?.value ?? "";
      data.classTitle = selectedClass?.label ?? "";
      data.streamId = selectedStream?.value ?? "";
      data.streamTitle = selectedStream?.label ?? "";
      data.nationality = selectedNationality?.label ?? "";
      // data.religion = selectedReligion?.value ?? "";
      data.gender = selectedGender?.value ?? "";
      data.licenseType = selectedLicenseType?.value ?? "";

      // Map BCN to idNumber for backward compatibility
      if (data.BCN && !data.idNumber) {
        data.idNumber = data.BCN;
      }

      if (!editingId) {
        const rollNo = generateRollNumber();
        const studentType = data.studentType as "PS" | "SS";
        const regNo = generateRegistrationNumber("BU", studentType, nextSeq);
        data.regNo = regNo;
        data.rollNo = rollNo;

        // ✅ Convert string inputs to numbers
  data.totalFlightHours = Number(data.totalFlightHours);
  data.totalSimulatorHours = Number(data.totalSimulatorHours);
  data.dayHours = Number(data.dayHours);
  data.nightHours = Number(data.nightHours);
  data.instrumentHours = Number(data.instrumentHours);
  data.singleEngineTime = Number(data.singleEngineTime);
  data.multiEngineTime = Number(data.multiEngineTime);

        await createStudent(data);

        const name = user?.name ?? "";
        const deviceInfo = await getDeviceInfo();
        const { time } = getCurrentTime();

        await createUserLog({
          name,
          activity: `User (${name}) Created a new Student (${data.name})`,
          time,
          ipAddress: deviceInfo.ipAddress,
          device: deviceInfo.device,
          schoolId: school?.id ?? "",
        });

        toast.success("Student Successfully Created!");
        reset();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <FormHeader
        href="/students"
        parent=""
        title="Student"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          
          {/* Basic Information Section */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Basic Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Student First Name"
                  name="firstName"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Student Last Name"
                  name="lastName"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Email"
                  name="email"
                  type="email"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Phone"
                  name="phone"
                  type="tel"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="ID/Passport Number"
                  name="idNumber"
                />
                <PasswordInput
                  register={register}
                  errors={errors}
                  type="password"
                  label="Student Password"
                  name="password"
                  toolTipText="Password will be used by student on the student Portal"
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Personal Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                  label="Gender"
                  options={genders}
                  option={selectedGender}
                  setOption={setSelectedGender}
                  isSearchable={false}
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Date of Birth"
                  name="dob"
                  type="date"
                />
                <FormSelectInput
                  label="Nationality"
                  options={countries}
                  option={selectedNationality}
                  setOption={setSelectedNationality}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
                {/* <FormSelectInput
                  label="Religion"
                  options={religions}
                  option={selectedReligion}
                  setOption={setSelectedReligion}
                /> */}
                <TextInput
                  register={register}
                  errors={errors}
                  label="State/Province"
                  name="state"
                />
                <TextArea
                  register={register}
                  errors={errors}
                  label="Address"
                  name="address"
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Academic Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                  label="Parent/Guardian"
                  options={parentOptions}
                  option={selectedParent}
                  setOption={setSelectedParent}
                  toolTipText="Add New Parent"
                  href="/dashboard/users/parents/new"
                />
                <FormSelectInput
                  label="Class"
                  options={classOptions}
                  option={selectedClass}
                  setOption={setSelectedClass}
                  toolTipText="Add New Class"
                  href="/dashboard/academics/classes"
                />
                <FormSelectInput
                  label="Stream/Section"
                  options={streamsOptions}
                  option={selectedStream}
                  setOption={setSelectedStream}
                  toolTipText="Add New Stream"
                  href="/dashboard/academics/classes"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Admission Date"
                  name="admissionDate"
                  type="date"
                />
                <RadioInput
                  radioOptions={studentTypes}
                  register={register}
                  label="Student Type"
                  name="studentType"
                  errors={errors}
                  defaultValue="PS"
                />
              </div>
            </div>
          </div>

          {/* Flight Training Information Section */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Flight Training Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                  label="License Type"
                  options={licenseTypes}
                  option={selectedLicenseType}
                  setOption={setSelectedLicenseType}
                  isSearchable={false}
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Pilot License Number"
                  name="pilotLicenseNumber"
                  placeholder="Optional - if already licensed"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="License Expiry Date"
                  name="licenseExpiryDate"
                  type="date"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Medical Certificate Expiry"
                  name="medicalCertificateExpiry"
                  type="date"
                />
              </div>
            </div>
          </div>

          {/* Flight Hours Section */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Flight Hours (Current Totals)</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
               
                <TextInput register={register} errors={errors} label="Total Flight Hours" name="totalFlightHours" type="number"  />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Total Simulator Hours"
                  name="totalSimulatorHours"
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
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Instrument Hours"
                  name="instrumentHours"
                  type="number"
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Single Engine Time"
                  name="singleEngineTime"
                  type="number"
                  placeholder="0.0"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Multi Engine Time"
                  name="multiEngineTime"
                  type="number"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Profile Image</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Upload a professional profile photo for the student. This will be used 
                  in their student ID card and throughout the system.
                </p>
                <div className="text-xs text-gray-500">
                  <p>• Recommended size: 300x300 pixels</p>
                  <p>• Accepted formats: JPG, PNG</p>
                  <p>• Maximum file size: 2MB</p>
                </div>
              </div>
              <div className="flex justify-center">
                <ImageInput
                  title="Student Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="studentProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        
        </div>
      </div>

      <FormFooter
        href="/students"
        editingId={editingId}
        loading={loading}
        title="Student"
        parent=""
      />
    </form>
  );
}