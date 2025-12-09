"use client";

import { JobListingItem } from "@/api/JobPostApi/type";
import JobListingCards from "./Job-Management/JobListingCards";
import JobPostForm from "./Job-Management/JobPostForm";
import { useEffect, useRef, useState } from "react";
import { GetAllJobsAPI } from "@/api/JobPostApi/JobPostApi";

export default function JobPost() {
  const [jobs, setJobs] = useState<JobListingItem[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Function to fetch jobs with pagination
  const fetchJobs = async (pageNum: number, append: boolean = false) => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    setIsLoading(true);
    try {
      // Add delay for slow loading effect (only when appending)
      if (append) {
        await new Promise(resolve => setTimeout(resolve, 800)); // 800ms delay
      }

      const response = await GetAllJobsAPI(pageNum, limit);

      if (response.error) {
        console.error("API Error:", response.data);
        setIsLoading(false);
        return;
      }

      const responseData = response.data;
      // console.log("API Response:", responseData);

      if (responseData?.success && Array.isArray(responseData.data)) {
        if (append) {
          // Append new jobs to existing list, filter out duplicates
          setJobs((prev) => {
            const existingIds = new Set(prev.map(job => job._id));
            const newJobs = responseData.data.filter((job: JobListingItem) => !existingIds.has(job._id));
            return [...prev, ...newJobs];
          });
        } else {
          // Replace jobs (for refresh)
          setJobs(responseData.data);
        }

        // Check if there are more pages
        if (responseData.data.length < limit) {
          setHasMore(false);
        }
      } else {
        console.error("Invalid response format:", responseData);
        setHasMore(false);
      }

    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Fetch first page on mount
  useEffect(() => {
    fetchJobs(1, false);
  }, []);

  // 🔹 Infinite scroll observer
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          // Load next page
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchJobs(nextPage, true);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.disconnect();
      }
    };
  }, [hasMore, isLoading]);

  // 🔹 Refresh jobs when new job is posted
  const refreshJobs = () => {
    setJobs([]);
    setPage(1);
    setHasMore(true);
    fetchJobs(1, false);
  };

  return (
    <div>
      {/* Job Form → sending refresh function */}
      <div className="mb-[20px]">
        <JobPostForm refreshJobs={refreshJobs} />
      </div>

      {/* Listing Cards → sending jobs array */}
      <div className="mt-4">
        <JobListingCards jobs={jobs} />
      </div>

      {/* Infinite Scroll Loader */}
      {hasMore && (
        <div 
          ref={loaderRef} 
          className="py-8 text-center"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-1.5">
              <span 
                className="inline-block w-2 h-2 rounded-full bg-[#38bdf8]"
                style={{
                  animation: 'bounce 1.4s ease-in-out infinite',
                  animationDelay: '0s'
                }}
              ></span>
              <span 
                className="inline-block w-2 h-2 rounded-full bg-[#2dd4bf]"
                style={{
                  animation: 'bounce 1.4s ease-in-out infinite',
                  animationDelay: '0.2s'
                }}
              ></span>
              <span 
                className="inline-block w-2 h-2 rounded-full bg-[#14b8a6]"
                style={{
                  animation: 'bounce 1.4s ease-in-out infinite',
                  animationDelay: '0.4s'
                }}
              ></span>
            </div>
          ) : null}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes bounce {
                0%, 80%, 100% {
                  transform: translateY(0);
                  opacity: 0.5;
                }
                40% {
                  transform: translateY(-8px);
                  opacity: 1;
                }
              }
            `
          }} />
        </div>
      )}
    </div>
  );
}
