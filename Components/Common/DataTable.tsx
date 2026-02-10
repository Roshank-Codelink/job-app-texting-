"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/Components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

interface PaginationProps {
    currentPage: number
    total: number
    totalCount: number
    limit: number
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination?: PaginationProps
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
}: DataTableProps<TData, TValue>) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    // Pagination calculations
    const totalPages = pagination ? Math.ceil(pagination.totalCount / pagination.limit) : 0
    const currentPage = pagination?.currentPage || 1
    const limit = pagination?.limit || 10
    const totalCount = pagination?.totalCount || 0
    const startItem = totalCount > 0 ? ((currentPage - 1) * limit) + 1 : 0
    const endItem = Math.min(currentPage * limit, totalCount)

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return
        
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", newPage.toString())
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    // Handle limit change
    const handleLimitChange = (newLimit: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("limit", newLimit)
        params.set("page", "1") // Reset to first page when changing limit
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            // Calculate start and end of middle pages
            let start = Math.max(2, currentPage - 1)
            let end = Math.min(totalPages - 1, currentPage + 1)

            // Adjust if we're near the start
            if (currentPage <= 3) {
                end = Math.min(4, totalPages - 1)
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                start = Math.max(2, totalPages - 3)
            }

            // Add ellipsis if needed
            if (start > 2) {
                pages.push("...")
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            // Add ellipsis if needed
            if (end < totalPages - 1) {
                pages.push("...")
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader className="bg-(--navbar-bg-button) ">
                    {table.getHeaderGroups().map((headerGroup:any) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header:any) => {
                                return (
                                    <TableHead key={header.id} className="border text-[#0EA5E9]">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody >
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row:any) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell:any) => (
                                    <TableCell key={cell.id} className="p-3 border">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination Section */}
            {pagination && totalPages > 0 && (
                <div className="flex items-center justify-between border-t  px-4 py-3">
                    {/* Left Side - Rows per page */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">Rows per page</span>
                        <Select value={limit.toString()} onValueChange={handleLimitChange}>
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Right Side - Page Navigation */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                            {startItem} - {endItem} of {totalCount}
                        </span>
                        <div className="flex items-center gap-2">
                            {/* Previous Button */}
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 cursor-pointer bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {/* Page Number Buttons */}
                            {getPageNumbers().map((page, index) => {
                                if (page === "...") {
                                    return (
                                        <span key={`ellipsis-${index}`} className="px-2 text-sm text-gray-500">
                                            ...
                                        </span>
                                    )
                                }

                                const pageNum = page as number
                                const isActive = pageNum === currentPage

                                return (
                                    <Button
                                        key={pageNum}
                                        variant={isActive ? "default" : "outline"}
                                        size="icon"
                                        className={`h-8 w-8 ${isActive ? "bg-blue-600 text-gray-500 bg-[white] border-[1px] border-gray-200 hover:bg-[white]" : ""}`}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </Button>
                                )
                            })}

                            {/* Next Button */}
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8  bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white cursor-pointer"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}