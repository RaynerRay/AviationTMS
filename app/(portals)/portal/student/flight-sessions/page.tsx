import { getAircrafts } from "@/actions/aircrafts";
import { getServerUser, getServerSchool } from "@/actions/auth";
import { getFlightSessions, createFlightSession } from "@/actions/flightsessions";
import { getSimulators } from "@/actions/simulator";
import { getAllStudents } from "@/actions/students";
import { getAllTeachers } from "@/actions/teachers";
import FlightSessionsManager from "@/components/portal/FlightSessionsManager";
import { CreateFlightSession } from "@/types/types";
import { redirect } from "next/navigation";
// ... other imports

export default async function page() {
  const user = await getServerUser();         // ✅ Get logged-in user
  const school = await getServerSchool();     // ✅ Get school

  const studentUserId  = user?.id;             
  console.log(studentUserId)

  const aircrafts = (await getAircrafts(school?.id ?? "")) || [];
  const students = (await getAllStudents(school?.id ?? "")) || [];
  const teachers = (await getAllTeachers(school?.id ?? "")) || [];
  const simulators = (await getSimulators(school?.id ?? "")) || [];

  // ✅ Filter by studentId
  const flightSessions =
    (await getFlightSessions(school?.id ?? "", { studentUserId })) || [];

    console.log(flightSessions)

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
