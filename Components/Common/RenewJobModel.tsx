import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { renewJob } from '@/api_config/EmployerInfoApi/jobApplications';
import { parseMsg } from '@/lib/helpers';

interface RenewJobModelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    jobId: string;
    /** Called after successful renew to refresh the jobs list (renew creates a new job). */
    onRefreshJobs?: () => void | Promise<void>;
}

const RenewJobModel = ({ open, onOpenChange, jobId, onRefreshJobs }: RenewJobModelProps) => {
    const handleRenewJob = async () => {
        try {
            const response = await renewJob(jobId);
            if (response.success) {
                await onRefreshJobs?.();
            } else {
                toast.error(parseMsg(response?.message));
            }
        } catch (error) {
            console.error("Error renewing job:", error);
        }
        onOpenChange(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-(--sidebar-bg-color) border-(--profile-border-color)">

                <AlertDialogHeader>
                    <AlertDialogTitle className="text-(--profile-name-color)">Renew Job</AlertDialogTitle>
                    <AlertDialogDescription className="text-(--profile-title-color)">
                        Are you sure you want to renew this job? A new job with the same content will be created and added to your list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-(--profile-border-color) text-(--profile-name-color) hover:bg-(--profile-border-color) cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRenewJob} className="bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) cursor-pointer">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RenewJobModel
