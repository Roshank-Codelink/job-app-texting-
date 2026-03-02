"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaBriefcase } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/Components/ui/sheet";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, status } = useSession();


  // ✅ FINAL ACTIVE LOGIC (route is source of truth)
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path);

  const handleNavigation = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 flex items-center justify-center bg-white border-b border-slate-100/50">
      <div className="w-full max-w-7xl h-full flex items-center justify-between relative px-4 sm:px-6 md:px-8">
        {/* Logo and Desktop Nav */}
        <div className="flex items-center gap-10">
          <Link
            href="/employer-hub"
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] sm:text-[15px] text-(--navbar-menu-text) lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link
              href="/how-it-work"
              className={`cursor-pointer transition-colors duration-200 delay-200 ${isActive("/how-it-works")
                ? "text-(--job-post-button-bg-to) font-medium"
                : "hover:text-(--job-post-button-bg-to)"
                }`}
            >
              How it Works
            </Link>

            <Link
              href="/features"
              className={`cursor-pointer transition-colors duration-200 delay-200 ${isActive("/features")
                ? "text-(--job-post-button-bg-to) font-medium"
                : "hover:text-(--job-post-button-bg-to)"
                }`}
            >
              Features
            </Link>

            <Link
              href="/employer-hub/pricing"
              className={`cursor-pointer transition-colors duration-200 delay-200 ${isActive("/employer-hub/pricing")
                ? "text-(--job-post-button-bg-to) font-medium"
                : "hover:text-(--job-post-button-bg-to)"
                }`}
            >
              Pricing
            </Link>

            <Link
              href="/resources"
              className={`cursor-pointer transition-colors duration-200 delay-200 ${isActive("/resources")
                ? "text-(--job-post-button-bg-to) font-medium"
                : "hover:text-(--job-post-button-bg-to)"
                }`}
            >
              Resources
            </Link>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/employer-signin"
            className="cursor-pointer hidden sm:inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[15px] sm:text-base font-semibold text-(--navbar-menu-text) transition-all duration-200 hover:text-(--job-post-button-bg-to) hover:bg-(--navbar-login-color) hover:border hover:border-(--job-post-button-bg-to)"
          >
            Log in
          </Link>

          <Link
            href="/candidate-signin"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-[15px] sm:text-base font-semibold rounded-full text-white bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) border border-(--job-post-button-bg-to) transition-all duration-200 hover:bg-none hover:text-(--job-post-button-bg-to)"
          >
            Post a Job
          </Link>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md bg-(--navbar-bg-button) hover:bg-(--navbar-bg-button) text-(--navbar-text-color) cursor-pointer"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sheet */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 bg-transparent border-none">
          <div className="flex flex-col h-full bg-white rounded-tr-2xl relative">
            <SheetClose className="absolute -right-10 top-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 cursor-pointer">
              <X className="h-5 w-5" />
            </SheetClose>

            <SheetHeader className="px-4 py-3 border-b border-(--profile-image-border-color)">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-(--navbar-bg-button) flex items-center justify-center">
                  <Image
                    src="/Gemini_Generated_Image_hjxynfhjxynfhjxy.png"
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-[70%] h-[70%] object-contain"
                  />
                </div>
                <SheetTitle className="text-lg font-semibold text-(--navbar-logo-text-color)">
                  Jobito
                </SheetTitle>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <nav className="space-y-2 text-[15px] text-(--profile-menu-text-color)">
                {[
                  { name: "How it Works", path: "/how-it-work" },
                  { name: "Features", path: "/features" },
                  { name: "Pricing", path: "/employer-hub/pricing" },
                  { name: "Resources", path: "/resources" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleNavigation}
                    className={`block w-full text-left cursor-pointer px-4 py-2 rounded-lg transition-all ${isActive(item.path)
                      ? "bg-(--navbar-bg-button) text-(--navbar-text-color) font-medium border-r-[3px] border-(--navbar-text-color)"
                      : "bg-transparent hover:bg-(--navbar-bg-button) hover:text-(--navbar-text-color)"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="px-4 py-3 border-t border-(--profile-image-border-color) flex flex-row gap-2 sm:hidden">
              <Link
                href="/employer-signin"
                className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-[12px] font-semibold rounded-[5px] border border-(--job-post-button-bg-to) text-(--job-post-button-bg-to)"
              >
                Employer Login
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
