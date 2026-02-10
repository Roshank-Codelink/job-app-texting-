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
    const Role = "EMPLOYEE"

    const handleSendOtp = async (values: { email: string, role: string }) => {
        setIsLoading(true);
        try {
            setEmail(values.email)
            const response = await loginApi(values.email, Role as string);
            if (response.statusCode === 200) {
                console.log("Response:", response);
                toast.success(response.data.message);
                setShowOtp(true);
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

    const handleEditEmail = () => {
        setShowOtp(false);
    };
    return (
        <div className="min-h-screen w-full relative overflow-hidden flex bg-gradient-to-br from-(--navbar-bg-button) via-white to-(--signin-bg-color-to) lg:bg-transparent lg:bg-none">
            {/* LEFT SECTION - Hidden on mobile */}
            <div className="hidden lg:flex w-1/2 bg-[#F0F9FF] relative overflow-hidden flex-col">
                <div className="absolute w-[360px] h-[360px] rounded-full bg-[#DBEAFE] -left-[210px] top-1/2 -translate-y-1/2 opacity-30" />

                <div className="absolute w-[260px] h-[260px] rounded-full bg-[#BFDBFE] -left-[155px] top-1/2 -translate-y-1/2 opacity-50" />

                <div className="absolute w-[180px] h-[180px] rounded-full bg-[#93C5FD] -left-[105px] top-1/2 -translate-y-1/2 opacity-70" />

                {/* Content - Top */}
                <div className="relative z-10 ml-8 lg:ml-[5rem] xl:ml-[7rem] mt-8 lg:mt-12 xl:mt-16 flex flex-col gap-3 lg:gap-4">
                    {/* Logo/Name */}
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">
                        <span className="text-gray-900">Job</span>
                        <span className="text-[#2DD4BF]">ito</span>
                    </h1>

                    {/* Main Heading */}
                    <h2 className="text-xl lg:text-2xl xl:text-3xl text-gray-800 leading-tight mt-6 lg:mt-8 xl:mt-12">
                        Start your career journey with us
                    </h2>

                    {/* Sub Heading */}
                    <p className="text-sm lg:text-base xl:text-lg text-gray-600 max-w-xs lg:max-w-sm xl:max-w-md">
                        Find jobs worldwide that match your<br></br>Profile: Faster, Simpler, and Easier
                    </p>
                </div>

                {/* Image - Bottom */}
                <div className="relative z-10 ml-4 lg:ml-[3rem] xl:ml-[4rem] mt-4 lg:mt-[1.5rem] xl:mt-[2rem] mb-4 lg:mb-6 xl:mb-8">
                    <img src="/CandidateLogin.png" alt="Candidate working" className="w-full max-w-xs lg:max-w-sm xl:max-w-md" />
                </div>

            </div>
            {/* RIGHT SECTION */}
            <div className="w-full lg:w-[55%] bg-transparent lg:bg-white relative ml-0 lg:-ml-[6rem] rounded-none lg:rounded-l-[2.75rem] flex items-center justify-center py-8 lg:py-0">
                <div className="flex items-center justify-center px-4 sm:px-6 w-full relative z-10">
                    <div className="w-full max-w-sm bg-white lg:bg-transparent backdrop-blur-sm rounded-xl lg:rounded-none shadow-xl lg:shadow-none p-6 lg:p-0">
                        <div className="text-left mb-5">
                            <h2 className="text-xl font-bold text-(--profile-name-color) whitespace-nowrap">
                                Login to your account!
                            </h2>

                        </div>
                        {/* EMAIL SECTION - Show when OTP not sent */}
                        {!showOtp && (
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
                        {/* {!showOtp && (
                            <div className="mt-6 text-center">
                                <p className="text-sm text-(--profile-title-color) mb-3">
                                    Don't have an account?{" "}
                                    <Link href="/candidate-signup" className="text-(--job-post-button-bg-to) hover:text-(--navbar-text-color) font-semibold underline transition-colors">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
