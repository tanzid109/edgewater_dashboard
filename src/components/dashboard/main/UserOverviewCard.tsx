"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ArrowDown, Users } from "lucide-react";

export default function UserOverviewCard() {
    return (
        <Card className="bg-white border-0 p-4 rounded-lg shadow-lg mx-auto h-80">
            {/* Header */}
                <CardTitle className="px-4 pt-2 text-base font-medium">User Overview</CardTitle>           
            <Separator/>
            {/* Total Users */}
            <CardContent>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-slate-100">
                        <Users className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">1526</p>
                        <p className="text-sm text-muted-foreground">Total user</p>
                    </div>
                    <div className="ml-auto flex items-center text-green-600 text-sm font-semibold">
                        <ArrowUp className="w-4 h-4 mr-1" />
                        10.50%
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    {/* Active User */}
                    <div className="rounded-xl p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                        <p className="text-lg font-bold">1490</p>
                        <div className="flex items-center text-sm">
                            <ArrowUp className="w-4 h-4 mr-1" />
                            10.50%
                        </div>
                        <p className="text-xs opacity-90 mt-1">Active user</p>
                    </div>

                    {/* New User */}
                    <div className="rounded-xl p-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white">
                        <p className="text-lg font-bold">15</p>
                        <div className="flex items-center text-sm">
                            <ArrowUp className="w-4 h-4 mr-1" />
                            7%
                        </div>
                        <p className="text-xs opacity-90 mt-1">New user</p>
                    </div>

                    {/* Inactive User */}
                    <div className="rounded-xl p-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white">
                        <p className="text-lg font-bold">7</p>
                        <div className="flex items-center text-sm text-red-500">
                            <ArrowDown className="w-4 h-4 mr-1" />
                            10.50%
                        </div>
                        <p className="text-xs opacity-90 mt-1">Inactive user</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
