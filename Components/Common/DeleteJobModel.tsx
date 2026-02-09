import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { closeJob, deleteJob } from '@/api_config/EmployerInfoApi/jobApplications';
import { toast } from 'react-toastify';
import { parseMsg } from '@/lib/helpers';


interface DeleteJobModelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    jobId: string;
    onJobDelete?: (jobId: string) => void;
}

const DeleteJobModel = ({ open, onOpenChange, jobId, onJobDelete }: DeleteJobModelProps) => {

    const handleDeleteJob = async () => {
        try {
            const response = await deleteJob(jobId);
            if (response.success) {
                // Remove job from list after successful delete
                onJobDelete?.(jobId);
            } else {
                toast.error(parseMsg(response?.message));
            }
        } catch (error) {
            console.error("Error deleting job:", error);
        }
        onOpenChange(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-(--sidebar-bg-color) border-(--profile-border-color)">

                <AlertDialogHeader>
                    <AlertDialogTitle className="text-(--profile-name-color)">Delete Job</AlertDialogTitle>
                    <AlertDialogDescription className="text-(--profile-title-color)">
                        Are you sure you want to delete this job? This action will delete the job.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-(--profile-border-color) text-(--profile-name-color) hover:bg-(--profile-border-color) cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteJob} className="bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) cursor-pointer">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteJobModel