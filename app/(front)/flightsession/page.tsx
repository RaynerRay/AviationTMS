import React from "react";
import { getServerSchool } from "@/actions/auth";
import FlightSessionForm from "@/components/dashboard/forms/operations/FlightSessions";
import { getAircrafts } from "@/actions/aircrafts";
import { getAllStudents } from "@/actions/students";
import { getSimulators } from "@/actions/simulator";
import { getAllTeachers } from "@/actions/teachers";
import { createFlightSession } from "@/actions/flightsessions";
import { CreateFlightSession } from "@/types/types";
import { redirect } from "next/navigation";

export default async function page() {
  const school = await getServerSchool();
  const aircrafts = (await getAircrafts(school?.id ?? "")) || [];
  const students = (await getAllStudents(school?.id ?? "")) || [];
  const teachers = (await getAllTeachers(school?.id ?? "")) || [];
  const simulators = (await getSimulators(school?.id ?? "")) || [];

  async function handleSubmit(data: CreateFlightSession) {
    "use server";
    
    try {
      // Add the school ID to the data
      const flightSessionData = {
        ...data,
        schoolId: school?.id ?? "",
      };
      
      await createFlightSession(flightSessionData);
      redirect("/dashboard/flights/sessions");
    } catch (error) {
      console.error("Error creating flight session:", error);
      // Handle error appropriately - you might want to show a toast or redirect to an error page
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Flight Session</h1>
        <p className="text-gray-600">Record a new flight training session</p>
      </div>
      
      <FlightSessionForm
        onSubmit={handleSubmit}
        aircrafts={aircrafts}
        students={students}
        teachers={teachers}
        simulators={simulators}
      />
    </div>
  );
}