// "use server"
import { getSession } from "next-auth/react";
import { CandidateSignUpSkillResponse } from "../SignupApi/type";
import { customFetch } from "../apiconfig";
import { auth } from "@/lib/auth-config";
import { SaveJobsApiResponse } from "./type";

export const candidateOnboardingSkill = async (): Promise<CandidateSignUpSkillResponse> => {
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

export interface JobsPageProps {
    searchParams: Promise<{
        text?: string;
        date?: string;
        mode?: string;
        type?: string;
        department?: string;
        page?: string | number;
        limit?: string | number;
    }>;
}

export const getJobsApi = async ({ searchParams }: JobsPageProps) => {
    const resolvedSearchParams = await searchParams;
    const params = new URLSearchParams();

    // Manual Appending (No loops)
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

    // Pagination Params (Must be added to talk to backend)
    if (resolvedSearchParams?.page) 
        params.append("page", resolvedSearchParams.page.toString());
    
    if (resolvedSearchParams?.limit) 
        params.append("limit", resolvedSearchParams.limit.toString());

    const response = await customFetch({
        url: `/jobs?${params.toString()}`,
        method: "GET",
    });
    console.log("csdmckmosdm",response)
    return response.data;
};

export const getDepartment = async()=>{
    try {
        const response = await customFetch({
          url:"/get-departments",
          method:"GET"
        })
        return response.data ;
    } catch (error) {
         console.log("Error marking job as hired:", error);
         throw error;
    }
}

interface LikeJobResponse {
    success: boolean;
    message: string;
}

export const likeJobApi =async(jobId:string,action:string)=>{
    try {
          const response = await customFetch<LikeJobResponse>({
            url :`/jobs/${jobId}/like`,
            method:"POST",
            body:{
                action:action
            }
          })
          return response.data ;
    } catch (error) {
         console.log("Error liking job:", error);
         throw error;
    }
}

interface SaveJobResponse{
    success: boolean
    savedCount:number
    message: string;
}

export const saveJobApi = async(jobId:string,action:string)=>{
    console.log(jobId,action)
    try {
       const response = await customFetch<SaveJobResponse>({
        url:`/jobs/${jobId}/save`,
        method:"POST",
        body:{
            action:action
        }
       })
        return response.data ;
    } catch (error) {
        console.log("Error saving job:", error);
        throw error;
    }
}

export const getSavedJobApi= async(page:number,limit:number)=>{
    try {
        const response = await customFetch<SaveJobsApiResponse>({
            url:`/jobs/saved?page=${page}&limit=${limit}`,
            method:"GET"
        })
        console.log("cbujb",response)
        return response.data;
    } catch (error) {
        console.log("Error get  saving job:", error);
        throw error
    }
}

