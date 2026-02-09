import { customFetch } from "@/api_config/apiconfig";
import { JobListingsResponseType, JobPost, JobPostPayload, JobPostResponseType } from "./type";

export const AIJobPostAPI = async (data: JobPostPayload) => {
    const response = await customFetch<JobPostResponseType>({
        url: "/enhance-job-description",
        method: 'POST',
        body: {
            description: data.description,
        },
    });
    return response;
}
export const PostJobAPI = async (data: JobPost) => {
    const response = await customFetch<JobPostResponseType>({
        url: "/post-job",
        method: 'POST',
        body: {
            description: data.description,
        }
    });
    return response;
}
export const GetAllJobsAPI = async (page: number, limit: number) => {
    const response = await customFetch<JobListingsResponseType>({
        url: `/get-jobs?page=${page}&limit=${limit}`,
        method: 'GET'
    });

    return response;
}

