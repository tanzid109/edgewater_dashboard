import { StatCard } from "./StatCard"

export default function StatCardValue() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard image="/icons/clipboard.svg" value={768} label="Total Form Submitted" />
            <StatCard image="/icons/siren.svg" value={186} label="Crisis Calls" />
            <StatCard image="/icons/mobile.svg" value={125} label="Mobile Crisis" />
            <StatCard image="/icons/stabilization.svg" value="$360" label="Crisis Stabilization Unit" />
        </div>
    )
}
