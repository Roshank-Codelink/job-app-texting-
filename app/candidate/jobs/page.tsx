import JobsFeed from "@/Components/Candidate-Portal/JobsFeed";
import { CandidategetJobs } from "@/api_config/Candidate/manageJobs";
import { JobsApiResponse, departmentApiResponse } from "@/types/types";
import {CandidategetDepartment} from "@/api_config/Candidate/department"
import { JobsPageProps } from "@/api_config/Candidate/types";
export default async function Jobs({ searchParams }: JobsPageProps) {
  const [jobs, department] = await Promise.all([
    CandidategetJobs({ searchParams }),
    CandidategetDepartment()
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