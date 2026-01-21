
// Step Component Props Interfaces
export interface Step1Props {
    values: any;
    setFieldValue: (field: string, value: any) => void;
  }
  
  export interface Step2Props {
    values: any;
    setFieldValue: (field: string, value: any) => void;
  }
  
  export interface Step3Props {
    values: any;
    setFieldValue: (field: string, value: any) => void;
  }
  
  // Nominatim API Response Interface
  export interface NominatimResponse {
    display_name: string;
    lat: string;
    lon: string;
    [key: string]: any;
  }
  

// AllJobsFeed

export interface Job {
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
}

export interface JobsApiResponse {
  success: boolean;
  count: number;
  data: Job[];
}


export interface department {
  _id:string,
  department:string
}

export interface departmentApiResponse {
  success:boolean,
  data : department[]
}