import { customFetch } from "../apiconfig"
import { LoginResponse, VerifyOTPResponse } from "./type";

export const loginApi = async (email: string, role: string) => {
 const response = await customFetch<LoginResponse>({
    url: "/generate-login-otp",
    method: "POST",
    body: {
        email,
        role,
    },
 });
 return response;
}



export const verifyOTP = async (email: string, otp: string) => {
 const response = await customFetch<VerifyOTPResponse>({
    url: "/verify-otp",
    method: "POST",
    body: {
        email,
        otp,
    },
 });
 return response;
}