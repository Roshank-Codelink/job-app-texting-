"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Briefcase, MapPin, X, Menu, User, LogOut, Phone, Download, DollarSign, Info, ChevronDown } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Input } from "@/Components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetOverlay,
} from "@/Components/ui/sheet"
import { LogoutAPI } from "@/api_config/shared/sharedapi"
import { signOut } from "next-auth/react"

const products: { title: string; href: string; description: string }[] = [
  {
    title: "Job Search",
    href: "/candidate/jobs",
    description: "Find your dream job with our advanced search filters.",
  },
  {
    title: "Job Alerts",
    href: "/candidate/job-alerts",
    description: "Get notified about new job opportunities matching your profile.",
  },
  {
    title: "Company Reviews",
    href: "/candidate/company-reviews",
    description: "Read reviews and insights about companies before applying.",
  },
]
const handleLogout = async () => {
  const response = await LogoutAPI();
  signOut(
      {
          redirect: true,
          callbackUrl: "/candidate-signin",
      }
  );
}



function UserProfile() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full border border-gray-200 bg-[#FFFFFF] cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown className="h-4 w-4 text-black" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-32 md:w-36 p-2" align="end">
        <div className="flex flex-col gap-1">
          <Link
            href="/candidate/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <User className="h-4 w-4 text-gray-600" />
            <span>View Profile</span>
          </Link>
          <div className="border-t border-gray-200 my-1"></div>
         <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <LogOut className="h-4 w-4 text-gray-600" />
            <span>Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function CandidateNavbar() {
  const isMobile = useIsMobile()
  const [isSearchExpanded, setIsSearchExpanded] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [showCloseButton, setShowCloseButton] = React.useState(false)

  const triggerRef = React.useRef<HTMLDivElement | null>(null)
  const [stuck, setStuck] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '-10px 0px 0px 0px' }
    )

    if (triggerRef.current) observer.observe(triggerRef.current)
    return () => observer.disconnect()
  }, [])

  

  // Close sidebar when switching from mobile to desktop or vice versa
  React.useEffect(() => {
    const handleResize = () => {
      if (!isMobile && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile, isSidebarOpen])

  // Show close button after sidebar animation completes
  React.useEffect(() => {
    if (isSidebarOpen) {
      // Delay to match sidebar animation duration (500ms)
      const timer = setTimeout(() => {
        setShowCloseButton(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      // Hide immediately when sidebar closes
      setShowCloseButton(false)
    }
  }, [isSidebarOpen])





  return (
    <>
      {/* Invisible trigger element */}
      <div ref={triggerRef} className="h-4" />

      <div 
        className={`w-full ${stuck ? 'fixed top-0 z-50 pt-0 pb-0' : 'sticky top-4 z-50 pt-4 pb-4'}`}
      style={{
        transition: 'padding 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <div 
        className={`w-full ${stuck ? 'max-w-full' : 'max-w-full md:max-w-[95%] lg:max-w-[85%]'} ${stuck ? 'mx-0 px-0' : 'mx-auto px-4'} relative overflow-visible ${stuck ? 'space-y-0' : 'space-y-3'}`}
        style={{
          transition: 'max-width 150ms cubic-bezier(0.4, 0, 0.2, 1), margin 150ms cubic-bezier(0.4, 0, 0.2, 1), padding 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Navbar Container */}
        <div 
          className={`bg-white ${stuck ? 'rounded-none shadow-lg' : 'rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1),0_-2px_8px_rgba(0,0,0,0.05),2px_0_8px_rgba(0,0,0,0.05),-2px_0_8px_rgba(0,0,0,0.05)]'}`}
          style={{
            transition: 'border-radius 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="h-14 flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 relative">
            {/* Left Section - Logo + Menu */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Logo Section */}
              <div className="flex items-center gap-2 shrink-0">
                <Image
                  src="/Gemini_Generated_Image_hjxynfhjxynfhjxy.png"
                  alt="logo"
                  width={120}
                  height={120}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
                <h1 className="text-lg md:text-xl font-semibold text-gray-900">Jobito</h1>
              </div>

              {/* Navigation Links - Left (after logo) */}
              <div className="hidden md:flex items-center gap-6 ml-4 md:ml-6">
                <Link
                  href="/candidate/jobs"
                  className="text-base font-medium text-gray-700 cursor-pointer"
                >
                  Jobs
                </Link>

                <Link
                  href="/candidate/pricing"
                  className="text-base font-medium text-gray-700 cursor-pointer"
                >
                  Pricing
                </Link>

                <Link
                  href="/candidate/about"
                  className="text-base font-medium text-gray-700 cursor-pointer"
                >
                  About
                </Link>

                <Link
                  href="/candidate/contact"
                  className="text-base font-medium text-gray-700 cursor-pointer"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right Section - Mobile: Profile + Hamburger, Desktop: Profile */}
            <div className="flex items-center gap-3 shrink-0">
              {/* User Profile */}
              <div className="flex items-center shrink-0">
                <UserProfile />
              </div>

              {/* Mobile Toggle Button - Right (Only Mobile, not iPad) */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors shrink-0"
                aria-label="Toggle Sidebar"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/iPad Search Bar - Separate Container (Normal Search, No Expand) */}
        <div 
          className={`lg:hidden ${stuck ? 'px-0 -mt-px' : 'px-0'}`}
          style={{
            transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search jobs by title, company or skill"
              className={`pl-10 pr-4 h-12 bg-white border border-gray-200 ${stuck ? 'rounded-none' : 'rounded-lg'} text-gray-600 placeholder:text-gray-400 text-sm md:text-base ${stuck ? 'shadow-none' : 'shadow-[0_1px_2px_rgba(0,0,0,0.08)]'} focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent`}
              style={{
                transition: 'border-radius 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), border 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar - Using Shadcn Sheet */}
      {isMobile && (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetOverlay className="backdrop-blur-md" />
          <SheetContent 
            side="left" 
            className="w-[75vw] max-w-sm p-0 bg-transparent border-none "
          >
          <div className="flex flex-col h-full bg-white rounded-tr-2xl relative">
            {/* Close Button - Outside Right Side */}
            <SheetClose className={`absolute -right-12 top-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-all duration-300 ${
              showCloseButton 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-2 pointer-events-none'
            }`}>
              <X className="h-5 w-5 text-gray-700" />
            </SheetClose>

            {/* Sidebar Header */}
            <SheetHeader className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Image
                  src="/Gemini_Generated_Image_hjxynfhjxynfhjxy.png"
                  alt="logo"
                  width={120}
                  height={120}
                  className="w-8 h-8 object-contain"
                />
                <SheetTitle className="text-lg font-semibold text-gray-900">Jobito</SheetTitle>
              </div>
            </SheetHeader>

            {/* Sidebar Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="flex flex-col gap-1">
                {/* Jobs Link */}
                <Link
                  href="/candidate/jobs"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Briefcase className="h-4 w-4 text-gray-600" />
                  <span>Jobs</span>
                </Link>

                {/* Pricing Link */}
                <Link
                  href="/candidate/pricing"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  <span>Pricing</span>
                </Link>

                {/* About Link */}
                <Link
                  href="/candidate/about"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Info className="h-4 w-4 text-gray-600" />
                  <span>About</span>
                </Link>

                {/* Contact Link */}
                <Link
                  href="/candidate/contact"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>Contact</span>
                </Link>
              </nav>

              {/* Bottom Section - Separator */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Bottom Menu Items */}
              <nav className="flex flex-col gap-1">
                <Link
                  href="/candidate/contact"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>Contact us</span>
                </Link>

                <Link
                  href="/candidate/download-app"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Download className="h-4 w-4 text-gray-600" />
                  <span>Download Apna app</span>
                </Link>

                <Link
                  href="/candidate-signin"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 text-red-600" />
                  <span>Logout</span>
                </Link>
              </nav>
            </div>
          </div>
        </SheetContent>
        </Sheet>
      )}
    </div>
    </>
  )
}