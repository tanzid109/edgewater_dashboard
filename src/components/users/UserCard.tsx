import { Card } from "@/components/ui/card"
import Image from "next/image"
{/* <UserCard image="/icons/users.svg" value={} label="" />
            <UserCard image="/icons/restore.svg" value={} label="" />
            <UserCard image="/icons/user.svg" value={1490} label="Active User" />
            <UserCard image="/icons/money.svg" value={36} label="Inactive user" /> */}

export function UserCard() {
    return (
        <main className="grid auto-rows-min gap-4 md:grid-cols-4">
            {/* total users */}
            <Card className="flex flex-row items-center gap-4 px-4 py-6 rounded-xl shadow-sm">
                {/* Image circle */}
                <div className="flex ml-4 h-13 w-13 items-center justify-center rounded-full bg-[#F8F8F8]">
                    <Image
                        src="/icons/alluser.svg"
                        alt="Total Users"
                        width={24}
                        height={24}
                        className="object-cover text-[#333333]"
                    />
                </div>
                {/* Text */}
                <div>
                    <div className="text-lg font-bold">1526</div>
                    <div className="text-base font-normal text-[#333333]">Total Users</div>
                </div>
            </Card>
            {/* new users */}
            <Card className="flex flex-row items-center gap-4 px-4 py-6 rounded-xl shadow-sm">
                {/* Image circle */}
                <div className="flex ml-4 h-13 w-13 items-center justify-center rounded-full bg-[#F4FAFD]">
                    <Image
                        src="/icons/newuser.svg"
                        alt="New Users"
                        width={24}
                        height={24}
                        className="object-cover"
                    />
                </div>
                {/* Text */}
                <div>
                    <div className="text-lg font-bold">24</div>
                    <div className="text-base font-normal text-[#333333]">New User</div>
                </div>
            </Card>
            {/* active user */}
            <Card className="flex flex-row items-center gap-4 px-4 py-6 rounded-xl shadow-sm">
                {/* Image circle */}
                <div className="flex ml-4 h-13 w-13 items-center justify-center rounded-full bg-[#DEFFDE]">
                    <Image
                        src="/icons/activeuser.svg"
                        alt="New Users"
                        width={24}
                        height={24}
                        className="object-cover"
                    />
                </div>
                {/* Text */}
                <div>
                    <div className="text-lg font-bold">1490</div>
                    <div className="text-base font-normal text-[#333333]">New User</div>
                </div>
            </Card>
            {/* inactive user */}
            <Card className="flex flex-row items-center gap-4 px-4 py-6 rounded-xl shadow-sm">
                {/* Image circle */}
                <div className="flex ml-4 h-13 w-13 items-center justify-center rounded-full bg-[#FFEFEF]">
                    <Image
                        src="/icons/inactiveuser.svg"
                        alt="New Users"
                        width={24}
                        height={24}
                        className="object-cover"
                    />
                </div>
                {/* Text */}
                <div>
                    <div className="text-lg font-bold">36</div>
                    <div className="text-base font-normal text-[#333333]">Inactive User</div>
                </div>
            </Card>
        </main>
    )
}
