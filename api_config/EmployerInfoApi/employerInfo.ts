import { customFetch } from "../apiconfig";
import { EmployerInfoResponse, UploadLogoResponse } from "./type";

export const uploadLogo = async (formData: FormData) => {
  const response = await customFetch<UploadLogoResponse>({
    url: "/employer/company-logo",
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const employerInfoApi = async () => {
  try {
    const response = await customFetch<EmployerInfoResponse>({
      url: "/employer-profile",
      method: "GET",
    });
    if (!response.data) {
     return null;
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching employer info:", error);
    throw error;
  }
};
