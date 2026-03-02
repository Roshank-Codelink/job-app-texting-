import React from 'react';
import { HiOutlineInformationCircle } from "react-icons/hi2";

export default function FreshnessSystem() {
  return (
    <section className="w-full bg-white py-20 font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: TIMELINE */}
        <div className="relative">
          {/* Vertical Gray Line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-gray-200" />

          <div className="space-y-12 relative">
            {/* Day 1 */}
            <div className="flex items-start gap-6">
              <div className="relative z-10">
                <div className="h-[22px] w-[22px] rounded-full bg-[#3b82f6]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-[#111827]">Day 1: Job Posted</h3>
                <p className="text-[16px] text-[#4B5563] mt-2 leading-snug">
                  Your job goes live and gets boosted visibility in the smart feed for freshness.
                </p>
              </div>
            </div>

            {/* Day 1-10 */}
            <div className="flex items-start gap-6">
              <div className="relative z-10">
                <div className="h-[22px] w-[22px] rounded-full bg-[#bfdbfe]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-[#111827]">Day 1-10: Active Period</h3>
                <p className="text-[16px] text-[#4B5563] mt-2 leading-snug">
                  Candidates view, save, and apply. Monitor real-time engagement stats.
                </p>
              </div>
            </div>

            {/* Day 10 */}
            <div className="flex items-start gap-6">
              <div className="relative z-10">
                <div className="h-[22px] w-[22px] rounded-full bg-[#94a3b8]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-[#111827]">Day 10: Auto-Expire</h3>
                <p className="text-[16px] text-[#64748b] mt-2 leading-snug">
                  Job automatically expires to maintain platform quality. You can renew anytime.
                </p>
              </div>
            </div>

            {/* Renew or Close */}
            <div className="flex items-start gap-6">
              <div className="relative z-10">
                <div className="h-[22px] w-[22px] rounded-full bg-[#22c55e]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-[#111827]">Renew or Close</h3>
                <p className="text-[16px] text-[#64748b] mt-2 leading-snug">
                  Reposting resets the impression count and treats it as a fresh job.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-extrabold text-[#111827] leading-tight tracking-tight mb-[24px] sm:mb-[30px] md:mb-[36px]">
            Built-In Freshness System
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#4B5563] leading-relaxed max-w-lg mb-[20px] sm:mb-[24px]">
            We prioritize active, relevant jobs. Our 10-day lifecycle ensures candidates only see opportunities that are truly available.
          </p>

          <div className="bg-(--job-post-button-bg-to)/5 rounded-2xl px-4 py-4 sm:p-6 md:p-8 mt-4 border border-(--job-post-button-bg-to)/20">
            <div className="flex gap-4">
              <div className="mt-1">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-(--job-post-button-bg-to)/10">
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-(--job-post-button-bg-to)">
                    <HiOutlineInformationCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-(--job-post-button-bg-to) font-bold text-[14px] sm:text-[15px] md:text-[16px]">Why 10 days?</h4>
                <p className="text-(--job-post-button-bg-to) text-[13px] sm:text-[14px] mt-1 leading-relaxed opacity-90">
                  Our data shows that 85% of successful hires happen within the first 10 days of posting. Shorter cycles mean higher candidate trust and better response rates.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
