"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";

import { ClassCreateProps } from "@/types/types";
import { createClass } from "@/actions/classes";
import useSchoolStore from "@/store/school";

export type ClassProps = {
  name: string;
};

export default function ClassForm({
  initialContent,
  editingId,
}: {
  userId?: string;
  initialContent?: string;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassCreateProps>({
    defaultValues: {
      title: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { school } = useSchoolStore();

  async function saveClass(data: ClassCreateProps) {
    if (!school?.id) {
      toast.error("School ID is missing.");
      return;
    }
  
    data.schoolId = school.id;
  
    try {
      setLoading(true);
      const res = await createClass(data);
      toast.success("Successfully Created!");
      reset();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      console.error("Class creation error:", error);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="py-1">
      <Dialog>
        <DialogTrigger asChild>
          {editingId ? (
            <button
              title="Edit Class"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <Pencil className="w-4 h-4" />
            </button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-blue-50 hover:bg-blue-100 transition"
            >
              <Plus className="h-4 w-4 text-blue-600" />
              <span className="sr-only">Add Class</span>
            </Button>
          )}
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-md rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-2xl transition-all duration-300"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {editingId ? "Edit Class" : "Add New Class"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(saveClass)} className="space-y-5">
            <TextInput
              register={register}
              errors={errors}
              label="Class Title"
              name="title"
              icon={Check}
            />

            <div className="flex justify-end">
              <SubmitButton
                title={editingId ? "Update" : "Add Class"}
                loading={loading}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
