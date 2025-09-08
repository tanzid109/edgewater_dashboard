
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUp,  ChevronsUp } from "lucide-react";
import { FaUsers } from "react-icons/fa6";

export default function UserOverviewCard() {
    return (
        <Card className="bg-white border-0 p-4 rounded-lg shadow-lg mx-auto gap-8">
            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-900">User Overview</h2>          
            <Separator/>
            {/* Total Users */}
            <main className="py-1">
                <div className="flex items-end gap-2">
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-5 rounded-full bg-slate-100">
                            <FaUsers className="w-7 h-7 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">1526</p>
                            <p className="text-sm text-[#333333]">Total user</p>
                        </div>
                    </div>
                    <div className="ml-auto flex items-center px-2.5 py-1 rounded-2xl bg-[#DEFFDE] text-base text-[#008402] font-semibold">
                        <ArrowUp className="w-4 h-4 mr-1 " />
                        <h2 className="text-[#008402]">10.50%</h2>
                    </div>
                </div>
                <Separator className="mt-6"/>
                {/* Bottom Stats */}
                <div className="flex justify-between items-end mt-3.5">
                    {/* Active User */}
                    <div>
                        <div className="flex items-center">
                            <h2 className="mb-3 text-lg font-semibold">1490</h2>
                            <div className="flex ml-2 text-[#008402] items-center text-base font-semibold">
                                <ChevronsUp className="w-4 h-4 mr-1" />
                                <h2 className="text-base">10.50%</h2>
                            </div>
                        </div>
                        <div className="rounded-xl p-6 bg-gradient-to-r from-[#2489B0] to-[#4CCCC5] text-white">
                            <h2 className="text-base font-medium">Active user</h2>
                        </div>
                    </div>
                    {/* New User */}
                    <div>
                        <div className="flex items-center">
                            <h2 className="mb-3 text-lg font-semibold">1490</h2>
                            <div className="flex ml-2 text-[#008402] items-center text-base font-semibold">
                                <ChevronsUp className="w-4 h-4 mr-1" />
                                <h2 className="text-base">10.50%</h2>
                            </div>
                        </div>
                        <div className="rounded-xl p-5 bg-gradient-to-r from-[#2489B0] to-[#4CCCC5] text-white">
                            <h2 className="text-base font-medium">New User</h2>
                        </div>
                    </div>
                    {/* Inactive User */}
                    <div>
                        <div className="flex items-center">
                            <h2 className="mb-3 text-lg font-semibold">1490</h2>
                            <div className="flex ml-2 text-[#008402] items-center text-base font-semibold">
                                <ChevronsUp className="w-4 h-4 mr-1" />
                                <h2 className="text-base">10.50%</h2>
                            </div>
                        </div>
                        <div className="rounded-xl p-4 bg-gradient-to-r from-[#2489B0] to-[#4CCCC5] text-white">
                            <h2 className="text-base font-medium">Inactive User</h2>
                        </div>
                    </div>
                </div>
            </main>
        </Card>
    );
}
