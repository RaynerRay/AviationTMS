import {
  SubjectCategory,
  SubjectType,
} from "@/components/dashboard/SubjectByClassListing";

export type Contact = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  school: string;
  country: string;
  schoolPage: string;
  students: number;
  role: string;
  media: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};
export type Parent = {
  id: string;
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
  whatsapNo: string;
  imageUrl: string;
  contactMethod: string;
  occupation: string;
  address: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
export type Staff = {
  id: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type ClassCreateProps = {
  title: string;
  schoolId: string;
};

export interface SubjectDetail {
  id: string;
  name: string;
  code: string;
  shortName?: string;
  type: SubjectType;
  category: SubjectCategory;
  passingMarks?: number;
  totalMarks?: number;
  isActive: boolean;
  isOptional: boolean;
  hasTheory: boolean;
  hasPractical: boolean;
  labRequired: boolean;
  teacherId: string;
  teacherName: string;
}
export type SubjectCreateProps = {
  name: string;
  code: string; // e.g., "MATH101", "PHY201"
  shortName: string; // e.g., "Math", "Phy"
  category: string; // Core, Elective, etc.
  type: string; // Theory, Practical, Both
};

export type StreamCreateProps = {
  title: string;
  classId: string;
  schoolId: string;
};
export type AssignClassTeacherProps = {
  classTeacherId: string;
  classId: string;
  classTeacherName: string;
  oldClassTeacherId: string | null | undefined;
};

// export type Class = {
//   id: string;
//   title: string;
//   slug: string;
//   streams: Stream[];
//   students: Student[];
//   createdAt: string;
//   updatedAt: string;
// };
export type Class = {
  id: string;
  title: string;
  slug: string;
  classTeacherId: string | null;
  classTeacherName: string | null;
  streams: StreamWithCount[];
  _count: {
    students: number;
  };
  createdAt: string;
  updatedAt: string;
  subjects: SubjectDetail[];
};

export interface Period {
  id: string;
  year: number;
  term: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  schoolId: string;
}

export interface GroupedPeriods {
  [year: string]: Period[];
}

export type ClassBrief = {
  id: string;
  title: string;
};
export type SubjectBrief = {
  id: string;
  name: string;
};

export type StreamWithCount = {
  id: string;
  title: string;
  slug: string;
  classId: string;
  _count: {
    students: number;
  };
  createdAt: string;
  updatedAt: string;
};
export type Stream = {
  id: string;
  title: string;
  slug: string;
  classId: string;
  class: Class;
  createdAt: Date;
  updatedAt: Date;
};
export interface MarkSheetStudent {
  id: string;
  name: string;
}
export interface MarkSheetResponse {
  students: MarkSheetStudent[];
  markSheetId: string;
}
export type CreateMarkSheetProps = {
  examId: string;
  title: string;
  classId: string;
  subjectId: string;
  markSheetId: string;
  termId: string;
};
export type UpdateMarkSheetProps = {
  examId: string;
  classId: string;
  subjectId: string;
  markSheetId: string;
  termId: string;
  studentMarks: {
    studentId: string;
    marks: number | null;
    isAbsent: boolean;
    comments: string;
  }[];
};
export type Student = {
  id: string;
  name: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  licenseType: string;
  pilotLicenseNumber?: string;

  totalFlightHours?: number;
  totalSimulatorHours?: number;
  dayHours?: number;
  nightHours?: number;
  instrumentHours?: number;
  singleEngineTime?: number;
  multiEngineTime?: number;

  licenseExpiryDate?: Date;
  medicalCertificateExpiry?: Date;

  parentId: string;
  classId: string;
  studentType?: string;
  streamId: string;
  password: string;
  imageUrl?: string;
  phone?: string;
  parentName?: string;
  classTitle?: string;
  streamTitle?: string;
  state: string;
  idNumber: string;
  nationality: string;
  religion: string;
  gender: "MALE" | "FEMALE" | "OTHER"; // match your enum
  dob: string;
  rollNo: string;
  regNo: string;
  admissionDate: string;
  address: string;
  schoolId: string;
  schoolName: string;

  createdAt: string;
  updatedAt: string;
};
export interface StudentCreateProps {
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  licenseType: string;
  pilotLicenseNumber?: string;

  totalFlightHours?: number;
  totalSimulatorHours?: number;
  dayHours?: number;
  nightHours?: number;
  instrumentHours?: number;
  singleEngineTime?: number;
  multiEngineTime?: number;

  licenseExpiryDate?: Date;
  medicalCertificateExpiry?: Date;

  parentId: string;
  classId: string;
  studentType?: string;
  streamId: string;
  password: string;
  imageUrl?: string;
  phone?: string;
  parentName?: string;
  classTitle?: string;
  streamTitle?: string;
  state: string;
  idNumber: string;
  nationality: string;
  religion: string;
  gender: "MALE" | "FEMALE" | "OTHER"; // match your enum
  dob: string;
  rollNo: string;
  regNo: string;
  admissionDate: string;
  address: string;
  schoolId: string;
  schoolName: string;

  // Optional relational documents if creating them together
  documents?: any[]; // Replace `any` with a proper StudentDocumentCreate type if needed
}

export interface Guardian {
  studentId: string;
  id: string;
  // Father's Details
  fatherFullName: string;
  fatherOccupation: string;
  fatherPhoneNumber: string;
  fatherEmail: string;
  fatherOfficeAddress: string;
  isPrimaryGuardian: boolean;

  // Mother's Details
  motherFullName: string;
  motherOccupation: string;
  motherPhoneNumber: string;
  motherEmail: string;
  motherOfficeAddress: string;
  isSecondaryGuardian: boolean;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactNumber: string;
  isLocalGuardian: boolean;
  createdAt: string;
  updatedAt: string;
}

// Main Subject interface
export interface Subject {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Basic Information
  name: string;
  slug: string;
  code: string;
  shortName?: string;

  // Academic Details
  category: SubjectCategory;
  type: SubjectType;
  passingMarks?: number;
  totalMarks?: number;

  // Additional Settings
  isActive: boolean;
  isOptional: boolean;
  hasTheory: boolean;
  hasPractical: boolean;
  labRequired: boolean;
}
export interface TeacherCreateProps {
  // Required Relationships
  userId: string;
  schoolId: string;
  schoolName: string;

  // Required Fields
  // title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  NIN: string;
  contactMethod: string;
  designation: string;
  instructorRatings: string[];
  classes: string[];
  classIds: string[];
  subjectsSummary: string[];
  nationality: string;
  dateOfJoining: Date;
  gender: string;

  // Optional Fields
  password?: string;
  whatsappNo?: string;
  dateOfBirth?: Date;
  imageUrl?: string;
  lastLogin?: Date;
  pilotLicenseNumber?: string;
  licenseExpiryDate?: string;
  medicalCertificateExpiry?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  experience?: number;
  bio?: string;
  skills?: string;

  // Optional Totals (can be omitted on create)
  totalFlightHours?: number;
  totalSimulatorHours?: number;
  dayHours?: number;
  nightHours?: number;
  instrumentHours?: number;
  singleEngineTime?: number;
  multiEngineTime?: number;

  // Optional relationships (if used)
  subjectIds?: string[]; // to link to Subject[] if handled relationally
}
export interface Teacher {
  id: string;
  userId: string;
  schoolId: string;
  schoolName: string;

  // Required Fields
  // title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  NIN: string;
  contactMethod: string;
  designation: string;
  instructorRatings: string[];
  classes: string[];
  classIds: string[];
  subjectsSummary: string[];
  nationality: string;
  dateOfJoining: Date;
  gender: string;

  // Optional Fields
  password?: string;
  whatsappNo?: string;
  dateOfBirth?: Date;
  imageUrl?: string;
  lastLogin?: Date;
  pilotLicenseNumber?: string;
  licenseExpiryDate?: string;
  medicalCertificateExpiry?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  experience?: number;
  bio?: string;
  skills?: string;

  // Optional Totals (can be omitted on create)
  totalFlightHours?: number;
  totalSimulatorHours?: number;
  dayHours?: number;
  nightHours?: number;
  instrumentHours?: number;
  singleEngineTime?: number;
  multiEngineTime?: number;

  // Optional relationships (if used)
  subjectIds?: string[]; // to link to Subject[] if handled relationally
}
export interface BriefTeacher {
  // Basic Identifiers
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  image?: string | null;
  phone?: string | null;
  schoolId?: string | null;
  schoolName?: string | null;
}
export type School = {
  id: string;
  name: string;
  logo: string | null;
  slug: string;
  sectionCount: number;
  siteEnabled: boolean;
  siteCompletion: number;
};
export type UserCreateProps = {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phone?: string;
  image?: string;
  schoolId?: string ;
  schoolName?: string;
};
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "TEACHER"
  | "STUDENT"
  | "PARENT"
  | "SECRETARY"
  | "LIBRARIAN";
export type PeriodCreateProps = {
  year: number;
  term: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  schoolId: string;
};

export interface CreateSchoolFeePaymentInput {
  schoolName: string;
  schoolId: string;
  periodId: string;
  schoolFeeId: string;
  studentProfileId: string;
  studentUserId: string;
  studentName: string;
  parentProfileId: string;
  parentUserId: string;
  parentName: string;
  schoolFeeTitle: string;
  paidFeeAmount: number;
  paidFees: string[];
  PRN: string;
  term: string;
  year: number;
  className: string;
  // paymentStatus: "PENDING" | "APPROVED" | "FAILED";
}

export enum PaymentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  FAILED = "FAILED",
}
export type UserLogCreateProps = {
  name: string;
  activity: string;
  time: string;
  ipAddress?: string;
  device?: string;
  schoolId: string;
};
// Main payment interface
export interface Payment {
  id: string;
  studentUserId: string;
  studentName: string;
  paidFeeAmount: number;
  paidFees: string[];
  PRN: string;
  paymentStatus: PaymentStatus;
  term: string;
  year: number;
  className: string;
}
export type Exam = {
  id: string;
  title: string;
  examType: "REGULAR" | "MOCK" | "PLACEMENT";
  examCategory: "TERM_START" | "MID_TERM" | "END_TERM";
  termName: number;
  academicYear: string;
  startDate: string;
};
export type RecentActivity = {
  id: string;
  activity: string;
  description: string;
  read: boolean;
  createdAt: string;
  time: string;
};
export type GalleryImageDTO = {
  id: string;
  schoolId: string;
  title: string;
  description?: string;
  image: string;
  date?: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};
export interface GalleryImageCreateDTO {
  schoolId: string;
  title: string;
  description?: string;
  image: string;
  date?: string;
  categoryId: string;
}
export interface GalleryCategory {
  id: string;
  name: string;
}

export type Section = {
  id: string;
  schoolId: string;
  type: string;
  isComplete: boolean;
  title: string;
  subtitle?: string | null;
  isActive: boolean;
  order: number;
  settings: any;
  createdAt: Date;
  updatedAt: Date;
};
export interface News {
  id: string;
  schoolId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  image: string;
  content: string;
}
export interface EventData {
  id: string;
  schoolId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}


// Flight Operations
export interface AircraftModel {
  id: string;
  tailNumber: string;
  make: string;
  model: string;
  aircraftType: AircraftType;
  engineHours: number;
  airframeHours: number;
  lastInspection: Date | null;
  nextInspection: Date | null;
  status: AircraftStatus;
  location: string | null;
  hourlyRate: number; // Representing Decimal as number
  schoolId: string;
  // Relations (optional, depends on how you want to expose them)
  school?: School;
  flightSessions?: FlightSessionModel[];
  maintenanceLogs?: MaintenanceLogModel[];
  createdAt: Date;
  updatedAt: Date;
}

export type AircraftProps = {
  
  tailNumber: string;
  make: string;
  model: string;
  aircraftType: AircraftType;
  engineHours: number;
  airframeHours: number;
  lastInspection: string;
  nextInspection: string;
  status: AircraftStatus;
  location: string;
  hourlyRate: number;
  schoolId: string;
  schoolName: string;
  imageUrl: string;
  maintenanceLogs?: MaintenanceLogModel[];
};
export interface CreateFlightSession {
  sessionType: SessionType;
  date: Date | string;
  flightType: string;

  detailsOfFlight: string;

  ifrApproaches: number;
  instrumentTime: number;
  instrumentTimeSe: number;
  instrumentTimeMe: number;

  actualTime: number;

  fstdTime: number;
  fstdDual: number;
  fstdPic: number;
  fstdPicPractice: number;

  singleEngineDay: number;
  singleEngineNight: number;
  multiEngineDay: number;
  multiEngineNight: number;

  other: number;

  takeOffsDay: number;
  takeOffsNight: number;
  landingsDay: number;
  landingsNight: number;

  status: SessionStatus;
  startTime: Date ;
  endTime: Date ;
  durationHours: number;

  teacherFeedback?: string;
  studentFeedback?: string;
  verifiedByInstructor?: boolean;

  aircraftId?: string;
  aircraftType?: string;
  registrationNumber?: string;

  departureAirport?: string;
  arrivalAirport?: string;

  totalFlightTime: number;
  dayHours: number;
  nightHours: number;
  instrumentHours: number;
  singleEngineTime: number;
  multiEngineTime: number;

  pilotRole: PilotRole;
  crewOperation: CrewOperation;

  studentId: string;
  teacherId: string;
  simulatorId?: string;

  schoolId: string;
  actualFlightHours?: number;
  actualSimulatorHours?: number;
  actualGroundHours?: number;
}

export type CreateFlightSessionInput = {
  // Basic Session Information
  sessionType: SessionType;
  date: Date; // HTML date input format
  flightType: string;
  detailsOfFlight: string;
  
  // Time and Duration
  startTime: Date; // HTML datetime-local format
  endTime: Date; // HTML datetime-local format
  
  // Personnel
  studentId: string;
  teacherId: string;
  
  // Aircraft/Simulator Information
  aircraftId: string;
  simulatorId?: string;
  aircraftType?: string;
  registrationNumber: string;
  
  // Flight Route
  departureAirport: string;
  arrivalAirport: string;
  
  // Flight Time Breakdown
  dayHours?: number;
  nightHours?: number;
  instrumentHours?: number;
  singleEngineTime?: number;
  multiEngineTime?: number;
  
  // Detailed Flight Times
  actualTime: number;
  singleEngineDay: number;
  singleEngineNight: number;
  multiEngineDay: number;
  multiEngineNight: number;
  other: number;
  
  // Instrument Training
  ifrApproaches: number;
  instrumentTime: number;
  instrumentTimeSe: number;
  instrumentTimeMe: number;
  
  // Simulator Time (FSTD - Flight Simulation Training Device)
  fstdTime: number;
  fstdDual: number;
  fstdPic: number;
  fstdPicPractice: number;
  
  // Takeoffs and Landings
  takeOffsDay: number;
  takeOffsNight: number;
  landingsDay: number;
  landingsNight: number;
  
  // Pilot Role and Operation
  pilotRole: PilotRole;
  crewOperation: CrewOperation;
  
  // Feedback and Verification
  teacherFeedback?: string;
  verifiedByInstructor: boolean;
  
  // Status
  status: SessionStatus;
  
  // Actual Hours (for post-flight logging)
  actualFlightHours?: number;
  actualSimulatorHours?: number;
  actualGroundHours?: number;
};
export interface FlightSessionModel {
  id: string;
  sessionId: string;
  sessionType: SessionType;
  date: Date ;
  flightType: string ;

  detailsOfFlight: string ;

  ifrApproaches: number;
  instrumentTime: number;
  instrumentTimeSe: number;
  instrumentTimeMe: number;

  actualTime: number;

  fstdTime: number;
  fstdDual: number;
  fstdPic: number;
  fstdPicPractice: number;

  singleEngineDay: number;
  singleEngineNight: number;
  multiEngineDay: number;
  multiEngineNight: number;

  other: number;

  takeOffsDay: number;
  takeOffsNight: number;
  landingsDay: number;
  landingsNight: number;

  status: SessionStatus;
  startTime: Date;
  endTime: Date;
  durationHours: number ;
  teacherFeedback: string | null;
  studentFeedback: string | null;
  verifiedByInstructor: boolean;

  aircraftId: string ;
  aircraft?: AircraftModel | null;
  aircraftType: string | null;
  registrationNumber: string ;

  departureAirport: string ;
  arrivalAirport: string ;

  // totalFlightTime: number | null;
  dayHours: number | null;
  nightHours: number | null;
  instrumentHours: number | null;
  singleEngineTime: number | null;
  multiEngineTime: number | null;

  pilotRole: PilotRole | null;
  crewOperation: CrewOperation | null;

  studentId: string;
  student: Student
  teacherId: string;
  teacher: TeacherCreateProps; 
  simulatorId: string | null;
  simulator?: SimulatorModel | null;

  schoolId: string;
  school: School;

  actualFlightHours: number | null;
  actualSimulatorHours: number | null;
  actualGroundHours: number | null;

  createdAt: Date;
  updatedAt: Date;
}
export enum CrewOperation {
  SINGLE_PILOT = "SINGLE_PILOT",
  MULTI_PILOT = "MULTI_PILOT",
}
export enum PilotRole {
  PIC = "PIC",
  DUAL = "DUAL",
  COPILOT = "COPILOT",
  PICUS = "PICUS",
  COMMD_PRACTICE = "COMMAND_PRACTICE",
}
export type CreateMaintenanceLogProps = {
  aircraftId: string;
  logDate: Date;
  description: string;
  maintenanceType: MaintenanceType;
  performedBy: string;
  cost?: number; // Representing Decimal as number for input
  partsReplaced?: string[];
  hoursAtMaintenance?: number;
  nextDueDate?: Date;
  status?: MaintenanceStatus;
};

export interface MaintenanceLogModel {
  id: string;
  aircraftId: string;
  aircraft?: AircraftModel; // Relation
  logDate: Date;
  description: string;
  maintenanceType: MaintenanceType;
  performedBy: string;
  cost: number | null; // Representing Decimal as number
  partsReplaced: string[] | null;
  hoursAtMaintenance: number | null;
  nextDueDate: Date | null;
  status: MaintenanceStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type CreateSimulatorProps = {
  name: string;
  model: string;
  simulatorType: SimulatorType;
  hourlyRate?: number; // Representing Decimal as number for input
  location?: string;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  status?: SimulatorStatus;
  schoolId: string;
};

export interface SimulatorModel {
  id: string;
  name: string;
  model: string;
  simulatorType: SimulatorType;
  hourlyRate: number; // Representing Decimal as number
  location: string | null;
  lastMaintenance: Date | null;
  nextMaintenance: Date | null;
  status: SimulatorStatus;
  schoolId: string;
  // Relations
  school?: School;
  flightSessions?: FlightSessionModel[];
  createdAt: Date;
  updatedAt: Date;
}

export enum SimulatorType {
  BASIC_AVIATION_TRAINING_DEVICE = "BASIC_AVIATION_TRAINING_DEVICE", // BATD
  ADVANCED_AVIATION_TRAINING_DEVICE = "ADVANCED_AVIATION_TRAINING_DEVICE", // AATD
  FLIGHT_TRAINING_DEVICE = "FLIGHT_TRAINING_DEVICE", // FTD (Level 1-7)
  FULL_FLIGHT_SIMULATOR = "FULL_FLIGHT_SIMULATOR", // FFS (Level A-D)
  VIRTUAL_REALITY = "VIRTUAL_REALITY",
  FIXED_BASE = "FIXED_BASE",
}

export enum SimulatorStatus {
  AVAILABLE = "AVAILABLE",
  IN_USE = "IN_USE",
  MAINTENANCE = "MAINTENANCE",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
}
export enum AircraftType {
  SINGLE_ENGINE_PISTON = "SINGLE_ENGINE_PISTON",
  MULTI_ENGINE_PISTON = "MULTI_ENGINE_PISTON",
  TURBOPROP = "TURBOPROP",
  JET = "JET",
  HELICOPTER = "HELICOPTER",
  GLIDER = "GLIDER",
  ULTRALIGHT = "ULTRALIGHT",
}

export enum AircraftStatus {
  AVAILABLE = "AVAILABLE",
  IN_FLIGHT = "IN_FLIGHT",
  MAINTENANCE = "MAINTENANCE",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
  RESERVED = "RESERVED",
}
export enum SessionType {
  FLIGHT = "FLIGHT",
  SIMULATOR = "SIMULATOR",
  TRAINING = "TRAINING",
  CHECKRIDE = "CHECKRIDE",
  SOLO = "SOLO",
  CROSS_COUNTRY = "CROSS_COUNTRY",
}

export enum SessionStatus {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  RESCHEDULED = "RESCHEDULEED",
  NO_SHOW = "NO_SHOW",
  PENDING_REVIEW = "PENDING_REVIEW", // For post-flight logging
}

export enum MaintenanceType {
  SCHEDULED = "SCHEDULED",
  UNSCHEDULED = "UNSCHEDULED",
  INSPECTION = "INSPECTION",
  REPAIR = "REPAIR",
  PREVENTATIVE = "PREVENTATIVE",
}

export enum MaintenanceStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DEFERRED = "DEFERRED",
}
// snags
export type SnagSeverity = 'LOW' | 'MEDIUM' | 'CRITICAL';
export type SnagStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export type CreateSnag = {
  reportedBy: string;
  equipmentName: string;
  description: string;
  severity: SnagSeverity;
  reportedAt: string; // ISO date string
  status: SnagStatus;
  assignedTo?: string | null;
  resolvedAt?: string | null;
  resolutionNote?: string | null;
  schoolId: string;
  school: School;
};
export type Snag = {
  id: string;
  reportedAt: string; // ISO date string
  reportedBy: string;
  equipmentName: string;
  description: string;
  severity: SnagSeverity;
  status: SnagStatus;
  assignedTo?: string | null;
  resolvedAt?: string | null;
  resolutionNote?: string | null;
  schoolId: string;
  school: School;
};
export type Incident = {
  id: string;
  occurredAt: string;
  reportedAt: string;
  reportedBy: string;
  involvedPeople: string[];
  equipmentName?: string | null;
  flightSessionId?: string | null;
  location: string;
  type: IncidentType;
  description: string;
  status: IncidentStatus;
  investigator?: string | null;
  investigation?: string | null;
  correctiveAction?: string | null;
  closedAt?: string | null;
  schoolId: string;
  school: School;
};

export type CreateIncident = {
  occurredAt: string;
  reportedBy: string;
  involvedPeople: string[];
  equipmentName?: string;
  flightSessionId?: string;
  location: string;
  type: IncidentType;
  description: string;
  status: IncidentStatus;
  investigator?: string | null;
  investigation?: string | null;
  correctiveAction?: string | null;
  closedAt?: string | null;
  schoolId: string;
  school?: School;
};
// incident report
export type IncidentType =
  | 'SAFETY'
  | 'OPERATIONAL'
  | 'MEDICAL'
  | 'TECHNICAL'
  | 'OTHER';

export type IncidentStatus =
  | 'OPEN'
  | 'INVESTIGATING'
  | 'CLOSED';


