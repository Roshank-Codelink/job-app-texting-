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


// candidate SignUp skill response
export interface CandidateSignUpSkillResponse {
    success: boolean;
    data:[
        {
            _id: string;
            name: string;
        }
    ]
}

// candidate SignUp payload

export interface CandidateOnboardingPayload {
    name: string;
    email: string;
    phone: string;
    jobTitle: string;
    skills: string[];
    location: string;
}


export interface CandidateOnboadingResponse {
    message: string;
}