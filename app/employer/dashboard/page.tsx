import JobPost from "@/Components/Job-Post/JobPost";
import { GetAllJobsAPI } from "@/api_config/JobPostApi/JobPostApi";

export default async function EmployerDashboard() {
  const limit = 10;
  let jobsArray: any[] = [];



  try { 
    const response = await GetAllJobsAPI(1, limit);
    // Check if response has error or data is null
    // Still render JobPost with empty array so form shows
    if (response.error || !response.data) {
      return <JobPost initialJobs={[]} />;
    }
    const { success, data: jobs } = response.data;
    // Check if success is false
    // Still render JobPost with empty array so form shows
    if (!success) {
      console.error("Failed to load jobs: unsuccessful response");
      return <JobPost initialJobs={[]} />;
    }
    // Ensure jobs is an array, if not provide empty array
    jobsArray = Array.isArray(jobs) ? jobs : [];
  } catch (error) {
    // Handle any unexpected errors
    // Still render JobPost with empty array so form shows
    console.error("Unexpected error loading jobs:", error);
    return <JobPost initialJobs={[]} />;
  }

  return <JobPost initialJobs={jobsArray} />;

  
}
