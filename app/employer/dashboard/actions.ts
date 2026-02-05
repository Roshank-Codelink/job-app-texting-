"use server";

import { revalidateTag } from "next/cache";

const JOBS_TAG = "employer-jobs";

/**
 * Invalidates the employer jobs cache so the next server render fetches fresh jobs.
 * Call this after post job, renew job, etc.; then call router.refresh() on the client.
 */
export async function revalidateEmployerJobsAction() {
  revalidateTag(JOBS_TAG, {});
}
