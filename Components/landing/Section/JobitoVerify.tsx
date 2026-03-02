import {
  Shield,
  Sparkles,
  LineChart,
  Building2,
  Lock
} from "lucide-react"
import { FaShieldAlt } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa6";
const trustFeatures = [
  {
    title: "Manual Approval",
    description: "Every company is checked by humans",
    icon: FaShieldAlt,
  },
  {
    title: "Verified Badges",
    description: "Clear indicators of trust",
    icon: GoVerified,
  },
  {
    title: "Profile Strength",
    description: "Levels: New, Growing, Trusted",
    icon: AiOutlineLineChart,
  },
  {
    title: "Transparent Profiles",
    description: "STransparent Profiles",
    icon: FaRegBuilding,
  },
];

export default function JobitoVerify() {
  return (
    <>
      {/* Verified Companies Section (dark) */}
      <section className="w-full bg-[#020617] py-12 md:py-16 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.18),_transparent_55%)]" />
        <div className="relative w-[95%] md:w-[90%] mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-bold font-[700] text-white">
            Verified Companies. Real Opportunities.
          </h2>
          <p className="mt-3 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-[#CBD5E1] max-w-2xl mx-auto">
            We take trust seriously. Every employer on Jobito is manually verified to ensure a safe job search environment.
          </p>
          <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 md:gap-4 justify-items-center">
            {trustFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group w-full max-w-[286px] h-auto md:h-[158px] rounded-[18px] bg-[#1e293b] border border-(--profile-image-border-color)/40 px-5 sm:px-6 py-4 sm:py-5 flex flex-col items-center justify-center text-center gap-2 cursor-pointer shadow-[0_18px_45px_rgba(15,23,42,0.7)] overflow-hidden transition-all duration-200  hover:border-(--job-post-button-bg-to) hover:shadow-[0_0_0_1px_rgba(56,189,248,0.5),0_22px_55px_rgba(15,23,42,0.9)]"
                >
                  <div className="inline-flex items-center justify-center rounded-full bg-[#111827] p-[10px] transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-(--job-post-button-bg-from) group-hover:to-(--job-post-button-bg-to)">
                    <Icon size={22} className="text-white" />
                  </div>
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] font-bold font-[700] text-white">
                    {feature.title}
                  </p>
                  <p className="text-[11px] sm:text-[12px] text-[#94A3B8]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-(--profile-image-border-color)/50 bg-[#020617] px-4 py-2 text-[12px] sm:text-[13px] md:text-[14px] font-bold font-[500]">
              <Lock className="w-4 h-4 text-(--job-post-button-bg-to) " strokeWidth={2.2} />
              <span className="text-[#CBD5E1]">Your data and safety is our top priority</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
