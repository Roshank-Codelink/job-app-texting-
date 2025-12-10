import JobPost from "@/Components/Job-Post/JobPost";
import { GetAllJobsAPI } from "@/api/JobPostApi/JobPostApi";

export default async function EmployerDashboard() {
  const limit = 10;

  try {
    const response = await GetAllJobsAPI(1, limit);
    
    // Check if response has error or data is null
    if (response.error || !response.data) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Unable to Load Jobs
            </h2>
            <p className="text-gray-600">
              {response.error 
                ? "An error occurred while fetching jobs. Please try again later." 
                : "No data received from the server. Please try again."}
            </p>
          </div>
        </div>
      );
    }

    const { success, data: jobs } = response.data;

    // Check if success is false
    if (!success) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Failed to Load Jobs
            </h2>
            <p className="text-gray-600">
              The server returned an unsuccessful response. Please try again later.
            </p>
          </div>
        </div>
      );
    }

    // Ensure jobs is an array, if not provide empty array
    const jobsArray = Array.isArray(jobs) ? jobs : [];

    return <JobPost initialJobs={jobsArray} />;
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error loading jobs:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Something Went Wrong
          </h2>
          <p className="text-gray-600">
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
        </div>
      </div>
    );
  }
}
