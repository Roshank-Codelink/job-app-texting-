"use client";

import React from 'react';
import Select from 'react-select';
import { Input } from "@/Components/ui/input";
import { Step2Props } from "../../types/types";
import { Briefcase } from "lucide-react";

export default function Step2JobTitleInfo({ values, setFieldValue }: Step2Props) {
  const jobTitleOptions = [
    { value: 'frontend-developer', label: 'Frontend Developer' },
    { value: 'backend-developer', label: 'Backend Developer' },
    { value: 'fullstack-developer', label: 'Full Stack Developer' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'devops-engineer', label: 'DevOps Engineer' },
    { value: 'mobile-developer', label: 'Mobile Developer' },
    { value: 'qa-engineer', label: 'QA Engineer' },
    { value: 'business-analyst', label: 'Business Analyst' },
  ];

  const skillOptions = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c++', label: 'C++' },
    { value: 'c#', label: 'C#' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'oracle', label: 'Oracle' },
    { value: 'sql', label: 'SQL' },
    { value: 'nosql', label: 'NoSQL' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'aws', label: 'AWS' },
    { value: 'azure', label: 'Azure' },
    { value: 'gcp', label: 'GCP' },
    { value: 'linux', label: 'Linux' },
    { value: 'windows', label: 'Windows' },
    { value: 'macos', label: 'macOS' },
    { value: 'ios', label: 'iOS' },
    { value: 'android', label: 'Android' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'dart', label: 'Dart' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'swift', label: 'Swift' },
    { value: 'rust', label: 'Rust' },
    { value: 'golang', label: 'Golang' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'laravel', label: 'Laravel' },
    { value: 'symfony', label: 'Symfony' },
    { value: 'django', label: 'Django' },
  ];

  const selectedSkillValues = values.skill?.map((val: string) => 
    skillOptions.find(option => option.value === val)
  ).filter(Boolean);

  const handleSkillChange = (selectedOptions: any) => {
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFieldValue('skill', values);
  };


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

  const handleChange = (selectedOptions: any) => {
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFieldValue('jobTitle', values);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue('jobTitle', value);
  };

  const selectedValues = Array.isArray(values.jobTitle) 
    ? values.jobTitle.map((val: string) => 
        jobTitleOptions.find(option => option.value === val)
      ).filter(Boolean)
    : [];

  return (
    <div className="w-full max-w-full mx-auto px-0 sm:px-2 md:px-4">
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Job Title Multi-Select */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
            Job Titles <span className="text-(--profile-menu-sign-out-color)">*</span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              name="jobTitle"
              value={typeof values.jobTitle === 'string' ? values.jobTitle : ""}
              onChange={handleInputChange}
              placeholder="Select job titles..."
              className="w-full pl-9 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 focus-visible:border-(--navbar-text-color) focus-visible:ring-(--navbar-text-color)"
            />
          
          </div>
          <p className="text-xs sm:text-sm text-(--profile-title-color) mt-1.5 sm:mt-2">You can select multiple job titles</p>
        </div>


        <div>
          <label className="block text-xs sm:text-sm font-medium text-(--profile-menu-text-color) mb-1.5 sm:mb-2">
            Skills <span className="text-(--profile-menu-sign-out-color)">*</span>
          </label>
          <div className="w-full">
            <Select
              isMulti
              options={skillOptions}
              value={selectedSkillValues}
              onChange={handleSkillChange}
              placeholder="Select skills..."
              styles={customStyles}
              className="text-sm sm:text-base cursor-pointer w-full"
              classNamePrefix="react-select"
            />
          </div>
          <p className="text-xs sm:text-sm text-(--profile-title-color) mt-1.5 sm:mt-2">You can select multiple skills</p>
        </div>
      </div>
    </div>
  );
}
