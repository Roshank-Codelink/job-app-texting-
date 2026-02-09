import { getAuthToken } from "@/lib/getAuthToken";
import { JobListingsResponseType } from "./type";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT;
const JOBS_TAG = "employer-jobs";

/**
 * Server-only: fetch jobs with Next.js cache tag for revalidation.
 * Used by the employer dashboard page so revalidateTag('employer-jobs') works.
 */
export async function getJobsForListingServer(
  page: number,
  limit: number
): Promise<JobListingsResponseType> {
  const token = await getAuthToken();
  const url = `${API_BASE_URL}/get-jobs?page=${page}&limit=${limit}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: [JOBS_TAG] },
  });

  if (!res.ok) {
    return { success: false, data: [] };
  }

  const body = await res.json();
  return {
    success: body?.success ?? false,
    data: Array.isArray(body?.data) ? body.data : [],
  };
}
