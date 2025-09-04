"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { usePathname } from "next/navigation"
import { RiDashboardFill } from "react-icons/ri"
import { FaUserGear } from "react-icons/fa6";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb"
import { NavMain2 } from "./nav-main2"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/assets/user.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: RiDashboardFill ,
        },
        {
            title: "User Management",
            url: "/admin/users",
            icon: FaUserGear,
        },
        {
            title: "CRSS Data Report",
            url: "/admin/analytics",
            icon: BiSolidBarChartSquare,
        },
    ],
    navFooter: [
        {
            title: "Sign out",
            url: "/",
            icon: TbLogout2 ,
        },     
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    // Add `isActive` based on current path
    const navItems = data.navMain.map((item) => ({
        ...item,
        isActive: pathname === item.url,
    }))
    const navFooter = data.navFooter.map((item) => ({
        ...item,
        isActive: pathname === item.url,
    }))

    return (
        <Sidebar className="bg-white" collapsible="icon" {...props}>
            <SidebarHeader className="bg-white">
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent className="bg-white">
                <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter className="bg-white">
                <NavMain2 items={navFooter} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
