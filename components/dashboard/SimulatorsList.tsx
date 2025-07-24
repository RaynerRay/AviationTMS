"use client";

import React from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { SimulatorModel } from "@/types/types";
import { Button } from "@/components/ui/button";

interface SimulatorsListProps {
  simulator: SimulatorModel[];
}

export default function SimulatorsList({ simulator }: SimulatorsListProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Simulator Fleet</h1>
        <Link
          href="/dashboard/operations/simulators/new"
          className="py-2 px-4 border border-gray-400 rounded-md"
        >
          Create Simulator
        </Link>
      </div>

      {simulator.length > 0 ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {["Name", "Model", "Type", "Status", "Location", "Hourly Rate", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {simulator.map((simulator) => (
                <tr key={simulator.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{simulator.name}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{simulator.model}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {simulator.simulatorType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      simulator.status === "AVAILABLE" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : simulator.status === "IN_USE"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : simulator.status === "MAINTENANCE"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>
                      {simulator.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{simulator.location || "N/A"}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">R {simulator.hourlyRate.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/operations/simulators/view/${simulator.id}`}>
                      <Button variant="ghost" size="icon" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No simulators found. Add a new one!
        </p>
      )}
    </div>
  );
}
