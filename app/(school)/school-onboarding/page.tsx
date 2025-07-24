// import { getServerUser } from "@/actions/auth";

import SchoolOnboardingForm from "@/components/dashboard/forms/school/school-onboarding-form";
import React from "react";

export default async function page() {
  // const user = await getServerUser();
  // const role = user?.role;
  // if (!user || role !== "SUPER_ADMIN") {
  //   redirect("/login");
  // }
  return (
    <>
      <SchoolOnboardingForm />
    </>
  );
}
