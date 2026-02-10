"use client";

import { useState, useRef, useEffect } from "react";
import { Edit } from "lucide-react";
import Image from "next/image";
import { EmployerInfoData } from "@/api_config/EmployerInfoApi/type";
import { Button } from "@/Components/ui/button";
import { uploadLogo } from "@/api_config/EmployerInfoApi/employerInfo";
import { toast } from "react-toastify";
import { parseMsg } from "@/lib/helpers";
import { useEmployerLogo } from "@/Providers/EmployerLogoProvider";
import companyIcon from "@/public/Company_icon_webp.webp";

const DEFAULT_LOGO = companyIcon.src;
const LOGOS_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_LOGOS_ENDPOINT ?? "";

const BADGE_CONFIG: Record<string, { bgColor: string; borderColor: string; textColor: string; label: string }> = {
  New: { bgColor: "bg-sky-50", borderColor: "border-sky-500", textColor: "text-sky-600", label: "New" },
  Growing: { bgColor: "bg-teal-50", borderColor: "border-teal-500", textColor: "text-teal-600", label: "Growing" },
  Trusted: { bgColor: "bg-purple-50", borderColor: "border-purple-600", textColor: "text-purple-600", label: "Trusted" },
};

export default function CompanyProfileHeader({ employerInfo }: { employerInfo: EmployerInfoData }) {
  const { setCompanyLogoUrl } = useEmployerLogo();
  const defaultLogoUrl = employerInfo?.companyLogo
    ? `${LOGOS_ENDPOINT}/${employerInfo.companyLogo}`
    : DEFAULT_LOGO;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logoUrl = savedLogoUrl ?? defaultLogoUrl;
  const hasPendingChange = !!previewUrl;

  useEffect(() => {
    if (employerInfo?.companyLogo) {
      setCompanyLogoUrl(`${LOGOS_ENDPOINT}/${employerInfo.companyLogo}`);
    }
  }, [employerInfo?.companyLogo]);

  useEffect(() => {
    if (savedLogoUrl && employerInfo?.companyLogo && savedLogoUrl.endsWith(employerInfo.companyLogo)) {
      setSavedLogoUrl(null);
    }
  }, [employerInfo?.companyLogo, savedLogoUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleSaveLogo = async () => {
    if (!hasPendingChange || !fileInputRef.current?.files?.[0]) return;
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("logo", file);
    const response = await uploadLogo(formData);
    if (response.success) {
      toast.success(parseMsg(response.message));
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      fileInputRef.current.value = "";
      const newLogo = response.data?.companyLogo;
      if (newLogo) {
        const newLogoUrl = `${LOGOS_ENDPOINT}/${newLogo}`;
        setSavedLogoUrl(newLogoUrl);
        setCompanyLogoUrl(newLogoUrl);
      }
    } else {
      toast.error(parseMsg(response.message));
    }
  };

  const badgeConfig = employerInfo?.profileStrength
    ? BADGE_CONFIG[employerInfo.profileStrength]
    : null;

  return (
    <div className="w-full flex flex-row items-start sm:items-center gap-3 sm:gap-4 p-2 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col items-center gap-2 shrink-0">
        <label
          htmlFor="profileUpload"
          className="w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] md:w-[90px] md:h-[90px] rounded-full relative cursor-pointer flex items-center justify-center overflow-hidden bg-(--profile-header-bg-color) group  hover:bg-(--profile-image-border-color) transition-all"
        >
          <input
            ref={fileInputRef}
            id="profileUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Company logo"
              className="absolute inset-0 w-full h-full object-contain rounded-full z-10"
            />
          ) : (
            <Image
              src={logoUrl}
              alt="Company logo"
              className="absolute inset-0 w-full h-full object-contain rounded-full z-10"
              width={240}
              height={240}
              unoptimized={logoUrl.startsWith("http")}
            />
          )}
          <button
            onClick={handleEditClick}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition z-20 rounded-full cursor-pointer"
            aria-label="Update logo"
            type="button"
          >
            <Edit className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </button>
        </label>
        <Button
          onClick={handleSaveLogo}
          disabled={!hasPendingChange}
          className="w-auto px-3 py-1.5 text-xs sm:text-sm bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          size="sm"
        >
          Save
        </Button>
      </div>

      <div className="flex-1 min-w-0 w-full sm:w-auto flex flex-col">
        <div className="flex items-center gap-0 mb-1 flex-wrap">
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-(--profile-text-color) break-words">
            {employerInfo?.companyName || "Company Name"}
          </h1>
          <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 shrink-0 -ml-2 sm:-ml-1.5">
            <Image
              src="/Verify.svg"
              alt="Verified"
              width={16}
              height={16}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </div>
        </div>
        <p className="text-xs sm:text-sm text-(--job-post-button-disabled-text-color) break-words mb-1">
          {employerInfo?.email || "Email address"}
        </p>
        {badgeConfig && (
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full border ${badgeConfig.borderColor} ${badgeConfig.bgColor}`}>
              <span className={`text-[10px] sm:text-xs font-medium ${badgeConfig.textColor}`}>
                {badgeConfig.label}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

