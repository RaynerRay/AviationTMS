"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil, XCircle } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import {
  FaFilePdf,
  FaImage,
  FaFileWord,
  FaFileExcel,
  FaFileArchive,
  FaFilePowerpoint,
  FaFileAlt,
} from "react-icons/fa";
import { MdTextSnippet } from "react-icons/md";

type MultipleImageInputProps = {
  label: string;
  files: FileProps[];
  setFiles: (files: FileProps[]) => void;
  className?: string;
  endpoint?: string;
};

export type FileProps = {
  title: string;
  type: string;
  size: number;
  url: string;
};

function getFileIcon(extension: string | undefined) {
  const commonClasses = "w-5 h-5 mr-2 shrink-0";
  switch (extension) {
    case "pdf":
      return <FaFilePdf className={`${commonClasses} text-red-500`} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FaImage className={`${commonClasses} text-gray-500`} />;
    case "doc":
    case "docx":
      return <FaFileWord className={`${commonClasses} text-blue-500`} />;
    case "xls":
    case "xlsx":
      return <FaFileExcel className={`${commonClasses} text-green-600`} />;
    case "ppt":
    case "pptx":
      return <FaFilePowerpoint className={`${commonClasses} text-orange-500`} />;
    case "zip":
    case "tar":
    case "gzip":
      return <FaFileArchive className={`${commonClasses} text-yellow-600`} />;
    case "txt":
      return <MdTextSnippet className={`${commonClasses} text-gray-400`} />;
    default:
      return <FaFileAlt className={`${commonClasses} text-gray-400`} />;
  }
}

export default function MultipleFileUpload({
  label,
  files,
  setFiles,
  className = "col-span-full",
  endpoint = "",
}: MultipleImageInputProps) {
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium text-slate-800 dark:text-slate-100">
          {label}
        </label>
        {files.length > 0 && (
          <button
            type="button"
            onClick={() => setFiles([])}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            <Pencil className="w-4 h-4" />
            <span className="text-sm">Change Files</span>
          </button>
        )}
      </div>

      {files.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((file, i) => {
            const ext = file.title.split(".").pop();
            return (
              <div
                key={i}
                className="relative rounded-md border border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-800 shadow-sm flex items-center gap-3"
              >
                <button
                  onClick={() => handleRemoveFile(i)}
                  className="absolute -top-2 -right-2 bg-white dark:bg-slate-900 text-red-500 rounded-full shadow p-1 hover:bg-red-100 dark:hover:bg-red-900 transition"
                >
                  <XCircle className="w-5 h-5" />
                </button>
                {getFileIcon(ext)}
                <div className="flex flex-col truncate">
                  <span className="text-sm font-medium truncate">{file.title}</span>
                  {file.size > 0 && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {(file.size / 1024).toFixed(2)} KB
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <UploadDropzone
          className="ut-allowed-content:hidden border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 transition hover:border-slate-500 dark:hover:border-slate-400"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const urls = res.map((item) => ({
              url: item.url,
              title: item.name,
              size: item.size,
              type: item.type,
            }));
            setFiles(urls);
            toast.success("Upload Completed");
          }}
          onUploadError={(error) => {
            toast.error("File upload failed. Try again.");
            console.error("Upload Error:", error);
          }}
        />
      )}
    </div>
  );
}
