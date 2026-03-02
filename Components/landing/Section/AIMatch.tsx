import { Bot, CheckCircle2, Lightbulb } from "lucide-react";

export default function AIMatch() {
  return (
    <section className="w-full bg-white flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 lg:py-20 flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
        <div className="w-full lg:w-[50%] flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-[25px] bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#EEF2FF] py-6 sm:py-8 lg:py-14 px-6 sm:px-8 lg:px-16">

            <div className="pointer-events-none absolute -inset-5 rounded-[20px] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_55%)] blur-2xl" />

            <div className="relative rounded-[10px] bg-white border border-[#E2E8F0] shadow-[0_18px_40px_rgba(15,23,42,0.12)] px-4 py-6 sm:px-5 sm:py-7 flex flex-col">

              <div className="flex items-center justify-between">
                <p className="text-[16px] sm:text-[16px] font-bold text-[#111827]">
                  Job Content Score
                </p>
                <span className="rounded-[999px] bg-[#DCFCE7] px-3 py-0.5 text-[11px] sm:text-[12px] font-semibold text-[#15803D]">
                  Excellent (92/100)
                </span>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="h-[8px] rounded-full bg-gray-100" />
                <div className="h-[8px] w-[80%] rounded-full bg-gray-100" />
                <div className="h-[8px] w-[60%] rounded-full bg-gray-100" />
              </div>

              <div className="mt-4 rounded-[8px] bg-[#ECFDF5] px-3.5 sm:px-4 py-2.5 flex gap-3">
                <div className="h-7 w-7 rounded-[8px] bg-white flex items-center justify-center text-[#16A34A]">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[12px] sm:text-[13px] font-bold text-[#166534]">
                    Clear Responsibilities
                  </p>
                  <p className="mt-0.5 text-[11px] sm:text-[12px] text-[#166534]">
                    The job duties are well-defined and actionable.
                  </p>
                </div>
              </div>

              <div className="mt-2.5 rounded-[8px] bg-[#E0F2FE] px-3.5 sm:px-4 py-2.5 flex gap-3">
                <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-[#2563EB]">
                  <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="text-[12px] sm:text-[13px] font-bold text-[#1D4ED8]">
                    Suggestion: Add Salary Range
                  </p>
                  <p className="mt-0.5 text-[11px] sm:text-[12px] text-[#1D4ED8]">
                    Jobs with salary ranges get 40% more applications.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%] flex flex-col gap-7">
          <div className="flex flex-col gap-3 sm:gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-(--job-post-button-bg-to)/10 px-3 py-1 text-[12px] sm:text-[12px] font-semibold text-[#2dd4bf] uppercase">
              <Bot className="h-4 w-4 text-[#2dd4bf]" />
              AI Engine
            </span>
            <h2 className="text-[36px] sm:text-[36px] font-bold font-[700] md:text-[36px]  text-[#0f172A] leading-tight">
              AI-Powered Job Quality Check
            </h2>
            <p className="text-[18px] sm:text-[18px] md:text-[18px] text-[#475569] max-w-xl  font-[400] ">
              Stop posting generic descriptions. Our AI analyzes your job post in real-time to ensure maximum clarity and candidate appeal.
            </p>
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Validates clarity", " of job descriptions instantly"],
              ["Improves visibility", "of high-quality, verified jobs"],
              ["Generates an", "nternal job score for optimization"],
              ["Encourages ", "better hiring standards across the platform"],
            ].map(([bold, rest], i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-[#16A34A]">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <p className="text-[#475569] text-[16px] sm:text-[14px] font-semibold font-[400]">
                  <span className="text-[14px] sm:text-[16px] text-[#334155] font-bold">{bold}</span>{" "}
                  {rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
