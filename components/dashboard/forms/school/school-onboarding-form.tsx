"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Send, GraduationCap, Sparkles, School, ArrowRight } from "lucide-react";
import { createSchool } from "@/actions/schools";

export type SelectOptionProps = {
  label: string;
  value: string;
};

export type SchoolProps = {
  name: string;
  logo: string;
};

export default function SchoolOnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = "/school-logo.png";
  const [imageUrl, setImageUrl] = useState(initialImage);

  async function saveStudent(data: SchoolProps) {
    try {
      setLoading(true);
      data.logo = imageUrl;
      console.log(data);
      const res = await createSchool(data);

      console.log(res);
      setLoading(false);
      toast.success("Successfully Created!");
      reset();
      router.push(`/school-admin/${res.id}?name=${res.name}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-sky-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GraduationCap className="absolute top-20 left-20 w-8 h-8 text-blue-300/40 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <School className="absolute top-32 right-32 w-6 h-6 text-sky-300/40 animate-bounce" style={{ animationDelay: '1.5s' }} />
        <Sparkles className="absolute bottom-40 left-40 w-5 h-5 text-pink-300/40 animate-bounce" style={{ animationDelay: '2.5s' }} />
        <GraduationCap className="absolute bottom-20 right-20 w-7 h-7 text-blue-300/40 animate-bounce" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          {/* Header Card */}
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-sky-600 rounded-2xl shadow-lg mb-4">
              <School className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-sky-900 bg-clip-text text-transparent leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                SmartSchool
              </span>
            </h1>
           
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Form Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-sky-50/50 rounded-3xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-100/50 to-transparent rounded-3xl" />
            
            {/* Form Content */}
            <div className="relative z-10">
              <form onSubmit={handleSubmit(saveStudent)} className="space-y-8">
              

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* School Name Input */}
                  <div className="group">
                    <div className="relative">
                      <TextInput
                        register={register}
                        errors={errors}
                        label="School Name"
                        name="name"
                        placeholder="Enter your school's full name"
                        icon={School}
                        toolTipText="This will be displayed on certificates, reports, and official documents"
                      />
                    </div>
                  </div>

                  {/* Logo Upload Section */}
                  <div className="group">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Customize Your School Logo</h3>
                          <p className="text-sm text-gray-600">Recommended size: 500px × 150px for best quality</p>
                        </div>
                      </div>
                      <ImageInput
                        title=""
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        endpoint="schoolLogo"
                        className="object-contain"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-center ">
                    
                 
                      <SubmitButton
                        buttonIcon={loading ? undefined : ArrowRight}
                        title="Create School Profile"
                        loading={loading}
                        loadingTitle="Setting up your school..."
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-base font-semibold"
                      />
                   
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-sm text-gray-500">
              Join thousands of schools already using SmartSchool
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
              <span>Secure</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>Reliable</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>SACAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}