import { useState } from "react";
import { format } from "date-fns";
import {
  User,
  Mail,
  Phone,
  Flag,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Edit,
  Trash2,
  GraduationCap,
  Book,
  X,
  HeartPulse,
  FileBadge,
  Landmark,
  Plane,
  TimerReset,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import {  TeacherCreateProps } from "@/types/types"; // Make sure it includes all model fields

interface TeacherInfoModalProps {
  teacher: TeacherCreateProps;
}

export function TeacherInfoModal({ teacher }: TeacherInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
      >
        View Teacher Info
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold">Teacher Information</h2>
            </div>

            {/* Header/Profile */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                {teacher.imageUrl ? (
                  <img src={teacher.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-xl font-semibold">
                    {teacher.firstName[0]}{teacher.lastName[0]}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-gray-500 text-sm">{teacher.schoolName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* Personal Info */}
              <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={teacher.email} />
              <InfoItem icon={<Phone className="w-4 h-4" />} label="Phone" value={teacher.phone} />
              <InfoItem icon={<Phone className="w-4 h-4" />} label="WhatsApp" value={teacher.whatsappNo || "-"} />
              <InfoItem icon={<User className="w-4 h-4" />} label="Gender" value={teacher.gender} />
              <InfoItem icon={<Calendar className="w-4 h-4" />} label="Date of Birth" value={teacher.dateOfBirth ? format(new Date(teacher.dateOfBirth), "PPP") : "-"} />
              <InfoItem icon={<Flag className="w-4 h-4" />} label="Nationality" value={teacher.nationality} />
              <InfoItem icon={<UserCheck className="w-4 h-4" />} label="National ID" value={teacher.NIN} />
              <InfoItem icon={<Mail className="w-4 h-4" />} label="Preferred Contact" value={teacher.contactMethod} />
              <InfoItem icon={<MapPin className="w-4 h-4" />} label="Address" value={teacher.address || "-"} />
              <InfoItem icon={<Calendar className="w-4 h-4" />} label="Date of Joining" value={format(new Date(teacher.dateOfJoining), "PPP")} />
              <InfoItem icon={<Clock className="w-4 h-4" />} label="Last Login" value={teacher.lastLogin ? format(new Date(teacher.lastLogin), "PPP") : "-"} />

              {/* Flight & License */}
              <InfoItem icon={<Plane className="w-4 h-4" />} label="Pilot License #" value={teacher.pilotLicenseNumber || "-"} />
              <InfoItem icon={<FileBadge className="w-4 h-4" />} label="License Expiry" value={teacher.licenseExpiryDate || "-"} />
              <InfoItem icon={<HeartPulse className="w-4 h-4" />} label="Medical Certificate Expiry" value={teacher.medicalCertificateExpiry || "-"} />
              <InfoItem icon={<TimerReset className="w-4 h-4" />} label="Total Flight Hours" value={`${teacher.totalFlightHours ?? 0} hrs`} />
              <InfoItem icon={<TimerReset className="w-4 h-4" />} label="Simulator Hours" value={`${teacher.totalSimulatorHours ?? 0} hrs`} />
              <InfoItem icon={<TimerReset className="w-4 h-4" />} label="Day Hours" value={`${teacher.dayHours ?? 0} hrs`} />
              <InfoItem icon={<TimerReset className="w-4 h-4" />} label="Night Hours" value={`${teacher.nightHours ?? 0} hrs`} />
              <InfoItem icon={<TimerReset className="w-4 h-4" />} label="Instrument Hours" value={`${teacher.instrumentHours ?? 0} hrs`} />
              <InfoItem icon={<TimerReset className="w-4 h-4" />} label="Single Engine Time" value={`${teacher.singleEngineTime ?? 0} hrs`} />
              <InfoItem icon={<TimerReset className="w-4 h-4" />} label="Multi Engine Time" value={`${teacher.multiEngineTime ?? 0} hrs`} />

              {/* School Relationship */}
              <InfoItem icon={<Landmark className="w-4 h-4" />} label="School" value={teacher.schoolName} />

              {/* Emergency Contact */}
              <InfoItem icon={<AlertTriangle className="w-4 h-4" />} label="Emergency Contact" value={teacher.emergencyContactName || "-"} />
              <InfoItem icon={<Phone className="w-4 h-4" />} label="Emergency Phone" value={teacher.emergencyContactPhone || "-"} />
              <InfoItem icon={<User className="w-4 h-4" />} label="Relation" value={teacher.emergencyContactRelation || "-"} />

            </div>

            {/* Instructor Ratings */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-2">Instructor Ratings</h4>
              <div className="flex flex-wrap gap-2">
                {teacher.instructorRatings?.map((rating, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded"
                  >
                    {rating}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-md">
      <div className="text-gray-500 pt-0.5">{icon}</div>
      <div>
        <div className="text-gray-700 font-medium">{label}</div>
        <div className="text-gray-600 break-words">{value}</div>
      </div>
    </div>
  );
}
