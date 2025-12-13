"use client";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";
import { JobListingItem } from "@/api/JobPostApi/type";
import { Briefcase } from "lucide-react";

// ✅ Common Job Header
interface JobHeaderProps {
  companyName: string;
  postedTime: string;
}

function JobHeader({ companyName, postedTime }: JobHeaderProps) {
  const userImageUrl =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face";

  return (
    <CardHeader >
      <div className="flex items-start justify-between">
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

        <div className="shrink-0">
          <span className="text-xs text-emerald-700 bg-emerald-100 rounded-md px-2 py-1 font-medium">Live</span>
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
    <CardContent 
      className="pt-0 pb-2 text-[15px] text-(--profile-text-color) leading-relaxed"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

// ✅ Main Component
interface JobListingCardsProps {
  jobs: JobListingItem[];
}

export default function JobListingCards({ jobs }: JobListingCardsProps) {
  return (
    <div className="w-full p-4 space-y-6">
      <h1 className="text-xl font-bold text-(--profile-name-color) mb-4">Recent Job Posts</h1>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Briefcase className="h-12 w-12 text-(--job-post-bg-color)  mb-3" />
          <p className="text-(--profile-title-color) text-center">No job post available</p>
        </div>
      ) : (
        jobs.map((job) => {
          return (
            <Card 
              key={job._id} 
              className="rounded-xl border border-(--profile-border-color) shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <JobHeader 
                companyName="CodeLink Infotech" 
                postedTime="Recently" 
              />
              <JobDescription description={job.rawDescription} />
            </Card>
          );
        })
      )}
    </div>
  );
}
