// app/(your-dashboard-path)/aircrafts/[id]/page.tsx

import { getAircraftById } from "@/actions/aircrafts";
import AircraftDetailPage from "@/components/dashboard/AircraftDetailedPage";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page(props: { params: { id: string } }) {
  const id = props.params.id;

  if (!id) return notFound();

  const aircraft = await getAircraftById(id);
  if (!aircraft) return notFound();

  return (
    <div>
      <AircraftDetailPage aircraft={aircraft} aircraftId={id} />
    </div>
  );
}
