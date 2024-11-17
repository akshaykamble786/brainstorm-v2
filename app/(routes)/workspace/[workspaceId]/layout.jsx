import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function WorkspaceLayout({ children }) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={{
        "--sidebar-width": "17rem",
        "--sidebar-width-mobile": "12rem",
      }}
    >
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}