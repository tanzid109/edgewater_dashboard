"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {  ClipboardPaste } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CrisisExport() {
    const [category, setCategory] = useState("mobile-crisis");
    const [month, setMonth] = useState("August");

    const crisisOptions = [
        { value: "crisis-calls", label: "Crisis Calls" },
        { value: "mobile-crisis", label: "Mobile Crisis" },
        { value: "crisis-stabilization", label: "Crisis Stabilization Unit" },
    ];

    return (
        <main>
            <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-white p-6 shadow">
                {/* Crisis Category */}
                <div className="flex flex-col items-start gap-3">
                    <p className="text-base font-medium text-[#333333]">Select Crisis Category</p>
                    <div className="flex gap-3">
                        {crisisOptions.map((opt) => {
                            const isActive = category === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setCategory(opt.value)}
                                    className={cn(
                                        "flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition",
                                        isActive
                                            ? "bg-[#2489B0] text-white border-[#2489B0]"
                                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                                    )}
                                >
                                    {/* Circle indicator */}
                                    <span
                                        className={cn(
                                            "flex h-4 w-4 items-center justify-center rounded-full border transition",
                                            isActive
                                                ? "border-white bg-white"
                                                : "border-gray-400 bg-white"
                                        )}
                                    >
                                        {isActive && (
                                            <span className="h-2 w-2 rounded-full bg-[#2489B0]" />
                                        )}
                                    </span>
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Month Selector */}
                <div className="flex flex-col items-start gap-3">
                    <p className="text-base font-medium text-[#333333] ">Select a month</p>
                    <div className="flex gap-3">
                        <Select value={month} onValueChange={setMonth}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="January">January 2025</SelectItem>
                                <SelectItem value="February">February 2025</SelectItem>
                                <SelectItem value="March">March 2025</SelectItem>
                                <SelectItem value="April">April 2025</SelectItem>
                                <SelectItem value="May">May 2025</SelectItem>
                                <SelectItem value="June">June 2025</SelectItem>
                                <SelectItem value="July">May 2025</SelectItem>
                                <SelectItem value="August">August 2025</SelectItem>
                                <SelectItem value="September">September 2025</SelectItem>
                                <SelectItem value="October">October 2025</SelectItem>
                                <SelectItem value="November">November 2025</SelectItem>
                                <SelectItem value="December">December 2025</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button className="bg-[#2489B0] hover:bg-[#2488b0c5] rounded-lg">
                            <ClipboardPaste />
                            Export now
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex mt-4 h-auto flex-col items-center justify-center gap-6 rounded-2xl bg-white py-20 shadow">
                <Image src="/assets/csv.png" alt="Crisis Illustration" width={400} height={300} />
                <h2 className="text-base font-medium text-[#333333">Export your complete data report as CSV file</h2>
            </div>
        </main>
    );
}
