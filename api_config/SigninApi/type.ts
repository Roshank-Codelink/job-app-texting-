

export interface LoginResponse {
    message: string;
}


export interface VerifyOTPResponse {
    message: string;
    data: {
        token: string;
        name: string;
        email: string;
        role: string;
        id: string;
        jobTitle: string;
        companyName: string;
    }
}
