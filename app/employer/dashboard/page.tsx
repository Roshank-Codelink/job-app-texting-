import JobPost from "@/Components/Job-Post/JobPost";
import { getJobsForListingServer } from "@/api_config/JobPostApi/getJobsServer";

export default async function EmployerDashboard() {
  const limit = 10;
  const jobsResult = await getJobsForListingServer(1, limit);
  const jobsArray = jobsResult?.data ?? [];

  return <JobPost initialJobs={jobsArray} />;
}
