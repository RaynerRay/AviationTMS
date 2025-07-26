import React from "react";

import { getServerSchool } from "@/actions/auth";
import { getAircrafts } from "@/actions/aircrafts";
import AircraftsList from "@/components/dashboard/AircraftsList";

export default async function page() {
  const school = await getServerSchool();
  const aircrafts = (await getAircrafts(school?.id ?? "")) || [];
 
  return (
    <>
     
      <div className="py-8">
        <AircraftsList aircrafts={aircrafts}/>
      </div>
    </>
  );
}
