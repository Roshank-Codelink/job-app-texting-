"use client"

import { useState } from "react"
import { ThumbsUp, Bookmark, TrendingUp, ShieldCheck } from "lucide-react"
import Image from "next/image"
import JobDescription from "./JobDescription"

interface JobCardProps {
  rawDescription?: string
  companyLogo?: string
  companyName?: string
  isVerified?: boolean
  jobId?: string
  index?: number
  badge?: "growing" | "trusted"
}

export default function JobCard({ rawDescription, companyLogo, companyName, isVerified, badge }: JobCardProps) {
  const [isSliderOpen, setIsSliderOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Company Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={companyLogo || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
              className="w-12 h-12 rounded-full bg-gray-100 p-1 object-contain border border-gray-200"
              alt={companyName || "Company"}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              }}
            />
            {badge === "growing" && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-green-500">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
              </div>
            )}
            {badge === "trusted" && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-blue-500">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p 
                className="font-semibold text-gray-900 cursor-pointer hover:text-[#0ea5e9] transition-colors"
                onClick={() => setIsSliderOpen(true)}
              >
                {companyName || "Company Name"}
              </p>
              {isVerified && (
                <Image 
                  src="/verify.svg" 
                  alt="Verified" 
                  width={16} 
                  height={16} 
                  className="w-4 h-4"
                />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Hiring • Now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-all duration-200 ${
              isLiked 
                ? 'bg-[#f0f9ff] text-[#0ea5e9] hover:bg-[#e0f2fe]' 
                : 'text-gray-500 hover:text-[#0ea5e9] hover:bg-[#f0f9ff]'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full transition-all duration-200 ${
              isSaved 
                ? 'bg-[#f0fdf4] text-[#2dd4bf] hover:bg-[#ecfdf5]' 
                : 'text-gray-500 hover:text-[#2dd4bf] hover:bg-[#f0fdf4]'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
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
        companyLogo={companyLogo}
        isVerified={isVerified}
        rawDescription={rawDescription}
        badge={badge}
      />
    </div>
  )
}
