"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, ChevronDown, ChevronRight, LogOut, Menu, User, X } from "lucide-react";
import { FaBriefcase } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/Components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { LogoutAPI } from "@/api_config/shared/sharedapi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

export default function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  const { data, status } = useSession();
  console.log(data, status);
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  const handleNavigation = () => {
    setIsSidebarOpen(false);
  };

  function UserProfile() {
    const handleLogout = async () => {
      await LogoutAPI();
      signOut({ redirect: true, callbackUrl: "/candidate-signin" });
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 px-2 py-1 rounded-full border border-slate-200 bg-white cursor-pointer hover:shadow-sm transition-all outline-none">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                alt="profile"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown className="h-4 w-4 text-slate-600" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-44 p-2 shadow-xl border-slate-100" align="end">
          <div className="sr-only">User profile options</div>
          <Link
            href="/candidate/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-50 transition-colors"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/candidate/save-jobs"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-50 transition-colors"
          >
            <Bookmark className="h-4 w-4" />
            Saved Jobs
          </Link>
          <div className="h-px bg-slate-100 my-1" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-center bg-white border-b border-slate-100/50">
      <div className="w-full max-w-7xl h-full flex items-center justify-between relative px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] md:w-[38px] md:h-[38px] shrink-0 rounded-[10px] bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) flex items-center justify-center">
              <FaBriefcase className="w-[60%] h-[60%] text-white" />
            </div>
            <h1 className="font-bold text-[24px] sm:text-2xl md:text-3xl text-slate-900 tracking-tight">
              Jobito
              <span className="text-(--job-post-button-bg-to)">.</span>
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[15px] sm:text-[15px]  text-(--navbar-menu-text) lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link
              href={status === "authenticated" ? "/candidate/jobs" : "/candidate/jobs"}
              className={`cursor-pointer transition-colors duration-200 delay-200 ${isActive("/how-it-works")
                ? "text-(--job-post-button-bg-to) font-medium"
                : "hover:text-(--job-post-button-bg-to)"
                }`}
            >
              {status === "authenticated" ? "Jobs" : "Find Jobs"}
            </Link>
            <Link
              href="/smart-feed"
              className={`cursor-pointer transition-colors duration-200 delay-200 ${isActive("/smart-feed")
                ? "text-(--job-post-button-bg-to) font-medium"
                : "hover:text-(--job-post-button-bg-to)"
                }`}
            >
              Smart Feed
            </Link>
            <Link
              href="/employer-hub"
              className={`cursor-pointer transition-colors duration-200 delay-200 ${isActive("/employer-hub")
                ? "text-(--job-post-button-bg-to) font-medium"
                : "hover:text-(--job-post-button-bg-to)"
                }`}
            >
              For Employers
            </Link>
            <Link
              href="/candidate/jobs"
              className={`cursor-pointer transition-colors duration-200 delay-200 ${isActive("/candidate/jobs")
                ? "text-(--job-post-button-bg-to) font-medium"
                : "hover:text-(--job-post-button-bg-to)"
                }`}
            >
              For Candidates
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {status === "authenticated" && data.user.role === "EMPLOYEE" ? (
            <>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/employer-hub "
                className="cursor-pointer hidden sm:inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[15px] sm:text-base font-semibold text-(--navbar-menu-text) transition-all duration-200 hover:text-(--job-post-button-bg-to) hover:bg-(--navbar-login-color) hover:border hover:border-(--job-post-button-bg-to)"
              >
                Employer Login
              </Link>
              <Link
                href="/candidate-signin"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-[15px] sm:text-base font-semibold rounded-[5px] text-white bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) border border-(--job-post-button-bg-to)  transition-all duration-200 hover:bg-none hover:text-(--job-post-button-bg-to)"
              >
                Candidate Login
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md bg-(--navbar-bg-button) hover:bg-(--navbar-bg-button) text-(--navbar-text-color) cursor-pointer"
            aria-label="Open navigation menu"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5 text-(--navbar-text-color)" />
            ) : (
              <Menu className="h-5 w-5 text-(--navbar-text-color)" />
            )}
          </button>
        </div>
      </div>

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 bg-transparent border-none">
          <div className="flex flex-col h-full bg-white rounded-tr-2xl relative">
            <SheetClose className="absolute -right-10 top-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-(--job-post-icone-color) cursor-pointer">
              <X className="h-5 w-5 text-(--profile-menu-text-color)" />
            </SheetClose>
            <SheetHeader className="px-4 py-3 border-b border-(--profile-image-border-color)">

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 sm:gap-3"
                  onClick={handleNavigation}
                >
                  <div className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] md:w-[38px] md:h-[38px] shrink-0 rounded-[10px] bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) flex items-center justify-center">
                    <FaBriefcase className="w-[60%] h-[60%] text-white" />
                  </div>
                  <SheetTitle className="text-lg font-semibold text-(--navbar-logo-text-color)">
                    Jobito<span className="text-(--job-post-button-bg-to)">.</span>
                  </SheetTitle>
                </Link>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <nav className="space-y-2 text-[15px] text-(--profile-menu-text-color)">
                {[
                  { name: status === "authenticated" ? "Jobs" : "Find Jobs", path: status === "authenticated" ? "/candidate/jobs" : "/candidate/jobs" },
                  { name: "Smart Feed", path: "/smart-feed" },
                  { name: "For Employers", path: "/employer-hub" },
                  { name: "For Candidates", path: "/candidate/jobs" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    onClick={handleNavigation}
                    className={`block w-full text-left cursor-pointer px-4 py-2 rounded-lg transition-all ${isActive(item.path)
                      ? "bg-(--navbar-bg-button) text-(--navbar-text-color) font-medium border-r-[3px] border-(--navbar-text-color)"
                      : "bg-transparent text-(--profile-menu-text-color) hover:bg-(--navbar-bg-button) hover:text-(--navbar-text-color)"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            {status === "authenticated" ? (
              ""
            ) : (
              <div className="px-4 py-3 border-t border-(--profile-image-border-color) flex flex-row gap-2 sm:hidden">
                <Link
                  href="/employer-signin"
                  className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-[12px] font-semibold rounded-[5px] border border-(--job-post-button-bg-to) text-(--job-post-button-bg-to) cursor-pointer transition-colors whitespace-nowrap"
                >
                  Employer Login
                </Link>
                <Link
                  href="/candidate-signin"
                  className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-[12px] font-semibold rounded-[5px] border border-(--job-post-button-bg-to) text-(--job-post-button-bg-to) cursor-pointer transition-colors whitespace-nowrap"
                >
                  Candidate Login
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
