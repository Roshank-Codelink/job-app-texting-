
"use client";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/Components/ui/input-otp"
import { OtpValidation } from "@/Validation/AuthValidation";
import { Formik, Form, ErrorMessage } from 'formik';
import { useRouter } from "next/navigation";

interface OtpProps {
    email?: string;
    onEdit?: () => void;
}


export default function Otp({ email, onEdit }: OtpProps) {

    const router = useRouter();

    const handleSubmit = (values: { otp: string }) => {
        console.log("OTP Submitted:", values.otp);
        router.push("/profile-onboarding");


    };
    return (
        <div>
            {/* Email Display with Edit Button */}
            {email && (
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1">
                            We have sent an OTP on your email address
                        </label>
                        <p className="text-sm text-(--profile-menu-text-color)">
                            {email}
                        </p>
                    </div>
                    {onEdit && (
                        <button
                            type="button"
                            onClick={onEdit}
                            className="flex cursor-pointer items-center gap-1 text-xs text-(--navbar-text-color) hover:text-(--otp-hover-color) transition-colors"
                            title="Edit email"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit
                        </button>
                    )}
                </div>
            )}

            {/* OTP Input Section */}
            <Formik
                initialValues={{ otp: '' }}
                validationSchema={OtpValidation}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ values, setFieldValue, setFieldTouched, isValid, dirty, isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="text-xs font-semibold text-(--profile-menu-text-color) block mb-1.5">
                                Enter OTP <span className="text-(--profile-menu-sign-in-color)">*</span>
                            </label>

                            <InputOTP
                                maxLength={6}
                                value={values.otp}
                                onChange={(newValue) => {
                                    setFieldValue('otp', newValue);
                                    setFieldTouched('otp', true, false);
                                }}
                            >
                                <InputOTPGroup className="gap-2">
                                    <InputOTPSlot index={0} className="w-11 h-11 border-2 border-(--job-post-button-border-color) rounded-lg shadow-none! ring-0 focus:border-(--navbar-text-color) data-[active=true]:border-(--navbar-text-color) data-[active=true]:ring-0" />
                                    <InputOTPSlot index={1} className="w-11 h-11 border-2 border-(--job-post-button-border-color) rounded-lg shadow-none! ring-0 focus:border-(--navbar-text-color) data-[active=true]:border-(--navbar-text-color) data-[active=true]:ring-0" />
                                    <InputOTPSlot index={2} className="w-11 h-11 border-2 border-(--job-post-button-border-color) rounded-lg shadow-none! ring-0 focus:border-(--navbar-text-color) data-[active=true]:border-(--navbar-text-color) data-[active=true]:ring-0" />
                                    <InputOTPSlot index={3} className="w-11 h-11 border-2 border-(--job-post-button-border-color) rounded-lg shadow-none! ring-0 focus:border-(--navbar-text-color) data-[active=true]:border-(--navbar-text-color) data-[active=true]:ring-0" />
                                    <InputOTPSlot index={4} className="w-11 h-11 border-2 border-(--job-post-button-border-color) rounded-lg shadow-none! ring-0 focus:border-(--navbar-text-color) data-[active=true]:border-(--navbar-text-color) data-[active=true]:ring-0" />
                                    <InputOTPSlot index={5} className="w-11 h-11 border-2 border-(--job-post-button-border-color) rounded-lg shadow-none! ring-0 focus:border-(--navbar-text-color) data-[active=true]:border-(--navbar-text-color) data-[active=true]:ring-0" />
                                </InputOTPGroup>
                            </InputOTP>

                            {/* Error Message Display */}
                            <ErrorMessage name="otp">
                                {(msg) => (
                                    <div className="mt-3 text-xs text-(--profile-title-color) font-medium">
                                        {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>

                        {/* Verify Button */}
                        <button
                            type="submit"
                            disabled={!email || !isValid || !dirty || isSubmitting}
                            className="w-full bg-gradient-to-r cursor-pointer from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-(--navbar-bg-parent) py-2.5 rounded-lg font-semibold hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) transition-all shadow-lg shadow-cyan-500/30 text-sm mb-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-(--job-post-button-bg-from) disabled:hover:to-(--job-post-button-bg-to"
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </Form>
                )}
            </Formik>


            {/* Resend Code */}
            <div className="text-center">
                <button className="text-xs text-(--profile-title-color)  transition-colors">
                    Didn't receive code? <span className="font-semibold text-(--navbar-text-color) cursor-pointer">Resend</span>
                </button>
            </div>
        </div>
    )
}