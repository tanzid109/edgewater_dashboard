"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { IconType } from "react-icons"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils"; // helper for conditional classes

type IconComponent = LucideIcon | IconType


export function NavMain({
    
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
                                        "flex items-center gap-2 rounded-md px-4 py-3 text-base font-medium my-1",
                                        item.isActive
                                            ? "bg-[#2489B0] text-white"
                                            : "bg-[#F4FAFD] text-[#333333]"
                                    )}
                                >
                                    <item.icon size={50} className="text-xl text-inherit !w-[24px] !h-[24px]" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            {item.items?.length ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight />
                                            <span className="sr-only">Toggle</span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link
                                                            href={subItem.url}
                                                            className="hover:bg-accent hover:text-accent-foreground"
                                                        >
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
