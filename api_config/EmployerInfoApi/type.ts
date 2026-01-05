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
}

export interface EmployerInfoResponse {
    success: boolean,
    message: string,
    data: EmployerInfoData
}

