"use client";
import { useState } from "react";
import Otp from "./Otp";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthValidation } from "@/Validation/AuthValidation";

export default function SignIn() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendOtp = (values: { email: string }) => {
    if (values.email) {
      setEmail(values.email);
      setShowOtp(true);
      console.log("Email:", values.email);
    }
  };

  const handleEditEmail = () => {
    setShowOtp(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      
      {/* Background Image/Pattern Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f9ff] via-white to-[#dcfce7]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Large Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-[#0ea5e9]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-[#2dd4bf]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-col justify-center px-16 relative z-10">
        <h1 className="text-4xl font-bold text-[#1e293b] leading-tight">
          Find your dream job <br /> simply and quickly
        </h1>

        <p className="mt-4 text-[#64748b] max-w-md">
          Connect with top companies and get hired faster with our smart job platform.
        </p>

        <div className="mt-10 flex gap-10">
          <div>
            <p className="text-2xl font-bold text-[#2dd4bf]">100k+</p>
            <p className="text-sm text-[#64748b]">Jobs Posted</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#2dd4bf]">50k+</p>
            <p className="text-sm text-[#64748b]">Companies</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#2dd4bf]">500+</p>
            <p className="text-sm text-[#64748b]">Cities</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-[#e2e8f0]">
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold text-[#111827]">
              Welcome back!
            </h2>
            <p className="text-[#6b7280] text-sm mt-1">
              Login using your email address
            </p>
          </div>

          {/* EMAIL SECTION - Show when OTP not sent */}
          {!showOtp && (
            <Formik initialValues={{ email: '' }} validationSchema={AuthValidation} onSubmit={(values) => handleSendOtp(values)}>
              {({ values }) => (
                <Form>
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-[#374151] block mb-1.5">
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full px-3 py-2.5  border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] text-[#374151] text-sm transition-all"
                    />

                    <ErrorMessage name="email" component="div" className="text-gray-500 text-xs mt-2 ml-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={!values.email}
                    className="w-full bg-gradient-to-r cursor-pointer from-[#38bdf8] to-[#2dd4bf] text-white py-2.5 rounded-lg font-semibold hover:from-[#0ea5e9] hover:to-[#14b8a6] transition-all shadow-lg shadow-cyan-500/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-[#38bdf8] disabled:hover:to-[#2dd4bf]"
                  >
                    Send OTP
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {/* OTP SECTION - Show when OTP sent (Using your Otp.tsx component) */}
          {showOtp && <Otp email={email} onEdit={handleEditEmail} />}

        </div>
      </div>
    </div>
  );
}