
import { RefreshCw, CheckCircle2, Zap, Eye } from "lucide-react";

const activeFeatures = [
  {
    title: "Fresh Feed",
    description: "Always up-to-date job listings",
    icon: RefreshCw,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    title: "Active Only",
    description: "No expired or inactive jobs",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    title: "Real Hiring",
    description: "Companies actively recruiting",
    icon: Zap,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
  },
  {
    title: "Better Visibility",
    description: "Current openings get priority",
    icon: Eye,
    iconBg: "bg-fuchsia-100",
    iconColor: "text-fuchsia-500",
  },
];

export default function ActiveJobs() {
  return (
    <section className="w-full bg-(--job-post-button-disabled-bg) py-12 sm:py-16 lg:py-20 flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-[36px] sm:text-[36px] md:text-[36px] lg:text-[36px] font-bold font-[700] text-(--active-job-title-text)">
            Only Active Jobs. No Outdated Listings.
          </h2>
          <p className="max-w-1xl text-[18px] sm:text-[18px] md:text-[18px] text-(--navbar-menu-text) font-medium font-[400]">
            Jobito keeps the job feed fresh and relevant. Time-bound listings ensure you discover opportunities that are actively hiring.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {activeFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group w-[222px] h-[185px] cursor-pointer rounded-2xl bg-white border border-(--job-post-button-border-color) px-5 py-4 sm:px-6 sm:py-5 flex flex-col items-center text-center gap-2 shadow-[0_12px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center rounded-full ${feature.iconBg} p-2.5 sm:p-3 mb-1`}>
                  <Icon className={`w-5 h-5 ${feature.iconColor}`} strokeWidth={2.2} />
                </div>
                <p className="text-[16px] sm:text-[16px] font-bold font-[700] text-(--active-job-title-text)">
                  {feature.title}
                </p>
                <p className="text-[14px] sm:text-[14px] font-medium font-[400] text-(--job-post-button-disabled-text-color)">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
