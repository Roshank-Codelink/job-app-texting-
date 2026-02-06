'use client';

import { ReactNode } from 'react';
import Navbar from '@/Components/Common/Navbar';
import Sidebar from '@/Components/Common/Sidebar';
import { SidebarProvider } from '@/Components/ui/sidebar';
import { EmployerLogoProvider } from '@/Providers/EmployerLogoProvider';

interface CompanyLayoutClientProps {
  children: ReactNode;
}

export default function CompanyLayoutClient({ children }: CompanyLayoutClientProps) {
  return (
    <EmployerLogoProvider>
    <SidebarProvider>
      {/* ✅ MAIN LAYOUT (always rendered) */}
      <div className="flex flex-col h-screen w-full">
        {/* Navbar */}
        <div className="h-[60px] w-full bg-white border-b border-[#f1f5f9] sticky top-0 z-50">
          <Navbar />
        </div>

        <div className="flex flex-1 w-full min-h-0 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[280px] md:w-[310px] border-r border-[#f1f5f9] hidden md:block">
            <Sidebar />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-[#f8fafc] custom-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
    </EmployerLogoProvider>
  );
}
