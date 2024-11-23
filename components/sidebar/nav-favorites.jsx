"use client"

import React, { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  Link as LinkIcon,
  MoreHorizontal,
  StarOff,
  Trash2,
} from "lucide-react"

import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useFavorites } from '@/hooks/use-favorites'

export function NavFavorites() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { isMobile } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || favorites.length === 0) {
    return null;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <SidebarMenu>
        {favorites.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <Link href={item.url} title={item.name}>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
              >
                <DropdownMenuItem className="gap-2 flex" onClick={() => removeFromFavorites(item.id)}>
                  <StarOff className="size-4" />
                  <span>Remove from Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 flex" onClick={() => navigator.clipboard.writeText(item.url)}>
                  <LinkIcon className="size-4" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 flex" onClick={() => window.open(item.url, '_blank')}>
                  <ArrowUpRight className="size-4" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 flex text-red-500">
                  <Trash2 className="size-4" />
                  <span>Move to trash</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}