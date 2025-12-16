"use client";

import Select from 'react-select';

interface Step2Props {
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

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

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: '42px',
      borderColor: state.isFocused ? '#0ea5e9' : '#e2e8f0',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(14, 165, 233, 0.2)' : 'none',
      '&:hover': {
        borderColor: '#0ea5e9',
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#e0f2fe',
      borderRadius: '6px',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: '#0369a1',
      fontWeight: '500',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: '#0369a1',
      '&:hover': {
        backgroundColor: '#0ea5e9',
        color: 'white',
      },
    }),
  };

  const handleChange = (selectedOptions: any) => {
    const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setFieldValue('jobTitle', values);
  };

  const selectedValues = values.jobTitle?.map((val: string) => 
    jobTitleOptions.find(option => option.value === val)
  ).filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Job Title Multi-Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Titles <span className="text-red-500">*</span>
          </label>
          <Select
            isMulti
            options={jobTitleOptions}
            value={selectedValues}
            onChange={handleChange}
            placeholder="Select job titles..."
            styles={customStyles}
            className="text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">You can select multiple job titles</p>
        </div>
      </div>
    </div>
  );
}
