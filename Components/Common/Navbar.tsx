"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useSidebar } from "@/Components/ui/sidebar";
import UserProfiles from "./UserProfiles";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEmployerLogo } from "@/Providers/EmployerLogoProvider";
import companyIcon from "@/public/Company_icon_webp.webp";
import { FaBriefcase } from "react-icons/fa";

export default function Navbar() {
  const { openMobile, setOpenMobile } = useSidebar();
  const { data: session } = useSession();
  const { companyLogoUrl } = useEmployerLogo();
  const user = session?.user;

  const handleToggle = () => {
    console.log('Toggle clicked - openMobile:', openMobile);
    setOpenMobile(!openMobile);
    console.log('Setting openMobile to:', !openMobile);
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 bg-(--navbar-bg-parent)">
      <div className="left-content w-auto md:w-[11%] h-full flex items-center gap-1 sm:gap-1.5 md:gap-2 min-w-0">
        <Link
          href="/employer/dashboard"
          className="flex items-center gap-2 sm:gap-3 group"
        >
          <div className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] md:w-[38px] md:h-[38px] shrink-0 rounded-[10px] bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) flex items-center justify-center transition-transform group-hover:scale-105">
            <FaBriefcase className="w-[60%] h-[60%] text-white" />
          </div>
          <h1 className="font-bold text-[24px] sm:text-2xl md:text-3xl text-slate-900 tracking-tight">
            Jobito<span className="text-(--job-post-button-bg-to)">.</span>
          </h1>
        </Link>
      </div>
      <div className="right-content w-auto h-full flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
        {/* <div className="notification-icon shrink-0">
      <Notification />
     </div> */}
        {/* Mobile Toggle Button - After Notification - Visible only on mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="h-9 w-9 shrink-0 cursor-pointer md:hidden bg-(--navbar-bg-button) hover:bg-(--navbar-bg-button) text-(--navbar-text-color) hover:text-(--navbar-text-color) flex items-center justify-center"
          aria-label="Toggle Sidebar"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Menu
              className={cn(
                "absolute w-5 h-5 text-(--navbar-text-color) transition-all cursor-pointer duration-300 ease-in-out",
                openMobile ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X
              className={cn(
                "absolute w-5 h-5 text-(--navbar-text-color) transition-all duration-300 ease-in-out cursor-pointer",
                openMobile ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              )}
            />
          </div>
        </Button>
        {/* UserProfiles - Visible only on desktop (hidden on mobile) */}
        <div className="user-profile shrink-0 hidden md:block">
          <UserProfiles user={user} imageUrl={companyLogoUrl ?? companyIcon.src} />
        </div>
      </div>
    </div>
  );
}