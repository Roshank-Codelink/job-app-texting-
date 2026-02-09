import { customFetch } from "../apiconfig";
import { CandidateOnboardingPayload, CandidateOnboadingResponse, CandidateSignUpSkillResponse, SignupPayload, SignupResponse } from "./type";

export const signupApi = async (payload: SignupPayload) => {
 const response = await customFetch<SignupResponse>({
    url: "/employer-signup",
    method: "POST",
    body: payload,
 });
 return response;
}


// candidate Onboarding Api
export const candidateOnboarding=async (payload: CandidateOnboardingPayload) => {
   console.log(payload);
   const response = await customFetch<CandidateOnboadingResponse>({
    url: "/employee-onboarding",
    method: "POST",
    body: payload,
   });
   return response;
}
