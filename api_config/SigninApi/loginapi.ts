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
 
 console.log("🚀 ~ loginApi ~ response:", response)
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
 console.log("🚀 ~ verifyOTP ~ response:", response)
 return response;
}