"use client"

import { SaveJobsApiResponse } from "@/api_config/shared/type"
import { Bookmark, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import JobDescription from "./JobDescription"
import { saveJobApi, getSavedJobApi } from "@/api_config/shared/sharedapi"
import companyIcon from "@/public/Company_icon_webp.webp"

export default function SaveJobs({ saved }: { saved: SaveJobsApiResponse }) {
    const router = useRouter()
    const jobs = saved?.data || []
    const [allsavejobs, setallsavejobs] = useState<SaveJobsApiResponse["data"]>(jobs)
    const [page, setPage] = useState(1);
    const limit = 10;
    const [hasMore, setHasMore] = useState(jobs.length >= limit);
    const [isLoading, setIsLoading] = useState(false);

    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isLoadingRef = useRef(false);
    const pageRef = useRef(1);

    const [isSliderOpen, setIsSliderOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState<any>(null)

    const logoUrl = selectedJob?.employer?.companyLogo ? `${process.env.NEXT_PUBLIC_SERVER_LOGOS_ENDPOINT}/${selectedJob?.employer?.companyLogo}` : companyIcon.src

    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    const fetchMoreJobs = useCallback(async () => {
        if (isLoadingRef.current) return;

        setIsLoading(true);
        isLoadingRef.current = true;
        const nextPage = pageRef.current + 1;
        const startTime = Date.now();
        const minLoadingTime = 600;

        try {
            const response = await getSavedJobApi(nextPage, limit);

            if (!response || !response.success) {
                console.error("Error fetching more jobs");
                setHasMore(false);
                return;
            }

            const data = response.data;
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
            await new Promise((resolve) => setTimeout(resolve, remainingTime));

            if (data && Array.isArray(data)) {
                setallsavejobs((prev) => {
                    const prevArray = Array.isArray(prev) ? prev : [];
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



    async function handleunsaved(jobId: string) {
        try {
            const action = "unsave"
            const response = await saveJobApi(jobId, action)
            if (response.success) {
                const newsavedata = allsavejobs.filter((job) => {
                    return job._id !== jobId;
                })
                setallsavejobs(newsavedata)
            }
        } catch (error) {
            console.log("error", error);
            throw error
        }
    }


    return (
        <div className="w-full bg-(--Profile-hover-bg) min-h-screen">
            <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-6 py-6">
                {/* Page Title */}
                <h1 className="text-xl md:text-2xl font-bold text-(--filter-header-text-color) mb-6">My Saved Jobs</h1>
                {/* EMPTY STATE */}
                {allsavejobs.length === 0 ? (
                    <div className="px-6 py-20">
                        <div className="max-w-md mx-auto text-center">
                            <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                                <Bookmark className="text-gray-400" size={26} />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">No saved jobs yet</h2>
                            <p className="text-sm text-gray-500 mb-8 leading-relaxed">Save jobs you’re interested in and they’ll show up here for quick access later.</p>
                            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white text-sm font-medium hover:opacity-90 transition cursor-pointer group"
                                onClick={() => router.push("/candidate/jobs")}>
                                <span>Find jobs</span>
                                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                            <div className="mt-8 space-y-2 text-sm">
                                <p className="text-gray-500">Having trouble with saved jobs?{" "}
                                    <span className="text-blue-600 cursor-pointer hover:underline">Tell us more</span>
                                </p>
                                <p className="text-blue-600 cursor-pointer hover:underline">Not seeing a job?</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* JOB LIST */
                    <div className="space-y-5">
                        {allsavejobs.map((job) => {
                            console.log(job)
                            const title = job?.extractedData?.jobTitle || "Untitled Role"
                            const location = job?.extractedData?.location || ""
                            const company = job?.employer?.companyName || "Unknown Company"
                            return (
                                <div key={job._id} className="relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition px-5 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    {/* Accent bar */}
                                    <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)" />
                                    {/* LEFT */}
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-800">{company}</span>
                                            {location && (
                                                <>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-sm text-gray-500">{location}</span>
                                                </>
                                            )}
                                        </div>
                                        {job?.rawDescription && (
                                            <p className="text-sm text-gray-500 mt-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: job.rawDescription }} />
                                        )}
                                    </div>
                                    {/* RIGHT */}
                                    <div className="flex items-center justify-between sm:justify-end gap-4 min-w-fit">
                                        <button className="px-4 py-1.5 text-sm rounded-full cursor-pointer bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:opacity-90 transition"
                                            onClick={() => { setSelectedJob(job), setIsSliderOpen(true) }}>
                                            Read More
                                        </button>
                                        <button
                                            className={`p-2 rounded-full transition-all duration-200 cursor-pointer
                                                    ${job.isSaved
                                                    ? "bg-(--navbar-bg-button) text-(--job-post-button-bg-to)"
                                                    : "text-(--profile-title-color) hover:text-(--job-post-button-bg-to) hover:bg-(--navbar-bg-button)"}`}
                                            onClick={() => { handleunsaved(job._id) }}>
                                            <Bookmark
                                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200
                                                ${job.isSaved ? "fill-current" : ""}`} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        {hasMore && allsavejobs.length >= limit && (
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
                )}
            </div>
            {/* JOB DESCRIPTION SLIDER */}
            {selectedJob && (
                <JobDescription
                    isOpen={isSliderOpen}
                    onClose={() => setIsSliderOpen(false)}
                    companyName={selectedJob?.employer?.companyName}
                    companyLogo={logoUrl}
                    isVerified={selectedJob?.employer?.isVerified}
                    rawDescription={selectedJob?.rawDescription}
                    extractedData={selectedJob?.extractedData}
                    companyWebsite={selectedJob?.employer?.companyWebsite}
                    companyAddress={selectedJob?.employer?.companyAddress}
                    isprofileStrength={selectedJob?.employer?.profileStrength}
                    jobId={selectedJob?._id}
                />
            )}
        </div>
    )
}
