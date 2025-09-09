import { data } from '@/data/users';
import { DataTable } from '@/shared/Table';
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image';

const DashboardTable = () => {
    type User = {
        id: string
        photo?: string
        userId: number
        name?: string
        email: string
        date?: string
        time?: string
        status: "active" | "inactive"
    }


    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "id",
            header: "Sl",
        },
        {
            accessorKey: "Photo",
            cell: ({ row }) => {
                const user = row.original; // full User object
                return (
                    <div className="flex items-center space-x-3">
                        <Image
                            alt={user.name ?? "user"}
                            src={user.photo ?? "/assets/default-avatar.jpg"} // fallback if no photo
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-md object-cover object-center"
                        />
                    </div>
                );
            },
        },

        {
            accessorKey: "userId",
            header: "User ID",
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
                const status = row.original.status;
                const isActive = status === "active";

                return (
                    <p
                        className={`text-base font-medium border w-18 text-center p-1 rounded-lg 
          ${isActive ? "text-[#008402] bg-[#DEFFDE]" : "text-[#D00004] bg-[#f5e3e3]"}
        `}
                    >
                        {status}
                    </p>
                );
            },
        },

        // {
        //     accessorKey: "isActive",
        //     header: () => <div>isActive</div>,
        //     cell: ({ row }) => (
        //         <div>
        //             <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
        //                 True
        //             </p>
        //         </div>
        //     ),
        // },       
    ];


    return (
        <div>
            <h2 className='text-base font-semibold mb-4'>Recently added users</h2>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default DashboardTable;