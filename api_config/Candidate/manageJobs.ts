import { customFetch } from "../apiconfig";
import { ApplyJobResponse, JobsPageProps, LikeJobResponse, SaveJobResponse, SaveJobsApiResponse } from "./types";




export const CandidategetJobs = async ({ searchParams }: JobsPageProps) => {
  const resolvedSearchParams = await searchParams;
  const params = new URLSearchParams();
  // Manual Appending (No loops)
  if (resolvedSearchParams?.text)
    params.append("text", resolvedSearchParams.text);
  if (resolvedSearchParams?.location)
    params.append("location", resolvedSearchParams.location);
  if (resolvedSearchParams?.mode)
    params.append("mode", resolvedSearchParams.mode);
  if (resolvedSearchParams?.date)
    params.append("date", resolvedSearchParams.date);
  if (resolvedSearchParams?.type)
    params.append("type", resolvedSearchParams.type);
  if (resolvedSearchParams?.department)
    params.append("department", resolvedSearchParams.department);
  // Pagination Params (Must be added to talk to backend)
  if (resolvedSearchParams?.page)
    params.append("page", resolvedSearchParams.page.toString());
  if (resolvedSearchParams?.limit)
    params.append("limit", resolvedSearchParams.limit.toString());
    
  // Ensure we send %20 instead of + for spaces in the backend API call
  const queryString = params.toString().replace(/\+/g, "%20");
  
  const response = await customFetch({
    url: `/jobs?${queryString}`,
    method: "GET",
  });
  return response.data;
};

export const ApplyJob = async (jobId: string) => {
    const response = await customFetch<ApplyJobResponse>({
        url: `/jobs/${jobId}/apply`,
        method: 'POST',
    });
    return response;
}


/** Record job impressions (idempotent). Call when job cards enter viewport. */
export const recordJobImpressionsApi = async (jobIds: string[]) => {
    if (!jobIds.length) return { error: false, data: null, statusCode: 200 };
    const response = await customFetch<{ message?: string }>({
        url: "/jobs/impressions",
        method: "POST",
        body: { jobIds },
    });
    return response;
};


export const CandidatelikeJob= async (jobId: string, action: string) => {
  try {
    const response = await customFetch<LikeJobResponse>({
      url: `/jobs/${jobId}/like`,
      method: "POST",
      body: {
        action: action,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error liking job:", error);
    throw error;
  }
};

export const CandidatesaveJob = async (jobId: string, action: string) => {
  console.log(jobId, action);
  try {
    const response = await customFetch<SaveJobResponse>({
      url: `/jobs/${jobId}/save`,
      method: "POST",
      body: {
        action: action,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error saving job:", error);
    throw error;
  }
};

export const CandidategetSavedJob = async (page: number, limit: number) => {
  try {
    const response = await customFetch<SaveJobsApiResponse>({
      url: `/jobs/saved?page=${page}&limit=${limit}`,
      method: "GET",
    });
    console.log("cbujb", response);
    return response.data;
  } catch (error) {
    console.log("Error get  saving job:", error);
    throw error;
  }
};