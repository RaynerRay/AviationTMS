// app/(your-dashboard-path)/simulators/[id]/page.tsx
import { getSimulatorById } from "@/actions/simulator";
import SimulatorDetailPage from "@/components/dashboard/SimulatorDetailPage";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) {
    return notFound();
  }

  const simulator = await getSimulatorById(id);

  if (!simulator) {
    return notFound();
  }

  return (
    <div>
      <SimulatorDetailPage simulator={simulator} />
    </div>
  );
}