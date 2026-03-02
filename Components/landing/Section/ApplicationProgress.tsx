import type { ComponentType } from "react";
import {
  Phone,
  UserRound,
  Heart,
  Building2,
  Zap,
  ScrollText,
} from "lucide-react";

type ProcessStep = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

const processSteps: ProcessStep[] = [
  {
    title: "OTP-Based Login",
    description:
      "Secure and passwordless sign-in. Just enter your phone number.",
    icon: Phone,
  },
  {
    title: "Profile Onboarding",
    description:
      "Quick setup with name, phone, job title, location, and skills.",
    icon: UserRound,
  },
  {
    title: "Like & Save Jobs",
    description:
      "Keep track of opportunities you're interested in with one tap.",
    icon: Heart,
  },
  {
    title: "View Employer Profiles",
    description:
      "See full company details before applying to any position.",
    icon: Building2,
  },
  {
    title: "Apply Instantly",
    description:
      "One-click applications with your complete profile information.",
    icon: Zap,
  },
  {
    title: "Scroll-Based Browsing",
    description:
      "Discover jobs naturally through an infinite scroll feed.",
    icon: ScrollText,
  },
];

export default function ApplicationProgress() {
  return (
    <section className="w-full bg-white py-14 md:py-20 flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] font-bold font-[700] text-[#0F172A] leading-tight">
            Simple and Fast Application Process
          </h2>
          <p className="mt-3 text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#475569]">
            From sign-up to application, everything is designed for speed and simplicity.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group w-full max-w-[384px] h-auto md:h-[241px] cursor-pointer rounded-[10px] bg-[#F8FAFC]
                           border border-[#E5E7EB]
                           px-6 sm:px-7 py-6 sm:py-8 text-center
                           transition-all duration-300
                           hover:bg-white hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]
                           hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mx-auto mb-4 h-12 w-12 rounded-2xl
                                bg-white border border-[#E5E7EB]
                                flex items-center justify-center
                                text-[#2dd4bf]
                                group-hover:bg-[#2dd4bf]/10
                                transition-colors">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="text-[15px] sm:text-[20px] md:text-[20px] font-bold text-[#0F172A]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-[16px] sm:text-[16px] md:text-[16px] leading-relaxed text-[#475569]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
