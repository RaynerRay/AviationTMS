import React from "react";
import { getServerSchool } from "@/actions/auth";
import { getAircrafts } from "@/actions/aircrafts";
import { getAllStudents } from "@/actions/students";
import { getSimulators } from "@/actions/simulator";
import { getAllTeachers } from "@/actions/teachers";
import { createFlightSession, getFlightSessions } from "@/actions/flightsessions";
import { CreateFlightSession } from "@/types/types";
import { redirect } from "next/navigation";
import FlightSessionsManager from "@/components/portal/FlightSessionsManager";

export default async function page() {
  const school = await getServerSchool();
  
  const aircrafts = (await getAircrafts(school?.id ?? "")) || [];
  const students = (await getAllStudents(school?.id ?? "")) || [];
  const teachers = (await getAllTeachers(school?.id ?? "")) || [];
  const simulators = (await getSimulators(school?.id ?? "")) || [];

  
  // Fetch existing flight sessions
  const flightSessions = (await getFlightSessions(school?.id ?? "")) || [];

  async function handleSubmit(data: CreateFlightSession) {
    "use server";
    
    try {
      // Add the school ID to the data
      const flightSessionData = {
        ...data,
        schoolId: school?.id ?? "",
      };
      
      await createFlightSession(flightSessionData);
      redirect("/portal/teacher/flight-sessions");
    } catch (error) {
      console.error("Error creating flight session:", error);
      // Handle error appropriately - you might want to show a toast or redirect to an error page
    }
  }

  return (
    <div className="h-screen bg-gray-50">
      <FlightSessionsManager
        flightSessions={flightSessions}
        onSubmit={handleSubmit}
        aircrafts={aircrafts}
        students={students}
        teachers={teachers}
        simulators={simulators}
      />
    </div>
  );
}