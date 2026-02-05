"use client";

import { useRef } from "react";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { EmployerInfoData } from "@/api_config/EmployerInfoApi/type";
import { Button } from "@/Components/ui/button";
import { uploadLogo } from "@/api_config/EmployerInfoApi/employerInfo";
import { toast } from "react-toastify";
import { parseMsg } from "@/lib/helpers";
import dummyImage from "@/public/dummy-image.png";

export default function CompanyProfileHeader({ employerInfo }: { employerInfo: EmployerInfoData }) {

  const imagePreview =
    employerInfo?.companyLogo
      ? `${process.env.NEXT_PUBLIC_SERVER_LOGOS_ENDPOINT}/${employerInfo.companyLogo}`
      : dummyImage;


      // const [imagePreview, setImagePreview] = useState<string | null>(null);


  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    // No local preview change; image comes from employer profile or fallback
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveImage = async () => {
    // TODO: Add API call to save the image
    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("logo", file);
      const response = await uploadLogo(formData);
      if (response.success) {
        toast.success(parseMsg(response.message));
      } else {
        toast.error(parseMsg(response.message));
      }
      // Here you would typically upload the file to your server
      // For example: await uploadProfileImage(file);
    }
  };

  // Profile Strength Badge Config
  const profileStrength = employerInfo?.profileStrength;
  const getBadgeConfig = (strength: string) => {
    if (strength === "New") {
      return {
        bgColor: "bg-sky-50",
        borderColor: "border-sky-500",
        textColor: "text-sky-600",
        label: "New"
      };
    }
    if (strength === "Growing") {
      return {
        bgColor: "bg-teal-50",
        borderColor: "border-teal-500",
        textColor: "text-teal-600",
        label: "Growing"
      };
    }
    if (strength === "Trusted") {
      return {
        bgColor: "bg-purple-50",
        borderColor: "border-purple-600",
        textColor: "text-purple-600",
        label: "Trusted"
      };
    }
    return null;
  };

  const badgeConfig = profileStrength ? getBadgeConfig(profileStrength) : null;

  return (
    <div className="w-full flex flex-row sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-2 sm:p-4 mb-4 sm:mb-6">
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <label
          htmlFor="profileUpload"
          className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] rounded-full relative cursor-pointer border-2 border-dashed flex items-center justify-center overflow-hidden bg-(--profile-header-bg-color) group border-(--profile-header-border-color) hover:bg-(--profile-image-border-color) transition-all"
        >
          <input
            ref={fileInputRef}
            id="profileUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {imagePreview ? (
            <>
              <Image
                src={imagePreview}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover rounded-full z-10"
                width={200}
                height={200}
                unoptimized={(imagePreview as string).startsWith("http://localhost")}

              />
              {/* <img
                src={`${process.env.NEXT_PUBLIC_SERVER_LOGOS_ENDPOINT}/${employerInfo.companyLogo}`}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover rounded-full z-10"
                width={60}
                height={60}

              /> */}
              <button
                onClick={handleDeleteImage}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition z-20 rounded-full cursor-pointer"
                aria-label="Delete image"
                type="button"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 text-(--profile-title-color)">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
          )}
        </label>
        {/* Save Button - Only shown when image is uploaded */}
        {imagePreview && (
          <Button
            onClick={handleSaveImage}
            className="w-auto px-3 py-1.5 text-xs sm:text-sm bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) cursor-pointer transition-all"
            size="sm"
          >
            Save
          </Button>
        )}
      </div>

      {/* Company Name, Email and Badges */}
      <div className="flex-1 min-w-0 w-full sm:w-auto flex flex-col">
        {/* Company Name with Verified Badge */}
        <div className="flex items-center gap-0 mb-1 flex-wrap">
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-(--profile-text-color) break-words">
            {employerInfo?.companyName || "Company Name"}
          </h1>
          <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 shrink-0 -ml-2 sm:-ml-1.5">
            <Image
              src="/verify.svg"
              alt="Verified"
              width={16}
              height={16}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </div>
        </div>
        {/* Email */}
        <p className="text-xs sm:text-sm text-(--job-post-button-disabled-text-color) break-words mb-1">
          {employerInfo?.email || "Email address"}
        </p>
        {/* Profile Strength Badge */}
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

