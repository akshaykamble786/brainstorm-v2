"use client";

import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge"
import React, { useState } from "react";
import DynamicBreadcrumb from "./CustomBreadcrumb";
import InviteCollaborator from "./InviteCollaborator";
import { ModeToggle } from "../../dashboard/_components/ModeToggle";

const DocumentHeader = ({ workspaceName }) => {
    const [saving, setSaving] = useState(false);
    
    return (
        <div className="sticky flex items-center justify-between p-[15px] border-b">
            <div className="flex flex-col gap-2">
                <DynamicBreadcrumb />
                <h2 className="text-lg font-semibold">{workspaceName}</h2>
            </div>

            <div className="flex items-center gap-4">
                {/* <OrganizationSwitcher /> */}
                <ModeToggle/>
                <InviteCollaborator/>
                {saving ?
                    <Badge variant="secondary" className="bg-orange-600">Saving...</Badge>
                    : <Badge variant="secondary" className="bg-emerald-600">Saved</Badge>
                }
            </div>
        </div>
    )
}

export default DocumentHeader