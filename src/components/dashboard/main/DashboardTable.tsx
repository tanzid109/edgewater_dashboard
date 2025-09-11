"use client";

import { DataTable } from "@/shared/Table";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import { data } from "@/data/users"; // your 50 users with random status
import { ChevronLeft, ChevronRight } from "lucide-react";

type User = {
    id: string;
    photo?: string;
    userId: number;
    name?: string;
    email: string;
    date?: string;
    time?: string;
    status: "active" | "inactive";
};

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "Sl",
    },
    {
        accessorKey: "photo",
        cell: ({ row }) => (
            <div className="flex items-center space-x-3">
                <Image
                    alt={row.original.name ?? "user"}
                    src={row.original.photo ?? "/assets/default-avatar.jpg"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-md"
                />
            </div>
        ),
    },
    {
        accessorKey: "userId",
        header: "User ID",
    },
    {
        accessorKey: "name",
        header: "User Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "date",
        header: () => <div className="text-center">Created On</div>,
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-center">{row.original.date}</span>
                <span className="text-center">{row.original.time}</span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const isActive = row.original.status === "active";
            return (
                <p
                    className={`text-base text-center font-medium border p-1 rounded-lg 
          ${isActive ? "text-[#008402] bg-[#DEFFDE]" : "text-[#D00004] bg-[#f5e3e3]"}`}
                >
                    {row.original.status}
                </p>
            );
        },
    },
];

export default function DashboardTable() {
    const [pageSize, setPageSize] = useState(5); // rows per page
    const [pageIndex, setPageIndex] = useState(0);

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(data.length / pageSize),
        state: {
            pagination: { pageIndex, pageSize },
        },
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div>
            <h2 className="text-base font-semibold mb-4">Recently added users</h2>

            <DataTable
                columns={columns}
                data={table.getRowModel().rows.map((row) => row.original)}
            />

            {/* Pagination controls */}
            <div className="flex justify-between flex-row-reverse items-center gap-2 mt-4">
                <div className="flex items-center gap-2">
                    {/* Previous button */}
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 border rounded-full bg-[#2489B0] text-white disabled:opacity-50"
                    >
                        <ChevronLeft />
                    </button>

                    {/* Page numbers with ellipsis */}
                    {(() => {
                        const totalPages = table.getPageCount();
                        const currentPage = table.getState().pagination.pageIndex + 1;
                        const pages: (number | string)[] = [];

                        if (totalPages <= 7) {
                            for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                            if (currentPage <= 4) {
                                pages.push(1, 2, 3, 4, 5, "...", totalPages);
                            } else if (currentPage >= totalPages - 3) {
                                pages.push(
                                    1,
                                    "...",
                                    totalPages - 4,
                                    totalPages - 3,
                                    totalPages - 2,
                                    totalPages - 1,
                                    totalPages
                                );
                            } else {
                                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
                            }
                        }

                        return pages.map((page, index) => {
                            if (page === "...") {
                                return (
                                    <span key={index} className="px-3 py-2">
                                        ...
                                    </span>
                                );
                            }
                            const isActive = currentPage === page;
                            return (
                                <button
                                    key={index}
                                    onClick={() => table.setPageIndex((page as number) - 1)}
                                    className={`px-4 py-2 border rounded-full ${isActive ? "bg-[#2489B0] text-white" : "bg-white text-black"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        });
                    })()}

                    {/* Next button */}
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="p-2 border rounded-full bg-[#2489B0] text-white disabled:opacity-50"
                    >
                        <ChevronRight />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Page size selector */}
                    <p className="text-[#666666]">Show per page</p>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                        className="border p-2 rounded-lg bg-[#F8F8F8] text-[#333333] font-medium"
                    >
                        {[5, 10, 20].map((size) => (
                            <option className="bg-[#2489B0]" key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
