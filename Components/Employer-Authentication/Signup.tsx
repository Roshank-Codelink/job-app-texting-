"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupValidation } from "@/Validation/AuthValidation";
import { useRouter } from "next/navigation";
import { signupApi } from "@/api_config/SignupApi/signupapi";
import { toast } from "react-toastify";

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
            // If URL is valid, proceed with signup
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
                    Build your dream team <br /> faster and smarter
                </h1>
                <p className="mt-4 text-(--profile-title-color) max-w-md">
                    Join thousands of companies finding the perfect candidates and hire the best talent effortlessly.
                </p>
                <div className="mt-10 flex gap-10">
                    <div>
                        <p className="text-2xl font-bold text-(--job-post-button-bg-to)">100k+</p>
                        <p className="text-sm text-(--sidebar-menu-icone-color)">Active Jobs</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-(--job-post-button-bg-to)">50k+</p>
                        <p className="text-sm text-[#64748b]">Trusted Companies</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-(--job-post-button-bg-to)">500+</p>
                        <p className="text-sm text-(--job-post-button-disabled-text-color)">Cities Covered</p>
                    </div>
                </div>
            </div>
            {/* RIGHT SECTION */}
            <div className="flex items-center justify-center px-6 relative z-10">
                <div className="w-full max-w-lg bg-(--navbar-bg-parent)/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-(--job-post-button-border-color)">
                    <div className="text-left mb-5">
                        <h2 className="text-xl font-bold text-(--profile-name-color) whitespace-nowrap">
                            Let&apos;s Get Started
                        </h2>
                        <p className="text-(--profile-title-color) text-sm mt-1">
                            Hire top talent faster with <span className="text-(--job-post-button-bg-to) font-semibold">Jobito</span>
                        </p>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            companyName: '',
                            companyAddress: '',
                            companyWebsite: '',
                            contactNumber: ''
                        }}
                        validationSchema={SignupValidation}
                        onSubmit={(values) => handleSubmit(values)}>
                        {({ values, errors, touched }) => {
                            const isFormValid =
                                values.email &&
                                values.name &&
                                values.companyName &&
                                values.companyAddress &&
                                values.companyWebsite &&
                                values.contactNumber &&
                                !errors.email &&
                                !errors.name &&
                                !errors.companyName &&
                                !errors.companyAddress &&
                                !errors.companyWebsite &&
                                !errors.contactNumber;
                            return (
                                <Form>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1.5">
                                                Email Address <span className="text-(--profile-menu-sign-out-color)">*</span>
                                            </label>
                                            <Field
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                className="w-full px-3 py-2.5  border border-(--job-post-button-border-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) text-(--profile-menu-text-color) text-sm transition-all"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2 ml-1" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1.5">
                                                Name <span className="text-(--profile-menu-sign-out-color)">*</span>
                                            </label>
                                            <Field
                                                name="name"
                                                type="text"
                                                placeholder="Enter your name"
                                                className="w-full px-3 py-2.5  border border-(--job-post-button-border-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) text-(--profile-menu-text-color) text-sm transition-all"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-2 ml-1" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1.5">
                                                Company Name <span className="text-(--profile-menu-sign-out-color)">*</span>
                                            </label>
                                            <Field
                                                name="companyName"
                                                type="text"
                                                placeholder="Enter company name"
                                                className="w-full px-3 py-2.5  border border-(--job-post-button-border-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) text-(--profile-menu-text-color) text-sm transition-all"
                                            />
                                            <ErrorMessage name="companyName" component="div" className="text-red-500 text-xs mt-2 ml-1" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1.5">
                                                Contact Number <span className="text-(--profile-menu-sign-out-color)">*</span>
                                            </label>
                                            <Field
                                                name="contactNumber"
                                                type="tel"
                                                placeholder="Enter contact number"
                                                className="w-full px-3 py-2.5  border border-(--job-post-button-border-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) text-(--profile-menu-text-color) text-sm transition-all"
                                            />
                                            <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-xs mt-2 ml-1" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1.5">
                                            Company Website <span className="text-(--profile-menu-sign-out-color)">*</span>
                                        </label>
                                        <Field
                                            name="companyWebsite"
                                            type="url"
                                            placeholder="Enter company website"
                                            required
                                            className="w-full px-3 py-2.5  border border-(--job-post-button-border-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) text-(--profile-menu-text-color) text-sm transition-all"
                                        />
                                        <ErrorMessage name="companyWebsite" component="div" className="text-red-500 text-xs mt-2 ml-1" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1.5">
                                            Company Address <span className="text-(--profile-menu-sign-out-color)">*</span>
                                        </label>
                                        <Field
                                            name="companyAddress"
                                            as="textarea"
                                            rows={4}
                                            placeholder="Enter company address"
                                            className="w-full px-3 py-2.5  border border-(--job-post-button-border-color) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) text-(--profile-menu-text-color) text-sm transition-all resize-none"
                                        />
                                        <ErrorMessage name="companyAddress" component="div" className="text-red-500 text-xs mt-2 ml-1" />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!isFormValid}
                                        className="w-full bg-gradient-to-r cursor-pointer from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-(--navbar-bg-parent) py-2.5 rounded-lg font-semibold hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) transition-all shadow-lg shadow-cyan-500/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-(--job-post-button-bg-from) disabled:hover:to-(--job-post-button-bg-to)"
                                    >
                                        Sign Up
                                    </button>
                                </Form>
                            );
                        }}
                    </Formik>
                    {/* TERMS AND PRIVACY POLICY */}
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
                    {/* SIGNIN LINK */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-(--profile-title-color) mb-3">
                            Already have an account?{" "}
                            <Link href="/employer-signin" className="text-(--job-post-button-bg-to) hover:text-(--navbar-text-color) font-semibold underline transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}