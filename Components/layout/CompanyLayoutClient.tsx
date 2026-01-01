'use client';

import { ReactNode, useEffect, useState } from 'react';
import Navbar from '@/Components/Common/Navbar';
import Sidebar from '@/Components/Common/Sidebar';
import { SidebarProvider } from '@/Components/ui/sidebar';
import { RotatingLines } from 'react-loader-spinner';

interface CompanyLayoutClientProps {
  children: ReactNode;
}

export default function CompanyLayoutClient({ children }: CompanyLayoutClientProps) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // hide loader AFTER first client render
    setShowLoader(false);
  }, []);

  return (
    <SidebarProvider>
      {/* ✅ LOADER OVERLAY */}
      {showLoader && (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
          <RotatingLines
            strokeColor="#2563eb"   // blue like image
            strokeWidth="5"
            animationDuration="0.9"
            width="48"
            visible={true}
          />
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--profile-text-color)' }}
            >
              Loading...
            </p>
          </div>
        </div>
      )}

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
  );
}
