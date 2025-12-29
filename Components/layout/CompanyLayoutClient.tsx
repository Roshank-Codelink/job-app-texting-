'use client';

import { ReactNode } from 'react';
import Navbar from '@/Components/Common/Navbar';
import Sidebar from '@/Components/Common/Sidebar';  
import { SidebarProvider } from '@/Components/ui/sidebar';

interface CompanyLayoutClientProps {
  children: ReactNode;
}

export default function CompanyLayoutClient({ children }: CompanyLayoutClientProps) {
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
        <div className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden bg-[#f8fafc] custom-scrollbar  relative">
          <div className="min-h-0 ">
            {children}
          </div> 
         
        </div>
      </div>
    </div>
    </SidebarProvider>
  );
}