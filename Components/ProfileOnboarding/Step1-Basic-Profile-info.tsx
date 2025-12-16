"use client";

import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { User, Mail, Phone } from "lucide-react";
import { Step1Validation } from "@/Validation/ProfileOnboardingValidation";

interface Step1Props {
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

export default function Step1BasicProfileInfo({ values, setFieldValue }: Step1Props) {
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
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
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              className={`pl-10 ${errors.fullName && touched.fullName ? "border-red-500" : ""}`}
            />
          </div>
          {errors.fullName && touched.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your.email@example.com"
              className={`pl-10 ${errors.email && touched.email ? "border-red-500" : ""}`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="tel"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="9876543210"
              maxLength={10}
              className={`pl-10 ${errors.phoneNumber && touched.phoneNumber ? "border-red-500" : ""}`}
            />
          </div>
          {errors.phoneNumber && touched.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
}

