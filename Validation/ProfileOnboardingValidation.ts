import * as yup from 'yup';

export const Step1Validation = yup.object().shape({
    fullName: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Full name is required'),
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    phoneNumber: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
});

export const Step2Validation = yup.object().shape({
    jobTitle: yup
        .array()
        .min(1, 'At least one job title is required')
        .required('Job title is required'),
});

export const Step3Validation = yup.object().shape({
    location: yup
        .string()
        .required('Location is required'),
});

// Helper function to check if Step1 is valid
export const validateStep1 = (values: any) => {
  try {
    Step1Validation.validateSync(values);
    return true;
  } catch {
    return false;
  }
};

// Helper function to check if Step2 is valid
export const validateStep2 = (values: any) => {
  if (!values.jobTitle || values.jobTitle.length === 0) {
    return false;
  }
  return true;
};

