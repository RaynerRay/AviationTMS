import { getAircrafts } from "@/actions/aircrafts";
import { getServerUser, getServerSchool } from "@/actions/auth";
import { getFlightSessions } from "@/actions/flightsessions";
import { getSimulators } from "@/actions/simulator";
import { getAllStudents } from "@/actions/students";
import { getAllTeachers } from "@/actions/teachers";
import FlightSessionsManager from "@/components/portal/FlightSessionsManager";

export default async function page() {
  const user = await getServerUser();
  const school = await getServerSchool();

  const studentUserId = user?.id;

  const aircrafts = (await getAircrafts(school?.id ?? "")) || [];
  const students = (await getAllStudents(school?.id ?? "")) || [];
  const teachers = (await getAllTeachers(school?.id ?? "")) || [];
  const simulators = (await getSimulators(school?.id ?? "")) || [];

  // Filter by studentId
  const flightSessions =
    (await getFlightSessions(school?.id ?? "", { studentUserId })) || [];

  console.log(flightSessions);

  return (
    <div className="h-screen bg-gray-50">
      <FlightSessionsManager
        flightSessions={flightSessions}
        aircrafts={aircrafts}
        students={students}
        teachers={teachers}
        simulators={simulators}
      />
    </div>
  );
}