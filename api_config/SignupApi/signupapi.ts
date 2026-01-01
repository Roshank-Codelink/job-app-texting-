import { customFetch } from "../apiconfig";
import { CandidateSignUpPayload, CandidateSignUpResponse, CandidateSignUpSkillResponse, SignupPayload, SignupResponse } from "./type";

export const signupApi = async (payload: SignupPayload) => {
 const response = await customFetch<SignupResponse>({
    url: "/employer-signup",
    method: "POST",
    body: payload,
 });
 return response;
}


// candidate SignUp api 
export const candidateSignUpApi=async (payload: CandidateSignUpPayload) => {
   console.log(payload);
   
   const response = await customFetch<CandidateSignUpResponse>({
    url: "/employee-signup",
    method: "POST",
    body: payload,
   });
   return response;
}
