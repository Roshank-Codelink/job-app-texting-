"use client"

import { useState } from "react"
import { ThumbsUp, Bookmark, TrendingUp, ShieldCheck } from "lucide-react"
import Image from "next/image"
import JobDescription from "./JobDescription"

interface JobCardProps {
  extractedData: {
    jobTitle: string,
    workMode: string | null
  }
  rawDescription?: string
  companyLogo?: string
  companyName?: string
  isVerified?: string | undefined
  jobId?: string
  index?: number
  isprofileStrength?: string
  companyAddress?: string,
  companyWebsite?: string
}

export default function JobCard({ rawDescription, companyLogo, companyName, isVerified, isprofileStrength, extractedData, companyAddress, companyWebsite }: JobCardProps) {
  const [isSliderOpen, setIsSliderOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  return (
    <div className="bg-white rounded-[10px] border border-gray-200 shadow-sm overflow-hidden">
      {/* Company Header */}
      <div className="relative p-3 sm:p-4">

        {/* RIGHT TOP ACTIONS */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 z-10">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 cursor-pointer ${isLiked
                ? "bg-[#f0f9ff] text-[#0ea5e9]"
                : "text-gray-500 hover:text-[#0ea5e9] hover:bg-[#f0f9ff]"
              }`}
          >
            <ThumbsUp className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 cursor-pointer ${isSaved
                ? "bg-[#f0fdf4] text-[#2dd4bf]"
                : "text-gray-500 hover:text-[#2dd4bf] hover:bg-[#f0fdf4]"
              }`}
          >
            <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* LEFT SIDE */}
        <div className="flex items-start sm:items-center gap-3 pr-14 sm:pr-20">

          {/* LOGO */}
          <div className="relative shrink-0">
            <img
              src={companyLogo || "/Company_icon_webp.webp"}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] bg-gray-100 p-1 object-contain border border-gray-200"
              alt={companyName || "Company"}
            />

            {isprofileStrength === "Growing" && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-green-500">
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
              </div>
            )}

            {isprofileStrength === "Trusted" && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-blue-500">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
              </div>
            )}
          </div>

          {/* TEXT */}
          <div className="min-w-0">
            <p
              className="font-semibold text-gray-900 cursor-pointer hover:text-[#0ea5e9] transition-colors text-sm sm:text-base line-clamp-2"
              onClick={() => setIsSliderOpen(true)}
            >
              {extractedData.jobTitle}
            </p>

            <div className="flex items-center gap-1 mt-0.5">
              <p className="text-xs text-gray-500 truncate">{companyName}</p>
              <Image
                src="/verify.svg"
                alt="Verified"
                width={14}
                height={14}
                className="w-3.5 h-3.5"
              />
            </div>

            <p className="text-xs text-gray-500 mt-0.5">Hiring • Now</p>
          </div>
        </div>
      </div>


      {/* Job Content */}
      <div className="px-4 pb-4">
        <div
          className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap [&_p]:mb-2 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-bold [&_strong]:text-gray-900 [&_a]:text-blue-600 [&_a]:font-semibold [&_a]:no-underline [&_a]:break-all [&_img]:rounded-lg [&_img]:my-2 [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: rawDescription || "" }}
        />
      </div>

      {/* Job Description Slider */}
      <JobDescription
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
        companyName={companyName}
        isprofileStrength={isprofileStrength}
        companyLogo={companyLogo}
        isVerified={isVerified}
        rawDescription={rawDescription}
        extractedData={extractedData}
        companyWebsite={companyWebsite}
        companyAddress={companyAddress}
      />
    </div>
  )
}
