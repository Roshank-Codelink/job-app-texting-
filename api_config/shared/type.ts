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
