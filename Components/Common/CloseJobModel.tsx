import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { closeJob } from '@/api_config/EmployerInfoApi/jobApplications';

interface CloseJobModelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    jobId: string;
    onStatusUpdate?: (jobId: string, newStatus: string) => void;
}

const CloseJobModel = ({ open, onOpenChange, jobId, onStatusUpdate }: CloseJobModelProps) => {
    const handleCloseJob = async () => {
        try {
            const response = await closeJob(jobId);
            if (response.success) {
                if (onStatusUpdate) {
                    onStatusUpdate(jobId, "closed");
                }
            }
        } catch (error) {
            console.error("Error closing job:", error);
        }
        onOpenChange(false);
    }
    
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-(--sidebar-bg-color) border-(--profile-border-color)">

                <AlertDialogHeader>
                    <AlertDialogTitle className="text-(--profile-name-color)">Close Job</AlertDialogTitle>
                    <AlertDialogDescription className="text-(--profile-title-color)">
                        Are you sure you want to close this job? This action will close the job.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-(--profile-border-color) text-(--profile-name-color) hover:bg-(--profile-border-color) cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCloseJob} className="bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) cursor-pointer">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CloseJobModel