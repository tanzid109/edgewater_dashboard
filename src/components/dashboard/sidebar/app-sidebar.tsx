"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    LayoutDashboard
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

// This is sample data.
// In your app-sidebar.tsx, update the navMain data:

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard", 
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "User Management",
            url: "/admin/users", 
            icon: Bot,
        },
        {
            title: "CRSS Data Report",
            url: "/admin/analytics", 
            icon: BookOpen,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="">
                <TeamSwitcher/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
