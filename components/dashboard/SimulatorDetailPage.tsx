"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SimulatorModel } from "@/types/types";
import { Badge } from "@/components/ui/badge";

type Props = {
  simulator: SimulatorModel;
};

const SimulatorDetailPage = ({ simulator }: Props) => {
  const formatDate = (date: Date | string | null) => {
    if (!date) return "Not scheduled";
    return new Date(date).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'default';
      case 'maintenance':
        return 'destructive';
      case 'in_use':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatSimulatorType = (type: string) => {
    const typeMap: Record<string, string> = {
      'FTD': 'Flight Training Device',
      'FFS': 'Full Flight Simulator',
      'AATD': 'Advanced Aviation Training Device',
      'BATD': 'Basic Aviation Training Device'
    };
    return typeMap[type] || type;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="logs" disabled>Session Logs</TabsTrigger> {/* optional future tab */}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">
                {simulator.name} – <span className="text-muted-foreground">{simulator.model}</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(simulator.status)} className="text-sm capitalize">
                  {simulator.status.replace('_', ' ')}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {simulator.simulatorType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{simulator.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Model</p>
                <p className="font-medium">{simulator.model}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Simulator Type</p>
                <p className="font-medium">{formatSimulatorType(simulator.simulatorType)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hourly Rate</p>
                <p className="font-medium">${simulator.hourlyRate}/hr</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{simulator.location || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{simulator.status.replace('_', ' ')}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance">
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Maintenance Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Last Maintenance</p>
                  <p className="font-medium">{formatDate(simulator.lastMaintenance)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Maintenance</p>
                  <p className="font-medium">{formatDate(simulator.nextMaintenance)}</p>
                </div>
              </div>
              
              {simulator.status === 'MAINTENANCE' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <strong>Notice:</strong> This simulator is currently under maintenance and unavailable for use.
                  </p>
                </div>
              )}
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Additional maintenance records and service history can be added here...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulatorDetailPage;