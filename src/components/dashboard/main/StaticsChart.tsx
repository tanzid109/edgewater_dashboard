/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface SubmissionData {
    day: string;
    value: number;
    isHighlighted?: boolean;
    date?: string;
    timestamp?: string;
}

const SubmissionInsightsChart: React.FC = () => {
    const [data] = useState<SubmissionData[]>([
        { day: "Mon", value: 400, timestamp: "2025-09-01T09:00:00Z" },
        { day: "Tue", value: 120, timestamp: "2025-09-02T09:00:00Z" },
        { day: "Wed", value: 700, timestamp: "2025-09-03T09:00:00Z" },
        { day: "Thu", value: 25, timestamp: "2025-09-04T09:00:00Z" },
        { day: "Fri", value: 0, timestamp: "2025-09-05T09:00:00Z" },
        { day: "Sat", value: 60, timestamp: "2025-09-06T09:00:00Z" },
        { day: "Sun", value: 350, timestamp: "2025-09-07T09:00:00Z" },
    ]);

    // ✅ Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg">
                    <div className="font-semibold">
                        {Math.round(payload[0].value)} submissions
                    </div>
                    <div className="text-gray-300">{label}</div>
                    {data.timestamp && (
                        <div className="text-gray-400 text-xs">
                            {new Date(data.timestamp).toLocaleDateString()}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    // ✅ Custom bar shape (only passes valid props to <rect>)
    const CustomBar = (props: any) => {
        const { x, y, width, height, payload } = props;
        const barColor = payload?.isHighlighted ? "#008402" : "#2489B0";

        return (
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={barColor}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
                }}
            />
        );
    };

    // ✅ Custom Y-axis tick formatter
    const formatYAxisTick = (value: number) => {
        if (value >= 1000) return "1000";
        if (value >= 500) return "500";
        if (value >= 100) return "100";
        if (value >= 50) return "50";
        if (value >= 20) return "20";
        if (value >= 10) return "10";
        return "0";
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Submission Insights
                </h2>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Last 7 days</span>
                </div>
            </div>

            {/* Chart Container */}
            <div className="w-full h-70">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barCategoryGap="20%"
                    >
                        <CartesianGrid
                            strokeDasharray="0"
                            stroke="#f3f4f6"
                            horizontal={true}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 14,
                                fill: "#6b7280",
                                fontWeight: 500,
                            }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 12,
                                fill: "#9ca3af",
                            }}
                            tickFormatter={formatYAxisTick}
                            domain={[0, "dataMax"]}
                            ticks={[0, 10, 20, 50, 100, 500, 1000]}
                        />
                        {/* ✅ Tooltip fixed (pass component reference) */}
                        <Tooltip
                            content={CustomTooltip}
                            cursor={{ fill: "rgba(0, 0, 0, 0.05)", radius: 4 }}
                        />
                        {/* ✅ Shape fixed (pass function reference, not JSX) */}
                        <Bar
                            dataKey="value"
                            shape={CustomBar}
                            radius={[4, 4, 0, 0]}
                            minPointSize={2}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SubmissionInsightsChart;
