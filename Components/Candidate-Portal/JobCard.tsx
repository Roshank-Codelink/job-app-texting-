"use client"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal, ThumbsUp, Share2, Bookmark, Flag, Copy } from "lucide-react"
import Image from "next/image"

interface JobCardProps {
  rawDescription?: string
  companyLogo?: string
  companyName?: string
  isVerified?: boolean
  jobId?: string
  index?: number
}

export default function JobCard({ rawDescription, companyLogo, companyName, isVerified }: JobCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Company Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={companyLogo || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
            className="w-12 h-12 rounded-full bg-gray-100 p-1 object-contain border border-gray-200"
            alt={companyName || "Company"}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            }}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-gray-900">{companyName || "Company Name"}</p>
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
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 top-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Job Content */}
      <div className="px-4 pb-4">
        <div
          className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap [&_p]:mb-2 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-bold [&_strong]:text-gray-900 [&_a]:text-blue-600 [&_a]:font-semibold [&_a]:hover:underline [&_a]:break-all [&_img]:rounded-lg [&_img]:my-2 [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: rawDescription || "" }}
        />
      </div>
    </div>
  )
}
