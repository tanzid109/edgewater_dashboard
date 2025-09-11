"use client";

import { DataTable } from "@/shared/Table";
import { ColumnDef, useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import Image from "next/image";
import { useState, useMemo } from "react";
import { data } from "@/data/users"; // your 10 users
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react";
import AddUserModal from "./AddUserModal";

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
        header: "Created on",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.original.status === "active";
            return (
                <p
                    className={`text-base font-medium border w-20 text-center p-1 rounded-lg 
          ${isActive ? "text-[#008402] bg-[#DEFFDE]" : "text-[#D00004] bg-[#f5e3e3]"}`}
                >
                    {row.original.status}
                </p>
            );
        },
    },
];

export default function UsersTable() {
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // Filter data based on both search and status
    const filteredData = useMemo(() => {
        let filtered = data;

        // Apply status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        // Apply search filter
        if (globalFilter) {
            const searchValue = globalFilter.toLowerCase();
            filtered = filtered.filter(user => {
                const searchableFields = [
                    user.name,
                    user.email,
                    user.userId?.toString(),
                    user.status,
                    user.date
                ];

                return searchableFields.some(field =>
                    field?.toString().toLowerCase().includes(searchValue)
                );
            });
        }

        return filtered;
    }, [statusFilter, globalFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
        pageCount: Math.ceil(filteredData.length / pageSize),
        state: {
            pagination: { pageIndex, pageSize },
            columnFilters,
            globalFilter,
        },
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: false,
    });

    // Reset to first page when searching or filtering
    const handleSearchChange = (value: string) => {
        setGlobalFilter(value);
        setPageIndex(0);
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
        setPageIndex(0);
    };

    return (
        <div>
            <div className="flex justify-between items-center my-6">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={globalFilter}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2489B0] focus:border-transparent w-96"
                    />
                </div>

                
                <div className="flex items-center gap-4">
                    {/* Status Filter Dropdown */}
                    <div className="relative flex items-center gap-2">
                        <h2 className="text-base text-[#666666]">Filter</h2>
                        <select
                            value={statusFilter}
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2489B0] focus:border-transparent cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>

                    {/* add new user route */}
                    {/* <Button className="rounded-md py-[21px]"><Plus className="size-5"/>Add New User</Button> */}
                    <AddUserModal/>
                </div>
            </div>
            <DataTable columns={columns} data={table.getRowModel().rows.map(row => row.original)} />
            {/* Show results count */}
            <div className="mt-2 text-sm text-center text-gray-300">
                Showing {table.getRowModel().rows.length} of {filteredData.length} results
                {(globalFilter || statusFilter !== "all") && ` (filtered from ${data.length} total users)`}
            </div>

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

                    {/* Page numbers */}
                    {Array.from({ length: table.getPageCount() }).map((_, index) => {
                        const isActive = table.getState().pagination.pageIndex === index;
                        return (
                            <button
                                key={index}
                                onClick={() => table.setPageIndex(index)}
                                className={`px-4 py-2 border rounded-full disabled:opacity-50 ${isActive ? "bg-[#2489B0] text-white" : "bg-white text-black"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        );
                    })}

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
                            <option className=" " key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}