"use client"
import StatCardValue from "@/components/dashboard/main/StatCardValue";
import StaticsChart from "@/components/dashboard/main/StaticsChart";
import { TopDiv } from "@/components/dashboard/main/TopDiv";

export default function UserDashboard() {
    return (
        <div>
            <div className="rounded-xl mb-4"><TopDiv /></div>
            <div>
                <StatCardValue />
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 mt-4">
                <div className="aspect-video rounded-xl bg-muted " >
                    <StaticsChart/>
                </div>
                <div className="aspect-video rounded-xl bg-muted" />
                <div className="aspect-video rounded-xl bg-muted" />
            </div>
            <div className="min-h-[50vh] rounded-xl bg-muted mt-4" />
        </div>
    );
}