"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Otp from "./Otp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthValidation } from "@/Validation/AuthValidation";
import { toast } from "react-toastify";
import { loginApi } from "@/api_config/SigninApi/loginapi";
import { useSearchParams } from "next/navigation";
import { FaBriefcase } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SignIn() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const Role = "EMPLOYER";

  const handleSendOtp = async (values: { email: string; role: string }) => {
    setIsLoading(true);
    try {
      setEmail(values.email);
      const response = await loginApi(values.email, Role as string);
      if (response.statusCode === 200) {
        toast.success(response.data.message);
        setShowOtp(true);
      } else {
        toast.error(response.data?.message || "Something went wrong");
      }
    } catch (emailError: any) {
      toast.error(emailError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const otp = searchParams.get("otp");
    if (otp === "true") {
      let storedEmail: string | null = null;
      if (typeof window !== "undefined") {
        storedEmail = sessionStorage.getItem("employerEmail");
      }
      if (storedEmail) setEmail(storedEmail);
      setShowOtp(true);
    }
  }, [searchParams]);

  const handleEditEmail = () => setShowOtp(false);

  // Reusable form content to avoid duplication between layouts
  const formContent = (
    <div className="w-full">
      {!showOtp ? (
        <Formik
          initialValues={{ email: "", role: Role }}
          validationSchema={AuthValidation}
          onSubmit={(values) => handleSendOtp(values)}
        >
          {({ values }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-2.5 uppercase tracking-wide">
                  Business Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-(--navbar-text-color) transition-colors">
                    <MdEmail className="w-5 h-5" />
                  </span>
                  <Field
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) focus:border-transparent transition-all"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-[13px] mt-1 ml-1 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={!values.email || isLoading}
                className="w-full bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white py-2 rounded-full lg:rounded-xl font-bold tracking-wide text-sm hover:shadow-[0_6px_20px_0_rgba(56,189,248,0.45)] hover:brightness-105 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending OTP...
                  </>
                ) : (
                  "Get Verification Code"
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-400 leading-relaxed max-w-[300px] mx-auto">
                  By signing in, you agree to our{" "}
                  <Link href="/company/terms-service" className="text-(--job-post-button-bg-from) font-semibold hover:underline">Terms</Link> &{" "}
                  <Link href="/company/privacy-policy" className="text-(--job-post-button-bg-from) font-semibold hover:underline">Privacy Policy</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          <Otp email={email} onEdit={handleEditEmail} />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white lg:bg-[#f8fafc]">
      <main className="flex-1 flex flex-col lg:items-center lg:justify-center px-6 lg:px-8 xl:px-16 py-4 lg:py-2">
        <div className="w-full max-w-[440px] md:max-w-[500px] lg:max-w-5xl mx-auto flex flex-col lg:flex-row bg-white lg:rounded-2xl lg:shadow-xl lg:border lg:border-slate-100 overflow-hidden lg:min-h-[480px]">

          {/* ——————————————————————————————————————————————————————————————————
              LEFT SECTION: Header + Form (Full width on mobile, Left on desktop)
              —————————————————————————————————————————————————————————————————— */}
          <div className="flex-1 flex flex-col px-1 lg:px-10 xl:px-14 py-4 lg:py-6">

            {/* Header / Logo - Styled for all screens */}
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
              {/* Mobile/Tablet Illustration (Hidden on Desktop) */}
              <div className="lg:hidden flex flex-col items-center mb-8 mt-4">
                <div className="relative">
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-(--job-post-button-bg-to) opacity-80 animate-pulse" />
                  <Image
                    src="/CandidateLogin.png"
                    alt="Employer Login"
                    width={180}
                    height={180}
                    className="w-[140px] sm:w-[160px] object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                <h1 className="mt-6 text-2xl font-bold text-slate-800 text-center">
                  Employer Login
                </h1>
                <p className="mt-1.5 text-sm text-slate-400 text-center">
                  {showOtp ? `We've sent a code to ${email}` : "Enter your business Email to access your dashboard"}
                </p>
              </div>

              {/* Desktop Header Text (Hidden on Mobile) */}
              <div className="hidden lg:block mb-6">

                <h1 className="text-3xl xl:text-4xl font-extrabold text-slate-800 mb-1">
                  Employer Login
                </h1>
                <p className="text-sm text-slate-500">
                  {showOtp
                    ? `We've sent a code to ${email}`
                    : "Enter your business Email to access your dashboard"}
                </p>
              </div>

              {formContent}

              {/* Links and Footer-like elements inside the form column */}
              {!showOtp && (
                <div className="mt-8 lg:mt-6 pt-6 lg:pt-4 border-t border-slate-100 lg:border-slate-50 flex flex-col items-center lg:items-start space-y-3 lg:space-y-2">
                  <p className="text-sm text-slate-500 text-center lg:text-left">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/employer-signup"
                      className="font-bold text-(--job-post-button-bg-from) hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ——————————————————————————————————————————————————————————————————
              RIGHT SECTION: Multi-device Illustration (Hidden on Mobile)
              —————————————————————————————————————————————————————————————————— */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-[#eef2f7] w-[42%] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-200/20 rounded-full -ml-10 -mb-10 blur-3xl" />

            <div className="relative z-10 w-full mb-6">
              <Image
                src="/CandidateLogin.png"
                alt="Employer Panel"
                width={300}
                height={300}
                className="w-full max-w-[300px] xl:max-w-[340px] mx-auto object-contain drop-shadow-2xl hover:scale-[1.03] transition-transform duration-700"
                priority
              />
            </div>

            <div className="relative z-10 text-center space-y-2 px-2">
              <h2 className="text-xl xl:text-2xl font-bold text-slate-800 leading-tight">
                Hire the <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)">right talent</span> <br />
                in half the time.
              </h2>
              <p className="text-xs xl:text-sm text-slate-500 max-w-[280px] xl:max-w-[320px] mx-auto leading-relaxed">
                Jobito platform helps recruiters connect with verified experts who match their company culture.
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
