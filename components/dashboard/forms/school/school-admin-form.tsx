"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import TextInput from "@/components/FormInputs/TextInput";
import toast from "react-hot-toast";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Lock, Mail, Phone, Send, User, Shield, Users, CheckCircle, ArrowRight, Crown } from "lucide-react";
import { UserCreateProps } from "@/types/types";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { createUser } from "@/actions/users";

export type SelectOptionProps = {
  label: string;
  value: string;
};

export type SchoolProps = {
  name: string;
  logo: string;
};

export default function SchoolAdminForm({
  schoolId,
  schoolName,
}: {
  schoolId: string;
  schoolName: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCreateProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function saveStudent(data: UserCreateProps) {
    try {
      setLoading(true);
      data.schoolId = schoolId;
      data.schoolName = schoolName;
      data.role = "ADMIN";
      console.log(data);
      const res = await createUser(data);
      console.log(res);
      setLoading(false);
      toast.success("Admin Successfully Created!");
      reset();
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Crown className="absolute top-20 left-20 w-8 h-8 text-indigo-300/40 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <Shield className="absolute top-32 right-32 w-6 h-6 text-purple-300/40 animate-bounce" style={{ animationDelay: '1.5s' }} />
        <Users className="absolute bottom-40 left-40 w-5 h-5 text-blue-300/40 animate-bounce" style={{ animationDelay: '2.5s' }} />
        <CheckCircle className="absolute bottom-20 right-20 w-7 h-7 text-green-300/40 animate-bounce" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {schoolName}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              You're almost there! Create your admin account to start managing your school with powerful tools and insights.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Form Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-3xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-3xl" />
            
            {/* Form Content */}
            <div className="relative z-10">
              <form onSubmit={handleSubmit(saveStudent)} className="space-y-8">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">School Created</span>
                    </div>
                    <div className="w-8 h-0.5 bg-indigo-200 rounded-full" />
                    <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-200">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-indigo-700">Create Admin</span>
                    </div>
                  </div>
                </div>

                {/* Admin Role Badge */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 px-4 py-2 rounded-full">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">Administrator Account</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 bg-indigo-100 rounded-lg">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <TextInput
                        register={register}
                        errors={errors}
                        label="Full Name"
                        name="name"
                        icon={User}
                        placeholder="Enter administrator's full name"
                        toolTipText="This will be displayed as the primary administrator name"
                      />
                      <TextInput
                        register={register}
                        errors={errors}
                        label="Email Address"
                        name="email"
                        type="email"
                        icon={Mail}
                        placeholder="admin@school.com"
                        toolTipText="This email will be used for login and system notifications"
                      />
                    </div>
                  </div>

                  {/* Security & Contact Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <Shield className="w-4 h-4 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Security & Contact</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <TextInput
                        register={register}
                        errors={errors}
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        icon={Phone}
                        placeholder="+1 (555) 123-4567"
                        toolTipText="Primary contact number for administrative matters"
                      />
                      <PasswordInput
                        register={register}
                        errors={errors}
                        label="Password"
                        name="password"
                        icon={Lock}
                        toolTipText="Choose a strong password with at least 8 characters"
                      />
                    </div>
                  </div>
                </div>

                {/* Admin Privileges Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Crown className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-900">Administrator Privileges</h4>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        As an administrator, you'll have full access to manage students, teachers, classes, grades, and all school operations. You can also create additional admin accounts later.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">User Management</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Academic Records</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">System Settings</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Reports & Analytics</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-gray-600">
                        Ready to launch your smart school management system?
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        You'll be redirected to the dashboard after account creation
                      </p>
                    </div>
                    <div className="w-full sm:w-auto">
                      <SubmitButton
                        buttonIcon={loading ? undefined : ArrowRight}
                        title="Create Administrator Account"
                        loading={loading}
                        loadingTitle="Creating admin account..."
                        className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-base font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

       
        </div>
      </div>
    </div>
  );
}