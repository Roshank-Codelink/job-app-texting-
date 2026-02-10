import { customFetch } from "../apiconfig";


export const CandidategetDepartment = async () => {
  try {
    const response = await customFetch({
      url: "/get-departments",
      method: "GET",
    });
    if (response.error) {
        console.error("Error fetching departments:", response.data);
    }
    return response.data;
  } catch (error) {
    console.error("Error calling get-departments:", error);
    return null;
  }
};