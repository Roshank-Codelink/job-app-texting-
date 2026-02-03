import { customFetch } from "../apiconfig";
import {
  CloseJobResponse,
  DeleteJobResponse,
  JobApplicationsResponse,
} from "./type";

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
