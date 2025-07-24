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
import { createParent } from "@/actions/parents";
import useSchoolStore from "@/store/school";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
};
export type ParentProps = {
  title: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  NIN: string;
  gender: string;
  dob: string;
  phone: string;
  nationality: string;
  whatsappNo: string;
  imageUrl: string;
  contactMethod: string;
  occupation: string;
  address: string;
  password: string;
  schoolId: string;
  schoolName: string;
};

export default function ParentForm({
  editingId,
  initialData,
}: SingleStudentFormProps) {
  const relationships = [
    { label: "Mother", value: "Mother" },
    { label: "Father", value: "Father" },
    { label: "Guardian", value: "Guardian" },
    { label: "Other", value: "Other" },
  ];
  const titles = [
    { label: "Mr", value: "Mr" },
    { label: "Mrs", value: "Mrs" },
  ];
  const contactMethods = [
    { label: "Phone", value: "Phone" },
    { label: "Email", value: "Email" },
    { label: "Whatsapp", value: "Whatsapp" },
  ];
  const genders = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
  ];

  const initialCountryCode = "ZA";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedRelationship, setSelectedRelationship] = useState(relationships[1]);
  const [selectedTitle, setSelectedTitle] = useState(titles[0]);
  const [selectedMethod, setSelectedMethod] = useState(contactMethods[0]);
  const [selectedGender, setSelectedGender] = useState(genders[0]);
  const [selectedNationality, setSelectedNationality] = useState<any>(initialCountry);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParentProps>({
    defaultValues: {
      firstName: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const { school } = useSchoolStore();

  async function saveParent(data: ParentProps) {
    try {
      setLoading(true);
      data.schoolId = school?.id ?? "";
      data.schoolName = school?.name ?? "";
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.relationship = selectedRelationship.value;
      data.gender = selectedGender.value;
      data.nationality = selectedNationality.label;
      data.contactMethod = selectedMethod.value;

      if (editingId) {
        // update logic here
      } else {
        const res = await createParent(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        router.push("/dashboard/users/parents");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      onSubmit={handleSubmit(saveParent)}
    >
      <FormHeader
        href="/parents"
        parent="users"
        title="Parent"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-1 gap-6 py-8">
        {/* Name Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormSelectInput
            label="Title"
            options={titles}
            option={selectedTitle}
            setOption={setSelectedTitle}
          />
          <TextInput
            register={register}
            errors={errors}
            label="First Name"
            name="firstName"
          />
          <TextInput
            register={register}
            errors={errors}
            label="Last Name"
            name="lastName"
          />
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormSelectInput
            label="Relationship"
            options={relationships}
            option={selectedRelationship}
            setOption={setSelectedRelationship}
          />
          
          <FormSelectInput
            label="Gender"
            options={genders}
            option={selectedGender}
            setOption={setSelectedGender}
            isSearchable={false}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput
            register={register}
            errors={errors}
            label="Date of Birth"
            name="dob"
            type="date"
          />
          <TextInput
            register={register}
            errors={errors}
            label="Phone"
            name="phone"
            type="tel"
          />
          <FormSelectInput
            label="Nationality"
            options={countries}
            option={selectedNationality}
            setOption={setSelectedNationality}
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            register={register}
            errors={errors}
            label="Email"
            name="email"
            type="email"
          />
          <TextInput
            register={register}
            errors={errors}
            label="WhatsApp No."
            name="whatsappNo"
            type="tel"
          />
        </div>

        {/* Other Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormSelectInput
              label="Preferred Contact Method"
              options={contactMethods}
              option={selectedMethod}
              setOption={setSelectedMethod}
            />
            <TextInput
              register={register}
              errors={errors}
              label="Occupation"
              name="occupation"
            />
            <TextArea
              register={register}
              errors={errors}
              label="Address"
              name="address"
            />
            <PasswordInput
              register={register}
              errors={errors}
              label="Parent Portal Password"
              name="password"
            />
          </div>

          <div className="flex justify-center md:justify-start">
            <ImageInput
              title="Parent Profile Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="parentProfileImage"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/parents"
        editingId={editingId}
        loading={loading}
        title="Parent"
        parent="users"
      />
    </form>
  );
}
