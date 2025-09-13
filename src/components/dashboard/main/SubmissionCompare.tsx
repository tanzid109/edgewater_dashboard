/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';

interface SubmissionData {
    name: string;
    value: number;
    color: string;
    percentage: number;
    trend: 'up' | 'down';
}

const SubmissionCompare: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly' | 'Daily'>('Weekly');

    const currentWeekValue = 56;
    const previousWeekValue = 32;
    const totalForms = currentWeekValue + previousWeekValue;

    const currentWeekPercentage = 7.8;
    const previousWeekPercentage = 7.8;

    // Data for the pie chart
    const data: SubmissionData[] = [
        {
            name: 'Current Week',
            value: currentWeekValue,
            color: '#2489B0', // Blue
            percentage: currentWeekPercentage,
            trend: 'up'
        },
        {
            name: 'Previous Week',
            value: previousWeekValue,
            color: '#4CCCC5', // Teal/Green
            percentage: previousWeekPercentage,
            trend: 'down'
        }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Submission Compare</h2>
                <div className="relative">
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value as any)}
                        className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 pr-8 focus:outline-none focus:border-[#2489B0]"
                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Daily">Daily</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="relative mb-6">
                <ResponsiveContainer width="100%" height={186}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-gray-900">{totalForms}</div>
                    <div className="text-sm text-gray-500">Total Form</div>
                </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm text-gray-600">{item.name}</span>
                            <span className="font-semibold text-gray-900">{item.value}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {item.trend === 'up' ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.91" d="M6 0L0.5 5.50031L1.99961 7L6 2.99939L10.0004 7L11.5 5.50031L6 0Z" fill="#008402" />
                                    <path opacity="0.6" d="M6 5L0.5 10.5003L1.99961 12L6 7.99939L10.0004 12L11.5 10.5003L6 5Z" fill="#008402" />
                                </svg>

                            ) : (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.91" d="M6 12L11.5 6.49969L10.0004 5L6 9.00061L1.99961 5L0.5 6.49969L6 12Z" fill="#D00004" />
                                    <path opacity="0.6" d="M6 7L11.5 1.49969L10.0004 -1.311e-07L6 4.00061L1.99961 -8.30551e-07L0.5 1.49969L6 7Z" fill="#D00004" />
                                </svg>

                            )}
                            <span className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {item.percentage}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubmissionCompare;