"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { countries } from "@/countries";
import { createTeacher } from "@/actions/teachers";
import FormMultipleSelectInput from "@/components/FormInputs/FormMultipleSelectInput";
import { generateRollNumber } from "@/lib/generateRoll";
import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";
import { TeacherCreateProps } from "@/types/types";

type TeacherFormProps = {
  editingId?: string;
  initialData?: any;
  classes?: DataOption[];
  subjects?: DataOption[];
};

export type DataOption = {
  label: string;
  value: string;
};

export default function TeacherForm({
  editingId,
  initialData,
  classes = [],
  subjects = [],
}: TeacherFormProps) {
  const { user } = useUserSession();
  const userRole = user?.role ?? "ADMIN";



  const contactMethods = [
    { label: "Phone", value: "Phone" },
    { label: "Email", value: "Email" },
    { label: "Whatsapp", value: "Whatsapp" },
  ];



  const genders = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
    { label: "OTHER", value: "OTHER" },
  ];

  const instructorRatingOptions = [
    { label: "CFI", value: "CFI" },
    { label: "CFII", value: "CFII" },
    { label: "MEI", value: "MEI" },
    { label: "AGI", value: "AGI" },
    { label: "IGI", value: "IGI" },
    { label: "FI(A)", value: "FI(A)" },
    { label: "FI(H)", value: "FI(H)" },
    { label: "TRI", value: "TRI" },
    { label: "SFI", value: "SFI" },
  ];

  const emergencyRelationships = [
    { label: "Spouse", value: "Spouse" },
    { label: "Parent", value: "Parent" },
    { label: "Sibling", value: "Sibling" },
    { label: "Child", value: "Child" },
    { label: "Friend", value: "Friend" },
    { label: "Other", value: "Other" },
  ];

  // const initialCountryCode = "ZA";
  
  // const [selectedTitle, setSelectedTitle] = useState(titles[0]);
  const [selectedMethod, setSelectedMethod] = useState(contactMethods[0]);
  const [selectedGender, setSelectedGender] = useState(genders[0]);
  const [selectedInstructorRatings, setSelectedInstructorRatings] = useState<DataOption[]>([]);
  const [emergencyRelationship, setEmergencyRelationship] = useState(emergencyRelationships[0]);

  const initialCountry =
    countries.find((item) => item.countryCode === "ZA") ?? countries[0];

  const [selectedNationality, setSelectedNationality] =
    useState<DataOption>(initialCountry);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherCreateProps>({ defaultValues: { firstName: "" } });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/placeholder.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const { school } = useSchoolStore();

  async function saveTeacher(data: TeacherCreateProps) {
    try {
      data.schoolId = school?.id ?? "";
      data.schoolName = school?.name ?? "";
      setLoading(true);
      data.imageUrl = imageUrl;
      // data.title = selectedTitle.value;
      data.gender = selectedGender.value;
      data.nationality = selectedNationality?.label ?? "";
      data.contactMethod = selectedMethod.value;
      data.instructorRatings = selectedInstructorRatings?.map((item: any) => item.value) ?? [];

      // Convert flight hours to numbers
      data.totalFlightHours = Number(data.totalFlightHours) || 0;
      data.totalSimulatorHours = Number(data.totalSimulatorHours) || 0;
      data.dayHours = Number(data.dayHours) || 0;
      data.nightHours = Number(data.nightHours) || 0;
      data.instrumentHours = Number(data.instrumentHours) || 0;
      data.singleEngineTime = Number(data.singleEngineTime) || 0;
      data.multiEngineTime = Number(data.multiEngineTime) || 0;

      if (!editingId) {
        const res = await createTeacher(data);
        toast.success("Successfully Created!");
        reset();
        const path =
          userRole === "ADMIN"
            ? "/dashboard/users/teachers"
            : "/portal/secretary/teachers";
        router.push(path);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"
      onSubmit={handleSubmit(saveTeacher)}
    >
      <FormHeader
        href="/teachers"
        parent="users"
        title="Teacher"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-6">
          
          {/* Basic Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Basic Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* <FormSelectInput label="Title" options={titles} option={selectedTitle} setOption={setSelectedTitle} /> */}
                <TextInput register={register} errors={errors} label="First Name" name="firstName" />
                <TextInput register={register} errors={errors} label="Last Name" name="lastName" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput register={register} errors={errors} label="Phone" name="phone" type="tel" />
                <TextInput register={register} errors={errors} label="Email" name="email" type="email" />
                <TextInput register={register} errors={errors} label="Whatsapp No." name="whatsappNo" type="tel" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput label="Nationality" options={countries} option={selectedNationality} setOption={setSelectedNationality} />
                <TextInput register={register} errors={errors} label="National ID/Passport No" name="NIN" />
                <FormSelectInput label="Gender" options={genders} option={selectedGender} setOption={setSelectedGender} isSearchable={false} />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput register={register} errors={errors} label="Date of Birth" name="dateOfBirth" type="date" />
                <FormSelectInput label="Preferred Contact Method" options={contactMethods} option={selectedMethod} setOption={setSelectedMethod} />
                <TextArea register={register} errors={errors} label="Address" name="address" />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Professional Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* <TextInput register={register} errors={errors} label="Employee ID" name="employeeId" disabled /> */}
                <TextInput register={register} errors={errors} label="Date of Joining" name="dateOfJoining" type="date" />
                <PasswordInput register={register} errors={errors} label="Teacher Portal Password" name="password" type="password" />
                {/* <FormSelectInput label="Qualification" options={qualifications} option={qualification} setOption={setQualification} /> */}
                {/* <TextInput register={register} errors={errors} label="Designation" name="designation" placeholder="eg Head Teacher" /> */}
              </div>

              {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                
                <TextInput register={register} errors={errors} label="Years of Experience" name="experience" placeholder="Eg 5" type="number" />
               
              </div> */}

              {/* <div className="grid md:grid-cols-2 gap-3">
                {mainSubject && (
                  <FormSelectInput label="Main Subject" options={subjects} option={mainSubject} setOption={setMainSubject} href="/dashboard/academics/subjects" toolTipText="Add New Subject" />
                )}
                {subjects.length > 0 && (
                  <FormMultipleSelectInput label="Subjects" options={subjects} option={selectedSubjects} setOption={setSelectedSubjects} href="/dashboard/academics/subjects" toolTipText="Add New Subject" />
                )}
              </div> */}

              <div className="grid md:grid-cols-2 gap-3">
                {/* {classes.length > 0 && (
                  <FormMultipleSelectInput label="Classes" options={classes} option={selectedClasses} setOption={setSelectedClasses} href="/dashboard/academics/classes" toolTipText="Add New Class" />
                )} */}
                <FormMultipleSelectInput label="Instructor Ratings" options={instructorRatingOptions} option={selectedInstructorRatings} setOption={setSelectedInstructorRatings} />
              </div>

              {/* <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isClassTeacher}
                      onChange={(e) => setIsClassTeacher(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Is Class Teacher</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Is Active</span>
                  </label>
                </div>
                <TextArea register={register} errors={errors} label="Bio" name="bio" />
              </div> */}

              {/* <div className="grid md:grid-cols-2 gap-3">
                <TextInput register={register} errors={errors} label="Skills" name="skills" placeholder="Comma-separated skills" />
              </div> */}
            </div>
          </div>

          {/* Aviation Specific Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Aviation Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput register={register} errors={errors} label="Pilot License Number" name="pilotLicenseNumber" />
                <TextInput register={register} errors={errors} label="License Expiry Date" name="licenseExpiryDate" type="date" />
                <TextInput register={register} errors={errors} label="Medical Certificate Expiry" name="medicalCertificateExpiry" type="date" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput register={register} errors={errors} label="Total Flight Hours" name="totalFlightHours" type="number"  />
                <TextInput register={register} errors={errors} label="Total Simulator Hours" name="totalSimulatorHours" type="number"  />
                <TextInput register={register} errors={errors} label="Day Hours" name="dayHours" type="number"  />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput register={register} errors={errors} label="Night Hours" name="nightHours" type="number"  />
                <TextInput register={register} errors={errors} label="Instrument Hours" name="instrumentHours" type="number"  />
                <TextInput register={register} errors={errors} label="Single Engine Time" name="singleEngineTime" type="number"  />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <TextInput register={register} errors={errors} label="Multi Engine Time" name="multiEngineTime" type="number"  />
              </div>
            </div>
          </div>

          {/* Emergency Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Emergency Contact Information</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput register={register} errors={errors} label="Emergency Contact Name" name="emergencyContactName" />
                <TextInput register={register} errors={errors} label="Emergency Contact Phone" name="emergencyContactPhone" type="tel" />
                <FormSelectInput label="Emergency Contact Relationship" options={emergencyRelationships} option={emergencyRelationship} setOption={setEmergencyRelationship} />
              </div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Profile Image</h3>
            <div className="w-full max-w-sm mx-auto">
              <ImageInput 
                title="Teacher Profile Image" 
                imageUrl={imageUrl} 
                setImageUrl={setImageUrl} 
                endpoint="teacherProfileImage" 
                className="object-contain" 
              />
            </div>
          </div>

        </div>
      </div>
      
      <FormFooter href="/teachers" editingId={editingId} loading={loading} title="Teacher" parent="users" />
    </form>
  );
}