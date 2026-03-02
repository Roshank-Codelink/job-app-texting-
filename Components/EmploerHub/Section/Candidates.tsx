import {
    Target,
    MapPin,
    Clock,
    Layers,
} from "lucide-react";
import { FaRegBuilding } from "react-icons/fa6";

const featureCards = [
    {
        title: "Skill Relevance",
        description:
            "Jobs ranked by matching core skills with candidate profiles.",
        icon: Target,
    },
    {
        title: "Location Matching",
        description:
            "Prioritizes candidates in your specified region or timezone.",
        icon: MapPin,
    },
    {
        title: "Freshness First",
        description:
            "New jobs get priority visibility to ensure rapid responses.",
        icon: Clock,
    },
    {
        title: "Smart Feed",
        description:
            "Scroll-based visibility adapts to candidate behavior.",
        icon: Layers,
    },
];

export default function Candidates() {
    return (
        <section className="w-full bg-white py-14 sm:py-18 md:py-20">
            <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-30">

                {/* LEFT CARD */}
                <div className="w-full lg:max-w-md flex justify-center lg:justify-start">
                    <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_20px_50px_rgba(15,23,42,0.08)] px-6 py-6">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                                <div className="h-10 w-10 rounded-xl bg-[#0F172A] flex items-center justify-center text-white">
                                    <FaRegBuilding className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-bold text-[#111827]">
                                        Frontend Developer
                                    </h3>
                                    <p className="text-[14px] text-[#6B7280] font-semibold">
                                        TechCorp Inc.
                                    </p>
                                </div>
                            </div>

                            <span className="rounded-[5px] bg-[#EEF2FF] px-3 py-1 text-[13px] font-bold text-[#2563EB]">
                                98% Match
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
                            <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-[#4B5563] font-semibold">
                                React
                            </span>
                            <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-[#4B5563] font-semibold">
                                TypeScript
                            </span>
                            <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-[#4B5563] font-semibold">
                                Remote
                            </span>
                        </div>

                        <p className="mt-[24px] text-[14px] text-[#4B5563] leading-relaxed">
                            We are looking for an experienced Frontend Developer to join our
                            growing team. You will be responsible for building high-performance
                            web applications…
                        </p>
                          
                        <div className="mt-5 flex items-center justify-between text-[12px] text-[#9CA3AF] font-semibold">
                            <span>Posted 2h ago</span>
                            <button className="font-semibold text-[#2dd4bf] hover:underline">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1">
                    <div className="max-w-xl">
                        <h2 className="text-[26px] sm:text-[36px] font-bold font-[800] text-[#111827]">
                            Reach the Right Candidates
                        </h2>
                        <p className="mt-[32px] text-[18px] font-semibold text-[#6B7280]">
                            Our smart feed algorithm ensures your job listing lands in front of
                            the most relevant talent, not just anyone.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                        {featureCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    className="rounded-2xl bg-[#f9fafb] border border-[#e5e7eb] px-6 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] min-h-[152px]"
                                >
                                    <div className="flex flex-col items-start gap-2">
                                        <Icon className="h-6 w-6 text-(--job-post-button-bg-to)" />
                                        <h3 className="text-[16px] font-bold text-[#111827]">
                                            {card.title}
                                        </h3>
                                        <p className="text-[14px] text-[#6B7280] leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
