import JobsFeed from "@/Components/Candidate-Portal/JobsFeed";
import { getDepartment, getJobsApi } from "@/api_config/shared/sharedapi";
import {JobsApiResponse, departmentApiResponse } from "@/types/types";



interface JobsPageProps {
  searchParams: Promise<{
    text?: string;
  }>;
}




export default async function Jobs({ searchParams }: JobsPageProps) {
  

  const jobs = await getJobsApi({ searchParams });

  const department = await getDepartment();

   
  const jobsData = (jobs as JobsApiResponse) || [];

  const allDepartment =(department as departmentApiResponse) || []
  // console.log(allDepartment)
  // console.log(jobsData)
  return (
    <div className="w-full">
      <JobsFeed  jobs={jobsData} departments={allDepartment}/>
    </div>
  );
}
