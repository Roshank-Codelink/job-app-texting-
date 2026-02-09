"use client";

import { DataTable } from "@/Components/Common/DataTable";
import { JobApplication, JobApplicationsResponse } from "@/api_config/EmployerInfoApi/type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

interface JobApplicationsTableProps {
  applications: JobApplicationsResponse;
}

function formatDate(dateString: string) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusStyles(status: string) {
  const normalized = status?.toLowerCase();
  switch (normalized) {
    case "pending":
      return "bg-yellow-50 text-yellow-700 border border-yellow-200";
    case "shortlisted":
    case "accepted":
    case "hired":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "rejected":
      return "bg-red-50 text-red-700 border border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border border-gray-200";
  }
}

export default function JobApplicationsTable({
  applications,
}: JobApplicationsTableProps) {
  const safeApplications = applications?.data || [];

  const columns: ColumnDef<JobApplication>[] = [
    {
      header: "Candidate",
      accessorKey: "employee.name",
      cell: ({ row }: { row: any }) => {
        const employee = row.original.employee;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-(--profile-text-color)">
              {employee?.name || "—"}
            </span>
            <span className="text-xs text-(--profile-title-color)">
              {employee?.email || "—"}
            </span>
          </div>
        );
      },
    },
    // {
    //   header: "Role",
    //   accessorKey: "employee.jobTitle",
    //   cell: ({ row }) => {
    //     const employee = row.original.employee;
    //     return (
    //       <div className="flex flex-col">
    //         <span className="text-sm font-medium text-(--profile-text-color)">
    //           {employee?.jobTitle || "—"}
    //         </span>
    //         <span className="text-xs text-(--profile-title-color)">
    //           {employee?.location || "—"}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    {
      header: "Job",
      accessorKey: "job.jobTitle",
      cell: ({ row }: { row: any }) => {
        const job = row.original.job;
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-(--profile-text-color)">
              {job?.jobTitle || "—"}
            </span>
            <span className="text-xs text-(--profile-title-color)">
              {job?.location || "—"}
            </span>
          </div>
        );
      },
    },
    {
      header: "Applied on",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => (
        <span className="text-sm text-(--profile-title-color)">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      header: "Application status",
      accessorKey: "applicationStatus",
      cell: ({ row }: { row: any })=> {
        const status = row.original.applicationStatus || "—";
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize",
              getStatusStyles(status)
            )}
          >
            {status.toLowerCase().replace(/_/g, " ")}
          </span>
        );
      },
    },
    {
      header: "Job status",
      accessorKey: "job.status",
      cell: ({ row }: { row: any }) => {
        const status = row.original.job?.status || "—";
        return (
          <span className="text-xs rounded-full px-2 py-1 bg-(--sidebar-bg-color) text-(--profile-title-color) border border-(--profile-border-color) capitalize">
            {status.toLowerCase().replace(/_/g, " ")}
          </span>
        );
      },
    },
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => {
    //     const employee = row.original.employee;
    //     return (
    //       <div className="flex items-center gap-2">
    //         <Button
    //           variant="outline"
    //           className="h-8 px-3 text-xs cursor-pointer border-(--profile-border-color) text-(--profile-name-color) hover:bg-(--profile-border-color)"
    //           onClick={() => {
    //             // Placeholder for future: view candidate profile
    //             console.log("View application", row.original._id, employee?.userId);
    //           }}
    //         >
    //           View details
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 lg:p-8 bg-(--sidebar-bg-color) border-(--profile-border-color) rounded-lg space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-2xl font-semibold text-(--profile-text-color)">
          Job applications
        </h1>
        <p className="text-sm text-(--profile-title-color)">
          Review and manage candidates who have applied to your jobs.
        </p>
      </div>

      <DataTable columns={columns} data={safeApplications} pagination={
        {
          currentPage: applications.currentPage,
          total: applications.total,
          totalCount: applications.total,
          limit: applications.limit,
        }
      } />
    </div>
  );
}

