export interface EmployerInfoData {
  userId: string;
  email: string;
  role: string;
  status: string;
  name: string;
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  contactNumber: string;
  profileStrength?: string;
  companyLogo?: string;
}

export interface EmployerInfoResponse {
  success: boolean;
  message: string;
  data: EmployerInfoData;
}

export interface JobApplicationsResponse {
  success: boolean;
  data: JobApplication[];
  currentPage: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface JobApplication {
  _id: string;
  jobId: string;
  job: {
    jobTitle: string;
    location: string;
    status: string;
  };
  applicationStatus: string;
  createdAt: string;
  employee: {
    userId: string;
    email: string;
    name: string;
    phone: string;
    jobTitle: string;
    skills: string[];
    location: string;
    isOnboardingCompleted: boolean;
  };
}

export interface CloseJobResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
    status: string;
  };
}

export interface DeleteJobResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
  };
}

export interface RenewJobResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
  };
}

export interface UploadLogoResponse {
  success: boolean;
  message: string;
  data: {
    companyLogo: string;
  };
}
