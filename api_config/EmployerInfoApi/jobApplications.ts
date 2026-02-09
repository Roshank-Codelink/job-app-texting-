import { customFetch } from "../apiconfig";
import {
  CloseJobResponse,
  DeleteJobResponse,
  JobApplicationsResponse,
  JobListingsResponseType,
  MarkJobHiredResponse,
  RenewJobResponse,
} from "./type";
import { getAuthToken } from "@/lib/getAuthToken";

export const getJobApplications = async () => {
  
  const response = await customFetch<JobApplicationsResponse>({
    url: "/employer/applications",
    method: "GET",
  });

  return response.data;
};

export const closeJob = async (jobId: string) => {
  const response = await customFetch<CloseJobResponse>({
    url: `/close-job/${jobId}`,
    method: "PATCH",
  });
  return response.data;
};

export const deleteJob = async (jobId: string) => {
  const response = await customFetch<DeleteJobResponse>({
    url: `/delete-job/${jobId}`,
    method: "DELETE",
  });
  return response.data;
};

export const renewJob = async (jobId: string) => {
  const response = await customFetch<RenewJobResponse>({
    url: `/renew-job/${jobId}`,
    method: "POST",
  });
  return response.data;
};
export const MarkJobHiredApi = async (jobId: string) => {
  try {
    const response = await customFetch<MarkJobHiredResponse>({
      url: `/mark-job-hired/${jobId}`,
      method: "PATCH",
    });
    if (!response.data) {
      throw new Error("no data found");
    }
    return response.data;
  } catch (error) {
    console.error("Error marking job as hired:", error);
    throw error;
  }
};



export async function EmployergetJobs(
  page: number,
  limit: number
): Promise<JobListingsResponseType> {
  const token = await getAuthToken();
  const response = await customFetch<JobListingsResponseType>({
    url: `/get-jobs?page=${page}&limit=${limit}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
   
  return {
    success: response?.data?.success ?? false,
    data: Array.isArray(response?.data?.data)
      ? response.data.data
      : [],
  };
}




