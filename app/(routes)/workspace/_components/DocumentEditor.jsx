import React, { useState } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { MessageSquareText, X } from "lucide-react";
import CommentSection from "./CommentSection";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DocumentEditor = ({ params }) => {
    const [openComment, setOpenComment] = useState(false);

    return (
        <div className="relative">
            {/* Header */}
            <DocumentHeader />
            <DocumentInfo params={params} />
            {/* rich text editor */}
            <div className="grid grid-cols-4">

                <div className="col-span-3">
                    <RichTextEditor params={params} />
                </div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="fixed right-5 bottom-5 z-50">
                                <Button onClick={() => setOpenComment(!openComment)}>
                                    {openComment ? <X className="z-100" /> : <MessageSquareText className="size-5" />}
                                </Button>
                                {openComment && <CommentSection />}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Comments</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default DocumentEditor