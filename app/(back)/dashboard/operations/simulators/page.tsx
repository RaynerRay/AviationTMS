import React from "react";
import { getServerSchool } from "@/actions/auth";
import { getSimulators } from "@/actions/simulator";
import SimulatorsList from "@/components/dashboard/SimulatorsList";

export default async function page() {
  const school = await getServerSchool();
  const simulators = (await getSimulators(school?.id ?? "")) || [];

  return (
    <>
   
      <div className="py-8">
        <SimulatorsList simulator={simulators} />
      </div>
    </>
  );
}
