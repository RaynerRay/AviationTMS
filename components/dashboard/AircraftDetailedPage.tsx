"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AircraftProps, MaintenanceLogModel } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import MaintenanceLogForm from "./forms/operations/MaintenanceLog";

type Props = {
  aircraft: AircraftProps;
  aircraftId: string;
};

const AircraftDetailPage = ({ aircraft, aircraftId }: Props) => {
  const [openLog, setOpenLog] = useState<MaintenanceLogModel | null>(null);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Not scheduled";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8 bg-gray-50 p-1 rounded-xl border border-gray-200 shadow-sm">
          <TabsTrigger
            value="overview"
            className="px-6 py-2 text-blue-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="maintenance"
            className="px-6 py-2 text-blue-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            Maintenance
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="px-6 py-2 text-blue-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            Log
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card className="rounded-2xl shadow-lg border-gray-100 bg-white hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {aircraft.make} {aircraft.model} –{" "}
                <span className="text-gray-500 font-normal">{aircraft.tailNumber}</span>
              </CardTitle>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="text-sm capitalize bg-blue-50 text-blue-600 border-blue-200"
                >
                  {aircraft.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <div>
                <p className="text-sm text-gray-500">Make</p>
                <p className="font-semibold text-gray-900">{aircraft.make}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-semibold text-gray-900">{aircraft.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tail Number</p>
                <p className="font-semibold text-gray-900">{aircraft.tailNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engine Hours</p>
                <p className="font-semibold text-gray-900">{aircraft.engineHours} hrs</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Airframe Hours</p>
                <p className="font-semibold text-gray-900">{aircraft.airframeHours} hrs</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance">
          <Card className="rounded-2xl shadow-lg border-gray-100 bg-white hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">Maintenance Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Last Maintenance</p>
                  <p className="font-semibold text-gray-900">{formatDate(aircraft.lastInspection)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Maintenance</p>
                  <p className="font-semibold text-gray-900">{formatDate(aircraft.nextInspection)}</p>
                </div>
              </div>

              {aircraft.status === "MAINTENANCE" && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-sm text-yellow-800 font-medium">
                    <strong>Notice:</strong> This aircraft is currently under maintenance and unavailable for use.
                  </p>
                </div>
              )}

              {/* Maintenance Logs List */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Logs</h3>
                {aircraft.maintenanceLogs && aircraft.maintenanceLogs.length > 0 ? (
                  <ul className="space-y-3">
                    {aircraft.maintenanceLogs.map((log) => (
                      <div key={log.id}>
                        <button
                          className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-300 transition-all"
                          onClick={() => setOpenLog(log)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">{log.maintenanceType}</span>
                            <span className="text-sm text-gray-500">{formatDate(log.logDate)}</span>
                          </div>
                        </button>

                        {/* Modal */}
                        {openLog?.id === log.id && (
                          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative">
                              <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setOpenLog(null)}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                              <h3 className="text-xl font-bold text-gray-900 mb-4">Maintenance Details</h3>
                              <div className="text-sm text-gray-700 space-y-3">
                                <p>
                                  <strong>Type:</strong> {log.maintenanceType}
                                </p>
                                <p>
                                  <strong>Status:</strong> {log.status}
                                </p>
                                <p>
                                  <strong>Parts Replaced:</strong> {log.partsReplaced}
                                </p>
                                <p>
                                  <strong>Description:</strong>{" "}
                                  {log.description || "No description provided."}
                                </p>
                                <p>
                                  <strong>Logged at:</strong> {formatDate(log.logDate)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No maintenance logs available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Maintenance Tab */}
        <TabsContent value="logs">
          <Card className="rounded-2xl shadow-lg border-gray-100 bg-white hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">Log Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <MaintenanceLogForm aircraftId={aircraftId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AircraftDetailPage;