
import JobPost from "@/Components/Job-Post/JobPost";
import { GetAllJobsAPI } from "@/api/JobPostApi/JobPostApi";

export default async function EmployerDashboard() {
  const limit = 10;

  const response = await GetAllJobsAPI(1, limit);

  // Check if API call failed
  if (response.error || !response.data) {
    return <div>Failed to load jobs</div>;
  }

  const { success, data: jobs } = response.data;

  if (!success) {
    return <div>Failed to load jobs</div>;
  }

  return <JobPost initialJobs={jobs} />
}
