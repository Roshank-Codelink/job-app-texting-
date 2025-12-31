import { customFetch } from "../apiconfig";
import { SignupPayload, SignupResponse } from "./type";

export const signupApi = async (payload: SignupPayload) => {
 const response = await customFetch<SignupResponse>({
    url: "/employer-signup",
    method: "POST",
    body: payload,
 });
 return response;
}