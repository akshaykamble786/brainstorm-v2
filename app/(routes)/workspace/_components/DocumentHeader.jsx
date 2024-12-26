"use client";

import { Badge } from "@/components/ui/badge";
import React from "react";
import DynamicBreadcrumb from "./CustomBreadcrumb";
import InviteCollaborator from "./InviteCollaborator";
import { Bell } from "lucide-react";
import NotificationSystem from "./NotificationSystem";
import useOwner from "../../../../hooks/use-owner";
import { useSyncStatus } from "@liveblocks/react/suspense";
import { MessageSquareText, X } from "lucide-react";
import CommentBox from "./CommentSection";

const DocumentHeader = ({ workspaceName }) => {
  const isOwner = useOwner();
  const syncStatus = useSyncStatus({ smooth: true });

  return (
    <div className="sticky flex items-center justify-between p-[15px] border-b">
      <div className="flex flex-col gap-2">
        <DynamicBreadcrumb />
        <h2 className="text-lg font-semibold">{workspaceName}</h2>
      </div>

      <div className="flex items-center space-x-5">
        <NotificationSystem>
          <Bell className="size-5 cursor-pointer" />
        </NotificationSystem>

        <CommentBox>
          <MessageSquareText className="size-6 cursor-pointer"/>
        </CommentBox>
    
        {isOwner && <InviteCollaborator />}

        {syncStatus === "synchronizing" ? (
          <Badge variant="secondary" className="bg-orange-600">
            Saving...
          </Badge>
        ) : (
          <Badge variant="secondary" className="bg-emerald-600">
            Saved
          </Badge>
        )}
      </div>
    </div>
  );
};

export default DocumentHeader;
