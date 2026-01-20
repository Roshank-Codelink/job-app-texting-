import JobsFeed from "@/Components/Candidate-Portal/JobsFeed";
import { getJobsApi } from "@/api_config/shared/sharedapi";
import {JobsApiResponse } from "@/types/types";



interface JobsPageProps {
  searchParams: Promise<{
    text?: string;
  }>;
}


export default async function Jobs({ searchParams }: JobsPageProps) {
  

  const jobs = await getJobsApi({ searchParams });


  const jobsData = (jobs as JobsApiResponse) || [];
  console.log(jobsData)
  return (
    <div className="w-full">
      <JobsFeed  jobs={jobsData}/>
    </div>
  );
}
