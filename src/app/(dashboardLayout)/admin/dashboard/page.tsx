"use client"
import DashboardTable from "@/components/dashboard/main/DashboardTable";
import StatCardValue from "@/components/dashboard/main/StatCardValue";
import StaticsChart from "@/components/dashboard/main/StaticsChart";
import SubmissionCompare from "@/components/dashboard/main/SubmissionCompare";
import { TopDiv } from "@/components/dashboard/main/TopDiv";
import UserOverviewCard from "@/components/dashboard/main/UserOverviewCard";

export default function UserDashboard() {
    return (
        <div className="mt-1">
            <div className="rounded-xl mb-4"><TopDiv /></div>
            <div>
                <StatCardValue />
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-4">
                <div className="aspect-video rounded-xl bg-muted " >
                    <StaticsChart />
                </div>
                <div className="aspect-video rounded-xl bg-muted">
                    <SubmissionCompare />
                </div>
                <div className="aspect-video rounded-xl bg-muted">
                    <UserOverviewCard />
                </div>
            </div>
            <div className="min-h-auto rounded-xl mt-4 p-2" >
                <DashboardTable />
            </div>
        </div>
    );
}