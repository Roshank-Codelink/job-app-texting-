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