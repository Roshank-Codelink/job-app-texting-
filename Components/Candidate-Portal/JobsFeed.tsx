"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Search, Briefcase, MapPin } from "lucide-react"
import JobFilters from "./JobFilters"
import FiltersSidebar from "./FiltersSidebar"
import JobCard from "./JobCard"
import {JobsApiResponse} from "@/types/types"

interface EmployerProfile {
    name: string
    logo: string
    verified: boolean
    badge?: "growing" | "trusted"
}

interface JobData {
    _id: string
    employerProfile: EmployerProfile
    rawDescription: string
    status: string
}

// export const jobs: JobData[] = [
//     {
//         _id: "job001",
//         employerProfile: {
//             name: "NorthByte Technologies",
//             logo: "https://cdn-icons-png.flaticon.com/512/5968/5968264.png",
//             verified: true,
//             badge: "growing"
//         },
//         status: "Live",
//         rawDescription: `<p>NorthByte Technologies is expanding team and inviting skilled professionals and motivated IT students to apply.<br><br>Open positions:<br>– Frontend Developer Intern (Freshers)<br>– Full Stack Developer (1–2 years)<br>– UI/UX Designer (0–1 years)<br>– Internship opportunities in React, Node.js & Web Design<br>(Only IT students can apply for internships)<br><br>Remote work available. Candidates from Canada will be prioritized.<br>📩 careers@northbyte.com | 📍 Canada (Remote)<br><br><a href="#"><strong>#WeAreHiring</strong></a> <a href="#"><strong>#NorthByteTechnologies</strong></a> <a href="#"><strong>#ITCareers</strong></a> <a href="#"><strong>#CanadaJobs</strong></a> <a href="#"><strong>#HiringNow</strong></a> <a href="#"><strong>#Internships</strong></a></p>`
//     },
//     {
//         _id: "job002",
//         employerProfile: {
//             name: "MapleSoft Labs",
//             logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
//             verified: true,
//             badge: "trusted"
//         },
//         status: "Live",
//         rawDescription: `<p>🚀💻 MapleSoft Labs is Hiring! 💻🚀<br><br>💼 Position: Full Stack Web Developer (React.js & Node.js)<br>📍 Location: Toronto, Canada (Remote)<br>🕒 Experience: 1 – 2 Years<br><br>About the Role<br><br>We're looking for a passionate and detail-oriented Full Stack Developer with strong fundamentals in React.js and Node.js to join our team. If you have solid skills in frontend and backend technologies and a good grasp of REST APIs, we'd love to hear from you!<br><br>📍 Candidates must be based in Canada<br><br>📩 Interested?<br>share your resume via WhatsApp at: +1-234-567-8900<br><br><a href="#"><strong>#MapleSoftLabs</strong></a> <a href="#"><strong>#Canada</strong></a> <a href="#"><strong>#Hiring</strong></a> <a href="#"><strong>#JobOpening</strong></a> <a href="#"><strong>#FullStackDeveloper</strong></a> <a href="#"><strong>#ReactJS</strong></a> <a href="#"><strong>#NodeJS</strong></a> <a href="#"><strong>#SoftwareEngineer</strong></a> <a href="#"><strong>#CareerOpportunity</strong></a> <a href="#"><strong>#Jobs</strong></a> <a href="#"><strong>#JobSearch</strong></a></p>`
//     },
//     {
//         _id: "job003",
//         employerProfile: {
//             name: "PolarStack Solutions",
//             logo: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
//             verified: true,
//             badge: "growing"
//         },
//         status: "Live",
//         rawDescription: `<p>🚨 URGENT HIRING – PolarStack Solutions 🚨<br><br>🎉 Multiple Open Positions – Join Our Growing Team! 🎉<br>Are you looking to kick-start or grow your career in the IT industry?<br>PolarStack Solutions is hiring <a href="#"><strong>#Passionate</strong></a>, <a href="#"><strong>#skilled</strong></a>, and <a href="#"><strong>#motivated</strong></a> professionals to join our expanding team.<br><br>📍 Location Requirement:<br><br>👉 Only Canada-based candidates are eligible to apply.<br><br>🔎 Current Openings<br><br>📌 UI/UX Designer<br>🔴 Experience: 1 to 2 Years<br><br>📌 Frontend Developer<br>🔴 Experience: Fresher to 2 Years<br><br>📌 React Developer<br>🔴 Experience: Fresher to 2 Years<br><br>📌 Design Team Leader<br>🔴 Experience: 2+ Years<br><br>🏢 Office Location:<br>📍 Vancouver, Canada<br><br>⏩ Interested candidates can share their CV at:<br>✉️ jobs@polarstack.com<br>📞 +1-345-678-9012<br><br>🌟 Don't miss this opportunity—grow your career with us! 🌟<br><br><a href="#"><strong>#PolarStackSolutions</strong></a> <a href="#"><strong>#HiringNow</strong></a> <a href="#"><strong>#WeAreHiring</strong></a> <a href="#"><strong>#CareerOpportunity</strong></a> <a href="#"><strong>#ITJobsCanada</strong></a> <a href="#"><strong>#CanadaJobs</strong></a> <a href="#"><strong>#FreshersJobs</strong></a> <a href="#"><strong>#Hiring</strong></a> <a href="#"><strong>#UIDesignerJobs</strong></a> <a href="#"><strong>#UXDesignerJobs</strong></a> <a href="#"><strong>#ReactDeveloperJobs</strong></a> <a href="#"><strong>#FrontendDeveloper</strong></a> <a href="#"><strong>#SoftwareDeveloper</strong></a></p>`
//     },
//     {
//         _id: "job004",
//         employerProfile: {
//             name: "NovaWave Digital",
//             logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
//             verified: true,
//             badge: "trusted"
//         },
//         status: "Live",
//         rawDescription: `<p>NovaWave Digital is expanding team and inviting skilled professionals and motivated IT students to apply.<br><br>Open positions:<br>– UI Developer (Freshers to 1 year)<br>– Frontend Developer (1–2 years)<br>– UX Designer (0–1 years)<br>– Internship opportunities in React, HTML/CSS & Web Design<br>(Only IT students can apply for internships)<br><br>Remote work available. Local candidates from Montreal will be prioritized.<br>📩 jobs@novawave.com | 📍 Montreal, Canada<br><br><a href="#"><strong>#WeAreHiring</strong></a> <a href="#"><strong>#NovaWaveDigital</strong></a> <a href="#"><strong>#ITCareers</strong></a> <a href="#"><strong>#MontrealJobs</strong></a> <a href="#"><strong>#HiringNow</strong></a> <a href="#"><strong>#Internships</strong></a></p>`
//     },
//     {
//         _id: "job005",
//         employerProfile: {
//             name: "CloudNest Technologies",
//             logo: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
//             verified: true,
//             badge: "growing"
//         },
//         status: "Live",
//         rawDescription: `<p>🚀💻 CloudNest Technologies is Hiring! 💻🚀<br><br>💼 Position: Frontend Developer Intern (React.js)<br>📍 Location: Canada (Remote)<br>🕒 Experience: Freshers – 1 Year<br><br>About the Role<br><br>We're looking for a passionate and detail-oriented Frontend Developer Intern with strong fundamentals in React.js to join our team. If you have solid skills in frontend technologies and a good grasp of HTML, CSS, and JavaScript, we'd love to hear from you!<br><br>📍 Candidates must be based in Canada<br><br>📩 Interested?<br>share your resume via WhatsApp at: +1-456-789-0123<br><br><a href="#"><strong>#CloudNestTechnologies</strong></a> <a href="#"><strong>#Canada</strong></a> <a href="#"><strong>#Hiring</strong></a> <a href="#"><strong>#JobOpening</strong></a> <a href="#"><strong>#FrontendDeveloper</strong></a> <a href="#"><strong>#ReactJS</strong></a> <a href="#"><strong>#Internship</strong></a> <a href="#"><strong>#SoftwareEngineer</strong></a> <a href="#"><strong>#CareerOpportunity</strong></a> <a href="#"><strong>#Jobs</strong></a> <a href="#"><strong>#JobSearch</strong></a></p>`
//     }
// ]

