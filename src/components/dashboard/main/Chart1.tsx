"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
    {
        day: 'Mon',
        value: 500,
        color: '#3B82F6'
    },
    {
        day: 'Tue',
        value: 100,
        color: '#3B82F6'
    },
    {
        day: 'Wed',
        value: 650,
        color: '#22C55E',
        isHighlighted: true,
        tooltipValue: 12,
        tooltipDate: '25 Aug 2025'
    },
    {
        day: 'Thu',
        value: 25,
        color: '#3B82F6'
    },
    {
        day: 'Fri',
        value: 0,
        color: '#3B82F6'
    },
    {
        day: 'Sat',
        value: 60,
        color: '#3B82F6'
    },
    {
        day: 'Sun',
        value: 400,
        color: '#3B82F6'
    }
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        if (data.isHighlighted) {
            return (
                <div className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg text-sm">
                    <div className="font-bold text-lg">{data.tooltipValue}</div>
                    <div>{data.tooltipDate}</div>
                </div>
            );
        }
        return (
            <div className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg text-sm">
                <div>{`${label}: ${payload[0].value}`}</div>
            </div>
        );
    }
    return null;
};

export default function Chart1() {
    return (
        <Card className="w-full max-w-2xl mx-auto bg-white shadow-sm">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium text-gray-900">
                        Submission Insights
                    </CardTitle>
                    <span className="text-sm text-gray-500">Last 7 days</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#E5E7EB"
                                horizontal={true}
                                vertical={true}
                            />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6B7280' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6B7280' }}
                                tickFormatter={(value) => {
                                    if (value >= 1000) return `${value / 1000}k`;
                                    return value.toString();
                                }}
                                domain={[0, 1000]}
                                ticks={[0, 10, 20, 50, 100, 500, 1000]}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar
                                dataKey="value"
                                fill="#3B82F6"
                                radius={[4, 4, 0, 0]}
                                stroke="none"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}