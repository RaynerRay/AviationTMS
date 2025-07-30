"use client";

import { Snag, SnagStatus, SnagSeverity, UserRole } from "@/types/types";
import { useState } from "react";
import { Pencil, Check, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SnagDetailedViewProps {
  snag: Snag;
  currentUserRole: UserRole;
  onSave?: (updated: Partial<Snag>) => void;
}

export default function SnagDetailedView({
  snag,
  currentUserRole,
  onSave,
}: SnagDetailedViewProps) {
  const isAdmin = currentUserRole === "ADMIN";
  const [isEditing, setIsEditing] = useState(false);
  const [editedSnag, setEditedSnag] = useState<Partial<Snag>>(snag);

  const handleSave = () => {
    if (onSave) onSave(editedSnag);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded-md space-y-6">
         <div className="flex items-center gap-4">
          {currentUserRole === "ADMIN" && (
            <Link
              href={`/dashboard/maintenance/snags/${snag.id}/edit`}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
          )}
          {currentUserRole === "ADMIN" && (
          <Link
            href="/dashboard/maintenance/snags"
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to list
          </Link>
          )}
          {currentUserRole === "TEACHER" || "STUDENT" && (
          <Link
            href="/portal/snags"
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to list
          </Link>
          )}
        </div>
      <div className="flex justify-between items-center">
        
        <h2 className="text-2xl font-bold text-gray-800">Snag Details</h2>
        {isAdmin && !isEditing && (
          <button
            className="flex items-center text-sm text-blue-600 hover:underline"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </button>
        )}
      </div>
     

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <label className="font-medium text-gray-600">Equipment</label>
          {isEditing ? (
            <input
              type="text"
              value={editedSnag.equipmentName || ""}
              onChange={(e) =>
                setEditedSnag({ ...editedSnag, equipmentName: e.target.value })
              }
              className="mt-1 block w-full border rounded px-3 py-2 text-gray-800"
            />
          ) : (
            <p className="mt-1 text-gray-800">{snag.equipmentName}</p>
          )}
        </div>

        <div>
          <label className="font-medium text-gray-600">Status</label>
          {isEditing ? (
            <select
              value={editedSnag.status}
              onChange={(e) =>
                setEditedSnag({
                  ...editedSnag,
                  status: e.target.value as SnagStatus,
                })
              }
              className="mt-1 block w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          ) : (
            <p className="mt-1">{snag.status.replace(/_/g, " ")}</p>
          )}
        </div>

        <div>
          <label className="font-medium text-gray-600">Severity</label>
          {isEditing ? (
            <select
              value={editedSnag.severity}
              onChange={(e) =>
                setEditedSnag({
                  ...editedSnag,
                  severity: e.target.value as SnagSeverity,
                })
              }
              className="mt-1 block w-full border rounded px-3 py-2 text-gray-800"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          ) : (
            <p className="mt-1">{snag.severity}</p>
          )}
        </div>

        {/* <div>
          <label className="font-medium text-gray-600">Created At</label>
          <p className="mt-1 text-gray-800">
            {new Date(snag.).toLocaleString()}
          </p>
        </div> */}
      </div>

      <div>
        <label className="font-medium text-gray-600">Description</label>
        {isEditing ? (
          <textarea
            rows={4}
            value={editedSnag.description || ""}
            onChange={(e) =>
              setEditedSnag({ ...editedSnag, description: e.target.value })
            }
            className="mt-1 block w-full border rounded px-3 py-2 text-gray-800"
          />
        ) : (
          <p className="mt-1 text-gray-800">{snag.description}</p>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Check className="w-4 h-4 mr-1" />
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditedSnag(snag);
            }}
            className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
