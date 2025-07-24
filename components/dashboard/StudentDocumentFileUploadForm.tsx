"use client";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import Link from "next/link";
import {
  File,
  Loader2,
  Paperclip,
  Plus,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaFilePdf, FaImage } from "react-icons/fa";
import MultipleFileUpload, {
  FileProps,
} from "../FormInputs/MultipleFileUploader";
import { createStudentDocs } from "@/actions/student-docs";
import { StudentDocument } from "../StudentDocuments";
// import { createFile, createMultipleFiles } from "@/actions/fileManager";
// import { FileProps as CreateFileProps } from "@/types/types";

export type CreateDoc = {
  name: string;
  type: string;
  url: string;
  size: number;
  studentId: string;
};

export default function StudentDocumentFileUploadForm({
  studentId,
  docs,
  setDocs,
}: {
  studentId: string;
  docs: StudentDocument[];
  setDocs: (docs: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [files, setFiles] = useState<FileProps[]>([]);
  function handleImageRemove(fileIndex: any) {
    const updatedFiles = files.filter((file, index) => index !== fileIndex);
    setFiles(updatedFiles);
  }

  async function onSubmit() {
    setSuccess(false);
    const data: CreateDoc[] = files.map((file) => {
      return {
        name: file.title,
        type: file.type,
        url: file.url,
        size: file.size,
        studentId,
      };
    });
    try {
      setIsLoading(true);
      const res = await createStudentDocs(data);
      console.log(res);
      toast.success("Files uploaded Successfully!");
      setIsLoading(false);
      setSuccess(true);
      const newDocs = [...res.data, ...docs];
      setDocs(newDocs);
      setFiles([]);
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <MultipleFileUpload
          label="Upload Student Documents"
          files={files}
          setFiles={setFiles}
          endpoint="fileUploads"
        />
        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving Please wait...
          </Button>
        ) : (
          <>
            {success ? (
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    onClick={() => setSuccess(false)}
                    type="button"
                    variant="secondary"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            ) : (
              <Button onClick={onSubmit}>Save Files</Button>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
