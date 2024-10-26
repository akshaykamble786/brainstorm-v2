"use client";

import { Button } from "@/components/ui/button";
import { OrganizationSwitcher } from "@clerk/nextjs";
import React, { useState } from "react";
import DynamicBreadcrumb from "./CustomBreadcrumb";

const DocumentHeader = ({ workspaceName, onCreateDocument }) => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex items-center justify-between px-6 py-3 border-b">
            <div className="flex flex-col gap-2">
                <DynamicBreadcrumb workspaceName={workspaceName} />
                <h2 className="text-lg font-semibold">{workspaceName}</h2>
            </div>

            <div className="flex items-center gap-2">
                <OrganizationSwitcher />
                <Button
                    className="h-10 px-4 text-sm font-medium rounded-lg"
                    disabled={loading}
                >
                    Publish
                </Button>
            </div>
        </div>
    )
}

export default DocumentHeader