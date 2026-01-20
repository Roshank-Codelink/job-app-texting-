import { getSession } from "next-auth/react";
import { CandidateSignUpSkillResponse } from "../SignupApi/type";
import { customFetch } from "../apiconfig";
import { auth } from "@/lib/auth-config";

export const candidateSignUpSkillApi = async (): Promise<CandidateSignUpSkillResponse> => {
    const response = await customFetch<CandidateSignUpSkillResponse>({
        url: "/get-skills",
        method: "GET",
    });
    return response.data;
}

export const MAP_API_CONFIG = async (lat: number, lon: number) => {

    const response = await customFetch({
        url: `/employee-location?lat=${lat}&lon=${lon}`,
        method: "GET"
    });

    return response;
}

export const LogoutAPI = async () => {
    const response = await customFetch({
        url: "/logout",
        method: "POST"
    });
    return response;
}

export const MarkJobHiredApi = async (jobId: string) => {
    try {
        const response = await customFetch({
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
}

interface JobsPageProps {
    searchParams: Promise<{
        text?: string;
        date?: string;
        mode?: string;
        type?: string
        department?: string
    }>;
}

export const getJobsApi = async ({ searchParams }: JobsPageProps) => {
    const session = await auth();
    const resolvedSearchParams = await searchParams;

    if (!session?.user) {
        throw new Error("No authenticated user found");
    }

    const params = new URLSearchParams();

    if (resolvedSearchParams?.text)
        params.append("text", resolvedSearchParams.text);

    if (resolvedSearchParams?.mode)
        params.append("mode", resolvedSearchParams.mode);

    if (resolvedSearchParams?.date)
        params.append("date", resolvedSearchParams.date);

    if (resolvedSearchParams?.type)
        params.append("type", resolvedSearchParams.type);

    if (resolvedSearchParams?.department)
        params.append("department", resolvedSearchParams.department);

    const response = await customFetch({
        url: `/jobs?${params.toString()}`,
        method: "GET",
    });

    return response.data;
};

