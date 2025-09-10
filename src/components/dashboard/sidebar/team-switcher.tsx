import * as React from "react"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Quicksand } from "next/font/google"
const quicksand = Quicksand({
    subsets: ["latin"],
    weight: [ "700"],
});

export function TeamSwitcher({ }) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
                >
                    <Image src="/assets/LogoMain.png" alt="Logo" width={64} height={64} />
                    <div className="grid flex-1 text-left leading-tight">
                        <p className={`${quicksand.className} tracking-tighter text-[32px] font-bold text-[#005D81]`}>edgewtaer</p>
                        <p className={`${quicksand.className} tracking-wide text-[26px] font-bold text-right mr-5 text-[#4CCCC5]`}>health</p>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
