import { Card, CardContent } from "@/components/ui/card"

export function TopDiv() {
    return (
        <Card className="relative rounded-2xl border-0 bg-gradient-to-r from-[#2489B0] to-[#4CCCC5] text-white overflow-hidden">
            <CardContent className="relative z-10">
                <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                <p className="text-base mt-1">Good morning,</p>
                <p className="text-2xl font-bold">
                    Peter John White! <span className="ml-1">👋</span>
                </p>
            </CardContent>

            {/* Static diagonal wave lines */}
            <div className="absolute inset-0 opacity-30 transform rotate-170">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1800 300"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    {[20,40, 80, 60, 100].map((y, i) => (
                        <path
                            key={i}
                            d={`M0 ${y} Q 150 ${y - 40} 300 ${y} T 600 ${y} T 900 ${y} T 1200 ${y}`}
                            fill="none"
                            stroke="white"
                            strokeWidth="0.9"
                            opacity="0.8"
                        />
                    ))}
                </svg>
            </div>
        </Card>
    )
}
