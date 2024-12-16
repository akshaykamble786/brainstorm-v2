import React, { useState } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { Loader2Icon, MessageSquareText, X } from "lucide-react";
import CommentSection from "./CommentSection";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AdvancedEditor } from "@/components/editor/advanced-editor";
import { ClientSideSuspense } from "@liveblocks/react/suspense";

const DocumentEditor = ({ params }) => {
    const [openComment, setOpenComment] = useState(false);
    const [charsCount, setCharsCount] = useState(0);

    return (
        <div className="relative">
            {/* Header */}
            <DocumentHeader />
            <DocumentInfo params={params} charsCount={charsCount} />
            {/* rich text editor */}
            <div className="grid grid-cols-4">
                <div className="col-span-3">
                    {/* <RichTextEditor params={params} /> */}
                    <ClientSideSuspense fallback={<Loader2Icon />}>
                        <AdvancedEditor setCharsCount={setCharsCount} />
                    </ClientSideSuspense>

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