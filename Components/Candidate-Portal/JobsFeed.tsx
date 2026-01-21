"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Search, Briefcase, MapPin } from "lucide-react"
import JobFilters from "./JobFilters"
import FiltersSidebar from "./FiltersSidebar"
import JobCard from "./JobCard"
import { JobsApiResponse, departmentApiResponse } from "@/types/types"



export default function JobsFeed({ jobs,departments }: { jobs: JobsApiResponse,departments:departmentApiResponse }) {
    
    const searchParams = useSearchParams()
    const urlSearchValue = decodeURIComponent(searchParams.get('text') || '')
    const [searchQuery, setSearchQuery] = React.useState(urlSearchValue)
    const router = useRouter()

    const handleSearch = React.useCallback(() => {
        const value = searchQuery.trim()
        if (!value) return
        router.push(`/candidate/jobs?text=${encodeURIComponent(value)}`)
    }, [searchQuery, router])




    // const handlers = getFilterHandlers()
    const SearchBar = React.useMemo(() => {
        return (
            <div className=" bg-[#fafafb] -mx-4 px-4 py-3
                          md:bg-transparent md:mx-0 md:px-2 md:py-2">
                <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                    {/* Job Title Input - Full width on mobile */}
                    <div className="w-full md:flex-1 relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Job title or section"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 md:pl-10 pr-3 md:pr-4 h-10 md:h-12 bg-white border border-gray-200 rounded-lg
                                   text-sm text-gray-600 placeholder:text-gray-400
                                   focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]
                                   focus:border-transparent shadow-sm md:shadow-none"
                        />
                    </div>

                    {/* Location Input and Button - Same row on mobile */}
                    <div className="flex gap-2 md:hidden">
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="w-full pl-9 pr-3 h-10 bg-white border border-gray-200 rounded-lg
                                       text-sm text-gray-600 placeholder:text-gray-400
                                       focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]
                                       focus:border-transparent shadow-sm"
                            />
                        </div>

                        <button
                            className="px-2 py-2 bg-gradient-to-r from-[#38bdf8] to-[#2dd4bf] 
                                   text-white font-medium rounded-lg
                                   hover:from-[#0ea5e9] hover:to-[#14b8a6]
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
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full pl-10 pr-4 h-12 bg-white border border-gray-200 rounded-lg
                                   text-sm text-gray-600 placeholder:text-gray-400
                                   focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]
                                   focus:border-transparent shadow-none"
                        />
                    </div>

                    {/* Desktop: Search Button */}
                    <button className="hidden md:block px-2 py-3 bg-gradient-to-r from-[#38bdf8] to-[#2dd4bf] 
                               text-white font-medium rounded-lg
                               hover:from-[#0ea5e9] hover:to-[#14b8a6]
                               
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
    }, [searchQuery, handleSearch])


    console.log(jobs.data)

    return (
        <div className="w-full bg-[#fafafb] min-h-screen">
            <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-6 pt-0 md:pt-4 pb-4 md:pb-6">
                <div className="w-full">
                    {/* Search Bar - Mobile Only (Sticky) */}
                    <div className="md:hidden sticky top-13 z-50 bg-[#fafafb] pb-2">
                        {SearchBar}
                    </div>

                    {/* Header Section */}
                    <div className="mb-2 md:mb-4">
                        <JobFilters departmentres={departments}/>
                    </div>
                    <div className="mb-6">
                        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 mb-2">
                            Showing {jobs.data.length || ""} jobs based on your filter
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


                            {jobs.data.length === 0 ? (
                                <div className="flex items-center justify-center py-12">
                                    <p className="text-gray-500">No jobs found</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {jobs.data.map((job, index) => (
                                        <JobCard
                                            key={job._id}
                                            jobId={job._id}
                                            index={index}
                                            rawDescription={job.rawDescription}
                                            extractedData={job.extractedData}
                                            companyName={job.employer.companyName}
                                            isprofileStrength={job.employer.profileStrength}
                                            companyAddress={job.employer.companyAddress}
                                            companyWebsite={job.employer.companyWebsite}

                                        />
                                    ))}
                                </div>
                            )}

                            {/* Pagination UI - Center */}
                            {/* <div className="flex items-center justify-center mt-8">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                            disabled
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-[#38bdf8] to-[#2dd4bf] text-white font-medium cursor-pointer">
                                            1
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium cursor-pointer transition-colors">
                                            2
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium cursor-pointer transition-colors">
                                            3
                                        </button>
                                        <span className="px-2 text-gray-500">...</span>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium cursor-pointer transition-colors">
                                            10
                                        </button>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition-colors">
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

