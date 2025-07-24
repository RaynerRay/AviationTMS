"use client";

import React from "react";
import Link from "next/link";
import { Plane, DollarSign, Tag, Info, ArrowRightCircle } from "lucide-react";
import { AircraftModel } from "@/types/types";

interface AircraftsListProps {
  aircrafts: AircraftModel[];
}

export default function AircraftsList({ aircrafts }: AircraftsListProps) {
  return (
    <div className="p-3 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          <Plane className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
          <span>Aircraft Fleet</span>
        </div>
        <Link
          href="/dashboard/operations/aircrafts/new"
          className="inline-block px-3 sm:px-4 py-2 border border-blue-500 text-blue-600 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition text-sm sm:text-base text-center"
        >
          Add New Aircraft
        </Link>
      </div>

      {aircrafts.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {[
                    "Tail Number",
                    "Make",
                    "Model",
                    "Type",
                    "Status",
                    "Hourly Rate",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {aircrafts.map((aircraft) => (
                  <tr
                    key={aircraft.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-3 font-medium">{aircraft.tailNumber}</td>
                    <td className="px-4 py-3">{aircraft.make}</td>
                    <td className="px-4 py-3">{aircraft.model}</td>
                    <td className="px-4 py-3 capitalize">
                      {aircraft.aircraftType.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                          aircraft.status === "AVAILABLE"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : aircraft.status === "IN_FLIGHT"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : aircraft.status === "MAINTENANCE"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        <Info className="w-3 h-3" />
                        {aircraft.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                      R {aircraft.hourlyRate.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/operations/aircrafts/view/${aircraft.id}`}
                      >
                        <div
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
                          title="View Details"
                        >
                          <ArrowRightCircle className="w-4 h-4" />
                          View
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3 sm:space-y-4">
            {aircrafts.map((aircraft) => (
              <div
                key={aircraft.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex flex-col space-y-3">
                  {/* Header with Tail Number and Status */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {aircraft.tailNumber}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {aircraft.make} {aircraft.model}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                        aircraft.status === "AVAILABLE"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : aircraft.status === "IN_FLIGHT"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : aircraft.status === "MAINTENANCE"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      <Info className="w-3 h-3" />
                      {aircraft.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* Aircraft Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 block">Type</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                        {aircraft.aircraftType.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 block">Hourly Rate</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        R {aircraft.hourlyRate.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/dashboard/operations/aircrafts/view/${aircraft.id}`}
                      className="w-full"
                    >
                      <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm font-medium">
                        <ArrowRightCircle className="w-4 h-4" />
                        View Details
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet Compact Table View */}
          <div className="hidden md:block lg:hidden overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {[
                    "Aircraft",
                    "Type",
                    "Status",
                    "Rate",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-3 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {aircrafts.map((aircraft) => (
                  <tr
                    key={aircraft.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-3 py-3">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {aircraft.tailNumber}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {aircraft.make} {aircraft.model}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm capitalize">
                      {aircraft.aircraftType.replace(/_/g, " ")}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                          aircraft.status === "AVAILABLE"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : aircraft.status === "IN_FLIGHT"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : aircraft.status === "MAINTENANCE"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        <Info className="w-3 h-3" />
                        {aircraft.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-medium text-gray-900 dark:text-gray-100 text-sm">
                      R {aircraft.hourlyRate.toFixed(2)}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <Link
                        href={`/dashboard/operations/aircrafts/view/${aircraft.id}`}
                      >
                        <div
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
                          title="View Details"
                        >
                          <ArrowRightCircle className="w-4 h-4" />
                          View
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 px-4">
          <div className="flex flex-col items-center space-y-3">
            <Plane className="w-12 h-12 text-gray-300 dark:text-gray-600" />
            <p className="text-lg">No aircrafts found</p>
            <p className="text-sm">Add a new aircraft to get started!</p>
          </div>
        </div>
      )}
    </div>
  );
}