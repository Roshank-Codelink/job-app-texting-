"use client";

import { useState } from 'react';
import { Formik, Form } from 'formik';
import Step1BasicProfileInfo from './Step1-Basic-Profile-info';
import Step2JobTitleInfo from './Step2-Job-Title-info';
import Step3LocationInfo from './Step3-Location-info';
import { validateStep1, validateStep2 } from '@/Validation/ProfileOnboardingValidation';

export default function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    jobTitle: [] as string[],
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

  const handleFinalSubmit = (values: any) => {
    console.log('Complete Form Data:', values);
    alert('Profile completed successfully! 🎉');
    // Yaha API call kar sakte ho
  }






  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFinalSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="w-full max-w-5xl mx-auto p-6">
            {/* Custom Stepper */}
            <div className="mb-12">
              <div className="flex items-start justify-between relative">
                {/* Steps */}
                {stepData.map((step, index) => {
            const isCompleted = activeStep > index;
            const isCurrent = activeStep === index;
            const isLast = index === stepData.length - 1;

            return (
              <div key={index} className="flex-1 relative flex flex-col items-center">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute top-[35px] left-[50%] w-full h-[3px] -z-10">
                    <div className="w-full h-full bg-gray-200" />
                    <div 
                      className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                        activeStep > index ? 'w-full bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf]' : 'w-0'
                      }`}
                    />
                  </div>
                )}

                {/* Circle with Icon */}
                <div
                  className={`
                    w-[70px] h-[70px] rounded-full flex items-center justify-center
                    transition-all duration-300 relative z-10
                    ${
                      isCompleted
                        ? "bg-gradient-to-r from-[#2dd4bf] to-[#14b8a6] text-white shadow-md"
                        : isCurrent
                        ? "bg-white border-[3px] border-[#0ea5e9] text-[#0ea5e9] shadow-md"
                        : "bg-white border-[3px] border-gray-300 text-gray-400"
                    }
                  `}
                >
                  {/* Step Icons */}
                  {index === 0 && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-4 text-center">
                  <h3
                    className={`
                      text-base font-bold transition-colors mb-2
                      ${
                        isCurrent
                          ? "text-[#0ea5e9]"
                          : isCompleted
                          ? "text-[#2dd4bf]"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {step.title}
                  </h3>
                  <p className={`text-xs leading-relaxed transition-colors ${index <= activeStep ? 'text-gray-600' : 'text-gray-400'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

            {/* Step Content Area */}
            <div className="mt-12 mb-12">
              {activeStep === 0 && (
                <Step1BasicProfileInfo values={values} setFieldValue={setFieldValue} />
              )}
              {activeStep === 1 && (
                <Step2JobTitleInfo values={values} setFieldValue={setFieldValue} />
              )}
              {activeStep === 2 && (
                <Step3LocationInfo />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={activeStep === 0}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all border-2 ${
                  activeStep === 0
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-[#e2e8f0] text-[#64748b] hover:border-[#0ea5e9] hover:text-[#0ea5e9]'
                }`}
              >
                Previous
              </button>
              
              {activeStep === stepData.length - 1 ? (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r from-[#38bdf8] to-[#2dd4bf] text-white hover:from-[#0ea5e9] hover:to-[#14b8a6] shadow-lg shadow-cyan-500/30"
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
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r from-[#38bdf8] to-[#2dd4bf] text-white hover:from-[#0ea5e9] hover:to-[#14b8a6] shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-[#38bdf8] disabled:hover:to-[#2dd4bf]"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
