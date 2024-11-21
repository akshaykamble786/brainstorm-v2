import React, { useEffect, useState } from "react";
import Link from 'next/link';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const MAX_WORKSPACES = process.env.NEXT_PUBLIC_MAX_WORKSPACE_COUNT

export function NavSecondary({ items, ...props }) {
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const getWorkspaceCount = () => {
        const q = query(
          collection(db, 'workspaces'),
          where('createdBy', '==', user.primaryEmailAddress.emailAddress)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          setWorkspaceCount(querySnapshot.size);
        });

        return unsubscribe;
      };

      const unsubscribe = getWorkspaceCount();
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.title === "Usage" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="flex flex-col justify-between items-center mb-2 space-y-3">
                      <div className="text-left">
                        <h2 className="text-sm font-light">
                          <strong>{workspaceCount}</strong> out of <strong>{MAX_WORKSPACES}</strong> workspaces used
                        </h2>
                        <h5 className="text-xs font-light text-gray-500">Only 5 documents per workspace</h5>
                      </ div>
                      <Progress
                        value={(workspaceCount / MAX_WORKSPACES) * 100}
                        className="h-2 w-64 rounded-3xl"
                      />
                      <Button variant="default" className="w-full" onClick={() => router.push('/upgrade')}>
                        Upgrade to Pro
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}