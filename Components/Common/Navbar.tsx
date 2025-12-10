"use client";

import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useSidebar } from "@/Components/ui/sidebar";
import Notification from "./Notification";
import UserProfiles from "./UserProfiles";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";


export default function Navbar() {
  const { openMobile, setOpenMobile } = useSidebar();

  const handleToggle = () => {
    console.log('Toggle clicked - openMobile:', openMobile);
    setOpenMobile(!openMobile);
    console.log('Setting openMobile to:', !openMobile);
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 bg-white">
       <div className="left-content w-auto md:w-[11%] h-full flex items-center gap-1 sm:gap-1.5 md:gap-2 min-w-0">
       <div className="logo w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] md:w-[29px] md:h-[29px] shrink-0">
        <Image src="/icons/icon-192x192.png" alt="logo" width={100} height={100} className="w-full h-full" />
       </div>
       <div className="logo-text min-w-0">
        <h1 className="font-bold text-base sm:text-lg md:text-xl text-[#1e293b] whitespace-nowrap">TalentFlow</h1>
       </div>

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
       className="h-9 w-9 shrink-0 md:hidden bg-[#f0f9ff] hover:bg-[#f0f9ff] text-[#0ea5e9] hover:text-[#0ea5e9] flex items-center justify-center"
       aria-label="Toggle Sidebar"
     >
       <div className="relative w-5 h-5 flex items-center justify-center">
         <Menu  
           className={cn(
             "absolute w-5 h-5 text-[#0ea5e9] transition-all duration-300 ease-in-out",
             openMobile ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
           )} 
         />
         <X 
           className={cn(
             "absolute w-5 h-5 text-[#0ea5e9] transition-all duration-300 ease-in-out",
             openMobile ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
           )} 
         />
       </div>
     </Button>
    {/* UserProfiles - Visible only on desktop (hidden on mobile) */}
    <div className="user-profile shrink-0 hidden md:block">
      <UserProfiles />
    </div>
   


       </div>





      
    </div>
  );
}