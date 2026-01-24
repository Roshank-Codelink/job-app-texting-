
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
  employer:{
    companyAddress:string,
    companyName:string,
    companyWebsite:string,
    contactNumber:string,
    name:string
    profileStrength:string
    userId:string,
    _id:string  
  }
  status: string;
  isSaved:boolean
}

export interface SaveJobsApiResponse {
  success: boolean;
  count: number;
  data: SaveJob[];
}