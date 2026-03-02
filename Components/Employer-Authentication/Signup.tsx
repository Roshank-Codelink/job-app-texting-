"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupValidation } from "@/Validation/AuthValidation";
import { useRouter } from "next/navigation";
import { signupApi } from "@/api_config/SignupApi/signupapi";
import { toast } from "react-toastify";
import { FaBriefcase, FaGlobe, FaMapMarkerAlt, FaPhoneAlt, FaUser, FaBuilding } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Signup() {
  const router = useRouter();

  const handleSubmit = async (values: {
    email: string;
    name: string;
    companyName: string;
    companyAddress: string;
    companyWebsite: string;
    contactNumber: string;
  }) => {
    try {
      const response = await signupApi(values);
      if (!response.error) {
        toast.success(response.data.message);
        router.push("/employer-signin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error");
    }
  };

  const formContent = (
    <Formik
      initialValues={{
        email: "",
        name: "",
        companyName: "",
        companyAddress: "",
        companyWebsite: "",
        contactNumber: "",
      }}
      validationSchema={SignupValidation}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-2.5 uppercase tracking-wide">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <MdEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-(--navbar-text-color) w-4 h-4 transition-colors" />
                <Field
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) focus:border-transparent transition-all h-9"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-[13px] mt-1 ml-1 font-medium" />
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-2.5 uppercase tracking-wide">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-(--navbar-text-color) w-3.5 h-3.5 transition-colors" />
                <Field
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) focus:border-transparent transition-all h-9"
                />
              </div>
              <ErrorMessage name="name" component="div" className="text-red-500 text-[13px] mt-1 ml-1 font-medium" />
            </div>

            {/* Company Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-2.5 uppercase tracking-wide">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <FaBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-(--navbar-text-color) w-3.5 h-3.5 transition-colors" />
                <Field
                  name="companyName"
                  type="text"
                  placeholder="e.g. Jobito Inc"
                  className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) focus:border-transparent transition-all h-9"
                />
              </div>
              <ErrorMessage name="companyName" component="div" className="text-red-500 text-[13px] mt-1 ml-1 font-medium" />
            </div>

            {/* Contact Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-2.5 uppercase tracking-wide">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-(--navbar-text-color) w-3.5 h-3.5 transition-colors" />
                <Field
                  name="contactNumber"
                  type="tel"
                  placeholder="9876543210"
                  className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) focus:border-transparent transition-all h-9"
                />
              </div>
              <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-[13px] mt-1 ml-1 font-medium" />
            </div>

            {/* Company Website */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-2.5 uppercase tracking-wide">
                Company Website <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <FaGlobe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-(--navbar-text-color) w-3.5 h-3.5 transition-colors" />
                <Field
                  name="companyWebsite"
                  type="url"
                  placeholder="https://company.com"
                  className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) focus:border-transparent transition-all h-9"
                />
              </div>
              <ErrorMessage name="companyWebsite" component="div" className="text-red-500 text-[13px] mt-1 ml-1 font-medium" />
            </div>

            {/* Company Address */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-2.5 uppercase tracking-wide">
                Company Address <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <FaMapMarkerAlt className="absolute left-3.5 top-3 text-slate-400 group-focus-within:text-(--navbar-text-color) w-3.5 h-3.5 transition-colors" />
                <Field
                  name="companyAddress"
                  as="textarea"
                  rows={2}
                  placeholder="Enter company headquarters address"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) focus:border-transparent transition-all resize-none min-h-[60px]"
                />
              </div>
              <ErrorMessage name="companyAddress" component="div" className="text-red-500 text-[13px] mt-1 ml-1 font-medium" />
            </div>
          </div>

          <button
            type="submit"
            disabled={!values.email || isSubmitting}
            className="w-full bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white py-2 rounded-full lg:rounded-xl font-bold tracking-wide text-sm hover:shadow-[0_6px_20px_0_rgba(56,189,248,0.45)] hover:brightness-105 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Business Account"}
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white lg:bg-[#f8fafc]">
      <main className="flex-1 flex flex-col lg:items-center lg:justify-center px-6 lg:px-8 xl:px-16 py-2 lg:py-1">
        <div className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-5xl mx-auto flex flex-col lg:flex-row bg-white lg:rounded-2xl lg:shadow-xl lg:border lg:border-slate-100 overflow-hidden lg:min-h-[520px]">

          {/* ——————————————————————————————————————————————————————————————————
              LEFT SECTION: Header + Signup Form (Full width on mobile, Left on desktop)
              —————————————————————————————————————————————————————————————————— */}
          <div className="flex-1 flex flex-col px-1 lg:px-10 xl:px-14 py-4 lg:py-5">

            {/* Header / Logo - Top Centered */}
            <header className="py-4 font-bold text-xl text-slate-900 tracking-tight flex justify-center w-full lg:mb-4">
              <Link href="/employer-hub" className="flex items-center gap-2 group">
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
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-(--job-post-button-bg-to) opacity-80 animate-pulse" />
                  <Image
                    src="/CandidateLogin.png"
                    alt="Employer Signup"
                    width={160}
                    height={160}
                    className="w-[140px] sm:w-[160px] object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mt-6 mb-1.5 text-center">
                  Employer Signup
                </h1>
                <p className="mt-1.5 text-sm text-slate-400 text-center">
                  Create an account to start posting jobs and managing your company profile.
                </p>

              </div>

              {/* Desktop Header Text (Hidden on Mobile) */}
              <div className="hidden lg:block mb-4">
                <h1 className="text-3xl xl:text-4xl font-extrabold text-slate-800 mb-1">Employer Signup</h1>
                <p className="mt-1.5 text-sm text-slate-400">
                  Create an account to start posting jobs and managing your company profile.
                </p>
              </div>

              {formContent}

              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-center lg:justify-start gap-1.5 text-sm">
                <span className="text-slate-500">Already have an account?</span>
                <Link href="/employer-signin" className="font-bold text-(--job-post-button-bg-from) hover:underline">Sign In</Link>
              </div>
            </div>
          </div>

          {/* ——————————————————————————————————————————————————————————————————
              RIGHT SECTION: Professional Branding (Hidden on Mobile)
              —————————————————————————————————————————————————————————————————— */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-[#eef2f7] w-[42%] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-200/20 rounded-full -ml-10 -mb-10 blur-3xl" />

            <div className="relative z-10 w-full mb-3">
              <Image
                src="/CandidateLogin.png"
                alt="Business Welcome"
                width={300}
                height={300}
                className="w-full max-w-[300px] xl:max-w-[340px] mx-auto object-contain drop-shadow-2xl hover:scale-[1.03] transition-transform duration-700"
                priority
              />
            </div>

            <div className="relative z-10 text-center space-y-2 px-2">
              <h2 className="text-xl xl:text-2xl font-bold text-slate-800 leading-tight">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)">Hiring Journey</span> <br />
                with confidence.
              </h2>
              <p className="text-xs xl:text-sm text-slate-500 max-w-[280px] xl:max-w-[320px] mx-auto leading-relaxed">
                The smartest way to reach thousands of talented professionals across the globe.
              </p>
            </div>

            {/* Stats pills */}
            <div className="relative z-10 mt-6 flex gap-3">
              <div className="px-3.5 py-1.5 bg-white/80 backdrop-blur-sm rounded-xl text-center shadow-sm border border-white/40">
                <p className="text-xs font-bold text-slate-800">10k+</p>
                <p className="text-[9px] text-slate-500 uppercase font-medium">Verified</p>
              </div>
              <div className="px-3.5 py-1.5 bg-white/80 backdrop-blur-sm rounded-xl text-center shadow-sm border border-white/40">
                <p className="text-xs font-bold text-slate-800">24h</p>
                <p className="text-[9px] text-slate-500 uppercase font-medium">Turnaround</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Shared Footer */}
      <footer className="mt-auto py-6 px-10 xl:px-16 border-t border-slate-50 lg:border-none flex flex-col lg:flex-row items-center justify-between gap-4 text-[10px] lg:text-xs text-slate-400">
        <span className="text-center lg:text-left">© {new Date().getFullYear()} Jobito for Business. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/company/terms-service" className="hover:text-(--job-post-button-bg-from) transition-colors">
            Terms & Conditions
          </Link>
          <span className="hidden lg:inline text-slate-300">|</span>
          <Link href="/company/privacy-policy" className="hover:text-(--job-post-button-bg-from) transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
