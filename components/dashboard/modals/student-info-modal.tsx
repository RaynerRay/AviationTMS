"use client";
import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import {
  User,
  Mail,
  Phone,
  Flag,
  MapPin,
  School,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Book,
  Hash,
  Gauge,
  Plane,
  Timer,
  BadgeCheck,
  ShieldCheck,
  Grid2X2,
  LayoutGrid,
} from "lucide-react";
import { Student } from "@/types/types";
import { getNormalDate } from "@/lib/getNormalDate";

interface StudentInfoModalProps {
  student: Student;
}

export function StudentModal({ student }: StudentInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"general" | "flight">("general");

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 border rounded-lg hover:bg-gray-100"
      >
        <LayoutGrid size={20} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 text-gray-400 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold"> {student.name}</h2>
              <p className="text-sm text-muted-foreground">Quick view with aviation records</p>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-1 border-orange-200">
                <Image
                  src={student.imageUrl || "/placeholder.png"}
                  alt={student.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">Student Profile</h3>
                <p className="text-sm text-gray-500 capitalize">
                  {student.gender.toLowerCase()} / {student.studentType || "Student"}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center space-x-4 border-b pb-2">
              <button
                onClick={() => setTab("general")}
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  tab === "general"
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                General Info
              </button>
              <button
                onClick={() => setTab("flight")}
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  tab === "flight"
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                Flight Info
              </button>
            </div>

            {/* Tab Content */}
            {tab === "general" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StudentField icon={<Hash size={16} />} label="Reg No" value={student.regNo} />
                <StudentField icon={<Book size={16} />} label="Roll No" value={student.rollNo} />
                <StudentField icon={<Calendar size={16} />} label="DOB" value={getNormalDate(student.dob)} />
                <StudentField icon={<Calendar size={16} />} label="Admission" value={getNormalDate(student.admissionDate)} />
                <StudentField icon={<Mail size={16} />} label="Email" value={student.email} />
                <StudentField icon={<Phone size={16} />} label="Phone" value={student.phone} />
                <StudentField icon={<Flag size={16} />} label="Nationality" value={student.nationality} />
                <StudentField icon={<MapPin size={16} />} label="Address" value={student.address} />
                <StudentField icon={<School size={16} />} label="Class" value={student.classTitle} />
                <StudentField icon={<School size={16} />} label="Stream" value={student.streamTitle} />
                <StudentField icon={<ShieldCheck size={16} />} label="ID Number" value={student.idNumber} />
                <StudentField icon={<User size={16} />} label="Parent" value={student.parentName} />
                <StudentField icon={<Book size={16} />} label="Religion" value={student.religion} />
                <StudentField icon={<School size={16} />} label="School" value={student.schoolName} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StudentField icon={<Gauge size={16} />} label="Flight Hours" value={student.totalFlightHours} />
                <StudentField icon={<Gauge size={16} />} label="Simulator Hours" value={student.totalSimulatorHours} />
                <StudentField icon={<Clock size={16} />} label="Day Hours" value={student.dayHours} />
                <StudentField icon={<Clock size={16} />} label="Night Hours" value={student.nightHours} />
                <StudentField icon={<Timer size={16} />} label="Instrument Hours" value={student.instrumentHours} />
                <StudentField icon={<Plane size={16} />} label="Single Engine" value={student.singleEngineTime} />
                <StudentField icon={<Plane size={16} />} label="Multi Engine" value={student.multiEngineTime} />
                <StudentField icon={<BadgeCheck size={16} />} label="License Expiry" value={student.licenseExpiryDate ? getNormalDate(student.licenseExpiryDate) : "N/A"} />
                <StudentField icon={<ShieldCheck size={16} />} label="Medical Expiry" value={student.medicalCertificateExpiry ? getNormalDate(student.medicalCertificateExpiry) : "N/A"} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Reusable Info Display
function StudentField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-md shadow-sm">
      <div className="text-orange-500">{icon}</div>
      <span className="font-semibold">{label}:</span>
      <span className="truncate">{value ?? "N/A"}</span>
    </div>
  );
}