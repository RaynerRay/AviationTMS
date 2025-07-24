
import { getBriefClasses } from "@/actions/classes";
import { getBriefSubjects } from "@/actions/subjects";
import { getServerSchool } from "@/actions/auth";
import TeacherForm from "@/components/dashboard/forms/users/teacher-form";

export default async function AdmissionTabs() {
  // Classes
  const school = await getServerSchool();
  const classesData = (await getBriefClasses(school?.id ?? "")) || [];
  const subjectsData = (await getBriefSubjects(school?.id ?? "")) || [];

  const classes = classesData.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const subjects = subjectsData.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
 
 
  return (
    
    <div className="">
   
      
        
          <TeacherForm
            classes={classes}
            subjects={subjects}
          />
   
  
    </div>
  );
}
