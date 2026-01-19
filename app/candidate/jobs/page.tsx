import JobsFeed from "@/Components/Candidate-Portal/JobsFeed";
import { getJobsApi } from "@/api_config/shared/sharedapi";



interface JobsPageProps {
  searchParams: Promise<{
    text?: string;
  }>;
}

export default async function Jobs({ searchParams }: JobsPageProps) {
  // ✅ UNWRAP THE PROMISE

  const jobs = await getJobsApi({ searchParams });

  return (
    <div className="w-full">
      <JobsFeed />
    </div>
  );
}
