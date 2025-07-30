"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wrench, Search, ArrowRightCircle } from "lucide-react";
import { Snag, UserRole } from "@/types/types";

interface SnagsListProps {
  snags: Snag[];
  currentUserRole: UserRole;
}

export default function SnagsList({ snags, currentUserRole }: SnagsListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredSnags = snags.filter((snag) => {
    const matchesStatus =
      statusFilter === "all" || snag.status.toLowerCase() === statusFilter;
    const matchesSeverity =
      severityFilter === "all" || snag.severity.toLowerCase() === severityFilter;
    const matchesSearch =
      snag.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snag.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const newSnagLink =
    currentUserRole === "ADMIN"
      ? "/dashboard/maintenance/snags/new-snag"
      : "/portal/snags/new-snag";

  const viewBasePath =
    currentUserRole === "ADMIN"
      ? "/dashboard/maintenance/snags/view"
      : "/portal/snags/view";

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <Wrench className="h-6 w-6 text-blue-500" />
          <h2>Snag Reports</h2>
        </div>

        <Link
          href={newSnagLink}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          <Wrench className="w-4 h-4" />
          Report New Snag
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm bg-white"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Severity:</label>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm bg-white"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by equipment or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border rounded text-sm"
          />
        </div>
      </div>

      {/* Snag Cards */}
<div className="space-y-6">
  {filteredSnags.length > 0 ? (
    filteredSnags.map((snag) => (
      <div
        key={snag.id}
        className="rounded-2xl border border-blue-100 bg-white shadow-sm hover:shadow-md transition-shadow p-6"
      >
        <div className="flex justify-between items-start gap-4">
          {/* Snag Details */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {snag.equipmentName}
            </h3>
            <p className="text-sm text-gray-600">{snag.description}</p>
          </div>

          {/* Labels */}
          <div className="flex flex-col items-end gap-1 text-xs min-w-[100px] text-right">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium capitalize">
              {snag.status.replace(/_/g, " ")}
            </span>
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-medium capitalize">
              {snag.severity}
            </span>
          </div>
        </div>

        {/* Action */}
        <div className="mt-5 text-right">
          <Link href={`${viewBasePath}/${snag.id}`}>
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-all">
              <ArrowRightCircle className="w-4 h-4" />
              View Snag
            </button>
          </Link>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center py-10 text-gray-400">
      <Wrench className="w-10 h-10 mx-auto mb-3 text-gray-300" />
      <p className="text-sm">No snags found.</p>
    </div>
  )}
</div>

    </div>
  );
}
