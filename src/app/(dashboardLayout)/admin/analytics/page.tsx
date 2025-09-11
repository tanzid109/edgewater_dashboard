
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ClipboardPasteIcon } from "lucide-react";
import Image from "next/image";

export default function DataReport() {


    return (
        <div>
            <h2 className="text-2xl font-bold px-1 py-3">CRSS Data Report</h2>
            <div className="max-w-sm p-10 bg-white shadow rounded-xl text-base font-medium">
                <h2 className="text-base  text-[#666666] mb-3.5">Select a month</h2>
                <div className="flex items-center justify-between gap-2">
                    <div className="">                     
                        <Select>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Month" />
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
                    </div>
                    <div>
                        <Button className="rounded-md">
                           <ClipboardPasteIcon/> Export now
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Image src="/assets/csv.png" width={350} height={270} alt="csv image" />
            </div>
        </div>
    );
}