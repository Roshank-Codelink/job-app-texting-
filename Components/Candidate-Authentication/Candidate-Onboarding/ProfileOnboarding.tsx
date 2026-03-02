"use client";

import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import * as yup from "yup";
import Select from "react-select";
import {
  User,
  Phone,
  Briefcase,
  MapPin,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaBriefcase } from "react-icons/fa";

import { Input } from "@/Components/ui/input";
import { candidateOnboarding } from "@/api_config/SignupApi/signupapi";
import { CandidateSignUpSkillResponse } from "@/api_config/SignupApi/type";
import { MAP_API_CONFIG } from "@/api_config/shared/sharedapi";

const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  jobTitle: yup.string().required("Job title is required"),
  location: yup.string().required("Location is required"),
});

export default function ProfileOnboarding({
  skillsData,
}: {
  skillsData: CandidateSignUpSkillResponse;
}) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isDetecting, setIsDetecting] = useState(false);

  const initialValues = {
    name: "",
    phone: "",
    jobTitle: "",
    skills: [] as string[],
    location: "",
  };

  const handleComplete = async (values: any) => {
    try {
      const payload = {
        ...values,
        jobTitle: values.jobTitle,
      };
      const response = await candidateOnboarding(payload);
      if (response.statusCode === 200) {
        toast.success(response.data.message);

        await update({
          ...session,
          user: {
            ...session?.user,
            isOnboardingCompleted: true,
            jobTitle: values.jobTitle,
          },
        });

        router.push(`/candidate/jobs?text=${encodeURIComponent(values.jobTitle)}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error");
    }
  };

  const skillOptions =
    skillsData?.data?.map((skill) => ({ value: skill._id, label: skill.name })) ||
    [];

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: "44px",
      backgroundColor: "#f8fafc",
      borderColor: state.isFocused ? "var(--navbar-text-color)" : "#e2e8f0",
      borderRadius: "0.75rem",
      boxShadow: "none",
      fontSize: "0.875rem",
      paddingLeft: "4px",
      transition: "all 0.2s",
      "&:hover": {
        borderColor: "var(--job-post-button-bg-from)",
        backgroundColor: "#ffffff",
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#e0f2fe",
      borderRadius: "6px",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: "#0369a1",
      fontWeight: "500",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "#0369a1",
      "&:hover": {
        backgroundColor: "#0ea5e9",
        color: "white",
      },
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    }),
  };

  const renderForm = (values: any, setFieldValue: any, errors: any, touched: any, isSubmitting: any, isValid: any) => {
    const detectLocation = () => {
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by your browser");
        return;
      }
      setIsDetecting(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          try {
            const response = await MAP_API_CONFIG(lat, lng);
            if (response.error || response.statusCode !== 200) {
              throw new Error("API Error");
            }
            const apiData = response.data as { success: boolean; data: any };
            if (!apiData.success) {
              throw new Error("API Error");
            }
            const data = apiData.data;
            const address = data.address || {};
            const city =
              address.city ||
              address.town ||
              address.village ||
              address.county ||
              "";
            const state = address.state || "";
            const locationName =
              city && state
                ? `${city}, ${state}`
                : data.display_name || `${lat}, ${lng}`;
            setFieldValue("location", locationName);
            setIsDetecting(false);
          } catch (error) {
            setIsDetecting(false);
            console.error("Error fetching location:", error);
            toast.error("Failed to get location address");
          }
        },
        (error) => {
          setIsDetecting(false);
          console.error("Geolocation error:", error);
          toast.error("Location permission denied");
        }
      );
    };

    const selectedSkillValues = values.skills
      ?.map((val: string) => skillOptions.find((option) => option.value === val))
      .filter(Boolean);

    return (
      <Form className="space-y-2.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-(--profile-menu-text-color) mb-2.5 uppercase tracking-wide">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[color:var(--navbar-text-color)] transition-colors" />
              <Input
                type="text"
                name="name"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-11 pr-4 py-2 bg-slate-50 border-slate-200 rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-[color:var(--navbar-text-color)] focus-visible:border-transparent hover:border-[color:var(--job-post-button-bg-from)] transition-all h-10"
              />
            </div>
            {errors.name && touched.name && (
              <p className="text-red-500 text-[13px] font-medium ml-1 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-(--profile-menu-text-color) mb-2.5 uppercase tracking-wide">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[color:var(--navbar-text-color)] transition-colors" />
              <Input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setFieldValue("phone", val.slice(0, 10));
                }}
                placeholder="9876543210"
                inputMode="numeric"
                className="w-full pl-11 pr-4 py-2 bg-slate-50 border-slate-200 rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-[color:var(--navbar-text-color)] focus-visible:border-transparent hover:border-[color:var(--job-post-button-bg-from)] transition-all h-10"
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="text-red-500 text-[13px] font-medium ml-1 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Job Title */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-(--profile-menu-text-color) mb-2.5 uppercase tracking-wide">
              Job Title <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[color:var(--navbar-text-color)] transition-colors" />
              <Input
                type="text"
                name="jobTitle"
                value={values.jobTitle}
                onChange={(e) => setFieldValue("jobTitle", e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full pl-11 pr-4 py-2 bg-slate-50 border-slate-200 rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-[color:var(--navbar-text-color)] focus-visible:border-transparent hover:border-[color:var(--job-post-button-bg-from)] transition-all h-10"
              />
            </div>
            {errors.jobTitle && touched.jobTitle && (
              <p className="text-red-500 text-[13px] font-medium ml-1 mt-1">{errors.jobTitle}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-(--profile-menu-text-color) mb-2.5 uppercase tracking-wide">
              Job Location <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[color:var(--navbar-text-color)] transition-colors" />
              <Input
                type="text"
                name="location"
                value={values.location || ""}
                onChange={(e) => setFieldValue("location", e.target.value)}
                onFocus={() => {
                  if (!values.location) detectLocation();
                }}
                placeholder="City/Area"
                className="w-full pl-11 pr-10 py-2 bg-slate-50 border-slate-200 rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-[color:var(--navbar-text-color)] focus-visible:border-transparent hover:border-[color:var(--job-post-button-bg-from)] transition-all h-10"
              />
              {isDetecting && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-4 h-4 animate-spin text-(--navbar-text-color)" />
                </div>
              )}
            </div>
            {errors.location && touched.location && (
              <p className="text-red-500 text-[13px] font-medium ml-1 mt-1">{errors.location}</p>
            )}
          </div>
        </div>

        {/* Skills - Full Width */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-(--profile-menu-text-color) mb-2.5 uppercase tracking-wide">
            Key Skills <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10 group-focus-within:text-[color:var(--navbar-text-color)] transition-colors" />
            <Select
              isMulti
              options={skillOptions}
              value={selectedSkillValues}
              onChange={(selectedOptions: any) => {
                const skillIds = selectedOptions
                  ? selectedOptions.map((option: any) => option.value)
                  : [];
                setFieldValue("skills", skillIds);
              }}
              placeholder="Search and select skills..."
              styles={customStyles}
              className="text-sm cursor-pointer z-10"
              classNamePrefix="react-select"
              menuPortalTarget={typeof document !== "undefined" ? document.body : null}
              menuPosition="fixed"
              menuPlacement="bottom"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white py-2.5 rounded-full lg:rounded-xl font-bold tracking-wide text-sm hover:shadow-[0_6px_20px_rgba(56,189,248,0.45)] hover:brightness-105 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Completing...
            </>
          ) : (
            <>
              COMPLETE ONBOARDING
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </Form>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white lg:bg-[#f8fafc]">
      <main className="flex-1 flex flex-col lg:items-center lg:justify-center px-6 lg:px-8 xl:px-16 py-4 lg:py-2">
        <div className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-5xl mx-auto flex flex-col lg:flex-row bg-white lg:rounded-2xl lg:shadow-xl lg:border lg:border-slate-100 overflow-hidden lg:min-h-[580px]">

          {/* ——————————————————————————————————————————————————————————————————
              LEFT SECTION: Header + Form (Full width on mobile, Left on desktop)
              —————————————————————————————————————————————————————————————————— */}
          <div className="flex-1 flex flex-col px-1 lg:px-10 xl:px-14 py-4 lg:py-8">

            {/* Header / Logo - Top Centered */}
            <header className="py-2 font-bold text-xl text-slate-900 tracking-tight flex justify-center w-full lg:mb-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 shrink-0 rounded-[10px] bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) flex items-center justify-center shadow-sm group-hover:shadow-[0_4px_14px_0_rgba(56,189,248,0.5)] group-hover:scale-105 transition-all">
                  <FaBriefcase className="w-[55%] h-[55%] text-white" />
                </div>
                <span className="font-bold text-2xl text-slate-900 tracking-tight">
                  Jobito<span className="text-(--job-post-button-bg-to)">.</span>
                </span>
              </Link>
            </header>

            <div className="flex-1 flex flex-col justify-center">
              {/* Mobile Illustration (Hidden on Desktop) */}
              <div className="lg:hidden flex flex-col items-center mb-8 mt-4">
                <div className="relative">
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-(--job-post-button-bg-to) opacity-80" />
                  <Image
                    src="/onboading.png"
                    alt="Profile Setup"
                    width={160}
                    height={160}
                    className="w-[120px] sm:w-[140px] object-contain drop-shadow-md"
                    priority
                  />
                </div>
                <div className="mt-5 text-center">
                  <h1 className="text-2xl font-bold text-slate-800">
                    Complete Profile
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-400">
                    Just a few details to get you started
                  </p>
                </div>
              </div>

              {/* Desktop Header Text (Hidden on Mobile) */}
              <div className="hidden lg:block mb-8">
                <h1 className="text-3xl xl:text-4xl font-extrabold text-slate-800 mb-1">
                  Profile Details
                </h1>
                <p className="text-sm text-slate-500">
                  Help us find the best job matches for your skills.
                </p>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={handleComplete}
                validateOnMount={true}
              >
                {(props) => renderForm(props.values, props.setFieldValue, props.errors, props.touched, props.isSubmitting, props.isValid)}
              </Formik>
            </div>
          </div>

          {/* ——————————————————————————————————————————————————————————————————
              RIGHT SECTION: Professional Branding (Hidden on Mobile)
              —————————————————————————————————————————————————————————————————— */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-[#eef2f7] w-[42%] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-200/20 rounded-full -ml-10 -mb-10 blur-3xl" />

            <div className="relative z-10 w-full mb-6 text-center">
              <Image
                src="/onboading.png"
                alt="Onboarding Portal"
                width={300}
                height={300}
                className="w-full max-w-[260px] xl:max-w-[300px] mx-auto object-contain drop-shadow-2xl hover:scale-[1.03] transition-transform duration-700"
                priority
              />
            </div>

            <div className="relative z-10 text-center space-y-2 px-2">
              <h2 className="text-xl xl:text-2xl font-bold text-slate-800 leading-tight">
                Finish Setting Up <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)">
                  Your Profile.
                </span>
              </h2>
              <p className="text-xs xl:text-sm text-slate-500 max-w-[260px] mx-auto leading-relaxed">
                Step closer to your dream job by completing these final details.
              </p>
            </div>

            {/* Stats pills */}
            <div className="relative z-10 mt-6 flex gap-3">
              <div className="px-3.5 py-1.5 bg-white/80 backdrop-blur-sm rounded-xl text-center shadow-sm border border-white/40">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-tight flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-teal-500" /> Secure
                </p>
              </div>
              <div className="px-3.5 py-1.5 bg-white/80 backdrop-blur-sm rounded-xl text-center shadow-sm border border-white/40">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-tight flex items-center gap-1">
                  <Zap className="w-3 h-3 text-sky-500" /> Fast
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Shared Footer */}
      <footer className="mt-auto py-6 px-10 xl:px-16 border-t border-slate-50 lg:border-none flex flex-col lg:flex-row items-center justify-between gap-4 text-[10px] lg:text-xs text-slate-400">
        <span className="text-center lg:text-left">© {new Date().getFullYear()} Jobito. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/company/terms-service" className="hover:text-[color:var(--job-post-button-bg-from)] transition-colors">
            Terms & Conditions
          </Link>
          <span className="hidden lg:inline text-slate-300">|</span>
          <Link href="/company/privacy-policy" className="hover:text-[color:var(--job-post-button-bg-from)] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
