import { customFetch } from "../apiconfig";
import { ApplyJobResponse } from "./types";

export const ApplyJob = async (jobId: string) => {
    const response = await customFetch<ApplyJobResponse>({
        url: `/jobs/${jobId}/apply`,
        method: 'POST',
    });
    return response;
}