import { customFetch } from "../apiconfig";
import { ApplyJobResponse } from "./types";

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