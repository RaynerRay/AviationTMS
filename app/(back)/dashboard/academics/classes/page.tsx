import { getServerSchool } from "@/actions/auth";
import { getAllClasses } from "@/actions/classes";
import { getTeachersWithBriefInfo } from "@/actions/teachers";
import ClassListing from "@/components/dashboard/class-listing";
import React from "react";

export default async function page() {
  const school = await getServerSchool();
  // console.log(school);
  const classes = (await getAllClasses(school?.id ?? "")) || [];
  const allTeachers = (await getTeachersWithBriefInfo(school?.id ?? "")) || [];
  return (
    <div>
      <ClassListing
        teachers={allTeachers}
        classes={classes}
      />
    </div>
  );
}