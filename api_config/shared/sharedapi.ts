
import { CandidateSignUpSkillResponse } from "../SignupApi/type";
import { customFetch } from "../apiconfig";

export const candidateOnboardingSkill =
  async (): Promise<CandidateSignUpSkillResponse> => {
    const response = await customFetch<CandidateSignUpSkillResponse>({
      url: "/get-skills",
      method: "GET",
    });
    return response.data;
  };

export const MAP_API_CONFIG = async (lat: number, lon: number) => {
  const response = await customFetch({
    url: `/employee-location?lat=${lat}&lon=${lon}`,
    method: "GET",
  });

  return response;
};

export const LogoutAPI = async () => {
  const response = await customFetch({
    url: "/logout",
    method: "POST",
  });
  return response;
};





