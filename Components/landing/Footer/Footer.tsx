import Link from "next/link";
import { Twitter, Linkedin, Instagram, Send } from "lucide-react";
import { FaBriefcase } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center py-10 md:py-8 bg-(--footer-bg-color)">
      <div className="w-[95%] md:w-[90%] max-w-7xl flex flex-col gap-8 px-4 sm:px-6 lg:px-10">
        <div className="w-full border-b border-slate-800 pb-8 md:pb-6 flex flex-col gap-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-6">
            <div className="flex flex-col gap-4 md:w-[30%] md:flex-none">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] md:w-[38px] md:h-[38px] shrink-0 rounded-[10px] bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) flex items-center justify-center">
                  <FaBriefcase className="w-[60%] h-[60%] text-white" />
                </div>
                <span className="text-lg sm:text-xl font-semibold text-white">
                  Jobito
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-300 max-w-xs md:max-w-sm">
                The AI-powered job platform connecting modern companies with top
                talent through a smart, verified ecosystem.
              </p>
              <div className="flex items-center gap-3 mt-1 md:mt-0">
                <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-100 cursor-pointer">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-100 cursor-pointer">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-100 cursor-pointer">
                  <Instagram className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-row  gap-8 md:flex-1 md:justify-evenly md:gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-slate-200">
                  Platform
                </h3>
                <Link
                  href="/candidate/jobs"
                  className="text-sm text-slate-400 hover:text-emerald-400 cursor-pointer"
                >
                  Browse Jobs
                </Link>
                <Link
                  href="/employer/login"
                  className="text-sm text-slate-400 hover:text-emerald-400 cursor-pointer"
                >
                  For Employers
                </Link>
                <button className="text-left text-sm text-slate-400 hover:text-emerald-400 cursor-pointer">
                  Pricing
                </button>
                <button className="text-left text-sm text-slate-400 hover:text-emerald-400 cursor-pointer">
                  Success Stories
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-slate-200">
                  Company
                </h3>
                <Link
                  href="/company/about-us"
                  className="text-left text-sm text-slate-400 hover:text-emerald-400 cursor-pointer"
                >
                  About Us
                </Link>
                <button className="text-left text-sm text-slate-400 hover:text-emerald-400 cursor-pointer">
                  Careers
                </button>
                <button className="text-left text-sm text-slate-400 hover:text-emerald-400 cursor-pointer">
                  Blog
                </button>
                <Link
                  href="/company/contact-us"
                  className="text-left text-sm text-slate-400 hover:text-emerald-400 cursor-pointer"
                >
                  Contact
                </Link>
              </div>


            </div>


          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-500 mt-4">
          <p>© 2024 Jobito Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/company/privacy-policy"
              className="hover:text-emerald-400 cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/company/terms-service"
              className="hover:text-emerald-400 cursor-pointer"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
