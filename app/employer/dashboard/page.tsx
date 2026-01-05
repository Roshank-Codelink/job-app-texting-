import JobPost from "@/Components/Job-Post/JobPost";
import { GetAllJobsAPI } from "@/api_config/JobPostApi/JobPostApi";
import { auth } from "@/lib/auth-config";

export default async function EmployerDashboard() {
  const limit = 10;
  let jobsArray: any[] = [];

  const jobsData = await GetAllJobsAPI(1, limit);

  jobsArray = jobsData?.data?.data || [];

  return (
    <JobPost initialJobs={jobsArray} />
  )


}
