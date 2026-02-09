import { customFetch } from "../apiconfig";
import { JobPost, JobPostPayload, JobPostResponseType } from "./type";


export const AIEnhanceJob = async (data: JobPostPayload) => {
    const response = await customFetch<JobPostResponseType>({
        url: "/enhance-job-description",
        method: 'POST',
        body: {
            description: data.description,
        },
    });
    return response;
}

export const PostJob = async (data: JobPost) => {
    const response = await customFetch<JobPostResponseType>({
        url: "/post-job",
        method: 'POST',
        body: {
            description: data.description,
        }
    });
    return response;
}