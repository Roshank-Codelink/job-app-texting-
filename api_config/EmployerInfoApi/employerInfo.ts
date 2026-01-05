import { customFetch } from "../apiconfig"
import { EmployerInfoResponse } from "./type"


export const employerInfoApi = async () => {
    try {
        const response = await customFetch<EmployerInfoResponse>({
            url: "/employer-profile",
            method: "GET",
        })
        if (!response.data) {
            throw new Error("no data found");
        }
        return response.data.data;
    } catch (error) {
        console.error("Error fetching employer info:", error);
        throw error;
    }
}