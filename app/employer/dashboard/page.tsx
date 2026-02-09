import JobPost from "@/Components/Job-Post/JobPost";
import { EmployergetJobs } from "@/api_config/EmployerInfoApi/jobApplications";


export default async function EmployerDashboard() {
  const limit = 10;
  const jobsResult = await EmployergetJobs(1, limit);

  const jobsArray = jobsResult?.data ?? [];

  return <JobPost initialJobs={jobsArray} />;
}
