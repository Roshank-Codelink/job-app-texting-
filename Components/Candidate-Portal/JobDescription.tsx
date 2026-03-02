"use client";

import {
  X,
  ChevronLeft,
  Megaphone,
  TrendingUp,
  ShieldCheck,
  CircleUserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetOverlay,
} from "@/Components/ui/sheet";
import { ApplyJob } from "@/api_config/Candidate/manageJobs";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface JobDescriptionProps {
  isOpen: boolean;
  onClose: () => void;
  companyName?: string;
  companyLogo: string;
  isVerified?: string | undefined;
  rawDescription?: string;
  isprofileStrength?: string;
  companyAddress?: string;
  companyWebsite?: string;
  extractedData: {
    jobTitle: string;
    workMode: string | null;
  };
  jobId: string;
  // badge?: "growing" | "trusted"
}

export default function JobDescription({
  isOpen,
  onClose,
  companyName,
  companyLogo,
  companyAddress,
  companyWebsite,
  rawDescription,
  extractedData,
  isprofileStrength,
  jobId,
}: JobDescriptionProps) {
  const { data: session, status } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (status === "unauthenticated") {
      router.prefetch("/candidate-signin");
    }
  }, [status, router]);

  const handleApply = async () => {

    if (status !== "authenticated") {
      router.push("/candidate-signin");
      return;
    }

    // Check if onboarding is completed
    const isOnboardingCompleted = (session?.user as any)?.isOnboardingCompleted;
    if (!isOnboardingCompleted) {
      toast.info("Please complete your onboarding before applying.");
      router.push("/candidate-onboarding");
      return;
    }

    try {
      const response = await ApplyJob(jobId);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message || "Failed to apply");
      }
    } catch (error) {
      toast.error("Network error!");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetOverlay className={cn("bg-[#00000061]", "backdrop-blur-none")} />
      <SheetContent
        side="right"
        className="w-full max-w-none min-w-0 md:min-w-[500px] lg:min-w-[700px]  xl:min-w-[800px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="sticky top-0 bg-white border-b border-(--profile-image-border-color) px-4 sm:px-6 py-3 sm:py-4 z-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {/* Close Icon - Top Left */}
              <SheetClose className="p-1.5 sm:p-2 hover:bg-(--navbar-bg-button) rounded-[10px] transition-colors cursor-pointer shrink-0">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-(--navbar-text-color)" />
              </SheetClose>
              <div className="relative shrink-0">
                <Image
                  src={companyLogo}
                  className="w-10 h-10 rounded-[10px] bg-(--profile-border-color) p-1 object-contain border border-(--profile-image-border-color)"
                  alt={companyName || "Company"}
                  width={80}
                  height={80}
                  sizes="40px"
                  unoptimized={companyLogo?.startsWith("http")}
                // onError={(e) => {
                //     (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                // }}
                />
                {isprofileStrength === "New" && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-sky-500">
                    <CircleUserRound className="w-3 h-3 text-sky-600" />
                  </div>
                )}
                {isprofileStrength === "Growing" && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-green-500">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  </div>
                )}
                {isprofileStrength === "Trusted" && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-blue-500">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <SheetTitle className="font-semibold text-(--filter-header-text-color) text-base m-0 truncate">
                    {extractedData.jobTitle}
                  </SheetTitle>
                </div>
                <p className="text-xs text-(--profile-title-color) mt-0.5 text-left">
                  {extractedData.workMode || ""}
                </p>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* Content - Two Column Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* First Box - Company Profile */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6  sm:py-6 lg:border-r lg:border-(--profile-image-border-color) custom-scrollbar">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-(--filter-header-text-color) mb-3 sm:mb-4">
                Company Profile
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={companyLogo || "/Company_icon_webp.webp"}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-[10px] bg-gray-100 p-1 object-contain border border-(--profile-image-border-color)"
                      alt={companyName || "Company"}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <h4 className="font-semibold text-(--filter-header-text-color) text-base sm:text-lg truncate">
                        {companyName || "Company Name"}
                      </h4>
                      <Image
                        src="/Verify.svg"
                        alt="Verified"
                        width={16}
                        height={16}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                      />
                    </div>
                    {/* <p className="text-xs sm:text-sm text-gray-500 mt-1">Technology Company</p> */}
                  </div>
                </div>
                {/* Company Details */}
                <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                  {/* <div>
                                        <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                                        <p className="text-xs sm:text-sm text-gray-900 break-all">careers@northbyte.com</p>
                                    </div> */}
                  <div>
                    <p className="text-xs font-medium text-(--profile-title-color) mb-1">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm text-(--filter-header-text-color)">
                      {companyAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-(--profile-title-color) mb-1">
                      Website
                    </p>

                    <Link
                      href={
                        companyWebsite?.startsWith("http")
                          ? companyWebsite
                          : `https://${companyWebsite}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-(--navbar-text-color) hover:underline cursor-pointer break-all"
                    >
                      {companyWebsite}
                    </Link>
                  </div>

                  {/* <div>
                                        <p className="text-xs font-medium text-gray-500 mb-1">Industry</p>
                                        <p className="text-sm text-gray-900">Technology</p>
                                    </div> */}
                  {/* <div>
                                        <p className="text-xs font-medium text-gray-500 mb-1">Company Size</p>
                                        <p className="text-sm text-gray-900">50-200 employees</p>
                                    </div> */}
                  <div>
                    <p className="text-xs font-medium text-(--profile-title-color) mb-1">
                      About
                    </p>
                    <p className="text-xs sm:text-sm text-(--filter-header-text-color) leading-relaxed">
                      NorthByte Technologies is a leading technology company
                      specializing in software development and IT solutions. We
                      are committed to innovation and excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="hidden lg:block w-px bg-(--profile-image-border-color)"></div>
          <div className="lg:hidden w-full h-px bg-(--profile-image-border-color) my-2"></div>

          {/* Second Box - Job Description */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 custom-scrollbar">
            {/* Info Notification Box - Top */}
            {/* <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3">
                            <Megaphone className="w-5 h-5 text-gray-600 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    You'll need Connects to apply.
                                    <br />
                                    They're like credits that
                                    <br />
                                    show employers you're serious.
                                </p>
                                <a href="#" className="text-sm text-[#14b8a6] font-medium mt-1 inline-block cursor-pointer hover:underline">
                                    Learn more
                                </a>
                            </div>
                        </div> */}

            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-(--filter-header-text-color) mb-3 sm:mb-4">
                Job Description
              </h3>
              <div
                className="text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-wrap [&_p]:mb-2 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-bold [&_strong]:text-gray-900 [&_a]:text-blue-600 [&_a]:font-semibold [&_a]:no-underline [&_a]:cursor-pointer [&_a]:break-all [&_img]:rounded-lg [&_img]:my-2 [&_img]:max-w-full"
                dangerouslySetInnerHTML={{ __html: rawDescription || "" }}
              />
            </div>
          </div>
        </div>

        {/* Apply Button - Bottom */}
        <div className="sticky bottom-0 bg-white border-t border-(--profile-image-border-color) px-4 sm:px-6 py-2.5 z-10 flex justify-start">
          <button
            className="bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white h-9 px-4 sm:px-6 rounded-md font-medium hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) transition-all shadow-sm text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
            onClick={handleApply}
          >
            Apply Now
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
