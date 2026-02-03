"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import JobListingCards from "./Job-Management/JobListingCards";
import JobPostForm from "./Job-Management/JobPostForm";
import { GetAllJobsAPI } from "@/api_config/JobPostApi/JobPostApi";
import { JobListingItem } from "@/api_config/JobPostApi/type";

interface JobPostProps {
  initialJobs: JobListingItem[];
}
export default function JobPost({ initialJobs }: JobPostProps) {
  // Ensure initialJobs is always an array to prevent crashes
  const safeInitialJobs = Array.isArray(initialJobs) ? initialJobs : [];
  const [jobs, setJobs] = useState(safeInitialJobs);
  const [page, setPage] = useState(1);
  const limit = 10;
  // Set hasMore based on initial data - if initial data is less than limit, no more data
  const [hasMore, setHasMore] = useState(safeInitialJobs.length >= limit);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);
  const pageRef = useRef(1);
  // console.log("Session:", session);
  // Sync refs with state


    console.log("Jobs:", jobs);


  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);
  // ⭐ Refresh Jobs After Posting
  const refreshJobs = async () => {
    setIsLoading(true);
    isLoadingRef.current = true;
    try {
      const response = await GetAllJobsAPI(1, limit);
      if (response.error || !response.data) {
        console.error("Error refreshing jobs:", response.error ? "API error" : "No data received");
        setIsLoading(false);
        isLoadingRef.current = false;
        return;
      }
      const { success, data } = response.data;
      if (success && Array.isArray(data)) {
        setJobs(data);
        setPage(1);
        pageRef.current = 1;
        // Only set hasMore to true if we got full limit of data
        setHasMore(data.length >= limit);
      } else {
        // If success is false or data is not an array, set empty array
        setJobs([]);
        setPage(1);
        pageRef.current = 1;
        setHasMore(false);
      }
    } catch (error) {
      console.error("Unexpected error refreshing jobs:", error);
      // On error, keep existing jobs but stop loading
      setHasMore(false);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  };
  // ⭐ Fetch More Jobs (Infinite Scroll) - Using refs to avoid dependency issues
  const fetchMoreJobs = useCallback(async () => {
    if (isLoadingRef.current) return;
  
    setIsLoading(true);
    isLoadingRef.current = true;
    const nextPage = pageRef.current + 1;
    const startTime = Date.now();
    const minLoadingTime = 600; // Minimum 600ms loader display time
    try {
      const response = await GetAllJobsAPI(nextPage, limit);
      // Check if response has error or data is null
      if (response.error || !response.data) {
        console.error("Error fetching more jobs:", response.error ? "API error" : "No data received");
        setHasMore(false);
        return;
      }
      const { success, data } = response.data;
      // Calculate remaining time to show loader
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      // Wait for minimum display time
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
      if (success && Array.isArray(data)) {
        setJobs((prev) => {
          // Ensure prev is an array
          const prevArray = Array.isArray(prev) ? prev : [];
          // Avoid duplicates
          const existingIds = new Set(prevArray.map((job) => job?._id).filter(Boolean));
          const newJobs = data.filter((job) => job?._id && !existingIds.has(job._id));
          return [...prevArray, ...newJobs];
        });
        setPage(nextPage);
        pageRef.current = nextPage;
        if (data.length < limit) {
          setHasMore(false);
        }
      } else {
        // If success is false or data is not an array, stop fetching more
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setHasMore(false);
    } finally { 
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [limit]);
  // ⭐ Infinite Scroll Observer
  useEffect(() => {
    if (!hasMore) return;
    const target = loaderRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current) {
          fetchMoreJobs();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, fetchMoreJobs]);
  return (
    <div className="flex w-full min-h-full gap-0">
      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-[32px]">
        {/* Job Post Form */}
        <div className="mb-6">
          <JobPostForm refreshJobs={refreshJobs} />
        </div>
        {/* Job Listing Cards */}
        <JobListingCards 
          jobs={jobs || []} 
          onJobStatusUpdate={(jobId: string, newStatus: string) => {
            setJobs((prevJobs) =>
              prevJobs.map((job) =>
                job._id === jobId ? { ...job, status: newStatus } : job
              )
            );
          }}
          onJobDelete={(jobId: string) => {
            console.log("Job deleted:", jobId);
            console.log("Jobs:", jobs);
            
            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
          }}
        />
        {/* Infinite Loader - Only show if we have at least limit number of jobs */}
        {hasMore && jobs.length >= limit && (
          <div className="py-10 text-center" ref={loaderRef}>
            {isLoading && (
              <div className="flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-[bounce_1.4s_0s_infinite]" />
                <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-[bounce_1.4s_0.2s_infinite]" />
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-[bounce_1.4s_0.4s_infinite]" />
              </div>
            )}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce {
                  0%, 80%, 100% { transform: translateY(0); opacity: .5; }
                  40% { transform: translateY(-8px); opacity: 1; }
                }
              `,
              }}
            />
          </div>
        )}
      </div>
      {/* RIGHT SIDEBAR */}
      <div className="hidden xl:block w-[23%] shrink-0">
        <div className="sticky top-0 h-screen border-l border-[#e5e7eb] bg-white overflow-y-auto">
          {/* <div className="w-full h-full p-4">
            <div className="text-gray-500 text-sm">Right Sidebar Content</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
