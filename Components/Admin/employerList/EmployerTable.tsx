"use client"

import { EmployersData, GetEmployersResponse } from '@/api_config/Admin/types';
import { approveRejectEmployer } from '@/api_config/Admin/employers';
import { DataTable } from '@/Components/Common/DataTable';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Skeleton } from '@/Components/ui/skeleton';
import { Row } from '@tanstack/react-table';
import { CheckCircle, Ellipsis, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const EmployerTable = React.memo(({ employerData }: { employerData: GetEmployersResponse }) => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean;
        userId: string | null;
        employerName: string | null;
        status: "ACTIVE" | "REJECTED" | null;
    }>({
        open: false,
        userId: null,
        employerName: null,
        status: null,
    });

    const handleApproveRejectClick = (userId: string, employerName: string, status: "ACTIVE" | "REJECTED") => {
        setConfirmDialog({
            open: true,
            userId,
            employerName,
            status,
        });
    };

    const handleConfirm = async () => {
        if (!confirmDialog.userId || !confirmDialog.status) return;

        const userId = confirmDialog.userId;
        const status = confirmDialog.status;

        // Prevent multiple simultaneous requests for the same user
        if (isProcessing === userId) return;

        setIsProcessing(userId);
        setConfirmDialog({ open: false, userId: null, employerName: null, status: null });

        try {
            const response = await approveRejectEmployer(userId, status);

            if (response.error || response.statusCode !== 200) {
                const errorMessage = response.data?.message || `Failed to ${status === "ACTIVE" ? "approve" : "reject"} employer`;
                toast.error(errorMessage);
                console.error("Approve/Reject Error:", response);
            } else {
                const successMessage = response.data?.message || `Employer ${status === "ACTIVE" ? "approved" : "rejected"} successfully`;
                toast.success(successMessage);

                // Refresh the page data
                router.refresh();
            }
        } catch (error: any) {
            console.error("Approve/Reject Error:", error);
            toast.error(error?.message || "An unexpected error occurred");
        } finally {
            setIsProcessing(null);
        }
    };

    const handleCancel = () => {
        setConfirmDialog({ open: false, userId: null, employerName: null, status: null });
    };

    const columns = [
        {
            header: "Company Name",
            accessorKey: "companyName",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Contact Number",
            accessorKey: "contactNumber",
        },
        {
            header: "Payment Status",
            accessorKey: "paymentStatus",
            cell: ({ row }: { row: Row<EmployersData> }) => {
                const paymentStatus = row.original.paymentStatus;
                const isPaid = paymentStatus === "Paid";
                return (
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isPaid
                            ? "bg-gradient-to-r from-[#38bdf8] to-[#2dd4bf] text-white"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}>
                        {paymentStatus}
                    </div>
                );
            },
        },
        {
            header: "Status",
            accessorKey: "status",
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }: { row: Row<EmployersData> }) => {
                const isDisabled = row.original.status === "ACTIVE" || isProcessing === row.original.userId;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild disabled={isDisabled}>
                            <Button className="h-7 w-7 cursor-pointer" variant="ghost" disabled={isDisabled}>
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start">
                            <DropdownMenuItem
                                onClick={() => handleApproveRejectClick(row.original.userId, row.original.companyName || row.original.name, "ACTIVE")}
                                disabled={isProcessing === row.original.userId}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {isProcessing === row.original.userId ? "Processing..." : "Approve"}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => handleApproveRejectClick(row.original.userId, row.original.companyName || row.original.name, "REJECTED")}
                                disabled={isProcessing === row.original.userId}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                {isProcessing === row.original.userId ? "Processing..." : "Reject"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
            size: 120,
            enableSorting: false,
            enableResizing: false,
            meta: {
                skeleton: <Skeleton className="size-5" />,
            },
        },
    ]


    return (
        <>
            <div className="w-full">
                <DataTable
                    columns={columns}
                    data={employerData?.data || []}
                    pagination={employerData ? {
                        currentPage: employerData.currentPage,
                        total: employerData.total,
                        totalCount: employerData.totalCount,
                        limit: employerData.limit,
                    } : undefined}
                />
            </div>

            {/* Approval Confirmation Dialog */}
            <Dialog open={confirmDialog.open && confirmDialog.status === "ACTIVE"} onOpenChange={(open) => !open && handleCancel()}>
                <DialogContent className="bg-(--sidebar-bg-color) border-(--profile-border-color)">
                    <DialogHeader>
                        <DialogTitle className="text-(--profile-name-color)">Approve Employer</DialogTitle>
                        <DialogDescription className="text-(--profile-title-color)">
                            Are you sure you want to approve <strong>{confirmDialog.employerName}</strong>? This will activate their account and grant them access to the platform.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isProcessing === confirmDialog.userId}
                            className="border-(--profile-border-color) text-(--profile-name-color) hover:bg-(--profile-border-color) cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={isProcessing === confirmDialog.userId}
                            className="from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) cursor-pointer"
                        >
                            {isProcessing === confirmDialog.userId ? "Processing..." : "Approve"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Rejection Confirmation Dialog */}
            <Dialog open={confirmDialog.open && confirmDialog.status === "REJECTED"} onOpenChange={(open) => !open && handleCancel()}>
                <DialogContent className="bg-(--sidebar-bg-color) border-(--profile-border-color)">
                    <DialogHeader>
                        <DialogTitle className="text-(--profile-name-color)">Reject Employer</DialogTitle>
                        <DialogDescription className="text-(--profile-title-color)">
                            Are you sure you want to reject <strong>{confirmDialog.employerName}</strong>? This action will deny their access to the platform. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isProcessing === confirmDialog.userId}
                            className="border-(--profile-border-color) text-(--profile-name-color) hover:bg-(--profile-border-color) cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={isProcessing === confirmDialog.userId}
                            className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        >
                            {isProcessing === confirmDialog.userId ? "Processing..." : "Reject"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
})

export default EmployerTable;