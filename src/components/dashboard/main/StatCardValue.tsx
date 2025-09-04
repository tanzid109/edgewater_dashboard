import { StatCard } from "./StatCard"

export default function StatCardValue() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard image="/icons/clipboard.svg" value={768} label="Total Form Submitted" />
            <StatCard image="/icons/restore.svg" value={186} label="Total Repeat Visitors" />
            <StatCard image="/icons/user.svg" value={125} label="Total Follow up Visits" />
            <StatCard image="/icons/money.svg" value="$360" label="Total Cost of Care" />
        </div>
    )
}
