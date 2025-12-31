"use client";
import { useState } from "react";
import Link from "next/link";
import Otp from "./Otp";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthValidation } from "@/Validation/AuthValidation";
import { toast } from "react-toastify";
import { loginApi } from "@/api_config/SigninApi/loginapi";

export default function SignIn() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const Role="EMPLOYER"


  const handleSendOtp = async (values: { email: string, role: string }) => {
    setIsLoading(true);
    try {
      setEmail(values.email)
      const response = await loginApi(values.email, Role as string);
      if (response.statusCode === 200) {
        console.log("Response:", response);
        toast.success(response.data.message);
        setShowOtp(true);
        // sessionStorage.setItem("email", values.email);

      } else {
        const errorMessage = response.data?.message ;
        toast.error(errorMessage);
        console.log("Response Error:", response);
      }
    } catch (emailError: any) {
      console.error("Email Error:", emailError);
      toast.error(emailError.message);
    } finally {``
      setIsLoading(false);
    }
  };

  const handleEditEmail = () => {
    setShowOtp(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">

      {/* Background Image/Pattern Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-(--navbar-bg-button) via-white to-(--signin-bg-color-to)">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Large Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-(--navbar-text-color)/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-(--job-post-button-bg-to)/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-col justify-center px-16 relative z-10">
        <h1 className="text-4xl font-bold text-(--navbar-logo-text-color) leading-tight">
          Find your dream job <br /> simply and quickly
        </h1>

        <p className="mt-4 text-(--profile-title-color) max-w-md">
          Connect with top companies and get hired faster with our smart job platform.
        </p>

        <div className="mt-10 flex gap-10">
          <div>
            <p className="text-2xl font-bold text-(--job-post-button-bg-to)">100k+</p>
            <p className="text-sm text-(--sidebar-menu-icone-color)">Jobs Posted</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-(--job-post-button-bg-to)">50k+</p>
            <p className="text-sm text-[#64748b]">Companies</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-(--job-post-button-bg-to)">500+</p>
            <p className="text-sm text-(--job-post-button-disabled-text-color)">Cities</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-sm bg-(--navbar-bg-parent)/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-(--job-post-button-border-color)">
          <div className="text-left mb-5">
            <h2 className="text-xl font-bold text-(--profile-name-color) whitespace-nowrap">
              Let&apos;s Get Started
            </h2>
            <p className="text-(--profile-title-color) text-sm mt-1">
              Hire top talent faster with <span className="text-(--job-post-button-bg-to) font-semibold">Jobito</span>
            </p>
          </div>

          {/* EMAIL SECTION - Show when OTP not sent */}
          {!showOtp && (
            <Formik initialValues={{ email: '' ,role: Role as string}} validationSchema={AuthValidation} onSubmit={(values) => handleSendOtp(values)}>
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
          )}

          {/* OTP SECTION - Show when OTP sent (Using your Otp.tsx component) */}
          {showOtp && <Otp email={email} onEdit={handleEditEmail} />}

          {/* TERMS AND PRIVACY POLICY */}
          {!showOtp && (
            <div className="mt-4 text-center">
              <p className="text-xs text-(--profile-title-color)">
                By clicking continue, you agree to the Jobito{" "}
                <Link href="/terms-of-service" className="text-(--job-post-button-bg-to) hover:text-(--navbar-text-color) underline transition-colors">
                  Terms of service
                </Link>
                {" "}&{" "}
                <Link href="/privacy-policy" className="text-(--job-post-button-bg-to) hover:text-(--navbar-text-color) underline transition-colors">
                  Privacy policy
                </Link>
              </p>
            </div>
          )}

          {/* SIGNUP/REGISTER LINKS */}
          {!showOtp && (
            <div className="mt-6 text-center">
              <p className="text-sm text-(--profile-title-color) mb-3">
                Don't have an account?{" "}
                <Link href="/employer-signup" className="text-(--job-post-button-bg-to) hover:text-(--navbar-text-color) font-semibold underline transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}