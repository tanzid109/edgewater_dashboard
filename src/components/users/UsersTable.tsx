"use client";

import { DataTable } from "@/shared/Table";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnFiltersState
} from "@tanstack/react-table";
import Image from "next/image";
import { useState, useMemo } from "react";
import { data } from "@/data/users";
import { Search, ChevronDown, Trash2 } from "lucide-react";
import AddUserModal from "./AddUserModal";
import { Switch } from "../ui/switch";
import EditUserModal from "./EditUserModal";

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

export default function UsersTable() {
    // Use state to control user list
    const [users, setUsers] = useState<User[]>(data);
    const [pageSize, setPageSize] = useState(6);
    const [pageIndex, setPageIndex] = useState(0);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const handleToggleStatus = (userId: number) => {
        setUsers(prev =>
            prev.map(user =>
                user.userId === userId
                    ? { ...user, status: user.status === "active" ? "inactive" : "active" }
                    : user
            )
        );
    };

    const handleDelete = (user: User) => {
        setUsers(prev => prev.filter(u => u.userId !== user.userId));
    };

    const columns: ColumnDef<User>[] = [
        { accessorKey: "id", header: "Sl" },
        {
            accessorKey: "photo",
            cell: ({ row }) => (
                <Image
                    src={row.original.photo ?? "/assets/user.jpg"}
                    alt={row.original.name ?? "user"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-md"
                />
            )
        },
        { accessorKey: "userId", header: "User ID" },
        { accessorKey: "name", header: "User Name" },
        { accessorKey: "email", header: "Email" },
        {
            accessorKey: "date",
            header: () => <div className="text-center">Created On</div>,
            cell: ({ row }) => (
                <div className="flex flex-col text-center">
                    <span>{row.original.date}</span>
                    <span>{row.original.time}</span>
                </div>
            )
        },
        {
            accessorKey: "status",
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => {
                const isActive = row.original.status === "active";
                return (
                    <p
                        className={`text-center font-medium border p-1 rounded-lg ${isActive ? "text-[#008402] bg-[#DEFFDE]" : "text-[#D00004] bg-[#f5e3e3]"
                            }`}
                    >
                        {row.original.status}
                    </p>
                );
            }
        },
        {
            accessorKey: "action",
            header: () => <div className="text-center">Action</div>,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex items-center justify-center gap-4">
                        <EditUserModal row={row} />
                        {/* Toggle */}
                        <Switch
                            checked={user.status === "active"}
                            onCheckedChange={() => handleToggleStatus(user.userId)}
                        />
                        <button
                            className="bg-[#FFEFEF] h-12 w-12 rounded-full flex items-center justify-center text-[#D00004] hover:bg-red-100 transition"
                            title="Delete"
                            onClick={() => handleDelete(user)}
                        >
                            <Trash2 className="w-6 h-6" />
                        </button>
                    </div>
                );
            }
        }
    ];

    // Filtered data
    const filteredData = useMemo(() => {
        let filtered = users;

        if (statusFilter !== "all") {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        if (globalFilter) {
            const searchValue = globalFilter.toLowerCase();
            filtered = filtered.filter(user =>
                [user.name, user.email, user.userId?.toString(), user.status, user.date]
                    .some(field => field?.toString().toLowerCase().includes(searchValue))
            );
        }

        return filtered;
    }, [users, statusFilter, globalFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
        pageCount: Math.ceil(filteredData.length / pageSize),
        state: { pagination: { pageIndex, pageSize }, columnFilters, globalFilter },
        onPaginationChange: updater => {
            const newPagination =
                typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });

    return (
        <div>
            {/* Search & Filter */}
            <div className="flex justify-between items-center my-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={globalFilter}
                        onChange={e => {
                            setGlobalFilter(e.target.value);
                            setPageIndex(0);
                        }}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2489B0] focus:border-transparent w-96"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex items-center gap-2">
                        <h2 className="text-base text-[#666666]">Filter</h2>
                        <select
                            value={statusFilter}
                            onChange={e => {
                                setStatusFilter(e.target.value);
                                setPageIndex(0);
                            }}
                            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2489B0] focus:border-transparent cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                    <AddUserModal />
                </div>
            </div>
            <DataTable columns={columns} data={table.getRowModel().rows.map(row => row.original)} />

            <div className="mt-2 text-sm text-center text-gray-300">
                Showing {table.getRowModel().rows.length} of {filteredData.length} results
            </div>
        </div>
    );
}