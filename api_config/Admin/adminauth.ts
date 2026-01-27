import { customFetch } from "../apiconfig";
import { AdminLoginResponse } from "./types";

export const adminLogin = async (email: string, password: string) => {
    const response = await customFetch<AdminLoginResponse>({
        url: "/admin-login",
        method: "POST",
        body: {
            email,
            password,
        },
    });
    return response;
}