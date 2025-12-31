export interface SignupPayload {
    email: string;
    name: string;
    companyName: string;
    companyAddress: string;
    companyWebsite: string;
    contactNumber: string;
}
export interface SignupResponse {
    message: string;
    status: string;
    data: {
        email: string;
        name: string;
        companyName: string;
        companyAddress: string;
        companyWebsite: string;
        contactNumber: string;
    }
}