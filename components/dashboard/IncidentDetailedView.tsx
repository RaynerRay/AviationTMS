"use client";

import { Incident, IncidentStatus, IncidentType, UserRole } from "@/types/types";
import { format } from "date-fns";
import { ArrowLeft, Bug, FileText, MapPin, User, Pencil } from "lucide-react";
import Link from "next/link";

interface Props {
  incident: Incident;
  currentUserRole: UserRole; // "ADMIN" | "TEACHER" | "STUDENT" etc.
}

export default function IncidentDetailView({ incident, currentUserRole }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bug className="w-6 h-6 text-orange-500" />
          <h1 className="text-2xl font-semibold">Incident Details</h1>
        </div>

        <div className="flex items-center gap-4">
          {currentUserRole === "ADMIN" && (
            <Link
              href={`/dashboard/safety/incidents/${incident.id}/edit`}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
          )}
          {currentUserRole === "ADMIN" && (
          <Link
            href="/dashboard/safety/incidents"
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to list
          </Link>
          )}
          {currentUserRole === "TEACHER" || "STUDENT" && (
          <Link
            href="/portal/incidents"
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to list
          </Link>
          )}
        </div>
      </div>

      {/* Info Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
        <div>
          <h2 className="font-semibold text-gray-700 mb-1">Occurred At</h2>
          <p className="text-gray-900">{format(new Date(incident.occurredAt), "PPPpp")}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">Reported At</h2>
          <p className="text-gray-900">{format(new Date(incident.reportedAt), "PPPpp")}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">Status</h2>
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
              incident.status === "OPEN"
                ? "bg-yellow-100 text-yellow-700"
                : incident.status === "INVESTIGATING"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {incident.status}
          </span>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">Type</h2>
          <p className="text-gray-900">{incident.type}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">Location</h2>
          <p className="flex items-center gap-2 text-gray-900">
            <MapPin className="w-4 h-4" />
            {incident.location}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-1">Reported By</h2>
          <p className="flex items-center gap-2 text-gray-900">
            <User className="w-4 h-4" />
            {incident.reportedBy}
          </p>
        </div>

        {incident.investigator && (
          <div>
            <h2 className="font-semibold text-gray-700 mb-1">Investigator</h2>
            <p className="text-gray-900">{incident.investigator}</p>
          </div>
        )}

        {incident.closedAt && (
          <div>
            <h2 className="font-semibold text-gray-700 mb-1">Closed At</h2>
            <p className="text-gray-900">{format(new Date(incident.closedAt), "PPPpp")}</p>
          </div>
        )}
      </div>

      {/* Text Sections */}
      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Description</h3>
          <p className="bg-gray-50 p-4 rounded text-gray-800 border">{incident.description}</p>
        </div>

        {incident.investigation && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Investigation Details</h3>
            <p className="bg-gray-50 p-4 rounded text-gray-800 border">{incident.investigation}</p>
          </div>
        )}

        {incident.correctiveAction && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Corrective Action</h3>
            <p className="bg-gray-50 p-4 rounded text-gray-800 border">{incident.correctiveAction}</p>
          </div>
        )}
      </div>
    </div>
  );
}
