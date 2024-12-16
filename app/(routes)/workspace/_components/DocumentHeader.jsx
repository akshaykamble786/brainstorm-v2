"use client";

import { Badge } from "@/components/ui/badge"
import React, { useState } from "react";
import DynamicBreadcrumb from "./CustomBreadcrumb";
import InviteCollaborator from "./InviteCollaborator";
import { Bell, Loader2Icon } from "lucide-react";
import NotificationSystem from "./NotificationSystem"
import useOwner from "../../../../hooks/use-owner";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { Avataars } from "@/components/Avataars";
import { useSyncStatus } from "@liveblocks/react/suspense";

const DocumentHeader = ({ workspaceName }) => {
    const [saving, setSaving] = useState(false);
    const isOwner = useOwner()
    const syncStatus = useSyncStatus({ smooth: true });

    return (
        <div className="sticky flex items-center justify-between p-[15px] border-b">
            <div className="flex flex-col gap-2">
                <DynamicBreadcrumb />
                <h2 className="text-lg font-semibold">{workspaceName}</h2>
            </div>

            <div className="flex items-center gap-4">
                <NotificationSystem>
                    <Bell className="size-5 cursor-pointer" />
                </NotificationSystem>
                {
                    isOwner &&
                    <InviteCollaborator />
                }
                <ClientSideSuspense fallback={<Loader2Icon/>}>
                    <Avataars />
                </ClientSideSuspense>
                    {syncStatus === "synchronizing" ? <Badge variant="secondary" className="bg-orange-600">Saving...</Badge>
                        : <Badge variant="secondary" className="bg-emerald-600">Saved</Badge>
                    }
            </div>
        </div>
    )
}

export default DocumentHeader