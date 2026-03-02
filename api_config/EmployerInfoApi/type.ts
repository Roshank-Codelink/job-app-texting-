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
  isPaid?: boolean;
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

export interface MarkJobHiredResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
    status: string;
    profileStrength: string;
    hiredJobsCount: number;
  };
}

export interface LikeJobResponse {
  success: boolean;
  message: string;
}

export interface JobListingItem {
    _id: string;
    companyId: string;
    rawDescription: string;
    status: string;
    likeCount: number;
    companyName: string;
    savedCount: number;
    impressionCount: number;
}

// Job Listings Response structure
export interface JobListingsResponseType {
    success: boolean;
    data: JobListingItem[];
}

export interface JobPostPayload {
    description: string;
}


export interface JobPostResponseData {
    message: string;
    success?: boolean;
    error?: boolean;
    statusCode?: number;
}

export interface JobPostResponseType {
    success: boolean;
    message: string;
    error: boolean;
    statusCode: number;
    data?: JobPostResponseData;
}

export interface JobPost{
    description:string;
}
export interface PaymentResponseType {
  checkoutUrl: string;
};

export interface VerifyPaymentResponseType {
    success: boolean;
    message: string;
    error: boolean;
    statusCode: number;
    data?: {
        message: string;
    };
}

export interface EmployerCustomeridResponseType {
    message: string;
    customerId: string;
}