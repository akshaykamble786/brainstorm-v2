"use client";

import * as React from "react"
import {
    AudioWaveform,
    BadgeCheck,
    Bell,
    BookOpen,
    Bot,
    ChevronsUpDown,
    Command,
    CreditCard,
    DollarSign,
    Frame,
    GalleryVerticalEnd,
    LogOut,
    Map,
    Moon,
    PieChart,
    Settings2,
    Sparkles,
    SquareTerminal,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignOutButton, useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/app/(routes)/dashboard/_components/ModeToggle";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export default function Navfooter() {
    const { user } = useUser();
    const { signOut } = useClerk()
    const router = useRouter();
    const clerk = useClerk();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="py-8 px-4 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <UserButton />
                            <div className="flex-col gap-4">
                                <h2 className="text-sm dark:opacity-50">Free Plan</h2>
                                <h2 className="text-xs">{user?.fullName}</h2>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <UserButton />
                            <div className="flex-col gap-4">
                                <h2 className="text-sm dark:opacity-50">Free Plan</h2>
                                <h2 className="text-xs">{user?.fullName}</h2>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => router.push('/upgrade')}>
                            <Sparkles className="mr-1.5 size-4" />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {
                            clerk.openUserProfile();
                        }}>
                            <BadgeCheck className="mr-1.5 size-5" />
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/billing')}>
                            <CreditCard className="mr-1.5 size-5" />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/pricing')}>
                            <DollarSign className="mr-1.5 size-5" />
                            Pricing
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <Moon className="mr-1.5 size-5" />
                            Theme
                            <ModeToggle/>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                        signOut();
                    }}>
                        <LogOut className="mr-1.5 size-5" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
        </SidebarMenu >
    )
}