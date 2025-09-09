import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar"
import { NavUser } from "@/components/dashboard/sidebar/nav-user"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-50 backdrop-blur-xl flex justify-between items-center pt-2 shrink-0 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-auto">
                    <div className="flex justify-between items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                    <div className="pr-10">
                        <NavUser user={{
                            avatar: "/assets/user.jpg",
                        }} />
                    </div>
                </header>
                <div className="bg-[#F4FAFD] flex flex-1 flex-col gap-4 p-4 pt-0">
                    {
                        children
                    }
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
