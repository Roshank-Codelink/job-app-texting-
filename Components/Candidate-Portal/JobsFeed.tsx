"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Briefcase, MapPin, X, AlertCircle } from "lucide-react"
import JobFilters from "./JobFilters"
import FiltersSidebar from "./FiltersSidebar"
import JobCard from "./JobCard"
import { Skeleton } from "@/Components/ui/skeleton"
import { FilterLoadingContext } from "./FilterLoadingContext"
import { departmentApiResponse } from "@/types/types"
import { CandidategetJobs } from "@/api_config/Candidate/manageJobs"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
    const [showSearchError, setShowSearchError] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const prevSearchParams = useRef(searchParams.toString())
    const autoApplyingDefaultTitleRef = useRef(false)
    const suppressUrlTextSyncRef = useRef(false)
    const searchParamsStr = searchParams.toString()

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
        const defaultTitle = (session?.user as any)?.jobTitle

        if (!urlText && defaultTitle) {
            autoApplyingDefaultTitleRef.current = true
            const params = new URLSearchParams(window.location.search)
            params.set('text', defaultTitle)
            const queryString = params.toString().replace(/\+/g, "%20")
            const newUrl = `${pathname}?${queryString}`
            window.history.replaceState(null, '', newUrl)
            router.replace(newUrl, { scroll: false })
            setSearchQuery(defaultTitle)
            setLocationQuery(urlLocation || '')
        } else {
            if (!suppressUrlTextSyncRef.current) {
                setSearchQuery(urlText || '')
            }
            setLocationQuery(urlLocation || '')
        }
    }, [searchParamsStr, session, pathname, router])

    const [allJobs, setAllJobs] = useState(jobs?.data || [])
    const [page, setPage] = useState(1)
    const limit = 10
    const [hasMore, setHasMore] = useState((jobs?.data?.length || 0) >= limit)
    const [isLoading, setIsLoading] = useState(false)
    // Start with skeleton when we would show empty state so we always show skeleton first, then result
    // Start with skeleton by default if we have no search text yet (to handle upcoming redirects)
    // or if the initial jobs data is empty.
    const [isFilterLoading, setIsFilterLoading] = useState(() => {
        const urlText = searchParams.get('text')
        // If there's no text parameter, we're likely going to redirect to the user's default title
        // so we should definitely show a loader to avoid flashing irrelevant data.
        if (!urlText) return true

        return (jobs?.data?.length ?? 0) === 0
    })
    const filterLoadingStartedRef = useRef(isFilterLoading ? Date.now() : 0)
    const prevSearchParamsRef = useRef<string | null>(null)
    const MIN_SKELETON_MS = 300

    const setFilterLoadingWithMinTime = useCallback((loading: boolean) => {
        if (loading) filterLoadingStartedRef.current = Date.now()
        setIsFilterLoading(loading)
    }, [])

    const handleSearch = useCallback(() => {
        const value = searchQuery.trim()
        const locationValue = locationQuery.trim()

        if (!value) {
            setShowSearchError(true)
            return
        }

        setShowSearchError(false)
        suppressUrlTextSyncRef.current = false
        setFilterLoadingWithMinTime(true)

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
    }, [searchQuery, locationQuery, router, pathname, setFilterLoadingWithMinTime])

    const loaderRef = useRef<HTMLDivElement | null>(null)
    const isLoadingRef = useRef(false)
    const pageRef = useRef(1)
    useEffect(() => {
        isLoadingRef.current = isLoading
    }, [isLoading])

    useEffect(() => {
        pageRef.current = page
    }, [page])

    // When URL/searchParams change (remove params, back button, manual edit) → show skeleton until data arrives
    useEffect(() => {
        const currentStr = searchParams.toString()
        if (prevSearchParamsRef.current !== null && currentStr !== prevSearchParamsRef.current) {
            setFilterLoadingWithMinTime(true)
        }
        prevSearchParamsRef.current = currentStr
    }, [searchParams, setFilterLoadingWithMinTime])

    // When jobs prop updates (new data arrived), clear filter loading (after min skeleton time)
    useEffect(() => {
        // Initial load with 0 jobs: set ref now so we always wait MIN_SKELETON_MS (avoids flash)
        if ((jobs?.data?.length ?? 0) === 0 && filterLoadingStartedRef.current === 0) {
            filterLoadingStartedRef.current = Date.now()
        }

        // If we're auto-applying default title (first fetch without text → second fetch with text),
        // don't clear skeleton on the intermediate empty/old response.
        if (autoApplyingDefaultTitleRef.current && !searchParams.get("text")) {
            return
        }
        if (autoApplyingDefaultTitleRef.current && searchParams.get("text")) {
            autoApplyingDefaultTitleRef.current = false
        }

        setAllJobs(jobs?.data || [])
        setPage(1)
        pageRef.current = 1
        setHasMore((jobs?.data?.length || 0) >= limit)
        prevSearchParamsRef.current = searchParams.toString()

        const elapsed = Date.now() - filterLoadingStartedRef.current
        if (elapsed >= MIN_SKELETON_MS) {
            setIsFilterLoading(false)
        } else {
            const timer = setTimeout(() => setIsFilterLoading(false), MIN_SKELETON_MS - elapsed)
            return () => clearTimeout(timer)
        }
    }, [jobs, searchParams])

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
                <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-start">
                    {/* Job Title Input - Full width on mobile */}
                    <div className="w-full md:flex-1">
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-(--job-post-bg-color)" />
                            <input
                                type="text"
                                placeholder="Job title or section"
                                value={searchQuery}
                                onChange={(e) => {
                                    suppressUrlTextSyncRef.current = false
                                    setSearchQuery(e.target.value)
                                    if (showSearchError) setShowSearchError(false)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch()
                                    }
                                }}
                                className={`w-full pl-9 md:pl-10 pr-3 md:pr-4 h-10 md:h-12 bg-white border rounded-lg
                                       text-sm text-gray-600 placeholder:(--job-post-bg-color)
                                       focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color)
                                       focus:border-transparent shadow-sm md:shadow-none transition-colors
                                       ${showSearchError ? 'border-red-500 ring-1 ring-red-500' : 'border-(--profile-image-border-color)'}`}
                            />
                            {searchQuery && (
                                <X
                                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--job-post-bg-color) cursor-pointer"
                                    onClick={() => {
                                        suppressUrlTextSyncRef.current = true
                                        setSearchQuery("")
                                        if (showSearchError) setShowSearchError(false)
                                    }}
                                />
                            )}
                        </div>
                        {showSearchError && (
                            <div className="mt-1 flex items-center gap-1 text-[#d32f2f] text-[12px] md:text-[13px] font-medium whitespace-nowrap">
                                <AlertCircle className="h-5 w-5 fill-[#d32f2f] text-white" />
                                <span>Please enter a job title, company, skill or department</span>
                            </div>
                        )}
                    </div>
                    {/* Location Input and Button - Same row on mobile */}
                    <div className="flex gap-2 md:hidden">
                        <div className="flex-1">
                            <div className="relative">
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
                                    className="w-full pl-9 pr-8 h-10 bg-white border border-(--profile-image-border-color) rounded-lg
                                           text-sm text-gray-600 placeholder:text-(--job-post-bg-color)
                                           focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color)
                                           focus:border-transparent shadow-sm"
                                />
                                {locationQuery && (
                                    <X
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--job-post-bg-color) cursor-pointer"
                                        onClick={() => setLocationQuery("")}
                                    />
                                )}
                            </div>
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
                    <div className="hidden md:block md:flex-1">
                        <div className="relative">
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
                                className="w-full pl-10 pr-8 h-12 bg-white border border-(--profile-image-border-color) rounded-lg
                                       text-sm text-gray-600 placeholder:text-(--job-post-bg-color)
                                       focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color)
                                       focus:border-transparent shadow-none"
                            />
                            {locationQuery && (
                                <X
                                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--job-post-bg-color) cursor-pointer"
                                    onClick={() => setLocationQuery("")}
                                />
                            )}
                        </div>
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
    }, [searchQuery, locationQuery, handleSearch, showSearchError])

    const filterLoadingValue = useMemo(
        () => ({ setFilterLoading: setFilterLoadingWithMinTime }),
        [setFilterLoadingWithMinTime]
    )

    return (
        <FilterLoadingContext.Provider value={filterLoadingValue}>
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
                                {isFilterLoading ? (
                                    <div className="space-y-4">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="bg-white rounded-[10px] border border-gray-200 shadow-sm overflow-hidden p-3 sm:p-4">
                                                <div className="flex items-start gap-3 pr-14">
                                                    <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-[10px] shrink-0" />
                                                    <div className="min-w-0 flex-1 space-y-2">
                                                        <Skeleton className="h-4 w-3/4" />
                                                        <Skeleton className="h-3 w-1/2" />
                                                        <Skeleton className="h-3 w-1/3" />
                                                    </div>
                                                </div>
                                                <div className="px-1 pb-2 pt-3 space-y-2">
                                                    <Skeleton className="h-3 w-full" />
                                                    <Skeleton className="h-3 w-full" />
                                                    <Skeleton className="h-3 w-2/3" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : allJobs.length === 0 ? (
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
                                {!isFilterLoading && hasMore && allJobs.length >= limit && (
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
        </FilterLoadingContext.Provider>
    )
}

