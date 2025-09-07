"use client";
import React, { useState } from 'react';

interface SubmissionData {
    day: string;
    value: number;
    isHighlighted?: boolean;
    date?: string;
    timestamp?: string;
}

const SubmissionInsightsChart: React.FC = () => {
    const [data] = useState<SubmissionData[]>([
        { day: 'Mon', value: 400, timestamp: '2025-09-01T09:00:00Z' },
        { day: 'Tue', value: 120, timestamp: '2025-09-02T09:00:00Z' },
        { day: 'Wed', value: 700,  timestamp: '2025-09-03T09:00:00Z' },
        { day: 'Thu', value: 25, timestamp: '2025-09-04T09:00:00Z' },
        { day: 'Fri', value: 0, timestamp: '2025-09-05T09:00:00Z' },
        { day: 'Sat', value: 60, timestamp: '2025-09-06T09:00:00Z' },
        { day: 'Sun', value: 350, timestamp: '2025-09-07T09:00:00Z' },
    ]);

    const [hoveredBar, setHoveredBar] = useState<number | null>(null);
    // const [isConnected, setIsConnected] = useState(false);
    // const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    // Simulated real-time database connection
    // useEffect(() => {
    //     // Simulate connecting to real-time database
    //     const connectToDatabase = () => {
    //         setIsConnected(true);
    //         console.log('Connected to real-time database');
    //     };

    //     // Simulate real-time data updates
    //     const interval = setInterval(() => {
    //         setData(prevData =>
    //             prevData.map((item) => ({
    //                 ...item,
    //                 value: Math.max(0, item.value + (Math.random() - 0.5) * 20), // Random fluctuation
    //             }))
    //         );
    //         setLastUpdated(new Date());
    //     }, 3000); // Update every 3 seconds

    //     connectToDatabase();

    //     return () => {
    //         clearInterval(interval);
    //         setIsConnected(false);
    //         console.log('Disconnected from real-time database');
    //     };
    // }, []);

    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = 300;

    const getBarHeight = (value: number) => {
        return (value / maxValue) * chartHeight;
    };

    const getBarColor = (item: SubmissionData) => {
        if (item.isHighlighted) return '#008402'; // Green for highlighted bar
        return '#2489B0'; // Blue for regular bars
    };

    // const formatValue = (value: number) => {
    //     if (value >= 1000) return '1000';
    //     if (value >= 500) return '500';
    //     if (value >= 100) return '100';
    //     if (value >= 50) return '50';
    //     if (value >= 20) return '20';
    //     if (value >= 10) return '10';
    //     return '0';
    // };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Submission Insights</h2>
                <div className="flex items-center gap-4">
                    {/* <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs text-gray-500">
                            {isConnected ? 'Live' : 'Disconnected'}
                        </span>
                    </div> */}
                    <span className="text-sm text-gray-500">Last 7 days</span>
                </div>
            </div>

            {/* Last updated info */}
            {/* <div className="text-xs text-gray-400 mb-4">
                Last updated: {lastUpdated.toLocaleTimeString()}
            </div> */}

            {/* Chart Container */}
            <div className="relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 h-80 flex flex-col-reverse justify-between text-xs text-gray-400 pr-2">
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                    <span>50</span>
                    <span>100</span>
                    <span>500</span>
                    <span>1000</span>
                </div>

                {/* Chart area */}
                <div className="ml-8 relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="border-t border-gray-100"></div>
                        ))}
                    </div>

                    {/* Bars container */}
                    <div className="flex items-end justify-between h-80 pt-4 relative">
                        {data.map((item, index) => (
                            <div key={item.day} className="flex flex-col items-center relative">
                                {/* Hover tooltip */}
                                {hoveredBar === index && (
                                    <div className="absolute -top-16 bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg z-20 whitespace-nowrap">
                                        <div className="font-semibold">{Math.round(item.value)} submissions</div>
                                        <div className="text-[#666666]">{item.day}</div>
                                        {item.timestamp && (
                                            <div className="text-gray-400 text-xs">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </div>
                                        )}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                    </div>
                                )}

                                {/* Special tooltip for highlighted bar */}
                                {item.isHighlighted && hoveredBar !== index && (
                                    <div className="absolute -top-12 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                                        <div className="font-semibold">12</div>
                                        <div>{item.date}</div>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                    </div>
                                )}

                                {/* Bar */}
                                <div
                                    className="w-12 rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer transform hover:scale-105"
                                    style={{
                                        height: `${getBarHeight(item.value)}px`,
                                        backgroundColor: getBarColor(item),
                                        minHeight: item.value === 0 ? '2px' : 'auto'
                                    }}
                                    onMouseEnter={() => setHoveredBar(index)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                ></div>

                                {/* Day label */}
                                <div className="mt-2 text-sm text-gray-600 font-medium">
                                    {item.day}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionInsightsChart;