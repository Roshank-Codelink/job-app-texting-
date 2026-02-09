import { customFetch } from "../apiconfig";


export const CandidategetDepartment = async () => {
  try {
    const response = await customFetch({
      url: "/get-departments",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.log("Error marking job as hired:", error);
    throw error;
  }
};