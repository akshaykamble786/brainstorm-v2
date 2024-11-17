import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Sidebar({params}) {
  return (
    (<SidebarProvider>
      <SidebarTrigger />
      <AppSidebar params={params} />
      <SidebarInset> 
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
      </SidebarInset> 
    </SidebarProvider>)
  );
}
