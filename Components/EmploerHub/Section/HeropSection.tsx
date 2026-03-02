"use client"
import { Search, Eye, Clock, Heart, Bookmark, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "@/api_config/SigninApi/loginapi";
import { toast } from "react-toastify";
import { AuthValidation } from "@/Validation/AuthValidation";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const Role = "EMPLOYER"

  const handleSendOtp = async (values: { email: string, role: string }) => {
    setIsLoading(true);
    try {
      setEmail(values.email)
      const response = await loginApi(values.email, Role as string);
      if (response.statusCode === 200) {
        console.log("Response:", response);
        toast.success(response.data.message);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("employerEmail", values.email);
        }
        router.push(`/employer-signin?otp=true`);
      } else {
        const errorMessage = response.data?.message;
        toast.error(errorMessage);
        console.log("Response Error:", response);
      }
    } catch (emailError: any) {
      console.error("Email Error:", emailError);
      toast.error(emailError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="w-full bg-gradient-to-r from-(--navbar-bg-parent) via-white to-(--signin-bg-color-to)">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[55%]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-(--job-post-button-bg-to)/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-(--job-post-button-bg-to)" />
              <p className="text-[14px] font-semibold font-[600]  text-(--job-post-button-bg-to)">
                AI-Powered Hiring Platform
              </p>
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-4xl sm:text-6xl lg:text-[60px] font-extrabold leading-[1.05] text-(--navbar-logo-text-color)">
              Hire Smarter with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)">
                AI-Powered
              </span> Job Posting
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-[18px] text-(--profile-title-color)">
              Post high-quality jobs, get AI validation, and connect with skill-matched candidates through Jobito’s smart job feed. Save time and hire the best.
            </p>

            {/* Search / CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href={"/employer-signin"} className="rounded-full bg-gradient-to-r cursor-pointer flex items-center justify-center gap-2 from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) px-6 py-3 text-white font-semibold shadow-lg hover:opacity-90 transition">
                <span className="text-[18px]">Post a Job</span>
                <ArrowRight size={18} className="transition-transform" />
              </Link>

              <Link href={"/employer-signin"} className="rounded-full border border-slate-200 bg-(--sidebar-bg-color) px-6 py-3 flex items-center justify-center gap-2 text-[15px] font-semibold text-(--active-job-title-text)  hover:bg-slate-50 transition cursor-pointer">

                <span className="text-[18px] text-(--post-card-bg-color)">
                  Create Employer Account
                </span>
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-center md:text-left text-[14px] sm:text-[14px] font-[500] text-(--profile-title-color)">
              <div className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
                <span>No credit card required</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
                <span>14-day free trial</span>
              </div>
            </div>
          </div>

          {/* RIGHT PREVIEW CARD / SIGNUP FORM */}
          <div className="hidden lg:flex lg:w-[55%] justify-end relative">
            <div className="w-full max-w-lg bg-(--navbar-bg-parent)/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-(--job-post-button-border-color)">
              <div className="text-left mb-5">
                <h2 className="text-xl font-bold text-(--profile-name-color) whitespace-nowrap">
                  Let&apos;s Get Started
                </h2>
                <p className="text-(--profile-title-color) text-sm mt-1">
                  Hire top talent faster with <span className="text-(--job-post-button-bg-to) font-semibold">Jobito</span>
                </p>
              </div>
              {/* EMAIL SECTION - Show when OTP not sent */}
              <Formik initialValues={{ email: '', role: Role as string }} validationSchema={AuthValidation} onSubmit={(values) => handleSendOtp(values)}>
                {({ values }) => (
                  <Form>
                    <div className="mb-4">
                      <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1.5">
                        Email Address <span className="text-(--profile-menu-sign-out-color)">*</span>
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-3 py-2.5  border border-(--job-post-button-border-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) text-(--profile-menu-text-color) text-sm transition-all"
                      />

                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2 ml-1" />
                    </div>

                    <button
                      type="submit"
                      disabled={!values.email || isLoading}
                      className="w-full bg-gradient-to-r cursor-pointer from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-(--navbar-bg-parent) py-2.5 rounded-lg font-semibold hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) transition-all shadow-lg shadow-cyan-500/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-(--job-post-button-bg-from) disabled:hover:to-(--job-post-button-bg-to) flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
              {/* TERMS AND PRIVACY POLICY */}
              <div className="mt-4 text-center">
                <p className="text-xs text-(--profile-title-color)">
                  By clicking continue, you agree to the Jobito{" "}
                  <Link href="/company/terms-service" className="text-(--job-post-button-bg-to) hover:text-(--navbar-text-color) underline transition-colors">
                    Terms of service
                  </Link>
                  {" "}&{" "}
                  <Link href="/company/privacy-policy" className="text-(--job-post-button-bg-to) hover:text-(--navbar-text-color) underline transition-colors">
                    Privacy policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
