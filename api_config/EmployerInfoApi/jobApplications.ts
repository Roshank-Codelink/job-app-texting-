import { customFetch } from "../apiconfig";
import { JobApplicationsResponse } from "./type";

export const getJobApplications = async () => {
    const response = await customFetch<JobApplicationsResponse>({
        url: '/employer/applications',
        method: 'GET',
    });
    return response.data;
}