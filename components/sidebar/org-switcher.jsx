"use client";

import * as React from "react"
import {
    ChevronsUpDown,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { OrganizationSwitcher } from "@clerk/nextjs";

export default function OrgSwitcher() {
    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <OrganizationSwitcher />
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </>

    )
}