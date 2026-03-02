import React from "react";
import {
  LuWallet,
  LuSend,
  LuRefreshCw,
  
} from "react-icons/lu";
import { HiCheck } from "react-icons/hi";
import { MdHandshake } from "react-icons/md";
import { SlidersHorizontal } from "lucide-react";
import { XCircle } from "lucide-react";

export default function CostControll() {
  const listItems = [
    "Free-text job posting",
    "No complex HR software needed",
    "Pay only for platform usage",
    "Focused on visibility",
  ];

  const controlActions = [
    {
      title: "Post Anytime",
      icon: <LuSend className="text-[#60A5FA] h-5 w-5" />,
    },
    {
      title: "Renew",
      icon: <LuRefreshCw className="text-[#34D399] h-5 w-5" />,
    },
    {
      title: "Close/Delete",
      icon: <XCircle className="text-[#F87171] h-5 w-5" />,
    },
    {
      title: "Mark Hired",
      icon: <MdHandshake className="text-[#FBBF24] h-5 w-5" />,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-items-center">
         <div className="bg-[#F9FAFB] rounded-[32px] w-full max-w-[584px] p-5 md:p-12 border border-[#e5e7eb] flex flex-col gap-6">
      <div className="h-12 w-12 rounded-[12px] bg-[#FFFFFF] shadow-sm flex items-center justify-center">
        <LuWallet className="text-[#22C55E] h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h2 className="text-[28px] md:text-[24px] font-bold text-[#111827] leading-tight mb-[16px]">
          Simple and Cost-Effective Hiring
        </h2>
        <p className="text-[#64748B] text-[16px] md:text-[18px] leading-relaxed max-w-md">
          Focus on what matters: finding talent. No bloated enterprise tools or complicated software.
        </p>
      </div>

      {/* List Items - Grouped with consistent small gap */}
      <ul className="space-y-2">
        {listItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-[#374151] text-[18px] font-medium"
          >
            <HiCheck className="text-[#22C55E] h-5 w-5 shrink-0" />
            <span >{item}</span>
          </li>
        ))}
      </ul>
    </div>

          {/* RIGHT CARD */}
          <div className="bg-[#111827] rounded-[32px] w-full max-w-[584px] h-[475px] px-7 pt-8 pb-7 md:px-8 md:pt-10 md:pb-8 text-white  flex flex-col justify-between">
            <div className="h-13 w-13 bg-[#111827] rounded-[15px] flex items-center justify-center mb-1 border border-white/10 shadow-[0_12px_32px_rgba(15,23,42,0.8)]">
              <SlidersHorizontal className="text-white h-8 w-8" />
            </div>

            <h2 className="text-[24px] md:text-[28px] font-bold mb-3">
              Full Control Over Your Job Listings
            </h2>

            <p className="text-[#9CA3AF] text-[18px] md:text-[18px] leading-relaxed mb-6 max-w-md">
              Manage your listings with complete flexibility. You are in the driver's seat.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {controlActions.map((action, index) => (
                <div
                  key={index}
                  className="bg-[#0B1220] border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-[#1E293B] transition-colors cursor-pointer group"
                >
                  <div className="mb-3 transition-transform group-hover:scale-110">
                    {action.icon}
                  </div>
                  <span className="text-[14px] font-semibold text-gray-200">
                    {action.title}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
