"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Briefcase, MapPin, X } from "lucide-react"
import JobFilters from "./JobFilters"
import FiltersSidebar from "./FiltersSidebar"
import JobCard from "./JobCard"
import { departmentApiResponse } from "@/types/types"
import { CandidategetJobs } from "@/api_config/Candidate/manageJobs"
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { useSession } from "next-auth/react"
import { recordJobImpressionsApi } from "@/api_config/Candidate/manageJobs"


const IMPRESSION_DEBOUNCE_MS = 150
const IMPRESSION_THRESHOLD = 0.5

export default function JobsFeed({ jobs, departments }: { jobs: any, departments: departmentApiResponse }) {
    // console.log("jobs", jobs)
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const urlSearchValue = searchParams.get('text') || ''
    const urlLocationValue = searchParams.get('location') || ''
    const [searchQuery, setSearchQuery] = useState(urlSearchValue)
    const [locationQuery, setLocationQuery] = useState(urlLocationValue)
    const router = useRouter()
    const pathname = usePathname()
    const prevSearchParams = useRef(searchParams.toString())

    // 1. Sync data when jobs prop changes
    useEffect(() => {
        setAllJobs(jobs?.data || [])
        setPage(1)
        setHasMore((jobs?.data?.length || 0) >= limit)
        
        // Sync ref to current params
        prevSearchParams.current = searchParams.toString()
    }, [jobs, searchParams])

    // Impression tracking: only when authenticated
    const feedContainerRef = useRef<HTMLDivElement | null>(null)
    const sentIdsRef = useRef<Set<string>>(new Set())
    const pendingIdsRef = useRef<Set<string>>(new Set())
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const flushImpressions = useCallback(() => {
        const ids = Array.from(pendingIdsRef.current)
        pendingIdsRef.current.clear()
        if (ids.length === 0) return
        recordJobImpressionsApi(ids).then((res) => {
            if (res.error) {
                if (process.env.NODE_ENV === "development") {
                    console.warn("[impressions] API error:", res.data)
                }
            } else {
                ids.forEach((id) => sentIdsRef.current.add(id))
            }
        }).catch(() => {
            if (process.env.NODE_ENV === "development") {
                console.warn("[impressions] request failed")
            }
        })
    }, [])
    const scheduleFlush = useCallback(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            debounceRef.current = null
            flushImpressions()
        }, IMPRESSION_DEBOUNCE_MS)
    }, [flushImpressions])

    useEffect(() => {
        const urlText = searchParams.get('text')
        const urlLocation = searchParams.get('location')
        setSearchQuery(urlText || '')
        setLocationQuery(urlLocation || '')

        // Only enforce default jobTitle if NO searchParams exist at all
        const hasAnyParams = Array.from(searchParams.keys()).length > 0
        const defaultTitle = (session?.user as any)?.jobTitle

        if (!hasAnyParams && defaultTitle) {
            setSearchQuery(defaultTitle)
            const params = new URLSearchParams()
            params.set('text', defaultTitle)
            const queryString = params.toString().replace(/\+/g, "%20")
            router.replace(`${pathname}?${queryString}`)
        }
    }, [searchParams, session, pathname, router])

    const handleSearch = useCallback(() => {
        const value = searchQuery.trim()
        const locationValue = locationQuery.trim()
        
        // Always allow clearing search even if value is empty
        const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
        
        if (value) params.set('text', value)
        else params.delete('text')
        
        if (locationValue) params.set('location', locationValue)
        else params.delete('location')
        
        params.delete('page')

        // Force %20 instead of +
        const queryString = params.toString().replace(/\+/g, "%20")
        const url = queryString ? `${pathname}?${queryString}` : pathname

        router.push(url, { scroll: false })
    }, [searchQuery, locationQuery, router, pathname])


    const [allJobs, setAllJobs] = useState(jobs?.data || [])
    const [page, setPage] = useState(1)
    const limit = 10
    const [hasMore, setHasMore] = useState((jobs?.data?.length || 0) >= limit)
    const [isLoading, setIsLoading] = useState(false)

    const loaderRef = useRef<HTMLDivElement | null>(null)
    const isLoadingRef = useRef(false)
    const pageRef = useRef(1)
    useEffect(() => {
        isLoadingRef.current = isLoading
    }, [isLoading])

    useEffect(() => {
        pageRef.current = page
    }, [page])
    useEffect(() => {
        setAllJobs(jobs?.data || [])
        setPage(1)
        pageRef.current = 1
        setHasMore((jobs?.data?.length || 0) >= limit)
    }, [jobs])

    const fetchMoreJobs = useCallback(async () => {
        if (isLoadingRef.current) return;
        setIsLoading(true);
        isLoadingRef.current = true;

        try {
            const nextPage = pageRef.current + 1;
            const currentFilters = {
                text: searchParams.get('text') || undefined,
                location: searchParams.get('location') || undefined,
                date: searchParams.get('date') || undefined,
                mode: searchParams.get('mode') || undefined,
                type: searchParams.get('type') || undefined,
                department: searchParams.get('department') || undefined,
                page: nextPage,
                limit: limit
            };
            const response: any = await CandidategetJobs({
                searchParams: Promise.resolve(currentFilters)
            });
            if (response && response.data) {
                const newJobs = response.data;
                setAllJobs((prev: any) => [...prev, ...newJobs]);
                setPage(nextPage);
                pageRef.current = nextPage;

                if (newJobs.length < limit) setHasMore(false);


                // const newUrl = new URL(window.location.href);
                // newUrl.searchParams.set('page', nextPage.toString());
                // window.history.replaceState({}, '', newUrl.toString());
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setIsLoading(false);
            isLoadingRef.current = false;
        }
    }, [searchParams, limit]);

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

    // Impression tracking: observe job cards when they enter viewport (authenticated only)
    useEffect(() => {
        if (!session?.user || allJobs.length === 0) return
        const container = feedContainerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue
                    const jobId = (entry.target as HTMLElement).getAttribute("data-job-id")
                    if (!jobId || sentIdsRef.current.has(jobId)) continue
                    pendingIdsRef.current.add(jobId)
                    scheduleFlush()
                }
            },
            { root: null, rootMargin: "0px", threshold: IMPRESSION_THRESHOLD }
        )

        const cards = container.querySelectorAll("[data-job-id]")
        cards.forEach((el) => observer.observe(el))

        return () => {
            observer.disconnect()
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
                debounceRef.current = null
            }
        }
    }, [session?.user, allJobs, scheduleFlush])
    const SearchBar = useMemo(() => {
        return (
            <div className=" bg-[#fafafb] -mx-4 px-4 py-3
                          md:bg-transparent md:mx-0 md:px-2 md:py-2">
                <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                    {/* Job Title Input - Full width on mobile */}
                    <div className="w-full md:flex-1 relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-(--job-post-bg-color)" />
                        <input
                            type="text"
                            placeholder="Job title or section"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch()
                                }
                            }}
                            className="w-full pl-9 md:pl-10 pr-3 md:pr-4 h-10 md:h-12 bg-white border border-(--profile-image-border-color) rounded-lg
                                   text-sm text-gray-600 placeholder:(--job-post-bg-color)
                                   focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color)
                                   focus:border-transparent shadow-sm md:shadow-none"
                        />
                        {searchQuery && <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--job-post-bg-color) cursor-pointer" onClick={() => {
                            setSearchQuery("")
                            const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
                            params.delete('text')
                            params.delete('page')
                            const queryString = params.toString().replace(/\+/g, "%20")
                            const url = queryString ? `${pathname}?${queryString}` : pathname
                            router.push(url, { scroll: false })
                        }} />}
                    </div>
                    {/* Location Input and Button - Same row on mobile */}
                    <div className="flex gap-2 md:hidden">
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--job-post-bg-color)" />
                            <input
                                type="text"
                                placeholder="Location"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch()
                                    }
                                }}
                                className="w-full pl-9 pr-3 h-10 bg-white border border-(--profile-image-border-color) rounded-lg
                                       text-sm text-gray-600 placeholder:text-(--job-post-bg-color)
                                       focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color)
                                       focus:border-transparent shadow-sm"
                            />
                        </div>
                        <button
                            className="px-2 py-2 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) 
                                   text-white font-medium rounded-lg
                                   hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover)
                                   focus:outline-none
                                   transition-all duration-200 transform hover:scale-[1.02]
                                   shadow-sm hover:shadow-md
                                   min-w-[35px] flex items-center justify-center"
                            onClick={handleSearch}
                        >
                            <span className="text-xs">Find Job</span>
                        </button>
                    </div>
                    {/* Desktop: Location Input */}
                    <div className="hidden md:flex md:flex-1 relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-(--job-post-bg-color)" />
                        <input
                            type="text"
                            placeholder="Location"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch()
                                }
                            }}
                            className="w-full pl-10 pr-4 h-12 bg-white border border-(--profile-image-border-color) rounded-lg
                                   text-sm text-gray-600 placeholder:text-(--job-post-bg-color)
                                   focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color)
                                   focus:border-transparent shadow-none"
                        />
                    </div>
                    {/* Desktop: Search Button */}
                    <button className="hidden md:block px-2 py-3 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) 
                               text-white font-medium rounded-lg
                               hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover)
                               
                               transition-all duration-200 transform hover:scale-[1.02]
                               shadow-sm hover:shadow-md
                               min-w-[70px] flex items-center justify-center"
                        onClick={handleSearch}
                    >
                        <span className="text-sm">Find Job</span>
                    </button>
                </div>
            </div>
        );
    }, [searchQuery, locationQuery, handleSearch])
    return (
        <div className="w-full bg-(--Profile-hover-bg) min-h-screen">
            <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-6 pt-0 md:pt-4 pb-4 md:pb-6">
                <div className="w-full">
                    {/* Search Bar - Mobile Only (Sticky) */}
                    <div className="md:hidden sticky top-13 z-50 bg-(--Profile-hover-bg) pb-2">
                        {SearchBar}
                    </div>
                    {/* Header Section */}
                    <div className="mb-2 md:mb-4">
                        <JobFilters departmentres={departments} />
                    </div>
                    <div className="mb-6">
                        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-(--filter-header-text-color) mb-2">
                            Showing {jobs?.total || allJobs.length} jobs based on your filter
                        </h1>
                        <p className="text-xs md:text-sm text-gray-600">
                            Discover your next opportunity
                        </p>
                    </div>
                    {/* Main Content - Two Column Layout */}
                    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 md:flex-row">
                        {/* Left Sidebar - Filters (iPad and Desktop only, not mobile) */}
                        <div className="hidden md:block shrink-0">
                            <FiltersSidebar departmentres={departments} />
                        </div>
                        {/* Right Side - Job Listings */}
                        <div className="flex-1 min-w-0">
                            {/* Search Bar - iPad and Desktop (Above Job Cards) */}
                            <div className="hidden md:block">
                                {SearchBar}
                            </div>
                            {allJobs.length === 0 ? (
                                <div className="w-[90%] mx-auto mt-12 bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-14 text-center">
                                    {/* Icon */}
                                    <div className="flex justify-center mb-5">
                                        <div className="h-14 w-14 rogray-00 flex items-center justify-center">
                                            <svg className="h-7 w-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Title */}
                                    <h2 className="text-gray-900 font-semibold text-xl">No matching jobs found</h2>
                                    <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">We couldn’t find any jobs that match your current filters.Try adjusting your preferences or explore other opportunities.</p>
                                </div>
                            ) : (
                                <div ref={feedContainerRef} className="space-y-4">
                                    {allJobs.map((job: any, index: number) => (
                                        <div key={job._id} data-job-id={job._id}>
                                            <JobCard
                                                jobId={job._id}
                                                index={index}
                                                rawDescription={job.rawDescription}
                                                extractedData={job.extractedData}
                                                companyName={job.employer?.companyName}
                                                isprofileStrength={job.employer?.profileStrength}
                                                companyAddress={job.employer?.companyAddress}
                                                companyWebsite={job.employer?.companyWebsite}
                                                isLiked={job.isLiked}
                                                isSaved={job.isSaved}
                                                companyLogo={job.employer?.companyLogo}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Infinite Loader - Only show if we have at least limit number of jobs */}
                            {hasMore && allJobs.length >= limit && (
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
                                            __html: `@keyframes bounce {
                  0%, 80%, 100% { transform: translateY(0); opacity: .5; }
                  40% { transform: translateY(-8px); opacity: 1; }
                }
              `,
                                        }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

