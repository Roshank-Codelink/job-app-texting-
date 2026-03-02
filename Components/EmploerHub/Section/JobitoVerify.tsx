import { HiOutlineCheckCircle } from "react-icons/hi2";
import { LuUserCheck, LuBadgeCheck, LuBuilding2 } from "react-icons/lu";
import { MdLeaderboard } from "react-icons/md";

export default function JobitoVerify() {
  const features = [
    {
      title: "Admin Verified",
      desc: "Every employer account is manually reviewed.",
      icon: <LuUserCheck className="h-5 w-5 text-white" />,
      pillBg: "bg-[#EFF6FF]",
      circleBg: "bg-[#2563EB]",
    },
    {
      title: "Trust Badge",
      desc: "Verified badge displayed on your company profile.",
      icon: <LuBadgeCheck className="h-5 w-5 text-white" />,
      pillBg: "bg-[#F0FDF4]", 
      circleBg: "bg-[#22C55E]",
    },
    {
      title: "Profile Strength",
      desc: "Labels for New, Growing, and Trusted employers.",
      icon: <MdLeaderboard className="h-5 w-5 text-white" />,
      pillBg: "bg-[#FAF5FF]", 
      circleBg: "bg-[#9333EA]",
    },
    {
      title: "Transparent Profiles",
      desc: "Candidates can view full company details.",
      icon: <LuBuilding2 className="h-5 w-5 text-white" />,
      pillBg: "bg-[#FFF7ED]", 
      circleBg: "bg-[#EA580C]",
    },
  ];

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#0F172A] mb-4">
            Trusted Hiring Environment
          </h2>
          <p className="text-[#64748B] text-[16px] md:text-[18px] max-w-3xl mx-auto leading-relaxed">
            We maintain a high-quality ecosystem where verified employers connect with serious professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center w-full max-w-[286px] h-[185px] px-5 sm:px-6 py-4 sm:py-5 rounded-[20px] border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300"
            >
            
                <div className={`flex items-center justify-center h-10 w-10 sm:h-10 sm:w-10 rounded-full ${item.circleBg}`}>
                  {item.icon}
                </div>
            

              {/* Text Content */}
              <h4 className="text-[18px] font-bold text-[#111827] mb-3">
                {item.title}
              </h4>
              <p className="text-[#6B7280] text-[14px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

    
      </div>
    </section>
  );
}
