import { Card } from "@/components/ui/card"
import Image from "next/image"

interface StatCardProps {
    image: string // image path or URL
    value: string | number
    label: string
}

export function StatCard({ image, value, label }: StatCardProps) {
    return (
        <Card className="flex flex-row items-center gap-4 px-4 py-6 rounded-xl shadow-sm">
            {/* Image circle */}
            <div className="flex ml-4 h-13 w-13 items-center justify-center rounded-full bg-gradient-to-r from-[#2489B0] to-[#4CCCC5]">
                <div className="relative h-6 w-6">
                    <Image
                        src={image}
                        alt={label}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Text */}
            <div>
                <div className="text-lg font-bold">{value}</div>
                <div className="text-base font-normal text-[#333333]">{label}</div>
            </div>
        </Card>
    )
}
