import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import { MarkJobHiredApi } from "@/api_config/shared/sharedapi";
interface MarkAsHiredModalProps {
    jobId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onStatusUpdate?: (jobId: string, newStatus: string) => void;
}

export default function MarkAsHiredModal({ jobId, open, onOpenChange, onStatusUpdate }: MarkAsHiredModalProps) {
    const handleConfirm = async () => {
        try {
            const response = await MarkJobHiredApi(jobId);
            // Update job status immediately without reload
            if (onStatusUpdate) {
                onStatusUpdate(jobId, "hired");
            }
        } catch (error) {
            console.error("Error marking job as hired:", error);
        }
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-(--sidebar-bg-color) border-(--profile-border-color)">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-(--profile-name-color)">Mark as Hired</AlertDialogTitle>
                    <AlertDialogDescription className="text-(--profile-title-color)">
                        Are you sure you want to mark this job as hired? This action will update the job status.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-(--profile-border-color) text-(--profile-name-color) hover:bg-(--profile-border-color) cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} className="bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) cursor-pointer">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}