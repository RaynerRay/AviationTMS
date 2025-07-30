"use client";

import React, { useMemo, useState } from "react";
import { Incident, IncidentStatus, IncidentType, UserRole } from "@/types/types";
import { format } from "date-fns";
import { Bug, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  incidents: Incident[];
  currentUserRole: UserRole;
};

const statusColors: Record<IncidentStatus, string> = {
  OPEN: "bg-red-500",
  INVESTIGATING: "bg-yellow-500",
  CLOSED: "bg-green-600",
};

export default function IncidentsList({ incidents, currentUserRole }: Props) {
  const [filters, setFilters] = useState<{
    status?: IncidentStatus;
    type?: IncidentType;
    reportedBy?: string;
    equipmentName?: string;
  }>({});

  const filtered = useMemo(() => {
    return incidents.filter((i) => {
      if (filters.status && i.status !== filters.status) return false;
      if (filters.type && i.type !== filters.type) return false;
      if (filters.reportedBy && !i.reportedBy.toLowerCase().includes(filters.reportedBy.toLowerCase())) return false;
      if (filters.equipmentName && !i.equipmentName?.toLowerCase().includes(filters.equipmentName.toLowerCase())) return false;
      return true;
    });
  }, [incidents, filters]);

  const viewBasePath =
    currentUserRole === "ADMIN" ? "/dashboard/safety/incidents/view" : "/portal/incidents/view";

  const newIncidentPath =
    currentUserRole === "ADMIN" ? "/dashboard/safety/incidents/new-incident" : "/portal/incidents/new-incident";

  return (
    <div className="p-4 space-y-4">
      <Link
        href={newIncidentPath}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
        <span>Create New Incident</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bug className="w-5 h-5 text-blue-500" />
          <h2 className="text-2xl font-semibold">Incident Reports</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            className="border rounded px-3 py-2 text-sm"
            value={filters.status || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                status: (e.target.value as IncidentStatus) || undefined,
              }))
            }
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="INVESTIGATING">Investigating</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select
            className="border rounded px-3 py-2 text-sm"
            value={filters.type || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                type: (e.target.value as IncidentType) || undefined,
              }))
            }
          >
            <option value="">All Types</option>
            <option value="SAFETY">SAFETY</option>
            <option value="OPERATIONAL">OPERATIONAL</option>
            <option value="TECHNICAL">TECHNICAL</option>
            <option value="OTHER">OTHER</option>
          </select>

          <input
            type="text"
            placeholder="Reported by..."
            className="border rounded px-3 py-2 text-sm"
            value={filters.reportedBy || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, reportedBy: e.target.value || undefined }))
            }
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Equipment</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Reported By</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No matching incidents.
                </td>
              </tr>
            ) : (
              filtered.map((incident) => (
                <tr key={incident.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-sm">
                    {format(new Date(incident.occurredAt), "dd MMM yyyy")}
                  </td>
                  <td className="p-3 text-sm">{incident.equipmentName || "-"}</td>
                  <td className="p-3 text-sm">{incident.location}</td>
                  <td className="p-3 text-sm">{incident.reportedBy}</td>
                  <td className="p-3 text-sm capitalize">{incident.type}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-white text-xs font-bold",
                        statusColors[incident.status]
                      )}
                    >
                      {incident.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    <Link
                      href={`${viewBasePath}/${incident.id}`}
                      className="inline-block rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600 transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No matching incidents.</p>
        ) : (
          filtered.map((incident) => (
            <div key={incident.id} className="border rounded-lg p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold">
                  {format(new Date(incident.occurredAt), "dd MMM yyyy")}
                </h3>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-white text-xs font-semibold",
                    statusColors[incident.status]
                  )}
                >
                  {incident.status.replace("_", " ")}
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Equipment:</span>{" "}
                  {incident.equipmentName || "-"}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {incident.location}
                </p>
                <p>
                  <span className="font-medium">Reported By:</span> {incident.reportedBy}
                </p>
                <p>
                  <span className="font-medium">Type:</span> {incident.type}
                </p>
              </div>
              <Link
                href={`${viewBasePath}/${incident.id}`}
                className="mt-3 inline-block w-full text-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                View
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
