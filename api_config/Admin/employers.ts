import { customFetch } from "../apiconfig";
import { ApproveRejectEmployerResponse, GetEmployersResponse } from "./types";

export const getEmployers = async () => {
    const response = await customFetch<GetEmployersResponse>({
        url: "/admin/employers",
        method: "GET",
    })
    return response;
}

export const approveRejectEmployer = async (userId: string, status: string) => {
    const response = await customFetch<ApproveRejectEmployerResponse>({
        url: `/admin/employers/${userId}/status`,
        method: "PATCH",
        body: {
            status: status,
        },
    })
    return response;
}