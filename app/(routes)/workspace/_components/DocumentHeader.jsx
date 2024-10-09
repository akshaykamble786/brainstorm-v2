import { Button } from "@/components/ui/button";
import { OrganizationSwitcher } from "@clerk/nextjs";
import React from "react";

const DocumentHeader = () => {
    return(
        <div className="flex justify-end items-center p-3 px-7 border-b border-gray-700">
            <div></div>
            <OrganizationSwitcher/>
            <div>
                <Button className="text-sm rounded-lg h-10">Share</Button>
            </div>
        </div>
    )
}

export default DocumentHeader