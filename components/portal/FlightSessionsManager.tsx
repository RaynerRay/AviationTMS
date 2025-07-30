"use client";
import React, { useState, useEffect } from "react";
import { 
  Plane, 
  MessageCircle, 
  FileClock,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

import { AircraftModel, FlightSessionModel, SessionStatus, SessionType, SimulatorModel, Student, Teacher } from "@/types/types";

interface CollapsibleSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface FlightSessionsManagerProps {
  flightSessions: FlightSessionModel[];
  aircrafts: AircraftModel[];
  students: Student[];
  teachers: Teacher[];
  simulators: SimulatorModel[];
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-t-lg flex items-center justify-between"
      >
        <span className="font-medium text-gray-700">{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const FlightSessionsManager: React.FC<FlightSessionsManagerProps> = ({
  flightSessions,
  aircrafts,
  students,
  teachers,
  simulators
}) => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list');
  const [selectedSession, setSelectedSession] = useState<FlightSessionModel | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSessions, setFilteredSessions] = useState<FlightSessionModel[]>(flightSessions);
  const [activeFilter, setActiveFilter] = useState<"all" | "scheduled" | "completed">("all");

  // Helper function to find names by ID
  const getStudentName = (studentId: string): string => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown Student';
  };

  const getTeacherName = (teacherId: string): string => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown Teacher';
  };

  const getAircraftRegistration = (aircraftId: string | null): string => {
    if (!aircraftId) return 'No Aircraft';
    const aircraft = aircrafts.find(a => a.id === aircraftId);
    return aircraft ? aircraft.tailNumber : 'Unknown Aircraft';
  };

  // Set the first session as selected by default
  useEffect(() => {
    setFilteredSessions(flightSessions);
  }, [flightSessions]);

  // Handle search and filtering
  useEffect(() => {
    let filtered = flightSessions;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (session) =>
          getStudentName(session.studentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
          getTeacherName(session.teacherId).toLowerCase().includes(searchTerm.toLowerCase()) ||
          getAircraftRegistration(session.aircraftId).toLowerCase().includes(searchTerm.toLowerCase()) ||
          (session.flightType && session.flightType.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeFilter !== "all") {
      filtered = filtered.filter(session => {
        if (activeFilter === "scheduled") return session.status === "SCHEDULED";
        if (activeFilter === "completed") return session.status === "COMPLETED";
        return true;
      });
    }

    setFilteredSessions(filtered);
  }, [searchTerm, activeFilter, flightSessions]);

  const formatDate = (date: Date | string | null): string => {
    if (!date) return 'No Date';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (time: Date | string): string => {
    const timeObj = typeof time === 'string' ? new Date(time) : time;
    return timeObj.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDateTimeLocal = (dateTime: Date | string): string => {
    if (!dateTime) return '';
    const dateObj = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    // Format for datetime-local input: YYYY-MM-DDTHH:mm
    return dateObj.toISOString().slice(0, 16);
  };

  const formatDateOnly = (date: Date | string | null): string => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    // Format for date input: YYYY-MM-DD
    return dateObj.toISOString().split('T')[0];
  };

  const getStatusColor = (status: SessionStatus): string => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "PENDING_REVIEW":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSessionTypeColor = (type: SessionType): string => {
    switch (type) {
      case "TRAINING":
        return "bg-purple-100 text-purple-800";
      case "CHECKRIDE":
        return "bg-red-100 text-red-800";
      case "SOLO":
        return "bg-green-100 text-green-800";
      case "CROSS_COUNTRY":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string): string => {
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleViewSession = (session: FlightSessionModel) => {
    setSelectedSession(session);
    setCurrentView('details');
  };

  const handleCreateSession = () => {
    router.push('/portal/student/flight-sessions/new-session');
  };

  const FormInput: React.FC<{
    label: string;
    value: string | number | null;
    type?: string;
  }> = ({ label, value, type = "text" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        readOnly
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none"
      />
    </div>
  );

  const FormTextArea: React.FC<{
    label: string;
    value: string | null;
  }> = ({ label, value }) => (
    <div className="col-span-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value || ""}
        readOnly
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none resize-none"
      />
    </div>
  );

  // Render different views based on currentView state
  const renderContent = () => {
    switch (currentView) {
      case 'details':
        return selectedSession ? (
          <div className="h-full bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentView('list')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sessions
                  </button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                      {getInitials(getStudentName(selectedSession.studentId))}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {getStudentName(selectedSession.studentId)}
                      </h2>
                      <div className="text-gray-700 text-sm">
                        {selectedSession.flightType || 'No Flight Type'} • {getAircraftRegistration(selectedSession.aircraftId)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-block px-3 py-1 text-sm rounded-full ${getStatusColor(selectedSession.status)}`}>
                    {selectedSession.status}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    {formatDate(selectedSession.date)}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto h-[calc(100vh-120px)] p-6 space-y-8">
              {/* Flight Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
                  <Plane className="w-5 h-5" />
                  Flight Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormInput label="Session Type" value={selectedSession.sessionType} />
                  <FormInput label="Date" value={formatDateOnly(selectedSession.date)} type="date" />
                  <FormInput label="Aircraft Registration" value={getAircraftRegistration(selectedSession.aircraftId)} />
                  <FormInput label="Departure Airport" value={selectedSession.departureAirport} />
                  <FormInput label="Arrival Airport" value={selectedSession.arrivalAirport} />
                  <FormInput label="Flight Type" value={selectedSession.flightType} />
                  <FormInput label="Start Time" value={formatDateTimeLocal(selectedSession.startTime)} type="datetime-local" />
                  <FormInput label="End Time" value={formatDateTimeLocal(selectedSession.endTime)} type="datetime-local" />
                  <FormInput label="Duration (hrs)" value={selectedSession.durationHours} type="number" />
                  <FormInput label="Pilot Role" value={selectedSession.pilotRole} />
                  <FormInput label="Student" value={getStudentName(selectedSession.studentId)} />
                  <FormInput label="Instructor" value={getTeacherName(selectedSession.teacherId)} />
                </div>
              </div>

              {/* Flight Hours Summary */}
              <CollapsibleSection 
                title={
                  <div className="flex items-center gap-2">
                    <FileClock className="w-4 h-4" />
                    Flight Hours Summary
                  </div>
                }
                defaultOpen={true}
              >
                <FormInput label="Day Hours" value={selectedSession.dayHours} type="number" />
                <FormInput label="Night Hours" value={selectedSession.nightHours} type="number" />
                <FormInput label="Instrument Hours" value={selectedSession.instrumentHours} type="number" />
                <FormInput label="Single Engine Time" value={selectedSession.singleEngineTime} type="number" />
                <FormInput label="Multi Engine Time" value={selectedSession.multiEngineTime} type="number" />
              </CollapsibleSection>

              {/* Feedback */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5" />
                  Instructor Feedback
                </h3>
                <FormTextArea 
                  label="Teacher Feedback" 
                  value={selectedSession.teacherFeedback} 
                />
              </div>
            </div>
          </div>
        ) : null;

      default: // 'list' view
        return (
          <div className="flex h-full bg-white">
            {/* Sessions List */}
            <div className="w-full flex flex-col">
              {/* Header */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Plane className="w-6 h-6" />
                    Flight Sessions
                  </h1>
                  <button
                    onClick={handleCreateSession}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    New Session
                  </button>
                </div>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex">
                    <button
                      onClick={() => setActiveFilter("all")}
                      className={`px-4 py-2 ${activeFilter === "all" ? "bg-gray-200" : "bg-gray-100"} hover:bg-gray-300 text-gray-800 rounded-l-md transition-colors`}
                    >
                      All Sessions
                    </button>
                    <button
                      onClick={() => setActiveFilter("scheduled")}
                      className={`px-4 py-2 ${activeFilter === "scheduled" ? "bg-gray-200" : "bg-gray-100"} hover:bg-gray-300 text-gray-800 ml-1 transition-colors`}
                    >
                      Scheduled
                    </button>
                    <button
                      onClick={() => setActiveFilter("completed")}
                      className={`px-4 py-2 ${activeFilter === "completed" ? "bg-gray-200" : "bg-gray-100"} hover:bg-gray-300 text-gray-800 rounded-r-md ml-1 transition-colors`}
                    >
                      Completed
                    </button>
                  </div>
                  
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute inset-y-0 left-0 flex items-center pl-3 w-5 h-5 text-gray-400" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
                      placeholder="Search sessions..."
                    />
                  </div>
                </div>
              </div>

              {/* Sessions Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                {filteredSessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <Plane className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No flight sessions found</h3>
                    <p className="text-sm text-center">
                      {searchTerm || activeFilter !== "all" 
                        ? "Try adjusting your search or filters" 
                        : "Create your first flight session to get started"
                      }
                    </p>
                    {!searchTerm && activeFilter === "all" && (
                      <button
                        onClick={handleCreateSession}
                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Create Flight Session
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredSessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => handleViewSession(session)}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                              {getInitials(getStudentName(session.studentId))}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                {getStudentName(session.studentId)}
                              </div>
                              <div className="text-gray-500 text-xs">
                                {formatDate(session.date)}
                              </div>
                            </div>
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                            {session.status.toLowerCase()}
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="text-sm font-medium text-gray-800">
                            {getAircraftRegistration(session.aircraftId)} • {session.flightType || 'No Flight Type'}
                          </div>
                          <div className="text-xs text-gray-600">
                            {session.departureAirport || 'N/A'} → {session.arrivalAirport || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-600">
                            {formatTime(session.startTime)} - {formatTime(session.endTime)} ({session.durationHours || 0}h)
                          </div>
                          <div className="text-xs text-gray-600">
                            Instructor: {getTeacherName(session.teacherId)}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          <span className={`inline-block px-2 py-1 text-xs rounded ${getSessionTypeColor(session.sessionType)}`}>
                            {session.sessionType.toLowerCase()}
                          </span>
                          {session.pilotRole && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                              {session.pilotRole.toLowerCase().replace('_', ' ')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50">
      {renderContent()}
    </div>
  );
};

export default FlightSessionsManager;