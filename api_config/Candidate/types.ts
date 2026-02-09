export interface ApplyJobResponse {
    success: boolean;
    message: string;
    data: {
        applicationId: string;
        jobId: string;
        status: string;
        createdAt: string;
    }
}

export interface LikeJobResponse {
  success: boolean;
  message: string;
}

export interface SaveJobResponse {
  success: boolean;
  savedCount: number;
  message: string;
}

export interface SaveJob {
  _id: string;
  employerProfileId: string;
  rawDescription: string;
  extractedData: {
    jobTitle: string;
    experience: string;
    skills: string[];
    location: string | null;
    jobType: string | null;
    workMode: string | null;
    department: string;
  };
  employer: {
    companyAddress: string;
    companyName: string;
    companyWebsite: string;
    companyLogo: string;
    contactNumber: string;
    name: string;
    profileStrength: string;
    userId: string;
    _id: string;
  };
  status: string;
  isSaved: boolean;
}

export interface SaveJobsApiResponse {
  success: boolean;
  count: number;
  data: SaveJob[];
}

export interface JobsPageProps {
  searchParams: Promise<{
    text?: string;
    location?: string;
    date?: string;
    mode?: string;
    type?: string;
    department?: string;
    page?: string | number;
    limit?: string | number;
  }>;
}