"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/Components/ui/input-otp";
import { OtpValidation } from "@/Validation/AuthValidation";
import { Formik, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { FiEdit3, FiMail } from "react-icons/fi";
import { Loader2 } from "lucide-react";

interface OtpProps {
  email?: string;
  onEdit?: () => void;
}

export default function Otp({ email, onEdit }: OtpProps) {
  const router = useRouter();

  const handleSubmit = async (values: { otp: string }) => {
    try {
      if (!email) {
        toast.error("Email is required");
        return;
      }

      const callbackUrl = "/employer/dashboard";

      const result = await signIn("credentials", {
        email,
        otp: values.otp,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        toast.error("Invalid OTP");
        return;
      }

      router.push(callbackUrl);
      toast.success("Login successful!");
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">
      {/* Email Display Card */}
      {email && (
        <div className="mb-6 p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
              <FiMail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Sent to</p>
              <p className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">{email}</p>
            </div>
          </div>
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="p-2 text-slate-400 hover:text-(--navbar-text-color) hover:bg-white rounded-lg transition-all cursor-pointer"
              title="Edit email"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* OTP Input Section */}
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={OtpValidation}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          values,
          setFieldValue,
          setFieldTouched,
          isValid,
          dirty,
          isSubmitting,
        }) => (
          <Form className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 block mb-2.5">
                Verification Code <span className="text-red-500">*</span>
              </label>

              <div className="">
                <InputOTP
                  maxLength={6}
                  value={values.otp}
                  onChange={(newValue) => {
                    const numericValue = newValue.replace(/\D/g, "");
                    setFieldValue("otp", numericValue);
                    setFieldTouched("otp", true, false);
                  }}
                >
                  <InputOTPGroup className="gap-2 sm:gap-3 xl:gap-4">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <InputOTPSlot
                        key={idx}
                        index={idx}
                        className="w-10 h-11 sm:w-12 sm:h-12 border-2  rounded-[8px] first:rounded-[8px] last:rounded-[8px] bg-slate-50 text-slate-700 font-medium  data-[active=true]:border-(--navbar-text-color) data-[active=true]:bg-white"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <ErrorMessage name="otp">
                {(msg) => (
                  <div className="text-[13px] text-red-500 font-medium ml-1 flex items-center gap-1">

                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>


            <button
              type="submit"
              disabled={!email || !isValid || !dirty || isSubmitting}
              className="w-full bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white py-2 rounded-full lg:rounded-xl font-bold tracking-wide text-sm hover:shadow-[0_6px_20px_0_rgba(56,189,248,0.45)] hover:brightness-105 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </button>

            {/* Resend Code */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  className="font-bold text-(--navbar-text-color) hover:underline cursor-pointer transition-all ml-1"
                >
                  Resend Code
                </button>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
