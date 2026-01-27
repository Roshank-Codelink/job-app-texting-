'use client';

import { ReactNode} from 'react';
import AdminNavbar from '@/Components/Admin/AdminNavbar';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import { SidebarProvider } from '@/Components/ui/sidebar';


interface AdminLayoutClientProps {
  children: ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {


  return (
    <SidebarProvider>
      {/* ✅ MAIN LAYOUT (always rendered) */}
      <div className="flex flex-col h-screen w-full">
        {/* Navbar */}
        <div className="h-[60px] w-full bg-white border-b border-[#f1f5f9] sticky top-0 z-50">
          <AdminNavbar />
        </div>

        <div className="flex flex-1 w-full min-h-0 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[280px] md:w-[310px] border-r border-[#f1f5f9] hidden md:block">
            <AdminSidebar />
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
