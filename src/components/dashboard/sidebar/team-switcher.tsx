import * as React from "react"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function TeamSwitcher({ }) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
                >
                    <Image src="/assets/LogoMain.png" alt="Logo" width={64} height={64} />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium text-2xl">Edgewtaer</span>
                        <span className="truncate text-base">health</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
