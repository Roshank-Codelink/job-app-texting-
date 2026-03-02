import { BookOpen, Headset, Target , PieChart , CreditCard, Palette, Megaphone, ArrowDownWideNarrow, Zap, ListChecks, LineChart, Info, Bot } from "lucide-react";


export default function JobQuality(){
    return (
          <div className="w-full bg-[#F8FAFC] py-10 sm:py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
        <div className="w-full max-w-[520px]">
             <div className="inline-flex items-center gap-2 rounded-full bg-(--job-post-button-bg-to)/10 px-4 py-2 mb-[12px]">
              <p className="text-[14px] font-semibold font-[600]  text-(--job-post-button-bg-to)">
              AI Technology 
              </p>
            </div>
          <h2 className="text-[22px] sm:text-[26px] lg:text-[32px] font-bold  text-[#111827] leading-tight">
         AI-Powered Job Quality Check
          </h2>
          <p className="mt-4 text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#4B5563] max-w-2xl">
           Ensure your job posts perform their best. Our intelligent system analyzes your description in real-time to maximize candidate engagement.
          </p>

          <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-sm flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-(--job-post-button-bg-to)" />
              </div>
              <div>
                <h4 className="text-[16px] sm:text-[18px] md:text-[19px] font-bold font-[700] text-[#0F172A]">
                  Instant Clarity Validation
                </h4>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#6B7280] mt-[4px] font-semibold">
                Validates job clarity instantly as you type, ensuring candidates understand exactly what you need.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-sm flex items-center justify-center shrink-0">
                <ListChecks  className="w-5 h-5 text-(--job-post-button-bg-to)" />
              </div>
              <div>
                <h4 className="text-[16px] sm:text-[18px] md:text-[19px] font-bold font-[700] text-[#0F172A]">
                  Structured Descriptions
                </h4>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#6B7280] mt-[4px] font-semibold">
                 Encourages better structured content with smart suggestions for requirements and benefits.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-sm flex items-center justify-center shrink-0">
                <LineChart  className="w-5 h-5 text-(--job-post-button-bg-to)" />
              </div>
              <div>
                <h4 className="text-[16px] sm:text-[18px] md:text-[19px] font-bold font-[700] text-[#0F172A]">
                 Internal Job Score
                </h4>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#6B7280] mt-[4px] font-semibold">
                  Generates a quality score that directly impacts the visibility of your listing in the feed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-6 flex-1 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-[520px] rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_24px_60px_rgba(15,23,42,0.12)] px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#111827]">
                Job Validation Analysis
              </h3>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                <span className="text-[12px] sm:text-[12px] font-semibold text-[#15803D]">
                  PASSED
                </span>
              </div>
            </div>

            <div className="mt-4 h-px w-full bg-[#E5E7EB]" />

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-[13px] sm:text-[14px] font-medium text-[#374151]">
                  <span>Clarity &amp; Readability</span>
                  <span className="text-(--job-post-button-bg-to) font-bold text-[14px]">98%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <div className="h-full w-[98%] rounded-full bg-(--job-post-button-bg-to)" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[13px] sm:text-[14px] font-medium text-[#374151]">
                  <span>Structure Completeness</span>
                  <span className="text-(--job-post-button-bg-to) font-bold text-[14px]">85%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <div className="h-full w-[85%] rounded-full bg-(--job-post-button-bg-to)" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[13px] sm:text-[14px] font-medium text-[#374151]">
                  <span>Keyword Optimization</span>
                  <span className="text-[#F59E0B] font-bold text-[14px]">72%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <div className="h-full w-[72%] rounded-full bg-[#FACC15]" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 text-[11px] sm:text-[12px] text-[#F59E0B]">
              <Info className="w-4 h-4 mt-[2px]" />
              <p>Suggestion: Add more specific skill keywords.</p>
            </div>

            <div className="mt-6 rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0] px-4 py-4 flex items-start gap-3">
              <div className="w-15 h-15 rounded-xl bg-[#DBEAFE] flex items-center justify-center text-(--job-post-button-bg-to) shrink-0">
                <Bot className="w-10 h-10" />
              </div>
              <div>
                <p className="text-[14px] sm:text-[14px] font-bold text-[#111827]">
                  AI Recommendation
                </p>
                <p className="mt-1 text-[12px] sm:text-[12px] text-[#6B7280]">
                  Your job post is likely to perform well. Consider adding a salary range for +15% more views.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
