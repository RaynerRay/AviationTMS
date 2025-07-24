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
import { StreamCreateProps } from "@/types/types";
import { createStream } from "@/actions/classes";
import useSchoolStore from "@/store/school";

export default function StreamForm({
  classId,
  initialContent,
  editingId,
}: {
  classId: string;
  initialContent?: string;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StreamCreateProps>({
    defaultValues: {
      title: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { school } = useSchoolStore();

  async function saveStream(data: StreamCreateProps) {
    if (!classId || !school?.id) {
      toast.error("Missing Class or School ID.");
      return;
    }

    data.classId = classId;
    data.schoolId = school.id;

    try {
      setLoading(true);
      if (editingId) {
        // Update stream logic (future feature)
      } else {
        await createStream(data);
        toast.success("Stream created successfully!");
        reset();
      }
    } catch (error: any) {
      console.error("Stream creation failed:", error);
      toast.error(error.message || "Failed to create stream.");
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
              title="Edit Stream"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <Pencil className="w-4 h-4" />
            </button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-8 flex gap-1 items-center px-3"
            >
              <Plus className="h-4 w-4" />
              Add Stream
            </Button>
          )}
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-md rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-xl transition-all duration-300"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              {editingId ? "Edit Stream" : "Add New Stream"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(saveStream)} className="space-y-5">
            <TextInput
              register={register}
              errors={errors}
              label="Stream Title"
              name="title"
              icon={Check}
            />

            <div className="flex justify-end">
              <SubmitButton
                title={editingId ? "Update" : "Add Stream"}
                loading={loading}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
