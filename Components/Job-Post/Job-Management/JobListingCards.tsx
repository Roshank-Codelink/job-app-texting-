"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";
import { JobListingItem } from "@/api_config/JobPostApi/type";
import { Briefcase, Eye, Heart, Award, MoreVertical, Bookmark, Edit, UserCheck, Trash2, BarChart3, Copy, Archive } from "lucide-react";
import MarkAsHiredModal from "@/Components/Common/MarkAsHiredModal.tsx";
// ✅ Three Dot Menu Component
interface ThreeDotMenuProps {
  jobId: string;
  jobStatus?: string;
  className?: string;
  onStatusUpdate?: (jobId: string, newStatus: string) => void;
}
function ThreeDotMenu({ jobId, jobStatus, className = "", onStatusUpdate }: ThreeDotMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuItems = [
    ...(jobStatus?.toLowerCase() !== "hired" ? [{ icon: UserCheck, label: "Mark as Hired", color: "text-green-600", action: () => { setIsOpen(false); setTimeout(() => { setIsModalOpen(true); }, 0); } }] : []),
    { icon: Trash2, label: "Delete", color: "text-red-600", action: () => console.log("Delete", jobId) },
  ];


  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg hover:bg-(--profile-border-color) transition-all duration-200 group cursor-pointer"
      >
        <MoreVertical className="w-5 h-5 text-(--sidebar-menu-icone-color) group-hover:text-(--navbar-text-color)" />
      </button>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-(--sidebar-bg-color) border border-(--profile-border-color) rounded-lg shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  item.action();
                  if (item.label !== "Mark as Hired") {
                    setIsOpen(false);
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-(--profile-border-color) transition-colors duration-150 text-left group cursor-pointer"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} strokeWidth={2} />
                <span className="text-sm font-medium text-(--profile-name-color) group-hover:text-(--navbar-text-color)">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
      {/* Modal outside dropdown - always rendered */}
      <MarkAsHiredModal
        jobId={jobId}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onStatusUpdate={onStatusUpdate}
      />
    </div>
  );
}
// ✅ Common Job Header
interface JobHeaderProps {
  companyName: string;
  postedTime: string;
  jobId: string;
  jobStatus?: string;
  onStatusUpdate?: (jobId: string, newStatus: string) => void;
  likeCount?: number;
  savedCount?: number;
}
function JobHeader({ companyName, postedTime, jobId, jobStatus, onStatusUpdate, likeCount, savedCount }: JobHeaderProps) {

  return (
    <CardHeader className="pb-3 pt-5 px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left - Company Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-(--post-card-bg-color) rounded-md flex items-center justify-center shrink-0">
            <span className="text-(--sidebar-bg-color) text-sm font-semibold">
              {companyName?.[0]}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-(--profile-name-color) leading-tight">
              {companyName}
            </h3>
            <p className="text-xs text-(--profile-title-color)">{postedTime}</p>
          </div>
        </div>
        {/* Right - Stats Icons + Three Dot Menu */}
        <div className="flex items-center gap-4">
          {/* Stats Cards in Boxes - Sirf large desktop pe dikhai denge, mobile/iPad pe hide */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Match Score Box */}
            <div className="relative group">
              <div className="bg-(--sidebar-bg-color) border border-(--profile-border-color) rounded-lg px-3 py-2 hover:border-(--navbar-text-color) hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-(--sidebar-menu-icone-color) group-hover:text-(--navbar-text-color) transition-all" strokeWidth={2.5} />
                  <div className="flex flex-col leading-none">
                    <span className="text-xs font-bold text-(--profile-name-color)">{likeCount || 0}</span>
                    <span className="text-[9px] text-(--profile-title-color) ">like</span>
                  </div>
                </div>
              </div>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-(--profile-name-color) text-(--sidebar-bg-color) text-[10px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                Match Score
              </span>
            </div>
            {/* Views Box */}
            <div className="relative group">
              <div className="bg-(--sidebar-bg-color) border border-(--profile-border-color) rounded-lg px-3 py-2 hover:border-(--navbar-text-color) hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Eye className="w-4 h-4 text-(--sidebar-menu-icone-color) group-hover:text-(--navbar-text-color) transition-all" strokeWidth={2.5} />
                  <div className="flex flex-col leading-none">
                    <span className="text-xs font-bold text-(--profile-name-color)">234</span>
                    <span className="text-[9px] text-(--profile-title-color)">Views</span>
                  </div>
                </div>
              </div>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-(--profile-name-color) text-(--sidebar-bg-color) text-[10px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                Total Views
              </span>
            </div>
            {/* Saved Box */}
            <div className="relative group">
              <div className="bg-(--sidebar-bg-color) border border-(--profile-border-color) rounded-lg px-3 py-2 hover:border-(--navbar-text-color) hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4 text-(--sidebar-menu-icone-color) group-hover:text-(--navbar-text-color) transition-all" strokeWidth={2.5} />
                  <div className="flex flex-col leading-none">
                    <span className="text-xs font-bold text-(--profile-name-color)">{savedCount || 0}</span>
                    <span className="text-[9px] text-(--profile-title-color)">Saved</span>
                  </div>
                </div>
              </div>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-(--profile-name-color) text-(--sidebar-bg-color) text-[10px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                Saved by Users
              </span>
            </div>
          </div>
          {/* Three Dot Menu - Last Position */}
          <ThreeDotMenu className="cursor-pointer" jobId={jobId} jobStatus={jobStatus} onStatusUpdate={onStatusUpdate} />
        </div>
      </div>
    </CardHeader>
  );
}
// Component to render job description
function JobDescription({ description }: { description: string }) {
  // Parse JSON string if needed, otherwise use HTML directly
  let htmlContent = description || '';
  try {
    if (htmlContent.trim().startsWith('"') && htmlContent.trim().endsWith('"')) {
      htmlContent = JSON.parse(htmlContent);
    }
  } catch (e) {
    // Not a JSON string, use as is
  }
  return (
    <CardContent className="pt-1 pb-4 px-6">
      <div
        className="text-[15px] text-(--profile-text-color) leading-relaxed [&>p]:mb-2 [&>p]:last:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>ol]:mb-2 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h2]:text-base [&>h2]:font-semibold [&>h2]:mb-2 [&>h3]:text-sm [&>h3]:font-semibold [&>h3]:mb-1.5"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </CardContent>
  );
}
// ✅ Main Component
interface JobListingCardsProps {
  jobs: JobListingItem[];
  onJobStatusUpdate?: (jobId: string, newStatus: string) => void;
}
export default function JobListingCards({ jobs, onJobStatusUpdate }: JobListingCardsProps) {



  console.log("jobs", jobs);
  return (
    <div className="w-full p-4 space-y-6">
      <h1 className="text-xl font-bold text-(--profile-name-color) mb-4">Recent Job Posts</h1>
      {jobs?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Briefcase className="h-12 w-12 text-(--job-post-bg-color)  mb-3" />
          <p className="text-(--profile-title-color) text-center">No job post available</p>
        </div>
      ) : (
        jobs.map((job) => {
          return (
            <Card
              key={job._id}
              className="rounded-xl border border-(--profile-border-color) shadow-sm hover:shadow-md transition-shadow duration-300 relative"
            >
              {/* Status Badge - Card ke andar top-right corner */}
              <div className="absolute top-3 right-3 z-10">
                {job.status?.toLowerCase() === "hired" ? (
                  <div className="flex items-center gap-1.5 bg-(--sidebar-bg-color) border-2 border-blue-500 rounded-full px-3 py-1 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase">{job.status}</span>
                  </div>
                ) : job.status?.toLowerCase() === "live" || job.status?.toLowerCase() === "active" ? (
                  <div className="flex items-center gap-1.5 bg-(--sidebar-bg-color) border-2 border-emerald-400 rounded-full px-3 py-1 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">{job.status}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-(--sidebar-bg-color) border-2 border-gray-400 rounded-full px-3 py-1 shadow-lg">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase">{job.status || "PENDING"}</span>
                  </div>
                )}
              </div>
              <div>
                <JobHeader
                  companyName={job?.companyName || ""}
                  postedTime="Recently"
                  jobId={job._id}
                  jobStatus={job.status}
                  onStatusUpdate={onJobStatusUpdate}
                  likeCount={job.likeCount}
                  savedCount={job?.savedCount || 0}
                />
                <JobDescription description={job.rawDescription} />
                {/* Stats Cards - Mobile aur iPad me bottom pe dikhenge */}
                <div className="lg:hidden px-6 pb-4">
                  <div className="flex items-center justify-around gap-2 pt-3 border-t border-(--profile-border-color)">
                    {/* Match Score Box */}
                    <div className="relative group flex-1">
                      <div className="bg-(--sidebar-bg-color) border border-(--profile-border-color) rounded-lg px-2.5 py-2 hover:border-(--navbar-text-color) hover:shadow-md transition-all duration-200 cursor-pointer">
                        <div className="flex items-center justify-center gap-2">
                          <Heart className="w-4 h-4 text-(--sidebar-menu-icone-color) group-hover:text-(--navbar-text-color) transition-all" strokeWidth={2.5} />
                          <div className="flex flex-col leading-none">
                            <span className="text-xs font-bold text-(--profile-name-color)">{job?.likeCount || 0}</span>
                            <span className="text-[9px] text-(--profile-title-color)">like</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Views Box */}
                    <div className="relative group flex-1">
                      <div className="bg-(--sidebar-bg-color) border border-(--profile-border-color) rounded-lg px-2.5 py-2 hover:border-(--navbar-text-color) hover:shadow-md transition-all duration-200 cursor-pointer">
                        <div className="flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4 text-(--sidebar-menu-icone-color) group-hover:text-(--navbar-text-color) transition-all" strokeWidth={2.5} />
                          <div className="flex flex-col leading-none">
                            <span className="text-xs font-bold text-(--profile-name-color)">234</span>
                            <span className="text-[9px] text-(--profile-title-color)">Views</span>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* Saved Box */}
                    <div className="relative group flex-1">
                      <div className="bg-(--sidebar-bg-color) border border-(--profile-border-color) rounded-lg px-2.5 py-2 hover:border-(--navbar-text-color) hover:shadow-md transition-all duration-200 cursor-pointer">
                        <div className="flex items-center justify-center gap-2">
                          <Bookmark className="w-4 h-4 text-(--sidebar-menu-icone-color) group-hover:text-(--navbar-text-color) transition-all" strokeWidth={2.5} />
                          <div className="flex flex-col leading-none">
                            <span className="text-xs font-bold text-(--profile-name-color)">{job?.savedCount || 0}</span>
                            <span className="text-[9px] text-(--profile-title-color)">Saved</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}  