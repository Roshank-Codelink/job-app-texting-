"use client";
import ParticlesBackground from "@/Components/ParticlesBackground/ParticlesBackground";
import Link from "next/link";
import { FaMagic } from "react-icons/fa";
import {
  HiCheck,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiCheckCircle,
} from "react-icons/hi";

export default function Plan() {
  const plans = [
    {
      label: "Starter Plan",
      price: "₹499",
      period: "/month",
      highlight: false,
      buttonLabel: "Choose Starter",
      features: [
        "Up to 4 Job Posts",
        "Up to 40 Enhancements",
        "AI Job Validation Included",
        "Engagement Tracking",
        "10-Day Job Lifecycle",
        "Verification Badge",
      ],
    },
    {
      label: "Growth Plan",
      price: "₹899",
      period: "/3 months",
      highlight: true,
      buttonLabel: "Choose Growth",
      features: [
        "Up to 10 Job Posts",
        "Up to 100 Enhancements",
        "AI Job Validation Included",
        "Engagement Tracking",
        "10-Day Job Lifecycle",
        "Verification Badge",
      ],
    },
  ];

  const comparisonData = [
    { feature: "Duration", starter: "1 Month", growth: "3 Months" },
    { feature: "Job Posts", starter: "4", growth: "10" },
    { feature: "Enhancements", starter: "40", growth: "100" },
    { feature: "AI Validation", starter: true, growth: true },
    { feature: "Engagement Tracking", starter: true, growth: true },
    { feature: "Employer Verification", starter: true, growth: true },
  ];

  return (
    <>
      <section className="min-h-screen w-full bg-gradient-to-t from-(--navbar-bg-parent) via-white via-55% to-(--signin-bg-color-to)">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-(--pricing-title-color) mb-6">
              Simple & Affordable Hiring Plans
            </h1>
            <p className="text-lg text-(--navbar-menu-text) max-w-2xl mx-auto">
              Choose a plan that fits your hiring needs. Transparent pricing
              with no hidden complexity.
            </p>
          </div>
          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl" >
            {plans.map((plan) => (
              <div
                key={plan.label}
                className={`relative flex flex-col bg-white rounded-[24px] p-10 transition-all duration-300 ${
                  plan.highlight
                    ? "ring-2 ring-(--job-post-button-bg-to) shadow-2xl scale-105 z-10"
                    : "border border-gray-100 shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-(--job-post-button-bg-to) text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-widest">
                    MOST POPULAR
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <p
                    className={`text-[13px] font-medium uppercase mb-2 ${
                      plan.highlight ? "text-(--job-post-button-bg-to)" : "text-(--muted-text-400)"
                    }`}
                  >
                    {plan.label}
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-[36px] font-extrabold text-(--active-job-title-text)">
                      {plan.price}
                    </span>
                    <span className="text-(--job-post-button-disabled-text-color) text-lg">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-(--navbar-menu-text) font-medium"
                    >
                      <HiCheckCircle className="h-5 w-5 text-(--job-post-button-bg-to)" />
                      <span className="text-[16px]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`w-full py-4 rounded-xl font-medium text-[16px] transition-all cursor-pointer ${
                    plan.highlight
                      ? "bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white shadow-lg"
                      : "bg-white text-(--button-secondary-text) border-2 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {plan.buttonLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
        <section className="w-full py-12 px-4 flex justify-center bg-white pt-[80px] ">
          <div className="w-full max-w-4xl bg-(--job-post-button-disabled-bg) border border-(--profile-border-color) rounded-[32px] p-8 md:p-12 lg:p-15 ">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
              {/* Left Side: Icon and Title */}
              <div className="flex flex-col gap-6 shrink-0 w-full md:w-1/3">
                <div className="w-16 h-16 bg-(--feature-icon-bg) rounded-2xl flex items-center justify-center">
                  <FaMagic className="text-(--brand-blue) w-8 h-8" />
                </div>
                <h2 className="text-(--hero-dark-text) text-3xl md:text-[32px] font-bold leading-tight">
                  What Are <br className="hidden md:block" /> Enhancements?
                </h2>
              </div>
              {/* Right Side: Description */}
              <div className="w-full md:w-2/3">
                <p className="text-(--navbar-menu-text) text-lg md:text-[18px] leading-relaxed">
                  Enhancements allow you to improve job visibility and optimize
                  job quality using Jobito's AI-powered system. Use them to
                  stand out and reach the right candidates faster.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Comparison Table */}
        <section className="w-full pt-35 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center text-(--pricing-title-color) text-[24px] font-bold mb-10">
              Compare Plan Features
            </h2>
            <div className="bg-white rounded-[24px] border border-(--job-post-button-border-color) overflow-hidden">
              <div className="grid grid-cols-[2fr_1fr_1fr] px-6 md:px-10 py-4 bg-(--job-post-button-disabled-bg) border-b border-(--job-post-button-border-color) items-center">
                <span className="text-[14px] font-medium text-(--job-post-button-disabled-text-color) uppercase tracking-wider">
                  Feature
                </span>
                <span className="text-[14px] font-medium text-(--active-job-title-text) text-center">
                  Starter
                </span>
                <span className="text-[14px] font-bold text-(--job-post-button-bg-to) text-center">
                  Growth
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {comparisonData.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_1fr_1fr] px-6 md:px-10 py-6 items-center hover:bg-gray-50/50 transition-colors border-b border-(--job-post-button-border-color) last:border-b-0"
                  >
                    <span className="text-[16px] font-medium text-(--slate-700-text) pr-4">
                      {row.feature}
                    </span>
                    <div className="flex justify-center text-[16px] text-(--navbar-menu-text) font-medium">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <HiCheck className="w-5 h-5 text-(--job-post-button-bg-to)" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )
                      ) : (
                        row.starter
                      )}
                    </div>
                    <div className="flex justify-center text-[16px] text-(--navbar-menu-text) font-medium">
                      {typeof row.growth === "boolean" ? (
                        row.growth ? (
                          <HiCheck className="w-5 h-5 text-(--job-post-button-bg-to)" />
                        ) : (
                          <span className="text-gray-300">—</span>
                        )
                      ) : (
                        row.growth
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="w-full py-16 px-4 flex  justify-center bg-(--sidebar-bg-color)">
        <div className="w-full max-w-[1600px] bg-(--hero-dark-text) mx-[20px] rounded-[32px] md:rounded-[48px] p-8 md:py-20 md:px-16 lg:px-24 xl:px-40 2xl:px-70 flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <ParticlesBackground />
          </div>
          <div className="z-10 w-full lg:w-3/5">
            <h2 className="text-white text-3xl sm:text-4xl md:text-[40px] font-bold leading-tight mb-6">
              Quality Hiring Without <br className="hidden sm:block" />{" "}
              Enterprise Costs
            </h2>
            <p className="text-[#94A3B8] text-lg mb-10 max-w-md">
              We focus on what matters: connecting you with the right talent
              quickly and affordably.
            </p>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#0070f333] rounded-lg flex items-center justify-center">
                  <HiOutlineLightningBolt className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[16px]">
                    Simple job posting process
                  </h4>
                  <p className="text-[#94A3B8] text-[16px]">
                    Post a job in minutes with our intuitive interface.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#0070f333] rounded-lg flex items-center justify-center">
                  <HiOutlineShieldCheck className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[16px]">
                    AI-powered validation included
                  </h4>
                  <p className="text-[#94A3B8] text-[16px]">
                    Ensure your listings are high quality and compliant.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="z-10 relative w-full lg:w-auto lg:min-w-[340px] xl:min-w-[380px]">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-6 md:p-8 space-y-6 shadow-2xl">
              {[
                "No complex HR software needed",
                "Transparent fixed pricing",
                "Designed for efficient hiring",
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <HiCheck className="text-[#0B1221] w-4 h-4" />
                  </div>
                  <span className="text-white text-base font-medium whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col bg-white pt-[55px]">
        <div className="w-full flex justify-center items-center bg-white h-auto md:h-[421px] py-10 sm:py-12 md:py-0">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
            <div className="text-center max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold font-[800] text-[#111827]">
                Start Hiring Smarter Today
              </h2>
              <p className="mt-2 sm:mt-3 text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-[#6B7280]">
                Join thousands of forward-thinking companies using Jobito to
                build their dream teams.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/employer-signin"
                className="inline-flex  cursor-pointer items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-[#2dd4bf] text-white rounded-2xl font-bold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20"
              >
                Create Employer Account
              </Link>

              <Link
                href="/employer-signin"
                className="inline-flex cursor-pointer items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-[8px] border border-(--job-post-button-bg-to)/50 bg-white/90 font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-(--job-post-button-bg-to) hover:bg-(--job-post-button-bg-to)/5 transition-colors"
              >
                Choose a Plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
