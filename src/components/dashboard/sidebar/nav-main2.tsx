"use client";

import { type LucideIcon } from "lucide-react";
import { IconType } from "react-icons"
import {
    Collapsible,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils"; // helper for conditional classes

type IconComponent = LucideIcon | IconType


export function NavMain2({

    items,
}: {
    items: {
        title: string;
        url: string;
        icon: IconComponent;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <Link
                                    href={item.url}
                                    className={cn(
                                        "flex bg-[#FFEFEF] items-center gap-4 rounded-md px-2 py-3 text-lg  text-[#D00004] font-medium my-1",
                                    )}
                                >
                                    <item.icon size={50} className="!w-[24px] !h-[24px]"/>
                                    <span>{item.title}</span>
                                </Link>

                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
