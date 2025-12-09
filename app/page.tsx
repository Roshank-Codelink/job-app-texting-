"use client";
import JobPost from "@/Components/Job-Post/JobPost";
import Navbar from "@/Components/layout/Navbar";
import Sidebar from "@/Components/layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full">

        {/* Sticky Navbar */}
        <div className="h-[60px] w-full bg-white border-b border-[#f1f5f9] 
                        shrink-0 sticky top-0 z-50">
          <Navbar />
        </div>

        {/* 3-Column Layout: Sidebar - Content - Right Sidebar */}
        <div className="flex flex-1 w-full min-h-0 overflow-hidden">

          {/* Left Sidebar - Fixed width 310px on tablet and desktop */}
          <div className="w-[280px] md:w-[310px] lg:w-[310px] h-full shrink-0 border-r border-[#f1f5f9] overflow-hidden hidden md:block">
            <Sidebar />
          </div>

          {/* Main Content Area - Takes remaining space - Scrollable only when content overflows */}
          <div className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden bg-[#f8fafc] custom-scrollbar p-4 sm:p-6 md:p-8 lg:p-[32px]">
            <div className="min-h-0 ">
              <JobPost />
            </div> 
           
          </div>

          {/* Right Sidebar - Hidden on Mobile and Tablet, Visible only on XL screens */}
          <div className="hidden xl:block w-[20%] h-full shrink-0 border-l border-[#f1f5f9] overflow-hidden">
            {/* Right sidebar content */}
          </div>

        </div>
      </div>
    </SidebarProvider>
  );
}
