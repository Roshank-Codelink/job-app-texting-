import * as yup from 'yup';

export const AuthValidation = yup.object().shape({
    email: yup.string().email('Invalid email address !').required('Email is required !'),
});

export const OtpValidation = yup.object().shape({
    otp: yup
        .string()
        .required('OTP is required !')
        .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
        .length(6, 'OTP must be 6 digits'),
});

export const SignupValidation = yup.object().shape({
    email: yup.string().email('Invalid email address !').required('Email is required !'),
    name: yup.string().required('Name is required !'),
    companyName: yup.string().required('Company name is required !'),
    companyAddress: yup.string().required('Company address is required !'),
    companyWebsite: yup.string().url('Invalid website URL !').required('Company website is required !'),
    contactNumber: yup.string().required('Contact number is required !'),
});

