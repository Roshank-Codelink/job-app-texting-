"use client";
import { useState } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import Step1BasicProfileInfo from './Step1-Basic-Profile-info';
import Step2JobTitleInfo from './Step2-Job-Title-info';
import Step3LocationInfo from './Step3-Location-info';
import { validateStep1, validateStep2 } from '@/Validation/ProfileOnboardingValidation';
import { CandidateSignUpSkillResponse } from '@/api_config/SignupApi/type';
import { candidateSignUpApi } from '@/api_config/SignupApi/signupapi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


export default function MultiStepForm({ skillsData }: { skillsData: CandidateSignUpSkillResponse }) {
  const [activeStep, setActiveStep] = useState(0);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    jobTitle: [] as string[],
    skills: [] as string[],
    location: "",
  };

  const stepData = [
    {
      title: 'Basic Profile',
      description: 'Setup your personal information.',
    },
    {
      title: 'Job Title',
      description: 'Select your job role and experience level',
    },
    {
      title: 'Location',
      description: 'Choose your preferred work location',
    }
  ];

  const handleNext = () => {
    if (activeStep < stepData.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const router = useRouter();

  const handleComplete = async (values: any) => {
    try {
      const response = await candidateSignUpApi(values);
      console.log(response);
      if (response.statusCode === 201) {
        toast.success(response.data.message);
        router.push("/candidate-signin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error");
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex bg-gradient-to-br from-(--navbar-bg-button) via-white to-(--signin-bg-color-to) lg:bg-transparent lg:bg-none">
      {/* LEFT SECTION - Hidden on mobile */}
      <div className="hidden lg:flex w-1/2 bg-[#F0F9FF] relative overflow-hidden flex-col">
        <div className="absolute w-[360px] h-[360px] rounded-full bg-[#DBEAFE] -left-[210px] top-1/2 -translate-y-1/2 opacity-30" />
        <div className="absolute w-[260px] h-[260px] rounded-full bg-[#BFDBFE] -left-[155px] top-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute w-[180px] h-[180px] rounded-full bg-[#93C5FD] -left-[105px] top-1/2 -translate-y-1/2 opacity-70" />
        {/* Content - Top */}
        <div className="relative z-10 ml-8 lg:ml-[5rem] xl:ml-[7rem] mt-8 lg:mt-12 xl:mt-16 flex flex-col gap-3 lg:gap-4 justify-start">
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
          <img src="/candidateLogin.png" alt="Candidate working" className="w-full max-w-xs lg:max-w-sm xl:max-w-md" />
        </div>
      </div>
      <div className="w-full lg:w-[55%] bg-transparent lg:bg-white relative ml-0 lg:-ml-[6rem] rounded-none lg:rounded-l-[2.75rem] flex items-center justify-center py-4 lg:py-0">
        <div className="flex items-center justify-center px-4 sm:px-6 w-full relative z-10">
          <div className="w-[95%] sm:w-[85%] md:w-[80%] lg:w-[70%] bg-white lg:bg-transparent backdrop-blur-sm rounded-xl lg:rounded-none shadow-xl lg:shadow-none p-4 lg:p-0">
            <div className="text-left mb-3">
              <h2 className="text-xl font-bold text-(--profile-name-color) whitespace-nowrap">
                Create your account!
              </h2>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={() => { }}
              enableReinitialize
            >
              {({ values, setFieldValue }) => (
                <Form>
                  {/* Custom Stepper */}
                  <div className="mb-6 w-full">
                    <div className="flex items-start justify-between relative gap-1 sm:gap-2">
                      {/* Steps */}
                      {stepData.map((step, index) => {
                        const isCompleted = activeStep > index;
                        const isCurrent = activeStep === index;
                        const isLast = index === stepData.length - 1;
                        return (
                          <div key={index} className="flex-1 relative flex flex-col items-center">
                            {/* Connecting Line - Hidden on mobile */}
                            {!isLast && (
                              <div className="hidden sm:block absolute top-[25px] sm:top-[35px] left-[50%] w-full h-[2px] sm:h-[3px] -z-10">
                                <div className="w-full h-full bg-(--profile-image-border-color)" />
                                <div
                                  className={`absolute top-0 left-0 h-full transition-all duration-500 ${activeStep > index ? 'w-full bg-linear-to-r from-(--navbar-text-color) to-(--job-post-button-bg-to)' : 'w-0'
                                    }`}
                                />
                              </div>
                            )}
                            {/* Circle with Icon */}
                            <div
                              className={`
                    w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-full flex items-center justify-center
                    transition-all duration-300 relative z-10
                    ${isCompleted
                                  ? "bg-linear-to-r from-(--job-post-button-bg-to) to-(--job-post-button-hover) text-(--navbar-bg-parent) shadow-md"
                                  : isCurrent
                                    ? "bg-(--navbar-bg-parent) border-[2px] sm:border-[3px] border-(--navbar-text-color) text-(--navbar-text-color) shadow-md"
                                    : "bg-(--navbar-bg-parent) border-[2px] sm:border-[3px] border-gray-300 text-gray-400"
                                }`}>
                              {/* Step Icons */}
                              {index === 0 && (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              )}
                              {index === 1 && (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              )}
                              {index === 2 && (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              )}
                            </div>
                            {/* Step Label */}
                            <div className="mt-2 sm:mt-4 text-center px-0.5 sm:px-1">
                              <h3
                                className={`
                      text-xs sm:text-sm md:text-base font-bold transition-colors mb-1 sm:mb-2
                      ${isCurrent
                                    ? "text-(--navbar-text-color)"
                                    : isCompleted
                                      ? "text-(--job-post-button-bg-to)"
                                      : "text-gray-400"
                                  }`}>
                                {step.title}
                              </h3>
                              <p className={`text-[10px] sm:text-xs leading-relaxed transition-colors hidden sm:block ${index <= activeStep ? 'text-(--job-post-button-disabled-text-color)' : 'text-(--job-post-bg-color)'}`}>
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Step Content Area */}
                  <div className="mb-6 w-full">
                    {activeStep === 0 && (
                      <Step1BasicProfileInfo values={values} setFieldValue={setFieldValue} />
                    )}
                    {activeStep === 1 && (
                      <Step2JobTitleInfo values={values} setFieldValue={setFieldValue} skillsData={skillsData} />
                    )}
                    {activeStep === 2 && (
                      <Step3LocationInfo values={values} setFieldValue={setFieldValue} />
                    )}
                  </div>
                  {/* Navigation Buttons */}
                  <div className="flex flex-row justify-between gap-2 sm:gap-3 w-full">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className={`flex-1 sm:flex-none cursor-pointer sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors border bg-transparent shadow-none border-(--job-post-button-border-color) text-(--job-post-button-disabled-text-color) hover:bg-(--job-post-button-disabled-bg) hover:text-(--navbar-text-color) disabled:opacity-50 disabled:cursor-not-allowed ${activeStep === 0 ? 'invisible' : ''}`}
                    >
                      Previous
                    </button>
                    {activeStep === stepData.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => handleComplete(values)}
                        className="flex-1 sm:flex-none sm:w-auto px-4 cursor-pointer  sm:px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all bg-linear-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-(--navbar-bg-parent) hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) shadow-lg shadow-cyan-500/30"
                      >
                        Complete
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                          (activeStep === 0 && !validateStep1(values)) ||
                          (activeStep === 1 && !validateStep2(values))
                        }
                        className="flex-1 sm:flex-none sm:w-auto cursor-pointer px-4 sm:px-6 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all bg-linear-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-(--navbar-bg-parent) hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-(--job-post-button-bg-from) disabled:hover:to-(--job-post-button-bg-to)"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </Form>
              )}
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
                <Link href="/candidate-signin" className="text-(--job-post-button-bg-to) hover:text-(--navbar-text-color) font-semibold underline transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
