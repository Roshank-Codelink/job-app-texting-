"use client";

import { useState, useRef, useEffect } from "react";
import { Edit, X, Crop } from "lucide-react";
import Image from "next/image";
import Cropper, { ReactCropperElement } from "react-cropper";

// Note: Agar error aaye to check karein ki 'cropperjs' install hai ya nahi
import "cropperjs/dist/cropper.css";

import { EmployerInfoData } from "@/api_config/EmployerInfoApi/type";
import { Button } from "@/Components/ui/button";
import { uploadLogo } from "@/api_config/EmployerInfoApi/employerInfo";
import { toast } from "react-toastify";
import { parseMsg } from "@/lib/helpers";
import { useEmployerLogo } from "@/Providers/EmployerLogoProvider";
import { UploadCloud } from "lucide-react";

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
  const defaultLogoUrl = employerInfo?.companyLogo ? `${LOGOS_ENDPOINT}/${employerInfo.companyLogo}` : DEFAULT_LOGO;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(null);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const logoUrl = savedLogoUrl ?? defaultLogoUrl;
  const hasPendingChange = !!previewUrl;

  // Click handler to trigger hidden input
  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (employerInfo?.companyLogo) {
      setCompanyLogoUrl(`${LOGOS_ENDPOINT}/${employerInfo.companyLogo}`);
    }
  }, [employerInfo?.companyLogo, setCompanyLogoUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/") || file.type.includes("svg")) {
      toast.error("Only JPG and PNG images are allowed.");
      return;
    }

    setCropImage(URL.createObjectURL(file));
    // Reset input value so same file can be selected again if needed
    e.target.value = "";
  };

  const handleCropSave = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas({ width: 300, height: 300 }).toBlob((blob) => {
      if (!blob) return;
      setCroppedBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
      setCropImage(null);
    }, "image/png");
  };

  const handleSaveLogo = async (blobToUpload?: Blob) => {
    const targetBlob = blobToUpload || croppedBlob;
    if (!targetBlob) return;

    const formData = new FormData();
    formData.append("logo", targetBlob, "company-logo.png");
    const response = await uploadLogo(formData);
    if (response.success) {
      toast.success(parseMsg(response.message));
      setPreviewUrl(null);
      setCroppedBlob(null);
      setCropImage(null); // Close modal on success
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

  const badgeConfig = employerInfo?.profileStrength ? BADGE_CONFIG[employerInfo.profileStrength] : null;

  return (
    <>
      <div className="w-full flex flex-row items-start sm:items-center gap-3 sm:gap-4 p-2 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col items-center gap-2 shrink-0">
          {/* Main Container with Click Handler */}
          <div
            onClick={handleLogoClick}
            className="w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] md:w-[90px] md:h-[90px] rounded-full relative cursor-pointer flex items-center justify-center overflow-hidden bg-gray-100 group border-2 border-transparent hover:border-sky-400 transition-all shadow-sm"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              className="hidden"
            />

            <Image
              src={previewUrl || logoUrl}
              alt="Logo"
              className="absolute inset-0 w-full h-full object-cover rounded-full z-10"
              width={240}
              height={240}
              unoptimized={true}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
              <Edit className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate">
              {employerInfo?.companyName || "Company Name"}
            </h1>
            <Image src="/Verify.svg" alt="Verified" width={18} height={18} className="shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-2 truncate">{employerInfo?.email}</p>
          {badgeConfig && (
            <div className={`inline-flex px-3 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${badgeConfig.borderColor} ${badgeConfig.bgColor} ${badgeConfig.textColor}`}>
              {badgeConfig.label}
            </div>
          )}
        </div>
      </div>

      {/* ======= MODAL IMPROVEMENTS ======= */}
      {cropImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[480px] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

            {/* ================= Header ================= */}
            <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-50 rounded-lg">
                  <Crop className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 leading-tight">
                    Adjust Company Logo
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Position and resize your logo for the best visual fit
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCropImage(null)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                aria-label="Close logo editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ================= Body ================= */}
            <div className="p-6 bg-[#f8fafc]">
              {/* Visual frame for the 280x280 area */}
              <div className="w-[280px] h-[280px] mx-auto relative bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                <Cropper
                  ref={cropperRef}
                  src={cropImage}
                  style={{ width: "100%", height: "100%" }}
                  aspectRatio={1}
                  viewMode={2}
                  dragMode="move"
                  guides={true}
                  background={true}
                  autoCropArea={1}
                  responsive={true}
                  checkOrientation={false}
                  toggleDragModeOnDblclick={false}
                  cropBoxResizable={true}
                  modal={false}
                  center={true}
                />
              </div>


              {/* Helper text */}
              <div className="flex justify-center mt-5">
                <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm text-slate-400 text-[11px] font-medium">
                  <UploadCloud className="w-4 h-4 text-sky-500" />
                  <span>Drag to reposition • Scroll to zoom</span>
                </div>
              </div>
            </div>

            {/* ================= Footer ================= */}
            <div className="px-6 py-4 flex justify-end gap-3 bg-white border-t border-gray-100">
              <Button
                variant="ghost"
                className="rounded-xl px-5 text-gray-500 hover:bg-gray-100"
                onClick={() => setCropImage(null)}
              >
                Cancel
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  const cropper = cropperRef.current?.cropper;
                  if (!cropper) return;

                  // Crop and then call API using the result
                  cropper.getCroppedCanvas({ width: 300, height: 300 }).toBlob((blob) => {
                    if (blob) {
                      handleSaveLogo(blob);
                    }
                  }, "image/png");
                }}
                className="w-auto px-4 py-1.5 h-8 text-xs cursor-pointer font-semibold bg-gradient-to-r from-sky-400 to-teal-400 text-white rounded-full shadow-md disabled:opacity-50"
              >
                Save
              </Button>
            </div>

          </div>
        </div >
      )
      }
    </>
  );
}