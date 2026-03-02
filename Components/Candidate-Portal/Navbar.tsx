"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, ChevronDown, Bookmark } from "lucide-react";
import { FaBriefcase } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { LogoutAPI } from "@/api_config/shared/sharedapi";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/Components/ui/sheet";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

/* =======================
   Profile Dropdown Component
======================= */
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

/* =======================
   Main Navbar Component
======================= */
export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  const handleNavigation = () => {
    setIsSidebarOpen(false);
  };

  // UPDATED: Dynamic Link logic
  const navLinks = [
    {
      name: isLoggedIn ? "Jobs" : "Find Jobs", path: isLoggedIn ? "/candidate/jobs" : "/candidate/jobs"
    },
    { name: "Smart Feed", path: "/smart-feed" },
    { name: "For Employers", path: "/employer-hub" }, // Landing Page
    {
      name: "For Candidates", path: "/candidate-signin"
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-center bg-white border-b border-slate-100/50">
      <div className="w-full max-w-7xl h-full flex items-center justify-between relative px-4 sm:px-6 md:px-8">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] md:w-[38px] md:h-[38px] shrink-0 rounded-[10px] bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) flex items-center justify-center transition-transform group-hover:scale-105">
              <FaBriefcase className="w-[60%] h-[60%] text-white" />
            </div>
            <h1 className="font-bold text-[24px] sm:text-2xl md:text-3xl text-slate-900 tracking-tight">
              Jobito<span className="text-(--job-post-button-bg-to)">.</span>
            </h1>
          </Link>

          {/* CENTER MENU: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] text-(--navbar-menu-text) lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`cursor-pointer transition-colors duration-200 ${isActive(item.path)
                  ? "text-(--job-post-button-bg-to) font-medium"
                  : "hover:text-(--job-post-button-bg-to)"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* RIGHT: Buttons or Profile */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/employer-signin"
                className="cursor-pointer hidden sm:inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[15px] sm:text-base font-semibold text-(--navbar-menu-text) transition-all duration-200 hover:text-(--job-post-button-bg-to) hover:bg-(--navbar-login-color) hover:border hover:border-(--job-post-button-bg-to)"
              >
                Employer Login
              </Link>

              <Link
                href="/candidate-signin"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-[15px] sm:text-base font-semibold rounded-[5px] text-white bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) border border-(--job-post-button-bg-to) transition-all duration-200 hover:bg-none hover:text-(--job-post-button-bg-to)"
              >
                Candidate Login
              </Link>
            </>
          ) : (
            <UserProfile />
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md bg-(--navbar-bg-button) text-(--navbar-text-color) transition-colors hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR (Sheet) */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 bg-transparent border-none w-[280px]">
          <div className="flex flex-col h-full bg-white rounded-tr-2xl relative shadow-2xl">
            <div className="sr-only">
              <SheetHeader>
                <SheetTitle>Jobito Navigation</SheetTitle>
                <SheetDescription>Access all pages and login options</SheetDescription>
              </SheetHeader>
            </div>

            <SheetClose className="absolute -right-10 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-slate-600 outline-none">
              <X className="h-5 w-5" />
            </SheetClose>

            <SheetHeader className="px-5 py-5 border-b text-left">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-3"
                onClick={handleNavigation}
              >
                <div className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] md:w-[38px] md:h-[38px] shrink-0 rounded-[10px] bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) flex items-center justify-center">
                  <FaBriefcase className="w-[60%] h-[60%] text-white" />
                </div>
                <h1 className="font-bold text-[24px] sm:text-2xl md:text-3xl text-slate-900 tracking-tight">
                  Jobito<span className="text-(--job-post-button-bg-to)">.</span>
                </h1>
              </Link>
            </SheetHeader>

            <div className="flex-1 px-3 py-6 space-y-1">
              {navLinks.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleNavigation}
                    className={`block w-full text-left cursor-pointer px-4 py-2 rounded-lg transition-all ${isActive(item.path)
                      ? "bg-(--navbar-bg-button) text-(--navbar-text-color) font-medium border-r-[3px] border-(--navbar-text-color)"
                      : "bg-transparent text-(--profile-menu-text-color) hover:bg-(--navbar-bg-button) hover:text-(--navbar-text-color)"
                      }`}
                  >
                    <span className="text-[15px]">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}