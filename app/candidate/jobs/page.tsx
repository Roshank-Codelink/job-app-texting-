import JobsFeed from "@/Components/Candidate-Portal/JobsFeed";
import { getDepartment, getJobsApi, JobsPageProps } from "@/api_config/shared/sharedapi";
import { JobsApiResponse, departmentApiResponse } from "@/types/types";

export default async function Jobs({ searchParams }: JobsPageProps) {
  const [jobs, department] = await Promise.all([
    getJobsApi({ searchParams }),
    getDepartment()
  ]);
  const jobsData = (jobs as JobsApiResponse) || [];
  const allDepartment = (department as departmentApiResponse) || [];

  return (
    <div className="w-full">
      <JobsFeed 
        jobs={jobsData} 
        departments={allDepartment} 
      />
    </div>
  );
}