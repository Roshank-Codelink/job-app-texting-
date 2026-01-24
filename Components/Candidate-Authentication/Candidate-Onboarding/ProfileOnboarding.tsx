"use client";
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Select from 'react-select';
import { User, Phone, Briefcase, MapPin, ArrowRight, Loader2 } from "lucide-react";

import { Input } from "@/Components/ui/input";
import { candidateOnboarding } from '@/api_config/SignupApi/signupapi';
import { CandidateSignUpSkillResponse } from '@/api_config/SignupApi/type';
import { MAP_API_CONFIG } from "@/api_config/shared/sharedapi";

const ValidationSchema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Full name is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  jobTitle: yup.string().required('Job title is required'),
  location: yup.string().required('Location is required'),
});

export default function ProfileOnboarding({ skillsData }: { skillsData: CandidateSignUpSkillResponse }) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isDetecting, setIsDetecting] = useState(false);

  const initialValues = {
    name: "",
    phone: "",
    jobTitle: "",
    skills: [] as string[],
    location: "",
  };

  const handleComplete = async (values: any) => {
    try {
      const payload = {
        ...values,
        jobTitle: values.jobTitle
      };
      const response = await candidateOnboarding(payload);
      console.log(response);
      if (response.statusCode === 200) {
        toast.success(response.data.message);

        await update({
          ...session,
          user: {
            ...session?.user,
            isOnboardingCompleted: true,
            jobTitle: values.jobTitle
          }
        });

        router.push(`/candidate/jobs?text=${encodeURIComponent(values.jobTitle)}`);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error");
    }
  }

  const skillOptions = skillsData?.data?.map((skill) => ({ value: skill._id, label: skill.name })) || [];

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: '40px',
      backgroundColor: 'transparent',
      borderColor: state.isFocused ? '#0ea5e9' : '#e2e8f0',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(14, 165, 233, 0.2)' : 'none',
      fontSize: '14px',
      '&:hover': {
        borderColor: state.isFocused ? '#0ea5e9' : '#e2e8f0',
        backgroundColor: 'transparent',
      },
      '@media (min-width: 640px)': {
        minHeight: '42px',
        fontSize: '16px',
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#e0f2fe',
      borderRadius: '6px',
      fontSize: '12px',
      '@media (min-width: 640px)': {
        fontSize: '14px',
      },
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: '#0369a1',
      fontWeight: '500',
      fontSize: '12px',
      '@media (min-width: 640px)': {
        fontSize: '14px',
      },
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: '#0369a1',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#0ea5e9',
        color: 'white',
      },
    }),
    menu: (base: any) => ({
      ...base,
      fontSize: '14px',
      zIndex: 9999,
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginTop: '4px',
      overflow: 'hidden',
    }),
    menuList: (base: any) => ({
      ...base,
      padding: '4px',
      maxHeight: '200px',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#cbd5e1',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#94a3b8',
      },
      scrollbarWidth: 'thin',
      scrollbarColor: '#cbd5e1 transparent',
    }),
    option: (base: any, state: any) => ({
      ...base,
      fontSize: '14px',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: state.isSelected
        ? '#0ea5e9'
        : state.isFocused
          ? '#e0f2fe'
          : 'transparent',
      color: state.isSelected
        ? '#ffffff'
        : '#1e293b',
      '&:active': {
        backgroundColor: state.isSelected ? '#0ea5e9' : '#bae6fd',
      },
      '@media (min-width: 640px)': {
        fontSize: '14px',
        padding: '10px 12px',
      },
    }),
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex justify-between bg-gradient-to-br from-(--navbar-bg-button) via-white to-(--signin-bg-color-to) lg:bg-transparent lg:bg-none">
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
                Profile  <span className="text-gray-900">On</span>
                <span className="text-[#2DD4BF]">boarding</span>
              </h2>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={handleComplete}
              validateOnMount={true}
            >
              {({ values, setFieldValue, errors, touched, isSubmitting, isValid }) => {
                const detectLocation = () => {
                  if (!navigator.geolocation) {
                    toast.error("Geolocation is not supported by your browser");
                    return;
                  }
                  setIsDetecting(true);
                  navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                      const lat = pos.coords.latitude;
                      const lng = pos.coords.longitude;
                      try {
                        const response = await MAP_API_CONFIG(lat, lng);
                        if (response.error || response.statusCode !== 200) {
                          throw new Error("API Error");
                        }
                        const apiData = response.data as { success: boolean; data: any };
                        if (!apiData.success) {
                          throw new Error("API Error");
                        }
                        const data = apiData.data;
                        const address = data.address || {};
                        const city = address.city || address.town || address.village || address.county || "";
                        const state = address.state || "";
                        const locationName = city && state ? `${city}, ${state}` : data.display_name || `${lat}, ${lng}`;
                        setFieldValue("location", locationName);
                        setIsDetecting(false);
                      } catch (error) {
                        setIsDetecting(false);
                        console.error("Error fetching location:", error);
                        toast.error("Failed to get location address");
                      }
                    },
                    (error) => {
                      setIsDetecting(false);
                      console.error("Geolocation error:", error);
                      toast.error("Location permission denied");
                    }
                  );
                };

                const selectedSkillValues = values.skills?.map((val: string) =>
                  skillOptions.find(option => option.value === val)
                ).filter(Boolean);

                return (
                  <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {/* Step 1 Fields */}
                    <div className="col-span-1">
                      <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
                        Full Name <span className="text-(--profile-menu-sign-out-color)">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <Input
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={(e) => setFieldValue("name", e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-(--navbar-text-color) focus-visible:ring-(--navbar-text-color)"
                        />
                      </div>
                      {errors.name && touched.name && (
                        <p className="text-(--profile-menu-sign-out-color) text-xs sm:text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
                        Phone Number <span className="text-(--profile-menu-sign-out-color)">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <Input
                          type="tel"
                          name="phone"
                          value={values.phone}
                          onChange={(e) => setFieldValue("phone", e.target.value)}
                          placeholder="9876543210"
                          maxLength={10}
                          className="w-full pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-(--navbar-text-color) focus-visible:ring-(--navbar-text-color)"
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="text-(--profile-menu-sign-out-color) text-xs sm:text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Step 2 Fields */}
                    <div className="col-span-1">
                      <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
                        Job Titles <span className="text-(--profile-menu-sign-out-color)">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <Input
                          type="text"
                          name="jobTitle"
                          value={values.jobTitle}
                          onChange={(e) => setFieldValue("jobTitle", e.target.value)}
                          placeholder="Select job titles..."
                          className="w-full pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-(--navbar-text-color) focus-visible:ring-(--navbar-text-color)"
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-(--profile-title-color) mt-1.5 sm:mt-2">You can select multiple job titles</p>
                      {errors.jobTitle && touched.jobTitle && (
                        <p className="text-(--profile-menu-sign-out-color) text-xs sm:text-sm mt-1">{errors.jobTitle}</p>
                      )}
                    </div>

                    {/* Location moved here, was Skills */}
                    <div className="col-span-1">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
                          Job Location <span className="text-(--profile-menu-sign-out-color)">*</span>
                        </label>
                        <div className="w-full">
                          <div className="relative">
                            <MapPin className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 z-10" />
                            <Input
                              type="text"
                              name="location"
                              value={values.location || ""}
                              onChange={(e) => setFieldValue("location", e.target.value)}
                              onFocus={() => {
                                if (!values.location) {
                                  detectLocation();
                                }
                              }}
                              placeholder="Enter city or area (e.g. Bengaluru, Mumbai)"
                              className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-(--navbar-text-color) focus-visible:ring-(--navbar-text-color)"
                            />
                            {isDetecting && (
                              <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2">
                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-(--navbar-text-color)" />
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-(--profile-title-color) text-xs sm:text-sm mt-1">
                          Type your preferred work location or tap to auto-detect
                        </p>
                        {errors.location && touched.location && (
                          <p className="text-(--profile-menu-sign-out-color) text-xs sm:text-sm mt-1">{errors.location}</p>
                        )}
                      </div>
                    </div>

                    {/* Skills moved here, was Location, now col-span-2 */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
                        Skills <span className="text-(--profile-menu-sign-out-color)">*</span>
                      </label>
                      <div className="w-full">
                        <Select
                          isMulti
                          options={skillOptions}
                          value={selectedSkillValues}
                          onChange={(selectedOptions: any) => {
                            const skillIds = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
                            setFieldValue('skills', skillIds);
                          }}
                          placeholder="Select skills..."
                          styles={customStyles}
                          className="text-sm sm:text-base cursor-pointer w-full"
                          classNamePrefix="react-select"
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-(--profile-title-color) mt-1.5 sm:mt-2">You can select multiple skills</p>
                      {/* {errors.skills && touched.skills && (
                        <p className="text-(--profile-menu-sign-out-color) text-xs sm:text-sm mt-1">{errors.skills}</p>
                      )} */}
                    </div>

                    {/* Step 3 Fields - Submit Button */}
                    <div className="col-span-1 md:col-span-2 mt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Onboarding..." : "Onboard"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
