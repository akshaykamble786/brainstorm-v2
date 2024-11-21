"use client"

import * as React from "react"
import {
  Blocks,
  Inbox,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavShared } from "./nav-shared"
import { NavWorkspaces } from "./nav-workspaces"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Navfooter from "./nav-footer"
import OrgSwitcher from "./org-switcher"
import { NavFavorites } from "./nav-favorites"

const data = {
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Create with AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Usage",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
  ],
  shared: [
    {
      name: "Birthday Planning",
      url: "#",
      emoji: "🎂",
    },
  ]
}

export function AppSidebar({ params
}) {

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <OrgSwitcher />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavWorkspaces params={params}/>
        <NavFavorites />
        <NavShared shared={data.shared} />
        <NavSecondary items={data.navSecondary} className="mt-auto" params={params} />
      </SidebarContent>
      <Navfooter />
      <SidebarRail />
    </Sidebar >
  )
}