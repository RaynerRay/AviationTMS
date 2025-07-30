import { getAircrafts } from "@/actions/aircrafts";
import { getServerUser, getServerSchool } from "@/actions/auth";
import { createFlightSession } from "@/actions/flightsessions";
import { getSimulators } from "@/actions/simulator";
import { getAllStudents } from "@/actions/students";
import { getAllTeachers } from "@/actions/teachers";
import FlightSessionForm from "@/components/dashboard/forms/operations/FlightSessionForm";
import { CreateFlightSession } from "@/types/types";
import { redirect } from "next/navigation";

export default async function NewSessionPage() {
  const user = await getServerUser();
  const school = await getServerSchool();

  const aircrafts = (await getAircrafts(school?.id ?? "")) || [];
  const students = (await getAllStudents(school?.id ?? "")) || [];
  const teachers = (await getAllTeachers(school?.id ?? "")) || [];
  const simulators = (await getSimulators(school?.id ?? "")) || [];

  async function handleSubmit(data: CreateFlightSession) {
    "use server";

    try {
      const flightSessionData = {
        ...data,
        schoolId: school?.id ?? "",
      };
      await createFlightSession(flightSessionData);
      redirect("/portal/student/flight-sessions");
    } catch (error) {
      console.error("Error creating flight session:", error);
    }
  }

  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full bg-white">
        <div className="overflow-y-auto h-full">
          <div className="p-6">
            <FlightSessionForm
              onSubmit={handleSubmit}
              aircrafts={aircrafts}
              students={students}
              teachers={teachers}
              simulators={simulators}
            />
          </div>
        </div>
      </div>
    </div>
  );
}