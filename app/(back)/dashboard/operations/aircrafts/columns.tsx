"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { AircraftModel } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
// import { AircraftModal } from "@/components/dashboard/modals/aircraft-info-modal"; // Uncomment if using modal

export const columns: ColumnDef<AircraftModel>[] = [
  {
    accessorKey: "aircraft",
    header: "Aircraft",
    cell: ({ row }) => {
      const aircraft = row.original;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={ "/aircraft.png"}
            alt={aircraft.tailNumber}
            width={512}
            height={512}
            className="w-10 h-10 rounded object-cover"
          />
          <div>
            <h2 className="font-medium uppercase">{aircraft.tailNumber}</h2>
            <p className="text-xs text-muted-foreground">{aircraft.status}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "make-model",
    header: "Make / Model",
    cell: ({ row }) => {
      const aircraft = row.original;
      return (
        <div>
          <h2 className="font-medium">{aircraft.make}</h2>
          <p className="text-xs text-muted-foreground">{aircraft.model}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "type-location",
    header: "Type / Location",
    cell: ({ row }) => {
      const aircraft = row.original;
      return (
        <div>
          <h2 className="font-medium capitalize">{aircraft.aircraftType.toLowerCase().replace(/_/g, " ")}</h2>
          <p className="text-xs text-muted-foreground">{aircraft.location ?? "N/A"}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "engine-airframe",
    header: "Hours",
    cell: ({ row }) => {
      const aircraft = row.original;
      return (
        <div>
          <h2 className="font-medium">{aircraft.engineHours} hrs</h2>
          <p className="text-xs text-muted-foreground">Airframe: {aircraft.airframeHours} hrs</p>
        </div>
      );
    },
  },
  {
    accessorKey: "inspection",
    header: "Inspections",
    cell: ({ row }) => {
      const aircraft = row.original;
      const last = aircraft.lastInspection ? new Date(aircraft.lastInspection).toLocaleDateString() : "N/A";
      const next = aircraft.nextInspection ? new Date(aircraft.nextInspection).toLocaleDateString() : "N/A";
      return (
        <div>
          <h2 className="font-medium">Last: {last}</h2>
          <p className="text-xs text-muted-foreground">Next: {next}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const aircraft = row.original;
      return (
        <div className="flex items-center gap-4">
          {/* Uncomment and replace if you have a modal */}
          {/* <AircraftModal aircraft={row.original} /> */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size={"icon"} variant={"outline"}>
                  <Link href={`/dashboard/operations/aircrafts/view/${aircraft.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "more",
    cell: ({ row }) => {
      const aircraft = row.original;
      return (
        <ActionColumn
          row={row}
          model="aircraft"
          editEndpoint={`/dashboard/operations/aircrafts/edit/${aircraft.id}`}
          id={aircraft.id}
        />
      );
    },
  },
];
