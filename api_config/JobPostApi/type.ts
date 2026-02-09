// Request payload
export interface JobPostPayload {
    description: string;
}

// Response data structure
export interface JobPostResponseData {
    message: string;
    success?: boolean;
    error?: boolean;
    statusCode?: number;
}

// API Response structure
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

// Job Listing Item structure
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