"use client";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { User, Mail, Phone } from "lucide-react";
import { Step1Validation } from "@/Validation/ProfileOnboardingValidation";
import { Step1Props } from "../../../types/types";
export default function Step1BasicProfileInfo({ values, setFieldValue }: Step1Props) {

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const validateField = async (name: string, value: string) => {
    try {
      await Step1Validation.validateAt(name, { ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return "";
    } catch (error: any) {
      const errorMessage = error.message;
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return errorMessage;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  return (
    <div className="w-full max-w-full mx-auto px-0 sm:px-2 md:px-4">
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
            Full Name <span className="text-(--profile-menu-sign-out-color)">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              className="w-full pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-(--navbar-text-color) focus-visible:ring-(--navbar-text-color)"
            />
          </div>
          {errors.name && touched.name && (
            <p className="text-(--profile-menu-sign-out-color) text-xs sm:text-sm mt-1">{errors.name}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
            Email Address <span className="text-(--profile-menu-sign-out-color)">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your.email@example.com"
              className="w-full pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-(--navbar-text-color) focus-visible:ring-(--navbar-text-color)"
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-(--profile-menu-sign-out-color) text-xs sm:text-sm mt-1">{errors.email}</p>
          )}
        </div>
        {/* Phone Number */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
            Phone Number <span className="text-(--profile-menu-sign-out-color)">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="9876543210"
              maxLength={10}
              className="w-full pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-(--navbar-text-color) focus-visible:ring-(--navbar-text-color)"
            />
          </div>
          {errors.phone && touched.phone && (
            <p className="text-(--profile-menu-sign-out-color) text-xs sm:text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}

