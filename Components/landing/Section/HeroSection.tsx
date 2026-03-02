"use client";
import Image from "next/image";
import { Search, Eye, Clock, Heart, Bookmark, ArrowRight, MapPin, Briefcase, X as CloseIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const { data, status } = useSession();
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (jobTitle) params.append("text", jobTitle);
    if (location) params.append("location", location);
    router.push(`/candidate/jobs?${params.toString()}`);
  };

  return (
    <section className="w-full bg-gradient-to-r from-(--navbar-bg-parent) via-white to-(--signin-bg-color-to)">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-[55%]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-(--job-post-button-bg-to)/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-(--job-post-button-bg-to)" />
            <p className="text-[12px] font-semibold  text-(--job-post-button-bg-to)">
              AI-POWERED HIRING V2.0
            </p>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-[55px] font-extrabold leading-[1.05] text-(--navbar-logo-text-color)">
            The Smart Way  to
            <br />
            Hire and <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)">
              Get Hired
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-[18px] text-(--navbar-menu-text)">
            Post jobs with AI validation and discover opportunities through a personalized job feed.
          </p>

          {/* Search / CTA */}
          <div className="mt-8">
            {status === "authenticated" && (data?.user as any)?.role === "EMPLOYEE" ? (
              <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 w-full max-w-2xl">
                {/* Job Title Input */}
                <div className="flex items-center gap-3 px-4 py-2 w-full border-b md:border-b-0 md:border-r border-slate-100">
                  <Briefcase size={20} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for job title"
                    className="w-full outline-none text-[15px] text-slate-700 placeholder:text-slate-400"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  {jobTitle && (
                    <CloseIcon
                      size={16}
                      className="text-slate-400 cursor-pointer hover:text-slate-600"
                      onClick={() => setJobTitle("")}
                    />
                  )}
                </div>

                {/* Location Input */}
                <div className="flex items-center gap-3 px-4 py-2 w-full">
                  <MapPin size={20} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full outline-none text-[15px] text-slate-700 placeholder:text-slate-400"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Find Job Button */}
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white font-bold text-[16px] shadow-[0_10px_20px_rgba(45,212,191,0.2)] hover:opacity-95 transition whitespace-nowrap cursor-pointer"
                >
                  Find Job
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/employer-signin" className="rounded-[8px] bg-gradient-to-r cursor-pointer flex items-center justify-center gap-2 from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) px-6 py-3 text-white font-semibold shadow-lg hover:opacity-90 transition">
                  <span className="text-[16px]">Post a Job</span>
                  <ArrowRight size={18} className="transition-transform" />
                </Link>

                <Link href="/candidate/jobs" className="rounded-[8px] border border-slate-200 bg-white px-6 py-3 flex items-center justify-center gap-2 text-[15px] font-semibold text-(--active-job-title-text)  hover:bg-slate-50 transition cursor-pointer">
                  <Search size={18} className="text-slate-600" />
                  <span className="text-[16px] text-slate-600">Find Jobs</span>
                </Link>
              </div>
            )}
          </div>

          {/* Trust */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-500" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 text-[11px] font-semibold text-slate-700 flex items-center justify-center">
                +2k
              </div>
            </div>
            <p className="text-[14px] font-[500] text-(--job-post-button-disabled-text-color)">
              Trusted by <span className="font-semibold text-slate-700">2,000+</span> companies
            </p>
          </div>
        </div>

        {/* RIGHT PREVIEW CARD */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative">
          <div className="pointer-events-none absolute -top-10 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-(--navbar-bg-parent) to-(--signin-bg-color-to) opacity-60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-gradient-to-tr from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) opacity-50 blur-3xl" />
          <div className="w-full md:w-full lg:w-[560px] rounded-[20px] bg-white shadow-[0_40px_80px_rgba(15,23,42,0.12)] overflow-hidden relative transform transition-transform duration-300 hover:scale-[1.02]">

            {/* TOP BAR */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-(--traffic-red)" />
                <span className="h-3 w-3 rounded-full bg-(--traffic-yellow)" />
                <span className="h-3 w-3 rounded-full bg-(--traffic-green)" />
              </div>
              <p className="text-xs  text-(--job-post-bg-color) font-medium">
                LIVE PREVIEW
              </p>
            </div>

            {/* CONTENT */}
            <div className="p-6">

              {/* HEADER */}
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-(--active-job-title-text) flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">F</span>
                  </div>

                  <div>
                    <h3 className="text-[18px] font-bold- font-[700] text-(--active-job-title-text)">
                      Product Designer
                    </h3>
                    <p className="text-[14px] text-(--slate-700-text) font-medium mt-0.5">
                      Figma <span className=" text-(--job-post-button-disabled-text-color) text-[14px]">· San Francisco (Remote)</span>
                      <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-[2px] text-[12px] font-semibold text-emerald-600">
                        Verified
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="h-9 w-9 rounded-full bg-(--Profile-hover-bg) flex items-center justify-center text-(--job-post-bg-color)">
                    <Heart size={16} />
                  </button>
                  <button className="h-9 w-9 rounded-full bg-(--Profile-hover-bg) flex items-center justify-center text-(--job-post-bg-color) ">
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-4 mb-[24px] text-[16px] leading-relaxed font-[400] text-(--navbar-menu-text)">
                We are looking for a Senior Product Designer to help us build the
                future of design tools. You will work closely with our engineering
                team to ship high-quality features...
              </p>

              {/* TAGS */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["UI/UX", "Prototyping", "User Research"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-(--tag-bg-color) px-3 py-1 text-[14px] text-(--tag-text-color) font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* DIVIDER */}
              <div className="my-6 h-px w-full bg-slate-100" />

              {/* FOOTER */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-3 text-[14px] text-[#64748B] font-medium">
                  <div className="flex items-center gap-1.5">
                    <Eye size={16} className="text-[#64748B]" />
                    <span className="text-[14px]">1.2k views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-[#64748B]" />
                    <span className="text-[14px]">2h ago</span>
                  </div>

                  {/* Mobile: 98% Skill Match next to 2h ago */}
                  <div className="mt-1 flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,0.15)] animate-bounce md:hidden">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-slate-700">
                      98% Skill Match
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-3 w-full md:w-auto md:justify-end">
                  {/* Desktop / tablet: chip with button on the right */}
                  <div className="hidden md:flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,0.15)] animate-bounce">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-slate-700">
                      98% Skill Match
                    </span>
                  </div>

                  <button className="rounded-xl bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(79,70,229,0.35)]">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