export default function JobsFeed({ jobs }:{jobs:JobsApiResponse} ) {



  
    const searchParams = useSearchParams()
    const urlSearchValue = decodeURIComponent(searchParams.get('text') || '')
    
    const [activeFilters, setActiveFilters] = React.useState<string[]>(["Work from home"])
    const [datePosted, setDatePosted] = React.useState("all")
    const [salaryRange, setSalaryRange] = React.useState(0)
    const [workMode, setWorkMode] = React.useState<string[]>(["work_from_home"])
    const [workType, setWorkType] = React.useState<string[]>([])
    const [categories, setCategories] = React.useState<string[]>([])

    // Filter only Live jobs
    // const liveJobs = jobs.filter(job => job.status === "Live")


    // const getFilterHandlers = () => {
    //     const formatSalary = (value: number) => {
    //         if (value >= 100000) {
    //             return `₹${(value / 100000).toFixed(1)} Lakhs`
    //         }
    //         return `₹${value.toLocaleString('en-IN')}`
    //     }

    //     return {
    //         handleRemoveFilter: (filter: string) => {
    //             setActiveFilters(activeFilters.filter((f) => f !== filter))
    //             if (filter === "Work from home") {
    //                 setWorkMode(workMode.filter((m) => m !== "work_from_home"))
    //             } else if (filter === "Work from office") {
    //                 setWorkMode(workMode.filter((m) => m !== "work_from_office"))
    //             } else if (filter === "Work from field") {
    //                 setWorkMode(workMode.filter((m) => m !== "work_from_field"))
    //             }
    //             if (filter.startsWith("Salary: ")) {
    //                 setSalaryRange(0)
    //             }
    //             if (filter.startsWith("Date: ")) {
    //                 setDatePosted("all")
    //             }
    //             if (filter === "Full time") {
    //                 setWorkType(workType.filter((t) => t !== "full_time"))
    //             } else if (filter === "Part time") {
    //                 setWorkType(workType.filter((t) => t !== "part_time"))
    //             } else if (filter === "Contract") {
    //                 setWorkType(workType.filter((t) => t !== "contract"))
    //             }
    //         },
    //         handleClearAll: () => {
    //             setActiveFilters([])
    //             setDatePosted("all")
    //             setSalaryRange(0)
    //             setWorkMode([])
    //             setWorkType([])
    //             setCategories([])
    //         },
    //         handleDatePostedChange: (value: string) => {
    //             setDatePosted(value)
    //             const filtered = activeFilters.filter(f => !f.startsWith("Date: "))
    //             if (value !== "all") {
    //                 const dateLabels: { [key: string]: string } = {
    //                     "24h": "Date: Last 24 hours",
    //                     "3d": "Date: Last 3 days",
    //                     "7d": "Date: Last 7 days"
    //                 }
    //                 const dateLabel = dateLabels[value]
    //                 if (dateLabel) {
    //                     setActiveFilters([...filtered, dateLabel])
    //                 } else {
    //                     setActiveFilters(filtered)
    //                 }
    //             } else {
    //                 setActiveFilters(filtered)
    //             }
    //         },
    //         handleSalaryRangeChange: (value: number) => {
    //             setSalaryRange(value)
    //             const filtered = activeFilters.filter(f => !f.startsWith("Salary: "))
    //             if (value > 0) {
    //                 const salaryLabel = formatSalary(value)
    //                 setActiveFilters([...filtered, salaryLabel])
    //             } else {
    //                 setActiveFilters(filtered)
    //             }
    //         },
    //         handleWorkModeChange: (value: string) => {
    //             if (workMode.includes(value)) {
    //                 setWorkMode(workMode.filter((m) => m !== value))
    //                 const filterLabel = value === "work_from_home" ? "Work from home" :
    //                     value === "work_from_office" ? "Work from office" :
    //                         "Work from field"
    //                 setActiveFilters(activeFilters.filter((f) => f !== filterLabel))
    //             } else {
    //                 setWorkMode([...workMode, value])
    //                 const filterLabel = value === "work_from_home" ? "Work from home" :
    //                     value === "work_from_office" ? "Work from office" :
    //                         "Work from field"
    //                 if (!activeFilters.includes(filterLabel)) {
    //                     setActiveFilters([...activeFilters, filterLabel])
    //                 }
    //             }
    //         },
    //         handleWorkTypeChange: (value: string) => {
    //             if (workType.includes(value)) {
    //                 setWorkType(workType.filter((t) => t !== value))
    //                 const filterLabel = value === "full_time" ? "Full time" :
    //                     value === "part_time" ? "Part time" :
    //                         "Contract"
    //                 setActiveFilters(activeFilters.filter((f) => f !== filterLabel))
    //             } else {
    //                 setWorkType([...workType, value])
    //                 const filterLabel = value === "full_time" ? "Full time" :
    //                     value === "part_time" ? "Part time" :
    //                         "Contract"
    //                 if (!activeFilters.includes(filterLabel)) {
    //                     setActiveFilters([...activeFilters, filterLabel])
    //                 }
    //             }
    //         },
    //         handleCategoryChange: (value: string) => {
    //             if (categories.includes(value)) {
    //                 setCategories(categories.filter((c) => c !== value))
    //             } else {
    //                 setCategories([...categories, value])
    //             }
    //         }
    //     }
    // }

     const [searchQuery, setSearchQuery] = React.useState(urlSearchValue)
const router = useRouter()

    const handleSearch = React.useCallback(() => {
  const value = searchQuery.trim()
  if (!value) return
  router.push(`/candidate/jobs?text=${encodeURIComponent(value)}`)
}, [searchQuery, router])




    // const handlers = getFilterHandlers()
  const SearchBar=React.useMemo(() => {
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
                        <JobFilters />
                    </div>
                    <div className="mb-6">
                        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 mb-2">
                            Showing {jobs.data.length} jobs based on your filter
                        </h1>
                        <p className="text-xs md:text-sm text-gray-600">
                            Discover your next opportunity
                        </p>
                    </div>

                    {/* Main Content - Two Column Layout */}
                    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 md:flex-row">
                        {/* Left Sidebar - Filters (iPad and Desktop only, not mobile) */}
                        <div className="hidden md:block shrink-0">
                            <FiltersSidebar/>
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

